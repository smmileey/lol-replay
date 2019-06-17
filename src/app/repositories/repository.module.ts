import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestDataSource } from './rest.datasource';
import { HttpModule } from '@angular/http';
import { MatchRepository } from './match.repository';
import { AssetsRepository } from './assets.repostiory';
import { DataDragonRepository } from './ddragon.repository';

@NgModule({
  declarations: [],
  imports: [
    HttpModule,
    CommonModule
  ],
  providers: [RestDataSource, MatchRepository, AssetsRepository, DataDragonRepository]
})
export class RepositoryModule { }
