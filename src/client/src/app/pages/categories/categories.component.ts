import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoryResponse } from 'src/app/interfaces/categoryResponse';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
  });
  submitButtonText: string = 'Create';
  query: string = '';

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryForm.reset();
    this.getCategories();
  }

  getCategories() {
    this.categoriesService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.filteredCategories = categories;
        this.categories = this.filteredCategories;
      });
  }

  createCategory() {
    if (this.categoryForm.valid) {
      this.categoriesService
        .createCategory(this.categoryForm.get('name')?.value)
        .subscribe((categoryResponse: CategoryResponse) => {
          let { message, data } = categoryResponse;
          this.filteredCategories.push(data);
          this.categories = this.filteredCategories;
          this.categoryForm.reset();
          alert(message);
        });
    }
  }

  deleteCategory(id: number) {    
    this.categoriesService
      .deleteCategory(id)
      .subscribe((categoryResponse: CategoryResponse) => {
        this.filteredCategories = this.categories.filter(
          (category: Category) => category.id != id
        );
        this.categories = this.filteredCategories;
        let { message } = categoryResponse;
        alert(message);
      });
  }

  showCategory(category: Category) {
    this.categoryForm.get('id')?.setValue(category.id);
    this.categoryForm.get('name')?.setValue(category.name);
    this.submitButtonText = 'Update';
  }

  handleSubmit() {
    this.submitButtonText == 'Create'
      ? this.createCategory()
      : this.updateCategory();
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      this.categoriesService
        .updateCategory(
          this.categoryForm.get('id')?.value,
          this.categoryForm.get('name')?.value
        )
        .subscribe((categoryResponse: CategoryResponse) => {
          this.filteredCategories = this.categories.filter(
            (category: Category) =>
              category.id != this.categoryForm.get('id')?.value
          );
          let { message, data } = categoryResponse;
          this.filteredCategories.push(data);
          this.categories = this.filteredCategories;
          this.categoryForm.reset();
          this.submitButtonText = 'Create';
          alert(message);
        });
    }
  }

  filterCategories() {
    this.filteredCategories = this.categories.filter((category: Category) =>
      category.name.includes(this.query)
    );
  }
}
