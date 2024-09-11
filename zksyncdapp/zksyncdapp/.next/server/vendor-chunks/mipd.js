"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mipd";
exports.ids = ["vendor-chunks/mipd"];
exports.modules = {

/***/ "(ssr)/./node_modules/mipd/dist/esm/store.js":
/*!*********************************************!*\
  !*** ./node_modules/mipd/dist/esm/store.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createStore: () => (/* binding */ createStore)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/mipd/dist/esm/utils.js\");\n\nfunction createStore() {\n    const listeners = new Set();\n    let providerDetails = [];\n    const request = () => (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.requestProviders)((providerDetail) => {\n        if (providerDetails.some(({ info }) => info.uuid === providerDetail.info.uuid))\n            return;\n        providerDetails = [...providerDetails, providerDetail];\n        listeners.forEach((listener) => listener(providerDetails, { added: [providerDetail] }));\n    });\n    let unwatch = request();\n    return {\n        _listeners() {\n            return listeners;\n        },\n        clear() {\n            listeners.forEach((listener) => listener([], { removed: [...providerDetails] }));\n            providerDetails = [];\n        },\n        destroy() {\n            this.clear();\n            listeners.clear();\n            unwatch?.();\n        },\n        findProvider({ rdns }) {\n            return providerDetails.find((providerDetail) => providerDetail.info.rdns === rdns);\n        },\n        getProviders() {\n            return providerDetails;\n        },\n        reset() {\n            this.clear();\n            unwatch?.();\n            unwatch = request();\n        },\n        subscribe(listener, { emitImmediately } = {}) {\n            listeners.add(listener);\n            if (emitImmediately)\n                listener(providerDetails, { added: providerDetails });\n            return () => listeners.delete(listener);\n        },\n    };\n}\n//# sourceMappingURL=store.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWlwZC9kaXN0L2VzbS9zdG9yZS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUE4QztBQUN2QztBQUNQO0FBQ0E7QUFDQSwwQkFBMEIsMkRBQWdCO0FBQzFDLG9DQUFvQyxNQUFNO0FBQzFDO0FBQ0E7QUFDQSxvRUFBb0UseUJBQXlCO0FBQzdGLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDJEQUEyRCwrQkFBK0I7QUFDMUY7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsdUJBQXVCLE1BQU07QUFDN0I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw4QkFBOEIsa0JBQWtCLElBQUk7QUFDcEQ7QUFDQTtBQUNBLDRDQUE0Qyx3QkFBd0I7QUFDcEU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vemtzeW5jZGFwcC8uL25vZGVfbW9kdWxlcy9taXBkL2Rpc3QvZXNtL3N0b3JlLmpzP2U1OGEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVxdWVzdFByb3ZpZGVycyB9IGZyb20gJy4vdXRpbHMuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IG5ldyBTZXQoKTtcbiAgICBsZXQgcHJvdmlkZXJEZXRhaWxzID0gW107XG4gICAgY29uc3QgcmVxdWVzdCA9ICgpID0+IHJlcXVlc3RQcm92aWRlcnMoKHByb3ZpZGVyRGV0YWlsKSA9PiB7XG4gICAgICAgIGlmIChwcm92aWRlckRldGFpbHMuc29tZSgoeyBpbmZvIH0pID0+IGluZm8udXVpZCA9PT0gcHJvdmlkZXJEZXRhaWwuaW5mby51dWlkKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcHJvdmlkZXJEZXRhaWxzID0gWy4uLnByb3ZpZGVyRGV0YWlscywgcHJvdmlkZXJEZXRhaWxdO1xuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKHByb3ZpZGVyRGV0YWlscywgeyBhZGRlZDogW3Byb3ZpZGVyRGV0YWlsXSB9KSk7XG4gICAgfSk7XG4gICAgbGV0IHVud2F0Y2ggPSByZXF1ZXN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgX2xpc3RlbmVycygpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lcnM7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyKCkge1xuICAgICAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcihbXSwgeyByZW1vdmVkOiBbLi4ucHJvdmlkZXJEZXRhaWxzXSB9KSk7XG4gICAgICAgICAgICBwcm92aWRlckRldGFpbHMgPSBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgIGxpc3RlbmVycy5jbGVhcigpO1xuICAgICAgICAgICAgdW53YXRjaD8uKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmRQcm92aWRlcih7IHJkbnMgfSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyRGV0YWlscy5maW5kKChwcm92aWRlckRldGFpbCkgPT4gcHJvdmlkZXJEZXRhaWwuaW5mby5yZG5zID09PSByZG5zKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJvdmlkZXJzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyRGV0YWlscztcbiAgICAgICAgfSxcbiAgICAgICAgcmVzZXQoKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICB1bndhdGNoPy4oKTtcbiAgICAgICAgICAgIHVud2F0Y2ggPSByZXF1ZXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIHN1YnNjcmliZShsaXN0ZW5lciwgeyBlbWl0SW1tZWRpYXRlbHkgfSA9IHt9KSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIGlmIChlbWl0SW1tZWRpYXRlbHkpXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIocHJvdmlkZXJEZXRhaWxzLCB7IGFkZGVkOiBwcm92aWRlckRldGFpbHMgfSk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gbGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mipd/dist/esm/store.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/mipd/dist/esm/utils.js":
/*!*********************************************!*\
  !*** ./node_modules/mipd/dist/esm/utils.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   announceProvider: () => (/* binding */ announceProvider),\n/* harmony export */   requestProviders: () => (/* binding */ requestProviders)\n/* harmony export */ });\n/**\n * Announces an EIP-1193 Provider.\n */\nfunction announceProvider(detail) {\n    const event = new CustomEvent('eip6963:announceProvider', { detail: Object.freeze(detail) });\n    window.dispatchEvent(event);\n    const handler = () => window.dispatchEvent(event);\n    window.addEventListener('eip6963:requestProvider', handler);\n    return () => window.removeEventListener('eip6963:requestProvider', handler);\n}\n/**\n * Watches for EIP-1193 Providers to be announced.\n */\nfunction requestProviders(listener) {\n    if (typeof window === 'undefined')\n        return;\n    const handler = (event) => listener(event.detail);\n    window.addEventListener('eip6963:announceProvider', handler);\n    window.dispatchEvent(new CustomEvent('eip6963:requestProvider'));\n    return () => window.removeEventListener('eip6963:announceProvider', handler);\n}\n//# sourceMappingURL=utils.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWlwZC9kaXN0L2VzbS91dGlscy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsZ0VBQWdFLCtCQUErQjtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vemtzeW5jZGFwcC8uL25vZGVfbW9kdWxlcy9taXBkL2Rpc3QvZXNtL3V0aWxzLmpzPzQ1ZDEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBbm5vdW5jZXMgYW4gRUlQLTExOTMgUHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbm5vdW5jZVByb3ZpZGVyKGRldGFpbCkge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdlaXA2OTYzOmFubm91bmNlUHJvdmlkZXInLCB7IGRldGFpbDogT2JqZWN0LmZyZWV6ZShkZXRhaWwpIH0pO1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICBjb25zdCBoYW5kbGVyID0gKCkgPT4gd2luZG93LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlaXA2OTYzOnJlcXVlc3RQcm92aWRlcicsIGhhbmRsZXIpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZWlwNjk2MzpyZXF1ZXN0UHJvdmlkZXInLCBoYW5kbGVyKTtcbn1cbi8qKlxuICogV2F0Y2hlcyBmb3IgRUlQLTExOTMgUHJvdmlkZXJzIHRvIGJlIGFubm91bmNlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RQcm92aWRlcnMobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBoYW5kbGVyID0gKGV2ZW50KSA9PiBsaXN0ZW5lcihldmVudC5kZXRhaWwpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlaXA2OTYzOmFubm91bmNlUHJvdmlkZXInLCBoYW5kbGVyKTtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2VpcDY5NjM6cmVxdWVzdFByb3ZpZGVyJykpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZWlwNjk2Mzphbm5vdW5jZVByb3ZpZGVyJywgaGFuZGxlcik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlscy5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mipd/dist/esm/utils.js\n");

/***/ })

};
;