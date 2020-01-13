/**
 * Matrix效果
 *
 * 参考实现：https://github.com/emilyxxie/green_rain/blob/master/sketch.js
 */

import _ from 'lodash';
import * as PIXI from 'pixi.js';
import './main.scss';


function main() {
  const app = new PIXI.Application({
    width: 600, height: 600, backgroundColor: 0, resolution: window.devicePixelRatio || 1,
    view: document.getElementById('ground')
  });
}

main();
