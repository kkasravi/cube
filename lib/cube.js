(function() {
  var nm = module.Module('cube');
  (function(require, exports, moduleId) {
    var log = require('log');
    var monads = require('monads');
    var controller = require('controller');
    var events = require('events');
    var svg = require('svg');
    var cubesvgs = require('cubesvgs');
    var planks = require('planks');
    var belts = require('belts');
    var Rules = (function() {
      function Rules() {
        function privateData() {
          this.levels = null;
        }
        var p_vars = new privateData();
        var levels = p_vars.levels;
        Object.getOwnPropertyDescriptor(this,'levels') || Object.defineProperty(this,'levels', {get: function(){return levels;},set: function(e){levels=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.levels={
            "1":{
              45:"black",
              50:"red",
              55:"brown",
              60:"blue",
              65:"purple",
              70:"green",
              75:"camoflage",
              80:"yellow",
              85:"orange",
              90:"white"
            },
            "2":{
              45:"black",
              50:"red",
              55:"brown",
              60:"blue",
              65:"purple",
              70:"green",
              75:"camoflage",
              80:"yellow",
              85:"orange",
              90:"white"
            },
            "3":{
              45:"black",
              50:"red",
              55:"brown",
              60:"blue",
              65:"purple",
              70:"green",
              75:"camoflage",
              80:"yellow",
              85:"orange",
              90:"white"
            },
            "4":{
              45:"black",
              50:"red",
              55:"brown",
              60:"blue",
              65:"purple",
              70:"green",
              75:"camoflage",
              80:"yellow",
              85:"orange",
              90:"white"
            }
          };
        }
        return ctor.apply(this,args) || this;
      }
      Rules.prototype['beltLevel'] = function(level,time) {
        if(time <= 45) {
          return this.levels[level][45];
        } else if(time <= 50) {
          return this.levels[level][50];
        } else if(time <= 55) {
          return this.levels[level][55];
        } else if(time <= 60) {
          return this.levels[level][60];
        } else if(time <= 65) {
          return this.levels[level][65];
        } else if(time <= 70) {
          return this.levels[level][70];
        } else if(time <= 75) {
          return this.levels[level][75];
        } else if(time <= 80) {
          return this.levels[level][80];
        } else if(time <= 85) {
          return this.levels[level][85];
        } else {
          return this.levels[level][90];
        }
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Rules;
        return new Rules(args && args.length && args[0]);
      };
    })();
    var Equation = (function() {
      function Equation() {
        function privateData() {
          this.answer = null;
          this.level = null;
          this.operand1 = null;
          this.operand2 = null;
          this.operation = null;
          this.operationSign = null;
        }
        var p_vars = new privateData();
        var answer = p_vars.answer;
        Object.getOwnPropertyDescriptor(this,'answer') || Object.defineProperty(this,'answer', {get: function(){return answer;},set: function(e){answer=e;}});
        var level = p_vars.level;
        Object.getOwnPropertyDescriptor(this,'level') || Object.defineProperty(this,'level', {get: function(){return level;},set: function(e){level=e;}});
        var operand1 = p_vars.operand1;
        Object.getOwnPropertyDescriptor(this,'operand1') || Object.defineProperty(this,'operand1', {get: function(){return operand1;},set: function(e){operand1=e;}});
        var operand2 = p_vars.operand2;
        Object.getOwnPropertyDescriptor(this,'operand2') || Object.defineProperty(this,'operand2', {get: function(){return operand2;},set: function(e){operand2=e;}});
        var operation = p_vars.operation;
        Object.getOwnPropertyDescriptor(this,'operation') || Object.defineProperty(this,'operation', {get: function(){return operation;},set: function(e){operation=e;}});
        var operationSign = p_vars.operationSign;
        Object.getOwnPropertyDescriptor(this,'operationSign') || Object.defineProperty(this,'operationSign', {get: function(){return operationSign;},set: function(e){operationSign=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.operation=properties.operation;
          switch(this.operation) {
            case 'minus':
              this.operationSign='-';
              break;
            case 'plus':
              this.operationSign='+';
              break;
            case 'divide':
              this.operationSign='\u00F7';
              break;
            case 'multiply':
              this.operationSign='\u00D7';
              break;
          }
          this.level=properties.level;
        }
        return ctor.apply(this,args) || this;
      }
      Object.defineProperty(Equation.prototype,'equation', {get: function(){      if(!this.answer) {
        switch(this.operation) {
          case 'minus':
            this.operand1=Math.round(Math.random() * 100);
            switch(this.level) {
              case 1:
              case 2:
                this.operand2=Math.round(Math.random() * 10);
                break;
              default:
                this.operand2=operand1 + Math.round(Math.random() * 100);
            }
            this.answer=this.operand2 - this.operand1;
            break;
          case 'multiply':
            this.operand1=Math.round(Math.random() * 12);
            this.operand2=Math.round(Math.random() * 12);
            this.answer=this.operand2 * this.operand1;
            break;
          case 'divide':
            this.operand1=Math.round(Math.random() * 100);
            this.operand2=Math.round(Math.random() * 100);
            this.answer=this.operand2 / this.operand1;
            break;
          case 'plus':
            switch(this.level) {
              case 1:
                this.operand1=Math.ceil(Math.random() * 10);
                this.operand2=Math.ceil(Math.random() * 10);
                break;
              case 2:
                this.operand1=Math.ceil(Math.random() * 50);
                this.operand2=Math.ceil(Math.random() * 10);
                break;
              case 3:
                this.operand1=Math.ceil(Math.random() * 100);
                this.operand2=Math.ceil(Math.random() * 20);
                break;
              case 4:
              default:
                this.operand1=Math.ceil(Math.random() * 100);
                this.operand2=Math.ceil(Math.random() * 100);
                break;
            }
            this.answer=this.operand2 + this.operand1;
            break;
        }
      }
      return this.operand1 + ' ' + this.operationSign + ' ' + this.operand2 + ' = ';
      }});
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Equation;
        return new Equation(args && args.length && args[0]);
      };
    })();
    var VerticalNumberStrip = (function() {
      function VerticalNumberStrip() {
        function privateData() {
          this.carousel = null;
          this.element = null;
          this.numbers = null;
        }
        var p_vars = new privateData();
        var carousel = p_vars.carousel;
        Object.getOwnPropertyDescriptor(this,'carousel') || Object.defineProperty(this,'carousel', {get: function(){return carousel;},set: function(e){carousel=e;}});
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var numbers = p_vars.numbers;
        Object.getOwnPropertyDescriptor(this,'numbers') || Object.defineProperty(this,'numbers', {get: function(){return numbers;},set: function(e){numbers=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            numbers:['0','1','2','3','4','5','6','7','8','9',VerticalNumberStrip.backspace]
          };
          this.onselect=this.onselect.bind(this);
          this.numbers=properties.numbers;
          this.carousel=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'vertical-number-strip-carousel'
          });
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'vertical-number-strip'
          }).add(this.carousel);
          var theta=50 / this.numbers.length;
          this.numbers.forEach(function (number,i) {
            var deg=-55 + theta * i;
            var panel=monads.DOMable({
              tagName:'div'
            }).on('load').style({
              '-webkit-transform':'rotateX(' + deg + 'deg) translateZ(192px)'
            }).attributes({
              'class':'vertical-number-strip-carousel-number'
            }).text(number).on(['touchend'],this.onselect.curry(number));
            this.carousel.add(panel);
          },this);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      VerticalNumberStrip.prototype['onselect'] = function(number,event) {
        controller.Controller.publish(events.CustomEvent({
          type:'guess',
          canBubble:false,
          isCanceleable:true,
          detail:number
        }));
      };
      VerticalNumberStrip.init = (function () {
        var styles=[{
          selector:'.vertical-number-strip',
          style:"width:100px;height:140px;position:relative;margin:0 auto 40px;-webkit-perspective:1000px;left:45%;"
        },{
          selector:'.vertical-number-strip-carousel',
          style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transform:translateZ(-192px) rotateX(0deg) translateY(-430px);"
        },{
          selector:'.vertical-number-strip-carousel-number',
          style:"-webkit-backface-visibility:hidden;display:block;width:100px;height:70px;line-height:80px;text-align:center;font-size:50px;font-family:Albertino;text-shadow:5px 5px 10px rgba(124,116,116,0.5);"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      VerticalNumberStrip.backspace = '\u2716';
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = VerticalNumberStrip.init;
        __.backspace = VerticalNumberStrip.backspace;
        __.constructor = VerticalNumberStrip;
        return new VerticalNumberStrip(args && args.length && args[0]);
      };
    })();
    exports.VerticalNumberStrip = VerticalNumberStrip;
    var ResultsDropDown = (function() {
      function ResultsDropDown() {
        function privateData() {
          this.element = null;
          this.title = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var title = p_vars.title;
        Object.getOwnPropertyDescriptor(this,'title') || Object.defineProperty(this,'title', {get: function(){return title;},set: function(e){title=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.title=properties.title;
          this.element=monads.DOMable({
            tagName:'dl'
          }).on('load').attributes({
            'class':'results-drop-down'
          });
          this.title && element.add(monads.DOMable({
            tagName:'dt'
          }).on('load').add(this.title));
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      ResultsDropDown.init = (function () {
        var styles=[{
          selector:'.results-drop-down',
          style:"-webkit-transform-style:preserve-3d;-webkit-transform:perspective(600px) translateZ(1px);position:relative;top:100%;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      ResultsDropDown.backspace = '\u2716';
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = ResultsDropDown.init;
        __.backspace = ResultsDropDown.backspace;
        __.constructor = ResultsDropDown;
        return new ResultsDropDown(args && args.length && args[0]);
      };
    })();
    exports.ResultsDropDown = ResultsDropDown;
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
            'font-family':'Albertino',
            'font-size':'80px',
            '-webkit-transform':'translateX(-220px) translateY(-120px) rotateY(-230deg) rotateX(76deg)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).textShadow(Main.shadow).text('Ninja Math');
          this.title.delay(this.title.style,[{
            '-webkit-transform':'translateX(-140px) translateY(-160px) rotateY(-230deg) rotateX(0deg)'
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
    var Checker = (function() {
      function Checker() {
        function privateData() {
          this.elapsed = null;
          this.level = null;
          this.wrong = null;
          this.right = null;
          this.wrongAnswers = null;
          this.rightAnswers = null;
          this.rules = null;
          this.total = null;
          this.totalCount = null;
          this.totalTime = null;
          this.currentCount = null;
        }
        var p_vars = new privateData();
        var elapsed = p_vars.elapsed;
        Object.getOwnPropertyDescriptor(this,'elapsed') || Object.defineProperty(this,'elapsed', {get: function(){return elapsed;},set: function(e){elapsed=e;}});
        var level = p_vars.level;
        Object.getOwnPropertyDescriptor(this,'level') || Object.defineProperty(this,'level', {get: function(){return level;},set: function(e){level=e;}});
        var wrong = p_vars.wrong;
        Object.getOwnPropertyDescriptor(this,'wrong') || Object.defineProperty(this,'wrong', {get: function(){return wrong;},set: function(e){wrong=e;}});
        var right = p_vars.right;
        Object.getOwnPropertyDescriptor(this,'right') || Object.defineProperty(this,'right', {get: function(){return right;},set: function(e){right=e;}});
        var wrongAnswers = p_vars.wrongAnswers;
        Object.getOwnPropertyDescriptor(this,'wrongAnswers') || Object.defineProperty(this,'wrongAnswers', {get: function(){return wrongAnswers;},set: function(e){wrongAnswers=e;}});
        var rightAnswers = p_vars.rightAnswers;
        Object.getOwnPropertyDescriptor(this,'rightAnswers') || Object.defineProperty(this,'rightAnswers', {get: function(){return rightAnswers;},set: function(e){rightAnswers=e;}});
        var rules = p_vars.rules;
        Object.getOwnPropertyDescriptor(this,'rules') || Object.defineProperty(this,'rules', {get: function(){return rules;},set: function(e){rules=e;}});
        var total = p_vars.total;
        Object.getOwnPropertyDescriptor(this,'total') || Object.defineProperty(this,'total', {get: function(){return total;},set: function(e){total=e;}});
        var totalCount = p_vars.totalCount;
        Object.getOwnPropertyDescriptor(this,'totalCount') || Object.defineProperty(this,'totalCount', {get: function(){return totalCount;},set: function(e){totalCount=e;}});
        var totalTime = p_vars.totalTime;
        Object.getOwnPropertyDescriptor(this,'totalTime') || Object.defineProperty(this,'totalTime', {get: function(){return totalTime;},set: function(e){totalTime=e;}});
        var currentCount = p_vars.currentCount;
        Object.getOwnPropertyDescriptor(this,'currentCount') || Object.defineProperty(this,'currentCount', {get: function(){return currentCount;},set: function(e){currentCount=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            level:1
          };
          this.rules=Rules();
          this.level=properties.level;
          this.wrongAnswers=0;
          this.wrong=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            'position':'absolute',
            'top':'0px',
            'right':'200px',
            'white-space':'nowrap',
            'height':'100px',
            'width':'100px',
            'color':'transparent',
            'font-family':'Albertino',
            'font-size':'50px',
            '-webkit-transform':'translateY(0%)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).textShadow(Main.shadow).text('  \u2718').insert(document.body);
          this.rightAnswers=0;
          this.right=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            'position':'absolute',
            'top':'0px',
            'right':'350px',
            'white-space':'nowrap',
            'height':'100px',
            'width':'100px',
            'color':'transparent',
            'font-family':'Albertino',
            'font-size':'50px',
            '-webkit-transform':'translateY(0%)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).textShadow(Main.shadow).text('  \u2714').insert(document.body);
          this.totalCount=10;
          this.currentCount=1;
          this.total=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            'position':'absolute',
            'top':'0px',
            'right':'90%',
            'white-space':'nowrap',
            'height':'100px',
            'width':'100px',
            'color':'transparent',
            'font-family':'Albertino',
            'font-size':'50px',
            '-webkit-transform':'translateY(0%)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).textShadow(Main.shadow).text(this.currentCount + " of " + this.totalCount).insert(document.body);
        }
        return ctor.apply(this,args) || this;
      }
      Checker.prototype['answer'] = function(guess) {
        if(!this.totalTime) {
          this.totalTime=new Date();
        }
        guess?this.right.style({
          'color':'green'
        }).updateText((++this.rightAnswers) + ' \u2714'):this.wrong.style({
          'color':'red'
        }).updateText((++this.wrongAnswers) + ' \u2718');
        this.currentCount++;
        this.total.updateText(this.currentCount + " of " + this.totalCount);
        if(this.currentCount > this.totalCount) {
          var now=new Date().getTime();
          var start=this.totalTime.getTime();
          this.elapsed=Math.round((now - start) / 1000);
          this.elapsed+=5 * this.wrongAnswers;
          var belt=this.rules.beltLevel(this.level,this.elapsed);
          this.reset();
        }
      };
      Checker.prototype['reset'] = function() {
        this.wrongAnswers=0;
        this.rightAnswers=0;
        this.totalCount=10;
        this.currentCount=1;
        this.right.style({
          'color':'transparent'
        }).updateText(' \u2714');
        this.wrong.style({
          'color':'transparent'
        }).updateText(' \u2718');
        this.total.updateText(this.currentCount + " of " + this.totalCount);
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Checker;
        return new Checker(args && args.length && args[0]);
      };
    })();
    var Levels = (function() {
      function Levels() {
        function privateData() {
          this.levels = null;
          this.one = null;
          this.two = null;
          this.three = null;
          this.four = null;
          this.title = null;
        }
        var p_vars = new privateData();
        var levels = p_vars.levels;
        Object.getOwnPropertyDescriptor(this,'levels') || Object.defineProperty(this,'levels', {get: function(){return levels;},set: function(e){levels=e;}});
        var one = p_vars.one;
        Object.getOwnPropertyDescriptor(this,'one') || Object.defineProperty(this,'one', {get: function(){return one;},set: function(e){one=e;}});
        var two = p_vars.two;
        Object.getOwnPropertyDescriptor(this,'two') || Object.defineProperty(this,'two', {get: function(){return two;},set: function(e){two=e;}});
        var three = p_vars.three;
        Object.getOwnPropertyDescriptor(this,'three') || Object.defineProperty(this,'three', {get: function(){return three;},set: function(e){three=e;}});
        var four = p_vars.four;
        Object.getOwnPropertyDescriptor(this,'four') || Object.defineProperty(this,'four', {get: function(){return four;},set: function(e){four=e;}});
        var title = p_vars.title;
        Object.getOwnPropertyDescriptor(this,'title') || Object.defineProperty(this,'title', {get: function(){return title;},set: function(e){title=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.onone=this.onone.bind(this);
          this.ontwo=this.ontwo.bind(this);
          this.onthree=this.onthree.bind(this);
          this.onfour=this.onfour.bind(this);
          this.title=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('levels:');
          this.one=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateY(100px)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('1').on(['touchend'],this.onone);
          this.two=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(80px) translateY(100px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('2').on(['touchend'],this.ontwo);
          this.three=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(160px) translateY(100px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('3').on(['touchend'],this.onthree);
          this.four=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(240px) translateY(100px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('4').on(['touchend'],this.onfour);
          this.levels=monads.DOMable({
            tagName:'div'
          }).on('load').add(this.title).add(this.one).add(this.two).add(this.three).add(this.four);
          return this.levels;
        }
        return ctor.apply(this,args) || this;
      }
      Levels.prototype['onone'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'level',
          canBubble:false,
          isCanceleable:true,
          detail:'1'
        }));
      };
      Levels.prototype['ontwo'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'level',
          canBubble:false,
          isCanceleable:true,
          detail:'2'
        }));
      };
      Levels.prototype['onthree'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'level',
          canBubble:false,
          isCanceleable:true,
          detail:'3'
        }));
      };
      Levels.prototype['onfour'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'level',
          canBubble:false,
          isCanceleable:true,
          detail:'4'
        }));
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Levels;
        return new Levels(args && args.length && args[0]);
      };
    })();
    var Container = (function() {
      function Container() {
        function privateData() {
          this.controller = null;
          this.element = null;
          this.enabled = null;
          this.cube = null;
          this.front = null;
          this.back = null;
          this.right = null;
          this.left = null;
          this.top = null;
          this.bottom = null;
          this.x = null;
          this.xangle = null;
          this.xstart = null;
          this.y = null;
          this.yangle = null;
          this.ystart = null;
          this.thresholdY = null;
          this.thresholdX = null;
          this.directionY = null;
          this.directionX = null;
        }
        var p_vars = new privateData();
        var controller = p_vars.controller;
        Object.getOwnPropertyDescriptor(this,'controller') || Object.defineProperty(this,'controller', {get: function(){return controller;},set: function(e){controller=e;}});
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var enabled = p_vars.enabled;
        Object.getOwnPropertyDescriptor(this,'enabled') || Object.defineProperty(this,'enabled', {get: function(){return enabled;},set: function(e){enabled=e;}});
        var cube = p_vars.cube;
        Object.getOwnPropertyDescriptor(this,'cube') || Object.defineProperty(this,'cube', {get: function(){return cube;},set: function(e){cube=e;}});
        var front = p_vars.front;
        Object.getOwnPropertyDescriptor(this,'front') || Object.defineProperty(this,'front', {get: function(){return front;},set: function(e){front=e;}});
        var back = p_vars.back;
        Object.getOwnPropertyDescriptor(this,'back') || Object.defineProperty(this,'back', {get: function(){return back;},set: function(e){back=e;}});
        var right = p_vars.right;
        Object.getOwnPropertyDescriptor(this,'right') || Object.defineProperty(this,'right', {get: function(){return right;},set: function(e){right=e;}});
        var left = p_vars.left;
        Object.getOwnPropertyDescriptor(this,'left') || Object.defineProperty(this,'left', {get: function(){return left;},set: function(e){left=e;}});
        var top = p_vars.top;
        Object.getOwnPropertyDescriptor(this,'top') || Object.defineProperty(this,'top', {get: function(){return top;},set: function(e){top=e;}});
        var bottom = p_vars.bottom;
        Object.getOwnPropertyDescriptor(this,'bottom') || Object.defineProperty(this,'bottom', {get: function(){return bottom;},set: function(e){bottom=e;}});
        var x = p_vars.x;
        Object.getOwnPropertyDescriptor(this,'x') || Object.defineProperty(this,'x', {get: function(){return x;},set: function(e){x=e;}});
        var xangle = p_vars.xangle;
        Object.getOwnPropertyDescriptor(this,'xangle') || Object.defineProperty(this,'xangle', {get: function(){return xangle;},set: function(e){xangle=e;}});
        var xstart = p_vars.xstart;
        Object.getOwnPropertyDescriptor(this,'xstart') || Object.defineProperty(this,'xstart', {get: function(){return xstart;},set: function(e){xstart=e;}});
        var y = p_vars.y;
        Object.getOwnPropertyDescriptor(this,'y') || Object.defineProperty(this,'y', {get: function(){return y;},set: function(e){y=e;}});
        var yangle = p_vars.yangle;
        Object.getOwnPropertyDescriptor(this,'yangle') || Object.defineProperty(this,'yangle', {get: function(){return yangle;},set: function(e){yangle=e;}});
        var ystart = p_vars.ystart;
        Object.getOwnPropertyDescriptor(this,'ystart') || Object.defineProperty(this,'ystart', {get: function(){return ystart;},set: function(e){ystart=e;}});
        var thresholdY = p_vars.thresholdY;
        Object.getOwnPropertyDescriptor(this,'thresholdY') || Object.defineProperty(this,'thresholdY', {get: function(){return thresholdY;},set: function(e){thresholdY=e;}});
        var thresholdX = p_vars.thresholdX;
        Object.getOwnPropertyDescriptor(this,'thresholdX') || Object.defineProperty(this,'thresholdX', {get: function(){return thresholdX;},set: function(e){thresholdX=e;}});
        var directionY = p_vars.directionY;
        Object.getOwnPropertyDescriptor(this,'directionY') || Object.defineProperty(this,'directionY', {get: function(){return directionY;},set: function(e){directionY=e;}});
        var directionX = p_vars.directionX;
        Object.getOwnPropertyDescriptor(this,'directionX') || Object.defineProperty(this,'directionX', {get: function(){return directionX;},set: function(e){directionX=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.enabled=false;
          this.onstart=this.onstart.bind(this);
          this.onswipe=this.onswipe.bind(this);
          this.onend=this.onend.bind(this);
          this.controller=properties.controller;
          this.cube=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'id':'cube'
          });
          this.front=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'front'
          });
          properties.front && this.front.add(properties.front);
          this.back=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'back'
          });
          properties.back && this.back.add(properties.back);
          this.right=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'right'
          });
          properties.right && this.right.add(properties.right);
          this.left=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'left'
          });
          properties.left && this.left.add(properties.left);
          this.top=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'top'
          });
          properties.top && this.top.add(properties.top);
          this.bottom=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'bottom'
          });
          properties.bottom && this.bottom.add(properties.bottom);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'container'
          }).add(this.cube.add(this.front).add(this.back).add(this.right).add(this.left).add(this.top).add(this.bottom)).on(['touchstart'],this.onstart).on(['touchmove'],this.onswipe).on(['touchend'],this.onend);
          this.xangle=0;
          this.yangle=0;
        }
        return ctor.apply(this,args) || this;
      }
      Container.prototype['showFront'] = function() {
        this.cube.attributes({
          'class':'show-front'
        });
        return this;
      };
      Container.prototype['showRight'] = function() {
        this.cube.attributes({
          'class':'show-right'
        });
        return this;
      };
      Container.prototype['showLeft'] = function() {
        this.cube.attributes({
          'class':'show-left'
        });
        return this;
      };
      Container.prototype['showBack'] = function() {
        this.cube.attributes({
          'class':'show-back'
        });
        return this;
      };
      Container.prototype['showTop'] = function() {
        this.cube.attributes({
          'class':'show-top'
        });
        return this;
      };
      Container.prototype['showBottom'] = function() {
        this.cube.attributes({
          'class':'show-bottom'
        });
        return this;
      };
      Container.prototype['onstart'] = function(event) {
        event.preventDefault();
        this.ystart=event.touches[0].clientY;
        this.xstart=event.touches[0].clientX;
        this.cube.element().style.webkitTransition='none';
        return this;
      };
      Container.prototype['onswipe'] = function(event) {
        event.preventDefault();
        if(this.enabled) {
          this.y=event.touches[0].clientY;
          this.x=event.touches[0].clientX;
          this.thresholdY=Math.abs(this.y - this.ystart);
          this.directionY=this.y - this.ystart;
          this.thresholdX=Math.abs(this.x - this.xstart);
          this.directionX=this.x - this.xstart;
          if(this.thresholdX > this.thresholdY && this.thresholdX > 10) {
            if(this.directionX < 0) {
              var tangle=this.xangle + this.directionX;
              this.cube.element().style.webkitTransform='translateZ(-500px) rotateY(' + tangle + 'deg)';
            }
          }
        }
        return this;
      };
      Container.prototype['onend'] = function(event) {
        event.preventDefault();
        this.cube.element().style.webkitTransition='-webkit-transform 1s';
        if(this.enabled) {
          if(this.thresholdX > this.thresholdY && this.thresholdX > 10) {
            if(this.directionX < 0) {
              this.rotateRight();
              this.controller.onnext(event);
            }
          }
        }
        return this;
      };
      Container.prototype['rotateRight'] = function() {
        this.xangle-=90;
        this.cube.element().style.webkitTransform='translateZ(-500px) rotateY(' + this.xangle + 'deg)';
        return this;
      };
      Container.init = (function () {
        var styles=[{
          selector:'.container',
          style:"top:15%;width:200px;height:200px;position:relative;margin:0 auto 40px;-webkit-perspective:1000px;"
        },{
          selector:'#cube',
          style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transition:-webkit-transform 1s;"
        },{
          selector:'#cube.show-front',
          style:"-webkit-transform:translateZ(-500px);"
        },{
          selector:'#cube.show-back',
          style:"-webkit-transform:translateZ(-500px) rotateX(-180deg);"
        },{
          selector:'#cube.show-right',
          style:"-webkit-transform:translateZ(-500px) rotateY(-90deg);"
        },{
          selector:'#cube.show-left',
          style:"-webkit-transform:translateZ(-500px) rotateY(90deg);"
        },{
          selector:'#cube.show-top',
          style:"-webkit-transform:translateZ(-500px) rotateX(-90deg);"
        },{
          selector:'#cube.show-bottom',
          style:"-webkit-transform:translateZ(-500px) rotateX(90deg);"
        },{
          selector:'#cube div',
          style:"display:block;position:absolute;width:100%;height:100%;-webkit-backface-visibility:hidden;"
        },{
          selector:'#cube .front',
          style:"-webkit-transform:translateZ(500px);"
        },{
          selector:'#cube .back',
          style:"-webkit-transform:rotateY(180deg) translateZ(500px);"
        },{
          selector:'#cube .right',
          style:"-webkit-transform:rotateY(90deg) translateZ(500px);"
        },{
          selector:'#cube .left',
          style:"-webkit-transform:rotateY(-90deg) translateZ(500px);"
        },{
          selector:'#cube .top',
          style:"-webkit-transform:rotateX(90deg) translateZ(500px);"
        },{
          selector:'#cube .bottom',
          style:"-webkit-transform:rotateX(-90deg) translateZ(500px);"
        },{
          selector:'@-webkit-keyframes swipehint',
          style:"0% {-webkit-transform: rotateY(95deg) translateZ(500px);}30% {-webkit-transform: rotateY(85deg) translateZ(500px);}60%  {-webkit-transform: rotateY(93deg) translateZ(500px);}80% {-webkit-transform: rotateY(87deg) translateZ(500px);}100% {-webkit-transform: rotateY(90deg) translateZ(500px);}"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Container.init;
        __.constructor = Container;
        return new Container(args && args.length && args[0]);
      };
    })();
    exports.Container = Container;
    var Main = (function() {
      function Main() {
        function privateData() {
          this.activeSide = null;
          this.bestGuess = null;
          this.container = null;
          this.checker = null;
          this.color = null;
          this.equation = null;
          this.equations = null;
          this.frame = null;
          this.level = null;
          this.ninja = null;
          this.operation = null;
          this.problems = null;
          this.play = null;
          this.screens = null;
          this.sequence = null;
          this.title = null;
        }
        var p_vars = new privateData();
        var activeSide = p_vars.activeSide;
        Object.getOwnPropertyDescriptor(this,'activeSide') || Object.defineProperty(this,'activeSide', {get: function(){return activeSide;},set: function(e){activeSide=e;}});
        var bestGuess = p_vars.bestGuess;
        Object.getOwnPropertyDescriptor(this,'bestGuess') || Object.defineProperty(this,'bestGuess', {get: function(){return bestGuess;},set: function(e){bestGuess=e;}});
        var container = p_vars.container;
        Object.getOwnPropertyDescriptor(this,'container') || Object.defineProperty(this,'container', {get: function(){return container;},set: function(e){container=e;}});
        var checker = p_vars.checker;
        Object.getOwnPropertyDescriptor(this,'checker') || Object.defineProperty(this,'checker', {get: function(){return checker;},set: function(e){checker=e;}});
        var color = p_vars.color;
        Object.getOwnPropertyDescriptor(this,'color') || Object.defineProperty(this,'color', {get: function(){return color;},set: function(e){color=e;}});
        var equation = p_vars.equation;
        Object.getOwnPropertyDescriptor(this,'equation') || Object.defineProperty(this,'equation', {get: function(){return equation;},set: function(e){equation=e;}});
        var equations = p_vars.equations;
        Object.getOwnPropertyDescriptor(this,'equations') || Object.defineProperty(this,'equations', {get: function(){return equations;},set: function(e){equations=e;}});
        var frame = p_vars.frame;
        Object.getOwnPropertyDescriptor(this,'frame') || Object.defineProperty(this,'frame', {get: function(){return frame;},set: function(e){frame=e;}});
        var level = p_vars.level;
        Object.getOwnPropertyDescriptor(this,'level') || Object.defineProperty(this,'level', {get: function(){return level;},set: function(e){level=e;}});
        var ninja = p_vars.ninja;
        Object.getOwnPropertyDescriptor(this,'ninja') || Object.defineProperty(this,'ninja', {get: function(){return ninja;},set: function(e){ninja=e;}});
        var operation = p_vars.operation;
        Object.getOwnPropertyDescriptor(this,'operation') || Object.defineProperty(this,'operation', {get: function(){return operation;},set: function(e){operation=e;}});
        var problems = p_vars.problems;
        Object.getOwnPropertyDescriptor(this,'problems') || Object.defineProperty(this,'problems', {get: function(){return problems;},set: function(e){problems=e;}});
        var play = p_vars.play;
        Object.getOwnPropertyDescriptor(this,'play') || Object.defineProperty(this,'play', {get: function(){return play;},set: function(e){play=e;}});
        var screens = p_vars.screens;
        Object.getOwnPropertyDescriptor(this,'screens') || Object.defineProperty(this,'screens', {get: function(){return screens;},set: function(e){screens=e;}});
        var sequence = p_vars.sequence;
        Object.getOwnPropertyDescriptor(this,'sequence') || Object.defineProperty(this,'sequence', {get: function(){return sequence;},set: function(e){sequence=e;}});
        var title = p_vars.title;
        Object.getOwnPropertyDescriptor(this,'title') || Object.defineProperty(this,'title', {get: function(){return title;},set: function(e){title=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.ontouchstart=this.ontouchstart.bind(this);
          this.ontouchmove=this.ontouchmove.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          this.onorientationchange=this.onorientationchange.bind(this);
          this.onguess=this.onguess.bind(this);
          this.onnext=this.onnext.bind(this);
          this.onplay=this.onplay.bind(this);
          this.onlevel=this.onlevel.bind(this);
          this.reset=this.reset.bind(this);
          this.swipehint=this.swipehint.bind(this);
          controller.Controller.subscribe('guess',this.onguess);
          controller.Controller.subscribe('next',this.onnext);
          controller.Controller.subscribe('play',this.onplay);
          controller.Controller.subscribe('level',this.onlevel);
          this.equations=[];
          this.activeSide=0;
          this.bestGuess='?';
          this.screens=Container({
            controller:this,
            top:Levels()
          }).showTop();
          this.level=1;
          this.sequence=[{
            side:'right',
            board:planks.WoodPlank3()
          },{
            side:'back',
            board:planks.WoodPlank3()
          },{
            side:'left',
            board:planks.WoodPlank3()
          },{
            side:'front',
            board:planks.WoodPlank3()
          }];
          this.screens.right.add(this.sequence[0].board.element);
          this.screens.back.add(this.sequence[1].board.element);
          this.screens.left.add(this.sequence[2].board.element);
          this.title=Title();
          this.problems=[];
          this.ninja=cubesvgs.Ninja();
          this.frame=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'id':'frame'
          }).add(monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'inner'
          }).add(this.title));
          this.ninja.element.insert(document.body);
          this.container=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'id':'container'
          }).add(this.frame).insert(document.body);
          this.screens.element.insert(document.body);
          monads.DOMable({
            element:document.body
          }).on('touchstart',this.ontouchstart).on('touchmove',this.ontouchmove).on(['touchend'],this.ontouchend);
          monads.DOMable({
            element:window
          }).on('orientationchange',this.onorientationchange);
          this.onorientationchange();
        }
        return ctor.apply(this,args) || this;
      }
      Main.prototype['reset'] = function(side) {
        this.screens.front.removeChildren().add(this.sequence[3].board.element);
        return this;
      };
      Main.prototype['swipehint'] = function() {
        this.screens.right.style({
          '-webkit-animation':'swipehint 1s'
        });
        return this;
      };
      Main.prototype['onlevel'] = function(event) {
        var plus=cubesvgs.Plus(),minus,multiply,divide;
        switch(event.detail) {
          case "1":
            this.level=1;
            minus=cubesvgs.Minus();
            this.screens.front.add(plus).add(minus);
            setTimeout(function () {
              minus.style({
                '-webkit-transition':'-webkit-transform 1s, opacity 1s',
                '-webkit-transform':'translateX(73%)',
                'opacity':'1'
              });
            },250);
            this.ninja.rotateSword();
            break;
          case "2":
            this.level=2;
            minus=cubesvgs.Minus();
            this.screens.front.add(plus).add(minus);
            setTimeout(function () {
              minus.style({
                '-webkit-transition':'-webkit-transform 1s, opacity 1s',
                '-webkit-transform':'translateX(73%)',
                'opacity':'1'
              });
            },250);
            this.ninja.raiseSword();
            break;
          case "3":
            this.level=3;
            minus=cubesvgs.Minus();
            multiply=cubesvgs.Multiply();
            this.screens.front.add(plus).add(minus).add(multiply);
            setTimeout(function () {
              minus.style({
                '-webkit-transition':'-webkit-transform 1s, opacity 1s',
                '-webkit-transform':'translateX(73%)',
                'opacity':'1'
              });
            },250);
            setTimeout(function () {
              multiply.style({
                '-webkit-transition':'-webkit-transform 1s, opacity 1s',
                '-webkit-transform':'translateX(150%)',
                'opacity':'1'
              });
            },500);
            this.ninja.raiseSword();
            break;
          case "4":
          default:
            this.level=4;
            minus=cubesvgs.Minus();
            multiply=cubesvgs.Multiply();
            divide=cubesvgs.Divide();
            this.screens.front.add(plus).add(minus).add(multiply).add(divide);
            setTimeout(function () {
              minus.style({
                '-webkit-transition':'-webkit-transform 1s, opacity 1s',
                '-webkit-transform':'translateX(73%)',
                'opacity':'1'
              });
            },250);
            setTimeout(function () {
              multiply.style({
                '-webkit-transition':'-webkit-transform 1s, opacity 1s',
                '-webkit-transform':'translateX(150%)',
                'opacity':'1'
              });
            },500);
            setTimeout(function () {
              divide.style({
                '-webkit-transition':'-webkit-transform 1s, opacity 1s',
                '-webkit-transform':'translateX(225%)',
                'opacity':'1'
              });
            },1000);
            this.ninja.raiseSword();
            break;
        }
        this.screens.showFront();
      };
      Main.prototype['onplay'] = function(event) {
        this.checker=Checker({
          level:this.level
        });
        this.color=event.detail.color , this.operation=event.detail.operation;
        for(var i=0;i < 10;++i) {
          this.equations.push(Equation({
            operation:this.operation,
            level:this.level,
            color:this.color
          }));
        }
        this.title.style({
          '-webkit-transform':'translateX(-150px) translateY(-120px) rotateY(-230deg) rotateX(76deg)'
        });
        this.equation=this.equations.pop();
        this.sequence[this.activeSide % 4].board.addEquation(this.equation.equation + ' ' + this.bestGuess);
        this.screens.rotateRight();
        this.problems.push(this.equation);
        VerticalNumberStrip().insert(document.body);
        this.screens.top.style({
          'display':'none'
        });
        setTimeout(this.reset,500);
        this.ninja.play();
        this.screens.element.add(ResultsDropDown({
          title:belts.WhiteBelt()
        }));
        setTimeout(this.swipehint,500);
      };
      Main.prototype['onguess'] = function(event) {
        var number=event.detail;
        if(number === VerticalNumberStrip.backspace) {
          if(this.bestGuess.length && this.bestGuess !== '?') {
            this.bestGuess=this.bestGuess.substring(0,this.bestGuess.length - 1);
          }
        } else {
          if(this.bestGuess.length && this.bestGuess === '?') {
            this.bestGuess=number;
          } else {
            this.bestGuess+=number;
          }
        }
        this.sequence[this.activeSide % 4].board.addEquation(this.equation.equation + ' ' + this.bestGuess);
        this.screens.enabled=true;
      };
      Main.prototype['onnext'] = function(event) {
        var answer=this.equation.answer;
        var guess=parseInt(this.bestGuess);
        var correct=answer === guess;
        this.checker.answer(correct);
        this.bestGuess='?';
        this.screens.enabled=false;
        var oldboard=this.sequence[this.activeSide % 4].board;
        this.activeSide++;
        var oldequation=this.equation;
        this.equation=this.equations.pop();
        this.sequence[this.activeSide % 4].board.addEquation(this.equation.equation + ' ' + this.bestGuess);
        setTimeout(function () {
          oldequation.equation="";
        },500);
        this.problems.push(this.equation);
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
      Main.prototype['onorientationchange'] = function(event) {
        if(window.orientation == 0) {
        } else if(window.orientation == 90) {
        } else if(window.orientation == -90) {
        } else if(window.orientation == 180) {
        }
      };
      Main.blackbelt = '#211e1e';
      Main.bluebelt = '#00abee';
      Main.brownbelt = '#825130';
      Main.greenbelt = '#3fb83a';
      Main.orangebelt = '#f58511';
      Main.purplebelt = '#3fb83a';
      Main.redbelt = '#f04521';
      Main.yellowbelt = '#fff000';
      Main.whitebelt = '#ffffff';
      Main.shadow = ['0 1px 0 #ccc','0 2px 0 #c9c9c9','0 3px 0 #bbb','0 4px 0 #b9b9b9','0 5px 0 #aaa','0 6px 1px rgba(0,0,0,0.1)','0 0 5px rgba(0,0,0,0.1)','0 1px 3px rgba(0,0,0,0.3)','0 3px 5px rgba(0,0,0,0.2)','0 5px 10px rgba(0,0,0,0.25)','0 10px 10px rgba(0,0,0,0.2)','0 20px 20px rgba(0,0,0,0.15)'];
      Main.init = (function () {
        var styles=[{
          selector:'@font-face',
          style:'font-family:Albertino;src:url(/cube/lib/Albertino_1.0.ttf);'
        },{
          selector:'body',
          style:"background:white;"
        },{
          selector:'#container',
          style:"position:absolute;left:45%;margin-left:-100px;top:35%;margin-top:-100px;height:200px;width:200px;-webkit-perspective:800;"
        },{
          selector:'#frame',
          style:"opacity: 1.0;width: 200px;-webkit-transform-style: preserve-3d;-webkit-transform: translateZ(150px);-webkit-transition: all 0.5s linear;"
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
          selector:'.inner .f',
          style:"top:-100px;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.blackbelt = Main.blackbelt;
        __.bluebelt = Main.bluebelt;
        __.brownbelt = Main.brownbelt;
        __.greenbelt = Main.greenbelt;
        __.orangebelt = Main.orangebelt;
        __.purplebelt = Main.purplebelt;
        __.redbelt = Main.redbelt;
        __.yellowbelt = Main.yellowbelt;
        __.whitebelt = Main.whitebelt;
        __.shadow = Main.shadow;
        __.init = Main.init;
        __.constructor = Main;
        return new Main(args && args.length && args[0]);
      };
    })();
    exports.Main = Main;
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
    const App=AppType;
    exports.App = App;
  })(require, nm.getExports(), nm.getId());
})();

