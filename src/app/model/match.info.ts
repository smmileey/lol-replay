import { ParticipantIdentity } from './participant.identity';
import { TeamStats } from './team.stats';
import { Participant } from './participant';
import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';


@jsonObject
export class MatchInfo
{
    @jsonMember
    public season: number;

    @jsonMember
    public queueId: number;

    @jsonMember
    public gameId: number;

    @jsonArrayMember(ParticipantIdentity)
    public participantIdentities: ParticipantIdentity[];

    @jsonMember
    public gameVersion: string;

    @jsonMember
    public platformId: string;

    @jsonMember
    public gameMode: string;

    @jsonMember
    public mapId: number;

    @jsonMember
    public gameType: string;

    @jsonArrayMember(TeamStats)
    public teams: TeamStats[];

    @jsonArrayMember(Participant)
    public participants: Participant[];

    @jsonMember
    public gameDuration: number;

    @jsonMember
    public gameCreation: number;
}