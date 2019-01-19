(function($){"use strict";$.ajaxChimp={responses:{"We have sent you a confirmation email":0,"Please enter a value":1,"An email address must contain a single @":2,"The domain portion of the email address is invalid (the portion after the @: )":3,"The username portion of the email address is invalid (the portion before the @: )":4,"This email address looks fake or invalid. Please enter a real email address":5},translations:{en:null},init:function(selector,options){$(selector).ajaxChimp(options)}};$.fn.ajaxChimp=function(options){$(this).each(function(i,elem){var form=$(elem);var email=form.find("input[type=email]");var label=form.find("label[for="+email.attr("id")+"]");var settings=$.extend({url:form.attr("action"),language:"en"},options);var url=settings.url.replace("/post?","/post-json?").concat("&c=?");form.attr("novalidate","true");email.attr("name","EMAIL");form.submit(function(){var msg;function successCallback(resp){if(resp.result==="success"){msg="We have sent you a confirmation email";label.removeClass("error").addClass("valid");email.removeClass("error").addClass("valid")}else{email.removeClass("valid").addClass("error");label.removeClass("valid").addClass("error");var index=-1;try{var parts=resp.msg.split(" - ",2);if(parts[1]===undefined){msg=resp.msg}else{var i=parseInt(parts[0],10);if(i.toString()===parts[0]){index=parts[0];msg=parts[1]}else{index=-1;msg=resp.msg}}}catch(e){index=-1;msg=resp.msg}}if(settings.language!=="en"&&$.ajaxChimp.responses[msg]!==undefined&&$.ajaxChimp.translations&&$.ajaxChimp.translations[settings.language]&&$.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]){msg=$.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]}label.html(msg);label.show(2e3);if(settings.callback){settings.callback(resp)}}var data={};var dataArray=form.serializeArray();$.each(dataArray,function(index,item){data[item.name]=item.value});$.ajax({url:url,data:data,success:successCallback,dataType:"jsonp",error:function(resp,text){console.log("mailchimp ajax submit error: "+text)}});var submitMsg="Submitting...";if(settings.language!=="en"&&$.ajaxChimp.translations&&$.ajaxChimp.translations[settings.language]&&$.ajaxChimp.translations[settings.language]["submit"]){submitMsg=$.ajaxChimp.translations[settings.language]["submit"]}label.html(submitMsg).show(2e3);return false})});return this}})(jQuery);$(document).ready(function(){$('header nav ul li a').click(function(event){event.preventDefault();var section=$(this).attr('href');var section_pos=$(section).position();if(section_pos){$(window).scrollTo({top:section_pos.top,left:'0px'},1000);}});$('.app_link').click(function(e){event.preventDefault();$(window).scrollTo({top:$("#hero").position().top,left:'0px'},1000);});$('.burger_icon').click(function(){$('header nav').toggleClass('show');$('header .burger_icon').toggleClass('active');});wow=new WOW({animateClass:'animated',mobile:false,offset:50});wow.init();$('.hero').parallax("50%",0.3);$("html").niceScroll({scrollspeed:50,autohidemode:false,cursorwidth:8,cursorborderradius:8,cursorborder:"0",background:"rgba(48, 48, 48, .4)",cursorcolor:'#1f1f1f',zindex:999});$("#tslider").owlCarousel({items:1,navigation:true,pagination:false,slideSpeed:300,paginationSpeed:400,singleItem:true,responsive:true,autoPlay:true,transitionStyle:"fade"});$('#submit_form').submit(function(){$('#mc_submit').attr('disabled','disabled');processing('icon','loading');});if($('#submit_form').length){$('#submit_form').ajaxChimp({callback:chimpResponce});}
function chimpResponce(resp){if(resp.result==='success'){processing('loading','icon');$('#mc_submit').removeAttr('disabled','disabled');$('#submit_form #mc-email').val('');$('#error_msg').hide();$('#success_msg').show();}else{processing('loading','icon');$('#success_msg').hide();$('#error_msg').show();$('#mc_submit').removeAttr('disabled','disabled');}}
function processing(hide,show){$('#mc_submit i').removeClass(hide).addClass(show);}
$('#play_video').click(function(e){e.preventDefault();var video_link=$(this).data('video');video_link='<iframe src="'+video_link+'" width="500" height="208" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';$('.about_video').append(video_link).fadeIn(200);});$('.close_video').click(function(e){e.preventDefault();$('.about_video').fadeOut(200,function(){$('iframe',this).remove();});});});(function($){var $window=$(window);var windowHeight=$window.height();$window.resize(function(){windowHeight=$window.height();});$.fn.parallax=function(xpos,speedFactor,outerHeight){var $this=$(this);var getHeight;var firstTop;var paddingTop=0;$this.each(function(){firstTop=$this.offset().top;});if(outerHeight){getHeight=function(jqo){return jqo.outerHeight(true);};}else{getHeight=function(jqo){return jqo.height();};}
if(arguments.length<1||xpos===null)xpos="50%";if(arguments.length<2||speedFactor===null)speedFactor=0.1;if(arguments.length<3||outerHeight===null)outerHeight=true;function update(){var pos=$window.scrollTop();$this.each(function(){var $element=$(this);var top=$element.offset().top;var height=getHeight($element);if(top+height<pos||top>pos+windowHeight){return;}
$this.css('backgroundPosition',xpos+" "+Math.round((firstTop-pos)*speedFactor)+"px");});}
$window.bind('scroll',update).resize(update);update();};})(jQuery);