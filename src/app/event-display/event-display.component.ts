import { Component, OnInit, Input } from '@angular/core';
import { Participant } from '../model/participant/participant';
import { EventDisplayModel } from '../model/event/event.display.model';
import { AssetsRepository } from '../repositories/assets.repostiory';
import { EventType } from '../model/event/event.type';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ChampionInfoProvider } from '../providers/champion.info.provider';
import { MatchInfo } from '../model/match/match.info';
import { MatchEvent } from '../model/match/match.event';
import { ChampionInfo } from '../model/champion/champions.info';

const PVP_EVENTS = [EventType.Kill, EventType.Death]

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.css']
})
export class EventDisplayComponent implements OnInit {

  @Input("matchInfo")
  matchInfo: MatchInfo

  @Input("chosenSummoner")
  chosenSummoner: Participant; //todo: do we even need this here? or only for stats

  @Input("killInfo")
  eventInfo: MatchEvent;

  @Input("eventType")
  eventType: EventType;

  @Input("eventDisplayId")
  eventDisplayId: number;

  private readonly MaxRecordTimeAfterEventTimestamp = 60;
  private readonly MinRecordingLength = 5;
  private readonly backOffsetInputName = "backOffsetInput";
  private readonly recordLengthFormControlName = "recordLengthFormControl";

  model: EventDisplayModel = new EventDisplayModel();
  eventDataLoaded;
  backOffsetValue = 0;
  recordLengthValue = -this.backOffsetValue + this.MinRecordingLength;
  eventsFormGroup = new FormGroup({
    backOffsetInput: new FormControl(
      this.backOffsetValue,
      [
        Validators.max(0),
        Validators.min(-this.MaxRecordTimeAfterEventTimestamp),
        Validators.required
      ]),
      recordLengthFormControl: new FormControl(
      this.recordLengthValue,
      [
        Validators.max(-this.backOffsetValue + this.MaxRecordTimeAfterEventTimestamp),
        Validators.min(-this.backOffsetValue + this.MinRecordingLength),
        Validators.required
      ])
  });

  constructor(
    private assetsRepository: AssetsRepository,
    private championInfoProvider: ChampionInfoProvider) { }

  get backOffsetInput() { return this.eventsFormGroup.get(this.backOffsetInputName); }
  get recordLengthFormControl() { return this.eventsFormGroup.get(this.recordLengthFormControlName); }

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

  applyBackOffsetRangeChange(backOffsetRangeValue: number) {
    this.backOffsetValue = backOffsetRangeValue;
    this.backOffsetInput.setValue(backOffsetRangeValue);
  }

  applyBackOffsetInputChange(backOffsetInputValue: number) {
    this.backOffsetValue = backOffsetInputValue;
  }

  applyRecordLengthInputChange(recordLengthInputValue: number) {
    this.recordLengthValue = recordLengthInputValue;
  }

  private UpdateRecordLengthErrorOnBackOffsetChange() {
    this.backOffsetInput.valueChanges.subscribe(newValue => {
      let maxValue = -newValue + this.MaxRecordTimeAfterEventTimestamp;
      let minValue = -newValue + this.MinRecordingLength;
      this.recordLengthFormControl.setValidators([Validators.max(maxValue), Validators.min(minValue), Validators.required]);
      this.recordLengthFormControl.updateValueAndValidity();
    });
  }

  private async calculateEventTime(timestamp: number) {
    let date = new Date(timestamp);
    this.model.eventMinutesTime = (date.getHours() - 1) * 60 + date.getMinutes();
    this.model.eventSecondsTime = date.getSeconds();
  }

  private async loadEventDisplayDataAsync(response: ChampionInfo) {
    this.model.championDetails = await response.data[this.getEventOwnerName()];

    if (PVP_EVENTS.includes(this.eventType)) {
      this.model.killerImageUrl = await this.championInfoProvider.getKillerImageUrl(this.eventInfo, this.matchInfo);
      this.model.victimImageUrl = await this.championInfoProvider.getVictimImageUrl(this.eventInfo, this.matchInfo);
    }
  }

  private getEventOwnerName(): string {
    let championName = this.championInfoProvider.mapChampionIdToChampionName(this.chosenSummoner.championId)
    return this.championInfoProvider.formatChampionNameForRiotApiFormat(championName);
  }
}
