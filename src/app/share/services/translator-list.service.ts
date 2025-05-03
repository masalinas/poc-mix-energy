import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TranslatorListService {
  constructor(
    private translate: TranslateService,
    private primengConfig: PrimeNGConfig,
  ) { }


  translator(list: any) {
    let translation  = list.map((item: any) => ({
      label: this.translate.instant(item.label),
      key: item.key
    }));

    return translation;
  }

  setLanguageTranslations() {
    return [
      { name: this.translate.instant('LAN_SPANISH'), code: 'es', icon: 'flag-icon flag-icon-es' },
      { name: this.translate.instant('LAN_ENGLISH'), code: 'en', icon: 'flag-icon flag-icon-gb' }
    ];
  }

  setPrimeNGTranslations() {
    this.translate.get([
      'FILTER_MATCH_ALL',
      'FILTER_MATCH_ANY',
      'FILTER_EQUALS',
      'FILTER_CONTAINS',
      'FILTER_STARTS_WITH',
      'FILTER_ENDS_WITH',
      "FILTER_NOT_EQUALS",
      "FILTER_LESS_THAN",
      "FILTER_LESS_THAN_OR_EQUALS",
      "FILTER_GREATER_THAN",
      "FILTER_GREATER_THAN_OR_EQUALS",
      "FILTER_DATE_IS",
      "FILTER_DATE_IS_NOT",
      "FILTER_DATE_IS_BEFORE",
      "FILTER_DATE_IS_AFTER",      
      'FILTER_APPLY',
      'FILTER_CLEAR',
      'FILTER_CANCEL'
    ]).subscribe(translations => {
      this.primengConfig.setTranslation({
        matchAll: translations['FILTER_MATCH_ALL'],
        matchAny: translations['FILTER_MATCH_ANY'],
        equals: translations['FILTER_EQUALS'],
        contains: translations['FILTER_CONTAINS'],
        startsWith: translations['FILTER_STARTS_WITH'],
        endsWith: translations['FILTER_ENDS_WITH'],
        notEquals: translations['FILTER_NOT_EQUALS'],
        lt: translations['FILTER_LESS_THAN'],
        lte: translations['FILTER_LESS_THAN_OR_EQUALS'],
        gt: translations['FILTER_GREATER_THAN'],
        gte: translations['FILTER_GREATER_THAN_OR_EQUALS'],
        dateIs: translations['FILTER_DATE_IS'],
        dateIsNot: translations['FILTER_DATE_IS_NOT'],
        dateBefore: translations['FILTER_DATE_IS_BEFORE'],
        dateAfter: translations['FILTER_DATE_IS_AFTER'],
        apply: translations['FILTER_APPLY'],
        clear: translations['FILTER_CLEAR'],
        cancel: translations['FILTER_CANCEL'],        
      });
    });
  }
}