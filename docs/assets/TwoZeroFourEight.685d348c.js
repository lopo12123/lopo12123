var x=(o,e,a)=>{if(!e.has(o))throw TypeError("Cannot "+a)};var s=(o,e,a)=>(x(o,e,"read from private field"),a?a.call(o):e.get(o)),v=(o,e,a)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,a)},n=(o,e,a,i)=>(x(o,e,"write to private field"),i?i.call(o,a):e.set(o,a),a);import{_ as J,d as O,r as w,a as D,b as B,o as y,c as k,e as p,w as A,v as E,F as S,f as M,n as z,t as L}from"./index.4aff2891.js";var h,f,r,c;class T{constructor(e=4,a=4){v(this,h,void 0);v(this,f,void 0);v(this,r,void 0);v(this,c,2);n(this,r,new Array(a).fill(0).map(i=>new Array(e).fill(0))),n(this,h,e),n(this,f,a),this.auto_appear(),this.auto_appear()}get max(){return s(this,c)}reset(e,a){e&&n(this,h,e),a&&n(this,f,a),n(this,r,new Array(s(this,f)).fill(0).map(i=>new Array(s(this,h)).fill(0))),this.auto_appear(),this.auto_appear()}auto_appear(e=2){const a=[];for(let t=0;t<s(this,f);t++)for(let u=0;u<s(this,h);u++)s(this,r)[t][u]===0?a.push([u,t]):n(this,c,Math.max(s(this,c),s(this,r)[t][u]));if(a.length===0)return[-1,-1];const i=a[Math.floor(Math.random()*a.length)];return this.set_val(...i,e),i}apply_force_up(){for(let e=0;e<s(this,h);e++){let a=0;for(let i=a+1;i<s(this,f);i++)if(s(this,r)[i][e]!==0)for(let t=i;t>a;t--)if(s(this,r)[t-1][e]===0)s(this,r)[t-1][e]=s(this,r)[t][e],s(this,r)[t][e]=0;else if(s(this,r)[t-1][e]===s(this,r)[t][e]){s(this,r)[t-1][e]*=2,s(this,r)[t][e]=0,a=t;break}else{a=t;break}}}apply_force_right(){for(let e=0;e<s(this,f);e++){let a=s(this,h)-1;for(let i=a-1;i>=0;i--)if(s(this,r)[e][i]!==0)for(let t=i;t<a;t++)if(s(this,r)[e][t+1]===0)s(this,r)[e][t+1]=s(this,r)[e][t],s(this,r)[e][t]=0;else if(s(this,r)[e][t+1]===s(this,r)[e][t]){s(this,r)[e][t+1]*=2,s(this,r)[e][t]=0,a=t;break}else{a=t;break}}}apply_force_down(){for(let e=0;e<s(this,h);e++){let a=s(this,f)-1;for(let i=a-1;i>=0;i--)if(s(this,r)[i][e]!==0)for(let t=i;t<a;t++)if(s(this,r)[t+1][e]===0)s(this,r)[t+1][e]=s(this,r)[t][e],s(this,r)[t][e]=0;else if(s(this,r)[t+1][e]===s(this,r)[t][e]){s(this,r)[t+1][e]*=2,s(this,r)[t][e]=0,a=t;break}else{a=t;break}}}apply_force_left(){for(let e=0;e<s(this,f);e++){let a=0;for(let i=a+1;i<s(this,h);i++)if(s(this,r)[e][i]!==0)for(let t=i;t>a;t--)if(s(this,r)[e][t-1]===0)s(this,r)[e][t-1]=s(this,r)[e][t],s(this,r)[e][t]=0;else if(s(this,r)[e][t-1]===s(this,r)[e][t]){s(this,r)[e][t-1]*=2,s(this,r)[e][t]=0,a=t;break}else{a=t;break}}}apply_force(e){switch(e){case"up":this.apply_force_up();break;case"right":this.apply_force_right();break;case"down":this.apply_force_down();break;case"left":this.apply_force_left();break}return this.check_if_end()?!0:(this.auto_appear(Math.random()<.5?2:4),!1)}check_if_end(){const e=JSON.stringify(s(this,r));this.apply_force_up();let a=JSON.stringify(s(this,r));return n(this,r,JSON.parse(e)),a!==e||(this.apply_force_right(),a=JSON.stringify(s(this,r)),n(this,r,JSON.parse(e)),a!==e)||(this.apply_force_down(),a=JSON.stringify(s(this,r)),n(this,r,JSON.parse(e)),a!==e)?!1:(this.apply_force_left(),a=JSON.stringify(s(this,r)),n(this,r,JSON.parse(e)),a===e)}have_a_look(){return s(this,r).map(e=>[...e])}set_val(e,a,i=2){s(this,r)[a][e]=i}}h=new WeakMap,f=new WeakMap,r=new WeakMap,c=new WeakMap;const U={class:"two-zero-four-eight"},C={class:"banner-area"},V={class:"game-area"},Z={class:"grid-container"},I=O({setup(o){const e=new T,a=w(e.have_a_look()),i=w(4),t=w(4),u=()=>{i.value>10?i.value=10:i.value<4?i.value=4:i.value=Math.floor(i.value),t.value>10?t.value=10:t.value<4?t.value=4:t.value=Math.floor(t.value),e.reset(i.value,t.value),a.value=e.have_a_look()},N=g=>{const l=["#f9ae61","#a6d5fa","#5e8f32"],_=["33","66","99","cc","ee"],d=Math.log2(g);return d>=15?"#ffd700":l[d%3]+_[Math.floor(d/3)]},b=g=>{let l;switch(g.key){case"ArrowUp":l=e.apply_force("up"),a.value=e.have_a_look();break;case"ArrowRight":l=e.apply_force("right"),a.value=e.have_a_look();break;case"ArrowDown":l=e.apply_force("down"),a.value=e.have_a_look();break;case"ArrowLeft":l=e.apply_force("left"),a.value=e.have_a_look();break}l&&alert("\u7ED3\u675F\uFF01")};return D(()=>{document.addEventListener("keyup",b)}),B(()=>{document.addEventListener("keyup",b)}),(g,l)=>(y(),k("div",U,[p("div",C,[p("div",null,[A(p("input",{type:"number","onUpdate:modelValue":l[0]||(l[0]=_=>i.value=_),placeholder:"\u957F\u5EA6(4, 10), \u9ED8\u8BA4: 4"},null,512),[[E,i.value]]),A(p("input",{type:"number","onUpdate:modelValue":l[1]||(l[1]=_=>t.value=_),placeholder:"\u9AD8\u5EA6(4, 10), \u9ED8\u8BA4: 4"},null,512),[[E,t.value]]),p("button",{class:"div",onClick:u},"\u91CD\u7F6E")])]),p("div",V,[p("div",Z,[(y(!0),k(S,null,M(a.value,(_,d)=>(y(),k("div",{class:"row",key:"row-"+d},[(y(!0),k(S,null,M(_,(m,F)=>(y(),k("div",{class:"column",style:z(`background-color: ${N(m)}`),key:"col-"+F},L(m===0?"\xA0":m),5))),128))]))),128))])])]))}});var j=J(I,[["__scopeId","data-v-5d516e87"]]);export{j as default};
