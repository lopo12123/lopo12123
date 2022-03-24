var C=Object.defineProperty;var y=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var g=(n,e,o)=>e in n?C(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o,b=(n,e)=>{for(var o in e||(e={}))M.call(e,o)&&g(n,o,e[o]);if(y)for(var o of y(e))R.call(e,o)&&g(n,o,e[o]);return n};var x=(n,e,o)=>(g(n,typeof e!="symbol"?e+"":e,o),o);import{u as _,r as c,j as f,a as r,C as N,T as I,v as P,b as O,O as k,f as w,R as A,H as z,c as H,d as p,e as $}from"./vendor.943528eb.js";const j=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}};j();const B="modulepreload",S={},D="./",E=function(e,o){return!o||o.length===0?e():Promise.all(o.map(s=>{if(s=`${D}${s}`,s in S)return;S[s]=!0;const t=s.endsWith(".css"),i=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${i}`))return;const a=document.createElement("link");if(a.rel=t?"stylesheet":B,t||(a.as="script",a.crossOrigin=""),a.href=s,document.head.appendChild(a),t)return new Promise((u,l)=>{a.addEventListener("load",u),a.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>e())};const L=["vite-react-ts","vite-vue-ts"],W=(n,e)=>{n(`/sub-app/${e}`)},F=[{label:"Image Parser",icon:"pi pi-images",path:"image-parser"},{label:"Flow Chart",icon:"pi pi-sitemap",path:"flow-chart"}],X=(n,e)=>{n(`/tool/${e}`)},Y=[{label:"zt",icon:"pi pi-bolt",path:"zt"}],V=(n,e)=>{console.log("to misc: ",e)};class q{constructor(){x(this,"ref",null)}bind(e){this.ref=e}info(e,o,s=3e3){var t;(t=this.ref)==null||t.show({severity:"info",summary:o,detail:e,life:s})}success(e,o,s=3e3){var t;(t=this.ref)==null||t.show({severity:"success",summary:o,detail:e,life:s})}warn(e,o,s=3e3){var t;(t=this.ref)==null||t.show({severity:"warn",summary:o,detail:e,life:s})}error(e,o,s=3e3){var t;(t=this.ref)==null||t.show({severity:"error",summary:o,detail:e,life:s})}clear(){var e;(e=this.ref)==null||e.clear()}replyCancel(){this.info("Think twice before you press your mouse!")}}const K=new q,v=()=>K;function U(){const n=_(),e=v(),o=c.exports.useRef(null),s=[{label:"What do you want?",disabled:!0},{label:"Home",icon:"pi pi-home",command(){n("/")}},{label:"Sub App",icon:"pi pi-database",items:L.map(l=>({label:l,icon:"pi pi-book",command(){W(n,l)}}))},{label:"Tool",icon:"pi pi-box",items:F.map(l=>({label:l.label,icon:l.icon,command(){X(n,l.path)}}))},{label:"Misc",icon:"pi pi-hashtag",items:Y.map(l=>({label:l.label,icon:l.icon,command(){V(n,l.path)}}))},{label:"Star Me",icon:"pi pi-star",command:()=>{window.open("https://github.com/lopo12123/lopo12123","_blank")}},{label:"Noting",icon:"pi pi-power-off",command(){e.replyCancel()}}],[t,i]=c.exports.useState(!1),[a,u]=c.exports.useState(!1);return f("div",{children:[r("div",{className:"drag-controller",onContextMenu:l=>{var d;(d=o.current)==null||d.show(l)},children:r("div",{id:"navigate-menu","data-pr-tooltip":"you can drag me anywhere.",style:{position:"relative",width:a?"80px":"40px",height:"40px",marginLeft:a?"0":"20px",border:"dashed 1px #777777",borderRadius:"5px",display:"flex",alignItems:"center",justifyContent:"center",transition:"ease 1s",overflow:"hidden"},onMouseEnter:()=>{t||u(!0)},onMouseLeave:()=>{t||u(!1)},children:a?f("span",{style:{color:"#777777",fontFamily:"Curlz MT",fontSize:"16px",fontWeight:"bold",lineHeight:"16px",whiteSpace:"nowrap"},children:["Right-Click ",r("br",{}),"Show Menu"]}):r("span",{className:"custom-rgb",style:{opacity:"0.5"},children:r("i",{className:"pi pi-cog pi-spin",style:{fontSize:"24px"}})})})}),r(N,{ref:o,model:s,onShow:()=>{i(!0)},onHide:()=>{i(!1),u(!1)}}),r(I,{target:"#navigate-menu",mouseTrack:!0,mouseTrackTop:20,position:"bottom"})]})}const T=n=>{const e=n.currentTarget,o=e.dataset.dragTarget,t=(n.path||n.composedPath&&n.composedPath()).find(d=>!!d.dataset.dragId&&d.dataset.dragId===o);if(!e||!o||!t)return;const i=n.clientX-t.offsetLeft,a=n.clientY-t.offsetTop,u=d=>{const h=d.clientX-i,m=d.clientY-a;h>0&&h<window.innerWidth-e.offsetWidth-10&&(t.style.left=h+"px"),m>0&&m<window.innerHeight-e.offsetHeight-10&&(t.style.top=m+"px")},l=()=>{document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",l)};document.addEventListener("mousemove",u),document.addEventListener("mouseup",l)},G=({innerEl:n,initPos:e})=>{const o=c.exports.useRef(null),s=P();return c.exports.useLayoutEffect(()=>{var i;const t=(i=o.current)==null?void 0:i.getElementsByClassName("drag-controller")[0];if(!t)throw new Error("No controller for this draggable element.");return t.dataset.dragTarget=s,t.style.cursor="grab",t.style.userSelect="none",t.addEventListener("mousedown",T),()=>{t.removeEventListener("mousedown",T)}},[s]),r("div",{ref:o,"data-drag-id":s,style:b({position:"absolute",zIndex:"10000",width:"fit-content",height:"fit-content"},e),children:n})};function J(){const n=c.exports.useRef(null);return c.exports.useEffect(()=>(v().bind(n.current),()=>{v().bind(null)}),[]),f("div",{className:"App custom-cursor",style:{position:"relative",width:"100%",height:"100%"},children:[r(O,{ref:n}),r(G,{initPos:{right:"50px",top:"50px"},innerEl:r(U,{})},"navigation-menu"),r(k,{})]})}const Q=()=>{const n=c.exports.useRef(null);return c.exports.useLayoutEffect(()=>{const e=new w.fabric.Canvas(n.current),o=new w.fabric.Rect({top:100,left:100,width:60,height:60,fill:"#cccccc"});e.add(o)},[]),r("div",{children:r("canvas",{ref:n})})},Z=c.exports.lazy(()=>E(()=>import("./ImageParser.b0dad35e.js"),["assets/ImageParser.b0dad35e.js","assets/vendor.943528eb.js"])),ee=c.exports.lazy(()=>E(()=>import("./FlowChart.a1cf6ea0.js"),["assets/FlowChart.a1cf6ea0.js","assets/FlowChart.67d4a1ca.css","assets/vendor.943528eb.js"])),te="/lopo12123/packages/{SPA_NAME}/main.js";A.render(r(c.exports.StrictMode,{children:r(z,{children:r(c.exports.Suspense,{fallback:r("div",{style:{position:"relative",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:"loading"}),children:r(H,{children:f(p,{path:"/",element:r(J,{}),children:[r(p,{path:"",element:r(Q,{})}),f(p,{path:"tool",children:[r(p,{path:"image-parser",element:r(Z,{})}),r(p,{path:"flow-chart",element:r(ee,{})})]}),r(p,{path:"sub-app",children:L.map((n,e)=>r(p,{path:n,element:r($,{entryPath:te.replace("{SPA_NAME}",n)},n)},e))})]})})})})}),document.getElementById("root"));export{G as E,v as u};
