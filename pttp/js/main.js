

little_menu = $('#little_menu');
little_menu.css({
                     width:0,
                     height:0
             });

$(window).bind('scroll touchend',function(e) {
            var win = $(window),
                top = win.scrollTop(),
                little_menu = $('#little_menu');
                 console.log(top);        
            
            if (win.width() < 480) {
                little_menu.attr('style','');
                return;
            }

            if(top <= 120) {
                 little_menu.css({
                     width:0,
                     height:0
                 })
            }
            
           else if(top >= 120 && top <= 180) {
                /* side menu appear */
                little_menu.css({
                    width: 0 + top/3,
                    height : 0 + top/3 * 4
                  })     
           }
           else
            little_menu.css({    //Default Size for Sidemenu
                    width:40,
                    height:230
                  })  
            return;
           

        });
    

$(document).ready(function() {
    //Carousel Initialization
    $('.carousel').carousel({
        interval: 2000
    });
    //Initialization of Tooltips (bootstrap) for sidemenu
    $("#tool1").tooltip();
    $("#tool2").tooltip();
    $("#tool3").tooltip();
    $("#tool4").tooltip();
    $("#tool5").tooltip();
    
    //Smooth Scrolling
    
    var scrollDuration=500; /* Scroll Duration 1000 = 1 sec */
    var scrollBegin=0; /* Height between anchor the scroll */
    $('a.scroll').click(function(){
        if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){
            var $targetid=$(this.hash);
            $targetid=$targetid.length&&$targetid||$('[id='+this.hash.slice(1)+']');
            if($targetid.length){
                var targetOffset=$targetid.offset().top-scrollBegin;
                    $('html,body').animate({scrollTop:targetOffset},scrollDuration);
                    $("a").removeClass("active");
                    $(this).addClass("active");
            return false;
            }
        }
    });
    
            
            
});
