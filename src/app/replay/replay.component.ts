import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatchRepository } from '../repositories/match.repository';
import { MatchComponent } from '../match/match.component';
import { MatchList } from '../model/match/match.list';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.css']
})
export class ReplayComponent implements OnInit {

  @ViewChildren(MatchComponent) 
  childrenMatchComponents: QueryList<MatchComponent>;
  
  matchInfoLoading ;
  showMatchInfo;
  server = 'EUN1'; //todo: load from configuration file
  summonerName = 'ColSerrai'; //todo: load from configuration file
  matchList: MatchList = new MatchList();

  private readonly MaxMatchesNumber = 10;

  constructor(private matchRepository: MatchRepository) 
  { 
  }

  ngOnInit() {
  }

  async findMatches(server: string, summonerName: string)
  {
      this.showMatchInfo = true;
      this.matchInfoLoading = true;
      await this.matchRepository
      .findMatches(server, summonerName)
      .then(
        matchesFound => {
          this.matchList.matches = matchesFound.matches.slice(0, this.MaxMatchesNumber);
          this.matchInfoLoading = false;
        }
      )
  }

  getMatchDetails(index: number)
  {
      this.childrenMatchComponents.toArray()[index].getMatchDetails();
  }
}
