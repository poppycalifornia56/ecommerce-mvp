<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $cacheKey = 'products_' . md5($request->getQueryString());

        $products = Cache::remember($cacheKey, 600, function () use ($request) {
            $query = Product::with('category')->where('is_active', true);

            if ($request->has('category')) {
                $query->whereHas('category', function ($q) use ($request) {
                    $q->where('slug', $request->category);
                });
            }

            if ($request->has('min_price')) {
                $query->where('price', '>=', $request->min_price);
            }

            if ($request->has('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            return $query->paginate(12);
        });

        return ProductResource::collection($products);
    }

    public function show(Product $product)
    {
        $cacheKey = 'product_' . $product->id;

        $product = Cache::remember($cacheKey, 600, function () use ($product) {
            return $product->load('category');
        });

        return new ProductResource($product);
    }

    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2',
        ]);

        $products = Product::search($request->q)
            ->where('is_active', true)
            ->paginate(12);

        return ProductResource::collection($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable|url',
        ]);

        $product = Product::create($request->all());
        Cache::tags(['products'])->flush();

        return new ProductResource($product->load('category'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'stock_quantity' => 'sometimes|integer|min:0',
            'category_id' => 'sometimes|exists:categories,id',
            'image_url' => 'nullable|url',
        ]);

        $product->update($request->all());
        Cache::forget('product_' . $product->id);
        Cache::tags(['products'])->flush();

        return new ProductResource($product->load('category'));
    }

    public function destroy(Product $product)
    {
        $product->delete();
        Cache::forget('product_' . $product->id);
        Cache::tags(['products'])->flush();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
