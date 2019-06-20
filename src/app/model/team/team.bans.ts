import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class TeamBans
{
    @jsonMember
    pickTurn: number;

    @jsonMember
    championId: number;
}