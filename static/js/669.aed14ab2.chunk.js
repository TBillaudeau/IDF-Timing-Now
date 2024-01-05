"use strict";(self.webpackChunkrailtime_idf=self.webpackChunkrailtime_idf||[]).push([[669],{6645:function(e,n,i){i.r(n),i.d(n,{default:function(){return b}});var o=i(4165),t=i(5861),r=i(9439),a=i(9867),s=i(4670),l=i(7353),d=i(5147),c=i(3397),m=i(4925),u=i(5293),g=i(9457),p=i(5430),h=i(470),f=i.n(h),v=["positions"],x=(0,u.Au)((function(e,n){var i=e.positions,o=(0,m.Z)(e,v),t=new h.Polyline(i,o);return(0,g.O)(t,(0,p.sj)(n,{overlayContainer:t}))}),(function(e,n,i){n.positions!==i.positions&&e.setLatLngs(n.positions)})),j=i(1891),w=(i(6948),i(2095)),k=i(1211),y=i(2834);var N=function(e){var n=e.journeyData.sections.map((function(e,n){var i,o,t,a,s,l=(null===(i=e.geojson)||void 0===i?void 0:i.coordinates.map((function(e){var n=(0,r.Z)(e,2),i=n[0];return[n[1],i]})))||[];return{index:n,coordinates:l,color:e.display_informations&&e.display_informations.color?"#".concat(e.display_informations.color):"#333333",markerPosition:l[0]||null,lineName:(null===(o=e.display_informations)||void 0===o?void 0:o.code)||"Line ".concat(n+1),lineID:null===(t=e.links[1])||void 0===t?void 0:t.id,from:e.from,to:e.to,terminus:(null===(a=e.display_informations)||void 0===a?void 0:a.direction)||"Unknown",mode:(null===(s=e.display_informations)||void 0===s?void 0:s.commercial_mode)||e.mode,departure:new Date(e.departure_date_time.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,"$1-$2-$3T$4:$5:$6Z")).toLocaleString(),arrival:new Date(e.arrival_date_time.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,"$1-$2-$3T$4:$5:$6Z")).toLocaleString(),duration:Math.ceil(e.duration/60)}}));return(0,y.jsxs)("div",{className:"max-w-4xl mx-auto",children:[n.length>0&&(0,y.jsx)("div",{children:(0,y.jsxs)(d.h,{className:"z-10 h-96",center:[(n[0].coordinates[0][0]+n[n.length-1].coordinates[0][0])/2,(n[0].coordinates[0][1]+n[n.length-1].coordinates[0][1])/2],zoom:new h.LatLng(n[0].coordinates[0][0],n[0].coordinates[0][1]).distanceTo(new h.LatLng(n[n.length-1].coordinates[0][0],n[n.length-1].coordinates[0][1]))<1e3?13:new h.LatLng(n[0].coordinates[0][0],n[0].coordinates[0][1]).distanceTo(new h.LatLng(n[n.length-1].coordinates[0][0],n[n.length-1].coordinates[0][1]))<5e3?12:new h.LatLng(n[0].coordinates[0][0],n[0].coordinates[0][1]).distanceTo(new h.LatLng(n[n.length-1].coordinates[0][0],n[n.length-1].coordinates[0][1]))<1e4?11:10,attributionControl:!1,children:[(0,y.jsx)(c.I,{url:"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"}),n.map((function(e,n){return(0,y.jsxs)(a.Fragment,{children:[(0,y.jsx)(x,{positions:e.coordinates,color:e.color,dashArray:"walking"===e.mode?"5, 5":null}),e.coordinates[0]&&e.duration>1&&(0,y.jsx)(y.Fragment,{children:e.lineID&&(0,y.jsx)(j.J,{position:e.coordinates[0],icon:f().icon({iconUrl:"/IDF-Timing-Now"+"/images/".concat(e.lineID.split(":").pop(),".svg"),iconSize:[25],iconAnchor:[10,20],popupAnchor:[0,-40]})})})]},n)}))]})}),n.map((function(e,n){var i,o,t=e.from&&e.to&&e.from.name===e.to.name,r=!e.from&&!e.to&&e.duration,a=e.color;return"walking"===e.mode&&0===e.duration?null:(0,y.jsxs)("div",{className:"bg-white relative flex p-4",children:[(0,y.jsxs)("div",{className:"w-20",children:[(0,y.jsx)("div",{style:{background:"walking"===e.mode||void 0===e.mode?"linear-gradient(".concat(a," 50%, transparent 50%)"):a,backgroundSize:"1px 10px",transform:"translateY(-12px)"},className:"absolute w-1 h-full ml-2 z-0"}),(0,y.jsxs)("div",{className:"flex items-center mb-2 absolute",children:[void 0!==e.mode?(0,y.jsx)("img",{src:"/IDF-Timing-Now"+"/images/".concat((0,l.H2)(e.mode)).concat("dark"===localStorage.theme?"_LIGHT":"",".svg"),alt:(0,l.H2)(e.mode),className:"bg-white outline outline-4 outline-white h-5 lg:h-10 mr-1"}):(0,y.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 19 30",className:"h-5 lg:h-10 mx-1",children:(0,y.jsx)("path",{fill:"#fff",stroke:"#000","stroke-width":"2.5",d:"M1.75 9a7.75 7.75 0 1 1 15.5 0v12a7.75 7.75 0 0 1-15.5 0V9Z"})}),e.lineID&&(0,y.jsx)("img",{src:"/IDF-Timing-Now"+"/images/".concat(e.lineID.split(":").pop(),".svg"),alt:e.lineID.split(":").pop(),className:"h-5 lg:h-10 mr-2 lg:mr-4"})]})]}),(0,y.jsx)("div",{children:t?(0,y.jsxs)("p",{children:["Correspondance - ",e.duration," minutes"]}):r?(0,y.jsxs)("p",{children:["Temps d'attente : ",e.duration," minutes"]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{className:"flex justify-between",children:[(0,y.jsx)("p",{children:null===(i=e.from)||void 0===i?void 0:i.name}),(0,y.jsx)("p",{children:e.departure})]}),(0,y.jsxs)("p",{children:[(0,y.jsx)("strong",{children:"Terminus:"})," ",e.terminus]}),(0,y.jsxs)("div",{className:"flex justify-between",children:[(0,y.jsx)("p",{children:null===(o=e.to)||void 0===o?void 0:o.name}),(0,y.jsx)("p",{children:e.arrival})]}),"walking"!==e.mode&&void 0!==e.mode&&(0,y.jsx)(w.Z,{lineID:e.lineID.split(":").pop(),stationName:function(){try{var n=k.find((function(n){return n.arrid===e.from.id.split(":").pop()}));return n||(n=k.find((function(n){return n.zdaid===e.from.id.split(":").pop()}))),n?n.zdcid:""}catch(i){return console.error("Error accessing zdcid:",i),""}}()}),(0,y.jsxs)("p",{children:[(0,y.jsx)("strong",{children:"Duration:"})," ",e.duration," minutes"]})]})})]},e.index)}))]})};var b=function(){var e=new URLSearchParams((0,s.TH)().search),n=e.get("from"),i=e.get("to"),d=(0,a.useState)([]),c=(0,r.Z)(d,2),m=c[0],u=c[1],g=(0,a.useState)(null),p=(0,r.Z)(g,2),h=p[0],f=p[1],v=(0,a.useRef)(null);return(0,a.useEffect)((function(){var e=function(){var e=(0,t.Z)((0,o.Z)().mark((function e(){var t,r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://prim.iledefrance-mobilites.fr/marketplace/navitia/coverage/fr-idf/journeys?from=".concat(n,"&to=").concat(i),{headers:{apikey:"l5iC8ZUjTN6WAevyFkU1tV8zkTbmNdjb"}});case 2:return t=e.sent,e.next=5,t.json();case 5:r=e.sent,console.log(r),u(r.journeys?r.journeys:[]);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,a.useEffect)((function(){h&&v.current&&v.current.scrollIntoView({behavior:"smooth"})}),[h]),(0,y.jsx)("div",{children:m.length>0?(0,y.jsxs)("div",{children:[m.map((function(e,n){var i,o=function(e){var n=Math.floor(e/3600),i=Math.floor(e%3600/60);return 0===n?"".concat(i," min"):"".concat(n," h ").concat(i," min")}(e.durations.total),t=(i=e.fare).found?"".concat((i.total.value/100).toFixed(2)," ").concat("centime"===i.total.currency?"EUR":i.total.currency):"Not available",r=new Date(new Date(e.departure_date_time.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,"$1-$2-$3T$4:$5:$6Z")).getTime()-36e5).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),s=new Date(new Date(e.arrival_date_time.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,"$1-$2-$3T$4:$5:$6Z")).getTime()-36e5).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return(0,y.jsxs)("div",{className:"flex flex-col mb-4 p-2 border rounded bg-white dark:bg-gray-800 dark:text-white cursor-pointer ".concat(h===e?"sticky top-0 z-50":""),onClick:function(){return function(e){f(e)}(e)},children:["                                ",(0,y.jsx)("div",{className:"flex overflow-x-auto py-2",children:e.sections.map((function(n,i){var o,t,r,s,d,c,m,u;return(0,y.jsx)(a.Fragment,{children:(0,y.jsxs)("div",{className:"flex items-center gap-1 shrink-0",children:[(null!==(o=n.display_informations)&&void 0!==o&&o.commercial_mode||n.mode)&&("walking"!==n.mode||"walking"===n.mode&&n.duration>=60)?(0,y.jsx)("img",{src:"/IDF-Timing-Now"+"/images/".concat((0,l.H2)((null===(t=n.display_informations)||void 0===t?void 0:t.commercial_mode)||n.mode)).concat("dark"===localStorage.theme?"_LIGHT":"",".svg"),alt:(0,l.H2)(null===(r=n.display_informations)||void 0===r?void 0:r.commercial_mode),className:"h-6 lg:h-10"}):null,null!==(s=n.links[1])&&void 0!==s&&s.id?(0,y.jsx)("img",{src:"/IDF-Timing-Now"+"/images/".concat(null===(d=n.links[1])||void 0===d?void 0:d.id.split(":").pop(),".svg"),alt:null===(c=n.links[1])||void 0===c?void 0:c.id.split(":").pop(),className:"h-6 lg:h-10"}):null,i<e.sections.length-1&&((null===(m=n.display_informations)||void 0===m?void 0:m.commercial_mode)||n.mode||(null===(u=n.links[1])||void 0===u?void 0:u.id))&&(("walking"!==n.mode||"walking"===n.mode&&n.duration>=60)&&i!==e.sections.length-2?(0,y.jsx)("svg",{className:"w-2 h-2 mr-0.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 8 14",children:(0,y.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"})}):null)]})},i)}))}),(0,y.jsxs)("div",{className:"flex justify-between items-center",children:[(0,y.jsx)("p",{className:"text-sm",children:t}),(0,y.jsxs)("div",{className:"text-right",children:[(0,y.jsx)("p",{children:(0,y.jsx)("strong",{children:o})}),(0,y.jsxs)("p",{className:"text-sm",children:[r," - ",s]})]})]})]},n)})),h&&(0,y.jsx)("div",{ref:v,children:(0,y.jsx)(N,{journeyData:h})})]}):(0,y.jsx)("p",{children:"Loading journey details..."})})}},1891:function(e,n,i){i.d(n,{J:function(){return d}});var o=i(4925),t=i(5293),r=i(9457),a=i(5430),s=i(470),l=["position"],d=(0,t.dW)((function(e,n){var i=e.position,t=(0,o.Z)(e,l),d=new s.Marker(i,t);return(0,r.O)(d,(0,a.sj)(n,{overlayContainer:d}))}),(function(e,n,i){n.position!==i.position&&e.setLatLng(n.position),null!=n.icon&&n.icon!==i.icon&&e.setIcon(n.icon),null!=n.zIndexOffset&&n.zIndexOffset!==i.zIndexOffset&&e.setZIndexOffset(n.zIndexOffset),null!=n.opacity&&n.opacity!==i.opacity&&e.setOpacity(n.opacity),null!=e.dragging&&n.draggable!==i.draggable&&(!0===n.draggable?e.dragging.enable():e.dragging.disable())}))}}]);
//# sourceMappingURL=669.aed14ab2.chunk.js.map