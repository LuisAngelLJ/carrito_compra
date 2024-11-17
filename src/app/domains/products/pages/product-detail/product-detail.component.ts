import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);

  //obtener id de la ruta
  @Input() id?: string;
  product = signal<Product | null>(null);
  //foto de portada
  cover = signal('');
  //mandar datos al carrito
  private cartService = inject(CartService);

  ngOnInit(): void {
    if(this.id) {
      this.productService.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if(product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        }
      });
    }
  }

  //cambio de imagen de portada
  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  //cambiar el estado del carrito
  addToCart() {
    const product = this.product();
    product ? this.cartService.addToCard(product) : console.log("producto nulo");
  }
}