import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: any[] = [];
  loading = true;
  searchQuery = '';
  selectedCategory = '';
  currentPage = 1;
  totalPages = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedCategory = params['category'] || '';
      this.currentPage = params['page'] || 1;

      if (this.searchQuery) {
        this.searchProducts();
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    const params: any = { page: this.currentPage };

    if (this.selectedCategory) {
      params.category = this.selectedCategory;
    }

    this.productService.getProducts(params).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalPages = response.last_page;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  searchProducts(): void {
    this.loading = true;
    this.productService.searchProducts(this.searchQuery).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalPages = response.last_page;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching products:', error);
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  onCategoryChange(categorySlug: string): void {
    this.router.navigate(['/products'], {
      queryParams: { category: categorySlug || null, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(page: number): void {
    this.router.navigate(['/products'], {
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
  }
}
