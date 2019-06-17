import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { RequestMethod, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const VERSION = "9.12.1"
const PROTOCOL = "https";

@Injectable()
export class DataDragonRepository {

    private url = `ddragon.leagueoflegends.com/cdn/${VERSION}/img/`;

    constructor() {
    }

    getChampionImageUrl(championName: string): string {
        return `${PROTOCOL}://${this.url}champion/${championName}.png`
    }
}