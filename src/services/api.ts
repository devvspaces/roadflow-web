import { BASE_URL } from "./constants";
import { BaseApiClient, RequestOption } from "./base";
import { LoginResponse } from "@/common/interfaces/login";
import { RefreshPayloadResponse } from "@/common/interfaces/token";
import { RegisterDto } from "@/common/dtos/register";
import { User } from "@/common/interfaces/user";
import { GetCurriculumDto } from "@/common/dtos/curriculum";
import { CurriculumListResponse, CurriculumPageResponse, CurriculumWithResources, EnrolledCurriculumPageResponse, EnrolledCurriculumsResponse, SyllabiTopicResponse } from "@/common/interfaces/curriculum";
import { PaginatedResponse } from "@/common/interfaces/response";
import { getAccessToken } from "./authenticate";
import { QuizSubmitResponse, TopicQuiz } from "@/common/interfaces/quiz";
import { DynamicObject } from "@/common/interfaces";
import { Grades } from "@/common/interfaces/grades";


export class ApiService extends BaseApiClient {
  getAccessToken: CallableFunction = getAccessToken;

  constructor() {
    if (BASE_URL === undefined) {
      throw new Error("BASE_URL is undefined");
    }
    super(BASE_URL, {})
  }

  async login(email: string, password: string) {
    return this.post<LoginResponse>("/account/login", {
      body: {
        email,
        password
      }
    });
  }

  async register(data: RegisterDto) {
    return this.post<User>("/account/register", {
      body: data
    });
  }

  async verify_account(email: string, otp: string) {
    return this.post<User>("/account/validate-otp", {
      body: {
        email,
        otp
      }
    });
  }

  authorize(data: RequestOption) {
    const access = this.getAccessToken();
    if (access == undefined) {
      throw new Error("Unauthorized");
    }
    return {
      ...data,
      headers: {
        "Authorization": `Bearer ${access}`
      }
    }
  }

  async refreshJwt(refresh: string) {
    return this.post<RefreshPayloadResponse>("/account/token/user/refresh", {
      body: { refresh }
    });
  }

  async get_curriculums(data: GetCurriculumDto) {
    const body = {
      query: {
        search: data.search || "",
      }
    }
    return this.get<PaginatedResponse<CurriculumListResponse>>(
      "/curriculum", this.authorize(body));
  }

  async get_curriculum_with_resources(slug: string) {
    return this.get<CurriculumWithResources>(
      "/curriculum/resources/{slug}", this.authorize({
        params: {
          slug
        }
      }));
  }

  async get_curriculum_with_grades(slug: string) {
    return this.get<Grades>(
      "/curriculum/grades/{slug}/", this.authorize({
        params: {
          slug
        }
      }));
  }
  
  async get_single_curriculum(slug: string) {
    return this.get<CurriculumPageResponse>(
      "/curriculum/{slug}", this.authorize({
        params: {
          slug
        }
      }));
  }

  async check_enrolled_in_curriculum(slug: string) {
    const response = await this.get<CurriculumPageResponse>(
      "/curriculum/check-enrolled/{slug}", this.authorize({
        params: {
          slug
        }
      }));
    return response.success
  }

  async get_single_enrolled_curriculum(slug: string) {
    return this.get<EnrolledCurriculumPageResponse>(
      "/curriculum/enrolled/{slug}", this.authorize({
        params: {
          slug
        }
      }));
  }

  async get_syllabi_progress(slug: string) {
    return this.get<SyllabiTopicResponse>(
      "/curriculum/topic/{slug}/", this.authorize({
        params: {
          slug
        }
      }));
  }

  async get_enrolled_curriculums() {
    return this.get<PaginatedResponse<EnrolledCurriculumsResponse>>(
      "/curriculum/enrolled/", this.authorize({}));
  }

  async get_topic_quiz(slug: string) {
    return this.get<TopicQuiz>(
      "/curriculum/topic/quiz/{slug}/", this.authorize({
        params: {
          slug
        }
      }));
  }

  async submit_topic_quiz(slug: string, body: DynamicObject) {
    return this.post<QuizSubmitResponse>(
      "/curriculum/topic/quiz/submit/{slug}/", this.authorize({
        params: {
          slug
        },
        body
      }));
  }

  async enroll_user(slug: string) {
    return this.post<{ curriculum: string }>(
      "/curriculum/enroll", this.authorize({
        body: {
          "curriculum": slug
        }
      }));
  }

  async review(slug: string, body: { review: string, rating: string }) {
    return this.post<{ curriculum: string }>(
      "/curriculum/submit-review/{slug}", this.authorize({
        params: {
          slug
        },
        body: {
          rating: parseInt(body.rating),
          review: body.review
        }
      }));
  }
}

export const api = new ApiService();