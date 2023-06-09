import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { Article } from '../../shared/article'; 
import { ToastrService } from 'ngx-toastr';
import { faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  p: number = 1;
  Article: Article[];
  hideWhenNoArticle: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  sortDirection: string = 'asc';
  sortColumn: string = 'libelle';
  faSortAsc = faSortAsc;
  faSortDesc = faSortDesc;
  itemsPerPage: number = 8;
  paginationOptions = [5, 10, 25, 50];
  
  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
    ){ }

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetArticlesList();
    s.snapshotChanges().subscribe(data => {
      this.Article = [];
      data.forEach(item => {
        let a = item.payload.toJSON() as Article;
        if (item.key != null) {
          a['$key'] = item.key;
        }
        this.Article.push(a as Article);
      })
    })
  }
  dataState() {
    console.log('dataState');
    this.crudApi.GetArticlesList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoArticle = false;
        this.noData = true;
      } else {
        this.hideWhenNoArticle = true;
        this.noData = false;
      }
    })
  }
  deleteArticle(article: Article) {
    if (window.confirm('Are sure you want to delete this article ?')) { 
      this.crudApi.DeleteArticle(article.$key)
      this.toastr.success(article.libelle + ' successfully deleted!');
    }
  }
  sortBy(column: string) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortColumn = column;
    this.Article.sort((a, b) => {
      const direction = this.sortDirection === 'asc' ? 1 : -1;
      if (a[column] < b[column]) return -1 * direction;
      if (a[column] > b[column]) return 1 * direction;
      return 0;
    });
  }
  onItemsPerPageChange(event: any) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const itemsPerPage = parseInt(target.value, 10);
      this.itemsPerPage = itemsPerPage;
      this.p = 1;
    }
  }
}
