import { BASE_URL } from "./constants";
import { BaseApiClient, RequestOption } from "./base";
import { LoginResponse } from "@/common/interfaces/login";
import { RefreshPayloadResponse } from "@/common/interfaces/token";
import { RegisterDto } from "@/common/dtos/register";
import { User } from "@/common/interfaces/user";
import { GetCurriculumDto } from "@/common/dtos/curriculum";
import {
  CurriculumListResponse,
  CurriculumPageResponse,
  CurriculumWithResources,
  EnrolledCurriculumPageResponse,
  EnrolledCurriculumsResponse,
  SyllabiTopicResponse,
} from "@/common/interfaces/curriculum";
import { PaginatedResponse } from "@/common/interfaces/response";
import { getAccessToken } from "./authenticate";
import { QuizSubmitResponse, TopicQuiz } from "@/common/interfaces/quiz";
import { DynamicObject } from "@/common/interfaces";
import { Grades } from "@/common/interfaces/grades";
import { EventResponse } from "@/common/interfaces/events";

import axios, { CancelTokenSource } from "axios";

class RefreshTokenExpiredError extends Error {
  constructor() {
    super("Refresh token expired");
  }
}

// Create a cancellation token manager
class CancelTokenManager {
  public sourceMap: Map<string, CancelTokenSource>;

  constructor() {
    this.sourceMap = new Map();
  }

  addToken(key: string) {
    if (this.sourceMap.has(key)) {
      // If a request with the same key is already in progress, cancel it
      // this.sourceMap.get(key)?.cancel("Duplicate request canceled");
    }

    const source = axios.CancelToken.source();
    this.sourceMap.set(key, source);
    return source.token;
  }

  removeToken(key: string) {
    this.sourceMap.delete(key);
  }
}

const cancelTokenManager = new CancelTokenManager();

export const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  const jwt = getAccessToken();
  if (jwt && jwt.access) {
    req.headers.Authorization = `Bearer ${jwt.access}`;
  }

  // Generate a unique key for the request
  const requestKey = JSON.stringify(req);

  // Add a cancel token for the request
  req.cancelToken = cancelTokenManager.addToken(requestKey);

  return req;
});

API.interceptors.response.use(
  (response) => {
    // Remove the cancel token for the completed request
    const requestKey = JSON.stringify(response.config);
    cancelTokenManager.removeToken(requestKey);
    return response;
  },
  (error) => {
    try {
      if (error?.response?.status === 401) {
        const jwt = getAccessToken();
        if (jwt && jwt.refresh) {
          if (jwt.refresh_expires_at < Date.now()) {
            jwt.clear();
            throw new RefreshTokenExpiredError();
          }

          api
            .refreshJwt(jwt.refresh)
            .then((res) => {
              if (!res.success || !res.result.data) {
                jwt.clear();
                throw new RefreshTokenExpiredError();
              }
              const result = res.result.data;
              console.log("Updating Access Token", result);
              jwt.updatePayload({
                access: result.access,
                refresh: jwt.refresh,
                access_expires_at: result.access_expires_at,
                refresh_expires_at: jwt.refresh_expires_at,
              });

              // Retry the failed request
              const requestKey = JSON.stringify(error.config);
              const newRequest = {
                ...error.config,
                cancelToken: cancelTokenManager.addToken(requestKey),
              };
              return API(newRequest);
            })
            .catch((err) => {
              console.error("Error refreshing token", err);
              jwt.clear();
              throw new RefreshTokenExpiredError();
            });
        }
      }
    } catch (e) {
      window.location.href = "/login";
      return;
    }
    // Remove the cancel token for the failed request
    const requestKey = JSON.stringify(error.config);
    cancelTokenManager.removeToken(requestKey);
    return Promise.reject(error);
  }
);

export class ApiService extends BaseApiClient {
  getAccessToken: typeof getAccessToken = getAccessToken;

  constructor() {
    if (BASE_URL === undefined) {
      throw new Error("BASE_URL is undefined");
    }
    super(BASE_URL, {});
    this.setHttpHandler(API);
  }

  async login(email: string, password: string) {
    return this.post<LoginResponse>("/account/login", {
      body: {
        email,
        password,
      },
    });
  }

  async register(data: RegisterDto) {
    return this.post<User>("/account/register", {
      body: data,
    });
  }

  async google(id_token: string) {
    return this.post<LoginResponse>("/account/google", {
      body: {
        id_token,
      },
    });
  }

  async twitter(id_token: string) {
    return this.post<LoginResponse>("/account/twitter", {
      body: {
        id_token,
      },
    });
  }

  async github(id_token: string, access_token: string) {
    return this.post<LoginResponse>("/account/github", {
      body: {
        id_token,
        access_token,
      },
    });
  }

  async verify_account(email: string, otp: string) {
    return this.post<LoginResponse>("/account/validate-otp", {
      body: {
        email,
        otp,
      },
    });
  }

  async resend_otp(email: string) {
    return this.post("/account/resend-otp", {
      body: {
        email,
      },
    });
  }

  authorize(data: RequestOption) {
    const tokens = this.getAccessToken();
    if (tokens == undefined) {
      throw new Error("Unauthorized");
    }
    return {
      ...data,
      // headers: {
      //   Authorization: `Bearer ${tokens.access}`,
      // },
    };
  }

  async refreshJwt(refresh: string) {
    return this.post<RefreshPayloadResponse>("/account/token/user/refresh", {
      body: { refresh },
    });
  }

  async get_curriculums(data: GetCurriculumDto) {
    const body = {
      query: {
        search: data.search || "",
      },
    };
    return this.get<PaginatedResponse<CurriculumListResponse>>(
      "/curriculum",
      this.authorize(body)
    );
  }

  async get_curriculum_with_resources(slug: string) {
    return this.get<CurriculumWithResources>(
      "/curriculum/resources/{slug}",
      this.authorize({
        params: {
          slug,
        },
      })
    );
  }

  async get_curriculum_with_grades(slug: string) {
    return this.get<Grades>(
      "/curriculum/grades/{slug}/",
      this.authorize({
        params: {
          slug,
        },
      })
    );
  }

  async get_single_curriculum(slug: string) {
    return this.get<CurriculumPageResponse>(
      "/curriculum/{slug}",
      this.authorize({
        params: {
          slug,
        },
      })
    );
  }

  async check_enrolled_in_curriculum(slug: string) {
    const response = await this.get<CurriculumPageResponse>(
      "/curriculum/check-enrolled/{slug}",
      this.authorize({
        params: {
          slug,
        },
      })
    );
    return response.success;
  }

  async get_single_enrolled_curriculum(slug: string) {
    return this.get<EnrolledCurriculumPageResponse>(
      "/curriculum/enrolled/{slug}",
      this.authorize({
        params: {
          slug,
        },
      })
    );
  }

  async get_syllabi_progress(slug: string) {
    return this.get<SyllabiTopicResponse>(
      "/curriculum/topic/{slug}/",
      this.authorize({
        params: {
          slug,
        },
      })
    );
  }

  async get_enrolled_curriculums() {
    return this.get<PaginatedResponse<EnrolledCurriculumsResponse>>(
      "/curriculum/enrolled/",
      this.authorize({})
    );
  }

  async get_topic_quiz(slug: string) {
    return this.get<TopicQuiz>(
      "/curriculum/topic/quiz/{slug}/",
      this.authorize({
        params: {
          slug,
        },
      })
    );
  }

  async submit_topic_quiz(slug: string, body: DynamicObject) {
    return this.post<QuizSubmitResponse>(
      "/curriculum/topic/quiz/submit/{slug}/",
      this.authorize({
        params: {
          slug,
        },
        body,
      })
    );
  }

  async enroll_user(slug: string) {
    return this.post<{ curriculum: string }>(
      "/curriculum/enroll",
      this.authorize({
        body: {
          curriculum: slug,
        },
      })
    );
  }

  async review(slug: string, body: { review: string; rating: number }) {
    return this.post<{ curriculum: string }>(
      "/curriculum/submit-review/{slug}",
      this.authorize({
        params: {
          slug,
        },
        body: {
          rating: body.rating,
          review: body.review,
        },
      })
    );
  }

  async get_upcoming_events() {
    return this.get<PaginatedResponse<EventResponse>>(
      "/curriculum/upcoming-events/"
    );
  }
}

export const api = new ApiService();
