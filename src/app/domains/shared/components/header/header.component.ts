import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  //recibir productos de list
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  //mi solucion
  /*ngOnChanges(changes: SimpleChanges): void {
    let cartPricechange = changes['cart'].currentValue;
    let totalParcial = 0;
    cartPricechange.forEach( (element: any) => {
      totalParcial += element.price;
    });
    this.total.set(totalParcial);
    console.log(this.total());
  }*/

  togleSignalMenu() {
    //cambiar el estado
    this.hideSideMenu.update(prevState => !prevState); //si es true lo pasa al false y viceversa
    console.log("header " + this.hideSideMenu());
  }
}
