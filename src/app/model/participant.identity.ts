import { Player } from '@angular/core/src/render3/interfaces/player';
import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class ParticipantIdentity
{
    @jsonMember
    public player: Player;

    @jsonMember
    public participantId: number;
}