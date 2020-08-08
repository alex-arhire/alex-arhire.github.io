class MethodHandler {
    constructor(route, id, method, body) {
        this.route = route;
        this.id = id;
        this.method = method;
        this.body = body;
    }

    sendRequest() {
        return fetch(this.route, {
            method: this.method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: this.body
        }).then(r => r.json());
    }
}

export {MethodHandler};