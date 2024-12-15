import { Injectable } from '@angular/core';
export interface Menu {
  menuID : string
  menuName : string
  description : string
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() { }
}
