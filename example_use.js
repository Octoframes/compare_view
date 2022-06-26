(()=>{"use strict";var e,t;function c(e){return e.render_circle=!0,!0}function n(e){return r(e,t.update_circle),!0}function a(c){switch(c.current_mode){case e.undefined:break;case e.circle:!function(e){e.canvas.onmousemove=null,e.canvas.onmouseleave=null,i(e,t.remove_circle)}(c);break;default:throw`unsupported mode: ${c.current_mode}`}if(c.next_mode!==e.circle)throw`unsupported mode: ${c.current_mode}`;return function(e){e.canvas.onmouseenter=()=>{document.documentElement.style.cursor="none"},e.canvas.onmousemove=c=>{e.circle_pos=[c.offsetX,c.offsetY],i(e,t.update_circle)},e.canvas.onmouseleave=()=>{document.documentElement.style.cursor="default",i(e,t.remove_circle)}}(c),c.current_mode=c.next_mode,!0}function o(e,r){let i=[];for(;e.task_stack.length;){let o,r=e.task_stack.pop();switch(r){case t.none:o=!0;break;case t.change_mode:o=a(e);break;case t.update_circle:o=c(e);break;case t.remove_circle:o=n(e);break;default:throw`unknown task: ${r}`}o||i.push(r)}e.task_stack=i,function(e,t){console.log("render"),e.ctx.clearRect(0,0,e.width,e.height),e.ctx.drawImage(e.images[0],0,0,e.width,e.height),e.render_circle&&(e.ctx.beginPath(),e.ctx.arc(e.circle_pos[0],e.circle_pos[1],e.circle_size,0,2*Math.PI),e.ctx.closePath()),e.ctx.save(),e.ctx.clip(),e.ctx.drawImage(e.images[1],0,0,e.width,e.height),e.ctx.restore()}(e),e.task_stack.length?(window.requestAnimationFrame((t=>{o(e)})),e.next_update_queued=!0):e.next_update_queued=!1}function r(e,t){let c=e.task_stack.indexOf(t);-1!=c&&e.task_stack.splice(c,1)}function i(e,t){r(e,t),e.task_stack.push(t),function(e){e.next_update_queued||(e.next_update_queued=!0,o(e))}(e)}!function(e){e[void 0]="undefined",e.vertical="vertical",e.horizontal="horizontal",e.circle="circle"}(e||(e={})),function(e){e.none="none",e.change_mode="change_mode",e.update_circle="update_circle",e.remove_circle="stop_update_circle"}(t||(t={})),function(c,n,a){let o=function(e){let t=document.getElementById("canvas"),c=t.getContext("2d");return t.width=t.scrollWidth,t.height=t.scrollHeight,c}();!function(e,t){if(2!=e.length)throw`image_urls must contain exactly two images, not ${e.length}`;let c=e.map((()=>document.createElement("img"))),n=0;for(let a=0;a<c.length;++a){let o=c[a],r=e[a];o.onload=()=>{++n,n==c.length&&t(c)},o.src=r}}(a,(c=>{i({image_urls:a,images:c,canvas:o.canvas,ctx:o,width:o.canvas.width,height:o.canvas.height,next_mode:n,current_mode:e.undefined,task_stack:[],next_update_queued:!1,render_circle:!1,circle_pos:[0,0],circle_size:200},t.change_mode)}))}(0,e.circle,["https://cdn.discordapp.com/attachments/891753753336741938/990587607647928350/bar.png","https://cdn.discordapp.com/attachments/891753753336741938/990587644708798535/foo.png"])})();