(()=>{"use strict";const e={0:["on","on","off","off","off","on","on","on","on"],1:["off","off","off","off","off","off","on","on","off"],2:["on","off","on-center","on","on","on","on","off","on"],3:["on","off","on-center","on","on","off","on","on","on"],4:["off","on","on-center","on","on","off","on","on","off"],5:["on","on","on-center","on","on","off","off","on","on"],6:["on","on","on-center","on","on","on","off","on","on"],7:["on","off","off","off","off","off","on","on","off"],8:["on","on","on-center","on","on","on","on","on","on"],9:["on","on","on-center","on","on","off","on","on","on"]},o=['<div class="position-with-border top"></div>','<div class="position-with-border left-led-first"></div>','<div class="center-led "><div class="center ">','<div class="arrow-right"></div>','<div class="arrow-left"></div></div></div>','<div class="position-with-border left-led-second"></div>','<div class="position-with-border right-led-first"></div>','<div class="position-with-border right-led-second"></div>','<div class="position-with-border bottom"></div>'];let t,n=!1,s=!1;const r=(t,n)=>{const r=(e=>{let o=[];for(;e>0;)o.unshift(e%10),e=Math.floor(e/10);return o})(s||t);let i=((e,o)=>{let t={};return s?(t.alertMessage="ERRO",t.classNameAlert="erro",t.classNameLeds="erro-leds"):e>o?(t.alertMessage="É menor",t.classNameAlert="alert",t.classNameLeds="empty"):e<o?(t.alertMessage="É maior",t.classNameAlert="alert",t.classNameLeds="empty"):(t.alertMessage="Você acertou!!!!",t.classNameAlert="accept",t.classNameLeds="accept-leds"),t})(t,n);(t=>{let n=document.querySelector(".panel");n.innerHTML="";for(let s=0;s<t.length;s++){let r='<div class="main unit ">';o.forEach(((o,n)=>{let i=o.split(">");2===n?(i[1]=`${i[1].replace('"','"'+e[t[s]][n]+" ")}"`,o=i.join(">")):(i[0]=i[0].split(">")[0].replace('"','"'+e[t[s]][n]+" "),o=i.join(">")),r+=o})),r+="</div",n.innerHTML+=r}})(r),(({alertMessage:e,classNameAlert:o,classNameLeds:t})=>{let n=document.querySelector(".notification");var s;n.classList.add(o),n.innerHTML=e,"Você acertou!!!!"!==e&&"ERRO"!==e||(s=t,document.querySelectorAll(".on-center").forEach((e=>{e.classList.remove("on-center"),e.classList.add(`${s}-on-center`)})),document.querySelectorAll(".on").forEach((e=>{e.classList.remove("on"),e.classList.add(s)})),document.querySelector(".restart").classList.remove("none"),document.querySelector(".input").classList.add("disable-input"),document.querySelector(".submit").classList.add("disable-button"))})(i)},i=()=>{axios.get("https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300").then((e=>{t=e.data.value})).catch((e=>{s=e?.response?.data?.StatusCode}))};i(),document.querySelector(".submit").addEventListener("click",(e=>{e.preventDefault();let o=document.querySelector(".input"),s=parseInt(o.value,10);o.value="",n&&r(s,t)}),!1),document.querySelector(".restart").addEventListener("click",(()=>{document.querySelector(".restart").classList.add("none"),document.querySelector(".input").classList.remove("disable-input"),document.querySelector(".submit").classList.remove("disable-button");let e=document.querySelector(".notification");e.classList.remove("erro"),e.classList.remove("alert"),e.classList.remove("accept"),e.innerHTML="",s=!1,document.querySelector(".panel").innerHTML='\n  <div class="main unit">\n      <div class="position-with-border top on"></div>\n      <div class="position-with-border left-led-first on"></div>\n      <div class="center-led "><div class="center">\n          <div class="arrow-right"></div>\n          <div class="arrow-left"></div>\n      </div></div>\n      <div class="position-with-border left-led-second on"></div>\n      <div class="position-with-border right-led-first on"></div>\n      <div class="position-with-border right-led-second on"></div>\n      <div class="position-with-border bottom on"></div>\n  </div>',i()}),!1),document.querySelector(".input").addEventListener("keyup",(e=>{let{value:o}=e.target;o=parseInt(o,10);let t=document.querySelector(".erro-info");if(o<=0||o>300||!/^[0-9]+$/.test(o))return t.innerHTML="O número deve estar entre 0 e 300",void(n=!1);t.innerHTML="",n=!0}),!1)})();