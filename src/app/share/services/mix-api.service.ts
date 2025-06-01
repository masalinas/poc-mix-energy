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

  /* API definition 
    GET /{lang}/datos/{category}/{widget}?[query]
  */  
  getMixFiltered(category: any, widget: any, widgetFilters: WidgetFilter[]): Observable<any> {
    // contruct the mix url
    let url = `https://apidatos.ree.es/es/datos/${category.id}`;
    
    if (widget.pathId) {
      url = url + "/" + widget.pathId;
    }
        
    // construct the mix url path and params
    let params = new HttpParams()
    
    widgetFilters.forEach(widgetFilter => {
      if (widgetFilter.pathId) {
        url = url + "/" + widgetFilter.pathId;
      }

      if (widgetFilter.filterId) {
        if (Array.isArray(widgetFilter.filterId)) {
          for (let i = 0; i < widgetFilter.filterId.length; i++) {
             params = params.set(widgetFilter.filterId[i], widgetFilter.value[i]);
          }          
        } else {
          params = params.set(widgetFilter.filterId, widgetFilter.value);
        }
      }      
    });

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