import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], total: 0, count: 0 };
  loading = true;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cart:', error);
        this.loading = false;
      }
    });
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity < 1) return;

    this.cartService.updateCartItem(item.id, quantity).subscribe({
      next: () => {
        // Cart will be refreshed automatically
      },
      error: (error) => {
        console.error('Error updating cart:', error);
      }
    });
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id).subscribe({
      next: () => {
        // Cart will be refreshed automatically
      },
      error: (error) => {
        console.error('Error removing item:', error);
      }
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        // Cart will be refreshed automatically
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
      }
    });
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
