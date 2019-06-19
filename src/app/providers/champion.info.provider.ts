import { Injectable } from '@angular/core';
import { ChampionIdToChampionNameMap } from '../model/champion.id.to.name.map';
import { DataDragonRepository } from '../repositories/ddragon.repository';
import { AssetsRepository } from '../repositories/assets.repostiory';
import { MatchEvent } from '../model/match.event';
import { MatchInfo } from '../model/match.info';
import { ChampionDetails } from '../model/champion.details'
import { isEmpty } from 'rxjs/operators';

const MINION = "Minion";

@Injectable()
export class ChampionInfoProvider {
    constructor(
        private championToIdMap: ChampionIdToChampionNameMap,
        private dataDragonRepository: DataDragonRepository,
        private assetsRepository: AssetsRepository) {
    }

    formatChampionNameForRiotApiFormat(unformattedChampionName: string) {
        if(!unformattedChampionName) throw new Error("Champion name not provided.");
        
        return unformattedChampionName
            .replace(' ', '')
            .replace('\'', '')
            .replace('.', '')
            .replace('VelKoz', 'Velkoz')
            .replace('ChoGath', 'Chogath');
    }

    mapChampionIdToChampionName(championId: number): string {
        return this.championToIdMap.mappings.get(championId.toString())
    }

    isChampion(eventOwnerName: string): boolean {
        return eventOwnerName != MINION;
    }

    getKillerImageUrl(championDetails: ChampionDetails, killerName: string): string | PromiseLike<string> {
        if (killerName == MINION) return this.assetsRepository.getMinionImageUrl();

        if (championDetails == null) throw new Error("ChampionDetails not provided.")
        return this.dataDragonRepository.getChampionImageUrl(this.formatChampionNameForRiotApiFormat(championDetails.name))
    }

    getVictimImageUrl(eventInfo: MatchEvent, matchInfo: MatchInfo): string | PromiseLike<string> {
        if (eventInfo == null) throw new Error("EventInfo not provided.");

        let victimChampionId = this.getVictimChampionId(eventInfo.victimId, matchInfo);
        let formattedChampionName = this.formatChampionNameForRiotApiFormat(this.mapChampionIdToChampionName(victimChampionId));
        return this.dataDragonRepository.getChampionImageUrl(formattedChampionName);
    }

    private getVictimChampionId(victimId: number, matchInfo: MatchInfo): number {
        if(matchInfo == null || matchInfo.participants == null) throw new Error("Insufficient data in MatchInfo.")

        return matchInfo.participants.find(participant => participant.participantId == victimId).championId;
    }
}