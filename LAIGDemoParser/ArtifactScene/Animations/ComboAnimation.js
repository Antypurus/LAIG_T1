/**
 * ComboAnimation
 * @constructor
 */

function ComboAnimation(animationsIDs)
{
    this.animationsIDs = animationsIDs;
    this.animations = [];
    this.currAnimationIdx = 0;
}

ComboAnimation.prototype = Object.create(CGFobject.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

ComboAnimation.prototype.update = function(currTime) 
{
    if (this.animationsIDs.length == 0)
        return 1;
    if (this.currAnimationIdx >= this.animationsIDs.length)
        return 0;

    let currAnimationID = this.animationsIDs[this.currAnimationIdx];
    let currAnimation = this.animations[currAnimationID];
    currAnimation.update(currTime);
    if(currAnimation.finish)
        return this.JumpToNextAnimation(currTime);
}

ComboAnimation.prototype.applyAnimation = function (matrix) {
    let currAnimationID = this.animationsIDs[this.currAnimationIdx];
    let currAnimation = this.animations[currAnimationID];
    currAnimation.applyAnimation(matrix);
};

ComboAnimation.prototype.getMatrix = function (matrix) {
        let currAnimationID = this.animationsIDs[this.currAnimationIdx];
    let currAnimation = this.animations[currAnimationID];
  return  currAnimation.getMatrix();
};


ComboAnimation.prototype.addAnimation = function (animationID) {
    this.animationsIDs.push(animationID);
};

ComboAnimation.prototype.JumpToNextAnimation = function (elapsedTimeMS)
{
    if (this.currAnimationIdx >= this.animationsIDs.length - 1)
        return "finished";

    let elapsedTime = elapsedTimeMS;
    let currAnimationID = this.animationsIDs[this.currAnimationIdx];
    let currAnimation = this.animations[currAnimationID];

    this.currAnimationIdx++;
    return this.update(elapsedTimeMS);
}

ComboAnimation.prototype.getCopy = function ()
{
    return new ComboAnimation(this.animationsIDs.slice());
}

//chamar no fim do parse animations
ComboAnimation.prototype.createCopies = function (animations)
{
    for (let i = 0; i < this.animationsIDs.length; i++)
    {
        let currID = this.animationsIDs[i];
        this.animations[currID] = animations[currID].getCopy();
    }
}