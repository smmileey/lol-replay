import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatchRepository } from '../repositories/match.repository';
import { MatchList } from '../model/match.list';
import { TypedJSON } from 'typedjson';
import { MatchComponent } from '../match/match.component';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.css']
})
export class ReplayComponent implements OnInit {

  @ViewChildren(MatchComponent) 
  children: QueryList<MatchComponent>;
  
  matchInfoLoading = false;
  showMatchInfo = false;
  server = 'EUN1';
  summonerName = 'ColSerrai';
  matchList: MatchList = new MatchList();

  constructor(private matchRepository: MatchRepository) 
  { 
  }

  ngOnInit() {
  }

  findMatches(server: string, summonerName: string)
  {
      this.showMatchInfo = true;
      this.matchInfoLoading = true;
      this.matchRepository
      .findMatches(server, summonerName)
      .then(
        matchData => {
          let serializer = new TypedJSON(MatchList);
          this.matchList = serializer.parse(matchData);
          this.matchList.matches = this.matchList.matches.slice(0, 5);
          this.matchInfoLoading = false;
        }
      )
  }

  getMatchDetails(index: number)
  {
      this.children.toArray()[index].getMatchDetails();
  }
}
