(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"A2+M":function(t,n,r){var e=r("X8hv");t.exports={MDXRenderer:e}},Bnag:function(t,n){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(t,n){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},Ijbi:function(t,n,r){var e=r("WkPL");t.exports=function(t){if(Array.isArray(t))return e(t)}},RIqP:function(t,n,r){var e=r("Ijbi"),o=r("EbDI"),c=r("ZhPi"),i=r("Bnag");t.exports=function(t){return e(t)||o(t)||c(t)||i()}},SksO:function(t,n){function r(n,e){return t.exports=r=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},r(n,e)}t.exports=r},WkPL:function(t,n){t.exports=function(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}},X8hv:function(t,n,r){var e=r("sXyB"),o=r("RIqP"),c=r("lSNA"),i=r("8OQS");function u(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);n&&(e=e.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),r.push.apply(r,e)}return r}function a(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?u(Object(r),!0).forEach((function(n){c(t,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))}))}return t}var f=r("q1tI"),p=r("7ljp").mdx,s=r("BfwJ").useMDXScope;t.exports=function(t){var n=t.scope,r=t.children,c=i(t,["scope","children"]),u=s(n),l=f.useMemo((function(){if(!r)return null;var t=a({React:f,mdx:p},u),n=Object.keys(t),c=n.map((function(n){return t[n]}));return e(Function,["_fn"].concat(o(n),[""+r])).apply(void 0,[{}].concat(o(c)))}),[r,n]);return f.createElement(l,a({},c))}},ZhPi:function(t,n,r){var e=r("WkPL");t.exports=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}},b48C:function(t,n){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},sXyB:function(t,n,r){var e=r("SksO"),o=r("b48C");function c(n,r,i){return o()?t.exports=c=Reflect.construct:t.exports=c=function(t,n,r){var o=[null];o.push.apply(o,n);var c=new(Function.bind.apply(t,o));return r&&e(c,r.prototype),c},c.apply(null,arguments)}t.exports=c},tLhY:function(t,n,r){"use strict";r.r(n),r.d(n,"pageQuery",(function(){return p}));var e=r("dI71"),o=r("2A+t"),c=r("q1tI"),i=r.n(c),u=r("A2+M"),a=r("Bl7J"),f=(r("qKvR"),function(t){function n(){return t.apply(this,arguments)||this}return Object(e.a)(n,t),n.prototype.render=function(){var t=this.props.data,n=t.mdx,r=t.site;return Object(o.c)(a.a,{location:this.props.location,mdxTitle:n.frontmatter.title},Object(o.c)("article",null,Object(o.c)("h1",{sx:{fontFamily:function(t){return""+t.fonts.noto}}},n.frontmatter.title),Object(o.c)("span",{sx:{fontFamily:function(t){return""+t.fonts.dancingScript},mb:"2rem"}},r.siteMetadata.author.name,"   ",n.frontmatter.date),Object(o.c)("section",null,Object(o.c)(u.MDXRenderer,null,n.body),n.frontmatter.last_modified&&Object(o.c)("p",{sx:{textAlign:"right",fontSize:"0.8rem",fontFamily:function(t){return""+t.fonts.dancingScript}}},"last modified "+n.frontmatter.last_modified))))},n}(i.a.Component));n.default=f;var p="3262560224"}}]);
//# sourceMappingURL=component---src-templates-template-blog-post-js-a27e4a844a18670675f0.js.map