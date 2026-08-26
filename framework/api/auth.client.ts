import {
  APIRequestContext,
} from '@playwright/test';

import {
  createTestUser,
  TestUser,
} from '@data/test-user.factory';

export interface AuthSession extends TestUser {
  token: string;
  basketId: number;
}

export class AuthClient {
  constructor(
    private readonly request: APIRequestContext,
  ) {}

  async register(
    user: TestUser,
  ): Promise<void> {
    const response =
      await this.request.post(
        '/api/Users',
        {
          data: {
            email: user.email,
            password: user.password,
            passwordRepeat: user.password,
          },
        },
      );

    if (!response.ok()) {
      throw new Error(
        `User registration failed: ${response.status()} ${await response.text()}`,
      );
    }
  }

  async login(
    user: TestUser,
  ): Promise<AuthSession> {
    const response =
      await this.request.post(
        '/rest/user/login',
        {
          data: {
            email: user.email,
            password: user.password,
          },
        },
      );

    if (!response.ok()) {
      throw new Error(
        `Login failed: ${response.status()} ${await response.text()}`,
      );
    }

    const body = await response.json();

    const authentication =
      body.authentication;

    if (
      !authentication?.token ||
      !authentication?.bid
    ) {
      throw new Error(
        'Login response did not contain token and basket ID.',
      );
    }

    return {
      ...user,
      token: authentication.token,
      basketId: Number(
        authentication.bid,
      ),
    };
  }

  async createAuthenticatedUser():
    Promise<AuthSession> {

    const user = createTestUser();

    await this.register(user);

    return await this.login(user);
  }

  async loginRaw(
    email: string,
    password: string,
    ) {
        return this.request.post(
            '/rest/user/login',
            {
            data: {
                email,
                password,
            },
            },
    );
 }
 async registerRaw(
  data: Record<string, unknown>,
    ) {
    return this.request.post(
        '/api/Users',
        {
        data,
        },
    );
 }

}