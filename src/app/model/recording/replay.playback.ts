
export class ReplayPlayback {
    constructor(length: number, paused: boolean, seeking: boolean, speed: number, time: number) {
        this.length = length;
        this.paused = paused;
        this.seeking = seeking;
        this.speed = speed;
        this.time = time;
    }

    public length: number;

    public paused: boolean;

    public seeking: boolean;

    public speed: number;

    public time: number;
}