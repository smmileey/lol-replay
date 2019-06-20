import { MatchReference } from './match.reference';
import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';

@jsonObject
export class MatchList
{
    @jsonArrayMember(MatchReference)
    public matches : MatchReference[];

    @jsonMember
    public totalGames: number;

    @jsonMember
    public startIndex:number;
    
    @jsonMember
    public endIndex: number;
}