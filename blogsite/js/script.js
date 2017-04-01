/**
 * Created by hxsd on 2017/3/31.
 */
$(document).ready(function (e) {
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
    let startY = 0;
    function onDown(e) {
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
    function onUp(e) { //移除监听
        document.removeEventListener('mousemove',onMove);
        document.removeEventListener('mouseup',onUp);
    }

//    滚动条结束


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