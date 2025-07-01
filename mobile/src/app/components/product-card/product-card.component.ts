import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async addToCart() {
    const isAuth = await this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(this.product.id, 1).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Product added to cart',
          duration: 2000,
          color: 'success'
        });
        toast.present();
      },
      error: async (error) => {
        const toast = await this.toastController.create({
          message: error.error?.message || 'Error adding to cart',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  viewProduct() {
    this.router.navigate(['/product-detail', this.product.id]);
  }
}
