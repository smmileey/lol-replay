import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TypedJSON } from 'typedjson';
import { ChampionInfo } from '../model/champions.info';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AssetsRepository {
    constructor(private httpClient: HttpClient) {
    }

    // loadJson(): Observable<ChampionInfo> {
    //     return this.httpClient.get('assets/champions.json')
    //         .pipe(
    //             map(response => {
    //                 let championInfoSerializer = new TypedJSON(ChampionInfo);
    //                 return championInfoSerializer.parse(response.json());
    //             }),
    //             catchError(err => {
    //                 console.log(err);
    //                 throw new Error(err)
    //             })
    //         )
    // }

    loadJson(): Observable<ChampionInfo> {
        return this.httpClient.get<ChampionInfo>('assets/champions.json')
            .pipe(
                catchError(err => {
                    console.log(err);
                    throw new Error(err)
                })
            )
    }
  
    getMinionImageUrl() :string{
        return "assets/minion2.jpg";
    }
}