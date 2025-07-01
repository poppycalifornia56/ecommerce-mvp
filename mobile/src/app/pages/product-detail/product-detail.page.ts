import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: Product | null = null;
  loading = true;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    }
  }

  loadProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }

  async addToCart() {
    if (!this.product) return;

    const isAuth = await this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(this.product.id, this.quantity).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: `${this.quantity} item(s) added to cart`,
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

  incrementQuantity() {
    if (this.product && this.quantity < this.product.stock_quantity) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
