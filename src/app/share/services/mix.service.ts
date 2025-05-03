import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MixService {
  constructor(private http: HttpClient) { }

  getMixFiltered(
        startDate?: string,
        endDate?: string,
        timeTrunc?: string,
        geoTrunc?: string,
        geoLimit?: string,
        geoIds?: number): Observable<any> {
    let params = new HttpParams()
    
    if (startDate) params = params.set('start_date', startDate);
    if (endDate) params = params.set('end_date', endDate);
    if (timeTrunc) params = params.set('time_trunc', timeTrunc);
    if (geoTrunc) params = params.set('geo_trunc', geoTrunc);
    if (geoLimit) params = params.set('geo_limit', geoLimit);
    if (geoIds) params = params.set('geo_ids', geoIds);

    /* API definition 
       GET /{lang}/datos/{category}/{widget}?[query]
       lang: es,en
       category: balance,demanda,generacion,intercambios,transporte,mercados
       widget: balance[balance-electrico],
    */
    return this.http.get<any>('https://apidatos.ree.es/es/datos/generacion/estructura-generacion', { params }).pipe(
        mergeMap((response) => response.included),
        mergeMap((item: any) => {
            const { type, attributes } = item;

            return attributes.values.map((values: any) => ({
                    group: type,
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