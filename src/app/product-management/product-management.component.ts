import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuItem, MenuItemService } from '../Sevice/menu-item.service';
import { Menu } from '../Sevice/menu.service';
import { Category } from '../Sevice/category.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, NgxPaginationModule, FormsModule],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  searchTerm: string = '';
  newMenuItem: any = {
    itemName: "",
    description: "",
    price: 0,
    available: true,
    imageMenuItem: "",
    menuID: "",
    categoryID: ""
  }
  menuItems: MenuItem[] = [];
  Menus: Menu[] = [];
  Categories: Category[] = [];
  p: number = 1;
  selectedFile: File | null = null;
  isEdit: boolean = false;
  idEdit: string = "";
  constructor() { }
  http = inject(HttpClient)
  getall() {
    this.http.get("https://localhost:7097/api/MenuItem/").subscribe((res: any) => {
      this.menuItems = res.$values;
    });
  }

  ngOnInit(): void {

    this.getall()
    this.http.get("https://localhost:7097/api/Menu").subscribe((res: any) => {
      this.Menus = res.$values;
    });

    this.http.get("https://localhost:7097/api/Category").subscribe((res: any) => {
      this.Categories = res.$values;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  addMenuItem(): void {
    const formData = new FormData();
    formData.append('itemName', this.newMenuItem.itemName);
    formData.append('description', this.newMenuItem.description);
    formData.append('price', this.newMenuItem.price.toString());
    formData.append('available', this.newMenuItem.available.toString());
    formData.append('menuID', this.newMenuItem.menuID);
    formData.append('categoryID', this.newMenuItem.categoryID);

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }

    this.http.post('https://localhost:7097/api/MenuItem', formData).subscribe(
      response => {
        alert("Món ăn đã được thêm")

        this.resetForm();
        this.getall()
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      }
    );
  }

  resetForm(): void {
    this.newMenuItem = {
      menuItemID: "",
      itemName: "",
      description: "",
      price: 0,
      available: true,
      imageMenuItem: "",
      menuID: "",
      categoryID: ""
    };
    this.selectedFile = null;
  }
  ChangeState(item: any) {
    this.idEdit = item.menuItemID;
    this.newMenuItem = item
    this.isEdit = true;

  }

  editMenuItem() {
    const formData = new FormData();
    formData.append('itemName', this.newMenuItem.itemName);
    formData.append('description', this.newMenuItem.description);
    formData.append('price', this.newMenuItem.price.toString());
    formData.append('available', this.newMenuItem.available.toString());
    formData.append('menuID', this.newMenuItem.menuID);
    formData.append('categoryID', this.newMenuItem.categoryID);

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    } else {
      alert("Vui lòng chọn một file hình ảnh để tải lên.");
      return;
    }

    this.http.put('https://localhost:7097/api/MenuItem/' + this.idEdit, formData).subscribe(
      response => {
        alert("Món ăn đã được Sửa")
        this.resetForm();
        this.getall()
        this.isEdit = false

      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      }
    );
  }

  Delete(id: any) {
    this.http.delete('https://localhost:7097/api/MenuItem/' + id).subscribe(
      response => {
        alert("Món ăn đã được Xoá")
        this.resetForm();
        this.getall()
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      })
  }


  urlSearch: string = "https://localhost:7097/api/MenuItem/search?searchText=";
  searchMenuItems(text: string): void {
    if (text.trim() != "") {
      this.http.get(this.urlSearch + text).subscribe((res: any) => {
        this.menuItems = res
      })
    } else {
      this.getall()
    }


  }
}
