/*
    how many operations per level per operator
                 +    -    x    /
     level 1    10    
     level 2    10   10
     level 3    10   10   10
     level 3    10   10   10   10

     what times qualify for what belts
     level 1    white  orange  yellow  camoflage  green  purple  blue  brown  red  black
                <3m    <2m     <90s    <80s       <70s   <60s    <50s  <40s   <30s <20s
  }
*/
module cube {
  module log from 'log';
  module monads from 'monads';
  module controller from 'controller';
  module events from 'events';
  module svg from 'svg';
  module cubesvgs from 'cubesvgs';
  module cubes from 'cubes';
  module planks from 'planks';
  module belts from 'belts';
  class Rules {
    constructor(properties={}) {
      private levels;
      @levels = {"1":{
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
    beltLevel(level, time) {
      if(time <= 45) {
        return @levels[level][45];
      } else if(time <= 50) {
        return @levels[level][50];
      } else if(time <= 55) {
        return @levels[level][55];
      } else if(time <= 60) {
        return @levels[level][60];
      } else if(time <= 65) {
        return @levels[level][65];
      } else if(time <= 70) {
        return @levels[level][70];
      } else if(time <= 75) {
        return @levels[level][75];
      } else if(time <= 80) {
        return @levels[level][80];
      } else if(time <= 85) {
        return @levels[level][85];
      } else {
        return @levels[level][90];
      }
    }
  }
  class Equation {
    constructor(properties={}) {
      private answer, level, operand1, operand2, operation, operationSign;
      @operation = properties.operation;
      switch(@operation) {
        case 'minus':
          @operationSign = '-';
          break;
        case 'plus':
          @operationSign = '+';
          break;
        case 'divide':
          @operationSign = '\\u00F7';
          break;
        case 'multiply':
          @operationSign = '\\u00D7';
          break;
      }
      @level = properties.level;
    }
    get equation() {
      if(!@answer) {
        switch(@operation) {
          case 'minus':
            @operand1=Math.round(Math.random()*100); 
            switch(@level) {
              case 1:
              case 2:
                @operand2=Math.round(Math.random()*10);
                break;
              default:
                @operand2=@operand1+Math.round(Math.random()*100);
            }
            @answer = @operand2 - @operand1;
            break;
          case 'multiply':
            @operand1=Math.round(Math.random()*12); 
            @operand2=Math.round(Math.random()*12);
            @answer = @operand2 * @operand1;
            break;
          case 'divide':
            @operand1=Math.round(Math.random()*100); 
            @operand2=Math.round(Math.random()*100);
            @answer = @operand2 / @operand1;
            break;
          case 'plus':
            switch(@level) {
              case 1:
                @operand1=Math.ceil(Math.random()*10); 
                @operand2=Math.ceil(Math.random()*10);
                break;
              case 2:
                @operand1=Math.ceil(Math.random()*50); 
                @operand2=Math.ceil(Math.random()*10);
                break;
              case 3:
                @operand1=Math.ceil(Math.random()*100); 
                @operand2=Math.ceil(Math.random()*20);
                break;
              case 4:
              default:
                @operand1=Math.ceil(Math.random()*100); 
                @operand2=Math.ceil(Math.random()*100);
                break;
            }
            @answer = @operand2 + @operand1;
            break;
        }
      }
      return @operand1 + ' ' + @operationSign + ' ' + @operand2 + ' = ';
    }
  }
  export class VerticalNumberStrip {
    constructor(properties={numbers:['0','1','2','3','4','5','6','7','8','9',VerticalNumberStrip.backspace]}) {
      private carousel, element, numbers;
      @onselect = @onselect.bind(this);
      @numbers = properties.numbers;
      @carousel = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'vertical-number-strip-carousel'});
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'vertical-number-strip'}).add(
        @carousel
      );
      var theta = 50 / @numbers.length;
      @numbers.forEach(function(number,i) {
        var deg = -55+theta*i;
        var panel = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'vertical-number-strip-carousel-number'}).text(number).on(['touchend'],@onselect.curry(number));
        @carousel.add(panel);
      }, this);
      return @element;
    }
    onselect(number,event) {
      controller.Controller.publish(events.CustomEvent({type:'guess',canBubble:false,isCanceleable:true,detail:number}));
    }
    static init = (function() {
      var styles = [
        {selector:'.vertical-number-strip',style:"width:100px;height:140px;position:absolute;right:0rem;"},
        {selector:'.vertical-number-strip-carousel',style:"width:100%;height:100%;position:relative;"},
        {selector:'.vertical-number-strip-carousel-number',style:"width:100px;text-align:center;font-size:3rem;font-family:Albertino;text-shadow:5px 5px 10px rgba(124,116,116,0.5);"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
    static backspace = '\\u2716'
  };
  export class ResultsDropDown {
    constructor(properties={}) {
      private element, title;
      @title = properties.title;
      @element = monads.DOMable({tagName:'dl'}).on('load').attributes({'class':'results-drop-down'});
      @title && element.add(monads.DOMable({tagName:'dt'}).on('load').add(@title));
      return @element;
    }
    static init = (function() {
      var styles = [
        {selector:'.results-drop-down',style:"-webkit-transform-style:preserve-3d;-webkit-transform:perspective(600px) translateZ(1px);position:relative;top:100%;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
    static backspace = '\\u2716'
  };
  class Title {
    constructor() {
      private title;
      @title = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','white-space':'nowrap','height':'100px','width':'100%','color':'#e97825','font-family':'Albertino','font-size':'7rem','top':'5%','left':'40%'}).textShadow(Main.shadow).text('Ninja Math');
      return @title;
    }
  }
  class Checker {
    constructor(properties={level:1}) {
      private elapsed, level, wrong, right, wrongAnswers, rightAnswers, rules, total, totalCount, totalTime, currentCount;
      @rules = Rules();
      @level = properties.level;
      @wrongAnswers = 0;
      @wrong = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','top':'0px','right':'200px','white-space':'nowrap','height':'100px','width':'100px','color':'transparent','font-family':'Albertino','font-size':'3rem','-webkit-transform':'translateY(0%)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text('  \\u2718');//.insert(document.body);
      @rightAnswers = 0;
      @right = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','top':'0px','right':'350px','white-space':'nowrap','height':'100px','width':'100px','color':'transparent','font-family':'Albertino','font-size':'3rem','-webkit-transform':'translateY(0%)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text('  \\u2714');//.insert(document.body);
      @totalCount = 10;
      @currentCount = 1;
      @total = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','top':'0px','right':'90%','white-space':'nowrap','height':'100px','width':'100px','color':'transparent','font-family':'Albertino','font-size':'3rem','-webkit-transform':'translateY(0%)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text(@currentCount+" of "+@totalCount);//.insert(document.body);
    }
    answer(guess) {
      if(!@totalTime) {
        @totalTime = new Date();
      }
      guess ? @right.style({'color':'green'}).updateText((++@rightAnswers)+' \\u2714'): @wrong.style({'color':'red'}).updateText((++@wrongAnswers)+' \\u2718');
      @currentCount++;
      @total.updateText(@currentCount+" of "+@totalCount);
      if(@currentCount > @totalCount) {
        var now = new Date().getTime();
        var start = @totalTime.getTime();
        @elapsed = Math.round((now - start)/1000);
        @elapsed += 5*@wrongAnswers;
        var belt = @rules.beltLevel(@level,@elapsed);
        @reset();
      }
    }
    reset() {
      @wrongAnswers = 0;
      @rightAnswers = 0;
      @totalCount = 10;
      @currentCount = 1;
      @right.style({'color':'transparent'}).updateText(' \\u2714');
      @wrong.style({'color':'transparent'}).updateText(' \\u2718');
      @total.updateText(@currentCount+" of "+@totalCount);
    }
  }
  class Levels {
    constructor() {
      private levels, one, two, three, four, title;
      this.onone = this.onone.bind(this);
      this.ontwo = this.ontwo.bind(this);
      this.onthree = this.onthree.bind(this);
      this.onfour = this.onfour.bind(this);
      @title = monads.DOMable({tagName:'div'}).on('load').style({'white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'5rem','left':'40%','text-align':'left'}).textShadow(Main.shadow).text('levels:');
      @one = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateY(100px)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'4rem','left':'40%','text-align':'left'}).textShadow(Main.shadow).text('1').on(['touchend'],this.onone);
      @two = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(80px) translateY(100px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'4rem','left':'40%','text-align':'left'}).textShadow(Main.shadow).text('2').on(['touchend'],this.ontwo);
      @three = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(160px) translateY(100px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'4rem','left':'40%','text-align':'left'}).textShadow(Main.shadow).text('3').on(['touchend'],this.onthree);
      @four = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(240px) translateY(100px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'4rem','left':'40%','text-align':'left'}).textShadow(Main.shadow).text('4').on(['touchend'],this.onfour);
      @levels = monads.DOMable({tagName:'div'}).on('load').add(
        @title
      ).add(
        @one
      ).add(
        @two
      ).add(
        @three
      ).add(
        @four
      );
      return @levels;
    }
    onone(event) {
      controller.Controller.publish(events.CustomEvent({type:'level',canBubble:false,isCanceleable:true,detail:'1'}));
    }
    ontwo(event) {
      controller.Controller.publish(events.CustomEvent({type:'level',canBubble:false,isCanceleable:true,detail:'2'}));
    }
    onthree(event) {
      controller.Controller.publish(events.CustomEvent({type:'level',canBubble:false,isCanceleable:true,detail:'3'}));
    }
    onfour(event) {
      controller.Controller.publish(events.CustomEvent({type:'level',canBubble:false,isCanceleable:true,detail:'4'}));
    }
  }
  export class Container {
    constructor(properties={}) {
      private controller, element, enabled, cube, front, back, right, left, top, bottom, x, xangle, xstart, y, yangle, ystart, thresholdY, thresholdX, directionY, directionX;
      @enabled = false;
      @onstart = @onstart.bind(this);
      @onswipe = @onswipe.bind(this);
      @onend = @onend.bind(this);
      @controller = properties.controller;
      @cube = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'cube'});
      @front = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'front'});
      properties.front && @front.add(properties.front);
      @back = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'back'});
      properties.back && @back.add(properties.back);
      @right = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'right'});
      properties.right && @right.add(properties.right);
      @left = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'left'});
      properties.left && @left.add(properties.left);
      @top = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'top'});
      properties.top && @top.add(properties.top);
      @bottom = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'bottom'});
      properties.bottom && @bottom.add(properties.bottom);
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'container'}).add(
	@cube.
          add(
            @front
          ).add(
	    @back
          ).add(
	    @right
          ).add(
	    @left
          ).add(
	    @top
          ).add(
	    @bottom
          )
      ).on(['touchstart'],@onstart).on(['touchmove'],@onswipe).on(['touchend'],@onend);
      @xangle = 0;
      @yangle = 0;
    }
    showFront() {
      @cube.attributes({'class':'show-front'});
      return this;
    }
    showRight() {
      @cube.attributes({'class':'show-right'});
      return this;
    }
    showLeft() {
      @cube.attributes({'class':'show-left'});
      return this;
    }
    showBack() {
      @cube.attributes({'class':'show-back'});
      return this;
    }
    showTop() {
      @cube.attributes({'class':'show-top'});
      return this;
    }
    showBottom() {
      @cube.attributes({'class':'show-bottom'});
      return this;
    }
    onstart(event) {
      event.preventDefault();
      @ystart = event.touches[0].clientY;
      @xstart = event.touches[0].clientX;
      @cube.element().style.webkitTransition = 'none';
      return this;
    }
    onswipe(event) {
      event.preventDefault();
      if(@enabled) {
        @y = event.touches[0].clientY;
        @x = event.touches[0].clientX;
        @thresholdY = Math.abs(@y - @ystart);
        @directionY = @y - @ystart;
        @thresholdX = Math.abs(@x - @xstart);
        @directionX = @x - @xstart;
        if(@thresholdX > @thresholdY && @thresholdX > 10) {
          if(@directionX < 0) {
            var tangle = @xangle + @directionX;
            @cube.element().style.webkitTransform = 'translateZ(-500px) rotateY('+tangle+'deg)';
          }
        }
      }
      return this;
    }
    onend(event) {
      event.preventDefault();
      @cube.element().style.webkitTransition = '-webkit-transform 1s';
      if(@enabled) {
/*
      if(@thresholdY > @thresholdX && @thresholdY > 10) {
        if(@directionY < 0) {
          @yangle += 90;
          @cube.style({'-webkit-transform':'translateZ(-100px) rotateX('+@yangle+'deg)'});
        } else {
          @yangle -= 90;
          @cube.style({'-webkit-transform':'translateZ(-100px) rotateX('+@yangle+'deg)'});
        }
      } else if(@thresholdX > @thresholdY && @thresholdX > 10) {
        if(@directionX > 0) {
          @xangle += 90;
          @cube.style({'-webkit-transform':'translateZ(-100px) rotateY('+@xangle+'deg)'});
        } else {
          @xangle -= 90;
          @cube.style({'-webkit-transform':'translateZ(-100px) rotateY('+@xangle+'deg)'});
        }
      }
*/
        if(@thresholdX > @thresholdY && @thresholdX > 10) {
          if(@directionX < 0) {
            @rotateRight();
            @controller.onnext(event);
          }
        }
      }
      return this;
    }
    rotateRight() {
      @xangle -= 90;
      @cube.element().style.webkitTransform = 'translateZ(-500px) rotateY('+@xangle+'deg)';
      return this;
    }
    static init = (function() {
      var styles = [
        {selector:'#page',style:"margin:0 auto;padding 0 1em;"},
        {selector:'.container',style:"position:absolute;top:20%;width:100%;height:20%;-webkit-perspective:1000px;-webkit-transition:-webkit-transform 1s;"},
        {selector:'.operators',style:"left:40%;text-align:start !important;width:auto !important;"},
        {selector:'#cube',style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transition:-webkit-transform 1s;"},
        {selector:'#cube.show-front',style:"-webkit-transform:translateZ(-500px);"},
        {selector:'#cube.show-back',style:"-webkit-transform:translateZ(-500px) rotateX(-180deg);"},
        {selector:'#cube.show-right',style:"-webkit-transform:translateZ(-500px) rotateY(-90deg);"},
        {selector:'#cube.show-left',style:"-webkit-transform:translateZ(-500px) rotateY(90deg);"},
        {selector:'#cube.show-top',style:"-webkit-transform:translateZ(-500px) rotateX(-90deg);"},
        {selector:'#cube.show-bottom',style:"-webkit-transform:translateZ(-500px) rotateX(90deg);"},
        {selector:'#cube div',style:"display:block;position:absolute;width:100%;height:100%;text-align:center;-webkit-backface-visibility:hidden;"},
        {selector:'#cube .front',style:"-webkit-transform:translateZ(500px);"},
        {selector:'#cube .back',style:"-webkit-transform:rotateY(180deg) translateZ(500px);"},
        {selector:'#cube .right',style:"-webkit-transform:rotateY(90deg) translateZ(500px);"},
        {selector:'#cube .left',style:"-webkit-transform:rotateY(-90deg) translateZ(500px);"},
        {selector:'#cube .top',style:"-webkit-transform:rotateX(90deg) translateZ(500px);"},
        {selector:'#cube .bottom',style:"-webkit-transform:rotateX(-90deg) translateZ(500px);"},
        {selector:'@-webkit-keyframes swipehint',style:"0% {-webkit-transform: rotateY(95deg) translateZ(500px);}30% {-webkit-transform: rotateY(85deg) translateZ(500px);}60%  {-webkit-transform: rotateY(93deg) translateZ(500px);}80% {-webkit-transform: rotateY(87deg) translateZ(500px);}100% {-webkit-transform: rotateY(90deg) translateZ(500px);}"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  };
  export class Main {
    constructor() {
      private activeSide, bestGuess, checker, color, equation, equations, grid, level, ninja, operation, page, problems, play, screens, sequence, title;
      @ontouchstart = @ontouchstart.bind(this);
      @ontouchmove = @ontouchmove.bind(this);
      @ontouchend = @ontouchend.bind(this);
      @onorientationchange = @onorientationchange.bind(this);
      @onguess = @onguess.bind(this);
      @onnext = @onnext.bind(this);
      @onplay = @onplay.bind(this);
      @onlevel = @onlevel.bind(this);
      @reset = @reset.bind(this);
      @swipehint = @swipehint.bind(this);
      controller.Controller.subscribe('guess',@onguess);
      controller.Controller.subscribe('next',@onnext);
      controller.Controller.subscribe('play',@onplay);
      controller.Controller.subscribe('level',@onlevel);
      @equations = [];
      @activeSide = 0;
      @bestGuess = '?';
      @page = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'page'});
      @screens = Container({controller:this,top:Levels()}).showTop();
      @level = 1;
      @sequence = [
        {side:'right',board:planks.WoodPlank()},
        {side:'back',board:planks.WoodPlank()},
        {side:'left',board:planks.WoodPlank()},
        {side:'front',board:planks.WoodPlank()}
      ];
      @screens.right.add(@sequence[0].board.element);
      @screens.back.add(@sequence[1].board.element);
      @screens.left.add(@sequence[2].board.element);
      @title = Title();
      @problems = [];
      @ninja = cubesvgs.Ninja();
//      cubesvgs.Shuriken().insert(document.body);
      @title.insert(document.body);
      @page.add(@ninja.element).insert(document.body);
      @screens.element.insert(document.body);
      monads.DOMable({element:document.body}).on('touchstart',@ontouchstart).on('touchmove',@ontouchmove).on(['touchend'],@ontouchend);
      monads.DOMable({element:window}).on('orientationchange',@onorientationchange);
      @onorientationchange();
    }
    reset(side) {
      @screens.top.style({'display':'none'});
      @screens.front.removeChildren().add(@sequence[3].board.element);
      @title.style({'display':'none'});
      return this;
    }
    swipehint() {
      @screens.right.style({'-webkit-animation':'swipehint 1s'});
      return this;
    }
    onlevel(event) {
      var plus = cubesvgs.Plus(), minus, multiply, divide;
      switch(event.detail) {
        case "1":
          @level = 1;
          minus = cubesvgs.Minus();
          @screens.front.add(plus).add(minus);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(98%)','opacity':'1'})},250);
          @ninja.rotateSword();
          break;
        case "2":
          @level = 2;
          minus = cubesvgs.Minus();
          @screens.front.add(plus).add(minus);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(98%)','opacity':'1'})},250);
          @ninja.rotateSword();
          break;
        case "3":
          @level = 3;
          minus = cubesvgs.Minus();
          multiply = cubesvgs.Multiply();
          @screens.front.add(plus).add(minus).add(multiply);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(98%)','opacity':'1'})},250);
          setTimeout(function(){multiply.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(200%)','opacity':'1'})},500);
          @ninja.rotateSword();
          break;
        case "4":
        default:
          @level = 4;
          minus = cubesvgs.Minus();
          multiply = cubesvgs.Multiply();
          divide = cubesvgs.Divide();
          @screens.front.add(plus).add(minus).add(multiply).add(divide);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(98%)','opacity':'1'})},250);
          setTimeout(function(){multiply.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(200%)','opacity':'1'})},500);
          setTimeout(function(){divide.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(300%)','opacity':'1'})},1000);
          @ninja.rotateSword();
          break;
      }
      @screens.showFront();
    }
    onplay(event) {
      @grid = cubes.Cubes();
      @grid.element.insert(document.body);
//      @grid.animate();
      @checker = Checker({level:@level});
      @color = event.detail.color, @operation = event.detail.operation;
      for(var i = 0; i < 10; ++i) {
        @equations.push(Equation({operation:@operation,level:@level,color:@color}));
      }
      @equation = @equations.pop();
      @problems.push(@equation);
      @title.style({'-webkit-transform':'translateX(-150px) translateY(-120px) rotateY(-230deg) rotateX(76deg)'});
      @sequence[@activeSide%4].board.addEquation(@equation.equation + ' ' + @bestGuess);
      @screens.element.element().style.webkitTransform = 'translateY(-9em)';
      @screens.rotateRight();
      VerticalNumberStrip().insert(document.body);
      @ninja.play();
//      @screens.element.add(ResultsDropDown({title:belts.Belt()}));
      setTimeout(@reset, 500);
      setTimeout(@swipehint, 500);
    }
    onguess(event) {
      var number = event.detail;
      if(number === VerticalNumberStrip.backspace) {
        if(@bestGuess.length && @bestGuess !== '?') {
          @bestGuess = @bestGuess.substring(0,@bestGuess.length-1);
        }
      } else {
        if(@bestGuess.length && @bestGuess === '?') {
          @bestGuess = number;
        } else {
          @bestGuess += number;
        }
      }
      @sequence[@activeSide%4].board.addEquation(@equation.equation + ' ' + @bestGuess);
      @screens.enabled = true;
    }
    onnext(event) {
      var answer = @equation.answer;
      var guess = parseInt(@bestGuess);
      var correct = answer === guess;
      @checker.answer(correct);
      @bestGuess = '?';
      @screens.enabled = false;
      var oldboard = @sequence[@activeSide%4].board;
      @activeSide++;
      var oldequation = @equation;
      @equation = @equations.pop();
      @sequence[@activeSide%4].board.addEquation(@equation.equation + ' ' + @bestGuess);
      setTimeout(function(){
        oldequation.equation = "";
      },500);
      @problems.push(@equation);
    }
    ontouchstart(event) {
      event.preventDefault();
    }
    ontouchmove(event) {
      event.preventDefault();
    }
    ontouchend(event) {
      event.preventDefault();
    }
    onorientationchange(event) {
	if ( window.orientation == 0 ) {
//	 alert ('Portrait Mode, Home Button bottom');
	} else if ( window.orientation == 90 ) {
//	 alert ('Landscape Mode, Home Button right');
	} else if ( window.orientation == -90 ) {
//	 alert ('Landscape Mode, Home Button left');
	} else if ( window.orientation == 180 ) {
//	 alert ('Portrait Mode, Home Button top');
	}
    }
    static blackbelt = '#211e1e'
    static bluebelt = '#00abee'
    static brownbelt = '#825130'
    static greenbelt = '#3fb83a'
    static orangebelt = '#f58511'
    static purplebelt = '#3fb83a'
    static redbelt = '#f04521'
    static yellowbelt = '#fff000'
    static whitebelt = '#ffffff'
    static shadow = [
      '0 1px 0 #ccc', 
      '0 2px 0 #c9c9c9',
      '0 3px 0 #bbb',
      '0 4px 0 #b9b9b9',
      '0 5px 0 #aaa',
      '0 6px 1px rgba(0,0,0,0.1)',
      '0 0 5px rgba(0,0,0,0.1)',
      '0 1px 3px rgba(0,0,0,0.3)',
      '0 3px 5px rgba(0,0,0,0.2)',
      '0 5px 10px rgba(0,0,0,0.25)',
      '0 10px 10px rgba(0,0,0,0.2)',
      '0 20px 20px rgba(0,0,0,0.15)'
    ]
    static init = (function() {
      var styles = [
        {selector:'@font-face',style:'font-family:Albertino;src:url(lib/Albertino_1.0.ttf);'},
        {selector:'body',style:"background:white;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  };
  class AppType {
    constructor() {
      Main();
    }
  }
  export const App = AppType;
}
