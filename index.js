(()=>{"use strict";function e(e,t,a){e.drawImage(t,0,0),e.beginPath(),e.arc(500,400,500,0,2*Math.PI),e.clip(),e.drawImage(a,0,0)}!function(t){const a=document.getElementById("canvas").getContext("2d");let c=document.createElement("img"),n=document.createElement("img"),o=!1,l=!1;c.onload=()=>{o=!0,l&&e(a,c,n)},n.onload=()=>{l=!0,o&&e(a,c,n)},c.src=t[0],n.src=t[1]}(["https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F90000%2Fvelka%2Fblue-sunset-wallpaper.jpg&f=1&nofb=1","https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc4.wallpaperflare.com%2Fwallpaper%2F611%2F595%2F814%2Fabstract-3d-neon-glow-wallpaper-99e0c8adb1aaed4bb6a7a83f805186fd.jpg&f=1&nofb=1"])})();