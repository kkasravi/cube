module cube {
  module log from 'log';
  module monads from 'monads';
  module controller from 'controller';
  module events from 'events';
  module svg from 'svg';
  module carousel from 'numbers';
  module canvas from 'canvas';
  module cubesvgs from 'cubesvgs';
  class Sparkles {
    constructor() {
      private element, stage, imgSeq, bmpSeq;
      @onimageload = @onimageload.bind(this);
      @tick = @tick.bind(this);
      @imgSeq = new Image();
      @element = monads.DOMable({tagName:'canvas'}).on('load').attributes({'id':'testCanvas',width:'980',height:'680'}).style({'background-color':'transparent','left':'20%','position':'absolute','z-index':'-100'}).insert(document.body).element();
      @stage = canvas.Stage({autoClear:false,canvas:@element});
      @imgSeq.onload = @onimageload;
      @imgSeq.src = "img/sparkle_21x23.png";
    }
    onimageload() {
      @stage.addChild(canvas.Shape({alpha:0.33,graphics:canvas.Graphics().beginFill('transparent').drawRect(0,0,@element.width+1,@element.height)}));
      @bmpSeq = canvas.BitmapSequence({regX:10.5,regY:11.5,spriteSheet:canvas.SpriteSheet({image:@imgSeq,frameWidth:21,frameHeight:23})});
      canvas.Ticker.addListener(this);
    }
    tick() {
      var h = @element.height;
      var l = @stage.getNumChildren();
      for (var i=l-1; i>0; i--) {
        var sparkle = @stage.getChildAt(i);
        sparkle.vY += 2;
        sparkle.vX *= 0.98;
        sparkle.x += sparkle.vX;
        sparkle.y += sparkle.vY;
        sparkle.scaleX = sparkle.scaleY = sparkle.scaleX+sparkle.vS;
        sparkle.alpha += sparkle.vA;
        if (sparkle.y > h) {
          sparkle.vY *= -0.6;
          sparkle.y -= sparkle.y%h;
        }
        if (sparkle.alpha <= 0) {
          @stage.removeChildAt(i);
        }
      }
      @stage.update();
    }
    addSparkles(count, x, y, speed) {
      for (var i=0; i<count; i++) {
        var sparkle = canvas.BitmapSequence(@bmpSeq);
        sparkle.x = x;
        sparkle.y = y;
        sparkle.rotation = Math.random()*360;
        sparkle.alpha = Math.random()*0.5+0.5;
        sparkle.scaleX = sparkle.scaleY = Math.random()+0.3;
        sparkle.compositeOperation = "lighter";
        var a = Math.PI*2*Math.random();
        var v = (Math.random()-0.5)*30*speed;
        sparkle.vX = Math.cos(a)*v;
        sparkle.vY = Math.sin(a)*v;
        sparkle.vS = (Math.random()-0.5)*0.2; // scale
        sparkle.vA = -Math.random()*0.05-0.01; // alpha
        sparkle.currentFrame = Math.random()*12|0;
        @stage.addChild(sparkle);
      }
    }
  }
  class ProgressBar {
    constructor(properties={time:5}) {
      private element, div, time;
      @oncountdown = @oncountdown.bind(this);
      @oniteration = @oniteration.bind(this);
      @onend = @onend.bind(this);
      @time = properties.time;
      @div = monads.DOMable({tagName:'div'}).on('load');
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'progressbar'}).add(
         div.element()
      ).insert(document.body);
    }
    start() {
      @div.animation({property:'progress',time:@time+'s',count:'infinite'});
      @div.element().addEventListener('webkitAnimationStart',this.onstart);
      @div.element().addEventListener('webkitAnimationIteration',this.oniteration);
    }
    oncountdown() {
log.Logger.debug(this,'oncountdown');
//	setTimer(1000,@oncountdown);
    }
    oniteration() {
      controller.Controller.publish(events.CustomEvent({type:'timeout',canBubble:false,isCanceleable:true}));
    }
    onend() {
log.Logger.debug(this,'onend');
    }
    static init = (function() {
      var styles = [
        {selector:'#progressbar',style:"margin-top:15px;margin-left:35%;width:20%;background-color:transparent;border-radius:13px;padding:3px;"},
        {selector:'#progressbar div',style:"background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0.45, rgb(255,132,25)), color-stop(0.73, rgb(234,235,193)), color-stop(0.87, rgb(255,132,25)));width:90%;height:20px;border-radius:10px;"},
        {selector:'@-webkit-keyframes progress',style:"from {width:100%;} to {width:0%;}"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Equation {
    constructor(properties={}) {
      private sections, guessindex, instance;
      this.onnext = this.onnext.bind(this);
      @guessindex = 0;
      @operation = properties.operation;
      @sections = @equation;
      @sections.element.style({'font-family':'Albertino','color':properties.color}).textShadow(Main.shadow).translate({x:'-190%',y:'-100%'});
      monads.Styleable([{selector:'.sections > .section > .carousel > .field',style:"color:"+properties.color+";"}]).on("load").onstyle();
//      @sections.sections[4].element.on(['touchend','click'],this.onnext);
    }
    answer() {
      var operand1 = @instance.sections[0].carousel.children[0].text()
      var operator = @instance.sections[1].carousel.children[0].text()
      var operand2 = @instance.sections[2].carousel.children[0].text()
      var value;
      switch(operator) {
        case '\\u002B':
          value = parseInt(operand1) + parseInt(operand2);
          break;
        case '\\u002D':
          value = parseInt(operand1) - parseInt(operand2);
          break;
        case '\\u00D7':
          value = parseInt(operand1) * parseInt(operand2);
          break;
        case '\\u003D':
          value = parseInt(operand1) / parseInt(operand2);
          break;
      }
      return value;
    }
    clear() {
      @instance.sections[0].carousel.next();
      @instance.sections[2].carousel.next();
    }
    guess(number) {
      return @instance.sections[4].carousel.children[0].updateText(number);
    }
    get equation() {
      var operand1, operand2, answer, guess, guesses=['?'];
      switch(@operation) {
        case 'minus':
          operand1=Math.round(Math.random()*100); 
          operand2=operand1+Math.round(Math.random()*100);
          answer = operand2 - operand1;
          @instance = carousel.Sections({sets:[[operand2+'',' ',' ',' '],['\\u002D','\\u002D','\\u002D'],[operand1+'',' ',' ',' '],['\\u003D','\\u003D'],guesses]});
          break;
        case 'multiply':
          operand1=Math.round(Math.random()*12); 
          operand2=Math.round(Math.random()*12);
          answer = operand2 * operand1;
          @instance = carousel.Sections({sets:[[operand2+'','1','1','1'],['\\u00D7','\\u00D7','\\u00D7'],[operand1+'','1','1','1'],['\\u003D','\\u003D'],guesses]});
          break;
        case 'divide':
          operand1=Math.round(Math.random()*100); 
          operand2=Math.round(Math.random()*100);
          answer = operand2 / operand1;
          @instance = carousel.Sections({sets:[[operand1+'','1','1','1'],['\\u00F7','\\u00F7','\\u00F7'],[operand2+'','1','1','1'],['\\u003D','\\u003D'],guesses]});
          break;
        case 'plus':
          operand1=Math.round(Math.random()*100); 
          operand2=Math.round(Math.random()*100);
          answer = operand2 + operand1;
          @instance = carousel.Sections({sets:[[operand1,'1','1','1'],['\\u002B','\\u002B','\\u002B'],[operand2,'1','1','1'],['\\u003D','\\u003D'],guesses]});
          break;
      }
      return @instance;
    }
    onnext() {
      @guessindex++;
      if(@guessindex === @sections.sections[4].carousel.children.length) {
        @guessindex = 0;
      }
      @sections && @sections.sections && @sections.sections[4].carousel.next();
    }
    static init = (function() {
      var styles = [
        {selector:'.sections > .section',style:"border:0;width:170px;"},
        {selector:'.sections > .section > .carousel > .field',style:"font-size:6em;background:rgba(0,0,0,0);border:0;width:170px;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
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
        var panel = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'rotateX('+deg+'deg) translateZ(192px)'}).attributes({'class':'vertical-number-strip-carousel-number'}).text(number).on(['click','touchend'],@onselect.curry(number));
        @carousel.add(panel);
      }, this);
      return @element;
    }
    onselect(number,event) {
      controller.Controller.publish(events.CustomEvent({type:'guess',canBubble:false,isCanceleable:true,detail:number}));
    }
    static init = (function() {
      var styles = [
        {selector:'.vertical-number-strip',style:"width:100px;height:140px;position:relative;margin:0 auto 40px;-webkit-perspective:1000px;float:right;"},
        {selector:'.vertical-number-strip-carousel',style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transform:translateZ(-192px) rotateX(0deg) translateY(-430px);"},
        {selector:'.vertical-number-strip-carousel-number',style:"-webkit-backface-visibility:hidden;display:block;width:100px;height:70px;line-height:80px;text-align:center;font-size:50px;font-family:Albertino;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
    static backspace = '\\u2716'
  };
  class Title {
    constructor() {
      private title;
      @title = monads.DOMable({tagName:'div'}).on('load').style({'white-space':'nowrap','height':'100px','width':'420px','color':'#e97825','font-family':'Albertino','font-size':'80px','-webkit-transform':'translateX(-220px) translateY(-120px) rotateY(-230deg) rotateX(76deg)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text('Ninja Math');
      @title.delay(@title.style,[{'-webkit-transform':'translateX(-140px) translateY(-120px) rotateY(-230deg) rotateX(0deg)'}],300);
      return @title;
    }
  }
  class Checker {
    constructor() {
      private wrong, right, wrongAnswers, rightAnswers;
      @wrongAnswers = 0;
      @wrong = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','top':'0px','right':'200px','white-space':'nowrap','height':'100px','width':'100px','color':'transparent','font-family':'Albertino','font-size':'50px','-webkit-transform':'translateY(0%)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text('  \\u2718').insert(document.body);
      @rightAnswers = 0;
      @right = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','top':'0px','right':'300px','white-space':'nowrap','height':'100px','width':'100px','color':'transparent','font-family':'Albertino','font-size':'50px','-webkit-transform':'translateY(0%)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text('  \\u2714').insert(document.body);
    }
    answer(guess) {
      guess ? @right.style({'color':'green'}).updateText((++@rightAnswers)+' \\u2714'): @wrong.style({'color':'red'}).updateText((++@wrongAnswers)+' \\u2718');
    }
  }
  class Play {
    constructor() {
      private choice, play;
      this.onchoose = this.onchoose.bind(this);
      this.ontouchend = this.ontouchend.bind(this);
      @choice = null;
      @play = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transition':'-webkit-transform 400ms linear','-webkit-transform':'translateX(-1000px) translateY(-350px) rotateY(130deg) rotateX(-106deg) rotateZ(0deg) scale(3.0)','white-space':'nowrap','height':'60px','width':'60px','color':'#e97825','font-family':'Albertino','font-size':'60px'}).textShadow(Main.shadow).text('\\u2794');
      @play.on(['touchend','click'],this.ontouchend);
      controller.Controller.subscribe('choose',this.onchoose);
      return @play;
    }
    onchoose(event) {
      @choice = event.detail;
      @play.style({'-webkit-transform':'translateX(-1000px) translateY(-350px) rotateY(130deg) rotateX(0deg) rotateZ(0deg) scale(3.0)'});
    }
    ontouchend(event) {
      @choice && controller.Controller.publish(events.CustomEvent({type:'play',canBubble:false,isCanceleable:true,detail:@choice}));
    }
  }
  class Levels {
    constructor() {
      private levels, one, two, three, four, title;
      this.onone = this.onone.bind(this);
      this.ontwo = this.ontwo.bind(this);
      this.onthree = this.onthree.bind(this);
      this.onfour = this.onfour.bind(this);
      @title = monads.DOMable({tagName:'div'}).on('load').style({'white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'60px'}).textShadow(Main.shadow).text('levels:');
      @one = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateY(100px)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'60px'}).textShadow(Main.shadow).text('1').on(['click','touchend'],this.onone);
      @two = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(80px) translateY(100px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'60px'}).textShadow(Main.shadow).text('2').on(['click','touchend'],this.ontwo);
      @three = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(160px) translateY(100px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'60px'}).textShadow(Main.shadow).text('3').on(['click','touchend'],this.onthree);
      @four = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(240px) translateY(100px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'60px'}).textShadow(Main.shadow).text('4').on(['click','touchend'],this.onfour);
//      @levels = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(30px) translateY(130px) rotateY(-230deg)','-webkit-transition':'-webkit-transform 400ms linear'}
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
  class Difficulty {
    constructor() {
      private difficulty, easy, easyarrow, hard, hardarrow;
      this.oneasy = this.oneasy.bind(this);
      this.onhard = this.onhard.bind(this);
      @easy = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(0px) translateY(0px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'60px'}).textShadow(Main.shadow).text('Easy').on(['click','touchend'],this.oneasy);
      @hard = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(220px) translateY(0px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'60px'}).textShadow(Main.shadow).text('Hard').on(['click','touchend'],this.onhard);
      @easyarrow =  monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(-60px) translateY(-10px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'60px'}).textShadow(Main.shadow).text('\\u2794');
      @hardarrow =  monads.DOMable({tagName:'div'}).on('load').style({'display':'none','-webkit-transform':'translateX(160px) translateY(-10px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Albertino','font-size':'60px'}).textShadow(Main.shadow).text('\\u2794');
      @difficulty = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(30px) translateY(230px) rotateY(-230deg)','-webkit-transition':'-webkit-transform 400ms linear'}).add(
        @easyarrow
      ).add(
        @easy
      ).add(
        @hardarrow
      ).add(
        @hard
      );
      return @difficulty;
    }
    oneasy(event) {
      @easyarrow.style({'display':'block'});
      @hardarrow.style({'display':'none'});
      controller.Controller.publish(events.CustomEvent({type:'difficulty',canBubble:false,isCanceleable:true,detail:'easy'}));
    }
    onhard(event) {
      @easyarrow.style({'display':'none'});
      @hardarrow.style({'display':'block'});
      controller.Controller.publish(events.CustomEvent({type:'difficulty',canBubble:false,isCanceleable:true,detail:'hard'}));
    }
  }
  class Next {
    constructor(properties={color:'transparent'}) {
      private element, next;
      @onnext = @onnext.bind(this);
      controller.Controller.subscribe('play',@onplay);
      @next = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','-webkit-transform':'translateX(110px) translateY(200px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':properties.color,'font-family':'Albertino','font-size':'8em'}).textShadow(Main.shadow).text('\\u2794').on(['click','touchend'],this.onnext);
      @element = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(60%) translateY(30px)','-webkit-transition':'-webkit-transform 400ms linear'}).add(
        @next
      ).insert(document.body);
      @next.on(['touchend','click'],this.onnext);
    }
    onnext(event) {
      controller.Controller.publish(events.CustomEvent({type:'next',canBubble:false,isCanceleable:true}));
    }
  }
  export class Container {
    constructor(properties={}) {
      private element, cube, front, back, right, left, top, bottom;
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
      );
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
    static init = (function() {
      var styles = [
        {selector:'.container',style:"top:25%;width:200px;height:200px;position:relative;margin:0 auto 40px;-webkit-perspective:1000px;"},
        {selector:'#cube',style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transition:-webkit-transform 1s;"},
        {selector:'#cube.show-front',style:"-webkit-transform:translateZ(-100px);"},
        {selector:'#cube.show-back',style:"-webkit-transform:translateZ(-100px) rotateX(-180deg);"},
        {selector:'#cube.show-right',style:"-webkit-transform:translateZ(-100px) rotateY(-90deg);"},
        {selector:'#cube.show-left',style:"-webkit-transform:translateZ(-100px) rotateY(90deg);"},
        {selector:'#cube.show-top',style:"-webkit-transform:translateZ(-100px) rotateX(-90deg);"},
        {selector:'#cube.show-bottom',style:"-webkit-transform:translateZ(-100px) rotateX(90deg);"},
        {selector:'#cube div',style:"display:block;position:absolute;width:196px;height:196px;-webkit-backface-visibility:hidden;"},
        {selector:'#cube .front',style:"-webkit-transform:translateZ(100px);"},
        {selector:'#cube .back',style:"-webkit-transform:rotateX(-180deg) translateZ(100px);"},
        {selector:'#cube .right',style:"-webkit-transform:rotateY(90deg) translateZ(100px);"},
        {selector:'#cube .left',style:"-webkit-transform:rotateY(-90deg) translateZ(100px);"},
        {selector:'#cube .top',style:"-webkit-transform:rotateX(90deg) translateZ(100px);"},
        {selector:'#cube .bottom',style:"-webkit-transform:rotateX(-90deg) translateZ(100px);"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  };
  class Main {
    constructor() {
      private activeSide, bestGuess, container, checker, color, difficulty, difficultyChoice, equation, frame, levels, ninja, operation, problems, play, screens, sequence, shuriken, sparkles, title;
      @ontouchstart = this.ontouchstart.bind(this);
      @ontouchmove = this.ontouchmove.bind(this);
      @ontouchend = this.ontouchend.bind(this);
      @onguess = this.onguess.bind(this);
      @onnext = this.onnext.bind(this);
      @onplay = this.onplay.bind(this);
      @onlevel = this.onlevel.bind(this);
      @ondifficulty = this.ondifficulty.bind(this);
      controller.Controller.subscribe('guess',@onguess);
      controller.Controller.subscribe('next',@onnext);
      controller.Controller.subscribe('play',@onplay);
      controller.Controller.subscribe('difficulty',@ondifficulty);
      controller.Controller.subscribe('level',@onlevel);
      @activeSide = 0;
      @bestGuess = '?';
      @screens = Container({front:Levels()}).showFront();
      @levels = Levels();
      @sequence = [
        {side:'back',board:cubesvgs.WoodPlank1()},
        {side:'top',board:cubesvgs.WoodPlank2()},
        {side:'bottom',board:cubesvgs.WoodPlank3()}
      ];
      @screens.back.add(@sequence[0].board.element);
      @screens.top.add(@sequence[1].board.element).style({'display':'none'});
      @screens.bottom.add(@sequence[2].board.element).style({'display':'none'});
      @difficultyChoice = 'easy';
      @title = Title();
      @difficulty = Difficulty();
      @play = Play();
      @problems = [];
      @shuriken = cubesvgs.Shuriken();
      @ninja = cubesvgs.Ninja();
      @frame = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'frame'}).add(
        monads.DOMable({tagName:'div'}).on('load').attributes({'class':'inner'}).add(
          @title
        ).add(
          @play
/*
        ).add(
          @difficulty
*/
        )
      );
      @ninja.element.insert(document.body);
      @container = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'container'}).add(
        @frame
      ).insert(document.body);
      @screens.element.insert(document.body);
      monads.DOMable({element:document.body}).on('touchstart',this.ontouchstart).on('touchmove',this.ontouchmove).on(['touchend','click'],this.ontouchend);
    }
    ondifficulty(event) {
      @difficultyChoice = event.detail;
    }
    onlevel(event) {
      var plus = cubesvgs.Plus(), minus, multiply, divide;
      switch(event.detail) {
        case "1":
          minus = cubesvgs.Minus();
          @screens.right.add(plus).add(minus);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(73%)','opacity':'1'})},500);
          @ninja.rotateSword();
          break;
        case "2":
          minus = cubesvgs.Minus();
          @screens.right.add(plus).add(minus);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(73%)','opacity':'1'})},500);
          @ninja.raiseSword();
          break;
        case "3":
          minus = cubesvgs.Minus();
          multiply = cubesvgs.Multiply();
          @screens.right.add(plus).add(minus).add(multiply);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(73%)','opacity':'1'})},500);
          setTimeout(function(){multiply.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(150%)','opacity':'1'})},1000);
          @ninja.raiseSword();
          break;
        case "4":
        default:
          minus = cubesvgs.Minus();
          multiply = cubesvgs.Multiply();
          divide = cubesvgs.Divide();
          @screens.right.add(plus).add(minus).add(multiply).add(divide);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(73%)','opacity':'1'})},500);
          setTimeout(function(){multiply.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(150%)','opacity':'1'})},1000);
          setTimeout(function(){divide.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(225%)','opacity':'1'})},1500);
          @ninja.raiseSword();
          break;
      }
      @screens.showRight();
    }
    onplay(event) {
      @checker = Checker();
      @color = event.detail.color, @operation = event.detail.operation;
      @title.style({'-webkit-transform':'translateX(-150px) translateY(-120px) rotateY(-230deg) rotateX(76deg)'});
      @play.style({'-webkit-transform':'translateX(-1000px) translateY(-350px) rotateY(130deg) rotateX(-106deg) scale(3.0)'});
      @sparkles = Sparkles();
      @equation = Equation({operation:@operation,difficultyChoice:@difficultyChoice,color:@color});
      @screens[@sequence[@activeSide%3].side].add(@equation.instance.element);
      @screens['show'+@sequence[@activeSide%3].side.substring(0,1).toUpperCase()+@sequence[@activeSide%3].side.substring(1)]();
      @problems.push(@equation);
      VerticalNumberStrip().insert(document.body);
      Next({color:@color});
      @screens.front.style({'display':'none'});
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
      @equation.guess(@bestGuess);
    }
    onnext(event) {
      var answer = @equation.answer();
      var guess = parseInt(@bestGuess);
      var correct = answer === guess;
      var x = document.documentElement.clientWidth/2;
      var y = document.documentElement.clientHeight/3;
      correct && @sequence[@activeSide%3].board.breakBoard() && @sparkles.addSparkles(Math.random()*200+100|0, x, y, 2);
      @checker.answer(correct);
      @equation.instance.element.remove();
      @bestGuess = '?';
      @equation = Equation({operation:@operation,difficultyChoice:@difficultyChoice,color:@color});
      @activeSide++;
      @screens[@sequence[@activeSide%3].side].style({'display':'block'}).add(@equation.instance.element);
      @screens['show'+@sequence[@activeSide%3].side.substring(0,1).toUpperCase()+@sequence[@activeSide%3].side.substring(1)]();
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
        {selector:'@font-face',style:'font-family:Albertino;src:url(/cube/lib/Albertino_1.0.ttf);'},
        {selector:'body',style:"background:white"},
        {selector:'#container',style:"position:absolute;left:45%;margin-left:-100px;top:35%;margin-top:-100px;height:200px;width:200px;-webkit-perspective:800;"},
        {selector:'#frame',style:"opacity: 1.0;width: 200px;-webkit-transform-style: preserve-3d;-webkit-transform: translateZ(150px);-webkit-transition: all 0.5s linear;"},
        {selector:'.inner',style:"height:200px;width:200px;-webkit-transform-style: preserve-3d;-webkit-transform: rotateY(230deg);"},
        {selector:'.inner div',style:"position: absolute;height:200px;width:200px;background-size: 100% 100%;opacity: 1;-webkit-transform: rotateX(-90deg);"},
        {selector:'.inner .e',style:"top:100px;font-size:80px;"},
        {selector:'.inner .f',style:"top:-100px;"},
        {selector:'.inner .f',style:"top:-100px;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class AppType {
    constructor() {
      Main();
    }
  }
  export const App = AppType;
}
