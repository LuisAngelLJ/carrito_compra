import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //estado para carrito de compra
  cart = signal<Product[]>([]);
  //crear un signal en base a otros
  total = computed( () => {
    const cart = this.cart();
    //reducer es un acumulador
    return cart.reduce( (acumulador, valorActualProducto ) => acumulador + valorActualProducto.price, 0);
  })

  constructor() { }

  addToCard(product: Product) {
    //jusntar objetos en un array
    this.cart.update(state => [...state, product]);
  }
}
