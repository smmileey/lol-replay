import { MatchParticipantFrame } from './match.participant.frame';
import { jsonMapMember, jsonObject, jsonArrayMember, jsonMember } from 'typedjson';
import { MatchEvent } from './match.event';

@jsonObject
export class MatchParticipantFrameMap
{
    @jsonMember
    public timestamp: number;
    
    @jsonArrayMember(MatchEvent)
    public events: MatchEvent[];
    
    @jsonArrayMember(MatchParticipantFrame)
    public matchParticipantFrame: MatchParticipantFrame[]
}