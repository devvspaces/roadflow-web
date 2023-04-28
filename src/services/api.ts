import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./constants";
import { BaseApiClient } from "./base";
import { LoginResponse } from "@/common/interfaces/login";
import { RefreshPayloadResponse } from "@/common/interfaces/token";
import { RegisterDto } from "@/common/dtos/register";
import { User } from "@/common/interfaces/user";
import { GetCurriculumDto } from "@/common/dtos/curriculum";
import { CurriculumListResponse } from "@/common/interfaces/curriculum";
import { PaginatedResponse } from "@/common/interfaces/response";


export class ApiService extends BaseApiClient {
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

  async refreshJwt(refresh: string) {
    return this.post<RefreshPayloadResponse>("/account/token/user/refresh", {
      body: { refresh }
    });
  }

  async get_curriculums(data: GetCurriculumDto) {
    return this.get<PaginatedResponse<CurriculumListResponse>>("/curriculum", {
      query: {
        search: data.search || "",
      }
    });
  }
}

export const api = new ApiService();