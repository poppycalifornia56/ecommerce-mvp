import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  addToCart(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(this.product.id, 1).subscribe({
      next: () => {
        // Show success message or toast
        console.log('Product added to cart');
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
      }
    });
  }

  viewProduct(): void {
    this.router.navigate(['/products', this.product.id]);
  }
}
