import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatchRepository } from '../repositories/match.repository';
import { MatchReference } from '../model/match.reference';
import { MatchInfo } from '../model/match.info';
import { MatchTimeLine } from '../model/match.timeline';
import { Participant } from '../model/participant';

const GreenColor = "green";
const RedColor = "red";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  isMatchInfoLoaded;
  collapsed;
  matchTimeLine: MatchTimeLine;
  matchInfo: MatchInfo;
  chosenSummoner: Participant;

  private readonly VictoryIndicator = "Win";

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

      this.matchTimeLine = await this.matchRepository.getMatchTimeLineInfo(this.server, this.matchReference.gameId);
      this.matchInfo = await this.matchRepository.getMatchInfo(this.server, this.matchReference.gameId);
      this.backgroundColorChanged.next(this.getMatchWinOrLoseColorIndicator())
      
      this.isMatchInfoLoaded = true;
    }
  }

  getMatchWinOrLoseColorIndicator(): string
  {
      let championId = this.matchReference.champion;
      this.chosenSummoner = this.matchInfo.participants.find(participant => participant.championId == championId);
      let winOrLose = this.matchInfo.teams.find(team => team.teamId == this.chosenSummoner.teamId).win;
      return winOrLose == this.VictoryIndicator ? GreenColor : RedColor;
  }
}
