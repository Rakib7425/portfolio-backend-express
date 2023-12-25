class ApiResponse {
	constructor(statusCode, success = true, message = "Success", data) {
		this.statusCode = statusCode;
		this.success = success;
		this.message = message;
		this.data = data;
	}
}

export { ApiResponse };
