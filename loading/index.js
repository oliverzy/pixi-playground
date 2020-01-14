/**
 * Loading
 *
 */
import * as PIXI from 'pixi.js';
import { hslToRgb } from '../util';
import './main.scss';

class Particle {
  constructor(g, radius, radians, screenWidth, screenHeight, index) {
    this.g = g;
    this.cx = radius*Math.cos(radians) + screenWidth/2;
    this.cy = radius*Math.sin(radians) + screenHeight/2;
    this.cr = index*2;
  }

  update() {
    this.cr += 0.1;
    if (this.cr > 40)
      this.cr = 0;
    this.alpha = Math.max(0, 1 - this.cr/20);
  }

  render() {
    const color = PIXI.utils.rgb2hex(hslToRgb(200, 1, this.alpha));
    this.g.lineStyle(2, color, this.alpha);
    //this.g.beginFill(0xFF0000, this.alpha);
    this.g.drawCircle(this.cx, this.cy, this.cr*2);
    //this.g.endFill();
  }
}

function makeLoading(app) {
  const graphics = new PIXI.Graphics();
  let isPause = false;
  graphics.interactive = true;
  graphics.buttonMode = true;
  graphics.on('pointertap', () => {
    if (isPause)
      resume();
    else
      pause();
  });
  const particles = [];

  function play() {
    app.stage.addChild(graphics);
    app.ticker.add(update);

    const radius = 100;
    const radians = 18*Math.PI/180;
    for (let i=0;i<20;++i) {
      const particle = new Particle(graphics, radius, radians*i, app.screen.width, app.screen.height, i);
      particles.push(particle);
    }
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
    graphics.clear();
    graphics.beginFill(0xF7F8FC);
    graphics.drawRect(0, 0, app.screen.width, app.screen.height);
    graphics.endFill();
    for (let particle of particles) {
      particle.update();
      particle.render();
    }
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
  const loading = makeLoading(app);
  loading.play();
}

main();
