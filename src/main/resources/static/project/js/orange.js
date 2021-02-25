(function() {
	'use strict';
	
	define('orange', ['jquery','ajaxUtil','urlUtil','modalUtil','bootstrapBundle'], function($,ajaxUtil,urlUtil,modalUtil) {
		// $('#systemMasking').modal({backdrop: "static"});





		var _appConfig = {	//	应用默认配置
			getAppContextServiceUrl: 'api/pms/getAppContext',
			indexUrl: '../project/js/index'
		};

		var _appContext = {
			user: null,
			organization:null,
			role:null
		};
		

		function _bindAppContext(getAppContextServiceUrl, _renderIndex) {
			if(_renderIndex != undefined){
				_renderIndex();
			}
		}

		//	清空应用上下文
		function clearAppContext() {
			for(var i in _appContext) {
				_appContext[i] = undefined;
			}
		}

		
		//	启动应用
		function start() {
			_bindAppContext(_appConfig.getAppContextServiceUrl, _renderIndex);
		}
		
		//	重启应用
		function restart() {
			stop();
			start();
		}
		
		//	停止应用
		function stop() {
			sessionStorage.clear();	//	清空会话缓存
			clearAppContext();	//	重置应用上下文
		}

        function isContains(str, substr) {
            return new RegExp(substr).test(str);
        }

		
		//	渲染应用首页
		function _renderIndex() {
			$('#main_logger').append('<p><h3> >> 应用上下文加载完毕，开始渲染首页 ...</h3></p>');
			setTimeout(function() {
				require([_appConfig.indexUrl]);
			}, '500');
		}
		
		//	加载样式文件
		//	href(String): 样式文件远程地址
		function _loadCss(href) {
			var aLinks = $('head link'), i=0, len = aLinks.length;
			for(i=0; i<len; i++) {
				if(aLinks[i].href == href) {
					return;
				}
			}
			$('<link>').attr({ rel: 'stylesheet', type: 'text/css', href: href }).appendTo('HEAD');
		}
		
		//	加载脚本文件
		//	url(String): 脚本文件远程地址
		function _loadScript(url) {
			$.getScript(url);
		}
		
		//	加载远程内容到指定页面
		//	params(Object): {url(String): 远程加载地址, target(String): 被加载元素的ID, selector(String): 页面选择器, 
		//	replace(true/false): 是否替换原有内容, success(Function): 加载成功回调函数}
		function loadPage(params) {
			if(params && typeof params === 'object') {
				var url = params['url'], target = params['target']?$('#'+ params['target']) : $('BODY'), selector = params['selector'], 
						data = params['data'], type = data?'POST' : 'GET', replace = params['replace'] === false?false : true, callback = undefined;
				callback = (params['success'] && typeof params['success'] === 'function')?callback = params['success'] : callback;
				if(typeof url !== 'string' || !url) {
					throw new Error('加载远程内容到指定页面失败，地址参数非法');
				} else {
					if(replace) {
						target.empty();
					}
					$.ajax({
						async: true,
						url: 'system/getPage.service?path=' + url,
						type: type,
						data: data,
						dataType: 'html'
					}).done(function(responseText) {
						if(target.children.length == 0) { return; }
						var response = $.parseHTML(responseText, true), scripts = [];
						target.append(selector?$('<div>').append(response).find(selector):responseText);
						for(var i=0; i<response.length; i++) {
							if(response[i].nodeName == "LINK") {
								_loadCss(response[i].href);
							}else if(response[i].nodeName == "SCRIPT") {
								scripts.push(response[i].src);
							}
						}
						// for(var i=0; i<scripts.length; i++) {
						// 	_loadScript(scripts[i]);
						// }
						_loadScript("/project/js" + url + ".js");
					}).always(callback && function(responseText) {
						window.location.hash = url;
						callback.call(callback, responseText);
					});
				}
			} else {
				throw new Error('加载远程内容到指定页面失败，参数非法');
			}
		}

		//	全局异步请求发送处理
		$(document).ajaxSend(function(event, xhr, settings) {
			if(settings.url && settings.url.indexOf('?') != -1) {
				settings.url = settings.url.replace('?', '?' + Math.random() + '&');
			} else {
				settings.url += '?' + Math.random(); 
			}
		});

		// 页面跳转
		function redirect(url, jump = false) {
			$("#main_body").html("");
			loadPage({url: url, target: 'main_body', selector: '#fir_body', replace: true, success: function(data){
					if(data == null||data == ""){
						return alert(url+"加载失败");
					}
					$("#main_body").html(data);
					$('.modal-backdrop').remove();
					if(jump){
						var elementsByClassName = document.getElementsByClassName("card");
						elementsByClassName[0].children[0].classList.remove("active")
						for(var i = 0; i < elementsByClassName.length; i++){
							var child = elementsByClassName[i].children[1].children[0].children;
							for(var j = 0; j<child.length; j+=2){
								if(child[j].attributes["url"].value == url) {
									elementsByClassName[i].children[1].classList.add("show")
									child[j].classList.add("active")
									break;
								}
							}
						}
					}
			}})
		}


		return window.orange = {
			restart: restart,
			start: start,
			stop: stop,
			loadPage: loadPage,
			redirect: redirect
		};
	});
})();
