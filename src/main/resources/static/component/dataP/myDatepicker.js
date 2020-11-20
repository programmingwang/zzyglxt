
/**
 * author: wyj
 * options:
 *      startDate： 开始日期 yyyy-mm-dd
 *      endDate: 结束日期 默认是当前日期
 *      view:0 1 2 3 4 表示 "年月日周季"五个视图 
 *      parent: query selector； 选择器添加到哪一个dom下面，默认是'body';
 *      positionFixed：是否使用fixed定位
 */

;(function($){
    $.fn.myDatePicker=function(inOptions){
        // 添加swiperAxis依赖
        if($.fn.swiperAxis==undefined){
            ;(function($){$.fn.swiperAxis=function(inOptions){let options={alignVice:true,onResize:function(){},resize:function(){return true},scrollSpeed:function(){return 40},moveSpeed:function(){if(options['direction']=='horizon'){return _this.find('div.swiper-axis-content').length>0?_this.find('div.swiper-axis-content:eq(0)').width():_this.width()}else{return _this.find('div.swiper-axis-content').length>0?_this.find('div.swiper-axis-content:eq(0)').height():_this.height()}},clickFrame:10,scrollFrame:10,fixWidth:false,direction:'horizon',hideBtn:true,fixLimit:function(){return{correctMin:correctMin,correctMax:correctMax,maxX:maxX,minX:minX}},afterMove:function(){},};options=$.extend(options,inOptions);let _this=$(this).addClass('swiper-axis-container').addClass(options['direction']=='horizon'?'':'vertical-align');let _leftBtn=$(document.createElement('button')).addClass('swiper-left-btn swiper-btn').attr('type','button').attr("hidden",options['hideBtn']);let _rightBtn=$(document.createElement('button')).addClass('swiper-right-btn swiper-btn').attr('type','button').attr("hidden",options['hideBtn']);let _contents=_this.children();let _object=$(document.createElement('div')).addClass('swiper-object');let maxX,minX;let correctMax,correctMin;let containerWidth;let contentWidth;let isX=options['direction']=='horizon';_this[0].swiperMove=move;_this[0].getX=getX;_this[0].resetLimit=function(datas){options=$.extend(options,inOptions);let fixed=options['fixLimit']();correctMin=fixed['correctMin']?fixed['correctMin']:correctMin;correctMax=fixed['correctMax']?fixed['correctMax']:correctMax;minX=fixed['minX']?fixed['minX']:minX;maxX=fixed['maxX']?fixed['maxX']:maxX};_this[0].reset=function(inOptions){options=$.extend(options,inOptions);align()};_this[0].alignSwiper=align;_this[0].swiperTo=function(x,inOptions){move(x,inOptions,false)};_this[0].swiperLeftBtn=_leftBtn;_this[0].swiperRightBtn=_rightBtn;initDom();align();bindListen();listenBtn();function initDom(){_object.append(_contents);_this.append(_object);_contents.each(function(index){let _content=$(this);if(index==0){_firstContent=_content}_content.children("div.swiper-axis-title").after('<i class="swiper-axis-light"></i>')});if(options['alignVice']){_leftBtn.addClass('align-vice');_rightBtn.addClass('align-vice')}_this.append(_leftBtn).append(_rightBtn)}function align(){contentWidth=getContentWidth();if(options['fixWidth']){if(isX&&getContentWidth()<_this.width()){_this.width(getContentWidth())}else if(!isX&&getContentWidth()<_this.height()){_this.height(getContentWidth())}}containerWidth=isX?_this.width():_this.height();if(contentWidth<=containerWidth){correctMax=correctMin=(containerWidth-contentWidth)/2}else{correctMax=0;correctMin=-0+(containerWidth-contentWidth)}maxX=correctMax+250;minX=correctMin-250;let fixed=options['fixLimit']();correctMin=fixed['correctMin']!=undefined?fixed['correctMin']:correctMin;correctMax=fixed['correctMax']!=undefined?fixed['correctMax']:correctMax;minX=fixed['minX']!=undefined?fixed['minX']:minX;maxX=fixed['maxX']!=undefined?fixed['maxX']:maxX}function bindListen(){let mousedown=false;let index;let moveCount=0;let limit=5;let recordIndex;_this[0].mousedown=false;$(window).on('resize',function(e){if(!options['resize'](e)){return true}move(0);options['onResize']();align()});_this.on('mousedown',mouseDownHandler);_this.on('mousemove',mouseMoveHandler);_this.on("mousewheel DOMMouseScroll",mouseWheelHandler);_this.on('mouseup',function(e){e.stopPropagation();mousedown=false;mouseUpHandler(e);_this[0].mousedown=false});_this.on('touchstart',function(e){let newE=processEvent(e);mouseDownHandler(newE)});_this.on('touchmove',function(e){if(!mousedown){return true}let newE=processEvent(e);mouseMoveHandler(newE)});_this.on('touchend',function(e){let newE=processEvent(e);mouseUpHandler(newE)});$(document).on('mousemove',function(e){if(!mousedown){return true}moveCount++;if(moveCount>limit){moveCount=0;recordIndex=(isX?e.pageX:e.pageY)}});$(document).on('mouseup',function(e){if(!mousedown){return true}mouseUpHandler(e);_this[0].mousedown=false;mousedown=false});function processEvent(e){if(e.target==e.currentTarget){e.preventDefault()}let _touch=e.originalEvent.targetTouches[0]?e.originalEvent.targetTouches[0]:e.originalEvent.changedTouches[0];e.pageX=_touch.pageX;e.pageY=_touch.pageY;return e}function mouseWheelHandler(e){e.preventDefault();e.stopPropagation();let delta=(e.originalEvent.wheelDelta&&(e.originalEvent.wheelDelta>0?1:-1))||(e.originalEvent.detail&&(e.originalEvent.detail>0?-1:1));let movey=delta>0?options['scrollSpeed']():-options['scrollSpeed']();_object[0].rafCount=_object[0].rafCount!=undefined?(_object[0].rafCount+1):0;let distance=movey+getX();let func=function(){};if(distance>correctMax){func=function(){move(correctMax,{useRaf:true,frame:30})}}else if(distance<correctMin){func=function(){move(correctMin,{useRaf:true,frame:30})}}move(distance,{useRaf:true,func:func,frame:options['scrollFrame']})}function mouseDownHandler(e){e.stopPropagation();_this[0].mousedown=mousedown=true;recordIndex=index=(isX?e.pageX:e.pageY);_object[0].rafCount=_object[0].rafCount!=undefined?(_object[0].rafCount+1):0}function mouseMoveHandler(e){if(!mousedown||index==undefined){return true}e.stopPropagation();e.preventDefault();moveCount++;if(moveCount>limit){moveCount=0;recordIndex=(isX?e.pageX:e.pageY)}move((isX?e.pageX:e.pageY)-index+getX());index=isX?e.pageX:e.pageY}function mouseUpHandler(e){_this[0].mousedown=mousedown=false;let x;let distance;let func=function(){options['afterMove'](true)};let animationMove=Math.abs((isX?e.pageX:e.pageY)-recordIndex)>(isX?Math.min(_this.outerWidth(),100):Math.min(_this.outerHeight(),20));if(animationMove){if(isX){x=(e.pageX-recordIndex)>0?200:-200}else{x=(e.pageY-recordIndex)>0?200:-200}distance=x+getX()}else{x=getX();distance=x}if(distance>correctMax){func=function(){move(correctMax,{useRaf:true,frame:30})}}else if(distance<correctMin){func=function(){move(correctMin,{useRaf:true,frame:30})}}if(animationMove){move(distance,{useRaf:true,func:func})}else{func()}recordIndex=0}}function listenBtn(){let distance;let correctDistance;let isMoving=false;_rightBtn.on('click',function(e){e.stopPropagation();distance=getX()-options['moveSpeed']();btnClickHandler()});_leftBtn.on('click',function(e){e.stopPropagation();distance=getX()+options['moveSpeed']();btnClickHandler(e)});let btnClickHandler=function(){if(isMoving){return true}isMoving=true;let func=function(){isMoving=false};if(distance>correctMax||distance<correctMin){correctDistance=distance>40?correctMax:correctMin;func=function(){move(correctDistance,{useRaf:true,frame:30,func:function(){isMoving=false}})}}move(distance,{useRaf:true,func:func,frame:options['clickFrame']})}}function move(x,funOptions,isTrusted){funOptions=arguments[1]?arguments[1]:{};isTrusted=arguments[2]||arguments[2]===false?arguments[2]:true;let moveOptions={useRaf:false,frame:30,func:function(){},callback:true,};moveOptions=$.extend(moveOptions,funOptions);if(x>maxX){x=maxX}else if(x<minX){x=minX}if(!moveOptions['useRaf']){_object.css(isX?'margin-left':'margin-top',x);moveOptions['func']();options['afterMove'](isTrusted)}else{rafMove(x,[_object],isX?'margin-left':'margin-top',moveOptions['frame'],{func:moveOptions['func'],isTrusted:isTrusted})}}function getX(){return parseFloat(_object.css(isX?'margin-left':'margin-top').replace('px',''))}function getContentWidth(){return isX?_object.outerWidth():_object.outerHeight()}function rafMove(y,doms,css,f,inOptions){let rafOptions={func:function(){},isTrusted:true,};inOptions=arguments[4]?arguments[4]:0;rafOptions=$.extend(rafOptions,inOptions);let func=rafOptions['func'];let index=parseFloat(doms[0].css(css).replace('px',''));let originIndex=index;let frame=f==0?5:f;let addNum=(y-index)/frame;if(doms[0][0].rafCount==undefined){doms[0][0].rafCount=0}let rafSignal=doms[0][0].rafCount;let count=0;move();function move(){if(f>15){addNum=Math.pow(count-f,2)*(originIndex-y)/Math.pow(f,2)+(y-index)}for(let i in doms){doms[i].css(css,(index)+'px')}options['afterMove'](rafOptions['isTrusted']);addNum=Math.abs(addNum)<1&&addNum!=0?Math.abs(addNum)/addNum:addNum;index+=addNum;frame--;count++;if(frame<0||(rafSignal-doms[0][0].rafCount)<0||Math.abs(index-originIndex)>Math.abs(y-originIndex)){for(let i in doms){doms[i].css(css,(y)+'px')}func();return false}requestAnimationFrame(move)}}let isPC=function(){var userAgentInfo=navigator.userAgent.toLowerCase();var Agents=new Array("android","iphone","symbianOS","windows phone","ipad","ipod");var flag=true;for(var v=0;v<Agents.length;v++){if(userAgentInfo.indexOf(Agents[v])>0){flag=false;break}}return flag}}})(jQuery);
            $('body').append('<style>'+'div.swiper-axis-container{overflow:hidden;width:100%;position:relative;user-select:none;color:#888;padding:0px 30px;}div.swiper-object{width:auto;display:inline-flex;}div.swiper-axis-container::before,div.swiper-axis-container::after{content:"";position:absolute;width:40px;height:100%;display:block;top:0;z-index:9999;}div.swiper-axis-container::before{left:0;background:linear-gradient(to right,rgba(255,255,255,1) 10px,rgba(255,255,255,0));}div.swiper-axis-container::after{right:0;background:linear-gradient(to left,rgba(255,255,255,1) 10px,rgba(255,255,255,0));}div.swiper-axis-content{padding:0em 1.5em;position:relative;margin:0px 0px 5px 0px;}.swiper-axis-title{cursor:default;min-width:5em;display:block;font-size:1rem;font-weight:normal;padding:0em 1em;white-space:nowrap;transition:all 0.3s;height:1em;line-height:1;text-align:center;position:relative;cursor:pointer;}.swiper-axis-title::before,.swiper-axis-title::after{display:block;position:absolute;bottom:-4px;opacity:0;left:0px;transition:all 0.3s;}.swiper-axis-title::before{content:"";height:1px;background:rgba(0,188,217,0.8);width:calc(100% - 2em);left:1em;transform-origin:50% 50%;transform:scaleX(0.4);}.swiper-axis-title::after{content:"";left:calc(50% - .3em);border:solid transparent;border-width:.3em .3em 0em .3em;border-top-color:rgba(0,188,217,0.8);bottom:calc(-4px - .3em);}.swiper-axis-content.active .swiper-axis-title{color:rgba(0,188,217,0.8);}.swiper-axis-content.active .swiper-axis-title::before{opacity:1;transform:scaleX(1);}.swiper-axis-content.active .swiper-axis-title::after{opacity:1;}.swiper-axis-content.active i.swiper-axis-light::before{box-shadow:0px 0px 5px 3px rgba(0,188,217,0.8) !important;opacity:1;}.swiper-axis-content.active::before{}@keyframes boxShadow{0%{box-shadow:0px 0px 0px 3px rgba(255,255,255,1),0px 0px 5px 8px rgba(0,188,217,0.8);}100%{box-shadow:0px 0px 0px 1px rgba(255,255,255,1),0px 0px 5px 3px rgba(0,188,217,0.8);}}i.swiper-axis-light{width:100%;display:flex;align-items:center;justify-content:center;height:1.6em;margin:1.2em 0em 0em 0em;position:relative;}i.swiper-axis-light::before{content:"";width:1.6em;height:1.6em;border-radius:100%;border:none;display:block;opacity:0.8;background:radial-gradient(rgba(255,255,255,0.5)  20%,rgba(0,188,212,0.7) 10%,rgba(0,188,212,0.7) 40%,rgba(0,188,212,0.3) 50%  ) no-repeat;background:radial-gradient(rgba(255,255,255,0.5) 0% 10%,rgba(0,188,212,0.7) 20% 35%,rgba(0,188,212,0.3) 44% 100% ) no-repeat;transition:all 0.3s;z-index:99;cursor:pointer;}div.swiper-axis-content::before{content:"";display:block;width:calc(50% + 6em);position:absolute;height:2px;top:calc(2em - 1px + 1rem);transform:scaleY(1.2);right:calc(50% - 0px);z-index:3;background:linear-gradient(to right,transparent .2em,rgb(150,223,233) calc(100% - 0.8em),transparent calc(100% - 0.8em));background:linear-gradient(to right,rgba(255,255,255,0.1) .2em 15%,rgb(150,223,233) calc(100% - .8em) calc(100% - .8em),white calc(100% - .8em) );transition:all 0.5s;transform-origin:50% 50%;}div.swiper-axis-content:hover::before{transform:scaleY(1.1);background:linear-gradient(to right,rgba(255,255,255,0.2) .2em 15%,rgb(12,198,223) calc(100% - .8em) calc(100% - .8em),white calc(100% - .8em) );}div.swiper-axis-content:hover i.swiper-axis-light::before{opacity:1;box-shadow:0px 0px 10px rgba(0,188,212,1),0px 0px 2px rgba(255,255,255,0.8),0px 0px 1px rgba(0,188,212,0.3) inset;}div.swiper-axis-content:hover .swiper-axis-title{}i.swiper-axis-light::after{content:"";height:2px;width:calc(100% + 6em);position:absolute;background-color:#eee;display:block;left:-3em;z-index:0;top:calc(50% - 1px);}div.swiper-axis-vice-title{display:flex;align-items:center;justify-content:center;text-align:center;min-height:4em;line-height:1;padding:5px;min-width:10em;cursor:default;margin:1.5em -1em 0em -1em;position:relative;border:1px solid transparent}div.swiper-axis-content:hover div.swiper-axis-vice-title{border:1px solid #ddd;}div.swiper-axis-content div.swiper-axis-vice-title::before,div.swiper-axis-content div.swiper-axis-vice-title::after{content:"";position:absolute;border-style:solid;border-color:transparent;border-width:10px 7px 10px 7px;border-bottom-color:#ddd;top:calc(-20px);display:none;transform-origin:50% 100%;}div.swiper-axis-content div.swiper-axis-vice-title::after{transform:scale(0.9);border-bottom-color:white;top:-19px;}div.swiper-axis-content:hover div.swiper-axis-vice-title::after,div.swiper-axis-content:hover div.swiper-axis-vice-title::before{display:block;}div.swiper-axis-content:hover div.swiper-axis-vice-title::before{}.swiper-btn:focus{outline:none !important;}.swiper-btn{position:absolute !important;width:1.6em;height:1.6em;border:solid #ccc;border-width:2px 2px 0px 0px;top:calc(1rem + 1em) !important;z-index:99999;background:transparent;transition:all 0.3s;opacity:0;}.swiper-axis-container .swiper-left-btn{left:5px;transform:rotate(-135deg);}.swiper-axis-container:hover .swiper-left-btn{animation:swiperToRight 0.8s cubic-bezier(0.42,0,0.39,2.05);opacity:1;}.swiper-axis-container .swiper-right-btn{transform:rotate(45deg);right:5px;}.swiper-axis-container:hover .swiper-right-btn{opacity:1;animation:swiperToLeft 0.8s cubic-bezier(0.42,0,0.39,2.05);}@keyframes swiperToRight{0%{left:10px;opacity:0.5;}100%{left:5px;opacity:1;}}@keyframes swiperToLeft{0%{right:10px;opacity:0.5;}100%{right:5px;opacity:1;}}.swiper-btn.align-vice{top:calc(1.2rem + 4.8em ) !important;}.swiper-btn:hover{border-color:#555;cursor:pointer;}.swiper-left-btn:hover{left:5px;}.swiper-right-btn:hover{right:5px;}.swiper-axis-container.vertical-align{padding:0px 0px;}.swiper-axis-container.vertical-align .swiper-object{display:block;width:auto;}div.swiper-axis-container.vertical-align::before,div.swiper-axis-container.vertical-align::after{content:"";position:absolute;width:100%;height:10px;display:block;top:0;z-index:9999;display:none;}div.swiper-axis-container.vertical-align .swiper-right-btn{opacity:1;animation:none;border-width:0px 2px 2px 0px;width:10px;height:15px;left:calc(50% - 7px);bottom:7px;right:unset;top:unset !important;box-shadow:none !important;}div.swiper-axis-container.vertical-align .swiper-left-btn{opacity:1;animation:none;border-width:0px 2px 2px 0px;width:10px;height:15px;left:calc(50% - 7px);top:7px !important;right:unset;bottom:unset !important;box-shadow:none !important;}'+'</style>')
        }
        $(this).each(function(){
            let options={
                view:2,//0 1 2 3 4 5 6 7 表示 年 月 日 周 季 时 分 秒
                startDate:'2014-01-01 00:00:00',
                endDate:(new Date()).Format("yyyy-mm-dd hh:ii:ss"),
                onDateChange:function(value,lastValue){

                },
                parent:'body',
                positionFixed:false
            };
            options=$.extend(options,inOptions);
            //这里采用eval是为了方便动态去判断parent;如果parent要动态的或者传递jquery对象可以把注释打开；
            // options['parent']=eval(options['parent']);
            let format='yyyy-mm-dd hh:ii:ss';
            let _this=$(this).addClass('date-time-picker').attr('readonly',true);
            let value=_this.val()==''?(new Date()).Format("yyyy-mm-dd hh:ii:ss"):_this.val(),valueToDate=value.toDate(format);
            let year=valueToDate.getFullYear(),month=(valueToDate.getMonth()+1),day=valueToDate.getDate(),hour=valueToDate.getHours(),minute=valueToDate.getMinutes(),second=valueToDate.getSeconds(),maxYear,maxMonth,maxDay,maxHour,maxMinute,maxSecond,minYear,minMonth,minDay,minHour,minMinute,minSecond;
            //doms
            let _bg=$(document.createElement('div')).addClass('my-date-picker-bg'),
                _container=$("<div class='my-date-picker-container date-view-"+options['view']+" '></div>").attr('tabindex','-1'),
                _content=$("<div class='my-date-picker-content'></div>"),
                _yearPanel=$("<div class='my-date-picker-panel year-panel'></div>"),
                _monthPanel=$("<div class='my-date-picker-panel month-panel'></div>"),
                _dayPanel=$("<div class='my-date-picker-panel day-panel'></div>"),
                _hourPanel=$("<div class='my-date-picker-panel hour-panel'></div>"),
                _minutePanel=$("<div class='my-date-picker-panel minute-panel'></div>"),
                _secondPanel=$("<div class='my-date-picker-panel second-panel'></div>");
            let _yearUl,_monthUl,_dayUl,_hourUl,_minuteUl,_secondUl;
            let _operatorContainer;
            //initDom params
            let basePanelHtml='<div class="my-date-picker-panel-body"><ul class="date-picker-ul"></ul></div><div class="my-date-picker-panel-header"><span class="date-title">{dateTitle}</span></div><button class="date-picker-btn increase-btn" type="button"></button><button class="date-picker-btn decrease-btn" type="button"></button>';
            let targetPanels=['_yearPanel','_monthPanel','_dayPanel','_hourPanel','_minutePanel','_secondPanel'];
            let targetUls=['_yearUl','_monthUl','_dayUl','_hourUl','_minuteUl','_secondUl'];
            let dateTitles=['年','月','日','时','分','秒'];
 
            // process
            initDom();
            fixDate();//保留部分日期（格式合法 且 在区间 内）
            initSwiperAxis();
            bindListen();
            // api
            _this[0].resetDatePicker=function(inOptions){
                let prevView=options['view'];
                options=$.extend(options,inOptions);
                _container.removeClass('date-view-'+prevView).addClass('date-view-'+options['view']);
                initDom();
                fixDate();
                initSwiperAxis();
                swipeDateToValue();
            };


            function initDom(){
                if($(options['parent']).css('position')=='static'){
                    $(options['parent']).css('position','relative');
                }
                _content.html('');
                _container.html('<div class="operator-container"></div>').append(_content);
                if(_bg.html()==''){
                    _bg.html(_container);
                };
                if(options['positionFixed']==true){
                    _bg.addClass('date-picker-fixed');
                }else{
                    _bg.removeClass('date-picker-fixed');
                }
                //计算实际的最大/最小年月日时分秒;
                fixDateLimit();
                // title
                _operatorContainer=_container.children('.operator-container');
                let functions=[
                    [0],                  //year
                    [0,1],        //month
                    [0,1,2],//day
                    [0,1,2],//week
                    [0,1],        //season
                    [0,1,2,3],//hour
                    [0,1,2,3,4],//minute
                    [0,1,2,3,4,5],//second
                ];
                for(var i in functions[options['view']]){
                   initDate(functions[options['view']][i]);
                };
            }
            //index 0 1 2 3 4 5  年月日时分秒
            function initDate(index){
                let startValues=[minYear,1,1,0,0,0];
                let endValues=[maxYear,12,31,23,59,59];
                let _targetPanel=eval(targetPanels[index]).html(basePanelHtml.replace('{dateTitle}',dateTitles[index]));
                let startValue=startValues[index],endValue=endValues[index];
                eval(targetUls[index]+" =  _targetPanel.find('ul.date-picker-ul') ");
                let _targetUl=eval(targetUls[index]);
                while(startValue<=endValue){
                    _targetUl.append('<li date-value='+startValue+'>'+startValue+'</li>');
                    startValue++;
                }
                _content.append(_targetPanel);
            }


            function initSwiperAxis(){
                _container.find('div.my-date-picker-panel-body').each(function(){
                    let _body=$(this);
                    let _ul=$(this).find('ul');
                    let _span=$(this).parent().find('span.date-title');
                    let timeFunc;
                    $(this).swiperAxis({
                        direction:'vertical',
                        scrollSpeed:function(){
                            return  _ul.children('li:visible').outerHeight();;
                        },
                        scrollFrame:5,
                        clickFrame:3,
                        moveSpeed:function(){
                            return _ul.children('li:visible').outerHeight();
                        },
                        fixLimit:function(){
                            let liHeight=_span.outerHeight();
                            //限制
                            let correctMax=_span.offset()['top']-_ul.offset()['top']+_body[0].getX();
                            let correctMin=_span.offset()['top']-_ul.offset()['top']-_ul.outerHeight()+liHeight+_body[0].getX();
                            let minX=correctMin-liHeight;
                            let maxX=correctMax+liHeight;
                            return {
                                correctMin:correctMin,
                                correctMax:correctMax,
                                maxX:maxX,
                                minX:minX
                            }
                        },
                        resize:function(e){
                            return false;
                        },
                        afterMove:function(isTrusted){
                            // let diff=_span.offset()['top']-_ul.offset()['top'];
                            isTrusted=arguments[0]||arguments[0]===false?arguments[0]:true;
                            clearTimeout(timeFunc);
                            if(!isTrusted||_body[0].mousedown||!_container.is(':visible')){
                                return 0;
                            }
                            _body[0].rafCount++;
                            //更新日期
                            timeFunc=setTimeout(function(signal){
                                if(signal<_body[0].rafCount||!_container.is(':visible')){
                                    return true;
                                }
                                _body[0].rafCount++;
                                let diff=_span.offset()['top']-_ul.offset()['top'];
                                let index= Math.floor(diff/_ul.children('li:visible').outerHeight());
                                let offset= diff%_ul.children('li:visible').outerHeight()>_ul.children('li:visible').outerHeight()/2?1:0;
                                index+=offset;
                                index=Math.max(0,Math.min(index,_ul.children('li:visible').length-1));
                                if(_ul.children('li:visible:eq('+index+')').length==0){
                                    return true;
                                }
                                let distance=_body[0].getX()+_span.offset()['top']-_ul.children('li:visible:eq('+index+')').offset()['top'];
                                _body[0].swiperTo(distance,{frame:10,useRaf:true});
                                updateDateByDistance();
                            },20,_body[0].rafCount);
                            let updateDateByDistance=function(){
                                let diff=_span.offset()['top']-_ul.offset()['top'];
                                let index= Math.floor(diff/_ul.children('li:visible').outerHeight());
                                let offset= diff%_ul.children('li:visible').outerHeight()>_ul.children('li:visible').outerHeight()/2?1:0;
                                index+=offset;
                                index=Math.max(0,Math.min(_ul.children('li:visible').length-1,index));
                                let _panel=_body.parent();
                                let dateValue=parseInt(_ul.children('li:visible:eq('+index+')').attr('date-value'));
                                let viewIndex=0;
                                if(_panel.hasClass('year-panel')){
                                    year=dateValue;
                                    viewIndex=0;
                                }else if(_panel.hasClass('month-panel')){
                                    month=dateValue;
                                    viewIndex=1;
                                }else if(_panel.hasClass('day-panel')){
                                    day=dateValue;
                                    viewIndex=2;
                                }else if(_panel.hasClass('hour-panel')){
                                    hour=dateValue;
                                    viewIndex=3;
                                }else if(_panel.hasClass('minute-panel')){
                                    minute=dateValue;
                                    viewIndex=4;
                                }else if(_panel.hasClass('second-panel')){
                                    second=dateValue;
                                    viewIndex=5;
                                } 
                                fixDate();
                                resetSwiper(viewIndex);
                                swipeDateToValue();
                            }
                        },
                    });
                }); 
            }


            function bindListen(){
                let focus=false;
                let hover=false;
                function timeoutFunc(){
                    setTimeout(function(){
                        if(!focus&&!hover&&_this[0].datepickerDebug!=true){
                            _this.removeClass('date-picker-focus');
                            _bg.detach();
                        }
                    },100);
                }
                _this.on('focus',function(){
                    //初始化value
                    _this.val()==''?(new Date()).Format("yyyy-mm-dd hh:ii:ss"):_this.val();
                    _this.addClass('date-picker-focus');
                    focus=true;
                    if(_container.is(':visible')) return true;
                    _container.css({
                        top:_this.offset()['top']+_this.outerHeight()+4-$(options['parent']).offset()['top'],
                        left:_this.offset()['left']-$(options['parent']).offset()['left'],
                    });
                    _content.css({ width:_this.outerWidth(),});
                    $(options['parent']).append(_bg);
                    resetSwiper();
                    //移动到指定日期
                    swipeDateToValue();
                });
                _container.on('mouseover',function(){
                    hover=true;
                })
                _this.on('blur',function(){
                    focus=false;
                    timeoutFunc();
                });
                _container.on('mouseout',function(){
                    hover=false;
                    _this.focus();
                    timeoutFunc();
                });
                _container.delegate('button.date-picker-btn','click',function(e){
                    let _btn=$(this);
                    if(_btn.hasClass('decrease-btn')){
                        _btn.parent().children('div.my-date-picker-panel-body')[0].swiperLeftBtn.click();
                    }else{
                        _btn.parent().children('div.my-date-picker-panel-body')[0].swiperRightBtn.click();
                    }
                });
                _container.delegate('div.my-date-picker-panel-body','mouseover',function(){
                    this.alignSwiper();
                });
            }

            function resetSwiper(viewIndex){
                viewIndex=arguments[0]==undefined?-1:arguments[0];
                if(viewIndex>=0){
                    _container.find('div.my-date-picker-panel-body')[viewIndex].reset();
                }else{
                    _container.find('div.my-date-picker-panel-body').each(function(){
                        this.reset();
                    });
                }

            }

            /**
             * 移动到value对应的日期
             */
            function swipeDateToValue(){
                let fixFunctions=[
                    [0],            //year
                    [0,1],          //month
                    [0,1,2],        //day
                    [0,1,2],        //week
                    [0,1],          //season
                    [0,1,2,3],      //hour
                    [0,1,2,3,4],    //minute
                    [0,1,2,3,4,5]   //second
                ];
                value=_this.val();
                for(var i in fixFunctions[options['view']]){
                    swipe(fixFunctions[options['view']][i]);
                }
                function swipe(index){
                    let _body=eval(targetPanels[index]+".children('div.my-date-picker-panel-body')");
                    let _span=eval(targetPanels[index]+".find('span.date-title')");      
                    let values=[year,month,day,hour,minute,second];
                    let _li=_body.find('ul li[date-value='+values[index]+']');
                    if(_li.length==0){
                        return true;
                    }
                    let distance=_span.offset()['top']-_li.offset()['top']+_body[0].getX();
                    _body[0].swiperTo(distance);
                }
            }


           /**
            * 检查不符合要求的日期
            */ 
            function fixDate(){
                let fixFunctions=[
                    [fixYear],                                              //year
                    [fixYear,fixMonth],                                     //month
                    [fixYear,fixMonth,fixDay],                              //day
                    [fixYear,fixMonth,fixDay],                              //week
                    [fixYear,fixMonth],                                     //season
                    [fixYear,fixMonth,fixDay,fixHour],                      //hour
                    [fixYear,fixMonth,fixDay,fixHour,fixMinute],            //minute
                    [fixYear,fixMonth,fixDay,fixHour,fixMinute,fixSecond]   //second
                ];
                let times=[];
                let weeks=['周日','周一','周二','周三','周四','周五','周六'];
                for(var i in fixFunctions[options['view']]){
                    times.push(fixFunctions[options['view']][i]());
                }
                value=[times.slice(0,3).join('-'),times.slice(3).join(':')].join(' ');
                _this.val(value);
                if(options['view']!=4){
                    let dateText=value+(options['view']>=2?("  "+weeks[value.toDate(format).getDay()]):'');
                    _operatorContainer.html("<span class='date-title'>"+dateText+"</span>") ;
                }else{
                    let seasonText=['一季度','二季度','三季度','四季度'][(month-1)/3]
                    _operatorContainer.html("<span class='date-title'>"+ year + "  " + seasonText +"</span>") ;
                }
            }

            function fixDateLimit(){
                let startDate=options['startDate'].toDate(format);
                let endDate=options['endDate'].toDate(format);
                switch(options['view']){
                    case 3:
                        //周 判断endDate所在月是否有周一没有则endDate前移一个月
                        if(endDate.getLastMonday()<0){
                            endDate=new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getLastMonday());
                        }
                        //startDate调整为前一个周一
                        startDate=new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getLastMonday());
                        break;
                    case 4:
                        //季度 将startDate endDate改变成他们所在的季度的开始的那一个月 
                        endDate=new Date(endDate.getFullYear(),endDate.getMonth()-endDate.getMonth()%3,1);
                        break;
                }
                startDate=new Date(Math.min(startDate,endDate));
                maxYear=endDate.getFullYear();
                minYear=startDate.getFullYear();
                minDay=startDate.getDate();
                maxDay=endDate.getDate();
                maxMonth=endDate.getMonth()+1;
                minMonth=startDate.getMonth()+1;
                maxHour=endDate.getHours();
                minHour=startDate.getHours();
                maxMinute=endDate.getMinutes();
                minMinute=startDate.getMinutes();
                maxSecond=endDate.getSeconds();
                minSecond=startDate.getSeconds();
            }

            function fixYear(){
                if(_yearPanel.parent().length==0){
                    return true;
                }
                year=Math.min(maxYear,Math.max(minYear,year));
                return year;
            }
            function fixMonth(){
                if(_monthPanel.parent().length==0){
                    return true;
                }
                if(year==maxYear){
                    month=Math.min(month,maxMonth);
                } 
                if(year==minYear){
                    month=Math.max(month,minMonth);
                }
                if(options['view']==4){
                    month=month-(month-1)%3;
                }
                _monthUl.children('li').each(function(){
                    let _li=$(this);
                    let tempMonthText=_li.attr('date-value').length==1?('0'+_li.attr('date-value')):_li.attr('date-value');
                    let dateText=year+'-'+tempMonthText;
                    if(checkMonth(dateText)){
                       _li.css('display',''); 
                    }else{
                        _li.hide();
                    }
                    //季度，只取 1 4 7 10 每个季度开始月
                    if(options['view']==4&&new Date(dateText).getMonth()%3!=0){
                        _li.css('display','none');
                    }
                });
                return month<10?('0'+month):month;
            }
            function fixDay(){
                if(_dayPanel.parent().length==0){
                    return true;
                }
                if(year==maxYear&&month==maxMonth){
                    day=Math.min(day,maxDay);
                }
                if(year==minYear&&month==minMonth){
                    day=Math.max(day,minDay);
                }
                day=Math.min(day,getLastDay(year+'-' + (month<10?('0'+month):month) + '-01'));
                switch(options['view']){
                    case 3:
                        //week 取上一个周一
                        day=new Date(year,month-1,day).getLastMonday();
                        //获取本月第一个周一
                        if(day<=0){
                            day=new Date(year,month-1,1).getNextMonday();
                        }
                        break;
                    case 4:
                        //season
                        day=1;
                        break;
                }
                _dayUl.children('li').each(function(){
                    let _li=$(this);
                    let tempDayText=_li.attr('date-value').length==1?('0'+_li.attr('date-value')):_li.attr('date-value');
                    let tempMonthText=month<10?('0'+month):month;
                    let tempDateText=year+'-'+tempMonthText+'-'+tempDayText;
                    //day
                    if(checkDate(year+'-'+tempMonthText+'-'+tempDayText)){
                        _li.css('display',''); 
                     }else{
                         _li.hide();
                     }
                    //week 和 season week 只显示每周 的周一 季度只显示该月第一天 
                    switch(options['view']){
                        case 3:
                            //week
                            if(new Date(tempDateText).getDay()!=1){  
                                _li.hide();
                            }
                            break;
                        case 4:
                            //season
                            if(tempDayText!='01'){
                                _li.hide();   
                            }
                            break;
                    }
                });
                return day<10?('0'+day):day;
            }
            function fixHour(){
                if(_hourPanel.parent().length==0){
                    return true;
                }
                if(Date.parse(new Date(year,month-1,day))==Date.parse(new Date(maxYear,maxMonth-1,maxDay))){
                    hour=Math.min(hour,maxHour);
                }else if(Date.parse(new Date(year,month-1,day))==Date.parse(new Date(minYear,minMonth-1,minDay))){
                    hour=Math.max(hour,minHour);
                }
                _hourUl.children('li').each(function(){
                    $(this).css('display',checkHour(new Date(year,month-1,day,parseInt($(this).attr('date-value'))))?'':'none');
                });
                return hour<10?('0'+hour):hour;
            }
            function fixMinute(){
                if(_minutePanel.parent().length==0){
                    return true;
                }
                if(Date.parse(new Date(year,month-1,day,hour))==Date.parse(new Date(maxYear,maxMonth-1,maxDay,hour))){
                    minute=Math.min(minute,maxMinute);
                }else if(Date.parse(new Date(year,month-1,day,hour))==Date.parse(new Date(minYear,minMonth-1,minDay,hour))){
                    minute=Math.max(minute,minMinute);
                }
                _minuteUl.children('li').each(function(){
                    $(this).css('display',checkMinute(new Date(year,month-1,day,hour,parseInt($(this).attr('date-value'))))?'':'none');
                });
                return minute<10?('0'+minute):minute;
            }
            function fixSecond(){
                if(_secondPanel.parent().length==0){
                    return true;
                }
                if(Date.parse(new Date(year,month-1,day,hour,minute))==Date.parse(new Date(maxYear,maxMonth-1,maxDay,hour,minute))){
                    second=Math.min(second,maxSecond);
                }else if(Date.parse(new Date(year,month-1,day,hour,minute))==Date.parse(new Date(minYear,minMonth-1,minDay,hour,minute))){
                    second=Math.max(second,minSecond);
                }
                _secondUl.children('li').each(function(){
                    $(this).css('display',checkSecond(new Date(year,month-1,day,hour,minute,parseInt($(this).attr('date-value'))))?'':'none');
                });
                return second<10?('0'+second):second;
            }


            function checkDate(date){
                date=typeof date=='string'?date:date.Format(format);
                let parseDate=date.toDate(format);
                let startDate=new Date(minYear,minMonth-1,minDay);
                let endDate=new Date(maxYear,maxMonth-1,maxDay);
                return checkDayLegal(date.slice(0,10))&&Date.parse(parseDate)>=Date.parse(startDate)&&Date.parse(parseDate)<=Date.parse(endDate);
            }

            function checkMonth(date){
                let startDate=new Date(minYear,minMonth-1,1);//取当月第一天
                let endDate=new Date(maxYear,maxMonth-1,1);//取当月第一天
                return Date.parse(date.toDate())>=Date.parse(startDate)&&Date.parse(date.toDate())<=Date.parse(endDate);
            }
            function checkHour(date){
                date=typeof date=='string'?date:date.Format(format);
                let parseDate=date.toDate(format);
                let startDate=new Date(minYear,minMonth-1,minDay,minHour);
                let endDate=new Date(maxYear,maxMonth-1,maxDay,maxHour);
                return Date.parse(parseDate)>=Date.parse(startDate)&&Date.parse(parseDate)<=Date.parse(endDate);
            }
            function checkMinute(date){
                date=typeof date=='string'?date:date.Format(format);
                let parseDate=date.toDate(format);
                let startDate=new Date(minYear,minMonth-1,minDay,minHour,minMinute);
                let endDate=new Date(maxYear,maxMonth-1,maxDay,maxHour,maxMinute);
                return Date.parse(parseDate)>=Date.parse(startDate)&&Date.parse(parseDate)<=Date.parse(endDate);
            }
            function checkSecond(date){
                date=typeof date=='string'?date:date.Format(format);
                let parseDate=date.toDate(format);
                let startDate=new Date(minYear,minMonth-1,minDay,minHour,minMinute,minSecond);
                let endDate=new Date(maxYear,maxMonth-1,maxDay,maxHour,maxMinute,maxSecond);
                return Date.parse(parseDate)>=Date.parse(startDate)&&Date.parse(parseDate)<=Date.parse(endDate);
            }
                

            /**
             * 检查日是否合法
             */
            function checkDayLegal(date){

                return (date.toDate(format).getDate()==parseInt(date.substring(date.length-2)))
            }

            /**
             * get last day of the month
             */
            function getLastDay(str){
                let tempDate=new Date(str);
                tempDate.setMonth(tempDate.getMonth()+1);
                tempDate.setDate(0);
                let lastDay=tempDate.getDate();   
                return lastDay;       
            }

        });
    };
}(jQuery));




Date.prototype.Format = function (fmt) { 
    fmt=arguments[0]?arguments[0]:"yyyy-mm-dd";
    var o = {
        "m+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "i+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
    };
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    } 
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        } 
    }
  
    return fmt;
}

Date.prototype.getLastMonday=function(){
    let day=this.getDate();
    let week=this.getDay();
    let monday=day-((week==0?7:(week%7))-1);
    //返回值<=0表示在上一个月
    return monday;
}
Date.prototype.getNextMonday=function(){
    let day=this.getDate();
    let week=this.getDay();
    let monday=day + (8-week)%7;
    return monday;
}


String.prototype.toDate = function (fmt){
    fmt=arguments[0]?arguments[0]:"yyyy-mm-dd";
    var o = ["y+","m+","d+","h+","i+","s+"];
    var times=[];
    let now=new Date();
    for( var i in o){
        reg=new RegExp("("+o[i]+")");
        let time='';
        if(reg.test(fmt)){
            time=this.substr(fmt.match(reg)['index'],RegExp.$1.length);
        }
        if(time==''){
            time=(i==0?now.getFullYear():(i<=2?'01':'00'));
        }
        times.push(time);
    }
    //safari不兼容 2019-10-10 只能2019/10/10
    return new Date([times.slice(0,3).join('/'),times.slice(3).join(':')].join(' '));
}