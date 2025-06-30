export interface IApiResponse {
    statusCode?: number;
    message: string;
    data?: any;
}

export class ApiResponse implements IApiResponse {
    statusCode?: number;
    message: string;
    data?: any;

    constructor(statusCode: number, message = "Success", data?: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data || null;
    }
}