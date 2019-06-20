import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class PerMinuteDeltaInfo
{
    @jsonMember({name: "0-10"})
    public untilTen: number;

    @jsonMember({name: "10-20"})
    public untilTwenty: number;

    @jsonMember({name: "20-30"})
    public untilThirty: number;

    @jsonMember({name: "30-end"})
    public afterThirty: number;

}