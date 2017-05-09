/**
 * Created by guchunwen on 2017/4/22  0022.
 */
$(function () {
    //日历数据功能
    var noteData = [];
    //日历基础功能
    var $prev = $('a.prev');
    var $next = $('a.next');
    var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var allDayArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var num = 0;
    $prev.click(function () {
        num--;
        createDate(num);
    });
    $next.click(function () {
        num++;
        createDate(num);
    });
    function createDate(mon) {
        $('.dateList').empty();
        var date = new Date();
        var nextDate = new Date();
        date.setMonth(date.getMonth() + mon);
        nextDate.setMonth(nextDate.getMonth() + mon);
        var year = date.getFullYear();
        var today = date.getDate();
        var month = date.getMonth();
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            allDayArr[1] = 29;
        }
        var allDays = allDayArr[month];
        //跳至当月第一天
        date.setDate(1);
        var firstDay = date.getDay();
        //修改week显示格式 周一为第一天，getDay返回值改为1-7
        firstDay = firstDay == 0 ? 7 : firstDay;
        //并且后续使用firstDay作为索引时，要减1
        firstDay = firstDay - 1;
        //跳至上月最后一天
        date.setDate(0);
        $('#week_wrap h4').text(year + '　' + monthArr[month]);

        for (var i = 0; i < firstDay; i++) {
            $('.dateList').append('<td class="lastMon">' + (date.getDate() - (firstDay - i - 1)) + '</td>');
        }
        for (var i = 0; i < allDays; i++) {
            $('.dateList').append('<td>' + (i + 1) + '</td>');
        }
        //跳至下月第一天
        nextDate.setDate(allDays + 1);
        for (var i = 0; i < 42 - allDays - firstDay; i++) {
            $('.dateList').append('<td class="nextMon">' + (nextDate.getDate() + i) + '</td>');
        }
        //遍历所有td，设置好样式
        var $td = $('.tableWrap .dateList td');
        $td.each(function (i) {
            //根据周一为第一天的新格式，修改计算方式
            if (i % 7 == 6 || i % 7 == 5) {
                $td.eq(i).css({'color': '#f00'});
            }
        });
        if (mon == 0) {
            $td.eq(today + firstDay - 1).css({'background': '#f60', 'color': '#fff'}).prevAll().css({'color': '#ccc'});
        } else if (mon < 0) {
            $td.css({'color': '#ccc'});
        }
        $td.eq(firstDay).prevAll().css({'color': '#ccc'});
        $td.eq(firstDay + allDays - 1).nextAll().css({'color': '#ccc'});
        //样式全部设置完，最后为每一行td套一层tr
        $('.dateList').empty();
        for (var i = 0; i < 6; i++) {
            var $tr = $('<tr></tr>');
            for (var j = 0; j < 7; j++) {
                $tr.append($td.eq(j + 7 * i));
            }
            $('.dateList').append($tr);
        }
        for (var j=0;j<noteData.length;j++){
            var obj = noteData[j];
            if ( obj.year==year&&obj.month==(month+1) ){
                console.log(obj.event);
                $td.eq(+obj.day+firstDay-1).addClass('hasNote').data('event',obj.event);
            }
        }
        //添加跳转至today功能
        var todaySel = $('<tr><td class="todaySel" colspan="7" style="color: green">skip　today</td></tr>');
        $('.dateList').append(todaySel);
        todaySel.click(function () {
            if (num!=0){
                createDate(0);
                num = 0;
            }
        });
        //日历基础功能结束-------------------

        //日历记事本功能v1.0 --待完善--------------------------------------------------------
        var $wrap = $('.wrap');
        var $wrapAndWood = $('.wrap,.woodBot');
        $wrapAndWood.stop().animate({'width': '390px'}, 'fast').children('.addNote,a').css({'display': 'none'});//滑入时，隐藏所有内容;
        //选择日期后，弹出记事本
        var $noteBox = $('.addNote');
        //新建记事本内容
        var $conBox = $('.conBox');
        var $con = $('<div class="con"></div>');
        var $scroll = $('<div class="scroll"></div>');
        //日记本内生成时间
        for (var i = 0; i < 24; i++) {
            $('select.hour').append('<option>' + (i < 10 ? '0' + i : i) + '</option>');
        }
        for (var i = 0; i < 60; i += 5) {
            $('select.min').append('<option>' + (i < 10 ? '0' + i : i) + '</option>');
        }
        //选中日期td事件
        $('.dateList td').click(function () {
            //如果是上月的或者下月的，不提供功能----待完善，上月和下月未绑定
            if ($(this).hasClass('lastMon') || $(this).hasClass('nextMon'))return;
            //跳转指today的td不提供功能
            if ($(this).hasClass('todaySel'))return;
            //清空所有内容，重新获取
            $noteBox.empty().append($('<input type="text" placeholder="add some notes"><button type="button" class="addBtn">add</button><select class="hour"></select>&nbsp;:&nbsp;<select class="min"></select><div class="conBox"></div>'));
            var $conBox = $('.conBox');
            //日记本内生成时间
            for (var i = 0; i < 24; i++) {
                $('select.hour').append('<option>' + (i < 10 ? '0' + i : i) + '</option>');
            }
            for (var i = 0; i < 60; i += 5) {
                $('select.min').append('<option>' + (i < 10 ? '0' + i : i) + '</option>');
            }
            //判断当前选中日期是否已经添加过记事本
            if ($(this).hasClass('hasNote')) {
                console.log($(this).data('event'));
                $con = $(this).data('event');
            } else {
                $con = $('<div class="con"></div>');
            }
            $conBox.append($con).append($scroll);
            //删除记事本记事内容事件
            delNote($('.del'));
            //添加checked样式标注选中状态
            $td.removeClass('checked');
            $(this).addClass('checked');
            //记事本滑出动画，默认先滑入
            $wrapAndWood.stop().animate({'width': '390px'}, 'fast', function () {
                //滑出动画，滑入按钮出现，并且内容过渡出现
                $wrapAndWood.stop().animate({'width': '800px'}, 'fast', function () {
                    //滑入按钮出现后，绑定点击事件
                    $wrap.children('.close').fadeIn().click(function () {
                        $wrap.children('.addNote').fadeOut();
                        $(this).fadeOut();
                        $td.removeClass('checked');
                        $wrapAndWood.stop().animate({'width': '390px'}, 'fast');
                    });
                    //滑出动画,内容过渡出现
                    $wrap.children('.addNote').fadeIn();
                });
            }).children('.addNote').css({'display': 'none'});//滑入时，隐藏所有内容
            //滚动条
            //滚动条功能事件
            var startY = 0;
            $scroll.on('mousedown', function (e) {
                console.log('1');
                startY = e.offsetY;
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });
            //滚轮事件
            $conBox.children('.con')[0].addEventListener('mousewheel', function (e) {
                console.log(e.wheelDelta);
                var wheel = parseFloat($scroll.css('margin-top')) || 0;//绑定鼠标移动滚动条后，滚动条位置
                wheel += -($conBox.height() - $scroll.height()) / e.wheelDelta * 20;//计算滚动条，根据滚轮滑动一次的距离，计算控制滚轮每次滑动 ，滚动条滑动20,每次20叠加给wheel
                // console.log(wheel);
                if (wheel < 0) {//控制滚轮滑动后，滚动条的上限和下限
                    wheel = 0;
                } else if (wheel > $conBox.height() - $scroll.height()) {
                    wheel = $conBox.height() - $scroll.height();
                }
                $scroll.css({'margin-top': wheel});
                $con.css({'margin-top': -($con.height() - $conBox.height()) / ($conBox.height() - $scroll.height()) * wheel});
            });
            function onMove(e) {
                if (e.clientY - startY - $conBox.offset().top - 20 < 0) {
                    $scroll.css({'margin-top': 0});
                    $con.css({'margin-top': 0});
                } else if (e.clientY - startY - $conBox.offset().top - 20 > $conBox.height() - $scroll.height()) {
                    $scroll.css({'margin-top': $conBox.height() - $scroll.height()});
                    $con.css({'margin-top': $conBox.height() - $con.height()});
                } else {
                    $scroll.css({'margin-top': e.clientY - startY - $conBox.offset().top - 20});
                    $con.css({'margin-top': -($con.height() - $conBox.height()) / ($conBox.height() - $scroll.height()) * (e.clientY - startY - $conBox.offset().top - 20)});
                }
            }
            function onUp(e) {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
            }

            //add按钮事件
            $('button.addBtn').click(function () {
                //判断用户是否输入了内容，如果没有内容，边框爆红提示
                if ($(this).prev().val().length == 0) {
                    $(this).prev().css({'border-color': '#f00'});
                } else {//如果有内容，生成记事本内容
                    var $noteCon = $('<div class="noteCon"></div>');
                    var $del = $('<a href="javascript:;" class="del">×</a>');
                    $noteCon.append($del);
                    //新建文本p标签，并获取时间和文本
                    var $noteTxt = $('<p class="noteTxt">' + $('select.hour').val() + ':' + $('select.min').val() + '　note:' + $(this).prev().val() + '</p>');
                    //添加所有东西
                    $noteCon.append($noteTxt);
                    $con.append($noteCon);
                    //用动画显示下滑出现
                    $noteCon.slideDown('fast', function () {
                        //计算滚动条大小
                        if ($con.height() < $conBox.height()) {
                            $scroll.hide();
                        } else {
                            console.log($conBox.height(), $con.height());
                            $scroll.show();
                            $scroll.stop().animate({'height': $conBox.height() / $con.height() * $conBox.height()}, 'fast', function () {
                                $scroll.css({'margin-top': $conBox.height() - $scroll.height()});
                                $con.css({'margin-top': $conBox.height() - $con.height()});
                            });
                        }
                    });
                    //当前有记事本内容添加时，添加的内容定义给当前选中的td自定义变量
                    var _thisTd = $('td.checked');
                    _thisTd.addClass('hasNote').data('event',$con);
                    var noteObj = {};
                    noteObj.year = year;
                    noteObj.month = month+1;
                    noteObj.day = _thisTd.text();
                    noteObj.event = $con;
                    noteData.push(noteObj);
                    //删除记事本记事内容事件,  为了实现功能，重复写一次，待解决
                    delNote($del);
                    //重置文本框内容，并使其获得焦点，方便用户继续输入
                    $(this).prev().val('').focus();
                }
                //获取焦点时，边框恢复
            }).prev().focus(function () {
                $('input').css({'border-color': '#000'});
            });
        });
        //删除记事本事件
        function delNote(obj) {
            obj.click(function () {
                // console.log(2);
                var $conBox = $(this).parents('.conBox');
                $(this).parent().remove();
                if ($conBox.find('.noteCon').length == 0) {
                    $('td.checked').removeClass('hasNote').data('event','');
                }
            });
        }
    }
    createDate(0);
});