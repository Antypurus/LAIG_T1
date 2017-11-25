#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float normalizedTimeFactor;
varying vec3 filterColor;

uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = vec4(filterColor,1.0);
	
	gl_FragColor = vec4(mix(color.rgb,filter.rgb,normalizedTimeFactor),color.a);
}