import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MixTranslateService {
  constructor(
    private translateService: TranslateService,
    private primengConfig: PrimeNGConfig,
  ) { }

  translate(list: any) {
    return list.map((item: any) => (
       { ...item, label: this.translateService.instant(item.label) }
    ));
  }

  translateByGroup(group: string, list: any) {
    let translation  = list.map((item: any) => ({
      label: this.translateService.instant(group + "." + item.label),
      id: item.id,
      description: item.description
    }));

    return translation;
  }

  translateLanguages() {
    return [
      { id:'LAN_SPANISH', label: this.translateService.instant('LAN_SPANISH'), code: 'es', icon: 'flag-icon flag-icon-es' },
      { id:'LAN_ENGLISH', label: this.translateService.instant('LAN_ENGLISH'), code: 'en', icon: 'flag-icon flag-icon-gb' }
    ];
  }

  translatePrimeNG() {
    this.translateService.get([
      'FILTER_TABLES.FILTER_MATCH_ALL',
      'FILTER_TABLES.FILTER_MATCH_ANY',
      'FILTER_TABLES.FILTER_EQUALS',
      'FILTER_TABLES.FILTER_CONTAINS',
      'FILTER_TABLES.FILTER_STARTS_WITH',
      'FILTER_TABLES.FILTER_ENDS_WITH',
      'FILTER_TABLES.FILTER_NOT_EQUALS',
      'FILTER_TABLES.FILTER_LESS_THAN',
      'FILTER_TABLES.FILTER_LESS_THAN_OR_EQUALS',
      'FILTER_TABLES.FILTER_GREATER_THAN',
      'FILTER_TABLES.FILTER_GREATER_THAN_OR_EQUALS',
      'FILTER_TABLES.FILTER_DATE_IS',
      'FILTER_TABLES.FILTER_DATE_IS_NOT',
      'FILTER_TABLES.FILTER_DATE_IS_BEFORE',
      'FILTER_TABLES.FILTER_DATE_IS_AFTER',      
      'FILTER_TABLES.FILTER_APPLY',
      'FILTER_TABLES.FILTER_CLEAR',
      'FILTER_TABLES.FILTER_CANCEL'
    ]).subscribe(translations => {
      this.primengConfig.setTranslation({
        matchAll: translations['FILTER_TABLES.FILTER_MATCH_ALL'],
        matchAny: translations['FILTER_TABLES.FILTER_MATCH_ANY'],
        equals: translations['FILTER_TABLES.FILTER_EQUALS'],
        contains: translations['FILTER_TABLES.FILTER_CONTAINS'],
        startsWith: translations['FILTER_TABLES.FILTER_STARTS_WITH'],
        endsWith: translations['FILTER_TABLES.FILTER_ENDS_WITH'],
        notEquals: translations['FILTER_TABLES.FILTER_NOT_EQUALS'],
        lt: translations['FILTER_TABLES.FILTER_LESS_THAN'],
        lte: translations['FILTER_TABLES.FILTER_LESS_THAN_OR_EQUALS'],
        gt: translations['FILTER_TABLES.FILTER_GREATER_THAN'],
        gte: translations['FILTER_TABLES.FILTER_GREATER_THAN_OR_EQUALS'],
        dateIs: translations['FILTER_TABLES.FILTER_DATE_IS'],
        dateIsNot: translations['FILTER_TABLES.FILTER_DATE_IS_NOT'],
        dateBefore: translations['FILTER_TABLES.FILTER_DATE_IS_BEFORE'],
        dateAfter: translations['FILTER_TABLES.FILTER_DATE_IS_AFTER'],
        apply: translations['FILTER_TABLES.FILTER_APPLY'],
        clear: translations['FILTER_TABLES.FILTER_CLEAR'],
        cancel: translations['FILTER_TABLES.FILTER_CANCEL'],        
      });
    });
  }
}