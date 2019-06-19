import { jsonObject, jsonMember } from 'typedjson';
import { Player } from './player';

@jsonObject
export class ParticipantIdentity
{
    @jsonMember
    public player: Player;

    @jsonMember
    public participantId: number;
}