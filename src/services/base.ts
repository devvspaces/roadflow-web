import { joinUrls } from "@/common";
import { DynamicObject } from "@/common/interfaces";
import { ErrorResponse } from "@/common/interfaces/error";
import { SuccessResponse } from "@/common/interfaces/response";
import axios, { AxiosResponse, AxiosError } from "axios";


export type RequestOption = {
  path?: string,
  headers?: DynamicObject,
  body?: DynamicObject,
  query?: DynamicObject,
  params?: DynamicObject,
}

/**
 * BaseApiClient
 * 
 * @description Base class for all api clients, provides basic methods for api calls
 * 
 * @example
 * 
 * class UserApiClient extends BaseApiClient {
 *  constructor(baseUrl: string, baseHeaders: DynamicObject) {
 *   super(baseUrl, baseHeaders);
 *  }
 * 
 *  public async getUser(id: string) {
 *   return this.get<User>(`/users/${id}`, {
 *    params: {
 *     id: 12,
 *    },
 *    query: {
 *     name: 'John'
 *    }
 *   });
 *  }
 * }
 * 
 * const userApiClient = new UserApiClient('http://localhost:3000', {
 *    x: 'y'
 * });
 * 
 * const user = await userApiClient.getUser('12');
 * 
 */
export class BaseApiClient {
  private _baseUrl: string;
  private _baseHeaders: DynamicObject;

  constructor(baseUrl: string, baseHeaders: DynamicObject) {
    this.setBaseUrl(baseUrl);
    this.setBaseHeaders(baseHeaders);
  }

  /**
   * 
   * @returns Base url of the api client
   */
  public getBaseUrl() {
    return this._baseUrl;
  }

  /**
   * 
   * @param baseUrl Base url of the api client
   * 
   * @description Set base url of the api client
   * 
   * @example
   * 
   * const userApiClient = new UserApiClient('http://localhost:3000', {
   *   x: 'y'
   * });
   * 
   * userApiClient.setBaseUrl('http://localhost:3001');
   * 
   * const user = await userApiClient.getUser('12');
  */
  public setBaseUrl(baseUrl: string) {
    // Make sure the base url ends with a slash
    if (!baseUrl.endsWith('/')) {
      baseUrl = `${baseUrl}/`;
    }
    this._baseUrl = baseUrl;
  }

  /**
   * 
   * @returns Base headers of the api client
   */
  public getBaseHeaders() {
    return this._baseHeaders;
  }


  /**
   * 
   * @param baseHeaders Base headers of the api client
   * 
   * @description Set base headers of the api client
   */
  public setBaseHeaders(baseHeaders: DynamicObject) {
    this._baseHeaders = baseHeaders;
  }


  /**
   * 
   * @param path the endpoint of the api
   * @param context an object containing params or query
   * @returns the url of the api call
   */
  public buildUrl(path: string, context: Pick<RequestOption, 'params' | 'query'>) {
    let url = joinUrls(this.getBaseUrl(), path)

    if (context.params) {
      Object.keys(context.params).forEach(key => {
        url = url.replace(`{${key}}`, context.params[key]);
      });
    }
    
    // If does not end with a slash, add a slash
    if (!url.endsWith('/')) {
      url = `${url}/`;
    }

    if (context.query) {
      const qUrl = new URL(url);
      Object.keys(context.query).forEach(key => {
        qUrl.searchParams.append(key, context.query[key]);
      });
      url = qUrl.toString();
    }

    return url;
  }

  /**
   * 
   * @param context an object containing headers
   * @returns the headers of the api call
   */
  public async buildHeaders(context: Pick<RequestOption, 'headers' | 'path'>) {
    return {
      ...this.getBaseHeaders(),
      ...context.headers
    }
  }

  public async resolveResult<T>(
    response: AxiosResponse<any>,
  ): Promise<{
    result: SuccessResponse<T>;
    status: number;
    success: true;
  } | {
    result: ErrorResponse;
    status: number;
    success: false;
  }> {
    if (response.status >= 200 && response.status < 300) {
      return {
        result: response.data as SuccessResponse<T>,
        status: response.status,
        success: true,
      }
    }
    return {
      result: response.data as ErrorResponse,
      status: response.status,
      success: false,
    }
  }

  public handleAxiosError(context: RequestOption, url: string) {
    return (error: AxiosError) => {
      console.log("Error on request", error)
      this.logInput(context, url);
      return error.response as AxiosResponse<ErrorResponse>
    }
  }

  public logInput(context: RequestOption, url: string, extra?: any) {
    console.log("Request context", context)
    console.log("Request url", url)
    console.log("Request extra", extra)
  }

  public addPath(path: string, context: RequestOption) {
    context.path = path
  }

  public async get<T>(path: string, context: RequestOption = {}) {
    this.addPath(path, context)

    const url = this.buildUrl(path, context);
    const headers = await this.buildHeaders(context)

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }).then((data) => {
      return data
    }).catch(this.handleAxiosError(context, url));

    if (!response) {
      throw new Error("API not responding correctly")
    }

    return this.resolveResult<T>(response);
  }

  public async post<T>(path: string, context: RequestOption) {
    this.addPath(path, context)

    const url = this.buildUrl(path, context);
    const headers = await this.buildHeaders(context)

    this.logInput(context, url, headers);

    const response = await axios.post(url, context.body, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    }).then((data) => {
      return data
    }).catch(this.handleAxiosError(context, url));

    if (!response) {
      throw new Error("API not responding correctly")
    }
    return this.resolveResult<T>(response);
  }


  public async put<T>(path: string, context: RequestOption) {
    this.addPath(path, context)
    const url = this.buildUrl(path, context);
    const headers = await this.buildHeaders(context)
    const response = await axios.put(url, context.body, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    }).then((data) => {
      return data
    }).catch(this.handleAxiosError(context, url));

    if (!response) {
      throw new Error("API not responding correctly")
    }

    return this.resolveResult<T>(response);
  }

  public async delete<T>(path: string, context: Omit<RequestOption, 'query' | 'body'>) {
    this.addPath(path, context)
    const url = this.buildUrl(path, context);
    const headers = await this.buildHeaders(context)
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }).then((data) => {
      return data
    }).catch(this.handleAxiosError(context, url));

    if (!response) {
      throw new Error("API not responding correctly")
    }

    return this.resolveResult<T>(response);
  }

  public async patch<T>(path: string, context: RequestOption) {
    this.addPath(path, context)
    const url = this.buildUrl(path, context);
    const headers = await this.buildHeaders(context)
    const response = await axios.patch(url, context.body, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    }).then((data) => {
      return data
    }).catch(this.handleAxiosError(context, url));

    if (!response) {
      throw new Error("API not responding correctly")
    }
    return this.resolveResult<T>(response);
  }

  public async upload<T>(path: string, file: File, context: Omit<RequestOption, 'query' | 'body'>) {
    this.addPath(path, context)
    const url = this.buildUrl(path, context);
    const formData = new FormData();
    formData.append('file', file);
    const headers = await this.buildHeaders(context)

    const response = await axios.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      },
    }).then((data) => {
      return data
    }).catch(this.handleAxiosError(context, url));

    if (!response) {
      throw new Error("API not responding correctly")
    }

    return this.resolveResult<T>(response);
  }
}
