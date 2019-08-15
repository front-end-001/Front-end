/*
* @Author: dingyousi
* @Date:   2018-5-17 22:53:36
* @Last Modified by:   dingyousi
* @Last Modified time: 2018-5-17 00:13:51
*/
//此处分号避免前面别人的函数结尾没有分号这样就会报错
        ;(function ($, window, document, undefined) {
                //定义插件的名字，这样如果要修改插件名字只要修改此处即可，便于后期维护
                var pluginName = "slider";
                
                //构造函数
                function Slider (ele, options) {
                        
                        //在这里面,ele指的是用jQuery选中的元素$('.bigImgScroll')
                        this.$ele=ele;
                        
                        //默认属性值
                        this._default={
                        	//让第几个元素显示
							showEleIndex:1,
                        	//显示的子元素个数
							showNum:3,
                        	//滚动的个数
                        	scrollNum:1,
                        	//子元素间隔
                    		scrollItemSpacing:20,
                        	//是否自动滚动：
                            isAuto:false,
                            //是否浮动布局
                            isFloat:true,
                            //按钮事件
                            btnEvent:'click',
                            //滚动的容器
                            sliderContainer:'.sliderContainer',
                            //幻灯片导航
                            sliderNav:'.slider_nav',
                            //让对应的导航元素样式
                            sliderNavActive:'active',
                            //滚动间隔时间
                            scrollTime:500,
                            //左边按钮
                            btnPrev:'.btnPrev',
                            //右边按钮
                            btnNext:'.btnNext'
                                
                        };
                        
                        //合并属性保护好默认参数:
                        this.opt=$.extend({}, this._default, options);
                        
                        //获取列表父容器
                        this.$sliderContainer = $(this.opt.sliderContainer);
                        
                        //获取导航容器
                        this.$sliderNav = $(this.opt.sliderNav);
                        
                        //获取导航容器子元素
                        this.$sliderNavItem = this.$sliderNav.children();
                        
                        //获取滚动的个数
                        this.scrollNum = this.opt.scrollNum;
                        
                        //显示的子元素个数
                        this.showNum = this.opt.showNum;
                        
                        //让第几个元素显示
                        this.showEleIndex=this.opt.showEleIndex;
                        
                        //让对应的导航元素样式
                        this.sliderNavActive=this.opt.sliderNavActive;
                        
                        console.log(this.sliderNavActive)
                        //子元素间距
                        this.scrollItemSpacing = this.opt.scrollItemSpacing;
                        
                        //滚动间隔时间
                        this.scrollTime=this.opt.scrollTime;
                        
                        /*上一个*/
                        this.$btnPrev = $(this.opt.btnPrev);
                        /*下一个*/
                        this.$btnNext = $(this.opt.btnNext);
                        
                        //计数
                        this.num = 0;
                        
                        //初始化布尔值   
                        this.bool = true;
                        
                        //初始化定时器
                        this.timer = null;
                        
                        //初始化方法执行
                        this.init();
                        
                };
                
                Slider.prototype={
                    //初始化函数
                    init:function () {
                     	
                        var _this=this;
                        
                        //设置容器的html是两倍的子元素
                        this.$sliderContainer.html(this.$sliderContainer.html()+this.$sliderContainer.html());
                        
                        /*注意此处一定要等元素添加到页面了才获取*/
                        this.$sliderContainerItem = this.$sliderContainer.children();
                        
                        //获取每一个子元素的宽度包括margin+padding
                        this.$sliderContainerItemWidth=this.$sliderContainerItem.eq(0).outerWidth(true);
						
						//设置最外层容器this.$ele的宽度
                        this.$ele.width(this.$sliderContainerItemWidth*this.showNum-this.scrollItemSpacing);
                        
						//初始化滚动容器的宽度
                        this.$sliderContainer.width(this.$sliderContainerItemWidth*this.$sliderContainerItem.length);
                       
                        
                        this.$sliderContainerItemLength=this.$sliderContainerItem.length;
                        
                        
                        
                        //让左右按钮隐藏
                        this.$btnPrev.hide();
                        
                        this.$btnNext.hide();
                        
                        //设置下导航的宽度
                        this.$sliderNav.width(this.$sliderNavItem.eq(0).outerWidth(true)*this.$sliderNavItem.length);
                        
                        //如果每次滚动超过一个子元素
                        if (_this.scrollNum>1) {
                        	//就给每scrollNum个添加一个div.box
                        	_this.$sliderContainerItem.each(function (i, elem) {
                        		
                        		_this.$sliderContainerItem.slice(i*_this.scrollNum,i*_this.scrollNum+_this.scrollNum).wrapAll("<div class='dys_box'></div>");
                        		
                        		
                        	});
                        }
                        //只有上面dys_box添加到页面了，下面才会获取到哈
                    	//获取dys_box
                    	this.$dysBox=$('.dys_box');
                    	
                    	this.$dysBoxWidth=_this.$ele.width();
                    	
                    	this.$dysBoxLength=this.$dysBox.length;
                    	
                    	
                     },
                    //定义一个滚动方法
                    tabs:function () {
                     	
                        var _this=this;
                                
                        /*点击上一个*/
                        this.$btnPrev.on(this.opt.btnEvent, function () {
                                
                                //先清除计时器
                                clearInterval(_this.timer);
                                
                                if (_this.bool) {
                                    	//如果每次滚动超过一个子元素
				                        if (_this.scrollNum>1) {
				                        	
				                        	_this.$sliderContainerItemWidth=_this.$dysBoxWidth+_this.scrollItemSpacing;
				                        	
				                        	_this.$sliderContainerItemLength=_this.$dysBoxLength;
				                        	
				                        }
                                        //this.num==0
                                        if (_this.num==0) {
                                            
                                            //瞬间将left是宽度的一半（肉眼看不到）
                                            _this.$sliderContainer.css('left',-_this.$sliderContainerItemWidth*_this.$sliderContainerItemLength/2);
                                            
                                            _this.num=_this.$sliderContainerItemLength/2;
                                            
                                        }
                                        
                                        _this.num--;
                                        
                                        //让对应的导航元素样式
                                        _this.$sliderNavItem.eq(_this.num).addClass(this.sliderNavActive).siblings().removeClass(this.sliderNavActive);
                                        
                                        
                                        //容器开始滚动
                                        _this.$sliderContainer.animate({
                                            
                                            left:-(_this.num%_this.$sliderContainerItemLength)*_this.$sliderContainerItemWidth
                                            
                                        }, _this.opt.scrollTime, 'linear', function () {
                                            
                                        
                                            //等走完就变成true这样下次点击又会起作用了
                                            _this.bool=true;
                                            
                                        });
                                        
                                        //这样上一张没有走完你点击多少次n都不会增加了
                                        _this.bool=false;
                                }
                                
                        });
                        
                        /*点击下一个*/
                        this.$btnNext.on(this.opt.btnEvent, function () {
                            
                            //自动滚动和点击下一个方法都一样的，因为滚动的模式一样哈
                            _this.scrollFn();
                        
                        });
                        
                        /*点击下面按钮*/
                        this.$sliderNavItem.on('click', function () {
                            
                                var $index=_this.$sliderNavItem.index($(this));
                                
                                //让对应的按钮显示背景色
                                _this.$sliderNavItem.eq($index).addClass(this.sliderNavActive).siblings().removeClass(this.sliderNavActive);
                                
                                //如果每次滚动超过一个子元素
		                        if (_this.scrollNum>1) {
		                        	
		                        	_this.$sliderContainerItemWidth=_this.$dysBoxWidth+_this.scrollItemSpacing;
		                        	
		                        	_this.$sliderContainerItemLength=_this.$dysBoxLength;
		                        	
		                        }
                                _this.$sliderContainer.animate({
                                    
                                            left: -($index%_this.$sliderContainerItemLength)*_this.$sliderContainerItemWidth
                                            
                                        }, _this.scrollTime, 'linear', function () {
                                            
                                        
                                    });
                        });
                        
                        //自动滚动函数
                        function autoPlay () {
                            //自动滚动
                            _this.timer=setInterval(function () {
                                _this.scrollFn();
                            }, 2000);
                        };
                        
                        //自动滚动
                        if (_this.opt.isAuto) {
                        	
                        	autoPlay();
                        	
                        }
                        
                        //鼠标放到滚动容器上面的时候
                        this.$ele.hover(
                        
                            function () {
                                clearInterval(_this.timer);
                                _this.$btnPrev.fadeIn();
                            
                                _this.$btnNext.fadeIn();
                            },
                            
                            function () {
                                autoPlay();
                                 _this.$btnPrev.fadeOut();
                            
                                _this.$btnNext.fadeOut();
                            }
                            
                        );
                                
                     },
                    //自动滚动方法
                    scrollFn: function () {
                        
                        var _this=this;
                        
                        if (_this.bool) {
                                
                                    _this.num++;
                                	
                                	//如果每次滚动超过一个子元素
			                        if (_this.scrollNum>1) {
			                        	
			                        	_this.$sliderContainerItemWidth=_this.$dysBoxWidth+_this.scrollItemSpacing;
			                        	
			                        	_this.$sliderContainerItemLength=_this.$dysBoxLength;
			                        	
			                        }
			                        
                                    _this.$sliderContainer.animate({
                                    
                                            left:-(_this.num%_this.$sliderContainerItemLength)*_this.$sliderContainerItemWidth
                                            
                                        }, _this.opt.scrollTime, 'linear', function () {
                                            
                                            // 如果滚到中间的一张
                                            if (_this.num==0) {
                                                
                                                //让left==0（瞬间）瞬间让中间一张变成第一张（这两张其实是一样的图片所以你看不到变化）
                                                _this.$sliderContainer.css('left',0);
                                                    
                                            }
                                            
                                            //等走完就变成true这样下次点击又会起作用了
                                            _this.bool=true;
                                        
                                    });
                                    
                                    
                                    if (_this.num==_this.$sliderContainerItemLength/2) {
                                        
                                            _this.num=0;
                                                    
                                    }
                                    
                                    //让对应的按钮显示背景色
                                    _this.$sliderNavItem.eq(_this.num).addClass(this.sliderNavActive).siblings().removeClass(this.sliderNavActive);
                                    
                                    //这样上一张没有走完你点击多少次n都不会增加了
                                    _this.bool=false;
                                    
                            }   
                                    
                     }
                     
                     
                };
                
                //定义插件
                $.fn[pluginName]=function (options) {
                    //在这里面,this指的是用jQuery选中的元素
                    var bis=new Slider(this, options); 
                    
                    //返回jquery对象，以保证插件的可链式调用jquery的其它方法
                    return this.each(function () {
                		//对象实例调用方法
                        bis.tabs();
                    });
                        
                };
                
        })(jQuery);