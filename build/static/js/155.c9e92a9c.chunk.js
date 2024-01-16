"use strict";(self.webpackChunkrailtime_idf=self.webpackChunkrailtime_idf||[]).push([[155],{2095:function(e,t,r){var n=r(4165),a=r(5861),s=r(9439),l=r(9867),i=r(5644),o=r(7353),c=r(4189),d=r(1211),g=r(9790),u=r(2834);t.Z=function(e){var t=e.lineID,r=e.stationName,x=(e.limit,r),m=(0,l.useState)([]),h=(0,s.Z)(m,2),p=h[0],f=h[1],v=(0,l.useState)(""),b=(0,s.Z)(v,2),w=b[0],j=b[1];if((0,l.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(r){var a,s,l,i,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(r);case 3:return a=e.sent,e.next=6,a.json();case 6:s=e.sent,0!==(l=s.nextDepartures.data).length&&l.every((function(e){return e.lineDirection}))?(i=[],l.forEach((function(e){if(c.k.TRAIN.includes(e.lineId)){var t=d.find((function(t){return t.arrid===e.destination.stopPointId.split(":").pop()}));if(t){var r=t.zdcid;i.includes(r)||i.push(r)}}})),i.length>0?(o=i.map((function(e){var r="https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:".concat(t,"/stops/stop_area:IDFM:").concat(x,"/to/stop_area:IDFM:").concat(e,"/realTime");return console.log(r),fetch(r).then((function(e){return e.json()}))})),Promise.all(o).then((function(e){var t=e.reduce((function(e,t,r){if(t&&t.nextDepartures&&t.nextDepartures.data){var n=i[r],a=(0,g.zj)(n);return t.nextDepartures.data.forEach((function(e){e.lineDirection||(e.lineDirection=a)})),e.concat(t.nextDepartures.data)}return e}),[]);t.sort((function(e,t){return parseInt(e.time)-parseInt(t.time)}));t=t.filter((function(e,t,r){return r.findIndex((function(t){return r=t,n=e,JSON.stringify(r)===JSON.stringify(n);var r,n}))===t})),f(t),j(s.errorMessage)}))):(f(l),j(s.errorMessage))):j("NO_REALTIME_SCHEDULES_FOUND"),e.next=13;break;case 11:e.prev=11,e.t0=e.catch(0);case 13:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),r="https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:".concat(t,"/stops/stop_area:IDFM:").concat(x,"/realTime");console.log(r),e(r);var s=setInterval((function(){e(r)}),2e3);return function(){return clearInterval(s)}}),[t,x]),"NO_REALTIME_SCHEDULES_FOUND"===w)return(0,u.jsx)(i.rU,{to:"/".concat(t,"/").concat(x),children:(0,u.jsx)("div",{className:"shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.1)] flex items-center justify-center text-center text-xs lg:text-base bg-white dark:bg-gray-700 dark:text-gray-200 p-4 mb-3 h-[44px] lg:h-[72px]",children:(0,u.jsx)("p",{className:"animate-pulse",children:"Information en direct indisponible"})})});if(0===p.length)return(0,u.jsx)("div",{className:"overflow-y-auto max-h-[27rem] animate-pulse",children:(0,u.jsxs)("div",{className:"flex items-center bg-white dark:bg-gray-800 shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.1)] h-[44px] lg:h-[72px] p-1 lg:p-4 mb-1 lg:mb-3",children:[(0,u.jsx)("div",{role:"status",class:"flex items-center justify-center w-4 lg:w-10 h-4 lg:h-10 ml-1 lg:ml-0 mr-2 lg:mr-4 p-1 bg-gray-300 rounded-sm lg:rounded-lg dark:bg-gray-700",children:(0,u.jsx)("svg",{class:"w-5 h-5 text-gray-200 dark:text-gray-600","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 20 18",children:(0,u.jsx)("path",{d:"M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"})})}),(0,u.jsxs)("div",{className:"flex-grow",children:[(0,u.jsx)("div",{class:"w-12 lg:w-24 h-1 lg:h-2.5 mb-1 lg:mb-2.5 bg-gray-300 rounded-full dark:bg-gray-600"}),(0,u.jsx)("div",{class:"w-16 lg:w-32 h-1 lg:h-2 bg-gray-200 rounded-full dark:bg-gray-700"})]}),(0,u.jsxs)("div",{className:"ml-2 lg:ml-5 min-w-max pr-2 text-right",children:[(0,u.jsx)("div",{class:"w-6 lg:w-12 h-1 lg:h-2.5 mb-1 lg:mb-2.5 mr-1 bg-gray-300 rounded-full dark:bg-gray-700"}),(0,u.jsx)("div",{class:"w-4 lg:w-8 h-1 lg:h-2 mr-1 bg-gray-200 rounded-full float-right dark:bg-gray-700"})]})]})});var y={};return p.forEach((function(e){var t=e.sens||"other";y[t]||(y[t]=[]),y[t].push(e)})),(0,u.jsx)("div",{className:"overflow-y-auto max-h-[27rem]",children:Object.keys(y).map((function(e){return(0,u.jsxs)("div",{children:["other"!==e&&(0,u.jsx)("h2",{className:"text-xs font-bold mb-2",children:"1"===e?"":"Direction -1"}),y[e].map((function(e,r){return(0,u.jsx)(i.rU,{to:"/".concat(t,"/").concat(x),children:(0,u.jsxs)("div",{className:"flex items-center bg-white border-gray-400 dark:text-white dark:bg-gray-800 min-h-[44px] max-h-[72px] p-1 lg:p-4 relative",style:{borderBottom:"2px solid #".concat((0,g.$Z)(t))},children:[(0,u.jsxs)("div",{className:"shrink-0",children:[(0,u.jsx)(g.BU,{lineID:t,className:"h-4 lg:h-10 pl-1 lg:pl-0"}),(0,u.jsx)("h3",{className:"text-[8px] lg:text-xs justify-center flex mx-auto mt-0.5 pl-0.5 lg:pl-0",children:(0,o.OV)(e.vehicleName)})]}),(0,u.jsx)("div",{className:"flex-grow overflow-hidden",children:(0,u.jsx)("h2",{className:"font-bold text-[11px] lg:text-lg line-clamp-2 ml-2 lg:ml-4",children:(0,o.OV)(e.lineDirection)})}),(0,u.jsx)("div",{className:"ml-1 lg:ml-5 pr-2 text-right",children:"message"===e.code?(0,u.jsx)("p",{className:"text-[10px] lg:text-base font-bold text-green-600 dark:text-green-500 whitespace-normal",children:e.schedule}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("p",{className:"text-sm lg:text-2xl font-bold text-green-600 dark:text-green-500".concat("0"===e.time?"animate-pulse":""),children:[e.time,(0,u.jsx)("span",{className:"text-xs lg:text-lg",children:"\u1d50\u2071\u207f"})]}),(0,u.jsx)("p",{className:"text-xs lg:text-sm text-right text-gray-400 dark:text-white",children:new Date(Date.now()+6e4*("message"===e.code?e.schedule:e.time)).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})]})}),(0,u.jsx)("div",{className:"absolute top-0 right-0 bottom-0 left-0 lg:left-0 bg-gradient-to-r from-transparent to-white dark:to-gray-800",style:{backgroundImage:"linear-gradient(to right, transparent, rgba(".concat(parseInt((0,g.$Z)(t).slice(0,2),16),", ").concat(parseInt((0,g.$Z)(t).slice(2,4),16),", ").concat(parseInt((0,g.$Z)(t).slice(4,6),16),", 0.1))")}})]},e.time+r)})}))]},e)}))})}},5236:function(e,t,r){r.d(t,{Z:function(){return u}});var n=r(4165),a=r(5861),s=r(9439),l=r(9867),i=r(4189),o=r(4670),c=r(2834),d=function(){var e=(0,l.useState)(!1),t=(0,s.Z)(e,2),r=t[0],n=t[1];return(0,c.jsx)("button",{onClick:function(){n(!r)},"aria-label":r?"Remove from favorites":"Add to favorites",children:r?(0,c.jsx)("svg",{class:"w-3 h-3 lg:w-5 lg:h-5 text-gray-800 dark:text-white","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 14 20",children:(0,c.jsx)("path",{d:"M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"})}):(0,c.jsx)("svg",{class:"w-3 h-3 lg:w-5 lg:h-5 text-gray-800 dark:text-white","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 4 15",children:(0,c.jsx)("path",{d:"M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"})})})},g=r(9790);var u=function(e){var t,r,u,x,m=e.lineID,h=e.stationID,p=(0,o.s0)(),f=(0,l.useState)([]),v=(0,s.Z)(f,2),b=v[0],w=v[1],j=(0,l.useState)(!1),y=(0,s.Z)(j,2),N=y[0],k=y[1];(0,l.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){var t,r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.c)();case 2:t=e.sent,r=t.disruptedLines,w(r);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var I=b.some((function(e){return e.lineId==="line:IDFM:"+m&&!0===e.disrupted}));return(0,c.jsxs)("div",{className:"flex items-center bg-white dark:bg-gray-800 dark:text-white border-gray-900 dark:border-gray-800 border-solid border p-2 lg:p-4 mb-2 lg:mb-4 rounded-b-lg shadow-md min-h-[52px]",onMouseEnter:function(){return k(!0)},onMouseLeave:function(){return k(!1)},children:[I&&(0,c.jsxs)("span",{className:"relative",children:[N&&(0,c.jsxs)("div",{"data-popover":!0,id:"popover-top",role:"tooltip",className:"absolute z-10 inline-block w-40 lg:w-80 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800",children:[(0,c.jsx)("div",{className:"px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700 flex flex-row",children:(0,c.jsx)("h3",{className:"flex-grow font-semibold text-gray-900 dark:text-white",children:null===(t=b.find((function(e){return e.lineId==="line:IDFM:"+m})))||void 0===t?void 0:t.disruption.cause})}),(0,c.jsxs)("div",{className:"px-3 py-2",children:[(0,c.jsx)("p",{children:null===(r=b.find((function(e){return e.lineId==="line:IDFM:"+m})))||void 0===r?void 0:r.disruption.title}),(0,c.jsxs)("a",{class:"bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 font-medium rounded-lg text-xs px-3 mt-3 text-center inline-flex items-center cursor-pointer",onClick:function(){p("/line/".concat(m))},children:[(0,c.jsx)("svg",{class:"-ml-0.5 mr-2 h-3 w-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 20 14",children:(0,c.jsx)("path",{d:"M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"})}),"En savoir plus"]})]})]}),(0,c.jsx)("span",{className:"absolute top-[-1rem] right-[-0.4rem] lg:top-[-1.8rem] lg:right-[-0.7rem]",children:(0,c.jsxs)("span",{className:"relative flex h-3 w-3 lg:h-5 lg:w-5",children:[(0,c.jsx)("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ".concat("BLOQUANTE"===(null===(u=b.find((function(e){return e.lineId==="line:IDFM:"+m})))||void 0===u?void 0:u.disruption.severity)?"bg-red-600":"bg-yellow-400")}),(0,c.jsx)("span",{className:"relative inline-flex rounded-full h-3 w-3 lg:h-5 lg:w-5 ".concat("BLOQUANTE"===(null===(x=b.find((function(e){return e.lineId==="line:IDFM:"+m})))||void 0===x?void 0:x.disruption.severity)?"bg-red-600":"bg-yellow-400")})]})})]}),(0,c.jsx)("img",{src:"/IDF-Timing-Now"+"/images/".concat((0,g.tX)(m)).concat("dark"===localStorage.theme?"_LIGHT":"",".svg"),alt:(0,g.tX)(m),className:"h-5 lg:h-10 mr-1"}),(0,c.jsx)(g.BU,{lineID:m,className:"h-5 lg:h-10 mr-2 lg:mr-4"}),(0,c.jsx)("p",{className:"text-xs lg:text-base font-medium flex-grow line-clamp-2",children:(0,g.zj)(h)}),(0,c.jsx)("p",{className:"text-slate-400 text-xs font-bold pr-0.5 lg:pr-2",children:(0,c.jsx)(d,{})})]})}},155:function(e,t,r){r.r(t);var n=r(4670),a=r(5236),s=r(2095),l=r(2834);t.default=function(){var e=(0,n.TH)(),t=new URLSearchParams(e.search),r=t.getAll("line"),i=t.getAll("stop_area");return(0,l.jsx)("div",{className:"grid ".concat(1===r.length?"grid-cols-1 max-w-screen-sm":"grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"," gap-2 lg:gap-4 sm:m-6"),children:r.map((function(e,t){return(0,l.jsx)("div",{className:"",children:(0,l.jsxs)("div",{children:[(0,l.jsx)(a.Z,{lineID:e,stationID:i[t]}),(0,l.jsx)(s.Z,{lineID:e,stationName:i[t]})]})},e)}))})}}}]);
//# sourceMappingURL=155.c9e92a9c.chunk.js.map