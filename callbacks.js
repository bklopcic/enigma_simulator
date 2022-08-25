
function scrollUp(dial, chars)
{
    var char = dial.find('li:nth-child(2)').text();
    var idx = chars.indexOf(char);
    dial.find('li:nth-child(1)').text(char);
    dial.find('li:nth-child(2)').text(chars[(idx+1)%chars.length]);
    dial.find('li:nth-child(3)').text(chars[(idx+2)%chars.length]);
}

function scrollDown(dial, chars)
{
    var char = dial.find('li:nth-child(2)').text();
    var idx = chars.indexOf(char);
    dial.find('li:nth-child(1)').text(chars[(idx-2+chars.length)%chars.length]);
    dial.find('li:nth-child(2)').text(chars[(idx-1+chars.length)%chars.length]);
    dial.find('li:nth-child(3)').text(char);
}

function barScale(callback)
{
    displayMsg("Encrypting message...", "loading-text");
    var elem = document.getElementById("loading-bar"); 
    var width = 0;
    var id = setInterval(frame, 10);
    function frame()
    {
        if (width >= 100)
        {
            clearInterval(id);
            callback.call();
            setTimeout(function(){
                elem.style.width = 0 +'%';
                displayMsg("Complete!", "blue-text");
            }, 150);
        }
        else
        {
            width+=.5;
            elem.style.width = width + '%'; 
        }
    }

}

function runEncryption()
{
    var set1 = $("#dial-one ul li:nth-child(2)").text();
    var set2 = $("#dial-two ul li:nth-child(2)").text();
    var set3 = $("#dial-three ul li:nth-child(2)").text();
    var inputElem = $("#input");
    var input = inputElem.text();
    console.log(set1, set2, set3, input);
    enigma.reset();
    enigma.enterSettings(set1,set2,set3);
    var cypher = enigma.encodeMessage(input);
    inputElem.text(cypher);
    $("#setting-text").show();
    $("#setting-text").text("Setting: "+set1+set2+set3);
    barScale(function(){$("#input-box").slideDown(400);});
}

function displayMsg(msg, style)
{
    var box = $("#message");
    box.text(msg);
    box.removeClass().addClass(style);
}

function go()
{
    $("#input-box").slideUp(400, runEncryption);
}

var charConversions = {
    "a": "A"
    // Add character mappings here
};

function convertChar(charStr) {
    return greekChars[charStr] || -1;
}

function insertTextAtCursor(text) {
    var sel, range, textNode;
    if (window.getSelection)
    {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount)
        {
            range = sel.getRangeAt(0);
            range.deleteContents();
            textNode = document.createTextNode(text);
            range.insertNode(textNode);

            // Move caret to the end of the newly inserted text node
            range.setStart(textNode, textNode.length);
            range.setEnd(textNode, textNode.length);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (document.selection && document.selection.createRange)
    {
        range = document.selection.createRange();
        range.pasteHTML(text);
    }
}