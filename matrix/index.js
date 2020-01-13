/**
 * Matrix效果
 *
 * 参考实现：https://github.com/emilyxxie/green_rain/blob/master/sketch.js
 */

import _ from 'lodash';
import * as PIXI from 'pixi.js';
import { GlowFilter } from '@pixi/filter-glow';
import './main.scss';
import greenFont from './green.xml';
import greenFontPng from './green.png';

const symbolSize = 15;

class Stream {
  constructor(container, height) {
    this.container = container;
    this.height = height;
    this.symbols = [];
    this.total = _.random(5, 35);
    this.speed = _.random(5, 5);
    this.switchInterval = _.random(2, 25);
    this.count = 0;
  }

  generateSymbols(x, y) {
    let first = true;
    for (let i=0;i<this.total;++i) {
      const symbol = new PIXI.BitmapText(String.fromCharCode(_.random(12449, 12542)),
          {font: {name: 'PingFang SC', size: symbolSize}});
      if (first)
        symbol.filters = [new GlowFilter(2, 2)];
      symbol.x = x;
      symbol.y = y;
      y -= symbolSize;
      this.symbols.push(symbol);
      this.container.addChild(symbol);
      first = false;
    }
  }

  update() {
    for (let symbol of this.symbols) {
      symbol.y += this.speed;
      if (this.count % this.switchInterval === 0)
        symbol.text = String.fromCharCode(_.random(12449, 12542));
      if (symbol.y > this.height)
        symbol.y = 0;
    }
    this.count++;
  }
}

function makeMatrix(app) {
  const streams = [];
  let isPause = false;
  app.stage.interactive = true;
  app.stage.buttonMode = true;
  app.stage.on('pointertap', () => {
    if (isPause)
      resume();
    else
      pause();
  });
  const bg = new PIXI.Graphics();
  bg.beginFill(0);
  bg.drawRect(0,0, app.screen.width, app.screen.height);
  bg.endFill();
  app.stage.addChild(bg);

  function play() {
    for (let i=0;i<app.screen.width/symbolSize;++i) {
      const stream = new Stream(app.stage, app.screen.height);
      stream.generateSymbols(i*symbolSize, _.random(-2000,0));
      streams.push(stream);
    }
    app.ticker.add(update);
  }

  function pause() {
    isPause = true;
    app.ticker.remove(update);
  }

  function resume() {
    isPause = false;
    app.ticker.add(update);
  }

  function update() {
    for (let stream of streams)
      stream.update();
  }

  return {
    play
  }
}

function main() {
  const app = new PIXI.Application({
    width: 600, height: 600, backgroundColor: 0, resolution: window.devicePixelRatio || 1,
    view: document.getElementById('ground')
  });
  console.log(greenFontPng);
  app.loader
    .add('greenFont', greenFont)
    .load(() => {
      const matrix = makeMatrix(app);
      matrix.play();
    });
}

main();
