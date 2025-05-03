import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorListService {
  constructor(private translate: TranslateService) { }

  translator(list: any) {
    let translation  = list.map((item: any) => ({
      label: this.translate.instant(item.label),
      key: item.key
    }));

    return translation;
  }
}