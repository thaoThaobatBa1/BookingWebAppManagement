import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
export interface Article {
  articleId: string
  articleContent: string
}
@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, NgxPaginationModule, FormsModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  Articles: Article[] = [];
  editid: string = ""
  newArticle: any = {
    articleId: "",
    articleContent: ""
  }

  p: number = 1;

  constructor() { }
  http = inject(HttpClient)


  getall() {
    this.http.get("https://localhost:7097/api/Article/get-all-article").subscribe((res: any) => {
      this.Articles = res;
    });
  }

  ngOnInit(): void {

    this.getall()
   
  }

  Edit(item: any) {
    this.editid = item.articleId
    this.newArticle.articleContent = item.articleContent
   
    
  }

  Update() {
    this.http.put("https://localhost:7097/api/Article/" + this.editid,this.newArticle).subscribe((res : any) => {
      alert("Cập nhập thành công")
      this.getall();
    })
  }

}


