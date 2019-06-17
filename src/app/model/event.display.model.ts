import { ChampionDetails } from './champion.details';


export class EventDisplayModel
{
    public championDetails: ChampionDetails;
    
    public killerImageUrl: string;

    public victimImageUrl: string;

    public eventMinutesTime: number;

    public eventSecondsTime: number;
}