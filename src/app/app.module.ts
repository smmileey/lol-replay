import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReplayComponent } from './replay/replay.component';
import { MatchComponent } from './match/match.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RepositoryModule } from './repositories/repository.module';
import { PrettyJsonPipe } from './pretty-json.pipe';
import {} from 'typedjson';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { EventDisplayComponent } from './event-display/event-display.component'
import { MaterialModule } from './material.module';
import { ChampionInfoProvider } from './providers/champion.info.provider';
import { ChampionIdToChampionNameMap } from './model/champion/champion.id.to.name.map';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReplayComponent,
    MatchComponent,
    PrettyJsonPipe,
    MatchDetailsComponent,
    EventDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RepositoryModule,
    AngularFontAwesomeModule,
    MaterialModule,
    BsDropdownModule.forRoot()
  ],
  providers: [ChampionIdToChampionNameMap, ChampionInfoProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
