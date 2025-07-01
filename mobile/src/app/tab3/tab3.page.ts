import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  user: any = null;
  cartCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.cartService.getCart().subscribe();
      }
    });

    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.count;
    });
  }

  async logout() {
    const isAuth = await this.authService.isAuthenticated();
    if (isAuth) {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/login']);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
