import { Component, inject } from '@angular/core';
import { Category } from '../Sevice/category.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, NgxPaginationModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  searchTerm: string = '';
  newCategory: any = {
    categoryName: "",
    categoryDescription: ""
  }

  Categories: Category[] = [];
  p: number = 1;
  isEdit: boolean = false;
  idEdit: string = "";

  constructor() { }
  http = inject(HttpClient)


  getall() {
    this.http.get("https://localhost:7097/api/Category").subscribe((res: any) => {
      this.Categories = res.$values;
    });
  }

  ngOnInit(): void {
    this.getall()
  }

  resetForm(): void {
    this.newCategory = {
      categoryName: "",
      categoryDescription: ""

    };
  }
  ChangeState(item: any) {
    this.idEdit = item.categoryID;
    this.newCategory = item
    this.isEdit = true;

  }

  addCategory(): void {
    this.http.post('https://localhost:7097/api/Category', this.newCategory).subscribe(
      response => {
        alert("Loại ăn đã được thêm")

        this.resetForm();
        this.getall()
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      }
    );
  }



  editcategory() {

    this.http.put('https://localhost:7097/api/Category/'+ this.idEdit, this.newCategory).subscribe(
      response => {
        alert("Loại đã được sửa")

        this.resetForm();
        this.getall()
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      }
    );
  }

  Delete(id: any) {
    this.http.delete('https://localhost:7097/api/Category/' + id).subscribe(
      response => {
        alert("Loại đã được Xoá")
        this.resetForm();
        this.getall()
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      })
  }


  urlSearch: string = "https://localhost:7097/api/Category/searchCategory?searchText=";
  searchCategory(text: string): void {
    if (text.trim() != "") {
      this.http.get(this.urlSearch + text).subscribe((res: any) => {
        this.Categories = res
      })
    } else {
      this.getall()
    }
  }
}
