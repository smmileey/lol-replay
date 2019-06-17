import { Component, OnInit, Input } from '@angular/core';
import { MatchInfo } from '../model/match.info';
import { MatchTimeLine } from '../model/match.timeline';
import { Participant } from '../model/participant';
import { MatchEvent } from '../model/match.event';
import { EventType } from '../model/event.type';

const CHAMPION_KILL = "CHAMPION_KILL";

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  eventType = EventType;
  killEvents: MatchEvent[] = [];
  deathEvents: MatchEvent[] = [];

  constructor() { }

  ngOnInit() {

  }

  @Input("matchTimeLine")
  matchTimeLine: MatchTimeLine

  @Input("matchInfo")
  matchInfo: MatchInfo

  @Input("chosenSummoner")
  chosenSummoner: Participant;

  @Input("collapseId")
  collapseId:number;

  async getEvents(eventType: EventType) {
    if (eventType == EventType.Kill) this.getKillEvents()
    if (eventType == EventType.Death) this.getDeathEvents();
  }

  private async getKillEvents() {
    if (this.killEvents.length > 0) return;

    await this.matchTimeLine.frames.forEach(frame => {
      this.killEvents = this.killEvents.concat(frame.events.filter(evt => evt.type == CHAMPION_KILL && evt.killerId == this.chosenSummoner.participantId))
    })
  }

  private async getDeathEvents() {
    if (this.deathEvents.length > 0) return;

    console.log(this.matchTimeLine.frames);
    await this.matchTimeLine.frames.forEach(frame => {
      this.deathEvents = this.deathEvents.concat(frame.events.filter(evt => evt.type == CHAMPION_KILL && evt.victimId == this.chosenSummoner.participantId))
    })
  }
}
