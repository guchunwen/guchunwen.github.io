/**
 * Created by hxsd on 2017/3/31.
 */

$(document).ready(function (e) {
    $(function () {
        $("img").lazyload({effect: "fadeIn"});
    });

// //禁用右键
//     function Click(){
//
//         alert('excuse me???');
//
//         window.event.returnValue=false;
//
//     }
//
//     document.oncontextmenu=Click;


    //内容区域点击效果
    let num = true;
    $('.main .list li').click(function () {
        let n = $(this).index();
        if(num) {
            $('.main .list li').css({'z-index': '1'}).stop(true,true).animate({'left': '0'}, 300);
            $(this).css({'z-index': '5'});
            $('.main .content_common').eq(n).stop(true,true).delay(300).animate({'width':'640px'},300).find('.close').delay(300).animate({'opacity':'1'},300);
        }else {
            $('.main .content_common').stop(true,true).animate({'width':'0'},200).find('.close').animate({'opacity':'0'},200);
            for(let i =0;i<4;i++) {
                $('.main .list li').eq(i).stop(true,true).delay(300).animate({'left': 220*i}, 300);
            }
        }
        num = !num;
    });


    $('.main .content_common a.close').click(function () {
        $('.main .content_common').stop(true,true).animate({'width':'0'},200).find('.close').animate({'opacity':'0'},200);
        for(let i =0;i<4;i++) {
            $('.main .list li').eq(i).stop(true,true).delay(300).animate({'left': 220*i}, 300);
        }
        num = !num;
    });

//   内容点击区域结束


//    自制滚动条,js原生
    let scroll = document.querySelector('.main .content .scroll');
    let con = document.querySelector('.main .content_long');
    let bigBox = document.querySelector('.main .content');

    scroll.addEventListener('mousedown',onDown); //滚动条监听鼠标按下
    con.addEventListener('mousewheel',onWheel);//内容区域监听滚轮事件
    let startY = 0;
    function onDown(e) {
        scroll.style.background = '#e0e0e0';
        startY = e.offsetY; //鼠标按下事件触发，鼠标按下位置到当前元素上端的Y坐标
        document.addEventListener('mousemove',onMove);//监听鼠标移动
        document.addEventListener('mouseup',onUp);//监听鼠标抬起
    }
    function onMove(e) {
        if ((e.clientY - startY -226)<0){ //限制滚动条移动区域
            scroll.style.top = 0;
            con.style.top = 0;
        }else if ((e.clientY - startY -226)>215){//限制滚动条移动区域
            scroll.style.top = '215px';
            con.style.top = -(con.offsetHeight - bigBox.offsetHeight)/(bigBox.offsetHeight - scroll.offsetHeight)*215+'px';
        }else {
            scroll.style.top = e.clientY - startY -226 +'px';//鼠标到浏览器上端的距离 - 鼠标按下时到当前元素上端的距离 - 滚动条上端到浏览器上端的距离 == 滚动条滚动的距离
            con.style.top = -(con.offsetHeight - bigBox.offsetHeight)/(bigBox.offsetHeight - scroll.offsetHeight)*(e.clientY - startY -226)+'px';
            //计算原理：先求出滚动条每滚动一像素，相应的内容区域移动多少像素，再乘以滚动条滚动距离
                        //用内容区域可滚动的范围 除以  滚动条滚动的范围
        }
    }

    //滚轮事件
    function onWheel(e) {
        // console.log(e.wheelDelta);
        let wheel = parseInt(scroll.style.top) || 0;//绑定鼠标滑动滚动条后，滚动条位置
        wheel += -(bigBox.offsetHeight - scroll.offsetHeight)/e.wheelDelta*20;//计算滚动条，根据滚轮滑动一次的距离，计算控制滚轮每次滑动 ，滚动条滑动20,每次20叠加给wheel
        console.log(wheel);
        if (wheel < 0){//控制滚轮滑动后，滚动条的上限和下限
            wheel = 0;
        }else if(wheel >bigBox.offsetHeight - scroll.offsetHeight){
            wheel = 215;
        }
        scroll.style.top = wheel +'px';

        con.style.top = -(con.offsetHeight - bigBox.offsetHeight)/(bigBox.offsetHeight - scroll.offsetHeight)*wheel+'px';
    //    此处同理鼠标点击滚动条
    }

    function onUp(e) { //移除监听
        scroll.style.background = '#343434';
        document.removeEventListener('mousemove',onMove);
        document.removeEventListener('mouseup',onUp);
    }

//    滚动条结束


//    项目以及作品展示
    let imgCon = $('.main .content_yellow .big_show img');
    $('.main .content_yellow ul.proList li a').click(function () {
        imgCon.css({'z-index':'20'});
        imgCon.eq(0).css({'z-index':'21'});

        let par = $(this).parent();
        let i = par.index();
        $('.main .content_yellow .big_show').eq(i).fadeIn();
    });

    $('.main .content_yellow .big_show a.pro_close').click(function () {
        $('.main .content_yellow .big_show').fadeOut();
    });


    let imgNum = 0;
    // console.log($('.main .content_yellow .big_show img'));
    $('.main .content_yellow .big_show a.prev').click(function () {
        imgCon.css({'z-index':'20'});
        imgNum++;
        if (imgNum == imgCon.length){
            imgNum = 0;
        }
        imgCon.eq(imgNum).css({'z-index':'21'});

    });

    $('.main .content_yellow .big_show a.next').click(function () {
        imgCon.css({'z-index':'20'});
        imgNum--;
        if (imgNum == -1){
            imgNum = imgCon.length-1;
        }
        imgCon.eq(imgNum).css({'z-index':'21'});
    });

//footer 二维码
    //sina
    $('.footer .inner li.sina a').click(function () {
        $('.footer .inner li.sina .pic_two').fadeIn(800);
    });
    $('.footer .inner li.sina a').mouseleave(function () {
        $('.footer .inner li.sina .pic_two').fadeOut();
    });

    //weChat
    $('.footer .inner li.weChat a').click(function () {
        $('.footer .inner li.weChat .pic_two').fadeIn(800);
    });
    $('.footer .inner li.weChat a').mouseleave(function () {
        $('.footer .inner li.weChat .pic_two').fadeOut();
    })


});