import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { MatchTimeLine } from '../model/match/match.timeline';
import { Participant } from '../model/participant/participant';
import { EventType } from '../model/event/event.type';
import { EventDisplayComponent } from '../event-display/event-display.component';
import { MatchEvent } from '../model/match/match.event';
import { MatchInfo } from '../model/match/match.info';
import { ReplayPlayback } from '../model/recording/replay.playback';
import { TypedJSON } from 'typedjson';
import { Observable, Observer } from 'rxjs';
import { FileRepository } from '../repositories/file.repository';
import { SafeUrl } from '@angular/platform-browser';

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
  replayPlaybacks: ReplayPlayback[] = [];
  replayPlaybackLoaded: boolean = false;
  downloadLink: SafeUrl;
  generateClicked: boolean = false;

  constructor(private fileRepository: FileRepository) { }

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
    this.resetReplayPlaybacks();
    if (eventType == EventType.Kill) this.getKillEvents();
    if (eventType == EventType.Death) this.getDeathEvents();
  }

  async generateRecordingFile() {
    this.generateClicked = true;
    let eventsToProcess = this.childrenEventDisplayComponents.filter(child => child.eventType == this.currentEventType);
    await eventsToProcess.forEach(eventToProcess => {
      this.replayPlaybacks.push(new ReplayPlayback(eventToProcess.recordLengthValue, false, true, 1, eventToProcess.eventInfo.timestamp));
    });
    this.downloadLink = this.fileRepository.generateJsonUri(this.replayPlaybacks);
    this.replayPlaybackLoaded = true;
  }

  private async resetReplayPlaybacks() {
    this.generateClicked = false;
    this.replayPlaybackLoaded = false;
    this.replayPlaybacks = [];
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
