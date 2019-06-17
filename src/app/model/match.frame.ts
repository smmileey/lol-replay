import { jsonObject, jsonMember, jsonMapMember, jsonArrayMember } from 'typedjson';
import { MatchParticipantFrame } from './match.participant.frame';
import { MatchEvent } from './match.event';
import { MatchParticipantFrameMap } from './match.participant.frame.map';

@jsonObject
export class MatchFrame
{
    @jsonMember
    public timestamp: number;
    
    @jsonArrayMember(MatchEvent)
    public events: MatchEvent[];
    
    @jsonArrayMember(MatchParticipantFrame)
    public matchParticipantFrame: MatchParticipantFrame[]
}