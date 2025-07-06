export interface IApiResponse<T = unknown> {
    statusCode?: number;
    message: string;
    data?: T;
}

export class ApiResponse<T = unknown> implements IApiResponse<T> {
    statusCode?: number;
    message: string;
    data?: T;

    constructor(statusCode: number, message = "Success", data?: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}