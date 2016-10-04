(function(NS) {
    'use strict';
    class ApiError {
        constructor(request, ex) {
            this.request = request;
            this.ex = ex;
        }
    }

    class Api {

        constructor(options) {
            this.key = options.key;
            this.host = options.host;
        }

        searchBooks(value, cb) {
            this._doRequest('volumes', { q: value, maxResults: 40 }, cb);
        }

        _doRequest(prefix, data, cb, method='GET') {
            var request = new XMLHttpRequest();
            data = data || {};
            data.key = this.key;
            var dataStr = JSON.stringify(data);
            var url = this.host + prefix + this._serializeParams(data);
            request.open(method, url);
            function answer() {
                if (XMLHttpRequest.DONE === request.readyState) {
                    if (request.status === 200) {
                        var data;
                        try {
                            data = JSON.parse(request.responseText);
                        } catch(ex) {
                            cb(new ApiError(request, ex));
                            return;
                        }
                        cb(null, data);
                    } else {
                        cb(new ApiError(request));
                    }
                }
            }
            request.onreadystatechange = answer;
            request.send(null);
            return request;
        }

        _serializeParams(data) {
            if (data == null) {
                return '';
            }

            var result = [];

            for (var k in data) if (data.hasOwnProperty(k)) {
                result.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
            }

            return '?' + result.join('&');
        }
    }

    NS.Api = Api;
})(Book);
