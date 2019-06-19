import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

const PROTOCOL = "https";
const API_KEY = "RGAPI-3599826f-e37b-40c1-b0a5-2852baa33fcf";

@Injectable()
export class RestDataSource {

    baseUrl: string;

    constructor(private httpClient: HttpClient) {
    }

    post<T>(url: string, body?: any, includeApiKey = true): Observable<T> {
        return this.httpClient.post<T>(url, this.getUrl(url, includeApiKey));
    }

    get<T>(url: string, body?: any, includeApiKey = true): Observable<T> {
        return this.httpClient.get<T>(this.getUrl(url, includeApiKey));
    }

    delete<T>(url: string, body?: any, includeApiKey = true): Observable<T> {
        return this.httpClient.post<T>(url, this.getUrl(url, includeApiKey));
    }

    private getUrl(url: string, includeApiKey: boolean): string {
        var baseUrl = PROTOCOL + "://" + url;
        return includeApiKey ? baseUrl + "?api_key=" + API_KEY : baseUrl;
    }
}

