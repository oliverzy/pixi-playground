/**
 * Loading
 *
 */
import * as PIXI from 'pixi.js';
import './main.scss';
import sunPic from './sun.png';
import earthPic from './earth.png';
import moonPic from './moon.png';

function makeScene(app) {
  const bg = new PIXI.Graphics();
  let isPause = false;
  bg.interactive = true;
  bg.buttonMode = true;
  bg.on('pointertap', () => {
    if (isPause)
      resume();
    else
      pause();
  });
  app.stage.addChild(bg);

  const solarSystem = new PIXI.Container();
  const sun = PIXI.Sprite.from(sunPic);
  sun.anchor.set(0.5);
  sun.x = app.screen.width/2;
  sun.y = app.screen.height/2;
  sun.width = 200;
  sun.height = 200;
  bg.addChild(sun);
  sun.addChild(solarSystem);

  const earth = PIXI.Sprite.from(earthPic);
  earth.anchor.set(0.5);
  earth.x = 200;
  earth.y = 200;
  earth.width = 100;
  earth.height = 100;
  solarSystem.addChild(earth);
  const earthSystem = new PIXI.Container();
  earth.addChild(earthSystem);

  const moon = PIXI.Sprite.from(moonPic);
  moon.anchor.set(0.5);
  moon.x = 100;
  moon.y = 100;
  moon.width = 50;
  moon.height = 50;
  earthSystem.addChild(moon);

  function play() {
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
    bg.clear();
    bg.beginFill(0);
    bg.drawRect(0, 0, app.screen.width, app.screen.height);
    bg.endFill();

    solarSystem.rotation += 0.01;
    earthSystem.rotation += 0.05;
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
  const loading = makeScene(app);
  loading.play();
}

main();
