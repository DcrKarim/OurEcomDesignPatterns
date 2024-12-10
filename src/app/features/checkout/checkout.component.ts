import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CheckoutService } from '@features/checkout/services/checkout.service';
import { ShoppingCartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
})
export default class CheckoutComponent {
  cartProducts$ = this.cartStore.products$;

  private readonly cartStore = inject(ShoppingCartStore);
  private readonly _checkoutSvc = inject(CheckoutService);

  onProceedToPay(): void {
    this.cartProducts$.subscribe((products) => {
      this._checkoutSvc.onProceedToPay(products);
    });
  }

  removeItem(id: number): void {
    this.cartStore.removeFromCart(id);
  }

  clearAll(): void {
    this.cartStore.clearCart();
  }
}
