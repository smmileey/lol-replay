import { Injectable } from '@angular/core';
import { DataDragonRepository } from '../repositories/ddragon.repository';
import { AssetsRepository } from '../repositories/assets.repostiory';
import { ChampionIdToChampionNameMap } from '../model/champion/champion.id.to.name.map';
import { MatchEvent } from '../model/match/match.event';
import { MatchInfo } from '../model/match/match.info';

const MINION = "Minion";

@Injectable()
export class ChampionInfoProvider {
    constructor(
        private championToIdMap: ChampionIdToChampionNameMap,
        private dataDragonRepository: DataDragonRepository,
        private assetsRepository: AssetsRepository) {
    }

    getKillerImageUrl(eventInfo: MatchEvent, matchInfo: MatchInfo): string | PromiseLike<string> {
        if (eventInfo == null) throw new Error("EventInfo not provided.");

        let killerChampionId = this.getChampionId(eventInfo.killerId, matchInfo);
        let championName = this.mapChampionIdToChampionName(killerChampionId);
        if (championName == MINION) return this.assetsRepository.getMinionImageUrl();

        let formattedChampionName = this.formatChampionNameForRiotApiFormat(championName);
        return this.dataDragonRepository.getChampionImageUrl(formattedChampionName);
    }

    getVictimImageUrl(eventInfo: MatchEvent, matchInfo: MatchInfo): string | PromiseLike<string> {
        if (eventInfo == null) throw new Error("EventInfo not provided.");

        let victimChampionId = this.getChampionId(eventInfo.victimId, matchInfo);
        let championName = this.mapChampionIdToChampionName(victimChampionId);
        let formattedChampionName = this.formatChampionNameForRiotApiFormat(championName);
        return this.dataDragonRepository.getChampionImageUrl(formattedChampionName);
    }
  
    mapChampionIdToChampionName(championId: number): string {
        return this.championToIdMap.mappings.get(championId.toString())
    }

    formatChampionNameForRiotApiFormat(unformattedChampionName: string) {
        if (!unformattedChampionName) throw new Error("Champion name not provided.");

        return unformattedChampionName
            .replace(' ', '')
            .replace('\'', '')
            .replace('.', '')
            .replace('VelKoz', 'Velkoz')
            .replace('ChoGath', 'Chogath');
    }
    
    private getChampionId(participantId: number, matchInfo: MatchInfo): number {
        if (matchInfo == null || matchInfo.participants == null) throw new Error("Insufficient data in MatchInfo.")

        let participant = matchInfo.participants.find(participant => participant.participantId == participantId);
        return participant ? participant.championId : participantId;
    }
}