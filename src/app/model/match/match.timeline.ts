import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';
import { MatchFrame } from './match.frame';

@jsonObject
export class MatchTimeLine
{
    @jsonArrayMember(MatchFrame)
    public frames: MatchFrame[];

    @jsonMember
    public frameInterval: number;
}