import { MatchPosition } from './match.position';
import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';

@jsonObject
export class MatchEvent
{
    @jsonMember
    public eventType: string;

    @jsonMember
    public towerType: string;

    @jsonMember
    public teamId: number;

    @jsonMember
    public ascendedType: string;

    @jsonMember
    public killerId: number;

    @jsonMember
    public levelUpType: string;

    @jsonMember
    public pointCaptured: string;

    @jsonArrayMember(Number)
    public assistingParticipantIds: number[];

    @jsonMember
    public wardType: string;
    public monsterType: string;

    @jsonMember
    public type: string;  //enum CHAMPION_KILL, WARD_PLACED, WARD_KILL, BUILDING_KILL, ELITE_MONSTER_KILL, ITEM_PURCHASED, ITEM_SOLD, ITEM_DESTROYED, ITEM_UNDO, SKILL_LEVEL_UP, ASCENDED_EVENT, CAPTURE_POINT, PORO_KING_SUMMON
   
    @jsonMember
    public skillSlot: number;

    @jsonMember
    public victimId: number;

    @jsonMember
    public timestamp: number;

    @jsonMember
    public afterId:number;

    @jsonMember
    public monsterSubType: string;

    @jsonMember
    public laneType: string;

    @jsonMember
    public itemId: number;

    @jsonMember
    public participantId: number;

    @jsonMember
    public buildingType: string;

    @jsonMember
    public creatorId: number;

    @jsonMember
    public position: MatchPosition;

    @jsonMember
    public beforeId: number;
}