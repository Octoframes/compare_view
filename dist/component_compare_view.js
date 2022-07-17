/*! For license information please see component_compare_view.js.LICENSE.txt */
(()=>{"use strict";var e={408:(e,t)=>{var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),l=Symbol.for("react.context"),s=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),_=Symbol.iterator,h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,p={};function v(e,t,n){this.props=e,this.context=t,this.refs=p,this.updater=n||h}function y(){}function g(e,t,n){this.props=e,this.context=t,this.refs=p,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=v.prototype;var b=g.prototype=new y;b.constructor=g,m(b,v.prototype),b.isPureReactComponent=!0;var w=Array.isArray,k=Object.prototype.hasOwnProperty,x={current:null},S={key:!0,ref:!0,__self:!0,__source:!0};function E(e,t,r){var o,c={},a=null,i=null;if(null!=t)for(o in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(a=""+t.key),t)k.call(t,o)&&!S.hasOwnProperty(o)&&(c[o]=t[o]);var l=arguments.length-2;if(1===l)c.children=r;else if(1<l){for(var s=Array(l),u=0;u<l;u++)s[u]=arguments[u+2];c.children=s}if(e&&e.defaultProps)for(o in l=e.defaultProps)void 0===c[o]&&(c[o]=l[o]);return{$$typeof:n,type:e,key:a,ref:i,props:c,_owner:x.current}}function R(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var $=/\/+/g;function P(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function z(e,t,o,c,a){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var l=!1;if(null===e)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case r:l=!0}}if(l)return a=a(l=e),e=""===c?"."+P(l,0):c,w(a)?(o="",null!=e&&(o=e.replace($,"$&/")+"/"),z(a,t,o,"",(function(e){return e}))):null!=a&&(R(a)&&(a=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,o+(!a.key||l&&l.key===a.key?"":(""+a.key).replace($,"$&/")+"/")+e)),t.push(a)),1;if(l=0,c=""===c?".":c+":",w(e))for(var s=0;s<e.length;s++){var u=c+P(i=e[s],s);l+=z(i,t,o,u,a)}else if(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=_&&e[_]||e["@@iterator"])?e:null}(e),"function"==typeof u)for(e=u.call(e),s=0;!(i=e.next()).done;)l+=z(i=i.value,t,o,u=c+P(i,s++),a);else if("object"===i)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function C(e,t,n){if(null==e)return e;var r=[],o=0;return z(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function j(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var I={current:null},O={transition:null},T={ReactCurrentDispatcher:I,ReactCurrentBatchConfig:O,ReactCurrentOwner:x};t.Children={map:C,forEach:function(e,t,n){C(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return C(e,(function(){t++})),t},toArray:function(e){return C(e,(function(e){return e}))||[]},only:function(e){if(!R(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=v,t.Fragment=o,t.Profiler=a,t.PureComponent=g,t.StrictMode=c,t.Suspense=u,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T,t.cloneElement=function(e,t,r){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=m({},e.props),c=e.key,a=e.ref,i=e._owner;if(null!=t){if(void 0!==t.ref&&(a=t.ref,i=x.current),void 0!==t.key&&(c=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)k.call(t,s)&&!S.hasOwnProperty(s)&&(o[s]=void 0===t[s]&&void 0!==l?l[s]:t[s])}var s=arguments.length-2;if(1===s)o.children=r;else if(1<s){l=Array(s);for(var u=0;u<s;u++)l[u]=arguments[u+2];o.children=l}return{$$typeof:n,type:e.type,key:c,ref:a,props:o,_owner:i}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=E,t.createFactory=function(e){var t=E.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:s,render:e}},t.isValidElement=R,t.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:j}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=O.transition;O.transition={};try{e()}finally{O.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return I.current.useCallback(e,t)},t.useContext=function(e){return I.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return I.current.useDeferredValue(e)},t.useEffect=function(e,t){return I.current.useEffect(e,t)},t.useId=function(){return I.current.useId()},t.useImperativeHandle=function(e,t,n){return I.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return I.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return I.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return I.current.useMemo(e,t)},t.useReducer=function(e,t,n){return I.current.useReducer(e,t,n)},t.useRef=function(e){return I.current.useRef(e)},t.useState=function(e){return I.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return I.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return I.current.useTransition()},t.version="18.2.0"},294:(e,t,n)=>{e.exports=n(408)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,n),c.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{n.r(r),n.d(r,{CompareView:()=>$});var e,t,o=n(294);function c(e){var t,n;let r=null===(t=e[0])||void 0===t?void 0:t.element.width,o=null===(n=e[0])||void 0===n?void 0:n.element.height;for(let t of e)t.element.width==r&&t.element.height==o||console.log("Warning: images don't have the same resolution"),r=Math.max(r,t.element.width),o=Math.max(o,t.element.height);return[r,o]}function a(e){return e.images.unshift(e.images.pop()),!0}function i(t){var n;if(null!=t.ctrl_data)switch((n=t.ctrl_data).circle_check.checked=!1,n.horizontal_check.checked=!1,n.vertical_check.checked=!1,t.current_mode){case e.circle:t.ctrl_data.circle_check.checked=!0;break;case e.horizontal:t.ctrl_data.horizontal_check.checked=!0;break;case e.vertical:t.ctrl_data.vertical_check.checked=!0;break;default:throw`unsupported mode: ${t.current_mode}`}}function l(e,n){return r=>{r.target.checked?(e.next_mode=n,x(e,t.change_mode)):i(e)}}function s(e,t){let n=e.canvas.getBoundingClientRect(),r=e.width/n.width,o=e.height/n.height;e.mouse_pos=[(t.clientX-n.left)*r,(t.clientY-n.top)*o]}function u(e){return e.render_circle=!0,e.canvas.style.cursor="none",!1}function d(e){return k(e,t.update_circle),e.canvas.style.cursor="default",!0}function f(e,t,n){e.ctx.beginPath(),e.ctx.arc(e.mouse_pos[0],e.mouse_pos[1],e.circle_size,t,n),n-t!=2*Math.PI&&e.ctx.lineTo(e.mouse_pos[0],e.mouse_pos[1]),e.ctx.closePath()}function _(e,t,n,r){var o;f(e,n,r),e.ctx.save(),e.ctx.clip(),e.ctx.drawImage(null===(o=e.images[t])||void 0===o?void 0:o.element,0,0,e.width,e.height),e.ctx.restore(),e.show_circle&&(f(e,n,r),e.ctx.strokeStyle="black",e.ctx.lineWidth=e.circumference_thickness,e.ctx.stroke())}function h(n,r){return x(n,t.update_slider),n.start_timestamp=r,n.start_pos=n.slider_pos,n.current_mode==e.horizontal?n.target_pos=n.mouse_pos[0]/n.width:n.target_pos=n.mouse_pos[1]/n.height,!0}function m(t,n){return t.held_down&&(t.current_mode==e.horizontal?t.target_pos=t.mouse_pos[0]/t.width:t.target_pos=t.mouse_pos[1]/t.height,t.start_pos=t.target_pos,t.slider_pos=t.target_pos),!0}function p(e,t){let n=(t-e.start_timestamp)/e.slider_time;return n=Math.min(Math.max(n,0),1),n=e.rate_function(n),e.slider_pos=(1-n)*e.start_pos+n*e.target_pos,e.slider_pos==e.target_pos}function v(n){switch(n.current_mode){case e.undefined:break;case e.circle:!function(e){e.canvas.onmousemove=null,e.canvas.onmouseleave=null,e.canvas.ontouchstart=null,e.canvas.onmousedown=null,e.canvas.onfocus=null,e.canvas.onblur=null,e.canvas.style.cursor="default",document.body.style.userSelect="text",e.touching=!1,x(e,t.remove_circle)}(n);break;case e.horizontal:case e.vertical:!function(e){e.canvas.onmousedown=null,e.canvas.onmouseup=null,document.onmouseup=null,e.canvas.onmouseup=null,e.canvas.onmousemove=null,e.canvas.onmouseenter=null,e.canvas.onmouseleave=null,e.canvas.onfocus=null,e.canvas.onblur=null,e.held_down=!1,e.canvas.style.cursor="default",document.body.style.userSelect="text"}(n);break;default:throw`unsupported mode: ${n.current_mode}`}}function y(n){switch(n.current_mode=n.next_mode,n.next_mode){case e.circle:!function(e){e.canvas.onmousemove=n=>{s(e,n),x(e,t.update_circle)},e.canvas.onmouseleave=()=>{x(e,t.remove_circle)},e.revolve_imgs_on_click&&(e.canvas.ontouchstart=()=>{e.touching=!0},e.canvas.onmousedown=()=>{e.touching||x(e,t.revolve_imgs)}),e.canvas.matches(":hover")&&x(e,t.update_circle),e.canvas.onfocus=()=>{document.body.style.userSelect="none"},e.canvas.onblur=()=>{document.body.style.userSelect="text",e.touching=!1}}(n);break;case e.horizontal:case e.vertical:!function(n){n.canvas.onmousedown=()=>{n.held_down=!0,x(n,t.start_slider_move)},n.canvas.onmouseup=()=>{n.held_down=!1},document.onmouseup=()=>{n.held_down=!1},n.canvas.onmousemove=e=>{s(n,e),x(n,t.possible_instant_slide)},n.current_mode==e.horizontal?n.canvas.onmouseenter=()=>{n.canvas.style.cursor="ew-resize"}:n.canvas.onmouseenter=()=>{n.canvas.style.cursor="ns-resize"},n.canvas.onmouseleave=()=>{n.canvas.style.cursor="default"},n.canvas.onfocus=()=>{document.body.style.userSelect="none"},n.canvas.onblur=()=>{document.body.style.userSelect="text"}}(n);break;default:throw`unsupported mode: ${n.current_mode}`}i(n)}function g(e){return v(e),y(e),!0}function b(n,r){!function(e,n){let r=[];for(;e.task_stack.length;){let o,c=e.task_stack.pop();switch(c){case t.none:o=!0;break;case t.change_mode:o=g(e);break;case t.revolve_imgs:o=a(e);break;case t.update_circle:o=u(e);break;case t.remove_circle:o=d(e);break;case t.start_slider_move:o=h(e,n);break;case t.possible_instant_slide:o=m(e);break;case t.update_slider:o=p(e,n);break;default:throw`unknown task: ${c}`}o||r.push(c)}e.task_stack=r}(n,r),function(t){switch(t.current_mode){case e.circle:!function(e){var t;if(e.render_circle){e.ctx.clearRect(0,0,e.width,e.height),function(e){var t;e.ctx.beginPath(),e.ctx.arc(e.mouse_pos[0],e.mouse_pos[1],e.circle_size-1,0,2*Math.PI),e.ctx.lineTo(e.width,0),e.ctx.lineTo(0,0),e.ctx.lineTo(0,e.height),e.ctx.lineTo(e.width,e.height),e.ctx.lineTo(e.width,0),e.ctx.closePath(),e.ctx.save(),e.ctx.clip(),e.ctx.drawImage(null===(t=e.images[0])||void 0===t?void 0:t.element,0,0,e.width,e.height),e.ctx.restore()}(e);for(let t=1;t<e.images_len;++t)_(e,t,(t-1)*Math.PI*2/(e.images_len-1),t*Math.PI*2/(e.images_len-1))}else e.ctx.clearRect(0,0,e.width,e.height),e.ctx.drawImage(null===(t=e.images[0])||void 0===t?void 0:t.element,0,0,e.width,e.height);e.render_circle=!1}(t);break;case e.horizontal:case e.vertical:!function(t){var n;t.ctx.clearRect(0,0,t.width,t.height),t.ctx.drawImage(null===(n=t.images[0])||void 0===n?void 0:n.element,0,0,t.width,t.height),t.show_slider&&function(t){t.ctx.beginPath(),t.current_mode==e.horizontal?(t.ctx.moveTo(t.slider_pos*t.width,0),t.ctx.lineTo(t.slider_pos*t.width,t.height)):(t.ctx.moveTo(0,t.slider_pos*t.height),t.ctx.lineTo(t.width,t.slider_pos*t.height)),t.ctx.closePath(),t.ctx.strokeStyle="black",t.ctx.lineWidth=t.slider_thickness,t.ctx.stroke()}(t),function(t){var n;t.ctx.beginPath(),t.current_mode==e.horizontal?t.ctx.rect(t.slider_pos*t.width,0,t.width,t.height):t.ctx.rect(0,t.slider_pos*t.height,t.width,t.height),t.ctx.closePath(),t.ctx.save(),t.ctx.clip(),t.ctx.clearRect(0,0,t.width,t.height),t.ctx.drawImage(null===(n=t.images[1])||void 0===n?void 0:n.element,0,0,t.width,t.height),t.ctx.restore()}(t)}(t);break;default:throw`unsupported mode: ${t.current_mode}`}}(n),n.task_stack.length?w(n):n.next_update_queued=!1}function w(e){e.next_update_queued=!0,window.requestAnimationFrame((t=>{b(e,t)}))}function k(e,t){let n=e.task_stack.indexOf(t);-1!=n&&e.task_stack.splice(n,1)}function x(e,t){k(e,t),e.task_stack.push(t),function(e){e.next_update_queued||w(e)}(e)}!function(e){e[void 0]="undefined",e.horizontal="horizontal",e.vertical="vertical",e.circle="circle"}(e||(e={})),function(e){e[e.none=0]="none",e[e.revolve_imgs=1]="revolve_imgs",e[e.change_mode=2]="change_mode",e[e.update_circle=3]="update_circle",e[e.remove_circle=4]="remove_circle",e[e.start_slider_move=5]="start_slider_move",e[e.possible_instant_slide=6]="possible_instant_slide",e[e.update_slider=7]="update_slider"}(t||(t={}));const S={start_mode:e.circle,circumference_fraction:.005,circle_size:void 0,circle_fraction:.2,show_circle:!0,revolve_imgs_on_click:!0,slider_fraction:.01,slider_time:400,rate_function:function(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2},start_slider_pos:.5,show_slider:!0};function E(e,t){return null!=e[t]?e[t]:S[t]}function R(n,r,o={},a){!function(e){if("y"===e.dataset.in_use)throw`the canvas with the id '${e.id}' is already in use`;e.dataset.in_use="y"}(r.canvas),function(e,t){if(e.length<2)throw`image_urls must contain at least two images, not ${e.length}`;let n=[],r=0,o=e.length;for(let a=0;a<o;++a){let i={url:e[a],element:document.createElement("img"),label:`${a}`};n.push(i),i.element.onload=()=>{++r,r==o&&t(n,c(n))},i.element.src=i.url}}(n,((n,c)=>{let i={images:n,images_len:n.length,canvas:r.canvas,ctx:r,width:0,height:0,ctrl_data:void 0,mouse_pos:[0,0],held_down:!1,next_mode:E(o,"start_mode"),current_mode:e.undefined,task_stack:[],next_update_queued:!1,circumference_thickness:0,render_circle:!1,circle_size:0,show_circle:E(o,"show_circle"),revolve_imgs_on_click:E(o,"revolve_imgs_on_click"),touching:!1,slider_thickness:0,slider_pos:E(o,"start_slider_pos"),slider_time:E(o,"slider_time"),rate_function:E(o,"rate_function"),show_slider:E(o,"show_slider"),start_timestamp:0,start_pos:0,target_pos:0};(function(e,t,n){e.canvas.width=t[0],e.canvas.height=t[1],e.width=e.canvas.width,e.height=e.canvas.height,function(e,t){let n=Math.max(e.canvas.width,e.canvas.height);e.circumference_thickness=n*E(t,"circumference_fraction"),e.circle_size=null!=t.circle_size?t.circle_size:n*E(t,"circle_fraction"),e.slider_thickness=n*E(t,"slider_fraction")}(e,n)})(i,c,o),null!=a&&a(i),x(i,t.change_mode)}))}const $=n=>{let r=o.createRef(),c=o.createRef(),a=o.createRef(),i=o.createRef(),s=o.createRef();return(0,o.useEffect)((()=>{var o;let u=null===(o=r.current)||void 0===o?void 0:o.getContext("2d");R(n.image_urls,u,n.config,(r=>{var o;null!=n.config&&(null===(o=n.config)||void 0===o?void 0:o.create_controls)&&function(n,r){n.ctrl_data=r,r.circle_check.onclick=l(n,e.circle),r.horizontal_check.onclick=l(n,e.horizontal),r.vertical_check.onclick=l(n,e.vertical),r.revolve_imgs_button.onclick=()=>{x(n,t.revolve_imgs)}}(r,{circle_check:c.current,horizontal_check:a.current,vertical_check:i.current,revolve_imgs_button:s.current})}))}),[]),o.createElement("div",{style:{display:"flex",flexDirection:"row",width:"100%"}},o.createElement("div",null,o.createElement("canvas",{style:{width:"100%"},ref:r,tabIndex:1})),null!=n.config&&n.config.create_controls?o.createElement("div",{style:{width:"200px"}},o.createElement("label",null,o.createElement("input",{ref:c,type:"checkbox"}),"Circle"),o.createElement("br",null),o.createElement("label",null,o.createElement("input",{ref:a,type:"checkbox"}),"Horizontal"),o.createElement("br",null),o.createElement("label",null,o.createElement("input",{ref:i,type:"checkbox"}),"Vertical"),o.createElement("br",null),o.createElement("button",{ref:s},"Revolve Images")):void 0)}})(),exports.CompareView=r.CompareView,Object.defineProperty(exports,"__esModule",{value:!0})})();