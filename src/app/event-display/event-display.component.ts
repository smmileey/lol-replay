import { Component, OnInit, Input } from '@angular/core';
import { MatchInfo } from '../model/match.info';
import { Participant } from '../model/participant';
import { MatchEvent } from '../model/match.event';
import { EventDisplayModel } from '../model/event.display.model';
import { AssetsRepository } from '../repositories/assets.repostiory';
import { EventType } from '../model/event.type';
import { FormControl, Validators } from '@angular/forms';
import { ChampionInfoProvider } from '../providers/champion.info.provider';

const PVP_EVENTS = [EventType.Kill, EventType.Death]

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.css']
})
export class EventDisplayComponent implements OnInit {

  eventDataLoaded;
  model: EventDisplayModel = new EventDisplayModel();
  backOffsetValue = 0;
  recordLengthValue = -this.backOffsetValue + 5;
  backOffsetRangeControl = new FormControl(this.backOffsetValue, [Validators.max(0), Validators.min(-60), Validators.required]);
  recordLengthFormControl = new FormControl(this.recordLengthValue, [Validators.max(-this.backOffsetValue + 60), Validators.min(-this.backOffsetValue + 5), Validators.required]);


  @Input("matchInfo")
  matchInfo: MatchInfo

  @Input("chosenSummoner")
  chosenSummoner: Participant; //todo: do we even need this here? or only for stats

  @Input("killInfo")
  eventInfo: MatchEvent;

  @Input("eventType")
  eventType: EventType;

  private readonly MaxRecordTimeAfterEventTimestamp = 60;
  private readonly MinRecordingLength = 5;

  constructor(
    private assetsRepository: AssetsRepository,
    private championInfoProvider: ChampionInfoProvider) { }

  ngOnInit() {
    this.UpdateRecordLengthErrorOnBackOffsetChange();

    this.assetsRepository
      .loadChampionsDetails()
      .subscribe(async response => {
        await this.calculateEventTime(this.eventInfo.timestamp);
        await this.loadEventDisplayDataAsync(response);
        this.eventDataLoaded = true;
      }, err => {
        //todo: handle this better
        console.log("Error: " + err)
      })
  }

  private async loadEventDisplayDataAsync(response: import("e:/AngularProjects/LoL/lol-project/src/app/model/champions.info").ChampionInfo) {
    let eventOwnerName = this.getEventOwnerName();
    if (this.championInfoProvider.isChampion(eventOwnerName)) this.model.championDetails = await response.data[eventOwnerName];

    if (PVP_EVENTS.includes(this.eventType)) {
      this.model.killerImageUrl = await this.championInfoProvider.getKillerImageUrl(this.model.championDetails, eventOwnerName);
      this.model.victimImageUrl = await this.championInfoProvider.getVictimImageUrl(this.eventInfo, this.matchInfo);
    }
  }

  private UpdateRecordLengthErrorOnBackOffsetChange() {
    this.backOffsetRangeControl.valueChanges.subscribe(newValue => {
      let maxValue = -newValue + this.MaxRecordTimeAfterEventTimestamp;
      let minValue = -newValue + this.MinRecordingLength;
      this.recordLengthFormControl.setValidators([Validators.max(maxValue), Validators.min(minValue), Validators.required]);
      this.recordLengthFormControl.updateValueAndValidity();
    });
  }

  async calculateEventTime(timestamp: number) {
    let date = new Date(timestamp);
    this.model.eventMinutesTime = (date.getHours() - 1) * 60 + date.getMinutes();
    this.model.eventSecondsTime = date.getSeconds();
  }

  getEventOwnerName(): string {
    if (this.eventType == EventType.Kill) {
      let championName = this.championInfoProvider.mapChampionIdToChampionName(this.chosenSummoner.championId)
      return this.championInfoProvider.formatChampionNameForRiotApiFormat(championName);
    }

    if (this.eventType == EventType.Death) {
      let killerParticipantId = this.matchInfo.participants.find(participant => participant.participantId == this.eventInfo.killerId);
      let championName = this.championInfoProvider.mapChampionIdToChampionName(killerParticipantId ? killerParticipantId.championId : this.eventInfo.killerId)
      return this.championInfoProvider.formatChampionNameForRiotApiFormat(championName);
    }

    throw new Error(`Unsuported EventType: ${this.eventType}`);
  }
}
