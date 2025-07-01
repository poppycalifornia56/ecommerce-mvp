import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Cart = { items: [], total: 0, count: 0 };
  loading = true;

  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
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

  async updateQuantity(item: CartItem, quantity: number) {
    if (quantity < 1) return;

    this.cartService.updateCartItem(item.id, quantity).subscribe({
      next: () => {
        // Cart will be refreshed automatically
      },
      error: async (error) => {
        const toast = await this.toastController.create({
          message: 'Error updating cart',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  async removeItem(item: CartItem) {
    const alert = await this.alertController.create({
      header: 'Remove Item',
      message: 'Are you sure you want to remove this item from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          handler: () => {
            this.cartService.removeFromCart(item.id).subscribe({
              next: async () => {
                const toast = await this.toastController.create({
                  message: 'Item removed from cart',
                  duration: 2000,
                  color: 'success'
                });
                toast.present();
              },
              error: async (error) => {
                const toast = await this.toastController.create({
                  message: 'Error removing item',
                  duration: 2000,
                  color: 'danger'
                });
                toast.present();
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async clearCart() {
    const alert = await this.alertController.create({
      header: 'Clear Cart',
      message: 'Are you sure you want to clear your entire cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear',
          handler: () => {
            this.cartService.clearCart().subscribe({
              next: async () => {
                const toast = await this.toastController.create({
                  message: 'Cart cleared',
                  duration: 2000,
                  color: 'success'
                });
                toast.present();
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  proceedToCheckout() {
    // Navigate to checkout page (to be implemented)
    console.log('Proceed to checkout');
  }
}
