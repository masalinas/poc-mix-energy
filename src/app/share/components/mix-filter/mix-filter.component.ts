import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { TranslateModule}  from "@ngx-translate/core";
import { TranslateService } from "@ngx-translate/core";

import { DropdownModule, Dropdown } from 'primeng/dropdown';
import { RadioButtonModule, RadioButton } from 'primeng/radiobutton';
import { CalendarModule, Calendar} from 'primeng/calendar';

import { MixTranslateService } from '../../services/mix-translate.service';
import { MixModelService } from '../../services/mix-model.service';
import { MixFilter } from '../../../share/models/mix-filter.model';

@Component({
  selector: 'app-mix-filter',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    DropdownModule,
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

  constructor(
    private translateService: TranslateService,
    private mixTranslateService: MixTranslateService,
    private mixModelService: MixModelService) {    
  }

  private getCalendarFormat(dateFormat: string) {
    if (dateFormat == "date") {
      return "dd/mm/yy"; 
    } else if (dateFormat == "month") {
      return "mm/yy"; 
    } else if (dateFormat == "year") {
      return "yy"; 
    } else {
      return "dd/mm/yy"
    }
  }

  private createDropDown(filter: any) {
    const dropdownRef = this.filterContainer.createComponent(Dropdown);

    dropdownRef.instance.name = filter.id;
    dropdownRef.instance.options = this.mixTranslateService.translate(filter.collection);
    dropdownRef.instance.optionLabel = "label";
    dropdownRef.instance.placeholder = filter.placeholder ? this.translateService.instant(filter.placeholder) : this.translateService.instant("SELECCIONE_OPTION");
    dropdownRef.instance.style = {'width': '100%'};
    dropdownRef.instance.onChange.subscribe(() => {
      const value = dropdownRef.instance.value;

      console.log('Selected value:', value);

      this.createWidgetFilter(value);
    });
  }

  private createRadioButtons(filter: any) {
    filter.collection.forEach((item: any) => {
      const radioButtonRef = this.filterContainer.createComponent(RadioButton);

      radioButtonRef.instance.name = filter.id;
      radioButtonRef.instance.value = item;
      radioButtonRef.instance.label = this.translateService.instant(item.label);

      radioButtonRef.instance.onClick.subscribe(() => {
        const value = radioButtonRef.instance.value;

        console.log('Selected value:', value);

        this.createWidgetFilter(value);
      });
    });
  }

  private createCalendar(filter: any) {
    const calendarRef = this.filterContainer.createComponent(Calendar);
    
    calendarRef.instance.name = filter.id;
    calendarRef.instance.view = filter.value;
    calendarRef.instance.dateFormat = this.getCalendarFormat(filter.value);
    calendarRef.instance.showIcon = true;
    calendarRef.instance.readonlyInput = true;
    calendarRef.instance.selectionMode = "range";
    calendarRef.instance.style = {'width': '100%'};
    calendarRef.instance.placeholder = filter.placeholder ? this.translateService.instant(filter.placeholder) : this.translateService.instant('RANGO_TEMPORAL');
    calendarRef.instance.onSelect.subscribe(() => {
        const range = calendarRef.instance.value;

        if (range[1] !== null && range[2] !== null) {
          const [startDate, endDate] = range;
          console.log('Start Date:', startDate);
          console.log('End Date:', endDate);

          this.filterChange.emit(range);
        }
    });
  }

  private createWidgetFilter(filter: any) {
    if (filter.type == "dropdown") {
      this.createDropDown(filter);
    } else if (filter.type == "radio-button") {
      this.createRadioButtons(filter);      
    } else if (filter.type == "calendar") {
      this,this.createCalendar(filter);  
    }
  }

  onLangChange() {      
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['widget'] && changes['widget'].currentValue) {
      // get widget selected
      const widget = this.mixModelService.getWidgetById(changes['widget'].currentValue.id);

      // clear filter components
      this.filterContainer.clear()

      // create filter widget component
      this.createWidgetFilter(widget);      
    }
  }
  
  onClear() {
    this.filterContainer.clear()
  }
}
