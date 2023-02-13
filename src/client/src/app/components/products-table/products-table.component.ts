import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { ProductResponse } from 'src/app/interfaces/productResponse';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit {
  query: string = '';
  displayedColumns: string[] = ['code', 'name', 'has_stock', 'category'];
  dataSource = new MatTableDataSource<Product>();
  backupDataSource = new MatTableDataSource<Product>();
  @Output() selectedProduct = new EventEmitter<Product>();
  @Input() isStock: boolean = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.productsService.refresh$.subscribe(() => this.getProducts());
    this.isStock
      ? this.displayedColumns.push(...['quantity', 'price', 'size', 'weight'])
      : this.displayedColumns.push('actions');
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      let _products = products.map((product: Product) => {
        let _has_stock = product.has_stock == true ? 'Yes' : 'No';
        return { ...product, _has_stock };
      });
      this.dataSource.data = _products;
      this.backupDataSource.data = _products;
    });
  }

  searchProducts() {
    this.query == ''
      ? (this.dataSource.data = this.backupDataSource.data)
      : (this.dataSource.data = this.backupDataSource.data.filter(
          (e: Product) =>
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

  showProduct(product: Product) {
    this.selectedProduct.emit(product);
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
}
