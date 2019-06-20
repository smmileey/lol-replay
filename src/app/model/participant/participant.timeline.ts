import { jsonObject, jsonMember } from 'typedjson';
import { PerMinuteDeltaInfo } from './per.min.delta.info';

@jsonObject
export class ParticipantTimeline
{
    @jsonMember
    public lane: string;

    @jsonMember
    public participantId: number;

    @jsonMember
    public csDiffPerMinDeltas: PerMinuteDeltaInfo;

    @jsonMember
    public goldPerMinDeltas: PerMinuteDeltaInfo;

    @jsonMember
    public xpDiffPerMinDeltas: PerMinuteDeltaInfo;

    @jsonMember
    public creepsPerMinDeltas: PerMinuteDeltaInfo;

    @jsonMember
    public xpPerMinDeltas: PerMinuteDeltaInfo;

    @jsonMember
    public role: string;

    @jsonMember
    public damageTakenDiffPerMinDeltas: PerMinuteDeltaInfo;
    @jsonMember
    public damageTakenPerMinDeltas: PerMinuteDeltaInfo;
}