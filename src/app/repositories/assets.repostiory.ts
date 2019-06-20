import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChampionInfo } from '../model/champion/champions.info';

const ChampionsInfoPath = 'assets/Data/champions.json';
const MinionImageUrl = "assets/Images/minion.jpg";

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