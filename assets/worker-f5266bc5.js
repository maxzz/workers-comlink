(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const G=Symbol("Comlink.proxy"),te=Symbol("Comlink.endpoint"),re=Symbol("Comlink.releaseProxy"),_=Symbol("Comlink.finalizer"),L=Symbol("Comlink.thrown"),H=e=>typeof e=="object"&&e!==null||typeof e=="function",ne={canHandle:e=>H(e)&&e[G],serialize(e){const{port1:t,port2:o}=new MessageChannel;return N(e,t),[o,[o]]},deserialize(e){return e.start(),ce(e)}},se={canHandle:e=>H(e)&&L in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},$=new Map([["proxy",ne],["throw",se]]);function oe(e,t){for(const o of e)if(t===o||o==="*"||o instanceof RegExp&&o.test(t))return!0;return!1}function N(e,t=globalThis,o=["*"]){t.addEventListener("message",function f(c){if(!c||!c.data)return;if(!oe(o,c.origin)){console.warn(`Invalid origin '${c.origin}' for comlink proxy`);return}const{id:y,type:l,path:g}=Object.assign({path:[]},c.data),h=(c.data.argumentList||[]).map(S);let r;try{const u=g.slice(0,-1).reduce((i,w)=>i[w],e),d=g.reduce((i,w)=>i[w],e);switch(l){case"GET":r=d;break;case"SET":u[g.slice(-1)[0]]=S(c.data.value),r=!0;break;case"APPLY":r=d.apply(u,h);break;case"CONSTRUCT":{const i=new d(...h);r=ge(i)}break;case"ENDPOINT":{const{port1:i,port2:w}=new MessageChannel;N(e,w),r=ue(i,[i])}break;case"RELEASE":r=void 0;break;default:return}}catch(u){r={value:u,[L]:0}}Promise.resolve(r).catch(u=>({value:u,[L]:0})).then(u=>{const[d,i]=z(u);t.postMessage(Object.assign(Object.assign({},d),{id:y}),i),l==="RELEASE"&&(t.removeEventListener("message",f),q(t),_ in e&&typeof e[_]=="function"&&e[_]())}).catch(u=>{const[d,i]=z({value:new TypeError("Unserializable return value"),[L]:0});t.postMessage(Object.assign(Object.assign({},d),{id:y}),i)})}),t.start&&t.start()}function ae(e){return e.constructor.name==="MessagePort"}function q(e){ae(e)&&e.close()}function ce(e,t){return x(e,[],t)}function j(e){if(e)throw new Error("Proxy has been released and is not useable")}function K(e){return O(e,{type:"RELEASE"}).then(()=>{q(e)})}const D=new WeakMap,W="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(D.get(e)||0)-1;D.set(e,t),t===0&&K(e)});function ie(e,t){const o=(D.get(t)||0)+1;D.set(t,o),W&&W.register(e,t,e)}function le(e){W&&W.unregister(e)}function x(e,t=[],o=function(){}){let f=!1;const c=new Proxy(o,{get(y,l){if(j(f),l===re)return()=>{le(c),K(e),f=!0};if(l==="then"){if(t.length===0)return{then:()=>c};const g=O(e,{type:"GET",path:t.map(h=>h.toString())}).then(S);return g.then.bind(g)}return x(e,[...t,l])},set(y,l,g){j(f);const[h,r]=z(g);return O(e,{type:"SET",path:[...t,l].map(u=>u.toString()),value:h},r).then(S)},apply(y,l,g){j(f);const h=t[t.length-1];if(h===te)return O(e,{type:"ENDPOINT"}).then(S);if(h==="bind")return x(e,t.slice(0,-1));const[r,u]=Y(g);return O(e,{type:"APPLY",path:t.map(d=>d.toString()),argumentList:r},u).then(S)},construct(y,l){j(f);const[g,h]=Y(l);return O(e,{type:"CONSTRUCT",path:t.map(r=>r.toString()),argumentList:g},h).then(S)}});return ie(c,e),c}function fe(e){return Array.prototype.concat.apply([],e)}function Y(e){const t=e.map(z);return[t.map(o=>o[0]),fe(t.map(o=>o[1]))]}const X=new WeakMap;function ue(e,t){return X.set(e,t),e}function ge(e){return Object.assign(e,{[G]:!0})}function z(e){for(const[t,o]of $)if(o.canHandle(e)){const[f,c]=o.serialize(e);return[{type:"HANDLER",name:t,value:f},c]}return[{type:"RAW",value:e},X.get(e)||[]]}function S(e){switch(e.type){case"HANDLER":return $.get(e.name).deserialize(e.value);case"RAW":return e.value}}function O(e,t,o){return new Promise(f=>{const c=de();e.addEventListener("message",function y(l){!l.data||!l.data.id||l.data.id!==c||(e.removeEventListener("message",y),f(l.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:c},t),o)})}function de(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const ye=Symbol(),J=Object.getPrototypeOf,U=new WeakMap,we=e=>e&&(U.has(e)?U.get(e):J(e)===Object.prototype||J(e)===Array.prototype),he=e=>we(e)&&e[ye]||null,Q=(e,t=!0)=>{U.set(e,t)},F=e=>typeof e=="object"&&e!==null,P=new WeakMap,T=new WeakSet,me=(e=Object.is,t=(r,u)=>new Proxy(r,u),o=r=>F(r)&&!T.has(r)&&(Array.isArray(r)||!(Symbol.iterator in r))&&!(r instanceof WeakMap)&&!(r instanceof WeakSet)&&!(r instanceof Error)&&!(r instanceof Number)&&!(r instanceof Date)&&!(r instanceof String)&&!(r instanceof RegExp)&&!(r instanceof ArrayBuffer),f=r=>{switch(r.status){case"fulfilled":return r.value;case"rejected":throw r.reason;default:throw r}},c=new WeakMap,y=(r,u,d=f)=>{const i=c.get(r);if((i==null?void 0:i[0])===u)return i[1];const w=Array.isArray(r)?[]:Object.create(Object.getPrototypeOf(r));return Q(w,!0),c.set(r,[u,w]),Reflect.ownKeys(r).forEach(k=>{if(Object.getOwnPropertyDescriptor(w,k))return;const b=Reflect.get(r,k),R={value:b,enumerable:!0,configurable:!0};if(T.has(b))Q(b,!1);else if(b instanceof Promise)delete R.value,R.get=()=>d(b);else if(P.has(b)){const[E,I]=P.get(b);R.value=y(E,I(),d)}Object.defineProperty(w,k,R)}),w},l=new WeakMap,g=[1,1],h=r=>{if(!F(r))throw new Error("object required");const u=l.get(r);if(u)return u;let d=g[0];const i=new Set,w=(a,s=++g[0])=>{d!==s&&(d=s,i.forEach(n=>n(a,s)))};let k=g[1];const b=(a=++g[1])=>(k!==a&&!i.size&&(k=a,E.forEach(([s])=>{const n=s[1](a);n>d&&(d=n)})),d),R=a=>(s,n)=>{const m=[...s];m[1]=[a,...m[1]],w(m,n)},E=new Map,I=(a,s)=>{if(({BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&E.has(a))throw new Error("prop listener already exists");if(i.size){const n=s[3](R(a));E.set(a,[s,n])}else E.set(a,[s])},ee=a=>{var s;const n=E.get(a);n&&(E.delete(a),(s=n[1])==null||s.call(n))},Oe=a=>(i.add(a),i.size===1&&E.forEach(([n,m],A)=>{if(({BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&m)throw new Error("remove already exists");const M=n[3](R(A));E.set(A,[n,M])}),()=>{i.delete(a),i.size===0&&E.forEach(([n,m],A)=>{m&&(m(),E.set(A,[n]))})}),B=Array.isArray(r)?[]:Object.create(Object.getPrototypeOf(r)),C=t(B,{deleteProperty(a,s){const n=Reflect.get(a,s);ee(s);const m=Reflect.deleteProperty(a,s);return m&&w(["delete",[s],n]),m},set(a,s,n,m){const A=Reflect.has(a,s),M=Reflect.get(a,s,m);if(A&&(e(M,n)||l.has(n)&&e(M,l.get(n))))return!0;ee(s),F(n)&&(n=he(n)||n);let V=n;if(n instanceof Promise)n.then(p=>{n.status="fulfilled",n.value=p,w(["resolve",[s],p])}).catch(p=>{n.status="rejected",n.reason=p,w(["reject",[s],p])});else{!P.has(n)&&o(n)&&(V=h(n));const p=!T.has(V)&&P.get(V);p&&I(s,p)}return Reflect.set(a,s,V,m),w(["set",[s],n,M]),!0}});l.set(r,C);const ke=[B,b,y,Oe];return P.set(C,ke),Reflect.ownKeys(r).forEach(a=>{const s=Object.getOwnPropertyDescriptor(r,a);"value"in s&&(C[a]=r[a],delete s.value,delete s.writable),Object.defineProperty(B,a,s)}),C})=>[h,P,T,e,t,o,f,c,y,l,g],[Ee]=me();function be(e={}){return Ee(e)}function pe(e,t){const o=P.get(e);({BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&!o&&console.warn("Please use proxy object");const[f,c,y]=o;return y(f,c(),t)}const Se=e=>{console.log("blockingCall start"),e.counterStr="0";const o=[...new Array(1e5)].map((f,c)=>c).reduce((f,c,y)=>(y%1e4===0&&(console.log("idx [%d] acc [%d]",y,f),e.counterStr=f.toString()),BigInt(f)+BigInt(c)),BigInt(0));console.log("blockingCall done",o),console.log("blockingCall shapshot",pe(e).counterStr)},Pe=()=>{console.log("worker blockingCall: start"),Se(v),console.log("worker blockingCall: done")},Z=be({counterStr:"0",counterInt:0}),v=Z;var Re=Object.freeze({__proto__:null,appStateWorker:v,appStateWorkerProxy:Z,someRPCFunc:Pe});N(Re)})();
