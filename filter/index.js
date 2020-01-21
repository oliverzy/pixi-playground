import * as PIXI from 'pixi.js';
import './main.scss';
import {makeExample1, makeExample2} from "./03";
import { makeCRTWarp } from './crt-warp';
import { makeAlgorithmic } from './05';

function main() {
  const app = new PIXI.Application({
    width: 600, height: 600, backgroundColor: 0xF7F8FC, resolution: window.devicePixelRatio || 1,
    view: document.getElementById('ground')
  });
  makeExample1(app, 50, 50);
  makeExample2(app, 200, 50);
  makeCRTWarp(app, 50, 200);
  makeAlgorithmic(app, 400, 100);
}

main();
