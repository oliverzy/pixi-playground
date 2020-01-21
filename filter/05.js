/**
 * https://thebookofshaders.com/05/
 * https://www.html5gamedevs.com/topic/44562-how-custom-filter-works-with-a-sprite-that-has-rotation-is-set/
 */
import * as PIXI from "pixi.js";

class MyFilter extends PIXI.Filter {
  constructor() {
    super(null, `
precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 inputSize;
uniform vec4 outputFrame;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return smoothstep( pct-0.02, pct, st.y) -
         smoothstep( pct, pct+0.02, st.y);
}

void main() {
  vec2 st = vTextureCoord*inputSize.xy/outputFrame.zw;
  //vec2 st = vTextureCoord;

  float y = st.x;

  vec3 color = vec3(y);

  // Plot a line
  float pct = plot(st,y);
  color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

  gl_FragColor = vec4(color,1.0);
}

    `);
  }
}

export function makeAlgorithmic(app, x, y) {
  const graphic = new PIXI.Graphics();
  graphic.drawRect(0,0,100, 100);
  graphic.filters = [new MyFilter()];

  const texture = app.renderer.generateTexture(graphic, PIXI.SCALE_MODES.NEAREST, window.devicePixelRatio || 1);
  const sprite = new PIXI.Sprite(texture);
  app.stage.addChild(sprite);
  sprite.x = x;
  sprite.y = y;
  sprite.anchor.set(0.5, 0.5);
  //sprite.rotation = 45*Math.PI/180;
  sprite.scale.set(1, -1);

}
