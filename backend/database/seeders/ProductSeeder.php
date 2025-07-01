<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'iPhone 15 Pro',
                'description' => 'Latest Apple smartphone with advanced features',
                'price' => 999.99,
                'stock_quantity' => 50,
                'category_id' => 1,
                'image_url' => 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
            ],
            [
                'name' => 'MacBook Air M2',
                'description' => 'Powerful laptop for work and creativity',
                'price' => 1199.99,
                'stock_quantity' => 30,
                'category_id' => 1,
                'image_url' => 'https://via.placeholder.com/300x300?text=MacBook+Air',
            ],
            [
                'name' => 'Nike Air Max 90',
                'description' => 'Classic running shoes with modern comfort',
                'price' => 120.00,
                'stock_quantity' => 100,
                'category_id' => 2,
                'image_url' => 'https://via.placeholder.com/300x300?text=Nike+Air+Max',
            ],
            [
                'name' => 'The Great Gatsby',
                'description' => 'Classic American novel by F. Scott Fitzgerald',
                'price' => 12.99,
                'stock_quantity' => 200,
                'category_id' => 3,
                'image_url' => 'https://via.placeholder.com/300x300?text=Great+Gatsby',
            ],
            [
                'name' => 'Coffee Table',
                'description' => 'Modern wooden coffee table for living room',
                'price' => 299.99,
                'stock_quantity' => 25,
                'category_id' => 4,
                'image_url' => 'https://via.placeholder.com/300x300?text=Coffee+Table',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
