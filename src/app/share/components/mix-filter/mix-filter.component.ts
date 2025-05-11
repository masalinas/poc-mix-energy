import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'

import { TranslateModule}  from "@ngx-translate/core";
import { TranslateService } from "@ngx-translate/core";

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

import { TranslatorListService } from '../../services/translator-list.service';
import { TIME_TRUNCS, GEO_LIMITS } from '../../enums/mix.enum';

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
  ],
  templateUrl: './mix-filter.component.html',
  styleUrl: './mix-filter.component.scss'
})
export class MixFilterComponent {
  @Input() category: string = '';
  @Input() widget: string = '';

  @Output() filterChange = new EventEmitter<MixFilter>();  

  tecnoSelect: any;

  geoLimits: any[] = [];
  lastGeoLimitId: number = 0;
  geoLimit: any;

  timeTruncs: any[] = [];
  lastTimeTruncId: number = 0;
  timeTrunc: any;

  rangeDates: Date[] = [];

  mixFilter: MixFilter = {};

  constructor(
    private translatorListService: TranslatorListService,
    public translate: TranslateService) {    
  }

  private setTranslateLists() {
    this.timeTruncs = this.translatorListService.translatorByGroup("TIME_TRUNC", TIME_TRUNCS);
    this.geoLimits = this.translatorListService.translatorByGroup("GEO_LIMIT", GEO_LIMITS);    
  }

  onLangChange() {
    this.setTranslateLists();

    if (this.timeTrunc != undefined)
      this.timeTrunc = this.timeTruncs[this.lastTimeTruncId];  

    if (this.geoLimit != undefined)
      this.geoLimit = this.geoLimits[this.lastGeoLimitId];
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

  onClear() {
    this.geoLimit = null;
    this.rangeDates = [];
    this.timeTrunc = null;
    this.tecnoSelect = null;

    this.mixFilter = {};
  }
}
