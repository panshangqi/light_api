class ApiError extends Error {
    constructor(error_code, message, content, name) {
        console.log(error_code, message, content, name)
        //console.trace();
        super();
        if (typeof error_code == 'number') {
            this.code = error_code;
            this.message = message;
        } else {
            this.code = error_code.code
            this.message = error_code.name
        }
        this.content = content
        if (name) {
            this.name = name
        } else if (content == 1) {
            this.name = 'white_err'
        }
    }
}

ApiError.Error404NotFound = { code: 404, name: 'not found' };
ApiError.Error403Forbidden = { code: 403, name: 'forbidden' };
ApiError.Error402UnLogin = { code: 402, name: 'un login' };
ApiError.Error401UnAuthorized = { code: 401, name: 'un authorized' };
ApiError.Error400BadRequest = { code: 400, name: 'bad request' };
ApiError.Error511SomeError = { code: 511, name: 'server some error' };
ApiError.Error512CheckFail = { code: 512, name: 'check fail' };

ApiError.ErrorForWrongParameter = (parameterName) => {
    return new ApiError(ApiError.Error400BadRequest,
        `The value of the parameter ${parameterName} is wrong`)
};

ApiError.ErrorForNeedParameter = (parameterName) => {
    return new ApiError(400, `The parameter ${parameterName} is need`);
}



module.exports = ApiError;