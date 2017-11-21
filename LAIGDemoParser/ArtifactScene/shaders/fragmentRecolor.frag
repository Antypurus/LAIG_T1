#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float normalizedTimeFactor;

uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = vec4(1.0,0.0,0.0,1.0);
	
	gl_FragColor = vec4(mix(color.rbg,filter.rgb,normalizedTimeFactor),color.a);
}