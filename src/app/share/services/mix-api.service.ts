import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { mergeMap, toArray } from 'rxjs/operators';

import { WidgetFilter } from '../../share/models/mix-filter.model';

@Injectable({
  providedIn: 'root'
})
export class MixApiService {
  constructor(private http: HttpClient) { }

  getMixFiltered(
        categoryId: string,
        widgetId: string,
        widgetFilters: WidgetFilter[]): Observable<any> {
    // contruct the mix url requesy
    const url = `https://apidatos.ree.es/es/datos/${categoryId}/${widgetId}`;
    
    // construct the mix url params
    let params = new HttpParams()
    
    widgetFilters.forEach(widgetFilter => {
      if (widgetFilter.filterId) {
        params.set(widgetFilter.filterId, widgetFilter.value);
      }      
    });

    /*if (startDate) params = params.set('start_date', startDate);
    if (endDate) params = params.set('end_date', endDate);
    if (timeTruncId) params = params.set('time_trunc', timeTruncId);
    if (geoTruncId) params = params.set('geo_trunc', geoTruncId);
    if (geoLimitId) params = params.set('geo_limit', geoLimitId);
    if (geoIds) params = params.set('geo_ids', geoIds);*/

    /* API definition 
       GET /{lang}/datos/{category}/{widget}?[query]
       lang: es,en
       category: balance,demanda,generacion,intercambios,transporte,mercados
       widget: balance[balance-electrico],
    */
    return this.http.get<any>(url, { params }).pipe(
      mergeMap((response) => response.included),
      mergeMap((item: any) => {
        const { type, attributes } = item;

        return attributes.values.map((values: any) => ({
          technology: type,
          title: attributes.title,
          description: attributes.description,
          color: attributes.color,
          icon: attributes.icon,
          type: attributes.type,
          magnitude: attributes.magnitude,
          composite: attributes.composite,
          lastUpdate: new Date(attributes['last-update']),
          value: values.value,
          percentage: values.percentage,
          datetime: new Date(values.datetime)
        }));
      }),
      toArray()
    );
  }
}