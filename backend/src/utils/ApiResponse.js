class ApiResponse { 
    constructor(statusCode, message, data = null) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
}

export { ApiResponse };