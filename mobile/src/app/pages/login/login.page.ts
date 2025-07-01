import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = {
    email: '',
    password: ''
  };
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      const toast = await this.toastController.create({
        message: 'Please fill in all fields',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    this.loading = true;

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/tabs/tab1']);
      },
      error: async (error) => {
        const toast = await this.toastController.create({
          message: error.error?.message || 'Login failed',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        this.loading = false;
      }
    });
  }
}
