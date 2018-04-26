/*!
 * Vue.js v2.5.0
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";function e(e){var n;return"text"==e.tag?n=document.createTextNode(e.text):"comment"==e.tag?n=document.createComment(e.text||e._uid):(n=e.ns?document.createElementNS(e.ns,e.tag):document.createElement(e.tag)).setAttribute("_uid",e._uid),t(e._uid,n),n}function t(e,t){O[e]=t}function n(t){return O[t._uid]||e(t)}function o(){if(O[0])return O[0];console.error("[qy webview] error at getRoot ")}function i(t){return O[t.parent._uid]||e(t.parent)}function a(t){return t.ref?O[t.ref._uid]||e({_uid:t.ref._uid,tag:t.ref.tag}):null}function r(e){return"[object Function]"===Object.prototype.toString.call(e)}function c(e,t){var n={type:e,data:t};f("native",JSON.stringify(n))}function u(e,t,n){var o="__thread__.getEvent({";e&&(o+="_uid:"+e._uid),t&&(o+=",event:'"+t+"'"),n&&(o+=",params:"+JSON.stringify(n)),f("thread",o+="})")}function f(e,t){console.log("[executeJS] target : "+e+" ; scriptContent : "+t),"thread"===e?(N&&window.webkit.messageHandlers.emit.postMessage(t),M&&console.log("execute:"+t),L&&new Function(t)()):"native"===e&&(N&&window.webkit.messageHandlers.native_call.postMessage(t),M&&console.log("hal:"+t),L&&console.log("[webview] error : native call "+t))}function d(e){return e=e.getBoundingClientRect(),{hoverLeft:e.left,hoverTop:e.top,left:e.left+window.scrollX,top:e.top+window.scrollY}}function s(e,t,n,o,i){var a={};a.top=o?d(t).hoverTop:d(t).top,a.left=o?d(t).hoverLeft:d(t).left,a.height=t.offsetHeight,a.width=t.offsetWidth,a.type=n,a.viewData=i,a.hover=o,a.id=e,a.action="create",c("nativeBox",a)}function l(e){var t={};t.id=e,t.action="delete",c("nativeBox",t)}function v(e){function t(t,n){void 0===n&&(n=[]);for(var o=[],i=e.changedTouches.length;i--;)!function(){var t=e.changedTouches[i];n.forEach(function(e){(o[i]=o[i]||[])[e]=t[e]})}();return o}function n(e,t){void 0===t&&(t=[]);var n={};return t.forEach(function(t){n[t]=e[t]}),n._uid=e.getAttribute("_uid"),n}e.type.indexOf("touch")>-1&&(this.changedTouches=t(e.changedTouches,["clientX","clientY","pageX","pageY"]),this.touches=t(e.touches,["clientX","clientY","identifier","pageX","pageY"]),this.realTarget=n(document.elementFromPoint(this.touches[0].clientX,this.touches[0].clientY))),this.currentTarget=n(e.currentTarget,["dataset","id","offsetLeft","offsetTop"]),this.detail=e.detail||{value:e.target.value},this.target=n(e.target,["dataset","id","offsetLeft","offsetTop"]),this.timeStamp=e.timeStamp}function _(){var e=document.getElementById("page");if(!e.children||0===e.children.length){var t=o();t&&document.getElementById("page").appendChild(t)}}function g(){if(N&&window.webkit.messageHandlers.finish_construct.postMessage(0),M){var e={type:"bridgeLoadFinish",data:{finished:!0},intercept:!1};console.log("hal:"+JSON.stringify(e))}}function h(){window.__bridge__={on_recv_patch_command:function(e){m(e)}}}function w(){window.__patchQueue__&&Array.isArray(window.__patchQueue__)&&window.__patchQueue__.forEach(function(e){m(e)})}function m(e){S.forEach(function(t){e[t].forEach(function(e){k[e.op].call(null,e.val)}),"direct_dom"===t&&_()})}function p(e,t,n){if("addEventListener"in window)return e.addEventListener(t,n,!1)}function b(e,t){if(document.createEvent)return console.log("["+t+"] fired"),e.target.dispatchEvent(E(t))}function E(e){if(document.createEvent){var t=window.document.createEvent("HTMLEvents");return t.initEvent(e,!0,!0),t.eventName=e,t}}function y(e){return e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length?e.originalEvent.touches[0]:e.touches&&e.touches.length?e.touches[0]:e}function x(e){void 0===e&&(e={fingerMaxOffset:11});var t={},n={start:function(e){e=y(e),t.start=[e.pageX,e.pageY],t.offset=[0,0]},move:function(n){if(!t.start&&!t.move)return!1;n=y(n),t.move=[n.pageX,n.pageY],t.offset=[Math.abs(t.move[0]-t.start[0]),Math.abs(t.move[1]-t.start[1])],t.offset&&(t.offset[0]>e.fingerMaxOffset||t.offset[1]>e.fingerMaxOffset)&&(t={})},end:function(n){n=y(n),t.offset&&t.offset[0]<e.fingerMaxOffset&&t.offset[1]<e.fingerMaxOffset&&b(n,"tap"),t={}}};p(window,"load",function(){p(document.documentElement,"touchstart",n.start),p(document.documentElement,"touchmove",n.move),p(document.documentElement,"touchend",n.end)})}function C(){x()}var O=new Object,T=-1===location.protocol.indexOf("http"),L=!T,N=T&&void 0!==window.webkit,M=T&&!N,k=Object.freeze({init:_,appendCh:function(e){var t=n(e);i(e).appendChild(t)},removeCh:function(e){var t=n(e);t&&t.parentNode.removeChild(t)},insertBefore:function(e){var t=i(e),o=n(e),r=a(e);t.insertBefore(o,r)},setAttr:function(e){var t=n(e);"INPUT"===t.tagName&&"value"===e.key?t.value=e.val:t.setAttribute(e.key,e.val)},removeAttr:function(e){n(e).removeAttribute(e.key)},setClass:function(e){n(e).className=e.cls},setStyle:function(e){var t=n(e);Object.assign(t.style,e.style)},setText:function(e){n(e).textContent=e.text},createNative:function(e){s(e._uid,n(e),e.nativeTag,e.hover,e.data)},removeNative:function(e){l(e._uid)},updateNative:function(e){l(e._uid)},addEvent:function(e){n(e).addEventListener(e.event,function(t){u(e,e.event,new v(t))})},removeEvent:function(e,t){n(e).removeEventListener(t)},webviewApiCall:function(e){if(!__webview__||!__webview__.api)return console.log("api is not ready"),!1;var t=__webview__.api;if(e.fn.split(".").map(function(e){if(!(t=t[e]))return console.log("__webview__.api "+t+" is not registered"),!1}),!r(t))return console.log("__webview__.api "+t+" is not a function"),!1;t(e.params)},webviewComCall:function(e){var t=window.__webview__.component;return t?r(t[e.fn])?void t[e.fn].call(n(e),e.params):(console.log("component "+e.fn+" is not registered"),!1):(console.log("__component__ is not ready"),!1)}}),S=["direct_dom","direct_attr","direct_api","direct_com","direct_native"],A=Object.freeze({triggerCallback:function(e){f("thread","__thread__.callback.triggerCallback( "+e+" )")}});"addEventListener"in document&&document.addEventListener("DOMContentLoaded",function(){L&&w(),h(),T&&g(),C()},!1),window.__webview__=window.__webview__||{},window.__webview__.bridge={executeJS:f},window.__webview__.callback=A});