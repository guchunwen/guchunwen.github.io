/**
 * Created by hxsd on 2017/3/31.
 */

$(document).ready(function (e) {
    // $(function () {
    //     $("img").lazyload({effect: "fadeIn"});
    // });

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
    var num = true;
    $('.main .list li').click(function () {
        //点击音效
        if (document.createElement('audio').canPlayType){
            $('audio').remove();
            $('body').append('<audio autoplay="autoplay"><source src="http://images.chavesgu.com/content_open.ogg" type="audio/ogg"><source src="http://images.chavesgu.com/content_open.mp3" type="audio/mpeg"></audio>');
        }else {
            $('embed').remove();
            $('body').append('<embed src="http://images.chavesgu.com/content_open.mp3" autoplay="true" loop="false" hidden="true">');
        }
        var n = $(this).index();
        if(num) {
            $('.main .list li').css({'z-index': '1'}).stop(true,true).animate({'left': '0'},300);
            $(this).css({'z-index': '5'});
            $('.main .content_common').eq(n).stop(true,true).delay(300).animate({'width':'640px'},300,'easeOutBounce').find('.close').delay(300).animate({'opacity':'1'},300);
        }else {
            $('.main .content_common').stop(true,true).animate({'width':'0'},200).find('.close').animate({'opacity':'0'},200);
            for(var i =0;i<4;i++) {
                $('.main .list li').eq(i).stop(true,true).delay(300).animate({'left': 220*i}, 300);
            }
            $('.main .content_yellow .big_show').css({'display':'none'});
        }
        num = !num;
    });


    $('.main .content_common a.close').click(function () {
        $('.main .content_common').stop(true,true).animate({'width':'0'},200).find('.close').animate({'opacity':'0'},200);
        for(var i =0;i<4;i++) {
            $('.main .list li').eq(i).stop(true,true).delay(300).animate({'left': 220*i}, 300);
        }
        $('.main .content_yellow .big_show').css({'display':'none'});
        num = !num;
    });

//   内容点击区域结束


//    自制滚动条,js原生
    var greenScroll = document.querySelector('.main .content_green .scroll');
    var greenCon = document.querySelector('.main .content_green .content_long');
    var greenBigBox = document.querySelector('.main .content_green .content');
    var yellowScroll = document.querySelector('.main .content_yellow .scroll');
    var yellowCon = document.querySelector('.main .content_yellow .content_long');
    var yellowBigBox = document.querySelector('.main .content_yellow .content');
    scrollInit(greenBigBox,greenCon,greenScroll);
    scrollInit(yellowBigBox,yellowCon,yellowScroll);
    function scrollInit(bigBox,con,scroll) {
        if (con.offsetHeight>bigBox.offsetHeight){
            scroll.style.display = 'block';
            scroll.style.height = bigBox.offsetHeight/con.offsetHeight*bigBox.offsetHeight + 'px';
        }else {
            scroll.style.display = 'none';
        }
        scroll.addEventListener('mousedown',onDown); //滚动条监听鼠标按下
        con.addEventListener('mousewheel',onWheel);//内容区域监听滚轮事件
        con.addEventListener('DOMMouseScroll',onWheel);//兼容火狐
        var startY = 0;
        function onDown(e) {
            scroll.style.background = '#e0e0e0';
            startY = e.offsetY; //鼠标按下事件触发，鼠标按下位置到当前元素上端的Y坐标
            document.addEventListener('mousemove',onMove);//监听鼠标移动
            document.addEventListener('mouseup',onUp);//监听鼠标抬起
            e.preventDefault();
        }
        function onMove(e) {
            if ((e.clientY - startY -bigBox.getBoundingClientRect().top)<0){ //限制滚动条移动区域
                scroll.style.top = 0;
                con.style.top = 0;
            }else if ((e.clientY - startY -bigBox.getBoundingClientRect().top)>bigBox.offsetHeight-scroll.offsetHeight){//限制滚动条移动区域
                scroll.style.top = bigBox.offsetHeight - scroll.offsetHeight+'px';
                con.style.top = -(con.offsetHeight - bigBox.offsetHeight)+'px';
            }else {
                scroll.style.top = e.clientY - startY -bigBox.getBoundingClientRect().top +'px';//鼠标到浏览器上端的距离 - 鼠标按下时到当前元素上端的距离 - 滚动条上端到浏览器上端的距离 == 滚动条滚动的距离
                con.style.top = -(con.offsetHeight - bigBox.offsetHeight)/(bigBox.offsetHeight - scroll.offsetHeight)*(e.clientY - startY -bigBox.getBoundingClientRect().top)+'px';
                //计算原理：先求出滚动条每滚动一像素，相应的内容区域移动多少像素，再乘以滚动条滚动距离
                //用内容区域可滚动的范围 除以  滚动条滚动的范围
            }
        }

        //滚轮事件
        function onWheel(e) {
            if (!e.wheelDelta)e.wheelDelta = e.detail*-40;//火狐滚动值为3并且反方向
            // console.log(e.wheelDelta);
            var wheel = parseInt(scroll.style.top) || 0;//绑定鼠标滑动滚动条后，滚动条位置
            wheel += -(bigBox.offsetHeight - scroll.offsetHeight)/e.wheelDelta*20;//计算滚动条，根据滚轮滑动一次的距离，计算控制滚轮每次滑动 ，滚动条滑动20,每次20叠加给wheel
            // console.log(wheel);
            if (wheel < 0){//控制滚轮滑动后，滚动条的上限和下限
                wheel = 0;
            }else if(wheel >bigBox.offsetHeight - scroll.offsetHeight){
                wheel = bigBox.offsetHeight - scroll.offsetHeight;
            }
            scroll.style.top = wheel +'px';

            con.style.top = -(con.offsetHeight - bigBox.offsetHeight)/(bigBox.offsetHeight - scroll.offsetHeight)*wheel+'px';
            //    此处同理鼠标点击滚动条
            e.preventDefault();
        }

        function onUp(e) { //移除监听
            scroll.style.background = '#343434';
            document.removeEventListener('mousemove',onMove);
            document.removeEventListener('mouseup',onUp);
        }

//    滚动条结束
    }


//    项目以及作品展示
    var scaleIcon = $('.main .content_yellow ul.proList li a');
    scaleIcon.hide();
    scaleIcon.parent().hover(function () {
        $(this).children('a').stop().fadeIn();
    },function () {
        $(this).children('a').stop().fadeOut();
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