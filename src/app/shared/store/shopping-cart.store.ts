import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '@shared/models/product.interface';

@Injectable({ providedIn: 'root' })
export class ShoppingCartStore {
  private cartProductsSubject = new BehaviorSubject<Product[]>([]);
  cartProducts$: Observable<Product[]> = this.cartProductsSubject.asObservable();

  private calculateTotalAmount(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.price * product.qty, 0);
  }

  private calculateProductCount(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.qty, 0);
  }

  addToCart(product: Product): void {
    const currentProducts = this.cartProductsSubject.getValue();
    const productIndex = currentProducts.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      currentProducts[productIndex].qty++;
    } else {
      currentProducts.push({ ...product, qty: 1 });
    }
    this.cartProductsSubject.next([...currentProducts]);
  }

  removeFromCart(id: number): void {
    const updatedProducts = this.cartProductsSubject
      .getValue()
      .filter((product) => product.id !== id);
    this.cartProductsSubject.next(updatedProducts);
  }

  clearCart(): void {
    this.cartProductsSubject.next([]);
  }
}
