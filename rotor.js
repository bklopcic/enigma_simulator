function Rotor(mapNum, offset=0)
{
    this.mapNum = mapNum;
    this.mapping = this.maps[this.mapNum];
    
    if (offset > 0)
    {
        this.rotate(offset);
    }
}

Rotor.prototype.maps = [
    [5,14,21,11,1,18,2,25,12,22,15,6,13,24,4,8,20,16,3,10,23,17,9,0,7,26,19],
    [17,4,26,11,7,14,1,10,15,25,18,2,21,23,5,6,9,19,3,0,24,22,16,8,13,12,20],
    [9,21,0,17,5,6,20,10,25,19,15,16,2,23,24,3,1,11,26,18,7,13,22,12,8,14,4],
    [11,12,0,1,7,20,25,5,14,22,24,19,26,9,10,4,13,21,2,15,23,3,18,16,6,8,17],
    [26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0] //this one can be used as the reflector
];

Rotor.prototype.map = function(num)
{
    if (num < this.mapping.length)
    {
        return this.mapping[num];
    }
    else
    {
        return -1;
    }
}

Rotor.prototype.unmap = function(num)
{
    return this.mapping.indexOf(num);
}

Rotor.prototype.rotate = function(offset=1)
{
    var newMapping = []
    for (var i = 0; i < this.mapping.length; i++)
    {
        newMapping[(i+offset)%this.mapping.length] = this.mapping[i];
    }
    this.mapping = newMapping;
}

Rotor.prototype.reset = function()
{
    this.mapping = this.maps[this.mapNum];
}