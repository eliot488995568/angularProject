import { Injectable } from '@angular/core';
import { Article } from './article';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  articlesRef: AngularFireList<any>;
  articleRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create Article
  AddArticle(article: Article) {
    try {
      this.articlesRef.push({
        libelle: article.libelle,
        shortTag: article.shortTag,
        quantity: article.quantity,
      });
    } catch (error) {
      console.log(error);
    }
    /* this.articlesRef.push({
      libelle: article.libelle,
      shortTag: article.shortTag,
      quantity: article.quantity
    }); */
  }
  // Fetch Single Article Object
  GetArticle(id: string) {
    this.articleRef = this.db.object('articles-list/' + id);
    return this.articleRef;
  }
  // Fetch Articles List
  GetArticlesList() {
    this.articlesRef = this.db.list('articles-list');
    return this.articlesRef;
  }
  // Update Article Object
  UpdateArticle(article: Article) {
    this.articleRef.update({
      libelle: article.libelle,
      shortTag: article.shortTag,
      quantity: article.quantity
    });
  }
  // Delete Article Object
  DeleteArticle(id: string) {
    this.articleRef = this.db.object('articles-list/' + id);
    this.articleRef.remove();
  }
}