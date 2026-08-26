import {
  APIRequestContext,
  APIResponse,
} from '@playwright/test';

export class BasketClient {
  constructor(
    private readonly request: APIRequestContext,
  ) {}

  private authHeaders(
    token: string,
  ): Record<string, string> {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getBasket(
    basketId: number,
    token: string,
  ): Promise<APIResponse> {
    return this.request.get(
      `/rest/basket/${basketId}`,
      {
        headers:
          this.authHeaders(token),
      },
    );
  }

  async addItem(
    basketId: number,
    productId: number,
    token: string,
    quantity = 1,
  ): Promise<APIResponse> {
    return this.request.post(
      '/api/BasketItems',
      {
        headers:
          this.authHeaders(token),

        data: {
          BasketId: basketId,
          ProductId: productId,
          quantity,
        },
      },
    );
  }

  async updateItem(
    basketItemId: number,
    token: string,
    quantity: number,
  ): Promise<APIResponse> {
    return this.request.put(
      `/api/BasketItems/${basketItemId}`,
      {
        headers:
          this.authHeaders(token),

        data: {
          quantity,
        },
      },
    );
  }

  async deleteItem(
    basketItemId: number,
    token: string,
  ): Promise<APIResponse> {
    return this.request.delete(
      `/api/BasketItems/${basketItemId}`,
      {
        headers:
          this.authHeaders(token),
      },
    );
  }
}