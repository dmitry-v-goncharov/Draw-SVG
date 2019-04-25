const rootEl = document.querySelector('#root');

const wrapperEl = document.createElement('div');
wrapperEl.classList.add('wrapper');
rootEl.appendChild(wrapperEl);

const askSection = document.createElement('div');
askSection.classList.add('viewbox-wrapper');
wrapperEl.appendChild(askSection);

const viewBoxText = document.createElement('p');
viewBoxText.textContent = 'Choose viewBox coordinates in format "0 0 X Y"';
askSection.appendChild(viewBoxText);

const viewBoxInput = document.createElement('input');
viewBoxInput.type = 'text';
viewBoxInput.classList.add('viewbox-input');
viewBoxInput.value = '0 0 512 512';
askSection.appendChild(viewBoxInput);

const viewBoxBtn = document.createElement('button');
viewBoxBtn.classList.add('viewbox-btn');
viewBoxBtn.textContent = 'Apply';
askSection.appendChild(viewBoxBtn);
viewBoxBtn.addEventListener('click', function() {

});

const outputSection = document.createElement('div');
outputSection.classList.add('oputput-wrapper');
wrapperEl.appendChild(outputSection);

const oputputText = document.createElement('p');
oputputText.textContent = 'this is your SVG :)';
outputSection.appendChild(oputputText);


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
  draw: function(args) {
    this.path(pathOne, svg, 'path-one', `M 0 0 ${this.points.join(' ')}`);
  }
};


let ns = 'http://www.w3.org/2000/svg';

let svg = document.createElementNS(ns, 'svg');
svgCreator.svg(svg, 'svg-root', 512, 512, '0 0 512 512');

let pathOne = document.createElementNS(ns,'path');

wrapperEl.appendChild(svg);

svgCreator.addPoints();