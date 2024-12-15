import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
export interface Baner {
  banerId: string
  banerimg: string
}
@Component({
  selector: 'app-baner',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, NgxPaginationModule, FormsModule],
  templateUrl: './baner.component.html',
  styleUrl: './baner.component.scss'
})
export class BanerComponent {
  Baners: Baner[] = [];
  selectedFile : File | null = null
  p: number = 1;

  constructor() { }
  http = inject(HttpClient)


  getall() {
    this.http.get("https://localhost:7097/api/Baner").subscribe((res: any) => {
      this.Baners = res.$values;
    });
  }

  ngOnInit(): void {
    this.getall()
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  addCategory(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }

    this.http.post('https://localhost:7097/api/Baner',formData).subscribe(
      response => {
        alert("Baner ăn đã được thêm")
        this.getall()
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      }
    );
  }

  Delete(id: any) {
    this.http.delete('https://localhost:7097/api/Baner/' + id).subscribe(
      response => {
        alert("Baner đã được Xoá")
        this.getall()
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
      })
  }

}
