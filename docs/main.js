/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

 // Track scroll position as custom CSS variable on document body

window.addEventListener('scroll', function () {
  var scroll = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
  document.body.style.setProperty('--scroll', scroll.toString());
}, false);
/******/ })()
;