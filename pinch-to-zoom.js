/* quo.js */                (function(){"use strict";var t;t=function(){var t,e,n,r,o,u,l,i,c,a,f,s,d,p,y,h,m;return r=[],i=Object.prototype,l=/^\s*<(\w+|!)[^>]*>/,n=[1,9,11],e=/^\.([\w-]+)$/,u=/^#[\w\d-]+$/,f=/^[\w-]+$/,c=document.createElement("table"),a=document.createElement("tr"),o={tr:document.createElement("tbody"),tbody:c,thead:c,tfoot:c,td:a,th:a,"*":document.createElement("div")},t=function(e,n){var r;return e?"function"===t.toType(e)?t(document).ready(e):(r=y(e,n),h(r,e)):h()},t.query=function(t,n){var r;return e.test(n)?r=t.getElementsByClassName(n.replace(".","")):f.test(n)?r=t.getElementsByTagName(n):u.test(n)&&t===document?(r=t.getElementById(n.replace("#","")),r||(r=[])):r=t.querySelectorAll(n),r.nodeType?[r]:Array.prototype.slice.call(r)},t.extend=function(t){return Array.prototype.slice.call(arguments,1).forEach(function(e){var n,r;r=[];for(n in e)r.push(t[n]=e[n]);return r}),t},t.toType=function(t){return i.toString.call(t).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()},t.each=function(e,n){var r,o,u,l,i;if(o=void 0,u=void 0,"array"===t.toType(e))for(o=l=0,i=e.length;i>l;o=++l)r=e[o],n.call(r,o,r)===!1;else for(u in e)n.call(e[u],u,e[u])===!1;return e},t.map=function(e,n){var r,o,u,l;if(l=[],r=void 0,o=void 0,"array"===t.toType(e))for(r=0;r<e.length;)u=n(e[r],r),null!=u&&l.push(u),r++;else for(o in e)u=n(e[o],o),null!=u&&l.push(u);return d(l)},t.mix=function(){var t,e,n,r,o;for(n={},t=0,r=arguments.length;r>t;){e=arguments[t];for(o in e)m(e,o)&&void 0!==e[o]&&(n[o]=e[o]);t++}return n},h=function(t,e){return null==e&&(e=""),t=t||r,t.selector=e,t.__proto__=h.prototype,t},y=function(e,r){var o,u;return o=null,u=t.toType(e),"array"===u?o=s(e):"string"===u&&l.test(e)?(o=p(e.trim(),RegExp.$1),e=null):"string"===u?(o=t.query(document,e),r&&(o=1===o.length?t.query(o[0],r):t.map(function(){return t.query(o,r)}))):(n.indexOf(e.nodeType)>=0||e===window)&&(o=[e],e=null),o},p=function(e,n){var r;return null==n&&(n="*"),n in o||(n="*"),r=o[n],r.innerHTML=""+e,t.each(Array.prototype.slice.call(r.childNodes),function(){return r.removeChild(this)})},s=function(t){return t.filter(function(t){return null!=t?t:void 0})},d=function(t){return t.length>0?r.concat.apply(r,t):t},m=function(t,e){return i.hasOwnProperty.call(t,e)},h.prototype=t.fn={},t.fn.each=function(t){return this.forEach(function(e,n){return t.call(e,n,e)}),this},t.fn.filter=function(e){return t(r.filter.call(this,function(n){return n.parentNode&&t.query(n.parentNode,e).indexOf(n)>=0}))},t.fn.forEach=r.forEach,t.fn.indexOf=r.indexOf,t.version="3.0.6",t}(),this.Quo=t}).call(this);
/* quo.environment.js */    (function(){"use strict";!function(i){var n,e,r,o,t,a;return r=null,n=/WebKit\/([\d.]+)/,e={Android:/(Android)\s+([\d.]+)/,ipad:/(iPad).*OS\s([\d_]+)/,iphone:/(iPhone\sOS)\s([\d_]+)/,Blackberry:/(BlackBerry|BB10|Playbook).*Version\/([\d.]+)/,FirefoxOS:/(Mozilla).*Mobile[^\/]*\/([\d\.]*)/,webOS:/(webOS|hpwOS)[\s\/]([\d.]+)/},i.isMobile=function(){return this.environment(),r.isMobile},i.environment=function(){var i,n;return r||(n=navigator.userAgent,i=t(n),r={browser:o(n),isMobile:!!i,screen:a(),os:i}),r},o=function(i){var e;return e=i.match(n),e?e[0]:i},t=function(i){var n,r,o;for(r in e)if(o=i.match(e[r])){n={name:"iphone"===r||"ipad"===r||"ipod"===r?"ios":r,version:o[2].replace("_",".")};break}return n},a=function(){return{width:window.innerWidth,height:window.innerHeight}}}(Quo)}).call(this);
/* quo.events.js */         (function(){"use strict";!function(n){var t,e,r,u,i,o,c,a,l,f,d,s,v;return t=1,u={},r={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"},e={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touch:"click",orientationchange:"resize"},i=/complete|loaded|interactive/,n.fn.on=function(t,e,r){return null==e||"function"===n.toType(e)?this.bind(t,e):this.delegate(e,t,r)},n.fn.off=function(t,e,r){return null==e||"function"===n.toType(e)?this.unbind(t,e):this.undelegate(e,t,r)},n.fn.ready=function(t){return i.test(document.readyState)?t.call(this,n):n.fn.addEvent(document,"DOMContentLoaded",function(){return t.call(this,n)})},n.fn.bind=function(n,t){return this.forEach(function(e){return s(e,n,t)})},n.fn.unbind=function(n,t){return this.each(function(){return v(this,n,t)})},n.fn.delegate=function(t,e,r){return this.each(function(u,i){return s(i,e,r,t,function(e){return function(r){var u,c;return c=n(r.target).closest(t,i).get(0),c?(u=n.extend(o(r),{currentTarget:c,liveFired:i}),e.apply(c,[u].concat([].slice.call(arguments,1)))):void 0}})})},n.fn.undelegate=function(n,t,e){return this.each(function(){return v(this,t,e,n)})},n.fn.trigger=function(t,e,r){return"string"===n.toType(t)&&(t=l(t,e)),null!=r&&(t.originalEvent=r),this.each(function(){return this.dispatchEvent(t)})},n.fn.addEvent=function(n,t,e){return n.addEventListener?n.addEventListener(t,e,!1):n.attachEvent?n.attachEvent("on"+t,e):n["on"+t]=e},n.fn.removeEvent=function(n,t,e){return n.removeEventListener?n.removeEventListener(t,e,!1):n.detachEvent?n.detachEvent("on"+t,e):n["on"+t]=null},l=function(n,t){var e;return e=document.createEvent("Events"),e.initEvent(n,!0,!0,null,null,null,null,null,null,null,null,null,null,null,null),t&&(e.touch=t),e},s=function(t,e,r,i,o){var l,f,s,v;return e=a(e),s=d(t),f=u[s]||(u[s]=[]),l=o&&o(r,e),v={event:e,callback:r,selector:i,proxy:c(l,r,t),delegate:l,index:f.length},f.push(v),n.fn.addEvent(t,v.event,v.proxy)},v=function(t,e,r,i){var o;return e=a(e),o=d(t),f(o,e,r,i).forEach(function(e){return delete u[o][e.index],n.fn.removeEvent(t,e.event,e.proxy)})},d=function(n){return n._id||(n._id=t++)},a=function(t){var r;return r=("function"==typeof n.isMobile?n.isMobile():void 0)?t:e[t],r||t},c=function(n,t,e){var r;return t=n||t,r=function(n){var r;return r=t.apply(e,[n].concat(n.data)),r===!1&&n.preventDefault(),r}},f=function(n,t,e,r){return(u[n]||[]).filter(function(n){return!(!n||t&&n.event!==t||e&&n.callback!==e||r&&n.selector!==r)})},o=function(t){var e;return e=n.extend({originalEvent:t},t),n.each(r,function(n,r){return e[n]=function(){return this[r]=function(){return!0},t[n].apply(t,arguments)},e[r]=function(){return!1}}),e}}(Quo)}).call(this);
/* quo.gestures.js */       (function(){"use strict";var t=[].indexOf||function(t){for(var n=0,e=this.length;e>n;n++)if(n in this&&this[n]===t)return n;return-1};Quo.Gestures=function(n){var e,r,u,i,a,l,o,d,c,s,g,h,f,v;return v=!1,s={},o=null,h=null,a=["input","select","textarea"],e=function(t){return s[t.name]=t.handler,u(t.events)},r=function(t,e,r){return n(t).trigger(e,r,h)},f=function(n){var e;return e=(n.srcElement||n.target).tagName.toLowerCase(),t.call(a,e)>=0?n.stopPropagation():(v=!0,h=n||event,o=d(n),c("start",n.target,o))},g=function(t){return v?(h=t||event,o=d(t),o.length>1&&h.preventDefault(),c("move",t.target,o)):void 0},l=function(t){return v?(h=t||event,c("end",t.target,o),v=!1):void 0},i=function(){return v=!1,c("cancel")},u=function(t){return t.forEach(function(t){return n.fn[t]=function(e){return n(document.body).delegate(this.selector,t,e)}}),this},c=function(t,n,e){var r,u,i;i=[];for(u in s)r=s[u],r[t]&&i.push(r[t].call(r,n,e));return i},d=function(t){var n,e,r,u,i;for(u=t.touches||[t],i=[],e=0,r=u.length;r>e;e++)n=u[e],i.push({x:n.pageX,y:n.pageY});return i},n(document).ready(function(){var t;return t=n(document.body),t.bind("touchstart",f),t.bind("touchmove",g),t.bind("touchend",l),t.bind("touchcancel",i)}),{add:e,trigger:r}}(Quo),Quo.Gestures.add({name:"basic",events:["touch","hold","doubleTap"],handler:function(t){var n,e,r,u,i,a,l,o,d,c,s,g;return e=15,n={TAP:200,DOUBLE_TAP:400,HOLD:400},o=null,g=!0,s=null,c=null,d=null,a=function(e,u){return 1===u.length?(c={time:new Date,x:u[0].x,y:u[0].y},s=e,o=setTimeout(function(){return t.trigger(e,"hold",u[0])},n.HOLD)):r()},i=function(t,n){var u;return null!==c&&(u=l(c,n[0]),u.x>e||u.y>e||n.length>1)?r():void 0},u=function(e,u){var i,a;if(c)return i=l(c,u[0]),0!==i.x||0!==i.y?r():(clearTimeout(o),a=new Date,a-c.time<n.TAP?a-d<n.DOUBLE_TAP?(t.trigger(e,"doubleTap",u[0]),d=null):(d=a,t.trigger(e,"touch",u[0])):void 0)},r=function(){return c=null,g=!1,clearTimeout(o)},l=function(t,n){var e;return e={x:n.x-t.x,y:n.y-t.y}},{start:a,move:i,end:u,cancel:r}}(Quo.Gestures)}),Quo.Gestures.add({name:"drag",events:["drag","dragging"],handler:function(t){var n,e,r,u,i,a,l,o,d,c,s,g;return n=window.devicePixelRatio>=2?15:20,g=null,c=null,s=null,d=null,i=function(t,n){return n.length>=2?(g=t,c=n.length,s=a(n)):void 0},u=function(t,n){var e;return n.length===c?(e=l(n),d={touches:n,delta:e},o(!0)):void 0},e=r=function(){return s&&d?(o(!1),c=null,s=null,d=null):void 0},l=function(t){var n;return n=a(t),{x:n.x-s.x,y:n.y-s.y}},a=function(t){var n,e,r,u,i;for(e=0,r=0,u=0,i=t.length;i>u;u++)n=t[u],e+=parseInt(n.x),r+=parseInt(n.y);return{x:e/t.length,y:r/t.length}},o=function(e){return e?t.trigger(g,"dragging",d):Math.abs(d.delta.x)>n||Math.abs(d.delta.y)>n?t.trigger(g,"drag",d):void 0},{start:i,move:u,end:r}}(Quo.Gestures)}),Quo.Gestures.add({name:"pinch",events:["pinch","pinching","pinchIn","pinchOut"],handler:function(t){var n,e,r,u,i,a,l,o,d,c;return n=window.devicePixelRatio>=2?15:20,c=null,d=null,o=null,i=function(t,n){return 2===n.length?(c=t,d=l(n[0],n[1])):void 0},u=function(t,n){var e;return d&&2===n.length?(e=l(n[0],n[1]),o={touches:n,delta:e-d},a(!0)):void 0},e=r=function(){return d&&o?(a(!1),d=null,o=null):void 0},l=function(t,n){return Math.sqrt((n.x-t.x)*(n.x-t.x)+(n.y-t.y)*(n.y-t.y))},a=function(e){var r;return e?t.trigger(c,"pinching",o):Math.abs(o.delta)>n?(t.trigger(c,"pinch",o),r=o.delta>0?"pinchOut":"pinchIn",t.trigger(c,r,o)):void 0},{start:i,move:u,end:r}}(Quo.Gestures)}),Quo.Gestures.add({name:"rotation",events:["rotate","rotating","rotateLeft","rotateRight"],handler:function(t){var n,e,r,u,i,a,l,o,d,c,s,g,h;return n=5,e=20,h=null,d=0,g=null,o=null,a=function(t,n){return 2===n.length?(h=t,d=0,g=c(n[0],n[1])):void 0},i=function(t,n){var r;return g&&2===n.length?(r=c(n[0],n[1])-g,o&&Math.abs(o.delta-r)>e&&(r+=360*s(o.delta)),Math.abs(r)>360&&(d++,r-=360*s(o.delta)),o={touches:n,delta:r,rotationsCount:d},l(!0)):void 0},r=u=function(){return g&&o?(l(!1),h=null,d=0,g=null,o=null,g=null):void 0},s=function(t){return 0>t?-1:1},c=function(t,n){var e;return e=Math.atan2(t.y-n.y,t.x-n.x),180*(0>e?e+2*Math.PI:e)/Math.PI},l=function(e){var r;return e?t.trigger(h,"rotating",o):Math.abs(o.delta)>n?(t.trigger(h,"rotate",o),r=o.delta>0?"rotateRight":"rotateLeft",t.trigger(h,r,o)):void 0},{start:a,move:i,end:u}}(Quo.Gestures)}),Quo.Gestures.add({name:"swipe",events:["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","swiping","swipingHorizontal","swipingVertical"],handler:function(t){var n,e,r,u,i,a,l,o,d,c,s;return n=Math.round(20/window.devicePixelRatio),s=null,d=null,c=null,o=null,i=function(t,n){return 1===n.length?(s=t,d=n[0],o=null):void 0},u=function(t,n){var e,r;return 1===n.length?(e={x:n[0].x-d.x,y:n[0].y-d.y},r=null===o,o={x:n[0].x,y:n[0].y,delta:e},a(!0,r)):o=null},e=r=function(t,n){var e;return null==o&&n.length>=1&&(e={x:n[0].x-d.x,y:n[0].y-d.y},o={x:n[0].x,y:n[0].y,delta:e}),o?(a(!1),o=null):void 0},a=function(e,r){var u,i,a,d,g;if(null==r&&(r=!1),e)return r&&(c=l(o.delta.x,o.delta.y)),null!==c&&t.trigger(s,"swiping"+c,o),t.trigger(s,"swiping",o);if(i=[],Math.abs(o.delta.y)>n?i.push(o.delta.y<0?"Up":"Down"):Math.abs(o.delta.x)>n&&i.push(o.delta.x<0?"Left":"Right"),i.length){for(t.trigger(s,"swipe",o),g=[],a=0,d=i.length;d>a;a++)u=i[a],g.push(t.trigger(s,"swipe"+u,o));return g}},l=function(t,n){var e;return e=null,Math.round(Math.abs(t/n))>=2?e="Horizontal":Math.round(Math.abs(n/t))>=2&&(e="Vertical"),e},{start:i,move:u,end:r}}(Quo.Gestures)})}).call(this);
/* quo.query.js */          (function(){"use strict";!function(n){var t,r,i,e;return t="parentNode",n.fn.find=function(t){var r;return r=1===this.length?Quo.query(this[0],t):this.map(function(){return Quo.query(this,t)}),n(r)},n.fn.parent=function(n){var e;return e=n?i(this):this.instance(t),r(e,n)},n.fn.children=function(n){var t;return t=this.map(function(){return Array.prototype.slice.call(this.children)}),r(t,n)},n.fn.siblings=function(n){var t;return t=this.map(function(n,t){return Array.prototype.slice.call(t.parentNode.children).filter(function(n){return n!==t})}),r(t,n)},n.fn.get=function(n){return this[n]||null},n.fn.first=function(){return n(this[0])},n.fn.last=function(){return n(this[this.length-1])},n.fn.closest=function(t,r){var i,e;for(e=this[0],i=n(t),i.length||(e=null);e&&i.indexOf(e)<0;)e=e!==r&&e!==document&&e.parentNode;return n(e)},n.fn.next=function(){return e.call(this,"nextSibling")},n.fn.prev=function(){return e.call(this,"previousSibling")},n.fn.instance=function(n){return this.map(function(){return this[n]})},n.fn.map=function(t){return n.map(this,function(n,r){return t.call(n,r,n)})},i=function(t){var r;for(r=[];t.length>0;)t=n.map(t,function(n){return n=n.parentNode,n!==document&&r.indexOf(n)<0?(r.push(n),n):void 0});return r},r=function(t,r){return null!=r?n(t).filter(r):n(t)},e=function(t){var r;for(r=this[0][t];r&&1!==r.nodeType;)r=r[t];return n(r)}}(Quo)}).call(this);

function addPinchListener(element, callback) {
    var lastDelta = 0;
    var midPoint = null;
    
    Quo(element).on("touchend", function (e) {
      lastDelta = 0
      midPoint = null
    });
    
    Quo(element).pinching(function (e) {
      var touches = e.touch.touches;
      var deltaChange = e.touch.delta - lastDelta;
      lastDelta = e.touch.delta;
      
      if (midPoint == null) {
        midPoint = {
          x: (touches[0].x + touches[0].x) / 2, 
          y: (touches[1].y + touches[1].y) / 2
        };
      }
      
      if (e.touch.delta != 0) {
        var event = {
            x: midPoint.x,
            y: midPoint.y,
            delta: 0 - deltaChange, // Reversed for consistency with mouse wheel listener
        } 
        
        return callback(event);
      }
    });
    
}