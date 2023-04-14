import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Article } from '../../shared/article';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
})
export class EditArticleComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.updateArticleData();
    const id = this.actRoute.snapshot.paramMap.get('id') as string;
    this.crudApi
      .GetArticle(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
      });
  }
  get libelle() {
    return this.editForm.get('libelle');
  }
  get shortTag() {
    return this.editForm.get('shortTag');
  }
  get quantity() {
    return this.editForm.get('quantity');
  }
  updateArticleData() {
    this.editForm = this.fb.group({
      libelle: ['', [Validators.required, Validators.minLength(2)]],
      shortTag: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  goBack() {
    this.location.back();
  }
  updateForm() {
    this.crudApi.UpdateArticle(this.editForm.value);
    this.toastr.success(
      this.editForm.controls['libelle'].value + ' updated successfully'
    );
    this.router.navigate(['view-articles']);
  }
}
