import { BaseHttpHandler, HttpHandlerError } from "./httpHandler";
import axios, { AxiosError } from "axios";
import { RequestOption } from "../base";


export class FetchHandler extends BaseHttpHandler {
  errorCallback(error: any) {
    console.log(error)
    throw new HttpHandlerError(
      error.message,
      error.status,
      error.response
    )
  }

  responseCallback(response: Response) {
    const res = response.json().then((data) => ({
      status: response.status,
      headers: response.headers,
      data,
    })).catch(error => {
      throw new HttpHandlerError(
        error.message,
        error.status,
        error.response
      )
    });
    return res;
  }

  async get(url: string, options: RequestOption) {
    const response = await fetch(url, {
      headers: options.headers,
    })
      .then(this.responseCallback)
      .catch(this.errorCallback);

    if (!response) {
      throw new HttpHandlerError("No response from server");
    }
    return response;
  }

  async post(url: string, options: RequestOption) {

    const response = await fetch(url, {
      headers: options.headers,
      body: JSON.stringify(options.body),
      method: "POST",
    })
      .then(this.responseCallback)
      .catch(this.errorCallback);

    if (!response) {
      throw new HttpHandlerError("No response from server");
    }
    return response;
  }

  async put(url: string, options: RequestOption) {
    const response = await fetch(url, {
      headers: options.headers,
      body: JSON.stringify(options.body),
      method: "PUT",
    })
      .then(this.responseCallback)
      .catch(this.errorCallback);

    if (!response) {
      throw new HttpHandlerError("No response from server");
    }
    return response;
  }

  async delete(url: string, options: RequestOption) {
    const response = await fetch(url, {
      headers: options.headers,
      method: "DELETE",
      body: JSON.stringify(options.body),
    })
      .then(this.responseCallback)
      .catch(this.errorCallback);

    if (!response) {
      throw new HttpHandlerError("No response from server");
    }
    return response;
  }

  async patch(url: string, options: RequestOption) {
    const response = await fetch(url, {
      headers: options.headers,
      body: JSON.stringify(options.body),
      method: "PATCH",
    })
      .then(this.responseCallback)
      .catch(this.errorCallback);

    if (!response) {
      throw new HttpHandlerError("No response from server");
    }
    return response;
  }
}