"use strict";

/**
 * simpleAjax Library
 * A simple AJAX Library for making HTTP Requests"
 *
 * @version 1.0.0
 * @author Bolaji Ayodeji
 * @license MIT
 */
function SimpleAJAX() {
    this.http = new XMLHttpRequest();
} // HTTP GET Request


SimpleAJAX.prototype.get = function (url, callback) {
    let _this = this;

    this.http.open('GET', url, true);

    this.http.onload = function () {
        if (_this.http.status === 200) {
            callback(null, _this.http.responseText);
        } else {
            callback('Error: ' + _this.http.status);
        }
    };

    this.http.send();
}; // HTTP POST Request


SimpleAJAX.prototype.post = function (url, data, callback) {
    let _this2 = this;

    this.http.open('POST', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    this.http.onload = function () {
        callback(null, _this2.http.responseText);
    };

    this.http.send(JSON.stringify(data));
}; // HTTP PUT Request


SimpleAJAX.prototype.put = function (url, data, callback) {
    let _this3 = this;

    this.http.open('PUT', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    this.http.onload = function () {
        callback(null, _this3.http.responseText);
    };

    this.http.send(JSON.stringify(data));
}; // HTTP DELETE Request


SimpleAJAX.prototype.delete = function (url, callback) {
    let _this4 = this;

    this.http.open('DELETE', url, true);

    this.http.onload = function () {
        if (_this4.http.status === 200) {
            callback(null, 'Resource Deleted!');
        } else {
            callback('Error: ' + _this4.http.status);
        }
    };

    this.http.send();
};
