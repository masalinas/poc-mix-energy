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
        apply: translations['FILTER_APPLY'],
        clear: translations['FILTER_CLEAR'],
        cancel: translations['FILTER_CANCEL'],        
      });
    });
  }
}