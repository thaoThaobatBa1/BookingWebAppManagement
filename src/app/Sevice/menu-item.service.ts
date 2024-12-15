import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface MenuItem {
  menuItemID: string
  itemName: string
  description: string
  price: number
  available: boolean
  imageMenuItem: string
  menuID: string
  categoryID: string
}

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  public Url: any = 'https://localhost:7097/api/MenuItem/';
  constructor() { }
}
