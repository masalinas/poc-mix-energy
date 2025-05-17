import { Injectable } from '@angular/core';

import { CATEGORIES, WIDGETS, GEO_LIMITS, GEO_TRUNCS, TECHNOLOGIES, TIME_TRUNCS, TYPES } from '../models/mix-domain.model';

@Injectable({
  providedIn: 'root'
})
export class MixModelService {
  constructor() { }

  getCategories() {
    return CATEGORIES;
  }

  getWidgetsByCategoryId(categoryId: string) {
    return WIDGETS.filter(widget => widget.categoryId == categoryId);
  }

  getTechnologies() {
    return TECHNOLOGIES;
  }

  getTypes() {
    return TYPES;
  }
}