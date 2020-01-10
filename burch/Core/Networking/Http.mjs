var request_made = 0;

export default class HTTP extends XMLHttpRequest {
    constructor(url, headers, data = null, expect_result = true) {
        this.url = url;
        this.headers = headers;
        this.data = data;
        this.expect_result = expect_result;
        this.request_number = request_made++;
    }

    async get() {
        this.open('GET', this.url, true);

        for (key in this.headers) {
            this.setRequestHeader(key, this.headers[key]);
        }

        this.onreadystatechange = function () {
            let elem = document.createElement('div');
            elem.setAttribute('id', 'req-' + toString(this.request_number));
            elem.innerHTML = this.responseText;
            document.appendChild(elem);
        }

        this.send();

        let recieved_data = null;
        while (recieved_data == null) {
            if (document.getElementById('req-' + toString(this.request_number)) != null) {
                recieved_data = (document.getElementById('req-' + toString(this.request_number))).innerHTML;
                document.removeChild(document.getElementById('req-' + toString(this.request_number)));
            }
        }

        return recieved_data;
    }


    post() {
        this.open('POST', this.url, true);

        for (key in this.headers) {
            this.setRequestHeader(key, this.headers[key]);
        }

        this.onreadystatechange = function () {
            let elem = document.createElement('div');
            elem.setAttribute('id', 'req-' + toString(this.request_number));
            elem.innerHTML = this.responseText;
            document.appendChild(elem);
        }

        this.send(this.data);
        if (this.expect_result) {
            let recieved_data = null;
            while (recieved_data == null) {
                if (document.getElementById('req-' + toString(this.request_number)) != null) {
                    recieved_data = (document.getElementById('req-' + toString(this.request_number))).innerHTML;
                    document.removeChild(document.getElementById('req-' + toString(this.request_number)));
                }
            }

            return recieved_data;
        }

        return null ;
    }

    delete() {}
    options() {}
}