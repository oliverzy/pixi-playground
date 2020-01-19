// https://www.html5gamedevs.com/topic/28597-vtexturecoord-and-custom-filters-on-pixi-v4/

import * as PIXI from "pixi.js";

class CrtWarpFilter extends PIXI.Filter {
  constructor() {
    super(null, `
precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 inputSize;
uniform vec4 outputFrame;

vec2 warpAmount = vec2( 2.0 / 34.0, 1.0 / 16.0 );

vec2 warp(vec2 pos) {
  pos = pos * 2.0 - 1.0;
  pos *= vec2(
    1.0 + (pos.y * pos.y) * warpAmount.x,
    1.0 + (pos.x * pos.x) * warpAmount.y
  );
  return pos * 0.5 + 0.5;
}
 
void main() {
  vec2 coord = vTextureCoord;
  coord = coord * inputSize.xy / outputFrame.zw;
  coord = warp( coord );
  coord = coord * outputFrame.zw / inputSize.xy;
  gl_FragColor = texture2D( uSampler, coord );
}
    `);
    this.padding = 1; // 防止边缘像素溢出
    //this.autoFit = false;
  }
}

export function makeCRTWarp(app, x, y) {
  const sprite = PIXI.Sprite.from(document.getElementById('grid_img'));
  sprite.filters = [new CrtWarpFilter()];
  sprite.x = x;
  sprite.y = y;
  app.stage.addChild(sprite);

  // const sprite2 = PIXI.Sprite.from(document.getElementById('grid_img'));
  // sprite2.x = x;
  // sprite2.y = y + 200;
  // app.stage.addChild(sprite2);
}
