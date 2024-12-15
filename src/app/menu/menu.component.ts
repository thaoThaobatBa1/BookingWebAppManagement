import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Menu } from '../Sevice/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, NgxPaginationModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  searchText: string = '';
  newMenu: any = {
    menuName : "",
    description : ""
  }

  Menus: Menu[] = [];
  p: number = 1;
  isEdit: boolean = false;
  idEdit: string = "";

  constructor() { }
  http = inject(HttpClient)


  getall() {
    this.http.get("https://localhost:7097/api/Menu").subscribe((res: any) => {
      this.Menus = res.$values;
    });
  }

  ngOnInit(): void {
    this.getall()
  }

  resetForm(): void {
    this.newMenu = {
      categoryName: "",
      categoryDescription: ""

    };
  }
  ChangeState(item: any) {
    this.idEdit = item.menuID;
    this.newMenu = item
    this.isEdit = true;

  }

  addCategory(): void {
    this.http.post('https://localhost:7097/api/Menu', this.newMenu).subscribe(
      response => {
        alert("Menu ăn đã được thêm")
        this.resetForm();
        this.getall()
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      }
    );
  }



  editcategory() {

    this.http.put('https://localhost:7097/api/Menu/' + this.idEdit, this.newMenu).subscribe(
      response => {
        alert("Menu đã được sửa")

        this.resetForm();
        this.getall()
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      }
    );
  }

  Delete(id: any) {
    this.http.delete('https://localhost:7097/api/Menu/' + id).subscribe(
      response => {
        alert("Menu đã được Xoá")
        this.resetForm();
        this.getall()
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      })
  }


  urlSearch: string = "https://localhost:7097/api/Menu/searchMenu?searchText=";
  searchCategory(text: string): void {
    if (text.trim() != "") {
      this.http.get(this.urlSearch + text).subscribe((res: any) => {
        this.Menus = res
      })
    } else {
      this.getall()
    }
  }
}
