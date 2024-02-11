(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';var m;function ba(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
var ca="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ea(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var fa=ea(this);function u(a,b){if(b)a:{var c=fa;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ca(c,a,{configurable:!0,writable:!0,value:b})}}
u("Symbol",function(a){function b(f){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c(d+(f||"")+"_"+e++,f)}
function c(f,g){this.h=f;ca(this,"description",{configurable:!0,writable:!0,value:g})}
if(a)return a;c.prototype.toString=function(){return this.h};
var d="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",e=0;return b});
u("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=fa[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&ca(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ha(ba(this))}})}return a});
function ha(a){a={next:a};a[Symbol.iterator]=function(){return this};
return a}
function ia(a){return a.raw=a}
function v(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if("number"==typeof a.length)return{next:ba(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}
function ka(a){if(!(a instanceof Array)){a=v(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}
function la(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
var ma="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)la(d,e)&&(a[e]=d[e])}return a};
u("Object.assign",function(a){return a||ma});
var oa="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},pa=function(){function a(){function c(){}
new c;Reflect.construct(c,[],function(){});
return new c instanceof c}
if("undefined"!=typeof Reflect&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(c,d,e){c=b(c,d);e&&Reflect.setPrototypeOf(c,e.prototype);return c}}return function(c,d,e){void 0===e&&(e=c);
e=oa(e.prototype||Object.prototype);return Function.prototype.apply.call(c,e,d)||e}}(),ra;
if("function"==typeof Object.setPrototypeOf)ra=Object.setPrototypeOf;else{var sa;a:{var ta={a:!0},ua={};try{ua.__proto__=ta;sa=ua.a;break a}catch(a){}sa=!1}ra=sa?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var va=ra;
function w(a,b){a.prototype=oa(b.prototype);a.prototype.constructor=a;if(va)va(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.xa=b.prototype}
function wa(){this.T=!1;this.l=null;this.i=void 0;this.h=1;this.m=this.s=0;this.A=this.j=null}
function xa(a){if(a.T)throw new TypeError("Generator is already running");a.T=!0}
wa.prototype.ka=function(a){this.i=a};
function ya(a,b){a.j={exception:b,nd:!0};a.h=a.s||a.m}
wa.prototype.return=function(a){this.j={return:a};this.h=this.m};
wa.prototype.yield=function(a,b){this.h=b;return{value:a}};
wa.prototype.v=function(a){this.h=a};
function za(a,b,c){a.s=b;void 0!=c&&(a.m=c)}
function Aa(a,b){a.h=b;a.s=0}
function Ba(a){a.s=0;var b=a.j.exception;a.j=null;return b}
function Ca(a){a.A=[a.j];a.s=0;a.m=0}
function Da(a){var b=a.A.splice(0)[0];(b=a.j=a.j||b)?b.nd?a.h=a.s||a.m:void 0!=b.v&&a.m<b.v?(a.h=b.v,a.j=null):a.h=a.m:a.h=0}
function Ea(a){this.h=new wa;this.i=a}
function Ga(a,b){xa(a.h);var c=a.h.l;if(c)return Ha(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.h.return);
a.h.return(b);return Ia(a)}
function Ha(a,b,c,d){try{var e=b.call(a.h.l,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.h.T=!1,e;var f=e.value}catch(g){return a.h.l=null,ya(a.h,g),Ia(a)}a.h.l=null;d.call(a.h,f);return Ia(a)}
function Ia(a){for(;a.h.h;)try{var b=a.i(a.h);if(b)return a.h.T=!1,{value:b.value,done:!1}}catch(c){a.h.i=void 0,ya(a.h,c)}a.h.T=!1;if(a.h.j){b=a.h.j;a.h.j=null;if(b.nd)throw b.exception;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function Ja(a){this.next=function(b){xa(a.h);a.h.l?b=Ha(a,a.h.l.next,b,a.h.ka):(a.h.ka(b),b=Ia(a));return b};
this.throw=function(b){xa(a.h);a.h.l?b=Ha(a,a.h.l["throw"],b,a.h.ka):(ya(a.h,b),b=Ia(a));return b};
this.return=function(b){return Ga(a,b)};
this[Symbol.iterator]=function(){return this}}
function Ka(a){function b(d){return a.next(d)}
function c(d){return a.throw(d)}
return new Promise(function(d,e){function f(g){g.done?d(g.value):Promise.resolve(g.value).then(b,c).then(f,e)}
f(a.next())})}
function A(a){return Ka(new Ja(new Ea(a)))}
function B(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b}
u("Reflect",function(a){return a?a:{}});
u("Reflect.construct",function(){return pa});
u("Reflect.setPrototypeOf",function(a){return a?a:va?function(b,c){try{return va(b,c),!0}catch(d){return!1}}:null});
u("Promise",function(a){function b(g){this.h=0;this.j=void 0;this.i=[];this.T=!1;var h=this.l();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}
function c(){this.h=null}
function d(g){return g instanceof b?g:new b(function(h){h(g)})}
if(a)return a;c.prototype.i=function(g){if(null==this.h){this.h=[];var h=this;this.j(function(){h.m()})}this.h.push(g)};
var e=fa.setTimeout;c.prototype.j=function(g){e(g,0)};
c.prototype.m=function(){for(;this.h&&this.h.length;){var g=this.h;this.h=[];for(var h=0;h<g.length;++h){var k=g[h];g[h]=null;try{k()}catch(l){this.l(l)}}}this.h=null};
c.prototype.l=function(g){this.j(function(){throw g;})};
b.prototype.l=function(){function g(l){return function(n){k||(k=!0,l.call(h,n))}}
var h=this,k=!1;return{resolve:g(this.X),reject:g(this.m)}};
b.prototype.X=function(g){if(g===this)this.m(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.ba(g);else{a:switch(typeof g){case "object":var h=null!=g;break a;case "function":h=!0;break a;default:h=!1}h?this.W(g):this.s(g)}};
b.prototype.W=function(g){var h=void 0;try{h=g.then}catch(k){this.m(k);return}"function"==typeof h?this.ea(h,g):this.s(g)};
b.prototype.m=function(g){this.ka(2,g)};
b.prototype.s=function(g){this.ka(1,g)};
b.prototype.ka=function(g,h){if(0!=this.h)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.h);this.h=g;this.j=h;2===this.h&&this.aa();this.A()};
b.prototype.aa=function(){var g=this;e(function(){if(g.M()){var h=fa.console;"undefined"!==typeof h&&h.error(g.j)}},1)};
b.prototype.M=function(){if(this.T)return!1;var g=fa.CustomEvent,h=fa.Event,k=fa.dispatchEvent;if("undefined"===typeof k)return!0;"function"===typeof g?g=new g("unhandledrejection",{cancelable:!0}):"function"===typeof h?g=new h("unhandledrejection",{cancelable:!0}):(g=fa.document.createEvent("CustomEvent"),g.initCustomEvent("unhandledrejection",!1,!0,g));g.promise=this;g.reason=this.j;return k(g)};
b.prototype.A=function(){if(null!=this.i){for(var g=0;g<this.i.length;++g)f.i(this.i[g]);this.i=null}};
var f=new c;b.prototype.ba=function(g){var h=this.l();g.Xb(h.resolve,h.reject)};
b.prototype.ea=function(g,h){var k=this.l();try{g.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};
b.prototype.then=function(g,h){function k(t,r){return"function"==typeof t?function(x){try{l(t(x))}catch(y){n(y)}}:r}
var l,n,p=new b(function(t,r){l=t;n=r});
this.Xb(k(g,l),k(h,n));return p};
b.prototype.catch=function(g){return this.then(void 0,g)};
b.prototype.Xb=function(g,h){function k(){switch(l.h){case 1:g(l.j);break;case 2:h(l.j);break;default:throw Error("Unexpected state: "+l.h);}}
var l=this;null==this.i?f.i(k):this.i.push(k);this.T=!0};
b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};
b.race=function(g){return new b(function(h,k){for(var l=v(g),n=l.next();!n.done;n=l.next())d(n.value).Xb(h,k)})};
b.all=function(g){var h=v(g),k=h.next();return k.done?d([]):new b(function(l,n){function p(x){return function(y){t[x]=y;r--;0==r&&l(t)}}
var t=[],r=0;do t.push(void 0),r++,d(k.value).Xb(p(t.length-1),n),k=h.next();while(!k.done)})};
return b});
u("WeakMap",function(a){function b(k){this.h=(h+=Math.random()+1).toString();if(k){k=v(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}
function c(){}
function d(k){var l=typeof k;return"object"===l&&null!==k||"function"===l}
function e(k){if(!la(k,g)){var l=new c;ca(k,g,{value:l})}}
function f(k){var l=Object[k];l&&(Object[k]=function(n){if(n instanceof c)return n;Object.isExtensible(n)&&e(n);return l(n)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),n=new a([[k,2],[l,3]]);if(2!=n.get(k)||3!=n.get(l))return!1;n.delete(k);n.set(l,4);return!n.has(k)&&4==n.get(l)}catch(p){return!1}}())return a;
var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!la(k,g))throw Error("WeakMap key fail: "+k);k[g][this.h]=l;return this};
b.prototype.get=function(k){return d(k)&&la(k,g)?k[g][this.h]:void 0};
b.prototype.has=function(k){return d(k)&&la(k,g)&&la(k[g],this.h)};
b.prototype.delete=function(k){return d(k)&&la(k,g)&&la(k[g],this.h)?delete k[g][this.h]:!1};
return b});
u("Map",function(a){function b(){var h={};return h.previous=h.next=h.head=h}
function c(h,k){var l=h.h;return ha(function(){if(l){for(;l.head!=h.h;)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(h,k){var l=k&&typeof k;"object"==l||"function"==l?f.has(k)?l=f.get(k):(l=""+ ++g,f.set(k,l)):l="p_"+k;var n=h.data_[l];if(n&&la(h.data_,l))for(h=0;h<n.length;h++){var p=n[h];if(k!==k&&p.key!==p.key||k===p.key)return{id:l,list:n,index:h,entry:p}}return{id:l,list:n,index:-1,entry:void 0}}
function e(h){this.data_={};this.h=b();this.size=0;if(h){h=v(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var h=Object.seal({x:4}),k=new a(v([[h,"s"]]));if("s"!=k.get(h)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var l=k.entries(),n=l.next();if(n.done||n.value[0]!=h||"s"!=n.value[1])return!1;n=l.next();return n.done||4!=n.value[0].x||"t"!=n.value[1]||!l.next().done?!1:!0}catch(p){return!1}}())return a;
var f=new WeakMap;e.prototype.set=function(h,k){h=0===h?0:h;var l=d(this,h);l.list||(l.list=this.data_[l.id]=[]);l.entry?l.entry.value=k:(l.entry={next:this.h,previous:this.h.previous,head:this.h,key:h,value:k},l.list.push(l.entry),this.h.previous.next=l.entry,this.h.previous=l.entry,this.size++);return this};
e.prototype.delete=function(h){h=d(this,h);return h.entry&&h.list?(h.list.splice(h.index,1),h.list.length||delete this.data_[h.id],h.entry.previous.next=h.entry.next,h.entry.next.previous=h.entry.previous,h.entry.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this.data_={};this.h=this.h.previous=b();this.size=0};
e.prototype.has=function(h){return!!d(this,h).entry};
e.prototype.get=function(h){return(h=d(this,h).entry)&&h.value};
e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};
e.prototype.keys=function(){return c(this,function(h){return h.key})};
e.prototype.values=function(){return c(this,function(h){return h.value})};
e.prototype.forEach=function(h,k){for(var l=this.entries(),n;!(n=l.next()).done;)n=n.value,h.call(k,n[1],n[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});
function La(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
u("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=La(this,b,"endsWith");b+="";void 0===c&&(c=d.length);c=Math.max(0,Math.min(c|0,d.length));for(var e=b.length;0<e&&0<c;)if(d[--c]!=b[--e])return!1;return 0>=e}});
u("Array.prototype.find",function(a){return a?a:function(b,c){a:{var d=this;d instanceof String&&(d=String(d));for(var e=d.length,f=0;f<e;f++){var g=d[f];if(b.call(c,g,f,d)){b=g;break a}}b=void 0}return b}});
u("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=La(this,b,"startsWith");b+="";var e=d.length,f=b.length;c=Math.max(0,Math.min(c|0,d.length));for(var g=0;g<f&&c<e;)if(d[c++]!=b[g++])return!1;return g>=f}});
u("Number.isFinite",function(a){return a?a:function(b){return"number"!==typeof b?!1:!isNaN(b)&&Infinity!==b&&-Infinity!==b}});
u("Object.values",function(a){return a?a:function(b){var c=[],d;for(d in b)la(b,d)&&c.push(b[d]);return c}});
u("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});
u("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(0>c&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===b||Object.is(f,b))return!0}return!1}});
u("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==La(this,b,"includes").indexOf(b,c||0)}});
u("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991});
u("Number.isNaN",function(a){return a?a:function(b){return"number"===typeof b&&isNaN(b)}});
u("Number.isInteger",function(a){return a?a:function(b){return Number.isFinite(b)?b===Math.floor(b):!1}});
function Ma(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};
e[Symbol.iterator]=function(){return e};
return e}
u("Array.prototype.entries",function(a){return a?a:function(){return Ma(this,function(b,c){return[b,c]})}});
u("Array.prototype.keys",function(a){return a?a:function(){return Ma(this,function(b){return b})}});
u("Array.from",function(a){return a?a:function(b,c,d){c=null!=c?c:function(h){return h};
var e=[],f="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];if("function"==typeof f){b=f.call(b);for(var g=0;!(f=b.next()).done;)e.push(c.call(d,f.value,g++))}else for(f=b.length,g=0;g<f;g++)e.push(c.call(d,b[g],g));return e}});
u("Array.prototype.values",function(a){return a?a:function(){return Ma(this,function(b,c){return c})}});
u("Object.setPrototypeOf",function(a){return a||va});
u("Set",function(a){function b(c){this.h=new Map;if(c){c=v(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.h.size}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(v([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;
b.prototype.add=function(c){c=0===c?0:c;this.h.set(c,c);this.size=this.h.size;return this};
b.prototype.delete=function(c){c=this.h.delete(c);this.size=this.h.size;return c};
b.prototype.clear=function(){this.h.clear();this.size=0};
b.prototype.has=function(c){return this.h.has(c)};
b.prototype.entries=function(){return this.h.entries()};
b.prototype.values=function(){return this.h.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.h.forEach(function(f){return c.call(d,f,f,e)})};
return b});
u("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)la(b,d)&&c.push([d,b[d]]);return c}});
u("globalThis",function(a){return a||fa});
var Na=Na||{},C=this||self;function D(a,b,c){a=a.split(".");c=c||C;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
function E(a,b){a=a.split(".");b=b||C;for(var c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b}
function Oa(a){var b=typeof a;return"object"!=b?b:a?Array.isArray(a)?"array":b:"null"}
function Pa(a){var b=Oa(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function Qa(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function Ra(a){return Object.prototype.hasOwnProperty.call(a,Sa)&&a[Sa]||(a[Sa]=++Ta)}
var Sa="closure_uid_"+(1E9*Math.random()>>>0),Ta=0;function Ua(a,b,c){return a.call.apply(a.bind,arguments)}
function Va(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function Wa(a,b,c){Wa=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Ua:Va;return Wa.apply(null,arguments)}
function Xa(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
function Ya(a,b){function c(){}
c.prototype=b.prototype;a.xa=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}}
function Za(a){return a}
;function $a(a,b){if(Error.captureStackTrace)Error.captureStackTrace(this,$a);else{var c=Error().stack;c&&(this.stack=c)}a&&(this.message=String(a));void 0!==b&&(this.cause=b)}
Ya($a,Error);$a.prototype.name="CustomError";function ab(a){a=a.url;var b=/[?&]dsh=1(&|$)/.test(a);this.j=!b&&/[?&]ae=1(&|$)/.test(a);this.l=!b&&/[?&]ae=2(&|$)/.test(a);if((this.h=/[?&]adurl=([^&]*)/.exec(a))&&this.h[1]){try{var c=decodeURIComponent(this.h[1])}catch(d){c=null}this.i=c}}
;function bb(){}
function cb(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;var db=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},eb=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},fb=Array.prototype.filter?function(a,b){return Array.prototype.filter.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=[],e=0,f="string"===typeof a?a.split(""):a,g=0;g<c;g++)if(g in f){var h=f[g];
b.call(void 0,h,g,a)&&(d[e++]=h)}return d},gb=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e="string"===typeof a?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));
return d},hb=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
eb(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function ib(a,b){a:{for(var c=a.length,d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:"string"===typeof a?a.charAt(b):a[b]}
function jb(a,b){b=db(a,b);var c;(c=0<=b)&&Array.prototype.splice.call(a,b,1);return c}
function kb(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(Pa(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function lb(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function mb(a){var b=nb,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function ob(a){for(var b in a)return!1;return!0}
function pb(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function qb(a){return null!==a&&"privembed"in a?a.privembed:!1}
function rb(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function sb(a){var b={},c;for(c in a)b[c]=a[c];return b}
function tb(a){if(!a||"object"!==typeof a)return a;if("function"===typeof a.clone)return a.clone();if("undefined"!==typeof Map&&a instanceof Map)return new Map(a);if("undefined"!==typeof Set&&a instanceof Set)return new Set(a);if(a instanceof Date)return new Date(a.getTime());var b=Array.isArray(a)?[]:"function"!==typeof ArrayBuffer||"function"!==typeof ArrayBuffer.isView||!ArrayBuffer.isView(a)||a instanceof DataView?{}:new a.constructor(a.length),c;for(c in a)b[c]=tb(a[c]);return b}
var ub="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function vb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ub.length;f++)c=ub[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var wb;function xb(){if(void 0===wb){var a=null,b=C.trustedTypes;if(b&&b.createPolicy){try{a=b.createPolicy("goog#html",{createHTML:Za,createScript:Za,createScriptURL:Za})}catch(c){C.console&&C.console.error(c.message)}wb=a}else wb=a}return wb}
;function yb(a,b){this.j=a===zb&&b||""}
yb.prototype.i=!0;yb.prototype.h=function(){return this.j};
function Ab(a){return new yb(zb,a)}
var zb={};Ab("");var Bb={};function Cb(a){this.j=a;this.i=!0}
Cb.prototype.toString=function(){return this.j.toString()};
Cb.prototype.h=function(){return this.j.toString()};function Db(a){this.j=a}
Db.prototype.toString=function(){return this.j+""};
Db.prototype.i=!0;Db.prototype.h=function(){return this.j.toString()};
function Eb(a){if(a instanceof Db&&a.constructor===Db)return a.j;Oa(a);return"type_error:TrustedResourceUrl"}
var Fb={};function Gb(a){var b=xb();a=b?b.createScriptURL(a):a;return new Db(a,Fb)}
;var Hb=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};
function Ib(a,b){return-1!=a.toLowerCase().indexOf(b.toLowerCase())}
function Jb(a,b){return a<b?-1:a>b?1:0}
;function Kb(a){this.j=a}
Kb.prototype.toString=function(){return this.j.toString()};
Kb.prototype.i=!0;Kb.prototype.h=function(){return this.j.toString()};
function Lb(a){if(a instanceof Kb&&a.constructor===Kb)return a.j;Oa(a);return"type_error:SafeUrl"}
var Mb;try{new URL("s://g"),Mb=!0}catch(a){Mb=!1}var Nb=Mb;function Ob(a){if(a instanceof Kb)return a;a="object"==typeof a&&a.i?a.h():String(a);a:{var b=a;if(Nb){try{var c=new URL(b)}catch(d){b="https:";break a}b=c.protocol}else b:{c=document.createElement("a");try{c.href=b}catch(d){b=void 0;break b}b=c.protocol;b=":"===b||""===b?"https:":b}}"javascript:"!==b||(a="about:invalid#zClosurez");return new Kb(a,Pb)}
var Pb={},Qb=new Kb("about:invalid#zClosurez",Pb);var Rb,Sb=E("CLOSURE_FLAGS"),Tb=Sb&&Sb[610401301];Rb=null!=Tb?Tb:!1;function Ub(){var a=C.navigator;return a&&(a=a.userAgent)?a:""}
var Vb,Wb=C.navigator;Vb=Wb?Wb.userAgentData||null:null;function Xb(a){return Rb?Vb?Vb.brands.some(function(b){return(b=b.brand)&&-1!=b.indexOf(a)}):!1:!1}
function F(a){return-1!=Ub().indexOf(a)}
;function Yb(){return Rb?!!Vb&&0<Vb.brands.length:!1}
function Zb(){return Yb()?!1:F("Opera")}
function $b(){return Yb()?!1:F("Trident")||F("MSIE")}
function ac(){return Yb()?!1:F("Edge")}
function bc(){return Yb()?Xb("Microsoft Edge"):F("Edg/")}
function cc(){return F("Firefox")||F("FxiOS")}
function dc(){return F("Safari")&&!(ec()||(Yb()?0:F("Coast"))||Zb()||ac()||bc()||(Yb()?Xb("Opera"):F("OPR"))||cc()||F("Silk")||F("Android"))}
function ec(){return Yb()?Xb("Chromium"):(F("Chrome")||F("CriOS"))&&!ac()||F("Silk")}
function fc(){return F("Android")&&!(ec()||cc()||Zb()||F("Silk"))}
function hc(a){var b={};a.forEach(function(c){b[c[0]]=c[1]});
return function(c){return b[c.find(function(d){return d in b})]||""}}
function ic(a){var b=Ub();if("Internet Explorer"===a){if($b())if((a=/rv: *([\d\.]*)/.exec(b))&&a[1])b=a[1];else{a="";var c=/MSIE +([\d\.]+)/.exec(b);if(c&&c[1])if(b=/Trident\/(\d.\d)/.exec(b),"7.0"==c[1])if(b&&b[1])switch(b[1]){case "4.0":a="8.0";break;case "5.0":a="9.0";break;case "6.0":a="10.0";break;case "7.0":a="11.0"}else a="7.0";else a=c[1];b=a}else b="";return b}var d=RegExp("([A-Z][\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?","g");c=[];for(var e;e=d.exec(b);)c.push([e[1],e[2],e[3]||void 0]);b=hc(c);
switch(a){case "Opera":if(Zb())return b(["Version","Opera"]);if(Yb()?Xb("Opera"):F("OPR"))return b(["OPR"]);break;case "Microsoft Edge":if(ac())return b(["Edge"]);if(bc())return b(["Edg"]);break;case "Chromium":if(ec())return b(["Chrome","CriOS","HeadlessChrome"])}return"Firefox"===a&&cc()||"Safari"===a&&dc()||"Android Browser"===a&&fc()||"Silk"===a&&F("Silk")?(b=c[2])&&b[1]||"":""}
function jc(a){if(Yb()&&"Silk"!==a){var b=Vb.brands.find(function(c){return c.brand===a});
if(!b||!b.version)return NaN;b=b.version.split(".")}else{b=ic(a);if(""===b)return NaN;b=b.split(".")}return 0===b.length?NaN:Number(b[0])}
;function kc(a){this.j=a;this.i=!0}
kc.prototype.h=function(){return this.j.toString()};
kc.prototype.toString=function(){return this.j.toString()};function lc(a,b){b=b instanceof Kb?b:Ob(b);a.href=Lb(b)}
function mc(a,b){a.rel="stylesheet";Ib("stylesheet","stylesheet")?(a.href=Eb(b).toString(),(b=nc('style[nonce],link[rel="stylesheet"][nonce]',a.ownerDocument&&a.ownerDocument.defaultView))&&a.setAttribute("nonce",b)):a.href=b instanceof Db?Eb(b).toString():b instanceof Kb?Lb(b):Lb(Ob(b))}
function oc(){return nc("script[nonce]")}
var pc=/^[\w+/_-]+[=]{0,2}$/;function nc(a,b){b=(b||C).document;return b.querySelector?(a=b.querySelector(a))&&(a=a.nonce||a.getAttribute("nonce"))&&pc.test(a)?a:"":""}
;function qc(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var rc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function sc(a){return a?decodeURI(a):a}
function tc(a,b){return b.match(rc)[a]||null}
function uc(a){return sc(tc(3,a))}
function vc(a){var b=a.match(rc);a=b[5];var c=b[6];b=b[7];var d="";a&&(d+=a);c&&(d+="?"+c);b&&(d+="#"+b);return d}
function wc(a){var b=a.indexOf("#");return 0>b?a:a.slice(0,b)}
function xc(a,b){if(!b)return a;var c=a.indexOf("#");0>c&&(c=a.length);var d=a.indexOf("?");if(0>d||d>c){d=c;var e=""}else e=a.substring(d+1,c);a=[a.slice(0,d),e,a.slice(c)];c=a[1];a[1]=b?c?c+"&"+b:b:c;return a[0]+(a[1]?"?"+a[1]:"")+a[2]}
function yc(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)yc(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function zc(a,b){var c=[];for(b=b||0;b<a.length;b+=2)yc(a[b],a[b+1],c);return c.join("&")}
function Ac(a){var b=[],c;for(c in a)yc(c,a[c],b);return b.join("&")}
function Bc(a,b){var c=2==arguments.length?zc(arguments[1],0):zc(arguments,1);return xc(a,c)}
function Cc(a,b){b=Ac(b);return xc(a,b)}
function Dc(a,b,c){c=null!=c?"="+encodeURIComponent(String(c)):"";return xc(a,b+c)}
function Ec(a,b,c,d){for(var e=c.length;0<=(b=a.indexOf(c,b))&&b<d;){var f=a.charCodeAt(b-1);if(38==f||63==f)if(f=a.charCodeAt(b+e),!f||61==f||38==f||35==f)return b;b+=e+1}return-1}
var Fc=/#|$/,Gc=/[?&]($|#)/;function Hc(a,b){for(var c=a.search(Fc),d=0,e,f=[];0<=(e=Ec(a,d,b,c));)f.push(a.substring(d,e)),d=Math.min(a.indexOf("&",e)+1||c,c);f.push(a.slice(d));return f.join("").replace(Gc,"$1")}
;function Ic(a){C.setTimeout(function(){throw a;},0)}
;function Jc(){return Rb?!!Vb&&!!Vb.platform:!1}
function Kc(){return Jc()?"Android"===Vb.platform:F("Android")}
function Lc(){return F("iPhone")&&!F("iPod")&&!F("iPad")}
function Mc(){return Lc()||F("iPad")||F("iPod")}
function Nc(){return Jc()?"macOS"===Vb.platform:F("Macintosh")}
function Oc(){return Jc()?"Windows"===Vb.platform:F("Windows")}
function Pc(){return Jc()?"Chrome OS"===Vb.platform:F("CrOS")}
function Qc(){var a=Ub(),b="";Oc()?(b=/Windows (?:NT|Phone) ([0-9.]+)/,b=(a=b.exec(a))?a[1]:"0.0"):Mc()?(b=/(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,b=(a=b.exec(a))&&a[1].replace(/_/g,".")):Nc()?(b=/Mac OS X ([0-9_.]+)/,b=(a=b.exec(a))?a[1].replace(/_/g,"."):"10"):Ib(Ub(),"KaiOS")?(b=/(?:KaiOS)\/(\S+)/i,b=(a=b.exec(a))&&a[1]):Kc()?(b=/Android\s+([^\);]+)(\)|;)/,b=(a=b.exec(a))&&a[1]):Pc()&&(b=/(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,b=(a=b.exec(a))&&a[1]);a=0;b=Hb(String(b||"")).split(".");for(var c=
Hb("12").split("."),d=Math.max(b.length,c.length),e=0;0==a&&e<d;e++){var f=b[e]||"",g=c[e]||"";do{f=/(\d*)(\D*)(.*)/.exec(f)||["","","",""];g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];if(0==f[0].length&&0==g[0].length)break;a=Jb(0==f[1].length?0:parseInt(f[1],10),0==g[1].length?0:parseInt(g[1],10))||Jb(0==f[2].length,0==g[2].length)||Jb(f[2],g[2]);f=f[3];g=g[3]}while(0==a)}}
;function Rc(a){Rc[" "](a);return a}
Rc[" "]=function(){};var Sc=Zb(),Tc=$b(),Uc=F("Edge"),Vc=F("Gecko")&&!(Ib(Ub(),"WebKit")&&!F("Edge"))&&!(F("Trident")||F("MSIE"))&&!F("Edge"),Wc=Ib(Ub(),"WebKit")&&!F("Edge");Wc&&F("Mobile");Nc();Oc();(Jc()?"Linux"===Vb.platform:F("Linux"))||Pc();var Xc=C.navigator||null;Xc&&(Xc.appVersion||"").indexOf("X11");var Yc=Kc();Lc();F("iPad");F("iPod");Mc();Ib(Ub(),"KaiOS");function Zc(){var a=C.document;return a?a.documentMode:void 0}
var $c;a:{var ad="",bd=function(){var a=Ub();if(Vc)return/rv:([^\);]+)(\)|;)/.exec(a);if(Uc)return/Edge\/([\d\.]+)/.exec(a);if(Tc)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Wc)return/WebKit\/(\S+)/.exec(a);if(Sc)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
bd&&(ad=bd?bd[1]:"");if(Tc){var cd=Zc();if(null!=cd&&cd>parseFloat(ad)){$c=String(cd);break a}}$c=ad}var dd=$c,ed;if(C.document&&Tc){var fd=Zc();ed=fd?fd:parseInt(dd,10)||void 0}else ed=void 0;var gd=ed;cc();var hd=Lc()||F("iPod"),id=F("iPad");fc();ec();var jd=dc()&&!Mc();var kd={},ld=null;function md(a,b){Pa(a);void 0===b&&(b=0);nd();b=kd[b];for(var c=Array(Math.floor(a.length/3)),d=b[64]||"",e=0,f=0;e<a.length-2;e+=3){var g=a[e],h=a[e+1],k=a[e+2],l=b[g>>2];g=b[(g&3)<<4|h>>4];h=b[(h&15)<<2|k>>6];k=b[k&63];c[f++]=""+l+g+h+k}l=0;k=d;switch(a.length-e){case 2:l=a[e+1],k=b[(l&15)<<2]||d;case 1:a=a[e],c[f]=""+b[a>>2]+b[(a&3)<<4|l>>4]+k+d}return c.join("")}
function od(a){var b=a.length,c=3*b/4;c%3?c=Math.floor(c):-1!="=.".indexOf(a[b-1])&&(c=-1!="=.".indexOf(a[b-2])?c-2:c-1);var d=new Uint8Array(c),e=0;pd(a,function(f){d[e++]=f});
return e!==c?d.subarray(0,e):d}
function pd(a,b){function c(k){for(;d<a.length;){var l=a.charAt(d++),n=ld[l];if(null!=n)return n;if(!/^[\s\xa0]*$/.test(l))throw Error("Unknown base64 encoding at char: "+l);}return k}
nd();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),h=c(64);if(64===h&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=h&&b(g<<6&192|h))}}
function nd(){if(!ld){ld={};for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;5>c;c++){var d=a.concat(b[c].split(""));kd[c]=d;for(var e=0;e<d.length;e++){var f=d[e];void 0===ld[f]&&(ld[f]=e)}}}}
;var qd="undefined"!==typeof Uint8Array,rd=!Tc&&"function"===typeof btoa;function sd(a){if(!rd)return md(a);for(var b="",c=0,d=a.length-10240;c<d;)b+=String.fromCharCode.apply(null,a.subarray(c,c+=10240));b+=String.fromCharCode.apply(null,c?a.subarray(c):a);return btoa(b)}
var td=/[-_.]/g,ud={"-":"+",_:"/",".":"="};function vd(a){return ud[a]||""}
function wd(a){return qd&&null!=a&&a instanceof Uint8Array}
var xd={};var yd;function zd(a){if(a!==xd)throw Error("illegal external caller");}
function Ad(a,b){zd(b);this.h=a;if(null!=a&&0===a.length)throw Error("ByteString should be constructed with non-empty values");}
Ad.prototype.isEmpty=function(){return null==this.h};
Ad.prototype.sizeBytes=function(){zd(xd);var a=this.h;if(null!=a&&!wd(a))if("string"===typeof a)if(rd){td.test(a)&&(a=a.replace(td,vd));a=atob(a);for(var b=new Uint8Array(a.length),c=0;c<a.length;c++)b[c]=a.charCodeAt(c);a=b}else a=od(a);else Oa(a),a=null;return(a=null==a?a:this.h=a)?a.length:0};function Bd(a){return Array.prototype.slice.call(a)}
;var Cd="function"===typeof Symbol&&"symbol"===typeof Symbol()?Symbol():void 0;Math.max.apply(Math,ka(Object.values({wf:1,vf:2,uf:4,yf:8,xf:16,lf:32,zf:64,sf:128,rf:256,tf:512})));var Dd=Cd?function(a,b){a[Cd]|=b}:function(a,b){void 0!==a.Aa?a.Aa|=b:Object.defineProperties(a,{Aa:{value:b,
configurable:!0,writable:!0,enumerable:!1}})};
function Ed(a){var b=Fd(a);1!==(b&1)&&(Object.isFrozen(a)&&(a=Bd(a)),Gd(a,b|1));return a}
var Hd=Cd?function(a,b){a[Cd]&=~b}:function(a,b){void 0!==a.Aa&&(a.Aa&=~b)},Fd=Cd?function(a){return a[Cd]|0}:function(a){return a.Aa|0},Id=Cd?function(a){return a[Cd]}:function(a){return a.Aa},Gd=Cd?function(a,b){a[Cd]=b}:function(a,b){void 0!==a.Aa?a.Aa=b:Object.defineProperties(a,{Aa:{value:b,
configurable:!0,writable:!0,enumerable:!1}})};
function Jd(a,b){Object.isFrozen(a)&&(a=Bd(a));Gd(a,b);return a}
function Kd(a){Dd(a,1);return a}
function Ld(a,b){Gd(b,(a|0)&-51)}
function Md(a,b){Gd(b,(a|18)&-41)}
function Nd(a){a=a>>10&1023;return 0===a?536870912:a}
;var Od={};function Pd(a){return null!==a&&"object"===typeof a&&!Array.isArray(a)&&a.constructor===Object}
var Qd,Rd,Sd=[];Gd(Sd,23);Rd=Object.freeze(Sd);function Td(a){if(a&2)throw Error();}
;function Ud(a){return a.displayName||a.name||"unknown type name"}
function Vd(a){return null==a?a:!!a}
function Wd(a){Oa(a);return a}
function Xd(a){if(null!=a&&"string"!==typeof a)throw Error("Expected a string or null or undefined but got "+a+" a "+Oa(a));return a}
function Yd(a,b){if(!(a instanceof b))throw Error("Expected instanceof "+Ud(b)+" but got "+(a&&Ud(a.constructor)));}
function Zd(a,b,c){var d=!1;if(null!=a&&"object"===typeof a&&!(d=Array.isArray(a))&&a.Jc===Od)return a;if(d){var e=d=Fd(a);0===e&&(e|=c&16);e|=c&2;e!==d&&Gd(a,e);return new b(a)}}
;function $d(a,b){a=a.V;return ae(a,Id(a),b)}
function ae(a,b,c,d){if(-1===c)return null;if(c>=Nd(b)){if(b&128)return a[a.length-1][c]}else{var e=a.length;if(d&&b&128&&(d=a[e-1][c],null!=d))return d;b=c+((b>>8&1)-1);if(b<e)return a[b]}}
function G(a,b,c,d){var e=a.V,f=Id(e);Td(f);be(e,f,b,c,d);return a}
function be(a,b,c,d,e){Pd(d);var f=Nd(b);if(c>=f||e){e=b;if(b&128)f=a[a.length-1];else{if(null==d)return;f=a[f+((b>>8&1)-1)]={};e|=128}f[c]=d;e&=-513;e!==b&&Gd(a,e)}else a[c+((b>>8&1)-1)]=d,b&128&&(d=a[a.length-1],c in d&&delete d[c]),b&512&&Gd(a,b&-513)}
function ce(a){return void 0!==de(a,ee,11,!1)}
function fe(a,b,c,d){a=a.V;var e=Id(a);Td(e);for(var f=0,g=0;g<c.length;g++){var h=c[g];null!=ae(a,e,h)&&(0!==f&&be(a,e,f),f=h)}(c=f)&&c!==b&&null!=d&&be(a,e,c);be(a,e,b,d)}
function de(a,b,c,d){a=a.V;var e=Id(a),f=ae(a,e,c,d);b=Zd(f,b,e);b!==f&&null!=b&&be(a,e,c,b,d);return b}
function ge(a,b,c,d){d=void 0===d?!1:d;b=de(a,b,c,d);if(null==b)return b;a=a.V;var e=Id(a);if(!(e&2)){var f=he(b);f!==b&&(b=f,be(a,e,c,b,d))}return b}
function ie(a,b,c,d){null!=d?Yd(d,b):d=void 0;return G(a,c,d)}
function je(a,b,c,d){var e=a.V,f=Id(e);Td(f);if(null!=d){for(var g=!!d.length,h=0;h<d.length;h++){var k=d[h];Yd(k,b);g=g&&!(Fd(k.V)&2)}b=Fd(d);h=b|1;h=(g?h|8:h&-9)|4;h!=b&&(d=Jd(d,h))}null==d&&(d=void 0);be(e,f,c,d);return a}
function ke(){var a=new le;return G(a,1,1)}
;var me;function ne(a,b){return oe(b)}
function oe(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "boolean":return a?1:0;case "object":if(a&&!Array.isArray(a)){if(wd(a))return sd(a);if(a instanceof Ad){var b=a.h;return null==b?"":"string"===typeof b?b:a.h=sd(b)}}}return a}
;function pe(a,b){var c=a.V,d=Bd(c),e=Id(c),f=d.length;c=e&128?d[f-1]:void 0;f+=c?-1:0;for(e=e&256?1:0;e<f;e++)d[e]=b(d[e]);if(c){e=d[e]={};for(var g in c)e[g]=b(c[g])}a=a.constructor;Dd(d,16);Fd(d);me=d;d=new a(d);me=void 0;return d}
function qe(a,b,c,d,e,f){if(null!=a){if(Array.isArray(a))a=e&&0==a.length&&Fd(a)&1?void 0:f&&Fd(a)&2?a:re(a,b,c,void 0!==d,e,f);else if(Pd(a)){var g={},h;for(h in a)g[h]=qe(a[h],b,c,d,e,f);a=g}else a=b(a,d);return a}}
function re(a,b,c,d,e,f){var g=d||c?Fd(a):0;d=d?!!(g&16):void 0;a=Bd(a);for(var h=0;h<a.length;h++)a[h]=qe(a[h],b,c,d,e,f);c&&c(g,a);return a}
function se(a){return a.Jc===Od?a.toJSON():oe(a)}
;function te(a,b,c){c=void 0===c?Md:c;if(null!=a){if(qd&&a instanceof Uint8Array)return b?a:new Uint8Array(a);if(Array.isArray(a)){var d=Fd(a);if(d&2)return a;if(b&&!(d&32)&&(d&16||0===d))return Gd(a,d|18),a;a=re(a,te,d&4?Md:c,!0,!1,!0);b=Fd(a);b&4&&b&2&&Object.freeze(a);return a}a.Jc===Od&&(Fd(a.V)&2||(a=ue(a,!0),Dd(a.V,18)));return a}}
function ue(a,b){var c=Id(a.V),d=b||c&2?Md:Ld,e=!!(c&16);return pe(a,function(f){return te(f,e,d)})}
function he(a){if(!(Id(a.V)&2))return a;var b=ue(a,!1);b.h=a;Dd(b.V,512);return b}
;function K(a,b,c){null==a&&(a=me);me=void 0;if(null==a){var d=48;c?(a=[c],d|=256):a=[]}else{if(!Array.isArray(a))throw Error();d=Fd(a)|32;if(c&&(d|=256,c!==a[0]))throw Error();}this.V=a;a:{c=a;var e=c.length;if(e){var f=e-1,g=c[f];if(Pd(g)){d|=128;b=(d>>8&1)-1;e=f-b;1024<=e&&(ve(c,b,g),e=1023);d=d&-1047553|(e&1023)<<10;break a}}b&&(g=(d>>8&1)-1,b=Math.max(b,e-g),1024<b&&(ve(c,g,{}),d|=128,b=1023),d=d&-1047553|(b&1023)<<10)}Gd(a,d)}
m=K.prototype;m.toJSON=function(){if(Qd)var a=we(this,this.V,!1);else a=re(this.V,se,void 0,void 0,!1,!1),a=we(this,a,!0);return a};
m.serialize=function(){Qd=!0;try{return JSON.stringify(this.toJSON(),ne)}finally{Qd=!1}};
m.clone=function(){return ue(this,!1)};
function ve(a,b,c){for(var d=1023+b,e=a.length,f=d;f<e;f++){var g=a[f];null!=g&&g!==c&&(c[f-b]=g)}a.length=d+1;a[d]=c}
m.Jc=Od;m.toString=function(){return we(this,this.V,!1).toString()};
function we(a,b,c){var d=a.constructor.Va,e=Id(c?a.V:b);e=Nd(e);if(d){if(!c){b=Bd(b);var f;if(b.length&&Pd(f=b[b.length-1]))for(var g=0;g<d.length;g++)if(d[g]>=e){Object.assign(b[b.length-1]={},f);break}}f=b;c=!c;e=Id(a.V);a=Nd(e);e=(e>>8&1)-1;var h;for(g=0;g<d.length;g++){var k=d[g];if(k<a){k+=e;var l=f[k];null==l?f[k]=c?Rd:Kd([]):c&&l!==Rd&&Ed(l)}else h||(l=void 0,f.length&&Pd(l=f[f.length-1])?h=l:f.push(h={})),l=h[k],null==h[k]?h[k]=c?Rd:Kd([]):c&&l!==Rd&&Ed(l)}}return b}
;function xe(a){this.cd=a}
;function ye(a,b,c){this.i=a;this.l=b;this.h=c||[];this.sb=new Map}
m=ye.prototype;m.Pd=function(a){var b=B.apply(1,arguments),c=this.zc(b);c?c.push(new xe(a)):this.Ad(a,b)};
m.Ad=function(a){var b=this.hd(B.apply(1,arguments));this.sb.set(b,[new xe(a)])};
m.zc=function(){var a=this.hd(B.apply(0,arguments));return this.sb.has(a)?this.sb.get(a):void 0};
m.ee=function(){var a=this.zc(B.apply(0,arguments));return a&&a.length?a[0]:void 0};
m.clear=function(){this.sb.clear()};
m.hd=function(){var a=B.apply(0,arguments);return a?a.join(","):"key"};function ze(a,b){ye.call(this,a,3,b)}
w(ze,ye);ze.prototype.j=function(a){var b=B.apply(1,arguments),c=0,d=this.ee(b);d&&(c=d.cd);this.Ad(c+a,b)};function Ae(a,b){ye.call(this,a,2,b)}
w(Ae,ye);Ae.prototype.record=function(a){this.Pd(a,B.apply(1,arguments))};function Be(a){a&&"function"==typeof a.dispose&&a.dispose()}
;function Ce(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];Pa(d)?Ce.apply(null,d):Be(d)}}
;function M(){this.ka=this.ka;this.T=this.T}
M.prototype.ka=!1;M.prototype.h=function(){return this.ka};
M.prototype.dispose=function(){this.ka||(this.ka=!0,this.K())};
function De(a,b){Ee(a,Xa(Be,b))}
function Ee(a,b){a.ka?b():(a.T||(a.T=[]),a.T.push(b))}
M.prototype.K=function(){if(this.T)for(;this.T.length;)this.T.shift()()};function Fe(a,b){this.type=a;this.h=this.target=b;this.defaultPrevented=this.j=!1}
Fe.prototype.stopPropagation=function(){this.j=!0};
Fe.prototype.preventDefault=function(){this.defaultPrevented=!0};function Ge(a){var b=E("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if("string"===typeof a)return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(g){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||C.$googDebugFname||b}catch(g){e="Not available",c=!0}b=He(a);if(!(!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name)){c=a.message;if(null==
c){if(a.constructor&&a.constructor instanceof Function){if(a.constructor.name)c=a.constructor.name;else if(c=a.constructor,Ie[c])c=Ie[c];else{c=String(c);if(!Ie[c]){var f=/function\s+([^\(]+)/m.exec(c);Ie[c]=f?f[1]:"[Anonymous]"}c=Ie[c]}c='Unknown Error of type "'+c+'"'}else c="Unknown Error of unknown type";"function"===typeof a.toString&&Object.prototype.toString!==a.toString&&(c+=": "+a.toString())}return{message:c,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:b||"Not available"}}a.stack=
b;return{message:a.message,name:a.name,lineNumber:a.lineNumber,fileName:a.fileName,stack:a.stack}}
function He(a,b){b||(b={});b[Je(a)]=!0;var c=a.stack||"";(a=a.cause)&&!b[Je(a)]&&(c+="\nCaused by: ",a.stack&&0==a.stack.indexOf(a.toString())||(c+="string"===typeof a?a:a.message+"\n"),c+=He(a,b));return c}
function Je(a){var b="";"function"===typeof a.toString&&(b=""+a);return b+a.stack}
var Ie={};var Ke=function(){if(!C.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});
try{var c=function(){};
C.addEventListener("test",c,b);C.removeEventListener("test",c,b)}catch(d){}return a}();function Le(a,b){Fe.call(this,a?a.type:"");this.relatedTarget=this.h=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.i=null;a&&this.init(a,b)}
Ya(Le,Fe);var Me={2:"touch",3:"pen",4:"mouse"};
Le.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.h=b;if(b=a.relatedTarget){if(Vc){a:{try{Rc(b.nodeName);var e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||
0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:Me[a.pointerType]||"";this.state=a.state;
this.i=a;a.defaultPrevented&&Le.xa.preventDefault.call(this)};
Le.prototype.stopPropagation=function(){Le.xa.stopPropagation.call(this);this.i.stopPropagation?this.i.stopPropagation():this.i.cancelBubble=!0};
Le.prototype.preventDefault=function(){Le.xa.preventDefault.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Ne="closure_listenable_"+(1E6*Math.random()|0);var Oe=0;function Pe(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.cc=e;this.key=++Oe;this.Ob=this.Wb=!1}
function Qe(a){a.Ob=!0;a.listener=null;a.proxy=null;a.src=null;a.cc=null}
;function Re(a){this.src=a;this.listeners={};this.h=0}
Re.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.listeners[f];a||(a=this.listeners[f]=[],this.h++);var g=Se(a,b,d,e);-1<g?(b=a[g],c||(b.Wb=!1)):(b=new Pe(b,this.src,f,!!d,e),b.Wb=c,a.push(b));return b};
Re.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.listeners))return!1;var e=this.listeners[a];b=Se(e,b,c,d);return-1<b?(Qe(e[b]),Array.prototype.splice.call(e,b,1),0==e.length&&(delete this.listeners[a],this.h--),!0):!1};
function Te(a,b){var c=b.type;c in a.listeners&&jb(a.listeners[c],b)&&(Qe(b),0==a.listeners[c].length&&(delete a.listeners[c],a.h--))}
function Se(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Ob&&f.listener==b&&f.capture==!!c&&f.cc==d)return e}return-1}
;var Ue="closure_lm_"+(1E6*Math.random()|0),Ve={},We=0;function Xe(a,b,c,d,e){if(d&&d.once)Ye(a,b,c,d,e);else if(Array.isArray(b))for(var f=0;f<b.length;f++)Xe(a,b[f],c,d,e);else c=Ze(c),a&&a[Ne]?a.listen(b,c,Qa(d)?!!d.capture:!!d,e):$e(a,b,c,!1,d,e)}
function $e(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=Qa(e)?!!e.capture:!!e,h=af(a);h||(a[Ue]=h=new Re(a));c=h.add(b,c,d,g,f);if(!c.proxy){d=bf();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)Ke||(e=g),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(cf(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");We++}}
function bf(){function a(c){return b.call(a.src,a.listener,c)}
var b=df;return a}
function Ye(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)Ye(a,b[f],c,d,e);else c=Ze(c),a&&a[Ne]?a.l.add(String(b),c,!0,Qa(d)?!!d.capture:!!d,e):$e(a,b,c,!0,d,e)}
function ef(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)ef(a,b[f],c,d,e);else(d=Qa(d)?!!d.capture:!!d,c=Ze(c),a&&a[Ne])?a.l.remove(String(b),c,d,e):a&&(a=af(a))&&(b=a.listeners[b.toString()],a=-1,b&&(a=Se(b,c,d,e)),(c=-1<a?b[a]:null)&&ff(c))}
function ff(a){if("number"!==typeof a&&a&&!a.Ob){var b=a.src;if(b&&b[Ne])Te(b.l,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(cf(c),d):b.addListener&&b.removeListener&&b.removeListener(d);We--;(c=af(b))?(Te(c,a),0==c.h&&(c.src=null,b[Ue]=null)):Qe(a)}}}
function cf(a){return a in Ve?Ve[a]:Ve[a]="on"+a}
function df(a,b){if(a.Ob)a=!0;else{b=new Le(b,this);var c=a.listener,d=a.cc||a.src;a.Wb&&ff(a);a=c.call(d,b)}return a}
function af(a){a=a[Ue];return a instanceof Re?a:null}
var gf="__closure_events_fn_"+(1E9*Math.random()>>>0);function Ze(a){if("function"===typeof a)return a;a[gf]||(a[gf]=function(b){return a.handleEvent(b)});
return a[gf]}
;function hf(){M.call(this);this.l=new Re(this);this.pc=this;this.Da=null}
Ya(hf,M);hf.prototype[Ne]=!0;m=hf.prototype;m.addEventListener=function(a,b,c,d){Xe(this,a,b,c,d)};
m.removeEventListener=function(a,b,c,d){ef(this,a,b,c,d)};
function jf(a,b){var c=a.Da;if(c){var d=[];for(var e=1;c;c=c.Da)d.push(c),++e}a=a.pc;c=b.type||b;"string"===typeof b?b=new Fe(b,a):b instanceof Fe?b.target=b.target||a:(e=b,b=new Fe(c,a),vb(b,e));e=!0;if(d)for(var f=d.length-1;!b.j&&0<=f;f--){var g=b.h=d[f];e=kf(g,c,!0,b)&&e}b.j||(g=b.h=a,e=kf(g,c,!0,b)&&e,b.j||(e=kf(g,c,!1,b)&&e));if(d)for(f=0;!b.j&&f<d.length;f++)g=b.h=d[f],e=kf(g,c,!1,b)&&e}
m.K=function(){hf.xa.K.call(this);this.removeAllListeners();this.Da=null};
m.listen=function(a,b,c,d){return this.l.add(String(a),b,!1,c,d)};
m.removeAllListeners=function(a){if(this.l){var b=this.l;a=a&&a.toString();var c=0,d;for(d in b.listeners)if(!a||d==a){for(var e=b.listeners[d],f=0;f<e.length;f++)++c,Qe(e[f]);delete b.listeners[d];b.h--}b=c}else b=0;return b};
function kf(a,b,c,d){b=a.l.listeners[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.Ob&&g.capture==c){var h=g.listener,k=g.cc||g.src;g.Wb&&Te(a.l,g);e=!1!==h.call(k,d)&&e}}return e&&!d.defaultPrevented}
;function lf(a,b){this.j=a;this.l=b;this.i=0;this.h=null}
lf.prototype.get=function(){if(0<this.i){this.i--;var a=this.h;this.h=a.next;a.next=null}else a=this.j();return a};
function mf(a,b){a.l(b);100>a.i&&(a.i++,b.next=a.h,a.h=b)}
;function nf(a,b){return a+Math.random()*(b-a)}
;function of(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0}
m=of.prototype;m.clone=function(){return new of(this.x,this.y)};
m.equals=function(a){return a instanceof of&&(this==a?!0:this&&a?this.x==a.x&&this.y==a.y:!1)};
m.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
m.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
m.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};
m.scale=function(a,b){this.x*=a;this.y*="number"===typeof b?b:a;return this};function pf(a,b){this.width=a;this.height=b}
m=pf.prototype;m.clone=function(){return new pf(this.width,this.height)};
m.aspectRatio=function(){return this.width/this.height};
m.isEmpty=function(){return!(this.width*this.height)};
m.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
m.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
m.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
m.scale=function(a,b){this.width*=a;this.height*="number"===typeof b?b:a;return this};function qf(a){var b=document;return"string"===typeof a?b.getElementById(a):a}
function rf(a){var b=document;a=String(a);"application/xhtml+xml"===b.contentType&&(a=a.toLowerCase());return b.createElement(a)}
function sf(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;var tf;function uf(){var a=C.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!F("Presto")&&(a=function(){var e=rf("IFRAME");e.style.display="none";document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.close();var g="callImmediate"+Math.random(),h="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=Wa(function(k){if(("*"==h||k.origin==h)&&k.data==g)this.port1.onmessage()},this);
f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(g,h)}}});
if("undefined"!==typeof a&&!$b()){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var e=c.bd;c.bd=null;e()}};
return function(e){d.next={bd:e};d=d.next;b.port2.postMessage(0)}}return function(e){C.setTimeout(e,0)}}
;function vf(){this.i=this.h=null}
vf.prototype.add=function(a,b){var c=wf.get();c.set(a,b);this.i?this.i.next=c:this.h=c;this.i=c};
vf.prototype.remove=function(){var a=null;this.h&&(a=this.h,this.h=this.h.next,this.h||(this.i=null),a.next=null);return a};
var wf=new lf(function(){return new xf},function(a){return a.reset()});
function xf(){this.next=this.scope=this.fn=null}
xf.prototype.set=function(a,b){this.fn=a;this.scope=b;this.next=null};
xf.prototype.reset=function(){this.next=this.scope=this.fn=null};var yf,zf=!1,Af=new vf;function Bf(a,b){yf||Cf();zf||(yf(),zf=!0);Af.add(a,b)}
function Cf(){if(C.Promise&&C.Promise.resolve){var a=C.Promise.resolve(void 0);yf=function(){a.then(Df)}}else yf=function(){var b=Df;
"function"!==typeof C.setImmediate||C.Window&&C.Window.prototype&&!ac()&&C.Window.prototype.setImmediate==C.setImmediate?(tf||(tf=uf()),tf(b)):C.setImmediate(b)}}
function Df(){for(var a;a=Af.remove();){try{a.fn.call(a.scope)}catch(b){Ic(b)}mf(wf,a)}zf=!1}
;function Ef(a){this.h=0;this.T=void 0;this.l=this.i=this.j=null;this.m=this.s=!1;if(a!=bb)try{var b=this;a.call(void 0,function(c){Ff(b,2,c)},function(c){Ff(b,3,c)})}catch(c){Ff(this,3,c)}}
function Gf(){this.next=this.context=this.h=this.i=this.child=null;this.j=!1}
Gf.prototype.reset=function(){this.context=this.h=this.i=this.child=null;this.j=!1};
var Hf=new lf(function(){return new Gf},function(a){a.reset()});
function If(a,b,c){var d=Hf.get();d.i=a;d.h=b;d.context=c;return d}
function Jf(a){if(a instanceof Ef)return a;var b=new Ef(bb);Ff(b,2,a);return b}
function Kf(a){return new Ef(function(b,c){c(a)})}
function Lf(a,b,c){Mf(a,b,c,null)||Bf(Xa(b,a))}
function Nf(a){return new Ef(function(b){var c=a.length,d=[];if(c)for(var e=function(h,k,l){c--;d[h]=k?{fulfilled:!0,value:l}:{fulfilled:!1,reason:l};0==c&&b(d)},f=0,g;f<a.length;f++)g=a[f],Lf(g,Xa(e,f,!0),Xa(e,f,!1));
else b(d)})}
Ef.prototype.then=function(a,b,c){return Of(this,"function"===typeof a?a:null,"function"===typeof b?b:null,c)};
Ef.prototype.$goog_Thenable=!0;m=Ef.prototype;m.nc=function(a,b){return Of(this,null,a,b)};
m.catch=Ef.prototype.nc;m.cancel=function(a){if(0==this.h){var b=new Pf(a);Bf(function(){Qf(this,b)},this)}};
function Qf(a,b){if(0==a.h)if(a.j){var c=a.j;if(c.i){for(var d=0,e=null,f=null,g=c.i;g&&(g.j||(d++,g.child==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.h&&1==d?Qf(c,b):(f?(d=f,d.next==c.l&&(c.l=d),d.next=d.next.next):Rf(c),Sf(c,e,3,b)))}a.j=null}else Ff(a,3,b)}
function Tf(a,b){a.i||2!=a.h&&3!=a.h||Uf(a);a.l?a.l.next=b:a.i=b;a.l=b}
function Of(a,b,c,d){var e=If(null,null,null);e.child=new Ef(function(f,g){e.i=b?function(h){try{var k=b.call(d,h);f(k)}catch(l){g(l)}}:f;
e.h=c?function(h){try{var k=c.call(d,h);void 0===k&&h instanceof Pf?g(h):f(k)}catch(l){g(l)}}:g});
e.child.j=a;Tf(a,e);return e.child}
m.We=function(a){this.h=0;Ff(this,2,a)};
m.Xe=function(a){this.h=0;Ff(this,3,a)};
function Ff(a,b,c){0==a.h&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.h=1,Mf(c,a.We,a.Xe,a)||(a.T=c,a.h=b,a.j=null,Uf(a),3!=b||c instanceof Pf||Vf(a,c)))}
function Mf(a,b,c,d){if(a instanceof Ef)return Tf(a,If(b||bb,c||null,d)),!0;if(a)try{var e=!!a.$goog_Thenable}catch(g){e=!1}else e=!1;if(e)return a.then(b,c,d),!0;if(Qa(a))try{var f=a.then;if("function"===typeof f)return Wf(a,f,b,c,d),!0}catch(g){return c.call(d,g),!0}return!1}
function Wf(a,b,c,d,e){function f(k){h||(h=!0,d.call(e,k))}
function g(k){h||(h=!0,c.call(e,k))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function Uf(a){a.s||(a.s=!0,Bf(a.Zd,a))}
function Rf(a){var b=null;a.i&&(b=a.i,a.i=b.next,b.next=null);a.i||(a.l=null);return b}
m.Zd=function(){for(var a;a=Rf(this);)Sf(this,a,this.h,this.T);this.s=!1};
function Sf(a,b,c,d){if(3==c&&b.h&&!b.j)for(;a&&a.m;a=a.j)a.m=!1;if(b.child)b.child.j=null,Xf(b,c,d);else try{b.j?b.i.call(b.context):Xf(b,c,d)}catch(e){Yf.call(null,e)}mf(Hf,b)}
function Xf(a,b,c){2==b?a.i.call(a.context,c):a.h&&a.h.call(a.context,c)}
function Vf(a,b){a.m=!0;Bf(function(){a.m&&Yf.call(null,b)})}
var Yf=Ic;function Pf(a){$a.call(this,a)}
Ya(Pf,$a);Pf.prototype.name="cancel";function Zf(a,b){hf.call(this);this.j=a||1;this.i=b||C;this.m=Wa(this.Ve,this);this.s=Date.now()}
Ya(Zf,hf);m=Zf.prototype;m.enabled=!1;m.Ca=null;m.setInterval=function(a){this.j=a;this.Ca&&this.enabled?(this.stop(),this.start()):this.Ca&&this.stop()};
m.Ve=function(){if(this.enabled){var a=Date.now()-this.s;0<a&&a<.8*this.j?this.Ca=this.i.setTimeout(this.m,this.j-a):(this.Ca&&(this.i.clearTimeout(this.Ca),this.Ca=null),jf(this,"tick"),this.enabled&&(this.stop(),this.start()))}};
m.start=function(){this.enabled=!0;this.Ca||(this.Ca=this.i.setTimeout(this.m,this.j),this.s=Date.now())};
m.stop=function(){this.enabled=!1;this.Ca&&(this.i.clearTimeout(this.Ca),this.Ca=null)};
m.K=function(){Zf.xa.K.call(this);this.stop();delete this.i};
function $f(a,b,c){if("function"===typeof a)c&&(a=Wa(a,c));else if(a&&"function"==typeof a.handleEvent)a=Wa(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:C.setTimeout(a,b||0)}
;function ag(a){M.call(this);this.M=a;this.j=new Map;this.A=new Set;this.l=0;this.m=100;this.flushInterval=3E4;this.i=new Zf(this.flushInterval);this.i.listen("tick",this.pb,!1,this);De(this,this.i);this.s=!1}
w(ag,M);m=ag.prototype;m.sendIsolatedPayload=function(a){this.s=a;this.m=1};
function bg(a){a.i.enabled||a.i.start();a.l++;a.l>=a.m&&a.pb()}
m.pb=function(){var a=this.j.values();a=[].concat(ka(a)).filter(function(b){return b.sb.size});
a.length&&this.M.flush(a,this.s);cg(a);this.l=0;this.i.enabled&&this.i.stop()};
m.Wc=function(a){var b=B.apply(1,arguments);this.j.has(a)||this.j.set(a,new ze(a,b))};
m.Xc=function(a){var b=B.apply(1,arguments);this.j.has(a)||this.j.set(a,new Ae(a,b))};
function dg(a,b){return a.A.has(b)?void 0:a.j.get(b)}
m.oc=function(a){this.Md.apply(this,[a,1].concat(ka(B.apply(1,arguments))))};
m.Md=function(a,b){var c=B.apply(2,arguments),d=dg(this,a);d&&d instanceof ze&&(d.j(b,c),bg(this))};
m.record=function(a,b){var c=B.apply(2,arguments),d=dg(this,a);d&&d instanceof Ae&&(d.record(b,c),bg(this))};
function cg(a){for(var b=0;b<a.length;b++)a[b].clear()}
;function eg(a){this.h=a;this.h.Wc("/client_streamz/bg/fiec",{vb:3,ub:"rk"},{vb:2,ub:"ec"},{vb:3,ub:"em"})}
function fg(a,b,c,d){a.h.oc("/client_streamz/bg/fiec",b,c,d)}
function gg(a){this.h=a;this.h.Xc("/client_streamz/bg/fil",{vb:3,ub:"rk"})}
gg.prototype.record=function(a,b){this.h.record("/client_streamz/bg/fil",a,b)};
function hg(a){this.h=a;this.h.Wc("/client_streamz/bg/fsc",{vb:3,ub:"rk"})}
function ig(a){this.h=a;this.h.Xc("/client_streamz/bg/fsl",{vb:3,ub:"rk"})}
ig.prototype.record=function(a,b){this.h.record("/client_streamz/bg/fsl",a,b)};var jg={toString:function(a){var b=[],c=0;a-=-2147483648;b[c++]="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(a%52);for(a=Math.floor(a/52);0<a;)b[c++]="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(a%62),a=Math.floor(a/62);return b.join("")}};function kg(a){function b(){c-=d;c-=e;c^=e>>>13;d-=e;d-=c;d^=c<<8;e-=c;e-=d;e^=d>>>13;c-=d;c-=e;c^=e>>>12;d-=e;d-=c;d^=c<<16;e-=c;e-=d;e^=d>>>5;c-=d;c-=e;c^=e>>>3;d-=e;d-=c;d^=c<<10;e-=c;e-=d;e^=d>>>15}
a=lg(a);for(var c=2654435769,d=2654435769,e=314159265,f=a.length,g=f,h=0;12<=g;g-=12,h+=12)c+=mg(a,h),d+=mg(a,h+4),e+=mg(a,h+8),b();e+=f;switch(g){case 11:e+=a[h+10]<<24;case 10:e+=a[h+9]<<16;case 9:e+=a[h+8]<<8;case 8:d+=a[h+7]<<24;case 7:d+=a[h+6]<<16;case 6:d+=a[h+5]<<8;case 5:d+=a[h+4];case 4:c+=a[h+3]<<24;case 3:c+=a[h+2]<<16;case 2:c+=a[h+1]<<8;case 1:c+=a[h+0]}b();return jg.toString(e)}
function lg(a){for(var b=[],c=0;c<a.length;c++)b.push(a.charCodeAt(c));return b}
function mg(a,b){return a[b+0]+(a[b+1]<<8)+(a[b+2]<<16)+(a[b+3]<<24)}
;function ng(a){K.call(this,a)}
w(ng,K);var og=[1,2,3];function pg(a){K.call(this,a)}
w(pg,K);var qg=[1,2,3];function rg(a){K.call(this,a)}
w(rg,K);rg.Va=[1];function sg(a){K.call(this,a)}
w(sg,K);sg.Va=[3,6,4];function tg(a){K.call(this,a)}
w(tg,K);tg.Va=[1];function ug(a){if(!a)return"";if(/^about:(?:blank|srcdoc)$/.test(a))return window.origin||"";a.startsWith("blob:")&&(a=a.substring(5));a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));c=a.substring(0,a.indexOf("://"));if(!c)throw Error("URI is missing protocol: "+a);if("http"!==c&&"https"!==c&&"chrome-extension"!==
c&&"moz-extension"!==c&&"file"!==c&&"android-app"!==c&&"chrome-search"!==c&&"chrome-untrusted"!==c&&"chrome"!==c&&"app"!==c&&"devtools"!==c)throw Error("Invalid URI scheme in origin: "+c);a="";var d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1);b=b.substring(0,d);if("http"===c&&"80"!==e||"https"===c&&"443"!==e)a=":"+e}return c+"://"+b+a}
;function vg(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;n=l=0}
function b(p){for(var t=g,r=0;64>r;r+=4)t[r/4]=p[r]<<24|p[r+1]<<16|p[r+2]<<8|p[r+3];for(r=16;80>r;r++)p=t[r-3]^t[r-8]^t[r-14]^t[r-16],t[r]=(p<<1|p>>>31)&4294967295;p=e[0];var x=e[1],y=e[2],z=e[3],H=e[4];for(r=0;80>r;r++){if(40>r)if(20>r){var I=z^x&(y^z);var L=1518500249}else I=x^y^z,L=1859775393;else 60>r?(I=x&y|z&(x|y),L=2400959708):(I=x^y^z,L=3395469782);I=((p<<5|p>>>27)&4294967295)+I+H+L+t[r]&4294967295;H=z;z=y;y=(x<<30|x>>>2)&4294967295;x=p;p=I}e[0]=e[0]+p&4294967295;e[1]=e[1]+x&4294967295;e[2]=
e[2]+y&4294967295;e[3]=e[3]+z&4294967295;e[4]=e[4]+H&4294967295}
function c(p,t){if("string"===typeof p){p=unescape(encodeURIComponent(p));for(var r=[],x=0,y=p.length;x<y;++x)r.push(p.charCodeAt(x));p=r}t||(t=p.length);r=0;if(0==l)for(;r+64<t;)b(p.slice(r,r+64)),r+=64,n+=64;for(;r<t;)if(f[l++]=p[r++],n++,64==l)for(l=0,b(f);r+64<t;)b(p.slice(r,r+64)),r+=64,n+=64}
function d(){var p=[],t=8*n;56>l?c(h,56-l):c(h,64-(l-56));for(var r=63;56<=r;r--)f[r]=t&255,t>>>=8;b(f);for(r=t=0;5>r;r++)for(var x=24;0<=x;x-=8)p[t++]=e[r]>>x&255;return p}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var l,n;a();return{reset:a,update:c,digest:d,Vd:function(){for(var p=d(),t="",r=0;r<p.length;r++)t+="0123456789ABCDEF".charAt(Math.floor(p[r]/16))+"0123456789ABCDEF".charAt(p[r]%16);return t}}}
;function wg(a,b,c){var d=String(C.location.href);return d&&a&&b?[b,xg(ug(d),a,c||null)].join(" "):null}
function xg(a,b,c){var d=[],e=[];if(1==(Array.isArray(c)?2:1))return e=[b,a],eb(d,function(h){e.push(h)}),yg(e.join(" "));
var f=[],g=[];eb(c,function(h){g.push(h.key);f.push(h.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];eb(d,function(h){e.push(h)});
a=yg(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function yg(a){var b=vg();b.update(a);return b.Vd().toLowerCase()}
;var zg={};function Ag(a){this.h=a||{cookie:""}}
m=Ag.prototype;m.isEnabled=function(){if(!C.navigator.cookieEnabled)return!1;if(!this.isEmpty())return!0;this.set("TESTCOOKIESENABLED","1",{fc:60});if("1"!==this.get("TESTCOOKIESENABLED"))return!1;this.remove("TESTCOOKIESENABLED");return!0};
m.set=function(a,b,c){var d=!1;if("object"===typeof c){var e=c.Qf;d=c.secure||!1;var f=c.domain||void 0;var g=c.path||void 0;var h=c.fc}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0===h&&(h=-1);c=f?";domain="+f:"";g=g?";path="+g:"";d=d?";secure":"";h=0>h?"":0==h?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(Date.now()+1E3*h)).toUTCString();this.h.cookie=a+"="+b+c+g+h+d+(null!=e?";samesite="+
e:"")};
m.get=function(a,b){for(var c=a+"=",d=(this.h.cookie||"").split(";"),e=0,f;e<d.length;e++){f=Hb(d[e]);if(0==f.lastIndexOf(c,0))return f.slice(c.length);if(f==a)return""}return b};
m.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",{fc:0,path:b,domain:c});return d};
m.Cc=function(){return Bg(this).keys};
m.isEmpty=function(){return!this.h.cookie};
m.clear=function(){for(var a=Bg(this).keys,b=a.length-1;0<=b;b--)this.remove(a[b])};
function Bg(a){a=(a.h.cookie||"").split(";");for(var b=[],c=[],d,e,f=0;f<a.length;f++)e=Hb(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));return{keys:b,values:c}}
var Cg=new Ag("undefined"==typeof document?null:document);function Dg(a){return!!zg.FPA_SAMESITE_PHASE2_MOD||!(void 0===a||!a)}
function Fg(a){a=void 0===a?!1:a;var b=C.__SAPISID||C.__APISID||C.__3PSAPISID||C.__OVERRIDE_SID;Dg(a)&&(b=b||C.__1PSAPISID);if(b)return!0;if("undefined"!==typeof document){var c=new Ag(document);b=c.get("SAPISID")||c.get("APISID")||c.get("__Secure-3PAPISID")||c.get("SID")||c.get("OSID");Dg(a)&&(b=b||c.get("__Secure-1PAPISID"))}return!!b}
function Gg(a,b,c,d){(a=C[a])||"undefined"===typeof document||(a=(new Ag(document)).get(b));return a?wg(a,c,d):null}
function Hg(a,b){b=void 0===b?!1:b;var c=ug(String(C.location.href)),d=[];if(Fg(b)){c=0==c.indexOf("https:")||0==c.indexOf("chrome-extension:")||0==c.indexOf("moz-extension:");var e=c?C.__SAPISID:C.__APISID;e||"undefined"===typeof document||(e=new Ag(document),e=e.get(c?"SAPISID":"APISID")||e.get("__Secure-3PAPISID"));(e=e?wg(e,c?"SAPISIDHASH":"APISIDHASH",a):null)&&d.push(e);c&&Dg(b)&&((b=Gg("__1PSAPISID","__Secure-1PAPISID","SAPISID1PHASH",a))&&d.push(b),(a=Gg("__3PSAPISID","__Secure-3PAPISID",
"SAPISID3PHASH",a))&&d.push(a))}return 0==d.length?null:d.join(" ")}
;function Ig(a){K.call(this,a)}
w(Ig,K);Ig.Va=[2];function Jg(a){this.h=this.i=this.j=a}
Jg.prototype.reset=function(){this.h=this.i=this.j};
Jg.prototype.getValue=function(){return this.i};function Kg(){}
Kg.prototype.serialize=function(a){var b=[];Lg(this,a,b);return b.join("")};
function Lg(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(Array.isArray(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),Lg(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),Mg(d,c),c.push(":"),Lg(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":Mg(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var Ng={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\v":"\\u000b"},Og=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;function Mg(a,b){b.push('"',a.replace(Og,function(c){var d=Ng[c];d||(d="\\u"+(c.charCodeAt(0)|65536).toString(16).slice(1),Ng[c]=d);return d}),'"')}
;function Pg(){}
Pg.prototype.h=null;Pg.prototype.getOptions=function(){var a;(a=this.h)||(a={},Qg(this)&&(a[0]=!0,a[1]=!0),a=this.h=a);return a};var Rg;function Sg(){}
Ya(Sg,Pg);function Tg(a){return(a=Qg(a))?new ActiveXObject(a):new XMLHttpRequest}
function Qg(a){if(!a.i&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.i=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.i}
Rg=new Sg;function Ug(a){hf.call(this);this.headers=new Map;this.X=a||null;this.i=!1;this.W=this.G=null;this.m=this.ea="";this.j=this.ba=this.A=this.aa=!1;this.s=0;this.M=null;this.Ia="";this.oa=this.ya=!1}
Ya(Ug,hf);var Vg=/^https?$/i,Wg=["POST","PUT"],Xg=[];function Yg(a,b,c,d,e,f,g){var h=new Ug;Xg.push(h);b&&h.listen("complete",b);h.l.add("ready",h.Ud,!0,void 0,void 0);f&&(h.s=Math.max(0,f));g&&(h.ya=g);h.send(a,c,d,e)}
m=Ug.prototype;m.Ud=function(){this.dispose();jb(Xg,this)};
m.send=function(a,b,c,d){if(this.G)throw Error("[goog.net.XhrIo] Object is active with another request="+this.ea+"; newUri="+a);b=b?b.toUpperCase():"GET";this.ea=a;this.m="";this.aa=!1;this.i=!0;this.G=this.X?Tg(this.X):Tg(Rg);this.W=this.X?this.X.getOptions():Rg.getOptions();this.G.onreadystatechange=Wa(this.rd,this);try{this.getStatus(),this.ba=!0,this.G.open(b,String(a),!0),this.ba=!1}catch(g){this.getStatus();Zg(this,g);return}a=c||"";c=new Map(this.headers);if(d)if(Object.getPrototypeOf(d)===
Object.prototype)for(var e in d)c.set(e,d[e]);else if("function"===typeof d.keys&&"function"===typeof d.get){e=v(d.keys());for(var f=e.next();!f.done;f=e.next())f=f.value,c.set(f,d.get(f))}else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(function(g){return"content-type"==g.toLowerCase()});
e=C.FormData&&a instanceof C.FormData;!(0<=db(Wg,b))||d||e||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");b=v(c);for(d=b.next();!d.done;d=b.next())c=v(d.value),d=c.next().value,c=c.next().value,this.G.setRequestHeader(d,c);this.Ia&&(this.G.responseType=this.Ia);"withCredentials"in this.G&&this.G.withCredentials!==this.ya&&(this.G.withCredentials=this.ya);try{$g(this),0<this.s&&(this.oa=ah(this.G),this.getStatus(),this.oa?(this.G.timeout=this.s,this.G.ontimeout=Wa(this.Fd,
this)):this.M=$f(this.Fd,this.s,this)),this.getStatus(),this.A=!0,this.G.send(a),this.A=!1}catch(g){this.getStatus(),Zg(this,g)}};
function ah(a){return Tc&&"number"===typeof a.timeout&&void 0!==a.ontimeout}
m.Fd=function(){"undefined"!=typeof Na&&this.G&&(this.m="Timed out after "+this.s+"ms, aborting",this.getStatus(),jf(this,"timeout"),this.abort(8))};
function Zg(a,b){a.i=!1;a.G&&(a.j=!0,a.G.abort(),a.j=!1);a.m=b;bh(a);ch(a)}
function bh(a){a.aa||(a.aa=!0,jf(a,"complete"),jf(a,"error"))}
m.abort=function(){this.G&&this.i&&(this.getStatus(),this.i=!1,this.j=!0,this.G.abort(),this.j=!1,jf(this,"complete"),jf(this,"abort"),ch(this))};
m.K=function(){this.G&&(this.i&&(this.i=!1,this.j=!0,this.G.abort(),this.j=!1),ch(this,!0));Ug.xa.K.call(this)};
m.rd=function(){this.h()||(this.ba||this.A||this.j?dh(this):this.ye())};
m.ye=function(){dh(this)};
function dh(a){if(a.i&&"undefined"!=typeof Na)if(a.W[1]&&4==eh(a)&&2==a.getStatus())a.getStatus();else if(a.A&&4==eh(a))$f(a.rd,0,a);else if(jf(a,"readystatechange"),a.isComplete()){a.getStatus();a.i=!1;try{if(fh(a))jf(a,"complete"),jf(a,"success");else{try{var b=2<eh(a)?a.G.statusText:""}catch(c){b=""}a.m=b+" ["+a.getStatus()+"]";bh(a)}}finally{ch(a)}}}
function ch(a,b){if(a.G){$g(a);var c=a.G,d=a.W[0]?function(){}:null;
a.G=null;a.W=null;b||jf(a,"ready");try{c.onreadystatechange=d}catch(e){}}}
function $g(a){a.G&&a.oa&&(a.G.ontimeout=null);a.M&&(C.clearTimeout(a.M),a.M=null)}
m.isActive=function(){return!!this.G};
m.isComplete=function(){return 4==eh(this)};
function fh(a){var b=a.getStatus();a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=tc(1,String(a.ea)),!a&&C.self&&C.self.location&&(a=C.self.location.protocol.slice(0,-1)),b=!Vg.test(a?a.toLowerCase():"");c=b}return c}
function eh(a){return a.G?a.G.readyState:0}
m.getStatus=function(){try{return 2<eh(this)?this.G.status:-1}catch(a){return-1}};
m.getLastError=function(){return"string"===typeof this.m?this.m:String(this.m)};function gh(a){K.call(this,a)}
w(gh,K);function hh(a){K.call(this,a)}
w(hh,K);hh.Va=[1];function ee(a){K.call(this,a)}
w(ee,K);var ih=["platform","platformVersion","architecture","model","uaFullVersion"];new hh;function le(a){K.call(this,a)}
w(le,K);function jh(a){K.call(this,a,33)}
w(jh,K);jh.Va=[3,20,27];function kh(a){K.call(this,a,19)}
w(kh,K);kh.Va=[3,5];function lh(a){K.call(this,a,6)}
w(lh,K);lh.Va=[5];function mh(a){K.call(this,a)}
w(mh,K);var nh;nh=new function(a,b,c){this.h=a;this.fieldName=b;this.ctor=c;this.isRepeated=0;this.i=ge;this.defaultValue=void 0}(175237375,{If:0},mh);function oh(a,b,c,d,e,f,g,h,k,l,n){hf.call(this);var p=this;this.componentId="";this.j=[];this.Ib="";this.Tb=this.oa=-1;this.Ia=!1;this.W=this.experimentIds=null;this.A=this.M=0;this.Nd=1;this.timeoutMillis=0;this.ea=!1;hf.call(this);this.logSource=a;this.qb=b||function(){};
this.m=new ph(a,f);this.qc=d;this.network=n;this.bufferSize=1E3;this.Od=Xa(nf,0,1);this.aa=e||null;this.sessionIndex=c||null;this.ba=g||!1;this.pageId=k||null;this.logger=null;this.withCredentials=!h;this.ya=f||!1;!this.ya&&(65<=jc("Chromium")||45<=jc("Firefox")||12<=jc("Safari")||Mc()&&Qc());a=ke();qh(this.m,a);this.s=new Jg(1E4);this.i=new Zf(this.s.getValue());De(this,this.i);l=rh(this,l);Xe(this.i,"tick",l,!1,this);this.X=new Zf(6E5);De(this,this.X);Xe(this.X,"tick",l,!1,this);this.ba||this.X.start();
this.ya||(Xe(document,"visibilitychange",function(){"hidden"===document.visibilityState&&p.xc()}),Xe(document,"pagehide",this.xc,!1,this))}
w(oh,hf);function rh(a,b){return b?function(){b().then(function(){a.flush()})}:function(){a.flush()}}
m=oh.prototype;m.K=function(){this.xc();hf.prototype.K.call(this)};
function sh(a){a.aa||(a.aa=.01>a.Od()?"https://www.google.com/log?format=json&hasfast=true":"https://play.google.com/log?format=json&hasfast=true");return a.aa}
function th(a,b){a.s=new Jg(1>b?1:b);a.i.setInterval(a.s.getValue())}
m.log=function(a){a=a.clone();var b=this.Nd++;a=G(a,21,b);this.componentId&&G(a,26,Xd(this.componentId));if(!$d(a,1)){b=a;var c=Date.now().toString();G(b,1,c)}null==$d(a,15)&&G(a,15,60*(new Date).getTimezoneOffset());this.experimentIds&&(b=this.experimentIds.clone(),ie(a,Ig,16,b));for(;this.j.length>=this.bufferSize;)this.j.shift(),++this.M;this.j.push(a);jf(this,new uh(a));this.ba||this.i.enabled||this.i.start()};
m.flush=function(a,b){var c=this;if(0===this.j.length)a&&a();else if(this.ea)vh(this.m,3),wh(this);else{var d=Date.now();if(this.Tb>d&&this.oa<d)b&&b("throttled");else{vh(this.m,1);var e=xh(this.m,this.j,this.M,this.A);d={};var f=this.qb();f&&(d.Authorization=f);var g=sh(this);this.sessionIndex&&(d["X-Goog-AuthUser"]=this.sessionIndex,g=Dc(g,"authuser",this.sessionIndex));this.pageId&&(d["X-Goog-PageId"]=this.pageId,g=Dc(g,"pageId",this.pageId));if(f&&this.Ib===f)b&&b("stale-auth-token");else{this.j=
[];this.i.enabled&&this.i.stop();this.M=0;var h=e.serialize(),k;this.W&&this.W.isSupported(h.length)&&(k=this.W.compress(h));var l={url:g,body:h,Sd:1,Nc:d,requestType:"POST",withCredentials:this.withCredentials,timeoutMillis:this.timeoutMillis},n=function(r){c.s.reset();c.i.setInterval(c.s.getValue());if(r){var x=null;try{var y=JSON.parse(r.replace(")]}'\n",""));x=new lh(y)}catch(H){}if(x){r=Number;y="-1";y=void 0===y?"0":y;var z=$d(x,1);r=r(null==z?y:z);0<r&&(c.oa=Date.now(),c.Tb=c.oa+r);if(r=nh.ctor?
nh.i(x,nh.ctor,nh.h,!0):nh.isRepeated?nh.i(x,nh.h,!0):nh.i(x,nh.h,nh.defaultValue,!0)){x=-1;x=void 0===x?0:x;a:if(r=$d(r,1),null!=r){switch(typeof r){case "string":r=+r;break a;case "number":break a}r=void 0}x=null==r?x:r;-1!==x&&(c.Ia||th(c,x))}}}a&&a();c.A=0},p=function(r,x){var y=e.V,z=Id(y),H=!!(z&2);
var I=H?1:2,L=!!(z&2);var P=z&2;var J=ae(y,z,3);Array.isArray(J)||(J=Rd);var W=Fd(J);W&1||Kd(J);P?W&2||Dd(J,18):W&16&&!(W&2)&&Hd(J,16);P=J;if(P!==Rd&&Fd(P)&4)3===I||L||(L=Object.isFrozen(P),1===I?L||Object.freeze(P):(I=Fd(P),J=I&-19,L&&(P=Bd(P),I=0,be(y,z,3,P)),I!==J&&Gd(P,J))),y=P;else{J=P;L=!!(z&2);var aa=!!(Fd(J)&2);P=J;!L&&aa&&(J=Bd(J));W=z|(aa?2:0);aa=aa||void 0;for(var da=0,qa=0;da<J.length;da++){var na=Zd(J[da],jh,W);void 0!==na&&(aa=aa||Id(na.V)&2,J[qa++]=na)}qa<da&&(J.length=qa);aa=!aa;W=
Fd(J);da=W|5;aa=aa?da|8:da&-9;W!=aa&&(J=Jd(J,aa));P!==J&&be(y,z,3,J);(L&&2!==I||1===I)&&Object.freeze(J);y=J}if(!(H||Fd(y)&8)){for(H=0;H<y.length;H++)z=y[H],I=he(z),z!==I&&(y[H]=I);Dd(y,8)}H=c.s;H.h=Math.min(3E5,2*H.h);H.i=Math.min(3E5,H.h+Math.round(.2*(Math.random()-.5)*H.h));c.i.setInterval(c.s.getValue());401===r&&f&&(c.Ib=f);void 0===x&&(x=c.isRetryable(r));x&&(c.j=y.concat(c.j),c.ba||c.i.enabled||c.i.start());b&&b("net-send-failed",r);++c.A},t=function(){c.network?c.network.send(l,n,p):c.qc(l,
n,p)};
k?k.then(function(r){l.Nc["Content-Encoding"]="gzip";l.Nc["Content-Type"]="application/binary";l.body=r;l.Sd=2;t()},function(){t()}):t()}}}};
m.xc=function(){yh(this.m,!0);this.flush();yh(this.m,!1)};
function wh(a){zh(a,function(b,c){b=Dc(b,"format","json");var d=!1;try{d=window.navigator.sendBeacon(b,c.serialize())}catch(e){}a.ea&&!d&&(a.ea=!1);return d})}
function zh(a,b){if(0!==a.j.length){var c=Hc(sh(a),"format");c=Bc(c,"auth",a.qb(),"authuser",a.sessionIndex||"0");for(var d=0;10>d&&a.j.length;++d){var e=a.j.slice(0,32),f=xh(a.m,e,a.M,a.A);if(!b(c,f)){++a.A;break}a.M=0;a.A=0;a.j=a.j.slice(e.length)}a.i.enabled&&a.i.stop()}}
m.isRetryable=function(a){return 500<=a&&600>a||401===a||0===a};
function uh(){Fe.call(this,"event-logged",void 0)}
w(uh,Fe);function ph(a,b){this.i=b=void 0===b?!1:b;this.uach=this.locale=null;this.h=new kh;G(this.h,2,a);b||(this.locale=document.documentElement.getAttribute("lang"));qh(this,new le)}
function qh(a,b){ie(a.h,le,1,b);var c=$d(b,1);(null==c?c:c)||G(b,1,1);a.i||(b=Ah(a),c=$d(b,5),(null==c||"string"===typeof c)&&c||G(b,5,Xd(a.locale)));a.uach&&(b=Ah(a),ge(b,hh,9)||ie(b,hh,9,a.uach))}
function vh(a,b){ce(ge(a.h,le,1))&&(a=Bh(a),G(a,1,b))}
function yh(a,b){ce(ge(a.h,le,1))&&(a=Bh(a),G(a,2,Vd(b)))}
function Ch(a,b){var c=void 0===c?ih:c;b(window,c).then(function(d){a.uach=d;d=Ah(a);ie(d,hh,9,a.uach);return!0}).catch(function(){return!1})}
function Ah(a){a=ge(a.h,le,1);var b=ge(a,ee,11);b||(b=new ee,ie(a,ee,11,b));return b}
function Bh(a){a=Ah(a);var b=ge(a,gh,10);b||(b=new gh,G(b,2,Vd(!1)),ie(a,gh,10,b));return b}
function xh(a,b,c,d){c=void 0===c?0:c;d=void 0===d?0:d;if(ce(ge(a.h,le,1))){var e=Bh(a);G(e,3,Wd(d))}a=a.h.clone();d=Date.now().toString();a=G(a,4,d);b=je(a,jh,3,b);c&&G(b,14,c);return b}
;function Dh(a,b,c){Yg(a.url,function(d){d=d.target;if(fh(d)){try{var e=d.G?d.G.responseText:""}catch(f){e=""}b(e)}else c(d.getStatus())},a.requestType,a.body,a.Nc,a.timeoutMillis,a.withCredentials)}
;function Eh(a,b){M.call(this);this.logSource=a;this.sessionIndex=b;this.l="https://play.google.com/log?format=json&hasfast=true";this.m=!1;this.i="";this.aa=Dh}
w(Eh,M);function Fh(a,b,c,d,e,f){a=void 0===a?-1:a;b=void 0===b?"":b;c=void 0===c?"":c;d=void 0===d?!1:d;e=void 0===e?"":e;M.call(this);f?a=f:(a=new Eh(a,"0"),a.i=b,De(this,a),""!=c&&(a.l=c),d&&(a.m=!0),e&&(a.j=e),b=new oh(a.logSource,a.W?a.W:Hg,a.sessionIndex,a.aa,a.l,a.m,!1,a.oa,void 0,void 0,a.ba?a.ba:void 0),De(a,b),a.A&&qh(b.m,a.A),a.j&&(c=a.j,d=Ah(b.m),G(d,7,Xd(c))),a.X&&(b.W=a.X),a.i&&(b.componentId=a.i),a.s&&((c=a.s)?(b.experimentIds||(b.experimentIds=new Ig),c=c.serialize(),G(b.experimentIds,4,Xd(c))):
b.experimentIds&&G(b.experimentIds,4,void 0,!1)),a.ea&&(e=a.ea,b.experimentIds||(b.experimentIds=new Ig),c=b.experimentIds.V,d=Id(c),Td(d),e=null==e?Rd:Ed(e),be(c,d,2,e)),a.M&&(c=a.M,b.Ia=!0,th(b,c)),a.Da&&Ch(b.m,a.Da),a=b);this.i=a}
w(Fh,M);
Fh.prototype.flush=function(a){var b=a||[];if(b.length){a=new tg;for(var c=[],d=0;d<b.length;d++){var e=b[d],f=e;var g=new sg;g=G(g,1,Xd(f.i));for(var h=f,k=[],l=0;l<h.h.length;l++)k.push(h.h[l].ub);h=g.V;l=Id(h);Td(l);if(null==k)be(h,l,3);else{var n=Fd(k);if(!(n&4)){if(n&2||Object.isFrozen(k))k=Bd(k);for(var p=0;p<k.length;p++){var t=k,r=p,x=k[p];if("string"!==typeof x)throw Error("Expected a string but got "+x+" a "+Oa(x));t[r]=x}Gd(k,n|5)}be(h,l,3,k)}k=[];h=[];l=v(f.sb.keys());for(n=l.next();!n.done;n=l.next())h.push(n.value.split(","));
for(l=0;l<h.length;l++){n=h[l];p=f.l;t=f.zc(n)||[];r=[];for(x=0;x<t.length;x++){var y=t[x],z=y&&y.cd;y=new pg;switch(p){case 3:fe(y,1,qg,Number(z));break;case 2:var H=y;z=Number(z);if(null!=z&&"number"!==typeof z)throw Error("Value of float/double field must be a number|null|undefined, found "+typeof z+": "+z);fe(H,2,qg,z)}r.push(y)}p=r;for(t=0;t<p.length;t++){r=p[t];x=new rg;r=ie(x,pg,2,r);x=n;y=[];H=f;z=[];for(var I=0;I<H.h.length;I++)z.push(H.h[I].vb);H=z;for(z=0;z<H.length;z++){I=H[z];var L=x[z],
P=new ng;switch(I){case 3:fe(P,1,og,Xd(String(L)));break;case 2:fe(P,2,og,Wd(Number(L)));break;case 1:fe(P,3,og,Vd("true"==L))}y.push(P)}je(r,ng,1,y);k.push(r)}}je(g,rg,4,k);c.push(g);e.clear()}je(a,sg,1,c);b=this.i;a instanceof jh?b.log(a):(c=new jh,a=a.serialize(),a=G(c,8,Xd(a)),b.log(a));this.i.flush()}};function Gh(a){this.T=Hh();this.m=new Fh(1828);this.h=new ag(this.m);this.s=new gg(this.h);this.j=new hg(this.h);this.l=new ig(this.h);this.i=new eg(this.h);this.Pa=kg(a)}
function Hh(){var a,b,c;return null!=(c=null==(a=globalThis.performance)?void 0:null==(b=a.now)?void 0:b.call(a))?c:Date.now()}
;function Ih(){var a=this;this.promise=new Promise(function(b,c){a.resolve=b;a.reject=c})}
;function Jh(a){function b(r,x){Promise.resolve().then(function(){var y;null!=(y=c.ra)&&y.s.record(Hh()-y.T,y.Pa);g.resolve({Qd:r,Re:x})})}
var c=this;this.i=!1;var d=a.program;var e=a.he;if(a.Be){var f;this.ra=null!=(f=a.ra)?f:new Gh(e)}var g=new Ih;this.j=g.promise;if(!C[e]){var h;null!=(h=this.ra)&&fg(h.i,h.Pa,1,"");var k;null!=(k=this.ra)&&k.h.pb()}else if(!C[e].a){var l;null!=(l=this.ra)&&fg(l.i,l.Pa,2,"");var n;null!=(n=this.ra)&&n.h.pb()}try{this.l=v((0,C[e].a)(d,b,!0)).next().value,this.Qe=g.promise.then(function(){})}catch(r){var p;
null!=(p=this.ra)&&fg(p.i,p.Pa,4,r.message);var t;null!=(t=this.ra)&&t.h.pb();throw r;}}
Jh.prototype.snapshot=function(a){var b=this;if(this.i)throw Error("Already disposed");var c=Hh(),d;null!=(d=this.ra)&&d.j.h.oc("/client_streamz/bg/fsc",d.Pa);return this.j.then(function(e){var f=e.Qd;return new Promise(function(g){f(function(h){var k;null!=(k=b.ra)&&k.l.record(Hh()-c,k.Pa);g(h)},[a.dd,
a.Se])})})};
Jh.prototype.Cd=function(a){if(this.i)throw Error("Already disposed");var b=Hh(),c;null!=(c=this.ra)&&c.j.h.oc("/client_streamz/bg/fsc",c.Pa);a=this.l([a.dd,a.Se]);var d;null!=(d=this.ra)&&d.l.record(Hh()-b,d.Pa);return a};
Jh.prototype.dispose=function(){var a;null!=(a=this.ra)&&a.h.pb();this.i=!0;this.j.then(function(b){(b=b.Re)&&b()})};
Jh.prototype.h=function(){return this.i};var Kh=window;Ab("csi.gstatic.com");Ab("googleads.g.doubleclick.net");Ab("partner.googleadservices.com");Ab("pubads.g.doubleclick.net");Ab("securepubads.g.doubleclick.net");Ab("tpc.googlesyndication.com");/*

 SPDX-License-Identifier: Apache-2.0
*/
var Lh;try{new URL("s://g"),Lh=!0}catch(a){Lh=!1}var Mh=Lh;function Nh(a){if(a instanceof Kb)a=Lb(a);else{b:if(Mh){try{var b=new URL(a)}catch(c){b="https:";break b}b=b.protocol}else c:{b=document.createElement("a");try{b.href=a}catch(c){b=void 0;break c}b=b.protocol;b=":"===b||""===b?"https:":b}a="javascript:"!==b?a:void 0}return a}
;var Oh={};function Ph(){}
function Qh(a){this.h=a}
w(Qh,Ph);Qh.prototype.toString=function(){return this.h};function Rh(a){var b="true".toString(),c=[new Qh(Sh[0].toLowerCase(),Oh)];if(0===c.length)throw Error("");if(c.map(function(d){if(d instanceof Qh)d=d.h;else throw Error("");return d}).every(function(d){return 0!=="data-loaded".indexOf(d)}))throw Error('Attribute "data-loaded" does not match any of the allowed prefixes.');
a.setAttribute("data-loaded",b)}
;function Th(){throw Error("unknown trace type");}
;function Uh(a){var b,c,d=null==(c=(b=(a.ownerDocument&&a.ownerDocument.defaultView||window).document).querySelector)?void 0:c.call(b,"script[nonce]");(b=d?d.nonce||d.getAttribute("nonce")||"":"")&&a.setAttribute("nonce",b)}
function Vh(a,b){a.src=Eb(b);Uh(a)}
;(function(){return""}).toString().indexOf("`");function Wh(a){this.qe=a}
function Xh(a){return new Wh(function(b){return b.substr(0,a.length+1).toLowerCase()===a+":"})}
var Yh=[Xh("data"),Xh("http"),Xh("https"),Xh("mailto"),Xh("ftp"),new Wh(function(a){return/^[^:]*([/?#]|$)/.test(a)})];function Zh(a){var b=$h;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a(b[c],c,b)}
function ai(){var a=[];Zh(function(b){a.push(b)});
return a}
var $h={Ze:"allow-forms",af:"allow-modals",bf:"allow-orientation-lock",cf:"allow-pointer-lock",df:"allow-popups",ef:"allow-popups-to-escape-sandbox",ff:"allow-presentation",gf:"allow-same-origin",hf:"allow-scripts",jf:"allow-top-navigation",kf:"allow-top-navigation-by-user-activation"},bi=cb(function(){return ai()});
function ci(){var a=di(),b={};eb(bi(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
function di(){var a=void 0===a?document:a;return a.createElement("iframe")}
;function ei(a){"number"==typeof a&&(a=Math.round(a)+"px");return a}
;var fi=(new Date).getTime();var gi="client_dev_domain client_dev_regex_map client_dev_root_url client_rollout_override expflag forcedCapability jsfeat jsmode mods".split(" ");[].concat(ka(gi),["client_dev_set_cookie"]);"undefined"!==typeof TextDecoder&&new TextDecoder;var hi="undefined"!==typeof TextEncoder?new TextEncoder:null,ii=hi?function(a){return hi.encode(a)}:function(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);
128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(55296==(e&64512)&&d+1<a.length&&56320==(a.charCodeAt(d+1)&64512)?(e=65536+((e&1023)<<10)+(a.charCodeAt(++d)&1023),b[c++]=e>>18|240,b[c++]=e>>12&63|128):b[c++]=e>>12|224,b[c++]=e>>6&63|128),b[c++]=e&63|128)}a=new Uint8Array(b.length);for(c=0;c<a.length;c++)a[c]=b[c];return a};function ji(a){hf.call(this);var b=this;this.A=this.j=0;this.Ba=null!=a?a:{la:function(e,f){return setTimeout(e,f)},
Fa:function(e){clearTimeout(e)}};
var c,d;this.i=null!=(d=null==(c=window.navigator)?void 0:c.onLine)?d:!0;this.m=function(){return A(function(e){return e.yield(ki(b),0)})};
window.addEventListener("offline",this.m);window.addEventListener("online",this.m);this.A||li(this)}
w(ji,hf);function mi(){var a=ni;ji.h||(ji.h=new ji(a));return ji.h}
ji.prototype.dispose=function(){window.removeEventListener("offline",this.m);window.removeEventListener("online",this.m);this.Ba.Fa(this.A);delete ji.h};
ji.prototype.sa=function(){return this.i};
function li(a){a.A=a.Ba.la(function(){var b;return A(function(c){if(1==c.h)return a.i?(null==(b=window.navigator)?0:b.onLine)?c.v(3):c.yield(ki(a),3):c.yield(ki(a),3);li(a);c.h=0})},3E4)}
function ki(a,b){return a.s?a.s:a.s=new Promise(function(c){var d,e,f,g;return A(function(h){switch(h.h){case 1:return d=window.AbortController?new window.AbortController:void 0,f=null==(e=d)?void 0:e.signal,g=!1,za(h,2,3),d&&(a.j=a.Ba.la(function(){d.abort()},b||2E4)),h.yield(fetch("/generate_204",{method:"HEAD",
signal:f}),5);case 5:g=!0;case 3:Ca(h);a.s=void 0;a.j&&(a.Ba.Fa(a.j),a.j=0);g!==a.i&&(a.i=g,a.i?jf(a,"networkstatus-online"):jf(a,"networkstatus-offline"));c(g);Da(h);break;case 2:Ba(h),g=!1,h.v(3)}})})}
;function oi(){this.data_=[];this.h=-1}
oi.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&Number.isInteger(a)&&this.data_[a]!==b&&(this.data_[a]=b,this.h=-1)};
oi.prototype.get=function(a){return!!this.data_[a]};
function pi(a){-1===a.h&&(a.h=hb(a.data_,function(b,c,d){return c?b+Math.pow(2,d):b},0));
return a.h}
;function qi(a,b){this.h=a[C.Symbol.iterator]();this.i=b}
qi.prototype[Symbol.iterator]=function(){return this};
qi.prototype.next=function(){var a=this.h.next();return{value:a.done?void 0:this.i.call(void 0,a.value),done:a.done}};
function ri(a,b){return new qi(a,b)}
;function si(){this.blockSize=-1}
;function ti(){this.blockSize=-1;this.blockSize=64;this.h=[];this.m=[];this.s=[];this.j=[];this.j[0]=128;for(var a=1;a<this.blockSize;++a)this.j[a]=0;this.l=this.i=0;this.reset()}
Ya(ti,si);ti.prototype.reset=function(){this.h[0]=1732584193;this.h[1]=4023233417;this.h[2]=2562383102;this.h[3]=271733878;this.h[4]=3285377520;this.l=this.i=0};
function ui(a,b,c){c||(c=0);var d=a.s;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.h[0];c=a.h[1];var g=a.h[2],h=a.h[3],k=a.h[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=h^c&(g^h);var l=1518500249}else f=c^g^h,l=1859775393;else 60>e?(f=c&g|h&(c|g),l=2400959708):
(f=c^g^h,l=3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=h;h=g;g=(c<<30|c>>>2)&4294967295;c=b;b=f}a.h[0]=a.h[0]+b&4294967295;a.h[1]=a.h[1]+c&4294967295;a.h[2]=a.h[2]+g&4294967295;a.h[3]=a.h[3]+h&4294967295;a.h[4]=a.h[4]+k&4294967295}
ti.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.blockSize,d=0,e=this.m,f=this.i;d<b;){if(0==f)for(;d<=c;)ui(this,a,d),d+=this.blockSize;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.blockSize){ui(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.blockSize){ui(this,e);f=0;break}}this.i=f;this.l+=b}};
ti.prototype.digest=function(){var a=[],b=8*this.l;56>this.i?this.update(this.j,56-this.i):this.update(this.j,this.blockSize-(this.i-56));for(var c=this.blockSize-1;56<=c;c--)this.m[c]=b&255,b/=256;ui(this,this.m);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.h[c]>>d&255,++b;return a};function vi(a){return"string"==typeof a.className?a.className:a.getAttribute&&a.getAttribute("class")||""}
function wi(a,b){"string"==typeof a.className?a.className=b:a.setAttribute&&a.setAttribute("class",b)}
function xi(a,b){a.classList?b=a.classList.contains(b):(a=a.classList?a.classList:vi(a).match(/\S+/g)||[],b=0<=db(a,b));return b}
function yi(){var a=document.body;a.classList?a.classList.remove("inverted-hdpi"):xi(a,"inverted-hdpi")&&wi(a,Array.prototype.filter.call(a.classList?a.classList:vi(a).match(/\S+/g)||[],function(b){return"inverted-hdpi"!=b}).join(" "))}
;function zi(){}
zi.prototype.next=function(){return Ai};
var Ai={done:!0,value:void 0};function Bi(a){return{value:a,done:!1}}
zi.prototype.Ea=function(){return this};function Ci(a){if(a instanceof Di||a instanceof Ei||a instanceof Fi)return a;if("function"==typeof a.next)return new Di(function(){return a});
if("function"==typeof a[Symbol.iterator])return new Di(function(){return a[Symbol.iterator]()});
if("function"==typeof a.Ea)return new Di(function(){return a.Ea()});
throw Error("Not an iterator or iterable.");}
function Di(a){this.i=a}
Di.prototype.Ea=function(){return new Ei(this.i())};
Di.prototype[Symbol.iterator]=function(){return new Fi(this.i())};
Di.prototype.h=function(){return new Fi(this.i())};
function Ei(a){this.i=a}
w(Ei,zi);Ei.prototype.next=function(){return this.i.next()};
Ei.prototype[Symbol.iterator]=function(){return new Fi(this.i)};
Ei.prototype.h=function(){return new Fi(this.i)};
function Fi(a){Di.call(this,function(){return a});
this.j=a}
w(Fi,Di);Fi.prototype.next=function(){return this.j.next()};function Gi(a,b){this.i={};this.h=[];this.Xa=this.size=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof Gi)for(c=a.Cc(),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
m=Gi.prototype;m.Cc=function(){Hi(this);return this.h.concat()};
m.has=function(a){return Ii(this.i,a)};
m.equals=function(a,b){if(this===a)return!0;if(this.size!=a.size)return!1;b=b||Ji;Hi(this);for(var c,d=0;c=this.h[d];d++)if(!b(this.get(c),a.get(c)))return!1;return!0};
function Ji(a,b){return a===b}
m.isEmpty=function(){return 0==this.size};
m.clear=function(){this.i={};this.Xa=this.size=this.h.length=0};
m.remove=function(a){return this.delete(a)};
m.delete=function(a){return Ii(this.i,a)?(delete this.i[a],--this.size,this.Xa++,this.h.length>2*this.size&&Hi(this),!0):!1};
function Hi(a){if(a.size!=a.h.length){for(var b=0,c=0;b<a.h.length;){var d=a.h[b];Ii(a.i,d)&&(a.h[c++]=d);b++}a.h.length=c}if(a.size!=a.h.length){var e={};for(c=b=0;b<a.h.length;)d=a.h[b],Ii(e,d)||(a.h[c++]=d,e[d]=1),b++;a.h.length=c}}
m.get=function(a,b){return Ii(this.i,a)?this.i[a]:b};
m.set=function(a,b){Ii(this.i,a)||(this.size+=1,this.h.push(a),this.Xa++);this.i[a]=b};
m.forEach=function(a,b){for(var c=this.Cc(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
m.clone=function(){return new Gi(this)};
m.keys=function(){return Ci(this.Ea(!0)).h()};
m.values=function(){return Ci(this.Ea(!1)).h()};
m.entries=function(){var a=this;return ri(this.keys(),function(b){return[b,a.get(b)]})};
m.Ea=function(a){Hi(this);var b=0,c=this.Xa,d=this,e=new zi;e.next=function(){if(c!=d.Xa)throw Error("The map has changed since the iterator was created");if(b>=d.h.length)return Ai;var f=d.h[b++];return Bi(a?f:d.i[f])};
return e};
function Ii(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
;function N(a){M.call(this);this.s=1;this.l=[];this.m=0;this.i=[];this.j={};this.A=!!a}
Ya(N,M);m=N.prototype;m.subscribe=function(a,b,c){var d=this.j[a];d||(d=this.j[a]=[]);var e=this.s;this.i[e]=a;this.i[e+1]=b;this.i[e+2]=c;this.s=e+3;d.push(e);return e};
function Ki(a,b,c,d){if(b=a.j[b]){var e=a.i;(b=b.find(function(f){return e[f+1]==c&&e[f+2]==d}))&&a.Hb(b)}}
m.Hb=function(a){var b=this.i[a];if(b){var c=this.j[b];0!=this.m?(this.l.push(a),this.i[a+1]=function(){}):(c&&jb(c,a),delete this.i[a],delete this.i[a+1],delete this.i[a+2])}return!!b};
m.cb=function(a,b){var c=this.j[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.A)for(e=0;e<c.length;e++){var g=c[e];Li(this.i[g+1],this.i[g+2],d)}else{this.m++;try{for(e=0,f=c.length;e<f&&!this.h();e++)g=c[e],this.i[g+1].apply(this.i[g+2],d)}finally{if(this.m--,0<this.l.length&&0==this.m)for(;c=this.l.pop();)this.Hb(c)}}return 0!=e}return!1};
function Li(a,b,c){Bf(function(){a.apply(b,c)})}
m.clear=function(a){if(a){var b=this.j[a];b&&(b.forEach(this.Hb,this),delete this.j[a])}else this.i.length=0,this.j={}};
m.K=function(){N.xa.K.call(this);this.clear();this.l.length=0};function Mi(a){this.h=a}
Mi.prototype.set=function(a,b){void 0===b?this.h.remove(a):this.h.set(a,(new Kg).serialize(b))};
Mi.prototype.get=function(a){try{var b=this.h.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Mi.prototype.remove=function(a){this.h.remove(a)};function Ni(a){this.h=a}
Ya(Ni,Mi);function Oi(a){this.data=a}
function Pi(a){return void 0===a||a instanceof Oi?a:new Oi(a)}
Ni.prototype.set=function(a,b){Ni.xa.set.call(this,a,Pi(b))};
Ni.prototype.i=function(a){a=Ni.xa.get.call(this,a);if(void 0===a||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
Ni.prototype.get=function(a){if(a=this.i(a)){if(a=a.data,void 0===a)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function Qi(a){this.h=a}
Ya(Qi,Ni);Qi.prototype.set=function(a,b,c){if(b=Pi(b)){if(c){if(c<Date.now()){Qi.prototype.remove.call(this,a);return}b.expiration=c}b.creation=Date.now()}Qi.xa.set.call(this,a,b)};
Qi.prototype.i=function(a){var b=Qi.xa.i.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<Date.now()||c&&c>Date.now())Qi.prototype.remove.call(this,a);else return b}};function Ri(){}
;function Si(){}
Ya(Si,Ri);Si.prototype[Symbol.iterator]=function(){return Ci(this.Ea(!0)).h()};
Si.prototype.clear=function(){var a=Array.from(this);a=v(a);for(var b=a.next();!b.done;b=a.next())this.remove(b.value)};function Ti(a){this.h=a}
Ya(Ti,Si);m=Ti.prototype;m.isAvailable=function(){if(!this.h)return!1;try{return this.h.setItem("__sak","1"),this.h.removeItem("__sak"),!0}catch(a){return!1}};
m.set=function(a,b){try{this.h.setItem(a,b)}catch(c){if(0==this.h.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
m.get=function(a){a=this.h.getItem(a);if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
m.remove=function(a){this.h.removeItem(a)};
m.Ea=function(a){var b=0,c=this.h,d=new zi;d.next=function(){if(b>=c.length)return Ai;var e=c.key(b++);if(a)return Bi(e);e=c.getItem(e);if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return Bi(e)};
return d};
m.clear=function(){this.h.clear()};
m.key=function(a){return this.h.key(a)};function Ui(){var a=null;try{a=window.localStorage||null}catch(b){}this.h=a}
Ya(Ui,Ti);function Vi(a,b){this.i=a;this.h=null;var c;if(c=Tc)c=!(9<=Number(gd));if(c){Wi||(Wi=new Gi);this.h=Wi.get(a);this.h||(b?this.h=document.getElementById(b):(this.h=document.createElement("userdata"),this.h.addBehavior("#default#userData"),document.body.appendChild(this.h)),Wi.set(a,this.h));try{this.h.load(this.i)}catch(d){this.h=null}}}
Ya(Vi,Si);var Xi={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},Wi=null;function Yi(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return Xi[b]})}
m=Vi.prototype;m.isAvailable=function(){return!!this.h};
m.set=function(a,b){this.h.setAttribute(Yi(a),b);Zi(this)};
m.get=function(a){a=this.h.getAttribute(Yi(a));if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
m.remove=function(a){this.h.removeAttribute(Yi(a));Zi(this)};
m.Ea=function(a){var b=0,c=this.h.XMLDocument.documentElement.attributes,d=new zi;d.next=function(){if(b>=c.length)return Ai;var e=c[b++];if(a)return Bi(decodeURIComponent(e.nodeName.replace(/\./g,"%")).slice(1));e=e.nodeValue;if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return Bi(e)};
return d};
m.clear=function(){for(var a=this.h.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);Zi(this)};
function Zi(a){try{a.h.save(a.i)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function $i(a,b){this.i=a;this.h=b+"::"}
Ya($i,Si);$i.prototype.set=function(a,b){this.i.set(this.h+a,b)};
$i.prototype.get=function(a){return this.i.get(this.h+a)};
$i.prototype.remove=function(a){this.i.remove(this.h+a)};
$i.prototype.Ea=function(a){var b=this.i[Symbol.iterator](),c=this,d=new zi;d.next=function(){var e=b.next();if(e.done)return e;for(e=e.value;e.slice(0,c.h.length)!=c.h;){e=b.next();if(e.done)return e;e=e.value}return Bi(a?e.slice(c.h.length):c.i.get(e))};
return d};/*

 (The MIT License)

 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 -----------------------------------------------------------------------------
 Ported from zlib, which is under the following license
 https://github.com/madler/zlib/blob/master/zlib.h

 zlib.h -- interface of the 'zlib' general purpose compression library
   version 1.2.8, April 28th, 2013
   Copyright (C) 1995-2013 Jean-loup Gailly and Mark Adler
   This software is provided 'as-is', without any express or implied
   warranty.  In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
      claim that you wrote the original software. If you use this software
      in a product, an acknowledgment in the product documentation would be
      appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
      misrepresented as being the original software.
   3. This notice may not be removed or altered from any source distribution.
   Jean-loup Gailly        Mark Adler
   jloup@gzip.org          madler@alumni.caltech.edu
   The data format used by the zlib library is described by RFCs (Request for
   Comments) 1950 to 1952 in the files http://tools.ietf.org/html/rfc1950
   (zlib format), rfc1951 (deflate format) and rfc1952 (gzip format).
*/
var O={},aj="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Int32Array;O.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if("object"!==typeof c)throw new TypeError(c+"must be non-object");for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}}return a};
O.Qc=function(a,b){if(a.length===b)return a;if(a.subarray)return a.subarray(0,b);a.length=b;return a};
var bj={rb:function(a,b,c,d,e){if(b.subarray&&a.subarray)a.set(b.subarray(c,c+d),e);else for(var f=0;f<d;f++)a[e+f]=b[c+f]},
gd:function(a){var b,c;var d=c=0;for(b=a.length;d<b;d++)c+=a[d].length;var e=new Uint8Array(c);d=c=0;for(b=a.length;d<b;d++){var f=a[d];e.set(f,c);c+=f.length}return e}},cj={rb:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f]},
gd:function(a){return[].concat.apply([],a)}};
O.Pe=function(){aj?(O.ob=Uint8Array,O.Ha=Uint16Array,O.Ld=Int32Array,O.assign(O,bj)):(O.ob=Array,O.Ha=Array,O.Ld=Array,O.assign(O,cj))};
O.Pe();var dj=!0;try{new Uint8Array(1)}catch(a){dj=!1}
function ej(a){var b,c,d=a.length,e=0;for(b=0;b<d;b++){var f=a.charCodeAt(b);if(55296===(f&64512)&&b+1<d){var g=a.charCodeAt(b+1);56320===(g&64512)&&(f=65536+(f-55296<<10)+(g-56320),b++)}e+=128>f?1:2048>f?2:65536>f?3:4}var h=new O.ob(e);for(b=c=0;c<e;b++)f=a.charCodeAt(b),55296===(f&64512)&&b+1<d&&(g=a.charCodeAt(b+1),56320===(g&64512)&&(f=65536+(f-55296<<10)+(g-56320),b++)),128>f?h[c++]=f:(2048>f?h[c++]=192|f>>>6:(65536>f?h[c++]=224|f>>>12:(h[c++]=240|f>>>18,h[c++]=128|f>>>12&63),h[c++]=128|f>>>
6&63),h[c++]=128|f&63);return h}
;var fj={};fj=function(a,b,c,d){var e=a&65535|0;a=a>>>16&65535|0;for(var f;0!==c;){f=2E3<c?2E3:c;c-=f;do e=e+b[d++]|0,a=a+e|0;while(--f);e%=65521;a%=65521}return e|a<<16|0};for(var gj={},hj,ij=[],jj=0;256>jj;jj++){hj=jj;for(var kj=0;8>kj;kj++)hj=hj&1?3988292384^hj>>>1:hj>>>1;ij[jj]=hj}gj=function(a,b,c,d){c=d+c;for(a^=-1;d<c;d++)a=a>>>8^ij[(a^b[d])&255];return a^-1};var lj={};lj={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};function mj(a){for(var b=a.length;0<=--b;)a[b]=0}
var nj=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],oj=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],pj=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],qj=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],rj=Array(576);mj(rj);var sj=Array(60);mj(sj);var tj=Array(512);mj(tj);var uj=Array(256);mj(uj);var vj=Array(29);mj(vj);var wj=Array(30);mj(wj);function xj(a,b,c,d,e){this.Dd=a;this.be=b;this.ae=c;this.Wd=d;this.ue=e;this.ld=a&&a.length}
var yj,zj,Aj;function Bj(a,b){this.ed=a;this.Ab=0;this.Wa=b}
function Cj(a,b){a.S[a.pending++]=b&255;a.S[a.pending++]=b>>>8&255}
function Dj(a,b,c){a.da>16-c?(a.ja|=b<<a.da&65535,Cj(a,a.ja),a.ja=b>>16-a.da,a.da+=c-16):(a.ja|=b<<a.da&65535,a.da+=c)}
function Ej(a,b,c){Dj(a,c[2*b],c[2*b+1])}
function Fj(a,b){var c=0;do c|=a&1,a>>>=1,c<<=1;while(0<--b);return c>>>1}
function Gj(a,b,c){var d=Array(16),e=0,f;for(f=1;15>=f;f++)d[f]=e=e+c[f-1]<<1;for(c=0;c<=b;c++)e=a[2*c+1],0!==e&&(a[2*c]=Fj(d[e]++,e))}
function Hj(a){var b;for(b=0;286>b;b++)a.ma[2*b]=0;for(b=0;30>b;b++)a.eb[2*b]=0;for(b=0;19>b;b++)a.fa[2*b]=0;a.ma[512]=1;a.Oa=a.Db=0;a.va=a.matches=0}
function Ij(a){8<a.da?Cj(a,a.ja):0<a.da&&(a.S[a.pending++]=a.ja);a.ja=0;a.da=0}
function Jj(a,b,c){Ij(a);Cj(a,c);Cj(a,~c);O.rb(a.S,a.window,b,c,a.pending);a.pending+=c}
function Kj(a,b,c,d){var e=2*b,f=2*c;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}
function Lj(a,b,c){for(var d=a.U[c],e=c<<1;e<=a.Ma;){e<a.Ma&&Kj(b,a.U[e+1],a.U[e],a.depth)&&e++;if(Kj(b,d,a.U[e],a.depth))break;a.U[c]=a.U[e];c=e;e<<=1}a.U[c]=d}
function Mj(a,b,c){var d=0;if(0!==a.va){do{var e=a.S[a.Kb+2*d]<<8|a.S[a.Kb+2*d+1];var f=a.S[a.Gc+d];d++;if(0===e)Ej(a,f,b);else{var g=uj[f];Ej(a,g+256+1,b);var h=nj[g];0!==h&&(f-=vj[g],Dj(a,f,h));e--;g=256>e?tj[e]:tj[256+(e>>>7)];Ej(a,g,c);h=oj[g];0!==h&&(e-=wj[g],Dj(a,e,h))}}while(d<a.va)}Ej(a,256,b)}
function Nj(a,b){var c=b.ed,d=b.Wa.Dd,e=b.Wa.ld,f=b.Wa.Wd,g,h=-1;a.Ma=0;a.xb=573;for(g=0;g<f;g++)0!==c[2*g]?(a.U[++a.Ma]=h=g,a.depth[g]=0):c[2*g+1]=0;for(;2>a.Ma;){var k=a.U[++a.Ma]=2>h?++h:0;c[2*k]=1;a.depth[k]=0;a.Oa--;e&&(a.Db-=d[2*k+1])}b.Ab=h;for(g=a.Ma>>1;1<=g;g--)Lj(a,c,g);k=f;do g=a.U[1],a.U[1]=a.U[a.Ma--],Lj(a,c,1),d=a.U[1],a.U[--a.xb]=g,a.U[--a.xb]=d,c[2*k]=c[2*g]+c[2*d],a.depth[k]=(a.depth[g]>=a.depth[d]?a.depth[g]:a.depth[d])+1,c[2*g+1]=c[2*d+1]=k,a.U[1]=k++,Lj(a,c,1);while(2<=a.Ma);a.U[--a.xb]=
a.U[1];g=b.ed;k=b.Ab;d=b.Wa.Dd;e=b.Wa.ld;f=b.Wa.be;var l=b.Wa.ae,n=b.Wa.ue,p,t=0;for(p=0;15>=p;p++)a.Ja[p]=0;g[2*a.U[a.xb]+1]=0;for(b=a.xb+1;573>b;b++){var r=a.U[b];p=g[2*g[2*r+1]+1]+1;p>n&&(p=n,t++);g[2*r+1]=p;if(!(r>k)){a.Ja[p]++;var x=0;r>=l&&(x=f[r-l]);var y=g[2*r];a.Oa+=y*(p+x);e&&(a.Db+=y*(d[2*r+1]+x))}}if(0!==t){do{for(p=n-1;0===a.Ja[p];)p--;a.Ja[p]--;a.Ja[p+1]+=2;a.Ja[n]--;t-=2}while(0<t);for(p=n;0!==p;p--)for(r=a.Ja[p];0!==r;)d=a.U[--b],d>k||(g[2*d+1]!==p&&(a.Oa+=(p-g[2*d+1])*g[2*d],g[2*
d+1]=p),r--)}Gj(c,h,a.Ja)}
function Oj(a,b,c){var d,e=-1,f=b[1],g=0,h=7,k=4;0===f&&(h=138,k=3);b[2*(c+1)+1]=65535;for(d=0;d<=c;d++){var l=f;f=b[2*(d+1)+1];++g<h&&l===f||(g<k?a.fa[2*l]+=g:0!==l?(l!==e&&a.fa[2*l]++,a.fa[32]++):10>=g?a.fa[34]++:a.fa[36]++,g=0,e=l,0===f?(h=138,k=3):l===f?(h=6,k=3):(h=7,k=4))}}
function Pj(a,b,c){var d,e=-1,f=b[1],g=0,h=7,k=4;0===f&&(h=138,k=3);for(d=0;d<=c;d++){var l=f;f=b[2*(d+1)+1];if(!(++g<h&&l===f)){if(g<k){do Ej(a,l,a.fa);while(0!==--g)}else 0!==l?(l!==e&&(Ej(a,l,a.fa),g--),Ej(a,16,a.fa),Dj(a,g-3,2)):10>=g?(Ej(a,17,a.fa),Dj(a,g-3,3)):(Ej(a,18,a.fa),Dj(a,g-11,7));g=0;e=l;0===f?(h=138,k=3):l===f?(h=6,k=3):(h=7,k=4)}}}
function Qj(a){var b=4093624447,c;for(c=0;31>=c;c++,b>>>=1)if(b&1&&0!==a.ma[2*c])return 0;if(0!==a.ma[18]||0!==a.ma[20]||0!==a.ma[26])return 1;for(c=32;256>c;c++)if(0!==a.ma[2*c])return 1;return 0}
var Rj=!1;function Sj(a,b,c){a.S[a.Kb+2*a.va]=b>>>8&255;a.S[a.Kb+2*a.va+1]=b&255;a.S[a.Gc+a.va]=c&255;a.va++;0===b?a.ma[2*c]++:(a.matches++,b--,a.ma[2*(uj[c]+256+1)]++,a.eb[2*(256>b?tj[b]:tj[256+(b>>>7)])]++);return a.va===a.Mb-1}
;function Tj(a,b){a.msg=lj[b];return b}
function Uj(a){for(var b=a.length;0<=--b;)a[b]=0}
function Vj(a){var b=a.state,c=b.pending;c>a.I&&(c=a.I);0!==c&&(O.rb(a.output,b.S,b.Nb,c,a.Bb),a.Bb+=c,b.Nb+=c,a.Rc+=c,a.I-=c,b.pending-=c,0===b.pending&&(b.Nb=0))}
function Wj(a,b){var c=0<=a.qa?a.qa:-1,d=a.o-a.qa,e=0;if(0<a.level){2===a.F.wc&&(a.F.wc=Qj(a));Nj(a,a.ec);Nj(a,a.Zb);Oj(a,a.ma,a.ec.Ab);Oj(a,a.eb,a.Zb.Ab);Nj(a,a.Yc);for(e=18;3<=e&&0===a.fa[2*qj[e]+1];e--);a.Oa+=3*(e+1)+14;var f=a.Oa+3+7>>>3;var g=a.Db+3+7>>>3;g<=f&&(f=g)}else f=g=d+5;if(d+4<=f&&-1!==c)Dj(a,b?1:0,3),Jj(a,c,d);else if(4===a.strategy||g===f)Dj(a,2+(b?1:0),3),Mj(a,rj,sj);else{Dj(a,4+(b?1:0),3);c=a.ec.Ab+1;d=a.Zb.Ab+1;e+=1;Dj(a,c-257,5);Dj(a,d-1,5);Dj(a,e-4,4);for(f=0;f<e;f++)Dj(a,a.fa[2*
qj[f]+1],3);Pj(a,a.ma,c-1);Pj(a,a.eb,d-1);Mj(a,a.ma,a.eb)}Hj(a);b&&Ij(a);a.qa=a.o;Vj(a.F)}
function R(a,b){a.S[a.pending++]=b}
function Xj(a,b){a.S[a.pending++]=b>>>8&255;a.S[a.pending++]=b&255}
function Yj(a,b){var c=a.od,d=a.o,e=a.ta,f=a.qd,g=a.o>a.ha-262?a.o-(a.ha-262):0,h=a.window,k=a.Ya,l=a.Ga,n=a.o+258,p=h[d+e-1],t=h[d+e];a.ta>=a.kd&&(c>>=2);f>a.u&&(f=a.u);do{var r=b;if(h[r+e]===t&&h[r+e-1]===p&&h[r]===h[d]&&h[++r]===h[d+1]){d+=2;for(r++;h[++d]===h[++r]&&h[++d]===h[++r]&&h[++d]===h[++r]&&h[++d]===h[++r]&&h[++d]===h[++r]&&h[++d]===h[++r]&&h[++d]===h[++r]&&h[++d]===h[++r]&&d<n;);r=258-(n-d);d=n-258;if(r>e){a.zb=b;e=r;if(r>=f)break;p=h[d+e-1];t=h[d+e]}}}while((b=l[b&k])>g&&0!==--c);return e<=
a.u?e:a.u}
function Zj(a){var b=a.ha,c;do{var d=a.Jd-a.u-a.o;if(a.o>=b+(b-262)){O.rb(a.window,a.window,b,b,0);a.zb-=b;a.o-=b;a.qa-=b;var e=c=a.dc;do{var f=a.head[--e];a.head[e]=f>=b?f-b:0}while(--c);e=c=b;do f=a.Ga[--e],a.Ga[e]=f>=b?f-b:0;while(--c);d+=b}if(0===a.F.ia)break;e=a.F;c=a.window;f=a.o+a.u;var g=e.ia;g>d&&(g=d);0===g?c=0:(e.ia-=g,O.rb(c,e.input,e.hb,g,f),1===e.state.wrap?e.D=fj(e.D,c,g,f):2===e.state.wrap&&(e.D=gj(e.D,c,g,f)),e.hb+=g,e.lb+=g,c=g);a.u+=c;if(3<=a.u+a.na)for(d=a.o-a.na,a.H=a.window[d],
a.H=(a.H<<a.La^a.window[d+1])&a.Ka;a.na&&!(a.H=(a.H<<a.La^a.window[d+3-1])&a.Ka,a.Ga[d&a.Ya]=a.head[a.H],a.head[a.H]=d,d++,a.na--,3>a.u+a.na););}while(262>a.u&&0!==a.F.ia)}
function ak(a,b){for(var c;;){if(262>a.u){Zj(a);if(262>a.u&&0===b)return 1;if(0===a.u)break}c=0;3<=a.u&&(a.H=(a.H<<a.La^a.window[a.o+3-1])&a.Ka,c=a.Ga[a.o&a.Ya]=a.head[a.H],a.head[a.H]=a.o);0!==c&&a.o-c<=a.ha-262&&(a.J=Yj(a,c));if(3<=a.J)if(c=Sj(a,a.o-a.zb,a.J-3),a.u-=a.J,a.J<=a.Hc&&3<=a.u){a.J--;do a.o++,a.H=(a.H<<a.La^a.window[a.o+3-1])&a.Ka,a.Ga[a.o&a.Ya]=a.head[a.H],a.head[a.H]=a.o;while(0!==--a.J);a.o++}else a.o+=a.J,a.J=0,a.H=a.window[a.o],a.H=(a.H<<a.La^a.window[a.o+1])&a.Ka;else c=Sj(a,0,
a.window[a.o]),a.u--,a.o++;if(c&&(Wj(a,!1),0===a.F.I))return 1}a.na=2>a.o?a.o:2;return 4===b?(Wj(a,!0),0===a.F.I?3:4):a.va&&(Wj(a,!1),0===a.F.I)?1:2}
function bk(a,b){for(var c,d;;){if(262>a.u){Zj(a);if(262>a.u&&0===b)return 1;if(0===a.u)break}c=0;3<=a.u&&(a.H=(a.H<<a.La^a.window[a.o+3-1])&a.Ka,c=a.Ga[a.o&a.Ya]=a.head[a.H],a.head[a.H]=a.o);a.ta=a.J;a.td=a.zb;a.J=2;0!==c&&a.ta<a.Hc&&a.o-c<=a.ha-262&&(a.J=Yj(a,c),5>=a.J&&(1===a.strategy||3===a.J&&4096<a.o-a.zb)&&(a.J=2));if(3<=a.ta&&a.J<=a.ta){d=a.o+a.u-3;c=Sj(a,a.o-1-a.td,a.ta-3);a.u-=a.ta-1;a.ta-=2;do++a.o<=d&&(a.H=(a.H<<a.La^a.window[a.o+3-1])&a.Ka,a.Ga[a.o&a.Ya]=a.head[a.H],a.head[a.H]=a.o);
while(0!==--a.ta);a.fb=0;a.J=2;a.o++;if(c&&(Wj(a,!1),0===a.F.I))return 1}else if(a.fb){if((c=Sj(a,0,a.window[a.o-1]))&&Wj(a,!1),a.o++,a.u--,0===a.F.I)return 1}else a.fb=1,a.o++,a.u--}a.fb&&(Sj(a,0,a.window[a.o-1]),a.fb=0);a.na=2>a.o?a.o:2;return 4===b?(Wj(a,!0),0===a.F.I?3:4):a.va&&(Wj(a,!1),0===a.F.I)?1:2}
function ck(a,b){for(var c,d,e,f=a.window;;){if(258>=a.u){Zj(a);if(258>=a.u&&0===b)return 1;if(0===a.u)break}a.J=0;if(3<=a.u&&0<a.o&&(d=a.o-1,c=f[d],c===f[++d]&&c===f[++d]&&c===f[++d])){for(e=a.o+258;c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&d<e;);a.J=258-(e-d);a.J>a.u&&(a.J=a.u)}3<=a.J?(c=Sj(a,1,a.J-3),a.u-=a.J,a.o+=a.J,a.J=0):(c=Sj(a,0,a.window[a.o]),a.u--,a.o++);if(c&&(Wj(a,!1),0===a.F.I))return 1}a.na=0;return 4===b?(Wj(a,!0),0===a.F.I?3:4):
a.va&&(Wj(a,!1),0===a.F.I)?1:2}
function dk(a,b){for(var c;;){if(0===a.u&&(Zj(a),0===a.u)){if(0===b)return 1;break}a.J=0;c=Sj(a,0,a.window[a.o]);a.u--;a.o++;if(c&&(Wj(a,!1),0===a.F.I))return 1}a.na=0;return 4===b?(Wj(a,!0),0===a.F.I?3:4):a.va&&(Wj(a,!1),0===a.F.I)?1:2}
function ek(a,b,c,d,e){this.je=a;this.te=b;this.xe=c;this.se=d;this.de=e}
var fk;fk=[new ek(0,0,0,0,function(a,b){var c=65535;for(c>a.wa-5&&(c=a.wa-5);;){if(1>=a.u){Zj(a);if(0===a.u&&0===b)return 1;if(0===a.u)break}a.o+=a.u;a.u=0;var d=a.qa+c;if(0===a.o||a.o>=d)if(a.u=a.o-d,a.o=d,Wj(a,!1),0===a.F.I)return 1;if(a.o-a.qa>=a.ha-262&&(Wj(a,!1),0===a.F.I))return 1}a.na=0;if(4===b)return Wj(a,!0),0===a.F.I?3:4;a.o>a.qa&&Wj(a,!1);return 1}),
new ek(4,4,8,4,ak),new ek(4,5,16,8,ak),new ek(4,6,32,32,ak),new ek(4,4,16,16,bk),new ek(8,16,32,32,bk),new ek(8,16,128,128,bk),new ek(8,32,128,256,bk),new ek(32,128,258,1024,bk),new ek(32,258,258,4096,bk)];
function gk(){this.F=null;this.status=0;this.S=null;this.wrap=this.pending=this.Nb=this.wa=0;this.B=null;this.za=0;this.method=8;this.yb=-1;this.Ya=this.Tc=this.ha=0;this.window=null;this.Jd=0;this.head=this.Ga=null;this.qd=this.kd=this.strategy=this.level=this.Hc=this.od=this.ta=this.u=this.zb=this.o=this.fb=this.td=this.J=this.qa=this.La=this.Ka=this.Dc=this.dc=this.H=0;this.ma=new O.Ha(1146);this.eb=new O.Ha(122);this.fa=new O.Ha(78);Uj(this.ma);Uj(this.eb);Uj(this.fa);this.Yc=this.Zb=this.ec=
null;this.Ja=new O.Ha(16);this.U=new O.Ha(573);Uj(this.U);this.xb=this.Ma=0;this.depth=new O.Ha(573);Uj(this.depth);this.da=this.ja=this.na=this.matches=this.Db=this.Oa=this.Kb=this.va=this.Mb=this.Gc=0}
function hk(a,b){if(!a||!a.state||5<b||0>b)return a?Tj(a,-2):-2;var c=a.state;if(!a.output||!a.input&&0!==a.ia||666===c.status&&4!==b)return Tj(a,0===a.I?-5:-2);c.F=a;var d=c.yb;c.yb=b;if(42===c.status)if(2===c.wrap)a.D=0,R(c,31),R(c,139),R(c,8),c.B?(R(c,(c.B.text?1:0)+(c.B.Ta?2:0)+(c.B.Sa?4:0)+(c.B.name?8:0)+(c.B.comment?16:0)),R(c,c.B.time&255),R(c,c.B.time>>8&255),R(c,c.B.time>>16&255),R(c,c.B.time>>24&255),R(c,9===c.level?2:2<=c.strategy||2>c.level?4:0),R(c,c.B.os&255),c.B.Sa&&c.B.Sa.length&&
(R(c,c.B.Sa.length&255),R(c,c.B.Sa.length>>8&255)),c.B.Ta&&(a.D=gj(a.D,c.S,c.pending,0)),c.za=0,c.status=69):(R(c,0),R(c,0),R(c,0),R(c,0),R(c,0),R(c,9===c.level?2:2<=c.strategy||2>c.level?4:0),R(c,3),c.status=113);else{var e=8+(c.Tc-8<<4)<<8;e|=(2<=c.strategy||2>c.level?0:6>c.level?1:6===c.level?2:3)<<6;0!==c.o&&(e|=32);c.status=113;Xj(c,e+(31-e%31));0!==c.o&&(Xj(c,a.D>>>16),Xj(c,a.D&65535));a.D=1}if(69===c.status)if(c.B.Sa){for(e=c.pending;c.za<(c.B.Sa.length&65535)&&(c.pending!==c.wa||(c.B.Ta&&
c.pending>e&&(a.D=gj(a.D,c.S,c.pending-e,e)),Vj(a),e=c.pending,c.pending!==c.wa));)R(c,c.B.Sa[c.za]&255),c.za++;c.B.Ta&&c.pending>e&&(a.D=gj(a.D,c.S,c.pending-e,e));c.za===c.B.Sa.length&&(c.za=0,c.status=73)}else c.status=73;if(73===c.status)if(c.B.name){e=c.pending;do{if(c.pending===c.wa&&(c.B.Ta&&c.pending>e&&(a.D=gj(a.D,c.S,c.pending-e,e)),Vj(a),e=c.pending,c.pending===c.wa)){var f=1;break}f=c.za<c.B.name.length?c.B.name.charCodeAt(c.za++)&255:0;R(c,f)}while(0!==f);c.B.Ta&&c.pending>e&&(a.D=gj(a.D,
c.S,c.pending-e,e));0===f&&(c.za=0,c.status=91)}else c.status=91;if(91===c.status)if(c.B.comment){e=c.pending;do{if(c.pending===c.wa&&(c.B.Ta&&c.pending>e&&(a.D=gj(a.D,c.S,c.pending-e,e)),Vj(a),e=c.pending,c.pending===c.wa)){f=1;break}f=c.za<c.B.comment.length?c.B.comment.charCodeAt(c.za++)&255:0;R(c,f)}while(0!==f);c.B.Ta&&c.pending>e&&(a.D=gj(a.D,c.S,c.pending-e,e));0===f&&(c.status=103)}else c.status=103;103===c.status&&(c.B.Ta?(c.pending+2>c.wa&&Vj(a),c.pending+2<=c.wa&&(R(c,a.D&255),R(c,a.D>>
8&255),a.D=0,c.status=113)):c.status=113);if(0!==c.pending){if(Vj(a),0===a.I)return c.yb=-1,0}else if(0===a.ia&&(b<<1)-(4<b?9:0)<=(d<<1)-(4<d?9:0)&&4!==b)return Tj(a,-5);if(666===c.status&&0!==a.ia)return Tj(a,-5);if(0!==a.ia||0!==c.u||0!==b&&666!==c.status){d=2===c.strategy?dk(c,b):3===c.strategy?ck(c,b):fk[c.level].de(c,b);if(3===d||4===d)c.status=666;if(1===d||3===d)return 0===a.I&&(c.yb=-1),0;if(2===d&&(1===b?(Dj(c,2,3),Ej(c,256,rj),16===c.da?(Cj(c,c.ja),c.ja=0,c.da=0):8<=c.da&&(c.S[c.pending++]=
c.ja&255,c.ja>>=8,c.da-=8)):5!==b&&(Dj(c,0,3),Jj(c,0,0),3===b&&(Uj(c.head),0===c.u&&(c.o=0,c.qa=0,c.na=0))),Vj(a),0===a.I))return c.yb=-1,0}if(4!==b)return 0;if(0>=c.wrap)return 1;2===c.wrap?(R(c,a.D&255),R(c,a.D>>8&255),R(c,a.D>>16&255),R(c,a.D>>24&255),R(c,a.lb&255),R(c,a.lb>>8&255),R(c,a.lb>>16&255),R(c,a.lb>>24&255)):(Xj(c,a.D>>>16),Xj(c,a.D&65535));Vj(a);0<c.wrap&&(c.wrap=-c.wrap);return 0!==c.pending?0:1}
;var ik={};ik=function(){this.input=null;this.lb=this.ia=this.hb=0;this.output=null;this.Rc=this.I=this.Bb=0;this.msg="";this.state=null;this.wc=2;this.D=0};var jk=Object.prototype.toString;
function kk(a){if(!(this instanceof kk))return new kk(a);a=this.options=O.assign({level:-1,method:8,chunkSize:16384,windowBits:15,memLevel:8,strategy:0,to:""},a||{});a.raw&&0<a.windowBits?a.windowBits=-a.windowBits:a.gzip&&0<a.windowBits&&16>a.windowBits&&(a.windowBits+=16);this.err=0;this.msg="";this.ended=!1;this.chunks=[];this.F=new ik;this.F.I=0;var b=this.F;var c=a.level,d=a.method,e=a.windowBits,f=a.memLevel,g=a.strategy;if(b){var h=1;-1===c&&(c=6);0>e?(h=0,e=-e):15<e&&(h=2,e-=16);if(1>f||9<
f||8!==d||8>e||15<e||0>c||9<c||0>g||4<g)b=Tj(b,-2);else{8===e&&(e=9);var k=new gk;b.state=k;k.F=b;k.wrap=h;k.B=null;k.Tc=e;k.ha=1<<k.Tc;k.Ya=k.ha-1;k.Dc=f+7;k.dc=1<<k.Dc;k.Ka=k.dc-1;k.La=~~((k.Dc+3-1)/3);k.window=new O.ob(2*k.ha);k.head=new O.Ha(k.dc);k.Ga=new O.Ha(k.ha);k.Mb=1<<f+6;k.wa=4*k.Mb;k.S=new O.ob(k.wa);k.Kb=1*k.Mb;k.Gc=3*k.Mb;k.level=c;k.strategy=g;k.method=d;if(b&&b.state){b.lb=b.Rc=0;b.wc=2;c=b.state;c.pending=0;c.Nb=0;0>c.wrap&&(c.wrap=-c.wrap);c.status=c.wrap?42:113;b.D=2===c.wrap?
0:1;c.yb=0;if(!Rj){d=Array(16);for(f=g=0;28>f;f++)for(vj[f]=g,e=0;e<1<<nj[f];e++)uj[g++]=f;uj[g-1]=f;for(f=g=0;16>f;f++)for(wj[f]=g,e=0;e<1<<oj[f];e++)tj[g++]=f;for(g>>=7;30>f;f++)for(wj[f]=g<<7,e=0;e<1<<oj[f]-7;e++)tj[256+g++]=f;for(e=0;15>=e;e++)d[e]=0;for(e=0;143>=e;)rj[2*e+1]=8,e++,d[8]++;for(;255>=e;)rj[2*e+1]=9,e++,d[9]++;for(;279>=e;)rj[2*e+1]=7,e++,d[7]++;for(;287>=e;)rj[2*e+1]=8,e++,d[8]++;Gj(rj,287,d);for(e=0;30>e;e++)sj[2*e+1]=5,sj[2*e]=Fj(e,5);yj=new xj(rj,nj,257,286,15);zj=new xj(sj,
oj,0,30,15);Aj=new xj([],pj,0,19,7);Rj=!0}c.ec=new Bj(c.ma,yj);c.Zb=new Bj(c.eb,zj);c.Yc=new Bj(c.fa,Aj);c.ja=0;c.da=0;Hj(c);c=0}else c=Tj(b,-2);0===c&&(b=b.state,b.Jd=2*b.ha,Uj(b.head),b.Hc=fk[b.level].te,b.kd=fk[b.level].je,b.qd=fk[b.level].xe,b.od=fk[b.level].se,b.o=0,b.qa=0,b.u=0,b.na=0,b.J=b.ta=2,b.fb=0,b.H=0);b=c}}else b=-2;if(0!==b)throw Error(lj[b]);a.header&&(b=this.F)&&b.state&&2===b.state.wrap&&(b.state.B=a.header);if(a.dictionary){var l;"string"===typeof a.dictionary?l=ej(a.dictionary):
"[object ArrayBuffer]"===jk.call(a.dictionary)?l=new Uint8Array(a.dictionary):l=a.dictionary;a=this.F;f=l;g=f.length;if(a&&a.state)if(l=a.state,b=l.wrap,2===b||1===b&&42!==l.status||l.u)b=-2;else{1===b&&(a.D=fj(a.D,f,g,0));l.wrap=0;g>=l.ha&&(0===b&&(Uj(l.head),l.o=0,l.qa=0,l.na=0),c=new O.ob(l.ha),O.rb(c,f,g-l.ha,l.ha,0),f=c,g=l.ha);c=a.ia;d=a.hb;e=a.input;a.ia=g;a.hb=0;a.input=f;for(Zj(l);3<=l.u;){f=l.o;g=l.u-2;do l.H=(l.H<<l.La^l.window[f+3-1])&l.Ka,l.Ga[f&l.Ya]=l.head[l.H],l.head[l.H]=f,f++;while(--g);
l.o=f;l.u=2;Zj(l)}l.o+=l.u;l.qa=l.o;l.na=l.u;l.u=0;l.J=l.ta=2;l.fb=0;a.hb=d;a.input=e;a.ia=c;l.wrap=b;b=0}else b=-2;if(0!==b)throw Error(lj[b]);this.Af=!0}}
kk.prototype.push=function(a,b){var c=this.F,d=this.options.chunkSize;if(this.ended)return!1;var e=b===~~b?b:!0===b?4:0;"string"===typeof a?c.input=ej(a):"[object ArrayBuffer]"===jk.call(a)?c.input=new Uint8Array(a):c.input=a;c.hb=0;c.ia=c.input.length;do{0===c.I&&(c.output=new O.ob(d),c.Bb=0,c.I=d);a=hk(c,e);if(1!==a&&0!==a)return lk(this,a),this.ended=!0,!1;if(0===c.I||0===c.ia&&(4===e||2===e))if("string"===this.options.to){var f=O.Qc(c.output,c.Bb);b=f;f=f.length;if(65537>f&&(b.subarray&&dj||!b.subarray))b=
String.fromCharCode.apply(null,O.Qc(b,f));else{for(var g="",h=0;h<f;h++)g+=String.fromCharCode(b[h]);b=g}this.chunks.push(b)}else b=O.Qc(c.output,c.Bb),this.chunks.push(b)}while((0<c.ia||0===c.I)&&1!==a);if(4===e)return(c=this.F)&&c.state?(d=c.state.status,42!==d&&69!==d&&73!==d&&91!==d&&103!==d&&113!==d&&666!==d?a=Tj(c,-2):(c.state=null,a=113===d?Tj(c,-3):0)):a=-2,lk(this,a),this.ended=!0,0===a;2===e&&(lk(this,0),c.I=0);return!0};
function lk(a,b){0===b&&(a.result="string"===a.options.to?a.chunks.join(""):O.gd(a.chunks));a.chunks=[];a.err=b;a.msg=a.F.msg}
function mk(a,b){b=b||{};b.gzip=!0;b=new kk(b);b.push(a,!0);if(b.err)throw b.msg||lj[b.err];return b.result}
;function nk(a){return Gb(null===a?"null":void 0===a?"undefined":a)}
;function ok(a){this.name=a}
;var pk=new ok("rawColdConfigGroup");var qk=new ok("rawHotConfigGroup");var rk=new ok("commandExecutorCommand");function sk(a){K.call(this,a)}
w(sk,K);var tk=new ok("continuationCommand");var uk=new ok("signalAction");var vk=new ok("webCommandMetadata");var wk=new ok("signalServiceEndpoint");var xk={qf:"EMBEDDED_PLAYER_MODE_UNKNOWN",mf:"EMBEDDED_PLAYER_MODE_DEFAULT",pf:"EMBEDDED_PLAYER_MODE_PFP",nf:"EMBEDDED_PLAYER_MODE_PFL"};var yk=new ok("feedbackEndpoint");function zk(a){K.call(this,a)}
w(zk,K);var Ak=new ok("webPlayerShareEntityServiceEndpoint");var Bk=new ok("playlistEditEndpoint");var Ck=new ok("modifyChannelNotificationPreferenceEndpoint");var Dk=new ok("unsubscribeEndpoint");var Ek=new ok("subscribeEndpoint");function Fk(){var a=Gk;E("yt.ads.biscotti.getId_")||D("yt.ads.biscotti.getId_",a)}
function Hk(a){D("yt.ads.biscotti.lastId_",a)}
;function Ik(a,b){1<b.length?a[b[0]]=b[1]:1===b.length&&Object.assign(a,b[0])}
;var Jk=C.window,Kk,Lk,Mk=(null==Jk?void 0:null==(Kk=Jk.yt)?void 0:Kk.config_)||(null==Jk?void 0:null==(Lk=Jk.ytcfg)?void 0:Lk.data_)||{};D("yt.config_",Mk);function Nk(){Ik(Mk,arguments)}
function S(a,b){return a in Mk?Mk[a]:b}
function Ok(a){var b=Mk.EXPERIMENT_FLAGS;return b?b[a]:void 0}
;var Pk=[];function Qk(a){Pk.forEach(function(b){return b(a)})}
function Rk(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){Sk(b)}}:a}
function Sk(a){var b=E("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0,void 0,void 0):(b=S("ERRORS",[]),b.push([a,"ERROR",void 0,void 0,void 0,void 0,void 0]),Nk("ERRORS",b));Qk(a)}
function Tk(a,b,c,d,e){var f=E("yt.logging.errors.log");f?f(a,"WARNING",b,c,d,void 0,e):(f=S("ERRORS",[]),f.push([a,"WARNING",b,c,d,void 0,e]),Nk("ERRORS",f))}
;var Uk=/^[\w.]*$/,Vk={q:!0,search_query:!0};function Wk(a,b){b=a.split(b);for(var c={},d=0,e=b.length;d<e;d++){var f=b[d].split("=");if(1==f.length&&f[0]||2==f.length)try{var g=Xk(f[0]||""),h=Xk(f[1]||"");g in c?Array.isArray(c[g])?kb(c[g],h):c[g]=[c[g],h]:c[g]=h}catch(p){var k=p,l=f[0],n=String(Wk);k.args=[{key:l,value:f[1],query:a,method:Yk==n?"unchanged":n}];Vk.hasOwnProperty(l)||Tk(k)}}return c}
var Yk=String(Wk);function Zk(a){var b=[];lb(a,function(c,d){var e=encodeURIComponent(String(d)),f;Array.isArray(c)?f=c:f=[c];eb(f,function(g){""==g?b.push(e):b.push(e+"="+encodeURIComponent(String(g)))})});
return b.join("&")}
function $k(a){"?"==a.charAt(0)&&(a=a.substr(1));return Wk(a,"&")}
function al(a){return-1!=a.indexOf("?")?(a=(a||"").split("#")[0],a=a.split("?",2),$k(1<a.length?a[1]:a[0])):{}}
function bl(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=$k(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);return Cc(a,e)+d}
function cl(a){if(!b)var b=window.location.href;var c=tc(1,a),d=uc(a);c&&d?(a=a.match(rc),b=b.match(rc),a=a[3]==b[3]&&a[1]==b[1]&&a[4]==b[4]):a=d?uc(b)==d&&(Number(tc(4,b))||null)==(Number(tc(4,a))||null):!0;return a}
function Xk(a){return a&&a.match(Uk)?a:decodeURIComponent(a.replace(/\+/g," "))}
;function dl(a){var b=el;a=void 0===a?E("yt.ads.biscotti.lastId_")||"":a;var c=Object,d=c.assign,e={};e.dt=fi;e.flash="0";a:{try{var f=b.h.top.location.href}catch(Fa){f=2;break a}f=f?f===b.i.location.href?0:1:2}e=(e.frm=f,e);try{e.u_tz=-(new Date).getTimezoneOffset();var g=void 0===g?Kh:g;try{var h=g.history.length}catch(Fa){h=0}e.u_his=h;var k;e.u_h=null==(k=Kh.screen)?void 0:k.height;var l;e.u_w=null==(l=Kh.screen)?void 0:l.width;var n;e.u_ah=null==(n=Kh.screen)?void 0:n.availHeight;var p;e.u_aw=
null==(p=Kh.screen)?void 0:p.availWidth;var t;e.u_cd=null==(t=Kh.screen)?void 0:t.colorDepth}catch(Fa){}h=b.h;try{var r=h.screenX;var x=h.screenY}catch(Fa){}try{var y=h.outerWidth;var z=h.outerHeight}catch(Fa){}try{var H=h.innerWidth;var I=h.innerHeight}catch(Fa){}try{var L=h.screenLeft;var P=h.screenTop}catch(Fa){}try{H=h.innerWidth,I=h.innerHeight}catch(Fa){}try{var J=h.screen.availWidth;var W=h.screen.availTop}catch(Fa){}r=[L,P,r,x,J,W,y,z,H,I];try{var aa=(b.h.top||window).document,da="CSS1Compat"==
aa.compatMode?aa.documentElement:aa.body;var qa=(new pf(da.clientWidth,da.clientHeight)).round()}catch(Fa){qa=new pf(-12245933,-12245933)}aa=qa;qa={};var na=void 0===na?C:na;da=new oi;"SVGElement"in na&&"createElementNS"in na.document&&da.set(0);x=ci();x["allow-top-navigation-by-user-activation"]&&da.set(1);x["allow-popups-to-escape-sandbox"]&&da.set(2);na.crypto&&na.crypto.subtle&&da.set(3);"TextDecoder"in na&&"TextEncoder"in na&&da.set(4);na=pi(da);qa.bc=na;qa.bih=aa.height;qa.biw=aa.width;qa.brdim=
r.join();b=b.i;b=(qa.vis=b.prerendering?3:{visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[b.visibilityState||b.webkitVisibilityState||b.mozVisibilityState||""]||0,qa.wgl=!!Kh.WebGLRenderingContext,qa);c=d.call(c,e,b);c.ca_type="image";a&&(c.bid=a);return c}
var el=new function(){var a=window.document;this.h=window;this.i=a};
D("yt.ads_.signals_.getAdSignalsString",function(a){return Zk(dl(a))});Date.now();navigator.userAgent.indexOf(" (CrKey ");function T(a){a=fl(a);return"string"===typeof a&&"false"===a?!1:!!a}
function gl(a,b){a=fl(a);return void 0===a&&void 0!==b?b:Number(a||0)}
function fl(a){var b=S("EXPERIMENTS_FORCED_FLAGS",{})||{};return void 0!==b[a]?b[a]:S("EXPERIMENT_FLAGS",{})[a]}
function hl(){for(var a=[],b=S("EXPERIMENTS_FORCED_FLAGS",{}),c=v(Object.keys(b)),d=c.next();!d.done;d=c.next())d=d.value,a.push({key:d,value:String(b[d])});c=S("EXPERIMENT_FLAGS",{});var e=v(Object.keys(c));for(d=e.next();!d.done;d=e.next())d=d.value,d.startsWith("force_")&&void 0===b[d]&&a.push({key:d,value:String(c[d])});return a}
;var il="XMLHttpRequest"in C?function(){return new XMLHttpRequest}:null;
function jl(){if(!il)return null;var a=il();return"open"in a?a:null}
function kl(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function ll(a,b){"function"===typeof a&&(a=Rk(a));return window.setTimeout(a,b)}
;var ml={Authorization:"AUTHORIZATION","X-Goog-EOM-Visitor-Id":"EOM_VISITOR_DATA","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-Youtube-Domain-Admin-State":"DOMAIN_ADMIN_STATE","X-Youtube-Chrome-Connected":"CHROME_CONNECTED_HEADER","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Delegation-Context":"INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL",
"X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM","X-Goog-AuthUser":"SESSION_INDEX","X-Goog-PageId":"DELEGATED_SESSION_ID"},nl="app debugcss debugjs expflag force_ad_params force_ad_encrypted force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" ").concat(ka(gi)),ol=!1;
function pl(a,b){b=void 0===b?{}:b;var c=cl(a),d=T("web_ajax_ignore_global_headers_if_set"),e;for(e in ml){var f=S(ml[e]),g="X-Goog-AuthUser"===e||"X-Goog-PageId"===e;"X-Goog-Visitor-Id"!==e||f||(f=S("VISITOR_DATA"));!f||!c&&uc(a)||d&&void 0!==b[e]||(!T("move_vss_away_from_login_info_cookie")||"TVHTML5_UNPLUGGED"===S("INNERTUBE_CLIENT_NAME"))&&g||(b[e]=f)}T("move_vss_away_from_login_info_cookie")&&c&&S("SESSION_INDEX")&&"TVHTML5_UNPLUGGED"!==S("INNERTUBE_CLIENT_NAME")&&(b["X-Yt-Auth-Test"]="test");
"X-Goog-EOM-Visitor-Id"in b&&"X-Goog-Visitor-Id"in b&&delete b["X-Goog-Visitor-Id"];if(c||!uc(a))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());if(c||!uc(a)){try{var h=(new Intl.DateTimeFormat).resolvedOptions().timeZone}catch(k){}h&&(b["X-YouTube-Time-Zone"]=h)}document.location.hostname.endsWith("youtubeeducation.com")||!c&&uc(a)||(b["X-YouTube-Ad-Signals"]=Zk(dl()));return b}
function ql(a){var b=window.location.search,c=uc(a);T("debug_handle_relative_url_for_query_forward_killswitch")||!c&&cl(a)&&(c=document.location.hostname);var d=sc(tc(5,a));d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=$k(b),f={};eb(nl,function(g){e[g]&&(f[g]=e[g])});
return bl(a,f||{},!1)}
function rl(a,b){var c=b.format||"JSON";a=sl(a,b);var d=tl(a,b),e=!1,f=ul(a,function(k){if(!e){e=!0;h&&window.clearTimeout(h);var l=kl(k),n=null,p=400<=k.status&&500>k.status,t=500<=k.status&&600>k.status;if(l||p||t)n=vl(a,c,k,b.convertToSafeHtml);if(l)a:if(k&&204==k.status)l=!0;else{switch(c){case "XML":l=0==parseInt(n&&n.return_code,10);break a;case "RAW":l=!0;break a}l=!!n}n=n||{};p=b.context||C;l?b.onSuccess&&b.onSuccess.call(p,k,n):b.onError&&b.onError.call(p,k,n);b.onFinish&&b.onFinish.call(p,
k,n)}},b.method,d,b.headers,b.responseType,b.withCredentials);
d=b.timeout||0;if(b.onTimeout&&0<d){var g=b.onTimeout;var h=ll(function(){e||(e=!0,f.abort(),window.clearTimeout(h),g.call(b.context||C,f))},d)}return f}
function sl(a,b){b.includeDomain&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=S("XSRF_FIELD_NAME");if(b=b.urlParams)b[c]&&delete b[c],a=bl(a,b||{},!0);return a}
function tl(a,b){var c=S("XSRF_FIELD_NAME"),d=S("XSRF_TOKEN"),e=b.postBody||"",f=b.postParams,g=S("XSRF_FIELD_NAME"),h;b.headers&&(h=b.headers["Content-Type"]);b.excludeXsrf||uc(a)&&!b.withCredentials&&uc(a)!=document.location.hostname||"POST"!=b.method||h&&"application/x-www-form-urlencoded"!=h||b.postParams&&b.postParams[g]||(f||(f={}),f[c]=d);(T("ajax_parse_query_data_only_when_filled")&&f&&0<Object.keys(f).length||f)&&"string"===typeof e&&(e=$k(e),vb(e,f),e=b.postBodyFormat&&"JSON"==b.postBodyFormat?
JSON.stringify(e):Ac(e));f=e||f&&!ob(f);!ol&&f&&"POST"!=b.method&&(ol=!0,Sk(Error("AJAX request with postData should use POST")));return e}
function vl(a,b,c,d){var e=null;switch(b){case "JSON":try{var f=c.responseText}catch(g){throw d=Error("Error reading responseText"),d.params=a,Tk(d),g;}a=c.getResponseHeader("Content-Type")||"";f&&0<=a.indexOf("json")&&(")]}'\n"===f.substring(0,5)&&(f=f.substring(5)),e=JSON.parse(f));break;case "XML":if(a=(a=c.responseXML)?wl(a):null)e={},eb(a.getElementsByTagName("*"),function(g){e[g.tagName]=xl(g)})}d&&yl(e);
return e}
function yl(a){if(Qa(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=a[b],e=xb();d=e?e.createHTML(d):d;a[c]=new kc(d)}else yl(a[b])}}
function wl(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function xl(a){var b="";eb(a.childNodes,function(c){b+=c.nodeValue});
return b}
function zl(a,b){b.method="POST";b.postParams||(b.postParams={});return rl(a,b)}
function ul(a,b,c,d,e,f,g,h){function k(){4==(l&&"readyState"in l?l.readyState:0)&&b&&Rk(b)(l)}
c=void 0===c?"GET":c;d=void 0===d?"":d;h=void 0===h?!1:h;var l=jl();if(!l)return null;"onloadend"in l?l.addEventListener("loadend",k,!1):l.onreadystatechange=k;T("debug_forward_web_query_parameters")&&(a=ql(a));l.open(c,a,!0);f&&(l.responseType=f);g&&(l.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=pl(a,e))for(var n in e)l.setRequestHeader(n,e[n]),"content-type"==n.toLowerCase()&&(c=!1);c&&l.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
h&&"setAttributionReporting"in XMLHttpRequest.prototype&&l.setAttributionReporting({eventSourceEligible:!0,triggerEligible:!1});l.send(d);return l}
;var Al=[{Ic:function(a){return"Cannot read property '"+a.key+"'"},
hc:{Error:[{regexp:/(Permission denied) to access property "([^']+)"/,groups:["reason","key"]}],TypeError:[{regexp:/Cannot read property '([^']+)' of (null|undefined)/,groups:["key","value"]},{regexp:/\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,groups:["value","key"]},{regexp:/\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
groups:["value","key"]},{regexp:/No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,groups:["key"]},{regexp:/Unable to get property '([^']+)' of (undefined or null) reference/,groups:["key","value"]},{regexp:/(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,groups:["value","base","key"]}]}},{Ic:function(a){return"Cannot call '"+a.key+"'"},
hc:{TypeError:[{regexp:/(?:([^ ]+)?\.)?([^ ]+) is not a function/,groups:["base","key"]},{regexp:/([^ ]+) called on (null or undefined)/,groups:["key","value"]},{regexp:/Object (.*) has no method '([^ ]+)'/,groups:["base","key"]},{regexp:/Object doesn't support property or method '([^ ]+)'/,groups:["key"]},{regexp:/\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
groups:["key"]},{regexp:/\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,groups:["key"]}]}},{Ic:function(a){return a.key+" is not defined"},
hc:{ReferenceError:[{regexp:/(.*) is not defined/,groups:["key"]},{regexp:/Can't find variable: (.*)/,groups:["key"]}]}}];var Cl={Ua:[],Ra:[{callback:Bl,weight:500}]};function Bl(a){if("JavaException"===a.name)return!0;a=a.stack;return a.includes("chrome://")||a.includes("chrome-extension://")||a.includes("moz-extension://")}
;function Dl(){this.Ra=[];this.Ua=[]}
var El;function Fl(){if(!El){var a=El=new Dl;a.Ua.length=0;a.Ra.length=0;Cl.Ua&&a.Ua.push.apply(a.Ua,Cl.Ua);Cl.Ra&&a.Ra.push.apply(a.Ra,Cl.Ra)}return El}
;var Gl=new N;function Hl(a){function b(){return a.charCodeAt(d++)}
var c=a.length,d=0;do{var e=Il(b);if(Infinity===e)break;var f=e>>3;switch(e&7){case 0:e=Il(b);if(2===f)return e;break;case 1:if(2===f)return;d+=8;break;case 2:e=Il(b);if(2===f)return a.substr(d,e);d+=e;break;case 5:if(2===f)return;d+=4;break;default:return}}while(d<c)}
function Il(a){var b=a(),c=b&127;if(128>b)return c;b=a();c|=(b&127)<<7;if(128>b)return c;b=a();c|=(b&127)<<14;if(128>b)return c;b=a();return 128>b?c|(b&127)<<21:Infinity}
;function Jl(a,b,c,d){if(a)if(Array.isArray(a)){var e=d;for(d=0;d<a.length&&!(a[d]&&(e+=Kl(d,a[d],b,c),500<e));d++);d=e}else if("object"===typeof a)for(e in a){if(a[e]){var f=a[e];var g=b;var h=c;g="string"!==typeof f||"clickTrackingParams"!==e&&"trackingParams"!==e?0:(f=Hl(atob(f.replace(/-/g,"+").replace(/_/g,"/"))))?Kl(e+".ve",f,g,h):0;d+=g;d+=Kl(e,a[e],b,c);if(500<d)break}}else c[b]=Ll(a),d+=c[b].length;else c[b]=Ll(a),d+=c[b].length;return d}
function Kl(a,b,c,d){c+="."+a;a=Ll(b);d[c]=a;return c.length+a.length}
function Ll(a){try{return("string"===typeof a?a:String(JSON.stringify(a))).substr(0,500)}catch(b){return"unable to serialize "+typeof a+" ("+b.message+")"}}
;function Ml(){this.Te=!0}
function Nl(){Ml.h||(Ml.h=new Ml);return Ml.h}
function Ol(a,b){a={};var c=Hg([]);c&&(a.Authorization=c,c=b=null==b?void 0:b.sessionIndex,void 0===c&&(c=Number(S("SESSION_INDEX",0)),c=isNaN(c)?0:c),T("voice_search_auth_header_removal")||(a["X-Goog-AuthUser"]=c.toString()),"INNERTUBE_HOST_OVERRIDE"in Mk||(a["X-Origin"]=window.location.origin),void 0===b&&"DELEGATED_SESSION_ID"in Mk&&(a["X-Goog-PageId"]=S("DELEGATED_SESSION_ID")));return a}
;var Pl={identityType:"UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"};function Ql(a){var b=this;this.i=void 0;this.h=!1;a.addEventListener("beforeinstallprompt",function(c){c.preventDefault();b.i=c});
a.addEventListener("appinstalled",function(){b.h=!0},{once:!0})}
function Rl(){if(!C.matchMedia)return"WEB_DISPLAY_MODE_UNKNOWN";try{return C.matchMedia("(display-mode: standalone)").matches?"WEB_DISPLAY_MODE_STANDALONE":C.matchMedia("(display-mode: minimal-ui)").matches?"WEB_DISPLAY_MODE_MINIMAL_UI":C.matchMedia("(display-mode: fullscreen)").matches?"WEB_DISPLAY_MODE_FULLSCREEN":C.matchMedia("(display-mode: browser)").matches?"WEB_DISPLAY_MODE_BROWSER":"WEB_DISPLAY_MODE_UNKNOWN"}catch(a){return"WEB_DISPLAY_MODE_UNKNOWN"}}
;function Sl(a,b,c,d,e){Cg.set(""+a,b,{fc:c,path:"/",domain:void 0===d?"youtube.com":d,secure:void 0===e?!1:e})}
function Tl(a){return Cg.get(""+a,void 0)}
function Ul(a,b,c){Cg.remove(""+a,void 0===b?"/":b,void 0===c?"youtube.com":c)}
function Vl(){if(!Cg.isEnabled())return!1;if(!Cg.isEmpty())return!0;Cg.set("TESTCOOKIESENABLED","1",{fc:60});if("1"!==Cg.get("TESTCOOKIESENABLED"))return!1;Cg.remove("TESTCOOKIESENABLED");return!0}
;var Wl=E("ytglobal.prefsUserPrefsPrefs_")||{};D("ytglobal.prefsUserPrefsPrefs_",Wl);function Xl(){this.h=S("ALT_PREF_COOKIE_NAME","PREF");this.i=S("ALT_PREF_COOKIE_DOMAIN","youtube.com");var a=Tl(this.h);a&&this.parse(a)}
var Yl;function Zl(){Yl||(Yl=new Xl);return Yl}
m=Xl.prototype;m.get=function(a,b){$l(a);am(a);a=void 0!==Wl[a]?Wl[a].toString():null;return null!=a?a:b?b:""};
m.set=function(a,b){$l(a);am(a);if(null==b)throw Error("ExpectedNotNull");Wl[a]=b.toString()};
function bm(a){return!!((cm("f"+(Math.floor(a/31)+1))||0)&1<<a%31)}
m.remove=function(a){$l(a);am(a);delete Wl[a]};
m.clear=function(){for(var a in Wl)delete Wl[a]};
function am(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function $l(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function cm(a){a=void 0!==Wl[a]?Wl[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
m.parse=function(a){a=decodeURIComponent(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(Wl[d]=c.toString())}};var dm={bluetooth:"CONN_DISCO",cellular:"CONN_CELLULAR_UNKNOWN",ethernet:"CONN_WIFI",none:"CONN_NONE",wifi:"CONN_WIFI",wimax:"CONN_CELLULAR_4G",other:"CONN_UNKNOWN",unknown:"CONN_UNKNOWN","slow-2g":"CONN_CELLULAR_2G","2g":"CONN_CELLULAR_2G","3g":"CONN_CELLULAR_3G","4g":"CONN_CELLULAR_4G"},em={"slow-2g":"EFFECTIVE_CONNECTION_TYPE_SLOW_2G","2g":"EFFECTIVE_CONNECTION_TYPE_2G","3g":"EFFECTIVE_CONNECTION_TYPE_3G","4g":"EFFECTIVE_CONNECTION_TYPE_4G"};
function fm(){var a=C.navigator;return a?a.connection:void 0}
function gm(){var a=fm();if(a){var b=dm[a.type||"unknown"]||"CONN_UNKNOWN";a=dm[a.effectiveType||"unknown"]||"CONN_UNKNOWN";"CONN_CELLULAR_UNKNOWN"===b&&"CONN_UNKNOWN"!==a&&(b=a);if("CONN_UNKNOWN"!==b)return b;if("CONN_UNKNOWN"!==a)return a}}
function hm(){var a=fm();if(null!=a&&a.effectiveType)return em.hasOwnProperty(a.effectiveType)?em[a.effectiveType]:"EFFECTIVE_CONNECTION_TYPE_UNKNOWN"}
;function im(a){var b=B.apply(1,arguments);var c=Error.call(this,a);this.message=c.message;"stack"in c&&(this.stack=c.stack);this.args=[].concat(ka(b))}
w(im,Error);function jm(){try{return km(),!0}catch(a){return!1}}
function km(a){if(void 0!==S("DATASYNC_ID"))return S("DATASYNC_ID");throw new im("Datasync ID not set",void 0===a?"unknown":a);}
;function lm(){}
function mm(a,b){return nm(a,0,b)}
lm.prototype.la=function(a,b){return nm(a,1,b)};
function om(a){var b=E("yt.scheduler.instance.addImmediateJob");b?b(a):a()}
;function pm(){lm.apply(this,arguments)}
w(pm,lm);function qm(){pm.h||(pm.h=new pm);return pm.h}
function nm(a,b,c){void 0!==c&&Number.isNaN(Number(c))&&(c=void 0);var d=E("yt.scheduler.instance.addJob");return d?d(a,b,c):void 0===c?(a(),NaN):ll(a,c||0)}
pm.prototype.Fa=function(a){if(void 0===a||!Number.isNaN(Number(a))){var b=E("yt.scheduler.instance.cancelJob");b?b(a):window.clearTimeout(a)}};
pm.prototype.start=function(){var a=E("yt.scheduler.instance.start");a&&a()};
pm.prototype.pause=function(){var a=E("yt.scheduler.instance.pause");a&&a()};
var ni=qm();function rm(a){var b=new Ui;(b=b.isAvailable()?a?new $i(b,a):b:null)||(a=new Vi(a||"UserDataSharedStore"),b=a.isAvailable()?a:null);this.h=(a=b)?new Qi(a):null;this.i=document.domain||window.location.hostname}
rm.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.h)try{this.h.set(a,b,Date.now()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape((new Kg).serialize(b))}catch(f){return}else e=escape(b);Sl(a,e,c,this.i)};
rm.prototype.get=function(a,b){var c=void 0,d=!this.h;if(!d)try{c=this.h.get(a)}catch(e){d=!0}if(d&&(c=Tl(a))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
rm.prototype.remove=function(a){this.h&&this.h.remove(a);Ul(a,"/",this.i)};var sm=function(){var a;return function(){a||(a=new rm("ytidb"));return a}}();
function tm(){var a;return null==(a=sm())?void 0:a.get("LAST_RESULT_ENTRY_KEY",!0)}
;var um=[],wm,xm=!1;function ym(){var a={};for(wm=new zm(void 0===a.handleError?Am:a.handleError,void 0===a.logEvent?Bm:a.logEvent);0<um.length;)switch(a=um.shift(),a.type){case "ERROR":wm.handleError(a.payload);break;case "EVENT":wm.logEvent(a.eventType,a.payload)}}
function Cm(a){xm||(wm?wm.handleError(a):(um.push({type:"ERROR",payload:a}),10<um.length&&um.shift()))}
function Dm(a,b){xm||(wm?wm.logEvent(a,b):(um.push({type:"EVENT",eventType:a,payload:b}),10<um.length&&um.shift()))}
;function Em(a){if(0<=a.indexOf(":"))throw Error("Database name cannot contain ':'");}
function Fm(a){return a.substr(0,a.indexOf(":"))||a}
;var Gm=hd||id;function Hm(a){var b=Ub();return b?0<=b.toLowerCase().indexOf(a):!1}
;var Im={},Jm=(Im.AUTH_INVALID="No user identifier specified.",Im.EXPLICIT_ABORT="Transaction was explicitly aborted.",Im.IDB_NOT_SUPPORTED="IndexedDB is not supported.",Im.MISSING_INDEX="Index not created.",Im.MISSING_OBJECT_STORES="Object stores not created.",Im.DB_DELETED_BY_MISSING_OBJECT_STORES="Database is deleted because expected object stores were not created.",Im.DB_REOPENED_BY_MISSING_OBJECT_STORES="Database is reopened because expected object stores were not created.",Im.UNKNOWN_ABORT="Transaction was aborted for unknown reasons.",
Im.QUOTA_EXCEEDED="The current transaction exceeded its quota limitations.",Im.QUOTA_MAYBE_EXCEEDED="The current transaction may have failed because of exceeding quota limitations.",Im.EXECUTE_TRANSACTION_ON_CLOSED_DB="Can't start a transaction on a closed database",Im.INCOMPATIBLE_DB_VERSION="The binary is incompatible with the database version",Im),Km={},Lm=(Km.AUTH_INVALID="ERROR",Km.EXECUTE_TRANSACTION_ON_CLOSED_DB="WARNING",Km.EXPLICIT_ABORT="IGNORED",Km.IDB_NOT_SUPPORTED="ERROR",Km.MISSING_INDEX=
"WARNING",Km.MISSING_OBJECT_STORES="ERROR",Km.DB_DELETED_BY_MISSING_OBJECT_STORES="WARNING",Km.DB_REOPENED_BY_MISSING_OBJECT_STORES="WARNING",Km.QUOTA_EXCEEDED="WARNING",Km.QUOTA_MAYBE_EXCEEDED="WARNING",Km.UNKNOWN_ABORT="WARNING",Km.INCOMPATIBLE_DB_VERSION="WARNING",Km),Mm={},Nm=(Mm.AUTH_INVALID=!1,Mm.EXECUTE_TRANSACTION_ON_CLOSED_DB=!1,Mm.EXPLICIT_ABORT=!1,Mm.IDB_NOT_SUPPORTED=!1,Mm.MISSING_INDEX=!1,Mm.MISSING_OBJECT_STORES=!1,Mm.DB_DELETED_BY_MISSING_OBJECT_STORES=!1,Mm.DB_REOPENED_BY_MISSING_OBJECT_STORES=
!1,Mm.QUOTA_EXCEEDED=!1,Mm.QUOTA_MAYBE_EXCEEDED=!0,Mm.UNKNOWN_ABORT=!0,Mm.INCOMPATIBLE_DB_VERSION=!1,Mm);function Om(a,b,c,d,e){b=void 0===b?{}:b;c=void 0===c?Jm[a]:c;d=void 0===d?Lm[a]:d;e=void 0===e?Nm[a]:e;im.call(this,c,Object.assign({},{name:"YtIdbKnownError",isSw:void 0===self.document,isIframe:self!==self.top,type:a},b));this.type=a;this.message=c;this.level=d;this.h=e;Object.setPrototypeOf(this,Om.prototype)}
w(Om,im);function Pm(a,b){Om.call(this,"MISSING_OBJECT_STORES",{expectedObjectStores:b,foundObjectStores:a},Jm.MISSING_OBJECT_STORES);Object.setPrototypeOf(this,Pm.prototype)}
w(Pm,Om);function Qm(a,b){var c=Error.call(this);this.message=c.message;"stack"in c&&(this.stack=c.stack);this.index=a;this.objectStore=b;Object.setPrototypeOf(this,Qm.prototype)}
w(Qm,Error);var Rm=["The database connection is closing","Can't start a transaction on a closed database","A mutation operation was attempted on a database that did not allow mutations"];
function Sm(a,b,c,d){b=Fm(b);var e=a instanceof Error?a:Error("Unexpected error: "+a);if(e instanceof Om)return e;a={objectStoreNames:c,dbName:b,dbVersion:d};if("QuotaExceededError"===e.name)return new Om("QUOTA_EXCEEDED",a);if(jd&&"UnknownError"===e.name)return new Om("QUOTA_MAYBE_EXCEEDED",a);if(e instanceof Qm)return new Om("MISSING_INDEX",Object.assign({},a,{objectStore:e.objectStore,index:e.index}));if("InvalidStateError"===e.name&&Rm.some(function(f){return e.message.includes(f)}))return new Om("EXECUTE_TRANSACTION_ON_CLOSED_DB",
a);
if("AbortError"===e.name)return new Om("UNKNOWN_ABORT",a,e.message);e.args=[Object.assign({},a,{name:"IdbError",sd:e.name})];e.level="WARNING";return e}
function Tm(a,b,c){var d=tm();return new Om("IDB_NOT_SUPPORTED",{context:{caller:a,publicName:b,version:c,hasSucceededOnce:null==d?void 0:d.hasSucceededOnce}})}
;function Um(a){if(!a)throw Error();throw a;}
function Vm(a){return a}
function Wm(a){this.h=a}
function Xm(a){function b(e){if("PENDING"===d.state.status){d.state={status:"REJECTED",reason:e};e=v(d.i);for(var f=e.next();!f.done;f=e.next())f=f.value,f()}}
function c(e){if("PENDING"===d.state.status){d.state={status:"FULFILLED",value:e};e=v(d.h);for(var f=e.next();!f.done;f=e.next())f=f.value,f()}}
var d=this;this.state={status:"PENDING"};this.h=[];this.i=[];a=a.h;try{a(c,b)}catch(e){b(e)}}
Xm.all=function(a){return new Xm(new Wm(function(b,c){var d=[],e=a.length;0===e&&b(d);for(var f={mb:0};f.mb<a.length;f={mb:f.mb},++f.mb)Xm.resolve(a[f.mb]).then(function(g){return function(h){d[g.mb]=h;e--;0===e&&b(d)}}(f)).catch(function(g){c(g)})}))};
Xm.resolve=function(a){return new Xm(new Wm(function(b,c){a instanceof Xm?a.then(b,c):b(a)}))};
Xm.reject=function(a){return new Xm(new Wm(function(b,c){c(a)}))};
Xm.prototype.then=function(a,b){var c=this,d=null!=a?a:Vm,e=null!=b?b:Um;return new Xm(new Wm(function(f,g){"PENDING"===c.state.status?(c.h.push(function(){Ym(c,c,d,f,g)}),c.i.push(function(){Zm(c,c,e,f,g)})):"FULFILLED"===c.state.status?Ym(c,c,d,f,g):"REJECTED"===c.state.status&&Zm(c,c,e,f,g)}))};
Xm.prototype.catch=function(a){return this.then(void 0,a)};
function Ym(a,b,c,d,e){try{if("FULFILLED"!==a.state.status)throw Error("calling handleResolve before the promise is fulfilled.");var f=c(a.state.value);f instanceof Xm?$m(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Zm(a,b,c,d,e){try{if("REJECTED"!==a.state.status)throw Error("calling handleReject before the promise is rejected.");var f=c(a.state.reason);f instanceof Xm?$m(a,b,f,d,e):d(f)}catch(g){e(g)}}
function $m(a,b,c,d,e){b===c?e(new TypeError("Circular promise chain detected.")):c.then(function(f){f instanceof Xm?$m(a,b,f,d,e):d(f)},function(f){e(f)})}
;function an(a,b,c){function d(){c(a.error);f()}
function e(){b(a.result);f()}
function f(){try{a.removeEventListener("success",e),a.removeEventListener("error",d)}catch(g){}}
a.addEventListener("success",e);a.addEventListener("error",d)}
function bn(a){return new Promise(function(b,c){an(a,b,c)})}
function cn(a){return new Xm(new Wm(function(b,c){an(a,b,c)}))}
;function dn(a,b){return new Xm(new Wm(function(c,d){function e(){var f=a?b(a):null;f?f.then(function(g){a=g;e()},d):c()}
e()}))}
;var en=window,U=en.ytcsi&&en.ytcsi.now?en.ytcsi.now:en.performance&&en.performance.timing&&en.performance.now&&en.performance.timing.navigationStart?function(){return en.performance.timing.navigationStart+en.performance.now()}:function(){return(new Date).getTime()};function fn(a,b){this.h=a;this.options=b;this.transactionCount=0;this.j=Math.round(U());this.i=!1}
m=fn.prototype;m.add=function(a,b,c){return gn(this,[a],{mode:"readwrite",ga:!0},function(d){return d.objectStore(a).add(b,c)})};
m.clear=function(a){return gn(this,[a],{mode:"readwrite",ga:!0},function(b){return b.objectStore(a).clear()})};
m.close=function(){this.h.close();var a;(null==(a=this.options)?0:a.closed)&&this.options.closed()};
m.count=function(a,b){return gn(this,[a],{mode:"readonly",ga:!0},function(c){return c.objectStore(a).count(b)})};
function hn(a,b,c){a=a.h.createObjectStore(b,c);return new jn(a)}
m.delete=function(a,b){return gn(this,[a],{mode:"readwrite",ga:!0},function(c){return c.objectStore(a).delete(b)})};
m.get=function(a,b){return gn(this,[a],{mode:"readonly",ga:!0},function(c){return c.objectStore(a).get(b)})};
function kn(a,b,c){return gn(a,[b],{mode:"readwrite",ga:!0},function(d){d=d.objectStore(b);return cn(d.h.put(c,void 0))})}
m.objectStoreNames=function(){return Array.from(this.h.objectStoreNames)};
function gn(a,b,c,d){var e,f,g,h,k,l,n,p,t,r,x,y;return A(function(z){switch(z.h){case 1:var H={mode:"readonly",ga:!1,tag:"IDB_TRANSACTION_TAG_UNKNOWN"};"string"===typeof c?H.mode=c:Object.assign(H,c);e=H;a.transactionCount++;f=e.ga?3:1;g=0;case 2:if(h){z.v(4);break}g++;k=Math.round(U());za(z,5);l=a.h.transaction(b,e.mode);H=z.yield;var I=new ln(l);I=mn(I,d);return H.call(z,I,7);case 7:return n=z.i,p=Math.round(U()),nn(a,k,p,g,void 0,b.join(),e),z.return(n);case 5:t=Ba(z);r=Math.round(U());x=Sm(t,
a.h.name,b.join(),a.h.version);if((y=x instanceof Om&&!x.h)||g>=f)nn(a,k,r,g,x,b.join(),e),h=x;z.v(2);break;case 4:return z.return(Promise.reject(h))}})}
function nn(a,b,c,d,e,f,g){b=c-b;e?(e instanceof Om&&("QUOTA_EXCEEDED"===e.type||"QUOTA_MAYBE_EXCEEDED"===e.type)&&Dm("QUOTA_EXCEEDED",{dbName:Fm(a.h.name),objectStoreNames:f,transactionCount:a.transactionCount,transactionMode:g.mode}),e instanceof Om&&"UNKNOWN_ABORT"===e.type&&(c-=a.j,0>c&&c>=Math.pow(2,31)&&(c=0),Dm("TRANSACTION_UNEXPECTEDLY_ABORTED",{objectStoreNames:f,transactionDuration:b,transactionCount:a.transactionCount,dbDuration:c}),a.i=!0),on(a,!1,d,f,b,g.tag),Cm(e)):on(a,!0,d,f,b,g.tag)}
function on(a,b,c,d,e,f){Dm("TRANSACTION_ENDED",{objectStoreNames:d,connectionHasUnknownAbortedTransaction:a.i,duration:e,isSuccessful:b,tryCount:c,tag:void 0===f?"IDB_TRANSACTION_TAG_UNKNOWN":f})}
m.getName=function(){return this.h.name};
function jn(a){this.h=a}
m=jn.prototype;m.add=function(a,b){return cn(this.h.add(a,b))};
m.autoIncrement=function(){return this.h.autoIncrement};
m.clear=function(){return cn(this.h.clear()).then(function(){})};
function pn(a,b,c){a.h.createIndex(b,c,{unique:!1})}
m.count=function(a){return cn(this.h.count(a))};
function qn(a,b){return rn(a,{query:b},function(c){return c.delete().then(function(){return c.continue()})}).then(function(){})}
m.delete=function(a){return a instanceof IDBKeyRange?qn(this,a):cn(this.h.delete(a))};
m.get=function(a){return cn(this.h.get(a))};
m.index=function(a){try{return new sn(this.h.index(a))}catch(b){if(b instanceof Error&&"NotFoundError"===b.name)throw new Qm(a,this.h.name);throw b;}};
m.getName=function(){return this.h.name};
m.keyPath=function(){return this.h.keyPath};
function rn(a,b,c){a=a.h.openCursor(b.query,b.direction);return tn(a).then(function(d){return dn(d,c)})}
function ln(a){var b=this;this.h=a;this.i=new Map;this.aborted=!1;this.done=new Promise(function(c,d){b.h.addEventListener("complete",function(){c()});
b.h.addEventListener("error",function(e){e.currentTarget===e.target&&d(b.h.error)});
b.h.addEventListener("abort",function(){var e=b.h.error;if(e)d(e);else if(!b.aborted){e=Om;for(var f=b.h.objectStoreNames,g=[],h=0;h<f.length;h++){var k=f.item(h);if(null===k)throw Error("Invariant: item in DOMStringList is null");g.push(k)}e=new e("UNKNOWN_ABORT",{objectStoreNames:g.join(),dbName:b.h.db.name,mode:b.h.mode});d(e)}})})}
function mn(a,b){var c=new Promise(function(d,e){try{b(a).then(function(f){d(f)}).catch(e)}catch(f){e(f),a.abort()}});
return Promise.all([c,a.done]).then(function(d){return v(d).next().value})}
ln.prototype.abort=function(){this.h.abort();this.aborted=!0;throw new Om("EXPLICIT_ABORT");};
ln.prototype.objectStore=function(a){a=this.h.objectStore(a);var b=this.i.get(a);b||(b=new jn(a),this.i.set(a,b));return b};
function sn(a){this.h=a}
m=sn.prototype;m.count=function(a){return cn(this.h.count(a))};
m.delete=function(a){return un(this,{query:a},function(b){return b.delete().then(function(){return b.continue()})})};
m.get=function(a){return cn(this.h.get(a))};
m.getKey=function(a){return cn(this.h.getKey(a))};
m.keyPath=function(){return this.h.keyPath};
m.unique=function(){return this.h.unique};
function un(a,b,c){a=a.h.openCursor(void 0===b.query?null:b.query,void 0===b.direction?"next":b.direction);return tn(a).then(function(d){return dn(d,c)})}
function vn(a,b){this.request=a;this.cursor=b}
function tn(a){return cn(a).then(function(b){return b?new vn(a,b):null})}
m=vn.prototype;m.advance=function(a){this.cursor.advance(a);return tn(this.request)};
m.continue=function(a){this.cursor.continue(a);return tn(this.request)};
m.delete=function(){return cn(this.cursor.delete()).then(function(){})};
m.getKey=function(){return this.cursor.key};
m.getValue=function(){return this.cursor.value};
m.update=function(a){return cn(this.cursor.update(a))};function wn(a,b,c){return new Promise(function(d,e){function f(){t||(t=new fn(g.result,{closed:p}));return t}
var g=void 0!==b?self.indexedDB.open(a,b):self.indexedDB.open(a);var h=c.Rd,k=c.blocking,l=c.Ue,n=c.upgrade,p=c.closed,t;g.addEventListener("upgradeneeded",function(r){try{if(null===r.newVersion)throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");if(null===g.transaction)throw Error("Invariant: transaction on IDbOpenDbRequest is null");r.dataLoss&&"none"!==r.dataLoss&&Dm("IDB_DATA_CORRUPTED",{reason:r.dataLossMessage||"unknown reason",dbName:Fm(a)});var x=f(),y=new ln(g.transaction);
n&&n(x,function(z){return r.oldVersion<z&&r.newVersion>=z},y);
y.done.catch(function(z){e(z)})}catch(z){e(z)}});
g.addEventListener("success",function(){var r=g.result;k&&r.addEventListener("versionchange",function(){k(f())});
r.addEventListener("close",function(){Dm("IDB_UNEXPECTEDLY_CLOSED",{dbName:Fm(a),dbVersion:r.version});l&&l()});
d(f())});
g.addEventListener("error",function(){e(g.error)});
h&&g.addEventListener("blocked",function(){h()})})}
function xn(a,b,c){c=void 0===c?{}:c;return wn(a,b,c)}
function yn(a,b){b=void 0===b?{}:b;var c,d,e,f;return A(function(g){if(1==g.h)return za(g,2),c=self.indexedDB.deleteDatabase(a),d=b,(e=d.Rd)&&c.addEventListener("blocked",function(){e()}),g.yield(bn(c),4);
if(2!=g.h)return Aa(g,0);f=Ba(g);throw Sm(f,a,"",-1);})}
;function zn(a,b){this.name=a;this.options=b;this.j=!0;this.m=this.l=0}
zn.prototype.i=function(a,b,c){c=void 0===c?{}:c;return xn(a,b,c)};
zn.prototype.delete=function(a){a=void 0===a?{}:a;return yn(this.name,a)};
function An(a,b){return new Om("INCOMPATIBLE_DB_VERSION",{dbName:a.name,oldVersion:a.options.version,newVersion:b})}
function Bn(a,b){if(!b)throw Tm("openWithToken",Fm(a.name));return a.open()}
zn.prototype.open=function(){function a(){var f,g,h,k,l,n,p,t,r,x;return A(function(y){switch(y.h){case 1:return g=null!=(f=Error().stack)?f:"",za(y,2),y.yield(c.i(c.name,c.options.version,e),4);case 4:h=y.i;for(var z=c.options,H=[],I=v(Object.keys(z.Cb)),L=I.next();!L.done;L=I.next()){L=L.value;var P=z.Cb[L],J=void 0===P.Ce?Number.MAX_VALUE:P.Ce;!(h.h.version>=P.Jb)||h.h.version>=J||h.h.objectStoreNames.contains(L)||H.push(L)}k=H;if(0===k.length){y.v(5);break}l=Object.keys(c.options.Cb);n=h.objectStoreNames();
if(c.m<gl("ytidb_reopen_db_retries",0))return c.m++,h.close(),Cm(new Om("DB_REOPENED_BY_MISSING_OBJECT_STORES",{dbName:c.name,expectedObjectStores:l,foundObjectStores:n})),y.return(a());if(!(c.l<gl("ytidb_remake_db_retries",1))){y.v(6);break}c.l++;return y.yield(c.delete(),7);case 7:return Cm(new Om("DB_DELETED_BY_MISSING_OBJECT_STORES",{dbName:c.name,expectedObjectStores:l,foundObjectStores:n})),y.return(a());case 6:throw new Pm(n,l);case 5:return y.return(h);case 2:p=Ba(y);if(p instanceof DOMException?
"VersionError"!==p.name:"DOMError"in self&&p instanceof DOMError?"VersionError"!==p.name:!(p instanceof Object&&"message"in p)||"An attempt was made to open a database using a lower version than the existing version."!==p.message){y.v(8);break}return y.yield(c.i(c.name,void 0,Object.assign({},e,{upgrade:void 0})),9);case 9:t=y.i;r=t.h.version;if(void 0!==c.options.version&&r>c.options.version+1)throw t.close(),c.j=!1,An(c,r);return y.return(t);case 8:throw b(),p instanceof Error&&!T("ytidb_async_stack_killswitch")&&
(p.stack=p.stack+"\n"+g.substring(g.indexOf("\n")+1)),Sm(p,c.name,"",null!=(x=c.options.version)?x:-1);}})}
function b(){c.h===d&&(c.h=void 0)}
var c=this;if(!this.j)throw An(this);if(this.h)return this.h;var d,e={blocking:function(f){f.close()},
closed:b,Ue:b,upgrade:this.options.upgrade};return this.h=d=a()};var Cn=new zn("YtIdbMeta",{Cb:{databases:{Jb:1}},upgrade:function(a,b){b(1)&&hn(a,"databases",{keyPath:"actualName"})}});
function Dn(a,b){var c;return A(function(d){if(1==d.h)return d.yield(Bn(Cn,b),2);c=d.i;return d.return(gn(c,["databases"],{ga:!0,mode:"readwrite"},function(e){var f=e.objectStore("databases");return f.get(a.actualName).then(function(g){if(g?a.actualName!==g.actualName||a.publicName!==g.publicName||a.userIdentifier!==g.userIdentifier:1)return cn(f.h.put(a,void 0)).then(function(){})})}))})}
function En(a,b){var c;return A(function(d){if(1==d.h)return a?d.yield(Bn(Cn,b),2):d.return();c=d.i;return d.return(c.delete("databases",a))})}
function Fn(a,b){var c,d;return A(function(e){return 1==e.h?(c=[],e.yield(Bn(Cn,b),2)):3!=e.h?(d=e.i,e.yield(gn(d,["databases"],{ga:!0,mode:"readonly"},function(f){c.length=0;return rn(f.objectStore("databases"),{},function(g){a(g.getValue())&&c.push(g.getValue());return g.continue()})}),3)):e.return(c)})}
function Gn(a){return Fn(function(b){return"LogsDatabaseV2"===b.publicName&&void 0!==b.userIdentifier},a)}
function Hn(a,b,c){return Fn(function(d){return c?void 0!==d.userIdentifier&&!a.includes(d.userIdentifier)&&c.includes(d.publicName):void 0!==d.userIdentifier&&!a.includes(d.userIdentifier)},b)}
function In(a){var b,c;return A(function(d){if(1==d.h)return b=km("YtIdbMeta hasAnyMeta other"),d.yield(Fn(function(e){return void 0!==e.userIdentifier&&e.userIdentifier!==b},a),2);
c=d.i;return d.return(0<c.length)})}
;var Jn,Kn=new function(){}(new function(){});
function Ln(){var a,b,c,d;return A(function(e){switch(e.h){case 1:a=tm();if(null==(b=a)?0:b.hasSucceededOnce)return e.return(!0);var f;if(f=Gm)f=/WebKit\/([0-9]+)/.exec(Ub()),f=!!(f&&600<=parseInt(f[1],10));f&&(f=/WebKit\/([0-9]+)/.exec(Ub()),f=!(f&&602<=parseInt(f[1],10)));if(f||Uc)return e.return(!1);try{if(c=self,!(c.indexedDB&&c.IDBIndex&&c.IDBKeyRange&&c.IDBObjectStore))return e.return(!1)}catch(g){return e.return(!1)}if(!("IDBTransaction"in self&&"objectStoreNames"in IDBTransaction.prototype))return e.return(!1);
za(e,2);d={actualName:"yt-idb-test-do-not-use",publicName:"yt-idb-test-do-not-use",userIdentifier:void 0};return e.yield(Dn(d,Kn),4);case 4:return e.yield(En("yt-idb-test-do-not-use",Kn),5);case 5:return e.return(!0);case 2:return Ba(e),e.return(!1)}})}
function Mn(){if(void 0!==Jn)return Jn;xm=!0;return Jn=Ln().then(function(a){xm=!1;var b;if(null!=(b=sm())&&b.h){var c;b={hasSucceededOnce:(null==(c=tm())?void 0:c.hasSucceededOnce)||a};var d;null==(d=sm())||d.set("LAST_RESULT_ENTRY_KEY",b,2592E3,!0)}return a})}
function Nn(){return E("ytglobal.idbToken_")||void 0}
function On(){var a=Nn();return a?Promise.resolve(a):Mn().then(function(b){(b=b?Kn:void 0)&&D("ytglobal.idbToken_",b);return b})}
;var Pn=0;function Qn(a,b){Pn||(Pn=ni.la(function(){var c,d,e,f,g;return A(function(h){switch(h.h){case 1:return h.yield(On(),2);case 2:c=h.i;if(!c)return h.return();d=!0;za(h,3);return h.yield(Hn(a,c,b),5);case 5:e=h.i;if(!e.length){d=!1;h.v(6);break}f=e[0];return h.yield(yn(f.actualName),7);case 7:return h.yield(En(f.actualName,c),6);case 6:Aa(h,4);break;case 3:g=Ba(h),Cm(g),d=!1;case 4:ni.Fa(Pn),Pn=0,d&&Qn(a,b),h.h=0}})}))}
function Rn(){var a;return A(function(b){return 1==b.h?b.yield(On(),2):(a=b.i)?b.return(In(a)):b.return(!1)})}
new Ih;function Sn(a){if(!jm())throw a=new Om("AUTH_INVALID",{dbName:a}),Cm(a),a;var b=km();return{actualName:a+":"+b,publicName:a,userIdentifier:b}}
function Tn(a,b,c,d){var e,f,g,h,k,l;return A(function(n){switch(n.h){case 1:return f=null!=(e=Error().stack)?e:"",n.yield(On(),2);case 2:g=n.i;if(!g)throw h=Tm("openDbImpl",a,b),T("ytidb_async_stack_killswitch")||(h.stack=h.stack+"\n"+f.substring(f.indexOf("\n")+1)),Cm(h),h;Em(a);k=c?{actualName:a,publicName:a,userIdentifier:void 0}:Sn(a);za(n,3);return n.yield(Dn(k,g),5);case 5:return n.yield(xn(k.actualName,b,d),6);case 6:return n.return(n.i);case 3:return l=Ba(n),za(n,7),n.yield(En(k.actualName,
g),9);case 9:Aa(n,8);break;case 7:Ba(n);case 8:throw l;}})}
function Un(a,b,c){c=void 0===c?{}:c;return Tn(a,b,!1,c)}
function Vn(a,b,c){c=void 0===c?{}:c;return Tn(a,b,!0,c)}
function Wn(a,b){b=void 0===b?{}:b;var c,d;return A(function(e){if(1==e.h)return e.yield(On(),2);if(3!=e.h){c=e.i;if(!c)return e.return();Em(a);d=Sn(a);return e.yield(yn(d.actualName,b),3)}return e.yield(En(d.actualName,c),0)})}
function Xn(a,b,c){a=a.map(function(d){return A(function(e){return 1==e.h?e.yield(yn(d.actualName,b),2):e.yield(En(d.actualName,c),0)})});
return Promise.all(a).then(function(){})}
function Yn(){var a=void 0===a?{}:a;var b,c;return A(function(d){if(1==d.h)return d.yield(On(),2);if(3!=d.h){b=d.i;if(!b)return d.return();Em("LogsDatabaseV2");return d.yield(Gn(b),3)}c=d.i;return d.yield(Xn(c,a,b),0)})}
function Zn(a,b){b=void 0===b?{}:b;var c;return A(function(d){if(1==d.h)return d.yield(On(),2);if(3!=d.h){c=d.i;if(!c)return d.return();Em(a);return d.yield(yn(a,b),3)}return d.yield(En(a,c),0)})}
;function $n(a,b){zn.call(this,a,b);this.options=b;Em(a)}
w($n,zn);function ao(a,b){var c;return function(){c||(c=new $n(a,b));return c}}
$n.prototype.i=function(a,b,c){c=void 0===c?{}:c;return(this.options.mc?Vn:Un)(a,b,Object.assign({},c))};
$n.prototype.delete=function(a){a=void 0===a?{}:a;return(this.options.mc?Zn:Wn)(this.name,a)};
function bo(a,b){return ao(a,b)}
;var co={},eo=bo("ytGcfConfig",{Cb:(co.coldConfigStore={Jb:1},co.hotConfigStore={Jb:1},co),mc:!1,upgrade:function(a,b){b(1)&&(pn(hn(a,"hotConfigStore",{keyPath:"key",autoIncrement:!0}),"hotTimestampIndex","timestamp"),pn(hn(a,"coldConfigStore",{keyPath:"key",autoIncrement:!0}),"coldTimestampIndex","timestamp"))},
version:1});function fo(a){return Bn(eo(),a)}
function go(a,b,c){var d,e,f;return A(function(g){switch(g.h){case 1:return d={config:a,hashData:b,timestamp:U()},g.yield(fo(c),2);case 2:return e=g.i,g.yield(e.clear("hotConfigStore"),3);case 3:return g.yield(kn(e,"hotConfigStore",d),4);case 4:return f=g.i,g.return(f)}})}
function ho(a,b,c,d){var e,f,g;return A(function(h){switch(h.h){case 1:return e={config:a,hashData:b,configData:c,timestamp:U()},h.yield(fo(d),2);case 2:return f=h.i,h.yield(f.clear("coldConfigStore"),3);case 3:return h.yield(kn(f,"coldConfigStore",e),4);case 4:return g=h.i,h.return(g)}})}
function io(a){var b,c;return A(function(d){return 1==d.h?d.yield(fo(a),2):3!=d.h?(b=d.i,c=void 0,d.yield(gn(b,["coldConfigStore"],{mode:"readwrite",ga:!0},function(e){return un(e.objectStore("coldConfigStore").index("coldTimestampIndex"),{direction:"prev"},function(f){c=f.getValue()})}),3)):d.return(c)})}
function jo(a){var b,c;return A(function(d){return 1==d.h?d.yield(fo(a),2):3!=d.h?(b=d.i,c=void 0,d.yield(gn(b,["hotConfigStore"],{mode:"readwrite",ga:!0},function(e){return un(e.objectStore("hotConfigStore").index("hotTimestampIndex"),{direction:"prev"},function(f){c=f.getValue()})}),3)):d.return(c)})}
;function ko(){M.apply(this,arguments);this.i=[]}
w(ko,M);ko.prototype.K=function(){this.i.length=0;M.prototype.K.call(this)};function lo(){this.h=0;this.i=new ko}
function mo(a,b,c){var d,e,f;return A(function(g){switch(g.h){case 1:if(!T("update_log_event_config")){g.v(0);break}c&&(a.j=c,D("yt.gcf.config.hotConfigGroup",a.j||null));a.hotHashData=b;D("yt.gcf.config.hotHashData",a.hotHashData||null);d=Nn();if(!d){g.v(3);break}if(c){g.v(4);break}return g.yield(jo(d),5);case 5:e=g.i,c=null==(f=e)?void 0:f.config;case 4:return g.yield(go(c,b,d),3);case 3:if(c)for(var h=c,k=v(a.i.i),l=k.next();!l.done;l=k.next())l=l.value,l(h);g.h=0}})}
function no(a,b,c){var d,e,f,g;return A(function(h){if(1==h.h){if(!T("update_log_event_config"))return h.v(0);a.coldHashData=b;D("yt.gcf.config.coldHashData",a.coldHashData||null);return(d=Nn())?c?h.v(4):h.yield(io(d),5):h.v(0)}4!=h.h&&(e=h.i,c=null==(f=e)?void 0:f.config);if(!c)return h.v(0);g=c.configData;return h.yield(ho(c,b,g,d),0)})}
;function oo(){return"INNERTUBE_API_KEY"in Mk&&"INNERTUBE_API_VERSION"in Mk}
function po(){return{innertubeApiKey:S("INNERTUBE_API_KEY"),innertubeApiVersion:S("INNERTUBE_API_VERSION"),ke:S("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),md:S("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),Hf:S("INNERTUBE_CONTEXT_CLIENT_NAME",1),innertubeContextClientVersion:S("INNERTUBE_CONTEXT_CLIENT_VERSION"),me:S("INNERTUBE_CONTEXT_HL"),le:S("INNERTUBE_CONTEXT_GL"),ne:S("INNERTUBE_HOST_OVERRIDE")||"",pe:!!S("INNERTUBE_USE_THIRD_PARTY_AUTH",!1),oe:!!S("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT",
!1),appInstallData:S("SERIALIZED_CLIENT_CONFIG_DATA")}}
function qo(a){var b={client:{hl:a.me,gl:a.le,clientName:a.md,clientVersion:a.innertubeContextClientVersion,configInfo:a.ke}};navigator.userAgent&&(b.client.userAgent=String(navigator.userAgent));var c=C.devicePixelRatio;c&&1!=c&&(b.client.screenDensityFloat=String(c));c=S("EXPERIMENTS_TOKEN","");""!==c&&(b.client.experimentsToken=c);c=hl();0<c.length&&(b.request={internalExperimentFlags:c});c=a.md;if(("WEB"===c||"MWEB"===c||1===c||2===c)&&b){var d;b.client.mainAppWebInfo=null!=(d=b.client.mainAppWebInfo)?
d:{};b.client.mainAppWebInfo.webDisplayMode=Rl()}(d=E("yt.embedded_player.embed_url"))&&b&&(b.thirdParty={embedUrl:d});var e;if(T("web_log_memory_total_kbytes")&&(null==(e=C.navigator)?0:e.deviceMemory)){var f;e=null==(f=C.navigator)?void 0:f.deviceMemory;b&&(b.client.memoryTotalKbytes=""+1E6*e)}a.appInstallData&&b&&(b.client.configInfo=b.client.configInfo||{},b.client.configInfo.appInstallData=a.appInstallData);(a=gm())&&b&&(b.client.connectionType=a);T("web_log_effective_connection_type")&&(a=hm())&&
b&&(b.client.effectiveConnectionType=a);T("start_sending_config_hash")&&(lo.h||(a=new lo,lo.h=a),a=lo.h,f=U()-a.h,0!==a.h&&f<gl("send_config_hash_timer")?a=void 0:(f=E("yt.gcf.config.coldConfigData"),e=E("yt.gcf.config.hotHashData"),d=E("yt.gcf.config.coldHashData"),f&&e&&d&&(a.h=U()),a={coldConfigData:f,hotHashData:e,coldHashData:d}),e=a)&&(a=e.coldConfigData,f=e.coldHashData,e=e.hotHashData,a&&f&&e&&b&&(b.client.configInfo=b.client.configInfo||{},b.client.configInfo.coldConfigData=a,b.client.configInfo.coldHashData=
f,b.client.configInfo.hotHashData=e));S("DELEGATED_SESSION_ID")&&!T("pageid_as_header_web")&&(b.user={onBehalfOfUser:S("DELEGATED_SESSION_ID")});!T("fill_delegate_context_in_gel_killswitch")&&(a=S("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT"))&&(b.user=Object.assign({},b.user,{serializedDelegationContext:a}));a=Object;f=a.assign;e=b.client;d={};c=v(Object.entries($k(S("DEVICE",""))));for(var g=c.next();!g.done;g=c.next()){var h=v(g.value);g=h.next().value;h=h.next().value;"cbrand"===g?d.deviceMake=
h:"cmodel"===g?d.deviceModel=h:"cbr"===g?d.browserName=h:"cbrver"===g?d.browserVersion=h:"cos"===g?d.osName=h:"cosver"===g?d.osVersion=h:"cplatform"===g&&(d.platform=h)}b.client=f.call(a,e,d);return b}
function ro(a,b,c){c=void 0===c?{}:c;var d={};S("EOM_VISITOR_DATA")?d={"X-Goog-EOM-Visitor-Id":S("EOM_VISITOR_DATA")}:d={"X-Goog-Visitor-Id":c.visitorData||S("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;b=c.authorization||S("AUTHORIZATION");b||(a?b="Bearer "+E("gapi.auth.getToken")().Bf:(a=Ol(Nl()),T("pageid_as_header_web")||delete a["X-Goog-PageId"],d=Object.assign({},d,a)));b&&(d.Authorization=b);return d}
;function so(a,b){this.version=a;this.args=b}
so.prototype.serialize=function(){return{version:this.version,args:this.args}};function to(a,b){this.topic=a;this.h=b}
to.prototype.toString=function(){return this.topic};var uo=E("ytPubsub2Pubsub2Instance")||new N;N.prototype.subscribe=N.prototype.subscribe;N.prototype.unsubscribeByKey=N.prototype.Hb;N.prototype.publish=N.prototype.cb;N.prototype.clear=N.prototype.clear;D("ytPubsub2Pubsub2Instance",uo);var vo=E("ytPubsub2Pubsub2SubscribedKeys")||{};D("ytPubsub2Pubsub2SubscribedKeys",vo);var wo=E("ytPubsub2Pubsub2TopicToKeys")||{};D("ytPubsub2Pubsub2TopicToKeys",wo);var xo=E("ytPubsub2Pubsub2IsAsync")||{};D("ytPubsub2Pubsub2IsAsync",xo);
D("ytPubsub2Pubsub2SkipSubKey",null);function yo(a,b){var c=zo();c&&c.publish.call(c,a.toString(),a,b)}
function Ao(a){var b=Bo,c=zo();if(!c)return 0;var d=c.subscribe(b.toString(),function(e,f){var g=E("ytPubsub2Pubsub2SkipSubKey");g&&g==d||(g=function(){if(vo[d])try{if(f&&b instanceof to&&b!=e)try{var h=b.h,k=f;if(!k.args||!k.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");try{if(!h.Xa){var l=new h;h.Xa=l.version}var n=h.Xa}catch(z){}if(!n||k.version!=n)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");try{n=Reflect;var p=n.construct;
var t=k.args,r=t.length;if(0<r){var x=Array(r);for(k=0;k<r;k++)x[k]=t[k];var y=x}else y=[];f=p.call(n,h,y)}catch(z){throw z.message="yt.pubsub2.Data.deserialize(): "+z.message,z;}}catch(z){throw z.message="yt.pubsub2.pubsub2 cross-binary conversion error for "+b.toString()+": "+z.message,z;}a.call(window,f)}catch(z){Sk(z)}},xo[b.toString()]?E("yt.scheduler.instance")?ni.la(g):ll(g,0):g())});
vo[d]=!0;wo[b.toString()]||(wo[b.toString()]=[]);wo[b.toString()].push(d);return d}
function Co(){var a=Do,b=Ao(function(c){a.apply(void 0,arguments);Eo(b)});
return b}
function Eo(a){var b=zo();b&&("number"===typeof a&&(a=[a]),eb(a,function(c){b.unsubscribeByKey(c);delete vo[c]}))}
function zo(){return E("ytPubsub2Pubsub2Instance")}
;function Fo(a,b,c){c=void 0===c?{sampleRate:.1}:c;Math.random()<Math.min(.02,c.sampleRate/100)&&yo("meta_logging_csi_event",{timerName:a,Wf:b})}
;var Go=gl("max_body_size_to_compress",5E5),Ho=gl("min_body_size_to_compress",500),Io=!0,Jo=0,Ko=0,Lo=gl("compression_performance_threshold",250),Mo=gl("slow_compressions_before_abandon_count",4);
function No(a,b,c,d){var e=U(),f={startTime:e,ticks:{},infos:{}};if(Io)try{var g=Oo(b);if(null==g||!(g>Go||g<Ho)){var h=mk(ii(b)),k=U();f.ticks.gelc=k;Ko++;T("disable_compression_due_to_performance_degredation")&&k-e>=Lo&&(Jo++,T("abandon_compression_after_N_slow_zips")?Ko===gl("compression_disable_point")&&Jo>Mo&&(Io=!1):Io=!1);Po(f);c.headers||(c.headers={});c.headers["Content-Encoding"]="gzip";c.postBody=h;c.postParams=void 0}d(a,c)}catch(l){Tk(l),d(a,c)}else d(a,c)}
function Qo(a){var b=void 0===b?!1:b;var c=U(),d={startTime:c,ticks:{},infos:{}};if(Io){if(!a.body)return a;try{var e="string"===typeof a.body?a.body:JSON.stringify(a.body),f=Oo(e);if(null!=f&&(f>Go||f<Ho))return a;var g=mk(ii(e),b?{level:1}:void 0),h=U();d.ticks.gelc=h;if(b){Ko++;if((T("disable_compression_due_to_performance_degredation")||T("disable_compression_due_to_performance_degradation_lr"))&&h-c>=Lo)if(Jo++,T("abandon_compression_after_N_slow_zips")||T("abandon_compression_after_N_slow_zips_lr")){b=
Jo/Ko;var k=Mo/gl("compression_disable_point");0<Ko&&0===Ko%gl("compression_disable_point")&&b>=k&&(Io=!1)}else Io=!1;Po(d)}a.headers=Object.assign({},{"Content-Encoding":"gzip"},a.headers||{});a.body=g;return a}catch(l){return Tk(l),a}}else return a}
function Oo(a){try{return(new Blob(a.split(""))).size}catch(b){return Tk(b),null}}
function Po(a){T("gel_compression_csi_killswitch")||!T("log_gel_compression_latency")&&!T("log_gel_compression_latency_lr")||Fo("gel_compression",a,{sampleRate:.1})}
;function Ro(a){a=Object.assign({},a);delete a.Authorization;var b=Hg();if(b){var c=new ti;c.update(S("INNERTUBE_API_KEY"));c.update(b);a.hash=md(c.digest(),3)}return a}
;var So;function To(){So||(So=new rm("yt.innertube"));return So}
function Uo(a,b,c,d){if(d)return null;d=To().get("nextId",!0)||1;var e=To().get("requests",!0)||{};e[d]={method:a,request:b,authState:Ro(c),requestTime:Math.round(U())};To().set("nextId",d+1,86400,!0);To().set("requests",e,86400,!0);return d}
function Vo(a){var b=To().get("requests",!0)||{};delete b[a];To().set("requests",b,86400,!0)}
function Wo(a){var b=To().get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(U())-d.requestTime)){var e=d.authState,f=Ro(ro(!1));rb(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(U())),Xo(a,d.method,e,{}));delete b[c]}}To().set("requests",b,86400,!0)}}
;function Yo(a){this.Vb=this.h=!1;this.potentialEsfErrorCounter=this.i=0;this.handleError=function(){};
this.wb=function(){};
this.now=Date.now;this.Lb=!1;var b;this.Ed=null!=(b=a.Ed)?b:100;var c;this.yd=null!=(c=a.yd)?c:1;var d;this.wd=null!=(d=a.wd)?d:2592E6;var e;this.ud=null!=(e=a.ud)?e:12E4;var f;this.xd=null!=(f=a.xd)?f:5E3;var g;this.P=null!=(g=a.P)?g:void 0;this.ac=!!a.ac;var h;this.Yb=null!=(h=a.Yb)?h:.1;var k;this.ic=null!=(k=a.ic)?k:10;a.handleError&&(this.handleError=a.handleError);a.wb&&(this.wb=a.wb);a.Lb&&(this.Lb=a.Lb);a.Vb&&(this.Vb=a.Vb);this.R=a.R;this.Ba=a.Ba;this.Z=a.Z;this.Y=a.Y;this.Qa=a.Qa;this.Lc=
a.Lc;this.Kc=a.Kc;Zo(this)&&(!this.R||this.R("networkless_logging"))&&$o(this)}
function $o(a){Zo(a)&&!a.Lb&&(a.h=!0,a.ac&&Math.random()<=a.Yb&&a.Z.Td(a.P),ap(a),a.Y.sa()&&a.Pb(),a.Y.listen(a.Lc,a.Pb.bind(a)),a.Y.listen(a.Kc,a.Zc.bind(a)))}
m=Yo.prototype;m.writeThenSend=function(a,b){var c=this;b=void 0===b?{}:b;if(Zo(this)&&this.h){var d={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0};this.Z.set(d,this.P).then(function(e){d.id=e;c.Y.sa()&&bp(c,d)}).catch(function(e){bp(c,d);
cp(c,e)})}else this.Qa(a,b)};
m.sendThenWrite=function(a,b,c){var d=this;b=void 0===b?{}:b;if(Zo(this)&&this.h){var e={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0};this.R&&this.R("nwl_skip_retry")&&(e.skipRetry=c);if(this.Y.sa()||this.R&&this.R("nwl_aggressive_send_then_write")&&!e.skipRetry){if(!e.skipRetry){var f=b.onError?b.onError:function(){};
b.onError=function(g,h){return A(function(k){if(1==k.h)return k.yield(d.Z.set(e,d.P).catch(function(l){cp(d,l)}),2);
f(g,h);k.h=0})}}this.Qa(a,b,e.skipRetry)}else this.Z.set(e,this.P).catch(function(g){d.Qa(a,b,e.skipRetry);
cp(d,g)})}else this.Qa(a,b,this.R&&this.R("nwl_skip_retry")&&c)};
m.sendAndWrite=function(a,b){var c=this;b=void 0===b?{}:b;if(Zo(this)&&this.h){var d={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0},e=!1,f=b.onSuccess?b.onSuccess:function(){};
d.options.onSuccess=function(g,h){void 0!==d.id?c.Z.tb(d.id,c.P):e=!0;c.Y.gb&&c.R&&c.R("vss_network_hint")&&c.Y.gb(!0);f(g,h)};
this.Qa(d.url,d.options);this.Z.set(d,this.P).then(function(g){d.id=g;e&&c.Z.tb(d.id,c.P)}).catch(function(g){cp(c,g)})}else this.Qa(a,b)};
m.Pb=function(){var a=this;if(!Zo(this))throw Tm("throttleSend");this.i||(this.i=this.Ba.la(function(){var b;return A(function(c){if(1==c.h)return c.yield(a.Z.jd("NEW",a.P),2);if(3!=c.h)return b=c.i,b?c.yield(bp(a,b),3):(a.Zc(),c.return());a.i&&(a.i=0,a.Pb());c.h=0})},this.Ed))};
m.Zc=function(){this.Ba.Fa(this.i);this.i=0};
function bp(a,b){var c,d;return A(function(e){switch(e.h){case 1:if(!Zo(a))throw c=Tm("immediateSend"),c;if(void 0===b.id){e.v(2);break}return e.yield(a.Z.re(b.id,a.P),3);case 3:(d=e.i)||a.wb(Error("The request cannot be found in the database."));case 2:if(dp(a,b,a.wd)){e.v(4);break}a.wb(Error("Networkless Logging: Stored logs request expired age limit"));if(void 0===b.id){e.v(5);break}return e.yield(a.Z.tb(b.id,a.P),5);case 5:return e.return();case 4:b.skipRetry||(b=ep(a,b));if(!b){e.v(0);break}if(!b.skipRetry||
void 0===b.id){e.v(8);break}return e.yield(a.Z.tb(b.id,a.P),8);case 8:a.Qa(b.url,b.options,!!b.skipRetry),e.h=0}})}
function ep(a,b){if(!Zo(a))throw Tm("updateRequestHandlers");var c=b.options.onError?b.options.onError:function(){};
b.options.onError=function(e,f){var g,h,k,l;return A(function(n){switch(n.h){case 1:g=fp(f);(h=gp(f))&&a.R&&a.R("web_enable_error_204")&&a.handleError(Error("Request failed due to compression"),b.url,f);if(!(a.R&&a.R("nwl_consider_error_code")&&g||a.R&&!a.R("nwl_consider_error_code")&&a.potentialEsfErrorCounter<=a.ic)){n.v(2);break}if(!a.Y.lc){n.v(3);break}return n.yield(a.Y.lc(),3);case 3:if(a.Y.sa()){n.v(2);break}c(e,f);if(!a.R||!a.R("nwl_consider_error_code")||void 0===(null==(k=b)?void 0:k.id)){n.v(6);
break}return n.yield(a.Z.Oc(b.id,a.P,!1),6);case 6:return n.return();case 2:if(a.R&&a.R("nwl_consider_error_code")&&!g&&a.potentialEsfErrorCounter>a.ic)return n.return();a.potentialEsfErrorCounter++;if(void 0===(null==(l=b)?void 0:l.id)){n.v(8);break}return b.sendCount<a.yd?n.yield(a.Z.Oc(b.id,a.P,!0,h?!1:void 0),12):n.yield(a.Z.tb(b.id,a.P),8);case 12:a.Ba.la(function(){a.Y.sa()&&a.Pb()},a.xd);
case 8:c(e,f),n.h=0}})};
var d=b.options.onSuccess?b.options.onSuccess:function(){};
b.options.onSuccess=function(e,f){var g;return A(function(h){if(1==h.h)return void 0===(null==(g=b)?void 0:g.id)?h.v(2):h.yield(a.Z.tb(b.id,a.P),2);a.Y.gb&&a.R&&a.R("vss_network_hint")&&a.Y.gb(!0);d(e,f);h.h=0})};
return b}
function dp(a,b,c){b=b.timestamp;return a.now()-b>=c?!1:!0}
function ap(a){if(!Zo(a))throw Tm("retryQueuedRequests");a.Z.jd("QUEUED",a.P).then(function(b){b&&!dp(a,b,a.ud)?a.Ba.la(function(){return A(function(c){if(1==c.h)return void 0===b.id?c.v(2):c.yield(a.Z.Oc(b.id,a.P),2);ap(a);c.h=0})}):a.Y.sa()&&a.Pb()})}
function cp(a,b){a.Kd&&!a.Y.sa()?a.Kd(b):a.handleError(b)}
function Zo(a){return!!a.P||a.Vb}
function fp(a){var b;return(a=null==a?void 0:null==(b=a.error)?void 0:b.code)&&400<=a&&599>=a?!1:!0}
function gp(a){var b;a=null==a?void 0:null==(b=a.error)?void 0:b.code;return!(400!==a&&415!==a)}
;var hp;
function ip(){if(hp)return hp();var a={};hp=bo("LogsDatabaseV2",{Cb:(a.LogsRequestsStore={Jb:2},a),mc:!1,upgrade:function(b,c,d){c(2)&&hn(b,"LogsRequestsStore",{keyPath:"id",autoIncrement:!0});c(3);c(5)&&(d=d.objectStore("LogsRequestsStore"),d.h.indexNames.contains("newRequest")&&d.h.deleteIndex("newRequest"),pn(d,"newRequestV2",["status","interface","timestamp"]));c(7)&&b.h.objectStoreNames.contains("sapisid")&&b.h.deleteObjectStore("sapisid");c(9)&&b.h.objectStoreNames.contains("SWHealthLog")&&b.h.deleteObjectStore("SWHealthLog")},
version:9});return hp()}
;function jp(a){return Bn(ip(),a)}
function kp(a,b){var c,d,e,f;return A(function(g){if(1==g.h)return c={startTime:U(),infos:{transactionType:"YT_IDB_TRANSACTION_TYPE_WRITE"},ticks:{}},g.yield(jp(b),2);if(3!=g.h)return d=g.i,e=Object.assign({},a,{options:JSON.parse(JSON.stringify(a.options)),interface:S("INNERTUBE_CONTEXT_CLIENT_NAME",0)}),g.yield(kn(d,"LogsRequestsStore",e),3);f=g.i;c.ticks.tc=U();lp(c);return g.return(f)})}
function mp(a,b){var c,d,e,f,g,h,k;return A(function(l){if(1==l.h)return c={startTime:U(),infos:{transactionType:"YT_IDB_TRANSACTION_TYPE_READ"},ticks:{}},l.yield(jp(b),2);if(3!=l.h)return d=l.i,e=S("INNERTUBE_CONTEXT_CLIENT_NAME",0),f=[a,e,0],g=[a,e,U()],h=IDBKeyRange.bound(f,g),k=void 0,l.yield(gn(d,["LogsRequestsStore"],{mode:"readwrite",ga:!0},function(n){return un(n.objectStore("LogsRequestsStore").index("newRequestV2"),{query:h,direction:"prev"},function(p){p.getValue()&&(k=p.getValue(),"NEW"===
a&&(k.status="QUEUED",p.update(k)))})}),3);
c.ticks.tc=U();lp(c);return l.return(k)})}
function np(a,b){var c;return A(function(d){if(1==d.h)return d.yield(jp(b),2);c=d.i;return d.return(gn(c,["LogsRequestsStore"],{mode:"readwrite",ga:!0},function(e){var f=e.objectStore("LogsRequestsStore");return f.get(a).then(function(g){if(g)return g.status="QUEUED",cn(f.h.put(g,void 0)).then(function(){return g})})}))})}
function op(a,b,c,d){c=void 0===c?!0:c;var e;return A(function(f){if(1==f.h)return f.yield(jp(b),2);e=f.i;return f.return(gn(e,["LogsRequestsStore"],{mode:"readwrite",ga:!0},function(g){var h=g.objectStore("LogsRequestsStore");return h.get(a).then(function(k){return k?(k.status="NEW",c&&(k.sendCount+=1),void 0!==d&&(k.options.compress=d),cn(h.h.put(k,void 0)).then(function(){return k})):Xm.resolve(void 0)})}))})}
function pp(a,b){var c;return A(function(d){if(1==d.h)return d.yield(jp(b),2);c=d.i;return d.return(c.delete("LogsRequestsStore",a))})}
function qp(a){var b,c;return A(function(d){if(1==d.h)return d.yield(jp(a),2);b=d.i;c=U()-2592E6;return d.yield(gn(b,["LogsRequestsStore"],{mode:"readwrite",ga:!0},function(e){return rn(e.objectStore("LogsRequestsStore"),{},function(f){if(f.getValue().timestamp<=c)return f.delete().then(function(){return f.continue()})})}),0)})}
function rp(){A(function(a){return a.yield(Yn(),0)})}
function lp(a){T("nwl_csi_killswitch")||Fo("networkless_performance",a,{sampleRate:1})}
;var sp={accountStateChangeSignedIn:23,accountStateChangeSignedOut:24,delayedEventMetricCaptured:11,latencyActionBaselined:6,latencyActionInfo:7,latencyActionTicked:5,offlineTransferStatusChanged:2,offlineImageDownload:335,playbackStartStateChanged:9,systemHealthCaptured:3,mangoOnboardingCompleted:10,mangoPushNotificationReceived:230,mangoUnforkDbMigrationError:121,mangoUnforkDbMigrationSummary:122,mangoUnforkDbMigrationPreunforkDbVersionNumber:133,mangoUnforkDbMigrationPhoneMetadata:134,mangoUnforkDbMigrationPhoneStorage:135,
mangoUnforkDbMigrationStep:142,mangoAsyncApiMigrationEvent:223,mangoDownloadVideoResult:224,mangoHomepageVideoCount:279,mangoHomeV3State:295,mangoImageClientCacheHitEvent:273,sdCardStatusChanged:98,framesDropped:12,thumbnailHovered:13,deviceRetentionInfoCaptured:14,thumbnailLoaded:15,backToAppEvent:318,streamingStatsCaptured:17,offlineVideoShared:19,appCrashed:20,youThere:21,offlineStateSnapshot:22,mdxSessionStarted:25,mdxSessionConnected:26,mdxSessionDisconnected:27,bedrockResourceConsumptionSnapshot:28,
nextGenWatchWatchSwiped:29,kidsAccountsSnapshot:30,zeroStepChannelCreated:31,tvhtml5SearchCompleted:32,offlineSharePairing:34,offlineShareUnlock:35,mdxRouteDistributionSnapshot:36,bedrockRepetitiveActionTimed:37,unpluggedDegradationInfo:229,uploadMp4HeaderMoved:38,uploadVideoTranscoded:39,uploadProcessorStarted:46,uploadProcessorEnded:47,uploadProcessorReady:94,uploadProcessorRequirementPending:95,uploadProcessorInterrupted:96,uploadFrontendEvent:241,assetPackDownloadStarted:41,assetPackDownloaded:42,
assetPackApplied:43,assetPackDeleted:44,appInstallAttributionEvent:459,playbackSessionStopped:45,adBlockerMessagingShown:48,distributionChannelCaptured:49,dataPlanCpidRequested:51,detailedNetworkTypeCaptured:52,sendStateUpdated:53,receiveStateUpdated:54,sendDebugStateUpdated:55,receiveDebugStateUpdated:56,kidsErrored:57,mdxMsnSessionStatsFinished:58,appSettingsCaptured:59,mdxWebSocketServerHttpError:60,mdxWebSocketServer:61,startupCrashesDetected:62,coldStartInfo:435,offlinePlaybackStarted:63,liveChatMessageSent:225,
liveChatUserPresent:434,liveChatBeingModerated:457,liveCreationCameraUpdated:64,liveCreationEncodingCaptured:65,liveCreationError:66,liveCreationHealthUpdated:67,liveCreationVideoEffectsCaptured:68,liveCreationStageOccured:75,liveCreationBroadcastScheduled:123,liveCreationArchiveReplacement:149,liveCreationCostreamingConnection:421,liveCreationStreamWebrtcStats:288,mdxSessionRecoveryStarted:69,mdxSessionRecoveryCompleted:70,mdxSessionRecoveryStopped:71,visualElementShown:72,visualElementHidden:73,
visualElementGestured:78,visualElementStateChanged:208,screenCreated:156,playbackAssociated:202,visualElementAttached:215,playbackContextEvent:214,cloudCastingPlaybackStarted:74,webPlayerApiCalled:76,tvhtml5AccountDialogOpened:79,foregroundHeartbeat:80,foregroundHeartbeatScreenAssociated:111,kidsOfflineSnapshot:81,mdxEncryptionSessionStatsFinished:82,playerRequestCompleted:83,liteSchedulerStatistics:84,mdxSignIn:85,spacecastMetadataLookupRequested:86,spacecastBatchLookupRequested:87,spacecastSummaryRequested:88,
spacecastPlayback:89,spacecastDiscovery:90,tvhtml5LaunchUrlComponentChanged:91,mdxBackgroundPlaybackRequestCompleted:92,mdxBrokenAdditionalDataDeviceDetected:93,tvhtml5LocalStorage:97,tvhtml5DeviceStorageStatus:147,autoCaptionsAvailable:99,playbackScrubbingEvent:339,flexyState:100,interfaceOrientationCaptured:101,mainAppBrowseFragmentCache:102,offlineCacheVerificationFailure:103,offlinePlaybackExceptionDigest:217,vrCopresenceStats:104,vrCopresenceSyncStats:130,vrCopresenceCommsStats:137,vrCopresencePartyStats:153,
vrCopresenceEmojiStats:213,vrCopresenceEvent:141,vrCopresenceFlowTransitEvent:160,vrPlaybackEvent:345,kidsAgeGateTracking:105,offlineDelayAllowedTracking:106,mainAppAutoOfflineState:107,videoAsThumbnailDownload:108,videoAsThumbnailPlayback:109,liteShowMore:110,renderingError:118,kidsProfilePinGateTracking:119,abrTrajectory:124,scrollEvent:125,streamzIncremented:126,kidsProfileSwitcherTracking:127,kidsProfileCreationTracking:129,buyFlowStarted:136,mbsConnectionInitiated:138,mbsPlaybackInitiated:139,
mbsLoadChildren:140,liteProfileFetcher:144,mdxRemoteTransaction:146,reelPlaybackError:148,reachabilityDetectionEvent:150,mobilePlaybackEvent:151,courtsidePlayerStateChanged:152,musicPersistentCacheChecked:154,musicPersistentCacheCleared:155,playbackInterrupted:157,playbackInterruptionResolved:158,fixFopFlow:159,anrDetection:161,backstagePostCreationFlowEnded:162,clientError:163,gamingAccountLinkStatusChanged:164,liteHousewarming:165,buyFlowEvent:167,kidsParentalGateTracking:168,kidsSignedOutSettingsStatus:437,
kidsSignedOutPauseHistoryFixStatus:438,tvhtml5WatchdogViolation:444,ypcUpgradeFlow:169,yongleStudy:170,ypcUpdateFlowStarted:171,ypcUpdateFlowCancelled:172,ypcUpdateFlowSucceeded:173,ypcUpdateFlowFailed:174,liteGrowthkitPromo:175,paymentFlowStarted:341,transactionFlowShowPaymentDialog:405,transactionFlowStarted:176,transactionFlowSecondaryDeviceStarted:222,transactionFlowSecondaryDeviceSignedOutStarted:383,transactionFlowCancelled:177,transactionFlowPaymentCallBackReceived:387,transactionFlowPaymentSubmitted:460,
transactionFlowPaymentSucceeded:329,transactionFlowSucceeded:178,transactionFlowFailed:179,transactionFlowPlayBillingConnectionStartEvent:428,transactionFlowSecondaryDeviceSuccess:458,transactionFlowErrorEvent:411,liteVideoQualityChanged:180,watchBreakEnablementSettingEvent:181,watchBreakFrequencySettingEvent:182,videoEffectsCameraPerformanceMetrics:183,adNotify:184,startupTelemetry:185,playbackOfflineFallbackUsed:186,outOfMemory:187,ypcPauseFlowStarted:188,ypcPauseFlowCancelled:189,ypcPauseFlowSucceeded:190,
ypcPauseFlowFailed:191,uploadFileSelected:192,ypcResumeFlowStarted:193,ypcResumeFlowCancelled:194,ypcResumeFlowSucceeded:195,ypcResumeFlowFailed:196,adsClientStateChange:197,ypcCancelFlowStarted:198,ypcCancelFlowCancelled:199,ypcCancelFlowSucceeded:200,ypcCancelFlowFailed:201,ypcCancelFlowGoToPaymentProcessor:402,ypcDeactivateFlowStarted:320,ypcRedeemFlowStarted:203,ypcRedeemFlowCancelled:204,ypcRedeemFlowSucceeded:205,ypcRedeemFlowFailed:206,ypcFamilyCreateFlowStarted:258,ypcFamilyCreateFlowCancelled:259,
ypcFamilyCreateFlowSucceeded:260,ypcFamilyCreateFlowFailed:261,ypcFamilyManageFlowStarted:262,ypcFamilyManageFlowCancelled:263,ypcFamilyManageFlowSucceeded:264,ypcFamilyManageFlowFailed:265,restoreContextEvent:207,embedsAdEvent:327,autoplayTriggered:209,clientDataErrorEvent:210,experimentalVssValidation:211,tvhtml5TriggeredEvent:212,tvhtml5FrameworksFieldTrialResult:216,tvhtml5FrameworksFieldTrialStart:220,musicOfflinePreferences:218,watchTimeSegment:219,appWidthLayoutError:221,accountRegistryChange:226,
userMentionAutoCompleteBoxEvent:227,downloadRecommendationEnablementSettingEvent:228,musicPlaybackContentModeChangeEvent:231,offlineDbOpenCompleted:232,kidsFlowEvent:233,kidsFlowCorpusSelectedEvent:234,videoEffectsEvent:235,unpluggedOpsEogAnalyticsEvent:236,playbackAudioRouteEvent:237,interactionLoggingDebugModeError:238,offlineYtbRefreshed:239,kidsFlowError:240,musicAutoplayOnLaunchAttempted:242,deviceContextActivityEvent:243,deviceContextEvent:244,templateResolutionException:245,musicSideloadedPlaylistServiceCalled:246,
embedsStorageAccessNotChecked:247,embedsHasStorageAccessResult:248,embedsItpPlayedOnReload:249,embedsRequestStorageAccessResult:250,embedsShouldRequestStorageAccessResult:251,embedsRequestStorageAccessState:256,embedsRequestStorageAccessFailedState:257,embedsItpWatchLaterResult:266,searchSuggestDecodingPayloadFailure:252,siriShortcutActivated:253,tvhtml5KeyboardPerformance:254,latencyActionSpan:255,elementsLog:267,ytbFileOpened:268,tfliteModelError:269,tvhtml5ApiTest:270,yongleUsbSetup:271,touStrikeInterstitialEvent:272,
liteStreamToSave:274,appBundleClientEvent:275,ytbFileCreationFailed:276,adNotifyFailure:278,ytbTransferFailed:280,blockingRequestFailed:281,liteAccountSelector:282,liteAccountUiCallbacks:283,dummyPayload:284,browseResponseValidationEvent:285,entitiesError:286,musicIosBackgroundFetch:287,mdxNotificationEvent:289,layersValidationError:290,musicPwaInstalled:291,liteAccountCleanup:292,html5PlayerHealthEvent:293,watchRestoreAttempt:294,liteAccountSignIn:296,notaireEvent:298,kidsVoiceSearchEvent:299,adNotifyFilled:300,
delayedEventDropped:301,analyticsSearchEvent:302,systemDarkThemeOptOutEvent:303,flowEvent:304,networkConnectivityBaselineEvent:305,ytbFileImported:306,downloadStreamUrlExpired:307,directSignInEvent:308,lyricImpressionEvent:309,accessibilityStateEvent:310,tokenRefreshEvent:311,genericAttestationExecution:312,tvhtml5VideoSeek:313,unpluggedAutoPause:314,scrubbingEvent:315,bedtimeReminderEvent:317,tvhtml5UnexpectedRestart:319,tvhtml5StabilityTraceEvent:478,tvhtml5OperationHealth:467,tvhtml5WatchKeyEvent:321,
voiceLanguageChanged:322,tvhtml5LiveChatStatus:323,parentToolsCorpusSelectedEvent:324,offerAdsEnrollmentInitiated:325,networkQualityIntervalEvent:326,deviceStartupMetrics:328,heartbeatActionPlayerTransitioned:330,tvhtml5Lifecycle:331,heartbeatActionPlayerHalted:332,adaptiveInlineMutedSettingEvent:333,mainAppLibraryLoadingState:334,thirdPartyLogMonitoringEvent:336,appShellAssetLoadReport:337,tvhtml5AndroidAttestation:338,tvhtml5StartupSoundEvent:340,iosBackgroundRefreshTask:342,iosBackgroundProcessingTask:343,
sliEventBatch:344,postImpressionEvent:346,musicSideloadedPlaylistExport:347,idbUnexpectedlyClosed:348,voiceSearchEvent:349,mdxSessionCastEvent:350,idbQuotaExceeded:351,idbTransactionEnded:352,idbTransactionAborted:353,tvhtml5KeyboardLogging:354,idbIsSupportedCompleted:355,creatorStudioMobileEvent:356,idbDataCorrupted:357,parentToolsAppChosenEvent:358,webViewBottomSheetResized:359,activeStateControllerScrollPerformanceSummary:360,navigatorValidation:361,mdxSessionHeartbeat:362,clientHintsPolyfillDiagnostics:363,
clientHintsPolyfillEvent:364,proofOfOriginTokenError:365,kidsAddedAccountSummary:366,musicWearableDevice:367,ypcRefundFlowEvent:368,tvhtml5PlaybackMeasurementEvent:369,tvhtml5WatermarkMeasurementEvent:370,clientExpGcfPropagationEvent:371,mainAppReferrerIntent:372,leaderLockEnded:373,leaderLockAcquired:374,googleHatsEvent:375,persistentLensLaunchEvent:376,parentToolsChildWelcomeChosenEvent:378,browseThumbnailPreloadEvent:379,finalPayload:380,mdxDialAdditionalDataUpdateEvent:381,webOrchestrationTaskLifecycleRecord:382,
startupSignalEvent:384,accountError:385,gmsDeviceCheckEvent:386,accountSelectorEvent:388,accountUiCallbacks:389,mdxDialAdditionalDataProbeEvent:390,downloadsSearchIcingApiStats:391,downloadsSearchIndexUpdatedEvent:397,downloadsSearchIndexSnapshot:398,dataPushClientEvent:392,kidsCategorySelectedEvent:393,mdxDeviceManagementSnapshotEvent:394,prefetchRequested:395,prefetchableCommandExecuted:396,gelDebuggingEvent:399,webLinkTtsPlayEnd:400,clipViewInvalid:401,persistentStorageStateChecked:403,cacheWipeoutEvent:404,
playerEvent:410,sfvEffectPipelineStartedEvent:412,sfvEffectPipelinePausedEvent:429,sfvEffectPipelineEndedEvent:413,sfvEffectChosenEvent:414,sfvEffectLoadedEvent:415,sfvEffectUserInteractionEvent:465,sfvEffectFirstFrameProcessedLatencyEvent:416,sfvEffectAggregatedFramesProcessedLatencyEvent:417,sfvEffectAggregatedFramesDroppedEvent:418,sfvEffectPipelineErrorEvent:430,sfvEffectGraphFrozenEvent:419,sfvEffectGlThreadBlockedEvent:420,mdeVideoChangedEvent:442,mdePlayerPerformanceMetrics:472,genericClientExperimentEvent:423,
homePreloadTaskScheduled:424,homePreloadTaskExecuted:425,homePreloadCacheHit:426,polymerPropertyChangedInObserver:427,applicationStarted:431,networkCronetRttBatch:432,networkCronetRttSummary:433,repeatChapterLoopEvent:436,seekCancellationEvent:462,offlineTransferStarted:4,musicOfflineMixtapePreferencesChanged:16,mangoDailyNewVideosNotificationAttempt:40,mangoDailyNewVideosNotificationError:77,dtwsPlaybackStarted:112,dtwsTileFetchStarted:113,dtwsTileFetchCompleted:114,dtwsTileFetchStatusChanged:145,
dtwsKeyframeDecoderBufferSent:115,dtwsTileUnderflowedOnNonkeyframe:116,dtwsBackfillFetchStatusChanged:143,dtwsBackfillUnderflowed:117,dtwsAdaptiveLevelChanged:128,blockingVisitorIdTimeout:277,liteSocial:18,mobileJsInvocation:297,biscottiBasedDetection:439,coWatchStateChange:440,embedsVideoDataDidChange:441,shortsFirst:443,cruiseControlEvent:445,qoeClientLoggingContext:446,atvRecommendationJobExecuted:447,tvhtml5UserFeedback:448,producerProjectCreated:449,producerProjectOpened:450,producerProjectDeleted:451,
producerProjectElementAdded:453,producerProjectElementRemoved:454,tvhtml5ShowClockEvent:455,deviceCapabilityCheckMetrics:456,youtubeClearcutEvent:461,offlineBrowseFallbackEvent:463,getCtvTokenEvent:464,startupDroppedFramesSummary:466,screenshotEvent:468,miniAppPlayEvent:469,elementsDebugCounters:470,fontLoadEvent:471,webKillswitchReceived:473,webKillswitchExecuted:474,cameraOpenEvent:475,manualSmoothnessMeasurement:476,tvhtml5AppQualityEvent:477};var tp={},up=bo("ServiceWorkerLogsDatabase",{Cb:(tp.SWHealthLog={Jb:1},tp),mc:!0,upgrade:function(a,b){b(1)&&pn(hn(a,"SWHealthLog",{keyPath:"id",autoIncrement:!0}),"swHealthNewRequest",["interface","timestamp"])},
version:1});function vp(a){return Bn(up(),a)}
function wp(a){var b,c;A(function(d){if(1==d.h)return d.yield(vp(a),2);b=d.i;c=U()-2592E6;return d.yield(gn(b,["SWHealthLog"],{mode:"readwrite",ga:!0},function(e){return rn(e.objectStore("SWHealthLog"),{},function(f){if(f.getValue().timestamp<=c)return f.delete().then(function(){return f.continue()})})}),0)})}
function xp(a){var b;return A(function(c){if(1==c.h)return c.yield(vp(a),2);b=c.i;return c.yield(b.clear("SWHealthLog"),0)})}
;var yp={},zp=0;function Ap(a){var b=new Image,c=""+zp++;yp[c]=b;b.onload=b.onerror=function(){delete yp[c]};
b.src=a}
;function Bp(){this.h=new Map;this.i=!1}
function Cp(){if(!Bp.h){var a=E("yt.networkRequestMonitor.instance")||new Bp;D("yt.networkRequestMonitor.instance",a);Bp.h=a}return Bp.h}
Bp.prototype.requestComplete=function(a,b){b&&(this.i=!0);a=this.removeParams(a);this.h.get(a)||this.h.set(a,b)};
Bp.prototype.isEndpointCFR=function(a){a=this.removeParams(a);return(a=this.h.get(a))?!1:!1===a&&this.i?!0:null};
Bp.prototype.removeParams=function(a){return a.split("?")[0]};
Bp.prototype.removeParams=Bp.prototype.removeParams;Bp.prototype.isEndpointCFR=Bp.prototype.isEndpointCFR;Bp.prototype.requestComplete=Bp.prototype.requestComplete;Bp.getInstance=Cp;var Dp;function Ep(){Dp||(Dp=new rm("yt.offline"));return Dp}
function Fp(a){if(T("offline_error_handling")){var b=Ep().get("errors",!0)||{};b[a.message]={name:a.name,stack:a.stack};a.level&&(b[a.message].level=a.level);Ep().set("errors",b,2592E3,!0)}}
;function Gp(){hf.call(this);var a=this;this.j=!1;this.i=mi();this.i.listen("networkstatus-online",function(){if(a.j&&T("offline_error_handling")){var b=Ep().get("errors",!0);if(b){for(var c in b)if(b[c]){var d=new im(c,"sent via offline_errors");d.name=b[c].name;d.stack=b[c].stack;d.level=b[c].level;Sk(d)}Ep().set("errors",{},2592E3,!0)}}})}
w(Gp,hf);function Hp(){if(!Gp.h){var a=E("yt.networkStatusManager.instance")||new Gp;D("yt.networkStatusManager.instance",a);Gp.h=a}return Gp.h}
m=Gp.prototype;m.sa=function(){return this.i.sa()};
m.gb=function(a){this.i.i=a};
m.ge=function(){var a=window.navigator.onLine;return void 0===a?!0:a};
m.Xd=function(){this.j=!0};
m.listen=function(a,b){return this.i.listen(a,b)};
m.lc=function(a){a=ki(this.i,a);a.then(function(b){T("use_cfr_monitor")&&Cp().requestComplete("generate_204",b)});
return a};
Gp.prototype.sendNetworkCheckRequest=Gp.prototype.lc;Gp.prototype.listen=Gp.prototype.listen;Gp.prototype.enableErrorFlushing=Gp.prototype.Xd;Gp.prototype.getWindowStatus=Gp.prototype.ge;Gp.prototype.networkStatusHint=Gp.prototype.gb;Gp.prototype.isNetworkAvailable=Gp.prototype.sa;Gp.getInstance=Hp;function Ip(a){a=void 0===a?{}:a;hf.call(this);var b=this;this.i=this.s=0;this.j=Hp();var c=E("yt.networkStatusManager.instance.listen").bind(this.j);c&&(a.kc?(this.kc=a.kc,c("networkstatus-online",function(){Jp(b,"publicytnetworkstatus-online")}),c("networkstatus-offline",function(){Jp(b,"publicytnetworkstatus-offline")})):(c("networkstatus-online",function(){jf(b,"publicytnetworkstatus-online")}),c("networkstatus-offline",function(){jf(b,"publicytnetworkstatus-offline")})))}
w(Ip,hf);Ip.prototype.sa=function(){var a=E("yt.networkStatusManager.instance.isNetworkAvailable");return a?a.bind(this.j)():!0};
Ip.prototype.gb=function(a){var b=E("yt.networkStatusManager.instance.networkStatusHint").bind(this.j);b&&b(a)};
Ip.prototype.lc=function(a){var b=this,c;return A(function(d){c=E("yt.networkStatusManager.instance.sendNetworkCheckRequest").bind(b.j);return T("skip_network_check_if_cfr")&&Cp().isEndpointCFR("generate_204")?d.return(new Promise(function(e){var f;b.gb((null==(f=window.navigator)?void 0:f.onLine)||!0);e(b.sa())})):c?d.return(c(a)):d.return(!0)})};
function Jp(a,b){a.kc?a.i?(ni.Fa(a.s),a.s=ni.la(function(){a.m!==b&&(jf(a,b),a.m=b,a.i=U())},a.kc-(U()-a.i))):(jf(a,b),a.m=b,a.i=U()):jf(a,b)}
;var Kp;function Lp(){var a=Yo.call;Kp||(Kp=new Ip({Mf:!0,Ff:!0}));a.call(Yo,this,{Z:{Td:qp,tb:pp,jd:mp,re:np,Oc:op,set:kp},Y:Kp,handleError:function(b,c,d){var e,f=null==d?void 0:null==(e=d.error)?void 0:e.code;if(400===f||415===f){var g;Tk(new im(b.message,c,null==d?void 0:null==(g=d.error)?void 0:g.code),void 0,void 0,void 0,!0)}else Sk(b)},
wb:Tk,Qa:Mp,now:U,Kd:Fp,Ba:qm(),Lc:"publicytnetworkstatus-online",Kc:"publicytnetworkstatus-offline",ac:!0,Yb:.1,ic:gl("potential_esf_error_limit",10),R:T,Lb:!(jm()&&Np())});this.j=new Ih;T("networkless_immediately_drop_all_requests")&&rp();Zn("LogsDatabaseV2")}
w(Lp,Yo);function Op(){var a=E("yt.networklessRequestController.instance");a||(a=new Lp,D("yt.networklessRequestController.instance",a),T("networkless_logging")&&On().then(function(b){a.P=b;$o(a);a.j.resolve();a.ac&&Math.random()<=a.Yb&&a.P&&wp(a.P);T("networkless_immediately_drop_sw_health_store")&&Pp(a)}));
return a}
Lp.prototype.writeThenSend=function(a,b){b||(b={});jm()||(this.h=!1);Yo.prototype.writeThenSend.call(this,a,b)};
Lp.prototype.sendThenWrite=function(a,b,c){b||(b={});jm()||(this.h=!1);Yo.prototype.sendThenWrite.call(this,a,b,c)};
Lp.prototype.sendAndWrite=function(a,b){b||(b={});jm()||(this.h=!1);Yo.prototype.sendAndWrite.call(this,a,b)};
Lp.prototype.awaitInitialization=function(){return this.j.promise};
function Pp(a){var b;A(function(c){if(!a.P)throw b=Tm("clearSWHealthLogsDb"),b;return c.return(xp(a.P).catch(function(d){a.handleError(d)}))})}
function Mp(a,b,c){b=T("web_fp_via_jspb")?Object.assign({},b):b;T("use_cfr_monitor")&&Qp(a,b);if(T("use_request_time_ms_header"))b.headers&&(b.headers["X-Goog-Request-Time"]=JSON.stringify(Math.round(U())));else{var d;if(null==(d=b.postParams)?0:d.requestTimeMs)b.postParams.requestTimeMs=Math.round(U())}if(c&&0===Object.keys(b).length){var e=void 0===e?"":e;var f=void 0===f?!1:f;var g=void 0===g?!1:g;if(a)if(e)ul(a,void 0,"POST",e);else if(S("USE_NET_AJAX_FOR_PING_TRANSPORT",!1))ul(a,void 0,"GET",
"",void 0,void 0,f,g);else{b:{try{var h=new ab({url:a});if(h.j&&h.i||h.l){var k=sc(tc(5,a)),l;if(!(l=!k||!k.endsWith("/aclk"))){var n=a.search(Fc),p=Ec(a,0,"ri",n);if(0>p)var t=null;else{var r=a.indexOf("&",p);if(0>r||r>n)r=n;t=decodeURIComponent(a.slice(p+3,-1!==r?r:0).replace(/\+/g," "))}l="1"!==t}var x=!l;break b}}catch(z){}x=!1}if(x){b:{try{if(window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,"")){var y=!0;break b}}catch(z){}y=!1}c=y?!0:!1}else c=!1;c||Ap(a)}}else b.compress?
b.postBody?("string"!==typeof b.postBody&&(b.postBody=JSON.stringify(b.postBody)),No(a,b.postBody,b,rl)):No(a,JSON.stringify(b.postParams),b,zl):rl(a,b)}
function Qp(a,b){var c=b.onError?b.onError:function(){};
b.onError=function(e,f){Cp().requestComplete(a,!1);c(e,f)};
var d=b.onSuccess?b.onSuccess:function(){};
b.onSuccess=function(e,f){Cp().requestComplete(a,!0);d(e,f)}}
function Np(){return"www.youtube-nocookie.com"!==uc(document.location.toString())}
;var Rp=!1,Sp=C.ytNetworklessLoggingInitializationOptions||{isNwlInitialized:Rp};D("ytNetworklessLoggingInitializationOptions",Sp);function Tp(){var a;A(function(b){if(1==b.h)return b.yield(On(),2);a=b.i;if(!a||!jm()&&!T("nwl_init_require_datasync_id_killswitch")||!Np())return b.v(0);Rp=!0;Sp.isNwlInitialized=Rp;return b.yield(Op().awaitInitialization(),0)})}
;function Up(a){var b=this;this.config_=null;a?this.config_=a:oo()&&(this.config_=po());mm(function(){Wo(b)},5E3)}
Up.prototype.isReady=function(){!this.config_&&oo()&&(this.config_=po());return!!this.config_};
function Xo(a,b,c,d){function e(x){x=void 0===x?!1:x;var y;if(d.retry&&"www.youtube-nocookie.com"!=h&&(x||T("skip_ls_gel_retry")||"application/json"!==g.headers["Content-Type"]||(y=Uo(b,c,l,k)),y)){var z=g.onSuccess,H=g.onFetchSuccess;g.onSuccess=function(L,P){Vo(y);z(L,P)};
c.onFetchSuccess=function(L,P){Vo(y);H(L,P)}}try{if(x&&d.retry&&!d.pd.bypassNetworkless)g.method="POST",d.pd.writeThenSend?Op().writeThenSend(r,g):Op().sendAndWrite(r,g);
else if(d.compress)if(g.postBody){var I=g.postBody;"string"!==typeof I&&(I=JSON.stringify(g.postBody));No(r,I,g,rl)}else No(r,JSON.stringify(g.postParams),g,zl);else T("web_all_payloads_via_jspb")?rl(r,g):zl(r,g)}catch(L){if("InvalidAccessError"==L.name)y&&(Vo(y),y=0),Tk(Error("An extension is blocking network request."));else throw L;}y&&mm(function(){Wo(a)},5E3)}
!S("VISITOR_DATA")&&"visitor_id"!==b&&.01>Math.random()&&Tk(new im("Missing VISITOR_DATA when sending innertube request.",b,c,d));if(!a.isReady()){var f=new im("innertube xhrclient not ready",b,c,d);Sk(f);throw f;}var g={headers:d.headers||{},method:"POST",postParams:c,postBody:d.postBody,postBodyFormat:d.postBodyFormat||"JSON",onTimeout:function(){d.onTimeout()},
onFetchTimeout:d.onTimeout,onSuccess:function(x,y){if(d.onSuccess)d.onSuccess(y)},
onFetchSuccess:function(x){if(d.onSuccess)d.onSuccess(x)},
onError:function(x,y){if(d.onError)d.onError(y)},
onFetchError:function(x){if(d.onError)d.onError(x)},
timeout:d.timeout,withCredentials:!0,compress:d.compress};g.headers["Content-Type"]||(g.headers["Content-Type"]="application/json");var h="";(f=a.config_.ne)&&(h=f);var k=a.config_.pe||!1,l=ro(k,h,d);Object.assign(g.headers,l);(f=g.headers.Authorization)&&!h&&k&&(g.headers["x-origin"]=window.location.origin);var n="/youtubei/"+a.config_.innertubeApiVersion+"/"+b,p={alt:"json"},t=a.config_.oe&&f;t=t&&f.startsWith("Bearer");t||(p.key=a.config_.innertubeApiKey);var r=bl(""+h+n,p||{},!0);(E("ytNetworklessLoggingInitializationOptions")?
Sp.isNwlInitialized:Rp)?Mn().then(function(x){e(x)}):e(!1)}
;var Vp=0,Wp=Wc?"webkit":Vc?"moz":Tc?"ms":Sc?"o":"";D("ytDomDomGetNextId",E("ytDomDomGetNextId")||function(){return++Vp});var Xp={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function Yp(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.rotation=this.clientY=this.clientX=0;this.scale=1;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in Xp||(this[b]=a[b]);this.scale=a.scale;this.rotation=a.rotation;var c=a.target||a.srcElement;c&&3==c.nodeType&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;
if(d)try{d=d.nodeName?d:null}catch(e){d=null}else"mouseover"==this.type?d=a.fromElement:"mouseout"==this.type&&(d=a.toElement);this.relatedTarget=d;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.h=a.pageX;this.i=a.pageY}}catch(e){}}
function Zp(a){if(document.body&&document.documentElement){var b=document.body.scrollTop+document.documentElement.scrollTop;a.h=a.clientX+(document.body.scrollLeft+document.documentElement.scrollLeft);a.i=a.clientY+b}}
Yp.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
Yp.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
Yp.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var nb=C.ytEventsEventsListeners||{};D("ytEventsEventsListeners",nb);var $p=C.ytEventsEventsCounter||{count:0};D("ytEventsEventsCounter",$p);
function aq(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return mb(function(e){var f="boolean"===typeof e[4]&&e[4]==!!d,g=Qa(e[4])&&Qa(d)&&rb(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||g)})}
var bq=cb(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function cq(a,b,c,d){d=void 0===d?{}:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=aq(a,b,c,d);if(e)return e;e=++$p.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var g=f?function(h){h=new Yp(h);if(!sf(h.relatedTarget,function(k){return k==a}))return h.currentTarget=a,h.type=b,c.call(a,h)}:function(h){h=new Yp(h);
h.currentTarget=a;return c.call(a,h)};
g=Rk(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),bq()||"boolean"===typeof d?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);nb[e]=[a,b,c,g,d];return e}
function dq(a){a&&("string"==typeof a&&(a=[a]),eb(a,function(b){if(b in nb){var c=nb[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?bq()||"boolean"===typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete nb[b]}}))}
;function eq(a){this.M=a;this.i=null;this.m=0;this.A=null;this.s=0;this.j=[];for(a=0;4>a;a++)this.j.push(0);this.l=0;this.X=cq(window,"mousemove",Wa(this.aa,this));a=Wa(this.W,this);"function"===typeof a&&(a=Rk(a));this.ba=window.setInterval(a,25)}
Ya(eq,M);eq.prototype.aa=function(a){void 0===a.h&&Zp(a);var b=a.h;void 0===a.i&&Zp(a);this.i=new of(b,a.i)};
eq.prototype.W=function(){if(this.i){var a=U();if(0!=this.m){var b=this.A,c=this.i,d=b.x-c.x;b=b.y-c.y;d=Math.sqrt(d*d+b*b)/(a-this.m);this.j[this.l]=.5<Math.abs((d-this.s)/this.s)?1:0;for(c=b=0;4>c;c++)b+=this.j[c]||0;3<=b&&this.M();this.s=d}this.m=a;this.A=this.i;this.l=(this.l+1)%4}};
eq.prototype.K=function(){window.clearInterval(this.ba);dq(this.X)};var fq=new Set([174,173,175]),gq={};
function hq(a){var b=void 0===a?{}:a;a=void 0===b.ze?!1:b.ze;b=void 0===b.Yd?!0:b.Yd;if(null==E("_lact",window)){var c=parseInt(S("LACT"),10);c=isFinite(c)?Date.now()-Math.max(c,0):-1;D("_lact",c,window);D("_fact",c,window);-1==c&&iq();cq(document,"keydown",iq);cq(document,"keyup",iq);cq(document,"mousedown",iq);cq(document,"mouseup",iq);a?cq(window,"touchmove",function(){jq("touchmove",200)},{passive:!0}):(cq(window,"resize",function(){jq("resize",200)}),b&&cq(window,"scroll",function(){jq("scroll",
200)}));
new eq(function(){jq("mouse",100)});
cq(document,"touchstart",iq,{passive:!0});cq(document,"touchend",iq,{passive:!0})}}
function jq(a,b){gq[a]||(gq[a]=!0,ni.la(function(){iq();gq[a]=!1},b))}
function iq(a){var b;if(null!=(b=E("experiment.flags",window))&&b.enable_lact_reset_by_volume_buttons||!fq.has(null==a?void 0:a.keyCode))null==E("_lact",window)&&hq(),a=Date.now(),D("_lact",a,window),-1==E("_fact",window)&&D("_fact",a,window),(a=E("ytglobal.ytUtilActivityCallback_"))&&a()}
function kq(){var a=E("_lact",window);return null==a?-1:Math.max(Date.now()-a,0)}
;var lq=C.ytPubsubPubsubInstance||new N,mq=C.ytPubsubPubsubSubscribedKeys||{},qq=C.ytPubsubPubsubTopicToKeys||{},rq=C.ytPubsubPubsubIsSynchronous||{};function sq(a,b){var c=tq();if(c&&b){var d=c.subscribe(a,function(){var e=arguments;var f=function(){mq[d]&&b.apply&&"function"==typeof b.apply&&b.apply(window,e)};
try{rq[a]?f():ll(f,0)}catch(g){Sk(g)}},void 0);
mq[d]=!0;qq[a]||(qq[a]=[]);qq[a].push(d);return d}return 0}
function uq(a){var b=tq();b&&("number"===typeof a?a=[a]:"string"===typeof a&&(a=[parseInt(a,10)]),eb(a,function(c){b.unsubscribeByKey(c);delete mq[c]}))}
function vq(a,b){var c=tq();c&&c.publish.apply(c,arguments)}
function wq(a){var b=tq();if(b)if(b.clear(a),a)xq(a);else for(var c in qq)xq(c)}
function tq(){return C.ytPubsubPubsubInstance}
function xq(a){qq[a]&&(a=qq[a],eb(a,function(b){mq[b]&&delete mq[b]}),a.length=0)}
N.prototype.subscribe=N.prototype.subscribe;N.prototype.unsubscribeByKey=N.prototype.Hb;N.prototype.publish=N.prototype.cb;N.prototype.clear=N.prototype.clear;D("ytPubsubPubsubInstance",lq);D("ytPubsubPubsubTopicToKeys",qq);D("ytPubsubPubsubIsSynchronous",rq);D("ytPubsubPubsubSubscribedKeys",mq);var yq=Symbol("injectionDeps");function zq(a){this.name=a}
zq.prototype.toString=function(){return"InjectionToken("+this.name+")"};
function Aq(a){this.key=a}
function Bq(){this.h=new Map;this.i=new Map}
Bq.prototype.resolve=function(a){return a instanceof Aq?Cq(this,a.key,[],!0):Cq(this,a,[])};
function Cq(a,b,c,d){d=void 0===d?!1:d;if(-1<c.indexOf(b))throw Error("Deps cycle for: "+b);if(a.i.has(b))return a.i.get(b);if(!a.h.has(b)){if(d)return;throw Error("No provider for: "+b);}d=a.h.get(b);c.push(b);if(void 0!==d.Hd)var e=d.Hd;else if(d.Ye)e=d[yq]?Dq(a,d[yq],c):[],e=d.Ye.apply(d,ka(e));else if(d.Gd){e=d.Gd;var f=e[yq]?Dq(a,e[yq],c):[];e=new (Function.prototype.bind.apply(e,[null].concat(ka(f))))}else throw Error("Could not resolve providers for: "+b);c.pop();d.Uf||a.i.set(b,e);return e}
function Dq(a,b,c){return b?b.map(function(d){return d instanceof Aq?Cq(a,d.key,c,!0):Cq(a,d,c)}):[]}
;var Eq;function Fq(){Eq||(Eq=new Bq);return Eq}
;function Gq(){this.store={};this.h={}}
Gq.prototype.storePayload=function(a,b){a=Hq(a);this.store[a]?this.store[a].push(b):(this.h={},this.store[a]=[b]);return a};
Gq.prototype.smartExtractMatchingEntries=function(a){if(!a.keys.length)return[];for(var b=Iq(this,a.keys.splice(0,1)[0]),c=[],d=0;d<b.length;d++)this.store[b[d]]&&a.sizeLimit&&(this.store[b[d]].length<=a.sizeLimit?(c.push.apply(c,ka(this.store[b[d]])),delete this.store[b[d]]):c.push.apply(c,ka(this.store[b[d]].splice(0,a.sizeLimit))));(null==a?0:a.sizeLimit)&&c.length<(null==a?void 0:a.sizeLimit)&&(a.sizeLimit-=c.length,c.push.apply(c,ka(this.smartExtractMatchingEntries(a))));return c};
Gq.prototype.extractMatchingEntries=function(a){a=Iq(this,a);for(var b=[],c=0;c<a.length;c++)this.store[a[c]]&&(b.push.apply(b,ka(this.store[a[c]])),delete this.store[a[c]]);return b};
Gq.prototype.getSequenceCount=function(a){a=Iq(this,a);for(var b=0,c=0;c<a.length;c++){var d=void 0;b+=(null==(d=this.store[a[c]])?void 0:d.length)||0}return b};
function Iq(a,b){var c=Hq(b);if(a.h[c])return a.h[c];var d=Object.keys(a.store)||[];if(1>=d.length&&Hq(b)===d[0])return d;for(var e=[],f=0;f<d.length;f++){var g=d[f].split("/");if(Jq(b.auth,g[0])){var h=b.isJspb;Jq(void 0===h?"undefined":h?"true":"false",g[1])&&Jq(b.cttAuthInfo,g[2])&&(h=b.tier,h=void 0===h?"undefined":JSON.stringify(h),Jq(h,g[3])&&e.push(d[f]))}}return a.h[c]=e}
function Jq(a,b){return void 0===a||"undefined"===a?!0:a===b}
Gq.prototype.getSequenceCount=Gq.prototype.getSequenceCount;Gq.prototype.extractMatchingEntries=Gq.prototype.extractMatchingEntries;Gq.prototype.smartExtractMatchingEntries=Gq.prototype.smartExtractMatchingEntries;Gq.prototype.storePayload=Gq.prototype.storePayload;function Hq(a){return[void 0===a.auth?"undefined":a.auth,void 0===a.isJspb?"undefined":a.isJspb,void 0===a.cttAuthInfo?"undefined":a.cttAuthInfo,void 0===a.tier?"undefined":a.tier].join("/")}
;function V(a,b){if(a)return a[b.name]}
;var Kq=gl("initial_gel_batch_timeout",2E3),Lq=gl("gel_queue_timeout_max_ms",6E4),Mq=Math.pow(2,16)-1,Nq=void 0;function Oq(){this.j=this.h=this.i=0}
var Pq=new Oq,Qq=new Oq,Rq=new Oq,Sq=new Oq,Tq,Uq=!0,Vq=C.ytLoggingTransportTokensToCttTargetIds_||{};D("ytLoggingTransportTokensToCttTargetIds_",Vq);var Wq={};function Xq(){var a=E("yt.logging.ims");a||(a=new Gq,D("yt.logging.ims",a));return a}
function Yq(a,b){if("log_event"===a.endpoint){var c=Zq(a);a:{var d=Object.keys(a.payload);d=v(d);for(var e=d.next();!e.done;e=d.next())if(e=e.value,sp[e]){d=e;break a}d=void 0}var f;a:if(T("enable_web_tiered_gel")){d=sp[d||""];var g;if(null==Fq().resolve(new Aq(lo)))var h=void 0;else e=null!=(h=E("yt.gcf.config.hotConfigGroup"))?h:null,h=null==e?void 0:null==(f=e.loggingHotConfig)?void 0:null==(g=f.eventLoggingConfig)?void 0:g.payloadPolicies;if(f=h)for(g=0;g<f.length;g++)if(f[g].payloadNumber===
d){f=f[g].tier;break a}f=200}else f=void 0;400===f?$q(a,b):(Wq[c]=!0,f={cttAuthInfo:c,isJspb:!1,tier:f},Xq().storePayload(f,a.payload),ar(b,c,f))}}
function ar(a,b,c){function d(){br({writeThenSend:!0},T("flush_only_full_queue")?b:void 0,e,c.tier)}
var e=!1;e=void 0===e?!1:e;a&&(Nq=new a);a=gl("tvhtml5_logging_max_batch_ads_fork")||gl("web_logging_max_batch")||100;var f=U(),g=cr(e,c.tier),h=g.j,k=0;c&&(k=Xq().getSequenceCount(c));1E3<=k&&T("web_logging_max_batch_hard_limit")?d():k>=a?Tq||(Tq=dr(function(){d();Tq=void 0},0)):10<=f-h&&(er(e,c.tier),g.j=f)}
function $q(a,b){if("log_event"===a.endpoint){var c=Zq(a),d=new Map;d.set(c,[a.payload]);b&&(Nq=new b);return new Ef(function(e,f){Nq&&Nq.isReady()?fr(d,Nq,e,f,{bypassNetworkless:!0},!0):e()})}}
function Zq(a){var b="";if(a.dangerousLogToVisitorSession)b="visitorOnlyApprovedKey";else if(a.cttAuthInfo){b=a.cttAuthInfo;var c={};b.videoId?c.videoId=b.videoId:b.playlistId&&(c.playlistId=b.playlistId);Vq[a.cttAuthInfo.token]=c;b=a.cttAuthInfo.token}return b}
function br(a,b,c,d){a=void 0===a?{}:a;c=void 0===c?!1:c;new Ef(function(e,f){var g=cr(c,d);gr(g.i);gr(g.h);g.h=0;Nq&&Nq.isReady()?void 0===d&&T("enable_web_tiered_gel")?hr(e,f,a,b,c,300):hr(e,f,a,b,c,d):(er(c,d),e())})}
function hr(a,b,c,d,e,f){var g=Nq;c=void 0===c?{}:c;e=void 0===e?!1:e;f=void 0===f?200:f;var h=new Map;var k={isJspb:e,cttAuthInfo:d,tier:f};e={isJspb:e,cttAuthInfo:d};if(void 0!==d)f=T("enable_web_tiered_gel")?Xq().smartExtractMatchingEntries({keys:[k,e],sizeLimit:1E3}):Xq().extractMatchingEntries(e),h.set(d,f);else for(d=v(Object.keys(Wq)),k=d.next();!k.done;k=d.next())k=k.value,e=T("enable_web_tiered_gel")?Xq().smartExtractMatchingEntries({keys:[{isJspb:!1,cttAuthInfo:k,tier:f},{isJspb:!1,cttAuthInfo:k}],
sizeLimit:1E3}):Xq().extractMatchingEntries({isJspb:!1,cttAuthInfo:k}),0<e.length&&h.set(k,e),(T("web_fp_via_jspb_and_json")&&c.writeThenSend||!T("web_fp_via_jspb_and_json"))&&delete Wq[k];fr(h,g,a,b,c)}
function er(a,b){a=void 0===a?!1:a;b=void 0===b?200:b;var c=cr(a,b),d=c===Sq||c===Rq?5E3:Lq;T("web_gel_timeout_cap")&&!c.h&&(d=dr(function(){br({writeThenSend:!0},void 0,a,b)},d),c.h=d);
gr(c.i);d=S("LOGGING_BATCH_TIMEOUT",gl("web_gel_debounce_ms",1E4));T("shorten_initial_gel_batch_timeout")&&Uq&&(d=Kq);d=dr(function(){br({writeThenSend:!0},void 0,a,b)},d);
c.i=d}
function fr(a,b,c,d,e,f){e=void 0===e?{}:e;var g=Math.round(U()),h=a.size,k={};a=v(a);for(var l=a.next();!l.done;k={Qb:k.Qb,Za:k.Za,Fb:k.Fb,Sb:k.Sb,Rb:k.Rb},l=a.next()){var n=v(l.value);l=n.next().value;n=n.next().value;k.Za=tb({context:qo(b.config_||po())});if(!Pa(n)&&!T("throw_err_when_logevent_malformed_killswitch")){d();break}k.Za.events=n;(n=Vq[l])&&ir(k.Za,l,n);delete Vq[l];k.Fb="visitorOnlyApprovedKey"===l;jr(k.Za,g,k.Fb);T("always_send_and_write")&&(e.writeThenSend=!1);k.Sb=function(p){T("update_log_event_config")&&
ni.la(function(){return A(function(t){return t.yield(kr(p),0)})});
h--;h||c()};
k.Qb=0;k.Rb=function(p){return function(){p.Qb++;if(e.bypassNetworkless&&1===p.Qb)try{Xo(b,"log_event",p.Za,lr({writeThenSend:!0},p.Fb,p.Sb,p.Rb,f)),Uq=!1}catch(t){Sk(t),d()}h--;h||c()}}(k);
try{Xo(b,"log_event",k.Za,lr(e,k.Fb,k.Sb,k.Rb,f)),Uq=!1}catch(p){Sk(p),d()}}}
function lr(a,b,c,d,e){a={retry:!0,onSuccess:c,onError:d,pd:a,dangerousLogToVisitorSession:b,Cf:!!e,headers:{},postBodyFormat:"",postBody:"",compress:T("compress_gel")||T("compress_gel_lr")};mr()&&(a.headers["X-Goog-Request-Time"]=JSON.stringify(Math.round(U())));return a}
function jr(a,b,c){mr()||(a.requestTimeMs=String(b));T("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);!c&&(b=S("EVENT_ID"))&&((c=S("BATCH_CLIENT_COUNTER")||0)||(c=Math.floor(Math.random()*Mq/2)),c++,c>Mq&&(c=1),Nk("BATCH_CLIENT_COUNTER",c),a.serializedClientEventId={serializedEventId:b,clientCounter:String(c)})}
function ir(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
function mr(){return T("use_request_time_ms_header")||T("lr_use_request_time_ms_header")}
function dr(a,b){return T("transport_use_scheduler")?mm(a,b):ll(a,b)}
function gr(a){T("transport_use_scheduler")?ni.Fa(a):window.clearTimeout(a)}
function kr(a){var b,c,d,e,f,g,h,k,l,n;return A(function(p){return 1==p.h?(d=null==(b=a)?void 0:null==(c=b.responseContext)?void 0:c.globalConfigGroup,e=V(d,qk),g=null==(f=d)?void 0:f.hotHashData,h=V(d,pk),l=null==(k=d)?void 0:k.coldHashData,(n=Fq().resolve(new Aq(lo)))?g?e?p.yield(mo(n,g,e),2):p.yield(mo(n,g),2):p.v(2):p.return()):l?h?p.yield(no(n,l,h),0):p.yield(no(n,l),0):p.v(0)})}
function cr(a,b){b=void 0===b?200:b;return a?300===b?Sq:Qq:300===b?Rq:Pq}
;var nr=C.ytLoggingGelSequenceIdObj_||{};D("ytLoggingGelSequenceIdObj_",nr);
function or(a,b,c,d){d=void 0===d?{}:d;var e={},f=Math.round(d.timestamp||U());e.eventTimeMs=f<Number.MAX_SAFE_INTEGER?f:0;e[a]=b;a=kq();e.context={lastActivityMs:String(d.timestamp||!isFinite(a)?-1:a)};T("log_sequence_info_on_gel_web")&&d.sequenceGroup&&(a=e.context,b=d.sequenceGroup,nr[b]=b in nr?nr[b]+1:0,a.sequence={index:nr[b],groupKey:b},d.endOfSequence&&delete nr[d.sequenceGroup]);(d.sendIsolatedPayload?$q:Yq)({endpoint:"log_event",payload:e,cttAuthInfo:d.cttAuthInfo,dangerousLogToVisitorSession:d.dangerousLogToVisitorSession},
c)}
;function Bm(a,b,c){c=void 0===c?{}:c;var d=Up;S("ytLoggingEventsDefaultDisabled",!1)&&Up===Up&&(d=null);T("web_all_payloads_via_jspb")&&!c.timestamp&&(c.lact=kq(),c.timestamp=U());or(a,b,d,c)}
;D("ytLoggingGelSequenceIdObj_",C.ytLoggingGelSequenceIdObj_||{});var pr=new Set,qr=0,rr=0,sr=0,tr=[],ur=["PhantomJS","Googlebot","TO STOP THIS SECURITY SCAN go/scan"];function Am(a){vr(a)}
function wr(a){vr(a,"WARNING")}
function xr(a){a instanceof Error?vr(a):(a=Qa(a)?JSON.stringify(a):String(a),a=new im(a),a.name="RejectedPromiseError",wr(a))}
function vr(a,b,c,d,e,f,g,h){f=void 0===f?{}:f;f.name=c||S("INNERTUBE_CONTEXT_CLIENT_NAME",1);f.version=d||S("INNERTUBE_CONTEXT_CLIENT_VERSION");c=f;b=void 0===b?"ERROR":b;g=void 0===g?!1:g;b=void 0===b?"ERROR":b;g=void 0===g?!1:g;if(a&&(a.hasOwnProperty("level")&&a.level&&(b=a.level),T("console_log_js_exceptions")&&(d=[],d.push("Name: "+a.name),d.push("Message: "+a.message),a.hasOwnProperty("params")&&d.push("Error Params: "+JSON.stringify(a.params)),a.hasOwnProperty("args")&&d.push("Error args: "+
JSON.stringify(a.args)),d.push("File name: "+a.fileName),d.push("Stacktrace: "+a.stack),d=d.join("\n"),window.console.log(d,a)),!(5<=qr))){d=tr;var k=Ge(a);e=k.message||"Unknown Error";f=k.name||"UnknownError";var l=k.stack||a.i||"Not available";if(l.startsWith(f+": "+e)){var n=l.split("\n");n.shift();l=n.join("\n")}n=k.lineNumber||"Not available";k=k.fileName||"Not available";var p=0;if(a.hasOwnProperty("args")&&a.args&&a.args.length)for(var t=0;t<a.args.length&&!(p=Jl(a.args[t],"params."+t,c,p),
500<=p);t++);else if(a.hasOwnProperty("params")&&a.params){var r=a.params;if("object"===typeof a.params)for(t in r){if(r[t]){var x="params."+t,y=Ll(r[t]);c[x]=y;p+=x.length+y.length;if(500<p)break}}else c.params=Ll(r)}if(d.length)for(t=0;t<d.length&&!(p=Jl(d[t],"params.context."+t,c,p),500<=p);t++);navigator.vendor&&!c.hasOwnProperty("vendor")&&(c["device.vendor"]=navigator.vendor);t={message:e,name:f,lineNumber:n,fileName:k,stack:l,params:c,sampleWeight:1};c=Number(a.columnNumber);isNaN(c)||(t.lineNumber=
t.lineNumber+":"+c);if("IGNORED"===a.level)a=0;else a:{a=Fl();c=v(a.Ua);for(d=c.next();!d.done;d=c.next())if(d=d.value,t.message&&t.message.match(d.Nf)){a=d.weight;break a}a=v(a.Ra);for(c=a.next();!c.done;c=a.next())if(c=c.value,c.callback(t)){a=c.weight;break a}a=1}t.sampleWeight=a;a=v(Al);for(c=a.next();!c.done;c=a.next())if(c=c.value,c.hc[t.name])for(e=v(c.hc[t.name]),d=e.next();!d.done;d=e.next())if(f=d.value,d=t.message.match(f.regexp)){t.params["params.error.original"]=d[0];e=f.groups;f={};
for(n=0;n<e.length;n++)f[e[n]]=d[n+1],t.params["params.error."+e[n]]=d[n+1];t.message=c.Ic(f);break}t.params||(t.params={});a=Fl();t.params["params.errorServiceSignature"]="msg="+a.Ua.length+"&cb="+a.Ra.length;t.params["params.serviceWorker"]="false";C.document&&C.document.querySelectorAll&&(t.params["params.fscripts"]=String(document.querySelectorAll("script:not([nonce])").length));Ab("sample").constructor!==yb&&(t.params["params.fconst"]="true");window.yterr&&"function"===typeof window.yterr&&window.yterr(t);
if(0!==t.sampleWeight&&!pr.has(t.message)){if(g&&T("web_enable_error_204"))yr(void 0===b?"ERROR":b,t);else{b=void 0===b?"ERROR":b;"ERROR"===b?(Gl.cb("handleError",t),T("record_app_crashed_web")&&0===sr&&1===t.sampleWeight&&(sr++,g={appCrashType:"APP_CRASH_TYPE_BREAKPAD"},T("report_client_error_with_app_crash_ks")||(g.systemHealth={crashData:{clientError:{logMessage:{message:t.message}}}}),Bm("appCrashed",g)),rr++):"WARNING"===b&&Gl.cb("handleWarning",t);if(T("kevlar_gel_error_routing")){g=b;h=void 0===
h?{}:h;b:{a=v(ur);for(c=a.next();!c.done;c=a.next())if(Hm(c.value.toLowerCase())){a=!0;break b}a=!1}if(a)h=void 0;else{c={stackTrace:t.stack};t.fileName&&(c.filename=t.fileName);a=t.lineNumber&&t.lineNumber.split?t.lineNumber.split(":"):[];0!==a.length&&(1!==a.length||isNaN(Number(a[0]))?2!==a.length||isNaN(Number(a[0]))||isNaN(Number(a[1]))||(c.lineNumber=Number(a[0]),c.columnNumber=Number(a[1])):c.lineNumber=Number(a[0]));a={level:"ERROR_LEVEL_UNKNOWN",message:t.message,errorClassName:t.name,sampleWeight:t.sampleWeight};
"ERROR"===g?a.level="ERROR_LEVEL_ERROR":"WARNING"===g&&(a.level="ERROR_LEVEL_WARNNING");c={isObfuscated:!0,browserStackInfo:c};h.pageUrl=window.location.href;h.kvPairs=[];S("FEXP_EXPERIMENTS")&&(h.experimentIds=S("FEXP_EXPERIMENTS"));e=S("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS");if(!Ok("web_disable_gel_stp_ecatcher_killswitch")&&e)for(f=v(Object.keys(e)),d=f.next();!d.done;d=f.next())d=d.value,h.kvPairs.push({key:d,value:String(e[d])});if(e=t.params)for(f=v(Object.keys(e)),d=f.next();!d.done;d=f.next())d=
d.value,h.kvPairs.push({key:"client."+d,value:String(e[d])});d=S("SERVER_NAME");e=S("SERVER_VERSION");d&&e&&(h.kvPairs.push({key:"server.name",value:d}),h.kvPairs.push({key:"server.version",value:e}));h={errorMetadata:h,stackTrace:c,logMessage:a}}h&&(Bm("clientError",h),("ERROR"===g||T("errors_flush_gel_always_killswitch"))&&br(void 0,void 0,!1))}T("suppress_error_204_logging")||yr(b,t)}try{pr.add(t.message)}catch(z){}qr++}}}
function yr(a,b){var c=b.params||{};a={urlParams:{a:"logerror",t:"jserror",type:b.name,msg:b.message.substr(0,250),line:b.lineNumber,level:a,"client.name":c.name},postParams:{url:S("PAGE_NAME",window.location.href),file:b.fileName},method:"POST"};c.version&&(a["client.version"]=c.version);if(a.postParams){b.stack&&(a.postParams.stack=b.stack);b=v(Object.keys(c));for(var d=b.next();!d.done;d=b.next())d=d.value,a.postParams["client."+d]=c[d];if(c=S("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS"))for(b=v(Object.keys(c)),
d=b.next();!d.done;d=b.next())d=d.value,a.postParams[d]=c[d];c=S("SERVER_NAME");b=S("SERVER_VERSION");c&&b&&(a.postParams["server.name"]=c,a.postParams["server.version"]=b)}rl(S("ECATCHER_REPORT_HOST","")+"/error_204",a)}
;function zr(){this.register=new Map}
function Ar(a){a=v(a.register.values());for(var b=a.next();!b.done;b=a.next())b.value.Pf("ABORTED")}
zr.prototype.clear=function(){Ar(this);this.register.clear()};
var Br=new zr;var Cr=Date.now().toString();
function Dr(){a:{if(window.crypto&&window.crypto.getRandomValues)try{var a=Array(16),b=new Uint8Array(16);window.crypto.getRandomValues(b);for(var c=0;c<a.length;c++)a[c]=b[c];var d=a;break a}catch(e){}d=Array(16);for(a=0;16>a;a++){b=Date.now();for(c=0;c<b%23;c++)d[a]=Math.random();d[a]=Math.floor(256*Math.random())}if(Cr)for(a=1,b=0;b<Cr.length;b++)d[a%16]=d[a%16]^d[(a-1)%16]/4^Cr.charCodeAt(b),a++}a=[];for(b=0;b<d.length;b++)a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(d[b]&63));
return a.join("")}
;var Er,Fr=C.ytLoggingDocDocumentNonce_;Fr||(Fr=Dr(),D("ytLoggingDocDocumentNonce_",Fr));Er=Fr;function Gr(a){this.h=a}
Gr.prototype.getAsJson=function(){var a={};void 0!==this.h.trackingParams?a.trackingParams=this.h.trackingParams:(a.veType=this.h.veType,void 0!==this.h.veCounter&&(a.veCounter=this.h.veCounter),void 0!==this.h.elementIndex&&(a.elementIndex=this.h.elementIndex));void 0!==this.h.dataElement&&(a.dataElement=this.h.dataElement.getAsJson());void 0!==this.h.youtubeData&&(a.youtubeData=this.h.youtubeData);this.h.isCounterfactual&&(a.isCounterfactual=!0);return a};
Gr.prototype.getAsJspb=function(){var a=new zk;if(void 0!==this.h.trackingParams){var b=this.h.trackingParams;if(null!=b)if("string"===typeof b)b=b?new Ad(b,xd):yd||(yd=new Ad(null,xd));else if(b.constructor!==Ad)if(wd(b))b instanceof Uint8Array||Array.isArray(b),b=b.length?new Ad(new Uint8Array(b),xd):yd||(yd=new Ad(null,xd));else throw Error();G(a,1,b)}else void 0!==this.h.veType&&G(a,2,Wd(this.h.veType)),void 0!==this.h.veCounter&&G(a,6,Wd(this.h.veCounter)),void 0!==this.h.elementIndex&&G(a,3,
Wd(this.h.elementIndex)),this.h.isCounterfactual&&G(a,5,Vd(!0));void 0!==this.h.dataElement&&(b=this.h.dataElement.getAsJspb(),ie(a,zk,7,b));void 0!==this.h.youtubeData&&ie(a,sk,8,this.h.jspbYoutubeData);return a};
Gr.prototype.toString=function(){return JSON.stringify(this.getAsJson())};
Gr.prototype.isClientVe=function(){return!this.h.trackingParams&&!!this.h.veType};function Hr(a){a=void 0===a?0:a;return 0===a?"client-screen-nonce":"client-screen-nonce."+a}
function Ir(a){a=void 0===a?0:a;return T("new_csn_storage_design")?S("client-screen-nonce-store",{})[a]:S(Hr(a))}
function Jr(a,b){b=void 0===b?0:b;if(T("new_csn_storage_design")){var c=S("client-screen-nonce-store");c||(c={},Nk("client-screen-nonce-store",c));c[b]=a}Nk(Hr(b),a)}
function Kr(a){a=void 0===a?0:a;return 0===a?"ROOT_VE_TYPE":"ROOT_VE_TYPE."+a}
function Lr(a){return S(Kr(void 0===a?0:a))}
D("yt_logging_screen.getRootVeType",Lr);function Mr(){var a=S("csn-to-ctt-auth-info");a||(a={},Nk("csn-to-ctt-auth-info",a));return a}
function Nr(){return Object.values(S("client-screen-nonce-store",{})).filter(function(a){return void 0!==a})}
function Or(a){a=Ir(void 0===a?0:a);if(!a&&!S("USE_CSN_FALLBACK",!0))return null;a||(a="UNDEFINED_CSN");return a?a:null}
D("yt_logging_screen.getCurrentCsn",Or);function Pr(a,b,c){var d=Mr();(c=Or(c))&&delete d[c];b&&(d[a]=b)}
function Qr(a){return Mr()[a]}
D("yt_logging_screen.getCttAuthInfo",Qr);D("yt_logging_screen.setCurrentScreen",function(a,b,c,d){c=void 0===c?0:c;if(a!==Ir(c)||b!==S(Kr(c)))if(Pr(a,d,c),Jr(a,c),Nk(Kr(c),b),b=function(){setTimeout(function(){a&&Bm("foregroundHeartbeatScreenAssociated",{clientDocumentNonce:Er,clientScreenNonce:a})},0)},"requestAnimationFrame"in window)try{window.requestAnimationFrame(b)}catch(e){b()}else b()});var Rr=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};D("yt.msgs_",Rr);function Sr(a){Ik(Rr,arguments)}
;function Tr(){var a=sb(Ur),b;return(new Ef(function(c,d){a.onSuccess=function(e){kl(e)?c(new Vr(e)):d(new Wr("Request failed, status="+(e&&"status"in e?e.status:-1),"net.badstatus",e))};
a.onError=function(e){d(new Wr("Unknown request error","net.unknown",e))};
a.onTimeout=function(e){d(new Wr("Request timed out","net.timeout",e))};
b=rl("//googleads.g.doubleclick.net/pagead/id",a)})).nc(function(c){c instanceof Pf&&b.abort();
return Kf(c)})}
function Wr(a,b,c){$a.call(this,a+", errorCode="+b);this.errorCode=b;this.xhr=c;this.name="PromiseAjaxError"}
w(Wr,$a);function Vr(a){this.xhr=a}
;function Xr(){this.h=0;this.i=null}
Xr.prototype.then=function(a,b,c){return 1===this.h&&a?(a=a.call(c,this.i))&&"function"===typeof a.then?a:Yr(a):2===this.h&&b?(a=b.call(c,this.i))&&"function"===typeof a.then?a:Zr(a):this};
Xr.prototype.getValue=function(){return this.i};
Xr.prototype.isRejected=function(){return 2==this.h};
Xr.prototype.$goog_Thenable=!0;function Zr(a){var b=new Xr;a=void 0===a?null:a;b.h=2;b.i=void 0===a?null:a;return b}
function Yr(a){var b=new Xr;a=void 0===a?null:a;b.h=1;b.i=void 0===a?null:a;return b}
;function $r(a,b){var c=void 0===c?{}:c;a={method:void 0===b?"POST":b,mode:cl(a)?"same-origin":"cors",credentials:cl(a)?"same-origin":"include"};b={};for(var d=v(Object.keys(c)),e=d.next();!e.done;e=d.next())e=e.value,c[e]&&(b[e]=c[e]);0<Object.keys(b).length&&(a.headers=b);return a}
;function as(){return Fg()||(hd||id)&&Hm("applewebkit")&&!Hm("version")&&(!Hm("safari")||Hm("gsa/"))||Yc&&Hm("version/")?!0:S("EOM_VISITOR_DATA")?!1:!0}
;function bs(a){a:{var b="EMBEDDED_PLAYER_MODE_UNKNOWN";window.location.hostname.includes("youtubeeducation.com")&&(b="EMBEDDED_PLAYER_MODE_PFL");var c=a.raw_embedded_player_response;if(!c&&(a=a.embedded_player_response))try{c=JSON.parse(a)}catch(e){break a}if(c)b:for(var d in xk)if(xk[d]==c.embeddedPlayerMode){b=xk[d];break b}}return"EMBEDDED_PLAYER_MODE_PFL"===b}
;function cs(a){$a.call(this,a.message||a.description||a.name);this.isMissing=a instanceof ds;this.isTimeout=a instanceof Wr&&"net.timeout"==a.errorCode;this.isCanceled=a instanceof Pf}
w(cs,$a);cs.prototype.name="BiscottiError";function ds(){$a.call(this,"Biscotti ID is missing from server")}
w(ds,$a);ds.prototype.name="BiscottiMissingError";var Ur={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},es=null;function gs(){if(T("disable_biscotti_fetch_entirely_for_all_web_clients"))return Error("Biscotti id fetching has been disabled entirely.");if(!as())return Error("User has not consented - not fetching biscotti id.");var a=S("PLAYER_VARS",{});if("1"==qb(a))return Error("Biscotti ID is not available in private embed mode");if(bs(a))return Error("Biscotti id fetching has been disabled for pfl.")}
function Gk(){var a=gs();if(void 0!==a)return Kf(a);es||(es=Tr().then(hs).nc(function(b){return is(2,b)}));
return es}
function hs(a){a=a.xhr.responseText;if(0!=a.lastIndexOf(")]}'",0))throw new ds;a=JSON.parse(a.substr(4));if(1<(a.type||1))throw new ds;a=a.id;Hk(a);es=Yr(a);js(18E5,2);return a}
function is(a,b){b=new cs(b);Hk("");es=Zr(b);0<a&&js(12E4,a-1);throw b;}
function js(a,b){ll(function(){Tr().then(hs,function(c){return is(b,c)}).nc(bb)},a)}
function ks(){try{var a=E("yt.ads.biscotti.getId_");return a?a():Gk()}catch(b){return Kf(b)}}
;function ls(a){if("1"!=qb(S("PLAYER_VARS",{}))){a&&Fk();try{ks().then(function(){},function(){}),ll(ls,18E5)}catch(b){Sk(b)}}}
;function ms(){var a=Zl(),b=bm(119),c=1<window.devicePixelRatio;if(document.body&&xi(document.body,"exp-invert-logo"))if(c&&!xi(document.body,"inverted-hdpi")){var d=document.body;if(d.classList)d.classList.add("inverted-hdpi");else if(!xi(d,"inverted-hdpi")){var e=vi(d);wi(d,e+(0<e.length?" inverted-hdpi":"inverted-hdpi"))}}else!c&&xi(document.body,"inverted-hdpi")&&yi();if(b!=c){b="f"+(Math.floor(119/31)+1);d=cm(b)||0;d=c?d|67108864:d&-67108865;0===d?delete Wl[b]:(c=d.toString(16),Wl[b]=c.toString());
c=!0;T("web_secure_pref_cookie_killswitch")&&(c=!1);b=a.h;d=[];for(f in Wl)Wl.hasOwnProperty(f)&&d.push(f+"="+encodeURIComponent(String(Wl[f])));var f=d.join("&");Sl(b,f,63072E3,a.i,c)}}
;var ns=new Map([["dark","USER_INTERFACE_THEME_DARK"],["light","USER_INTERFACE_THEME_LIGHT"]]);function ps(){var a=void 0===a?window.location.href:a;if(T("kevlar_disable_theme_param"))return null;sc(tc(5,a));try{var b=al(a).theme;return ns.get(b)||null}catch(c){}return null}
;function qs(){this.h={};if(this.i=Vl()){var a=Tl("CONSISTENCY");a&&rs(this,{encryptedTokenJarContents:a})}}
qs.prototype.handleResponse=function(a,b){if(!b)throw Error("request needs to be passed into ConsistencyService");var c,d;b=(null==(c=b.Na.context)?void 0:null==(d=c.request)?void 0:d.consistencyTokenJars)||[];var e;if(a=null==(e=a.responseContext)?void 0:e.consistencyTokenJar){e=v(b);for(c=e.next();!c.done;c=e.next())delete this.h[c.value.encryptedTokenJarContents];rs(this,a)}};
function rs(a,b){if(b.encryptedTokenJarContents&&(a.h[b.encryptedTokenJarContents]=b,"string"===typeof b.expirationSeconds)){var c=Number(b.expirationSeconds);setTimeout(function(){delete a.h[b.encryptedTokenJarContents]},1E3*c);
a.i&&Sl("CONSISTENCY",b.encryptedTokenJarContents,c,void 0,!0)}}
;var ss=window.location.hostname.split(".").slice(-2).join(".");function ts(){var a=S("LOCATION_PLAYABILITY_TOKEN");"TVHTML5"===S("INNERTUBE_CLIENT_NAME")&&(this.h=us(this))&&(a=this.h.get("yt-location-playability-token"));a&&(this.locationPlayabilityToken=a,this.i=void 0)}
var vs;function ws(){vs=E("yt.clientLocationService.instance");vs||(vs=new ts,D("yt.clientLocationService.instance",vs));return vs}
m=ts.prototype;m.setLocationOnInnerTubeContext=function(a){a.client||(a.client={});this.i?(a.client.locationInfo||(a.client.locationInfo={}),a.client.locationInfo.latitudeE7=Math.floor(1E7*this.i.coords.latitude),a.client.locationInfo.longitudeE7=Math.floor(1E7*this.i.coords.longitude),a.client.locationInfo.horizontalAccuracyMeters=Math.round(this.i.coords.accuracy),a.client.locationInfo.forceLocationPlayabilityTokenRefresh=!0):this.locationPlayabilityToken&&(a.client.locationPlayabilityToken=this.locationPlayabilityToken)};
m.handleResponse=function(a){var b;a=null==(b=a.responseContext)?void 0:b.locationPlayabilityToken;void 0!==a&&(this.locationPlayabilityToken=a,this.i=void 0,"TVHTML5"===S("INNERTUBE_CLIENT_NAME")?(this.h=us(this))&&this.h.set("yt-location-playability-token",a,15552E3):Sl("YT_CL",JSON.stringify({loctok:a}),15552E3,ss,!0))};
function us(a){return void 0===a.h?new rm("yt-client-location"):a.h}
m.clearLocationPlayabilityToken=function(a){"TVHTML5"===a?(this.h=us(this))&&this.h.remove("yt-location-playability-token"):Ul("YT_CL")};
m.getCurrentPositionFromGeolocation=function(){var a=this;if(!(navigator&&navigator.geolocation&&navigator.geolocation.getCurrentPosition))return Promise.reject(Error("Geolocation unsupported"));var b=!1,c=1E4;"MWEB"===S("INNERTUBE_CLIENT_NAME")&&(b=!0,c=15E3);return new Promise(function(d,e){navigator.geolocation.getCurrentPosition(function(f){a.i=f;d(f)},function(f){e(f)},{enableHighAccuracy:b,
maximumAge:0,timeout:c})})};
m.createUnpluggedLocationInfo=function(a){var b={};a=a.coords;if(null==a?0:a.latitude)b.latitudeE7=Math.floor(1E7*a.latitude);if(null==a?0:a.longitude)b.longitudeE7=Math.floor(1E7*a.longitude);if(null==a?0:a.accuracy)b.locationRadiusMeters=Math.round(a.accuracy);return b};function xs(a,b){if(!a)return!1;var c,d=null==(c=V(a,wk))?void 0:c.signal;if(d&&b.kb)return!!b.kb[d];var e;if((c=null==(e=V(a,tk))?void 0:e.request)&&b.vc)return!!b.vc[c];for(var f in a)if(b.uc[f])return!0;return!1}
function ys(a,b){var c,d=null==(c=V(a,wk))?void 0:c.signal;if(d&&b.kb&&(c=b.kb[d]))return c();var e;if((c=null==(e=V(a,tk))?void 0:e.request)&&b.vc&&(e=b.vc[c]))return e();for(var f in a)if(b.uc[f]&&(a=b.uc[f]))return a()}
;function zs(a){return function(){return new a}}
;var As={},Bs=(As.WEB_UNPLUGGED="^unplugged/",As.WEB_UNPLUGGED_ONBOARDING="^unplugged/",As.WEB_UNPLUGGED_OPS="^unplugged/",As.WEB_UNPLUGGED_PUBLIC="^unplugged/",As.WEB_CREATOR="^creator/",As.WEB_KIDS="^kids/",As.WEB_EXPERIMENTS="^experiments/",As.WEB_MUSIC="^music/",As.WEB_REMIX="^music/",As.WEB_MUSIC_EMBEDDED_PLAYER="^music/",As.WEB_MUSIC_EMBEDDED_PLAYER="^main_app/|^sfv/",As);
function Cs(a){var b=void 0===b?"UNKNOWN_INTERFACE":b;if(1===a.length)return a[0];var c=Bs[b];if(c){var d=new RegExp(c),e=v(a);for(c=e.next();!c.done;c=e.next())if(c=c.value,d.exec(c))return c}var f=[];Object.entries(Bs).forEach(function(g){var h=v(g);g=h.next().value;h=h.next().value;b!==g&&f.push(h)});
d=new RegExp(f.join("|"));a.sort(function(g,h){return g.length-h.length});
e=v(a);for(c=e.next();!c.done;c=e.next())if(c=c.value,!d.exec(c))return c;return a[0]}
;function Ds(){}
Ds.prototype.m=function(a,b,c){b=void 0===b?{}:b;c=void 0===c?Pl:c;var d=a.clickTrackingParams,e=this.l,f=!1;f=void 0===f?!1:f;e=void 0===e?!1:e;var g=S("INNERTUBE_CONTEXT");if(g){g=tb(g);T("web_no_tracking_params_in_shell_killswitch")||delete g.clickTracking;g.client||(g.client={});var h=g.client;"MWEB"===h.clientName&&(h.clientFormFactor=S("IS_TABLET")?"LARGE_FORM_FACTOR":"SMALL_FORM_FACTOR");h.screenWidthPoints=window.innerWidth;h.screenHeightPoints=window.innerHeight;h.screenPixelDensity=Math.round(window.devicePixelRatio||
1);h.screenDensityFloat=window.devicePixelRatio||1;h.utcOffsetMinutes=-Math.floor((new Date).getTimezoneOffset());var k=void 0===k?!1:k;Zl();var l="USER_INTERFACE_THEME_LIGHT";bm(165)?l="USER_INTERFACE_THEME_DARK":bm(174)?l="USER_INTERFACE_THEME_LIGHT":!T("kevlar_legacy_browsers")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme)").matches&&window.matchMedia("(prefers-color-scheme: dark)").matches&&(l="USER_INTERFACE_THEME_DARK");k=k?l:ps()||l;h.userInterfaceTheme=k;if(!f){if(k=gm())h.connectionType=
k;T("web_log_effective_connection_type")&&(k=hm())&&(g.client.effectiveConnectionType=k)}var n;if(T("web_log_memory_total_kbytes")&&(null==(n=C.navigator)?0:n.deviceMemory)){var p;n=null==(p=C.navigator)?void 0:p.deviceMemory;g.client.memoryTotalKbytes=""+1E6*n}p=al(C.location.href);!T("web_populate_internal_geo_killswitch")&&p.internalcountrycode&&(h.internalGeo=p.internalcountrycode);"MWEB"===h.clientName||"WEB"===h.clientName?(h.mainAppWebInfo={graftUrl:C.location.href},T("kevlar_woffle")&&Ql.h&&
(p=Ql.h,h.mainAppWebInfo.pwaInstallabilityStatus=!p.h&&p.i?"PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED":"PWA_INSTALLABILITY_STATUS_UNKNOWN"),h.mainAppWebInfo.webDisplayMode=Rl(),h.mainAppWebInfo.isWebNativeShareAvailable=navigator&&void 0!==navigator.share):"TVHTML5"===h.clientName&&(!T("web_lr_app_quality_killswitch")&&(p=S("LIVING_ROOM_APP_QUALITY"))&&(h.tvAppInfo=Object.assign(h.tvAppInfo||{},{appQuality:p})),p=S("LIVING_ROOM_CERTIFICATION_SCOPE"))&&(h.tvAppInfo=Object.assign(h.tvAppInfo||{},{certificationScope:p}));
if(!T("web_populate_time_zone_itc_killswitch")){b:{if("undefined"!==typeof Intl)try{var t=(new Intl.DateTimeFormat).resolvedOptions().timeZone;break b}catch(W){}t=void 0}t&&(h.timeZone=t)}(t=S("EXPERIMENTS_TOKEN",""))?h.experimentsToken=t:delete h.experimentsToken;t=hl();qs.h||(qs.h=new qs);h=qs.h.h;p=[];n=0;for(var r in h)p[n++]=h[r];g.request=Object.assign({},g.request,{internalExperimentFlags:t,consistencyTokenJars:p});!T("web_prequest_context_killswitch")&&(r=S("INNERTUBE_CONTEXT_PREQUEST_CONTEXT"))&&
(g.request.externalPrequestContext=r);t=Zl();r=bm(58);t=t.get("gsml","");g.user=Object.assign({},g.user);r&&(g.user.enableSafetyMode=r);t&&(g.user.lockedSafetyMode=!0);T("warm_op_csn_cleanup")?e&&(f=Or())&&(g.clientScreenNonce=f):!f&&(f=Or())&&(g.clientScreenNonce=f);d&&(g.clickTracking={clickTrackingParams:d});if(d=E("yt.mdx.remote.remoteClient_"))g.remoteClient=d;ws().setLocationOnInnerTubeContext(g);try{var x=dl(),y=x.bid;delete x.bid;g.adSignalsInfo={params:[],bid:y};var z=v(Object.entries(x));
for(var H=z.next();!H.done;H=z.next()){var I=v(H.value),L=I.next().value,P=I.next().value;x=L;y=P;d=void 0;null==(d=g.adSignalsInfo.params)||d.push({key:x,value:""+y})}}catch(W){vr(W)}z=g}else vr(Error("Error: No InnerTubeContext shell provided in ytconfig.")),z={};z={context:z};if(H=this.h(a)){this.i(z,H,b);var J;b="/youtubei/v1/"+Cs(this.j());(H=null==(J=V(a.commandMetadata,vk))?void 0:J.apiUrl)&&(b=H);J=b;(b=S("INNERTUBE_HOST_OVERRIDE"))&&(J=String(b)+String(vc(J)));b={};b.key=S("INNERTUBE_API_KEY");
T("json_condensed_response")&&(b.prettyPrint="false");J=bl(J,b||{},!1);a=Object.assign({},{command:a},void 0);a={input:J,ib:$r(J),Na:z,config:a};a.config.Ub?a.config.Ub.identity=c:a.config.Ub={identity:c};return a}vr(new im("Error: Failed to create Request from Command.",a))};
fa.Object.defineProperties(Ds.prototype,{l:{configurable:!0,enumerable:!0,get:function(){return!1}}});function Es(){}
w(Es,Ds);Es.prototype.m=function(){return{input:"/getDatasyncIdsEndpoint",ib:$r("/getDatasyncIdsEndpoint","GET"),Na:{}}};
Es.prototype.j=function(){return[]};
Es.prototype.h=function(){};
Es.prototype.i=function(){};var Fs={},Gs=(Fs.GET_DATASYNC_IDS=zs(Es),Fs);function Hs(a,b){var c=void 0===c?!0:c;var d=S("VALID_SESSION_TEMPDATA_DOMAINS",[]),e=uc(window.location.href);e&&d.push(e);e=uc(a);if(0<=db(d,e)||!e&&0==a.lastIndexOf("/",0))if(d=document.createElement("a"),lc(d,a),a=d.href)if(a=vc(a),a=wc(a))if(c&&!b.csn&&(b.itct||b.ved)&&(b=Object.assign({csn:Or()},b)),f){var f=parseInt(f,10);isFinite(f)&&0<f&&Is(a,b,f)}else Is(a,b)}
function Is(a,b,c){a="ST-"+qc(a).toString(36);b=b?Ac(b):"";c=c||5;as()&&Sl(a,b,c)}
;function Js(){try{return!!self.localStorage}catch(a){return!1}}
;function Ks(a){a=a.match(/(.*)::.*::.*/);if(null!==a)return a[1]}
function Ls(a){if(Js()){var b=Object.keys(window.localStorage);b=v(b);for(var c=b.next();!c.done;c=b.next()){c=c.value;var d=Ks(c);void 0===d||a.includes(d)||self.localStorage.removeItem(c)}}}
function Ms(){if(!Js())return!1;var a=km(),b=Object.keys(window.localStorage);b=v(b);for(var c=b.next();!c.done;c=b.next())if(c=Ks(c.value),void 0!==c&&c!==a)return!0;return!1}
;function Ns(a){if(Fg()){var b=S("VALID_SESSION_TEMPDATA_DOMAINS",[]);var c=uc(window.location.href);c&&b.push(c);c=uc(a);0<=db(b,c)||!c&&0==a.lastIndexOf("/",0)?(b=vc(a),(b=wc(b))?(b="ST-"+qc(b).toString(36),b=(b=Tl(b)||null)?$k(b):{}):b=null):b=null;null==b&&(b={});c=S("LOGIN_INFO");T("copy_login_info_to_st_cookie")&&c&&(b.session_logininfo=c);Hs(a,b)}}
;function Os(a){var b=B.apply(1,arguments);if(!Ps(a)||b.some(function(d){return!Ps(d)}))throw Error("Only objects may be merged.");
b=v(b);for(var c=b.next();!c.done;c=b.next())Qs(a,c.value);return a}
function Qs(a,b){for(var c in b)if(Ps(b[c])){if(c in a&&!Ps(a[c]))throw Error("Cannot merge an object into a non-object.");c in a||(a[c]={});Qs(a[c],b[c])}else if(Rs(b[c])){if(c in a&&!Rs(a[c]))throw Error("Cannot merge an array into a non-array.");c in a||(a[c]=[]);Ss(a[c],b[c])}else a[c]=b[c];return a}
function Ss(a,b){b=v(b);for(var c=b.next();!c.done;c=b.next())c=c.value,Ps(c)?a.push(Qs({},c)):Rs(c)?a.push(Ss([],c)):a.push(c);return a}
function Ps(a){return"object"===typeof a&&!Array.isArray(a)}
function Rs(a){return"object"===typeof a&&Array.isArray(a)}
;function Ts(a){var b;(b=E("ytcsi."+(a||"")+"data_"))||(b={tick:{},info:{}},D("ytcsi."+(a||"")+"data_",b));return b}
function Us(){var a=Ts();a.info||(a.info={});return a.info}
function Vs(a){a=Ts(a);a.metadata||(a.metadata={});return a.metadata}
function Ws(a){a=Ts(a);a.tick||(a.tick={});return a.tick}
function Xs(a){a=Ts(a);if(a.gel){var b=a.gel;b.gelInfos||(b.gelInfos={});b.gelTicks||(b.gelTicks={})}else a.gel={gelTicks:{},gelInfos:{}};return a.gel}
function Ys(a){a=Xs(a);a.gelInfos||(a.gelInfos={});return a.gelInfos}
function Zs(a){var b=Ts(a).nonce;b||(b=Dr(),Ts(a).nonce=b);return b}
;function $s(){var a=E("ytcsi.debug");a||(a=[],D("ytcsi.debug",a),D("ytcsi.reference",{}));return a}
function at(a){a=a||"";var b=E("ytcsi.reference");b||($s(),b=E("ytcsi.reference"));if(b[a])return b[a];var c=$s(),d={timerName:a,info:{},tick:{},span:{},jspbInfo:[]};c.push(d);return b[a]=d}
;var X={},bt=(X.auto_search="LATENCY_ACTION_AUTO_SEARCH",X.ad_to_ad="LATENCY_ACTION_AD_TO_AD",X.ad_to_video="LATENCY_ACTION_AD_TO_VIDEO",X["analytics.explore"]="LATENCY_ACTION_CREATOR_ANALYTICS_EXPLORE",X.app_startup="LATENCY_ACTION_APP_STARTUP",X["artist.analytics"]="LATENCY_ACTION_CREATOR_ARTIST_ANALYTICS",X["artist.events"]="LATENCY_ACTION_CREATOR_ARTIST_CONCERTS",X["artist.presskit"]="LATENCY_ACTION_CREATOR_ARTIST_PROFILE",X["asset.claimed_videos"]="LATENCY_ACTION_CREATOR_CMS_ASSET_CLAIMED_VIDEOS",
X["asset.composition"]="LATENCY_ACTION_CREATOR_CMS_ASSET_COMPOSITION",X["asset.embeds"]="LATENCY_ACTION_CREATOR_CMS_ASSET_EMBEDS",X["asset.issues"]="LATENCY_ACTION_CREATOR_CMS_ASSET_ISSUES",X["asset.licenses"]="LATENCY_ACTION_CREATOR_CMS_ASSET_LICENSES",X["asset.metadata"]="LATENCY_ACTION_CREATOR_CMS_ASSET_METADATA",X["asset.ownership"]="LATENCY_ACTION_CREATOR_CMS_ASSET_OWNERSHIP",X["asset.policy"]="LATENCY_ACTION_CREATOR_CMS_ASSET_POLICY",X["asset.references"]="LATENCY_ACTION_CREATOR_CMS_ASSET_REFERENCES",
X["asset.sound_recordings"]="LATENCY_ACTION_CREATOR_CMS_ASSET_SOUND_RECORDINGS",X["song.analytics"]="LATENCY_ACTION_CREATOR_SONG_ANALYTICS",X.browse="LATENCY_ACTION_BROWSE",X.cast_splash="LATENCY_ACTION_CAST_SPLASH",X.channels="LATENCY_ACTION_CHANNELS",X.creator_channel_dashboard="LATENCY_ACTION_CREATOR_CHANNEL_DASHBOARD",X["channel.analytics"]="LATENCY_ACTION_CREATOR_CHANNEL_ANALYTICS",X["channel.comments"]="LATENCY_ACTION_CREATOR_CHANNEL_COMMENTS",X["channel.content"]="LATENCY_ACTION_CREATOR_POST_LIST",
X["channel.content.promotions"]="LATENCY_ACTION_CREATOR_PROMOTION_LIST",X["channel.copyright"]="LATENCY_ACTION_CREATOR_CHANNEL_COPYRIGHT",X["channel.editing"]="LATENCY_ACTION_CREATOR_CHANNEL_EDITING",X["channel.monetization"]="LATENCY_ACTION_CREATOR_CHANNEL_MONETIZATION",X["channel.music"]="LATENCY_ACTION_CREATOR_CHANNEL_MUSIC",X["channel.music_storefront"]="LATENCY_ACTION_CREATOR_CHANNEL_MUSIC_STOREFRONT",X["channel.playlists"]="LATENCY_ACTION_CREATOR_CHANNEL_PLAYLISTS",X["channel.translations"]=
"LATENCY_ACTION_CREATOR_CHANNEL_TRANSLATIONS",X["channel.videos"]="LATENCY_ACTION_CREATOR_CHANNEL_VIDEOS",X["channel.live_streaming"]="LATENCY_ACTION_CREATOR_LIVE_STREAMING",X.chips="LATENCY_ACTION_CHIPS",X["dialog.copyright_strikes"]="LATENCY_ACTION_CREATOR_DIALOG_COPYRIGHT_STRIKES",X["dialog.video_copyright"]="LATENCY_ACTION_CREATOR_DIALOG_VIDEO_COPYRIGHT",X["dialog.uploads"]="LATENCY_ACTION_CREATOR_DIALOG_UPLOADS",X.direct_playback="LATENCY_ACTION_DIRECT_PLAYBACK",X.embed="LATENCY_ACTION_EMBED",
X.entity_key_serialization_perf="LATENCY_ACTION_ENTITY_KEY_SERIALIZATION_PERF",X.entity_key_deserialization_perf="LATENCY_ACTION_ENTITY_KEY_DESERIALIZATION_PERF",X.explore="LATENCY_ACTION_EXPLORE",X.home="LATENCY_ACTION_HOME",X.library="LATENCY_ACTION_LIBRARY",X.live="LATENCY_ACTION_LIVE",X.live_pagination="LATENCY_ACTION_LIVE_PAGINATION",X.onboarding="LATENCY_ACTION_ONBOARDING",X.owner="LATENCY_ACTION_CREATOR_CMS_DASHBOARD",X["owner.allowlist"]="LATENCY_ACTION_CREATOR_CMS_ALLOWLIST",X["owner.analytics"]=
"LATENCY_ACTION_CREATOR_CMS_ANALYTICS",X["owner.art_tracks"]="LATENCY_ACTION_CREATOR_CMS_ART_TRACKS",X["owner.assets"]="LATENCY_ACTION_CREATOR_CMS_ASSETS",X["owner.asset_groups"]="LATENCY_ACTION_CREATOR_CMS_ASSET_GROUPS",X["owner.campaigns"]="LATENCY_ACTION_CREATOR_CMS_CAMPAIGNS",X["owner.channels"]="LATENCY_ACTION_CREATOR_CMS_CHANNELS",X["owner.claimed_videos"]="LATENCY_ACTION_CREATOR_CMS_CLAIMED_VIDEOS",X["owner.claims"]="LATENCY_ACTION_CREATOR_CMS_MANUAL_CLAIMING",X["owner.claims.manual"]="LATENCY_ACTION_CREATOR_CMS_MANUAL_CLAIMING",
X["owner.delivery"]="LATENCY_ACTION_CREATOR_CMS_CONTENT_DELIVERY",X["owner.issues"]="LATENCY_ACTION_CREATOR_CMS_ISSUES",X["owner.licenses"]="LATENCY_ACTION_CREATOR_CMS_LICENSES",X["owner.pitch_music"]="LATENCY_ACTION_CREATOR_CMS_PITCH_MUSIC",X["owner.policies"]="LATENCY_ACTION_CREATOR_CMS_POLICIES",X["owner.releases"]="LATENCY_ACTION_CREATOR_CMS_RELEASES",X["owner.reports"]="LATENCY_ACTION_CREATOR_CMS_REPORTS",X["owner.videos"]="LATENCY_ACTION_CREATOR_CMS_VIDEOS",X.parent_profile_settings="LATENCY_ACTION_KIDS_PARENT_PROFILE_SETTINGS",
X.parent_tools_collection="LATENCY_ACTION_PARENT_TOOLS_COLLECTION",X.parent_tools_dashboard="LATENCY_ACTION_PARENT_TOOLS_DASHBOARD",X.player_att="LATENCY_ACTION_PLAYER_ATTESTATION",X["post.comments"]="LATENCY_ACTION_CREATOR_POST_COMMENTS",X["post.edit"]="LATENCY_ACTION_CREATOR_POST_EDIT",X.prebuffer="LATENCY_ACTION_PREBUFFER",X.prefetch="LATENCY_ACTION_PREFETCH",X.profile_settings="LATENCY_ACTION_KIDS_PROFILE_SETTINGS",X.profile_switcher="LATENCY_ACTION_LOGIN",X.reel_watch="LATENCY_ACTION_REEL_WATCH",
X.results="LATENCY_ACTION_RESULTS",X["promotion.edit"]="LATENCY_ACTION_CREATOR_PROMOTION_EDIT",X.search_ui="LATENCY_ACTION_SEARCH_UI",X.search_suggest="LATENCY_ACTION_SUGGEST",X.search_zero_state="LATENCY_ACTION_SEARCH_ZERO_STATE",X.secret_code="LATENCY_ACTION_KIDS_SECRET_CODE",X.seek="LATENCY_ACTION_PLAYER_SEEK",X.settings="LATENCY_ACTION_SETTINGS",X.store="LATENCY_ACTION_STORE",X.tenx="LATENCY_ACTION_TENX",X.video_to_ad="LATENCY_ACTION_VIDEO_TO_AD",X.watch="LATENCY_ACTION_WATCH",X.watch_it_again=
"LATENCY_ACTION_KIDS_WATCH_IT_AGAIN",X["watch,watch7"]="LATENCY_ACTION_WATCH",X["watch,watch7_html5"]="LATENCY_ACTION_WATCH",X["watch,watch7ad"]="LATENCY_ACTION_WATCH",X["watch,watch7ad_html5"]="LATENCY_ACTION_WATCH",X.wn_comments="LATENCY_ACTION_LOAD_COMMENTS",X.ww_rqs="LATENCY_ACTION_WHO_IS_WATCHING",X["video.analytics"]="LATENCY_ACTION_CREATOR_VIDEO_ANALYTICS",X["video.claims"]="LATENCY_ACTION_CREATOR_VIDEO_CLAIMS",X["video.comments"]="LATENCY_ACTION_CREATOR_VIDEO_COMMENTS",X["video.copyright"]=
"LATENCY_ACTION_CREATOR_VIDEO_COPYRIGHT",X["video.edit"]="LATENCY_ACTION_CREATOR_VIDEO_EDIT",X["video.editor"]="LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR",X["video.editor_async"]="LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR_ASYNC",X["video.live_settings"]="LATENCY_ACTION_CREATOR_VIDEO_LIVE_SETTINGS",X["video.live_streaming"]="LATENCY_ACTION_CREATOR_VIDEO_LIVE_STREAMING",X["video.monetization"]="LATENCY_ACTION_CREATOR_VIDEO_MONETIZATION",X["video.policy"]="LATENCY_ACTION_CREATOR_VIDEO_POLICY",X["video.rights_management"]=
"LATENCY_ACTION_CREATOR_VIDEO_RIGHTS_MANAGEMENT",X["video.translations"]="LATENCY_ACTION_CREATOR_VIDEO_TRANSLATIONS",X.voice_assistant="LATENCY_ACTION_VOICE_ASSISTANT",X.cast_load_by_entity_to_watch="LATENCY_ACTION_CAST_LOAD_BY_ENTITY_TO_WATCH",X.networkless_performance="LATENCY_ACTION_NETWORKLESS_PERFORMANCE",X.gel_compression="LATENCY_ACTION_GEL_COMPRESSION",X.gel_jspb_serialize="LATENCY_ACTION_GEL_JSPB_SERIALIZE",X),Y={},ct=(Y.ad_allowed="adTypesAllowed",Y.yt_abt="adBreakType",Y.ad_cpn="adClientPlaybackNonce",
Y.ad_docid="adVideoId",Y.yt_ad_an="adNetworks",Y.ad_at="adType",Y.aida="appInstallDataAgeMs",Y.browse_id="browseId",Y.p="httpProtocol",Y.t="transportProtocol",Y.cs="commandSource",Y.cpn="clientPlaybackNonce",Y.ccs="creatorInfo.creatorCanaryState",Y.ctop="creatorInfo.topEntityType",Y.csn="clientScreenNonce",Y.docid="videoId",Y.GetHome_rid="requestIds",Y.GetSearch_rid="requestIds",Y.GetPlayer_rid="requestIds",Y.GetWatchNext_rid="requestIds",Y.GetBrowse_rid="requestIds",Y.GetLibrary_rid="requestIds",
Y.is_continuation="isContinuation",Y.is_nav="isNavigation",Y.b_p="kabukiInfo.browseParams",Y.is_prefetch="kabukiInfo.isPrefetch",Y.is_secondary_nav="kabukiInfo.isSecondaryNav",Y.nav_type="kabukiInfo.navigationType",Y.prev_browse_id="kabukiInfo.prevBrowseId",Y.query_source="kabukiInfo.querySource",Y.voz_type="kabukiInfo.vozType",Y.yt_lt="loadType",Y.mver="creatorInfo.measurementVersion",Y.yt_ad="isMonetized",Y.nr="webInfo.navigationReason",Y.nrsu="navigationRequestedSameUrl",Y.pnt="performanceNavigationTiming",
Y.prt="playbackRequiresTap",Y.plt="playerInfo.playbackType",Y.pis="playerInfo.playerInitializedState",Y.paused="playerInfo.isPausedOnLoad",Y.yt_pt="playerType",Y.fmt="playerInfo.itag",Y.yt_pl="watchInfo.isPlaylist",Y.yt_pre="playerInfo.preloadType",Y.yt_ad_pr="prerollAllowed",Y.pa="previousAction",Y.yt_red="isRedSubscriber",Y.rce="mwebInfo.responseContentEncoding",Y.rc="resourceInfo.resourceCache",Y.scrh="screenHeight",Y.scrw="screenWidth",Y.st="serverTimeMs",Y.ssdm="shellStartupDurationMs",Y.br_trs=
"tvInfo.bedrockTriggerState",Y.kebqat="kabukiInfo.earlyBrowseRequestInfo.abandonmentType",Y.kebqa="kabukiInfo.earlyBrowseRequestInfo.adopted",Y.label="tvInfo.label",Y.is_mdx="tvInfo.isMdx",Y.preloaded="tvInfo.isPreloaded",Y.aac_type="tvInfo.authAccessCredentialType",Y.upg_player_vis="playerInfo.visibilityState",Y.query="unpluggedInfo.query",Y.upg_chip_ids_string="unpluggedInfo.upgChipIdsString",Y.yt_vst="videoStreamType",Y.vph="viewportHeight",Y.vpw="viewportWidth",Y.yt_vis="isVisible",Y.rcl="mwebInfo.responseContentLength",
Y.GetSettings_rid="requestIds",Y.GetTrending_rid="requestIds",Y.GetMusicSearchSuggestions_rid="requestIds",Y.REQUEST_ID="requestIds",Y),dt="isContinuation isNavigation kabukiInfo.earlyBrowseRequestInfo.adopted kabukiInfo.isPrefetch kabukiInfo.isSecondaryNav isMonetized navigationRequestedSameUrl performanceNavigationTiming playerInfo.isPausedOnLoad prerollAllowed isRedSubscriber tvInfo.isMdx tvInfo.isPreloaded isVisible watchInfo.isPlaylist playbackRequiresTap".split(" "),et={},ft=(et.ccs="CANARY_STATE_",
et.mver="MEASUREMENT_VERSION_",et.pis="PLAYER_INITIALIZED_STATE_",et.yt_pt="LATENCY_PLAYER_",et.pa="LATENCY_ACTION_",et.ctop="TOP_ENTITY_TYPE_",et.yt_vst="VIDEO_STREAM_TYPE_",et),gt="all_vc ap aq c cbr cbrand cbrver cmodel cos cosver cplatform ctheme cver ei l_an l_mm plid srt yt_fss yt_li vpst vpni2 vpil2 icrc icrt pa GetAccountOverview_rid GetHistory_rid cmt d_vpct d_vpnfi d_vpni nsru pc pfa pfeh pftr pnc prerender psc rc start tcrt tcrc ssr vpr vps yt_abt yt_fn yt_fs yt_pft yt_pre yt_pt yt_pvis ytu_pvis yt_ref yt_sts tds".split(" ");
function ht(a,b,c){c=Xs(c);if(c.gelInfos)c.gelInfos[a]=!0;else{var d={};c.gelInfos=(d[a]=!0,d)}if(a.match("_rid")){var e=a.split("_rid")[0];a="REQUEST_ID"}if(a in ct){c=ct[a];0<=db(dt,c)&&(b=!!b);a in ft&&"string"===typeof b&&(b=ft[a]+b.toUpperCase());a=b;b=c.split(".");for(var f=d={},g=0;g<b.length-1;g++){var h=b[g];f[h]={};f=f[h]}f[b[b.length-1]]="requestIds"===c?[{id:a,endpoint:e}]:a;return Os({},d)}0<=db(gt,a)||wr(new im("Unknown label logged with GEL CSI",a))}
;function jt(a,b){so.call(this,1,arguments);this.timer=b}
w(jt,so);var kt=new to("aft-recorded",jt);var lt=C.ytLoggingLatencyUsageStats_||{};D("ytLoggingLatencyUsageStats_",lt);function mt(){this.h=0}
function nt(){mt.h||(mt.h=new mt);return mt.h}
mt.prototype.tick=function(a,b,c,d){ot(this,"tick_"+a+"_"+b)||Bm("latencyActionTicked",{tickName:a,clientActionNonce:b},{timestamp:c,cttAuthInfo:d})};
mt.prototype.info=function(a,b,c){var d=Object.keys(a).join("");ot(this,"info_"+d+"_"+b)||(a=Object.assign({},a),a.clientActionNonce=b,Bm("latencyActionInfo",a,{cttAuthInfo:c}))};
mt.prototype.jspbInfo=function(){};
mt.prototype.span=function(a,b,c){var d=Object.keys(a).join("");ot(this,"span_"+d+"_"+b)||(a.clientActionNonce=b,Bm("latencyActionSpan",a,{cttAuthInfo:c}))};
function ot(a,b){lt[b]=lt[b]||{count:0};var c=lt[b];c.count++;c.time=U();a.h||(a.h=mm(function(){var d=U(),e;for(e in lt)lt[e]&&6E4<d-lt[e].time&&delete lt[e];a&&(a.h=0)},5E3));
return 5<c.count?(6===c.count&&1>1E5*Math.random()&&(c=new im("CSI data exceeded logging limit with key",b.split("_")),0<=b.indexOf("plev")||wr(c)),!0):!1}
;var pt=window;function qt(){this.timing={};this.clearResourceTimings=function(){};
this.webkitClearResourceTimings=function(){};
this.mozClearResourceTimings=function(){};
this.msClearResourceTimings=function(){};
this.oClearResourceTimings=function(){}}
function rt(){var a;if(T("csi_use_performance_navigation_timing")||T("csi_use_performance_navigation_timing_tvhtml5")){var b,c,d,e=null==Z?void 0:null==(a=Z.getEntriesByType)?void 0:null==(b=a.call(Z,"navigation"))?void 0:null==(c=b[0])?void 0:null==(d=c.toJSON)?void 0:d.call(c);e?(e.requestStart=st(e.requestStart),e.responseEnd=st(e.responseEnd),e.redirectStart=st(e.redirectStart),e.redirectEnd=st(e.redirectEnd),e.domainLookupEnd=st(e.domainLookupEnd),e.connectStart=st(e.connectStart),e.connectEnd=
st(e.connectEnd),e.responseStart=st(e.responseStart),e.secureConnectionStart=st(e.secureConnectionStart),e.domainLookupStart=st(e.domainLookupStart),e.isPerformanceNavigationTiming=!0,a=e):a=Z.timing}else a=Z.timing;return a}
function st(a){return Math.round(tt()+a)}
function tt(){return(T("csi_use_time_origin")||T("csi_use_time_origin_tvhtml5"))&&Z.timeOrigin?Math.floor(Z.timeOrigin):Z.timing.navigationStart}
var Z=pt.performance||pt.mozPerformance||pt.msPerformance||pt.webkitPerformance||new qt;var ut=!1,vt={'script[name="scheduler/scheduler"]':"sj",'script[name="player/base"]':"pj",'link[rel="stylesheet"][name="www-player"]':"pc",'link[rel="stylesheet"][name="player/www-player"]':"pc",'script[name="desktop_polymer/desktop_polymer"]':"dpj",'link[rel="import"][name="desktop_polymer"]':"dph",'script[name="mobile-c3"]':"mcj",'link[rel="stylesheet"][name="mobile-c3"]':"mcc",'script[name="player-plasma-ias-phone/base"]':"mcppj",'script[name="player-plasma-ias-tablet/base"]':"mcptj",'link[rel="stylesheet"][name="mobile-polymer-player-ias"]':"mcpc",
'link[rel="stylesheet"][name="mobile-polymer-player-svg-ias"]':"mcpsc",'script[name="mobile_blazer_core_mod"]':"mbcj",'link[rel="stylesheet"][name="mobile_blazer_css"]':"mbc",'script[name="mobile_blazer_logged_in_users_mod"]':"mbliuj",'script[name="mobile_blazer_logged_out_users_mod"]':"mblouj",'script[name="mobile_blazer_noncore_mod"]':"mbnj","#player_css":"mbpc",'script[name="mobile_blazer_desktopplayer_mod"]':"mbpj",'link[rel="stylesheet"][name="mobile_blazer_tablet_css"]':"mbtc",'script[name="mobile_blazer_watch_mod"]':"mbwj"};
Wa(Z.clearResourceTimings||Z.webkitClearResourceTimings||Z.mozClearResourceTimings||Z.msClearResourceTimings||Z.oClearResourceTimings||bb,Z);function wt(a,b,c){if(null!==b){if("yt_lt"===a){var d="string"===typeof b?b:""+b;Vs(c).loadType=d}(a=ht(a,b,c))&&xt(a,c)}}
function xt(a,b){var c=at(b||"");Os(c.info,a);a.loadType&&(c=a.loadType,Vs(b).loadType=c);Os(Ys(b),a);c=Zs(b);b=Ts(b).cttAuthInfo;nt().info(a,c,b)}
function zt(a,b,c){if(!b&&"_"!==a[0]){var d=a;Z.mark&&(0==d.lastIndexOf("mark_",0)||(d="mark_"+d),c&&(d+=" ("+c+")"),Z.mark(d))}d=at(c||"");d.tick[a]=b||U();if(d.callback&&d.callback[a]){d=v(d.callback[a]);for(var e=d.next();!e.done;e=d.next())e=e.value,e()}d=Xs(c);d.gelTicks&&(d.gelTicks[a]=!0);e=Ws(c);d=b||U();T("log_repeated_ytcsi_ticks")?a in e||(e[a]=d):e[a]=d;e=Zs(c);var f=Ts(c).cttAuthInfo;"_start"===a?(a=nt(),ot(a,"baseline_"+e)||Bm("latencyActionBaselined",{clientActionNonce:e},{timestamp:b,
cttAuthInfo:f})):nt().tick(a,e,b,f);At(c);return d}
function Bt(){var a=document;if("visibilityState"in a)a=a.visibilityState;else{var b=Wp+"VisibilityState";a=b in a?a[b]:void 0}switch(a){case "hidden":return 0;case "visible":return 1;case "prerender":return 2;case "unloaded":return 3;default:return-1}}
function Ct(a,b){a=document.querySelector(a);if(!a)return!1;var c="",d=a.nodeName;"SCRIPT"===d?(c=a.src,c||(c=a.getAttribute("data-timing-href"))&&(c=window.location.protocol+c)):"LINK"===d&&(c=a.href);oc()&&a.setAttribute("nonce",oc());return c?(a=Z.getEntriesByName(c))&&a[0]&&(a=a[0],c=tt(),zt("rsf_"+b,c+Math.round(a.fetchStart)),zt("rse_"+b,c+Math.round(a.responseEnd)),void 0!==a.transferSize&&0===a.transferSize)?!0:!1:!1}
function Dt(){var a=window.location.protocol,b=Z.getEntriesByType("resource");b=fb(b,function(c){return 0===c.name.indexOf(a+"//fonts.gstatic.com/s/")});
(b=hb(b,function(c,d){return d.duration>c.duration?d:c},{duration:0}))&&0<b.startTime&&0<b.responseEnd&&(zt("wffs",st(b.startTime)),zt("wffe",st(b.responseEnd)))}
function Et(a){var b=Ft("aft",a);if(b)return b;b=S((a||"")+"TIMING_AFT_KEYS",["ol"]);for(var c=b.length,d=0;d<c;d++){var e=Ft(b[d],a);if(e)return e}return NaN}
function Ft(a,b){if(a=Ws(b)[a])return"number"===typeof a?a:a[a.length-1]}
function At(a){var b=Ft("_start",a),c=Et(a);b&&c&&!ut&&(yo(kt,new jt(Math.round(c-b),a)),ut=!0)}
function Gt(a,b){for(var c=v(Object.keys(b)),d=c.next();!d.done;d=c.next())if(d=d.value,!Object.keys(a).includes(d)||"object"===typeof b[d]&&!Gt(a[d],b[d]))return!1;return!0}
function Ht(){if(Z.getEntriesByType){var a=Z.getEntriesByType("paint");if(a=ib(a,function(b){return"first-paint"===b.name}))return st(a.startTime)}a=Z.timing;
return a.we?Math.max(0,a.we):0}
;function It(a,b){Rk(function(){at("").info.actionType=a;b&&Nk("TIMING_AFT_KEYS",b);Nk("TIMING_ACTION",a);var c=S("TIMING_INFO",{}),d;for(d in c)c.hasOwnProperty(d)&&wt(d,c[d]);c={isNavigation:!0,actionType:bt[S("TIMING_ACTION")]||"LATENCY_ACTION_UNKNOWN"};if(d=S("PREVIOUS_ACTION"))c.previousAction=bt[d]||"LATENCY_ACTION_UNKNOWN";if(d=S("CLIENT_PROTOCOL"))c.httpProtocol=d;if(d=S("CLIENT_TRANSPORT"))c.transportProtocol=d;(d=Or())&&"UNDEFINED_CSN"!==d&&(c.clientScreenNonce=d);d=Bt();if(1===d||-1===d)c.isVisible=
!0;Vs();Us();c.loadType="cold";d=Us();var e=rt(),f=tt(),g=S("CSI_START_TIMESTAMP_MILLIS",0);0<g&&!T("embeds_web_enable_csi_start_override_killswitch")&&(f=g);f&&(zt("srt",e.responseStart),1!==d.prerender&&zt("_start",f,void 0));d=Ht();0<d&&zt("fpt",d);d=rt();d.isPerformanceNavigationTiming&&xt({performanceNavigationTiming:!0});zt("nreqs",d.requestStart,void 0);zt("nress",d.responseStart,void 0);zt("nrese",d.responseEnd,void 0);0<d.redirectEnd-d.redirectStart&&(zt("nrs",d.redirectStart,void 0),zt("nre",
d.redirectEnd,void 0));0<d.domainLookupEnd-d.domainLookupStart&&(zt("ndnss",d.domainLookupStart,void 0),zt("ndnse",d.domainLookupEnd,void 0));0<d.connectEnd-d.connectStart&&(zt("ntcps",d.connectStart,void 0),zt("ntcpe",d.connectEnd,void 0));d.secureConnectionStart>=tt()&&0<d.connectEnd-d.secureConnectionStart&&(zt("nstcps",d.secureConnectionStart,void 0),zt("ntcpe",d.connectEnd,void 0));Z&&"getEntriesByType"in Z&&Dt();d=[];if(document.querySelector&&Z&&Z.getEntriesByName)for(var h in vt)vt.hasOwnProperty(h)&&
(e=vt[h],Ct(h,e)&&d.push(e));if(0<d.length)for(c.resourceInfo=[],h=v(d),d=h.next();!d.done;d=h.next())c.resourceInfo.push({resourceCache:d.value});xt(c);c=Us();h=Ys();if("cold"===Vs().loadType&&("cold"===c.yt_lt||"cold"===h.loadType)){d=Ws();e=Xs();e=e.gelTicks?e.gelTicks:e.gelTicks={};for(var k in d)if(!(k in e))if("number"===typeof d[k])zt(k,Ft(k));else if(T("log_repeated_ytcsi_ticks"))for(f=v(d[k]),g=f.next();!g.done;g=f.next())g=g.value,zt(k.slice(1),g);k={};d=!1;e=v(Object.keys(c));for(f=e.next();!f.done;f=
e.next())f=f.value,(f=ht(f,c[f]))&&!Gt(Ys(),f)&&(Os(h,f),Os(k,f),d=!0);d&&xt(k)}D("ytglobal.timingready_",!0);k=S("TIMING_ACTION");E("ytglobal.timingready_")&&k&&Jt()&&Et()&&At()})()}
function Kt(a,b,c,d){Rk(wt)(a,b,c,d)}
function Lt(a,b,c){return Rk(zt)(a,b,c)}
function Jt(){return Rk(function(){return"_start"in Ws()})()}
function Mt(){Rk(function(){var a=Zs();requestAnimationFrame(function(){setTimeout(function(){a===Zs()&&Lt("ol",void 0,void 0)},0)})})()}
var Nt=window;Nt.ytcsi&&(Nt.ytcsi.info=Kt,Nt.ytcsi.tick=Lt);var Ot="tokens consistency mss client_location entities adblock_detection response_received_commands store PLAYER_PRELOAD".split(" "),Pt=["type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.BrowseResponse"];function Qt(a,b,c,d){this.j=a;this.Y=b;this.m=c;this.l=d;this.i=void 0;this.h=new Map;a.kb||(a.kb={});a.kb=Object.assign({},Gs,a.kb)}
function Rt(a,b,c,d){if(void 0!==Qt.h){if(d=Qt.h,a=[a!==d.j,b!==d.Y,c!==d.m,!1,!1,!1,void 0!==d.i],a.some(function(e){return e}))throw new im("InnerTubeTransportService is already initialized",a);
}else Qt.h=new Qt(a,b,c,d)}
function St(a){var b={signalServiceEndpoint:{signal:"GET_DATASYNC_IDS"}};var c=void 0===c?Pl:c;var d=ys(b,a.j);if(!d)return Kf(new im("Error: No request builder found for command.",b));var e=d.m(b,void 0,c);return e?(Ns(e.input),new Ef(function(f){var g,h,k;return A(function(l){if(1==l.h){h="cors"===(null==(g=e.ib)?void 0:g.mode)?"cors":void 0;if(a.m.Te){var n=e.config,p;n=null==n?void 0:null==(p=n.Ub)?void 0:p.sessionIndex;p=Ol(0,{sessionIndex:n});k=Object.assign({},Tt(h),p);return l.v(2)}return l.yield(Ut(e.config,
h),3)}2!=l.h&&(k=l.i);f(Vt(a,e,k));l.h=0})})):Kf(new im("Error: Failed to build request for command.",b))}
function Wt(a,b,c){var d;if(b&&!(null==b?0:null==(d=b.Rf)?0:d.Vf)&&a.l){d=v(Ot);for(var e=d.next();!e.done;e=d.next())e=e.value,a.l[e]&&a.l[e].handleResponse(b,c)}}
function Vt(a,b,c){var d,e,f,g,h,k,l,n,p,t,r,x,y,z,H,I,L,P,J,W,aa,da,qa,na,Fa,Eg,nq,oq,pq;return A(function(ja){switch(ja.h){case 1:ja.v(2);break;case 3:if((d=ja.i)&&!d.isExpired())return ja.return(Promise.resolve(d.h()));case 2:if(!(null==(e=b)?0:null==(f=e.Na)?0:f.context)){ja.v(4);break}g=b.Na.context;ja.v(5);break;case 5:h=v([]),k=h.next();case 7:if(k.done){ja.v(4);break}l=k.value;return ja.yield(l.Of(g),8);case 8:k=h.next();ja.v(7);break;case 4:if(null==(n=a.i)||!n.Sf(b.input,b.Na)){ja.v(11);
break}return ja.yield(a.i.Lf(b.input,b.Na),12);case 12:return p=ja.i,T("kevlar_process_local_innertube_responses_killswitch")||Wt(a,p,b),ja.return(p);case 11:return(x=null==(r=b.config)?void 0:r.Pa)&&a.h.has(x)&&T("web_memoize_inflight_requests")?t=a.h.get(x):(y=JSON.stringify(b.Na),I=null!=(H=null==(z=b.ib)?void 0:z.headers)?H:{},b.ib=Object.assign({},b.ib,{headers:Object.assign({},I,c)}),L=Object.assign({},b.ib),"POST"===b.ib.method&&(L=Object.assign({},L,{body:y})),(null==(P=b.config)?0:P.De)&&
Lt(b.config.De),J=function(){return a.Y.fetch(b.input,L,b.config)},t=J(),x&&a.h.set(x,t)),ja.yield(t,13);
case 13:if((W=ja.i)&&"error"in W&&(null==(aa=W)?0:null==(da=aa.error)?0:da.details))for(qa=W.error.details,na=v(qa),Fa=na.next();!Fa.done;Fa=na.next())Eg=Fa.value,(nq=Eg["@type"])&&-1<Pt.indexOf(nq)&&(delete Eg["@type"],W=Eg);x&&a.h.has(x)&&a.h.delete(x);(null==(oq=b.config)?0:oq.Ee)&&Lt(b.config.Ee);if(W||null==(pq=a.i)||!pq.Df(b.input,b.Na)){ja.v(14);break}return ja.yield(a.i.Kf(b.input,b.Na),15);case 15:W=ja.i;case 14:return Wt(a,W,b),ja.return(W||void 0)}})}
function Ut(a,b){var c,d,e,f;return A(function(g){if(1==g.h){e=null==(c=a)?void 0:null==(d=c.Ub)?void 0:d.sessionIndex;var h=g.yield;var k=Jf(Ol(0,{sessionIndex:e}));return h.call(g,k,2)}f=g.i;return g.return(Promise.resolve(Object.assign({},Tt(b),f)))})}
function Tt(a){var b={"Content-Type":"application/json"};S("EOM_VISITOR_DATA")?b["X-Goog-EOM-Visitor-Id"]=S("EOM_VISITOR_DATA"):S("VISITOR_DATA")&&(b["X-Goog-Visitor-Id"]=S("VISITOR_DATA"));b["X-Youtube-Bootstrap-Logged-In"]=S("LOGGED_IN",!1);"cors"!==a&&((a=S("INNERTUBE_CONTEXT_CLIENT_NAME"))&&(b["X-Youtube-Client-Name"]=a),(a=S("INNERTUBE_CONTEXT_CLIENT_VERSION"))&&(b["X-Youtube-Client-Version"]=a),(a=S("CHROME_CONNECTED_HEADER"))&&(b["X-Youtube-Chrome-Connected"]=a),(a=S("DOMAIN_ADMIN_STATE"))&&
(b["X-Youtube-Domain-Admin-State"]=a));return b}
;var Xt=new zq("INNERTUBE_TRANSPORT_TOKEN");var Yt=["share/get_web_player_share_panel"],Zt=["feedback"],$t=["notification/modify_channel_preference"],au=["browse/edit_playlist"],bu=["subscription/subscribe"],cu=["subscription/unsubscribe"];function du(){}
w(du,Ds);du.prototype.j=function(){return bu};
du.prototype.h=function(a){return V(a,Ek)||void 0};
du.prototype.i=function(a,b,c){c=void 0===c?{}:c;b.channelIds&&(a.channelIds=b.channelIds);b.siloName&&(a.siloName=b.siloName);b.params&&(a.params=b.params);c.botguardResponse&&(a.botguardResponse=c.botguardResponse);c.feature&&(a.clientFeature=c.feature)};
fa.Object.defineProperties(du.prototype,{l:{configurable:!0,enumerable:!0,get:function(){return!0}}});function eu(){}
w(eu,Ds);eu.prototype.j=function(){return cu};
eu.prototype.h=function(a){return V(a,Dk)||void 0};
eu.prototype.i=function(a,b){b.channelIds&&(a.channelIds=b.channelIds);b.siloName&&(a.siloName=b.siloName);b.params&&(a.params=b.params)};
fa.Object.defineProperties(eu.prototype,{l:{configurable:!0,enumerable:!0,get:function(){return!0}}});function fu(){}
w(fu,Ds);fu.prototype.j=function(){return Zt};
fu.prototype.h=function(a){return V(a,yk)||void 0};
fu.prototype.i=function(a,b,c){a.feedbackTokens=[];b.feedbackToken&&a.feedbackTokens.push(b.feedbackToken);if(b=b.cpn||c.cpn)a.feedbackContext={cpn:b};a.isFeedbackTokenUnencrypted=!!c.is_feedback_token_unencrypted;a.shouldMerge=!1;c.extra_feedback_tokens&&(a.shouldMerge=!0,a.feedbackTokens=a.feedbackTokens.concat(c.extra_feedback_tokens))};
fa.Object.defineProperties(fu.prototype,{l:{configurable:!0,enumerable:!0,get:function(){return!0}}});function gu(){}
w(gu,Ds);gu.prototype.j=function(){return $t};
gu.prototype.h=function(a){return V(a,Ck)||void 0};
gu.prototype.i=function(a,b){b.params&&(a.params=b.params);b.secondaryParams&&(a.secondaryParams=b.secondaryParams)};function hu(){}
w(hu,Ds);hu.prototype.j=function(){return au};
hu.prototype.h=function(a){return V(a,Bk)||void 0};
hu.prototype.i=function(a,b){b.actions&&(a.actions=b.actions);b.params&&(a.params=b.params);b.playlistId&&(a.playlistId=b.playlistId)};function iu(){}
w(iu,Ds);iu.prototype.j=function(){return Yt};
iu.prototype.h=function(a){return V(a,Ak)};
iu.prototype.i=function(a,b,c){c=void 0===c?{}:c;b.serializedShareEntity&&(a.serializedSharedEntity=b.serializedShareEntity);c.includeListId&&(a.includeListId=!0)};var ju=new zq("NETWORK_SLI_TOKEN");function ku(a){this.h=a}
ku.prototype.fetch=function(a,b){var c=this,d,e,f;return A(function(g){c.h&&(d=sc(tc(5,Hc(a,"key")))||"/UNKNOWN_PATH",c.h.start(d));e=b;T("wug_networking_gzip_request")&&(e=Qo(b));f=new window.Request(a,e);return T("web_fetch_promise_cleanup_killswitch")?g.return(Promise.resolve(fetch(f).then(function(h){return c.handleResponse(h)}).catch(function(h){wr(h)}))):g.return(fetch(f).then(function(h){return c.handleResponse(h)}).catch(function(h){wr(h)}))})};
ku.prototype.handleResponse=function(a){var b=a.text().then(function(c){return JSON.parse(c.replace(")]}'",""))});
a.redirected||a.ok?this.h&&this.h.success():(this.h&&this.h.Gf(),b=b.then(function(c){wr(new im("Error: API fetch failed",a.status,a.url,c));return Object.assign({},c,{errorMetadata:{status:a.status}})}));
return b};
ku[yq]=[new Aq(ju)];var lu=new zq("NETWORK_MANAGER_TOKEN");var mu;function nu(){var a=ou,b=pu,c=qu;this.l=ru;this.navigate=a;this.i=b;this.j=c;this.h=new Set}
function su(a,b,c){if(tu(b))uu(a,b,c);else{var d=a.l(b,c);if(null==c?0:c.sc)d.sc=c.sc;0===d.type?a.navigate?vu(d.command)?wu(a,d.command)||(b=a.navigate(d)||[],Nf(b).then(function(){a.h.delete(d.command)})):vr(Error("Error: Command handler page requests need to specify a url.")):vr(Error("Error: Command handler navigate function was called but not set.")):1===d.type?a.i?wu(a,d.command)||(b=a.i(d),Nf(b).then(function(){a.h.delete(d.command)})):vr(Error("Error: Command handler handle service request function was called but not set.")):
2===d.type&&(a.j?a.j(d):vr(Error("Error: Command handler send action was called but not set.")))}}
function wu(a,b){if(a.h.has(b))return!0;a.h.add(b);return!1}
function tu(a){var b=!!V(a,rk),c;a="CLIENT_SIGNAL"===(null==(c=V(a,wk))?void 0:c.signal);return b||a}
function uu(a,b,c){var d=V(b,rk);if(d)var e=(null==d?void 0:d.commands)||[];else{var f;if("CLIENT_SIGNAL"===(null==(f=V(b,wk))?void 0:f.signal)){var g;e=(null==(g=V(b,wk))?void 0:g.actions)||[]}}if(e)for(b=v(e),e=b.next();!e.done;e=b.next()){e=e.value;try{su(a,e,c)}catch(h){h instanceof Error&&vr(h)}}else vr(Error("Could not handle the meta command."))}
function vu(a){var b;return!(null==(b=V(null==a?void 0:a.commandMetadata,vk))||!b.url)}
;function xu(){var a,b,c;return A(function(d){if(1==d.h)return a=Fq().resolve(Xt),a?d.yield(St(a),2):(wr(Error("InnertubeTransportService unavailable in fetchDatasyncIds")),d.return(void 0));if(b=d.i){if(b.errorMetadata)return wr(Error("Datasync IDs fetch responded with "+b.errorMetadata.status+": "+b.error)),d.return(void 0);c=b.Ef;return d.return(c)}wr(Error("Network request to get Datasync IDs failed."));return d.return(void 0)})}
;var yu=C.caches,zu;function Au(a){var b=a.indexOf(":");return-1===b?{sd:a}:{sd:a.substring(0,b),datasyncId:a.substring(b+1)}}
function Bu(){return A(function(a){if(void 0!==zu)return a.return(zu);zu=new Promise(function(b){var c;return A(function(d){switch(d.h){case 1:return za(d,2),d.yield(yu.open("test-only"),4);case 4:return d.yield(yu.delete("test-only"),5);case 5:Aa(d,3);break;case 2:if(c=Ba(d),c instanceof Error&&"SecurityError"===c.name)return b(!1),d.return();case 3:b("caches"in window),d.h=0}})});
return a.return(zu)})}
function Cu(a){var b,c,d,e,f,g,h;A(function(k){if(1==k.h)return k.yield(Bu(),2);if(3!=k.h){if(!k.i)return k.return(!1);b=[];return k.yield(yu.keys(),3)}c=k.i;d=v(c);for(e=d.next();!e.done;e=d.next())f=e.value,g=Au(f),h=g.datasyncId,!h||a.includes(h)||b.push(yu.delete(f));return k.return(Promise.all(b).then(function(l){return l.some(function(n){return n})}))})}
function Du(){var a,b,c,d,e,f,g;return A(function(h){if(1==h.h)return h.yield(Bu(),2);if(3!=h.h){if(!h.i)return h.return(!1);a=km("cache contains other");return h.yield(yu.keys(),3)}b=h.i;c=v(b);for(d=c.next();!d.done;d=c.next())if(e=d.value,f=Au(e),(g=f.datasyncId)&&g!==a)return h.return(!0);return h.return(!1)})}
;function Eu(){xu().then(function(a){a&&(Qn(a),Cu(a),Ls(a))})}
function Fu(){var a=new Ip;ni.la(function(){var b,c,d,e;return A(function(f){switch(f.h){case 1:if(T("ytidb_clear_optimizations_killswitch")){f.v(2);break}b=km("clear");if(b.startsWith("V")&&b.endsWith("||")){var g=[b];Qn(g);Cu(g);Ls(g);return f.return()}c=Ms();return f.yield(Du(),3);case 3:return d=f.i,f.yield(Rn(),4);case 4:if(e=f.i,!c&&!d&&!e)return f.return();case 2:a.sa()?Eu():a.l.add("publicytnetworkstatus-online",Eu,!0,void 0,void 0),f.h=0}})})}
;var Sh=ia(["data-"]);function Gu(a){a&&(a.dataset?a.dataset[Hu("loaded")]="true":Rh(a))}
function Iu(a,b){return a?a.dataset?a.dataset[Hu(b)]:a.getAttribute("data-"+b):null}
var Ju={};function Hu(a){return Ju[a]||(Ju[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
;var Ku=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,Lu=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function Mu(a,b,c){c=void 0===c?null:c;if(window.spf&&spf.script){c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(Ku,""),c=c.replace(Lu,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else Nu(a,b,c)}
function Nu(a,b,c){c=void 0===c?null:c;var d=Ou(a),e=document.getElementById(d),f=e&&Iu(e,"loaded"),g=e&&!f;f?b&&b():(b&&(f=sq(d,b),b=""+Ra(b),Pu[b]=f),g||(e=Qu(a,d,function(){if(!Iu(e,"loaded")){Gu(e);vq(d);var h=Xa(wq,d);ll(h,0)}},c)))}
function Qu(a,b,c,d){d=void 0===d?null:d;var e=rf("SCRIPT");e.id=b;e.onload=function(){c&&setTimeout(c,0)};
e.onreadystatechange=function(){switch(e.readyState){case "loaded":case "complete":e.onload()}};
d&&e.setAttribute("nonce",d);Vh(e,nk(a));a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(e,a.firstChild);return e}
function Ru(a){a=Ou(a);var b=document.getElementById(a);b&&(wq(a),b.parentNode.removeChild(b))}
function Su(a,b){a&&b&&(a=""+Ra(b),(a=Pu[a])&&uq(a))}
function Ou(a){var b=document.createElement("a");lc(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+qc(a)}
var Pu={};var Tu=[],Uu=!1;function Vu(){if(!T("disable_biscotti_fetch_for_ad_blocker_detection")&&!T("disable_biscotti_fetch_entirely_for_all_web_clients")&&as()){var a=S("PLAYER_VARS",{});if("1"!=qb(a)&&!bs(a)){var b=function(){Uu=!0;"google_ad_status"in window?Nk("DCLKSTAT",1):Nk("DCLKSTAT",2)};
try{Mu("//static.doubleclick.net/instream/ad_status.js",b)}catch(c){}Tu.push(ni.la(function(){if(!(Uu||"google_ad_status"in window)){try{Su("//static.doubleclick.net/instream/ad_status.js",b)}catch(c){}Uu=!0;Nk("DCLKSTAT",3)}},5E3))}}}
function Wu(){var a=Number(S("DCLKSTAT",0));return isNaN(a)?0:a}
;var Xu=window;function Yu(){var a,b;return"h5vcc"in Xu&&(null==(a=Xu.h5vcc.traceEvent)?0:a.traceBegin)&&(null==(b=Xu.h5vcc.traceEvent)?0:b.traceEnd)?1:"performance"in Xu&&Xu.performance.mark&&Xu.performance.measure?2:0}
function Zu(a){switch(Yu()){case 1:Xu.h5vcc.traceEvent.traceBegin("YTLR",a);break;case 2:Xu.performance.mark(a+"-start");break;case 0:break;default:Th()}}
function $u(a){switch(Yu()){case 1:Xu.h5vcc.traceEvent.traceEnd("YTLR",a);break;case 2:var b=a+"-start",c=a+"-end";Xu.performance.mark(c);Xu.performance.measure(a,b,c);break;case 0:break;default:Th()}}
;var av=T("web_enable_lifecycle_monitoring")&&0!==Yu();function bv(a){var b=this;var c=void 0===c?0:c;var d=void 0===d?qm():d;this.j=c;this.scheduler=d;this.i=new Ih;this.h=a;for(a={ab:0};a.ab<this.h.length;a={Gb:a.Gb,ab:a.ab},a.ab++)a.Gb=this.h[a.ab],c=function(e){return function(){e.Gb.Fc();b.h[e.ab].jc=!0;b.h.every(function(f){return!0===f.jc})&&b.i.resolve()}}(a),d=this.getPriority(a.Gb),d=nm(c,d),this.h[a.ab]=Object.assign({},a.Gb,{Fc:c,
jobId:d})}
function cv(a){var b=Array.from(a.h.keys()).sort(function(d,e){return a.getPriority(a.h[e])-a.getPriority(a.h[d])});
b=v(b);for(var c=b.next();!c.done;c=b.next())c=a.h[c.value],void 0===c.jobId||c.jc||(a.scheduler.Fa(c.jobId),nm(c.Fc,10))}
bv.prototype.cancel=function(){for(var a=v(this.h),b=a.next();!b.done;b=a.next())b=b.value,void 0===b.jobId||b.jc||this.scheduler.Fa(b.jobId),b.jc=!0;this.i.resolve()};
bv.prototype.getPriority=function(a){var b;return null!=(b=a.priority)?b:this.j};function dv(a){this.state=a;this.plugins=[];this.s=void 0;this.T={};av&&Zu(this.state)}
m=dv.prototype;m.install=function(a){this.plugins.push(a);return this};
m.uninstall=function(){var a=this;B.apply(0,arguments).forEach(function(b){b=a.plugins.indexOf(b);-1<b&&a.plugins.splice(b,1)})};
m.transition=function(a,b){var c=this;av&&$u(this.state);var d=this.transitions.find(function(f){return Array.isArray(f.from)?f.from.find(function(g){return g===c.state&&f.to===a}):f.from===c.state&&f.to===a});
if(d){this.j&&(cv(this.j),this.j=void 0);ev(this,a,b);this.state=a;av&&Zu(this.state);d=d.action.bind(this);var e=this.plugins.filter(function(f){return f[a]}).map(function(f){return f[a]});
d(fv(this,e),b)}else throw Error("no transition specified from "+this.state+" to "+a);};
function fv(a,b){var c=b.filter(function(e){return 10===gv(a,e)}),d=b.filter(function(e){return 10!==gv(a,e)});
return a.T.Tf?function(){var e=B.apply(0,arguments);return A(function(f){if(1==f.h)return f.yield(a.Fe.apply(a,[c].concat(ka(e))),2);a.Bd.apply(a,[d].concat(ka(e)));f.h=0})}:function(){var e=B.apply(0,arguments);
a.Ge.apply(a,[c].concat(ka(e)));a.Bd.apply(a,[d].concat(ka(e)))}}
m.Ge=function(a){var b=B.apply(1,arguments);qm();for(var c={},d=v(a),e=d.next();!e.done;c={nb:c.nb},e=d.next())c.nb=e.value,om(function(f){return function(){hv(f.nb.name);f.nb.callback.apply(f.nb,ka(b));iv(f.nb.name)}}(c))};
m.Fe=function(a){var b=B.apply(1,arguments),c,d,e,f;return A(function(g){1==g.h&&(qm(),c={},d=v(a),e=d.next());if(3!=g.h){if(e.done)return g.v(0);c.bb=e.value;c.Eb=void 0;f=function(h){return function(){hv(h.bb.name);var k=h.bb.callback.apply(h.bb,ka(b));"function"===typeof(null==k?void 0:k.then)?h.Eb=k.then(function(){iv(h.bb.name)}):iv(h.bb.name)}}(c);
om(f);return c.Eb?g.yield(c.Eb,3):g.v(3)}c={bb:c.bb,Eb:c.Eb};e=d.next();return g.v(2)})};
m.Bd=function(a){var b=B.apply(1,arguments),c=this,d=a.map(function(e){return{Fc:function(){hv(e.name);e.callback.apply(e,ka(b));iv(e.name)},
priority:gv(c,e)}});
d.length&&(this.j=new bv(d))};
function gv(a,b){var c,d;return null!=(d=null!=(c=a.s)?c:b.priority)?d:0}
function hv(a){av&&a&&Zu(a)}
function iv(a){av&&a&&$u(a)}
function ev(a,b,c){av&&console.groupCollapsed&&console.groupEnd&&(console.groupCollapsed("["+a.constructor.name+"] '"+a.state+"' to '"+b+"'"),console.log("with message: ",c),console.groupEnd())}
fa.Object.defineProperties(dv.prototype,{currentState:{configurable:!0,enumerable:!0,get:function(){return this.state}}});function jv(a){dv.call(this,void 0===a?"document_active":a);var b=this;this.s=10;this.h=new Map;this.transitions=[{from:"document_active",to:"document_disposed_preventable",action:this.ka},{from:"document_active",to:"document_disposed",action:this.l},{from:"document_disposed_preventable",to:"document_disposed",action:this.l},{from:"document_disposed_preventable",to:"flush_logs",action:this.m},{from:"document_disposed_preventable",to:"document_active",action:this.i},{from:"document_disposed",to:"flush_logs",
action:this.m},{from:"document_disposed",to:"document_active",action:this.i},{from:"document_disposed",to:"document_disposed",action:function(){}},
{from:"flush_logs",to:"document_active",action:this.i}];window.addEventListener("pagehide",function(c){b.transition("document_disposed",{event:c})});
window.addEventListener("beforeunload",function(c){b.transition("document_disposed_preventable",{event:c})})}
w(jv,dv);jv.prototype.ka=function(a,b){if(!this.h.get("document_disposed_preventable")){a(null==b?void 0:b.event);var c,d;if((null==b?0:null==(c=b.event)?0:c.defaultPrevented)||(null==b?0:null==(d=b.event)?0:d.returnValue)){b.event.returnValue||(b.event.returnValue=!0);b.event.defaultPrevented||b.event.preventDefault();this.h=new Map;this.transition("document_active");return}}this.h.set("document_disposed_preventable",!0);this.h.get("document_disposed")?this.transition("flush_logs"):this.transition("document_disposed")};
jv.prototype.l=function(a,b){this.h.get("document_disposed")?this.transition("document_active"):(a(null==b?void 0:b.event),this.h.set("document_disposed",!0),this.transition("flush_logs"))};
jv.prototype.m=function(a,b){a(null==b?void 0:b.event);this.transition("document_active")};
jv.prototype.i=function(){this.h=new Map};function kv(a){dv.call(this,void 0===a?"document_visibility_unknown":a);var b=this;this.transitions=[{from:"document_visibility_unknown",to:"document_visible",action:this.i},{from:"document_visibility_unknown",to:"document_hidden",action:this.h},{from:"document_visibility_unknown",to:"document_foregrounded",action:this.m},{from:"document_visibility_unknown",to:"document_backgrounded",action:this.l},{from:"document_visible",to:"document_hidden",action:this.h},{from:"document_visible",to:"document_foregrounded",
action:this.m},{from:"document_visible",to:"document_visible",action:this.i},{from:"document_foregrounded",to:"document_visible",action:this.i},{from:"document_foregrounded",to:"document_hidden",action:this.h},{from:"document_foregrounded",to:"document_foregrounded",action:this.m},{from:"document_hidden",to:"document_visible",action:this.i},{from:"document_hidden",to:"document_backgrounded",action:this.l},{from:"document_hidden",to:"document_hidden",action:this.h},{from:"document_backgrounded",to:"document_hidden",
action:this.h},{from:"document_backgrounded",to:"document_backgrounded",action:this.l},{from:"document_backgrounded",to:"document_visible",action:this.i}];document.addEventListener("visibilitychange",function(c){"visible"===document.visibilityState?b.transition("document_visible",{event:c}):b.transition("document_hidden",{event:c})});
T("visibility_lifecycles_dynamic_backgrounding")&&(window.addEventListener("blur",function(c){b.transition("document_backgrounded",{event:c})}),window.addEventListener("focus",function(c){b.transition("document_foregrounded",{event:c})}))}
w(kv,dv);kv.prototype.i=function(a,b){a(null==b?void 0:b.event);T("visibility_lifecycles_dynamic_backgrounding")&&this.transition("document_foregrounded")};
kv.prototype.h=function(a,b){a(null==b?void 0:b.event);T("visibility_lifecycles_dynamic_backgrounding")&&this.transition("document_backgrounded")};
kv.prototype.l=function(a,b){a(null==b?void 0:b.event)};
kv.prototype.m=function(a,b){a(null==b?void 0:b.event)};function lv(){this.l=new jv;this.m=new kv}
lv.prototype.install=function(){var a=B.apply(0,arguments),b=this;a.forEach(function(c){b.l.install(c)});
a.forEach(function(c){b.m.install(c)})};function mv(a){so.call(this,1,arguments);this.csn=a}
w(mv,so);var Bo=new to("screen-created",mv),nv=[],ov=0;function pv(a,b,c,d){var e=d.filter(function(h){h.csn!==b?(h.csn=b,h=!0):h=!1;return h}),f={cttAuthInfo:Qr(b)||void 0,
sequenceGroup:b};d=v(d);for(var g=d.next();!g.done;g=d.next())g=g.value.getAsJson(),(ob(g)||!g.trackingParams&&!g.veType)&&wr(Error("Child VE logged with no data"));c={csn:b,parentVe:c.getAsJson(),childVes:gb(e,function(h){return h.getAsJson()})};
"UNDEFINED_CSN"===b?qv("visualElementAttached",f,c):a?or("visualElementAttached",c,a,f):Bm("visualElementAttached",c,f)}
function qv(a,b,c){nv.push({payloadName:a,payload:c,Jf:void 0,options:b});ov||(ov=Co())}
function Do(a){if(nv){for(var b=v(nv),c=b.next();!c.done;c=b.next())c=c.value,c.payload&&(c.payload.csn=a.csn,Bm(c.payloadName,c.payload,c.options));nv.length=0}ov=0}
;function rv(){this.l=[];this.i=new Map;this.h=new Map;this.j=new Set}
rv.prototype.clickCommand=function(a,b,c){var d=a.clickTrackingParams;c=void 0===c?0:c;if(d)if(c=Or(void 0===c?0:c)){a=this.client;var e=new Gr({trackingParams:d});d={cttAuthInfo:Qr(c)||void 0,sequenceGroup:c};e={csn:c,ve:e.getAsJson(),gestureType:"INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK"};b&&(e.clientData=b);"UNDEFINED_CSN"===c?qv("visualElementGestured",d,e):a?or("visualElementGestured",e,a,d):Bm("visualElementGestured",e,d);b=!0}else b=!1;else b=!1;return b};
rv.prototype.visualElementStateChanged=function(a,b,c){c=void 0===c?0:c;if(0===c&&this.j.has(c))this.l.push([a,b]);else{var d=c;d=void 0===d?0:d;c=Or(d);a||(a=(a=Lr(void 0===d?0:d))?new Gr({veType:a,youtubeData:void 0,jspbYoutubeData:void 0}):null);var e=a;c&&e&&(a=this.client,d={cttAuthInfo:Qr(c)||void 0,sequenceGroup:c},b={csn:c,ve:e.getAsJson(),clientData:b},"UNDEFINED_CSN"===c?qv("visualElementStateChanged",d,b):a?or("visualElementStateChanged",b,a,d):Bm("visualElementStateChanged",b,d))}};
function sv(a,b){if(void 0===b)for(var c=Nr(),d=0;d<c.length;d++)void 0!==c[d]&&sv(a,c[d]);else a.i.forEach(function(e,f){(f=a.h.get(f))&&pv(a.client,b,f,e)}),a.i.clear(),a.h.clear(),a.m=void 0}
;function tv(){lv.call(this);var a={};this.install((a.document_disposed={callback:this.h},a));T("combine_ve_grafts")&&(a={},this.install((a.document_disposed={callback:this.i},a)));a={};this.install((a.flush_logs={callback:this.j},a))}
w(tv,lv);tv.prototype.j=function(){Bm("finalPayload",{csn:Or()})};
tv.prototype.h=function(){Ar(Br)};
tv.prototype.i=function(){var a=sv;rv.h||(rv.h=new rv);a(rv.h)};function uv(){}
function vv(){var a=E("ytglobal.storage_");a||(a=new uv,D("ytglobal.storage_",a));return a}
uv.prototype.estimate=function(){var a,b,c;return A(function(d){a=navigator;return(null==(b=a.storage)?0:b.estimate)?d.return(a.storage.estimate()):(null==(c=a.webkitTemporaryStorage)?0:c.queryUsageAndQuota)?d.return(wv()):d.return()})};
function wv(){var a=navigator;return new Promise(function(b,c){var d;null!=(d=a.webkitTemporaryStorage)&&d.queryUsageAndQuota?a.webkitTemporaryStorage.queryUsageAndQuota(function(e,f){b({usage:e,quota:f})},function(e){c(e)}):c(Error("webkitTemporaryStorage is not supported."))})}
D("ytglobal.storageClass_",uv);function zm(a,b){var c=this;this.handleError=a;this.h=b;this.i=!1;void 0===self.document||self.addEventListener("beforeunload",function(){c.i=!0});
this.j=Math.random()<=gl("ytidb_transaction_ended_event_rate_limit_session",.2)}
zm.prototype.logEvent=function(a,b){switch(a){case "IDB_DATA_CORRUPTED":T("idb_data_corrupted_killswitch")||this.h("idbDataCorrupted",b);break;case "IDB_UNEXPECTEDLY_CLOSED":this.h("idbUnexpectedlyClosed",b);break;case "IS_SUPPORTED_COMPLETED":T("idb_is_supported_completed_killswitch")||this.h("idbIsSupportedCompleted",b);break;case "QUOTA_EXCEEDED":xv(this,b);break;case "TRANSACTION_ENDED":this.j&&Math.random()<=gl("ytidb_transaction_ended_event_rate_limit_transaction",.1)&&this.h("idbTransactionEnded",
b);break;case "TRANSACTION_UNEXPECTEDLY_ABORTED":a=Object.assign({},b,{hasWindowUnloaded:this.i}),this.h("idbTransactionAborted",a)}};
function xv(a,b){vv().estimate().then(function(c){c=Object.assign({},b,{isSw:void 0===self.document,isIframe:self!==self.top,deviceStorageUsageMbytes:yv(null==c?void 0:c.usage),deviceStorageQuotaMbytes:yv(null==c?void 0:c.quota)});a.h("idbQuotaExceeded",c)})}
function yv(a){return"undefined"===typeof a?"-1":String(Math.ceil(a/1048576))}
;function zv(a){this.args=void 0===a?null:a;this.returnValue=[]}
;var Av=new Map;function Bv(a,b){if(!a)return null;a=Object.keys(a);a=v(a);for(var c=a.next();!c.done;c=a.next()){c=c.value;var d=c.toLowerCase();if(-1<d.indexOf(b,d.length-b.length))return c}return null}
;function Cv(a,b,c){var d;d||(d={bubbles:!0,cancelable:!1,composed:!0});null!==c&&void 0!==c&&(d.detail=c);b=new CustomEvent(b,d);a.dispatchEvent(b)}
;function Dv(a,b){b=new zv(b);Cv(a,"yt-action",b);return b.returnValue}
function Ev(a,b,c,d){b&&b.length&&b.forEach(function(e){var f=Bv(e,"action")||Bv(e,"command")||Bv(e,"endpoint");if(f){var g="yt"+f;var h=Av.get(g);h?g=h:(f="yt-"+f.replace(/([A-Z])/g,"-$1").toLowerCase(),Av.set(g,f),g=f);V(e,uk)&&(g+="-"+V(e,uk).signal.toLowerCase().replace(/_/g,"-"))}else g=null;g&&(T("handle_service_request_actions")&&e.commandMetadata&&e.commandMetadata.webCommandMetadata&&e.commandMetadata.webCommandMetadata.sendPost?c&&T("use_source_element_if_present_for_actions")?Fv(c,[e]):
Fv(a,[e]):Dv(a,[e,c,d]))})}
function Fv(a,b){var c=[a];b&&c.push.apply(c,b);b=Dv(a,c);return 0<b.length&&(b=b[0],Cv(a,"yt-service-request-sent",b),b&&b.ajaxPromise)?(b.ajaxPromise.then(function(d){Cv(a,"yt-service-request-completed",d)},function(d){Cv(a,"yt-service-request-error",{error:d,
params:c})},a),b.ajaxPromise):Jf()}
;function ru(a,b,c){b=void 0===b?{}:b;var d,e=null==(d=V(a.commandMetadata,vk))?void 0:d.url;d=b.form||{};!c||d.element||d.skipDefaultElement||(b.form=b.form||{},b.form.element=c);if(e&&"/service_ajax"!==e)return{type:0,command:a,form:b.form};if(T("kevlar_service_command_check")){if(c=Fq().resolve(Xt),xs(a,c.j))return Object.assign({},{type:1,command:a},b)}else{var f;if(null==(f=V(a.commandMetadata,vk))?0:f.apiUrl)return Object.assign({},{type:1,command:a},b)}return{type:2,command:a,form:b.form}}
function pu(a){if(a.form){var b=a.form,c=Object.assign({},b);b=b.element;c=(delete c.element,c);if(b)return[Fv(b,[a.command,c,a.sc])]}return[]}
function qu(a){if(a.form){var b=a.form,c=Object.assign({},b);b=b.element;c=(delete c.element,c);b&&Ev(b,[a.command],b,c)}}
;function Gv(a,b,c){M.call(this);var d=this;c=c||S("POST_MESSAGE_ORIGIN")||window.document.location.protocol+"//"+window.document.location.hostname;this.j=b||null;this.targetOrigin="*";this.l=c;this.sessionId=null;this.channel="widget";this.M=!!a;this.A=function(e){a:if(!("*"!=d.l&&e.origin!=d.l||d.j&&e.source!=d.j||"string"!==typeof e.data)){try{var f=JSON.parse(e.data)}catch(g){break a}if(!(null==f||d.M&&(d.sessionId&&d.sessionId!=f.id||d.channel&&d.channel!=f.channel))&&f)switch(f.event){case "listening":"null"!=
e.origin&&(d.l=d.targetOrigin=e.origin);d.j=e.source;d.sessionId=f.id;d.i&&(d.i(),d.i=null);break;case "command":d.m&&(!d.s||0<=db(d.s,f.func))&&d.m(f.func,f.args,e.origin)}}};
this.s=this.i=this.m=null;window.addEventListener("message",this.A)}
w(Gv,M);Gv.prototype.sendMessage=function(a,b){if(b=b||this.j){this.sessionId&&(a.id=this.sessionId);this.channel&&(a.channel=this.channel);try{var c=JSON.stringify(a);b.postMessage(c,this.targetOrigin)}catch(d){Tk(d)}}};
Gv.prototype.K=function(){window.removeEventListener("message",this.A);M.prototype.K.call(this)};function Hv(){this.i=[];this.isReady=!1;this.j={};var a=this.h=new Gv(!!S("WIDGET_ID_ENFORCE")),b=this.Ae.bind(this);a.m=b;a.s=null;this.h.channel="widget";if(a=S("WIDGET_ID"))this.h.sessionId=a}
m=Hv.prototype;m.Ae=function(a,b,c){"addEventListener"===a&&b?this.Ec(b[0],c):this.Uc(a,b,c)};
m.Uc=function(){};
m.yc=function(a){var b=this;return function(c){return b.sendMessage(a,c)}};
m.Ec=function(a,b){this.j[a]||"onReady"===a||(this.addEventListener(a,this.yc(a,b)),this.j[a]=!0)};
m.addEventListener=function(){};
m.ce=function(){this.isReady=!0;this.sendMessage("initialDelivery",this.Bc());this.sendMessage("onReady");eb(this.i,this.zd,this);this.i=[]};
m.Bc=function(){return null};
function Iv(a,b){a.sendMessage("infoDelivery",b)}
m.zd=function(a){this.isReady?this.h.sendMessage(a):this.i.push(a)};
m.sendMessage=function(a,b){this.zd({event:a,info:void 0===b?null:b})};
m.dispose=function(){this.h=null};var Jv={},Kv=(Jv["api.invalidparam"]=2,Jv.auth=150,Jv["drm.auth"]=150,Jv["heartbeat.net"]=150,Jv["heartbeat.servererror"]=150,Jv["heartbeat.stop"]=150,Jv["html5.unsupportedads"]=5,Jv["fmt.noneavailable"]=5,Jv["fmt.decode"]=5,Jv["fmt.unplayable"]=5,Jv["html5.missingapi"]=5,Jv["html5.unsupportedlive"]=5,Jv["drm.unavailable"]=5,Jv["mrm.blocked"]=151,Jv);var Lv=new Set("endSeconds startSeconds mediaContentUrl suggestedQuality videoId rct rctn".split(" "));function Mv(a){return(0===a.search("cue")||0===a.search("load"))&&"loadModule"!==a}
function Nv(a,b,c){if("string"===typeof a)return{videoId:a,startSeconds:b,suggestedQuality:c};b={};c=v(Lv);for(var d=c.next();!d.done;d=c.next())d=d.value,a[d]&&(b[d]=a[d]);return b}
function Ov(a,b,c,d){if(Qa(a)&&!Array.isArray(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}b={index:b,startSeconds:c,suggestedQuality:d};"string"===typeof a&&16===a.length?b.list="PL"+a:b.playlist=a;return b}
;function Pv(a){Hv.call(this);this.listeners=[];this.l=!1;this.api=a;this.addEventListener("onReady",this.onReady.bind(this));this.addEventListener("onVideoProgress",this.Me.bind(this));this.addEventListener("onVolumeChange",this.Ne.bind(this));this.addEventListener("onApiChange",this.He.bind(this));this.addEventListener("onPlaybackQualityChange",this.Je.bind(this));this.addEventListener("onPlaybackRateChange",this.Ke.bind(this));this.addEventListener("onStateChange",this.Le.bind(this));this.addEventListener("onWebglSettingsChanged",
this.Oe.bind(this))}
w(Pv,Hv);m=Pv.prototype;
m.Uc=function(a,b,c){if(this.api.isExternalMethodAvailable(a,c)){b=b||[];if(0<b.length&&Mv(a)){var d=b;if(Qa(d[0])&&!Array.isArray(d[0]))var e=d[0];else switch(e={},a){case "loadVideoById":case "cueVideoById":e=Nv(d[0],void 0!==d[1]?Number(d[1]):void 0,d[2]);break;case "loadVideoByUrl":case "cueVideoByUrl":e=d[0];"string"===typeof e&&(e={mediaContentUrl:e,startSeconds:void 0!==d[1]?Number(d[1]):void 0,suggestedQuality:d[2]});b:{if((d=e.mediaContentUrl)&&(d=/\/([ve]|embed)\/([^#?]+)/.exec(d))&&d[2]){d=
d[2];break b}d=null}e.videoId=d;e=Nv(e);break;case "loadPlaylist":case "cuePlaylist":e=Ov(d[0],d[1],d[2],d[3])}b.length=1;b[0]=e}this.api.handleExternalCall(a,b,c);Mv(a)&&Iv(this,this.Bc())}};
m.Ec=function(a,b){"onReady"===a?this.api.logApiCall(a+" invocation",b):"onError"===a&&this.l&&(this.api.logApiCall(a+" invocation",b,this.errorCode),this.errorCode=void 0);this.api.logApiCall(a+" registration",b);Hv.prototype.Ec.call(this,a,b)};
m.yc=function(a,b){var c=this,d=Hv.prototype.yc.call(this,a,b);return function(e){"onError"===a?c.api.logApiCall(a+" invocation",b,e):c.api.logApiCall(a+" invocation",b);d(e)}};
m.onReady=function(){var a=this.ce.bind(this);this.h.i=a;a=this.api.getVideoData();if(!a.isPlayable){this.l=!0;a=a.errorCode;var b=void 0===b?5:b;this.errorCode=a?Kv[a]||b:b;this.sendMessage("onError",this.errorCode.toString())}};
m.addEventListener=function(a,b){this.listeners.push({eventType:a,listener:b});this.api.addEventListener(a,b)};
m.Bc=function(){if(!this.api)return null;var a=this.api.getApiInterface();jb(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c];if(0===e.search("get")||0===e.search("is")){var f=0;0===e.search("get")?f=3:0===e.search("is")&&(f=2);f=e.charAt(f).toLowerCase()+e.substr(f+1);try{var g=this.api[e]();b[f]=g}catch(h){}}}b.videoData=this.api.getVideoData();b.currentTimeLastUpdated_=Date.now()/1E3;return b};
m.Le=function(a){a={playerState:a,currentTime:this.api.getCurrentTime(),duration:this.api.getDuration(),videoData:this.api.getVideoData(),videoStartBytes:0,videoBytesTotal:this.api.getVideoBytesTotal(),videoLoadedFraction:this.api.getVideoLoadedFraction(),playbackQuality:this.api.getPlaybackQuality(),availableQualityLevels:this.api.getAvailableQualityLevels(),currentTimeLastUpdated_:Date.now()/1E3,playbackRate:this.api.getPlaybackRate(),mediaReferenceTime:this.api.getMediaReferenceTime()};this.api.getVideoUrl&&
(a.videoUrl=this.api.getVideoUrl());this.api.getVideoContentRect&&(a.videoContentRect=this.api.getVideoContentRect());this.api.getProgressState&&(a.progressState=this.api.getProgressState());this.api.getPlaylist&&(a.playlist=this.api.getPlaylist());this.api.getPlaylistIndex&&(a.playlistIndex=this.api.getPlaylistIndex());this.api.getStoryboardFormat&&(a.storyboardFormat=this.api.getStoryboardFormat());Iv(this,a)};
m.Je=function(a){Iv(this,{playbackQuality:a})};
m.Ke=function(a){Iv(this,{playbackRate:a})};
m.He=function(){for(var a=this.api.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.api.getOptions(e);a.join(", ");b[e]={options:f};for(var g=0,h=f.length;g<h;g++){var k=f[g],l=this.api.getOption(e,k);b[e][k]=l}}this.sendMessage("apiInfoDelivery",b)};
m.Ne=function(){Iv(this,{muted:this.api.isMuted(),volume:this.api.getVolume()})};
m.Me=function(a){a={currentTime:a,videoBytesLoaded:this.api.getVideoBytesLoaded(),videoLoadedFraction:this.api.getVideoLoadedFraction(),currentTimeLastUpdated_:Date.now()/1E3,playbackRate:this.api.getPlaybackRate(),mediaReferenceTime:this.api.getMediaReferenceTime()};this.api.getProgressState&&(a.progressState=this.api.getProgressState());Iv(this,a)};
m.Oe=function(){var a={sphericalProperties:this.api.getSphericalProperties()};Iv(this,a)};
m.dispose=function(){Hv.prototype.dispose.call(this);for(var a=0;a<this.listeners.length;a++){var b=this.listeners[a];this.api.removeEventListener(b.eventType,b.listener)}this.listeners=[]};function Qv(a){M.call(this);this.i={};this.started=!1;this.connection=a;this.connection.subscribe("command",this.vd,this)}
w(Qv,M);m=Qv.prototype;m.start=function(){this.started||this.h()||(this.started=!0,this.connection.jb("RECEIVING"))};
m.jb=function(a,b){this.started&&!this.h()&&this.connection.jb(a,b)};
m.vd=function(a,b,c){if(this.started&&!this.h()){var d=b||{};switch(a){case "addEventListener":"string"===typeof d.event&&this.addListener(d.event);break;case "removeEventListener":"string"===typeof d.event&&this.removeListener(d.event);break;default:this.api.isReady()&&this.api.isExternalMethodAvailable(a,c||null)&&(b=Rv(a,b||{}),c=this.api.handleExternalCall(a,b,c||null),(c=Sv(a,c))&&this.jb(a,c))}}};
m.addListener=function(a){if(!(a in this.i)){var b=this.Ie.bind(this,a);this.i[a]=b;this.addEventListener(a,b)}};
m.Ie=function(a,b){this.started&&!this.h()&&this.connection.jb(a,this.Ac(a,b))};
m.Ac=function(a,b){if(null!=b)return{value:b}};
m.removeListener=function(a){a in this.i&&(this.removeEventListener(a,this.i[a]),delete this.i[a])};
m.K=function(){var a=this.connection;a.h()||Ki(a.i,"command",this.vd,this);this.connection=null;for(var b in this.i)this.i.hasOwnProperty(b)&&this.removeListener(b);M.prototype.K.call(this)};function Tv(a,b){Qv.call(this,b);this.api=a;this.start()}
w(Tv,Qv);Tv.prototype.addEventListener=function(a,b){this.api.addEventListener(a,b)};
Tv.prototype.removeEventListener=function(a,b){this.api.removeEventListener(a,b)};
function Rv(a,b){switch(a){case "loadVideoById":return a=Nv(b),[a];case "cueVideoById":return a=Nv(b),[a];case "loadVideoByPlayerVars":return[b];case "cueVideoByPlayerVars":return[b];case "loadPlaylist":return a=Ov(b),[a];case "cuePlaylist":return a=Ov(b),[a];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];case "setLoop":return[b.loopPlaylists];
case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey,b.ctrlKey,b.altKey,b.metaKey,b.key,b.code]}return[]}
function Sv(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
Tv.prototype.Ac=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return Qv.prototype.Ac.call(this,a,b)};
Tv.prototype.K=function(){Qv.prototype.K.call(this);delete this.api};function Uv(a){a=void 0===a?!1:a;M.call(this);this.i=new N(a);De(this,this.i)}
Ya(Uv,M);Uv.prototype.subscribe=function(a,b,c){return this.h()?0:this.i.subscribe(a,b,c)};
Uv.prototype.m=function(a,b){this.h()||this.i.cb.apply(this.i,arguments)};function Vv(a,b,c){Uv.call(this);this.l=a;this.j=b;this.id=c}
w(Vv,Uv);Vv.prototype.jb=function(a,b){this.h()||this.l.jb(this.j,this.id,a,b)};
Vv.prototype.K=function(){this.j=this.l=null;Uv.prototype.K.call(this)};function Wv(a,b,c){M.call(this);this.i=a;this.origin=c;this.j=cq(window,"message",this.l.bind(this));this.connection=new Vv(this,a,b);De(this,this.connection)}
w(Wv,M);Wv.prototype.jb=function(a,b,c,d){this.h()||a!==this.i||(a={id:b,command:c},d&&(a.data=d),this.i.postMessage(JSON.stringify(a),this.origin))};
Wv.prototype.l=function(a){if(!this.h()&&a.origin===this.origin){var b=a.data;if("string"===typeof b){try{b=JSON.parse(b)}catch(d){return}if(b.command){var c=this.connection;c.h()||c.m("command",b.command,b.data,a.origin)}}}};
Wv.prototype.K=function(){dq(this.j);this.i=null;M.prototype.K.call(this)};function Xv(){this.state=1;this.h=null}
m=Xv.prototype;m.initialize=function(a,b,c){if(a.program){var d,e=null!=(d=a.interpreterUrl)?d:null;if(a.interpreterSafeScript){d=a.interpreterSafeScript.privateDoNotAccessOrElseSafeScriptWrappedValue||"";var f=xb();d=f?f.createScript(d):d;d=new Cb(d,Bb)}else d=null!=(f=a.interpreterScript)?f:null;a.interpreterSafeUrl&&(e=a.interpreterSafeUrl,Ab("From proto message. b/166824318"),e=Gb(e.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue||"").toString());Yv(this,d,e,a.program,b,c)}else wr(Error("Cannot initialize botguard without program"))};
function Yv(a,b,c,d,e,f){var g=void 0===g?"trayride":g;c?(a.state=2,Mu(c,function(){window[g]?Zv(a,d,g,e):(a.state=3,Ru(c),wr(new im("Unable to load Botguard","from "+c)))},f)):b?(f=rf("SCRIPT"),b instanceof Cb?(b instanceof Cb&&b.constructor===Cb?b=b.j:(Oa(b),b="type_error:SafeScript"),f.textContent=b,Uh(f)):f.textContent=b,f.nonce=oc(),document.head.appendChild(f),document.head.removeChild(f),window[g]?Zv(a,d,g,e):(a.state=4,wr(new im("Unable to load Botguard from JS")))):wr(new im("Unable to load VM; no url or JS provided"))}
function Zv(a,b,c,d){a.state=5;try{var e=new Jh({program:b,he:c,Be:T("att_web_record_metrics")});e.Qe.then(function(){a.state=6;d&&d(b)});
a.Pc(e)}catch(f){a.state=7,f instanceof Error&&wr(f)}}
m.invoke=function(a){a=void 0===a?{}:a;return this.Sc()?this.Id({dd:a}):null};
m.dispose=function(){this.Vc()};
m.Vc=function(){this.Pc(null);this.state=8};
m.Sc=function(){return!!this.h};
m.Id=function(a){return this.h.Cd(a)};
m.Pc=function(a){Be(this.h);this.h=a};function $v(){var a=E("yt.abuse.playerAttLoader");return a&&["bgvma","bgvmb","bgvmc"].every(function(b){return b in a})?a:null}
;function aw(){Xv.apply(this,arguments)}
w(aw,Xv);aw.prototype.Vc=function(){this.state=8};
aw.prototype.Pc=function(a){var b;null==(b=$v())||b.bgvma();a?(b={bgvma:a.dispose.bind(a),bgvmb:a.snapshot.bind(a),bgvmc:a.Cd.bind(a)},D("yt.abuse.playerAttLoader",b),D("yt.abuse.playerAttLoaderRun",function(c){return a.snapshot(c)})):(D("yt.abuse.playerAttLoader",null),D("yt.abuse.playerAttLoaderRun",null))};
aw.prototype.Sc=function(){return!!$v()};
aw.prototype.Id=function(a){return $v().bgvmc(a)};var bw=new aw;function cw(){return bw.Sc()}
function dw(a){a=void 0===a?{}:a;return bw.invoke(a)}
;function ew(a){a=a||{};var b={},c={};this.url=a.url||"";this.args=a.args||sb(b);this.assets=a.assets||{};this.attrs=a.attrs||sb(c);this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
ew.prototype.clone=function(){var a=new ew,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];"object"==Oa(c)?a[b]=sb(c):a[b]=c}return a};var fw=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;function gw(a){a=a||"";if(window.spf){var b=a.match(fw);spf.style.load(a,b?b[1]:"",void 0)}else hw(a)}
function hw(a){var b=iw(a),c=document.getElementById(b),d=c&&Iu(c,"loaded");d||c&&!d||(c=jw(a,b,function(){if(!Iu(c,"loaded")){Gu(c);vq(b);var e=Xa(wq,b);ll(e,0)}}))}
function jw(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=nk(a);mc(d,a);(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function iw(a){var b=rf("A");lc(b,new Kb(a,Pb));a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+qc(a)}
;function kw(){M.call(this);this.i=[]}
w(kw,M);kw.prototype.K=function(){for(;this.i.length;){var a=this.i.pop();a.target.removeEventListener(a.name,a.callback,void 0)}M.prototype.K.call(this)};function lw(){kw.apply(this,arguments)}
w(lw,kw);function mw(a,b,c,d,e){M.call(this);var f=this;this.A=b;this.webPlayerContextConfig=d;this.Tb=e;this.Ia=!1;this.api={};this.Da=this.s=null;this.X=new N;this.i={};this.ba=this.oa=this.elementId=this.qb=this.config=null;this.aa=!1;this.l=this.M=null;this.ya={};this.pc=["onReady"];this.lastError=null;this.Ib=NaN;this.W={};this.qc=new lw(this);this.ea=0;this.j=this.m=a;De(this,this.X);nw(this);ow(this);De(this,this.qc);c?this.ea=ll(function(){f.loadNewVideoConfig(c)},0):d&&(pw(this),qw(this))}
w(mw,M);m=mw.prototype;m.getId=function(){return this.A};
m.loadNewVideoConfig=function(a){if(!this.h()){this.ea&&(window.clearTimeout(this.ea),this.ea=0);var b=a||{};b instanceof ew||(b=new ew(b));this.config=b;this.setConfig(a);qw(this);this.isReady()&&rw(this)}};
function pw(a){var b;a.webPlayerContextConfig?b=a.webPlayerContextConfig.rootElementId:b=a.config.attrs.id;a.elementId=b||a.elementId;"video-player"===a.elementId&&(a.elementId=a.A,a.webPlayerContextConfig?a.webPlayerContextConfig.rootElementId=a.A:a.config.attrs.id=a.A);var c;(null==(c=a.j)?void 0:c.id)===a.elementId&&(a.elementId+="-player",a.webPlayerContextConfig?a.webPlayerContextConfig.rootElementId=a.elementId:a.config.attrs.id=a.elementId)}
m.setConfig=function(a){this.qb=a;this.config=sw(a);pw(this);if(!this.oa){var b;this.oa=tw(this,(null==(b=this.config.args)?void 0:b.jsapicallback)||"onYouTubePlayerReady")}this.config.args?this.config.args.jsapicallback=null:this.config.args={jsapicallback:null};var c;if(null==(c=this.config)?0:c.attrs)a=this.config.attrs,(b=a.width)&&this.j&&(this.j.style.width=ei(Number(b)||b)),(a=a.height)&&this.j&&(this.j.style.height=ei(Number(a)||a))};
function rw(a){if(a.config&&!0!==a.config.loaded)if(a.config.loaded=!0,!a.config.args||"0"!==a.config.args.autoplay&&0!==a.config.args.autoplay&&!1!==a.config.args.autoplay){var b;a.api.loadVideoByPlayerVars(null!=(b=a.config.args)?b:null)}else a.api.cueVideoByPlayerVars(a.config.args)}
function uw(a){var b=!0,c=vw(a);c&&a.config&&(a=ww(a),b=Iu(c,"version")===a);return b&&!!E("yt.player.Application.create")}
function qw(a){if(!a.h()&&!a.aa){var b=uw(a);if(b&&"html5"===(vw(a)?"html5":null))a.ba="html5",a.isReady()||xw(a);else if(yw(a),a.ba="html5",b&&a.l&&a.m)a.m.appendChild(a.l),xw(a);else{a.config&&(a.config.loaded=!0);var c=!1;a.M=function(){c=!0;var d=zw(a,"player_bootstrap_method")?E("yt.player.Application.createAlternate")||E("yt.player.Application.create"):E("yt.player.Application.create");var e=a.config?sw(a.config):void 0;d&&d(a.m,e,a.webPlayerContextConfig,a.Tb);xw(a)};
a.aa=!0;b?a.M():(Mu(ww(a),a.M),(b=Aw(a))&&gw(b),Bw(a)&&!c&&D("yt.player.Application.create",null))}}}
function vw(a){var b=qf(a.elementId);!b&&a.j&&a.j.querySelector&&(b=a.j.querySelector("#"+a.elementId));return b}
function xw(a){if(!a.h()){var b=vw(a),c=!1;b&&b.getApiInterface&&b.getApiInterface()&&(c=!0);if(c){a.aa=!1;if(!zw(a,"html5_remove_not_servable_check_killswitch")){var d;if((null==b?0:b.isNotServable)&&a.config&&(null==b?0:b.isNotServable(null==(d=a.config.args)?void 0:d.video_id)))return}Cw(a)}else a.Ib=ll(function(){xw(a)},50)}}
function Cw(a){nw(a);a.Ia=!0;var b=vw(a);if(b){a.s=Dw(a,b,"addEventListener");a.Da=Dw(a,b,"removeEventListener");var c=b.getApiInterface();c=c.concat(b.getInternalApiInterface());for(var d=a.api,e=0;e<c.length;e++){var f=c[e];d[f]||(d[f]=Dw(a,b,f))}}for(var g in a.i)a.i.hasOwnProperty(g)&&a.s&&a.s(g,a.i[g]);rw(a);a.oa&&a.oa(a.api);a.X.cb("onReady",a.api)}
function Dw(a,b,c){var d=b[c];return function(){var e=B.apply(0,arguments);try{return a.lastError=null,d.apply(b,e)}catch(f){"sendAbandonmentPing"!==c&&(f.params=c,a.lastError=f,wr(f))}}}
function nw(a){a.Ia=!1;if(a.Da)for(var b in a.i)a.i.hasOwnProperty(b)&&a.Da(b,a.i[b]);for(var c in a.W)a.W.hasOwnProperty(c)&&window.clearTimeout(Number(c));a.W={};a.s=null;a.Da=null;b=a.api;for(var d in b)b.hasOwnProperty(d)&&(b[d]=null);b.addEventListener=function(e,f){a.addEventListener(e,f)};
b.removeEventListener=function(e,f){a.removeEventListener(e,f)};
b.destroy=function(){a.dispose()};
b.getLastError=function(){return a.getLastError()};
b.getPlayerType=function(){return a.getPlayerType()};
b.getCurrentVideoConfig=function(){return a.qb};
b.loadNewVideoConfig=function(e){a.loadNewVideoConfig(e)};
b.isReady=function(){return a.isReady()}}
m.isReady=function(){return this.Ia};
function ow(a){a.addEventListener("WATCH_LATER_VIDEO_ADDED",function(b){vq("WATCH_LATER_VIDEO_ADDED",b)});
a.addEventListener("WATCH_LATER_VIDEO_REMOVED",function(b){vq("WATCH_LATER_VIDEO_REMOVED",b)})}
m.addEventListener=function(a,b){var c=this,d=tw(this,b);d&&(0<=db(this.pc,a)||this.i[a]||(b=Ew(this,a),this.s&&this.s(a,b)),this.X.subscribe(a,d),"onReady"===a&&this.isReady()&&ll(function(){d(c.api)},0))};
m.removeEventListener=function(a,b){this.h()||(b=tw(this,b))&&Ki(this.X,a,b)};
function tw(a,b){var c=b;if("string"===typeof b){if(a.ya[b])return a.ya[b];c=function(){var d=B.apply(0,arguments),e=E(b);if(e)try{e.apply(C,d)}catch(f){vr(f)}};
a.ya[b]=c}return c?c:null}
function Ew(a,b){var c="ytPlayer"+b+a.A;a.i[b]=c;C[c]=function(d){var e=ll(function(){if(!a.h()){try{a.X.cb(b,null!=d?d:void 0)}catch(h){wr(new im("PlayerProxy error when creating global callback",{error:h,event:b,playerId:a.A,data:d}))}var f=a.W,g=String(e);g in f&&delete f[g]}},0);
pb(a.W,String(e))};
return c}
m.getPlayerType=function(){return this.ba||(vw(this)?"html5":null)};
m.getLastError=function(){return this.lastError};
function yw(a){a.cancel();nw(a);a.ba=null;a.config&&(a.config.loaded=!1);var b=vw(a);b&&(uw(a)||!Bw(a)?a.l=b:(b&&b.destroy&&b.destroy(),a.l=null));if(a.m)for(a=a.m;b=a.firstChild;)a.removeChild(b)}
m.cancel=function(){this.M&&Su(ww(this),this.M);window.clearTimeout(this.Ib);this.aa=!1};
m.K=function(){yw(this);if(this.l&&this.config&&this.l.destroy)try{this.l.destroy()}catch(b){vr(b)}this.ya=null;for(var a in this.i)this.i.hasOwnProperty(a)&&(C[this.i[a]]=null);this.qb=this.config=this.api=null;delete this.m;delete this.j;M.prototype.K.call(this)};
function Bw(a){var b,c;a=null==(b=a.config)?void 0:null==(c=b.args)?void 0:c.fflags;return!!a&&-1!==a.indexOf("player_destroy_old_version=true")}
function ww(a){return a.webPlayerContextConfig?a.webPlayerContextConfig.jsUrl:(a=a.config.assets)?a.js:""}
function Aw(a){return a.webPlayerContextConfig?a.webPlayerContextConfig.cssUrl:(a=a.config.assets)?a.css:""}
function zw(a,b){if(a.webPlayerContextConfig)var c=a.webPlayerContextConfig.serializedExperimentFlags;else{var d;if(null==(d=a.config)?0:d.args)c=a.config.args.fflags}return"true"===Wk(c||"","&")[b]}
function sw(a){for(var b={},c=v(Object.keys(a)),d=c.next();!d.done;d=c.next()){d=d.value;var e=a[d];b[d]="object"===typeof e?sb(e):e}return b}
;var Fw={},Gw="player_uid_"+(1E9*Math.random()>>>0);function Hw(a,b){var c="player",d=!1;d=void 0===d?!0:d;c="string"===typeof c?qf(c):c;var e=Gw+"_"+Ra(c),f=Fw[e];if(f&&d)return Iw(a,b)?f.api.loadVideoByPlayerVars(a.args||null):f.loadNewVideoConfig(a),f.api;f=new mw(c,e,a,b,void 0);Fw[e]=f;vq("player-added",f.api);Ee(f,function(){delete Fw[f.getId()]});
return f.api}
function Iw(a,b){return b&&b.serializedExperimentFlags?b.serializedExperimentFlags.includes("web_player_remove_playerproxy=true"):a&&a.args&&a.args.fflags?a.args.fflags.includes("web_player_remove_playerproxy=true"):!1}
;var Jw=null,Kw=null,Lw=null;function Mw(){Nw()}
function Ow(){Nw()}
function Nw(){var a=Jw.getVideoData(1);a=a.title?a.title+" - YouTube":"YouTube";document.title!==a&&(document.title=a)}
function ou(a){var b,c;if(a=null==(b=a.command)?void 0:null==(c=b.urlEndpoint)?void 0:c.url)b=window,c=Nh(a),void 0!==c&&b.open(c,void 0,void 0);return[]}
function Pw(){Jw&&Jw.sendAbandonmentPing&&Jw.sendAbandonmentPing();S("PL_ATT")&&bw.dispose();for(var a=ni,b=0,c=Tu.length;b<c;b++)a.Fa(Tu[b]);Tu.length=0;Ru("//static.doubleclick.net/instream/ad_status.js");Uu=!1;Nk("DCLKSTAT",0);Ce(Lw,Kw);Jw&&(Jw.removeEventListener("onVideoDataChange",Mw),Jw.destroy())}
;function Qw(a,b,c){b=void 0===b?{}:b;c=void 0===c?!1:c;var d=S("EVENT_ID");d&&(b.ei||(b.ei=d));b&&Hs(a,b);if(c)return!1;if((window.ytspf||{}).enabled)spf.navigate(a);else{var e=void 0===e?{}:e;var f=void 0===f?"":f;var g=void 0===g?window:g;b=g.location;a=Cc(a,e)+f;var h=void 0===h?Yh:h;a:{h=void 0===h?Yh:h;for(e=0;e<h.length;++e)if(f=h[e],f instanceof Wh&&f.qe(a)){h=new Kb(a,Pb);break a}h=void 0}h=Nh(h||Qb);void 0!==h&&(b.href=h)}return!0}
;D("yt.setConfig",Nk);D("yt.config.set",Nk);D("yt.setMsg",Sr);D("yt.msgs.set",Sr);D("yt.logging.errors.log",vr);
D("writeEmbed",function(){var a=S("PLAYER_CONFIG");if(!a){var b=S("PLAYER_VARS");b&&(a={args:b})}ls(!0);"gvn"===a.args.ps&&(document.body.style.backgroundColor="transparent");a.attrs||(a.attrs={width:"100%",height:"100%",id:"video-player"});var c=document.referrer;b=S("POST_MESSAGE_ORIGIN");window!==window.top&&c&&c!==document.URL&&(a.args.loaderUrl=c);It("embed",["ol"]);c=S("WEB_PLAYER_CONTEXT_CONFIGS").WEB_PLAYER_CONTEXT_CONFIG_ID_EMBEDDED_PLAYER;if(!c.serializedForcedExperimentIds){var d=al(window.location.href);
d.forced_experiments&&(c.serializedForcedExperimentIds=d.forced_experiments)}var e;(null==(e=a.args)?0:e.autoplay)&&It("watch",["pbs","pbu","pbp"]);Jw=Hw(a,c);T("embeds_enable_server_driven_watch_again_on_youtube")&&!nu.h&&(nu.h=new nu);Jw.addEventListener("onVideoDataChange",Mw);Jw.addEventListener("onReady",Ow);T("embeds_enable_server_driven_watch_again_on_youtube")&&Jw.addEventListener("innertubeCommand",function(f){su(nu.h,f)});
a=S("POST_MESSAGE_ID","player");S("ENABLE_JS_API")?Lw=new Pv(Jw):S("ENABLE_POST_API")&&"string"===typeof a&&"string"===typeof b&&(Kw=new Wv(window.parent,a,b),Lw=new Tv(Jw,Kw.connection));Vu();T("ytidb_create_logger_embed_killswitch")||ym();a={};tv.h||(tv.h=new tv);tv.h.install((a.flush_logs={callback:function(){br()}},a));
Tp();T("ytidb_clear_embedded_player")&&ni.la(function(){var f,g;if(!mu){var h=Fq(),k={Mc:lu,Gd:ku};h.h.set(k.Mc,k);k={uc:{feedbackEndpoint:zs(fu),modifyChannelNotificationPreferenceEndpoint:zs(gu),playlistEditEndpoint:zs(hu),subscribeEndpoint:zs(du),unsubscribeEndpoint:zs(eu),webPlayerShareEntityServiceEndpoint:zs(iu)}};var l=ws(),n={};l&&(n.client_location=l);void 0===f&&(f=Nl());void 0===g&&(g=h.resolve(lu));Rt(k,g,f,n);f={Mc:Xt,Hd:Qt.h};h.h.set(f.Mc,f);mu=h.resolve(Xt)}Fu()})});
var Rw=Rk(function(){Mt();ms()}),Sw=Rk(function(a){a.persisted||(Mt(),ms())}),Tw=Rk(function(a){T("embeds_web_enable_dispose_player_if_page_not_cached_killswitch")?Pw():a.persisted||Pw()}),Uw=Rk(Pw);
window.addEventListener?(window.addEventListener("load",Rw),window.addEventListener("pageshow",Sw),window.addEventListener("pagehide",Tw)):window.attachEvent&&(window.attachEvent("onload",Rw),window.attachEvent("onunload",Uw));
window.onerror=function(a,b,c,d,e){b=void 0===b?"Unknown file":b;c=void 0===c?0:c;var f=!1,g=Ok("log_window_onerror_fraction");if(g&&Math.random()<g)f=!0;else{g=document.getElementsByTagName("script");for(var h=0,k=g.length;h<k;h++)if(0<g[h].src.indexOf("/debug-")){f=!0;break}}f&&(f=!1,e?f=!0:("string"===typeof a?g=a:ErrorEvent&&a instanceof ErrorEvent?(f=!0,g=a.message,b=a.filename,c=a.lineno,d=a.colno):(g="Unknown error",b="Unknown file",c=0),e=new im(g),e.name="UnhandledWindowError",e.message=
g,e.fileName=b,e.lineNumber=c,isNaN(d)?delete e.columnNumber:e.columnNumber=d),f?vr(e):wr(e))};
Yf=xr;window.addEventListener("unhandledrejection",function(a){xr(a.reason)});
eb(S("ERRORS")||[],function(a){vr.apply(null,a)});
Nk("ERRORS",[]);D("yt.abuse.player.botguardInitialized",E("yt.abuse.player.botguardInitialized")||cw);D("yt.abuse.player.invokeBotguard",E("yt.abuse.player.invokeBotguard")||dw);D("yt.abuse.dclkstatus.checkDclkStatus",E("yt.abuse.dclkstatus.checkDclkStatus")||Wu);D("yt.player.exports.navigate",E("yt.player.exports.navigate")||Qw);D("yt.util.activity.init",E("yt.util.activity.init")||hq);D("yt.util.activity.getTimeSinceActive",E("yt.util.activity.getTimeSinceActive")||kq);
D("yt.util.activity.setTimestamp",E("yt.util.activity.setTimestamp")||iq);}).call(this);
