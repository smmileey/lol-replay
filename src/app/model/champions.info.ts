import { jsonObject, jsonMember } from 'typedjson';
import { ChampionDetailsMap } from './champion.details.map';

@jsonObject
export class ChampionInfo 
{
    @jsonMember
    public data: ChampionDetailsMap;

    @jsonMember
    public format: string;

    @jsonMember
    public type: string;

    @jsonMember
    public version: string;
}