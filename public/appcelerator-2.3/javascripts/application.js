$MQL('l:app.compiled',function(type,msg,datatype,from) {
    APP_TIMERS.DOM_LOADED = new Date();
});
$MQL('l:mixed.loaded then execute',function(type,msg,datatype,from) {
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
$MQL('l:votes.loaded',function(type,msg,datatype,from) {
  var items = ''+ Appcelerator.Parameters.get('items');
  if (items=='')
    $MQ('r:get.votes.request');
  else
    $MQ('r:get.votes.request',{items:items});
});
