import { Injectable } from '@angular/core';

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