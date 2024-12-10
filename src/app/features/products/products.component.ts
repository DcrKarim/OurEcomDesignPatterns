import { Component } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { CardComponent } from '@features/products/card/card.component';
import { Product } from '@shared/models/product.interface';
import { ShoppingCartStore } from '@shared/store/shopping-cart.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  template: `
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          <app-card
            *ngFor="let product of products$ | async; trackBy: trackByFn"
            (addToCartEvent)="onAddToCart($event)"
            class="w-full p-4 lg:w-1/4 md:w-1/2"
            [product]="product"
          ></app-card>
        </div>
      </div>
    </section>
  `,
})
export default class ProductsComponent {
  // Observable for product list
  products$: Observable<Product[]> = this.productSvc.products$;

  constructor(
    private readonly productSvc: ProductsService,
    private readonly cartStore: ShoppingCartStore
  ) {}

  // Add product to cart through CartStore
  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }

  // Track products efficiently in the DOM
  trackByFn(index: number, item: Product): number {
    return item.id; // Use unique product ID
  }
}
