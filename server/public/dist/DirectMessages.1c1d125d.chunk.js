(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{435:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=i(t(0)),r=i(t(3)),n=i(t(437)),u=i(t(906));function i(e){return e&&e.__esModule?e:{default:e}}var l=function(e){var a=e.directMessages;return s.default.createElement("div",null,s.default.createElement("h2",{className:u.default.title},"Direct Messages"),s.default.createElement("div",{className:u.default.users},a.map(function(e){return s.default.createElement("div",{key:e.id,className:u.default.userWrapper},s.default.createElement("a",{href:"/"+e.username,className:u.default.username},s.default.createElement(n.default,{size:11,color:"#38978d",style:{marginRight:5}}),s.default.createElement("span",null,e.username)))})))};l.propTypes={directMessages:r.default.arrayOf(r.default.shape({id:r.default.number.isRequired,username:r.default.string.isRequired}).isRequired).isRequired},a.default=l},906:function(e,a,t){e.exports={container:"DirectMesssages__container__3S7NX",title:"DirectMesssages__title__3T7YY typography__channel-type__LDC6X",userWrapper:"DirectMesssages__userWrapper__XIIdH common__sidebarLinkContainer__19SMK",username:"DirectMesssages__username__3Su3m common__sidebarItemName__1i7ro typography__channel-type__LDC6X"}}}]);