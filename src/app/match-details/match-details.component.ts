import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { MatchTimeLine } from '../model/match/match.timeline';
import { Participant } from '../model/participant/participant';
import { EventType } from '../model/event/event.type';
import { EventDisplayComponent } from '../event-display/event-display.component';
import { MatchEvent } from '../model/match/match.event';
import { MatchInfo } from '../model/match/match.info';

const CHAMPION_KILL = "CHAMPION_KILL";

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  @ViewChildren(EventDisplayComponent)
  childrenEventDisplayComponents: QueryList<EventDisplayComponent>;

  eventType = EventType;
  killEvents: MatchEvent[] = [];
  deathEvents: MatchEvent[] = [];
  currentEventType: EventType;

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
  collapseId: number;

  async getEvents(eventType: EventType) {
    this.setCurrentEventType(eventType);
    if (eventType == EventType.Kill) this.getKillEvents();
    if (eventType == EventType.Death) this.getDeathEvents();
  }

  async generateRecordingFile() {
    console.log("Generating recording file...");
    console.log("EventType: " + this.currentEventType.toString());
    console.log("Events count: "+ this.childrenEventDisplayComponents.filter(child => child.eventType == this.currentEventType).length);
  }

  private async setCurrentEventType(eventType: EventType) {
    this.currentEventType = eventType;
  }

  private async getKillEvents() {
    if (this.killEvents.length > 0) return;

    await this.matchTimeLine.frames.forEach(frame => {
      this.killEvents = this.killEvents.concat(frame.events.filter(evt => evt.type == CHAMPION_KILL && evt.killerId == this.chosenSummoner.participantId))
    })
  }

  private async getDeathEvents() {
    if (this.deathEvents.length > 0) return;

    await this.matchTimeLine.frames.forEach(frame => {
      this.deathEvents = this.deathEvents.concat(frame.events.filter(evt => evt.type == CHAMPION_KILL && evt.victimId == this.chosenSummoner.participantId))
    })
  }
}
