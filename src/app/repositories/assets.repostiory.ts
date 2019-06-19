import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ChampionInfo } from '../model/champions.info';
import { HttpClient } from '@angular/common/http';

const ChampionsInfoPath = 'assets/champions.json';
const MinionImageUrl = "assets/minion2.jpg";

@Injectable()
export class AssetsRepository {
    constructor(private httpClient: HttpClient) {
    }

    loadChampionsDetails(): Observable<ChampionInfo> {
        return this.httpClient.get<ChampionInfo>(ChampionsInfoPath)
            .pipe(
                catchError(err => {
                    //todo: handle this better
                    console.log(err);
                    throw new Error(err)
                })
            )
    }

    getMinionImageUrl(): string {
        return MinionImageUrl;
    }
}