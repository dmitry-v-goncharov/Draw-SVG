/**
 * VARIABLES
 */

const rootEl      = document.querySelector('#root'),
      headInput   = document.querySelector('#header__input'),
      headOutput  = document.querySelector('#header__output'),
      headerSet   = document.querySelector('#header__settings'),
      info        = document.querySelector('#information'),
      ns          = 'http://www.w3.org/2000/svg',
      svg         = document.createElementNS(ns, 'svg'),
      pathOne     = document.createElementNS(ns,'path');

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
  points: ['Start'],
  addPoints: function(x, y) {
    svg.addEventListener('click', (event) => {
      let x = event.offsetX,
          y = event.offsetY;

      if (this.points[0] === 'Start') {
        this.points.splice(this.points.indexOf(3),1);
        this.points.push(`M ${x},${y}`);
      } else {
        this.points.push(`L ${x},${y}`);
      }
      
      this.draw();
    });
  },
  draw: function(args) {
    this.path(pathOne, svg, 'path-one', `${this.points.join(' ')}`);
    headOutput.textContent =
      document.querySelector('#path-one').getAttribute('d');
  }
};



/**
 * Creating form for viewBox
 */

const viewBoxInput      = document.createElement('input');
viewBoxInput.type       = 'text';
viewBoxInput.value      = '0 0 500 500';
viewBoxInput.classList.add('viewbox-input');
viewBoxInput.setAttribute('id', 'viewbox-input');
headInput.appendChild(viewBoxInput);

const viewBoxBtn        = document.createElement('button');
viewBoxBtn.textContent  = 'Apply';
viewBoxBtn.classList.add('viewbox-btn');
headInput.appendChild(viewBoxBtn);

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function createGrid() {
  for (let i = 1; i < 10; i++) {
    let lineH  = document.createElementNS(ns, 'line'),
        lineV  = document.createElementNS(ns, 'line'),
        valueH = document.createElementNS(ns, 'text'),
        valueV = document.createElementNS(ns, 'text'),
        hor    = (svgCreator.height * i / 10).toFixed(0),
        ver    = (svgCreator.width * i / 10).toFixed(0);

    setAttributes(lineH,{
      class: `grid-line`,
      x1: 0,
      y1: hor,
      x2: svgCreator.width,
      y2: hor
    });

    setAttributes(lineV,{
      class: `grid-line`,
      x1: ver,
      y1: 0,
      x2: ver,
      y2: svgCreator.height
    });

    setAttributes(valueH, {
      class: 'grid-text',
      x: 4,
      y: +hor + 12,
    });

    setAttributes(valueV, {
      class: 'grid-text',
      x: +ver + 2,
      y: 12,
    });

    valueH.innerHTML = hor;
    valueV.innerHTML = ver;

    svg.appendChild(lineH);
    svg.appendChild(lineV);
    svg.appendChild(valueH);
    svg.appendChild(valueV);
  }
}

function toggleGrid() {
  const checker = document.querySelector('#grid-switcher'),
        svg     = document.querySelector('#svg-root');
  if (checker.checked) {
    createGrid();
  } else {
    document.querySelectorAll('.grid-line').forEach(
      function(el) { el.remove(); }
    );
    document.querySelectorAll('.grid-text').forEach(
      function(el) { el.remove(); }
    );
  }
}

function createCheck(parent, id, labelMessege) {
  const checkbox = document.createElement('input'),
        label    = document.createElement('label');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', id);
  parent.appendChild(label);
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(labelMessege));

  checkbox.addEventListener('click', toggleGrid);
}

function getCursorPos(e) {
  let x = e.offsetX,
      y = e.offsetY;
  return {x: x, y: y};
}

viewBoxBtn.addEventListener('click', (event) => {
  let inputValue = viewBoxInput.value;
  let arr = inputValue.split(' ');

  svgCreator.viewBox = inputValue;
  svgCreator.width = arr[2];
  svgCreator.height = arr[3];

  svgCreator.svg(svg, 'svg-root', svgCreator.width,
                 svgCreator.height, svgCreator.viewBox);
  rootEl.appendChild(svg);
  svgCreator.addPoints();

  svg.addEventListener('mousemove', (e) => {
    let coords = getCursorPos(e);
    info.textContent = `x: ${coords.x}, y: ${coords.y}`;
  });

  if (!document.getElementById('grid-switcher')) {
    createCheck(headerSet, 'grid-switcher', 'switch on svg grid');
  }
});