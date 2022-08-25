$(function(){
    
    var gridIncrement = $( ".setting-dial ul" ).css('line-height').replace('px', '')/2;
	var numNums = $( ".setting-dial:eq(0) ul li" ).length;
	var halfHeight = gridIncrement*numNums;
	var initTop = -(halfHeight-gridIncrement);
    var chars = "0123456789";
	
	$( ".setting-dial ul" ).css('top', initTop);
    
    $(".setting-dial").bind('mousewheel', function(e){
        var dragDir;
        if(e.originalEvent.wheelDelta /120 > 0) {
            scrollDown($(this), chars);
        }
        else{
            scrollUp($(this), chars);
        }
        
    });
    
    $(".setting-dial").click(function(e){
        var pHeight = $(this).innerHeight();
        var pOffset = $(this).offset(); 
        var x = e.pageY - pOffset.top;
        if(pHeight/2 > x)
        {
            scrollUp($(this), chars);
        }
        else
        {
            scrollDown($(this), chars);
        }
    });
    
    $("#input").keypress(function(evt){
        evt = evt || window.event;
        var charCode = (typeof evt.which == "undefined") ? evt.keyCode : evt.which;
        if (charCode)
        {
            if(charCode == 13)
            {
                evt.preventDefault();
                if (!$("#go-button").prop("disabled"))
                {
                    go();    
                }
                return false;
            }
            var charStr = String.fromCharCode(charCode);
            charStr = charStr.toUpperCase();
            if(charStr.match(/\s/))
            {
                charStr = "_";        
            }
            if (charStr.match(/[A-Z_]/))
            {
                insertTextAtCursor(charStr);
                displayMsg("Messages can only be decrypted with the same setting as they were encrypted", "grey-text");
            }
            else
            {
                displayMsg("Only letters and spaces are allowed", "grey-text");    
            }
            return false;
        }
    });
    
    $("#input").keyup(function(e){
        var input = $(this).text();
        if (input != "")
        {
            var lastChar = input[input.length-1].toUpperCase();
            $(this).data("empty", false);
            enableElement("go-button");
        }
        else
        {
            $(this).data("empty", true);
            disableElement("go-button");
        }
        $(this).removeClass().addClass("strong-text");
        $("#setting-text").hide();
    });
    
    $("#input").focus(function(e){
        if ($(this).data("empty"))
        {
            $(this).text("");
            $(this).removeClass().addClass("strong-text");   
        }
        else
        {
            selectText("input");
        }
        
    });
    
    $("#input").blur(function(){
        if($(this).data("empty"))
        {
            $(this).text("Enter text to encrypt or decrypt...");
            $(this).removeClass().addClass("grey-text");
        }
    });

})