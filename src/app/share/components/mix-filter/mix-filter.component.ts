import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'

import { TranslateModule}  from "@ngx-translate/core";
import { TranslateService } from "@ngx-translate/core";

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';

import { TranslatorListService } from '../../services/translator-list.service';
import { GEO_TYPES, TIME_TRUNCS, GEO_LIMITS, TECHNOLOGIES } from '../../enums/mix.enum';

import { MixFilter } from '../../../share/models/mix-filter.model';

@Component({
  selector: 'app-mix-filter',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    RadioButtonModule,
  ],
  templateUrl: './mix-filter.component.html',
  styleUrl: './mix-filter.component.scss'
})
export class MixFilterComponent {
  @Input() category: string = '';
  @Input() widget: string = '';

  @Output() filterChange = new EventEmitter<MixFilter>();  

  tecnoSelect: any;

  geoTypes:  any[] = [];
  geoType: any;
  selectedGeoType: any = null;

  systemElectrics: any[] = [];
  lastSystemElectricId: number = 0;
  systemElectric: any = null;

  counties: any[] = [];
  lastCountyId: number = 0;
  county: any = null;

  technologies: any[] = [];
  lastTechnologyId: number = 0;
  technology: any = null;

  timeTruncs: any[] = [];
  lastTimeTruncId: number = 0;
  timeTrunc: any;

  rangeDates: Date[] = [];

  mixFilter: MixFilter = {};

  constructor(
    private translatorListService: TranslatorListService,
    public translate: TranslateService) {    
  }

  private getElectricSystems() {
    return GEO_LIMITS.filter(geoLimit => geoLimit.key !== "ccaa");
  }

  private getAutonomousCommunities() {
    return GEO_LIMITS.filter(geoLimit => geoLimit.key == "ccaa")[0].regions;         
  }

  private setTranslateLists() {
    this.geoTypes = this.translatorListService.translatorByGroup("GEO_TYPE", GEO_TYPES);
    this.timeTruncs = this.translatorListService.translatorByGroup("TIME_TRUNC", TIME_TRUNCS);
    this.systemElectrics = this.translatorListService.translatorByGroup("GEO_LIMIT", this.getElectricSystems());
    this.counties = this.getAutonomousCommunities();
    this.technologies = this.translatorListService.translatorByGroup("TECHNOLOGY", TECHNOLOGIES);

    this.selectedGeoType = this.geoTypes[0];
  }

  onLangChange() {
    this.setTranslateLists();

    if (this.timeTrunc != undefined)
      this.timeTrunc = this.timeTruncs[this.lastTimeTruncId];  

    if (this.systemElectric != undefined)
      this.systemElectric = this.systemElectrics[this.lastSystemElectricId];

    if (this.county != undefined)
      this.county = this.counties[this.lastCountyId];

    if (this.technology != undefined)
      this.technology = this.technologies[this.lastTechnologyId];        
  }

  onElectricSystemChange(systemElectric: any) {
    this.lastSystemElectricId = this.systemElectrics.findIndex((item:any) => item.key == systemElectric.key);

    this.mixFilter.systemElectricId = systemElectric.key;

    this.filterChange.emit(this.mixFilter);
  }

  onAutonomousCommunityChange(county: any) {
    this.lastCountyId = this.counties.findIndex((item:any) => item.key == county.key);

    this.mixFilter.countyId = county.key;

    this.filterChange.emit(this.mixFilter);
  }

  onTimeTruncChange(timeTrunc: any) {
    this.lastTimeTruncId = this.timeTruncs.findIndex((item:any) => item.key == timeTrunc.key);

    this.mixFilter.timeTruncId = timeTrunc.key;

    this.filterChange.emit(this.mixFilter);
  }
    
  onRangeDatesChange(rangeDates: any) {
    this.mixFilter.rangeDates = rangeDates;

    if (rangeDates[0] !== null && rangeDates[1] !== null) {
      this.filterChange.emit(this.mixFilter);
    }
  }

  onTechnologyChange(technology: any) {
    this.lastTechnologyId = this.technologies.findIndex((item:any) => item.key == technology.key);

    this.mixFilter.technologyId = technology.key;

    this.filterChange.emit(this.mixFilter);
  }

  onClear() {
    this.selectedGeoType = this.geoTypes[0];
    this.systemElectric = null;
    this.county = null;
    this.technology = null;
    this.rangeDates = [];
    this.timeTrunc = null;
    this.tecnoSelect = null;

    this.mixFilter = {};
  }
}
