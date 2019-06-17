import { jsonMember, jsonObject } from 'typedjson';

@jsonObject
export class MatchReference
{
    @jsonMember
    public lane: string;

    @jsonMember
    public gameId: number;

    @jsonMember
    public champion: number;

    @jsonMember
    public platformId: string;

    @jsonMember
    public season: number;

    @jsonMember
    public queue: number;

    @jsonMember
    public role: string;

    @jsonMember
    public timestamp: number;
}