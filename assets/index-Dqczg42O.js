(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();var Mo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _=function(t,e){if(!t)throw Zt(e)},Zt=function(t){return new Error("Firebase Database ("+rl.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},cd=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Tr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),i.push(n[u],n[d],n[h],n[p])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ol(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):cd(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||d==null)throw new ud;const h=r<<2|a>>4;if(i.push(h),c!==64){const p=a<<4&240|c>>2;if(i.push(p),d!==64){const f=c<<6&192|d;i.push(f)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ud extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const al=function(t){const e=ol(t);return Tr.encodeByteArray(e,!0)},_i=function(t){return al(t).replace(/\./g,"")},mi=function(t){try{return Tr.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(t){return ll(void 0,t)}function ll(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!hd(n)||(t[n]=ll(t[n],e[n]));return t}function hd(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd=()=>fd().__FIREBASE_DEFAULTS__,_d=()=>{if(typeof process>"u"||typeof Mo>"u")return;const t=Mo.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},md=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&mi(t[1]);return e&&JSON.parse(e)},Cr=()=>{try{return pd()||_d()||md()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},cl=t=>{var e,n;return(n=(e=Cr())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},ul=t=>{const e=cl(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},dl=()=>{var t;return(t=Cr())===null||t===void 0?void 0:t.config},hl=t=>{var e;return(e=Cr())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fl(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[_i(JSON.stringify(n)),_i(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Sr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(se())}function gd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function yd(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function pl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vd(){const t=se();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Ed(){return rl.NODE_ADMIN===!0}function wd(){try{return typeof indexedDB=="object"}catch{return!1}}function Id(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="FirebaseError";class je extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=bd,Object.setPrototypeOf(this,je.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,$n.prototype.create)}}class $n{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Td(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new je(s,a,i)}}function Td(t,e){return t.replace(Cd,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Cd=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sn(t){return JSON.parse(t)}function G(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _l=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Sn(mi(r[0])||""),n=Sn(mi(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},Sd=function(t){const e=_l(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Rd=function(t){const e=_l(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function wt(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function gi(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function yi(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function vi(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(Fo(r)&&Fo(o)){if(!vi(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function Fo(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function gn(t){const e={};return t.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function yn(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)i[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let d=0;d<80;d++){d<40?d<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):d<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+c+l+u+i[d]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Ad(t,e){const n=new Pd(t,e);return n.subscribe.bind(n)}class Pd{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");Nd(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=vs),s.error===void 0&&(s.error=vs),s.complete===void 0&&(s.complete=vs);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Nd(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function vs(){}function It(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,_(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Vi=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(t){return t&&t._delegate?t._delegate:t}class Oe{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new ae;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(xd(e))try{this.getOrInitializeService({instanceIdentifier:mt})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=mt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=mt){return this.instances.has(e)}getOptions(e=mt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){var i;const s=this.normalizeInstanceIdentifier(n),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Dd(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=mt){return this.component?this.component.multipleInstances?e:mt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Dd(t){return t===mt?void 0:t}function xd(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new qs(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var N;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(N||(N={}));const Ld={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},Md=N.INFO,Fd={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},Ud=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=Fd[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Rr{constructor(e){this.name=e,this._logLevel=Md,this._logHandler=Ud,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ld[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}}const Bd=(t,e)=>e.some(n=>t instanceof n);let Uo,Bo;function $d(){return Uo||(Uo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Wd(){return Bo||(Bo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const gl=new WeakMap,Gs=new WeakMap,yl=new WeakMap,Es=new WeakMap,kr=new WeakMap;function Hd(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(st(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&gl.set(n,t)}).catch(()=>{}),kr.set(e,t),e}function Vd(t){if(Gs.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Gs.set(t,e)}let Ks={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Gs.get(t);if(e==="objectStoreNames")return t.objectStoreNames||yl.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return st(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function zd(t){Ks=t(Ks)}function jd(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(ws(this),e,...n);return yl.set(i,e.sort?e.sort():[e]),st(i)}:Wd().includes(t)?function(...e){return t.apply(ws(this),e),st(gl.get(this))}:function(...e){return st(t.apply(ws(this),e))}}function qd(t){return typeof t=="function"?jd(t):(t instanceof IDBTransaction&&Vd(t),Bd(t,$d())?new Proxy(t,Ks):t)}function st(t){if(t instanceof IDBRequest)return Hd(t);if(Es.has(t))return Es.get(t);const e=qd(t);return e!==t&&(Es.set(t,e),kr.set(e,t)),e}const ws=t=>kr.get(t);function Gd(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=st(o);return i&&o.addEventListener("upgradeneeded",l=>{i(st(o.result),l.oldVersion,l.newVersion,st(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Kd=["get","getKey","getAll","getAllKeys","count"],Yd=["put","add","delete","clear"],Is=new Map;function $o(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Is.get(e))return Is.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=Yd.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Kd.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return Is.set(e,r),r}zd(t=>({...t,get:(e,n,i)=>$o(e,n)||t.get(e,n,i),has:(e,n)=>!!$o(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Zd(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Zd(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ys="@firebase/app",Wo="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He=new Rr("@firebase/app"),Xd="@firebase/app-compat",Jd="@firebase/analytics-compat",eh="@firebase/analytics",th="@firebase/app-check-compat",nh="@firebase/app-check",ih="@firebase/auth",sh="@firebase/auth-compat",rh="@firebase/database",oh="@firebase/data-connect",ah="@firebase/database-compat",lh="@firebase/functions",ch="@firebase/functions-compat",uh="@firebase/installations",dh="@firebase/installations-compat",hh="@firebase/messaging",fh="@firebase/messaging-compat",ph="@firebase/performance",_h="@firebase/performance-compat",mh="@firebase/remote-config",gh="@firebase/remote-config-compat",yh="@firebase/storage",vh="@firebase/storage-compat",Eh="@firebase/firestore",wh="@firebase/vertexai-preview",Ih="@firebase/firestore-compat",bh="firebase",Th="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qs="[DEFAULT]",Ch={[Ys]:"fire-core",[Xd]:"fire-core-compat",[eh]:"fire-analytics",[Jd]:"fire-analytics-compat",[nh]:"fire-app-check",[th]:"fire-app-check-compat",[ih]:"fire-auth",[sh]:"fire-auth-compat",[rh]:"fire-rtdb",[oh]:"fire-data-connect",[ah]:"fire-rtdb-compat",[lh]:"fire-fn",[ch]:"fire-fn-compat",[uh]:"fire-iid",[dh]:"fire-iid-compat",[hh]:"fire-fcm",[fh]:"fire-fcm-compat",[ph]:"fire-perf",[_h]:"fire-perf-compat",[mh]:"fire-rc",[gh]:"fire-rc-compat",[yh]:"fire-gcs",[vh]:"fire-gcs-compat",[Eh]:"fire-fst",[Ih]:"fire-fst-compat",[wh]:"fire-vertex","fire-js":"fire-js",[bh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ei=new Map,Sh=new Map,Zs=new Map;function Ho(t,e){try{t.container.addComponent(e)}catch(n){He.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function bt(t){const e=t.name;if(Zs.has(e))return He.debug(`There were multiple attempts to register component ${e}.`),!1;Zs.set(e,t);for(const n of Ei.values())Ho(n,t);for(const n of Sh.values())Ho(n,t);return!0}function zi(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Se(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},rt=new $n("app","Firebase",Rh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{constructor(e,n,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Oe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw rt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt=Th;function vl(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Qs,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw rt.create("bad-app-name",{appName:String(s)});if(n||(n=dl()),!n)throw rt.create("no-options");const r=Ei.get(s);if(r){if(vi(n,r.options)&&vi(i,r.config))return r;throw rt.create("duplicate-app",{appName:s})}const o=new ml(s);for(const l of Zs.values())o.addComponent(l);const a=new kh(n,i,o);return Ei.set(s,a),a}function Ar(t=Qs){const e=Ei.get(t);if(!e&&t===Qs&&dl())return vl();if(!e)throw rt.create("no-app",{appName:t});return e}function Re(t,e,n){var i;let s=(i=Ch[t])!==null&&i!==void 0?i:t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),He.warn(a.join(" "));return}bt(new Oe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah="firebase-heartbeat-database",Ph=1,Rn="firebase-heartbeat-store";let bs=null;function El(){return bs||(bs=Gd(Ah,Ph,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Rn)}catch(n){console.warn(n)}}}}).catch(t=>{throw rt.create("idb-open",{originalErrorMessage:t.message})})),bs}async function Nh(t){try{const n=(await El()).transaction(Rn),i=await n.objectStore(Rn).get(wl(t));return await n.done,i}catch(e){if(e instanceof je)He.warn(e.message);else{const n=rt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});He.warn(n.message)}}}async function Vo(t,e){try{const i=(await El()).transaction(Rn,"readwrite");await i.objectStore(Rn).put(e,wl(t)),await i.done}catch(n){if(n instanceof je)He.warn(n.message);else{const i=rt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});He.warn(i.message)}}}function wl(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=1024,Dh=30*24*60*60*1e3;class xh{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Mh(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=zo();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=Dh}),this._storage.overwrite(this._heartbeatsCache))}catch(i){He.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=zo(),{heartbeatsToSend:i,unsentEntries:s}=Lh(this._heartbeatsCache.heartbeats),r=_i(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return He.warn(n),""}}}function zo(){return new Date().toISOString().substring(0,10)}function Lh(t,e=Oh){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),jo(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),jo(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Mh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wd()?Id().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Nh(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Vo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Vo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function jo(t){return _i(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fh(t){bt(new Oe("platform-logger",e=>new Qd(e),"PRIVATE")),bt(new Oe("heartbeat",e=>new xh(e),"PRIVATE")),Re(Ys,Wo,t),Re(Ys,Wo,"esm2017"),Re("fire-js","")}Fh("");function Pr(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(t);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(t,i[s])&&(n[i[s]]=t[i[s]]);return n}function Il(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Uh=Il,bl=new $n("auth","Firebase",Il());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wi=new Rr("@firebase/auth");function Bh(t,...e){wi.logLevel<=N.WARN&&wi.warn(`Auth (${Pt}): ${t}`,...e)}function ui(t,...e){wi.logLevel<=N.ERROR&&wi.error(`Auth (${Pt}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(t,...e){throw Nr(t,...e)}function ke(t,...e){return Nr(t,...e)}function Tl(t,e,n){const i=Object.assign(Object.assign({},Uh()),{[e]:n});return new $n("auth","Firebase",i).create(e,{appName:t.name})}function We(t){return Tl(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Nr(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return bl.create(t,...e)}function v(t,e,...n){if(!t)throw Nr(e,...n)}function Fe(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ui(e),new Error(e)}function Ve(t,e){t||Fe(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xs(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function $h(){return qo()==="http:"||qo()==="https:"}function qo(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wh(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&($h()||yd()||"connection"in navigator)?navigator.onLine:!0}function Hh(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(e,n){this.shortDelay=e,this.longDelay=n,Ve(n>e,"Short delay should be less than long delay!"),this.isMobile=Sr()||pl()}get(){return Wh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(t,e){Ve(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Fe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Fe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Fe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh=new Wn(3e4,6e4);function qe(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Ge(t,e,n,i,s={}){return Sl(t,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Xt(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:l},r);return gd()||(c.referrerPolicy="no-referrer"),Cl.fetch()(Rl(t,t.config.apiHost,n,a),c)})}async function Sl(t,e,n){t._canInitEmulator=!1;const i=Object.assign(Object.assign({},Vh),e);try{const s=new qh(t),r=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw ii(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw ii(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw ii(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw ii(t,"user-disabled",o);const u=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Tl(t,u,c);we(t,u)}}catch(s){if(s instanceof je)throw s;we(t,"network-request-failed",{message:String(s)})}}async function Hn(t,e,n,i,s={}){const r=await Ge(t,e,n,i,s);return"mfaPendingCredential"in r&&we(t,"multi-factor-auth-required",{_serverResponse:r}),r}function Rl(t,e,n,i){const s=`${e}${n}?${i}`;return t.config.emulator?Or(t.config,s):`${t.config.apiScheme}://${s}`}function jh(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class qh{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(ke(this.auth,"network-request-failed")),zh.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ii(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=ke(t,e,i);return s.customData._tokenResponse=n,s}function Go(t){return t!==void 0&&t.enterprise!==void 0}class Gh{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return jh(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function Kh(t,e){return Ge(t,"GET","/v2/recaptchaConfig",qe(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yh(t,e){return Ge(t,"POST","/v1/accounts:delete",e)}async function kl(t,e){return Ge(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vn(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Qh(t,e=!1){const n=C(t),i=await n.getIdToken(e),s=Dr(i);v(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:vn(Ts(s.auth_time)),issuedAtTime:vn(Ts(s.iat)),expirationTime:vn(Ts(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Ts(t){return Number(t)*1e3}function Dr(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return ui("JWT malformed, contained fewer than 3 sections"),null;try{const s=mi(n);return s?JSON.parse(s):(ui("Failed to decode base64 JWT payload"),null)}catch(s){return ui("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Ko(t){const e=Dr(t);return v(e,"internal-error"),v(typeof e.exp<"u","internal-error"),v(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kn(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof je&&Zh(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function Zh({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=vn(this.lastLoginAt),this.creationTime=vn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ii(t){var e;const n=t.auth,i=await t.getIdToken(),s=await kn(t,kl(n,{idToken:i}));v(s==null?void 0:s.users.length,n,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?Al(r.providerUserInfo):[],a=ef(t.providerData,o),l=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!(a!=null&&a.length),u=l?c:!1,d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Js(r.createdAt,r.lastLoginAt),isAnonymous:u};Object.assign(t,d)}async function Jh(t){const e=C(t);await Ii(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ef(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Al(t){return t.map(e=>{var{providerId:n}=e,i=Pr(e,["providerId"]);return{providerId:n,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tf(t,e){const n=await Sl(t,{},async()=>{const i=Xt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=Rl(t,s,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Cl.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function nf(t,e){return Ge(t,"POST","/v2/accounts:revokeToken",qe(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){v(e.idToken,"internal-error"),v(typeof e.idToken<"u","internal-error"),v(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ko(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){v(e.length!==0,"internal-error");const n=Ko(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(v(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:r}=await tf(e,n);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:r}=n,o=new Ut;return i&&(v(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(v(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(v(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ut,this.toJSON())}_performRefresh(){return Fe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(t,e){v(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ue{constructor(e){var{uid:n,auth:i,stsTokenManager:s}=e,r=Pr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Xh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Js(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await kn(this,this.stsTokenManager.getToken(this.auth,e));return v(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Qh(this,e)}reload(){return Jh(this)}_assign(e){this!==e&&(v(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ue(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){v(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await Ii(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Se(this.auth.app))return Promise.reject(We(this.auth));const e=await this.getIdToken();return await kn(this,Yh(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var i,s,r,o,a,l,c,u;const d=(i=n.displayName)!==null&&i!==void 0?i:void 0,h=(s=n.email)!==null&&s!==void 0?s:void 0,p=(r=n.phoneNumber)!==null&&r!==void 0?r:void 0,f=(o=n.photoURL)!==null&&o!==void 0?o:void 0,m=(a=n.tenantId)!==null&&a!==void 0?a:void 0,g=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,P=(c=n.createdAt)!==null&&c!==void 0?c:void 0,k=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:E,emailVerified:T,isAnonymous:S,providerData:z,stsTokenManager:q}=n;v(E&&q,e,"internal-error");const X=Ut.fromJSON(this.name,q);v(typeof E=="string",e,"internal-error"),Ye(d,e.name),Ye(h,e.name),v(typeof T=="boolean",e,"internal-error"),v(typeof S=="boolean",e,"internal-error"),Ye(p,e.name),Ye(f,e.name),Ye(m,e.name),Ye(g,e.name),Ye(P,e.name),Ye(k,e.name);const F=new Ue({uid:E,auth:e,email:h,emailVerified:T,displayName:d,isAnonymous:S,photoURL:f,phoneNumber:p,tenantId:m,stsTokenManager:X,createdAt:P,lastLoginAt:k});return z&&Array.isArray(z)&&(F.providerData=z.map(be=>Object.assign({},be))),g&&(F._redirectEventId=g),F}static async _fromIdTokenResponse(e,n,i=!1){const s=new Ut;s.updateFromServerResponse(n);const r=new Ue({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Ii(r),r}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];v(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Al(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new Ut;a.updateFromIdToken(i);const l=new Ue({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Js(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo=new Map;function Be(t){Ve(t instanceof Function,"Expected a class definition");let e=Yo.get(t);return e?(Ve(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Yo.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Pl.type="NONE";const Qo=Pl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(t,e,n){return`firebase:${t}:${e}:${n}`}class Bt{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=di(this.userKey,s.apiKey,r),this.fullPersistenceKey=di("persistence",s.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ue._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new Bt(Be(Qo),e,i);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||Be(Qo);const o=di(i,e.config.apiKey,e.name);let a=null;for(const c of n)try{const u=await c._get(o);if(u){const d=Ue._fromJSON(e,u);c!==r&&(a=d),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new Bt(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new Bt(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zo(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(xl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Nl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ml(e))return"Blackberry";if(Fl(e))return"Webos";if(Ol(e))return"Safari";if((e.includes("chrome/")||Dl(e))&&!e.includes("edge/"))return"Chrome";if(Ll(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Nl(t=se()){return/firefox\//i.test(t)}function Ol(t=se()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Dl(t=se()){return/crios\//i.test(t)}function xl(t=se()){return/iemobile/i.test(t)}function Ll(t=se()){return/android/i.test(t)}function Ml(t=se()){return/blackberry/i.test(t)}function Fl(t=se()){return/webos/i.test(t)}function xr(t=se()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function sf(t=se()){var e;return xr(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function rf(){return vd()&&document.documentMode===10}function Ul(t=se()){return xr(t)||Ll(t)||Fl(t)||Ml(t)||/windows phone/i.test(t)||xl(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(t,e=[]){let n;switch(t){case"Browser":n=Zo(se());break;case"Worker":n=`${Zo(se())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Pt}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function af(t,e={}){return Ge(t,"GET","/v2/passwordPolicy",qe(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf=6;class cf{constructor(e){var n,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:lf,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,i,s,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Xo(this),this.idTokenSubscription=new Xo(this),this.beforeStateQueue=new of(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=bl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Be(n)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await Bt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await kl(this,{idToken:e}),i=await Ue._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Se(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return v(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ii(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Hh()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Se(this.app))return Promise.reject(We(this));const n=e?C(e):null;return n&&v(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&v(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Se(this.app)?Promise.reject(We(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Se(this.app)?Promise.reject(We(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Be(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await af(this),n=new cf(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new $n("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await nf(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Be(e)||this._popupRedirectResolver;v(n,this,"argument-error"),this.redirectPersistenceManager=await Bt.create(this,[Be(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,i;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(v(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return v(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Bl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(n["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&Bh(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function pt(t){return C(t)}class Xo{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ad(n=>this.observer=n)}get next(){return v(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ji={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function df(t){ji=t}function $l(t){return ji.loadJS(t)}function hf(){return ji.recaptchaEnterpriseScript}function ff(){return ji.gapiScript}function pf(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const _f="recaptcha-enterprise",mf="NO_RECAPTCHA";class gf{constructor(e){this.type=_f,this.auth=pt(e)}async verify(e="verify",n=!1){async function i(r){if(!n){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,a)=>{Kh(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const c=new Gh(l);return r.tenantId==null?r._agentRecaptchaConfig=c:r._tenantRecaptchaConfigs[r.tenantId]=c,o(c.siteKey)}}).catch(l=>{a(l)})})}function s(r,o,a){const l=window.grecaptcha;Go(l)?l.enterprise.ready(()=>{l.enterprise.execute(r,{action:e}).then(c=>{o(c)}).catch(()=>{o(mf)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{i(this.auth).then(a=>{if(!n&&Go(window.grecaptcha))s(a,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=hf();l.length!==0&&(l+=a),$l(l).then(()=>{s(a,r,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}async function Jo(t,e,n,i=!1){const s=new gf(t);let r;try{r=await s.verify(n)}catch{r=await s.verify(n,!0)}const o=Object.assign({},e);return i?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function bi(t,e,n,i){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await Jo(t,e,n,n==="getOobCode");return i(t,r)}else return i(t,e).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Jo(t,e,n,n==="getOobCode");return i(t,o)}else return Promise.reject(r)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yf(t,e){const n=zi(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(vi(r,e??{}))return s;we(s,"already-initialized")}return n.initialize({options:e})}function vf(t,e){const n=(e==null?void 0:e.persistence)||[],i=(Array.isArray(n)?n:[n]).map(Be);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function Ef(t,e,n){const i=pt(t);v(i._canInitEmulator,i,"emulator-config-failed"),v(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Wl(e),{host:o,port:a}=wf(e),l=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),If()}function Wl(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function wf(t){const e=Wl(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:ea(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:ea(o)}}}function ea(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function If(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Fe("not implemented")}_getIdTokenResponse(e){return Fe("not implemented")}_linkToIdToken(e,n){return Fe("not implemented")}_getReauthenticationResolver(e){return Fe("not implemented")}}async function bf(t,e){return Ge(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tf(t,e){return Hn(t,"POST","/v1/accounts:signInWithPassword",qe(t,e))}async function Hl(t,e){return Ge(t,"POST","/v1/accounts:sendOobCode",qe(t,e))}async function Cf(t,e){return Hl(t,e)}async function Sf(t,e){return Hl(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rf(t,e){return Hn(t,"POST","/v1/accounts:signInWithEmailLink",qe(t,e))}async function kf(t,e){return Hn(t,"POST","/v1/accounts:signInWithEmailLink",qe(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An extends Lr{constructor(e,n,i,s=null){super("password",i),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new An(e,n,"password")}static _fromEmailAndCode(e,n,i=null){return new An(e,n,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return bi(e,n,"signInWithPassword",Tf);case"emailLink":return Rf(e,{email:this._email,oobCode:this._password});default:we(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const i={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return bi(e,i,"signUpPassword",bf);case"emailLink":return kf(e,{idToken:n,email:this._email,oobCode:this._password});default:we(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $t(t,e){return Hn(t,"POST","/v1/accounts:signInWithIdp",qe(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Af="http://localhost";class Tt extends Lr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Tt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):we("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=n,r=Pr(n,["providerId","signInMethod"]);if(!i||!s)return null;const o=new Tt(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return $t(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,$t(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,$t(e,n)}buildRequest(){const e={requestUri:Af,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Xt(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pf(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Nf(t){const e=gn(yn(t)).link,n=e?gn(yn(e)).deep_link_id:null,i=gn(yn(t)).deep_link_id;return(i?gn(yn(i)).link:null)||i||n||e||t}class Mr{constructor(e){var n,i,s,r,o,a;const l=gn(yn(e)),c=(n=l.apiKey)!==null&&n!==void 0?n:null,u=(i=l.oobCode)!==null&&i!==void 0?i:null,d=Pf((s=l.mode)!==null&&s!==void 0?s:null);v(c&&u&&d,"argument-error"),this.apiKey=c,this.operation=d,this.code=u,this.continueUrl=(r=l.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=Nf(e);try{return new Mr(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(){this.providerId=Jt.PROVIDER_ID}static credential(e,n){return An._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const i=Mr.parseLink(n);return v(i,"argument-error"),An._fromEmailAndCode(e,i.code,i.tenantId)}}Jt.PROVIDER_ID="password";Jt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Jt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn extends Vl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe extends Vn{constructor(){super("facebook.com")}static credential(e){return Tt._fromParams({providerId:Qe.PROVIDER_ID,signInMethod:Qe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qe.credentialFromTaggedObject(e)}static credentialFromError(e){return Qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qe.credential(e.oauthAccessToken)}catch{return null}}}Qe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qe.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze extends Vn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Tt._fromParams({providerId:Ze.PROVIDER_ID,signInMethod:Ze.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ze.credentialFromTaggedObject(e)}static credentialFromError(e){return Ze.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return Ze.credential(n,i)}catch{return null}}}Ze.GOOGLE_SIGN_IN_METHOD="google.com";Ze.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe extends Vn{constructor(){super("github.com")}static credential(e){return Tt._fromParams({providerId:Xe.PROVIDER_ID,signInMethod:Xe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xe.credentialFromTaggedObject(e)}static credentialFromError(e){return Xe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xe.credential(e.oauthAccessToken)}catch{return null}}}Xe.GITHUB_SIGN_IN_METHOD="github.com";Xe.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je extends Vn{constructor(){super("twitter.com")}static credential(e,n){return Tt._fromParams({providerId:Je.PROVIDER_ID,signInMethod:Je.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Je.credentialFromTaggedObject(e)}static credentialFromError(e){return Je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return Je.credential(n,i)}catch{return null}}}Je.TWITTER_SIGN_IN_METHOD="twitter.com";Je.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Of(t,e){return Hn(t,"POST","/v1/accounts:signUp",qe(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const r=await Ue._fromIdTokenResponse(e,i,s),o=ta(i);return new Ct({user:r,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=ta(i);return new Ct({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function ta(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti extends je{constructor(e,n,i,s){var r;super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Ti.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new Ti(e,n,i,s)}}function zl(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Ti._fromErrorAndOperation(t,r,e,i):r})}async function Df(t,e,n=!1){const i=await kn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ct._forOperation(t,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xf(t,e,n=!1){const{auth:i}=t;if(Se(i.app))return Promise.reject(We(i));const s="reauthenticate";try{const r=await kn(t,zl(i,s,e,t),n);v(r.idToken,i,"internal-error");const o=Dr(r.idToken);v(o,i,"internal-error");const{sub:a}=o;return v(t.uid===a,i,"user-mismatch"),Ct._forOperation(t,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&we(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jl(t,e,n=!1){if(Se(t.app))return Promise.reject(We(t));const i="signIn",s=await zl(t,i,e),r=await Ct._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(r.user),r}async function Lf(t,e){return jl(pt(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ql(t){const e=pt(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Mf(t,e,n){const i=pt(t);await bi(i,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",Sf)}async function Ff(t,e,n){if(Se(t.app))return Promise.reject(We(t));const i=pt(t),o=await bi(i,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Of).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&ql(t),l}),a=await Ct._fromIdTokenResponse(i,"signIn",o);return await i._updateCurrentUser(a.user),a}function Uf(t,e,n){return Se(t.app)?Promise.reject(We(t)):Lf(C(t),Jt.credential(e,n)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&ql(t),i})}async function Bf(t,e){const n=C(t),s={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()},{email:r}=await Cf(n.auth,s);r!==t.email&&await t.reload()}function $f(t,e,n,i){return C(t).onIdTokenChanged(e,n,i)}function Wf(t,e,n){return C(t).beforeAuthStateChanged(e,n)}function Hf(t,e,n,i){return C(t).onAuthStateChanged(e,n,i)}function ln(t){return C(t).signOut()}const Ci="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ci,"1"),this.storage.removeItem(Ci),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vf=1e3,zf=10;class Kl extends Gl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ul(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);rf()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,zf):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},Vf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Kl.type="LOCAL";const jf=Kl;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl extends Gl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Yl.type="SESSION";const Ql=Yl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qf(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new qi(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:r}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(n.origin,r)),l=await qf(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}qi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fr(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=Fr("",20);s.port1.start();const u=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===c)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(){return window}function Kf(t){Ae().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(){return typeof Ae().WorkerGlobalScope<"u"&&typeof Ae().importScripts=="function"}async function Yf(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Qf(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Zf(){return Zl()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl="firebaseLocalStorageDb",Xf=1,Si="firebaseLocalStorage",Jl="fbase_key";class zn{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Gi(t,e){return t.transaction([Si],e?"readwrite":"readonly").objectStore(Si)}function Jf(){const t=indexedDB.deleteDatabase(Xl);return new zn(t).toPromise()}function er(){const t=indexedDB.open(Xl,Xf);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(Si,{keyPath:Jl})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(Si)?e(i):(i.close(),await Jf(),e(await er()))})})}async function na(t,e,n){const i=Gi(t,!0).put({[Jl]:e,value:n});return new zn(i).toPromise()}async function ep(t,e){const n=Gi(t,!1).get(e),i=await new zn(n).toPromise();return i===void 0?null:i.value}function ia(t,e){const n=Gi(t,!0).delete(e);return new zn(n).toPromise()}const tp=800,np=3;class ec{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await er(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>np)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Zl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=qi._getInstance(Zf()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Yf(),!this.activeServiceWorker)return;this.sender=new Gf(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((n=i[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Qf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await er();return await na(e,Ci,"1"),await ia(e,Ci),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>na(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>ep(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>ia(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=Gi(s,!1).getAll();return new zn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),tp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ec.type="LOCAL";const ip=ec;new Wn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sp(t,e){return e?Be(e):(v(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur extends Lr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return $t(e,this._buildIdpRequest())}_linkToIdToken(e,n){return $t(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return $t(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function rp(t){return jl(t.auth,new Ur(t),t.bypassAuthState)}function op(t){const{auth:e,user:n}=t;return v(n,e,"internal-error"),xf(n,new Ur(t),t.bypassAuthState)}async function ap(t){const{auth:e,user:n}=t;return v(n,e,"internal-error"),Df(n,new Ur(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,n,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return rp;case"linkViaPopup":case"linkViaRedirect":return ap;case"reauthViaPopup":case"reauthViaRedirect":return op;default:we(this.auth,"internal-error")}}resolve(e){Ve(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ve(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp=new Wn(2e3,1e4);class Mt extends tc{constructor(e,n,i,s,r){super(e,n,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Mt.currentPopupAction&&Mt.currentPopupAction.cancel(),Mt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return v(e,this.auth,"internal-error"),e}async onExecution(){Ve(this.filter.length===1,"Popup operations only handle one event");const e=Fr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ke(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ke(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Mt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,i;if(!((i=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ke(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,lp.get())};e()}}Mt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp="pendingRedirect",hi=new Map;class up extends tc{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=hi.get(this.auth._key());if(!e){try{const i=await dp(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}hi.set(this.auth._key(),e)}return this.bypassAuthState||hi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function dp(t,e){const n=pp(e),i=fp(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function hp(t,e){hi.set(t._key(),e)}function fp(t){return Be(t._redirectPersistence)}function pp(t){return di(cp,t.config.apiKey,t.name)}async function _p(t,e,n=!1){if(Se(t.app))return Promise.reject(We(t));const i=pt(t),s=sp(i,e),o=await new up(i,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp=10*60*1e3;class gp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!yp(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var i;if(e.error&&!nc(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";n.onError(ke(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=mp&&this.cachedEventUids.clear(),this.cachedEventUids.has(sa(e))}saveEventToCache(e){this.cachedEventUids.add(sa(e)),this.lastProcessedEventTime=Date.now()}}function sa(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function nc({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function yp(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return nc(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vp(t,e={}){return Ge(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,wp=/^https?/;async function Ip(t){if(t.config.emulator)return;const{authorizedDomains:e}=await vp(t);for(const n of e)try{if(bp(n))return}catch{}we(t,"unauthorized-domain")}function bp(t){const e=Xs(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!wp.test(n))return!1;if(Ep.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp=new Wn(3e4,6e4);function ra(){const t=Ae().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Cp(t){return new Promise((e,n)=>{var i,s,r;function o(){ra(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ra(),n(ke(t,"network-request-failed"))},timeout:Tp.get()})}if(!((s=(i=Ae().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=Ae().gapi)===null||r===void 0)&&r.load)o();else{const a=pf("iframefcb");return Ae()[a]=()=>{gapi.load?o():n(ke(t,"network-request-failed"))},$l(`${ff()}?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw fi=null,e})}let fi=null;function Sp(t){return fi=fi||Cp(t),fi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rp=new Wn(5e3,15e3),kp="__/auth/iframe",Ap="emulator/auth/iframe",Pp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Np=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Op(t){const e=t.config;v(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Or(e,Ap):`https://${t.config.authDomain}/${kp}`,i={apiKey:e.apiKey,appName:t.name,v:Pt},s=Np.get(t.config.apiHost);s&&(i.eid=s);const r=t._getFrameworks();return r.length&&(i.fw=r.join(",")),`${n}?${Xt(i).slice(1)}`}async function Dp(t){const e=await Sp(t),n=Ae().gapi;return v(n,t,"internal-error"),e.open({where:document.body,url:Op(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Pp,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ke(t,"network-request-failed"),a=Ae().setTimeout(()=>{r(o)},Rp.get());function l(){Ae().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Lp=500,Mp=600,Fp="_blank",Up="http://localhost";class oa{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Bp(t,e,n,i=Lp,s=Mp){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l=Object.assign(Object.assign({},xp),{width:i.toString(),height:s.toString(),top:r,left:o}),c=se().toLowerCase();n&&(a=Dl(c)?Fp:n),Nl(c)&&(e=e||Up,l.scrollbars="yes");const u=Object.entries(l).reduce((h,[p,f])=>`${h}${p}=${f},`,"");if(sf(c)&&a!=="_self")return $p(e||"",a),new oa(null);const d=window.open(e||"",a,u);v(d,t,"popup-blocked");try{d.focus()}catch{}return new oa(d)}function $p(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wp="__/auth/handler",Hp="emulator/auth/handler",Vp=encodeURIComponent("fac");async function aa(t,e,n,i,s,r){v(t.config.authDomain,t,"auth-domain-config-required"),v(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:Pt,eventId:s};if(e instanceof Vl){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",gi(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof Vn){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const l=await t._getAppCheckToken(),c=l?`#${Vp}=${encodeURIComponent(l)}`:"";return`${zp(t)}?${Xt(a).slice(1)}${c}`}function zp({config:t}){return t.emulator?Or(t,Hp):`https://${t.authDomain}/${Wp}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs="webStorageSupport";class jp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ql,this._completeRedirectFn=_p,this._overrideRedirectResult=hp}async _openPopup(e,n,i,s){var r;Ve((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await aa(e,n,i,Xs(),s);return Bp(e,o,Fr())}async _openRedirect(e,n,i,s){await this._originValidation(e);const r=await aa(e,n,i,Xs(),s);return Kf(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:r}=this.eventManagers[n];return s?Promise.resolve(s):(Ve(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await Dp(e),i=new gp(e);return n.register("authEvent",s=>(v(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Cs,{type:Cs},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Cs];o!==void 0&&n(!!o),we(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Ip(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ul()||Ol()||xr()}}const qp=jp;var la="@firebase/auth",ca="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){v(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Yp(t){bt(new Oe("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;v(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Bl(t)},c=new uf(i,s,r,l);return vf(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),bt(new Oe("auth-internal",e=>{const n=pt(e.getProvider("auth").getImmediate());return(i=>new Gp(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Re(la,ca,Kp(t)),Re(la,ca,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp=5*60,Zp=hl("authIdTokenMaxAge")||Qp;let ua=null;const Xp=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>Zp)return;const s=n==null?void 0:n.token;ua!==s&&(ua=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Jp(t=Ar()){const e=zi(t,"auth");if(e.isInitialized())return e.getImmediate();const n=yf(t,{popupRedirectResolver:qp,persistence:[ip,jf,Ql]}),i=hl("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=Xp(r.toString());Wf(n,o,()=>o(n.currentUser)),$f(n,a=>o(a))}}const s=cl("auth");return s&&Ef(n,`http://${s}`),n}function e_(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}df({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const r=ke("internal-error");r.customData=s,n(r)},i.type="text/javascript",i.charset="UTF-8",e_().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Yp("Browser");var da={};const ha="@firebase/database",fa="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ic="";function Br(t){ic=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),G(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Sn(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Ie(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sc=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new t_(e)}}catch{}return new n_},yt=sc("localStorage"),tr=sc("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt=new Rr("@firebase/database"),rc=function(){let t=1;return function(){return t++}}(),oc=function(t){const e=Od(t),n=new kd;n.update(e);const i=n.digest();return Tr.encodeByteArray(i)},jn=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=jn.apply(null,i):typeof i=="object"?e+=G(i):e+=i,e+=" "}return e};let vt=null,pa=!0;const ac=function(t,e){_(!e||t===!0||t===!1,"Can't turn on custom loggers persistently."),t===!0?(Wt.logLevel=N.VERBOSE,vt=Wt.log.bind(Wt),e&&tr.set("logging_enabled",!0)):typeof t=="function"?vt=t:(vt=null,tr.remove("logging_enabled"))},Q=function(...t){if(pa===!0&&(pa=!1,vt===null&&tr.get("logging_enabled")===!0&&ac(!0)),vt){const e=jn.apply(null,t);vt(e)}},qn=function(t){return function(...e){Q(t,...e)}},nr=function(...t){const e="FIREBASE INTERNAL ERROR: "+jn(...t);Wt.error(e)},De=function(...t){const e=`FIREBASE FATAL ERROR: ${jn(...t)}`;throw Wt.error(e),new Error(e)},ee=function(...t){const e="FIREBASE WARNING: "+jn(...t);Wt.warn(e)},i_=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ee("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ki=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},s_=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},lt="[MIN_NAME]",ze="[MAX_NAME]",Nt=function(t,e){if(t===e)return 0;if(t===lt||e===ze)return-1;if(e===lt||t===ze)return 1;{const n=_a(t),i=_a(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},r_=function(t,e){return t===e?0:t<e?-1:1},cn=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+G(e))},$r=function(t){if(typeof t!="object"||t===null)return G(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=G(e[i]),n+=":",n+=$r(t[e[i]]);return n+="}",n},lc=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function Z(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const cc=function(t){_(!Ki(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const u=c.join("");let d="";for(l=0;l<64;l+=8){let h=parseInt(u.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},o_=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},a_=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function l_(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const c_=new RegExp("^-?(0*)\\d{1,10}$"),u_=-2147483648,d_=2147483647,_a=function(t){if(c_.test(t)){const e=Number(t);if(e>=u_&&e<=d_)return e}return null},en=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw ee("Exception was thrown by user callback.",n),e},Math.floor(0))}},h_=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},En=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){ee(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Q("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ee(e)}}class Ht{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ht.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr="5",uc="v",dc="s",hc="r",fc="f",pc=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,_c="ls",mc="p",ir="ac",gc="websocket",yc="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=yt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&yt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function __(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Ec(t,e,n){_(typeof e=="string","typeof type must == string"),_(typeof n=="object","typeof params must == object");let i;if(e===gc)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===yc)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);__(t)&&(n.ns=t.namespace);const s=[];return Z(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(){this.counters_={}}incrementCounter(e,n=1){Ie(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return dd(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss={},Rs={};function Hr(t){const e=t.toString();return Ss[e]||(Ss[e]=new m_),Ss[e]}function g_(t,e){const n=t.toString();return Rs[n]||(Rs[n]=e()),Rs[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&en(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma="start",v_="close",E_="pLPCommand",w_="pRTLPCB",wc="id",Ic="pw",bc="ser",I_="cb",b_="seg",T_="ts",C_="d",S_="dframe",Tc=1870,Cc=30,R_=Tc-Cc,k_=25e3,A_=3e4;class nt{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=qn(e),this.stats_=Hr(n),this.urlFn=l=>(this.appCheckToken&&(l[ir]=this.appCheckToken),Ec(n,yc,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new y_(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(A_)),s_(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Vr((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ma)this.id=a,this.password=l;else if(o===v_)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[ma]="t",i[bc]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[I_]=this.scriptTagHolder.uniqueCallbackIdentifier),i[uc]=Wr,this.transportSessionId&&(i[dc]=this.transportSessionId),this.lastSessionId&&(i[_c]=this.lastSessionId),this.applicationId&&(i[mc]=this.applicationId),this.appCheckToken&&(i[ir]=this.appCheckToken),typeof location<"u"&&location.hostname&&pc.test(location.hostname)&&(i[hc]=fc);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){nt.forceAllow_=!0}static forceDisallow(){nt.forceDisallow_=!0}static isAvailable(){return nt.forceAllow_?!0:!nt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!o_()&&!a_()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=G(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=al(n),s=lc(i,R_);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[S_]="t",i[wc]=e,i[Ic]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=G(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Vr{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=rc(),window[E_+this.uniqueCallbackIdentifier]=e,window[w_+this.uniqueCallbackIdentifier]=n,this.myIFrame=Vr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Q("frame writing exception"),a.stack&&Q(a.stack),Q(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Q("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[wc]=this.myID,e[Ic]=this.myPW,e[bc]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Cc+i.length<=Tc;){const o=this.pendingSegs.shift();i=i+"&"+b_+s+"="+o.seg+"&"+T_+s+"="+o.ts+"&"+C_+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(k_)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{Q("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P_=16384,N_=45e3;let Ri=null;typeof MozWebSocket<"u"?Ri=MozWebSocket:typeof WebSocket<"u"&&(Ri=WebSocket);class ce{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=qn(this.connId),this.stats_=Hr(n),this.connURL=ce.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[uc]=Wr,typeof location<"u"&&location.hostname&&pc.test(location.hostname)&&(o[hc]=fc),n&&(o[dc]=n),i&&(o[_c]=i),s&&(o[ir]=s),r&&(o[mc]=r),Ec(e,gc,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,yt.set("previous_websocket_failure",!0);try{let i;Ed(),this.mySock=new Ri(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ce.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Ri!==null&&!ce.forceDisallow_}static previouslyFailed(){return yt.isInMemoryStorage||yt.get("previous_websocket_failure")===!0}markConnectionHealthy(){yt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Sn(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(_(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=G(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=lc(n,P_);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(N_))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ce.responsesRequiredToBeHealthy=2;ce.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[nt,ce]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=ce&&ce.isAvailable();let i=n&&!ce.previouslyFailed();if(e.webSocketOnly&&(n||ee("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ce];else{const s=this.transports_=[];for(const r of zt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);zt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}zt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_=6e4,D_=5e3,x_=10*1024,L_=100*1024,ks="t",ga="d",M_="s",ya="r",F_="e",va="o",Ea="a",wa="n",Ia="p",U_="h";class B_{constructor(e,n,i,s,r,o,a,l,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=qn("c:"+this.id+":"),this.transportManager_=new zt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=En(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>L_?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>x_?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ks in e){const n=e[ks];n===Ea?this.upgradeIfSecondaryHealthy_():n===ya?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===va&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=cn("t",e),i=cn("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ia,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ea,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:wa,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=cn("t",e),i=cn("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=cn(ks,e);if(ga in e){const i=e[ga];if(n===U_){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===wa){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===M_?this.onConnectionShutdown_(i):n===ya?this.onReset_(i):n===F_?nr("Server Error: "+i):n===va?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):nr("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Wr!==i&&ee("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),En(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(O_))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):En(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(D_))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ia,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(yt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{constructor(e){this.allowedEvents_=e,this.listeners_={},_(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){_(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki extends Rc{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Sr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ki}getInitialEvent(e){return _(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ba=32,Ta=768;class A{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function R(){return new A("")}function w(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function ct(t){return t.pieces_.length-t.pieceNum_}function D(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new A(t.pieces_,e)}function zr(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function $_(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Pn(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function kc(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new A(e,0)}function $(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof A)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new A(n,0)}function I(t){return t.pieceNum_>=t.pieces_.length}function ie(t,e){const n=w(t),i=w(e);if(n===null)return e;if(n===i)return ie(D(t),D(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function W_(t,e){const n=Pn(t,0),i=Pn(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=Nt(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function jr(t,e){if(ct(t)!==ct(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function ue(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(ct(t)>ct(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class H_{constructor(e,n){this.errorPrefix_=n,this.parts_=Pn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Vi(this.parts_[i]);Ac(this)}}function V_(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Vi(e),Ac(t)}function z_(t){const e=t.parts_.pop();t.byteLength_-=Vi(e),t.parts_.length>0&&(t.byteLength_-=1)}function Ac(t){if(t.byteLength_>Ta)throw new Error(t.errorPrefix_+"has a key path longer than "+Ta+" bytes ("+t.byteLength_+").");if(t.parts_.length>ba)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ba+") or object contains a cycle "+gt(t))}function gt(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr extends Rc{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new qr}getInitialEvent(e){return _(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un=1e3,j_=60*5*1e3,Ca=30*1e3,q_=1.3,G_=3e4,K_="server_kill",Sa=3;class fe extends Sc{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=fe.nextPersistentConnectionId_++,this.log_=qn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=un,this.maxReconnectDelay_=j_,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");qr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ki.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(G(r)),_(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new ae,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),_(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;fe.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Ie(e,"w")){const i=wt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();ee(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Rd(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ca)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Sd(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+G(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):nr("Unrecognized action received from server: "+G(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){_(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=un,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=un,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>G_&&(this.reconnectDelay_=un),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*q_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+fe.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(d){_(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?Q("getToken() completed but was canceled"):(Q("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new B_(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,p=>{ee(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(K_)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&ee(d),l())}}}interrupt(e){Q("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Q("Resuming connection for reason: "+e),delete this.interruptReasons_[e],gi(this.interruptReasons_)&&(this.reconnectDelay_=un,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>$r(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new A(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){Q("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Sa&&(this.reconnectDelay_=Ca,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Q("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Sa&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+ic.replace(/\./g,"-")]=1,Sr()?e["framework.cordova"]=1:pl()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ki.getInstance().currentlyOnline();return gi(this.interruptReasons_)&&e}}fe.nextPersistentConnectionId_=0;fe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new b(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new b(lt,e),s=new b(lt,n);return this.compare(i,s)!==0}minPost(){return b.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let si;class Pc extends Yi{static get __EMPTY_NODE(){return si}static set __EMPTY_NODE(e){si=e}compare(e,n){return Nt(e.name,n.name)}isDefinedOn(e){throw Zt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return b.MIN}maxPost(){return new b(ze,si)}makePost(e,n){return _(typeof e=="string","KeyIndex indexValue must always be a string."),new b(e,si)}toString(){return".key"}}const Pe=new Pc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Y{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??Y.RED,this.left=s??re.EMPTY_NODE,this.right=r??re.EMPTY_NODE}copy(e,n,i,s,r){return new Y(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return re.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return re.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Y.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Y.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Y.RED=!0;Y.BLACK=!1;class Y_{copy(e,n,i,s,r){return this}insert(e,n,i){return new Y(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class re{constructor(e,n=re.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new re(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Y.BLACK,null,null))}remove(e){return new re(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Y.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ri(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new ri(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new ri(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new ri(this.root_,null,this.comparator_,!0,e)}}re.EMPTY_NODE=new Y_;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q_(t,e){return Nt(t.name,e.name)}function Gr(t,e){return Nt(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sr;function Z_(t){sr=t}const Nc=function(t){return typeof t=="number"?"number:"+cc(t):"string:"+t},Oc=function(t){if(t.isLeafNode()){const e=t.val();_(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ie(e,".sv"),"Priority must be a string or number.")}else _(t===sr||t.isEmpty(),"priority of unexpected type.");_(t===sr||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ra;class K{constructor(e,n=K.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,_(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Oc(this.priorityNode_)}static set __childrenNodeConstructor(e){Ra=e}static get __childrenNodeConstructor(){return Ra}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new K(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:K.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return I(e)?this:w(e)===".priority"?this.priorityNode_:K.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:K.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=w(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(_(i!==".priority"||ct(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,K.__childrenNodeConstructor.EMPTY_NODE.updateChild(D(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Nc(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=cc(this.value_):e+=this.value_,this.lazyHash_=oc(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===K.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof K.__childrenNodeConstructor?-1:(_(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=K.VALUE_TYPE_ORDER.indexOf(n),r=K.VALUE_TYPE_ORDER.indexOf(i);return _(s>=0,"Unknown leaf type: "+n),_(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}K.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dc,xc;function X_(t){Dc=t}function J_(t){xc=t}class em extends Yi{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?Nt(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return b.MIN}maxPost(){return new b(ze,new K("[PRIORITY-POST]",xc))}makePost(e,n){const i=Dc(e);return new b(n,new K("[PRIORITY-POST]",i))}toString(){return".priority"}}const L=new em;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tm=Math.log(2);class nm{constructor(e){const n=r=>parseInt(Math.log(r)/tm,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ai=function(t,e,n,i){t.sort(e);const s=function(l,c){const u=c-l;let d,h;if(u===0)return null;if(u===1)return d=t[l],h=n?n(d):d,new Y(h,d.node,Y.BLACK,null,null);{const p=parseInt(u/2,10)+l,f=s(l,p),m=s(p+1,c);return d=t[p],h=n?n(d):d,new Y(h,d.node,Y.BLACK,f,m)}},r=function(l){let c=null,u=null,d=t.length;const h=function(f,m){const g=d-f,P=d;d-=f;const k=s(g+1,P),E=t[g],T=n?n(E):E;p(new Y(T,E.node,m,null,k))},p=function(f){c?(c.left=f,c=f):(u=f,c=f)};for(let f=0;f<l.count;++f){const m=l.nextBitIsOne(),g=Math.pow(2,l.count-(f+1));m?h(g,Y.BLACK):(h(g,Y.BLACK),h(g,Y.RED))}return u},o=new nm(t.length),a=r(o);return new re(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let As;const xt={};class $e{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return _(xt&&L,"ChildrenNode.ts has not been loaded"),As=As||new $e({".priority":xt},{".priority":L}),As}get(e){const n=wt(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof re?n:null}hasIndex(e){return Ie(this.indexSet_,e.toString())}addIndex(e,n){_(e!==Pe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(b.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Ai(i,e.getCompare()):a=xt;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const u=Object.assign({},this.indexes_);return u[l]=a,new $e(u,c)}addToIndexes(e,n){const i=yi(this.indexes_,(s,r)=>{const o=wt(this.indexSet_,r);if(_(o,"Missing index implementation for "+r),s===xt)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(b.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Ai(a,o.getCompare())}else return xt;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new b(e.name,a))),l.insert(e,e.node)}});return new $e(i,this.indexSet_)}removeFromIndexes(e,n){const i=yi(this.indexes_,s=>{if(s===xt)return s;{const r=n.get(e.name);return r?s.remove(new b(e.name,r)):s}});return new $e(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dn;class y{constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Oc(this.priorityNode_),this.children_.isEmpty()&&_(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return dn||(dn=new y(new re(Gr),null,$e.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||dn}updatePriority(e){return this.children_.isEmpty()?this:new y(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?dn:n}}getChild(e){const n=w(e);return n===null?this:this.getImmediateChild(n).getChild(D(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(_(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new b(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?dn:this.priorityNode_;return new y(s,o,r)}}updateChild(e,n){const i=w(e);if(i===null)return n;{_(w(e)!==".priority"||ct(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(D(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(L,(o,a)=>{n[o]=a.val(e),i++,r&&y.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Nc(this.getPriority().val())+":"),this.forEachChild(L,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":oc(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new b(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new b(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new b(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,b.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,b.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Gn?-1:0}withIndex(e){if(e===Pe||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new y(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Pe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(L),s=n.getIterator(L);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Pe?null:this.indexMap_.get(e.toString())}}y.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class im extends y{constructor(){super(new re(Gr),y.EMPTY_NODE,$e.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return y.EMPTY_NODE}isEmpty(){return!1}}const Gn=new im;Object.defineProperties(b,{MIN:{value:new b(lt,y.EMPTY_NODE)},MAX:{value:new b(ze,Gn)}});Pc.__EMPTY_NODE=y.EMPTY_NODE;K.__childrenNodeConstructor=y;Z_(Gn);J_(Gn);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm=!0;function H(t,e=null){if(t===null)return y.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),_(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new K(n,H(e))}if(!(t instanceof Array)&&sm){const n=[];let i=!1;if(Z(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=H(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new b(o,l)))}}),n.length===0)return y.EMPTY_NODE;const r=Ai(n,Q_,o=>o.name,Gr);if(i){const o=Ai(n,L.getCompare());return new y(r,H(e),new $e({".priority":o},{".priority":L}))}else return new y(r,H(e),$e.Default)}else{let n=y.EMPTY_NODE;return Z(t,(i,s)=>{if(Ie(t,i)&&i.substring(0,1)!=="."){const r=H(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(H(e))}}X_(H);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr extends Yi{constructor(e){super(),this.indexPath_=e,_(!I(e)&&w(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?Nt(e.name,n.name):r}makePost(e,n){const i=H(e),s=y.EMPTY_NODE.updateChild(this.indexPath_,i);return new b(n,s)}maxPost(){const e=y.EMPTY_NODE.updateChild(this.indexPath_,Gn);return new b(ze,e)}toString(){return Pn(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm extends Yi{compare(e,n){const i=e.node.compareTo(n.node);return i===0?Nt(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return b.MIN}maxPost(){return b.MAX}makePost(e,n){const i=H(e);return new b(n,i)}toString(){return".value"}}const Yr=new rm;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lc(t){return{type:"value",snapshotNode:t}}function jt(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Nn(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function On(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function om(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){_(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Nn(n,a)):_(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(jt(n,i)):o.trackChildChange(On(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(L,(s,r)=>{n.hasChild(s)||i.trackChildChange(Nn(s,r))}),n.isLeafNode()||n.forEachChild(L,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(On(s,r,o))}else i.trackChildChange(jt(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?y.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e){this.indexedFilter_=new Qr(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Dn.getStartPost_(e),this.endPost_=Dn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new b(n,i))||(i=y.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=y.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(y.EMPTY_NODE);const r=this;return n.forEachChild(L,(o,a)=>{r.matches(new b(o,a))||(s=s.updateImmediateChild(o,y.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Dn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new b(n,i))||(i=y.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=y.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=y.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(y.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,y.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,p)=>d(p,h)}else o=this.index_.getCompare();const a=e;_(a.numChildren()===this.limit_,"");const l=new b(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(u&&!i.isEmpty()&&p>=0)return r!=null&&r.trackChildChange(On(n,i,d)),a.updateImmediateChild(n,i);{r!=null&&r.trackChildChange(Nn(n,d));const m=a.updateImmediateChild(n,y.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r!=null&&r.trackChildChange(jt(h.name,h.node)),m.updateImmediateChild(h.name,h.node)):m}}else return i.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Nn(c.name,c.node)),r.trackChildChange(jt(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,y.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=L}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return _(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return _(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:lt}hasEnd(){return this.endSet_}getIndexEndValue(){return _(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return _(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ze}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return _(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===L}copy(){const e=new Qi;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function lm(t){return t.loadsAllData()?new Qr(t.getIndex()):t.hasLimit()?new am(t):new Dn(t)}function cm(t,e){const n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="l",n}function um(t,e){const n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="r",n}function rr(t,e,n){const i=t.copy();return i.startSet_=!0,e===void 0&&(e=null),i.indexStartValue_=e,n!=null?(i.startNameSet_=!0,i.indexStartName_=n):(i.startNameSet_=!1,i.indexStartName_=""),i}function dm(t,e,n){let i;return t.index_===Pe||n?i=rr(t,e,n):i=rr(t,e,ze),i.startAfterSet_=!0,i}function or(t,e,n){const i=t.copy();return i.endSet_=!0,e===void 0&&(e=null),i.indexEndValue_=e,n!==void 0?(i.endNameSet_=!0,i.indexEndName_=n):(i.endNameSet_=!1,i.indexEndName_=""),i}function hm(t,e,n){let i;return t.index_===Pe||n?i=or(t,e,n):i=or(t,e,lt),i.endBeforeSet_=!0,i}function Zi(t,e){const n=t.copy();return n.index_=e,n}function ka(t){const e={};if(t.isDefault())return e;let n;if(t.index_===L?n="$priority":t.index_===Yr?n="$value":t.index_===Pe?n="$key":(_(t.index_ instanceof Kr,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=G(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=G(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+G(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=G(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+G(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Aa(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==L&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi extends Sc{constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=qn("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(_(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Pi.getListenId_(e,i),a={};this.listens_[o]=a;const l=ka(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let d=u;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(r,d,!1,i),wt(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,n){const i=Pi.getListenId_(e,n);delete this.listens_[i]}get(e){const n=ka(e._queryParams),i=e._path.toString(),s=new ae;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Xt(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Sn(a.responseText)}catch{ee("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&ee("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(){this.rootNode_=y.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ni(){return{value:null,children:new Map}}function tn(t,e,n){if(I(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=w(e);t.children.has(i)||t.children.set(i,Ni());const s=t.children.get(i);e=D(e),tn(s,e,n)}}function ar(t,e){if(I(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(L,(i,s)=>{tn(t,new A(i),s)}),ar(t,e)}}else if(t.children.size>0){const n=w(e);return e=D(e),t.children.has(n)&&ar(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function lr(t,e,n){t.value!==null?n(e,t.value):pm(t,(i,s)=>{const r=new A(e.toString()+"/"+i);lr(s,r,n)})}function pm(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&Z(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa=10*1e3,mm=30*1e3,gm=5*60*1e3;class ym{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new _m(e);const i=Pa+(mm-Pa)*Math.random();En(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;Z(e,(s,r)=>{r>0&&Ie(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),En(this.reportStats_.bind(this),Math.floor(Math.random()*2*gm))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ge||(ge={}));function Zr(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Xr(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Jr(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=ge.ACK_USER_WRITE,this.source=Zr()}operationForChild(e){if(I(this.path)){if(this.affectedTree.value!=null)return _(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new A(e));return new Oi(R(),n,this.revert)}}else return _(w(this.path)===e,"operationForChild called for unrelated child."),new Oi(D(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e,n){this.source=e,this.path=n,this.type=ge.LISTEN_COMPLETE}operationForChild(e){return I(this.path)?new xn(this.source,R()):new xn(this.source,D(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=ge.OVERWRITE}operationForChild(e){return I(this.path)?new St(this.source,R(),this.snap.getImmediateChild(e)):new St(this.source,D(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=ge.MERGE}operationForChild(e){if(I(this.path)){const n=this.children.subtree(new A(e));return n.isEmpty()?null:n.value?new St(this.source,R(),n.value):new qt(this.source,R(),n)}else return _(w(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new qt(this.source,D(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(I(e))return this.isFullyInitialized()&&!this.filtered_;const n=w(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Em(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(om(o.childName,o.snapshotNode))}),hn(t,s,"child_removed",e,i,n),hn(t,s,"child_added",e,i,n),hn(t,s,"child_moved",r,i,n),hn(t,s,"child_changed",e,i,n),hn(t,s,"value",e,i,n),s}function hn(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>Im(t,a,l)),o.forEach(a=>{const l=wm(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function wm(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Im(t,e,n){if(e.childName==null||n.childName==null)throw Zt("Should only compare child_ events.");const i=new b(e.childName,e.snapshotNode),s=new b(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(t,e){return{eventCache:t,serverCache:e}}function wn(t,e,n,i){return Xi(new ut(e,n,i),t.serverCache)}function Mc(t,e,n,i){return Xi(t.eventCache,new ut(e,n,i))}function Di(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Rt(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ps;const bm=()=>(Ps||(Ps=new re(r_)),Ps);class x{constructor(e,n=bm()){this.value=e,this.children=n}static fromObject(e){let n=new x(null);return Z(e,(i,s)=>{n=n.set(new A(i),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:R(),value:this.value};if(I(e))return null;{const i=w(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(D(e),n);return r!=null?{path:$(new A(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(I(e))return this;{const n=w(e),i=this.children.get(n);return i!==null?i.subtree(D(e)):new x(null)}}set(e,n){if(I(e))return new x(n,this.children);{const i=w(e),r=(this.children.get(i)||new x(null)).set(D(e),n),o=this.children.insert(i,r);return new x(this.value,o)}}remove(e){if(I(e))return this.children.isEmpty()?new x(null):new x(null,this.children);{const n=w(e),i=this.children.get(n);if(i){const s=i.remove(D(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new x(null):new x(this.value,r)}else return this}}get(e){if(I(e))return this.value;{const n=w(e),i=this.children.get(n);return i?i.get(D(e)):null}}setTree(e,n){if(I(e))return n;{const i=w(e),r=(this.children.get(i)||new x(null)).setTree(D(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new x(this.value,o)}}fold(e){return this.fold_(R(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_($(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,R(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(I(e))return null;{const r=w(e),o=this.children.get(r);return o?o.findOnPath_(D(e),$(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,R(),n)}foreachOnPath_(e,n,i){if(I(e))return this;{this.value&&i(n,this.value);const s=w(e),r=this.children.get(s);return r?r.foreachOnPath_(D(e),$(n,s),i):new x(null)}}foreach(e){this.foreach_(R(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_($(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.writeTree_=e}static empty(){return new ve(new x(null))}}function In(t,e,n){if(I(e))return new ve(new x(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=ie(s,e);return r=r.updateChild(o,n),new ve(t.writeTree_.set(s,r))}else{const s=new x(n),r=t.writeTree_.setTree(e,s);return new ve(r)}}}function cr(t,e,n){let i=t;return Z(n,(s,r)=>{i=In(i,$(e,s),r)}),i}function Na(t,e){if(I(e))return ve.empty();{const n=t.writeTree_.setTree(e,new x(null));return new ve(n)}}function ur(t,e){return Ot(t,e)!=null}function Ot(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(ie(n.path,e)):null}function Oa(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(L,(i,s)=>{e.push(new b(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new b(i,s.value))}),e}function ot(t,e){if(I(e))return t;{const n=Ot(t,e);return n!=null?new ve(new x(n)):new ve(t.writeTree_.subtree(e))}}function dr(t){return t.writeTree_.isEmpty()}function Gt(t,e){return Fc(R(),t.writeTree_,e)}function Fc(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(_(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Fc($(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild($(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ji(t,e){return Wc(e,t)}function Tm(t,e,n,i,s){_(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=In(t.visibleWrites,e,n)),t.lastWriteId=i}function Cm(t,e,n,i){_(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=cr(t.visibleWrites,e,n),t.lastWriteId=i}function Sm(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function Rm(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);_(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&km(a,i.path)?s=!1:ue(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Am(t),!0;if(i.snap)t.visibleWrites=Na(t.visibleWrites,i.path);else{const a=i.children;Z(a,l=>{t.visibleWrites=Na(t.visibleWrites,$(i.path,l))})}return!0}else return!1}function km(t,e){if(t.snap)return ue(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&ue($(t.path,n),e))return!0;return!1}function Am(t){t.visibleWrites=Uc(t.allWrites,Pm,R()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Pm(t){return t.visible}function Uc(t,e,n){let i=ve.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)ue(n,o)?(a=ie(n,o),i=In(i,a,r.snap)):ue(o,n)&&(a=ie(o,n),i=In(i,R(),r.snap.getChild(a)));else if(r.children){if(ue(n,o))a=ie(n,o),i=cr(i,a,r.children);else if(ue(o,n))if(a=ie(o,n),I(a))i=cr(i,R(),r.children);else{const l=wt(r.children,w(a));if(l){const c=l.getChild(D(a));i=In(i,R(),c)}}}else throw Zt("WriteRecord should have .snap or .children")}}return i}function Bc(t,e,n,i,s){if(!i&&!s){const r=Ot(t.visibleWrites,e);if(r!=null)return r;{const o=ot(t.visibleWrites,e);if(dr(o))return n;if(n==null&&!ur(o,R()))return null;{const a=n||y.EMPTY_NODE;return Gt(o,a)}}}else{const r=ot(t.visibleWrites,e);if(!s&&dr(r))return n;if(!s&&n==null&&!ur(r,R()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(ue(c.path,e)||ue(e,c.path))},a=Uc(t.allWrites,o,e),l=n||y.EMPTY_NODE;return Gt(a,l)}}}function Nm(t,e,n){let i=y.EMPTY_NODE;const s=Ot(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(L,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=ot(t.visibleWrites,e);return n.forEachChild(L,(o,a)=>{const l=Gt(ot(r,new A(o)),a);i=i.updateImmediateChild(o,l)}),Oa(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=ot(t.visibleWrites,e);return Oa(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Om(t,e,n,i,s){_(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=$(e,n);if(ur(t.visibleWrites,r))return null;{const o=ot(t.visibleWrites,r);return dr(o)?s.getChild(n):Gt(o,s.getChild(n))}}function Dm(t,e,n,i){const s=$(e,n),r=Ot(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=ot(t.visibleWrites,s);return Gt(o,i.getNode().getImmediateChild(n))}else return null}function xm(t,e){return Ot(t.visibleWrites,e)}function Lm(t,e,n,i,s,r,o){let a;const l=ot(t.visibleWrites,e),c=Ot(l,R());if(c!=null)a=c;else if(n!=null)a=Gt(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=h.getNext();for(;p&&u.length<s;)d(p,i)!==0&&u.push(p),p=h.getNext();return u}else return[]}function Mm(){return{visibleWrites:ve.empty(),allWrites:[],lastWriteId:-1}}function xi(t,e,n,i){return Bc(t.writeTree,t.treePath,e,n,i)}function eo(t,e){return Nm(t.writeTree,t.treePath,e)}function Da(t,e,n,i){return Om(t.writeTree,t.treePath,e,n,i)}function Li(t,e){return xm(t.writeTree,$(t.treePath,e))}function Fm(t,e,n,i,s,r){return Lm(t.writeTree,t.treePath,e,n,i,s,r)}function to(t,e,n){return Dm(t.writeTree,t.treePath,e,n)}function $c(t,e){return Wc($(t.treePath,e),t.writeTree)}function Wc(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;_(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),_(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,On(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Nn(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,jt(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,On(i,e.snapshotNode,s.oldSnap));else throw Zt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bm{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const Hc=new Bm;class no{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new ut(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return to(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Rt(this.viewCache_),r=Fm(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $m(t){return{filter:t}}function Wm(t,e){_(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),_(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Hm(t,e,n,i,s){const r=new Um;let o,a;if(n.type===ge.OVERWRITE){const c=n;c.source.fromUser?o=hr(t,e,c.path,c.snap,i,s,r):(_(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!I(c.path),o=Mi(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===ge.MERGE){const c=n;c.source.fromUser?o=zm(t,e,c.path,c.children,i,s,r):(_(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=fr(t,e,c.path,c.children,i,s,a,r))}else if(n.type===ge.ACK_USER_WRITE){const c=n;c.revert?o=Gm(t,e,c.path,i,s,r):o=jm(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===ge.LISTEN_COMPLETE)o=qm(t,e,n.path,i,r);else throw Zt("Unknown operation type: "+n.type);const l=r.getChanges();return Vm(e,o,l),{viewCache:o,changes:l}}function Vm(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Di(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Lc(Di(e)))}}function Vc(t,e,n,i,s,r){const o=e.eventCache;if(Li(i,n)!=null)return e;{let a,l;if(I(n))if(_(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Rt(e),u=c instanceof y?c:y.EMPTY_NODE,d=eo(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const c=xi(i,Rt(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=w(n);if(c===".priority"){_(ct(n)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const d=Da(i,n,u,l);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=D(n);let d;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=Da(i,n,o.getNode(),l);h!=null?d=o.getNode().getImmediateChild(c).updateChild(u,h):d=o.getNode().getImmediateChild(c)}else d=to(i,c,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),c,d,u,s,r):a=o.getNode()}}return wn(e,a,o.isFullyInitialized()||I(n),t.filter.filtersNodes())}}function Mi(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(I(n))c=u.updateFullNode(l.getNode(),i,null);else if(u.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(n,i);c=u.updateFullNode(l.getNode(),p,null)}else{const p=w(n);if(!l.isCompleteForPath(n)&&ct(n)>1)return e;const f=D(n),g=l.getNode().getImmediateChild(p).updateChild(f,i);p===".priority"?c=u.updatePriority(l.getNode(),g):c=u.updateChild(l.getNode(),p,g,f,Hc,null)}const d=Mc(e,c,l.isFullyInitialized()||I(n),u.filtersNodes()),h=new no(s,d,r);return Vc(t,d,n,s,h,a)}function hr(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const u=new no(s,e,r);if(I(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=wn(e,c,!0,t.filter.filtersNodes());else{const d=w(n);if(d===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=wn(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=D(n),p=a.getNode().getImmediateChild(d);let f;if(I(h))f=i;else{const m=u.getCompleteChild(d);m!=null?zr(h)===".priority"&&m.getChild(kc(h)).isEmpty()?f=m:f=m.updateChild(h,i):f=y.EMPTY_NODE}if(p.equals(f))l=e;else{const m=t.filter.updateChild(a.getNode(),d,f,h,u,o);l=wn(e,m,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function xa(t,e){return t.eventCache.isCompleteForChild(e)}function zm(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const u=$(n,l);xa(e,w(u))&&(a=hr(t,a,u,c,s,r,o))}),i.foreach((l,c)=>{const u=$(n,l);xa(e,w(u))||(a=hr(t,a,u,c,s,r,o))}),a}function La(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function fr(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;I(n)?c=i:c=new x(null).setTree(n,i);const u=e.serverCache.getNode();return c.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const p=e.serverCache.getNode().getImmediateChild(d),f=La(t,p,h);l=Mi(t,l,new A(d),f,s,r,o,a)}}),c.children.inorderTraversal((d,h)=>{const p=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!p){const f=e.serverCache.getNode().getImmediateChild(d),m=La(t,f,h);l=Mi(t,l,new A(d),m,s,r,o,a)}}),l}function jm(t,e,n,i,s,r,o){if(Li(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(I(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Mi(t,e,n,l.getNode().getChild(n),s,r,a,o);if(I(n)){let c=new x(null);return l.getNode().forEachChild(Pe,(u,d)=>{c=c.set(new A(u),d)}),fr(t,e,n,c,s,r,a,o)}else return e}else{let c=new x(null);return i.foreach((u,d)=>{const h=$(n,u);l.isCompleteForPath(h)&&(c=c.set(u,l.getNode().getChild(h)))}),fr(t,e,n,c,s,r,a,o)}}function qm(t,e,n,i,s){const r=e.serverCache,o=Mc(e,r.getNode(),r.isFullyInitialized()||I(n),r.isFiltered());return Vc(t,o,n,i,Hc,s)}function Gm(t,e,n,i,s,r){let o;if(Li(i,n)!=null)return e;{const a=new no(i,e,s),l=e.eventCache.getNode();let c;if(I(n)||w(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=xi(i,Rt(e));else{const d=e.serverCache.getNode();_(d instanceof y,"serverChildren would be complete if leaf node"),u=eo(i,d)}u=u,c=t.filter.updateFullNode(l,u,r)}else{const u=w(n);let d=to(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=l.getImmediateChild(u)),d!=null?c=t.filter.updateChild(l,u,d,D(n),a,r):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(l,u,y.EMPTY_NODE,D(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=xi(i,Rt(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Li(i,R())!=null,wn(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Qr(i.getIndex()),r=lm(i);this.processor_=$m(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(y.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(y.EMPTY_NODE,a.getNode(),null),u=new ut(l,o.isFullyInitialized(),s.filtersNodes()),d=new ut(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Xi(d,u),this.eventGenerator_=new vm(this.query_)}get query(){return this.query_}}function Ym(t){return t.viewCache_.serverCache.getNode()}function Qm(t){return Di(t.viewCache_)}function Zm(t,e){const n=Rt(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!I(e)&&!n.getImmediateChild(w(e)).isEmpty())?n.getChild(e):null}function Ma(t){return t.eventRegistrations_.length===0}function Xm(t,e){t.eventRegistrations_.push(e)}function Fa(t,e,n){const i=[];if(n){_(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function Ua(t,e,n,i){e.type===ge.MERGE&&e.source.queryId!==null&&(_(Rt(t.viewCache_),"We should always have a full cache before handling merges"),_(Di(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=Hm(t.processor_,s,e,n,i);return Wm(t.processor_,r.viewCache),_(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,zc(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Jm(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(L,(r,o)=>{i.push(jt(r,o))}),n.isFullyInitialized()&&i.push(Lc(n.getNode())),zc(t,i,n.getNode(),e)}function zc(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return Em(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fi;class jc{constructor(){this.views=new Map}}function eg(t){_(!Fi,"__referenceConstructor has already been defined"),Fi=t}function tg(){return _(Fi,"Reference.ts has not been loaded"),Fi}function ng(t){return t.views.size===0}function io(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return _(r!=null,"SyncTree gave us an op for an invalid query."),Ua(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(Ua(o,e,n,i));return r}}function qc(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=xi(n,s?i:null),l=!1;a?l=!0:i instanceof y?(a=eo(n,i),l=!1):(a=y.EMPTY_NODE,l=!1);const c=Xi(new ut(a,l,!1),new ut(i,s,!1));return new Km(e,c)}return o}function ig(t,e,n,i,s,r){const o=qc(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Xm(o,n),Jm(o,n)}function sg(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=dt(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat(Fa(c,n,i)),Ma(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat(Fa(l,n,i)),Ma(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!dt(t)&&r.push(new(tg())(e._repo,e._path)),{removed:r,events:o}}function Gc(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function at(t,e){let n=null;for(const i of t.views.values())n=n||Zm(i,e);return n}function Kc(t,e){if(e._queryParams.loadsAllData())return es(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Yc(t,e){return Kc(t,e)!=null}function dt(t){return es(t)!=null}function es(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ui;function rg(t){_(!Ui,"__referenceConstructor has already been defined"),Ui=t}function og(){return _(Ui,"Reference.ts has not been loaded"),Ui}let ag=1;class Ba{constructor(e){this.listenProvider_=e,this.syncPointTree_=new x(null),this.pendingWriteTree_=Mm(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function so(t,e,n,i,s){return Tm(t.pendingWriteTree_,e,n,i,s),s?nn(t,new St(Zr(),e,n)):[]}function lg(t,e,n,i){Cm(t.pendingWriteTree_,e,n,i);const s=x.fromObject(n);return nn(t,new qt(Zr(),e,s))}function it(t,e,n=!1){const i=Sm(t.pendingWriteTree_,e);if(Rm(t.pendingWriteTree_,e)){let r=new x(null);return i.snap!=null?r=r.set(R(),!0):Z(i.children,o=>{r=r.set(new A(o),!0)}),nn(t,new Oi(i.path,r,n))}else return[]}function Kn(t,e,n){return nn(t,new St(Xr(),e,n))}function cg(t,e,n){const i=x.fromObject(n);return nn(t,new qt(Xr(),e,i))}function ug(t,e){return nn(t,new xn(Xr(),e))}function dg(t,e,n){const i=ro(t,n);if(i){const s=oo(i),r=s.path,o=s.queryId,a=ie(r,e),l=new xn(Jr(o),a);return ao(t,r,l)}else return[]}function Bi(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Yc(o,e))){const l=sg(o,e,n,i);ng(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const u=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(r,(h,p)=>dt(p));if(u&&!d){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=pg(h);for(let f=0;f<p.length;++f){const m=p[f],g=m.query,P=Jc(t,m);t.listenProvider_.startListening(bn(g),Ln(t,g),P.hashFn,P.onComplete)}}}!d&&c.length>0&&!i&&(u?t.listenProvider_.stopListening(bn(e),null):c.forEach(h=>{const p=t.queryToTagMap.get(ns(h));t.listenProvider_.stopListening(bn(h),p)}))}_g(t,c)}return a}function Qc(t,e,n,i){const s=ro(t,i);if(s!=null){const r=oo(s),o=r.path,a=r.queryId,l=ie(o,e),c=new St(Jr(a),l,n);return ao(t,o,c)}else return[]}function hg(t,e,n,i){const s=ro(t,i);if(s){const r=oo(s),o=r.path,a=r.queryId,l=ie(o,e),c=x.fromObject(n),u=new qt(Jr(a),l,c);return ao(t,o,u)}else return[]}function pr(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(h,p)=>{const f=ie(h,s);r=r||at(p,f),o=o||dt(p)});let a=t.syncPointTree_.get(s);a?(o=o||dt(a),r=r||at(a,R())):(a=new jc,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=y.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((p,f)=>{const m=at(f,R());m&&(r=r.updateImmediateChild(p,m))}));const c=Yc(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=ns(e);_(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=mg();t.queryToTagMap.set(h,p),t.tagToQueryMap.set(p,h)}const u=Ji(t.pendingWriteTree_,s);let d=ig(a,e,n,u,r,l);if(!c&&!o&&!i){const h=Kc(a,e);d=d.concat(gg(t,e,h))}return d}function ts(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=ie(o,e),c=at(a,l);if(c)return c});return Bc(s,e,r,n,!0)}function fg(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(c,u)=>{const d=ie(c,n);i=i||at(u,d)});let s=t.syncPointTree_.get(n);s?i=i||at(s,R()):(s=new jc,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new ut(i,!0,!1):null,a=Ji(t.pendingWriteTree_,e._path),l=qc(s,e,a,r?o.getNode():y.EMPTY_NODE,r);return Qm(l)}function nn(t,e){return Zc(e,t.syncPointTree_,null,Ji(t.pendingWriteTree_,R()))}function Zc(t,e,n,i){if(I(t.path))return Xc(t,e,n,i);{const s=e.get(R());n==null&&s!=null&&(n=at(s,R()));let r=[];const o=w(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,u=$c(i,o);r=r.concat(Zc(a,l,c,u))}return s&&(r=r.concat(io(s,t,i,n))),r}}function Xc(t,e,n,i){const s=e.get(R());n==null&&s!=null&&(n=at(s,R()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=$c(i,o),u=t.operationForChild(o);u&&(r=r.concat(Xc(u,a,l,c)))}),s&&(r=r.concat(io(s,t,i,n))),r}function Jc(t,e){const n=e.query,i=Ln(t,n);return{hashFn:()=>(Ym(e)||y.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?dg(t,n._path,i):ug(t,n._path);{const r=l_(s,n);return Bi(t,n,null,r)}}}}function Ln(t,e){const n=ns(e);return t.queryToTagMap.get(n)}function ns(t){return t._path.toString()+"$"+t._queryIdentifier}function ro(t,e){return t.tagToQueryMap.get(e)}function oo(t){const e=t.indexOf("$");return _(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new A(t.substr(0,e))}}function ao(t,e,n){const i=t.syncPointTree_.get(e);_(i,"Missing sync point for query tag that we're tracking");const s=Ji(t.pendingWriteTree_,e);return io(i,n,s,null)}function pg(t){return t.fold((e,n,i)=>{if(n&&dt(n))return[es(n)];{let s=[];return n&&(s=Gc(n)),Z(i,(r,o)=>{s=s.concat(o)}),s}})}function bn(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(og())(t._repo,t._path):t}function _g(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=ns(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function mg(){return ag++}function gg(t,e,n){const i=e._path,s=Ln(t,e),r=Jc(t,n),o=t.listenProvider_.startListening(bn(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)_(!dt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,d)=>{if(!I(c)&&u&&dt(u))return[es(u).query];{let h=[];return u&&(h=h.concat(Gc(u).map(p=>p.query))),Z(d,(p,f)=>{h=h.concat(f)}),h}});for(let c=0;c<l.length;++c){const u=l[c];t.listenProvider_.stopListening(bn(u),Ln(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new lo(n)}node(){return this.node_}}class co{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=$(this.path_,e);return new co(this.syncTree_,n)}node(){return ts(this.syncTree_,this.path_)}}const yg=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},$a=function(t,e,n){if(!t||typeof t!="object")return t;if(_(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return vg(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Eg(t[".sv"],e);_(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},vg=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:_(!1,"Unexpected server value: "+t)}},Eg=function(t,e,n){t.hasOwnProperty("increment")||_(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&_(!1,"Unexpected increment value: "+i);const s=e.node();if(_(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},eu=function(t,e,n,i){return ho(e,new co(n,t),i)},uo=function(t,e,n){return ho(t,new lo(e),n)};function ho(t,e,n){const i=t.getPriority().val(),s=$a(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=$a(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new K(a,H(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new K(s))),o.forEachChild(L,(a,l)=>{const c=ho(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function is(t,e){let n=e instanceof A?e:new A(e),i=t,s=w(n);for(;s!==null;){const r=wt(i.node.children,s)||{children:{},childCount:0};i=new fo(s,i,r),n=D(n),s=w(n)}return i}function Dt(t){return t.node.value}function po(t,e){t.node.value=e,_r(t)}function tu(t){return t.node.childCount>0}function wg(t){return Dt(t)===void 0&&!tu(t)}function ss(t,e){Z(t.node.children,(n,i)=>{e(new fo(n,t,i))})}function nu(t,e,n,i){n&&e(t),ss(t,s=>{nu(s,e,!0)})}function Ig(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Yn(t){return new A(t.parent===null?t.name:Yn(t.parent)+"/"+t.name)}function _r(t){t.parent!==null&&bg(t.parent,t.name,t)}function bg(t,e,n){const i=wg(n),s=Ie(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,_r(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,_r(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tg=/[\[\].#$\/\u0000-\u001F\u007F]/,Cg=/[\[\].#$\u0000-\u001F\u007F]/,Ns=10*1024*1024,rs=function(t){return typeof t=="string"&&t.length!==0&&!Tg.test(t)},iu=function(t){return typeof t=="string"&&t.length!==0&&!Cg.test(t)},Sg=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),iu(t)},Mn=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Ki(t)||t&&typeof t=="object"&&Ie(t,".sv")},xe=function(t,e,n,i){i&&e===void 0||Qn(It(t,"value"),e,n)},Qn=function(t,e,n){const i=n instanceof A?new H_(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+gt(i));if(typeof e=="function")throw new Error(t+"contains a function "+gt(i)+" with contents = "+e.toString());if(Ki(e))throw new Error(t+"contains "+e.toString()+" "+gt(i));if(typeof e=="string"&&e.length>Ns/3&&Vi(e)>Ns)throw new Error(t+"contains a string greater than "+Ns+" utf8 bytes "+gt(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Z(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!rs(o)))throw new Error(t+" contains an invalid key ("+o+") "+gt(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);V_(i,o),Qn(t,a,i),z_(i)}),s&&r)throw new Error(t+' contains ".value" child '+gt(i)+" in addition to actual children.")}},Rg=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Pn(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!rs(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(W_);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&ue(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},su=function(t,e,n,i){const s=It(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Z(e,(o,a)=>{const l=new A(o);if(Qn(s,a,$(n,l)),zr(l)===".priority"&&!Mn(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Rg(s,r)},_o=function(t,e,n){if(Ki(e))throw new Error(It(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Mn(e))throw new Error(It(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Zn=function(t,e,n,i){if(n!==void 0&&!rs(n))throw new Error(It(t,e)+'was an invalid key = "'+n+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},os=function(t,e,n,i){if(!(i&&n===void 0)&&!iu(n))throw new Error(It(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},kg=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),os(t,e,n,i)},ye=function(t,e){if(w(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},ru=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!rs(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Sg(n))throw new Error(It(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function as(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!jr(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function ou(t,e,n){as(t,n),au(t,i=>jr(i,e))}function le(t,e,n){as(t,n),au(t,i=>ue(i,e)||ue(e,i))}function au(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(Pg(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function Pg(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();vt&&Q("event: "+n.toString()),en(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lu="repo_interrupt",Ng=25;class Og{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Ag,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ni(),this.transactionQueueTree_=new fo,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Dg(t,e,n){if(t.stats_=Hr(t.repoInfo_),t.forceRestClient_||h_())t.server_=new Pi(t.repoInfo_,(i,s,r,o)=>{Wa(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Ha(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{G(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new fe(t.repoInfo_,e,(i,s,r,o)=>{Wa(t,i,s,r,o)},i=>{Ha(t,i)},i=>{xg(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=g_(t.repoInfo_,()=>new ym(t.stats_,t.server_)),t.infoData_=new fm,t.infoSyncTree_=new Ba({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=Kn(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),mo(t,"connected",!1),t.serverSyncTree_=new Ba({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);le(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function cu(t){const n=t.infoData_.getNode(new A(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Xn(t){return yg({timestamp:cu(t)})}function Wa(t,e,n,i,s){t.dataUpdateCount++;const r=new A(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=yi(n,c=>H(c));o=hg(t.serverSyncTree_,r,l,s)}else{const l=H(n);o=Qc(t.serverSyncTree_,r,l,s)}else if(i){const l=yi(n,c=>H(c));o=cg(t.serverSyncTree_,r,l)}else{const l=H(n);o=Kn(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Kt(t,r)),le(t.eventQueue_,a,o)}function Ha(t,e){mo(t,"connected",e),e===!1&&Fg(t)}function xg(t,e){Z(e,(n,i)=>{mo(t,n,i)})}function mo(t,e,n){const i=new A("/.info/"+e),s=H(n);t.infoData_.updateSnapshot(i,s);const r=Kn(t.infoSyncTree_,i,s);le(t.eventQueue_,i,r)}function ls(t){return t.nextWriteId_++}function Lg(t,e,n){const i=fg(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=H(s).withIndex(e._queryParams.getIndex());pr(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Kn(t.serverSyncTree_,e._path,r);else{const a=Ln(t.serverSyncTree_,e);o=Qc(t.serverSyncTree_,e._path,r,a)}return le(t.eventQueue_,e._path,o),Bi(t.serverSyncTree_,e,n,null,!0),r},s=>(sn(t,"get for query "+G(e)+" failed: "+s),Promise.reject(new Error(s))))}function go(t,e,n,i,s){sn(t,"set",{path:e.toString(),value:n,priority:i});const r=Xn(t),o=H(n,i),a=ts(t.serverSyncTree_,e),l=uo(o,a,r),c=ls(t),u=so(t.serverSyncTree_,e,l,c,!0);as(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,p)=>{const f=h==="ok";f||ee("set at "+e+" failed: "+h);const m=it(t.serverSyncTree_,c,!f);le(t.eventQueue_,e,m),ht(t,s,h,p)});const d=vo(t,e);Kt(t,d),le(t.eventQueue_,d,[])}function Mg(t,e,n,i){sn(t,"update",{path:e.toString(),value:n});let s=!0;const r=Xn(t),o={};if(Z(n,(a,l)=>{s=!1,o[a]=eu($(e,a),H(l),t.serverSyncTree_,r)}),s)Q("update() called with empty data.  Don't do anything."),ht(t,i,"ok",void 0);else{const a=ls(t),l=lg(t.serverSyncTree_,e,o,a);as(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,u)=>{const d=c==="ok";d||ee("update at "+e+" failed: "+c);const h=it(t.serverSyncTree_,a,!d),p=h.length>0?Kt(t,e):e;le(t.eventQueue_,p,h),ht(t,i,c,u)}),Z(n,c=>{const u=vo(t,$(e,c));Kt(t,u)}),le(t.eventQueue_,e,[])}}function Fg(t){sn(t,"onDisconnectEvents");const e=Xn(t),n=Ni();lr(t.onDisconnect_,R(),(s,r)=>{const o=eu(s,r,t.serverSyncTree_,e);tn(n,s,o)});let i=[];lr(n,R(),(s,r)=>{i=i.concat(Kn(t.serverSyncTree_,s,r));const o=vo(t,s);Kt(t,o)}),t.onDisconnect_=Ni(),le(t.eventQueue_,R(),i)}function Ug(t,e,n){t.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&ar(t.onDisconnect_,e),ht(t,n,i,s)})}function Va(t,e,n,i){const s=H(n);t.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&tn(t.onDisconnect_,e,s),ht(t,i,r,o)})}function Bg(t,e,n,i,s){const r=H(n,i);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&tn(t.onDisconnect_,e,r),ht(t,s,o,a)})}function $g(t,e,n,i){if(gi(n)){Q("onDisconnect().update() called with empty data.  Don't do anything."),ht(t,i,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(s,r)=>{s==="ok"&&Z(n,(o,a)=>{const l=H(a);tn(t.onDisconnect_,$(e,o),l)}),ht(t,i,s,r)})}function Wg(t,e,n){let i;w(e._path)===".info"?i=pr(t.infoSyncTree_,e,n):i=pr(t.serverSyncTree_,e,n),ou(t.eventQueue_,e._path,i)}function mr(t,e,n){let i;w(e._path)===".info"?i=Bi(t.infoSyncTree_,e,n):i=Bi(t.serverSyncTree_,e,n),ou(t.eventQueue_,e._path,i)}function uu(t){t.persistentConnection_&&t.persistentConnection_.interrupt(lu)}function Hg(t){t.persistentConnection_&&t.persistentConnection_.resume(lu)}function sn(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Q(n,...e)}function ht(t,e,n,i){e&&en(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Vg(t,e,n,i,s,r){sn(t,"transaction on "+e);const o={path:e,update:n,onComplete:i,status:null,order:rc(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=yo(t,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Qn("transaction failed: Data returned ",l,o.path),o.status=0;const c=is(t.transactionQueueTree_,e),u=Dt(c)||[];u.push(o),po(c,u);let d;typeof l=="object"&&l!==null&&Ie(l,".priority")?(d=wt(l,".priority"),_(Mn(d),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):d=(ts(t.serverSyncTree_,e)||y.EMPTY_NODE).getPriority().val();const h=Xn(t),p=H(l,d),f=uo(p,a,h);o.currentOutputSnapshotRaw=p,o.currentOutputSnapshotResolved=f,o.currentWriteId=ls(t);const m=so(t.serverSyncTree_,e,f,o.currentWriteId,o.applyLocally);le(t.eventQueue_,e,m),cs(t,t.transactionQueueTree_)}}function yo(t,e,n){return ts(t.serverSyncTree_,e,n)||y.EMPTY_NODE}function cs(t,e=t.transactionQueueTree_){if(e||us(t,e),Dt(e)){const n=hu(t,e);_(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&zg(t,Yn(e),n)}else tu(e)&&ss(e,n=>{cs(t,n)})}function zg(t,e,n){const i=n.map(c=>c.currentWriteId),s=yo(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const u=n[c];_(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=ie(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{sn(t,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(it(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();us(t,is(t.transactionQueueTree_,e)),cs(t,t.transactionQueueTree_),le(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)en(d[h])}else{if(c==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{ee("transaction at "+l.toString()+" failed: "+c);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=c}Kt(t,e)}},o)}function Kt(t,e){const n=du(t,e),i=Yn(n),s=hu(t,n);return jg(t,s,i),i}function jg(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=ie(n,l.path);let u=!1,d;if(_(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,d=l.abortReason,s=s.concat(it(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Ng)u=!0,d="maxretry",s=s.concat(it(t.serverSyncTree_,l.currentWriteId,!0));else{const h=yo(t,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){Qn("transaction failed: Data returned ",p,l.path);let f=H(p);typeof p=="object"&&p!=null&&Ie(p,".priority")||(f=f.updatePriority(h.getPriority()));const g=l.currentWriteId,P=Xn(t),k=uo(f,h,P);l.currentOutputSnapshotRaw=f,l.currentOutputSnapshotResolved=k,l.currentWriteId=ls(t),o.splice(o.indexOf(g),1),s=s.concat(so(t.serverSyncTree_,l.path,k,l.currentWriteId,l.applyLocally)),s=s.concat(it(t.serverSyncTree_,g,!0))}else u=!0,d="nodata",s=s.concat(it(t.serverSyncTree_,l.currentWriteId,!0))}le(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,function(h){setTimeout(h,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}us(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)en(i[a]);cs(t,t.transactionQueueTree_)}function du(t,e){let n,i=t.transactionQueueTree_;for(n=w(e);n!==null&&Dt(i)===void 0;)i=is(i,n),e=D(e),n=w(e);return i}function hu(t,e){const n=[];return fu(t,e,n),n.sort((i,s)=>i.order-s.order),n}function fu(t,e,n){const i=Dt(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);ss(e,s=>{fu(t,s,n)})}function us(t,e){const n=Dt(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,po(e,n.length>0?n:void 0)}ss(e,i=>{us(t,i)})}function vo(t,e){const n=Yn(du(t,e)),i=is(t.transactionQueueTree_,e);return Ig(i,s=>{Os(t,s)}),Os(t,i),nu(i,s=>{Os(t,s)}),n}function Os(t,e){const n=Dt(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(_(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(_(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(it(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?po(e,void 0):n.length=r+1,le(t.eventQueue_,Yn(e),s);for(let o=0;o<i.length;o++)en(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Gg(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):ee(`Invalid query segment '${n}' in query '${t}'`)}return e}const gr=function(t,e){const n=Kg(t),i=n.namespace;n.domain==="firebase.com"&&De(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&De("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||i_();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new vc(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new A(n.pathString)}},Kg=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(s=qg(t.substring(u,d)));const h=Gg(t.substring(Math.min(t.length,d)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")n="localhost";else if(p.split(".").length<=2)n=p;else{const f=e.indexOf(".");i=e.substring(0,f).toLowerCase(),n=e.substring(f+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const za="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Yg=function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=za.charAt(n%64),n=Math.floor(n/64);_(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=za.charAt(e[s]);return _(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+G(this.snapshot.exportVal())}}class _u{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return _(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new ae;return Ug(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){ye("OnDisconnect.remove",this._path);const e=new ae;return Va(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){ye("OnDisconnect.set",this._path),xe("OnDisconnect.set",e,this._path,!1);const n=new ae;return Va(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){ye("OnDisconnect.setWithPriority",this._path),xe("OnDisconnect.setWithPriority",e,this._path,!1),_o("OnDisconnect.setWithPriority",n);const i=new ae;return Bg(this._repo,this._path,e,n,i.wrapCallback(()=>{})),i.promise}update(e){ye("OnDisconnect.update",this._path),su("OnDisconnect.update",e,this._path);const n=new ae;return $g(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return I(this._path)?null:zr(this._path)}get ref(){return new pe(this._repo,this._path)}get _queryIdentifier(){const e=Aa(this._queryParams),n=$r(e);return n==="{}"?"default":n}get _queryObject(){return Aa(this._queryParams)}isEqual(e){if(e=C(e),!(e instanceof oe))return!1;const n=this._repo===e._repo,i=jr(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+$_(this._path)}}function ds(t,e){if(t._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function _t(t){let e=null,n=null;if(t.hasStart()&&(e=t.getIndexStartValue()),t.hasEnd()&&(n=t.getIndexEndValue()),t.getIndex()===Pe){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(t.hasStart()){if(t.getIndexStartName()!==lt)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(t.hasEnd()){if(t.getIndexEndName()!==ze)throw new Error(i);if(typeof n!="string")throw new Error(s)}}else if(t.getIndex()===L){if(e!=null&&!Mn(e)||n!=null&&!Mn(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(_(t.getIndex()instanceof Kr||t.getIndex()===Yr,"unknown index type."),e!=null&&typeof e=="object"||n!=null&&typeof n=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function hs(t){if(t.hasStart()&&t.hasEnd()&&t.hasLimit()&&!t.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class pe extends oe{constructor(e,n){super(e,n,new Qi,!1)}get parent(){const e=kc(this._path);return e===null?null:new pe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ft{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new A(e),i=kt(this.ref,e);return new ft(this._node.getChild(n),i,L)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new ft(s,kt(this.ref,i),L)))}hasChild(e){const n=new A(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function U(t,e){return t=C(t),t._checkNotDeleted("ref"),e!==void 0?kt(t._root,e):t._root}function Qg(t,e){t=C(t),t._checkNotDeleted("refFromURL");const n=gr(e,t._repo.repoInfo_.nodeAdmin);ru("refFromURL",n);const i=n.repoInfo;return!t._repo.repoInfo_.isCustomHost()&&i.host!==t._repo.repoInfo_.host&&De("refFromURL: Host name does not match the current database: (found "+i.host+" but expected "+t._repo.repoInfo_.host+")"),U(t,n.path.toString())}function kt(t,e){return t=C(t),w(t._path)===null?kg("child","path",e,!1):os("child","path",e,!1),new pe(t._repo,$(t._path,e))}function Zg(t){return t=C(t),new mu(t._repo,t._path)}function wo(t,e){t=C(t),ye("push",t._path),xe("push",e,t._path,!0);const n=cu(t._repo),i=Yg(n),s=kt(t,i),r=kt(t,i);let o;return e!=null?o=de(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function fs(t){return ye("remove",t._path),de(t,null)}function de(t,e){t=C(t),ye("set",t._path),xe("set",e,t._path,!1);const n=new ae;return go(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Xg(t,e){t=C(t),ye("setPriority",t._path),_o("setPriority",e);const n=new ae;return go(t._repo,$(t._path,".priority"),e,null,n.wrapCallback(()=>{})),n.promise}function Jg(t,e,n){if(ye("setWithPriority",t._path),xe("setWithPriority",e,t._path,!1),_o("setWithPriority",n),t.key===".length"||t.key===".keys")throw"setWithPriority failed: "+t.key+" is a read-only object.";const i=new ae;return go(t._repo,t._path,e,n,i.wrapCallback(()=>{})),i.promise}function ey(t,e){su("update",e,t._path);const n=new ae;return Mg(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Yt(t){t=C(t);const e=new Eo(()=>{}),n=new Jn(e);return Lg(t._repo,t,n).then(i=>new ft(i,new pe(t._repo,t._path),t._queryParams.getIndex()))}class Jn{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new pu("value",this,new ft(e.snapshotNode,new pe(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new _u(this,e,n):null}matches(e){return e instanceof Jn?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ps{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new _u(this,e,n):null}createEvent(e,n){_(e.childName!=null,"Child events should have a childName.");const i=kt(new pe(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new pu(e.type,this,new ft(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ps?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function ei(t,e,n,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=n,c=(u,d)=>{mr(t._repo,t,a),l(u,d)};c.userCallback=n.userCallback,c.context=n.context,n=c}const o=new Eo(n,r||void 0),a=e==="value"?new Jn(o):new ps(e,o);return Wg(t._repo,t,a),()=>mr(t._repo,t,a)}function et(t,e,n,i){return ei(t,"value",e,n,i)}function ty(t,e,n,i){return ei(t,"child_added",e,n,i)}function ny(t,e,n,i){return ei(t,"child_changed",e,n,i)}function iy(t,e,n,i){return ei(t,"child_moved",e,n,i)}function sy(t,e,n,i){return ei(t,"child_removed",e,n,i)}function ry(t,e,n){let i=null;const s=n?new Eo(n):null;e==="value"?i=new Jn(s):e&&(i=new ps(e,s)),mr(t._repo,t,i)}class _e{}class gu extends _e{constructor(e,n){super(),this._value=e,this._key=n,this.type="endAt"}_apply(e){xe("endAt",this._value,e._path,!0);const n=or(e._queryParams,this._value,this._key);if(hs(n),_t(n),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new oe(e._repo,e._path,n,e._orderByCalled)}}function oy(t,e){return Zn("endAt","key",e),new gu(t,e)}class ay extends _e{constructor(e,n){super(),this._value=e,this._key=n,this.type="endBefore"}_apply(e){xe("endBefore",this._value,e._path,!1);const n=hm(e._queryParams,this._value,this._key);if(hs(n),_t(n),e._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new oe(e._repo,e._path,n,e._orderByCalled)}}function ly(t,e){return Zn("endBefore","key",e),new ay(t,e)}class yu extends _e{constructor(e,n){super(),this._value=e,this._key=n,this.type="startAt"}_apply(e){xe("startAt",this._value,e._path,!0);const n=rr(e._queryParams,this._value,this._key);if(hs(n),_t(n),e._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new oe(e._repo,e._path,n,e._orderByCalled)}}function cy(t=null,e){return Zn("startAt","key",e),new yu(t,e)}class uy extends _e{constructor(e,n){super(),this._value=e,this._key=n,this.type="startAfter"}_apply(e){xe("startAfter",this._value,e._path,!1);const n=dm(e._queryParams,this._value,this._key);if(hs(n),_t(n),e._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new oe(e._repo,e._path,n,e._orderByCalled)}}function dy(t,e){return Zn("startAfter","key",e),new uy(t,e)}class hy extends _e{constructor(e){super(),this._limit=e,this.type="limitToFirst"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new oe(e._repo,e._path,cm(e._queryParams,this._limit),e._orderByCalled)}}function fy(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new hy(t)}class py extends _e{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new oe(e._repo,e._path,um(e._queryParams,this._limit),e._orderByCalled)}}function _y(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new py(t)}class my extends _e{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){ds(e,"orderByChild");const n=new A(this._path);if(I(n))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const i=new Kr(n),s=Zi(e._queryParams,i);return _t(s),new oe(e._repo,e._path,s,!0)}}function gy(t){if(t==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(t==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(t==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return os("orderByChild","path",t,!1),new my(t)}class yy extends _e{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){ds(e,"orderByKey");const n=Zi(e._queryParams,Pe);return _t(n),new oe(e._repo,e._path,n,!0)}}function vy(){return new yy}class Ey extends _e{constructor(){super(...arguments),this.type="orderByPriority"}_apply(e){ds(e,"orderByPriority");const n=Zi(e._queryParams,L);return _t(n),new oe(e._repo,e._path,n,!0)}}function wy(){return new Ey}class Iy extends _e{constructor(){super(...arguments),this.type="orderByValue"}_apply(e){ds(e,"orderByValue");const n=Zi(e._queryParams,Yr);return _t(n),new oe(e._repo,e._path,n,!0)}}function by(){return new Iy}class Ty extends _e{constructor(e,n){super(),this._value=e,this._key=n,this.type="equalTo"}_apply(e){if(xe("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new gu(this._value,this._key)._apply(new yu(this._value,this._key)._apply(e))}}function Cy(t,e){return Zn("equalTo","key",e),new Ty(t,e)}function Sy(t,...e){let n=C(t);for(const i of e)n=i._apply(n);return n}eg(pe);rg(pe);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ry="FIREBASE_DATABASE_EMULATOR_HOST",yr={};let vu=!1;function ky(t,e,n,i){t.repoInfo_=new vc(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),i&&(t.authTokenProvider_=i)}function Io(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||De("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Q("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=gr(r,s),a=o.repoInfo,l,c;typeof process<"u"&&da&&(c=da[Ry]),c?(l=!0,r=`http://${c}?ns=${a.namespace}`,o=gr(r,s),a=o.repoInfo):l=!o.repoInfo.secure;const u=s&&l?new Ht(Ht.OWNER):new p_(t.name,t.options,e);ru("Invalid Firebase Database URL",o),I(o.path)||De("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Py(a,t,u,new f_(t.name,n));return new Eu(d,t)}function Ay(t,e){const n=yr[e];(!n||n[t.key]!==t)&&De(`Database ${e}(${t.repoInfo_}) has already been deleted.`),uu(t),delete n[t.key]}function Py(t,e,n,i){let s=yr[e.name];s||(s={},yr[e.name]=s);let r=s[t.toURLString()];return r&&De("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Og(t,vu,n,i),s[t.toURLString()]=r,r}function Ny(t){vu=t}class Eu{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Dg(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new pe(this._repo,R())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Ay(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&De("Cannot call "+e+" on a deleted database.")}}function wu(){zt.IS_TRANSPORT_INITIALIZED&&ee("Transport has already been initialized. Please call this function before calling ref or setting up a listener")}function Oy(){wu(),nt.forceDisallow()}function Dy(){wu(),ce.forceDisallow(),nt.forceAllow()}function Iu(t=Ar(),e){const n=zi(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=ul("database");i&&bu(n,...i)}return n}function bu(t,e,n,i={}){t=C(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&De("Cannot call useEmulator() after instance has already been initialized.");const s=t._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&De('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Ht(Ht.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:fl(i.mockUserToken,t.app.options.projectId);r=new Ht(o)}ky(s,e,n,r)}function xy(t){t=C(t),t._checkNotDeleted("goOffline"),uu(t._repo)}function Ly(t){t=C(t),t._checkNotDeleted("goOnline"),Hg(t._repo)}function My(t,e){ac(t,e)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fy(t){Br(Pt),bt(new Oe("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Io(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),Re(ha,fa,t),Re(ha,fa,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uy={".sv":"timestamp"};function By(){return Uy}function $y(t){return{".sv":{increment:t}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function Wy(t,e,n){var i;if(t=C(t),ye("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const s=(i=n==null?void 0:n.applyLocally)!==null&&i!==void 0?i:!0,r=new ae,o=(l,c,u)=>{let d=null;l?r.reject(l):(d=new ft(u,new pe(t._repo,t._path),L),r.resolve(new Tu(c,d)))},a=et(t,()=>{});return Vg(t._repo,t._path,e,o,a,s),r.promise}fe.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};fe.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};const Hy=function(t){const e=fe.prototype.put;return fe.prototype.put=function(n,i,s,r){r!==void 0&&(r=t()),e.call(this,n,i,s,r)},function(){fe.prototype.put=e}},Vy=function(t){Ny(t)};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy({app:t,url:e,version:n,customAuthImpl:i,customAppCheckImpl:s,nodeAdmin:r=!1}){Br(n);const o=new ml("database-standalone"),a=new qs("auth-internal",o);let l;return s&&(l=new qs("app-check-internal",o),l.setComponent(new Oe("app-check-internal",()=>s,"PRIVATE"))),a.setComponent(new Oe("auth-internal",()=>i,"PRIVATE")),Io(t,a,l,e,r)}Fy();const Fn=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:ft,Database:Eu,OnDisconnect:mu,QueryConstraint:_e,TransactionResult:Tu,_QueryImpl:oe,_QueryParams:Qi,_ReferenceImpl:pe,_TEST_ACCESS_forceRestClient:Vy,_TEST_ACCESS_hijackHash:Hy,_initStandalone:zy,_repoManagerDatabaseFromApp:Io,_setSDKVersion:Br,_validatePathString:os,_validateWritablePath:ye,child:kt,connectDatabaseEmulator:bu,enableLogging:My,endAt:oy,endBefore:ly,equalTo:Cy,forceLongPolling:Dy,forceWebSockets:Oy,get:Yt,getDatabase:Iu,goOffline:xy,goOnline:Ly,increment:$y,limitToFirst:fy,limitToLast:_y,off:ry,onChildAdded:ty,onChildChanged:ny,onChildMoved:iy,onChildRemoved:sy,onDisconnect:Zg,onValue:et,orderByChild:gy,orderByKey:vy,orderByPriority:wy,orderByValue:by,push:wo,query:Sy,ref:U,refFromURL:Qg,remove:fs,runTransaction:Wy,serverTimestamp:By,set:de,setPriority:Xg,setWithPriority:Jg,startAfter:dy,startAt:cy,update:ey},Symbol.toStringTag,{value:"Module"}));var jy="firebase",qy="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Re(jy,qy,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cu="firebasestorage.googleapis.com",Su="storageBucket",Gy=2*60*1e3,Ky=10*60*1e3,Yy=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W extends je{constructor(e,n,i=0){super(Ds(e),`Firebase Storage: ${n} (${Ds(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,W.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Ds(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var M;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(M||(M={}));function Ds(t){return"storage/"+t}function bo(){const t="An unknown error occurred, please check the error payload for server response.";return new W(M.UNKNOWN,t)}function Qy(t){return new W(M.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function Zy(t){return new W(M.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Xy(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new W(M.UNAUTHENTICATED,t)}function Jy(){return new W(M.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function ev(t){return new W(M.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function Ru(){return new W(M.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function ku(){return new W(M.CANCELED,"User canceled the upload/download.")}function tv(t){return new W(M.INVALID_URL,"Invalid URL '"+t+"'.")}function nv(t){return new W(M.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function iv(){return new W(M.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Su+"' property when initializing the app?")}function Au(){return new W(M.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function sv(){return new W(M.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function rv(){return new W(M.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function ov(t){return new W(M.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function $i(t){return new W(M.INVALID_ARGUMENT,t)}function Pu(){return new W(M.APP_DELETED,"The Firebase app was deleted.")}function Nu(t){return new W(M.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Tn(t,e){return new W(M.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function fn(t){throw new W(M.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let i;try{i=J.makeFromUrl(e,n)}catch{return new J(e,"")}if(i.path==="")return i;throw nv(e)}static makeFromUrl(e,n){let i=null;const s="([A-Za-z0-9.\\-_]+)";function r(T){T.path.charAt(T.path.length-1)==="/"&&(T.path_=T.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),l={bucket:1,path:3};function c(T){T.path_=decodeURIComponent(T.path)}const u="v[A-Za-z0-9_]+",d=n.replace(/[.]/g,"\\."),h="(/([^?#]*).*)?$",p=new RegExp(`^https?://${d}/${u}/b/${s}/o${h}`,"i"),f={bucket:1,path:3},m=n===Cu?"(?:storage.googleapis.com|storage.cloud.google.com)":n,g="([^?#]*)",P=new RegExp(`^https?://${m}/${s}/${g}`,"i"),E=[{regex:a,indices:l,postModify:r},{regex:p,indices:f,postModify:c},{regex:P,indices:{bucket:1,path:2},postModify:c}];for(let T=0;T<E.length;T++){const S=E[T],z=S.regex.exec(e);if(z){const q=z[S.indices.bucket];let X=z[S.indices.path];X||(X=""),i=new J(q,X),S.postModify(i);break}}if(i==null)throw tv(e);return i}}class av{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lv(t,e,n){let i=1,s=null,r=null,o=!1,a=0;function l(){return a===2}let c=!1;function u(...g){c||(c=!0,e.apply(null,g))}function d(g){s=setTimeout(()=>{s=null,t(p,l())},g)}function h(){r&&clearTimeout(r)}function p(g,...P){if(c){h();return}if(g){h(),u.call(null,g,...P);return}if(l()||o){h(),u.call(null,g,...P);return}i<64&&(i*=2);let E;a===1?(a=2,E=0):E=(i+Math.random())*1e3,d(E)}let f=!1;function m(g){f||(f=!0,h(),!c&&(s!==null?(g||(a=2),clearTimeout(s),d(0)):g||(a=1)))}return d(0),r=setTimeout(()=>{o=!0,m(!0)},n),m}function cv(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uv(t){return t!==void 0}function dv(t){return typeof t=="function"}function hv(t){return typeof t=="object"&&!Array.isArray(t)}function _s(t){return typeof t=="string"||t instanceof String}function ja(t){return To()&&t instanceof Blob}function To(){return typeof Blob<"u"}function vr(t,e,n,i){if(i<e)throw $i(`Invalid value for '${t}'. Expected ${e} or greater.`);if(i>n)throw $i(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(t,e,n){let i=e;return n==null&&(i=`https://${e}`),`${n}://${i}/v0${t}`}function Ou(t){const e=encodeURIComponent;let n="?";for(const i in t)if(t.hasOwnProperty(i)){const s=e(i)+"="+e(t[i]);n=n+s+"&"}return n=n.slice(0,-1),n}var Et;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Et||(Et={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Du(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,r=e.indexOf(t)!==-1;return n||s||r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(e,n,i,s,r,o,a,l,c,u,d,h=!0){this.url_=e,this.method_=n,this.headers_=i,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=d,this.retry=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((p,f)=>{this.resolve_=p,this.reject_=f,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new oi(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===Et.NO_ERROR,l=r.getStatus();if(!a||Du(l,this.additionalRetryCodes_)&&this.retry){const u=r.getErrorCode()===Et.ABORT;i(!1,new oi(!1,null,u));return}const c=this.successCodes_.indexOf(l)!==-1;i(!0,new oi(c,r))})},n=(i,s)=>{const r=this.resolve_,o=this.reject_,a=s.connection;if(s.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());uv(l)?r(l):r()}catch(l){o(l)}else if(a!==null){const l=bo();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(s.canceled){const l=this.appDelete_?Pu():ku();o(l)}else{const l=Ru();o(l)}};this.canceled_?n(!1,new oi(!1,null,!0)):this.backoffId_=lv(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&cv(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class oi{constructor(e,n,i){this.wasSuccessCode=e,this.connection=n,this.canceled=!!i}}function pv(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function _v(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function mv(t,e){e&&(t["X-Firebase-GMPID"]=e)}function gv(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function yv(t,e,n,i,s,r,o=!0){const a=Ou(t.urlParams),l=t.url+a,c=Object.assign({},t.headers);return mv(c,e),pv(c,n),_v(c,r),gv(c,i),new fv(l,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vv(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Ev(...t){const e=vv();if(e!==void 0){const n=new e;for(let i=0;i<t.length;i++)n.append(t[i]);return n.getBlob()}else{if(To())return new Blob(t);throw new W(M.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function wv(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iv(t){if(typeof atob>"u")throw ov("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class xs{constructor(e,n){this.data=e,this.contentType=n||null}}function Co(t,e){switch(t){case he.RAW:return new xs(xu(e));case he.BASE64:case he.BASE64URL:return new xs(Lu(t,e));case he.DATA_URL:return new xs(Tv(e),Cv(e))}throw bo()}function xu(t){const e=[];for(let n=0;n<t.length;n++){let i=t.charCodeAt(n);if(i<=127)e.push(i);else if(i<=2047)e.push(192|i>>6,128|i&63);else if((i&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const r=i,o=t.charCodeAt(++n);i=65536|(r&1023)<<10|o&1023,e.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|i&63)}else(i&64512)===56320?e.push(239,191,189):e.push(224|i>>12,128|i>>6&63,128|i&63)}return new Uint8Array(e)}function bv(t){let e;try{e=decodeURIComponent(t)}catch{throw Tn(he.DATA_URL,"Malformed data URL.")}return xu(e)}function Lu(t,e){switch(t){case he.BASE64:{const s=e.indexOf("-")!==-1,r=e.indexOf("_")!==-1;if(s||r)throw Tn(t,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case he.BASE64URL:{const s=e.indexOf("+")!==-1,r=e.indexOf("/")!==-1;if(s||r)throw Tn(t,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Iv(e)}catch(s){throw s.message.includes("polyfill")?s:Tn(t,"Invalid character found")}const i=new Uint8Array(n.length);for(let s=0;s<n.length;s++)i[s]=n.charCodeAt(s);return i}class Mu{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw Tn(he.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const i=n[1]||null;i!=null&&(this.base64=Sv(i,";base64"),this.contentType=this.base64?i.substring(0,i.length-7):i),this.rest=e.substring(e.indexOf(",")+1)}}function Tv(t){const e=new Mu(t);return e.base64?Lu(he.BASE64,e.rest):bv(e.rest)}function Cv(t){return new Mu(t).contentType}function Sv(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e,n){let i=0,s="";ja(e)?(this.data_=e,i=e.size,s=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),i=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),i=e.length),this.size_=i,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,n){if(ja(this.data_)){const i=this.data_,s=wv(i,e,n);return s===null?null:new Ce(s)}else{const i=new Uint8Array(this.data_.buffer,e,n-e);return new Ce(i,!0)}}static getBlob(...e){if(To()){const n=e.map(i=>i instanceof Ce?i.data_:i);return new Ce(Ev.apply(null,n))}else{const n=e.map(o=>_s(o)?Co(he.RAW,o).data:o.data_);let i=0;n.forEach(o=>{i+=o.byteLength});const s=new Uint8Array(i);let r=0;return n.forEach(o=>{for(let a=0;a<o.length;a++)s[r++]=o[a]}),new Ce(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function So(t){let e;try{e=JSON.parse(t)}catch{return null}return hv(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rv(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function kv(t,e){const n=e.split("/").filter(i=>i.length>0).join("/");return t.length===0?n:t+"/"+n}function Fu(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Av(t,e){return e}class te{constructor(e,n,i,s){this.server=e,this.local=n||e,this.writable=!!i,this.xform=s||Av}}let ai=null;function Pv(t){return!_s(t)||t.length<2?t:Fu(t)}function ti(){if(ai)return ai;const t=[];t.push(new te("bucket")),t.push(new te("generation")),t.push(new te("metageneration")),t.push(new te("name","fullPath",!0));function e(r,o){return Pv(o)}const n=new te("name");n.xform=e,t.push(n);function i(r,o){return o!==void 0?Number(o):o}const s=new te("size");return s.xform=i,t.push(s),t.push(new te("timeCreated")),t.push(new te("updated")),t.push(new te("md5Hash",null,!0)),t.push(new te("cacheControl",null,!0)),t.push(new te("contentDisposition",null,!0)),t.push(new te("contentEncoding",null,!0)),t.push(new te("contentLanguage",null,!0)),t.push(new te("contentType",null,!0)),t.push(new te("metadata","customMetadata",!0)),ai=t,ai}function Nv(t,e){function n(){const i=t.bucket,s=t.fullPath,r=new J(i,s);return e._makeStorageReference(r)}Object.defineProperty(t,"ref",{get:n})}function Ov(t,e,n){const i={};i.type="file";const s=n.length;for(let r=0;r<s;r++){const o=n[r];i[o.local]=o.xform(i,e[o.server])}return Nv(i,t),i}function Uu(t,e,n){const i=So(e);return i===null?null:Ov(t,i,n)}function Dv(t,e,n,i){const s=So(e);if(s===null||!_s(s.downloadTokens))return null;const r=s.downloadTokens;if(r.length===0)return null;const o=encodeURIComponent;return r.split(",").map(c=>{const u=t.bucket,d=t.fullPath,h="/b/"+o(u)+"/o/"+o(d),p=Ke(h,n,i),f=Ou({alt:"media",token:c});return p+f})[0]}function Ro(t,e){const n={},i=e.length;for(let s=0;s<i;s++){const r=e[s];r.writable&&(n[r.server]=t[r.local])}return JSON.stringify(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa="prefixes",Ga="items";function xv(t,e,n){const i={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[qa])for(const s of n[qa]){const r=s.replace(/\/$/,""),o=t._makeStorageReference(new J(e,r));i.prefixes.push(o)}if(n[Ga])for(const s of n[Ga]){const r=t._makeStorageReference(new J(e,s.name));i.items.push(r)}return i}function Lv(t,e,n){const i=So(n);return i===null?null:xv(t,e,i)}class Le{constructor(e,n,i,s){this.url=e,this.method=n,this.handler=i,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(t){if(!t)throw bo()}function ms(t,e){function n(i,s){const r=Uu(t,s,e);return Ne(r!==null),r}return n}function Mv(t,e){function n(i,s){const r=Lv(t,e,s);return Ne(r!==null),r}return n}function Fv(t,e){function n(i,s){const r=Uu(t,s,e);return Ne(r!==null),Dv(r,s,t.host,t._protocol)}return n}function rn(t){function e(n,i){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=Jy():s=Xy():n.getStatus()===402?s=Zy(t.bucket):n.getStatus()===403?s=ev(t.path):s=i,s.status=n.getStatus(),s.serverResponse=i.serverResponse,s}return e}function ni(t){const e=rn(t);function n(i,s){let r=e(i,s);return i.getStatus()===404&&(r=Qy(t.path)),r.serverResponse=s.serverResponse,r}return n}function Bu(t,e,n){const i=e.fullServerUrl(),s=Ke(i,t.host,t._protocol),r="GET",o=t.maxOperationRetryTime,a=new Le(s,r,ms(t,n),o);return a.errorHandler=ni(e),a}function Uv(t,e,n,i,s){const r={};e.isRoot?r.prefix="":r.prefix=e.path+"/",n.length>0&&(r.delimiter=n),i&&(r.pageToken=i),s&&(r.maxResults=s);const o=e.bucketOnlyServerUrl(),a=Ke(o,t.host,t._protocol),l="GET",c=t.maxOperationRetryTime,u=new Le(a,l,Mv(t,e.bucket),c);return u.urlParams=r,u.errorHandler=rn(e),u}function $u(t,e,n){const i=e.fullServerUrl(),s=Ke(i,t.host,t._protocol)+"?alt=media",r="GET",o=t.maxOperationRetryTime,a=new Le(s,r,(l,c)=>c,o);return a.errorHandler=ni(e),n!==void 0&&(a.headers.Range=`bytes=0-${n}`,a.successCodes=[200,206]),a}function Bv(t,e,n){const i=e.fullServerUrl(),s=Ke(i,t.host,t._protocol),r="GET",o=t.maxOperationRetryTime,a=new Le(s,r,Fv(t,n),o);return a.errorHandler=ni(e),a}function $v(t,e,n,i){const s=e.fullServerUrl(),r=Ke(s,t.host,t._protocol),o="PATCH",a=Ro(n,i),l={"Content-Type":"application/json; charset=utf-8"},c=t.maxOperationRetryTime,u=new Le(r,o,ms(t,i),c);return u.headers=l,u.body=a,u.errorHandler=ni(e),u}function Wv(t,e){const n=e.fullServerUrl(),i=Ke(n,t.host,t._protocol),s="DELETE",r=t.maxOperationRetryTime;function o(l,c){}const a=new Le(i,s,o,r);return a.successCodes=[200,204],a.errorHandler=ni(e),a}function Hv(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function Wu(t,e,n){const i=Object.assign({},n);return i.fullPath=t.path,i.size=e.size(),i.contentType||(i.contentType=Hv(null,e)),i}function Hu(t,e,n,i,s){const r=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let E="";for(let T=0;T<2;T++)E=E+Math.random().toString().slice(2);return E}const l=a();o["Content-Type"]="multipart/related; boundary="+l;const c=Wu(e,i,s),u=Ro(c,n),d="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+u+`\r
--`+l+`\r
Content-Type: `+c.contentType+`\r
\r
`,h=`\r
--`+l+"--",p=Ce.getBlob(d,i,h);if(p===null)throw Au();const f={name:c.fullPath},m=Ke(r,t.host,t._protocol),g="POST",P=t.maxUploadRetryTime,k=new Le(m,g,ms(t,n),P);return k.urlParams=f,k.headers=o,k.body=p.uploadData(),k.errorHandler=rn(e),k}class Wi{constructor(e,n,i,s){this.current=e,this.total=n,this.finalized=!!i,this.metadata=s||null}}function ko(t,e){let n=null;try{n=t.getResponseHeader("X-Goog-Upload-Status")}catch{Ne(!1)}return Ne(!!n&&(e||["active"]).indexOf(n)!==-1),n}function Vv(t,e,n,i,s){const r=e.bucketOnlyServerUrl(),o=Wu(e,i,s),a={name:o.fullPath},l=Ke(r,t.host,t._protocol),c="POST",u={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${i.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},d=Ro(o,n),h=t.maxUploadRetryTime;function p(m){ko(m);let g;try{g=m.getResponseHeader("X-Goog-Upload-URL")}catch{Ne(!1)}return Ne(_s(g)),g}const f=new Le(l,c,p,h);return f.urlParams=a,f.headers=u,f.body=d,f.errorHandler=rn(e),f}function zv(t,e,n,i){const s={"X-Goog-Upload-Command":"query"};function r(c){const u=ko(c,["active","final"]);let d=null;try{d=c.getResponseHeader("X-Goog-Upload-Size-Received")}catch{Ne(!1)}d||Ne(!1);const h=Number(d);return Ne(!isNaN(h)),new Wi(h,i.size(),u==="final")}const o="POST",a=t.maxUploadRetryTime,l=new Le(n,o,r,a);return l.headers=s,l.errorHandler=rn(e),l}const Ka=256*1024;function jv(t,e,n,i,s,r,o,a){const l=new Wi(0,0);if(o?(l.current=o.current,l.total=o.total):(l.current=0,l.total=i.size()),i.size()!==l.total)throw sv();const c=l.total-l.current;let u=c;s>0&&(u=Math.min(u,s));const d=l.current,h=d+u;let p="";u===0?p="finalize":c===u?p="upload, finalize":p="upload";const f={"X-Goog-Upload-Command":p,"X-Goog-Upload-Offset":`${l.current}`},m=i.slice(d,h);if(m===null)throw Au();function g(T,S){const z=ko(T,["active","final"]),q=l.current+u,X=i.size();let F;return z==="final"?F=ms(e,r)(T,S):F=null,new Wi(q,X,z==="final",F)}const P="POST",k=e.maxUploadRetryTime,E=new Le(n,P,g,k);return E.headers=f,E.body=m.uploadData(),E.progressCallback=a||null,E.errorHandler=rn(t),E}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qv={STATE_CHANGED:"state_changed"},ne={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function Ls(t){switch(t){case"running":case"pausing":case"canceling":return ne.RUNNING;case"paused":return ne.PAUSED;case"success":return ne.SUCCESS;case"canceled":return ne.CANCELED;case"error":return ne.ERROR;default:return ne.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gv{constructor(e,n,i){if(dv(e)||n!=null||i!=null)this.next=e,this.error=n??void 0,this.complete=i??void 0;else{const r=e;this.next=r.next,this.error=r.error,this.complete=r.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(t){return(...e)=>{Promise.resolve().then(()=>t(...e))}}class Ao{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Et.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Et.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Et.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,i,s){if(this.sent_)throw fn("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const r in s)s.hasOwnProperty(r)&&this.xhr_.setRequestHeader(r,s[r].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw fn("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw fn("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw fn("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw fn("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Kv extends Ao{initXhr(){this.xhr_.responseType="text"}}function me(){return new Kv}class Yv extends Ao{initXhr(){this.xhr_.responseType="arraybuffer"}}function Qv(){return new Yv}class Zv extends Ao{initXhr(){this.xhr_.responseType="blob"}}function Xv(){return new Zv}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(e,n,i=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=n,this._metadata=i,this._mappings=ti(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=s=>{if(this._request=void 0,this._chunkMultiplier=1,s._codeEquals(M.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const r=this.isExponentialBackoffExpired();if(Du(s.status,[]))if(r)s=Ru();else{this.sleepTime=Math.max(this.sleepTime*2,Yy),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=s,this._transition("error")}},this._metadataErrorHandler=s=>{this._request=void 0,s._codeEquals(M.CANCELED)?this.completeTransitions_():(this._error=s,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((s,r)=>{this._resolve=s,this._reject=r,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){const e=this._transferred;return n=>this._updateProgress(e+n)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([n,i])=>{switch(this._state){case"running":e(n,i);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,n)=>{const i=Vv(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(i,me,e,n);this._request=s,s.getPromise().then(r=>{this._request=void 0,this._uploadUrl=r,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((n,i)=>{const s=zv(this._ref.storage,this._ref._location,e,this._blob),r=this._ref.storage._makeRequest(s,me,n,i);this._request=r,r.getPromise().then(o=>{o=o,this._request=void 0,this._updateProgress(o.current),this._needToFetchStatus=!1,o.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=Ka*this._chunkMultiplier,n=new Wi(this._transferred,this._blob.size()),i=this._uploadUrl;this._resolveToken((s,r)=>{let o;try{o=jv(this._ref._location,this._ref.storage,i,this._blob,e,this._mappings,n,this._makeProgressCallback())}catch(l){this._error=l,this._transition("error");return}const a=this._ref.storage._makeRequest(o,me,s,r,!1);this._request=a,a.getPromise().then(l=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(l.current),l.finalized?(this._metadata=l.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){Ka*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,n)=>{const i=Bu(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(i,me,e,n);this._request=s,s.getPromise().then(r=>{this._request=void 0,this._metadata=r,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,n)=>{const i=Hu(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(i,me,e,n);this._request=s,s.getPromise().then(r=>{this._request=void 0,this._metadata=r,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const n=this._transferred;this._transferred=e,this._transferred!==n&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const n=this._state==="paused";this._state=e,n&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=ku(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=Ls(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,n,i,s){const r=new Gv(n||void 0,i||void 0,s||void 0);return this._addObserver(r),()=>{this._removeObserver(r)}}then(e,n){return this._promise.then(e,n)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const n=this._observers.indexOf(e);n!==-1&&this._observers.splice(n,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(n=>{this._notifyObserver(n)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(Ls(this._state)){case ne.SUCCESS:Lt(this._resolve.bind(null,this.snapshot))();break;case ne.CANCELED:case ne.ERROR:const n=this._reject;Lt(n.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(Ls(this._state)){case ne.RUNNING:case ne.PAUSED:e.next&&Lt(e.next.bind(e,this.snapshot))();break;case ne.SUCCESS:e.complete&&Lt(e.complete.bind(e))();break;case ne.CANCELED:case ne.ERROR:e.error&&Lt(e.error.bind(e,this._error))();break;default:e.error&&Lt(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e,n){this._service=e,n instanceof J?this._location=n:this._location=J.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new At(e,n)}get root(){const e=new J(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Fu(this._location.path)}get storage(){return this._service}get parent(){const e=Rv(this._location.path);if(e===null)return null;const n=new J(this._location.bucket,e);return new At(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw Nu(e)}}function Jv(t,e){t._throwIfRoot("getBytes");const n=$u(t.storage,t._location,e);return t.storage.makeRequestWithTokens(n,Qv).then(i=>e!==void 0?i.slice(0,e):i)}function eE(t,e){t._throwIfRoot("getBlob");const n=$u(t.storage,t._location,e);return t.storage.makeRequestWithTokens(n,Xv).then(i=>e!==void 0?i.slice(0,e):i)}function zu(t,e,n){t._throwIfRoot("uploadBytes");const i=Hu(t.storage,t._location,ti(),new Ce(e,!0),n);return t.storage.makeRequestWithTokens(i,me).then(s=>({metadata:s,ref:t}))}function tE(t,e,n){return t._throwIfRoot("uploadBytesResumable"),new Vu(t,new Ce(e),n)}function nE(t,e,n=he.RAW,i){t._throwIfRoot("uploadString");const s=Co(n,e),r=Object.assign({},i);return r.contentType==null&&s.contentType!=null&&(r.contentType=s.contentType),zu(t,s.data,r)}function iE(t){const e={prefixes:[],items:[]};return ju(t,e).then(()=>e)}async function ju(t,e,n){const s=await qu(t,{pageToken:n});e.prefixes.push(...s.prefixes),e.items.push(...s.items),s.nextPageToken!=null&&await ju(t,e,s.nextPageToken)}function qu(t,e){e!=null&&typeof e.maxResults=="number"&&vr("options.maxResults",1,1e3,e.maxResults);const n=e||{},i=Uv(t.storage,t._location,"/",n.pageToken,n.maxResults);return t.storage.makeRequestWithTokens(i,me)}function sE(t){t._throwIfRoot("getMetadata");const e=Bu(t.storage,t._location,ti());return t.storage.makeRequestWithTokens(e,me)}function rE(t,e){t._throwIfRoot("updateMetadata");const n=$v(t.storage,t._location,e,ti());return t.storage.makeRequestWithTokens(n,me)}function oE(t){t._throwIfRoot("getDownloadURL");const e=Bv(t.storage,t._location,ti());return t.storage.makeRequestWithTokens(e,me).then(n=>{if(n===null)throw rv();return n})}function aE(t){t._throwIfRoot("deleteObject");const e=Wv(t.storage,t._location);return t.storage.makeRequestWithTokens(e,me)}function Gu(t,e){const n=kv(t._location.path,e),i=new J(t._location.bucket,n);return new At(t.storage,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lE(t){return/^[A-Za-z]+:\/\//.test(t)}function cE(t,e){return new At(t,e)}function Ku(t,e){if(t instanceof Po){const n=t;if(n._bucket==null)throw iv();const i=new At(n,n._bucket);return e!=null?Ku(i,e):i}else return e!==void 0?Gu(t,e):t}function uE(t,e){if(e&&lE(e)){if(t instanceof Po)return cE(t,e);throw $i("To use ref(service, url), the first argument must be a Storage instance.")}else return Ku(t,e)}function Ya(t,e){const n=e==null?void 0:e[Su];return n==null?null:J.makeFromBucketSpec(n,t)}function dE(t,e,n,i={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=i;s&&(t._overrideAuthToken=typeof s=="string"?s:fl(s,t.app.options.projectId))}class Po{constructor(e,n,i,s,r){this.app=e,this._authProvider=n,this._appCheckProvider=i,this._url=s,this._firebaseVersion=r,this._bucket=null,this._host=Cu,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Gy,this._maxUploadRetryTime=Ky,this._requests=new Set,s!=null?this._bucket=J.makeFromBucketSpec(s,this._host):this._bucket=Ya(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=J.makeFromBucketSpec(this._url,e):this._bucket=Ya(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){vr("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){vr("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new At(this,e)}_makeRequest(e,n,i,s,r=!0){if(this._deleted)return new av(Pu());{const o=yv(e,this._appId,i,s,n,this._firebaseVersion,r);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,i,s).getPromise()}}const Qa="@firebase/storage",Za="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu="storage";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hE(t,e){return t=C(t),Jv(t,e)}function fE(t,e,n){return t=C(t),zu(t,e,n)}function pE(t,e,n,i){return t=C(t),nE(t,e,n,i)}function _E(t,e,n){return t=C(t),tE(t,e,n)}function mE(t){return t=C(t),sE(t)}function gE(t,e){return t=C(t),rE(t,e)}function yE(t,e){return t=C(t),qu(t,e)}function vE(t){return t=C(t),iE(t)}function EE(t){return t=C(t),oE(t)}function wE(t){return t=C(t),aE(t)}function IE(t,e){return t=C(t),uE(t,e)}function bE(t,e){return Gu(t,e)}function Qu(t=Ar(),e){t=C(t);const i=zi(t,Yu).getImmediate({identifier:e}),s=ul("storage");return s&&Zu(i,...s),i}function Zu(t,e,n,i={}){dE(t,e,n,i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TE(t,e){return t=C(t),eE(t,e)}function CE(t,e){throw new Error("getStream() is only supported by NodeJS builds")}function SE(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new Po(n,i,s,e,Pt)}function RE(){bt(new Oe(Yu,SE,"PUBLIC").setMultipleInstances(!0)),Re(Qa,Za,""),Re(Qa,Za,"esm2017")}RE();const Xa=Object.freeze(Object.defineProperty({__proto__:null,StorageError:W,get StorageErrorCode(){return M},StringFormat:he,_FbsBlob:Ce,_Location:J,_TaskEvent:qv,_TaskState:ne,_UploadTask:Vu,_dataFromString:Co,_getChild:bE,_invalidArgument:$i,_invalidRootOperation:Nu,connectStorageEmulator:Zu,deleteObject:wE,getBlob:TE,getBytes:hE,getDownloadURL:EE,getMetadata:mE,getStorage:Qu,getStream:CE,list:yE,listAll:vE,ref:IE,updateMetadata:gE,uploadBytes:fE,uploadBytesResumable:_E,uploadString:pE},Symbol.toStringTag,{value:"Module"})),kE={apiKey:"AIzaSyArHwZMlyz71o24VIj5yZlPxgswGpKJkVA",authDomain:"nam-zonas.firebaseapp.com",databaseURL:"https://nam-zonas-default-rtdb.europe-west1.firebasedatabase.app",projectId:"nam-zonas",storageBucket:"nam-zonas.firebasestorage.app",messagingSenderId:"491108708871",appId:"1:491108708871:web:1e275d78ac0d25de8330a2"},gs=vl(kE),B=Iu(gs),Te=Jp(gs),AE=Qu(gs),Un=Object.freeze(Object.defineProperty({__proto__:null,app:gs,auth:Te,db:B,storage:AE},Symbol.toStringTag,{value:"Module"})),PE="modulepreload",NE=function(t){return"/Zonas-Roles_-am_Morea_PWA/"+t},Ja={},j=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(n.map(l=>{if(l=NE(l),l in Ja)return;Ja[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":PE,c||(d.as="script"),d.crossOrigin="",d.href=l,a&&d.setAttribute("nonce",a),document.head.appendChild(d),c)return new Promise((h,p)=>{d.addEventListener("load",h),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};function V(t){return t?t.replace(/[&<>"']/g,function(e){switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return e}}):""}const No=[{id:"Z1",nombre:"Zona 1",ubicacion:"Barra - Sup Izquierda",mision_principal:"Atención al cliente de su zona",tareas_secundarias:["Reposición de material","Apoyo a Zona 2"],equipamiento:["Plancha 1","Microondas 2"],flujos:{pide_a:["Z2 (Cafés)"],da_soporte_a:["Z2"]}},{id:"Z2",nombre:"Zona 2",ubicacion:"Barra - Media Frontal",mision_principal:"Atención al cliente de su zona",tareas_secundarias:["Preparar cafés","Preparar tortillas"],equipamiento:["Cafetera 1"],flujos:{pide_a:["Z1 (Zumos)","Z4 (Sándwiches)"],da_soporte_a:["Z1","Z3"]}},{id:"Z3",nombre:"Zona 3",ubicacion:"Barra - Sup Derecha",mision_principal:"Atención al cliente de su zona",tareas_secundarias:["Preparar tortillas","Gestión Pulmón 3","Reposición platos"],equipamiento:["Plancha 2","Micro 1"],flujos:{pide_a:["Z2 (Cafés)","Z1 (Zumos)","Z4 (Bollos)"],da_soporte_a:["Z2","Z4"]}},{id:"Z4",nombre:"Zona 4",ubicacion:"Esquina / Barra Lateral Derecha",mision_principal:"Atención al cliente de su zona",tareas_secundarias:["Gestión cámara fría","Bollería"],equipamiento:["Plancha 2","Micro 1"],flujos:{pide_a:["Z5 (Cafés)","Z3 (Tortillas)"],da_soporte_a:["Z3","Z5"]}},{id:"Z5",nombre:"Zona 5",ubicacion:"Caja / Esquina Inferior Derecha",mision_principal:"Atención al cliente de su zona",tareas_secundarias:["Cobro comedor"],equipamiento:["Cafetera 2","Caja Registradora"],flujos:{pide_a:["Z3/Z4 (Tortillas)"],da_soporte_a:["Z4","Z6"]}},{id:"Z6",nombre:"Zona 6",ubicacion:"Pasillo Central Inferior",mision_principal:"Atención al cliente de su zona",tareas_secundarias:["Gestión vajilla","Pulmones vasos/platos"],equipamiento:["Plancha 1","Micro 2"],flujos:{pide_a:["Z1 (Zumos)","Z3/Z4 (Tortillas)"],da_soporte_a:["Z5","Z7","Comedor"]}},{id:"Z7",nombre:"Zona 7",ubicacion:"Esquina Inferior Izquierda / Fregadero",mision_principal:"Soporte logístico y limpieza",tareas_secundarias:["Recorrido carro vajilla","Limpieza sillas comedor"],equipamiento:["Carro de vajilla","Lavavajillas 1 y 2"],notas_especiales:"Rota cada 2 horas. No atención directa.",flujos:{pide_a:["Z1/Z2 (Zumos y reposición si desborda)"],da_soporte_a:["Z1","Z6","Comedor"]}}];let Bn=[];const on=()=>Bn.length>0?Bn:No;let an={},O=localStorage.getItem("active_restaurant_id")||"demo-restaurant",Qt=null,Ee=null,pn=null,Ms=null,Fs=null,Us=null,Er=null;function Oo(t){O=t,localStorage.setItem("active_restaurant_id",t),Er&&Do(Er)}function Do(t){Er=t,pn&&pn(),Ms&&Ms(),Fs&&Fs(),Us&&Us(),Yt(U(B,`restaurants/${O}/config/name`)).then(r=>{const o=r.val()||O,a=document.getElementById("restaurant-name-badge");a&&(a.textContent=o)}).catch(r=>{console.error("Error al obtener nombre de restaurante",r);const o=document.getElementById("restaurant-name-badge");o&&(o.textContent=O)});const e=U(B,`restaurants/${O}/zones`);Ms=et(e,r=>{const o=r.val();o?Bn=Object.values(o).sort((a,l)=>String(a.id).localeCompare(String(l.id),void 0,{numeric:!0})):Bn=No,t()});const n=U(B,`restaurants/${O}/config/activeShiftId`);Us=et(n,r=>{const o=r.val()||null;Ee=o,pn&&pn();const a=o?`restaurants/${O}/shifts/${o}/assignments`:`restaurants/${O}/assignments`,l=U(B,a);pn=et(l,c=>{an=c.val()||{},t()})}),j(async()=>{const{subscribeShifts:r}=await Promise.resolve().then(()=>HE);return{subscribeShifts:r}},void 0).then(({subscribeShifts:r})=>{r()});const i=U(B,`restaurants/${O}/config/floorplanUrl`);Fs=et(i,r=>{Qt=r.val()||null,t()});const s=U(B,".info/connected");et(s,r=>{const o=document.getElementById("connection-status");if(!o)return;const a=r.val()===!0;o.classList.toggle("online",a),o.classList.toggle("offline",!a);const l=o.querySelector(".status-text");l&&(l.textContent=a?"Online":"Offline")})}function Xu(t,e){const n=Ee?`restaurants/${O}/shifts/${Ee}/assignments/`+t:`restaurants/${O}/assignments/`+t;de(U(B,n),e)}function Ju(){const t=Ee?`restaurants/${O}/shifts/${Ee}/assignments`:`restaurants/${O}/assignments`;fs(U(B,t))}const Hi=Object.freeze(Object.defineProperty({__proto__:null,get activeRestaurantId(){return O},get activeShiftId(){return Ee},clearAssignments:Ju,get currentAsignaciones(){return an},get currentFloorplanUrl(){return Qt},get currentZones(){return Bn},getZonesData:on,initZones:Do,saveAsignacion:Xu,setRestaurantId:Oo},Symbol.toStringTag,{value:"Module"}));function ed(){const t=document.getElementById("zones-admin-list");if(!t)return;const e=on();t.innerHTML=e.map(n=>`
        <div class="admin-zone-row" style="display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid var(--border-color);">
            <strong style="width:40px;">${V(n.id)}</strong>
            <span style="flex:1;">${V(n.nombre)} — ${V(n.ubicacion)}</span>
            <button type="button" class="btn-edit-zone" data-id="${V(n.id)}" style="padding:6px 12px; background:#EFF6FF; border:1px solid #3B82F6; border-radius:6px; color:#1D4ED8; cursor:pointer; font-weight:700; font-size:0.85rem;">Editar</button>
            <button type="button" class="btn-delete-zone" data-id="${V(n.id)}" style="padding:6px 12px; background:#FEF2F2; border:1px solid #EF4444; border-radius:6px; color:#DC2626; cursor:pointer; font-weight:700; font-size:0.85rem;">Eliminar</button>
        </div>
    `).join(""),t.querySelectorAll(".btn-edit-zone").forEach(n=>{n.addEventListener("click",async()=>{const i=n.getAttribute("data-id")||"";try{const{getZone:s}=await j(async()=>{const{getZone:o}=await Promise.resolve().then(()=>el);return{getZone:o}},void 0),r=await s(i);r&&(await j(()=>Promise.resolve().then(()=>ME),void 0)).openZoneForm(r)}catch(s){console.error("Error cargando zona:",s),alert("Error al cargar la zona. Revisa tu conexión.")}})}),t.querySelectorAll(".btn-delete-zone").forEach(n=>{n.addEventListener("click",async()=>{const i=n.getAttribute("data-id")||"";if(confirm(`¿Eliminar la zona ${i}? Esta acción no se puede deshacer.`))try{const{deleteZone:s}=await j(async()=>{const{deleteZone:r}=await Promise.resolve().then(()=>el);return{deleteZone:r}},void 0);await s(i)}catch(s){console.error("Error eliminando zona:",s),alert("Error al eliminar. Revisa tu conexión.")}})})}function OE(t){return{id:t.id||"",nombre:t.nombre,ubicacion:t.ubicacion,mision_principal:t.mision,tareas_secundarias:t.tareasSecundarias,equipamiento:t.equipamientos,flujos:t.flujos,updatedAt:t.updatedAt,position:t.position}}function td(t){return{id:t.id,nombre:t.nombre,ubicacion:t.ubicacion,mision:t.mision_principal,tareasSecundarias:t.tareas_secundarias,equipamientos:t.equipamiento,flujos:t.flujos,updatedAt:t.updatedAt,position:t.position}}async function nd(t){const e=U(B,`restaurants/${O}/zones`),n=wo(e),i=n.key;return await de(n,OE({...t,id:i})),i}async function id(t,e){const n=U(B,`restaurants/${O}/zones/${t}`),i={};e.nombre!==void 0&&(i.nombre=e.nombre),e.ubicacion!==void 0&&(i.ubicacion=e.ubicacion),e.mision!==void 0&&(i.mision_principal=e.mision),e.tareasSecundarias!==void 0&&(i.tareas_secundarias=e.tareasSecundarias),e.equipamientos!==void 0&&(i.equipamiento=e.equipamientos),e.flujos!==void 0&&(i.flujos=e.flujos),e.updatedAt!==void 0&&(i.updatedAt=e.updatedAt),await de(n,i)}async function DE(t){await fs(U(B,`restaurants/${O}/zones/${t}`))}async function xE(t){const e=await Yt(U(B,`restaurants/${O}/zones/${t}`));if(!e.exists())return null;const n=e.val();return td(n)}const el=Object.freeze(Object.defineProperty({__proto__:null,createZone:nd,deleteZone:DE,fromFirebase:td,getZone:xE,updateZone:id},Symbol.toStringTag,{value:"Module"}));let Ft=null,tl=!1;function LE(t){const e=document.getElementById("modal-zone-form"),n=document.getElementById("zone-nombre"),i=document.getElementById("zone-ubicacion"),s=document.getElementById("zone-mision"),r=document.getElementById("zone-tareas"),o=document.getElementById("zone-equipos"),a=document.getElementById("zone-pide-a"),l=document.getElementById("zone-da-soporte");if(!(!e||!n||!i||!s||!r||!o||!a||!l)){if(wr(),t)Ft=t.id||null,n.value=t.nombre,i.value=t.ubicacion,s.value=t.mision,r.value=t.tareasSecundarias.join(`
`),o.value=t.equipamientos.join(`
`),a.value=t.flujos.pide_a.join(`
`),l.value=t.flujos.da_soporte_a.join(`
`);else{Ft=null;const c=document.getElementById("form-zone");c&&c.reset()}e.open||e.showModal()}}function sd(){var i;if(tl)return;tl=!0;const t=document.getElementById("btn-add-zone");t&&t.addEventListener("click",()=>{Ft=null;const s=document.getElementById("form-zone");s&&s.reset(),wr();const r=document.getElementById("modal-zone-form");r&&r.showModal()});const e=document.getElementById("form-zone");if(!e)return;const n=e.cloneNode(!0);(i=e.parentNode)==null||i.replaceChild(n,e),n.addEventListener("submit",async s=>{s.preventDefault(),wr();const r=document.getElementById("zone-nombre"),o=document.getElementById("zone-ubicacion"),a=document.getElementById("zone-mision"),l=document.getElementById("zone-tareas"),c=document.getElementById("zone-equipos"),u=document.getElementById("zone-pide-a"),d=document.getElementById("zone-da-soporte");if(!r||!o||!a||!l||!c||!u||!d)return;const h=r.value.trim(),p=o.value.trim(),f=a.value.trim(),m=l.value.split(`
`).map(S=>S.trim()).filter(Boolean),g=c.value.split(`
`).map(S=>S.trim()).filter(Boolean),P=u.value.split(`
`).map(S=>S.trim()).filter(Boolean),k=d.value.split(`
`).map(S=>S.trim()).filter(Boolean);let E=!1;if(h||(Bs("zone-nombre","El nombre es obligatorio"),E=!0),p||(Bs("zone-ubicacion","La ubicación es obligatoria"),E=!0),f||(Bs("zone-mision","La misión es obligatoria"),E=!0),E)return;const T={id:Ft||void 0,nombre:h,ubicacion:p,mision:f,tareasSecundarias:m,equipamientos:g,flujos:{pide_a:P,da_soporte_a:k},updatedAt:Date.now()};try{Ft?await id(Ft,T):await nd(T);const S=document.getElementById("modal-zone-form");S&&S.close()}catch(S){console.error("Error guardando zona:",S);const z=document.getElementById("zone-form-error");z&&(z.textContent="Error al guardar. Revisa tu conexión e inténtalo de nuevo.",z.style.display="block")}})}function Bs(t,e){const n=document.getElementById(`${t}-error`);n&&(n.textContent=e,n.style.display="block")}function wr(){document.querySelectorAll(".field-error").forEach(t=>{t.style.display="none"})}const ME=Object.freeze(Object.defineProperty({__proto__:null,initZoneForm:sd,openZoneForm:LE},Symbol.toStringTag,{value:"Module"}));let Cn=!1,tt={},_n=null,mn=null,li={x:0,y:0},$s=!1,Me={x:0,y:0,w:0,h:0},Ws={x:0,y:0};function Vt(){var o;const t=document.getElementById("floorplan-canvas"),e=document.getElementById("plano-svg"),n=document.getElementById("floorplan-toolbar");if(!t||!e)return;const i=!((o=document.getElementById("admin-content"))!=null&&o.classList.contains("hidden"));if(n&&(n.style.display=i?"flex":"none"),!Qt){t.style.display="none",e.style.display="block";const a=document.getElementById("floorplan-edit-hint");a&&(a.style.display="none");return}e.style.display="none",t.style.display="block",t.style.backgroundImage=`url("${Qt}")`,Cn?t.classList.add("design-mode"):t.classList.remove("design-mode"),t.innerHTML="";const s=localStorage.getItem("puestoya_mi_zona_"+O),r=on();r.forEach(a=>{const l=a.position||{x:5+r.indexOf(a)*14%80,y:10+Math.floor(r.indexOf(a)*14/80)*20,width:14,height:14},c=tt[a.id]||{x:l.x,y:l.y,w:l.width,h:l.height},u=document.createElement("div");u.className="canvas-zone-block",a.id===s&&u.classList.add("is-mi-zona"),u.setAttribute("data-zone-id",a.id),u.style.left=`${c.x}%`,u.style.top=`${c.y}%`,u.style.width=`${c.w}%`,u.style.height=`${c.h}%`;const d=document.createElement("span");d.className="canvas-zone-id",d.textContent=a.id,u.appendChild(d);const h=document.createElement("span");if(h.className="canvas-zone-label",h.textContent=a.nombre,u.appendChild(h),Cn){const p=document.createElement("div");p.className="zone-resize-handle",u.appendChild(p),u.addEventListener("pointerdown",f=>{if(f.target.classList.contains("zone-resize-handle")){$s=!0,mn=u,_n=f.pointerId,Me={x:c.x,y:c.y,w:c.w,h:c.h},Ws={x:f.clientX,y:f.clientY},u.setPointerCapture(f.pointerId),f.stopPropagation();return}$s=!1,mn=u,_n=f.pointerId;const g=u.getBoundingClientRect();li.x=f.clientX-g.left,li.y=f.clientY-g.top,u.setPointerCapture(f.pointerId),f.stopPropagation()}),u.addEventListener("pointermove",f=>{if(mn!==u||_n!==f.pointerId)return;const m=t.getBoundingClientRect();if($s){const g=f.clientX-Ws.x,P=f.clientY-Ws.y,k=g/m.width*100,E=P/m.height*100;let T=Math.max(5,Me.w+k),S=Math.max(5,Me.h+E);Me.x+T>100&&(T=100-Me.x),Me.y+S>100&&(S=100-Me.y),u.style.width=`${T}%`,u.style.height=`${S}%`,tt[a.id]={x:Me.x,y:Me.y,w:T,h:S}}else{const g=f.clientX-m.left-li.x,P=f.clientY-m.top-li.y;let k=g/m.width*100,E=P/m.height*100;const T=c.w,S=c.h;k=Math.max(0,Math.min(100-T,k)),E=Math.max(0,Math.min(100-S,E)),u.style.left=`${k}%`,u.style.top=`${E}%`,tt[a.id]={x:k,y:E,w:T,h:S}}}),u.addEventListener("pointerup",f=>{mn===u&&_n===f.pointerId&&(u.releasePointerCapture(f.pointerId),mn=null,_n=null)})}else u.addEventListener("click",()=>{ys(a.id)});t.appendChild(u)})}let nl=!1;function FE(){if(nl)return;nl=!0;const t=document.getElementById("btn-edit-layout"),e=document.getElementById("btn-save-layout"),n=document.getElementById("btn-cancel-layout"),i=document.getElementById("floorplan-edit-hint");!t||!e||!n||(t.addEventListener("click",()=>{Cn=!0,tt={},t.style.display="none",e.style.display="inline-flex",n.style.display="inline-flex",i&&(i.style.display="block"),Vt()}),n.addEventListener("click",()=>{Cn=!1,tt={},t.style.display="inline-flex",e.style.display="none",n.style.display="none",i&&(i.style.display="none"),Vt()}),e.addEventListener("click",async()=>{if(confirm("¿Deseas guardar la nueva distribución del plano?"))try{const{ref:s,set:r}=await j(async()=>{const{ref:c,set:u}=await Promise.resolve().then(()=>Fn);return{ref:c,set:u}},void 0),{db:o}=await j(async()=>{const{db:c}=await Promise.resolve().then(()=>Un);return{db:c}},void 0),{activeRestaurantId:a}=await j(async()=>{const{activeRestaurantId:c}=await Promise.resolve().then(()=>Hi);return{activeRestaurantId:c}},void 0),l=Object.keys(tt).map(async c=>{const u=tt[c];await r(s(o,`restaurants/${a}/zones/${c}/position`),{x:Math.round(u.x*10)/10,y:Math.round(u.y*10)/10,width:Math.round(u.w*10)/10,height:Math.round(u.h*10)/10})});await Promise.all(l),alert("¡Distribución del plano guardada con éxito!"),Cn=!1,tt={},t.style.display="inline-flex",e.style.display="none",n.style.display="none",i&&(i.style.display="none"),Vt()}catch(s){console.error("Error al guardar distribución:",s),alert("Error al guardar la distribución del plano. Revisa tu conexión.")}}))}function UE(t,e){const n={},i=/^([01]\d|2[0-3]):([0-5]\d)$/;return i.test(t)||(n.horaInicio="Formato inválido. Usa HH:MM"),i.test(e)||(n.horaFin="Formato inválido. Usa HH:MM"),t===e&&!n.horaInicio&&!n.horaFin&&(n.horaFin="horaFin debe ser distinta a horaInicio"),n}async function BE(t){await fs(U(B,`restaurants/${O}/shifts/${t}`))}async function $E(){const t=await Yt(U(B,`restaurants/${O}/shifts`));if(!t.exists())return[];const e=t.val();return Object.values(e).sort((n,i)=>n.nombre.localeCompare(i.nombre))}function xo(){const t=document.getElementById("shifts-list-container");t&&(t.innerHTML='<p class="text-muted">Cargando turnos...</p>',$E().then(e=>{if(e.length===0){t.innerHTML='<p class="text-muted">Sin turnos creados.</p>';return}t.innerHTML=e.map(n=>`
      <div class="shift-row">
        <span>${Hs(n.nombre)} · ${Hs(n.horaInicio)}–${Hs(n.horaFin)}</span>
        <button class="btn btn-sm btn-secondary" data-action="edit-shift" data-id="${n.id}">Editar</button>
        <button class="btn btn-sm btn-danger" data-action="delete-shift" data-id="${n.id}">Eliminar</button>
      </div>
    `).join("")}),t.addEventListener("click",async e=>{const n=e.target,i=n.getAttribute("data-action"),s=n.getAttribute("data-id");if(!(!i||!s)&&i==="delete-shift"){if(!confirm("¿Borrar turno y sus asignaciones?"))return;await BE(s),await xo()}}))}function Hs(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]||e)}let Vs=[],pi=null,Ir=null;function rd(t){return Ir=t,pi}function WE(){pi&&pi();const t=U(B,`restaurants/${O}/shifts`);pi=et(t,e=>{const n=e.val();n?Vs=Object.values(n).sort((i,s)=>i.nombre.localeCompare(s.nombre)):Vs=[],Ir&&Ir(Vs)})}async function od(t){const e=U(B,`restaurants/${O}/shifts`),n=wo(e),i=n.key;return await de(n,{...t,id:i}),i}async function ad(t,e){const n=U(B,`restaurants/${O}/shifts/${t}`),i={};e.nombre!==void 0&&(i.nombre=e.nombre),e.horaInicio!==void 0&&(i.horaInicio=e.horaInicio),e.horaFin!==void 0&&(i.horaFin=e.horaFin),e.updatedAt!==void 0&&(i.updatedAt=e.updatedAt),await de(n,i)}const HE=Object.freeze(Object.defineProperty({__proto__:null,createShift:od,onShiftsChange:rd,subscribeShifts:WE,updateShift:ad},Symbol.toStringTag,{value:"Module"}));let zs=null,il=!1;function VE(){var i;if(il)return;il=!0;const t=document.getElementById("btn-add-shift");if(!t)return;t.addEventListener("click",()=>{zs=null;const s=document.getElementById("form-shift");s&&s.reset(),sl();const r=document.getElementById("modal-shift-form");r&&r.showModal()});const e=document.getElementById("form-shift");if(!e)return;const n=e.cloneNode(!0);(i=e.parentNode)==null||i.replaceChild(n,e),n.addEventListener("submit",async s=>{s.preventDefault(),sl();const r=document.getElementById("shift-nombre"),o=document.getElementById("shift-hora-inicio"),a=document.getElementById("shift-hora-fin");if(!r||!o||!a)return;const l=r.value.trim(),c=o.value.trim(),u=a.value.trim();let d=!1;l||(js("shift-nombre","El nombre es obligatorio"),d=!0);const h=UE(c,u);if(h.horaInicio&&(js("shift-hora-inicio",h.horaInicio),d=!0),h.horaFin&&(js("shift-hora-fin",h.horaFin),d=!0),d)return;const p={nombre:l,horaInicio:c,horaFin:u,updatedAt:Date.now()};try{zs?await ad(zs,p):await od(p);const f=document.getElementById("modal-shift-form");f&&f.close()}catch(f){console.error("Error guardando turno:",f);const m=document.getElementById("shift-form-error");m&&(m.textContent="Error al guardar. Revisa tu conexión e inténtalo de nuevo.",m.style.display="block")}})}function js(t,e){const n=document.getElementById(`${t}-error`);n&&(n.textContent=e,n.style.display="block")}function sl(){document.querySelectorAll('[id$="-error"]').forEach(t=>{t instanceof HTMLElement&&(t.style.display="none")})}function zE(t){var i,s;(i=document.getElementById("admin-login-container"))==null||i.classList.add("hidden"),(s=document.getElementById("admin-content"))==null||s.classList.remove("hidden");const e=document.getElementById("logged-user-name");e&&(e.textContent=t);const n=document.getElementById("btn-restaurant-config");n&&(n.style.display="inline-flex"),ed(),sd(),Vt(),VE(),xo()}function ci(){var e,n;(e=document.getElementById("admin-content"))==null||e.classList.add("hidden"),(n=document.getElementById("admin-login-container"))==null||n.classList.remove("hidden");const t=document.getElementById("logged-user-name");t&&(t.textContent="")}function jE(){document.querySelectorAll(".tab-btn").forEach(t=>{t.addEventListener("click",e=>{var s,r;const n=e.target;if(n.id==="btn-normas"){(s=document.getElementById("modal-normas"))==null||s.showModal();return}document.querySelectorAll(".tab-btn").forEach(o=>o.classList.remove("active")),n.classList.add("active");const i=n.getAttribute("data-target");document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden")),i&&((r=document.getElementById(i))==null||r.classList.remove("hidden"),i==="view-plano"&&Vt())})})}function qE(){document.querySelectorAll(".close-modal").forEach(t=>{t.addEventListener("click",e=>{const n=e.target.closest("dialog");n&&n.close()})})}function GE(){var s;const t=document.getElementById("grid-zonas-admin");if(!t)return;const e=on();t.innerHTML=e.map(r=>`
        <div class="admin-row">
            <label>${r.id} - ${V(r.nombre)} (${V(r.ubicacion)})</label>
            <input type="text" placeholder="Nombre del camarero/a" data-id="${r.id}" value="${V(an[r.id]||"")}">
        </div>
    `).join("");let n=null;t.querySelectorAll("input").forEach(r=>{r.addEventListener("input",o=>{const a=o.target;clearTimeout(n),n=setTimeout(()=>{const l=a.getAttribute("data-id");l&&Xu(l,a.value.trim())},600)})});const i=document.getElementById("btn-clear-assignments");if(i){const r=i.cloneNode(!0);(s=i.parentNode)==null||s.replaceChild(r,i),r.addEventListener("click",()=>{confirm("🚨 ¿ALERTA: Seguro que quieres borrar TODAS las asignaciones del turno? (Se borrará instantáneamente en los móviles de TODOS los camareros)")&&Ju()})}}function KE(){const t=document.getElementById("grid-zonas-admin");t&&t.querySelectorAll("input").forEach(e=>{if(document.activeElement!==e){const n=e.getAttribute("data-id");n&&(e.value=an[n]||"")}})}function br(){return localStorage.getItem("puestoya_mi_zona_"+O)}function Lo(){const t=document.getElementById("grid-zonas-camarero");if(!t)return;const e=on(),n=br();t.innerHTML=e.map(i=>{const s=an[i.id],r=i.id===n;return`
            <div class="zona-card ${s?"has-asignado":""} ${r?"is-mi-zona":""}" data-id="${i.id}">
                <div class="zona-id">${i.id}</div>
                <div class="zona-nombre">${V(i.nombre)}</div>
                ${s?`<div class="zona-asignado">👤 ${V(s)}</div>`:'<div class="zona-asignado" style="background:transparent;color:var(--text-muted);border:1px solid var(--border-color);">Sin asignar</div>'}
            </div>
        `}).join(""),t.querySelectorAll(".zona-card").forEach(i=>{i.addEventListener("click",()=>{const s=i.getAttribute("data-id");s&&ys(s)})})}function ys(t){var m;const e=document.getElementById("modal-zona");if(!e)return;e.setAttribute("data-active-zona",t);const i=on().find(g=>g.id===t);if(!i)return;const s=an[t]||"Sin asignar",r=document.getElementById("floorplan-canvas");let o="";r&&r.style.display!=="none"?o=r.outerHTML:o=((m=document.getElementById("plano-svg"))==null?void 0:m.outerHTML)||"";const a=t===br(),l=a?"⭐ Quitar de mi zona":"☆ Marcar como mi zona",c=a?"background: #EFF6FF; border-color: #3B82F6; color: #1D4ED8;":"background: var(--bg-card); border-color: var(--border-color); color: var(--text-muted);",u=`
        <div class="modal-body-zona">
            <h2>${i.id} - ${V(i.nombre)}</h2>
            <p style="color:var(--text-muted); margin-bottom:10px; font-size:0.95rem; font-weight:500;">📍 ${V(i.ubicacion)}</p>
            <p style="font-size: 1.1rem; margin-bottom: 15px;"><strong>👤 Camarero/a:</strong> <span style="color:var(--primary-hover); font-weight:800;">${V(s)}</span></p>
            
            <button id="btn-toggle-mi-zona" class="btn-manual" style="margin-top: 5px; margin-bottom: 15px; width: 100%; font-weight: 600; display: inline-flex; justify-content: center; align-items: center; gap: 6px; ${c}" data-zone-id="${t}">
                ${l}
            </button>

            <div class="modal-map-container">
                ${o}
            </div>
            
            <div class="section-title">🎯 Misión Principal</div>
            <p style="font-size: 1rem;">${V(i.mision_principal)}</p>
            
            <div class="section-title">📋 Tareas y Equipamiento</div>
            <div>${i.tareas_secundarias.map(g=>`<span class="tag">${V(g)}</span>`).join("")}</div>
            <div style="margin-top:8px;">${i.equipamiento.map(g=>`<span class="tag" style="background:#FFF7ED; color:#EA580C; border-color:#FDBA74;">⚙️ ${V(g)}</span>`).join("")}</div>
            
            <div class="section-title">🔄 Flujos de Trabajo</div>
            <p style="font-size: 0.95rem;"><strong>Pide a:</strong> ${i.flujos.pide_a.map(g=>V(g)).join(", ")}</p>
            <p style="font-size: 0.95rem;"><strong>Da soporte a:</strong> ${i.flujos.da_soporte_a.map(g=>V(g)).join(", ")}</p>
            
            ${i.notas_especiales?`<div class="section-title" style="color:var(--danger)">⚠️ Notas Críticas</div><p style="font-size: 0.95rem;">${V(i.notas_especiales)}</p>`:""}
        </div>
    `,d=document.getElementById("modal-body-zona");d&&(d.innerHTML=u);const h=document.getElementById("btn-toggle-mi-zona");h&&h.addEventListener("click",()=>{br()===t?localStorage.removeItem("puestoya_mi_zona_"+O):localStorage.setItem("puestoya_mi_zona_"+O,t),Lo(),ys(t)});const p=document.querySelector("#modal-body-zona .plano-svg");if(p){p.removeAttribute("id");const g=p.querySelector("#map-"+t);g&&g.classList.add("active")}const f=document.querySelector("#modal-body-zona .floorplan-canvas");if(f){f.removeAttribute("id"),f.classList.remove("design-mode");const g=f.querySelector(`[data-zone-id="${t}"]`);g&&g.classList.add("active")}e.open||e.showModal()}function YE(){const t=document.getElementById("modal-zona");if(t&&t.open){const e=t.getAttribute("data-active-zona");e&&ys(e)}}function QE(){var t;KE(),ed(),Lo(),YE(),XE(),Vt(),nw(),(t=document.getElementById("admin-content"))!=null&&t.classList.contains("hidden")||xo()}function ZE(){var r;const t=document.getElementById("btn-restaurant-config"),e=document.getElementById("modal-restaurant-config"),n=document.getElementById("form-restaurant-name"),i=document.getElementById("input-restaurant-name"),s=document.getElementById("restaurant-config-error");!t||!e||!n||!i||!s||(t.addEventListener("click",()=>{var a;s.style.display="none";const o=(((a=document.getElementById("restaurant-name-badge"))==null?void 0:a.textContent)||"").trim();i.value=o,e.showModal()}),(r=document.querySelector("#modal-restaurant-config .close-modal"))==null||r.addEventListener("click",()=>e.close()),n.addEventListener("submit",async o=>{o.preventDefault(),s.style.display="none";const a=i.value.trim();if(!a){s.textContent="El nombre no puede estar vacío.",s.style.display="block";return}try{const{set:l,ref:c}=await j(async()=>{const{set:p,ref:f}=await Promise.resolve().then(()=>Fn);return{set:p,ref:f}},void 0),{db:u}=await j(async()=>{const{db:p}=await Promise.resolve().then(()=>Un);return{db:p}},void 0),{activeRestaurantId:d}=await j(async()=>{const{activeRestaurantId:p}=await Promise.resolve().then(()=>Hi);return{activeRestaurantId:p}},void 0);await l(c(u,`restaurants/${d}/config/name`),a);const h=document.getElementById("restaurant-name-badge");h&&(h.textContent=a),e.close()}catch(l){console.error("Error guardando nombre de restaurante",l),s.textContent="Error al guardar. Revisa tu conexión e inténtalo de nuevo.",s.style.display="block"}}))}function XE(){const t=document.getElementById("floorplan-preview-container"),e=document.getElementById("floorplan-preview"),n=document.getElementById("floorplan-dropzone");if(!(!t||!e||!n))if(Qt){e.src=Qt,t.style.display="block";const i=n.querySelector("p");i&&(i.textContent="Arrastra aquí para reemplazar el plano o haz clic")}else{e.src="",t.style.display="none";const i=n.querySelector("p");i&&(i.textContent="Arrastra aquí la foto del plano o haz clic para buscar")}}function JE(){const t=document.getElementById("floorplan-dropzone"),e=document.getElementById("floorplan-file-input"),n=document.getElementById("floorplan-progress-container"),i=document.getElementById("floorplan-progress-text"),s=document.getElementById("floorplan-progress-bar"),r=document.getElementById("floorplan-preview-container"),o=document.getElementById("floorplan-preview"),a=document.getElementById("btn-remove-floorplan");if(!t||!e||!n||!i||!s||!r||!o||!a)return;const l=e,c=n,u=s,d=i;["dragenter","dragover","dragleave","drop"].forEach(f=>{t.addEventListener(f,m=>{m.preventDefault(),m.stopPropagation()},!1)}),["dragenter","dragover"].forEach(f=>{t.addEventListener(f,()=>{t.classList.add("dragover")},!1)}),["dragleave","drop"].forEach(f=>{t.addEventListener(f,()=>{t.classList.remove("dragover")},!1)}),t.addEventListener("drop",f=>{const m=f.dataTransfer,g=m==null?void 0:m.files;g&&g.length>0&&h(g[0])}),t.addEventListener("click",()=>{l.click()}),l.addEventListener("change",()=>{const f=l.files;f&&f.length>0&&h(f[0])});function h(f){if(!["image/png","image/jpeg","image/jpg"].includes(f.type)){alert("Formato de archivo no válido. Solo se permiten imágenes JPG y PNG."),l.value="";return}const g=5*1024*1024;if(f.size>g){alert("El archivo supera el tamaño máximo permitido de 5MB."),l.value="";return}p(f)}async function p(f){try{const{ref:m,uploadBytesResumable:g,getDownloadURL:P}=await j(async()=>{const{ref:F,uploadBytesResumable:be,getDownloadURL:ld}=await Promise.resolve().then(()=>Xa);return{ref:F,uploadBytesResumable:be,getDownloadURL:ld}},void 0),{ref:k,set:E}=await j(async()=>{const{ref:F,set:be}=await Promise.resolve().then(()=>Fn);return{ref:F,set:be}},void 0),{storage:T,db:S}=await j(async()=>{const{storage:F,db:be}=await Promise.resolve().then(()=>Un);return{storage:F,db:be}},void 0),{activeRestaurantId:z}=await j(async()=>{const{activeRestaurantId:F}=await Promise.resolve().then(()=>Hi);return{activeRestaurantId:F}},void 0);if(!z){alert("No hay un restaurante activo seleccionado.");return}const q=m(T,`restaurants/${z}/floorplan.png`);c.style.display="block",u.style.width="0%",d.textContent="0%";const X=g(q,f);X.on("state_changed",F=>{const be=Math.round(F.bytesTransferred/F.totalBytes*100);u.style.width=`${be}%`,d.textContent=`${be}%`},F=>{console.error("Error al subir el plano:",F),alert(`Fallo en la subida: ${F.message}`),c.style.display="none",l.value=""},async()=>{try{const F=await P(X.snapshot.ref);await E(k(S,`restaurants/${z}/config/floorplanUrl`),F),alert("¡Plano subido con éxito!"),c.style.display="none",l.value=""}catch(F){console.error("Error al guardar URL en la base de datos:",F),alert("Error al guardar la referencia en la base de datos."),c.style.display="none",l.value=""}})}catch(m){console.error("Error al cargar módulos de Firebase:",m),alert("Error del sistema al iniciar la subida."),c.style.display="none"}}a.addEventListener("click",async f=>{if(f.stopPropagation(),!!confirm("¿Estás seguro de que quieres eliminar el plano actual?"))try{const{ref:m,deleteObject:g}=await j(async()=>{const{ref:q,deleteObject:X}=await Promise.resolve().then(()=>Xa);return{ref:q,deleteObject:X}},void 0),{ref:P,remove:k}=await j(async()=>{const{ref:q,remove:X}=await Promise.resolve().then(()=>Fn);return{ref:q,remove:X}},void 0),{storage:E,db:T}=await j(async()=>{const{storage:q,db:X}=await Promise.resolve().then(()=>Un);return{storage:q,db:X}},void 0),{activeRestaurantId:S}=await j(async()=>{const{activeRestaurantId:q}=await Promise.resolve().then(()=>Hi);return{activeRestaurantId:q}},void 0);if(!S)return;const z=m(E,`restaurants/${S}/floorplan.png`);try{await g(z)}catch(q){q.code!=="storage/object-not-found"&&console.error("Error al eliminar plano de Firebase Storage:",q)}await k(P(T,`restaurants/${S}/config/floorplanUrl`)),alert("Plano eliminado correctamente.")}catch(m){console.error("Error al eliminar el plano:",m),alert("Error al eliminar el plano. Revisa tu conexión.")}})}function ew(){FE()}function tw(){rd(i=>{const s=document.getElementById("select-active-shift-admin"),r=document.getElementById("select-active-shift-camarero"),o=`
            <option value="">-- Sin Turno Asignado --</option>
            ${i.map(a=>`<option value="${a.id||""}" ${a.id===Ee?"selected":""}>${V(a.nombre)} (${V(a.horaInicio)} - ${V(a.horaFin)})</option>`).join("")}
        `;s&&(s.innerHTML=o,s.value=Ee||""),r&&(r.innerHTML=o,r.value=Ee||"")});const t=async i=>{const s=i.target.value;try{const{set:r,ref:o}=await j(async()=>{const{set:l,ref:c}=await Promise.resolve().then(()=>Fn);return{set:l,ref:c}},void 0),{db:a}=await j(async()=>{const{db:l}=await Promise.resolve().then(()=>Un);return{db:l}},void 0);await r(o(a,`restaurants/${O}/config/activeShiftId`),s||null)}catch(r){console.error("Error setting active shift:",r)}},e=document.getElementById("select-active-shift-admin");e&&e.addEventListener("change",t);const n=document.getElementById("select-active-shift-camarero");n&&n.addEventListener("change",t)}function nw(){const t=document.getElementById("select-active-shift-admin"),e=document.getElementById("select-active-shift-camarero");t&&(t.value=Ee||""),e&&(e.value=Ee||"")}function iw(){tw()}function sw(){return"rest-"+Math.random().toString(36).substring(2,9).toUpperCase()}function rw(){var n;Hf(Te,async i=>{if(i&&i.email){if(!i.emailVerified){ci();return}try{const r=(await Yt(U(B,`users/${i.uid}/restaurantId`))).val();if(r){Oo(r);const a=(await Yt(U(B,`restaurants/${r}/config/name`))).val()||"Mi Restaurante";zE(`${i.email} (${a})`)}else console.error("Usuario sin restaurante asignado."),await ln(Te),ci()}catch(s){console.error("Error al obtener restaurante del usuario",s),await ln(Te),ci()}}else ci()});const t=document.getElementById("btn-login");t&&t.addEventListener("click",async()=>{const i=document.getElementById("login-email"),s=document.getElementById("login-pass"),r=document.getElementById("login-error"),o=i.value.trim(),a=s.value.trim();if(!o||!o.includes("@")){r.style.color="var(--danger)",r.textContent="Introduce un correo electrónico válido.",r.style.display="block";return}if(!a){r.style.color="var(--danger)",r.textContent="Introduce una contraseña.",r.style.display="block";return}if(a.length<6){r.style.color="var(--danger)",r.textContent="La contraseña debe tener al menos 6 caracteres.",r.style.display="block";return}t.textContent="Comprobando...",t.disabled=!0,r.style.display="none",r.style.color="var(--danger)";try{(await Uf(Te,o,a)).user.emailVerified||(await ln(Te),r.style.color="var(--danger)",r.textContent="Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.",r.style.display="block")}catch(l){if(l.code==="auth/user-not-found"||l.code==="auth/invalid-credential")try{const u=(await Ff(Te,o,a)).user,d=sw(),h={};No.forEach(p=>{h[p.id]=p}),await de(U(B,`restaurants/${d}/config`),{name:"Mi Restaurante",createdAt:Date.now()}),await de(U(B,`restaurants/${d}/zones`),h),await de(U(B,`restaurants/${d}/members/${u.uid}`),{role:"admin",email:o}),await de(U(B,`users/${u.uid}`),{restaurantId:d}),await Bf(u),await ln(Te),r.style.color="#166534",r.textContent=`¡Cuenta creada! Te hemos enviado un correo de verificación a ${o}. Por favor, verifícalo antes de iniciar sesión.`,r.style.display="block"}catch(c){console.error("Error al registrar encargado",c),c.code==="auth/email-already-in-use"?(r.style.color="var(--danger)",r.textContent="Contraseña incorrecta."):(r.style.color="var(--danger)",r.textContent="Error al crear la cuenta. Inténtalo de nuevo."),r.style.display="block"}else l.code==="auth/wrong-password"?(r.style.color="var(--danger)",r.textContent="Contraseña incorrecta.",r.style.display="block"):(console.error("Error de conexión con Firebase Auth",l),r.style.color="var(--danger)",r.textContent="Error de conexión.",r.style.display="block")}finally{t.textContent="Entrar al Panel",t.disabled=!1}});const e=document.getElementById("btn-forgot-password");e&&e.addEventListener("click",async i=>{i.preventDefault();const s=document.getElementById("login-email"),r=document.getElementById("login-error"),o=s.value.trim();if(!o||!o.includes("@")){r.style.color="var(--danger)",r.textContent="Introduce tu correo electrónico arriba para poder restablecer la contraseña.",r.style.display="block";return}try{await Mf(Te,o),r.style.color="#166534",r.textContent="Te hemos enviado un correo para restablecer la contraseña.",r.style.display="block",setTimeout(()=>{r.style.color="var(--danger)"},5e3)}catch(a){r.style.color="var(--danger)",r.textContent="No pudimos enviar el correo de recuperación.",r.style.display="block",console.error("Reset pwd error",a)}}),(n=document.getElementById("btn-logout"))==null||n.addEventListener("click",async()=>{try{await ln(Te)}catch(i){console.error("Error al cerrar sesión",i)}})}document.addEventListener("DOMContentLoaded",()=>{const e=new URLSearchParams(window.location.search).get("r");e&&Oo(e.trim()),jE(),qE(),ZE(),JE(),ew(),iw(),GE(),Lo(),rw(),Do(()=>{QE()})});
