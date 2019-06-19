import { Component, OnInit, Input } from '@angular/core';
import { MatchInfo } from '../model/match.info';
import { Participant } from '../model/participant';
import { MatchEvent } from '../model/match.event';
import { EventDisplayModel } from '../model/event.display.model';
import { AssetsRepository } from '../repositories/assets.repostiory';
import { ChampionIdToChampionNameMap } from '../model/champion.id.to.name.map';
import { DataDragonRepository } from '../repositories/ddragon.repository';
import { EventType } from '../model/event.type';
import { FormControl, Validators } from '@angular/forms';

const MINION = "Minion";

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.css']
})
export class EventDisplayComponent implements OnInit {

  eventDataLoaded;
  model: EventDisplayModel = new EventDisplayModel();
  backOffsetValue = 0;
  recordLengthValue = -this.backOffsetValue +5;
  backOffsetRangeControl = new FormControl(this.backOffsetValue, [Validators.max(0), Validators.min(-60), Validators.required]);
  recordLengthFormControl = new FormControl(this.recordLengthValue, [Validators.max(-this.backOffsetValue +60), Validators.min(-this.backOffsetValue +5), Validators.required]);

  
  @Input("matchInfo")
  matchInfo: MatchInfo

  @Input("chosenSummoner")
  chosenSummoner: Participant; //todo: do we even need this here? or only for stats

  @Input("killInfo")
  eventInfo: MatchEvent;

  @Input("eventType")
  eventType: EventType;

  constructor(private assetsRepository: AssetsRepository, private dataDragonRepository: DataDragonRepository, private championToIdMap: ChampionIdToChampionNameMap) { }

  ngOnInit() {
    //test
    this.backOffsetRangeControl.valueChanges.subscribe(newValue => {
      console.log(this.recordLengthFormControl.value)
      this.recordLengthFormControl.setValidators([Validators.max(-newValue +60), Validators.min(-newValue +5), Validators.required]);
      this.recordLengthFormControl.updateValueAndValidity();
      // this.recordLengthFormControl  = new FormControl(this.recordLengthValue, [Validators.max(-this.backOffsetValue +65), Validators.min(-this.backOffsetValue +5), Validators.required]);
    });
    //testEnd

    this.assetsRepository
      .loadJson()
      .subscribe(async resp => {
        this.calculateEventTime(this.eventInfo.timestamp);

        let killerName = this.getKillerName()
        if (this.isKillerChampion(killerName)) this.model.championDetails = await resp.data[killerName];

        //todo: extract to getEventData() or smth
        this.model.killerImageUrl = await this.getKillerImageUrl(killerName);
        this.model.victimImageUrl = await this.getVictimImageUrl()
        this.eventDataLoaded = true;
      }, err => {
        console.log("Error: " + err)
      })
  }

  calculateEventTime(timestamp: number) {
    let date = new Date(timestamp);
    this.model.eventMinutesTime = (date.getHours() - 1) * 60 + date.getMinutes();
    this.model.eventSecondsTime = date.getSeconds();
  }

  getKillerName(): string {
    if (this.eventType == EventType.Kill) return this.formatChampionNameForGetParameter(this.mapChampionIdToChampionName(this.chosenSummoner.championId));
    if (this.eventType == EventType.Death) {
      let killerParticipantId = this.matchInfo.participants.find(participant => participant.participantId == this.eventInfo.killerId);
      return this.formatChampionNameForGetParameter(this.mapChampionIdToChampionName(killerParticipantId ? killerParticipantId.championId : this.eventInfo.killerId));
    }

    throw new Error(`Unsuported EventType: ${this.eventType}`);
  }

  formatChampionNameForGetParameter(unformattedChampionName: string) {
    return unformattedChampionName
      .replace(' ', '')
      .replace('\'', '')
      .replace('.', '')
      .replace('VelKoz', 'Velkoz')
      .replace('ChoGath', 'Chogath');
  }

  mapChampionIdToChampionName(championId: number): string {
    return this.championToIdMap.mappings.get(championId.toString())
  }

  isKillerChampion(killerName: string): boolean {
    return killerName != MINION; //XD ehh RafaelloLolipop, corner case...
  }

  getKillerImageUrl(killerName: string): string | PromiseLike<string> {
    return killerName != MINION
      ? this.dataDragonRepository.getChampionImageUrl(this.formatChampionNameForGetParameter(this.model.championDetails.name))
      : this.assetsRepository.getMinionImageUrl();
  }

  getVictimImageUrl(): string | PromiseLike<string> {
    let victimChampionId = this.getVictimChampionId(this.eventInfo.victimId);
    return this.dataDragonRepository.getChampionImageUrl(this.formatChampionNameForGetParameter(this.mapChampionIdToChampionName(victimChampionId)));
  }

  getVictimChampionId(victimId: number): number {
    return this.matchInfo.participants.find(participant => participant.participantId == victimId).championId;
  }
}
