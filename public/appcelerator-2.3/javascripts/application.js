$MQL('l:app.compiled',function(type,msg,datatype,from) {
    APP_TIMERS.DOM_LOADED = new Date();
});
$MQL('l:mixed.loaded',function(type,msg,datatype,from) {
    APP_TIMERS.MIXED_RENDER = new Date();
    $MQ('l:load.big.file', {});
});
$MQL('l:big.file.loaded',function(type,msg,datatype,from) {
    APP_TIMERS.BIG_FILE_LOADED = new Date();
    $MQ('l:load.dynamic.big.file', {});
});
$MQL('l:dynamic.big.file.loaded',function(type,msg,datatype,from) {
    APP_TIMERS.BIG_DYNAMIC_FILE_LOADED = new Date();
    $MQ('l:load.crazy.big.file', {});
    APP_TIMERS.finish_test();
});

//votes.html content file
$MQL('r:get.votes.response',function(type,msg,datatype,from) {
  setTimeout(function(){
    $MQ('l:mixed.loaded');
  }, 5);
});
jQuery.extend({
 getURLParam: function(strParamName){
	  var strReturn = "";
	  var strHref = window.location.href;
	  var bFound=false;
	  
	  var cmpstring = strParamName + "=";
	  var cmplen = cmpstring.length;

	  if ( strHref.indexOf("?") > -1 ){
	    var strQueryString = strHref.substr(strHref.indexOf("?")+1);
	    var aQueryString = strQueryString.split("&");
	    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
	      if (aQueryString[iParam].substr(0,cmplen)==cmpstring){
	        var aParam = aQueryString[iParam].split("=");
	        strReturn = aParam[1];
	        bFound=true;
	        break;
	      }
	      
	    }
	  }
	  if (bFound==false) return null;
	  return strReturn;
	}
});

$MQL('l:votes.loaded',function(type,msg,datatype,from) {
  var items = $.getURLParam("items");
  if (items=='')
    $MQ('r:get.votes.request');
  else
    $MQ('r:get.votes.request',{items:items});
});