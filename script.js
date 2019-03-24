$(document).ready(function(){
     
  var arr = ["skp","skp1","skp2","skp3","skp4"]; // List of users
 
 $('.msg_head').click(function(){  
  var chatbox = $(this).parents().attr("rel") ;
  $('[rel="'+chatbox+'"] .msg_wrap').slideToggle('slow');
  return false;
 });
 
 $('.close').click(function(){
  
  var chatbox = $(this).parents().parents().attr("rel") ;
  $('[rel="'+chatbox+'"]').hide();
  //update require
  arr.splice($.inArray(chatbox, arr),1);
  i = 50 ; // start position
  j = 260;  //next position
  $.each( arr, function( index, value ) {          
       $('[rel="'+value+'"]').css("right",i);
    i = i+j;
        });
  
  return false;
 });

 $.extend({aa:function(input_value){
         var settings = {
             "async": false,
             "crossDomain": true,
             "url": "https://qna-testd.azurewebsites.net/qnamaker/knowledgebases/a2ffa6da-3a8a-4405-bd67-5fd23e6bb79a/generateAnswer",
             "method": "POST",
             "headers": {
                 "Authorization": "EndpointKey 4ceea476-1e24-455e-92d9-f5135d3ee7a3",
                 "Content-Type": "application/json",
                 "cache-control": "no-cache",
                 "Postman-Token": "3bd57ef1-8a68-47ed-9f06-4c4a2e14314d"
             },
             "processData": false,
             "data": JSON.stringify({"question": "<"+input_value+">"})
         };
         var return_value;
         $.ajax(settings).done(function (response) {
             console.log(response.answers[0].answer);
             return_value = response.answers[0].answer;
         });
         return return_value;
     }});

    function bb(question)
    {
        var return_value;
        var reg1=new RegExp(" ","g");
        var reg2=new RegExp(/\?/,"g");
        var newStr = question.replace(reg1, "+")
        newStr = newStr.replace(reg2, "%3f")
        var s_url = "http://api.wolframalpha.com/v1/result?appid=WWU3PE-X7YYLRGE3W&i="+newStr;
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                return_value=xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET",s_url,false);
        xmlhttp.send();
        return return_value;
    }
 
 $('#question_1').keypress(
    function(e){     
   
        if (e.keyCode == 13) {
            var msg = $(this).val();   
   $(this).val('');
   if(msg.trim().length != 0){    
   var chatbox = $(this).parents().parents().parents().attr("rel") ;
   $('<div class="msg-right">'+msg+'</div>').insertBefore('[rel="'+chatbox+'"] .msg_push');
   var answer = $.aa(msg);
   console.log(answer);
   $('<div class="msg-left">'+answer+'</div>').insertBefore('[rel="'+chatbox+'"] .msg_push');
   speak(answer);
   $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
   }
        }
    });

    $('#question_2').keypress(
        function(e){

            if (e.keyCode == 13) {
                var msg = $(this).val();
                $(this).val('');
                if(msg.trim().length != 0){
                    var chatbox = $(this).parents().parents().parents().attr("rel") ;
                    $('<div class="msg-right">'+msg+'</div>').insertBefore('[rel="'+chatbox+'"] .msg_push');
                    var answer = bb(msg);
                    console.log(answer);
                    $('<div class="msg-left">'+answer+'</div>').insertBefore('[rel="'+chatbox+'"] .msg_push');
                    speak(answer);
                    $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
                }
            }
        });
 
});

