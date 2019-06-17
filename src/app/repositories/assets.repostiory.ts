import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TypedJSON } from 'typedjson';
import { ChampionInfo } from '../model/champions.info';

@Injectable()
export class AssetsRepository {
    constructor(private http: Http) {
    }

    loadJson(): Observable<ChampionInfo> {
        return this.http.get('assets/champions.json')
            .pipe(
                map(response => {
                    let championInfoSerializer = new TypedJSON(ChampionInfo);
                    return championInfoSerializer.parse(response.json());
                }),
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