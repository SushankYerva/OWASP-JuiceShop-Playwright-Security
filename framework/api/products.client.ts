import {
  APIRequestContext,
  APIResponse,
} from '@playwright/test';

export class ProductsClient {
  constructor(
    private readonly request: APIRequestContext,
  ) {}

  async getProducts(): Promise<APIResponse> {
    return this.request.get(
      '/api/Products',
    );
  }

  async searchProducts(
    query: string,
  ): Promise<APIResponse> {
    return this.request.get(
      '/rest/products/search',
      {
        params: {
          q: query,
        },
      },
    );
  }
}