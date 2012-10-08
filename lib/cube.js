(function() {
  var nm = module.Module('cube');
  (function(require, exports, moduleId) {
    var log = require('log');
    var monads = require('monads');
    var controller = require('controller');
    var events = require('events');
    var svg = require('svg');
    var carousel = require('numbers');
    var canvas = require('canvas');
    var Sparkles = (function() {
      function Sparkles() {
        function privateData() {
          this.element = null;
          this.stage = null;
          this.imgSeq = null;
          this.bmpSeq = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var stage = p_vars.stage;
        Object.getOwnPropertyDescriptor(this,'stage') || Object.defineProperty(this,'stage', {get: function(){return stage;},set: function(e){stage=e;}});
        var imgSeq = p_vars.imgSeq;
        Object.getOwnPropertyDescriptor(this,'imgSeq') || Object.defineProperty(this,'imgSeq', {get: function(){return imgSeq;},set: function(e){imgSeq=e;}});
        var bmpSeq = p_vars.bmpSeq;
        Object.getOwnPropertyDescriptor(this,'bmpSeq') || Object.defineProperty(this,'bmpSeq', {get: function(){return bmpSeq;},set: function(e){bmpSeq=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.onimageload=this.onimageload.bind(this);
          this.tick=this.tick.bind(this);
          this.imgSeq=new Image();
          this.element=monads.DOMable({
            tagName:'canvas'
          }).on('load').attributes({
            'id':'testCanvas',
            width:'980',
            height:'680'
          }).style({
            'background-color':'transparent',
            'left':'20%',
            'position':'absolute'
          }).insert(document.body).element();
          this.stage=canvas.Stage({
            autoClear:false,
            canvas:this.element
          });
          this.imgSeq.onload=this.onimageload;
          this.imgSeq.src="img/sparkle_21x23.png";
        }
        return ctor.apply(this,args) || this;
      }
      Sparkles.prototype['onimageload'] = function() {
        this.stage.addChild(canvas.Shape({
          alpha:0.33,
          graphics:canvas.Graphics().beginFill('transparent').drawRect(0,0,this.element.width + 1,this.element.height)
        }));
        this.bmpSeq=canvas.BitmapSequence({
          regX:10.5,
          regY:11.5,
          spriteSheet:canvas.SpriteSheet({
            image:this.imgSeq,
            frameWidth:21,
            frameHeight:23
          })
        });
        canvas.Ticker.addListener(this);
      };
      Sparkles.prototype['tick'] = function() {
        var h=this.element.height;
        var l=this.stage.getNumChildren();
        for(var i=l - 1;i > 0;i--) {
          var sparkle=this.stage.getChildAt(i);
          sparkle.vY+=2;
          sparkle.vX*=0.98;
          sparkle.x+=sparkle.vX;
          sparkle.y+=sparkle.vY;
          sparkle.scaleX=sparkle.scaleY=sparkle.scaleX + sparkle.vS;
          sparkle.alpha+=sparkle.vA;
          if(sparkle.y > h) {
            sparkle.vY*=-0.6;
            sparkle.y-=sparkle.y % h;
          }
          if(sparkle.alpha <= 0) {
            this.stage.removeChildAt(i);
          }
        }
        this.stage.update();
      };
      Sparkles.prototype['addSparkles'] = function(count,x,y,speed) {
        for(var i=0;i < count;i++) {
          var sparkle=canvas.BitmapSequence(this.bmpSeq);
          sparkle.x=x;
          sparkle.y=y;
          sparkle.rotation=Math.random() * 360;
          sparkle.alpha=Math.random() * 0.5 + 0.5;
          sparkle.scaleX=sparkle.scaleY=Math.random() + 0.3;
          sparkle.compositeOperation="lighter";
          var a=Math.PI * 2 * Math.random();
          var v=(Math.random() - 0.5) * 30 * speed;
          sparkle.vX=Math.cos(a) * v;
          sparkle.vY=Math.sin(a) * v;
          sparkle.vS=(Math.random() - 0.5) * 0.2;
          sparkle.vA=-Math.random() * 0.05 - 0.01;
          sparkle.currentFrame=Math.random() * 12 | 0;
          this.stage.addChild(sparkle);
        }
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Sparkles;
        return new Sparkles(args && args.length && args[0]);
      };
    })();
    var ProgressBar = (function() {
      function ProgressBar() {
        function privateData() {
          this.element = null;
          this.div = null;
          this.time = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var div = p_vars.div;
        Object.getOwnPropertyDescriptor(this,'div') || Object.defineProperty(this,'div', {get: function(){return div;},set: function(e){div=e;}});
        var time = p_vars.time;
        Object.getOwnPropertyDescriptor(this,'time') || Object.defineProperty(this,'time', {get: function(){return time;},set: function(e){time=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            time:5
          };
          this.oncountdown=this.oncountdown.bind(this);
          this.oniteration=this.oniteration.bind(this);
          this.onend=this.onend.bind(this);
          this.time=properties.time;
          this.div=monads.DOMable({
            tagName:'div'
          }).on('load');
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'id':'progressbar'
          }).add(div.element()).insert(document.body);
        }
        return ctor.apply(this,args) || this;
      }
      ProgressBar.prototype['start'] = function() {
        this.div.animation({
          property:'progress',
          time:this.time + 's',
          count:'infinite'
        });
        this.div.element().addEventListener('webkitAnimationStart',this.onstart);
        this.div.element().addEventListener('webkitAnimationIteration',this.oniteration);
      };
      ProgressBar.prototype['oncountdown'] = function() {
        log.Logger.debug(this,'oncountdown');
      };
      ProgressBar.prototype['oniteration'] = function() {
        controller.Controller.publish(events.CustomEvent({
          type:'timeout',
          canBubble:false,
          isCanceleable:true
        }));
      };
      ProgressBar.prototype['onend'] = function() {
        log.Logger.debug(this,'onend');
      };
      ProgressBar.init = (function () {
        var styles=[{
          selector:'#progressbar',
          style:"margin-top:15px;margin-left:35%;width:20%;background-color:transparent;border-radius:13px;padding:3px;"
        },{
          selector:'#progressbar div',
          style:"background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0.45, rgb(255,132,25)), color-stop(0.73, rgb(234,235,193)), color-stop(0.87, rgb(255,132,25)));width:90%;height:20px;border-radius:10px;"
        },{
          selector:'@-webkit-keyframes progress',
          style:"from {width:100%;} to {width:0%;}"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = ProgressBar.init;
        __.constructor = ProgressBar;
        return new ProgressBar(args && args.length && args[0]);
      };
    })();
    var Equation = (function() {
      function Equation() {
        function privateData() {
          this.sections = null;
          this.guessindex = null;
          this.instance = null;
        }
        var p_vars = new privateData();
        var sections = p_vars.sections;
        Object.getOwnPropertyDescriptor(this,'sections') || Object.defineProperty(this,'sections', {get: function(){return sections;},set: function(e){sections=e;}});
        var guessindex = p_vars.guessindex;
        Object.getOwnPropertyDescriptor(this,'guessindex') || Object.defineProperty(this,'guessindex', {get: function(){return guessindex;},set: function(e){guessindex=e;}});
        var instance = p_vars.instance;
        Object.getOwnPropertyDescriptor(this,'instance') || Object.defineProperty(this,'instance', {get: function(){return instance;},set: function(e){instance=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.onnext=this.onnext.bind(this);
          this.guessindex=0;
          this.operation=properties.operation;
          this.sections=this.equation;
          this.sections.element.style({
            'font-family':'Albertino',
            'color':properties.color
          }).textShadow(Main.shadow);
          monads.Styleable([{
            selector:'.sections > .section > .carousel > .field',
            style:"color:" + properties.color + ";"
          }]).on("load").onstyle();
          this.sections.sections[4].element.on(['touchend','click'],this.onnext);
        }
        return ctor.apply(this,args) || this;
      }
      Equation.prototype['answer'] = function() {
        var operand1=this.instance.sections[0].carousel.children[0].text();
        var operator=this.instance.sections[1].carousel.children[0].text();
        var operand2=this.instance.sections[2].carousel.children[0].text();
        var value;
        switch(operator) {
          case '\u002B':
            value=parseInt(operand1) + parseInt(operand2);
            break;
          case '\u002D':
            value=parseInt(operand1) - parseInt(operand2);
            break;
          case '\u00D7':
            value=parseInt(operand1) * parseInt(operand2);
            break;
          case '\u003D':
            value=parseInt(operand1) / parseInt(operand2);
            break;
        }
        return value;
      };
      Equation.prototype['clear'] = function() {
        this.instance.sections[0].carousel.next();
        this.instance.sections[2].carousel.next();
      };
      Equation.prototype['guess'] = function() {
        return parseInt(this.instance.sections[4].carousel.children[this.guessindex].text());
      };
      Equation.prototype['onnext'] = function() {
        this.guessindex++;
        if(this.guessindex === this.sections.sections[4].carousel.children.length) {
          this.guessindex=0;
        }
        this.sections && this.sections.sections && this.sections.sections[4].carousel.next();
      };
      Object.defineProperty(Equation.prototype,'equation', {get: function(){      var operand1,operand2,answer,guess,guesses=[];
      switch(this.operation) {
        case 'minus':
          operand1=Math.round(Math.random() * 100);
          operand2=operand1 + Math.round(Math.random() * 100);
          answer=operand2 - operand1;
          guesses.push(answer + '');
          guess=answer + Math.round(Math.random() * 10);
          guesses.push(guess + '');
          guess=answer - Math.round(Math.random() * 10);
          guesses.push(guess + '');
          guesses.sort();
          this.instance=carousel.Sections({
            sets:[[operand2 + '',' ',' ',' '],['\u002D','\u002D','\u002D'],[operand1 + '',' ',' ',' '],['\u003D','\u003D'],guesses]
          });
          break;
        case 'multiply':
          operand1=Math.round(Math.random() * 12);
          operand2=Math.round(Math.random() * 12);
          answer=operand2 * operand1;
          guesses.push(answer + '');
          guess=answer - Math.round(Math.random() * 10);
          guesses.push(guess + '');
          guess=answer + Math.round(Math.random() * 10);
          guesses.push(guess + '');
          guesses.sort();
          this.instance=carousel.Sections({
            sets:[[operand2 + '','1','1','1'],['\u00D7','\u00D7','\u00D7'],[operand1 + '','1','1','1'],['\u003D','\u003D'],guesses]
          });
          break;
        case 'divide':
          this.instance=carousel.Sections({
            sets:[['4','9','1'],['\u00F7','\u00F7','\u00F7'],['3','8','3','9'],['\u003D','\u003D'],['8','10','6']]
          });
          break;
        case 'plus':
          operand1=Math.round(Math.random() * 100);
          operand2=Math.round(Math.random() * 100);
          answer=operand2 + operand1;
          guesses.push(answer + '');
          guess=answer + Math.round(Math.random() * 10);
          guesses.push(guess + '');
          guess=answer - Math.round(Math.random() * 10);
          guesses.push(guess + '');
          guesses.sort();
          this.instance=carousel.Sections({
            sets:[[operand1,'1','1','1'],['\u002B','\u002B','\u002B'],[operand2,'1','1','1'],['\u003D','\u003D'],guesses]
          });
          break;
      }
      return this.instance;
      }});
      Equation.init = (function () {
        var styles=[{
          selector:'.sections > .section',
          style:"border:0;width:200px;"
        },{
          selector:'.sections > .section > .carousel > .field',
          style:"font-size:7em;background:rgba(0,0,0,0);border:0;width:200px;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Equation.init;
        __.constructor = Equation;
        return new Equation(args && args.length && args[0]);
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
            'font-family':'Albertino',
            'font-size':'80px',
            '-webkit-transform':'translateX(-220px) translateY(-120px) rotateY(-230deg) rotateX(76deg)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).textShadow(Main.shadow).text('Ninja Math');
          this.title.delay(this.title.style,[{
            '-webkit-transform':'translateX(-140px) translateY(-120px) rotateY(-230deg) rotateX(0deg)'
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
          this.wrong = null;
          this.right = null;
          this.wrongAnswers = null;
          this.rightAnswers = null;
        }
        var p_vars = new privateData();
        var wrong = p_vars.wrong;
        Object.getOwnPropertyDescriptor(this,'wrong') || Object.defineProperty(this,'wrong', {get: function(){return wrong;},set: function(e){wrong=e;}});
        var right = p_vars.right;
        Object.getOwnPropertyDescriptor(this,'right') || Object.defineProperty(this,'right', {get: function(){return right;},set: function(e){right=e;}});
        var wrongAnswers = p_vars.wrongAnswers;
        Object.getOwnPropertyDescriptor(this,'wrongAnswers') || Object.defineProperty(this,'wrongAnswers', {get: function(){return wrongAnswers;},set: function(e){wrongAnswers=e;}});
        var rightAnswers = p_vars.rightAnswers;
        Object.getOwnPropertyDescriptor(this,'rightAnswers') || Object.defineProperty(this,'rightAnswers', {get: function(){return rightAnswers;},set: function(e){rightAnswers=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.wrongAnswers=0;
          this.wrong=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            'position':'absolute',
            'right':'50px',
            'white-space':'nowrap',
            'height':'100px',
            'width':'100px',
            'color':'transparent',
            'font-family':'Albertino',
            'font-size':'50px',
            '-webkit-transform':'translateY(1%)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).textShadow(Main.shadow).text('  \u2718').insert(document.body);
          this.rightAnswers=0;
          this.right=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            'position':'absolute',
            'right':'150px',
            'white-space':'nowrap',
            'height':'100px',
            'width':'100px',
            'color':'transparent',
            'font-family':'Albertino',
            'font-size':'50px',
            '-webkit-transform':'translateY(1%)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).textShadow(Main.shadow).text('  \u2714').insert(document.body);
        }
        return ctor.apply(this,args) || this;
      }
      Checker.prototype['answer'] = function(guess) {
        guess?this.right.style({
          'color':'green'
        }).updateText((this.rightAnswers++) + ' \u2714'):this.wrong.style({
          'color':'red'
        }).updateText((this.wrongAnswers++) + ' \u2718');
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Checker;
        return new Checker(args && args.length && args[0]);
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
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('\u2794');
          this.play.on(['touchend','click'],this.ontouchend);
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
          }).textShadow(Main.shadow).text('1').on(['click','touchend'],this.onone);
          this.two=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(80px) translateY(100px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('2').on(['click','touchend'],this.ontwo);
          this.three=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(160px) translateY(100px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('3').on(['click','touchend'],this.onthree);
          this.four=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(240px) translateY(100px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('4').on(['click','touchend'],this.onfour);
          this.levels=monads.DOMable({
            tagName:'div'
          }).on('load').add(this.title).add(this.one).add(this.two).add(this.three).add(this.four);
          return this.levels;
        }
        return ctor.apply(this,args) || this;
      }
      Levels.prototype['onone'] = function(event) {
        log.Logger.debug(this,'publishing 1');
        controller.Controller.publish(events.CustomEvent({
          type:'level',
          canBubble:false,
          isCanceleable:true,
          detail:'1'
        }));
      };
      Levels.prototype['ontwo'] = function(event) {
        log.Logger.debug(this,'publishing 2');
        controller.Controller.publish(events.CustomEvent({
          type:'level',
          canBubble:false,
          isCanceleable:true,
          detail:'2'
        }));
      };
      Levels.prototype['onthree'] = function(event) {
        log.Logger.debug(this,'publishing 3');
        controller.Controller.publish(events.CustomEvent({
          type:'level',
          canBubble:false,
          isCanceleable:true,
          detail:'3'
        }));
      };
      Levels.prototype['onfour'] = function(event) {
        log.Logger.debug(this,'publishing 4');
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
    var Difficulty = (function() {
      function Difficulty() {
        function privateData() {
          this.difficulty = null;
          this.easy = null;
          this.easyarrow = null;
          this.hard = null;
          this.hardarrow = null;
        }
        var p_vars = new privateData();
        var difficulty = p_vars.difficulty;
        Object.getOwnPropertyDescriptor(this,'difficulty') || Object.defineProperty(this,'difficulty', {get: function(){return difficulty;},set: function(e){difficulty=e;}});
        var easy = p_vars.easy;
        Object.getOwnPropertyDescriptor(this,'easy') || Object.defineProperty(this,'easy', {get: function(){return easy;},set: function(e){easy=e;}});
        var easyarrow = p_vars.easyarrow;
        Object.getOwnPropertyDescriptor(this,'easyarrow') || Object.defineProperty(this,'easyarrow', {get: function(){return easyarrow;},set: function(e){easyarrow=e;}});
        var hard = p_vars.hard;
        Object.getOwnPropertyDescriptor(this,'hard') || Object.defineProperty(this,'hard', {get: function(){return hard;},set: function(e){hard=e;}});
        var hardarrow = p_vars.hardarrow;
        Object.getOwnPropertyDescriptor(this,'hardarrow') || Object.defineProperty(this,'hardarrow', {get: function(){return hardarrow;},set: function(e){hardarrow=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.oneasy=this.oneasy.bind(this);
          this.onhard=this.onhard.bind(this);
          this.easy=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(0px) translateY(0px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('Easy').on(['click','touchend'],this.oneasy);
          this.hard=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(220px) translateY(0px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('Hard').on(['click','touchend'],this.onhard);
          this.easyarrow=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(-60px) translateY(-10px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('\u2794');
          this.hardarrow=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            'display':'none',
            '-webkit-transform':'translateX(160px) translateY(-10px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'60px'
          }).textShadow(Main.shadow).text('\u2794');
          this.difficulty=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(30px) translateY(230px) rotateY(-230deg)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).add(this.easyarrow).add(this.easy).add(this.hardarrow).add(this.hard);
          return this.difficulty;
        }
        return ctor.apply(this,args) || this;
      }
      Difficulty.prototype['oneasy'] = function(event) {
        this.easyarrow.style({
          'display':'block'
        });
        this.hardarrow.style({
          'display':'none'
        });
        controller.Controller.publish(events.CustomEvent({
          type:'difficulty',
          canBubble:false,
          isCanceleable:true,
          detail:'easy'
        }));
      };
      Difficulty.prototype['onhard'] = function(event) {
        this.easyarrow.style({
          'display':'none'
        });
        this.hardarrow.style({
          'display':'block'
        });
        controller.Controller.publish(events.CustomEvent({
          type:'difficulty',
          canBubble:false,
          isCanceleable:true,
          detail:'hard'
        }));
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Difficulty;
        return new Difficulty(args && args.length && args[0]);
      };
    })();
    var Next = (function() {
      function Next() {
        function privateData() {
          this.element = null;
          this.next = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var next = p_vars.next;
        Object.getOwnPropertyDescriptor(this,'next') || Object.defineProperty(this,'next', {get: function(){return next;},set: function(e){next=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.onnext=this.onnext.bind(this);
          this.next=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(0px) translateY(0px) rotateY(0deg)',
            'white-space':'nowrap',
            'height':'100px',
            'color':'#78bf2b',
            'font-family':'Albertino',
            'font-size':'8em'
          }).textShadow(Main.shadow).text('\u2794').on(['click','touchend'],this.onnext);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').style({
            '-webkit-transform':'translateX(60%) translateY(30px)',
            '-webkit-transition':'-webkit-transform 400ms linear'
          }).add(this.next).insert(document.body);
          this.next.on(['touchend','click'],this.onnext);
        }
        return ctor.apply(this,args) || this;
      }
      Next.prototype['onnext'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'next',
          canBubble:false,
          isCanceleable:true
        }));
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Next;
        return new Next(args && args.length && args[0]);
      };
    })();
    var Ninja = (function() {
      function Ninja() {
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
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'ninja'
          }).add(svg.Svg({
            xmlns:"http://www.w3.org/2000/svg",
            width:"428pt",
            height:"596pt"
          }).path({
            d:"m 310.83594,189.77734 c 0,45.51172 -39.77344,82.40235 -88.83203,82.40235 -49.0625,0 -88.83204,-36.89063 -88.83204,-82.40235 0,-45.51172 39.76954,-82.40234 88.83204,-82.40234 49.05859,0 88.83203,36.89062 88.83203,82.40234",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 303.28125,183.76953 c 0,0 -49.76172,-31.14062 -111.14063,-31.14062 -19.16015,0 -37.18359,3.03125 -52.91796,7.20312 -3.90625,9.28125 -6.05079,19.38281 -6.05079,29.94531 0,4.21875 0.34375,8.36328 1.00391,12.41016 16.875,3.98828 62.8125,5.55469 84.05078,5.55469 61.38281,0 85.05469,-23.97266 85.05469,-23.97266",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 174.65625,186.03516 c 0,5.07031 -5.61719,9.17968 -12.54688,9.17968 -6.92578,0 -12.54687,-4.10937 -12.54687,-9.17968 0,-5.07032 5.62109,-9.17969 12.54687,-9.17969 6.92969,0 12.54688,4.10937 12.54688,9.17969",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 243.29687,187.9375 c 0,5.07031 -5.61718,9.17969 -12.54687,9.17969 -6.92969,0 -12.54688,-4.10938 -12.54688,-9.17969 0,-5.07031 5.61719,-9.17969 12.54688,-9.17969 6.92969,0 12.54687,4.10938 12.54687,9.17969",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 175.46875,178.08984 -20.08984,-8.08203 7.54687,-5.97265 19.89844,13.75 -7.35547,0.30468",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 210.76953,178.95703 23.96094,-14.44531 8.5664,7.22265 -25.09375,8.31641 -7.43359,-1.09375",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 268.62891,265.14453 c -13.90235,8.49219 -30.23438,13.38281 -47.70313,13.38281 -18.50391,0 -35.72266,-5.49218 -50.13672,-14.92578 -31.01172,13.26172 -31.01172,42.79297 -31.01172,77.08985 0,15.28125 0,32.40234 0,47.67968 0,46.70313 0,84.5586 78.27735,84.5586 78.27343,0 78.27343,-37.85547 78.27343,-84.5586 0,-15.27734 0,-32.39843 0,-47.67968 0,-33.02735 -0.008,-61.62891 -27.69921,-75.54688",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 213.17187,485.82422 c 0,11.35156 -66.84765,11.35156 -66.84765,0 0,-11.35156 14.96484,-20.55078 33.42187,-20.55078 18.46094,0 33.42578,9.19922 33.42578,20.55078",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 289.78125,485.82422 c 0,11.35156 -66.84766,11.35156 -66.84766,0 0,-11.35156 14.96485,-20.55078 33.42578,-20.55078 18.45704,0 33.42188,9.19922 33.42188,20.55078",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 219.74219,315.99609 c -0.92578,-12.28515 23.97265,-32.1875 53.89453,-34.4414 29.92578,-2.25391 48.6914,5.23047 54.47265,26.28125 6.30079,22.95703 -26.07421,36.73437 -56,38.98828 -29.92187,2.2539 -51.4414,-18.53906 -52.36718,-30.82813",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 213.44531,350.26172 c -3.91406,11.6875 -34.57812,20.375 -63.03515,10.85156 -28.45703,-9.52734 -42.84766,-23.70312 -40.01563,-45.35156 3.09375,-23.60156 38.28125,-23.7461 66.73828,-14.21875 28.45313,9.52344 40.22656,37.03125 36.3125,48.71875",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 230.35547,362.66406 c -2.58594,3.38672 -7.42188,4.03516 -10.8086,1.45313 l -6,-4.57813 c -3.38671,-2.58203 -4.03515,-7.42187 -1.45312,-10.80859 L 399.86719,102.63281 c 2.58203,-3.386716 6.80468,28.94531 6.80468,28.94531 l -176.3164,231.08594",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 283.09766,298.00781 c -0.40625,0.52344 -1.16407,0.625 -1.69141,0.21875 l -20.41016,-15.70703 c -0.52734,-0.40625 -0.625,-1.16406 -0.21875,-1.69141 l 2.79297,-3.63281 c 0.41016,-0.52734 1.16406,-0.625 1.69531,-0.21875 l 20.40625,15.70703 c 0.52735,0.40625 0.62891,1.16407 0.22266,1.69141 l -2.79687,3.63281",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 277.63281,305.10547 c -0.40625,0.52734 -1.16015,0.625 -1.6914,0.21875 l -20.41016,-15.70703 c -0.52734,-0.40235 -0.625,-1.16016 -0.21875,-1.6875 l 2.79297,-3.63282 c 0.41015,-0.52734 1.16406,-0.625 1.69531,-0.22265 l 20.41016,15.70703 c 0.52343,0.40625 0.625,1.16406 0.21875,1.69141 l -2.79688,3.63281",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 272.17187,312.20312 c -0.40625,0.52735 -1.16406,0.62891 -1.6914,0.22266 l -20.41016,-15.70703 c -0.52734,-0.40625 -0.625,-1.16406 -0.21875,-1.69141 l 2.79297,-3.63281 c 0.40625,-0.52734 1.16406,-0.625 1.69141,-0.21875 l 20.41015,15.70703 c 0.52735,0.40625 0.625,1.16406 0.21875,1.69141 l -2.79297,3.6289",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 266.70703,319.30469 c -0.40625,0.52734 -1.16406,0.625 -1.69141,0.21875 l -20.41015,-15.70703 c -0.52735,-0.40625 -0.625,-1.16407 -0.21875,-1.69141 l 2.79687,-3.63281 c 0.40235,-0.52344 1.16016,-0.625 1.6875,-0.21875 l 20.41016,15.70703 c 0.52734,0.40625 0.62891,1.16406 0.22266,1.6914 l -2.79688,3.63282",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 261.24219,326.40234 c -0.40625,0.52735 -1.16407,0.62891 -1.69141,0.22266 l -20.40625,-15.70703 c -0.53125,-0.40625 -0.62891,-1.16406 -0.22266,-1.69141 l 2.79688,-3.63281 c 0.40234,-0.52734 1.16406,-0.625 1.6875,-0.21875 l 20.41016,15.70703 c 0.53125,0.40625 0.6289,1.16016 0.22265,1.69141 l -2.79687,3.6289",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 255.77734,333.50391 c -0.40625,0.52734 -1.16015,0.6289 -1.6914,0.21875 l -20.40625,-15.70704 c -0.53125,-0.40234 -0.62891,-1.16015 -0.22266,-1.6875 l 2.79688,-3.63281 c 0.40625,-0.52734 1.16015,-0.6289 1.6875,-0.22265 l 20.41406,15.70703 c 0.52734,0.41015 0.625,1.16406 0.21875,1.6914 l -2.79688,3.63282",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 250.3125,340.60547 c -0.40625,0.52734 -1.16016,0.625 -1.69141,0.21875 l -20.40625,-15.70703 c -0.52734,-0.40625 -0.625,-1.16407 -0.22265,-1.6875 l 2.79687,-3.63282 c 0.40625,-0.53125 1.16406,-0.6289 1.69141,-0.22265 l 20.41015,15.70703 c 0.52735,0.40625 0.625,1.16406 0.21875,1.69141 l -2.79687,3.63281",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 244.85156,347.70312 c -0.40625,0.52735 -1.16406,0.62891 -1.6914,0.22266 L 222.75,332.21875 c -0.52734,-0.40625 -0.625,-1.16406 -0.21875,-1.69531 l 2.79297,-3.62891 c 0.40625,-0.52734 1.16406,-0.625 1.6914,-0.21875 l 20.41016,15.70703 c 0.52734,0.40625 0.625,1.16016 0.21875,1.6875 l -2.79297,3.63281",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 239.39062,354.80469 c -0.41015,0.52734 -1.16406,0.625 -1.69531,0.21875 l -20.41015,-15.70703 c -0.52735,-0.40625 -0.625,-1.16407 -0.21875,-1.69141 l 2.79687,-3.63281 c 0.40625,-0.52735 1.16016,-0.625 1.69141,-0.21875 l 20.40625,15.70703 c 0.52734,0.40625 0.6289,1.16406 0.22265,1.6914 l -2.79297,3.63282",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 233.92578,361.90234 c -0.41016,0.52735 -1.16406,0.62891 -1.69531,0.22266 l -20.41016,-15.71094 c -0.52344,-0.40234 -0.625,-1.16015 -0.21875,-1.6875 l 2.79688,-3.63281 c 0.40625,-0.52734 1.16406,-0.625 1.6914,-0.22266 l 20.40625,15.70703 c 0.53125,0.40625 0.62891,1.16407 0.22266,1.69141 l -2.79297,3.63281",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 228.46094,369.00391 c -0.40625,0.52734 -1.16407,0.625 -1.69141,0.21875 l -20.41016,-15.70704 c -0.52734,-0.40625 -0.6289,-1.16406 -0.21875,-1.6914 l 2.79297,-3.63281 c 0.40625,-0.52344 1.16407,-0.625 1.69141,-0.21875 l 20.40625,15.70703 c 0.53125,0.40625 0.62891,1.16406 0.22266,1.6914 l -2.79297,3.63282",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 222.99609,376.10547 c -0.40625,0.52734 -1.16406,0.625 -1.6914,0.21875 l -20.41016,-15.70703 c -0.52734,-0.40625 -0.625,-1.16407 -0.21875,-1.69141 l 2.79297,-3.62891 c 0.40625,-0.53125 1.16406,-0.6289 1.69141,-0.22265 l 20.41015,15.70703 c 0.52735,0.40625 0.625,1.16406 0.21875,1.69141 l -2.79297,3.63281",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 217.53125,383.20312 c -0.40625,0.52735 -1.16406,0.625 -1.69141,0.21875 l -20.41015,-15.70703 c -0.52735,-0.40625 -0.625,-1.16015 -0.21875,-1.6875 l 2.79687,-3.63672 c 0.40235,-0.52734 1.16016,-0.625 1.6875,-0.21484 l 20.41016,15.70703 c 0.52734,0.40235 0.625,1.16016 0.22265,1.6875 l -2.79687,3.63281",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 212.06641,390.30078 c -0.40625,0.52734 -1.16016,0.62891 -1.6875,0.22266 l -20.41016,-15.70703 c -0.53125,-0.41016 -0.625,-1.16407 -0.22266,-1.69532 l 2.79688,-3.6289 c 0.40625,-0.52735 1.16015,-0.625 1.6875,-0.21875 l 20.41406,15.70703 c 0.52734,0.40625 0.625,1.16015 0.21875,1.6875 l -2.79687,3.63281",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 206.60547,397.40234 c -0.41016,0.52735 -1.16406,0.625 -1.69141,0.21875 l -20.41015,-15.70703 c -0.52735,-0.40625 -0.625,-1.16015 -0.22266,-1.6875 l 2.79687,-3.63281 c 0.40625,-0.52734 1.16407,-0.62891 1.69141,-0.22266 l 20.41016,15.70703 c 0.52734,0.40625 0.625,1.16407 0.21875,1.69141 l -2.79297,3.63281",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 242.65625,358.73047 c 0,12.92969 -10.48047,23.41015 -23.41406,23.41015 -12.92969,0 -23.41016,-10.48046 -23.41016,-23.41015 0,-12.92969 10.48047,-23.41406 23.41016,-23.41406 12.93359,0 23.41406,10.48437 23.41406,23.41406",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 274.41406,315.41016 c 0,12.92968 -10.48047,23.41406 -23.41015,23.41406 -12.9336,0 -23.41407,-10.48438 -23.41407,-23.41406 0,-12.92969 10.48047,-23.41016 23.41407,-23.41016 12.92968,0 23.41015,10.48047 23.41015,23.41016",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().svg);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Ninja.init = (function () {
        var styles=[{
          selector:'.ninja',
          style:"position:absolute;-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform:scale(0.6,0.6);"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Ninja.init;
        __.constructor = Ninja;
        return new Ninja(args && args.length && args[0]);
      };
    })();
    var Multiply = (function() {
      function Multiply() {
        function privateData() {
          this.element = null;
          this.id = null;
          this.selected = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var selected = p_vars.selected;
        Object.getOwnPropertyDescriptor(this,'selected') || Object.defineProperty(this,'selected', {get: function(){return selected;},set: function(e){selected=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.id=Math.uuid(8);
          this.selected=false;
          this.onchoose=this.onchoose.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          controller.Controller.subscribe('choose',this.onchoose);
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
            transform:"matrix(0.5,0,0,-0.5,-40.0,410.0)"
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
          this.element.on(['touchend','click'],this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Multiply.prototype['onchoose'] = function(event) {
        var choice=event.detail.operation;
        if(choice === 'multiply') {
          if(!this.selected) {
            this.selected=true;
            this.element.styleProperty('webKitTransform');
            this.element.style({
              'webkitTransform':this.element.styleProperty('webkitTransform') + ' translateZ(-50px) translateX(-40px) translateY(10px) scale(1.2) rotateY(40deg)'
            });
          }
        } else {
          this.selected=false;
          this.element.style({
            '-webkit-transform':'translateX(-50px) rotateY(-90deg)'
          });
        }
      };
      Multiply.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'choose',
          canBubble:false,
          isCanceleable:true,
          detail:{
            'operation':'multiply',
            'color':'#e97825'
          }
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
          this.selected = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var selected = p_vars.selected;
        Object.getOwnPropertyDescriptor(this,'selected') || Object.defineProperty(this,'selected', {get: function(){return selected;},set: function(e){selected=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.id=Math.uuid(8);
          this.selected=false;
          this.onchoose=this.onchoose.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          controller.Controller.subscribe('choose',this.onchoose);
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
          this.element.on(['touchend','click'],this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Plus.prototype['onchoose'] = function(event) {
        var choice=event.detail.operation;
        if(choice === 'plus') {
          if(!this.selected) {
            this.selected=true;
            this.element.styleProperty('webKitTransform');
            this.element.style({
              'webkitTransform':this.element.styleProperty('webkitTransform') + ' translateY(10px) scale(1.2) rotateY(40deg)'
            });
          }
        } else {
          this.selected=false;
          this.element.style({
            '-webkit-transform':'rotateY(90deg) translateX(206px) translateZ(300px)'
          });
        }
      };
      Plus.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'choose',
          canBubble:false,
          isCanceleable:true,
          detail:{
            'operation':'plus',
            'color':'#78bf2b'
          }
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
          this.selected = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var selected = p_vars.selected;
        Object.getOwnPropertyDescriptor(this,'selected') || Object.defineProperty(this,'selected', {get: function(){return selected;},set: function(e){selected=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.id=Math.uuid(8);
          this.selected=false;
          this.onchoose=this.onchoose.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          controller.Controller.subscribe('choose',this.onchoose);
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
            transform:"matrix(0.5,0,0,-0.5,-40.0,215.0)"
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
          this.element.on(['touchend','click'],this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Divide.prototype['onchoose'] = function(event) {
        var choice=event.detail.operation;
        if(choice === 'divide') {
          if(!this.selected) {
            this.selected=true;
            this.element.styleProperty('webKitTransform');
            this.element.style({
              'webkitTransform':this.element.styleProperty('webkitTransform') + ' translateZ(40px) translateX(-30px) translateY(10px) scale(1.2) rotateY(-40deg)'
            });
          }
        } else {
          this.selected=false;
          this.element.style({
            '-webkit-transform':'rotateY(165deg) translateX(40px) translateZ(80px)'
          });
        }
      };
      Divide.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'choose',
          canBubble:false,
          isCanceleable:true,
          detail:{
            'operation':'divide',
            'color':'#27a7e5'
          }
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
          this.selected = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var selected = p_vars.selected;
        Object.getOwnPropertyDescriptor(this,'selected') || Object.defineProperty(this,'selected', {get: function(){return selected;},set: function(e){selected=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.id=Math.uuid(8);
          this.onchoose=this.onchoose.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          controller.Controller.subscribe('choose',this.onchoose);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').add(svg.Svg({
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
            transform:"matrix(0.5,0,0,-0.5,-230.0,215.0)"
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
          this.element.on(['touchend','click'],this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Minus.prototype['onchoose'] = function(event) {
        var choice=event.detail.operation;
        if(choice === 'minus') {
          if(!this.selected) {
            this.selected=true;
            this.element.styleProperty('webKitTransform');
            this.element.style({
              'webkitTransform':this.element.styleProperty('webkitTransform') + ' translateZ(-10px) translateX(40px) translateY(10px) scale(1.2) rotateY(-50deg)'
            });
          }
        } else {
          this.selected=false;
          this.element.style({
            '-webkit-transform':'translateX(120px) translateY(-10px) translateZ(100px)'
          });
        }
      };
      Minus.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'choose',
          canBubble:false,
          isCanceleable:true,
          detail:{
            'operation':'minus',
            'color':'#90969d'
          }
        }));
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Minus;
        return new Minus(args && args.length && args[0]);
      };
    })();
    var Shuriken = (function() {
      function Shuriken() {
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
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'shuriken'
          }).add(svg.Svg({
            width:"300",
            height:"300"
          }).defs().linearGradient({
            id:this.id + "linearGradient4552"
          }).stop({
            style:"stop-color:#ffffff;stop-opacity:1;",
            offset:"0"
          }).end().stop({
            style:"stop-color:#d3d7cf;stop-opacity:0;",
            offset:"1"
          }).end().end().linearGradient({
            id:this.id + "linearGradient4177"
          }).stop({
            style:"stop-color:#babdb6;stop-opacity:1;",
            offset:"0"
          }).end().stop({
            style:"stop-color:#e5e6e4;stop-opacity:1;",
            offset:"1"
          }).end().end().linearGradient({
            id:this.id + "linearGradient4163"
          }).stop({
            style:"stop-color:#ffffff;stop-opacity:1;",
            offset:"0"
          }).end().stop({
            style:"stop-color:#eeeeec;stop-opacity:0;",
            offset:"1"
          }).end().end().linearGradient({
            'xlink:href':"#" + this.id + "linearGradient4177",
            id:this.id + "linearGradient5330",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)",
            x1:"396.74554",
            y1:"437.18973",
            x2:"322.47766",
            y2:"240.04688"
          }).end().linearGradient({
            'xlink:href':"#" + this.id + "linearGradient4163",
            id:this.id + "linearGradient5332",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)",
            x1:"625.21875",
            y1:"240.0625",
            x2:"1548.192",
            y2:"777.72992"
          }).end().linearGradient({
            'xlink:href':"#" + this.id + "linearGradient4163",
            id:this.id + "linearGradient5334",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)",
            x1:"252.48438",
            y1:"-281.39062",
            x2:"716.39062",
            y2:"507.23886"
          }).end().linearGradient({
            'xlink:href':"#" + this.id + "linearGradient4552",
            id:this.id + "linearGradient5336",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)",
            x1:"-268.96875",
            y1:"236.125",
            x2:"605.43304",
            y2:"758.07812"
          }).end().linearGradient({
            'xlink:href':"#" + this.id + "linearGradient4552",
            id:this.id + "linearGradient5338",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)",
            x1:"248.54688",
            y1:"632.85492",
            x2:"749.59601",
            y2:"1218.5692"
          }).end().radialGradient({
            'xlink:href':"#" + this.id + "linearGradient4163",
            id:this.id + "radialGradient5340",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.7958377,-0.2784745,0.1580768,0.4517593,1058.1559,-338.02663)",
            cx:"267.10895",
            cy:"215.25221",
            fx:"267.10895",
            fy:"215.25221",
            r:"619.9375"
          }).end().end().g({
            transform:"scale(0.1)"
          }).g({
            transform:"matrix(0.691503,0,0,0.691503,-508.97387,527.98551)"
          }).path({
            d:"m 1574.9402,-707.53971 c -159.2801,40.82371 -228.4775,187.52906 -255.7526,289.32098 l -19.5297,-5.233 c -11.5978,40.3736 -38.0976,74.29691 -71.498,94.65785 -34.6005,19.31747 -77.7298,25.61712 -119.0265,15.34145 l -4.0844,15.24352 c -116.45471,67.2351 -187.57861,44.31079 -341.47901,-61.21716 40.8237,159.28014 187.5593,228.48568 289.35111,255.76068 l -5.2329,19.5298 c 40.5456,11.647 74.5567,38.314 94.9009,71.919 19.1328,34.5154 25.3314,77.4801 15.0984,118.6054 l 15.2435,4.0845 c 67.2352,116.4546 44.2887,187.5403 -61.2392,341.4406 159.2801,-40.8236 228.5076,-187.5209 255.7828,-289.3129 l 19.4996,5.2249 c 11.5975,-40.3735 38.0975,-74.2969 71.498,-94.6578 34.6003,-19.3175 77.7296,-25.6171 119.0262,-15.3415 l 4.0845,-15.2435 c 116.4546,-67.2351 187.5786,-44.3108 341.4791,61.2172 -40.8238,-159.2802 -187.5593,-228.4856 -289.3512,-255.7607 l 5.233,-19.5298 c -40.5455,-11.64704 -74.5567,-38.31401 -94.901,-71.919 -19.1327,-34.51542 -25.3314,-77.48008 -15.0984,-118.60538 l -15.2133,-4.0764 c -67.2351,-116.4546 -44.3188,-187.54846 61.2091,-341.44874 z m -207.5742,489.97117 c 49.5515,13.27731 78.994,64.27315 65.7166,113.82475 -13.2773,49.5516 -64.273,78.9941 -113.8247,65.7167 -49.5515,-13.2773 -78.9941,-64.2731 -65.7167,-113.8247 13.2774,-49.55162 64.2731,-78.99406 113.8248,-65.71675 z",
            style:"fill:#888a85;fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 1573.1288,-713.53422 c -159.2801,40.82372 -228.4775,187.52907 -255.7526,289.32098 l -19.5297,-5.23299 c -11.5976,40.3736 -38.0976,74.2969 -71.498,94.65784 -34.6005,19.31748 -77.7297,25.61713 -119.0265,15.34146 l -4.0843,15.24351 c -116.45481,67.2351 -187.57871,44.31079 -341.47911,-61.21716 40.8238,159.28015 187.5593,228.48559 289.35121,255.76069 l -5.233,19.5298 c 40.5455,11.647 74.5567,38.314 94.9009,71.919 19.1329,34.5154 25.3314,77.48 15.0985,118.6053 l 15.2434,4.0845 c 67.2352,116.4547 44.2887,187.5404 -61.2392,341.4407 159.2802,-40.8237 228.5077,-187.521 255.7828,-289.3129 l 19.4996,5.2249 c 11.5976,-40.3736 38.0974,-74.2969 71.4979,-94.6578 34.6006,-19.3175 77.7297,-25.6172 119.0264,-15.3415 l 4.0845,-15.2435 c 116.4546,-67.2351 187.5787,-44.3108 341.4789,61.2171 -40.8238,-159.2802 -187.5592,-228.4856 -289.3512,-255.7606 l 5.233,-19.5298 c -40.5455,-11.64704 -74.5567,-38.31401 -94.9008,-71.91901 -19.1329,-34.51541 -25.3314,-77.48008 -15.0984,-118.60537 l -15.2134,-4.0764 c -67.2351,-116.45461 -44.3189,-187.54846 61.2091,-341.44875 z m -207.5743,489.97117 c 49.5516,13.27731 78.9941,64.27316 65.7169,113.82476 -13.2774,49.5515 -64.2732,78.994 -113.8249,65.7167 -49.5515,-13.2773 -78.9939,-64.2731 -65.7167,-113.8247 13.2774,-49.55163 64.2732,-78.99407 113.8247,-65.71676 z",
            style:"fill:url(#" + this.id + "linearGradient5330);fill-opacity:1;stroke:#babdb6;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
          }).end().path({
            d:"m 1631.8993,-157.95489 c 11.8044,37.6214 64.0773,32.4922 123.3886,68.7142 76.8807,46.9517 123.4684,96.6065 141.1959,154.2695 -61.5008,-40.3956 -83.7513,-57.7925 -157.3515,-75.744 -72.9102,-17.7666 -148.3316,3.6106 -158.7483,46.9502 116.0881,-66.7968 187.2391,-43.7701 340.8665,61.5707 -40.8238,-159.2802 -187.5592,-228.4856 -289.3512,-255.7606 z",
            style:"fill:url(#" + this.id + "linearGradient5332);fill-opacity:1;stroke:#babdb6;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
          }).end().path({
            d:"m 1317.3571,-424.20219 c 37.6214,-11.8044 32.4923,-64.07727 68.7142,-123.38857 46.9517,-76.88063 96.6065,-123.46841 154.2696,-141.19574 -40.3957,61.50064 -57.7926,83.75113 -75.7441,157.35139 -17.7665,72.9103 3.6106,148.33171 46.9503,158.74831 -66.7968,-116.08808 -43.7701,-187.23908 61.5707,-340.86655 -159.2803,40.8238 -228.4856,187.55925 -255.7607,289.35116 z",
            style:"fill:url(#" + this.id + "linearGradient5334);fill-opacity:1;stroke:#babdb6;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
          }).end().path({
            d:"m 1051.1098,-109.65989 c -11.8044,-37.6214 -64.07721,-32.4923 -123.38851,-68.7142 -76.8807,-46.9517 -123.4685,-96.60658 -141.1958,-154.26951 61.5006,40.39557 83.7511,57.79245 157.3514,75.74394 72.91041,17.76662 148.33181,-3.61062 158.74841,-46.9502 -116.08821,66.7968 -187.23921,43.77015 -340.86671,-61.57072 40.8239,159.28021 187.5593,228.48559 289.35121,255.76069 z",
            style:"fill:url(#" + this.id + "linearGradient5336);fill-opacity:1;stroke:#babdb6;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
          }).end().path({
            d:"m 1365.652,156.58741 c -37.6212,11.8044 -32.4921,64.0772 -68.714,123.3885 -46.9517,76.8807 -96.6066,123.4684 -154.2696,141.1958 40.3955,-61.5007 57.7925,-83.7512 75.744,-157.3514 17.7666,-72.9103 -3.6107,-148.3317 -46.9503,-158.7483 66.7969,116.0881 43.7702,187.2391 -61.5707,340.8665 159.2802,-40.8238 228.4857,-187.5592 255.7606,-289.3511 z",
            style:"fill:url(#" + this.id + "linearGradient5338);fill-opacity:1;stroke:#babdb6;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
          }).end().path({
            style:"opacity:0.92237441;fill:url(#" + this.id + "radialGradient5340);fill-opacity:1;stroke:none",
            d:"m 1573.1288,-713.53422 c -159.2801,40.82372 -228.4775,187.52907 -255.7526,289.32098 l -19.5297,-5.23299 c -11.5976,40.3736 -38.0976,74.2969 -71.498,94.65784 -34.6005,19.31748 -77.7297,25.61713 -119.0265,15.34146 l -4.0843,15.24351 c -116.45481,67.2351 -187.57871,44.31079 -341.47911,-61.21716 40.8238,159.28015 187.5593,228.48559 289.35121,255.76069 l -5.233,19.5298 c 40.5455,11.647 74.5567,38.314 94.9009,71.919 19.1329,34.5154 25.3314,77.48 15.0985,118.6053 l 15.2434,4.0845 c 67.2352,116.4547 44.2887,187.5404 -61.2392,341.4407 159.2802,-40.8237 228.5077,-187.521 255.7828,-289.3129 l 19.4996,5.2249 c 11.5976,-40.3736 38.0974,-74.2969 71.4979,-94.6578 34.6006,-19.3175 77.7297,-25.6172 119.0264,-15.3415 l 4.0845,-15.2435 c 116.4546,-67.2351 187.5787,-44.3108 341.4789,61.2171 -40.8238,-159.2802 -265.6842,-199.557 -367.4762,-226.832 l 83.358,-48.4584 c -40.5455,-11.64704 -74.5567,-38.31401 -94.9008,-71.91901 -19.1329,-34.51541 -25.3314,-77.48008 -15.0984,-118.60537 l -15.2134,-4.0764 c -67.2351,-116.45461 -44.3189,-187.54846 61.2091,-341.44875 z m -207.5743,489.97117 c 49.5516,13.27731 78.9941,64.27316 65.7169,113.82476 -13.2774,49.5515 -64.2732,78.994 -113.8249,65.7167 -49.5515,-13.2773 -78.9939,-64.2731 -65.7167,-113.8247 13.2774,-49.55163 64.2732,-78.99407 113.8247,-65.71676 z"
          }).end().end().end().end().svg);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Shuriken.init = (function () {
        var styles=[{
          selector:'@-webkit-keyframes shurikenspin',
          style:"from {-webkit-transform:rotate(0deg);} to {-webkit-transform:rotate(360deg);}"
        },{
          selector:'.shuriken',
          style:"position:absolute;top:4%;left:24%;-webkit-transform-origin-x:42px;-webkit-transform-origin-y:44px;-webkit-animation:shurikenspin 1500ms linear infinite;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Shuriken.init;
        __.constructor = Shuriken;
        return new Shuriken(args && args.length && args[0]);
      };
    })();
    var Container = (function() {
      function Container() {
        function privateData() {
          this.element = null;
          this.cube = null;
          this.front = null;
          this.back = null;
          this.right = null;
          this.left = null;
          this.top = null;
          this.bottom = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
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
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
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
          }).add(this.cube.add(this.front).add(this.back).add(this.right).add(this.left).add(this.top).add(this.bottom));
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
      Container.init = (function () {
        var styles=[{
          selector:'.container',
          style:"top:25%;width:200px;height:200px;position:relative;margin:0 auto 40px;-webkit-perspective:1000px;"
        },{
          selector:'#cube',
          style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transition:-webkit-transform 1s;"
        },{
          selector:'#cube.show-front',
          style:"-webkit-transform:translateZ(-100px);"
        },{
          selector:'#cube.show-back',
          style:"-webkit-transform:translateZ(-100px) rotateX(-180deg);"
        },{
          selector:'#cube.show-right',
          style:"-webkit-transform:translateZ(-100px) rotateY(-90deg);"
        },{
          selector:'#cube.show-left',
          style:"-webkit-transform:translateZ(-100px) rotateY(90deg);"
        },{
          selector:'#cube.show-top',
          style:"-webkit-transform:translateZ(-100px) rotateX(-90deg);"
        },{
          selector:'#cube.show-bottom',
          style:"-webkit-transform:translateZ(-100px) rotateX(90deg);"
        },{
          selector:'#cube div',
          style:"display:block;position:absolute;width:196px;height:196px;-webkit-backface-visibility:hidden;"
        },{
          selector:'#cube .front',
          style:"-webkit-transform:translateZ(100px);"
        },{
          selector:'#cube .back',
          style:"-webkit-transform:rotateX(-180deg) translateZ(100px);"
        },{
          selector:'#cube .right',
          style:"-webkit-transform:rotateY(90deg) translateZ(100px);"
        },{
          selector:'#cube .left',
          style:"-webkit-transform:rotateY(-90deg) translateZ(100px);"
        },{
          selector:'#cube .top',
          style:"-webkit-transform:rotateX(90deg) translateZ(100px);"
        },{
          selector:'#cube .bottom',
          style:"-webkit-transform:rotateX(-90deg) translateZ(100px);"
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
          this.container = null;
          this.checker = null;
          this.color = null;
          this.difficulty = null;
          this.difficultyChoice = null;
          this.equation = null;
          this.frame = null;
          this.levels = null;
          this.ninja = null;
          this.operation = null;
          this.problems = null;
          this.play = null;
          this.screens = null;
          this.shuriken = null;
          this.sparkles = null;
          this.title = null;
        }
        var p_vars = new privateData();
        var container = p_vars.container;
        Object.getOwnPropertyDescriptor(this,'container') || Object.defineProperty(this,'container', {get: function(){return container;},set: function(e){container=e;}});
        var checker = p_vars.checker;
        Object.getOwnPropertyDescriptor(this,'checker') || Object.defineProperty(this,'checker', {get: function(){return checker;},set: function(e){checker=e;}});
        var color = p_vars.color;
        Object.getOwnPropertyDescriptor(this,'color') || Object.defineProperty(this,'color', {get: function(){return color;},set: function(e){color=e;}});
        var difficulty = p_vars.difficulty;
        Object.getOwnPropertyDescriptor(this,'difficulty') || Object.defineProperty(this,'difficulty', {get: function(){return difficulty;},set: function(e){difficulty=e;}});
        var difficultyChoice = p_vars.difficultyChoice;
        Object.getOwnPropertyDescriptor(this,'difficultyChoice') || Object.defineProperty(this,'difficultyChoice', {get: function(){return difficultyChoice;},set: function(e){difficultyChoice=e;}});
        var equation = p_vars.equation;
        Object.getOwnPropertyDescriptor(this,'equation') || Object.defineProperty(this,'equation', {get: function(){return equation;},set: function(e){equation=e;}});
        var frame = p_vars.frame;
        Object.getOwnPropertyDescriptor(this,'frame') || Object.defineProperty(this,'frame', {get: function(){return frame;},set: function(e){frame=e;}});
        var levels = p_vars.levels;
        Object.getOwnPropertyDescriptor(this,'levels') || Object.defineProperty(this,'levels', {get: function(){return levels;},set: function(e){levels=e;}});
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
        var shuriken = p_vars.shuriken;
        Object.getOwnPropertyDescriptor(this,'shuriken') || Object.defineProperty(this,'shuriken', {get: function(){return shuriken;},set: function(e){shuriken=e;}});
        var sparkles = p_vars.sparkles;
        Object.getOwnPropertyDescriptor(this,'sparkles') || Object.defineProperty(this,'sparkles', {get: function(){return sparkles;},set: function(e){sparkles=e;}});
        var title = p_vars.title;
        Object.getOwnPropertyDescriptor(this,'title') || Object.defineProperty(this,'title', {get: function(){return title;},set: function(e){title=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.ontouchstart=this.ontouchstart.bind(this);
          this.ontouchmove=this.ontouchmove.bind(this);
          this.ontouchend=this.ontouchend.bind(this);
          this.ontimeout=this.ontimeout.bind(this);
          this.onplay=this.onplay.bind(this);
          this.onlevel=this.onlevel.bind(this);
          this.ondifficulty=this.ondifficulty.bind(this);
          controller.Controller.subscribe('timeout',this.ontimeout);
          controller.Controller.subscribe('play',this.onplay);
          controller.Controller.subscribe('difficulty',this.ondifficulty);
          controller.Controller.subscribe('level',this.onlevel);
          this.screens=Container({
            front:Levels()
          }).showFront();
          this.levels=Levels();
          this.difficultyChoice='easy';
          this.title=Title();
          this.checker=Checker();
          this.difficulty=Difficulty();
          this.play=Play();
          this.problems=[];
          this.shuriken=Shuriken();
          this.ninja=Ninja();
          this.frame=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'id':'frame'
          }).add(monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'inner'
          }).add(this.title).add(this.play));
          this.ninja.insert(document.body);
          this.container=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'id':'container'
          }).add(this.frame).insert(document.body);
          this.screens.element.insert(document.body);
          monads.DOMable({
            element:document.body
          }).on('touchstart',this.ontouchstart).on('touchmove',this.ontouchmove).on(['touchend','click'],this.ontouchend);
        }
        return ctor.apply(this,args) || this;
      }
      Main.prototype['ondifficulty'] = function(event) {
        this.difficultyChoice=event.detail;
      };
      Main.prototype['onlevel'] = function(event) {
        var plus=Plus(),minus,multiply,divide;
        switch(event.detail) {
          case "1":
            this.screens.right.add(plus);
            break;
          case "2":
            minus=Minus();
            this.screens.right.add(plus).add(minus);
            setTimeout(function () {
              minus.style({
                '-webkit-transition':'-webkit-transform 1s',
                '-webkit-transform':'translateX(75%)'
              });
            },500);
            break;
          case "3":
            minus=Minus();
            multiply=Multiply();
            this.screens.right.add(plus).add(minus).add(multiply);
            setTimeout(function () {
              minus.style({
                '-webkit-transition':'-webkit-transform 1s',
                '-webkit-transform':'translateX(75%)'
              });
            },500);
            setTimeout(function () {
              multiply.style({
                '-webkit-transition':'-webkit-transform 1s',
                '-webkit-transform':'translateX(150%)'
              });
            },1000);
            break;
          case "4":
          default:
            minus=Minus();
            multiply=Multiply();
            divide=Divide();
            this.screens.right.add(plus).add(minus).add(multiply).add(divide);
            setTimeout(function () {
              minus.style({
                '-webkit-transition':'-webkit-transform 1s',
                '-webkit-transform':'translateX(73%)'
              });
            },500);
            setTimeout(function () {
              multiply.style({
                '-webkit-transition':'-webkit-transform 1s',
                '-webkit-transform':'translateX(150%)'
              });
            },1000);
            setTimeout(function () {
              divide.style({
                '-webkit-transition':'-webkit-transform 1s',
                '-webkit-transform':'translateX(225%)'
              });
            },1500);
            break;
        }
        this.screens.showRight();
      };
      Main.prototype['onplay'] = function(event) {
        this.color=event.detail.color , this.operation=event.detail.operation;
        this.title.style({
          '-webkit-transform':'translateX(-150px) translateY(-120px) rotateY(-230deg) rotateX(76deg)'
        });
        this.play.style({
          '-webkit-transform':'translateX(-1000px) translateY(-350px) rotateY(130deg) rotateX(-106deg) scale(3.0)'
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
        ProgressBar({
          time:this.difficultyChoice === 'easy'?8:5
        }).start();
        this.sparkles=Sparkles();
        this.equation=Equation({
          operation:this.operation,
          difficultyChoice:this.difficultyChoice,
          color:this.color
        });
        this.equation.instance.element.insert(document.body);
        this.problems.push(this.equation);
      };
      Main.prototype['ontimeout'] = function(event) {
        var answer=this.equation.answer();
        var guess=this.equation.guess();
        var correct=answer === guess;
        var x=document.documentElement.clientWidth / 2;
        var y=document.documentElement.clientHeight / 3;
        log.Logger.debug(this,'x=' + x + ' y=' + y);
        correct && this.sparkles.addSparkles(Math.random() * 200 + 100 | 0,x,y,2);
        this.checker.answer(correct);
        this.equation.instance.element.remove();
        this.equation=Equation({
          operation:this.operation,
          difficultyChoice:this.difficultyChoice,
          color:this.color
        });
        this.equation.instance.element.insert(document.body);
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
      Main.shadow = ['0 1px 0 #ccc','0 2px 0 #c9c9c9','0 3px 0 #bbb','0 4px 0 #b9b9b9','0 5px 0 #aaa','0 6px 1px rgba(0,0,0,0.1)','0 0 5px rgba(0,0,0,0.1)','0 1px 3px rgba(0,0,0,0.3)','0 3px 5px rgba(0,0,0,0.2)','0 5px 10px rgba(0,0,0,0.25)','0 10px 10px rgba(0,0,0,0.2)','0 20px 20px rgba(0,0,0,0.15)'];
      Main.init = (function () {
        var styles=[{
          selector:'@font-face',
          style:'font-family:Albertino;src:url(/cube/lib/Albertino_1.0.ttf);'
        },{
          selector:'body',
          style:"background:white"
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

