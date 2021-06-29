/**
*显示flash，避免IE的激活障碍
*@return nothing flash
*@parameter string movie FLASH文件地址
*@parameter int width FLASH宽
*@parameter int height FLASH高
*@parameter string param_name 调用参数名列表
*@parameter string param_value 调用参数名对应的值列表
*/
function flash(movie,width,height,param_name,param_value){
	var swf_html='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+width+'" height="'+height+'">';
	var params;
	swf_html+='<param name="movie" value="'+movie+'">';
	swf_html+='<param name="quality" value="high">';
	if(param_name!="" && param_value!=""){
		var name_arr=new Array();
		var value_arr=new Array();
		name_arr=param_name.split(",");
		value_arr=param_value.split(",");
		if(name_arr.length==value_arr.length){
			for(icount=0; icount<name_arr.length; icount++){
				swf_html+='<param name="'+name_arr[icount]+'" value="'+value_arr[icount]+'">';
				params+=' '+name_arr[icount]+'='+value_arr[icount];
			}
		}
	}
	swf_html+='<embed src="'+movie+'" width="'+width+'" height="'+height+'"'+params+' quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="opaque"></embed>';
	swf_html+='</object>';
	document.write(swf_html);
}

/**
*重定向函数
*@return nothing forword
*@parameter string url 重定向地址
*@parameter string target 目标
*/
function reforward(url,target){
	if(target=="_blank") window.open(url,'','');
	else window.location.href(url);
}

//设为首页
function setHome(obj){
	var sURL=document.location.href;
	try{
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage(sURL);
	}catch(e){
		if(window.netscape){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch(e){
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
			}
			var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',sURL);
		}else{
			alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+sURL+"点击确定。"); 
		}
	}
}

//加入收藏
function addFav(){
	var sURL=document.location.href;
	var sTitle=document.title;
	try{ 
		window.external.addFavorite(sURL,sTitle); 
	}catch(e){ 
		try{ 
			window.sidebar.addPanel(sTitle,sURL,""); 
		}catch(e){ 
			alert("加入收藏失败，请使用Ctrl+D进行添加"); 
		} 
	}
}