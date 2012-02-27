(function() {
  var nm = module.Module('cube');
  (function(require, exports, moduleId) {
    var log = require('log');
    var monads = require('monads');
    var controller = require('controller');
    var events = require('events');
    var svg = require('svg');
    var NumberGenerator = (function() {
      function NumberGenerator() {
        function privateData() {
          this.element = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (number) {
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').text(number);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = NumberGenerator;
        return new NumberGenerator(args && args.length && args[0]);
      };
    })();
    var Title = (function() {
      function Title() {
        function privateData() {
          this.title = null;
        }
        var p_vars = new privateData();
        var title = p_vars.title;
        Object.getOwnPropertyDescriptor(this,'title') || Object.defineProperty(this,'title', {get: function(){return title;},set: function(e){title=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.title=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            'white-space':'nowrap',
            'height':'100px',
            'width':'420px',
            'color':'#e97825',
            'font-family':'maagkramp',
            'font-size':'80px',
            '-webkit-transform':'translateX(-150px) translateY(-120px) rotateY(-230deg) rotateX(76deg)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).textShadow(Main.shadow).text('Ninja Math');
          this.title.delay(this.title.style,[{
            '-webkit-transform':'translateX(-150px) translateY(-120px) rotateY(-230deg) rotateX(0deg)'
          }],300);
          return this.title;
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Title;
        return new Title(args && args.length && args[0]);
      };
    })();
    var Play = (function() {
      function Play() {
        function privateData() {
          this.choice = null;
          this.play = null;
        }
        var p_vars = new privateData();
        var choice = p_vars.choice;
        Object.getOwnPropertyDescriptor(this,'choice') || Object.defineProperty(this,'choice', {get: function(){return choice;},set: function(e){choice=e;}});
        var play = p_vars.play;
        Object.getOwnPropertyDescriptor(this,'play') || Object.defineProperty(this,'play', {get: function(){return play;},set: function(e){play=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.onchoose=this.onchoose.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          this.choice=null;
          this.play=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transition':'-webkit-transform 400ms linear',
            '-webkit-transform':'translateX(-1000px) translateY(-350px) rotateY(130deg) rotateX(-106deg) rotateZ(0deg) scale(3.0)',
            'white-space':'nowrap',
            'height':'60px',
            'width':'60px',
            'color':'#e97825',
            'font-family':'maagkramp',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('\u2794');
          this.play.on('touchend').bind(this.ontouchend).on('click').bind(this.ontouchend);
          controller.Controller.subscribe('choose',this.onchoose);
          return this.play;
        }
        return ctor.apply(this,args) || this;
      }
      Play.prototype['onchoose'] = function(event) {
        this.choice=event.detail;
        this.play.style({
          '-webkit-transform':'translateX(-1000px) translateY(-350px) rotateY(130deg) rotateX(0deg) rotateZ(0deg) scale(3.0)'
        });
      };
      Play.prototype['ontouchend'] = function(event) {
        log.Logger.debug(this,'publishing ' + this.choice);
        this.choice && controller.Controller.publish(events.CustomEvent({
          type:'play',
          canBubble:false,
          isCanceleable:true,
          detail:this.choice
        }));
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Play;
        return new Play(args && args.length && args[0]);
      };
    })();
    var Difficulty = (function() {
      function Difficulty() {
        function privateData() {
          this.difficulty = null;
        }
        var p_vars = new privateData();
        var difficulty = p_vars.difficulty;
        Object.getOwnPropertyDescriptor(this,'difficulty') || Object.defineProperty(this,'difficulty', {get: function(){return difficulty;},set: function(e){difficulty=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.difficulty=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(30px) translateY(230px) rotateY(-230deg)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).add(monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(-70px) translateY(-10px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'maagkramp',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('\u2794')).add(monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(0px) translateY(0px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'maagkramp',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('Easy')).add(monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(200px) translateY(0px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'maagkramp',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('Hard'));
          return this.difficulty;
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Difficulty;
        return new Difficulty(args && args.length && args[0]);
      };
    })();
    var Multiply = (function() {
      function Multiply() {
        function privateData() {
          this.element = null;
          this.id = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.id=Math.uuid(8);
          this.ontouchend=this.ontouchend.bind(this);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'multiply'
          }).add(svg.Svg({
            xmlns:"http://www.w3.org/2000/svg",
            version:"1.1",
            width:"200.0",
            height:"200.0"
          }).defs().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath2346"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath2356"
          }).path({
            d:"m 372.963,533.69 c 0,-31.181 -25.511,-56.693 -56.692,-56.693 l -170.078,0 c -31.182,0 -56.694,25.512 -56.694,56.693 l 0,170.079 c 0,31.181 25.512,56.693 56.694,56.693 l 170.078,0 c 31.181,0 56.692,-25.512 56.692,-56.693 l 0,-170.079"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"0.13",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,283.4648,287.4639,0,87.499,476.9971)",
            id:this.id + "linearGradient2368"
          }).stop({
            style:"stop-opacity:1;stop-color:#f1984c",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#e77724",
            offset:"1"
          }).end().end().linearGradient({
            x1:"0.13",
            y1:"0",
            x2:"0.23",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,283.4648,287.4639,0,87.499,476.9971)",
            id:this.id + "linearGradient2378"
          }).stop({
            style:"stop-opacity:1;stop-color:#e97825",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#e97825",
            offset:"1"
          }).end().end().linearGradient({
            x1:"0.23",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,283.4648,287.4639,0,87.499,476.9971)",
            id:this.id + "linearGradient2388"
          }).stop({
            style:"stop-opacity:1;stop-color:#e77724",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#f29e58",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath2400"
          }).path({
            d:"m 316.271,754.792 -170.077,0 c -28.137,0 -51.025,-22.889 -51.025,-51.021 l 0,-67.67 c 40.389,-11.072 86.752,-17.372 136.062,-17.372 49.308,0 95.672,6.3 136.061,17.372 l 0,67.67 c 0,28.132 -22.889,51.021 -51.021,51.021"
          }).end().end().radialGradient({
            fx:"0",
            fy:"0",
            cx:"0",
            cy:"0",
            r:"1",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(136.9473,136.9473,136.9473,-136.9473,231.2305,618.7295)",
            id:this.id + "radialGradient2412"
          }).stop({
            style:"stop-opacity:1;stop-color:#f29e58",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#ffffff",
            offset:"1"
          }).end().end().radialGradient({
            fx:"0",
            fy:"0",
            cx:"0",
            cy:"0",
            r:"0.85000002",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(136.9473,136.9473,136.9473,-136.9473,231.2305,618.7295)",
            id:this.id + "radialGradient2422"
          }).stop({
            style:"stop-opacity:1;stop-color:#f4c592",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#f39f58",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath2434"
          }).path({
            d:"m 146.191,482.667 170.077,0 c 14.068,0 26.825,5.722 36.063,14.961 l -242.2,0 c 9.239,-9.239 21.994,-14.961 36.06,-14.961"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,-14.9614,-246.1992,0,354.3306,497.6279)",
            spreadMethod:"pad",
            id:this.id + "linearGradient2446"
          }).stop({
            style:"stop-opacity:1;stop-color:#ed8b38",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#f6dac3",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath2458"
          }).path({
            d:"m 146.191,754.792 170.077,0 c 14.068,0 26.825,-5.722 36.063,-14.961 l -242.2,0 c 9.239,9.239 21.994,14.961 36.06,14.961"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,14.9609,-246.1992,0,354.3306,739.8301)",
            spreadMethod:"pad",
            id:this.id + "linearGradient2470"
          }).stop({
            style:"stop-opacity:1;stop-color:#f29f59",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#ffffff",
            offset:"1"
          }).end().end().end().g({
            transform:"matrix(0.5,0,0,-0.5,-10.0,400.0)"
          }).g({
            'clip-path':"url(#" + this.id + "clipPath2346)"
          }).path({
            d:"m 316.271,471.327 -170.078,0 c -34.388,0 -62.364,27.977 -62.364,62.365 l 0,170.077 c 0,34.385 27.976,62.361 62.364,62.361 l 170.078,0 c 34.388,0 62.363,-27.976 62.363,-62.361 l 0,-170.077 c 0,-34.388 -27.975,-62.365 -62.363,-62.365",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath2356)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient2368);stroke:none"
          }).end().path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient2378);stroke:none"
          }).end().path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient2388);stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath2400)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "radialGradient2412);stroke:none"
          }).end().path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "radialGradient2422);stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath2434)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient2446);stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath2458)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient2470);stroke:none"
          }).end().end().path({
            d:"m 261.297,618.729 30.066,30.066 c 8.27,8.27 8.268,21.797 0,30.066 -8.267,8.268 -21.798,8.27 -30.066,0 l -30.067,-30.066 -30.066,30.066 c -8.267,8.268 -21.797,8.268 -30.066,0 -8.268,-8.267 -8.268,-21.796 0,-30.066 L 201.164,618.729 171.1,588.664 c -8.27,-8.268 -8.268,-21.799 0,-30.066 8.267,-8.268 21.797,-8.27 30.066,0 l 30.064,30.064 30.067,-30.064 c 8.268,-8.27 21.797,-8.268 30.064,0 8.27,8.267 8.27,21.797 0,30.066 l -30.064,30.065",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().end().svg);
          this.element.on('touchend').bind(this.ontouchend).on('click').bind(this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Multiply.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'choose',
          canBubble:false,
          isCanceleable:true,
          detail:'multiply'
        }));
      };
      Multiply.init = (function () {
        var styles=[{
          selector:'.inner .multiply',
          style:"-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform:translateX(-50px) rotateY(-90deg);left:100px;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Multiply.init;
        __.constructor = Multiply;
        return new Multiply(args && args.length && args[0]);
      };
    })();
    var Plus = (function() {
      function Plus() {
        function privateData() {
          this.element = null;
          this.id = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.id=Math.uuid(8);
          this.ontouchend=this.ontouchend.bind(this);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'plus'
          }).add(svg.Svg({
            xmlns:"http://www.w3.org/2000/svg",
            version:"1.1",
            width:"180.0",
            height:"200.0"
          }).defs().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath4800"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            id:"path4802"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath4810"
          }).path({
            d:"m 760.601,533.69 c 0,-31.182 -25.513,-56.693 -56.695,-56.693 l -170.078,0 c -31.181,0 -56.693,25.511 -56.693,56.693 l 0,170.078 c 0,31.182 25.512,56.694 56.693,56.694 l 170.078,0 c 31.182,0 56.695,-25.512 56.695,-56.694 l 0,-170.078",
            id:"path4812"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"0.13",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,283.4653,287.4658,0,475.1348,476.9966)",
            id:this.id + "linearGradient4822"
          }).stop({
            style:"stop-opacity:1;stop-color:#8fd02a",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#78bf2b",
            offset:"1"
          }).end().end().linearGradient({
            x1:"0.13",
            y1:"0",
            x2:"0.23",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,283.4653,287.4658,0,475.1348,476.9966)",
            id:this.id + "linearGradient4832"
          }).stop({
            style:"stop-opacity:1;stop-color:#7ac12b",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#7ac12b",
            offset:"1"
          }).end().end().linearGradient({
            x1:"0.23",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,283.4653,287.4658,0,475.1348,476.9966)",
            id:this.id + "linearGradient4842"
          }).stop({
            style:"stop-opacity:1;stop-color:#78bf2b",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#94d228",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath4854"
          }).path({
            d:"m 703.906,754.792 -170.077,0 c -28.136,0 -51.024,-22.889 -51.024,-51.022 l 0,-67.67 c 40.388,-11.071 86.752,-17.371 136.062,-17.371 49.309,0 95.672,6.3 136.062,17.371 l 0,67.67 c 0,28.133 -22.889,51.022 -51.023,51.022",
            id:"path4856"
          }).end().end().radialGradient({
            fx:"0",
            fy:"0",
            cx:"0",
            cy:"0",
            r:"1",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(137.4286,137.4286,137.4286,-137.4286,618.8672,618.7285)",
            id:this.id + "radialGradient4866"
          }).stop({
            style:"stop-opacity:1;stop-color:#97d12c",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#ffffff",
            offset:"1"
          }).end().end().radialGradient({
            fx:"0",
            fy:"0",
            cx:"0",
            cy:"0",
            r:"0.85000002",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(137.4286,137.4286,137.4286,-137.4286,618.8672,618.7285)",
            id:this.id + "radialGradient4876"
          }).stop({
            style:"stop-opacity:1;stop-color:#a9d925",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#97d12c",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath4888"
          }).path({
            d:"m 533.827,482.665 170.076,0 c 14.071,0 26.826,5.723 36.064,14.962 l -242.199,0 c 9.237,-9.239 21.994,-14.962 36.059,-14.962",
            id:"path4890"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,-14.9614,-246.1992,0,741.9668,497.627)",
            spreadMethod:"pad",
            id:this.id + "linearGradient4900"
          }).stop({
            style:"stop-opacity:1;stop-color:#89c82b",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#d4ea81",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath4912"
          }).path({
            d:"m 533.827,754.792 170.076,0 c 14.071,0 26.826,-5.723 36.064,-14.961 l -242.199,0 c 9.237,9.238 21.994,14.961 36.059,14.961",
            id:"path4914"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,14.9609,-246.1992,0,741.9668,739.8301)",
            spreadMethod:"pad",
            id:this.id + "linearGradient4924"
          }).stop({
            style:"stop-opacity:1;stop-color:#97d12c",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#ffffff",
            offset:"1"
          }).end().end().end().g({
            transform:"matrix(0.5,0,0,-0.5,-233.0,408.0)"
          }).g({
            'clip-path':"url(#" + this.id + "clipPath4800)"
          }).path({
            d:"m 703.906,471.327 -170.078,0 c -34.388,0 -62.363,27.976 -62.363,62.364 l 0,170.077 c 0,34.386 27.975,62.362 62.363,62.362 l 170.078,0 c 34.39,0 62.365,-27.976 62.365,-62.362 l 0,-170.077 c 0,-34.388 -27.975,-62.364 -62.365,-62.364",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none",
            id:"path4804"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath4810)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient4832);stroke:none",
            id:"path4838"
          }).end().path({
            d:"M 440,0 851,0 851,440 0,440 440,440 z",
            style:"fill:url(#" + this.id + "linearGradient4842);stroke:none",
            id:"path4848"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath4854)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "radialGradient4866);stroke:none",
            id:"path4872"
          }).end().path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "radialGradient4876);stroke:none",
            id:"path4882"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath4888)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient4900);stroke:none",
            id:"path4906"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath4912)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient4924);stroke:none",
            id:"path4930"
          }).end().end().path({
            d:"m 682.646,639.988 -42.519,0 0,42.521 c 0,11.693 -9.567,21.258 -21.26,21.26 -11.693,0 -21.26,-9.567 -21.26,-21.26 l 0,-42.521 -42.519,0 c -11.694,0 -21.26,-9.567 -21.26,-21.261 0,-11.691 9.566,-21.258 21.26,-21.258 l 42.519,0 0,-42.519 c 0,-11.693 9.567,-21.26 21.26,-21.26 11.693,0 21.26,9.567 21.26,21.26 l 0,42.519 42.519,0 c 11.694,0 21.26,9.567 21.26,21.258 0,11.694 -9.566,21.261 -21.26,21.261",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none",
            id:"path9832"
          }).end().end().end().svg);
          this.element.on('touchend').bind(this.ontouchend).on('click').bind(this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Plus.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'choose',
          canBubble:false,
          isCanceleable:true,
          detail:'plus'
        }));
      };
      Plus.init = (function () {
        var styles=[{
          selector:'.inner .plus',
          style:"-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform: rotateY(90deg) translateX(206px) translateZ(300px);left:-400px;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Plus.init;
        __.constructor = Plus;
        return new Plus(args && args.length && args[0]);
      };
    })();
    var Divide = (function() {
      function Divide() {
        function privateData() {
          this.element = null;
          this.id = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.id=Math.uuid(8);
          this.ontouchend=this.ontouchend.bind(this);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'divide'
          }).add(svg.Svg({
            xmlns:"http://www.w3.org/2000/svg",
            version:"1.1",
            width:"200.0",
            height:"200.0"
          }).defs().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath7254"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath7264"
          }).path({
            d:"m 372.965,146.054 c 0,-31.181 -25.511,-56.693 -56.693,-56.693 l -170.079,0 c -31.182,0 -56.693,25.512 -56.693,56.693 l 0,170.08 c 0,31.181 25.511,56.692 56.693,56.692 l 170.079,0 c 31.182,0 56.693,-25.511 56.693,-56.692 l 0,-170.08"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"0.5",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,283.4648,287.4653,0,87.4995,89.3613)",
            id:this.id + "linearGradient7276"
          }).stop({
            style:"stop-opacity:1;stop-color:#2bb8f0",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#27a7e5",
            offset:"1"
          }).end().end().linearGradient({
            x1:"0.5",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,283.4648,287.4653,0,87.4995,89.3613)",
            id:this.id + "linearGradient7286"
          }).stop({
            style:"stop-opacity:1;stop-color:#27a7e5",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#2cb6ef",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath7298"
          }).path({
            d:"m 316.272,367.156 -170.078,0 c -28.136,0 -51.025,-22.888 -51.025,-51.02 l 0,-67.671 c 40.389,-11.072 86.753,-17.371 136.063,-17.371 49.308,0 95.672,6.299 136.062,17.371 l 0,67.671 c 0,28.132 -22.889,51.02 -51.022,51.02"
          }).end().end().radialGradient({
            fx:"0",
            fy:"0",
            cx:"0",
            cy:"0",
            r:"1",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(144.9494,144.9494,144.9494,-144.9494,231.2314,231.0938)",
            id:this.id + "radialGradient7310"
          }).stop({
            style:"stop-opacity:1;stop-color:#2db7ef",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#ffffff",
            offset:"1"
          }).end().end().radialGradient({
            fx:"0",
            fy:"0",
            cx:"0",
            cy:"0",
            r:"0.85000002",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(144.9494,144.9494,144.9494,-144.9494,231.2314,231.0938)",
            id:this.id + "radialGradient7320"
          }).stop({
            style:"stop-opacity:1;stop-color:#64ccf5",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#2db7ef",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath7332"
          }).path({
            d:"m 146.191,95.029 170.078,0 c 14.069,0 26.825,5.722 36.063,14.961 l -242.2,0 c 9.238,-9.239 21.994,-14.961 36.059,-14.961"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,-14.9609,-246.2007,0,354.3325,109.9902)",
            spreadMethod:"pad",
            id:this.id + "linearGradient7344"
          }).stop({
            style:"stop-opacity:1;stop-color:#2db7ef",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#b6e3f6",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath7356"
          }).path({
            d:"m 146.191,367.156 170.078,0 c 14.069,0 26.825,-5.721 36.063,-14.961 l -242.2,0 c 9.238,9.24 21.994,14.961 36.059,14.961",
            id:"path7358"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,14.9609,-246.2007,0,354.3325,352.1953)",
            spreadMethod:"pad",
            id:this.id + "linearGradient7368"
          }).stop({
            style:"stop-opacity:1;stop-color:#35baf0",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#ffffff",
            offset:"1"
          }).end().end().end().g({
            transform:"matrix(0.5,0,0,-0.5,-10.0,210.0)"
          }).g({
            'clip-path':"url(#" + this.id + "clipPath7254)"
          }).path({
            d:"m 316.272,83.69 -170.079,0 c -34.388,0 -62.363,27.977 -62.363,62.366 l 0,170.078 c 0,34.385 27.975,62.36 62.363,62.36 l 170.079,0 c 34.388,0 62.364,-27.975 62.364,-62.36 l 0,-170.078 c 0,-34.389 -27.976,-62.366 -62.364,-62.366",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath7264)"
          }).path({
            d:"M 0,0 400,0 400,400 0,400 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient7276);stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath7298)"
          }).path({
            d:"M 0,0 400,0 400,400 0,400 0,0 z",
            style:"fill:url(#" + this.id + "radialGradient7310);stroke:none"
          }).end().path({
            d:"M 0,0 400,0 400,400 0,400 0,0 z",
            style:"fill:url(#" + this.id + "radialGradient7320);stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath7332)"
          }).path({
            d:"M 0,0 400,0 400,400 0,400 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient7344);stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath7356)"
          }).path({
            d:"M 0,0 400,0 400,400 0,400 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient7368);stroke:none"
          }).end().end().path({
            d:"m 295.012,252.354 -127.559,0 c -11.693,0 -21.26,-9.569 -21.26,-21.262 0,-11.692 9.567,-21.258 21.26,-21.258 l 127.559,0 c 11.693,0 21.26,9.566 21.26,21.258 0,11.693 -9.567,21.262 -21.26,21.262 z m -63.78,21.259 c 11.741,0 21.26,9.518 21.26,21.26 0,11.742 -9.519,21.26 -21.26,21.26 -11.742,0 -21.259,-9.518 -21.259,-21.26 0,-11.742 9.517,-21.26 21.259,-21.26 z m 0,-85.039 c -11.742,0 -21.259,-9.517 -21.259,-21.259 0,-11.743 9.517,-21.26 21.259,-21.26 11.741,0 21.26,9.517 21.26,21.26 0,11.742 -9.519,21.259 -21.26,21.259",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().end().svg);
          this.element.on('touchend').bind(this.ontouchend).on('click').bind(this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Divide.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'choose',
          canBubble:false,
          isCanceleable:true,
          detail:'divide'
        }));
      };
      Divide.init = (function () {
        var styles=[{
          selector:'.inner .divide',
          style:"-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform:rotateY(165deg) translateX(40px) translateZ(80px);"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Divide.init;
        __.constructor = Divide;
        return new Divide(args && args.length && args[0]);
      };
    })();
    var Minus = (function() {
      function Minus() {
        function privateData() {
          this.element = null;
          this.id = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.id=Math.uuid(8);
          this.ontouchend=this.ontouchend.bind(this);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'minus'
          }).add(svg.Svg({
            xmlns:"http://www.w3.org/2000/svg",
            version:"1.1",
            width:"350.0",
            height:"270.0"
          }).defs().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath9698"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath9708"
          }).path({
            d:"m 760.601,146.054 c 0,-31.181 -25.513,-56.693 -56.695,-56.693 l -170.079,0 c -31.181,0 -56.693,25.512 -56.693,56.693 l 0,170.08 c 0,31.181 25.512,56.692 56.693,56.692 l 170.079,0 c 31.182,0 56.695,-25.511 56.695,-56.692 l 0,-170.08"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"0.5",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,283.4648,287.4668,0,475.1338,89.3613)",
            id:this.id + "linearGradient9720"
          }).stop({
            style:"stop-opacity:1;stop-color:#c0c4ca",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#90969d",
            offset:"1"
          }).end().end().linearGradient({
            x1:"0.5",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,283.4648,287.4668,0,475.1338,89.3613)",
            id:this.id + "linearGradient9730"
          }).stop({
            style:"stop-opacity:1;stop-color:#90969d",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#c0c4ca",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath9742"
          }).path({
            d:"m 703.906,367.156 -170.077,0 c -28.136,0 -51.025,-22.888 -51.025,-51.02 l 0,-67.671 c 40.388,-11.072 86.753,-17.371 136.063,-17.371 49.309,0 95.672,6.299 136.062,17.371 l 0,67.671 c 0,28.132 -22.889,51.02 -51.023,51.02"
          }).end().end().radialGradient({
            fx:"0",
            fy:"0",
            cx:"0",
            cy:"0",
            r:"1",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(139.5044,139.5039,139.5039,-139.5044,618.8662,231.0938)",
            id:this.id + "radialGradient9754"
          }).stop({
            style:"stop-opacity:1;stop-color:#b5b9bf",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#ffffff",
            offset:"1"
          }).end().end().radialGradient({
            fx:"0",
            fy:"0",
            cx:"0",
            cy:"0",
            r:"0.85000002",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(139.5044,139.5039,139.5039,-139.5044,618.8662,231.0938)",
            id:this.id + "radialGradient9764"
          }).stop({
            style:"stop-opacity:1;stop-color:#cccfd5",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#b5b9bf",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath9776"
          }).path({
            d:"m 533.826,95.029 170.077,0 c 14.071,0 26.826,5.722 36.064,14.961 l -242.2,0 c 9.238,-9.239 21.994,-14.961 36.059,-14.961"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,-14.9609,-246.2002,0,741.9668,109.9902)",
            spreadMethod:"pad",
            id:this.id + "linearGradient9788"
          }).stop({
            style:"stop-opacity:1;stop-color:#bcbfc6",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#e5e7ea",
            offset:"1"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath9800"
          }).path({
            d:"m 533.826,367.156 170.077,0 c 14.071,0 26.826,-5.721 36.064,-14.961 l -242.2,0 c 9.238,9.24 21.994,14.961 36.059,14.961"
          }).end().end().linearGradient({
            x1:"0",
            y1:"0",
            x2:"1",
            y2:"0",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0,14.9609,-246.2002,0,741.9668,352.1953)",
            spreadMethod:"pad",
            id:this.id + "linearGradient9812"
          }).stop({
            style:"stop-opacity:1;stop-color:#bcbfc6",
            offset:"0"
          }).end().stop({
            style:"stop-opacity:1;stop-color:#ffffff",
            offset:"1"
          }).end().end().end().g({
            transform:"matrix(0.5,0,0,-0.5,-220.0,220.0)"
          }).g({
            'clip-path':"url(#" + this.id + "clipPath9698)"
          }).path({
            d:"m 703.906,83.69 -170.079,0 c -34.387,0 -62.363,27.977 -62.363,62.366 l 0,170.078 c 0,34.385 27.976,62.36 62.363,62.36 l 170.079,0 c 34.39,0 62.365,-27.975 62.365,-62.36 l 0,-170.078 c 0,-34.389 -27.975,-62.366 -62.365,-62.366",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath9708)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient9720);stroke:none"
          }).end().path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient9730);stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath9742)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "radialGradient9754);stroke:none"
          }).end().path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "radialGradient9764);stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath9776)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient9788);stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath9800)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient9812);stroke:none"
          }).end().end().path({
            d:"m 703.906,231.093 c 0,-11.692 -9.566,-21.259 -21.26,-21.259 l -127.558,0 c -11.694,0 -21.26,9.567 -21.26,21.259 0,11.693 9.566,21.261 21.26,21.261 l 127.558,0 c 11.694,0 21.26,-9.568 21.26,-21.261",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().end().svg);
          this.element.on('touchend').bind(this.ontouchend).on('click').bind(this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Minus.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'choose',
          canBubble:false,
          isCanceleable:true,
          detail:'minus'
        }));
      };
      Minus.init = (function () {
        var styles=[{
          selector:'.inner .minus',
          style:"-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform:translateX(120px) translateY(-10px) translateZ(100px);"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Minus.init;
        __.constructor = Minus;
        return new Minus(args && args.length && args[0]);
      };
    })();
    var Main = (function() {
      function Main() {
        function privateData() {
          this.container = null;
          this.difficulty = null;
          this.divide = null;
          this.frame = null;
          this.minus = null;
          this.multiply = null;
          this.play = null;
          this.plus = null;
          this.title = null;
        }
        var p_vars = new privateData();
        var container = p_vars.container;
        Object.getOwnPropertyDescriptor(this,'container') || Object.defineProperty(this,'container', {get: function(){return container;},set: function(e){container=e;}});
        var difficulty = p_vars.difficulty;
        Object.getOwnPropertyDescriptor(this,'difficulty') || Object.defineProperty(this,'difficulty', {get: function(){return difficulty;},set: function(e){difficulty=e;}});
        var divide = p_vars.divide;
        Object.getOwnPropertyDescriptor(this,'divide') || Object.defineProperty(this,'divide', {get: function(){return divide;},set: function(e){divide=e;}});
        var frame = p_vars.frame;
        Object.getOwnPropertyDescriptor(this,'frame') || Object.defineProperty(this,'frame', {get: function(){return frame;},set: function(e){frame=e;}});
        var minus = p_vars.minus;
        Object.getOwnPropertyDescriptor(this,'minus') || Object.defineProperty(this,'minus', {get: function(){return minus;},set: function(e){minus=e;}});
        var multiply = p_vars.multiply;
        Object.getOwnPropertyDescriptor(this,'multiply') || Object.defineProperty(this,'multiply', {get: function(){return multiply;},set: function(e){multiply=e;}});
        var play = p_vars.play;
        Object.getOwnPropertyDescriptor(this,'play') || Object.defineProperty(this,'play', {get: function(){return play;},set: function(e){play=e;}});
        var plus = p_vars.plus;
        Object.getOwnPropertyDescriptor(this,'plus') || Object.defineProperty(this,'plus', {get: function(){return plus;},set: function(e){plus=e;}});
        var title = p_vars.title;
        Object.getOwnPropertyDescriptor(this,'title') || Object.defineProperty(this,'title', {get: function(){return title;},set: function(e){title=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.ontouchstart=this.ontouchstart.bind(this);
          this.ontouchmove=this.ontouchmove.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          this.onplay=this.onplay.bind(this);
          this.title=Title();
          this.difficulty=Difficulty();
          this.minus=Minus();
          this.play=Play();
          this.plus=Plus();
          this.divide=Divide();
          this.multiply=Multiply();
          this.frame=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'id':'frame'
          }).add(monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'inner'
          }).add(this.title).add(this.play).add(this.multiply).add(this.plus).add(this.divide).add(this.minus).add(monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'e'
          })).add(monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'f'
          })).add(this.difficulty));
          this.container=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'id':'container'
          }).add(this.frame).insert(document.body);
          controller.Controller.subscribe('play',this.onplay);
          var moonrising={
            selector:'@-webkit-keyframes moonrising',
            style:""
          },arc;
          for(var i=0;i < 100;++i) {
            arc=100 - parseFloat(i) / 100 * 70;
            moonrising.style+=i + "% { background: -webkit-gradient(radial, 48% " + arc + "%, 0, 48% " + arc + "%, 350, from(rgba(0,0,255,0)), to(rgba(0,0,0,1))); } ";
          }
          monads.Styleable([moonrising]).on("load").onstyle();
          monads.DOMable({
            element:document.body
          }).on('touchstart').bind(this.ontouchstart).on('touchmove').bind(this.ontouchmove).on('touchend').bind(this.ontouchend);
          monads.DOMable({
            element:document.body
          }).on('load').style({
            '-webkit-animation':'moonrising 2s 1'
          });
        }
        return ctor.apply(this,args) || this;
      }
      Main.prototype['onplay'] = function(event) {
        this.title.style({
          '-webkit-transform':'translateX(-150px) translateY(-120px) rotateY(-230deg) rotateX(76deg)'
        });
        this.minus.style({
          '-webkit-transform':'rotateY(49deg) translateX(120px) translateY(-10px) translateZ(100px)'
        });
        this.multiply.style({
          '-webkit-transform':' translateX(-50px) rotateY(-137deg)'
        });
        this.divide.style({
          '-webkit-transform':'rotateY(213deg) translateX(40px) translateZ(80px)'
        });
        this.plus.style({
          '-webkit-transform':'rotateY(90deg) translateX(206px) translateZ(300px) rotateY(-70.5deg)'
        });
        this.difficulty.style({
          '-webkit-transform':'translateX(30px) translateY(230px) rotateY(-230deg) rotateX(110deg)'
        });
      };
      Main.prototype['ontouchstart'] = function(event) {
        event.preventDefault();
      };
      Main.prototype['ontouchmove'] = function(event) {
        event.preventDefault();
      };
      Main.prototype['ontouchend'] = function(event) {
        event.preventDefault();
      };
      Main.shadow = ['0 1px 0 #ccc','0 2px 0 #c9c9c9','0 3px 0 #bbb','0 4px 0 #b9b9b9','0 5px 0 #aaa','0 6px 1px rgba(0,0,0,0.1)','0 0 5px rgba(0,0,0,0.1)','0 1px 3px rgba(0,0,0,0.3)','0 3px 5px rgba(0,0,0,0.2)','0 5px 10px rgba(0,0,0,0.25)','0 10px 10px rgba(0,0,0,0.2)','0 20px 20px rgba(0,0,0,0.15)'];
      Main.init = (function () {
        var styles=[{
          selector:'body',
          style:"background: -webkit-gradient(radial, 48% 30%, 0, 48% 30%, 350, from(rgba(0,0,255,0)), to(rgba(0,0,0,1)));color:#e0e0ff;font-size:115%;margin:0;"
        },{
          selector:'#container',
          style:"position: absolute;left: 45%; margin-left:-100px;top: 35%; margin-top:-100px;height: 200px;width: 200px;-webkit-perspective: 800;"
        },{
          selector:'#frame',
          style:"opacity: 0.7;width: 200px;-webkit-transform-style: preserve-3d;-webkit-transform: translateZ(150px);-webkit-transition: all 0.5s linear;"
        },{
          selector:'.inner',
          style:"height:200px;width:200px;-webkit-transform-style: preserve-3d;-webkit-transform: rotateY(230deg);"
        },{
          selector:'.inner div',
          style:"position: absolute;height:200px;width:200px;background-size: 100% 100%;opacity: 1;-webkit-transform: rotateX(-90deg);"
        },{
          selector:'.inner .e',
          style:"top:100px;font-size:80px;"
        },{
          selector:'.inner .f',
          style:"top:-100px;"
        },{
          selector:'@font-face',
          style:'font-family:maagkramp;src:url(/cube/lib/maagkramp.ttf);'
        },{
          selector:'@-webkit-keyframes spin2',
          style:"from { -webkit-transform: rotateY(0); } to   { -webkit-transform: rotateY(720deg); }"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.shadow = Main.shadow;
        __.init = Main.init;
        __.constructor = Main;
        return new Main(args && args.length && args[0]);
      };
    })();
    var AppType = (function() {
      function AppType() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          Main();
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = AppType;
        return new AppType(args && args.length && args[0]);
      };
    })();
    const App=AppType();
    exports.App = App;
  })(require, nm.getExports(), nm.getId());
})();

