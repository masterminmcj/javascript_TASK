/**
 * Created by mastermin on 17-8-7.
 */

;
(function ($) {


function Tab(container) {
    this.container=container;
    var _this_ = this;
    this.nav_item = container.find('.nav-tab li.nav-item');
    this.tab_item = container.find('.tab-container div.tab-item');
    //默认配置选项
    this.config = {
        "triggerType": "mouseover",
        "effect": "default",
        "autoPlay": false
    };
    for (var i=0;i<this.nav_item.length;i++){
        if(this.nav_item.eq(i).hasClass('active')){
            this.startActive=i;
        }
    }
//增加定时器和计数器
    this.timer=null;
    this.count=this.startActive;
    //处理配置选项
_this_.handleConfig();



//根据不同选项的内容触发相应的事件
var config=this.config;
if(config.triggerType==='click'){
    this.nav_item.on(config.triggerType,function(){
    _this_._display_($(this))
    })
}
else {
    this.nav_item.on('mouseenter',function(e){
        e.stopPropagation();
         _this_._display_($(this))

    })

}

//当指定指定播放触发事件
if(config.autoPlay) {
    this._autoPlay_();

    //鼠标移入移出事件
    this.container.hover(function() {
        clearInterval(_this_.timer)
    },function () {
        _this_._autoPlay_()
    })
}



}

    Tab.prototype= {
        _display_: function (ActiveTab) {
            var _this_ = this;

            var index = ActiveTab.index();
            this.nav_item.eq(index).addClass('active').siblings().removeClass('active')
            if (this.config.effect === 'fade') {
                this.tab_item.eq(index).fadeIn().siblings().fadeOut()
            }
            else {
                this.tab_item.eq(index).addClass('current').siblings().removeClass('current')

            }
            if (this.config.autoPlay) {
                this.count = index//使自动播放时的nav与鼠标事件的目标一致
            }
        }
        ,
        handleConfig: function () {
            var config = this.container.attr('data-config');

            if (config && config !== '') {
                config = JSON.parse(config);
                $.extend(this.config, config);//把系统默认的配置替换成用户指定的

            }
            else {
                this.config = null;
            }
        }
        ,
        _autoPlay_: function () {

             var _this_=this;
             var config=this.config;
             var nav_item=this.nav_item;

this.timer=setInterval(function(){

    if(_this_.count>nav_item.length-1){
    _this_.count=0
}
    nav_item.eq(_this_.count).trigger(config.triggerType);
    _this_.count++;

},config.autoPlay)

        }

    };


    //注册成jQuery方法
    $.fn.extend({
        tab:function(){
            this.each(function(){
                new Tab($(this))
            });
            return this   //返回外围this以便可以实现链式调用
        }
    })



})(jQuery);

