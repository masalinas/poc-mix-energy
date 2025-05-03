import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { CommonModule, DecimalPipe, DatePipe, PercentPipe } from '@angular/common';
import { TranslateModule}  from "@ngx-translate/core";
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es'; // Spanish locale

import { TranslateService } from "@ngx-translate/core";

import { PrimeNGConfig } from 'primeng/api';

import { ToastModule } from 'primeng/toast';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { TranslatorListService } from './share/services/translator-list.service';
import { MixService } from './share/services/mix.service';
import { GROUPS, TYPES, TIME_TRUNCS } from './share/enums/mix.pipe';

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
    DecimalPipe,
    DatePipe,
    PercentPipe
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }, // Set default locale to Spanish
    MessageService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loading: boolean = false;  
  
  // app languages
  languages: any[] = [];
  lastLanguageId: number = 0;
  language: any;

  // table mix datasource
  mix: any[] = []

  // table mix filters
  timeTruncs: any[] = [];
  lastTimeTruncId: number = 0;
  timeTrunc: any;
  rangeDates: Date[] = [];

  groups: any[] = [];
  types: any[] = [];

  constructor(
    private translatorListService: TranslatorListService,
    private messageService: MessageService,
    public translate: TranslateService,          
    public primengConfig: PrimeNGConfig,
    public mixService: MixService) { 
      // initialize language from default browser language
      this.translate.addLangs(['es', 'en']);
      this.translate.setDefaultLang('es');
    
      const browserLang = translate.getBrowserLang();
      let lang = browserLang?.match(/en|es/) ? browserLang : 'es';
      this.translate.use(lang);

      // listen for language changes
      this.translate.onLangChange.subscribe(() => {
        this.setLanguageTranslations();
        this.setTranslateLists();
        this.setPrimeNGTranslations();

        // initialize time trunc table filter
        if (this.timeTrunc == undefined)
          this.timeTrunc = this.timeTruncs[1]; 
        else
          this.timeTrunc = this.timeTruncs[this.lastTimeTruncId];

        if (this.language == undefined)
          this.language = this.languages[0];
        else      
          this.language = this.languages[this.lastLanguageId];    
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

  private setLanguageTranslations() {
    this.languages = this.translatorListService.setLanguageTranslations();  
  }

  private setTranslateLists() {
    this.timeTruncs = this.translatorListService.translator(TIME_TRUNCS);    
    this.groups = this.translatorListService.translator(GROUPS);
    this.types = this.translatorListService.translator(TYPES);
  }

  private setPrimeNGTranslations() {
    this.translatorListService.setPrimeNGTranslations();  
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

  onChangeLanguage(lang: any) {
    this.lastLanguageId = this.languages.findIndex((item:any) => item.key == lang.key);
    this.translate.use(lang.code);    
  }

  onTimeTruncChange(timeTrunc: any) {
    this.lastTimeTruncId = this.timeTruncs.findIndex((item:any) => item.key == timeTrunc.key);
  }

  onPercentageInput(value: any, filterCallback: (val: number) => void) {
    const numericValue = Number(value) / 100;
    filterCallback(numericValue);
  }

  onGetMix(event: any) {
    this.loading = true;

    this.mixService.getMixFiltered(
      this.formatDate(this.rangeDates[0]),
      this.formatDate(this.rangeDates[1]),
      this.timeTrunc.key, 
      undefined,
      undefined, 
      undefined)
      .subscribe(mix => {
        this.loading = false;
        //console.log(mix);

        this.mix = mix;
      },
      error => {
        this.mix = [];

        this.loading = false;
        console.error('Error:', error);

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        }
      });
  }

  onClear(table: Table) {
    // clear all filters
    table.clear();

    // initialize table with default filter
    table.sortField = "datetime";
    table.sortSingle();
  }

  onExport(table: Table) {
    // Get only filtered rows (or all if no filter)
    const rows = table.filteredValue ? table.filteredValue : table.value;

    let csv = 'Group,Type,Value,Percentage,Datetime\n';
    for (const row of rows) {
      csv += `${row.group},${row.type},${row.value},${row.percentage},${row.datetime}\n`;
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
}
