var pbms=new Array();/*记录题目已经试到第几种答案或者已经正确*/

/*读取题目的id和类型*/
function init(){
    /*获得答卷*/
    var all=document.getElementById('course-content');
    /*获得题目集*/
    var sec=all.getElementsByClassName('problem');
    /*遍历题目集*/
    for(var sec_id=0;sec_id<sec.length;++sec_id){
        var hd=sec[sec_id].getElementsByTagName('form');
        /*遍历题目*/
        for(var i=0;i<hd.length;i++){
            var ap={
                'type': 0,
                'key':  0,
                'sol':  0,
                'pid': hd[i].getAttribute('id')
            };
            /*读取选项*/
            var cs=hd[i].getElementsByTagName('input');
            /*选项是勾选框，说明是多选题*/
            if(cs[0].getAttribute('type')=="checkbox"){
                ap.type=1;
                ap.key=3;/*多选题应该从AB开始遍历*/
            }
            else{ap.type=0;}
            pbms.push(ap);
        }
    }
}

/*把要尝试的答案填入每个还没作对的题目中*/
function fill(){
    for(var i=0;i<pbms.length;++i){
        /*获取题目*/
        var hd=document.getElementById(pbms[i].pid);
        /*获取选项*/
        var cs=hd.getElementsByTagName('input');
        if(pbms[i].type==0){/*单选题*/
            var Mclick=document.createEvent("MouseEvents");
            Mclick.initEvent('click',true,true);
            /*直接模拟鼠标点击对应的选项*/
            cs[pbms[i].key].dispatchEvent(Mclick);
        }
        else{/*多选题*/
            for(var j=0;j<cs.length;++j){
                /*多选题的key以二进制存放答案，比如0101对应BD*/
                cs[j].checked=(pbms[i].key&(1<<j))>0;
            } 
        }
    }
}

function NumberOfOne(n){
    var cnt=0;
    while(n>0){
        cnt+=(n&1);
        n>>=1;
    }
    return cnt;
}

/*检查当前答案的结果是否为正确，并生成下一个可能的答案*/
function check(){
    for(var i=0;i<pbms.length;++i){
        /*获取题目*/
        var hd=document.getElementById(pbms[i].pid);
        if(pbms[i].type==0){/*单选题*/
            /*检查选项对应的label是否为choicegroup_correct*/
            var cs=hd.getElementsByTagName('label');
            if(cs[pbms[i].key].getAttribute('class')=="choicegroup_correct"){pbms[i].sol=1;}
            else {pbms[i].key++;}
        }
        else {/*多选题*/
            /*检查选项里面有没有status correct的元素*/
            var st=hd.getElementsByClassName('status correct');
            if(st.length>0){pbms[i].sol=1;}
            else {
                /*提高效率，只生成有2个1以上的二进制数*/
                pbms[i].key++;
                while(NumberOfOne(pbms[i].key)<2)pbms[i].key++;
            }
        }
    }
}

/*点击所有提交按钮*/
function submit(){
    var all=document.getElementById('course-content');
    /*获取提交按钮*/
    var ob=all.getElementsByClassName('check 提交');
    for(var i=0;i<ob.length;++i){
        var Mclick=document.createEvent("MouseEvents");
        Mclick.initEvent('click',true,true);
        ob[i].dispatchEvent(Mclick);
    }
}

/*自动重复：填答案-提交-检查 */
function auto(){
    fill();
    var t=new Date();
    console.log(t.getHours()+':'+t.getMinutes()+" 进行了一次提交");
    setTimeout(submit,1000);
    setTimeout(check,2000);
}

init();
auto();
setInterval(auto,(5*60+5)*1000);
