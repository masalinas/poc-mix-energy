import { AfterViewInit, Component, ElementRef, HostListener, LOCALE_ID, ViewChild } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe, PercentPipe, registerLocaleData } from '@angular/common';
import { FormsModule} from '@angular/forms'
import localeEs from '@angular/common/locales/es';

import { TranslateModule}  from "@ngx-translate/core";
import { TranslateService } from "@ngx-translate/core";

import { ToastModule } from 'primeng/toast';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { MixTranslateService } from './share/services/mix-translate.service';
import { MixModelService } from './share/services/mix-model.service';
import { MixApiService } from './share/services/mix-api.service';

import { MixFilterComponent } from './share/components/mix-filter/mix-filter.component';
import { WidgetFilter } from './share/models/mix-filter.model';

// Register the Spanish locale
registerLocaleData(localeEs);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ToastModule,
    ButtonGroupModule,
    ButtonModule,
    TableModule,
    TagModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    CalendarModule,
    TooltipModule,
    PanelModule,
    FieldsetModule,
    DecimalPipe,
    DatePipe,
    PercentPipe,
    MixFilterComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }, // Set default locale to Spanish
    MessageService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('tableContent')
  tableContent!: ElementRef;

  @ViewChild('mixFilter')
  mixFilterComponent!: MixFilterComponent;  

  loading: boolean = false;  
  scrollHeight: string = "flex";

  // app languages
  languages: any[] = [];
  lastLanguageId: number = 0;
  language: any;

  // table selectors filters
  categories: any[] = [];
  category: any;
  lastCategoryId: number = 0;
  categorySelected: any;
  widgets: any[] = [];
  widget: any;
  lastWidgetId: number = 0;
  widgetTooltip!: string;

  // table mix datasource
  widgetFilters: WidgetFilter[] = [];
  mix: any[] = []

  technologies: any[] = [];
  types: any[] = [];

  constructor(
    private mixTranslateService: MixTranslateService,
    private messageService: MessageService,
    public translate: TranslateService,          
    public primengConfig: PrimeNGConfig,
    public mixApiService: MixApiService,
    private mixModelService: MixModelService) { 
      // initialize language from default browser language
      this.translate.addLangs(['es', 'en']);
      this.translate.setDefaultLang('es');
    
      const browserLang = translate.getBrowserLang();
      let lang = browserLang?.match(/en|es/) ? browserLang : 'es';
      this.translate.use(lang);

      // listen for language changes
      this.translate.onLangChange.subscribe(() => {
        // translate app and table lists
        this.setLanguageTranslations();
        this.setTranslateLists();
        this.setPrimeNGTranslations();

        // set app and table localized selectors and filters
        if (this.language == undefined)
          this.language = this.languages[0];
        else      
          this.language = this.languages[this.lastLanguageId];    
          
        if (this.category != undefined)
          this.category = this.categories[this.lastCategoryId];  

        if (this.widget != undefined)
          this.widget = this.widgets[this.lastWidgetId];

        this.mixFilterComponent.onLangChange();

        // initialize category
        //this.category = this.categories[0];
        //this.onChangeCategory(this.category);
      });

      // Set PrimeNG locale to Spanish
      this.primengConfig.setTranslation({
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        // Additional translations for PrimeNG components if needed
      });
  }

  // Recalculate on window resize
  @HostListener('window:resize')
  onResize() {
    this.ngAfterViewInit();
  }
    
  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollHeight = (this.tableContent.nativeElement.offsetHeight - 80) + 'px'
    });
  }

  private setLanguageTranslations() {
    this.languages = this.mixTranslateService.translateLanguages();  
  }

  private setTranslateLists() {
    this.categories = this.mixTranslateService.translateByGroup("CATEGORY", this.mixModelService.getCategories());
    if (this.categorySelected)
      this.widgets = this.mixTranslateService.translateByGroup(this.categorySelected.id.toUpperCase(), this.mixModelService.getWidgetsByCategoryId(this.categorySelected.id));
    this.technologies = this.mixTranslateService.translateByGroup("TECHNOLOGY", this.mixModelService.getTechnologies());
    this.types = this.mixTranslateService.translateByGroup("TYPE", this.mixModelService.getTypes());   
  }

  private setPrimeNGTranslations() {
    this.mixTranslateService.translatePrimeNG();  
  }

  private formatDate(date: any) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${day}-${month}-${year}T${hours}:${minutes}`;
  }

  isStatusValidGetMix() : boolean {
    if (this.category && this.widget && this.widgetFilters.length > 0)        
      return false;
    
    return true;
  }

  onChangeLanguage(lang: any) {
    this.lastLanguageId = this.languages.findIndex((item: any) => item.id == lang.id);
    this.translate.use(lang.code);    
  }

  onChangeCategory(category: any) {
    this.categorySelected = category;
    this.widgets = this.mixTranslateService.translate(this.mixModelService.getWidgetsByCategoryId(category.id));

    this.lastCategoryId = this.categories.findIndex((item: any) => item.id == category.id);
  }

  onChangeWidget(widget: any) {
    this.lastWidgetId = this.widgets.findIndex((item: any) => item.id == widget.id);

    if (this.widget.description) {
      this.widgetTooltip = this.translate.instant(this.widget.description);
    }
  }

  onPercentageInput(value: any, filterCallback: (val: number) => void) {
    const numericValue = Number(value) / 100;
    filterCallback(numericValue);
  }

  onFilterChange(WidgetFilters: WidgetFilter[]) {  
    this.widgetFilters = WidgetFilters;

    this.isStatusValidGetMix();
  }

  onGetApiMix(event: any) {
    console.log("Category id: " + this.category.id);  
    console.log("Widget id: " + this.widget.id); 
    console.log("Widget Filters:");
    console.log(this.widgetFilters);

    /*this.loading = true;

    this.mixApiService.getMixFiltered(
      this.category.id,
      this.widget.id,
      this.formatDate(this.mixFilter.rangeDates![0]),
      this.formatDate(this.mixFilter.rangeDates![1]),
      this.mixFilter.timeTruncId,
      undefined,
      this.mixFilter.geoLimitId,
      undefined)
      .subscribe(mix => {
        this.loading = false;

        this.mix = mix;
      },
      error => {
        this.mix = [];

        this.loading = false;
        console.error('Error:', error);

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        }
      }
    );*/
  }

  onClear(table: Table) {
    // clear all table filters
    table.clear();

    // initialize filters and data
    this.mix = [];
    this.category = null;
    this.widget = null;
    this.mixFilterComponent.onClear();

    // initialize table with default filter
    table.sortField = "datetime";
    table.sortSingle();
  }

  onExport(table: Table) {
    // Get only filtered rows (or all if no filter)
    const rows = table.filteredValue ? table.filteredValue : table.value;

    let csv = 'Technologia,Tipo,Valor,Percentage,Fecha\n';
    for (const row of rows) {
      csv += `${row.technology},${row.type},${row.value},${row.percentage},${row.datetime}\n`;
    }
  
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File Exported' });
  }

  onSendEmail() {
    window.open('mailto:masalinas.gancedo@gmail.com', '_self');
  }

  onGetCode() {
    window.open('https://github.com/masalinas/poc-mix-energy', '_blank');
  }
}
