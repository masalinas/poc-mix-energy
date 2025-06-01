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
import { WidgetFilter } from '../../../share/models/mix-filter.model';

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
  @Output() filterChange = new EventEmitter<WidgetFilter[]>();  

  @ViewChild('filterContainer', { read: ViewContainerRef })
  filterContainer!: ViewContainerRef;

  componentRefs: any[] = [];
  widgetFilters: WidgetFilter[] = [];
  lastWidgetFilterLevel: number = 0;

  constructor(
    private translateService: TranslateService,
    private mixTranslateService: MixTranslateService,
    private mixModelService: MixModelService) {    
  }

  private removeChildFilterWidgetsRef(filterWidgetRef: any) {
    // remove all child componentRef
    this.componentRefs.forEach(componentRef => {
      if(componentRef.instance.tabindex > filterWidgetRef.instance.tabindex) {
        const index = this.filterContainer.indexOf(componentRef.hostView);

        if (index !== -1) {
          this.filterContainer.remove(index);
          this.lastWidgetFilterLevel--;
        }
      }
    });

    this.componentRefs = this.componentRefs.filter(componentRef => componentRef.instance.tabindex <= filterWidgetRef.instance.tabindex);

    // remove all child widget filters
    this.widgetFilters = this.widgetFilters.filter(widgetFilter => widgetFilter.level <= filterWidgetRef.instance.tabindex);
  }

 private getCalendarView(view: string) {
    if (view == "day") {
      return "date"; 
    } else if (view == "month") {
      return "month"; 
    } else if (view == "year") {
      return "year"; 
    } else {
      return "date"
    }
  }

  private getCalendarFormat(dateFormat: string) {
    if (dateFormat == "day") {
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
    dropdownRef.instance.tabindex = this.lastWidgetFilterLevel;
    dropdownRef.instance.options = this.mixTranslateService.translate(widget.collection);
    dropdownRef.instance.optionLabel = "label";
    dropdownRef.instance.placeholder = widget.placeholder ? this.translateService.instant(widget.placeholder) : this.translateService.instant("SELECCIONE_OPTION");
    dropdownRef.instance.style = {'width': '100%'};
    dropdownRef.instance.onChange.subscribe(() => {
      const widget = dropdownRef.instance.value;

      // remove child components
      this.removeChildFilterWidgetsRef(dropdownRef);

      this.widgetFilters.push({
        id: widget.id,
        level: this.lastWidgetFilterLevel,
        filterId: widget.filterId,
        value: widget.id
      });

      this.createFilterWidget(widget);  
    });

    // add filter widget
    this.componentRefs.push(dropdownRef);
    this.lastWidgetFilterLevel++;    
  }

  private createRadioButtonsFilterWidget(widget: any) {
    widget.collection.forEach((item: any) => {
      const radioButtonRef = this.filterContainer.createComponent(RadioButton);

      radioButtonRef.instance.name = widget.id;
      radioButtonRef.instance.tabindex = this.lastWidgetFilterLevel;
      radioButtonRef.instance.value = item;
      radioButtonRef.instance.label = this.translateService.instant(item.label);

      radioButtonRef.instance.onClick.subscribe(() => {
        const widget = radioButtonRef.instance.value;

        // remove child components
        this.removeChildFilterWidgetsRef(radioButtonRef);

        this.widgetFilters.push({
          id: widget.id,
          level: this.lastWidgetFilterLevel,
          filterId: widget.filterId,
          value: widget.id
        });

        this.createFilterWidget(widget);
      });

      // add filter widget
      this.componentRefs.push(radioButtonRef);
      this.lastWidgetFilterLevel++;   
    });
  }

  private createCalendarFilterWidget(widget: any) {
    const calendarRef = this.filterContainer.createComponent(Calendar);
    
    calendarRef.instance.name = widget.id;
    calendarRef.instance.tabindex = this.lastWidgetFilterLevel;
    calendarRef.instance.view = this.getCalendarView(widget.value);
    calendarRef.instance.dateFormat = this.getCalendarFormat(widget.value);
    calendarRef.instance.showIcon = true;
    calendarRef.instance.readonlyInput = true;
    calendarRef.instance.selectionMode = "range";
    calendarRef.instance.style = {'width': '100%'};
    calendarRef.instance.placeholder = widget.placeholder ? this.translateService.instant(widget.placeholder) : this.translateService.instant('RANGO_TEMPORAL');
    calendarRef.instance.onSelect.subscribe(() => {
        const widget = calendarRef.instance.value;

        // remove child components
        this.removeChildFilterWidgetsRef(calendarRef);

        if (widget[0] !== null && widget[1] !== null) {
          this.widgetFilters.push({
            id: 'start_date',
            level: this.lastWidgetFilterLevel,
            filterId: 'start_date',
            value: widget[0]
          });
        
          this.widgetFilters.push({
            id: 'end_date',
            level: this.lastWidgetFilterLevel,
            filterId: 'end_date',
            value: widget[1]
          });

          this.filterChange.emit(this.widgetFilters);          
        }
    });

    // add filter widget
    this.componentRefs.push(calendarRef);
    this.lastWidgetFilterLevel++;       
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
    this.componentRefs = [];
    this.widgetFilters = [];
    this.lastWidgetFilterLevel = 0;    
    this.filterContainer.clear()    
  }
}
