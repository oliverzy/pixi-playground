/**
 * https://thebookofshaders.com/06/
 */
import * as PIXI from "pixi.js";

class MyFilter extends PIXI.Filter {
  constructor() {
    super(null, `
precision highp float;

#define TWO_PI 6.28318530718

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 inputSize;
uniform vec4 outputFrame;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {
  vec2 st = vTextureCoord*inputSize.xy/outputFrame.zw;
  vec3 color = vec3(0.0);

  // Use polar coordinates instead of cartesian
  vec2 toCenter = vec2(0.5)-st;
  float angle = atan(toCenter.y,toCenter.x);
  float radius = length(toCenter);

  if (radius <= 0.5) {
    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius (from 0 to 1)
    color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius*2.0,1.0));
    gl_FragColor = vec4(color,1.0);
  } else {
    gl_FragColor = vec4(0);
  }
}
    `);
  }
}


export function makeColorWheel(app, x, y) {
  const graphic = new PIXI.Graphics();
  graphic.drawRect(0,0,100, 100);
  graphic.filters = [new MyFilter()];

  const texture = app.renderer.generateTexture(graphic, PIXI.SCALE_MODES.NEAREST, window.devicePixelRatio || 1);
  const sprite = new PIXI.Sprite(texture);
  app.stage.addChild(sprite);
  sprite.x = x;
  sprite.y = y;
  sprite.anchor.set(0.5, 0.5);
  sprite.scale.set(1, -1);
}
