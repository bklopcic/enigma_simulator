function Enigma()
{
    this.rotors = [];
    this.rotors[0] = new Rotor(0);
    this.rotors[1] = new Rotor(1);
    this.rotors[2] = new Rotor(2);
    this.reflector = new Rotor(4);
    
    this.lettersEncoded = 0;
}

Enigma.prototype.letters = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

Enigma.prototype.enterSettings = function(setting1, setting2, setting3)
{
    for (var i = 0; i < this.rotors.length; i++) 
    {
        this.rotors[i].reset();
        this.rotors[i].rotate(arguments[i]);
    }
}

Enigma.prototype.encodeMessage = function(message)
{
    var encoded = "";
    for (var i = 0; i < message.length; i++)
    {
        encoded += this.encodeChar(message[i]);
        this.lettersEncoded++;
        this.rotateRotors();
    }
    return encoded;
}

Enigma.prototype.rotateRotors = function()
{
    this.rotors[0].rotate(1);
    
    if (this.lettersEncoded % 5 == 0)
    {
        this.rotors[1].rotate(1);
    }
    
    if (this.lettersEncoded % 10 == 0)
    {
        this.rotors[2].rotate(1);    
    }
}

Enigma.prototype.encodeChar = function(char)
{
    var num = this.convertCharToNum(char);
    for (var i = 0; i < this.rotors.length; i++)
    {
        num = this.rotors[i].map(num);
    }
    num = this.reflector.map(num);
    for (var j = this.rotors.length-1; j > -1; j--) 
    {
        num = this.rotors[j].unmap(num);
    }
    return this.convertNumToChar(num);
}

Enigma.prototype.convertCharToNum = function(char)
{
    return this.letters.indexOf(char);
}

Enigma.prototype.convertNumToChar = function(num)
{
    if (num < this.letters.length) 
    {
        return this.letters[num];
    }
    else
    {
        return -1;
    }
}

Enigma.prototype.reset = function()
{
    this.enterSettings(0,0,0);
    this.lettersEncoded = 0;
}