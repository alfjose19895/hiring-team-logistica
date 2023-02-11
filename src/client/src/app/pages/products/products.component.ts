import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { ProductResponse } from 'src/app/interfaces/productResponse';
import { Product } from 'src/app/interfaces/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    has_stock: new FormControl(false, [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
  });
  submitButtonText: string = 'Create';
  categories: Category[] = [];
  query: string = '';
  displayedColumns: string[] = [
    'code',
    'name',
    'has_stock',
    'category',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>();
  backupDataSource = new MatTableDataSource<Product>();

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  handleSubmit() {
    this.submitButtonText == 'Create'
      ? this.createProduct()
      : this.updateProduct();
  }

  getCategories() {
    this.categoriesService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      let _products = products.map((product: Product) => {
        let _has_stock = product.has_stock == true ? 'Yes' : 'No'
        return {...product, _has_stock}
      })
      this.dataSource.data = _products;
      this.backupDataSource.data = _products;
    });
  }

  searchProducts() {
    this.query == ''
      ? (this.dataSource.data = this.backupDataSource.data)
      : (this.dataSource.data = this.backupDataSource.data.filter((e: Product) =>
          (
            e.name.toLowerCase() +
            ' ' +
            e.code.toLowerCase() +
            ' ' +
            e._has_stock?.toLowerCase() +
            ' ' +
            e.category?.name.toLowerCase()
          ).includes(this.query.trim().toLowerCase())
        ));
  }

  createProduct() {
    if (this.productForm.valid) {
      let product: Product = {
        name: this.productForm.get('name')?.value,
        code: this.productForm.get('code')?.value,
        has_stock: this.productForm.get('has_stock')?.value,
        category_id: this.productForm.get('category_id')?.value,
      };
      this.productsService
        .createProduct(product)
        .subscribe((productResponse: ProductResponse) => {
          this.productForm.reset();
          this.getProducts();
          let { message } = productResponse;
          alert(message);
        });
    }
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(id)
      .subscribe((productResponse: ProductResponse) => {
        this.getProducts();
        let { message } = productResponse;
        alert(message);
      });
  }

  showProduct(product: Product) {
    this.productForm.get('id')?.setValue(product.id);
    this.productForm.get('name')?.setValue(product.name);
    this.productForm.get('code')?.setValue(product.code);
    this.productForm.get('has_stock')?.setValue(product.has_stock);
    this.productForm.get('category_id')?.setValue(product.category_id);
    this.submitButtonText = 'Update';
  }

  updateProduct() {
    if (this.productForm.valid) {
      let product: Product = {
        id: this.productForm.get('id')?.value,
        name: this.productForm.get('name')?.value,
        code: this.productForm.get('code')?.value,
        has_stock: this.productForm.get('has_stock')?.value,
        category_id: this.productForm.get('category_id')?.value,
      };
      this.productsService
        .updateProduct(product)
        .subscribe((productResponse: ProductResponse) => {
          this.productForm.reset();
          this.getProducts();
          this.submitButtonText = 'Create';
          let { message } = productResponse;
          alert(message);
        });
    }
  }
}
