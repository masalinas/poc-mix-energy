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
    RadioButtonModule,    
    CalendarModule,
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

  private createDropDownFilterWidget(widget: any) {
    const dropdownRef = this.filterContainer.createComponent(Dropdown);

    dropdownRef.instance.name = widget.id;
    dropdownRef.instance.options = this.mixTranslateService.translate(widget.collection);
    dropdownRef.instance.optionLabel = "label";
    dropdownRef.instance.placeholder = widget.placeholder ? this.translateService.instant(widget.placeholder) : this.translateService.instant("SELECCIONE_OPTION");
    dropdownRef.instance.style = {'width': '100%'};
    dropdownRef.instance.onChange.subscribe(() => {
      const value = dropdownRef.instance.value;

      console.log('Selected value:', value);

      this.createFilterWidget(value);
    });
  }

  private createRadioButtonsFilterWidget(widget: any) {
    widget.collection.forEach((item: any) => {
      const radioButtonRef = this.filterContainer.createComponent(RadioButton);

      radioButtonRef.instance.name = widget.id;
      radioButtonRef.instance.value = item;
      radioButtonRef.instance.label = this.translateService.instant(item.label);

      radioButtonRef.instance.onClick.subscribe(() => {
        const value = radioButtonRef.instance.value;

        console.log('Selected value:', value);

        this.createFilterWidget(value);
      });
    });
  }

  private createCalendarFilterWidget(widget: any) {
    const calendarRef = this.filterContainer.createComponent(Calendar);
    
    calendarRef.instance.name = widget.id;
    calendarRef.instance.view = widget.value;
    calendarRef.instance.dateFormat = this.getCalendarFormat(widget.value);
    calendarRef.instance.showIcon = true;
    calendarRef.instance.readonlyInput = true;
    calendarRef.instance.selectionMode = "range";
    calendarRef.instance.style = {'width': '100%'};
    calendarRef.instance.placeholder = widget.placeholder ? this.translateService.instant(widget.placeholder) : this.translateService.instant('RANGO_TEMPORAL');
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

  private createFilterWidget(widget: any) {
    if (widget.type == "dropdown") {
      this.createDropDownFilterWidget(widget);
    } else if (widget.type == "radio-button") {
      this.createRadioButtonsFilterWidget(widget);      
    } else if (widget.type == "calendar") {
      this,this.createCalendarFilterWidget(widget);  
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
      this.createFilterWidget(widget);      
    }
  }
  
  onClear() {
    this.filterContainer.clear()
  }
}
