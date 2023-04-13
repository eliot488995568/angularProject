import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
})
export class AddArticleComponent implements OnInit {
  public articleForm!: FormGroup;
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}
  ngOnInit() {
    this.crudApi.GetArticlesList();
    this.articlForm();
  }
  articlForm() {
    this.articleForm = this.fb.group({
      libelle: ['', [Validators.required, Validators.minLength(2)]],
      shortTag: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }
  get libelle() {
    return this.articleForm.get('libelle');
  }
  get shortTag() {
    return this.articleForm.get('shortTag');
  }
  get quantity() {
    return this.articleForm.get('quantity');
  }
  ResetForm() {
    this.articleForm.reset();
  }
  submitArticleData() {
    this.crudApi.AddArticle(this.articleForm.value);
    this.toastr.success(
      this.articleForm.controls['libelle'].value + ' successfully added!'
    );
    this.ResetForm();
  }
}
