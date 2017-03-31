/**
 * Created by hxsd on 2017/3/31.
 */
$(document).ready(function () {
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








});