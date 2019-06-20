import { ParticipantStats } from './patricipant.stats';
import { jsonObject, jsonMember } from 'typedjson';
import { ParticipantTimeline } from './participant.timeline';

@jsonObject
export class Participant
{
    @jsonMember
    public stats: ParticipantStats;

    @jsonMember
    participantId: number;

    @jsonMember
    timeline: ParticipantTimeline;

    @jsonMember
    teamId: number;

    @jsonMember
    spell2Id: number;

    @jsonMember
    highestAchievedSeasonTier: string;

    @jsonMember
    spell1Id : number;

    @jsonMember
    championId: number;
}