import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  url: string = environment.url;
  constructor(private http: HttpClient) { }

  updateData(path: string, data: any) {
    return this.http.put(`${this.url}${path}`, data, {
      headers: this.createHeader()
    });
  }

  getData(path: string, params: any, secure?: boolean) {
    return this.http.get(`${this.url}${path}`, {
      params: params,
      headers: this.createHeader()
    });
  }

  postData(path: string, data: any) {
    return this.http.post(`${this.url}${path}`, data, {
      headers: this.createHeader()
    });
  }

  deleteData(path: string) {
    return this.http.delete(`${this.url}${path}`, {
      headers: this.createHeader()
    });
  }

  createHeader(): HttpHeaders {
    const token = window.localStorage.getItem("authToken");
    if (!token) {
      return;
    }
    const headers = new HttpHeaders({
      "x-auth-token": token
    });
    return headers;
  }

  createImgUrl(url) {
    return `${this.url}${url}`;
  }
}
