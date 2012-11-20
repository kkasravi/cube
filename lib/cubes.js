(function() {
  var nm = module.Module('cubes');
  (function(require, exports, moduleId) {
    var log = require('log');
    var monads = require('monads');
    var controller = require('controller');
    var svg = require('svg');
    var Cubes = (function() {
      function Cubes() {
        function privateData() {
          this.element = null;
          this.id = null;
          this.cubesvg = null;
          this.cube1 = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var cubesvg = p_vars.cubesvg;
        Object.getOwnPropertyDescriptor(this,'cubesvg') || Object.defineProperty(this,'cubesvg', {get: function(){return cubesvg;},set: function(e){cubesvg=e;}});
        var cube1 = p_vars.cube1;
        Object.getOwnPropertyDescriptor(this,'cube1') || Object.defineProperty(this,'cube1', {get: function(){return cube1;},set: function(e){cube1=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.id=Math.uuid(8);
          this.cubesvg=svg.Svg({
            width:"665",
            height:"250"
          }).defs().symbol({
            id:"cube",
            stroke:"#000000",
            'stroke-width':"0.5",
            'stroke-linejoin':"bevel"
          }).path({
            fill:"#333333",
            d:"M0.112,26.271l25.032,12.485V25.164L0.112,12.68V26.271z"
          }).end().path({
            fill:"#666666",
            d:"M25.144,38.756l25.033-12.485H50.12V12.708L25.144,25.164V38.756z"
          }).end().path({
            fill:"blue",
            d:"M50.12,12.708l0.057-0.028L25.144,0.224L0.112,12.68l25.032,12.484L50.12,12.708z"
          }).end().path({
            transform:"scale(0.12,0.12) translate(-380,-522)",
            d:"m 682.646,639.988 -42.519,0 0,42.521 c 0,11.693 -9.567,21.258 -21.26,21.26 -11.693,0 -21.26,-9.567 -21.26,-21.26 l 0,-42.521 -42.519,0 c -11.694,0 -21.26,-9.567 -21.26,-21.261 0,-11.691 9.566,-21.258 21.26,-21.258 l 42.519,0 0,-42.519 c 0,-11.693 9.567,-21.26 21.26,-21.26 11.693,0 21.26,9.567 21.26,21.26 l 0,42.519 42.519,0 c 11.694,0 21.26,9.567 21.26,21.258 0,11.694 -9.566,21.261 -21.26,21.261",
            style:"fill:#00ff00;stroke:none"
          }).end().end().end().g({
            id:"cubes",
            transform:"translate(300.25, 143.45)"
          }).use({
            'xlink:href':"#cube",
            transform:"translate(0,-72)"
          }).animate({
            id:'cube1',
            dur:"2s",
            values:"0;-45;0;16;0;-7;0;3;0;-2;0;1;0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"indefinite",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(24,-60)"
          }).animate({
            id:'cube2',
            dur:"2s",
            values:"0;-45;0;16;0;-7;0;3;0;-2;0;1;0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube1.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(48,-48)"
          }).animate({
            id:'cube3',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube2.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(-24,-60)"
          }).animate({
            id:'cube4',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube3.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(0,-48)"
          }).animate({
            id:'cube5',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube4.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(-48,-48)"
          }).animate({
            id:'cube6',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube5.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(24,-36)"
          }).animate({
            id:'cube7',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube6.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(-24,-36)"
          }).animate({
            id:'cube8',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube7.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(-72,-36)"
          }).animate({
            id:'cube9',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube8.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(72,-36)"
          }).animate({
            id:'cube10',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube9.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(48,-24)"
          }).animate({
            id:'cube11',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube10.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(-48,-24)"
          }).animate({
            id:'cube12',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube11.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(0,-24)"
          }).animate({
            id:'cube13',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube12.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(24,-12)"
          }).animate({
            id:'cube14',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube13.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(-24,-12)"
          }).animate({
            id:'cube15',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube14.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().use({
            'xlink:href':"#cube",
            transform:"translate(0,0)"
          }).animate({
            id:'cube16',
            dur:"2s",
            values:"0;    -45;      0;     16;      0;     -7;      0;      3;      0;     -2;      0;      1; 0",
            keyTimes:"0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436; 0.7949; 0.8462; 0.8974; 0.9231; 0.9487; 0.9744; 1",
            keySplines:"0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1; .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1",
            attributeName:"y",
            begin:"cube15.end+0.1s",
            restart:"whenNotActive",
            calcMode:"spline"
          }).end().end().end().end();
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            'position':'absolute',
            'top':'30%',
            'left':'20%'
          }).add(this.cubesvg.svg);
        }
        return ctor.apply(this,args) || this;
      }
      Cubes.prototype['animate'] = function() {
        this.cubesvg.svg.getElementById('cube1').beginElement();
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Cubes;
        return new Cubes(args && args.length && args[0]);
      };
    })();
    exports.Cubes = Cubes;
  })(require, nm.getExports(), nm.getId());
})();

