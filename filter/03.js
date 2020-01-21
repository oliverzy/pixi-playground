/**
 * https://thebookofshaders.com/03/
 */

import * as PIXI from "pixi.js";

class MyFilter extends PIXI.Filter {
  constructor(time) {
    super(null, `
uniform float u_time;

void main() {
  gl_FragColor = vec4(abs(sin(u_time)),0.0,0.0,1.0);
}
    `);
    this.time = time;
  }

  get time()
  {
    return this.uniforms.u_time;
  }

  set time(value)
  {
    this.uniforms.u_time = value;
  }
}

export function makeExample1(app, x, y) {
  app.ticker.add(update);
  const graphic = new PIXI.Graphics();
  app.stage.addChild(graphic);
  graphic.drawRect(0, 0, 100, 100);
  graphic.x = x;
  graphic.y = y;
  const filter = new MyFilter(0);
  graphic.filters = [filter];

  let time = 0;
  function update() {
    time += 0.02;
    filter.time = time;
  }
  return graphic;
}


class MyFilter2 extends PIXI.Filter {
  constructor() {
    super(null, `
precision mediump float;
varying vec2 vTextureCoord;

void main() {
  gl_FragColor = vec4(vTextureCoord.x, vTextureCoord.y, 0.0, 1.0);
} 
    `);
  }
}

export function makeExample2(app, x, y) {
  const graphic = new PIXI.Graphics();
  app.stage.addChild(graphic);
  graphic.x = x;
  graphic.y = y;
  graphic.beginFill(0x00FF00);
  graphic.drawRect(0,0,100, 100);
  graphic.endFill();
  graphic.filters = [new MyFilter2()];
}
