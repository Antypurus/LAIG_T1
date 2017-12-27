/**
 *
 * @param {*} scene
 * @param {*} color
 * @param {*} position
 */
function GamePiece(scene, color, position) {
  this.scene = scene;
  this.Color = color;
  this.translation = {x: 0, y: 0, z: 0};
  this.translation.x += position.x;
  this.translation.y += position.y;
  this.translation.z += position.z;
};