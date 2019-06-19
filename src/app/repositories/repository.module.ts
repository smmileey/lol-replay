import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestDataSource } from './rest.datasource';
import { MatchRepository } from './match.repository';
import { AssetsRepository } from './assets.repostiory';
import { DataDragonRepository } from './ddragon.repository';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [RestDataSource, MatchRepository, AssetsRepository, DataDragonRepository]
})
export class RepositoryModule { }
