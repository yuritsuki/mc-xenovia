/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["post"] = post;
/* harmony export (immutable) */ __webpack_exports__["get"] = get;
/* harmony export (immutable) */ __webpack_exports__["del"] = del;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


function post(_this, url, payload, successCallback, errorCallback) {


    _this.$bar.start();


    let headers = _this.$auth.getToken() ? {'Authorization': `Bearer ${_this.$auth.getToken()}`} : '';

    return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'POST',
        url: url,
        data: payload,
        headers: headers
    }).then(response => {

        _this.$bar.finish();
        successCallback( response );

    }).catch(error => {

        if(!error.status)
            console.log('network error');

        console.log(error.response);

        _this.$bar.finish();
        if(errorCallback)
            errorCallback( error );

    });
}

function get(_this, url, payload, successCallback, errorCallback) {

    _this.$bar.start();

    let headers = _this.$auth.getToken() ? {'Authorization': `Bearer ${_this.$auth.getToken()}`} : '';

    return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'GET',
        url: url,
        params: payload.params,
        headers: headers
    }).then(response => {

        _this.$bar.finish();
        successCallback( response );

    }).catch(error => {

        _this.$bar.finish();
        if(errorCallback)
            errorCallback( error );

    });


}


function del(_this, url, payload, successCallback, errorCallback) {

    _this.$bar.start();

    let headers = _this.$auth.getToken() ? {'Authorization': `Bearer ${_this.$auth.getToken()}`} : '';

    return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'DELETE',
        url: url,
        headers: headers
    }).then(response => {

        _this.$bar.finish();
        successCallback( response );

    }).catch(error => {

        _this.$bar.finish();
        if(errorCallback)
            errorCallback( error );

    });


}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = axios;

/***/ })
/******/ ]);