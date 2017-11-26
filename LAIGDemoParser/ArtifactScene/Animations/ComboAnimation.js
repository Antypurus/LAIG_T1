/**
 * ComboAnimation
 * @constructor
 */

function ComboAnimation(animationsIDs)
{
    this.animationsIDs = animationsIDs; //this array is filled with the animations id's of each node
    this.animations = []; //this array is filled with copies of each nodes animations to prevent unwanted problems
    this.currAnim = 0; //index of the current animation that is being played
    this.matrix = mat4.create();

}

ComboAnimation.prototype = Object.create(CGFobject.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

ComboAnimation.prototype.update = function(currTime) 
{
    if (this.animationsIDs.length == 0)
        return 1;
    if (this.currAnim >= this.animationsIDs.length)
        return 0;

    let currAnimationID = this.animationsIDs[this.currAnim]; //extracts the id from the animations id's array
    let currAnimation = this.animations[currAnimationID]; //uses the id above to find the copy of the animation 
    currAnimation.update(currTime);
    if(currAnimation.finish)
        this.changeAnimation(currTime);
}

ComboAnimation.prototype.applyAnimation = function (matrix) {
    let currAnimationID = this.animationsIDs[this.currAnim];
    let currAnimation = this.animations[currAnimationID];
    currAnimation.applyAnimation(matrix);
    matrix = this.matrix;
};

ComboAnimation.prototype.getMatrix = function () {
        return this.matrix;
};


ComboAnimation.prototype.addAnimation = function (animationID) {
    this.animationsIDs.push(animationID);
};

ComboAnimation.prototype.changeAnimation = function (currTime)
{
    if (this.currAnim >= this.animationsIDs.length - 1)
    {   
        this.finish = true; //finishes the combo animation
        return;
    }

    let elapsedTime = currTime/1000;
    let currAnimationID = this.animationsIDs[this.currAnim];
    let currAnimation = this.animations[currAnimationID];

    this.currAnim++; // Increments the index to the next animation in the array
    return this.update(currTime);
}

ComboAnimation.prototype.getCopy = function ()
{
    return new ComboAnimation(this.animationsIDs.slice());
}

ComboAnimation.prototype.createCopies = function (animations)
{
    for (let i = 0; i < this.animationsIDs.length; i++)
    {
        let currID = this.animationsIDs[i];
        this.animations[currID] = animations[currID].getCopy(); //retrieves the copy of each animation and puts it into the animations array
        if (this.animations[currID] instanceof ComboAnimation)
            this.animations[currID].createCopies(animations);
    }
}