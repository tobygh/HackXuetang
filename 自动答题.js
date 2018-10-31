var pbms=new Array();
function init(){
    var all=document.getElementById('course-content');
    var sec=all.getElementsByClassName('problem');
    for(var sec_id=0;sec_id<sec.length;++sec_id){/*遍历题目集*/
        var hd=sec[sec_id].getElementsByTagName('form');
        for(var i=0;i<hd.length;i++){/*遍历题目*/
            var ap={
                'type': 0,
                'key':  0,
                'sol':  0,
                'pid': hd[i].getAttribute('id')
            };
            var cs=hd[i].getElementsByTagName('input');
            if(cs[0].getAttribute('type')=="checkbox"){ap.type=1;}
            else{ap.type=0;}
            pbms.push(ap);
        }
    }
}

function fill(){
    for(var i=0;i<pbms.length;++i){
        var hd=document.getElementById(pbms[i].pid);
        var cs=hd.getElementsByTagName('input');
        if(pbms[i].type==0){
            var Mclick=document.createEvent("MouseEvents");
            Mclick.initEvent('click',true,true);
            cs[pbms[i].key].dispatchEvent(Mclick);
        }
        else{
            for(var j=0;j<cs.length;++j){
                cs[j].checked=(pbms[i].key&(1<<j))>0;
            } 
        }
    }
}

function check(){
    for(var i=0;i<pbms.length;++i){
        var hd=document.getElementById(pbms[i].pid);
        if(pbms[i].type==0){
            var cs=hd.getElementsByTagName('label');
            if(cs[pbms[i].key].getAttribute('class')=="choicegroup_correct")pbms[i].sol=1;
            else pbms[i].key++;
        }
        else {
            var st=hd.getElementsByClassName('status correct');
            if(st.length>0)pbms[i].sol=1;
            else pbms[i].key++;
        }
    }
}

function submit(){
    var all=document.getElementById('course-content');
    var ob=all.getElementsByClassName('check 提交');
    for(var i=0;i<ob.length;++i){/*所有的提交按钮*/
        var Mclick=document.createEvent("MouseEvents");
        Mclick.initEvent('click',true,true);
        ob[i].dispatchEvent(Mclick);
    }
}

function auto(){
    fill();
    var t=new Date();
    console.log(t.getHours()+':'+t.getMinutes()+" 进行了一次提交");
    setTimeout(submit,1000);
    setTimeout(check,1000);
}

init();
auto();
setInterval(auto,(5*60+5)*1000);
