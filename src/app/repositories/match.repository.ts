import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { MatchInfo } from '../model/match.info';
import { Observable } from 'rxjs';
import { RequestMethod } from '@angular/http';
import { MatchReference } from '../model/match.reference';
import { MatchList } from '../model/match.list';
import { MatchTimeLine } from '../model/match.timeline';

const summonerByNameBase = ".api.riotgames.com/lol/summoner/v4/summoners/by-name/";
const matchesBySummoner = ".api.riotgames.com/lol/match/v4/matchlists/by-account/";
const matchInfoByGameId = ".api.riotgames.com/lol/match/v4/matches/";
const matchTimeLineByGameId = ".api.riotgames.com/lol/match/v4/timelines/by-match/";

@Injectable()
export class MatchRepository
{
    constructor(private restDataSource: RestDataSource)
    {
    }

    async findUser(server: string, summonerName: string) : Promise<any> //change to typed object
    {
        let url = server + summonerByNameBase + summonerName;
        return this.restDataSource.sendRequest(RequestMethod.Get, url).toPromise();
    }

    async findMatches(server: string, summonerName: string) : Promise<MatchList>
    {
        let userData = await this.findUser(server, summonerName);
        let url = server + matchesBySummoner + userData.accountId;
        return this.restDataSource.sendRequest(RequestMethod.Get, url).toPromise() as Promise<MatchList>;
    }

    async getMatchInfo(server: string, matchId: number): Promise<MatchInfo>
    {
        let url = server + matchInfoByGameId + matchId;
        return this.restDataSource.sendRequest(RequestMethod.Get, url).toPromise() as Promise<MatchInfo>;
    }

    async getMatchTimeLineInfo(server: string, matchId: number): Promise<MatchTimeLine>
    {
        let url = server + matchTimeLineByGameId + matchId;
        return this.restDataSource.sendRequest(RequestMethod.Get, url).toPromise() as Promise<MatchTimeLine>;
    }
}
