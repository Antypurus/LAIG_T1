/**
 * Animation
 * @constructor
 */

function Animation(id)
{
    this.object = null;
    this.id = id;
}

Animation.prototype.constructor = Animation;
Animation.prototype.update = function(currTime) {};
Animation.prototype.getPosition = function() {};
Animation.prototype.getAngle = function() {};