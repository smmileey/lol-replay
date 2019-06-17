import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Http, Request, RequestMethod, ResponseType, ResponseContentType } from '@angular/http'
import { map } from 'rxjs/operators';
import { MatchInfo } from '../model/match.info';
import { MatchList } from '../model/match.list';

const PROTOCOL = "https";
const API_KEY = "RGAPI-55b2c9da-bc9d-443e-bf98-2d4d44520dae";

@Injectable()
export class RestDataSource {

    baseUrl: string;

    constructor(private http: Http)
    {
    }

    sendRequest(method: RequestMethod, url: string, body?: any, includeApiKey = true): Observable<MatchList | MatchInfo | any> 
    {
        let request = new Request({
            method: method,
            url: this.getUrl(url, includeApiKey),
            body: body,
            responseType: ResponseContentType.Json
        });
        return this.http.request(request)
        .pipe(
            map(res => res.json())
        )
    }

    private getUrl(url: string, includeApiKey: boolean) : string
    {
        var baseUrl = PROTOCOL + "://" + url;
        return includeApiKey ? baseUrl + "?api_key=" + API_KEY : baseUrl;
    }
}

