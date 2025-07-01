import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  products: Product[] = [];
  categories: any[] = [];
  loading = true;
  searchQuery = '';
  selectedCategory = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedCategory = params['category'] || '';

      if (this.searchQuery) {
        this.searchProducts();
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts() {
    this.loading = true;
    const params: any = {};

    if (this.selectedCategory) {
      params.category = this.selectedCategory;
    }

    this.productService.getProducts(params).subscribe({
      next: (response) => {
        this.products = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  searchProducts() {
    this.loading = true;
    this.productService.searchProducts(this.searchQuery).subscribe({
      next: (response) => {
        this.products = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching products:', error);
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

  onCategoryChange() {
    this.router.navigate(['/tabs/tab2'], {
      queryParams: { category: this.selectedCategory || null },
      queryParamsHandling: 'merge'
    });
  }

  onSearchInput(event: any) {
    this.searchQuery = event.target.value;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/tabs/tab2'], {
        queryParams: { search: this.searchQuery.trim(), category: null }
      });
    }
  }

  doRefresh(event: any) {
    this.loadProducts();
    event.target.complete();
  }
}
