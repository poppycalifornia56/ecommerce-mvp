import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl;
  private cartSubject = new BehaviorSubject<Cart>({ items: [], total: 0, count: 0 });
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/cart`).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/add`, {
      product_id: productId,
      quantity: quantity
    }).pipe(
      tap(() => this.refreshCart())
    );
  }

  updateCartItem(itemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/update/${itemId}`, {
      quantity: quantity
    }).pipe(
      tap(() => this.refreshCart())
    );
  }

  removeFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/remove/${itemId}`).pipe(
      tap(() => this.refreshCart())
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/clear`).pipe(
      tap(() => this.cartSubject.next({ items: [], total: 0, count: 0 }))
    );
  }

  private refreshCart(): void {
    this.getCart().subscribe();
  }
}
