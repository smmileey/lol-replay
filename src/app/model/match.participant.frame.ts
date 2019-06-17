import { jsonObject, jsonMember } from 'typedjson';
import { MatchPosition } from './match.position';


@jsonObject
export class MatchParticipantFrame
{
    @jsonMember
    public totalGold: number;

    @jsonMember
    public teamScore: number;

    @jsonMember
    public participantId: number;

    @jsonMember
    public level: number;

    @jsonMember
    public currentGold: number;

    @jsonMember
    public minionsKilled: number;

    @jsonMember
    public dominionScore: number;

    @jsonMember
    public position: MatchPosition;

    @jsonMember
    public xp: number;

    @jsonMember
    public jungleMinionsKilled: number;
}