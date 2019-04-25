'use strict';

let rootEl = document.querySelector('#root');

let wrapperEl = document.createElement('div');
wrapperEl.classList.add('wrapper');
rootEl.appendChild(wrapperEl);

let svgCreator = {
  svg: function(el, id, w, h, v) {
    el.setAttribute('id', id);
    el.setAttribute('class', id);
    el.setAttribute('width', w);
    el.setAttribute('height', h);
    el.setAttribute('viewBox', v);
  },
  path: function(el, parrent, id, d) {
    el.setAttribute('id', id);
    el.setAttribute('class', id);
    el.setAttribute('d', d);
    parrent.appendChild(el);
  },
  points: [],
  addPoints: function(x, y) {
    svg.addEventListener('click', (event) => {
      let x = event.offsetX;
      let y = event.offsetY;
      console.log(`${x} + ${y}`);

      this.points.push(`L ${x} ${y}`);
      console.log(svgCreator.points);

      this.draw();
    });
  },
  // listenPoints: function() {
  //   for (let i = 0; i < this.points.length; i++) {
  //     this.join();
  //   }  
  // },
  draw: function(args) {
    this.path(pathOne, svg, 'path-one', `M 0 0 ${this.points.join(' ')}`);
  }
};


let ns = 'http://www.w3.org/2000/svg';

let svg = document.createElementNS(ns, 'svg');
svgCreator.svg(svg, 'svg-root', 512, 512, '0 0 512 512');

// let point0 = '256,0',
//     point1 = '325,156',
//     point2 = '512,156',
//     point3 = '360,280',
//     point4 = '440,512',
//     point5 = '256,350',
//     point6 = '80,512',
//     point7 = '160,280',
//     point8 = '0,156',
//     point9 = '200,156';

let pathOne = document.createElementNS(ns,'path');

wrapperEl.appendChild(svg);

svgCreator.addPoints();