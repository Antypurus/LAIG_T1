attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying float normalizedTimeFactor;

uniform float timeFactor;
uniform float scaleFactor;

void main() {
    float normScale = timeFactor * (scaleFactor) + 0.01;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+aVertexNormal*normScale*0.1, 1.0);

	vTextureCoord = aTextureCoord;
    normalizedTimeFactor = timeFactor;
}