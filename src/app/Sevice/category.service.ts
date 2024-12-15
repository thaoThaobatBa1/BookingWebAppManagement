import { Injectable } from '@angular/core';
export interface Category {
  categoryID : string
  categoryName : string
  categoryDescription : string
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url : string = "https://localhost:7097/api/Category"
  constructor() { }
}
