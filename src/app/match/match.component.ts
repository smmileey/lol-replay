import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatchRepository } from '../repositories/match.repository';
import { TypedJSON } from 'typedjson';
import { MatchReference } from '../model/match.reference';
import { MatchInfo } from '../model/match.info';
import { MatchTimeLine } from '../model/match.timeline';
import { Participant } from '../model/participant';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  isMatchInfoLoaded = false;
  collapsed = false;
  matchTimeLine: MatchTimeLine;
  matchInfo: MatchInfo;
  chosenSummoner: Participant;

  constructor(private matchRepository: MatchRepository) {
  }

  ngOnInit() {
  }

  @Input("matchReference")
  matchReference: MatchReference;

  @Input("server")
  server: string;

  @Input("collapseId")
  collapseId: number;
  
  @Output() backgroundColorChanged = new EventEmitter<string>();

  async getMatchDetails() {
    if (!this.collapsed) {
      this.collapsed = !this.collapsed;
      let matchTimeLineJson = await this.matchRepository.getMatchTimeLineInfo(this.server, this.matchReference.gameId);
      let matchDetalis = await this.matchRepository.getMatchInfo(this.server, this.matchReference.gameId);
      let timeLineSerializer = new TypedJSON(MatchTimeLine);
      let matchDetailsSerializer = new TypedJSON(MatchInfo);
      this.matchTimeLine = timeLineSerializer.parse(matchTimeLineJson);
      this.matchInfo = matchDetailsSerializer.parse(matchDetalis);
      this.backgroundColorChanged.next(this.getMatchWinOrLoseColorIndicator())
      this.isMatchInfoLoaded = true;
    }
  }

  getMatchWinOrLoseColorIndicator(): string
  {
      let championId = this.matchReference.champion;
      this.chosenSummoner = this.matchInfo.participants.find(participant => participant.championId == championId);
      let winOrLose = this.matchInfo.teams.find(team => team.teamId == this.chosenSummoner.teamId).win;
      return winOrLose == "Win" ? "green" : "red";
  }
}
