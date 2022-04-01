class SuccesObjectResponse {
    constructor(result, status = 200) {
        this.result = result,
            this.status = status;
    }
}

class SuccesArrayResponse {
    constructor(results, count, status = 200) {
        this.results = results,
            this.count = count,
            this.status = status;
    }
}

module.exports = {
    SuccesObjectResponse, SuccesArrayResponse
};