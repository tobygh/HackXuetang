var oUl=document.getElementsByClassName('xt_video_player_common_list');
var oLi=oUl[0].getElementsByTagName('li');
oLi[0].innerText="10.0x";
oLi[0].setAttribute('data-speed','10');
var e=document.createEvent("MouseEvents");
e.initEvent("click", true, true);
oLi[1].dispatchEvent(e);
oLi[0].dispatchEvent(e);
