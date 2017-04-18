/**
 * Created by guchunwen on 2017/4/18  0018.
 */
$(function () {
   //sn
    let sn_key = 0;
    let $li  =$('li');
    let $ul =$li.parent();
    $('.sn .prev').click(function () {
        sn_key--;
        if (sn_key<0){
            sn_key = 2;
            $ul.css({'margin-left':'-300%'});
        }
        let num = -100*sn_key+'%';
        $ul.stop(true,true).animate({'margin-left':num});
    });

    $('.sn .next').click(function () {
        sn_key++;
        if (sn_key>3){
            sn_key = 1;
            $ul.css({'margin-left':'0'});
        }
        let num = -100*sn_key+'%';
        $ul.stop(true,true).animate({'margin-left':num});
    })
});