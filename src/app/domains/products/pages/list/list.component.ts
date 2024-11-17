import { Component, signal, inject, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
//llamar al product.component y lo agrego a los import
import { ProductComponent } from '@product/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Product } from '@shared/models/product.model';

import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit, OnChanges {
  //recibir productos de list
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  //parametro de la url
  @Input() category_id?: string;

  constructor() {
  }

  ngOnInit(): void {
    //this.getProducts();
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getProducts();//este método se ejecuta cuando se carga el componente como el onInit y cuando cambia
  }

  addToCard(product: Product) {
    //usar el servcio
    this.cartService.addToCard(product);
  }

  getProducts() {
    this.productService.getProducts(this.category_id).subscribe( 
      {
        next: (products) => {
          this.products.set(products);
          products.forEach(product => console.log(product.images[0]));
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  getCategories() {
    this.categoryService.getCategory().subscribe( 
      {
        next: (categories) => {
          this.categories.set(categories);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }
}
