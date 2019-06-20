import { TeamBans } from './team.bans';
import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';

@jsonObject
export class TeamStats
{
    @jsonMember
    firstDragon: boolean;

    @jsonMember
    firstInhibitor: boolean;

    @jsonArrayMember(TeamBans)
    bans: TeamBans[];
    
    @jsonMember
    baronKills: number;

    @jsonMember
    firstRiftHerald: boolean;

    @jsonMember
    firstBaron: boolean;

    @jsonMember
    riftHeraldKills: number;

    @jsonMember
    firstBlood: boolean;

    @jsonMember
    teamId: number;

    @jsonMember
    firstTower: boolean;

    @jsonMember
    vilemawKills: number;

    @jsonMember
    inhibitorKills: number;

    @jsonMember
    towerKills: number;

    @jsonMember
    dominionVictoryScore: number;

    @jsonMember
    win: string;

    @jsonMember
    dragonKills: number;
}