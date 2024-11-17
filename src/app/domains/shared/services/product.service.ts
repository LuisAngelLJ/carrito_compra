import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() { }

  getProducts(category_id?: string): Observable<Product[]> {
    const url = new URL('https://api.escuelajs.co/api/v1/products');
    if (category_id) {//si el valor no es undefined
        url.searchParams.set('categoryId', category_id); //a la url le concateno el parametro
    }
    return this.http.get<Product[]>(url.toString());
  }


  getOne(id: string) {
    return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}
