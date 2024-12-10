import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { ShoppingCartStore } from '@shared/store/shopping-cart.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
})
export default class DetailsComponent implements OnInit {
  starsArray: number[] = new Array(5).fill(0);
  product$!: Observable<Product>;

  private readonly cartStore = inject(ShoppingCartStore);
  private readonly productsSvc = inject(ProductsService);
  private readonly _sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.product$ = this.productsSvc.getProductById(this.productId);
  }

  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }

  generateSVG(index: number, rating: number): SafeHtml {
    // SVG generation logic remains the same
    return this._sanitizer.bypassSecurityTrustHtml('<svg>...</svg>');
  }
}
