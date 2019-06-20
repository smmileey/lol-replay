import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class MatchPosition
{
    @jsonMember
    public x: number;

    @jsonMember
    public y: number;
}