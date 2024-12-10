import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@envs/environment';
import { Product } from '@shared/models/product.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiURL;

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this._http
      .get<Product[]>(`${this._endPoint}/products/?sort=desc`)
      .pipe(
        map((products: Product[]) =>
          products.map((product: Product) => ({ ...product, qty: 1 }))
        ),
        tap((products: Product[]) => this.productsSubject.next(products))
      )
      .subscribe();
  }

  public getProductById(id: number): Observable<Product> {
    return this._http.get<Product>(`${this._endPoint}/products/${id}`);
  }
}
