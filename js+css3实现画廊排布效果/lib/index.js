/**
 * Created by mastermin on 17-8-17.
 */
(function ($) {

    var container = $('.container')[0];
    var navbar = $('.navbar');
    var D1 = 0;
    var D2 = 180;
    var D3 = 0;
    //主进程
    createRender(data);
    var img_show = $('.img_show');
    var pic_front = $('.pic_front');
    var pic_back = $('.pic_back');
    var spans = $('.navbar>span');

    var initshow = radom([-1, 20]);
    //初始化一些内容
    img_show.eq(initshow).addClass('selecting');
    spans.eq(initshow).addClass('active');
    spans.eq(initshow).find('span.glyphicon-repeat').show();
    sort_img();

    //绑定点击图片事件模块
    img_show.click(function () {
        var T_index = $(this).index() - 1;
        spans.eq(T_index).addClass('active').siblings().removeClass('active');
        spans.eq(T_index).find('span.glyphicon-repeat').show(200);
        spans.eq(T_index).siblings().find('span.glyphicon-repeat').hide();

        var cls = $(this)[0].className;
        if (/selecting/.test(cls) === false) {
            //在点击下一张不同的图片时,注意要清除之前D1,D2,D3的值，否则会产生轻微的bug
            D1=0;
            D2=180;
            D3=0;
            move_img($(this));
        }

        else {
            D3 += 190;
            var rot1 = 'rotateZ(' + D3 + 'deg)';
            spans.eq(T_index).find('span.glyphicon-repeat').css({'transform': rot1});
            D3 >= 190 ? D3 = -190 : D3;
            turn($(this))
        }
    });

//绑定点击导航条事件模块
    spans.click(function () {
        var index = $(this).index();
        var cls = $(this).hasClass('active');


        //检测所点击的按钮是为已获得焦点的按钮还是新的按钮
        //通过对glyphicon-repeat进行翻转实现按钮的变换
        if (cls) {
            D3 += 190;

            var rot = 'rotateZ(' + D3 + 'deg)';
            spans.eq(index).find('span.glyphicon-repeat').css({'transform': rot});
            D3 >= 190 ? D3 = -190 : D3;
            turn(img_show.eq(index));
        }

        else {
            spans.eq(index).siblings().find('span').hide();
            spans.eq(index).find('span.glyphicon-repeat').show();
            spans.eq(index).addClass('active').siblings().removeClass('active');
            move_img(img_show.eq(index));

        }


    });

    function turn(target) {
        var front = target.find('.pic_front');
        var back = target.find('.pic_back');
        D1 += 180;
        D2 += 180;
        var Z_trans1 = 'rotateY(' + D1 + 'deg)';
        var Z_trans2 = 'rotateY(' + D2 + 'deg)';
        var Z_trans3 = 'rotateZ(' + D3 + 'deg)';
        front.css({'transform': Z_trans1});
        back.css({'transform': Z_trans2, 'background-color': '#EEE'});
        if (D1 >= 360) {
            D1 = 0
        }
        else if (D2 >= 360) {
            D2 = 0

        }

    }

  function createRender(data) {
        //这里container中的内容都是通过此模块动态生成
        data.forEach(function (val){
            var html =
                '<div class="pic_front">' +
                '<img src=' + val.src + '>' +
                '<p class="title">' + val.name + '</p></div>' +
                '<div class="pic_back">' +
                '<p class="name">英雄名称:<span class="langed_name">' + val.name + '</span></p>' +
                '<p class="nickname">俗称:<span class="langed_nickname">' + val.nickname + '</span></p>' +
                '<p class="desc">描述:' +
                '<span class="langed_desc">' + val.desc + '</span>' +
                '</p>' +
                '</div>';
            var span1=document.createElement('span');
            var span2=document.createElement('span');
            // var span3=document.createElement('span');
            span1.className='navbar-item';
            span2.className='glyphicon glyphicon-repeat';
            // span3.className='glyphicon glyphicon-refresh';
            span1.appendChild(span2);
            // span1.appendChild(span3);
            var C_img_show = document.createElement('div');
            C_img_show.className = 'img_show';
            C_img_show.innerHTML = html;
            navbar[0].appendChild(span1);
            container.appendChild(C_img_show);
        })
    }





    //随机数发生器[m,n]得到m-n之间随机整数

   function radom(range) {
        var min = Math.min(range[0], range[1]);
        var max = Math.max(range[0], range[1]);
        var value = Math.random() * (max - min - 1) + min;
        var random_R = Math.ceil(value);
        return random_R
    }
//排序图片，把图片随机放置在左右区域
  function sort_img(){
        var imgs = $('.img_show');
        var bodys=$('body');
        var L_minX =-250;
        var L_maxX = bodys.width() / 2 -280;
        var L_minY = -320;
        var L_maxY = bodys.height()-50;
        var R_minX = bodys.width()/2+80;
        var R_maxX = bodys.width()-50;
        var R_minY = L_minY;
        var R_maxY = L_maxY;
        var rangeLX = [L_minX, L_maxX];
        var rangeLY = [L_minY, L_maxY];
        var rangeRX = [R_minX, R_maxX];
        var rangeRY = [R_minY, R_maxY];
var navX=bodys.width()/2-navbar.width()/2;
navbar.css({'left':navX});
        for (var i = 0; i < imgs.length; i++) {
            var clsName = imgs[i].className;
            if (/selecting/.test(clsName)===false) {

                var L_X = radom(rangeLX)+'px';
                var L_Y = radom(rangeLY)+'px';
                var R_X = radom(rangeRX)+'px';
                var R_Y = radom(rangeRY)+'px';
                var ro='rotate('+radom([10,120])+'deg)'+' scale(0.7)';


             if(i%2===0) {
                 imgs.eq(i).css({'position': 'absolute','left':L_X,'top':L_Y,'transform':ro,'margin':0})
             }

             else {
                 imgs.eq(i).css({'position': 'absolute','left':R_X,'top':R_Y,'transform':ro,'margin':0})
             }

            }
        }
    }
//把图片移至浏览器中央位置
    function move_img(target){
            target[0].style='';
            img_show.removeClass('selecting');
            target.addClass('selecting');
           sort_img()
    }


})(jQuery);