import { Injectable } from '@angular/core';

import { CATEGORIES, WIDGETS, TECHNOLOGIES, TIME_TRUNCS, TYPES } from '../models/mix-domain.model';

@Injectable({
  providedIn: 'root'
})
export class MixModelService {
  constructor() { }

  getCategories() {
    return CATEGORIES;
  }

  getTechnologies() {
    return TECHNOLOGIES;
  }

  getTypes() {
    return TYPES;
  }

  getWidgetById(widgetId: string) {
    return WIDGETS.find(widget => widget.id == widgetId);
  }
    
  getWidgetsByCategoryId(categoryId: string) {
    return WIDGETS.filter(widget => widget.categoryId == categoryId);
  }
}