import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppingCartStore } from '@shared/store/shopping-cart.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass, CurrencyPipe, SlicePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showCart = false;

  // Reactive streams from CartStore
  cartProducts$: Observable<any[]> = this.cartStore.products$;
  totalAmount$: Observable<number> = this.cartStore.totalAmount$;
  productsCount$: Observable<number> = this.cartStore.productsCount$;

  private readonly cartStore = inject(ShoppingCartStore);

  toggleCart(): void {
    this.showCart = !this.showCart;
  }
}
