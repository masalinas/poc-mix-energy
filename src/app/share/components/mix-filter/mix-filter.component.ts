import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'

import { TranslateModule}  from "@ngx-translate/core";
import { TranslateService } from "@ngx-translate/core";

import { ButtonModule } from 'primeng/button';
import { DropdownModule, Dropdown } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule, CalendarTypeView, Calendar} from 'primeng/calendar';
import { RadioButtonModule, RadioButton } from 'primeng/radiobutton';

import { MixTranslateService } from '../../services/mix-translate.service';
import { GEO_TYPES, TIME_TRUNCS, GEO_LIMITS, TECHNOLOGIES } from '../../models/mix-domain.model';

import { MixFilter } from '../../../share/models/mix-filter.model';
import { MixModelService } from '../../services/mix-model.service';

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
export class MixFilterComponent implements OnChanges {
  @Input() widget: any;
  @Output() filterChange = new EventEmitter<MixFilter>();  

  @ViewChild('filterContainer', { read: ViewContainerRef })
  filterContainer!: ViewContainerRef;

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
  timeTruncsByGeoType: any[] = [];
  lastTimeTruncId: number = 0;
  timeTrunc: any;

  calendarView: CalendarTypeView = "date";
  calendarDateFormat: string = "dd-mm-yy";
  rangeDates: Date[] = [];

  mixFilter: MixFilter = {};

  constructor(
    private translateService: TranslateService,
    private mixTranslateService: MixTranslateService,
    private mixModelService: MixModelService) {    
  }

  private getElectricSystems() {
    return GEO_LIMITS.filter(geoLimit => geoLimit.id !== "ccaa");
  }

  private getAutonomousCommunities() {
    return GEO_LIMITS.filter(geoLimit => geoLimit.id == "ccaa")[0].regions;         
  }

  private setTranslateLists() {
    this.geoTypes = this.mixTranslateService.translateByGroup("GEO_TYPE", GEO_TYPES);
    this.timeTruncs = this.mixTranslateService.translateByGroup("TIME_TRUNC", TIME_TRUNCS);
    this.systemElectrics = this.mixTranslateService.translateByGroup("GEO_LIMIT", this.getElectricSystems());
    this.counties = this.getAutonomousCommunities();
    this.technologies = this.mixTranslateService.translateByGroup("TECHNOLOGY", TECHNOLOGIES);

    this.selectedGeoType = this.geoTypes[0];
  }

  private getCalendarView(dateFormat: string) {
    if (dateFormat == "date") {
      return "dd/mm/yy"; 
    } else if (this.timeTrunc.id == "month") {
      return "mm/yy"; 
    } else if (this.timeTrunc.id == "year") {
      return "yy"; 
    } else {
      return "dd/mm/yy"
    }
  }

  private createDropDown(filter: any) {
    const dropdownRef = this.filterContainer.createComponent(Dropdown);

    dropdownRef.instance.name = filter.id;
    dropdownRef.instance.options = filter.collection;
    dropdownRef.instance.optionLabel = "label";
    dropdownRef.instance.placeholder = this.translateService.instant(filter.placeholder);
    dropdownRef.instance.onChange.subscribe(item => {
      console.log('Selected value:', item.value);

      this.createFilter(item.value);
    });
  }

  private createRadioButtons(filter: any) {
    filter.collection.forEach((item: any) => {
      const radioButtonRef = this.filterContainer.createComponent(RadioButton);

      radioButtonRef.instance.name = item.id;
      radioButtonRef.instance.value = item.id;            
      radioButtonRef.instance.label = item.label;
      radioButtonRef.instance.onClick.subscribe(item => {
        console.log('Selected value:', item.value);

        this.createFilter(item.value);
      });
    });
  }

  private createCalendar(filter: any) {
    const calendaRef = this.filterContainer.createComponent(Calendar);
    
    calendaRef.instance.name = filter.id;
    calendaRef.instance.view = filter.value;
    calendaRef.instance.dateFormat = this.getCalendarView(filter.value);
    calendaRef.instance.showIcon = true;
    calendaRef.instance.readonlyInput = true;
    calendaRef.instance.selectionMode = "range";
    calendaRef.instance.style = {'width': '100%'};
    calendaRef.instance.placeholder = this.translateService.instant('TABLE_FILTERS.SELECT_INTERVAL');
    calendaRef.instance.onSelect.subscribe(value => {
        console.log('Selected value:', value);

        this.createFilter(value);
    });
  }

  private createFilter(filter: any) {
    if (filter.type == "dropdown") {
      this.createDropDown(filter);
    } else if (filter.type == "radio-button") {
      this.createRadioButtons(filter);      
    } else if (filter.type == "calendar") {
      this,this.createCalendar(filter);  
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['widget']) {
      if (changes['widget'].currentValue) {
        // get widget selected
        const widget = this.mixModelService.getWidgetById(changes['widget'].currentValue.id)[0];

        // clear filter components
        this.filterContainer.clear()

        // create filter component
        this.createFilter(widget);
      }
    }
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

  onGeoTypeChange(event: any) {
    if (event.value.id == "sistema_electrico") {
      this.timeTruncsByGeoType = this.timeTruncs;

    } else if (event.value.id == "comunidades_autonomas") {
      this.timeTruncsByGeoType = this.timeTruncs.filter(timeTrunc => timeTrunc.id !== "day");
    }
  }

  onElectricSystemChange(systemElectric: any) {
    this.lastSystemElectricId = this.systemElectrics.findIndex((item:any) => item.id == systemElectric.id);

    this.mixFilter.systemElectricId = systemElectric.id;

    this.filterChange.emit(this.mixFilter);
  }

  onAutonomousCommunityChange(county: any) {
    this.lastCountyId = this.counties.findIndex((item:any) => item.id == county.id);

    this.mixFilter.countyId = county.id;

    this.filterChange.emit(this.mixFilter);
  }

  onTimeTruncChange(timeTrunc: any) {
    if (this.timeTrunc.id == "day") {
      this.calendarView="date";
      this.calendarDateFormat="dd/mm/yy"; 
    } else if (this.timeTrunc.id == "month") {
      this.calendarView="month";
      this.calendarDateFormat="mm/yy"; 
    } else if (this.timeTrunc.id == "year") {
      this.calendarView="year";
      this.calendarDateFormat="yy"; 
    }

    this.lastTimeTruncId = this.timeTruncs.findIndex((item:any) => item.id == timeTrunc.id);

    this.mixFilter.timeTruncId = timeTrunc.id;

    this.filterChange.emit(this.mixFilter);
  }
    
  onRangeDatesChange(rangeDates: any) {
    this.mixFilter.rangeDates = rangeDates;

    if (rangeDates[0] !== null && rangeDates[1] !== null) {
      this.filterChange.emit(this.mixFilter);
    }
  }

  onTechnologyChange(technology: any) {
    this.lastTechnologyId = this.technologies.findIndex((item:any) => item.id == technology.id);

    this.mixFilter.technologyId = technology.id;

    this.filterChange.emit(this.mixFilter);
  }

  onClear() {
    this.selectedGeoType = this.geoTypes[0];
    this.systemElectric = null;
    this.county = null;
    this.technology = null;
    this.rangeDates = [];
    this.timeTrunc = null;

    this.mixFilter = {};
  }
}
