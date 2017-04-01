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

    scroll.addEventListener('mousedown',onDown);
    let startY = 0;
    function onDown(e) {
        startY = e.offsetY;
        document.addEventListener('mousemove',onMove);
        document.addEventListener('mouseup',onUp);
    }
    function onMove(e) {
        if ((e.clientY - startY -226)<0){
            scroll.style.top = 0;
            con.style.top = 0;
        }else if ((e.clientY - startY -226)>215){
            scroll.style.top = '215px';
            con.style.top = -(con.offsetHeight - bigBox.offsetHeight)/(bigBox.offsetHeight - scroll.offsetHeight)*215+'px';
        }else {
            scroll.style.top = e.clientY - startY -226 +'px';
            con.style.top = -(con.offsetHeight - bigBox.offsetHeight)/(bigBox.offsetHeight - scroll.offsetHeight)*(e.clientY - startY -226)+'px';
        }
    }
    function onUp(e) {
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