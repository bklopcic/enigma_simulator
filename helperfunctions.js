/**
    picks a random integer between a min (inclusive) and max (exclusive).
    
    @param min number representing the lowest possible number to be chosen
    @param max number representing the highest possible number to be chosen
    @return number randomly chosen between min and max
*/
function genRandInt (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}



/**
    Generates a shuffled copy of a specified array, where there is an equal
    chance of any given elelemnt being in any position
    
    @param origArr array the array to be shuffled
    @return array
*/
function genShuffledArr(origArr){
    var newArr = origArr.slice();
    
    for (var i = origArr.length-1; i > 0; i--){
        var pos = genRandInt(0, i);
        
        var temp = newArr[i];
        newArr[i] = newArr[pos];
        newArr[pos] = temp;
    }
    return newArr;
}



/**
    Finds out if a specified value is contained in a specified array
    
    @param letter char representing the value being searched for
    @param arr array to be searched through
    @return bool representing whether the value was found in the array or not
*/
function checkIn(letter, arr){
    for(i=0;i<arr.length;i++){
        if (arr[i]==letter){
            return true;
        }
    }
    return false;
}



/**
    Checks to make sure a string is not empty and does not just contain spaces
    
    @return bool representing whether the name field contains valid input or not
*/
function validateName(str) {
    for (var i=0;i<str.length;i++){
        if (str[i]!="" && str[i]!=" "){
            return true;
        }
    }
    return false;
}



/**
    Searches the url for a specified variable and returns the associated value if it exists. Returns empty
    string if no matching variable is found.
    
    @param varName string name of the variable to search for
    @return string value of the variable, or empty string if none found
*/
function checkCustomUrl(varName){
    var vars = [],
     hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    
    if (vars[varName] != undefined){
        return vars[varName];
    }
    return "";
}



/**
    Builds a url to the current window location, and adds a variable to the end called p 
    which is assigned the specified value.
    
    @param phraseId string the id of the phrase to be put in the url
    @return string the constructed URL
*/
function buildCustomURL(phraseId){
    return window.location.href.split('?')[0]+"?p="+phraseId;
}



/**
    Causes a hidden element to slide down into view.
    
    @param tag string the id of the lement to show
    @param focus bool whether the elemnt should be given focus (optional. Defaults to false)
*/
function showElement(tag, focus=false){
    $('#'+tag).slideDown(600);
    
    if (focus){
        $('#'+tag).focus();
    }
}



/**
    Causes a visible element to slide up out of view.
    
    @param tag string the id of the element to be hidden
*/
function hideElement(tag){
    $('#'+tag).slideUp(600);
}



/**
    Disables an element and all children, and grays them out.
    
    @param tag string the id of the element to be disabled
    @param time number the fade time of the gray out (optional. defaults to 0)
*/
function disableElement(tag, time=0){
    $('#'+tag).prop('disabled', true);
    $('#'+tag +" *").prop('disabled', true);
}



/**
    Enables an element and all children, and sets their opacity to full.
    
    @param tag string the id of the element to be enabled
    @param time number the fade time of the opacity change (optional. defaults to 0)
*/
function enableElement(tag, time=0){
    $('#'+tag).prop('disabled', false);
    var elements = $('#'+tag+ ' *');
    elements.prop('disabled', false);
}



/**
    Gives focus to a specified element and selects the contents
    
    @param tag string the id of the element to be selected
*/
function selectElement(tag){
    var field = $('#'+tag);
    field.focus();
    field.select();
}

function selectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}