module cubes {
  module log from 'log';
  module monads from 'monads';
  module cubesvgs from 'cubesvgs';
  export class Cubes {
    constructor(properties={}) {
      private element, containers;
      @animate = @animate.bind(this);
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'cube-animation'});
      @containers = [];
      var container = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-container'}).style({'-webkit-transition':'-webkit-transform 2s linear'});
      @containers.push(container);
      container = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-container'}).style({'-webkit-transition':'-webkit-transform 2s linear 0.1s'});
      @containers.push(container);
      container = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-container'}).style({'-webkit-transition':'-webkit-transform 2s linear 0.2s'});
      @containers.push(container);
      container = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-container'}).style({'-webkit-transition':'-webkit-transform 2s linear 0.3 s'});
      @containers.push(container);
      container = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-container'}).style({'-webkit-transition':'-webkit-transform 2s linear 0.4s'});
      @containers.push(container);
      @containers.forEach(function(container) {
        var sides = [];
        sides.push(monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-side1'}));
        sides.push(monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-side2'}));
        sides.push(monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-side3'}).add(cubesvgs.Shuriken()));
        sides.push(monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-side4'}));
        sides.push(monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-side5'}));
        sides.push(monads.DOMable({tagName:'div'}).on('load').attributes({'class':'cube-side6'}));
        sides.forEach(function(side) {
          container.add(side);
        }, this);
        @element.add(container);
      }, this);
      setTimeout(@animate,300);
    }
    animate() {
      @containers[0].style({'-webkit-transform':'translate3d(-1em,-2em,-800px) rotateX(360deg)'});
      @containers[1].style({'-webkit-transform':'translate3d(2em,-3em,-600px) rotateX(360deg)'});
      @containers[2].style({'-webkit-transform':'translate3d(3em,-4em,-400px) rotateX(360deg)'});
      @containers[3].style({'-webkit-transform':'translate3d(3em,-5em,-200px) rotateX(360deg)'});
      @containers[4].style({'-webkit-transform':'translate3d(2em,-5em,0px) rotateX(360deg)'});
    }
    static init = (function() {
      var styles = [
        {selector:'@-webkit-keyframes cube-rotate',style:'from { -webkit-transform: rotateY(0) rotateX(0); } to { -webkit-transform: rotateY(360deg) rotateX(360deg); }'},
        {selector:'#cube-animation',style:'position:absolute;top:18%;left:20%;width:20%;height:20%;-webkit-animation:cube-rotate 2s linear 1;-webkit-transform-style:preserve-3d;-webkit-transform-origin:50% 50% 25px;'},
//        {selector:'#cube-animation',style:'position:absolute;top:35%;left:40%;width:20%;height:20%;-webkit-transform-style:preserve-3d;-webkit-transform-origin:50% 50% 25px;'},
        {selector:'.cube-container',style:'position:absolute;-webkit-transform-style:preserve-3d;-webkit-perspective:1000;-webkit-transform:none;'},
        {selector:'.cube-side1',style:'position:absolute;width:50px;height:50px;-webkit-transform:rotateY(90deg) rotateZ(-90deg) translate3d(0,0,50px);-webkit-transform-origin:0 100% 0;'},
        {selector:'.cube-side2',style:'position:absolute;width:50px;height:50px;-webkit-transform:rotateY(-90deg) rotateZ(90deg) translate3d(0,-50px,0);-webkit-transform-origin:0 0 0;'},
        {selector:'.cube-side3',style:'position:absolute;width:50px;height:50px;-webkit-transform:translate3d(0,0,50px);'},
        {selector:'.cube-side4',style:'position:absolute;width:50px;height:50px;-webkit-transform:rotateX(90deg) rotateZ(180deg) translate3d(50px,-50px,0);-webkit-transform-origin:100% 0;'},
        {selector:'.cube-side5',style:'position:absolute;width:50px;height:50px;-webkit-transform:rotateX(-90deg);-webkit-transform-origin:0 100%;'},
        {selector:'.cube-side6',style:'position:absolute;width:50px;height:50px;-webkit-transform:translate3d(0,0,0px);-webkit-transform-origin:0 100%;'}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  };
}
