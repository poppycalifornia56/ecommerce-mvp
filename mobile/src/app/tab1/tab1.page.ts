import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  featuredProducts: Product[] = [];
  categories: any[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  loadFeaturedProducts() {
    this.productService.getProducts({ per_page: 6 }).subscribe({
      next: (response) => {
        this.featuredProducts = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  doRefresh(event: any) {
    this.loadFeaturedProducts();
    this.loadCategories();
    event.target.complete();
  }
}
