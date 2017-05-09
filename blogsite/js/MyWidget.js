class MyWidget {
    constructor() {

    }

    //自制滚动条        内容和滚动条的盒子，内容，滚动条，滚轮速度，滚轮颜色，滚轮按下颜色
    static createScroll(box, con, scroll, wheelSpeed = 20, scrollBoxColor = '#343434', scrollBoxClickColor = '#e0e0e0') {
        if (con.offsetHeight < box.offsetHeight) {
            scroll.style.display = 'none';
        } else {
            scroll.style.display = 'block';
            if (box.offsetHeight / con.offsetHeight * box.offsetHeight<50){
                scroll.style.height = 50+'px';
            }else {
                scroll.style.height = box.offsetHeight / con.offsetHeight * box.offsetHeight + 'px';
            }
        }
        scroll.addEventListener('mousedown', onDown); //滚动条监听鼠标按下
        con.addEventListener('mousewheel', onWheel);//内容区域监听滚轮事件
        con.addEventListener('DOMMouseScroll', onWheel);//兼容火狐
        let startY = 0;

        function onDown(e) {
            scroll.style.background = scrollBoxClickColor;
            startY = e.offsetY; //鼠标按下事件触发，鼠标按下位置到当前触发事件元素上端的Y坐标
            document.addEventListener('mousemove', onMove);//监听鼠标移动
            document.addEventListener('mouseup', onUp);//监听鼠标抬起
            e.preventDefault();//防止鼠标按下 拖动时选中了文字，出现bug
        }

        function onMove(e) {
            if ((e.clientY - startY - box.getBoundingClientRect().top) < 0) { //限制滚动条移动区域
                scroll.style.top = 0;
                con.style.top = 0;
            } else if ((e.clientY - startY - box.getBoundingClientRect().top) > box.offsetHeight - scroll.offsetHeight) {//限制滚动条移动区域
                scroll.style.top = box.offsetHeight - scroll.offsetHeight + 'px';
                con.style.top = -(con.offsetHeight - box.offsetHeight) + 'px';
            } else {
                //鼠标到浏览器上端的距离 - 鼠标按下时到当前元素上端的距离 - 滚动条上端到浏览器上端的距离 == 滚动条滚动的距离
                scroll.style.top = e.clientY - startY - box.getBoundingClientRect().top + 'px';
                con.style.top = -(con.offsetHeight - box.offsetHeight) / (box.offsetHeight - scroll.offsetHeight) * (e.clientY - startY - box.getBoundingClientRect().top) + 'px';
                //计算原理：先求出滚动条每滚动一像素，相应的内容区域移动多少像素，再乘以滚动条滚动距离
                //用内容区域可滚动的范围 除以  滚动条滚动的范围
            }
        }

        //滚轮事件
        function onWheel(e) {
            if (!e.wheelDelta)e.wheelDelta=e.detail*-40;//火狐滚轮是3，并且相反
            // console.log(e.wheelDelta);
            let wheel = parseFloat(scroll.style.top) || 0;//绑定鼠标移动滚动条后，滚动条位置
            wheel += -(box.offsetHeight - scroll.offsetHeight) / e.wheelDelta * wheelSpeed;//计算滚动条，根据滚轮滑动一次的距离，计算控制滚轮每次滑动 ，滚动条滑动20,每次20叠加给wheel
            // console.log(wheel);
            if (wheel < 0) {//控制滚轮滑动后，滚动条的上限和下限
                wheel = 0;
            } else if (wheel > box.offsetHeight - scroll.offsetHeight) {
                wheel = box.offsetHeight - scroll.offsetHeight;
            }
            scroll.style.top = wheel + 'px';
            con.style.top = -(con.offsetHeight - box.offsetHeight) / (box.offsetHeight - scroll.offsetHeight) * wheel + 'px';
            //    此处同理鼠标点击滚动条
            e.preventDefault();//阻止系统滚动条事件
        }

        function onUp(e) { //移除监听
            scroll.style.background = scrollBoxColor;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        }
    }

    //复选框全选，反选     input集合的父元素，全选按钮，反选按钮
    static createCheckAll(inputBox, allBtn, otherBtn = null) {
        let checkbox = inputBox.getElementsByTagName('input');//input数组
        if (otherBtn != null) {
            //反选
            otherBtn.onclick = function () {
                for (let i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = !checkbox[i].checked;
                }
                //反选后，改变当前选中数量
                n = checkbox.length - n;
            };
        }

        //全选或取消
        let n = 0;//表示复选框选中的数量
        let count = false;//表示全选按钮状态

        allBtn.onclick = function () {
            //当复选框全选中 ，让全选按钮改变状态
            if (n == checkbox.length) {
                count = true;
            } else {
                count = false;
            }

            //判断状态，实现功能
            if (count == false) {
                for (let i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = true;//全选中
                    n = checkbox.length;
                }
                count = !count;
            } else {
                for (let i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = false;//全不选
                    n = 0;
                }
                count = !count;
            }
        };

        //用户点击复选框后，复选框选中数量
        for (let j = 0; j < checkbox.length; j++) {
            checkbox[j].onclick = function () {
                if (this.checked == true) {
                    n++;
                } else {
                    n--;
                }
            }
        }

        // if (n == checkbox.length){
        //     btn.checked = true;
        // }else {
        //     btn.checked = false;
        // }


    }

    //返回顶部jquery    滚动条id，返回顶部按钮出现的位置，刷新浏览器是否置顶，滚动速度
    static goTop(scrollIconId, iconFadeTop = 500, isTop = true, scrollSpeed = null) {
        window.onbeforeunload = function () {
            if (isTop) $(window).scrollTop(0);//刷新页面滚动条默认顶部
        };
        let oTop = $('#' + scrollIconId);//a标签
        document.addEventListener('scroll', function () {//动态监听滚动事件
            if ($(window).scrollTop() > iconFadeTop) {//动态获取滚动条位置，控制按钮出现
                oTop.fadeIn();
            } else {
                oTop.fadeOut();
            }
        });

        oTop.click(function () {//点击 返回顶部
            $(document.documentElement).animate({'scrollTop': '0'}, scrollSpeed);//IE
            $(document.body).animate({'scrollTop': '0'}, scrollSpeed);//谷歌
        })
    }

    // 浏览器范围鼠标按住拖动div
    // 被拖动的盒子，拖动按住的目标
    static drag(box, title) {
        title = title || box;
        title.onmousedown = function (e) {
            let ww = document.documentElement.clientWidth - box.offsetWidth;//限制在可视区域内
            let hh = document.documentElement.clientHeight - box.offsetHeight;//限制在可视区域内
            if (e.button == 0) {         //左键拖动
                let startX = e.offsetX;//鼠标按下时的鼠标位置
                let startY = e.offsetY;
                document.onmousemove = function (e) {
//                判断横向范围
                    if (e.clientX - startX <= 0) {//限制在可视区域内
                        box.style.left = 0;
                    } else if (e.clientX - startX >= ww) {
                        box.style.left = ww + 'px';
                    } else {
                        box.style.left = e.clientX - startX + 'px';//计算鼠标移动距离
                    }
//                判断纵向范围
                    if (e.clientY - startY <= 0) {//限制在可视区域内
                        box.style.top = 0;
                    } else if (e.clientY - startY >= hh) {
                        box.style.top = hh + 'px';
                    } else {
                        box.style.top = e.clientY - startY + 'px';//计算鼠标移动距离
                    }
                };
            }
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmoueseup = null;
            };
            return false;
        };
    }

    //模态层，禁止用户点击页面，传入参数z-index
    static newModal(zIndex = 99, bgColor = null) {
        let oM = document.createElement('div');
        oM.className = "modal";
        oM.style.position = 'fixed';
        oM.style.width = '100%';
        oM.style.height = '100%';
        oM.style.top = '0';
        oM.style.left = '0';
        oM.style.zIndex = zIndex;
        if (bgColor != null) oM.style.backgroundColor = bgColor;
        document.body.appendChild(oM);
        return oM;
    };

    //居中   参数居中的对象
    static posCenter(obj){
        function center() {
            let ll = (document.documentElement.clientWidth-obj.offsetWidth)/2;
            let tt = (document.documentElement.clientHeight-obj.offsetHeight)/2;
            obj.style.left = ll+'px';
            obj.style.top = tt +'px';
        }
        center();
        window.onresize = center;
    }

    //警告弹框    参数：警告文字
    static alertBox(msg) {
        let modalLayer = this.newModal();//调用模态层 并接收返回值
        let oBox = document.createElement('div');
        oBox.className = "alertBox";
        oBox.style.width = '400px';
        oBox.style.height = '130px';
        oBox.style.border = '1px solid #ccc';
        oBox.style.borderRadius = '10px';
        oBox.style.backgroundColor = '#fff';
        oBox.style.position = 'absolute';
        oBox.style.zIndex = 100;
        oBox.innerHTML = '<p style="font-size: 16px;text-align: center;padding: 20px 0;">' + msg + '</p><button type="button" style="width:100px;height: 40px;display: block;margin: 0 auto;">确定</button>';
        document.body.appendChild(oBox);
        /*拖拽*/
        this.drag(oBox);
        //居中
        this.posCenter(oBox);
        //删除弹框
        oBox.closeBtn = oBox.getElementsByTagName('button')[0];
        oBox.closeBtn.onclick = function (e) {
            document.body.removeChild(oBox);//删除alertBox
            document.body.removeChild(modalLayer);//删除模态层
        };
        oBox.closeBtn.onmousedown = function (e) {
            e.cancelBubble = true;
        };
        return oBox;
    };

    //confirm弹框   参数：提示文字，点确定后执行的fn
    static confirmBox(msg,trueFn) {
        let modalLayer = this.newModal();//调用模态层 并接收返回值
        let oBox = document.createElement('div');
        oBox.className = "confirmBox";
        oBox.style.width = '400px';
        oBox.style.height = '130px';
        oBox.style.border = '1px solid #ccc';
        oBox.style.borderRadius = '10px';
        oBox.style.backgroundColor = '#fff';
        oBox.style.position = 'absolute';
        oBox.style.textAlign = 'center';
        oBox.style.zIndex = 100;
        oBox.innerHTML = '<p style="font-size: 16px;text-align: center;padding: 20px 0;">' + msg + '</p><button type="button" style="width:100px;height: 40px;">确定</button>　　　<button type="button" style="width:100px;height: 40px;">取消</button>';
        document.body.appendChild(oBox);
        /*拖拽*/
        this.drag(oBox);
        //居中
        this.posCenter(oBox);
        //删除弹框
        oBox.trueBtn = oBox.getElementsByTagName('button')[0];
        oBox.falseBtn = oBox.getElementsByTagName('button')[1];
        oBox.trueBtn.onclick = function () {
            document.body.removeChild(oBox);//删除Box
            document.body.removeChild(modalLayer);//删除模态层
            trueFn && trueFn();
        };
        oBox.falseBtn.onclick = function () {
            document.body.removeChild(oBox);//删除Box
            document.body.removeChild(modalLayer);//删除模态层
        };
        oBox.trueBtn.onmousedown = function (e) {
            e.cancelBubble = true;
        };
        oBox.falseBtn.onmousedown = function (e) {
            e.cancelBubble = true;
        };
        return oBox;
    };

    //promptBox弹框
    static promptBox(msg,trueFn){
        let modalLayer = this.newModal();//调用模态层 并接收返回值
        let oBox = document.createElement('div');
        oBox.className = "confirmBox";
        oBox.style.width = '400px';
        // oBox.style.height = '300px';
        oBox.style.border = '1px solid #ccc';
        oBox.style.borderRadius = '10px';
        oBox.style.backgroundColor = '#fff';
        oBox.style.position = 'absolute';
        oBox.style.textAlign = 'center';
        oBox.style.zIndex = 100;
        oBox.innerHTML = '<h4 style="width:90%;margin-left:5%;font-size: 16px;text-align: left;padding: 10px 0;">'+msg+'</h4>'+ '<textarea style="width: 90%;height: 100px;resize: none;"></textarea>' +'<button type="button" style="width:100px;height: 40px;">确定</button>　　　<button type="button" style="width:100px;height: 40px;">取消</button>';
        document.body.appendChild(oBox);
        /*拖拽*/
        this.drag(oBox);
        //居中
        this.posCenter(oBox);
        oBox.textArea = oBox.getElementsByTagName('textarea')[0];

        oBox.textArea.onmousedown = function(e){
            e.cancelBubble = true;
        };
        //删除弹框
        oBox.trueBtn = oBox.getElementsByTagName('button')[0];
        oBox.falseBtn = oBox.getElementsByTagName('button')[1];
        oBox.trueBtn.onclick = function () {
            document.body.removeChild(oBox);//删除Box
            document.body.removeChild(modalLayer);//删除模态层
            trueFn && trueFn(oBox.textArea.value);
        };
        oBox.falseBtn.onclick = function () {
            document.body.removeChild(oBox);//删除Box
            document.body.removeChild(modalLayer);//删除模态层
        };
        oBox.trueBtn.onmousedown = function (e) {
            e.cancelBubble = true;
        };
        oBox.falseBtn.onmousedown = function (e) {
            e.cancelBubble = true;
        };
        return oBox;
    }

    //淘宝放大镜效果   //移动的盒子，限制范围的盒子，放大的图片，放大的倍数
    static tbDrag(moveBox,dragAreaBox,scalePic = null,scalePicBox = null){
        dragAreaBox.onmouseover = function () {
            moveBox.style.display = 'block';
            if (scalePicBox!=null){
                scalePicBox.style.display = 'inline-block';
            }
        };
        dragAreaBox.onmouseout = function () {
            moveBox.style.display = 'none';
            if (scalePicBox!=null)scalePicBox.style.display = 'none';
        };
        dragAreaBox.onmousemove = function (e) {
            let xx,yy;
            if (e.clientX<dragAreaBox.getBoundingClientRect().left+moveBox.offsetWidth/2){
                xx = 0;
            }else if(e.clientX>dragAreaBox.getBoundingClientRect().right-moveBox.offsetWidth/2){
                xx = dragAreaBox.offsetWidth-moveBox.offsetWidth;
            }else {
                xx = e.clientX-dragAreaBox.getBoundingClientRect().left-moveBox.offsetWidth/2;
            }

            if (e.clientY<dragAreaBox.getBoundingClientRect().top+moveBox.offsetHeight/2){
                yy = 0;
            }else if(e.clientY>dragAreaBox.getBoundingClientRect().bottom-moveBox.offsetHeight/2){
                yy = dragAreaBox.offsetHeight-moveBox.offsetHeight;
            }else {
                yy = e.clientY-dragAreaBox.getBoundingClientRect().top-moveBox.offsetHeight/2;
            }
            moveBox.style.top = yy+'px';
            moveBox.style.left = xx+'px';

            let scaX = (scalePic.offsetWidth-scalePicBox.offsetWidth)/(dragAreaBox.offsetWidth-moveBox.offsetWidth);
            let scaY = (scalePic.offsetHeight-scalePicBox.offsetHeight)/(dragAreaBox.offsetHeight-moveBox.offsetHeight);
            if (scalePic!=null){
                scalePic.style.left = -scaX*xx+'px';
                scalePic.style.top = -scaY*yy+'px';
            }
        }
    }

    //验证码生成和检测  输入框，验证码元素对象，换验证码对象，提交按钮对象
    static checkCode(inputObj,codeObj,changeObj,subObj){
        let txtLength = 4;
        let txtArr = [];
        for (let i = 0; i < 26; i++) {
            txtArr.push(String.fromCharCode(65 + i));//A-Z
            txtArr.push(String.fromCharCode(97 + i));//a-z
        }
        for (let i = 0; i < 10; i++) {
            txtArr.push(String.fromCharCode(48 + i));//0-9
        }
        function changeTxt() {
            let btnText = '';
            for (let i = 0; i < txtLength; i++) {
                let k = parseInt(Math.random() * txtArr.length);
                btnText += txtArr[k];
            }
            codeObj.innerHTML = btnText;
        }
        changeTxt();
        codeObj.addEventListener('click', changeTxt);
        changeObj.addEventListener('click', changeTxt);
        subObj.onclick = function (e) {
            if (inputObj.value == '') {
                alert('请输入验证码');
            } else if (inputObj.value.toUpperCase() != codeObj.innerHTML.toUpperCase()) {
                alert('验证码输入错误');
            } else {
                alert('输入正确');
            }
        }
    }
}