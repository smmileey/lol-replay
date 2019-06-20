import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class ChampionDetails
{
    @jsonMember
    public blurb: string;

    @jsonMember
    public id: string;

    //image: todo
    //info: todo

    @jsonMember
    public key: string;

    @jsonMember
    public name: string;

    @jsonMember
    public partype: string;

    //stats: todo
    //tags: todo
    
    @jsonMember
    public titile: string;

    @jsonMember
    public version: string;
}