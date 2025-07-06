import { IUser } from '@/models/user.model';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from './ApiError';
import { ApiResponse } from './ApiResponse';

export type UserFormData = Pick<IUser, 'username' | 'email' | 'password'>;

class ApiClient {
    private async request<T>(
        endPoint: string,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios({
                url: `/api/${endPoint}`,
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            // If your backend always wraps with { statusCode, message, data }
            const result = response.data as { statusCode: number; message: string; data?: unknown };

            if (result.statusCode >= 400) {
                throw new ApiError(result.statusCode, result.message, result.data);
            }

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('AxiosError Response:', error.response?.data);

                if (error.response?.data) {
                    const result = error.response.data as { statusCode?: number; message?: string; data?: unknown };
                    throw new ApiError(
                        result.statusCode || error.response.status,
                        result.message || 'Request failed',
                        result.data
                    );
                }

                throw new ApiError(error.response?.status || 500, error.message);
            }

            throw new ApiError(500, error instanceof Error ? error.message : 'Unexpected error');
        }
    }

    async register(userData: UserFormData) {
        return this.request<{ statusCode: number; message: string; data: { id: string } }>(
            'auth/register',
            { method: 'POST', data: userData }
        );
    }

    async getToken() {
        return this.request<ApiResponse>(
            'auth/session',
            { method: 'GET' }
        );
    }

    async verifyOTP(otp: string, userId: string) {
        return this.request<ApiResponse>(
            'auth/verifyOTP',
            { method: 'POST', data: { otp, userId } }
        );
    }

    async resendOTP(userId: string) {
        return this.request<ApiResponse>(
            'auth/resendOTP',
            { method: 'POST', data: { userId } }
        );
    }

    async login(email: string, password: string) {
        return this.request<ApiResponse>(
            'auth/login',
            { method: 'POST', data: { email, password } }
        );
    }

    async imageKitAuth() {
        return this.request<{ statusCode: number; message: string; data: { token: string; signature: string; expire: number } }>(
            'imagekit/auth',
            { method: 'GET' }
        );
    }
}

export const apiClient = new ApiClient();
