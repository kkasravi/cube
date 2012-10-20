module cube {
  module log from 'log';
  module monads from 'monads';
  module controller from 'controller';
  module events from 'events';
  module svg from 'svg';
  module carousel from 'numbers';
  module canvas from 'canvas';
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
/*
    guess() {
      return parseInt(@instance.sections[4].carousel.children[@guessindex].text());
    }
*/
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
      var theta = 100 / @numbers.length;
      @numbers.forEach(function(number,i) {
        var deg = -48+theta*i;
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
        {selector:'.vertical-number-strip',style:"width:210px;height:140px;position:relative;margin:0 auto 40px;-webkit-perspective:1000px;float:right;"},
        {selector:'.vertical-number-strip-carousel',style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transform:translateZ(-192px) rotateX(0deg) translateY(-400px);"},
        {selector:'.vertical-number-strip-carousel-number',style:"-webkit-backface-visibility:hidden;display:block;width:186px;height:90px;line-height:70px;text-align:center;font-size:50px;font-family:Albertino;"}
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
      @wrong = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','right':'50px','white-space':'nowrap','height':'100px','width':'100px','color':'transparent','font-family':'Albertino','font-size':'50px','-webkit-transform':'translateY(1%)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text('  \\u2718').insert(document.body);
      @rightAnswers = 0;
      @right = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','right':'150px','white-space':'nowrap','height':'100px','width':'100px','color':'transparent','font-family':'Albertino','font-size':'50px','-webkit-transform':'translateY(1%)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text('  \\u2714').insert(document.body);
    }
    answer(guess) {
      guess ? @right.style({'color':'green'}).updateText((@rightAnswers++)+' \\u2714'): @wrong.style({'color':'red'}).updateText((@wrongAnswers++)+' \\u2718');
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
  export class WoodPlank {
    constructor() {
      private element, id, woodplank;
      @id = Math.uuid(8);
      @woodplank = svg.Svg({width:"950",height:"160"}).
        defs().
          clipPath({id:@id+"clip1"}).
            path({d:"m 68.332031,804.41406 c -0.195312,5.13281 -0.78125,9.76172 -0.535156,14.23828 0.101563,1.84766 0.484375,3.34766 0.535156,5.11328 0.164063,6.03516 -1.042969,11.63282 -0.894531,17.52344 0.925781,2.63281 0.421875,3.60547 0.179688,6.9375 0.488281,1.4375 1.003906,2.8125 1.429687,4.38281 5.839844,0.23438 11.832031,0.9336 17.691406,1.45704 3.320313,0.30078 8.007813,0.46093 10.183594,-1.09375 4.968755,2.48828 12.953125,3.90625 18.585935,1.46093 0.44141,1.03516 0.92188,1.22657 1.60547,1.46094 4.8711,1.66016 14.39453,2.59375 16.62109,-3.28516 1.66797,-4.40625 0.89063,-27.71484 1.07422,-36.51171 0.95703,-46.5 1.11719,-99.125 1.60547,-145.31641 -0.38281,-1.52734 -1.28906,-1.98828 -1.25,-4.38281 0.0117,-1.80078 1.41016,-0.76953 1.25,-2.91797 0.10547,-19.82422 0.6211,-40.47266 0.71485,-60.2461 -1.16797,-1.7539 -2.71094,-3.42968 -3.39454,-5.10937 1.36329,-3.66406 1.89844,-9.02344 3.57422,-12.05078 0.043,-5.71875 0.0195,-12.32422 0.17969,-19.35156 0.21094,-9.58204 1.07031,-20.69922 0.35547,-28.47657 -0.66016,-7.1914 -3.08984,-4.20312 -6.43359,-5.11328 -0.89844,-0.24609 -1.75,-1.5039 -2.67969,-1.82422 -4.78125,-1.64843 -11.46484,-1.40625 -15.54688,-1.46093 -0.37109,-0.004 -0.96875,0.74609 -1.42968,0.73046 -2.63672,-0.10937 -5.47266,-1.21484 -8.21875,-1.46093 -1.64453,-0.14844 -3.23828,0.23437 -4.824222,0 -3.285157,-0.48828 -6.480469,-2.20703 -9.652344,-2.19141 -3.21875,0.0195 -6.1875,1.71094 -9.113282,0 -1.410156,-4.38281 -5.09375,-1.32031 -7.324218,-1.46094 -1.699219,5.3711 -0.01172,12.80078 -1.074219,18.6211 -0.292969,1.61328 -1.058594,2.3125 -1.429687,4.01562 -0.433594,2.02344 -0.285157,4.50391 -1.25,5.47656 0.625,1.90235 -0.4375,3.46094 -0.535157,5.47657 -0.105469,2.24609 0.453125,5.38281 0.535157,8.39843 0.152343,5.51172 -0.800782,10.72266 0.179687,15.33594 -0.144531,1.16797 -0.527344,1.83985 -0.535156,3.28516 1.75,7.03125 0.609375,17.07422 0.890625,28.48047 0.453125,0.66015 1.171875,0.77734 1.253906,2.1914 0.414062,8.15235 -0.21875,18.45313 0.535156,25.92188 -1.519531,2.80078 -0.328125,6.42969 -0.355468,9.85937 -0.01172,0.98828 -0.378907,3.0625 -0.539063,4.74219 -0.355469,3.78516 -0.324219,6.08594 -1.25,7.30469 0.632813,4.20703 0.03125,8.55078 0,13.50781 -0.04297,6.48828 1.050781,13.84375 0.714844,20.44922 0.03516,1.14062 1.042969,0.30469 1.25,1.09375 -1.175781,1.38281 -1.410157,4.19531 -1.429688,7.30078 -0.09375,14.78516 -0.421875,34.12109 -0.179687,48.92578 -0.289063,0.75 -1.316406,-0.0156 -1.605469,0.73047 0.210937,1.86719 -0.121094,4.22266 0,6.9375 -0.109375,1.4375 1.234375,-0.0937 1.070313,1.46094 -0.472657,12.90625 -0.02734,26.01953 -0.535157,39.43359",id:"path7"}).end().
          end().
        end().
        g({transform:"scale(2.6,2.0)"}).
          path({d:"m 53.082439,1.0434909 c -5.16406,-0.19531002 -9.82422,-0.78516002 -14.33203,-0.53906002 -1.85937,0.10156 -3.37109,0.49218 -5.14453,0.53906002 -6.07812,0.16797 -11.71094,-1.04688002 -17.64062,-0.89844002 -2.64844,0.92969002 -3.62891,0.42578 -6.9843776,0.17969 -1.4492202,0.48828 -2.8281202,1.01172002 -4.4101602,1.43750002 -0.23437,5.87891 -0.9375,11.9140601 -1.46875,17.8085901 -0.30078,3.33985 -0.46093,8.0625 1.10157,10.25 -2.5,5 -3.92969007,13.03907 -1.46875,18.70704 -1.04297,0.44531 -1.23438,0.92968 -1.46875,1.62109 -1.67188007,4.89844 -2.61328,14.48437 3.30468,16.72656 4.4336002,1.67578 27.8945378,0.89453 36.7499978,1.07813 46.804686,0.96484 99.777351,1.1289 146.273441,1.62109 1.53516,-0.38672 2,-1.30078 4.41016,-1.26172 1.8125,0.0117 0.77344,1.41797 2.9375,1.26172 19.95312,0.10547 40.73437,0.625 60.64062,0.71875 1.76172,-1.17578 3.44922,-2.72656 5.14453,-3.41797 3.6875,1.37109 9.08204,1.91016 12.12891,3.59766 5.75781,0.043 12.40234,0.0234 19.47656,0.17968 9.64844,0.21485 20.83594,1.07813 28.66797,0.35938 7.23438,-0.66406 4.22656,-3.10938 5.14453,-6.47656 0.2461,-0.90235 1.51563,-1.76172 1.83594,-2.69922 1.66016,-4.8125 1.41406,-11.53906 1.46875,-15.64453 0.008,-0.375 -0.75391,-0.97656 -0.73047,-1.44141 0.10547,-2.65234 1.21875,-5.50781 1.46875,-8.27344 0.14844,-1.65234 -0.23828,-3.25781 0,-4.85547 0.49219,-3.30859 2.21875,-6.52343 2.20313,-9.71484 -0.0156,-3.23828 -1.72266,-6.23047 0,-9.17187 4.41406,-1.42188 1.32812,-5.1289101 1.47265,-7.3711001 -5.41015,-1.71094 -12.89062,-0.0117 -18.74609,-1.08203 -1.62109,-0.29687 -2.32422,-1.07031 -4.03906,-1.44141 -2.03907,-0.4375 -4.53125,-0.28906 -5.51563,-1.25781 -1.91015,0.62891 -3.48437,-0.4414 -5.51172,-0.53906 -2.25781,-0.10547002 -5.41797,0.45703 -8.45312,0.53906 -5.55078,0.15625 -10.78906,-0.80469002 -15.4375,0.17969 -1.17578,-0.14453 -1.85156,-0.53125 -3.30469,-0.53906 -7.07812,1.76172 -17.1875,0.61328 -28.66797,0.89843 -0.66406,0.45704 -0.78125,1.17579 -2.20312,1.26172 -8.21094,0.41797 -18.57813,-0.21875 -26.09375,0.53907 -2.82032,-1.53125 -6.47266,-0.33204 -9.92188,-0.35938 -1,-0.008 -3.08594,-0.38281 -4.77734,-0.53906 -3.8086,-0.35938 -6.125,-0.33203 -7.35156,-1.26172 -4.23438,0.63672 -8.60938,0.0352 -13.59766,0 -6.53125,-0.043 -13.93359,1.05859 -20.58203,0.72266 -1.15235,0.0352 -0.30469,1.04687 -1.10156,1.25781 -1.39063,-1.1875 -4.22266,-1.42188 -7.34766,-1.44141 -14.88281,-0.0937 -34.34766,-0.42578 -49.25,-0.17969 -0.75,-0.28906 0.0195,-1.32421002 -0.73438,-1.61718002 -1.878909,0.21093 -4.246095,-0.1211 -6.980465,0 -1.44532,-0.10938 0.0898,1.24218002 -1.47266,1.07812002 -12.988276,-0.47265 -26.187496,-0.0312 -39.691406,-0.53906",style:"fill:#4c1714;fill-opacity:1;fill-rule:evenodd;stroke:none"}).end().
          path({d:"m 94.460095,1.4423809 c 1.55469,0.16406 0.0234,-1.17969002 1.46094,-1.07032002 2.714836,-0.12109 5.070315,0.21094 6.937505,0 0.74609,0.28907 -0.0195,1.31641002 0.73047,1.60547002 14.80469,-0.24218 34.14062,0.0859 48.92578,0.17969 3.10547,0.0195 5.91797,0.25391 7.30078,1.42969 0.78906,-0.20703 -0.0469,-1.21485 1.09375,-1.25 6.60547,0.33594 13.96094,-0.75781 20.44922,-0.71485 4.95703,0.0312 9.30078,0.63282 13.50781,0 1.21875,0.92579 3.51953,0.89454 7.30469,1.25 1.67969,0.16016 3.75391,0.52735 4.74219,0.53907 3.42968,0.0273 7.05859,-1.16407 9.85937,0.35547 7.46875,-0.75391 17.76953,-0.1211 25.92188,-0.53516 1.41406,-0.082 1.53125,-0.80078 2.1914,-1.25391 11.40625,-0.28125 21.44922,0.85938 28.48047,-0.89062 1.44531,0.008 2.11719,0.39062 3.28516,0.53515 4.61328,-0.98046002 9.82422,-0.0273 15.33594,-0.17968 3.01562,-0.082 6.15234,-0.64063002 8.39843,-0.53516002 2.01563,0.0977 3.57422,1.16016002 5.47657,0.53516002 0.97265,0.96484 3.45312,0.8164 5.47656,1.25 1.70312,0.37109 2.40234,1.13672 4.01562,1.42968 5.82032,1.0625 13.25,-0.625 18.6211,1.07422 -0.14063,2.23047 2.92187,5.9140701 -1.46094,7.3242201 -1.71094,2.92578 -0.0195,5.89453 0,9.11328 0.0156,3.17188 -1.70313,6.36719 -2.19141,9.65235 -0.23437,1.58594 0.14844,3.17969 0,4.82422 -0.24609,2.74609 -1.35156,5.58203 -1.46093,8.21875 -0.0156,0.46093 0.73437,1.05859 0.73046,1.42968 -0.0547,4.08204 0.1875,10.76563 -1.46093,15.54688 -0.32032,0.92969 -1.57813,1.78125 -1.82422,2.67969 -0.91016,3.34375 2.07812,5.77343 -5.11328,6.43359 -7.77735,0.71484 -18.89453,-0.14453 -28.47657,-0.35547 -7.02734,-0.16016 -13.63281,-0.13672 -19.35156,-0.17969 -3.02734,-1.67578 -8.38672,-2.21093 -12.05078,-3.57422 -1.67969,0.6836 -3.35547,2.22657 -5.10937,3.39454 -19.77344,-0.0937 -40.42188,-0.60938 -60.2461,-0.71485 -2.14844,0.16016 -1.11719,-1.23828 -2.91797,-1.25 -2.39453,-0.0391 -2.85547,0.86719 -4.38281,1.25 -46.19141,-0.48828 -98.816415,-0.64844 -145.316411,-1.60547 -8.79687,-0.18359 -32.10546,0.59375 -36.5117078,-1.07422 -5.87891007,-2.22656 -4.94532,-11.74999 -3.28516,-16.62109 0.23437,-0.68359 0.42578,-1.16406 1.46094,-1.60547 -2.44532,-5.63281 -1.02735,-13.61718 1.46093,-18.58594 -1.55468,-2.17578 -1.39453,-6.86328 -1.09375,-10.18359 0.52344,-5.85937 1.22266,-11.8515601 1.45704,-17.6914101 1.5703102,-0.42578 2.9453102,-0.94140002 4.3828078,-1.42968002 3.33203,0.24218 4.30469,0.74609 6.9375,-0.17969 5.89062,-0.14844 11.48828,1.05859002 17.52344,0.89453 1.76562,-0.0508 3.26562,-0.43359 5.11328,-0.53516 4.47656,-0.24609 9.10547,0.33985 14.23828,0.53516 13.41406,0.50781002 26.52734,0.0625 39.433586,0.53516002",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:evenodd;stroke:none"}).end().
          g({'clip-rule':"nonzero",'clip-path':"url(#"+@id+"clip1)",transform:"matrix(0,1,-1,0,859.44057,-67.424819)"}).
            path({d:"m 137.84375,835.98828 c 0,-4.26562 0,-8.53516 0,-12.79687 -0.23438,0 -0.46875,0 -0.70313,0 0.45704,4.02734 -0.92578,10.02343 0.70313,12.79687",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 137.14062,699.73047 c 0.46875,10.04297 -0.9375,22.08203 0.70313,30.86719 0,-12.55079 0,-25.09766 0,-37.64063 -1.59766,0.79688 -0.26953,4.73047 -0.70313,6.77344",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 137.14062,684.67187 c 0.4336,2.04688 -0.89453,5.97657 0.70313,6.77735 0,-12.55078 0,-25.08985 0,-37.64063 0,-3.25781 0,-6.51953 0,-9.78515 -0.23438,0 -0.46875,0 -0.70313,0 0,0.5 0,1.0039 0,1.50781 0,13.04687 0,26.09375 0,39.14062",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 137.84375,565.73047 c 0,-2.51172 0,-5.01563 0,-7.52735 -1.16797,0.81641 -1.16797,6.71485 0,7.52735",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.5625,566.32812 c -0.0195,-2.73828 -0.0352,-5.47265 -0.0508,-8.20312 l 0,0.0234 c 0.0156,2.72656 0.0312,5.45312 0.0508,8.17968",style:"fill:#0f0c0c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.45312,540.92578 c 0,5.71484 0.0234,11.44922 0.0586,17.19922 l 0.0391,-36.05469 c -0.0742,5.73828 -0.10156,11.52735 -0.0977,17.33985 0,0.5039 0,1.01171 0,1.51562",style:"fill:#0f0c0c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.23437,625.07031 c -0.0195,0.58985 -0.0352,1.17578 -0.0547,1.75781 -0.0937,2.99219 -0.20313,5.96875 -0.33594,8.91407 0,2.75781 0,5.52343 0,8.28125 0,3.26562 0,6.52734 0,9.78515 0.0977,6.77344 0.18359,13.58594 0.26172,20.42188 0.0195,1.48047 0.0352,2.96484 0.0508,4.44531 0.0781,6.76953 0.14844,13.55469 0.20703,20.375 l 0.0898,-82.74219 c 0,0.0156 -0.004,0.0312 -0.004,0.043 -0.0547,2.92578 -0.13281,5.82813 -0.21485,8.71875",style:"fill:#0f0c0c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.52734,720.5625 c 0.008,0.93359 0.0117,1.87109 0.0195,2.8125 -0.008,-0.94141 -0.0117,-1.87891 -0.0195,-2.8125",style:"fill:#0f0c0c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.45312,616.30859 c 0,-0.004 0,-0.008 0,-0.0156 0,0.008 0,0.008 0,0.0117 l 0,0.004",style:"fill:#0f0c0c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.5625,834.68359 c -0.004,0.37891 -0.004,0.75391 -0.008,1.13672 0.004,-0.38281 0.004,-0.75781 0.008,-1.13672",style:"fill:#0f0c0c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.37891,859.66016 0.004,0 c 0.0703,-7.91797 0.1211,-15.875 0.17188,-23.83985 -0.0508,7.96875 -0.10938,15.91406 -0.17578,23.83985",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 137.84375,692.95703 c 0,12.54297 0,25.08984 0,37.64063 0,7.02343 0,14.05078 0,21.07812 0,2.50781 0,5.01953 0,7.52734 0,10.53907 0,21.07813 0,31.61719 0,10.79297 0,21.57813 0,32.3711 0,4.26171 0,8.53125 0,12.79687 0,7.89063 0,15.78125 0,23.67188 l 0.35156,0 0.16797,-160.60547 c -0.0586,-6.81641 -0.12891,-13.60938 -0.20703,-20.37891 -0.0156,-1.48047 -0.0312,-2.96484 -0.0508,-4.44531 -0.0781,-6.83594 -0.16406,-13.64844 -0.26172,-20.42188 0,12.55078 0,25.08985 0,37.64063 0,0.5 0,1.0039 0,1.50781",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.54687,723.375 c 0.0391,6.50391 0.0742,13.02344 0.0977,19.55078 -0.0234,-6.52734 -0.0586,-13.04297 -0.0977,-19.55078",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.52734,720.5625 c -0.0469,-7.19531 -0.10156,-14.36328 -0.16406,-21.51172 l 0,0.004 c 0.0625,7.14453 0.11719,14.32031 0.16406,21.50781",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 137.84375,653.80859 c 0.0977,6.77344 0.18359,13.58594 0.26172,20.42188 -0.0781,-6.83594 -0.16406,-13.64844 -0.26172,-20.42188",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.19531,859.66016 0.1836,0 c 0.0664,-7.92579 0.125,-15.8711 0.17578,-23.83985 0.004,-0.38281 0.004,-0.75781 0.008,-1.13672 0.082,-14.625 0.13672,-29.32031 0.15234,-44.01953 0.004,-0.6875 0.004,-1.37109 0.004,-2.05078 0.004,-7.10547 0.004,-14.21094 -0.004,-21.31641 0,-0.125 0,-0.25 0,-0.3789 -0.0117,-7.33594 -0.0312,-14.66406 -0.0625,-21.98438 0,-0.66797 -0.004,-1.33593 -0.008,-2.00781 -0.0234,-6.52734 -0.0586,-13.04687 -0.0977,-19.55078 -0.008,-0.94141 -0.0117,-1.87891 -0.0195,-2.8125 -0.0469,-7.1875 -0.10156,-14.36328 -0.16406,-21.50781 l -0.16797,160.60547",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.36328,699.05469 0,-0.004 c -0.0586,-6.82031 -0.12891,-13.60547 -0.20703,-20.375 0.0781,6.76953 0.14844,13.5625 0.20703,20.37891",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.45312,616.29297 c 0.3125,-16.35547 0.21485,-33.15625 0.10938,-49.96485 0.10547,16.8086 0.20312,33.60938 -0.10938,49.96485",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 137.84375,558.20312 c 0,2.51172 0,5.01563 0,7.52735 0,23.33594 0,46.67578 0,70.01172 0.13281,-2.94532 0.24219,-5.92188 0.33594,-8.91407 0.0195,-0.58203 0.0352,-1.16796 0.0547,-1.75781 0.082,-2.89062 0.16016,-5.79297 0.21485,-8.71875 0,-0.0117 0.004,-0.0312 0.004,-0.0469 l 0.0586,-58.15625 c -0.0352,-5.75391 -0.0586,-11.5 -0.0586,-17.22266 0,-0.50391 0,-1.01172 0,-1.51562 -0.004,-5.8125 0.0234,-11.60157 0.0977,-17.33985 -0.23828,0 -0.47266,0 -0.70703,0 0,10.28906 0,20.57813 0,30.86328 0,1.75782 0,3.51563 0,5.26953",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.45312,540.92578 c 0,-0.50391 0,-1.01172 0,-1.51562 0,0.5039 0,1.01171 0,1.51562",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.45312,616.30469 c 0,-0.004 0,-0.004 0,-0.0117 0.3125,-16.35547 0.21485,-33.15625 0.10938,-49.96485 -0.0195,-2.72656 -0.0352,-5.45312 -0.0508,-8.17968 l -0.0586,58.15625",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 137.84375,635.74219 c 0.13281,-2.94532 0.24219,-5.92188 0.33594,-8.91407 -0.0937,2.99219 -0.20313,5.96875 -0.33594,8.91407",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 138.23437,625.07031 c 0.082,-2.89062 0.16016,-5.79297 0.21485,-8.71875 -0.0547,2.92578 -0.13281,5.82813 -0.21485,8.71875",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 68.804688,715.53906 c 0,-5.76953 0,-11.54297 0,-17.3125 -0.230469,0 -0.46875,0 -0.703126,0 0,10.53516 0,21.07813 0,31.61328 1.632813,-3.26953 0.246094,-9.77734 0.703126,-14.30078",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 68.101562,671.125 c 0,9.03516 0,18.06641 0,27.10156 0.234376,0 0.472657,0 0.703126,0 -0.464844,-8.78515 0.9375,-19.57031 -0.703126,-27.10156",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 68.804688,698.22656 c 0,5.76953 0,11.54297 0,17.3125 0.339843,-21.6914 2.5,-49.76562 0,-70.00781 -0.453126,3.77734 0.925781,9.51562 -0.703126,12.04297 0,4.51953 0,9.03515 0,13.55078 1.640626,7.53125 0.238282,18.31641 0.703126,27.10156",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 69.511719,610.14453 c -0.460938,-16.57031 0.929687,-39.12891 -0.707031,-51.94141 0,8.02735 0,16.0586 0,24.08985 0.0625,1.07031 0.117187,2.13281 -0.703126,2.25781 0,2.26172 0,4.51563 0,6.77734 2.105469,4.53125 -0.691406,14.28907 1.410157,18.81641",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 70.21875,639.50781 c -0.445312,-2.28515 0.898438,-6.48437 -0.707031,-7.53125 0.386719,2.74219 -2.324219,6.49219 0.707031,7.53125",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 70.21875,776.51562 c -0.05469,10.84766 0.203125,21.35938 1.40625,30.86719 0,-8.78515 0,-17.5664 0,-26.35156 -1.992188,0.125 0.585938,-4.63672 -1.40625,-4.51563",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 71.625,821.68359 c -1.636719,5.52344 -0.238281,14.30078 -0.707031,21.07813 1.640625,-5.52735 0.242187,-14.29688 0.707031,-21.07813",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end(). 
            path({d:"m 72.332031,765.97656 c 0,-3.00781 0,-6.01953 0,-9.03515 -1.640625,5.02734 -0.242187,13.29687 -0.707031,19.57421 0.234375,0 0.472656,0 0.707031,0 0,-3.51562 0,-7.02343 0,-10.53906",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 72.332031,557.44922 c 0,-4.26172 0,-8.52344 0,-12.79297 0,-7.53125 0,-15.05859 0,-22.58594 -0.234375,0 -0.472656,0 -0.707031,0 0.46875,11.54688 -0.9375,25.08594 0.707031,35.37891",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 72.332031,805.87891 c 0.359375,4.79687 0.46875,2.91796 0.703125,-1.50782 0.605469,-11.41406 0.140625,-25.01562 -0.703125,-38.39453 0,3.51563 0,7.02344 0,10.53906 0.566407,8.30469 -0.746093,19.46875 0,29.36329",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 72.332031,568.74219 c 0.460938,4.27734 -0.925781,10.52343 0.703125,13.55078 0,-4.51953 0,-9.03125 0,-13.55078 -0.234375,0 -0.46875,0 -0.703125,0",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 72.332031,544.65625 c 0,4.26953 0,8.53125 0,12.79297 0,3.76562 0,7.53125 0,11.29297 0.234375,0 0.46875,0 0.703125,0 -0.46875,-7.78125 0.9375,-17.5586 -0.703125,-24.08594",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 73.035156,568.74219 c 0,4.51953 0,9.03125 0,13.55078 0,1.0039 0,2.00781 0,3.01172 1.640625,11.79687 0.234375,26.84765 0.703125,39.89843 0,0.5 0,1.00391 0,1.50782 1.640625,-5.52735 0.238281,-14.29688 0.703125,-21.07813 0,-8.78906 0,-17.57031 0,-26.35156 -1.640625,-17.56641 -0.234375,-38.39063 -0.703125,-57.21094 -0.46875,0 -0.9375,0 -1.40625,0 0,7.52735 0,15.05469 0,22.58594 1.640625,6.52734 0.234375,16.30469 0.703125,24.08594",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.441406,653.0625 c 0.01953,11.80859 -0.25,23.3125 -1.40625,33.86719 0.46875,20.07812 -0.9375,42.16015 0.703125,60.98047 0,-8.78516 0,-17.56641 0,-26.35157 -0.722656,-23.60156 1.523438,-44.03906 1.410157,-66.99609 0,-3.26172 0,-6.52344 0,-9.78516 -1.171876,-2.03906 -1.171876,-9.2539 0,-11.29297 0,-8.02734 0,-16.05859 0,-24.08984 -0.386719,-1.09766 0.824218,-3.89062 -0.707032,-3.76172 -0.464844,6.78125 0.9375,15.55078 -0.703125,21.07813 -0.464843,5.77734 0.933594,13.53906 -0.703125,18.0664 0,3.01172 0,6.02344 0,9.03125 0,4.51953 0,9.03516 0,13.55078 2.09375,-3.02734 -0.6875,-11.26953 1.40625,-14.29687",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 73.035156,667.35937 c 0,6.52735 0,13.05079 0,19.57032 1.15625,-10.55469 1.425782,-22.0586 1.40625,-33.86719 -2.09375,3.02734 0.6875,11.26953 -1.40625,14.29687",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 73.738281,626.71094 c 0,-0.50391 0,-1.00782 0,-1.50782 -0.234375,0 -0.46875,0 -0.703125,0 0,6.52735 0,13.04688 0,19.57422 1.636719,-4.52734 0.238282,-12.28906 0.703125,-18.0664",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 73.035156,585.30469 c 0,13.30078 0,26.59765 0,39.89843 0.234375,0 0.46875,0 0.703125,0 -0.46875,-13.05078 0.9375,-28.10156 -0.703125,-39.89843",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 73.738281,721.55859 c 0.238281,0 0.472657,0 0.703125,0 -0.05078,-1.33593 -0.08984,-2.63672 -0.117187,-3.92578 -0.0078,-0.375 -0.01172,-0.75 -0.01953,-1.125 -0.01563,-0.93359 -0.02734,-1.85937 -0.03125,-2.76953 -0.0039,-0.36328 -0.0078,-0.73047 -0.0078,-1.08984 0,-1.08203 0.0078,-2.14063 0.01953,-3.1875 0.0039,-0.13282 0.0039,-0.26953 0.0039,-0.40235 0.01953,-1.25 0.04297,-2.48047 0.07813,-3.69922 0.0039,-0.0977 0.0039,-0.1914 0.01172,-0.28515 0.02734,-1.14844 0.07031,-2.27735 0.113282,-3.39453 0.0039,-0.10157 0.0078,-0.20313 0.01172,-0.30469 0.363282,-9.01563 1.046875,-17.32422 1.324219,-26.40625 0,-0.008 0,-0.0117 0,-0.0195 0.0078,-4.80078 0.01953,-9.60156 0.02344,-14.36328 0,-2.00782 0,-4.01172 0,-6.02344 -0.234374,0 -0.46875,0 -0.703124,0 0.113281,22.95703 -2.132813,43.39453 -1.410157,66.99609",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.441406,579.28125 c 0.679688,-18.46484 -0.960937,-39.53516 0.703125,-57.21094 -0.46875,0 -0.9375,0 -1.40625,0 0.46875,18.82031 -0.9375,39.64453 0.703125,57.21094",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.148438,644.77734 c 0,-3.76562 0,-7.52734 0,-11.29297 -1.171876,2.03907 -1.171876,9.25391 0,11.29297",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.441406,579.28125 c 0,8.78125 0,17.5625 0,26.35156 1.53125,-0.1289 0.320313,2.66406 0.707032,3.76172 2.257812,-29.17578 1.097656,-58.42578 0.703124,-87.32422 -0.234374,0 -0.46875,0 -0.707031,0 -1.664062,17.67578 -0.02344,38.7461 -0.703125,57.21094",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 77.964844,857.82031 c -0.417969,-18.4414 2.433594,-39.10156 0,-53.44922 0,4.51563 0,9.03125 0,13.54688 -0.929688,-0.004 -0.644532,-1.31641 -1.40625,-1.50391 1.46875,9.16406 -2.882813,19.91406 -0.707032,24.84375 0.441407,-2.28906 -0.902343,-6.48437 0.707032,-7.52734 -0.464844,5.77734 0.929687,13.53906 -0.707032,18.0664 -0.144531,-1.42578 0.476563,-7.4375 -0.703124,-5.26953 -0.222657,4.98828 0.03125,9.47266 1.054687,13.13282 l 1.613281,0 c 0.05469,-0.10938 0.08594,-0.23829 0.148438,-0.33594 0,-0.50391 0,-1.00391 0,-1.50391",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 76.558594,789.31641 c -0.464844,-4.27735 0.925781,-10.52735 -0.707032,-13.55079 0.460938,4.27344 -0.925781,10.52735 0.707032,13.55079",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 77.964844,750.16797 c -0.441406,-6.4961 1.222656,-10.73828 0.707031,-17.3125 -1.058594,-1.91797 -2.425781,16.25781 -0.707031,17.3125",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 80.078125,704.99609 c 0,-5.26562 0,-10.53515 0,-15.80468 -1.609375,5.30859 -0.261719,20.29687 -0.703125,29.35937 -2.660156,-0.11719 -2.953125,7.16797 -0.703125,9.78906 0.425781,-1.80078 -0.886719,-5.46484 0.703125,-6.02343 0.441406,15.42578 -1.207031,28.42578 0.703125,42.15234 0,-14.55078 0,-29.10547 0,-43.65625 0,-5.27344 0,-10.53906 0,-15.81641",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 77.964844,534.11719 c 0,-4.01563 0,-8.03125 0,-12.04688 -0.238282,0 -0.46875,0 -0.703125,0 0.242187,3.20313 -0.625,14.9375 0.703125,12.04688",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 77.964844,859.32422 c 0.01172,0.10156 0.01953,0.22265 0.02734,0.33594 l 0.597656,0 c -0.125,-0.70313 -0.304688,-1.34375 -0.625,-1.83985 0,0.5 0,1 0,1.50391",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 79.375,543.90234 c 0.246094,-4.61718 -0.179688,-14.13281 0,-21.83203 -0.46875,0 -0.941406,0 -1.410156,0 0,4.01563 0,8.03125 0,12.04688 1.121094,4.5625 0.792968,21.39453 1.410156,9.78515",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 85.714844,738.87891 c 0,13.54687 0,27.09765 0,40.64843 -0.421875,2.76953 0.519531,10.3125 0.703125,3.76563 0,-3.26563 0,-6.52344 0,-9.78906 0.464843,-6.27735 -0.933594,-14.54297 0.703125,-19.57422 0,-1.25 0,-2.50391 0,-3.76172 -0.964844,-12.51953 -1.324219,-29.69531 0,-42.15625 0.0078,6.01562 -0.257813,12.32031 0.703125,17.3164 0,2.75782 0,5.51954 0,8.28125 0,1.50391 0,3.00782 0,4.51563 0.550781,1.375 0.761719,-0.45313 0.707031,-1.50781 0.128906,-34.92969 2.496094,-78.26953 -0.707031,-112.91797 0,13.80078 0,27.60156 0,41.40234 0,0.75391 0,1.50781 0,2.25781 1.613281,10.00782 0.613281,23.73438 -0.703125,33.125 0,-7.52734 0,-15.05468 0,-22.58203 0,-4.26953 0,-8.53125 0,-12.80078 -1.726563,-23.91406 0.238281,-42.53125 0,-64.74219 -0.08203,-1.25 0.390625,-6.8125 -0.703125,-4.51171 0,2.2539 0,4.51171 0,6.77343 0,4.26563 0,8.52735 0,12.79688 -1.015625,-0.17188 -0.246094,-2.25 -1.410157,-2.25781 -1.316406,69 -1.359374,135.52734 -2.816406,201.75 -0.46875,-17.0625 0.9375,-36.13282 -0.707031,-51.94141 0,0.75391 0,1.5 0,2.25781 -0.460937,5.52735 0.933594,13.03906 -0.699219,17.3125 0,1 0,2.00391 0,3.01172 -0.164062,24.76953 -1.101562,49.59375 -1.152344,74.10938 l 5.871094,0 C 85.621094,819.10937 82.5,778.74219 85.714844,738.87891",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 80.078125,633.48437 c 0.316406,4.35157 -0.296875,7.71485 -0.703125,11.29297 -0.160156,1.42188 0.792969,1.66016 0.703125,3.01172 1.148437,0.3086 1.148437,-14.61719 0,-14.30469",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 81.484375,765.22656 c 0,-0.75781 0,-1.5039 0,-2.25781 0,-4.26953 0,-8.53125 0,-12.80078 -1.636719,-8.28125 -0.234375,-19.82422 -0.699219,-29.35547 -0.238281,0 -0.472656,0 -0.707031,0 0,14.55078 0,29.10547 0,43.65625 0.464844,6.78516 -0.933594,15.55469 0.707031,21.08203 0,-1.00781 0,-2.01172 0,-3.01172 0.460938,-5.52734 -0.933594,-13.03906 0.699219,-17.3125",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 80.785156,571.75391 c 0.464844,-8.28516 -0.9375,-18.5625 0.699219,-25.59375 0,-1.75391 0,-3.51172 0,-5.26954 0,-2.00781 0,-4.01562 0,-6.02343 -1.628906,-2.77344 -0.242187,-8.76953 -0.699219,-12.79688 -0.238281,0 -0.472656,0 -0.707031,0 0.46875,16.3125 -0.9375,34.62891 0.707031,49.6836",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 80.785156,782.53906 c 1.632813,-4.27344 0.238282,-11.78515 0.699219,-17.3125 -1.632813,4.27344 -0.238281,11.78516 -0.699219,17.3125",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 81.484375,682.41406 c 0.238281,0 0.472656,0 0.707031,0 0,-13.04297 0,-26.09375 0,-39.14062 0,-15.3086 0,-30.61719 0,-45.92578 -1.960937,0.34375 0.550782,-4.10157 -1.40625,-3.76172 1.335938,24.80468 0.640625,51.82422 0,76.78906 1.621094,2.52344 0.246094,8.26562 0.699219,12.03906",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 82.191406,597.34766 c 0,-7.27735 0,-14.55079 0,-21.82813 -2.0625,1.05078 0.65625,7.22656 -1.40625,8.28125 0,1 0,2.00781 0,3.01172 0,2.25391 0,4.51562 0,6.77344 1.957032,-0.33985 -0.554687,4.10547 1.40625,3.76172",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 81.484375,534.86719 c 0,-4.26172 0,-8.53125 0,-12.79688 -0.230469,0 -0.464844,0 -0.699219,0 0.457032,4.02735 -0.929687,10.02344 0.699219,12.79688",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 81.484375,704.99609 c 0,7.28125 0,14.5586 0,21.83594 0.238281,0 0.472656,0 0.707031,0 0.9375,-40.42578 1.171875,-82.94531 1.410156,-121.95312 -2.09375,8.05468 0.691407,27.83203 -1.410156,38.39453 0,13.04687 0,26.09765 0,39.14062 -0.464844,7.28516 0.9375,16.5586 -0.707031,22.58203",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 82.191406,682.41406 c -0.234375,0 -0.46875,0 -0.707031,0 0,7.53125 0,15.0586 0,22.58203 1.644531,-6.02343 0.242187,-15.29687 0.707031,-22.58203",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 82.191406,563.47656 c 0,-4.01953 0,-8.02734 0,-12.04687 -0.234375,0 -0.46875,0 -0.707031,0 0.460937,3.77734 -0.921875,9.51953 0.707031,12.04687",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 82.191406,551.42969 c -0.453125,-3.28125 0.917969,-8.51172 -0.707031,-10.53907 0,1.75782 0,3.51563 0,5.26954 0,1.75781 0,3.51171 0,5.26953 0.238281,0 0.472656,0 0.707031,0",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 83.601562,530.35156 c -0.824218,10.96875 2.15625,9.37891 0,0",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 85.007812,568.74219 c 1.589844,-2.58203 0.28125,-14.75 0.707032,-21.07813 0,-0.7539 0,-1.5039 0,-2.25781 -1.640625,6.27734 -0.238282,15.80469 -0.707032,23.33594",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 87.121094,778.77344 c 0.01172,0.1875 0.152344,7.28515 0.703125,3.01172 1.246093,-9.58594 -0.304688,-20.28125 -0.703125,-31.61719 0,1.25781 0,2.51172 0,3.76172 0.285156,8.05078 -0.375,15.80468 0,24.84375",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 87.121094,677.90234 c 0,7.52735 0,15.05469 0,22.58203 1.316406,-9.39062 2.316406,-23.11718 0.703125,-33.125 -0.453125,3.28125 0.921875,8.51172 -0.703125,10.54297",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 87.824219,667.35937 c 0,-0.75 0,-1.5039 0,-2.25781 -0.230469,0 -0.464844,0 -0.703125,0 0,4.26953 0,8.53125 0,12.80078 1.625,-2.03125 0.25,-7.26172 0.703125,-10.54297",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 88.53125,843.51562 c 0.160156,-1.27734 -0.792969,-1.86328 -0.707031,0 0,1.25391 0,2.50782 0,3.76563 0,4.12891 0,8.25 0,12.37891 l 0.835937,0 c -0.05078,-2.88282 -0.07813,-5.95313 -0.128906,-9.36719 0,-2.26172 0,-4.51953 0,-6.77735",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 89.234375,543.14844 c 0.46875,7.02734 -0.929687,16.05468 0.707031,21.83203 -0.46875,-7.03125 0.9375,-16.05078 -0.707031,-21.83203",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 90.644531,532.60937 c 0.152344,-2.60937 -0.105469,-6.23437 0,-10.53906 -0.464843,0 -0.933593,0 -1.410156,0 0.03906,3.82813 0.835937,20.39453 1.410156,10.53906",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 90.644531,850.29297 c 0.449219,-2.7461 0.859375,-4.69531 -0.703125,-6.77735 0.4375,2.04297 -0.894531,5.97266 0.703125,6.77735",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 91.351562,700.48437 c 0.777344,4.80079 -3.980468,10.16407 0,13.54688 1.144532,-2.47656 1.144532,-13.57031 0,-13.54688",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 90.644531,674.13281 c -0.464843,-12.79297 0.9375,-27.59765 -0.703125,-39.14453 0,6.52344 0,13.05078 0,19.57422 0.464844,6.27734 -0.933594,14.55078 0.703125,19.57031",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.871094,573.26172 c -1.636719,-8.78516 -0.234375,-20.82813 -0.703125,-30.86719 -0.234375,0 -0.46875,0 -0.703125,0 -3.121094,12.18359 -0.78125,28.02344 1.40625,40.65234 0,-2.00781 0,-4.01171 0,-6.02343 0,-1.25782 0,-2.50782 0,-3.76172",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 92.761719,689.94531 c 0.03125,3.625 -0.183594,7.98047 1.40625,9.78516 -0.05078,-6.52735 0.296875,-11.60547 -0.703125,-15.0586 -1.335938,-4.59765 -0.722656,3.4961 -0.703125,5.27344",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.167969,522.82031 c 0,-0.24609 0,-0.49609 0,-0.75 -0.46875,0 -0.9375,0 -1.410157,0 -0.02344,7.9336 0.265626,6.45313 1.410157,0.75",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.578125,857.0625 c 0.01172,0.87109 0.0078,1.73437 0,2.59766 l 0.617187,0 c -0.171874,-0.87891 -0.375,-1.7461 -0.617187,-2.59766",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 96.898438,626.48828 c 0.05859,0.66797 0.105468,1.33984 0.160156,2.01172 0.121094,1.60156 0.230468,3.20703 0.332031,4.82812 0.04297,0.70313 0.08984,1.41407 0.125,2.1211 0.105469,1.88281 0.191406,3.78125 0.265625,5.6875 0.01563,0.36328 0.03516,0.73047 0.05078,1.09765 0.08203,2.26954 0.140625,4.54688 0.183594,6.83985 0.01563,0.66406 0.01953,1.33203 0.03125,2 0.02344,1.6875 0.04687,3.375 0.05469,5.08203 0.0039,0.76953 0.0039,1.53906 0.0039,2.31641 0,1.75781 -0.0078,3.52343 -0.01953,5.29296 -0.0078,0.60157 -0.01172,1.19532 -0.01953,1.79688 -0.02734,2.31641 -0.0625,4.64062 -0.113281,6.97266 -0.01563,0.64843 -0.03125,1.29687 -0.05078,1.94531 -0.04297,1.74609 -0.08984,3.49609 -0.140625,5.24609 -0.03125,0.85938 -0.05469,1.71875 -0.08594,2.57422 -0.05469,1.64063 -0.113281,3.28125 -0.171875,4.92578 -0.03125,0.77735 -0.0625,1.5586 -0.09375,2.33985 -0.08984,2.28515 -0.183594,4.57812 -0.289062,6.87109 -0.03125,0.78516 -0.07031,1.56641 -0.109375,2.35156 -0.07031,1.59375 -0.144531,3.19141 -0.222657,4.78906 -0.05859,1.19532 -0.117187,2.39844 -0.175781,3.59375 -0.05859,1.11719 -0.109375,2.23047 -0.167969,3.34766 -0.296874,5.92578 -0.601562,11.84375 -0.894531,17.72266 -0.01563,0.27734 -0.02734,0.55468 -0.03906,0.82812 -0.109375,2.15235 -0.207031,4.30469 -0.308594,6.44531 -0.02344,0.51563 -0.04687,1.02735 -0.07031,1.53907 -0.109374,2.36328 -0.210937,4.71875 -0.304687,7.07031 -0.0039,0.0742 -0.0039,0.14453 -0.0078,0.21484 0.01953,0.1875 0.03125,0.37891 0.05078,0.5586 -0.02344,-0.0781 -0.03906,-0.16016 -0.0625,-0.23828 0,0.0117 0,0.0234 -0.0039,0.0351 -0.04688,1.28125 -0.09766,2.54688 -0.144532,3.82031 0.0078,0.0234 0.0078,0.0547 0.01563,0.0781 0.09375,0.39062 0.164063,0.80859 0.207031,1.25391 0.03125,0.28906 0.04297,0.59765 0.05859,0.90625 0.01172,0.22265 0.02734,0.4375 0.03125,0.66796 0.0078,0.33985 0.0078,0.6875 0,1.03907 0,0.21093 0,0.42187 -0.0078,0.63281 -0.01172,0.42578 -0.02734,0.85547 -0.04297,1.28906 -0.0078,0.0899 -0.01172,0.1836 -0.01563,0.26953 -0.03125,0.71094 -0.0625,1.42188 -0.08984,2.125 -0.0078,0.1875 -0.01563,0.375 -0.01953,0.5625 -0.01172,0.41407 -0.01563,0.8086 -0.01563,1.20703 0,0.1875 0,0.37891 0,0.5586 0.01172,0.55859 0.03516,1.09765 0.08984,1.60547 -0.160156,-0.30469 -0.277344,-0.64844 -0.378906,-1.01172 -0.05469,-0.19141 -0.113282,-0.39063 -0.15625,-0.59766 -0.04688,2.01172 -0.08984,4.00781 -0.117188,5.9961 -0.0039,0.16796 -0.0039,0.33593 -0.0078,0.5039 -0.02344,1.80469 -0.04688,3.59766 -0.05469,5.38672 0,0.31641 -0.0039,0.63281 -0.0039,0.95313 -0.0078,1.6289 -0.0039,3.25 0.0078,4.86328 0.0039,0.43359 0.0039,0.86718 0.0078,1.29687 0.01563,1.48828 0.03906,2.96875 0.06641,4.44141 0.0078,0.51953 0.02344,1.04297 0.03125,1.5625 0.03125,1.38281 0.07813,2.75781 0.125,4.125 0.01953,0.57422 0.03516,1.15234 0.05859,1.71875 0.05469,1.32031 0.117187,2.625 0.1875,3.92969 0.02734,0.59375 0.05469,1.1875 0.08984,1.77343 0.07422,1.33594 0.167969,2.65625 0.261719,3.96875 0.03516,0.53125 0.07031,1.06641 0.109375,1.58985 0.144532,1.82422 0.300782,3.6289 0.480469,5.41797 0.460937,4.61718 0.125,10.8164 0.703125,2.25781 0.414062,-22.38672 2.914062,-42.55469 2.113281,-66.2461 -1.480469,-0.54687 -0.355469,8.12891 -0.703125,11.28907 -0.460937,4.02734 0.925782,10.02343 -0.707031,12.80078 0,-3.88281 0,-11.86328 0,-21.07813 0,-6.18359 0.734375,-20.30468 0.707031,-20.32422 0.417969,0.29297 0.632813,0.72266 0.738282,1.21875 0.246093,-46.15234 0.796874,-94.35937 -2.148438,-139.73437 0,11.04297 0,22.08203 0,33.12109 0.234375,2.16016 0.433594,4.35157 0.617188,6.55469",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 98.394531,733.60937 c 0.0078,-1.77734 0.01953,-3.5625 0.02734,-5.34375 -0.421875,2.65625 -2.128906,5.83204 -0.02734,5.34375",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 98.429688,726.54687 c 0,0.57422 -0.0039,1.14454 -0.0078,1.71875 0.09766,-0.62109 0.113281,-1.20312 0.0078,-1.71875",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.660156,748.51562 c -0.01563,-0.0742 -0.04297,-0.14453 -0.0625,-0.21875 -0.113281,-0.41015 -0.246094,-0.80078 -0.429687,-1.14062 0.05469,0.51172 0.07813,1.05078 0.08984,1.60547 0.0039,0.14062 0,0.28515 0,0.42578 0.0039,0.46875 0,0.94531 -0.01562,1.43359 -0.0039,0.0352 -0.0039,0.0703 -0.0039,0.10157 -0.09375,2.92187 -0.386719,6.07421 0.09766,8.375 0,0.004 0,0.004 0,0.004 0.08594,-3.5 0.195312,-7.03125 0.324218,-10.58594",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.675781,748.59375 c -0.0078,-0.0234 -0.0078,-0.0547 -0.01563,-0.0781 0.0078,0.0234 0.0078,0.0547 0.01563,0.0781",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.964844,753.09375 c -0.01172,0.42578 -0.02734,0.85547 -0.04297,1.28906 0.01563,-0.43359 0.03125,-0.86328 0.04297,-1.28906",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.972656,751.42187 c 0.0078,0.33985 0.0078,0.6875 0,1.03907 0.0078,-0.35157 0.0078,-0.69922 0,-1.03907",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.882812,749.84766 c 0.03125,0.28906 0.04297,0.59765 0.05859,0.90625 -0.01563,-0.3086 -0.02734,-0.61719 -0.05859,-0.90625",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.90625,754.65234 c -0.03125,0.71094 -0.0625,1.42188 -0.08984,2.125 0.02734,-0.70312 0.05859,-1.41406 0.08984,-2.125",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.492188,759.69922 c -0.05469,-0.19531 -0.113282,-0.39063 -0.15625,-0.59766 0.04297,0.20703 0.101562,0.40625 0.15625,0.59766",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.796875,757.33984 c -0.01172,0.41407 -0.01563,0.8086 -0.01563,1.20703 0,-0.39843 0.0039,-0.79296 0.01563,-1.20703",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.660156,748.51562 c -0.128906,3.55469 -0.238281,7.08594 -0.324218,10.58594 0.08594,-3.5 0.195312,-7.03125 0.324218,-10.58594",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.871094,760.71094 c -0.05469,-0.50782 -0.07813,-1.04688 -0.08984,-1.60547 0.01172,0.55859 0.03516,1.09765 0.08984,1.60547",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.820312,744.33984 c -0.0039,-0.004 -0.0039,-0.008 -0.0039,-0.0117 -0.417968,-4.33203 0.375,-10.13281 0.308594,-14.34765 -0.0039,-0.0391 0,-0.082 -0.0039,-0.1211 -0.0039,-0.32031 -0.01953,-0.625 -0.04297,-0.92578 0,-0.0742 -0.0039,-0.16015 -0.0078,-0.23828 -0.01953,-0.26562 -0.04687,-0.50781 -0.07812,-0.7539 -0.01172,-0.0937 -0.01953,-0.19922 -0.03516,-0.29297 -0.03125,-0.21875 -0.07813,-0.42188 -0.121093,-0.62891 -0.01953,-0.0937 -0.03516,-0.19531 -0.05469,-0.28516 -0.05469,-0.20312 -0.121094,-0.3789 -0.1875,-0.55468 -0.02734,-0.0742 -0.04687,-0.15625 -0.07422,-0.22266 -0.101562,-0.23828 -0.21875,-0.44922 -0.351562,-0.62891 0.05469,0.75782 0.08594,1.55079 0.09375,2.35547 0.0039,0.0274 0.0039,0.0391 0.0039,0.0625 0.0078,0.76953 0,1.5625 -0.01953,2.35938 -0.0039,0.11719 -0.0039,0.23437 -0.0078,0.35156 -0.01563,0.61719 -0.03125,1.23828 -0.05078,1.86328 -0.152344,4.4961 -0.371094,9.0625 0.621094,12.33594 0,0.004 0,0.004 0,0.004 0.0039,-0.10547 0.0078,-0.21485 0.01172,-0.32032",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.820312,744.33984 0,0 c 0,0 0,0 0,-0.004 0,0.004 0,0.004 0,0.004",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.871094,744.89844 c -0.01953,-0.17969 -0.03125,-0.3711 -0.05078,-0.5586 0.01953,0.1875 0.03125,0.37891 0.05078,0.5586",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.578125,707.25781 c 0.679687,-2.97265 0.71875,-5.82812 -0.707031,-8.28125 -0.5625,2.84766 -1.3125,6.46485 0.707031,8.28125",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.871094,573.26172 c 0.46875,-9.03906 -0.933594,-20.07422 0.707031,-27.85547 0,-2.50781 0,-5.01953 0,-7.52734 -1.914063,0.53906 0.503906,-3.55079 -1.410156,-3.01172 0,2.51172 0,5.01953 0,7.52734 0.46875,10.03906 -0.933594,22.08203 0.703125,30.86719",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.167969,534.86719 c 1.914062,-0.53907 -0.503907,3.55078 1.410156,3.01172 0,-1.25391 0,-2.50782 0,-3.76172 0,-1.00782 0,-2.01172 0,-3.01172 -1.613281,-1.29297 -0.261719,-5.7461 -0.707031,-8.28516 0,-0.24609 0,-0.49609 0,-0.75 -0.234375,0 -0.46875,0 -0.703125,0 0,0.25391 0,0.50391 0,0.75 0,4.01563 0,8.03516 0,12.04688",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.871094,845.02344 c -0.824219,10.96484 2.160156,9.3789 0,0",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.578125,589.06641 c -0.234375,0 -0.46875,0 -0.707031,0 0,3.76562 0,7.53125 0,11.29296 0,6.27735 0,12.54688 0,18.82422 1.644531,-8.53515 0.238281,-20.32422 0.707031,-30.11718",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.578125,577.02344 c -0.234375,0 -0.46875,0 -0.707031,0 0,2.01172 0,4.01562 0,6.02343 0,2.00782 0,4.01563 0,6.01954 0.238281,0 0.472656,0 0.707031,0 0,-4.01172 0,-8.02735 0,-12.04297",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.871094,573.26172 c 0,1.2539 0,2.5039 0,3.76172 0.238281,0 0.472656,0 0.707031,0 0,-10.28516 0,-20.57422 0,-30.86328 0,-0.25391 0,-0.5 0,-0.75391 -1.640625,7.78125 -0.238281,18.81641 -0.707031,27.85547",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.871094,522.82031 c 0.445312,2.53906 -0.90625,6.99219 0.707031,8.28516 -0.445313,-2.53516 0.90625,-6.9961 -0.707031,-8.28516",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.578125,531.10547 c 0,1 0,2.0039 0,3.01172 2.082031,-1.79297 -0.675781,-8.75 1.40625,-10.53907 0.160156,0.58204 0.01953,1.48047 0.703125,1.50391 0,-1.00391 0,-2.00781 0,-3.01172 -0.9375,0 -1.875,0 -2.816406,0 0,0.25391 0,0.50391 0,0.75 1.613281,1.28906 0.261718,5.75 0.707031,8.28516",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.578125,546.16016 c 2.085937,-2.03516 -0.675781,-9.25391 1.40625,-11.29297 -0.05859,1.07031 -0.113281,2.13281 0.707031,2.25781 -0.0039,-4.01563 -0.0039,-8.02734 -0.0039,-12.04297 -0.683594,-0.0234 -0.542969,-0.92187 -0.703125,-1.50391 -2.082031,1.78907 0.675781,8.7461 -1.40625,10.53907 0,1.2539 0,2.50781 0,3.76172 0,2.50781 0,5.01953 0,7.52734 0,0.25391 0,0.5 0,0.75391",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 96.28125,560.46094 c 0,3.51562 0,7.02734 0,10.54297 0.238281,0 0.472656,0 0.703125,0 -0.453125,-3.28125 0.917969,-8.51172 -0.703125,-10.54297",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 98.394531,586.8125 c 0.457031,-3.28125 -0.917969,-8.51172 0.707031,-10.53906 0.441407,2.28515 -0.902343,6.48047 0.703126,7.52734 0.0078,-9.29687 -0.121094,-18.44141 -2.113282,-25.59766 -0.460937,4.52735 0.925782,11.02735 -0.707031,14.30469 0.210937,5.04688 -0.746094,11.33594 1.410156,14.30469",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 99.804688,778.02344 c 0,1.75781 0,3.51172 0,5.26953 -0.765626,-0.1836 -0.480469,-1.4961 -1.410157,-1.50781 -0.742187,12.01171 -0.835937,24.70703 -0.703125,37.64062 0.371094,5.57813 1.246094,-2.86719 1.410156,-5.26953 0.5625,-8.4375 -1.09375,-19.46094 1.410158,-25.59375 0,-1.50781 0,-3.01172 0,-4.51563 -0.43359,-1.79687 0.88281,-5.46093 -0.707032,-6.02343",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 99.101562,551.42969 c -0.457031,-3.28125 0.917968,-8.51172 -0.707031,-10.53907 0.457031,3.27735 -0.917969,8.51172 0.707031,10.53907",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 99.804688,540.13281 c 1.226562,-4.96094 0.527342,-11.97656 0.703122,-18.0625 -0.703122,0 -1.410154,0 -2.113279,0 2.027349,4.35547 -0.636719,13.73047 1.410157,18.0625",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 100.51172,692.19922 c 0.0664,-12.36328 0.0469,-24.64063 -1.410158,-35.37891 0.449219,11.81641 -0.917968,25.57422 0.703126,36.13672 0.03906,0.78906 0.902342,0.59375 0.707032,-0.75781",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 99.804688,701.23437 c 0.449222,2.78125 -0.914063,7.5 0.707032,9.03907 -0.45313,-2.78516 0.91016,-7.5 -0.707032,-9.03907",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 100.51172,618.42969 c 0.0469,-1.05469 -0.16016,-2.87891 -0.707032,-1.50391 0,6.26953 0,12.54297 0,18.81641 0.546872,0.16406 0.820312,0.6289 0.707032,1.50781 0.0391,0.45703 0.10156,0.89062 0.70312,0.75391 0.53125,-7.34766 -1.10937,-12.36719 -0.70312,-19.57422",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 100.51172,599.60937 c 0,-4.26562 0,-8.53515 0,-12.79687 -0.23828,0 -0.47266,0 -0.707032,0 0.460942,4.02344 -0.925782,10.02344 0.707032,12.79687",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 105.44141,855.5625 c -0.0586,-1.19141 0.33593,-2.875 -0.71094,-3.01172 -0.16016,2.37891 -0.33203,4.74219 -0.50781,7.10938 l 0.39843,0 c 0.0117,-1.64844 0.1875,-3.1211 0.82032,-4.09766",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 100.51172,712.52734 c 0.41016,5.09375 -0.859376,15.95703 0.70312,17.3125 -0.59375,-6.62109 2.07032,-12.58593 -0.70312,-17.3125",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 101.91797,844.26562 c 0.45312,3.53125 -0.92188,9.01563 0.70703,11.29688 -0.46094,-3.52734 0.91797,-9.01563 -0.70703,-11.29688",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 101.91797,832.97656 c -0.86719,10.0625 2.15625,8.35938 0,0",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 101.91797,733.60937 c 0.46094,5.27344 -0.93359,12.53516 0.70703,16.5586 -0.46484,-5.27735 0.92578,-12.53516 -0.70703,-16.5586",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 105.44141,843.51562 c 0.45312,-3.52734 -0.92188,-9.01562 0.70312,-11.29296 0,-0.75391 0,-1.50391 0,-2.25782 0.46094,-4.52734 -0.92969,-11.02734 0.70313,-14.30078 0,-3.01172 0,-6.02344 0,-9.03515 0.45703,-4.02735 -0.92188,-10.02344 0.70703,-12.79688 0,-1.75781 0,-3.51562 0,-5.26953 0,-3.01172 0,-6.02344 0,-9.03516 0,-2.00781 0,-4.01562 0,-6.02343 -2.35156,24.90234 -2.61719,48.59375 -2.82422,73.02343 0.96094,-0.23437 0.58984,-1.88672 0.71094,-3.01172",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 105.44141,855.5625 c -0.63282,0.97656 -0.8086,2.44922 -0.82032,4.09766 l 0.78907,0 c -0.0703,-1.45313 -0.11719,-2.88282 0.0312,-4.09766",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 105.4375,533.35937 c 0,-3.76171 0,-7.52734 0,-11.28906 -0.23437,0 -0.46875,0 -0.70703,0 0.23047,2.9961 -0.58984,14.37891 0.70703,11.28906",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 105.44141,843.51562 c 0.23437,0 0.46875,0 0.70312,0 0,-0.5 0,-1.0039 0,-1.50781 0,-3.25781 0,-6.52344 0,-9.78515 -1.625,2.27734 -0.25,7.76562 -0.70312,11.29296",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 106.84766,854.05078 c -0.45703,-3.77344 0.92578,-9.51172 -0.70313,-12.04297 0,0.50391 0,1.00781 0,1.50781 0.33985,2.92579 -0.75781,11.31641 0.70313,10.53516",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 106.14453,829.96484 c 1.63281,-3.26953 0.24219,-9.77343 0.70313,-14.30078 -1.63282,3.27344 -0.24219,9.77344 -0.70313,14.30078",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 106.76953,859.66016 0.78516,0 c 0,-1.11329 0,-2.23438 0,-3.34766 -0.53516,0.82812 -0.72656,2.01562 -0.78516,3.34766",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 106.84766,806.62891 c 0.23828,0 0.47265,0 0.70703,0 0,-4.26563 0,-8.53125 0,-12.79688 -1.62891,2.77344 -0.25,8.76953 -0.70703,12.79688",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 107.55469,543.90234 c 0,-7.27734 0,-14.55468 0,-21.83203 -0.23438,0 -0.47266,0 -0.71094,0 0,7.27735 0,14.55469 0.004,21.83203 0.23828,0 0.47265,0 0.70703,0",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 108.25781,779.52734 c -0.23437,0 -0.46875,0 -0.70312,0 0,3.01172 0,6.02344 0,9.03516 1.61719,-1.53516 0.2539,-6.25 0.70312,-9.03516",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 108.25781,686.92969 c 0,-0.75 0,-1.5 0,-2.25782 0.70703,-11.10937 -2.17968,-2.74609 0,2.25782",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 108.25781,612.40625 c 0,-5.76953 0,-11.54297 0,-17.31641 0,-1.2539 0,-2.50781 0,-3.76172 0,-4.01171 0,-8.03125 0,-12.04687 0,-1.00391 0,-2.00391 0,-3.00781 -0.23437,0 -0.46875,0 -0.70312,0 0.46484,11.79687 -0.94141,25.58984 0.70312,36.13281",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 108.25781,576.27344 c -0.46484,-5.78125 0.92969,-13.54297 -0.70312,-18.07032 0,6.02344 0,12.04297 0,18.07032 0.23437,0 0.46875,0 0.70312,0",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 107.55469,558.20312 c 1.63281,4.52735 0.23828,12.28907 0.70312,18.07032 0,1.0039 0,2.0039 0,3.00781 1.17188,2.28516 1.17188,9.76172 0,12.04687 0,1.25391 0,2.50782 0,3.76172 2.04688,0.57422 -0.64062,6.20313 1.41016,6.77735 0.46484,-10.28907 -0.9375,-22.58203 0.70312,-31.6211 0,-1 0,-2.00781 0,-3.00781 0,-2.50781 0,-5.01953 0,-7.53125 -1.86718,-11.05078 0.35938,-26.47656 -1.41015,-37.63672 -0.46875,0 -0.94141,0 -1.40625,0 0,7.27735 0,14.55469 0,21.83203 0,4.76563 0,9.53516 0,14.30078",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 108.25781,766.73047 c 0,2.51172 0,5.01953 0,7.53125 1.16797,-0.81641 1.16797,-6.72266 0,-7.53125",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 108.96094,705.75391 c -0.23438,0 -0.46875,0 -0.70313,0 0,17.0664 0,34.125 0,51.1875 1.64453,-15.55469 0.23438,-34.375 0.70313,-51.1875",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 108.96094,703.49609 c 0,-6.27343 0,-12.54687 0,-18.82422 -0.23438,0 -0.46875,0 -0.70313,0 0,0.75782 0,1.50782 0,2.25782 0,6.27734 0,12.55078 0,18.82422 0.23438,0 0.46875,0 0.70313,0 0,-0.75782 0,-1.50782 0,-2.25782",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 110.37109,701.99219 c 0.46875,-8.53907 -0.9375,-19.06641 0.70313,-26.35157 0,-14.55859 0,-29.10937 0,-43.66406 -1.625,-2.02734 -0.25,-7.25781 -0.70313,-10.53515 -2.08593,1.78906 0.67188,8.74609 -1.41015,10.53515 -0.40625,-1.32031 0.85156,-4.42187 -0.70313,-4.51562 -0.48437,8.30078 1.1875,14.28515 0.70313,22.58203 0,11.54297 0,23.08594 0,34.6289 0,6.27735 0,12.55079 0,18.82422 0.76562,-0.18359 0.48047,-1.5 1.41015,-1.5039",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 108.25781,627.46094 c 1.55469,0.0937 0.29688,3.19531 0.70313,4.51562 2.08203,-1.78906 -0.67578,-8.74609 1.41015,-10.53515 0,-17.06641 0,-34.125 0,-51.19532 -1.64062,9.03907 -0.23828,21.33203 -0.70312,31.6211 -2.05078,-0.57422 0.63672,-6.20313 -1.41016,-6.77735 0,5.77344 0,11.54688 0,17.31641 0,5.01953 0,10.03906 0,15.05469",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 108.25781,579.28125 c 0,4.01562 0,8.03516 0,12.04687 1.17188,-2.28515 1.17188,-9.76171 0,-12.04687",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 110.37109,559.70703 c 0,-2.00391 0,-4.01172 0,-6.01562 0,-2.26172 0,-4.51954 0,-6.78125 0,-4.26172 0,-8.53125 0,-12.79297 0,-4.01563 0,-8.03125 0,-12.04688 -0.46875,0 -0.9375,0 -1.41015,0 1.76953,11.16016 -0.45703,26.58594 1.41015,37.63672",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 109.66797,813.40234 c 1.61719,-1.78125 0.25,-6.75781 0.70312,-9.78515 -1.61718,1.78125 -0.25,6.75781 -0.70312,9.78515",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 110.37109,859.66016 0.31641,0 c -0.0898,-0.62891 -0.19141,-1.2461 -0.31641,-1.83985 0,0.61328 0,1.22656 0,1.83985",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 110.37109,748.66406 c 0.23438,0 0.46875,0 0.70313,0 0,-10.79297 0,-21.58203 0,-32.37109 -0.23438,0 -0.46875,0 -0.70313,0 0,10.78906 0,21.57812 0,32.37109",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 111.07422,675.64062 c -1.64063,7.28516 -0.23438,17.8125 -0.70313,26.35157 0,4.76562 0,9.53515 0,14.30078 0.23438,0 0.46875,0 0.70313,0 0,-4.26563 0,-8.53125 0,-12.79688 0,-6.52734 0,-13.05078 0,-19.57031 0,-2.76562 0,-5.52734 0,-8.28516",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 110.37109,553.69141 c 0,2.0039 0,4.01171 0,6.01562 0,2.51172 0,5.02344 0,7.53125 1.16797,-2.78125 1.16797,-10.76953 0,-13.54687",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 113.1875,522.07031 c -0.9375,0 -1.87891,0 -2.81641,0 0,4.01563 0,8.03125 0,12.04688 2.12891,0.0273 2.94922,-7.21094 2.81641,-12.04688",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 111.77734,628.21875 c 0.81641,2.42969 0.80079,-2.02344 0.70704,-3.01563 3.45703,-7.11718 1.93359,-18.01953 -1.41016,-24.08984 0,3.26172 0,6.52734 0,9.78906 1.63672,4.27344 0.24219,11.78516 0.70312,17.31641",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 114.59766,848.78516 c 0,3.6289 0,7.25 0,10.875 l 0.73828,0 c -0.008,-1.15625 -0.0156,-2.28125 -0.0352,-3.34766 -0.0391,-2.72266 0.67969,-8.72266 -0.70312,-7.52734",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 115.30078,784.04687 c 0,4.76563 0,9.53125 0,14.30079 0.35938,14.51953 1.65625,-12.56641 0,-14.30079",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 116.00781,760.71094 c -1.63281,2.77343 -0.24609,8.76562 -0.70703,12.79297 1.63281,-2.77344 0.2461,-8.76954 0.70703,-12.79297",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 116.71094,856.3125 c -0.44141,-2.28516 0.90234,-6.48438 -0.70313,-7.52734 0.4375,2.28906 -0.90234,6.48437 0.70313,7.52734",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 116.71094,560.46094 c 0,-12.79688 0,-25.59375 0,-38.39063 -0.23438,0 -0.47266,0 -0.70313,0 0.46485,12.54688 -0.9375,27.09766 0.70313,38.39063",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 116.71094,744.14453 c 0.23047,0 0.46875,0 0.70312,0 -0.9375,-9.03906 1.59375,-18.36719 0,-25.59375 -0.63281,8.10547 -0.89453,16.61328 -0.70312,25.59375",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 117.41406,649.29687 c 0,-2.76562 0,-5.52343 0,-8.28515 -0.23437,0 -0.47265,0 -0.70312,0 0,11.29297 0,22.58203 0,33.875 0,0.2539 0,0.5039 0,0.7539 1.1914,-4.74609 1.46094,-10.48046 1.40625,-16.55859 -1.61719,-1.78516 -0.25,-6.75781 -0.70313,-9.78516",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 117.41406,641.01172 c -0.46484,-8.03516 0.9375,-18.0625 -0.70312,-24.83985 0,1.75782 0,3.51172 0,5.26954 0,6.52343 0,13.04296 0,19.57031 0.23047,0 0.46875,0 0.70312,0",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 117.41406,641.01172 c 0,2.76172 0,5.51953 0,8.28515 0.23438,0 0.47266,0 0.70313,0 0,-12.80078 0,-25.59765 0,-38.39453 0,-0.5039 0,-1.0039 0,-1.50781 -0.95313,-0.23437 -0.58203,-1.88281 -0.70313,-3.01172 0,-5.26953 0,-10.53515 0,-15.80859 0.49219,-4.86328 -0.70312,-14.51172 -0.70312,-4.51563 0,10.03907 0,20.07422 0,30.11328 1.64062,6.77735 0.23828,16.80469 0.70312,24.83985",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 117.41406,649.29687 c 0.45313,3.02735 -0.91406,8 0.70313,9.78516 0,-2.26172 0,-4.51953 0,-6.77734 0,-1.00391 0,-2.00391 0,-3.00782 -0.23047,0 -0.46875,0 -0.70313,0",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 118.11719,652.30469 c 1.64453,-9.78907 0.23828,-22.83594 0.70703,-33.875 0,-2.51172 0,-5.01953 0,-7.52735 -0.23438,0 -0.47266,0 -0.70703,0 0,12.79688 0,25.59375 0,38.39453 0,1.00391 0,2.00391 0,3.00782",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 118.82422,574.01562 c -1.62891,2.27735 -0.24609,7.76172 -0.70703,11.28907 1.6289,-2.27735 0.25,-7.76172 0.70703,-11.28907",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 127.98047,840.50391 c 0,-0.5 0,-1.00391 0,-1.50782 0,-3.00781 0,-6.01953 0,-9.03125 -1.15234,2.08203 -0.59375,15.38672 -2.11328,6.02344 -2.09375,3.27734 0.6875,11.77344 -1.40625,15.05469 0,1.75781 0,3.51172 0,5.26953 0.0312,1.13281 0.0352,2.23828 0.043,3.34766 l 1.64843,0 c 0.51954,-6.48438 1.17188,-12.82032 1.82813,-19.15625",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 120.9375,543.90234 c 1.63672,-5.77734 0.23828,-14.80468 0.70313,-21.83203 -0.46875,0 -0.9375,0 -1.41016,0 -0.54297,8.10938 1.07422,13.91016 0.70703,21.83203",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 120.9375,603.375 c 0.46094,3.77734 -0.92578,9.51953 0.70313,12.04297 -0.45704,-3.77735 0.92578,-9.51953 -0.70313,-12.04297",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.09375,854.05078 c -0.37109,-13.69141 0.87109,-25.66797 2.11719,-37.63672 0,-0.75 0,-1.5039 0,-2.25781 0.0742,-24.66797 -0.008,-49.17578 -1.41016,-72.26953 0,2.25781 0,4.51953 0,6.77734 -0.0195,26.08594 1.30078,50.46485 0,76.03125 -1.81641,-3.82812 -0.62109,-0.43359 -2.11328,1.50391 0,0.25781 0,0.50781 0,0.7539 -0.45703,3.77735 0.91797,9.51954 -0.70703,12.04297 0,0.50391 0,1.00782 0,1.50782 0.61719,6.5 0.25781,12.82421 -0.375,19.15625 l 1.70703,0 c 0.0742,-1.81641 0.28516,-3.48047 0.78125,-4.85157 0,-0.2539 0,-0.5039 0,-0.75781",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 123.75781,784.79687 c -2.34375,8.125 -0.0117,17.05469 -1.41015,26.35157 0,7.77343 0,15.55859 0,23.33203 1.4375,1.0039 0.3789,-7.08985 0.70312,-9.78516 -0.90625,-12.76172 2.11719,-21.32422 2.11328,-33.12109 -2.85547,0.28906 -0.77343,-4.69141 -1.40625,-6.77735",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 123.75781,819.42578 c 0.46875,12.04688 -0.9414,26.09766 0.70313,36.88672 0,-1.75781 0,-3.51172 0,-5.26953 -0.95313,-11.3086 2.3789,-22.58203 -0.70313,-31.61719",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 124.46094,762.21094 c -1.63281,3.02734 -0.2461,9.27734 -0.70313,13.55468 1.62891,-3.02343 0.2461,-9.27734 0.70313,-13.55468",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 124.46094,706.50781 c -1.17188,7.78125 -1.17188,20.82031 0,28.60547 1.85156,-9.11719 -0.28906,-18.82812 0,-28.60547",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 123.75781,561.96875 c 0,2.00781 0,4.01562 0,6.01953 0,0.25 0,0.50391 0,0.75391 2.91797,-12.7461 2.41407,-32.97266 2.10938,-46.67188 -0.23047,0 -0.47266,0 -0.70313,0 0,3.26563 0,6.52344 0,9.78906 -0.0508,10.48438 0.41797,21.52344 -1.40625,30.10938",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 125.16406,531.85937 c -0.76562,-0.1875 -0.47656,-1.5 -1.40625,-1.50781 0,8.02735 0,16.0625 0,24.08985 0,2.50781 0,5.01562 0,7.52734 1.82422,-8.58594 1.35547,-19.625 1.40625,-30.10938",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 127.98047,840.50391 c -0.65625,6.33593 -1.30859,12.67187 -1.82813,19.15625 l 1.45313,0 c 0.63281,-6.33204 0.99219,-12.65625 0.375,-19.15625",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 125.86719,629.71875 c -1.60547,1.04687 -0.26172,5.24219 -0.70313,7.53125 0,0.25 0,0.49609 0,0.75391 1.60938,-1.28907 0.25782,-5.75 0.70313,-8.28516",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 128.6875,731.34766 c 0,-2.76172 0,-5.52344 0,-8.27735 0,-18.07422 0,-36.14062 0,-54.20312 -2.01562,0.375 0.625,12.19922 -1.41016,15.05859 -0.50781,-23.13281 0.77344,-44.34375 0.70313,-67 -0.004,-1.10937 0.26562,-6.16406 -0.70313,-3.76562 0,1.7539 0,3.51171 0,5.26953 0,3.51172 0,7.02734 0,10.53906 0.0586,1.07031 0.11719,2.13281 -0.70312,2.25781 0,4.01172 0,8.03125 0,12.04688 -1.30078,32.03515 0.70703,58.82812 2.11328,88.07422",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 125.86719,574.01562 c 0.0312,1.92188 -0.0352,4.02735 0,6.01954 0.21094,11.32031 1.67187,-1.04297 0,-6.01954",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 127.98047,736.61719 c -0.17578,-3.00391 -0.72656,-9.67188 -1.40625,-7.52735 0,4.01172 0,8.02735 0,12.04688 0.43359,6.82031 -0.88672,19.5039 0.70312,22.58594 -0.39062,-9.53907 1.23047,-18.22657 0.70313,-27.10547",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 127.98047,605.63281 c -0.45313,-3.28125 0.91797,-8.51172 -0.70313,-10.54297 0.45313,3.28125 -0.92187,8.51172 0.70313,10.54297",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 127.98047,829.96484 c 0,3.01172 0,6.02344 0,9.03125 1.625,-2.52343 0.25,-8.26562 0.70703,-12.04297 -0.23438,0 -0.46875,0 -0.70703,0 0,1.00391 0,2.00782 0,3.01172",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 129.39062,801.35937 c -1.33593,7.60547 -1.49218,16.47266 -1.41015,25.59375 0.23828,0 0.47265,0 0.70703,0 0,-0.24609 0,-0.49609 0,-0.7539 -0.38281,-8.94141 1.23828,-15.73047 0.70312,-24.83985",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 128.6875,751.67578 c -1.63672,4.77734 -0.24219,12.78906 -0.70703,18.82031 1.63672,-4.77734 0.24219,-12.79297 0.70703,-18.82031",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 127.98047,532.60937 c 0.46484,5.52344 -0.92969,13.03907 0.70703,17.3125 0,-5.76953 0,-11.54296 0,-17.3125 -0.23438,0 -0.46875,0 -0.70703,0",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 128.6875,532.60937 c 0,-3.51171 0,-7.02343 0,-10.53906 -0.23438,0 -0.46875,0 -0.70703,0 0,3.51563 0,7.02735 0,10.53906 0.23828,0 0.47265,0 0.70703,0",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.09375,759.20312 c -0.46094,6.52735 0.93359,15.04688 -0.70313,20.32422 1.26172,6.23047 -0.72265,13.84766 0,21.83203 0.53516,9.10938 -1.08593,15.89844 -0.70312,24.83985 1.49219,-1.9375 0.29687,-5.33203 2.11328,-1.50391 1.30078,-25.5664 -0.0195,-49.94531 0,-76.03125 -0.23437,0 -0.47266,0 -0.70703,0 0,3.51172 0,7.02344 0,10.53906",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 128.6875,747.91016 c 1.52734,0.1289 0.32031,-2.66797 0.70312,-3.76563 0,-7.02734 0,-14.05078 0,-21.07422 -0.23437,0 -0.46875,0 -0.70312,0 0,2.75391 0,5.51563 0,8.27735 0,5.51953 0,11.04296 0,16.5625",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 128.6875,580.03516 c 0.45312,3.02734 -0.91797,8.00781 0.70312,9.78515 0,-3.26172 0,-6.52344 0,-9.78515 -0.23437,0 -0.46875,0 -0.70312,0",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 128.6875,567.23828 c 0,4.26563 0,8.52734 0,12.79688 0.23437,0 0.46875,0 0.70312,0 -0.46093,-4.02344 0.92579,-10.02344 -0.70312,-12.79688",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 128.6875,549.92187 c 0,1.25782 0,2.51172 0,3.76954 -0.39453,4.55078 0.63672,9.47265 0,12.03906 0,0.5 0,1.00781 0,1.50781 1.62891,2.77344 0.24219,8.77344 0.70312,12.79688 0,3.26171 0,6.52343 0,9.78515 1.64063,-21.07812 0.23829,-45.41406 0.70313,-67.75 -0.46484,0 -0.9375,0 -1.40625,0 0,3.51563 0,7.02735 0,10.53906 0,5.76954 0,11.54297 0,17.3125",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.09375,854.80859 c -0.49609,1.3711 -0.70703,3.03516 -0.78125,4.85157 l 0.78125,0 c 0,-1.61719 0,-3.23438 0,-4.85157",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.09375,759.20312 c -1.63672,5.27344 -0.23828,13.79297 -0.70313,20.32422 1.63672,-5.27734 0.24219,-13.79687 0.70313,-20.32422",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.09375,744.14453 c 0,-3.76172 0,-7.52734 0,-11.28906 -0.46484,-11.04297 0.9375,-24.08594 -0.70313,-33.87891 0,8.03125 0,16.0586 0,24.09375 0,7.02344 0,14.04688 0,21.07422 0.23829,0 0.46875,0 0.70313,0",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,656.82031 c 0,-9.53125 0,-19.07422 0,-28.60156 -1.99219,-0.125 0.58203,4.63672 -1.41016,4.51172 0,1.7539 0,3.51172 0,5.27344 0,0.49609 0,1 0,1.5039 2.10157,4.02735 -0.6914,13.28125 1.41016,17.3125",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,595.08984 c -1.16406,-0.0117 -0.39844,-2.08593 -1.41016,-2.25781 0,4.26953 0,8.53125 0,12.80078 0.57032,-0.14453 0.70313,-0.75781 1.41016,-0.7539 0,-3.26172 0,-6.52344 0,-9.78907",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 129.39062,589.82031 c 0,1.00391 0,2.01172 0,3.01172 1.01172,0.17188 0.2461,2.24609 1.41016,2.25781 0,-24.33984 0,-48.67578 -0.004,-73.01953 -0.23046,0 -0.46875,0 -0.70312,0 -0.46484,22.33594 0.9375,46.67188 -0.70313,67.75",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.09375,854.80859 c 0,1.61719 0,3.23438 0,4.85157 l 0.70703,0 c 0,-1.8711 0,-3.73829 0,-5.60938 -0.23437,0 -0.47266,0 -0.70703,0 0,0.25391 0,0.50391 0,0.75781",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 132.21094,816.41406 c -1.2461,11.96875 -2.48828,23.94531 -2.11719,37.63672 0.23437,0 0.47266,0 0.70703,0 0,-0.99609 0,-2.00391 0,-3.00781 -0.23828,-12.29688 2.19531,-21.74219 1.41016,-34.62891",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,748.66406 c 0,-2.25781 0,-4.51953 0,-6.77734 0,-3.00781 0,-6.02344 0,-9.03125 -0.23437,0 -0.47266,0 -0.70703,0 0,3.76172 0,7.52734 0,11.28906 0,1.50781 0,3.01172 0,4.51953 0.23437,0 0.47266,0 0.70703,0",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,684.67187 c 0,-1.7539 0,-3.51171 0,-5.26562 0,-3.01172 0,-6.02344 0,-9.03125 -1.17187,3.02734 -1.17187,11.26953 0,14.29687",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,851.04297 c 2.09375,-10.8086 2.21484,-23.72656 2.11328,-36.88672 -0.23828,0 -0.47265,0 -0.70312,0 0,0.75391 0,1.50781 0,2.25781 0.78515,12.88672 -1.64844,22.33203 -1.41016,34.62891",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,732.85547 c 0,3.00781 0,6.02344 0,9.03125 1.40234,23.09375 1.48438,47.60156 1.41016,72.26953 0.23047,0 0.46484,0 0.70312,0 0,-3.26172 0,-6.52344 0,-9.78516 0.46485,-7.53125 -0.9375,-17.05859 0.70313,-23.33984 0,-2.75781 0,-5.51953 0,-8.27734 0.45703,-4.02735 -0.92578,-10.02344 0.70312,-12.79688 0,-0.25391 0,-0.50391 0,-0.75391 0,-2.76171 0,-5.52343 0,-8.28125 -1.99219,-0.125 0.58594,4.64063 -1.40625,4.51563 -1.27734,-23.69531 0.47266,-47.38281 -2.11328,-68.50781 -0.35547,17.20312 0.69531,32.08984 0,45.92578",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,679.40625 c 0,1.75391 0,3.51172 0,5.26562 0,0.50391 0,1.00782 0,1.50782 0,0.25 0,0.5039 0,0.75 2.58594,21.125 0.83594,44.8125 2.11328,68.50781 1.99219,0.125 -0.58594,-4.64063 1.40625,-4.51563 0,-3.01171 0,-6.02343 0,-9.03515 0.46875,-11.79297 -0.93359,-25.59375 0.70313,-36.13281 0,-2.51172 0,-5.01563 0,-7.52735 0.42187,-5.73828 -1.66797,-10.15234 0,-15.05859 0,-8.53125 0,-17.0625 0,-25.59375 0,-4.01563 0,-8.02735 0,-12.04297 0,-4.51953 0,-9.03516 0,-13.55469 0,-4.01172 0,-8.02734 0,-12.04297 -1.63672,-10.79297 -0.23438,-24.83984 -0.70313,-36.88672 0,-2.51171 0,-5.01562 0,-7.52734 -1.43359,2.51172 -1.51953,0.60156 -1.40625,-2.25781 -1.9414,-1.03906 0.57031,9.12109 -1.41015,10.53906 0,2.00781 0,4.01563 0,6.01953 1.35156,28.55078 -0.0664,60.65625 -0.70313,89.58594",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,656.82031 c 0,4.51953 0,9.03516 0,13.55469 0,3.00781 0,6.01953 0,9.03125 0.63672,-28.92969 2.05469,-61.03516 0.70313,-89.58594 -0.46094,4.77735 0.92968,11.53125 -0.70313,15.0586 0,7.77734 0,15.55468 0,23.33984 0,9.52734 0,19.07031 0,28.60156",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 132.21094,555.94922 c -0.0625,-1.19531 0.33593,-2.8711 -0.70703,-3.01563 0,10.28516 0,20.57813 0,30.86719 1.98046,-1.41797 -0.53125,-11.57812 1.41015,-10.53906 -0.11328,2.85937 -0.0273,4.76953 1.40625,2.25781 0,-1.75781 0,-3.51562 0,-5.27344 -0.27734,-6.72265 -1.07812,-12.89843 -0.70312,-20.32422 0,-9.28515 0,-18.5664 0,-27.85156 -0.23438,0 -0.46875,0 -0.70313,0 -0.46875,11.04297 0.9375,24.08985 -0.70312,33.87891",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 133.61719,803.61719 c 0,-5.01953 0,-10.03907 0,-15.05469 0,-2.50781 0,-5.02344 0,-7.53125 -1.64063,6.28125 -0.23828,15.80859 -0.70313,23.33984 0.59766,0.13672 0.66016,-0.29687 0.70313,-0.7539",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 133.61719,846.52734 c 0,2.76172 0,5.51953 0,8.28125 0.23437,0 0.46875,0 0.70312,0 0.87891,-11.86328 0.69531,-24.85547 2.82031,-35.38281 0,-3.51172 0,-7.02734 0,-10.53906 -1.75781,11.92969 -2.38671,25.05469 -3.52343,37.64062",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 133.61719,826.19922 c 0.71875,9.14844 0.84765,-6.42188 0.70312,-9.78516 3,-6.57812 1.54688,-17.92578 3.52344,-25.59375 0,-10.53906 0,-21.07812 0,-31.61719 -0.46875,0 -0.94141,0 -1.41016,0 -0.24609,23.07032 -2.51953,43.98047 -2.8164,66.9961",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 133.61719,788.5625 c 0,5.01562 0,10.03516 0,15.05469 1.17187,-3.27735 1.17187,-11.77344 0,-15.05469",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 134.32031,759.95703 c -1.6289,2.77344 -0.24609,8.76953 -0.70312,12.79688 1.6289,-2.77735 0.24609,-8.77344 0.70312,-12.79688",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.02344,741.88672 c -0.23438,0 -0.46485,0 -0.70313,0 0,3.01172 0,6.02344 0,9.03515 0,2.75782 0,5.51954 0,8.28125 1.64063,-4.27343 0.24219,-11.78906 0.70313,-17.3164",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.02344,705.75391 c -1.63672,10.53906 -0.23438,24.33984 -0.70313,36.13281 0.23828,0 0.46875,0 0.70313,0 0,-12.04688 0,-24.08985 0,-36.13281",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.02344,619.93359 c 0,-11.54297 0,-23.08984 0,-34.6289 0,-0.75391 0,-1.50391 0,-2.25782 -0.23438,0 -0.46485,0 -0.70313,0 0.46875,12.04688 -0.93359,26.09375 0.70313,36.88672",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.02344,583.04687 c 0,-4.26953 0,-8.53125 0,-12.80078 -0.23438,0 -0.46485,0 -0.70313,0 0,1.75782 0,3.51563 0,5.27344 0,2.51172 0,5.01563 0,7.52734 0.23828,0 0.46875,0 0.70313,0",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.02344,562.71875 c -0.45313,-3.52734 0.92187,-9.01172 -0.70313,-11.28906 0.46094,3.52734 -0.91797,9.01172 0.70313,11.28906",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 134.32031,529.59766 c 0,6.77734 0,13.55078 0,20.32421 0,0.50391 0,1.00782 0,1.50782 1.625,2.27734 0.25,7.76172 0.70313,11.28906 0,2.51172 0,5.02344 0,7.52734 0,4.26953 0,8.53125 0,12.80078 0,0.75391 0,1.50391 0,2.25782 2.0625,-0.81641 -0.64453,-6.71485 1.41015,-7.53125 -0.42968,19.59765 -0.14062,30.99218 0.70703,48.1875 0,6.01562 0,12.04297 0,18.0625 0.23438,0 0.46875,0 0.70313,0 0,-2.75782 0,-5.52344 0,-8.28125 0,-23.33594 0,-46.67578 0,-70.01172 -1.16797,-0.8125 -1.16797,-6.71094 0,-7.52735 0,-1.7539 0,-3.51171 0,-5.26953 -1.24219,-9.46484 -0.71875,-20.8125 -1.41016,-30.86328 -0.46875,0 -0.9375,0 -1.41015,0 -0.44141,2.28516 0.90625,6.48047 -0.70313,7.52735",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.02344,522.07031 c -0.23438,0 -0.46485,0 -0.70313,0 0,2.51172 0,5.01953 0,7.52735 1.60938,-1.04688 0.26172,-5.24219 0.70313,-7.52735",style:"fill:#4c1714;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.73047,679.40625 c -0.46485,-7.03516 0.93359,-16.05469 -0.70703,-21.83203 0,8.53125 0,17.0625 0,25.59375 0.23828,0 0.47265,0 0.70703,0 0,-1.25 0,-2.51172 0,-3.76172",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.73047,679.40625 c 2.01562,0.10156 -0.60938,5.16406 1.41015,5.26562 0,-13.04687 0,-26.09375 0,-39.14062 -1.0039,0.29297 -1.1875,0.89844 -2.11718,0 0,4.01562 0,8.02734 0,12.04297 1.64062,5.77734 0.24218,14.79687 0.70703,21.83203",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.73047,634.98828 c -0.11719,-1.125 0.2539,-2.77734 -0.70703,-3.01172 0,4.51953 0,9.03516 0,13.55469 0.92968,0.89844 1.11328,0.29297 2.11718,0 0,-0.50391 0,-1.00781 0,-1.50781 0,-6.01953 0,-12.04688 0,-18.0625 -2.07421,1.29297 0.66407,7.73047 -1.41015,9.02734",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.02344,631.97656 c 0.96093,0.23438 0.58984,1.88672 0.70703,3.01172 2.07422,-1.29687 -0.66406,-7.73437 1.41015,-9.02734 -0.84765,-17.19532 -1.13671,-28.58985 -0.70703,-48.1875 -2.05468,0.8164 0.65235,6.71484 -1.41015,7.53125 0,11.53906 0,23.08593 0,34.6289 0,4.01563 0,8.03125 0,12.04297",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 136.43359,757.69922 c 0,0.5 0,1 0,1.5039 0.46875,0 0.94141,0 1.41016,0 0,-2.50781 0,-5.01953 0,-7.52734 -2.03516,0.33594 0.625,5.68359 -1.41016,6.02344",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 137.14062,699.73047 c -1.64453,17.8164 -0.23828,38.89453 -0.70703,57.96875 2.03516,-0.33985 -0.625,-5.6875 1.41016,-6.02344 0,-7.02734 0,-14.05469 0,-21.07812 -1.64063,-8.78516 -0.23438,-20.82422 -0.70313,-30.86719",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.148438,609.39453 c 0,8.03125 0,16.0625 0,24.08984 0,3.76563 0,7.52735 0,11.29297 0,3.26172 0,6.52344 0,9.78516 0.234374,0 0.46875,0 0.703124,0 -0.01562,-13.06641 -0.238281,-26.35156 1.410157,-37.63672 0.226562,1.8125 -0.601563,8.60547 0.703125,6.77344 0.414062,-11.99219 -1.53125,-29.95703 1.410156,-41.40625 1.996094,-0.1211 -0.585938,4.64062 1.410156,4.51953 0,-1.00391 0,-2.01172 0,-3.01172 0,-4.01562 0,-8.03516 0,-12.04687 -1.644531,-15.05469 -0.238281,-33.3711 -0.707031,-49.6836 -0.234375,0 -0.46875,0 -0.703125,0 -0.179688,7.69922 0.246094,17.21485 0,21.83203 -0.617188,11.60938 -0.289062,-5.22265 -1.410156,-9.78515 -1.328125,2.89062 -0.460938,-8.84375 -0.703125,-12.04688 -0.46875,0 -0.941407,0 -1.410157,0 0.394532,28.89844 1.554688,58.14844 -0.703124,87.32422",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 83.601562,530.35156 c 2.15625,9.37891 -0.824218,10.96875 0,0 z m 5.632813,12.79688 c 1.644531,5.78125 0.238281,14.80078 0.707031,21.83203 -1.636718,-5.77735 -0.238281,-14.80469 -0.707031,-21.83203 z m -5.632813,24.83984 c -0.933593,-0.008 -0.644531,-1.31641 -1.410156,-1.50391 0,2.51172 0,5.01954 0,7.53125 3.144532,3.16016 -0.04687,13.09766 2.113282,17.3125 0.460937,-4.27343 -0.925782,-10.52734 0.703124,-13.55468 0.679688,2.29297 -1.507812,7.63672 1.410157,7.53125 -0.136719,-8.47266 -0.933594,-15.58203 0.703125,-23.33594 0,2.76172 0,5.51953 0,8.27734 1.449218,2.39063 1.410156,-2.12109 2.113281,0 0.03906,3.90235 0.582031,14.69922 1.410156,12.80078 0.714844,-3.0039 -0.417969,-7.97656 2.117188,-9.03125 0.0078,10.78125 0.304687,25.26172 1.40625,32.36719 0.429687,-1.80078 -0.882813,-5.46094 0.703125,-6.02344 0,-3.76171 0,-7.52734 0,-11.29296 0,-2.00391 0,-4.01172 0,-6.01954 -2.1875,-12.6289 -4.527344,-28.46875 -1.40625,-40.65234 0.234375,0 0.46875,0 0.703125,0 0,-2.50781 0,-5.01562 0,-7.52734 0,-4.01172 0,-8.03125 0,-12.04688 -1.144531,5.70313 -1.433594,7.1836 -1.410157,-0.75 -0.703124,0 -1.40625,0 -2.113281,0 -0.105469,4.30469 0.152344,7.92969 0,10.53906 -0.574219,9.85547 -1.371093,-6.71093 -1.410156,-10.53906 -0.230469,0 -0.464844,0 -0.703125,0 -0.695312,12.8086 1.789062,29.01172 -2.113281,38.39063 -0.457031,-4.02344 0.925781,-10.01953 -0.703125,-12.79688 -0.425782,6.32813 0.882812,18.4961 -0.707032,21.07813 0.46875,-7.53125 -0.933593,-17.0586 0.707032,-23.33594 C 86.207031,536.84766 85,530.10937 85.007812,522.07031 c -0.703124,0 -1.40625,0 -2.109374,0 -0.40625,15.98438 0.480468,30.60156 0.703124,45.91797",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 89.941406,585.30469 c 1.523438,1.38672 1.484375,4.4375 1.410156,7.52734 -1.265624,-1.65625 -0.617187,-5.36719 -1.410156,-7.52734 z m 0.703125,88.82812 c -1.636719,-5.01953 -0.238281,-13.29297 -0.703125,-19.57031 0,-6.52344 0,-13.05078 0,-19.57422 1.640625,11.54688 0.238282,26.35156 0.703125,39.14453 z m 2.820313,10.53906 c 1,3.45313 0.652344,8.53125 0.703125,15.0586 -1.589844,-1.80469 -1.375,-6.16016 -1.40625,-9.78516 -0.01953,-1.77734 -0.632813,-9.87109 0.703125,-5.27344 z m 2.113281,22.58594 c -2.019531,-1.8164 -1.269531,-5.43359 -0.707031,-8.28125 1.425781,2.45313 1.386718,5.3086 0.707031,8.28125 z m -4.226563,-6.77344 c 1.144532,-0.0234 1.144532,11.07032 0,13.54688 -3.980468,-3.38281 0.777344,-8.74609 0,-13.54688 z m 10.566408,33.125 c 1.63281,4.02344 0.24219,11.28125 0.70703,16.5586 -1.64062,-4.02344 -0.24609,-11.28516 -0.70703,-16.5586 z m -1.40625,-21.08203 c 2.77344,4.72657 0.10937,10.69141 0.70312,17.3125 -1.562496,-1.35547 -0.29296,-12.21875 -0.70312,-17.3125 z m -0.707032,-11.29297 c 1.617192,1.53907 0.253902,6.25391 0.707032,9.03907 -1.621095,-1.53907 -0.25781,-6.25782 -0.707032,-9.03907 z m 0,-8.27734 c -1.621094,-10.5625 -0.253907,-24.32031 -0.703126,-36.13672 1.457028,10.73828 1.476568,23.01563 1.410158,35.37891 0.19531,1.35156 -0.66797,1.54687 -0.707032,0.75781 z M 100.51172,637.25 c 0.11328,-0.87891 -0.16016,-1.34375 -0.707032,-1.50781 0,-6.27344 0,-12.54688 0,-18.81641 0.546872,-1.375 0.753902,0.44922 0.707032,1.50391 -0.40625,7.20703 1.23437,12.22656 0.70312,19.57422 -0.60156,0.13671 -0.66406,-0.29688 -0.70312,-0.75391 z m -5.640626,207.77344 c 2.160156,9.3789 -0.824219,10.96484 0,0 z m -4.226563,5.26953 c -1.597656,-0.80469 -0.265625,-4.73438 -0.703125,-6.77735 1.5625,2.08204 1.152344,4.03125 0.703125,6.77735 z M 82.191406,597.34766 c 0,15.30859 0,30.61718 0,45.92578 2.101563,-10.5625 -0.683594,-30.33985 1.410156,-38.39453 -0.238281,39.00781 -0.472656,81.52734 -1.410156,121.95312 -0.234375,0 -0.46875,0 -0.707031,0 0,7.77734 0,15.55859 0,23.33594 0,4.26953 0,8.53125 0,12.80078 1.644531,15.80859 0.238281,34.87891 0.707031,51.94141 1.457032,-66.22266 1.5,-132.75 2.816406,-201.75 1.164063,0.008 0.394532,2.08593 1.410157,2.25781 0,-4.26953 0,-8.53125 0,-12.79688 0,-2.26172 0,-4.51953 0,-6.77343 1.09375,-2.30079 0.621093,3.26171 0.703125,4.51171 0.238281,22.21094 -1.726563,40.82813 0,64.74219 0.238281,0 0.472656,0 0.703125,0 0,-13.80078 0,-27.60156 0,-41.40234 3.203125,34.64844 0.835937,77.98828 0.707031,112.91797 0.05469,1.05468 -0.15625,2.88281 -0.707031,1.50781 0,-1.50781 0,-3.01172 0,-4.51563 0,-2.76171 0,-5.52343 0,-8.28125 -0.960938,-4.99609 -0.695313,-11.30078 -0.703125,-17.3164 -1.324219,12.46094 -0.964844,29.63672 0,42.15625 0.398437,11.33594 1.949218,22.03125 0.703125,31.61719 -0.550781,4.27343 -0.691407,-2.82422 -0.703125,-3.01172 -0.375,-9.03907 0.285156,-16.79297 0,-24.84375 -1.636719,5.03125 -0.238282,13.29687 -0.703125,19.57422 0,3.26562 0,6.52343 0,9.78906 -0.183594,6.54687 -1.125,-0.9961 -0.703125,-3.76563 0,-13.55078 0,-27.10156 0,-40.64843 -3.214844,39.86328 -0.09375,80.23046 -0.210938,120.78125 l 2.320313,0 c 0,-4.12891 0,-8.25 0,-12.37891 0,-1.25781 0,-2.51172 0,-3.76563 -0.08594,-1.86328 0.867187,-1.27734 0.707031,0 0,2.25782 0,4.51563 0,6.77735 0.05078,3.41406 0.07813,6.48437 0.128906,9.36719 l 3.769532,0 c -0.699219,-8.71875 -1.195313,-16.57032 1.035156,-24.42579 1.429687,-5.04687 -0.01563,6.66797 0,7.52735 0.06641,4.47656 0.246094,10.40625 0.324218,16.89844 l 1.789063,0 c 0.0078,-0.86329 0.01172,-1.72657 0,-2.59766 0.242187,0.85156 0.445313,1.71875 0.617187,2.59766 l 1.9375,0 c 0.890626,-23.58985 2.011718,-46.94141 2.378908,-71.09766 -2.503908,6.13281 -0.847658,17.15625 -1.410158,25.59375 -0.164062,2.40234 -1.039062,10.84766 -1.410156,5.26953 -0.132812,-12.93359 -0.03906,-25.62891 0.703125,-37.64062 0.929688,0.0117 0.644531,1.32421 1.410157,1.50781 0,-1.75781 0,-3.51172 0,-5.26953 1.589842,0.5625 0.273442,4.22656 0.707032,6.02343 3.60547,-26.0039 2.9375,-56.57421 6.33594,-82.8125 0.14843,1.60938 0.57422,5.62891 0.70703,12.05079 0.10156,5.05468 0.32031,19.14062 -1.41016,9.78515 1.55078,16.13672 1.33594,27.16016 1.41016,43.66016 0.23437,0 0.46875,0 0.70312,0 0,-3.26172 0,-6.52344 0,-9.78906 0,-17.0625 0,-34.1211 0,-51.1875 0,-6.27344 0,-12.54688 0,-18.82422 -2.17968,-5.00391 0.70703,-13.36719 0,-2.25782 0.23438,0 0.46875,0 0.70313,0 0,-11.54296 0,-23.08593 0,-34.6289 -1.60547,-1.03906 -0.26172,-5.23828 -0.70313,-7.52735 -0.8125,-2.42968 -0.79687,2.02344 -0.70312,3.01563 0.29687,17.125 -2.12891,35.92578 -2.82422,52.69531 -0.20703,5.20703 1.08594,11.64844 -2.8125,13.54688 1.14453,-14.89844 -2.003908,-32.8125 0.70703,-44.41407 -0.0937,4.10938 0,8.03125 1.40625,10.54297 -0.0742,-3.49218 -0.11719,-6.96484 1.41016,-3.01562 0.49218,-27.5586 2.74609,-59.70703 0.70312,-89.58203 -3.04687,-1.44141 -0.23047,7.20312 -2.11328,4.51562 0.0703,-3.96875 -0.32031,-2.5664 -1.40625,-0.7539 0.0859,-4.51172 -0.53516,-15.78516 -1.41016,-14.30079 -0.41796,1.5586 0.8711,4.94532 -0.70312,5.26954 0,2.25781 0,4.51562 0,6.77734 0,4.26172 0,8.53125 0,12.79687 -1.632814,-2.77343 -0.24609,-8.77343 -0.707032,-12.79687 0,-1.00391 0,-2.01172 0,-3.01172 -1.605469,-1.04687 -0.261719,-5.24219 -0.703126,-7.52734 -1.625,2.02734 -0.25,7.25781 -0.707031,10.53906 -2.15625,-2.96875 -1.199219,-9.25781 -1.410156,-14.30469 0,-0.5039 0,-1.0039 0,-1.5039 -0.230469,0 -0.464844,0 -0.703125,0 0,2.00781 0,4.01562 0,6.01953 0,3.26562 0,6.52343 0,9.78906 2.945312,45.375 2.394531,93.58203 2.148438,139.73437 0.105468,0.51563 0.08984,1.09766 -0.0078,1.71875 -0.0078,1.78125 -0.01953,3.56641 -0.02734,5.34375 -2.101562,0.48829 -0.394531,-2.6875 0.02734,-5.34375 0.0039,-0.57421 0.0078,-1.14453 0.0078,-1.71875 -0.105469,-0.49609 -0.320313,-0.92578 -0.738282,-1.21875 0.02734,0.0195 -0.707031,14.14063 -0.707031,20.32422 0,9.21485 0,17.19532 0,21.07813 1.632813,-2.77735 0.246094,-8.77344 0.707031,-12.80078 0.347656,-3.16016 -0.777344,-11.83594 0.703125,-11.28907 0.800781,23.69141 -1.699219,43.85938 -2.113281,66.2461 -0.578125,8.55859 -0.242188,2.35937 -0.703125,-2.25781 -0.179687,-1.78907 -0.335937,-3.59375 -0.480469,-5.41797 -0.03906,-0.52344 -0.07422,-1.0586 -0.109375,-1.58985 -0.09375,-1.3125 -0.1875,-2.63281 -0.261719,-3.96875 -0.03516,-0.58593 -0.0625,-1.17968 -0.08984,-1.77343 -0.07031,-1.30469 -0.132813,-2.60938 -0.1875,-3.92969 -0.02344,-0.56641 -0.03906,-1.14453 -0.05859,-1.71875 -0.04687,-1.36719 -0.09375,-2.74219 -0.125,-4.125 -0.0078,-0.51953 -0.02344,-1.03906 -0.03125,-1.5625 -0.02734,-1.47266 -0.05078,-2.95313 -0.06641,-4.44141 -0.0039,-0.42969 -0.0039,-0.86328 -0.0078,-1.29687 -0.01172,-1.61328 -0.01563,-3.23438 -0.0078,-4.86328 0,-0.32032 0.0039,-0.63672 0.0039,-0.95313 0.0078,-1.78906 0.03125,-3.58203 0.05469,-5.38672 0.0039,-0.16797 0.0039,-0.33594 0.0078,-0.5039 0.02734,-1.98829 0.07031,-3.98438 0.117188,-5.9961 0,0 0,0 0,-0.004 -0.484376,-2.30079 -0.195313,-5.44141 -0.09766,-8.375 0,-0.0312 0,-0.0664 0.0039,-0.10157 0.01562,-0.48828 0.01953,-0.96484 0.01562,-1.43359 0,-0.14063 0.0039,-0.28516 0,-0.42578 -0.01172,-0.55469 -0.03516,-1.09375 -0.08984,-1.60547 0.183593,0.33984 0.316406,0.73047 0.429687,1.14062 0.01953,0.0742 0.04687,0.14454 0.0625,0.21875 0.04687,-1.27343 0.09375,-2.54296 0.144532,-3.82031 0.0039,-0.0117 0.0039,-0.0234 0.0039,-0.0351 0,0 0,0 0,-0.004 -0.992188,-3.27344 -0.773438,-7.83984 -0.621094,-12.33594 0.01953,-0.625 0.03906,-1.24609 0.05078,-1.86328 0.0039,-0.11719 0.0039,-0.23437 0.0078,-0.35156 0.01953,-0.79688 0.02734,-1.58985 0.01953,-2.35938 0,-0.0234 0,-0.0351 -0.0039,-0.0625 -0.0078,-0.80468 -0.03906,-1.59765 -0.09375,-2.35547 0.132812,0.17969 0.25,0.39063 0.351562,0.62891 0.02734,0.0664 0.04687,0.14844 0.07422,0.22266 0.06641,0.17578 0.132812,0.35156 0.1875,0.55468 0.01953,0.0898 0.03516,0.19141 0.05469,0.28516 0.04297,0.20703 0.08984,0.41016 0.121093,0.62891 0.01563,0.0937 0.02344,0.19922 0.03516,0.29297 0.03125,0.24609 0.05859,0.48828 0.07812,0.7539 0.0039,0.0781 0.0078,0.16016 0.0078,0.23828 0.02344,0.30078 0.03906,0.60547 0.04297,0.92578 0.0039,0.0391 0,0.082 0.0039,0.1211 0.07031,4.20703 -0.726562,10.01562 -0.308594,14.34765 0,0.004 0.0039,0.008 0.0039,0.008 0.0039,-0.0703 0.0039,-0.14063 0.0078,-0.21094 0.09375,-2.35156 0.195313,-4.70703 0.304687,-7.07031 0.02344,-0.51172 0.04688,-1.02344 0.07031,-1.53907 0.101563,-2.14062 0.199219,-4.29296 0.308594,-6.44531 0.01172,-0.27344 0.02344,-0.55078 0.03906,-0.82812 0.292969,-5.87891 0.597657,-11.79688 0.894531,-17.72266 0.05859,-1.11719 0.109376,-2.23047 0.167969,-3.34766 0.05859,-1.19531 0.117188,-2.39843 0.175781,-3.59375 0.07813,-1.59765 0.152344,-3.19531 0.222657,-4.78906 0.03906,-0.78515 0.07813,-1.5664 0.109375,-2.35156 0.105468,-2.29297 0.199218,-4.58594 0.289062,-6.87109 0.03125,-0.78125 0.0625,-1.5625 0.09375,-2.33985 0.05859,-1.64453 0.117188,-3.28515 0.171875,-4.92578 0.03125,-0.85547 0.05469,-1.71484 0.08594,-2.57422 0.05078,-1.75 0.09766,-3.5 0.140625,-5.24609 0.01953,-0.64844 0.03516,-1.29688 0.05078,-1.94531 0.05078,-2.33204 0.08984,-4.65625 0.113281,-6.97266 0.0078,-0.60156 0.01172,-1.19531 0.01953,-1.79688 0.01172,-1.76953 0.01953,-3.53515 0.01953,-5.29296 0,-0.77735 0,-1.54688 -0.0039,-2.31641 -0.0078,-1.70703 -0.03125,-3.39453 -0.05469,-5.08203 -0.01172,-0.66797 -0.01563,-1.33594 -0.03125,-2 -0.04297,-2.29297 -0.101563,-4.57031 -0.183594,-6.83985 -0.01563,-0.36718 -0.03516,-0.73437 -0.05078,-1.09765 -0.07422,-1.90625 -0.160156,-3.80469 -0.265625,-5.6875 -0.03516,-0.70703 -0.08203,-1.41797 -0.125,-2.1211 -0.101563,-1.62109 -0.210937,-3.22656 -0.332031,-4.82812 -0.05469,-0.67188 -0.101563,-1.34375 -0.160156,-2.01172 -0.183594,-2.20312 -0.382813,-4.39453 -0.617188,-6.55469 -0.359375,22.23047 1.003906,42.09375 -1.410156,59.47266 -2.753906,-8.85156 -1.449219,-26.04688 -0.703125,-36.13281 0,6.02343 0,12.04297 0,18.0664 -0.347657,2.08594 0.355469,9.16016 0.703125,3.76172 0,-3.00781 0,-6.01953 0,-9.03125 0,-12.29687 0,-24.59375 0,-36.88672 0,-6.27734 0,-12.54687 0,-18.82422 -1.585938,0.5625 -0.273438,4.22266 -0.703125,6.02344 -1.101563,-7.10547 -1.398438,-21.58594 -1.40625,-32.36719 -2.535157,1.05469 -1.402344,6.02735 -2.117188,9.03125 -0.828125,1.89844 -1.371093,-8.89843 -1.410156,-12.80078 -0.703125,-2.12109 -0.664063,2.39063 -2.113281,0 0,-2.75781 0,-5.51562 0,-8.27734 -1.636719,7.75391 -0.839844,14.86328 -0.703125,23.33594 -2.917969,0.10547 -0.730469,-5.23828 -1.410157,-7.53125 -1.628906,3.02734 -0.242187,9.28125 -0.703124,13.55468 -2.160157,-4.21484 1.03125,-14.15234 -2.113282,-17.3125 0,0.5 0,1.00391 0,1.50391 0,7.27734 0,14.55078 0,21.82813",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.828125,674.94922 0,-0.004 0,0.004 c 0,0.004 0,0.004 0,0.004 l 0,-0.004",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 79.375,644.77734 c 0.40625,-3.57812 1.019531,-6.9414 0.703125,-11.29297 1.148437,-0.3125 1.148437,14.61329 0,14.30469 0.08984,-1.35156 -0.863281,-1.58984 -0.703125,-3.01172 z m -0.703125,88.07813 c 0.515625,6.57422 -1.148437,10.8164 -0.707031,17.3125 -1.71875,-1.05469 -0.351563,-19.23047 0.707031,-17.3125 z m -2.113281,56.46094 c -1.632813,-3.02344 -0.246094,-9.27735 -0.707032,-13.55079 1.632813,3.02344 0.242188,9.27344 0.707032,13.55079 z m -0.625,-124.82813 c 0.01172,0.75391 0.0078,1.48438 0.01172,2.22266 0,0.48047 0.0078,0.96484 0.0039,1.4414 -0.0039,1.01172 -0.01563,2.00782 -0.03516,2.99219 0,0.15234 0,0.31641 -0.0039,0.46875 -0.01953,1.11328 -0.04687,2.21094 -0.08203,3.30078 0,0.0117 0,0.0234 0,0.0352 0,0.0664 0,0.13281 0,0.19531 -0.0078,4.43359 -0.01953,8.89063 -0.03125,13.35156 -0.0078,1.55469 -0.01172,3.09766 -0.01563,4.65235 -0.01172,3.91015 -0.02734,7.83203 -0.04297,11.76953 -0.0078,2.09375 -0.01563,4.18359 -0.02734,6.28125 -0.01563,3.625 -0.03906,7.2539 -0.05859,10.89453 -0.01563,2.40234 -0.02734,4.80469 -0.04687,7.21875 -0.02344,3.43359 -0.05078,6.87109 -0.07813,10.31641 -0.01953,2.64062 -0.04297,5.27343 -0.06641,7.91796 -0.02734,3.26954 -0.0625,6.54688 -0.09375,9.82813 -0.03125,2.80859 -0.0625,5.61719 -0.09766,8.43359 -0.03516,3.1836 -0.07813,6.375 -0.121093,9.56641 -0.03516,2.90234 -0.07422,5.80859 -0.121094,8.70703 -0.04687,3.10938 -0.09375,6.21875 -0.144532,9.32813 -0.04687,3.0039 -0.101562,6 -0.160156,9.0039 -0.05469,3.02735 -0.113281,6.0586 -0.171875,9.08985 -0.0625,3.07812 -0.128906,6.14843 -0.199219,9.22656 -0.06641,2.96484 -0.132812,5.93359 -0.207031,8.89844 -0.07422,3.13671 -0.15625,6.26562 -0.238281,9.39843 -0.07813,2.89844 -0.152344,5.78907 -0.238281,8.6836 -0.08984,3.20703 -0.191407,6.41015 -0.289063,9.61328 -0.02734,0.77734 -0.05078,1.55469 -0.07422,2.33594 l 2.898437,0 C 75.179688,856 74.925781,851.51562 75.148438,846.52734 c 1.179687,-2.16797 0.558593,3.84375 0.703124,5.26953 1.636719,-4.52734 0.242188,-12.28906 0.707032,-18.0664 -1.609375,1.04297 -0.265625,5.23828 -0.707032,7.52734 -2.175781,-4.92969 2.175782,-15.67969 0.707032,-24.84375 0.761718,0.1875 0.476562,1.5 1.40625,1.50391 0,-4.51563 0,-9.03125 0,-13.54688 2.433594,14.34766 -0.417969,35.00782 0,53.44922 0.320312,0.4961 0.5,1.13672 0.625,1.83985 l 1.042968,0 c 0.05078,-24.51563 0.988282,-49.33985 1.152344,-74.10938 -1.640625,-5.52734 -0.242187,-14.29687 -0.707031,-21.08203 -1.910156,-13.72656 -0.261719,-26.72656 -0.703125,-42.15234 -1.589844,0.55859 -0.277344,4.22265 -0.703125,6.02343 -2.25,-2.62109 -1.957031,-9.90625 0.703125,-9.78906 0.441406,-9.0625 -0.90625,-24.05078 0.703125,-29.35937 0,5.26953 0,10.53906 0,15.80468 0,5.27735 0,10.54297 0,15.81641 0.234375,0 0.46875,0 0.707031,0 0,-16.81641 0,-33.62891 0,-50.4375 0.640625,-24.96484 1.335938,-51.98438 0,-76.78906 0,-2.25782 0,-4.51953 0,-6.77344 -1.996094,0.12109 0.585938,-4.64063 -1.410156,-4.51953 -2.941406,11.44922 -0.996094,29.41406 -1.410156,41.40625 -1.304688,1.83203 -0.476563,-4.96094 -0.703125,-6.77344 -1.648438,11.28516 -1.425781,24.57031 -1.410157,37.63672 0,2.01172 0,4.01562 0,6.02344 0.03906,1.32812 0.07031,2.625 0.08203,3.90234",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.933594,664.48828 c 0.01172,0.75391 0.01172,1.48438 0.01172,2.22266 -0.0039,-0.73828 0,-1.46875 -0.01172,-2.22266",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.910156,671.61328 c -0.01953,1.11328 -0.04687,2.21094 -0.08203,3.30078 0.03516,-1.08984 0.0625,-2.1875 0.08203,-3.30078",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.851562,660.58594 c -0.0039,4.76172 -0.01562,9.5625 -0.02344,14.36328 l 0,-0.004 c 0.0078,-4.80078 0.01953,-9.59765 0.02344,-14.35937",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.949219,668.15234 c -0.0039,1.01172 -0.01563,2.00782 -0.03516,2.99219 0.01953,-0.98437 0.03125,-1.98047 0.03516,-2.99219",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.828125,744.125 c 0.09375,-2.35156 0.195313,-4.70703 0.304687,-7.07031 -0.109374,2.36328 -0.210937,4.71875 -0.304687,7.07031",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 97.410156,689.56641 c 0.03125,-0.78125 0.0625,-1.5625 0.09375,-2.33985 -0.03125,0.77735 -0.0625,1.5586 -0.09375,2.33985",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.203125,735.51562 c 0.101563,-2.14062 0.199219,-4.29296 0.308594,-6.44531 -0.109375,2.15235 -0.207031,4.30469 -0.308594,6.44531",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.550781,728.24219 c 0.292969,-5.87891 0.597657,-11.79688 0.894531,-17.72266 -0.296874,5.92578 -0.601562,11.84375 -0.894531,17.72266",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 96.613281,707.17187 c 0.05859,-1.19531 0.117188,-2.39843 0.175781,-3.59375 -0.05859,1.19532 -0.117187,2.39844 -0.175781,3.59375",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 97.902344,674.48047 c 0.01953,-0.64844 0.03516,-1.29688 0.05078,-1.94531 -0.01563,0.64843 -0.03125,1.29687 -0.05078,1.94531",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 97.832031,642.23437 c -0.01563,-0.36718 -0.03516,-0.73437 -0.05078,-1.09765 0.01563,0.36328 0.03516,0.73047 0.05078,1.09765",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 97.515625,635.44922 c -0.03516,-0.70703 -0.08203,-1.41797 -0.125,-2.1211 0.04297,0.70313 0.08984,1.41407 0.125,2.1211",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 98.066406,665.5625 c 0.0078,-0.60156 0.01172,-1.19531 0.01953,-1.79688 -0.0078,0.60157 -0.01172,1.19532 -0.01953,1.79688",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 98.046875,651.07422 c -0.01172,-0.66797 -0.01563,-1.33594 -0.03125,-2 0.01563,0.66406 0.01953,1.33203 0.03125,2",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 97.058594,628.5 c -0.05469,-0.67188 -0.101563,-1.34375 -0.160156,-2.01172 0.05859,0.66797 0.105468,1.33984 0.160156,2.01172",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 97.675781,682.30078 c 0.03125,-0.85547 0.05469,-1.71484 0.08594,-2.57422 -0.03125,0.85938 -0.05469,1.71875 -0.08594,2.57422",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 97.011719,698.78906 c 0.03906,-0.78515 0.07813,-1.5664 0.109375,-2.35156 -0.03125,0.78516 -0.07031,1.56641 -0.109375,2.35156",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.78125,759.10547 c 0,-0.17969 0,-0.3711 0,-0.5586 0,0.1875 0,0.37891 0,0.5586",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.675781,748.59375 c 0.09375,0.39062 0.164063,0.80859 0.207031,1.25391 -0.04297,-0.44532 -0.113281,-0.86329 -0.207031,-1.25391",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.636719,793.87891 c -0.07031,-1.30469 -0.132813,-2.60938 -0.1875,-3.92969 0.05469,1.32031 0.117187,2.625 0.1875,3.92969",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.988281,799.62109 c -0.09375,-1.3125 -0.1875,-2.63281 -0.261719,-3.96875 0.07422,1.33594 0.167969,2.65625 0.261719,3.96875",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.578125,806.62891 c -0.179687,-1.78907 -0.335937,-3.59375 -0.480469,-5.41797 0.144532,1.82422 0.300782,3.6289 0.480469,5.41797",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.941406,750.75391 c 0.01172,0.22265 0.03125,0.4375 0.03125,0.66796 -0.0039,-0.23046 -0.01953,-0.44531 -0.03125,-0.66796",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.816406,756.77734 c -0.0078,0.1875 -0.01563,0.375 -0.01953,0.5625 0.0039,-0.1875 0.01172,-0.375 0.01953,-0.5625",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.871094,760.71094 c -0.160156,-0.30469 -0.269532,-0.65625 -0.378906,-1.01172 0.101562,0.36328 0.21875,0.70703 0.378906,1.01172",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 98.101562,656.15625 c 0.0039,0.76953 0.0039,1.53906 0.0039,2.31641 0,-0.77735 0,-1.54688 -0.0039,-2.31641",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.160156,776.80469 c -0.01172,-1.61328 -0.01563,-3.23438 -0.0078,-4.86328 -0.0078,1.6289 -0.0039,3.25 0.0078,4.86328",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.15625,770.98828 c 0.0078,-1.78906 0.03125,-3.58203 0.05469,-5.38672 -0.02344,1.80469 -0.04688,3.59766 -0.05469,5.38672",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.804688,744.69531 c -0.05078,1.27735 -0.09766,2.54688 -0.144532,3.82031 0.04687,-1.27343 0.09766,-2.53906 0.144532,-3.82031",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.808594,744.66016 c 0.02344,0.0781 0.03906,0.16015 0.0625,0.23828 -0.02344,-0.0781 -0.03906,-0.16016 -0.0625,-0.23828",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.921875,754.38281 c -0.0078,0.0899 -0.01172,0.1836 -0.01563,0.26953 0.0039,-0.0859 0.0078,-0.17968 0.01563,-0.26953",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.972656,752.46094 c 0,0.21093 0,0.41797 -0.0078,0.63281 0.0078,-0.21094 0.0078,-0.42188 0.0078,-0.63281",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.335938,759.10156 c -0.04688,2.01172 -0.08984,4.00781 -0.117188,5.9961 0.02734,-1.98829 0.07031,-3.98438 0.117188,-5.9961",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.234375,782.54297 c -0.02734,-1.47266 -0.05078,-2.95313 -0.06641,-4.44141 0.01563,1.48828 0.03906,2.96875 0.06641,4.44141",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.390625,788.23047 c -0.04687,-1.36719 -0.09375,-2.74219 -0.125,-4.125 0.03125,1.38281 0.07813,2.75781 0.125,4.125",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.257812,748.76172 c -0.01172,-0.55469 -0.03516,-1.09375 -0.08984,-1.60547 0.05469,0.51172 0.07813,1.05078 0.08984,1.60547",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.238281,750.72266 c -0.09766,2.93359 -0.386719,6.07421 0.09766,8.375 -0.484376,-2.30079 -0.191407,-5.45313 -0.09766,-8.375",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.660156,748.51562 c -0.01563,-0.0742 -0.04297,-0.14453 -0.0625,-0.21875 0.01953,0.0742 0.04687,0.14454 0.0625,0.21875",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.257812,749.1875 c 0.0039,0.46875 0,0.94531 -0.01562,1.43359 0.01562,-0.48828 0.01953,-0.96484 0.01562,-1.43359",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.335938,759.10156 0,0 c 0.04297,0.20703 0.101562,0.40235 0.15625,0.59766 0.109374,0.35547 0.21875,0.70703 0.378906,1.01172 -0.05469,-0.50782 -0.07813,-1.04688 -0.08984,-1.60547 0,-0.17969 0,-0.3711 0,-0.5586 0,-0.39843 0.0039,-0.79296 0.01563,-1.20703 0.0039,-0.1875 0.01172,-0.375 0.01953,-0.5625 0.02734,-0.70312 0.05859,-1.41406 0.08984,-2.125 0.0039,-0.0859 0.0078,-0.17968 0.01563,-0.26953 0.01563,-0.43359 0.03125,-0.86328 0.04297,-1.28906 0.0078,-0.21484 0.0078,-0.42188 0.0078,-0.63281 0.0078,-0.35157 0.0078,-0.69922 0,-1.03907 0,-0.23046 -0.01953,-0.44531 -0.03125,-0.66796 -0.01563,-0.3086 -0.02734,-0.61719 -0.05859,-0.90625 -0.04297,-0.44532 -0.113281,-0.86329 -0.207031,-1.25391 -0.0078,-0.0234 -0.0078,-0.0547 -0.01563,-0.0781 -0.128906,3.55469 -0.238281,7.08594 -0.324218,10.58594",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.519531,725.95703 c 0.02734,0.0664 0.04687,0.14844 0.07422,0.22266 -0.02734,-0.0742 -0.04687,-0.15625 -0.07422,-0.22266",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.78125,726.73437 c 0.01953,0.0898 0.03516,0.19141 0.05469,0.28516 -0.01953,-0.0937 -0.03516,-0.19531 -0.05469,-0.28516",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.820312,744.33594 c 0,0 -0.0039,-0.004 -0.0039,-0.008 0,0.004 0,0.008 0.0039,0.0117 0,0 0,0 0,-0.004",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.261719,727.68359 c 0.0039,0.0274 0.0039,0.0391 0.0039,0.0625 0,-0.0234 0,-0.0351 -0.0039,-0.0625",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.238281,730.45703 c 0.0039,-0.11719 0.0039,-0.23437 0.0078,-0.35156 -0.0039,0.11719 -0.0039,0.23437 -0.0078,0.35156",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.121094,729.85937 c 0.0039,0.0391 0,0.082 0.0039,0.1211 -0.0039,-0.0391 0,-0.082 -0.0039,-0.1211",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.957031,727.64844 c 0.01563,0.0937 0.02344,0.19922 0.03516,0.29297 -0.01172,-0.0937 -0.01953,-0.19922 -0.03516,-0.29297",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.1875,732.32031 c -0.152344,4.4961 -0.371094,9.0625 0.621094,12.33594 -0.992188,-3.27344 -0.773438,-7.83984 -0.621094,-12.33594",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 95.070312,728.69531 c 0.0039,0.0781 0.0078,0.16406 0.0078,0.23828 0,-0.0781 -0.0039,-0.16015 -0.0078,-0.23828",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.820312,744.33984 c -0.0039,0.10547 -0.0078,0.21485 -0.01172,0.32032 0.0039,-0.10547 0.0078,-0.21485 0.01172,-0.32032",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.808594,744.66016 c 0.02344,0.0781 0.03906,0.16015 0.0625,0.23828 -0.01953,-0.17969 -0.03125,-0.3711 -0.05078,-0.5586 -0.0039,0.10547 -0.0078,0.21485 -0.01172,0.32032",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 93.464844,835.23437 c -2.230469,7.85547 -1.734375,15.70704 -1.035156,24.42579 l 1.359374,0 c -0.07812,-6.49219 -0.257812,-12.42188 -0.324218,-16.89844 -0.01563,-0.85938 1.429687,-12.57422 0,-7.52735",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 89.941406,585.30469 c 0.792969,2.16015 0.144532,5.87109 1.410156,7.52734 0.07422,-3.08984 0.113282,-6.14062 -1.410156,-7.52734",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 116.71094,813.40234 c -2.10547,0.0156 0.99219,5.58203 -2.11328,4.51563 0.46484,-6.27735 -0.9336,-14.54688 0.70312,-19.57031 0,-4.76954 0,-9.53516 0,-14.30079 0,-1.50781 0,-3.01562 0,-4.51953 -2.07031,1.29688 0.66406,7.73438 -1.40625,9.03516 -0.46094,-3.77734 0.92188,-9.51953 -0.70703,-12.04688 -1.05859,4.14063 -0.88281,9.59375 -2.11328,13.55079 0,-13.80079 0,-27.60157 0,-41.40235 -0.23438,0 -0.46875,0 -0.70313,0 0,18.31641 0,36.63281 0,54.95313 -0.45312,3.02734 0.91407,8.0039 -0.70312,9.78515 0,2.00782 0,4.01563 0,6.02344 -0.45703,11.5625 -3.10938,20.76953 -2.11328,33.87891 1.29297,-8.40625 1.4375,-18.03907 2.8164,-26.35157 0.65235,4.82422 1.20313,9.75782 2.81641,13.55079 0,4.26562 0,8.53515 0,12.80078 0,2.11718 0,4.23828 0,6.35547 l 0.57813,0 c -1.14844,-17.69141 2.32421,-30.45313 2.94531,-46.25782",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 124.46094,735.11328 c 0,2.00391 0,4.01172 0,6.02344 0,6.52344 0,13.04297 0,19.57422 1.625,2.52343 0.24609,8.26562 0.70312,12.04297 0.40625,-19.10938 2.28516,-47.22657 -0.70312,-67 0,0.25 0,0.5039 0,0.7539 -0.28906,9.77735 1.85156,19.48828 0,28.60547",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 127.98047,774.26172 c -0.66016,19.61328 -2.53516,37.9375 -2.11328,58.71484 0.69531,-19.08594 2.82422,-40.64453 2.11328,-58.71484",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 104.03125,705.75391 c -2.05469,-5.48438 1.19531,-12.38282 -0.70312,-17.31641 0.51562,4.19531 -2.67188,13.21484 0.70312,17.31641",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 107.55469,806.62891 c -0.23438,0 -0.46875,0 -0.70703,0 0,3.01171 0,6.02343 0,9.03515 -0.46094,4.52735 0.92968,11.03125 -0.70313,14.30078 0,0.75391 0,1.50391 0,2.25782 0,3.26171 0,6.52734 0,9.78515 1.62891,2.53125 0.2461,8.26953 0.70313,12.04297 -1.46094,0.78125 -0.36328,-7.60937 -0.70313,-10.53516 -0.23437,0 -0.46875,0 -0.70312,0 -0.1211,1.125 0.25,2.77735 -0.71094,3.01172 0,2.00782 0,4.01172 0,6.02344 1.04687,0.13672 0.65234,1.82031 0.71094,3.01172 -0.14844,1.21484 -0.10157,2.64453 -0.0312,4.09766 l 1.35937,0 c 0.0586,-1.33204 0.25,-2.51954 0.78516,-3.34766 0,-1.00391 0,-2.00781 0,-3.00781 -0.9961,-13.10938 1.65625,-22.31641 2.11328,-33.87891 -0.23438,0 -0.47266,0 -0.70703,0 -1.9961,10.95313 -1.33203,-8.03906 -1.40625,-12.79687",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 110.37109,534.11719 c 0,4.26172 0,8.53125 0,12.79297 1.91407,-0.53907 -0.5039,3.55078 1.40625,3.01171 0.52344,-3.45703 0.25,-7.75781 1.41016,-10.53906 0.37891,11.89844 -1.03516,25.70313 1.41016,35.38281 0.0937,-1.40234 0.46484,-2.51562 1.41015,-3.01171 -0.45312,-3.02735 0.91797,-8.00391 -0.70703,-9.78516 -0.38672,1.09375 0.82422,3.89062 -0.70312,3.76172 -0.91797,-13.09375 -1.35547,-30.64063 0,-43.66016 -0.47266,0 -0.94141,0 -1.41016,0 0.13281,4.83594 -0.6875,12.07422 -2.81641,12.04688",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 116.71094,586.05859 c 0,-9.99609 1.19531,-0.34765 0.70312,4.51563 0,5.27344 0,10.53906 0,15.80859 0.1211,1.12891 -0.25,2.77735 0.70313,3.01172 0,-8.03125 0,-16.05859 0,-24.08984 0.46094,-3.52735 -0.92188,-9.01172 0.70703,-11.28907 0,-1.25781 0,-2.51171 0,-3.76953 0,-3.50781 0,-7.02734 0,-10.53906 -1.97266,2.91797 -1.70313,8.22266 -2.81641,12.04688 0.45703,4.52734 -0.92968,11.03125 0.70313,14.30468",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 123.75781,568.74219 c 0.26172,5.22656 -0.34375,11.68359 0,17.3164 0.21875,3.65235 0.65235,8.61719 1.40625,7.52735 0.4336,-7.07032 -0.89062,-20.01563 0.70313,-23.33985 0.54687,4.05469 0.40625,-2.16406 2.11328,-1.5039 0.75781,22.78515 0.14062,47.02734 1.41015,69.26172 0,-1.76172 0,-3.51954 0,-5.27344 0,-9.03125 0,-18.06641 0,-27.09766 0,-4.26953 0,-8.53125 0,-12.80078 0,-1 0,-2.00781 0,-3.01172 -1.62109,-1.77734 -0.25,-6.75781 -0.70312,-9.78515 0,-4.26954 0,-8.53125 0,-12.79688 0,-0.5 0,-1.00781 0,-1.50781 -1.16797,-2.28516 -1.16797,-9.75781 0,-12.03906 0,-1.25782 0,-2.51172 0,-3.76954 -1.63672,-4.27343 -0.24219,-11.78906 -0.70703,-17.3125 0,-3.51171 0,-7.02343 0,-10.53906 -0.70313,0 -1.41016,0 -2.11328,0 0.30469,13.69922 0.80859,33.92578 -2.10938,46.67188",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 125.16406,637.25 c 0.44141,-2.28906 -0.90234,-6.48438 0.70313,-7.53125 -0.44531,2.53516 0.90625,6.99609 -0.70313,8.28516 0,5.26953 0,10.53906 0,15.80468 0.98438,5.67969 0.6875,-6.47656 0.70313,-9.03125 0.15625,-0.58593 0.0195,-1.48828 0.70703,-1.5039 0,-4.01563 0,-8.03516 0,-12.04688 -0.48828,-9.76953 -0.375,-20.17578 -1.41016,-29.35937 0.21875,-1.50391 -0.11328,-7.82422 -0.70312,-3.76563 -0.4961,10.32422 0.73437,22.79688 0,30.86719 0,2.76172 0,5.51562 0,8.28125 0.23437,0 0.46875,0 0.70312,0",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 134.32031,759.20312 c 0,0.25 0,0.5 0,0.75391 -0.45703,4.02344 0.92578,10.01953 -0.70312,12.79688 0,2.75781 0,5.51953 0,8.27734 0,2.50781 0,5.02344 0,7.53125 1.17187,3.28125 1.17187,11.77734 0,15.05469 -0.043,0.45703 -0.10547,0.89062 -0.70313,0.7539 0,3.26172 0,6.52344 0,9.78516 0.10156,13.16016 -0.0195,26.07812 -2.11328,36.88672 0,1.0039 0,2.01172 0,3.00781 0,1.87109 0,3.73828 0,5.60938 l 2.57031,0 c 0.0781,-0.3711 0.15235,-0.73829 0.2461,-1.08985 0,-1.2539 0,-2.50781 0,-3.76172 0,-2.76172 0,-5.51953 0,-8.28125 1.13672,-12.58593 1.76562,-25.71093 3.52343,-37.64062 0,3.51172 0,7.02734 0,10.53906 0,1.25781 0,2.51172 0,3.76563 0.23438,0 0.46875,0 0.70313,0 0,-10.79297 0,-21.57813 0,-32.3711 -1.97656,7.66797 -0.52344,19.01563 -3.52344,25.59375 0.14453,3.36328 0.0156,18.9336 -0.70312,9.78516 0.29687,-23.01563 2.57031,-43.92578 2.8164,-66.9961 0,-0.5039 0,-1.0039 0,-1.5039 0.46875,-19.07422 -0.9375,-40.15235 0.70703,-57.96875 0.4336,-2.04297 -0.89453,-5.97656 0.70313,-6.77344 0,-0.50391 0,-1.00781 0,-1.50781 -1.59766,-0.80078 -0.26953,-4.73047 -0.70313,-6.77735 -2.01953,-0.10156 0.60547,-5.16406 -1.41015,-5.26562 0,1.25 0,2.51172 0,3.76172 -0.46094,4.77734 0.92969,11.53125 -0.70703,15.05859 0,2.51172 0,5.01563 0,7.52735 0,12.04296 0,24.08593 0,36.13281 -0.46094,5.52734 0.9375,13.04297 -0.70313,17.3164",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 68.101562,837.49219 c 0.152344,-1.20313 0.789063,-8.0586 2.117188,-3.01172 -3.871094,-12.42578 -1.4375,-31.58594 -2.117188,-47.42578 0,-19.07032 0,-38.14063 0,-57.21485 0,-10.53515 0,-21.07812 0,-31.61328 0,-9.03515 0,-18.0664 0,-27.10156 0,-4.51563 0,-9.03125 0,-13.55078 0,-22.08203 0,-44.16406 0,-66.2461 0,-2.26171 0,-4.51562 0,-6.77734 0,-19.82031 0,-39.64844 0,-59.46875 0,-1.00391 0,-2.00781 0,-3.01172 -0.46875,0 -0.941406,0 -1.410156,0 0,112.52344 0,225.05469 0,337.58985 l 0.75,0 c -0.195312,-8.16407 -0.117187,-15.87891 0.660156,-22.16797",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 73.667969,847.71094 c 0.08594,-2.89063 0.160156,-5.78516 0.238281,-8.6836 0.08203,-3.1289 0.164062,-6.26172 0.238281,-9.39843 0.07422,-2.96485 0.140625,-5.9336 0.207031,-8.89844 0.07031,-3.07813 0.136719,-6.14844 0.199219,-9.22656 0.05859,-3.03125 0.117188,-6.0625 0.171875,-9.08985 0.05859,-3.0039 0.113282,-6 0.160156,-9.0039 0.05078,-3.10938 0.09766,-6.21875 0.144532,-9.32813 0.04687,-2.89844 0.08594,-5.80469 0.121094,-8.70703 0.04297,-3.19141 0.08594,-6.38281 0.121093,-9.56641 0.03516,-2.8164 0.06641,-5.625 0.09766,-8.43359 0.03125,-3.28125 0.06641,-6.55859 0.09375,-9.82813 0.02344,-2.64453 0.04687,-5.28125 0.06641,-7.91796 0.02734,-3.44532 0.05469,-6.88282 0.07813,-10.31641 0.01953,-2.41016 0.03125,-4.81641 0.04687,-7.21875 0.01953,-3.63672 0.04297,-7.26953 0.05859,-10.89453 0.01172,-2.09766 0.01562,-4.1875 0.02734,-6.28125 0.01563,-3.92969 0.03125,-7.86328 0.04297,-11.76953 0.0078,-1.55469 0.0078,-3.09766 0.01563,-4.65235 0.01172,-4.45703 0.02344,-8.92187 0.03125,-13.35156 0,-0.0625 0,-0.125 0,-0.19141 0,0.004 0,0.0117 0,0.0156 -0.277344,9.08203 -0.957031,17.39453 -1.324219,26.40625 -0.0039,0.10156 -0.0078,0.20312 -0.01172,0.30469 -0.04297,1.11718 -0.08594,2.25 -0.113282,3.39453 -0.0078,0.0937 -0.0078,0.1875 -0.01172,0.28515 -0.03516,1.21875 -0.05859,2.44922 -0.07813,3.69922 0,0.13282 0,0.26953 -0.0039,0.40235 -0.01172,1.04687 -0.01953,2.10547 -0.01953,3.1875 0,0.35937 0.0039,0.72656 0.0078,1.08984 0.0039,0.91016 0.01562,1.83594 0.03125,2.76953 0.0078,0.375 0.01172,0.75 0.01953,1.125 0.02734,1.28906 0.06641,2.58985 0.117187,3.92578 -0.230468,0 -0.464844,0 -0.703125,0 0,8.78516 0,17.56641 0,26.35157 -0.05078,37.71093 -0.265625,75.23437 -1.4375,111.75 l 1,0 c 0.02344,-0.78125 0.05078,-1.5586 0.07813,-2.33594 0.09766,-3.20313 0.199219,-6.40625 0.289063,-9.61328",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.441406,721.55859 c -0.05078,-1.33593 -0.08984,-2.63672 -0.117187,-3.92578 0.02734,1.28906 0.06641,2.58985 0.117187,3.92578",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.304688,716.50781 c -0.01563,-0.93359 -0.02734,-1.85937 -0.03125,-2.76953 0.0039,0.91016 0.01562,1.83594 0.03125,2.76953",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.378906,705.07422 c 0.02734,-1.14453 0.07031,-2.27735 0.113282,-3.39453 -0.04297,1.11718 -0.08594,2.24609 -0.113282,3.39453",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.265625,712.64844 c 0,-1.08203 0.0078,-2.14063 0.01953,-3.1875 -0.01172,1.04687 -0.01953,2.10547 -0.01953,3.1875",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.503906,701.375 c 0.367188,-9.01172 1.046875,-17.32422 1.324219,-26.40625 -0.277344,9.08203 -0.960937,17.39062 -1.324219,26.40625",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.289062,709.05859 c 0.01953,-1.25 0.04297,-2.48047 0.07813,-3.69922 -0.03516,1.21875 -0.05859,2.44922 -0.07813,3.69922",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.367188,757.375 c -0.03125,2.80859 -0.0625,5.61719 -0.09766,8.43359 0.03516,-2.8164 0.06641,-5.625 0.09766,-8.43359",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.882812,793.41016 c -0.04687,3.0039 -0.101562,6 -0.160156,9.0039 0.05859,-3.0039 0.113282,-6 0.160156,-9.0039",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.550781,811.50391 c -0.0625,3.07812 -0.128906,6.14843 -0.199219,9.22656 0.07031,-3.07813 0.136719,-6.14844 0.199219,-9.22656",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.148438,775.375 c -0.03516,2.90234 -0.07422,5.80859 -0.121094,8.70703 0.04687,-2.89844 0.08594,-5.80469 0.121094,-8.70703",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.652344,722.09375 c -0.01563,2.40234 -0.02734,4.80859 -0.04687,7.21875 0.01953,-2.41406 0.03125,-4.81641 0.04687,-7.21875",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.914062,671.14453 c 0,0.15234 0,0.31641 -0.0039,0.46875 0.0039,-0.15234 0.0039,-0.31641 0.0039,-0.46875",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 74.144531,829.62891 c -0.07422,3.13671 -0.15625,6.26953 -0.238281,9.39843 0.08203,-3.13281 0.164062,-6.26172 0.238281,-9.39843",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.796875,688.49609 c -0.0078,1.55469 -0.0078,3.09766 -0.01563,4.65235 0.0039,-1.55469 0.0078,-3.09766 0.01563,-4.65235",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.738281,704.91797 c -0.01172,2.09375 -0.01563,4.18359 -0.02734,6.28125 0.01172,-2.09766 0.01953,-4.1875 0.02734,-6.28125",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.828125,674.94922 c 0,-0.0117 0,-0.0234 0,-0.0352 0,0.0117 0,0.0195 0,0.0312 l 0,0.004",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 73.667969,847.71094 c -0.08984,3.20703 -0.191407,6.41015 -0.289063,9.61328 0.09766,-3.20313 0.199219,-6.40625 0.289063,-9.61328",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.851562,660.58594 c 0.03906,1.32812 0.06641,2.625 0.08203,3.90234 -0.01172,-1.27734 -0.04297,-2.57422 -0.08203,-3.90234",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.945312,666.71094 c 0,0.48047 0.0078,0.96484 0.0039,1.4414 0.0039,-0.47656 -0.0039,-0.96093 -0.0039,-1.4414",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.828125,675.14453 c 0,-0.0625 0,-0.12891 0,-0.19531 l 0,0.004 c 0,0.0664 0,0.12891 0,0.19141",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.527344,739.62891 c -0.01953,2.63671 -0.04297,5.27343 -0.06641,7.91796 0.02344,-2.64453 0.04687,-5.27734 0.06641,-7.91796",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 75.828125,674.91406 c 0.03516,-1.08984 0.0625,-2.1875 0.08203,-3.30078 0.0039,-0.15234 0.0039,-0.31641 0.0039,-0.46875 0.01953,-0.98437 0.03125,-1.98047 0.03516,-2.99219 0.0039,-0.47656 -0.0039,-0.96093 -0.0039,-1.4414 0,-0.73828 0,-1.46875 -0.01172,-2.22266 -0.01563,-1.27734 -0.04297,-2.57422 -0.08203,-3.90234 -0.0039,4.76172 -0.01562,9.55859 -0.02344,14.35937 0,-0.0117 0,-0.0195 0,-0.0312",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 68.804688,543.90234 c 1.382812,7.91016 -0.199219,-8.44922 1.414062,-9.78515 0.140625,1.42187 -0.476562,7.4375 0.699219,5.26562 0,-5.76953 0,-11.54297 0,-17.3125 -0.9375,0 -1.875,0 -2.816407,0 0,1.00391 0,2.00781 0,3.01172 1.636719,4.77344 0.242188,12.78906 0.703126,18.82031",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 72.332031,765.97656 c 0.84375,13.37891 1.308594,26.98047 0.703125,38.39453 -0.234375,4.42578 -0.34375,6.30469 -0.703125,1.50782 -0.746093,-9.89454 0.566407,-21.0586 0,-29.36329 -0.234375,0 -0.472656,0 -0.707031,0 0,1.50782 0,3.01172 0,4.51563 0,8.78516 0,17.56641 0,26.35156 -0.933594,4.14844 0.0625,10.16016 0,14.30078 -0.464844,6.78125 0.933594,15.55078 -0.707031,21.07813 0,5.51953 0,11.04297 0,16.5625 -0.01172,0.10547 -0.0078,0.22656 -0.01563,0.33594 l 1.398437,0 c 1.171875,-36.51563 1.386719,-74.03907 1.4375,-111.75 -1.640625,-18.82032 -0.234375,-40.90235 -0.703125,-60.98047 0,-6.51953 0,-13.04297 0,-19.57032 0,-4.51562 0,-9.03125 0,-13.55078 -1.644531,19.82422 -0.234375,42.91016 -0.703125,63.98828 0,13.05079 0,26.09766 0,39.14454 0,3.01562 0,6.02734 0,9.03515",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 70.21875,639.50781 c -3.03125,-1.03906 -0.320312,-4.78906 -0.707031,-7.53125 1.605469,1.04688 0.261719,5.2461 0.707031,7.53125 z m 0,-105.39062 c -1.613281,1.33593 -0.03125,17.69531 -1.414062,9.78515 -0.460938,-6.03125 0.933593,-14.04687 -0.703126,-18.82031 0,19.82031 0,39.64844 0,59.46875 0.820313,-0.125 0.765626,-1.1875 0.703126,-2.25781 0,-8.03125 0,-16.0625 0,-24.08985 1.636718,12.8125 0.246093,35.3711 0.707031,51.94141 -2.101563,-4.52734 0.695312,-14.28516 -1.410157,-18.81641 0,22.08204 0,44.16407 0,66.2461 1.628907,-2.52735 0.25,-8.26563 0.703126,-12.04297 2.5,20.24219 0.339843,48.31641 0,70.00781 -0.457032,4.52344 0.929687,11.03125 -0.703126,14.30078 0,19.07422 0,38.14453 0,57.21485 1.558594,0.0976 0.304688,3.19531 0.703126,4.51953 -0.5625,2.57031 1.050781,4.29687 0.707031,0.75 -0.265625,-35.6875 -0.148438,-64.22656 1.40625,-97.86328 0.09375,9.60937 -0.121094,16.50781 1.414062,23.33593 0.46875,-21.07812 -0.941406,-44.16406 0.703125,-63.98828 0,-3.00781 0,-6.01953 0,-9.03125 0,-6.52734 0,-13.04687 0,-19.57422 0,-13.30078 0,-26.59765 0,-39.89843 0,-1.00391 0,-2.00782 0,-3.01172 -1.628906,-3.02735 -0.242187,-9.27344 -0.703125,-13.55078 0,-3.76172 0,-7.52735 0,-11.29297 C 70.6875,547.15625 72.09375,533.61719 71.625,522.07031 c -0.234375,0 -0.472656,0 -0.707031,0 0,5.76953 0,11.54297 0,17.3125 -1.175781,2.17188 -0.558594,-3.84375 -0.699219,-5.26562",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 81.484375,750.16797 c 0,-7.77735 0,-15.5586 0,-23.33594 0,-7.27734 0,-14.55469 0,-21.83594 0,-7.52343 0,-15.05078 0,-22.58203 -0.453125,-3.77344 0.921875,-9.51562 -0.699219,-12.03906 0,16.80859 0,33.62109 0,50.4375 0.464844,9.53125 -0.9375,21.07422 0.699219,29.35547",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 82.191406,575.51953 c 0,-0.5 0,-1.00391 0,-1.50391 0,-2.51171 0,-5.01953 0,-7.53125 0,-1.0039 0,-2.0039 0,-3.00781 -1.628906,-2.52734 -0.246094,-8.26953 -0.707031,-12.04687 0,-1.75782 0,-3.51172 0,-5.26953 -1.636719,7.03125 -0.234375,17.30859 -0.699219,25.59375 0,4.01171 0,8.03125 0,12.04687 2.0625,-1.05469 -0.65625,-7.23047 1.40625,-8.28125",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 81.484375,540.89062 c 1.625,2.02735 0.253906,7.25782 0.707031,10.53907 0,4.01953 0,8.02734 0,12.04687 0,1.00391 0,2.00391 0,3.00781 0.765625,0.1875 0.476563,1.4961 1.410156,1.50391 -0.222656,-15.31641 -1.109374,-29.93359 -0.703124,-45.91797 -0.472657,0 -0.941407,0 -1.414063,0 0,4.26563 0,8.53516 0,12.79688 0,2.00781 0,4.01562 0,6.02343",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 85.714844,545.40625 c 0,0.75391 0,1.50391 0,2.25781 1.628906,2.77735 0.246094,8.77344 0.703125,12.79688 3.902343,-9.37891 1.417969,-25.58203 2.113281,-38.39063 -1.171875,0 -2.347656,0 -3.523438,0 -0.0078,8.03906 1.199219,14.77735 0.707032,23.33594",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 94.871094,619.18359 c 0,12.29297 0,24.58985 0,36.88672 0,3.01172 0,6.02344 0,9.03125 -0.347656,5.39844 -1.050782,-1.67578 -0.703125,-3.76172 0,-6.02343 0,-12.04297 0,-18.0664 -0.746094,10.08593 -2.050781,27.28125 0.703125,36.13281 2.414062,-17.37891 1.050781,-37.24219 1.410156,-59.47266 0,-11.03906 0,-22.07812 0,-33.12109 0,-3.26563 0,-6.52344 0,-9.78906 -0.234375,0 -0.46875,0 -0.703125,0 0,4.01562 0,8.03125 0,12.04297 -0.46875,9.79296 0.9375,21.58203 -0.707031,30.11718",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 99.101562,551.42969 c -1.625,-2.02735 -0.25,-7.26172 -0.707031,-10.53907 1.624999,2.02735 0.25,7.25782 0.707031,10.53907 z M 97.691406,537.125 c -0.820312,-0.125 -0.765625,-1.1875 -0.707031,-2.25781 -2.082031,2.03906 0.679687,9.25781 -1.40625,11.29297 0,10.28906 0,20.57812 0,30.86328 0.234375,0 0.46875,0 0.703125,0 0,-2.00391 0,-4.01172 0,-6.01953 0,-3.51563 0,-7.02735 0,-10.54297 1.621094,2.03125 0.25,7.26172 0.703125,10.54297 0,0.5 0,1 0,1.5039 1.632813,-3.27734 0.246094,-9.77734 0.707031,-14.30469 1.992188,7.15625 2.121094,16.30079 2.113282,25.59766 0,1 0,2.00781 0,3.01172 0.234372,0 0.468752,0 0.707032,0 0,-2.26172 0,-4.51953 0,-6.77734 0.73828,-4.98047 -1.60547,-13.25391 1.40625,-15.8086 0.0586,2.44531 0.36328,4.63281 1.41016,6.01953 0.30078,-4.4414 0.70703,-8.77343 2.8164,-11.28906 0,3.76172 0,7.52734 0,11.28906 1.6211,-2.02734 0.2461,-7.25781 0.70313,-10.53906 0.16015,-0.57812 0.0195,-1.48437 0.70703,-1.50391 0,-4.76562 0,-9.53515 0,-14.30078 -0.23438,0 -0.46875,0 -0.70703,0 -0.1211,1.125 0.25,2.77735 -0.70313,3.00782 -0.46094,-4.27344 0.92188,-10.51954 -0.70703,-13.55079 -1.29687,3.08985 -0.47656,-8.29296 -0.70703,-11.28906 -1.40234,0 -2.8125,0 -4.22266,0 -0.17578,6.08594 0.52344,13.10156 -0.703122,18.0625 -2.046876,-4.33203 0.617192,-13.70703 -1.410157,-18.0625 -0.234375,0 -0.46875,0 -0.707031,0 0,1.00391 0,2.00781 0,3.01172 0,4.01563 0,8.02734 0.0039,12.04297",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 106.14453,546.91016 c 0.95313,-0.23047 0.58203,-1.88282 0.70313,-3.00782 -0.004,-7.27734 -0.004,-14.55468 -0.004,-21.83203 -0.46484,0 -0.93359,0 -1.40625,0 0,3.76172 0,7.52735 0,11.28906 1.62891,3.03125 0.24609,9.27735 0.70703,13.55079",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 107.55469,779.52734 c 0.23437,0 0.46875,0 0.70312,0 0,-1.75781 0,-3.51172 0,-5.26562 0,-2.51172 0,-5.01953 0,-7.53125 -0.23437,0 -0.46875,0 -0.70312,0 0,2.25781 0,4.51953 0,6.77344 0,2.00781 0,4.01562 0,6.02343",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 104.03125,705.75391 c -3.375,-4.10157 -0.1875,-13.1211 -0.70312,-17.31641 1.89843,4.93359 -1.35157,11.83203 0.70312,17.31641 z m -2.81641,-130.98829 c 0.875,-1.48437 1.4961,9.78907 1.41016,14.30079 1.08594,-1.8125 1.47656,-3.21485 1.40625,0.7539 1.88281,2.6875 -0.93359,-5.95703 2.11328,-4.51562 2.04297,29.875 -0.21094,62.02343 -0.70312,89.58203 -1.52735,-3.94922 -1.48438,-0.47656 -1.41016,3.01562 -1.40625,-2.51172 -1.5,-6.43359 -1.40625,-10.54297 -2.710938,11.60157 0.4375,29.51563 -0.70703,44.41407 3.89844,-1.89844 2.60547,-8.33985 2.8125,-13.54688 0.69531,-16.76953 3.12109,-35.57031 2.82422,-52.69531 -0.0937,-0.99219 -0.10938,-5.44531 0.70312,-3.01563 0.44141,2.28907 -0.90234,6.48829 0.70313,7.52735 0.48437,-8.29688 -1.1875,-14.28125 -0.70313,-22.58203 0,-5.01563 0,-10.03516 0,-15.05469 -1.64453,-10.54297 -0.23828,-24.33594 -0.70312,-36.13281 0,-6.02735 0,-12.04688 0,-18.07032 -0.6875,0.0195 -0.54688,0.92579 -0.70703,1.50391 -0.45703,3.28125 0.91797,8.51172 -0.70313,10.53906 0,-3.76172 0,-7.52734 0,-11.28906 -2.10937,2.51563 -2.51562,6.84766 -2.8164,11.28906 -1.04688,-1.38672 -1.35157,-3.57422 -1.41016,-6.01953 -3.01172,2.55469 -0.66797,10.82813 -1.40625,15.8086 1.57422,-0.32422 0.28516,-3.71094 0.70312,-5.26954",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 111.07422,631.97656 c 0,-7.02344 0,-14.04687 0,-21.07422 0,-3.26172 0,-6.52734 0,-9.78906 0.99219,-10.23047 -2.22656,-24.96094 2.11328,-31.61328 1.46484,17.00391 3.25781,33.65234 3.52344,51.94141 0,-1.75782 0,-3.51172 0,-5.26954 0,-10.03906 0,-20.07421 0,-30.11328 -1.63281,-3.27343 -0.2461,-9.77734 -0.70313,-14.30468 -0.94531,0.49609 -1.3164,1.60937 -1.41015,3.01171 -2.44532,-9.67968 -1.03125,-23.48437 -1.41016,-35.38281 -1.16016,2.78125 -0.88672,7.08203 -1.41016,10.53906 -1.91015,0.53907 0.50782,-3.55078 -1.40625,-3.01171 0,2.26171 0,4.51953 0,6.78125 1.16797,2.77734 1.16797,10.76562 0,13.54687 0,1 0,2.00781 0,3.00781 0,17.07032 0,34.12891 0,51.19532 0.45313,3.27734 -0.92187,8.50781 0.70313,10.53515",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 115.30078,798.34766 c -1.63672,5.02343 -0.23828,13.29296 -0.70312,19.57031 3.10547,1.0664 0.008,-4.5 2.11328,-4.51563 0,-23.08593 0,-46.16797 0,-69.25781 -0.19141,-8.98047 0.0703,-17.48828 0.70312,-25.59375 0,-1.75391 0,-3.51562 0,-5.26562 -0.47265,0 -0.9375,0 -1.40625,0 -0.1289,13.30078 0.0898,31.7539 0,47.42578 -0.46093,4.02343 0.92578,10.01953 -0.70703,12.79297 0,2.00781 0,4.01562 0,6.02343 0,1.50391 0,3.01172 0,4.51953 1.65625,1.73438 0.35938,28.82032 0,14.30079",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 111.07422,683.92578 c 2.10156,-4.03125 -0.69141,-13.28906 1.41016,-17.31641 0.30468,2.46485 -0.71485,10.25391 0.70312,9.03125 0.79688,-4.66796 -1.74219,-10.44531 1.41016,-10.53906 3.57422,-0.10937 -0.30078,6.6836 2.11328,9.78516 0,-11.29297 0,-22.58203 0,-33.875 0,-6.52735 0,-13.04688 0,-19.57031 -0.26563,-18.28907 -2.0586,-34.9375 -3.52344,-51.94141 -4.33984,6.65234 -1.12109,21.38281 -2.11328,31.61328 3.34375,6.07031 4.86719,16.97266 1.41016,24.08984 0.0937,0.99219 0.10937,5.44532 -0.70704,3.01563 -0.46093,-5.53125 0.9336,-13.04297 -0.70312,-17.31641 0,7.02735 0,14.05078 0,21.07422 0,14.55469 0,29.10547 0,43.66406 0,2.75782 0,5.51954 0,8.28516",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 117.41406,686.17969 c -1.58203,4.83984 -1.46484,18.0039 -1.40625,27.10547 0.46875,0 0.9336,0 1.40625,0 0,-9.03907 0,-18.07032 0,-27.10547",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 118.11719,545.40625 c 0.39062,-1.08984 -0.82031,-3.88672 0.70703,-3.76172 0,1.25391 0,2.50781 0,3.76172 2.04687,-6.96484 -0.26563,-15.76953 -0.004,-23.33594 -0.46875,0 -0.9375,0 -1.40625,0 0.4375,7.07031 -0.88672,20.01563 0.70313,23.33594",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 123.75781,527.33984 c -2.27734,6.90235 -0.64453,18.75782 0,27.10157 0,-8.02735 0,-16.0625 0,-24.08985 0,-1.0039 0,-2.00781 0,-3.01172",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 118.82422,545.40625 c 0,4.76953 0,9.53906 0,14.30078 0,3.51172 0,7.03125 0,10.53906 1.91016,-0.53515 -0.50391,3.55469 1.41016,3.01563 -0.0859,-5.86328 0.0156,-11.52735 1.40625,-15.8125 0.63671,3.83594 -1.45313,10.58984 1.41015,12.05078 0.16016,-0.58594 0.0195,-1.48828 0.70703,-1.51172 0,-2.00391 0,-4.01172 0,-6.01953 0,-2.51172 0,-5.01953 0,-7.52734 -0.64453,-8.34375 -2.27734,-20.19922 0,-27.10157 -0.97656,-0.96875 -0.70312,-3.26953 -0.70703,-5.26953 -0.47265,0 -0.9414,0 -1.41015,0 -0.46485,7.02735 0.93359,16.05469 -0.70313,21.83203 0.36719,-7.92187 -1.25,-13.72265 -0.70703,-21.83203 -0.46875,0 -0.9375,0 -1.41016,0 -0.26172,7.56641 2.05078,16.3711 0.004,23.33594",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 124.46094,760.71094 c 0,0.5 0,1 0,1.5 -0.45703,4.27734 0.92578,10.53125 -0.70313,13.55468 0,3.00782 0,6.01954 0,9.03125 0.63282,2.08594 -1.44922,7.06641 1.40625,6.77735 1.25,-5.38281 -0.6875,-11.76172 0,-18.82031 -0.45703,-3.77735 0.92188,-9.51954 -0.70312,-12.04297",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 127.98047,829.96484 c 0,-1.0039 0,-2.00781 0,-3.01172 -0.082,-9.12109 0.0742,-17.98828 1.41015,-25.59375 -0.72265,-7.98437 1.26172,-15.60156 0,-21.83203 0.46485,-6.53125 -0.93359,-15.05078 0.70313,-20.32422 0,-3.51562 0,-7.02734 0,-10.53906 0,-1.50781 0,-3.01172 0,-4.51953 -0.23438,0 -0.46484,0 -0.70313,0 -0.38281,1.09766 0.82422,3.89453 -0.70312,3.76563 0,1.2539 0,2.51171 0,3.76562 -0.46484,6.02734 0.92969,14.04297 -0.70703,18.82031 0,1.25391 0,2.50391 0,3.76563 0.71094,18.07031 -1.41797,39.6289 -2.11328,58.71484 0,1.00391 0,2.00781 0,3.01172 1.51953,9.36328 0.96094,-3.94141 2.11328,-6.02344",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 127.98047,605.63281 c -1.625,-2.03125 -0.25,-7.26172 -0.70313,-10.54297 1.6211,2.03125 0.25,7.26172 0.70313,10.54297 z m -2.11328,-25.59765 c -0.0352,-1.99219 0.0312,-4.09766 0,-6.01954 1.67187,4.97657 0.21094,17.33985 0,6.01954 z m -7.75,5.26953 c 0,8.03125 0,16.05859 0,24.08984 0,0.50391 0,1.00391 0,1.50781 0.23437,0 0.47265,0 0.70703,0 0.46094,-5.02734 -0.92969,-12.03515 0.70312,-15.8125 1.19141,7.92188 -0.63671,-4.38281 2.11329,-3.76172 0.67578,4.04688 0.875,8.60157 0.70703,13.55079 2.08984,-2.53516 -0.6836,-10.26563 1.41015,-12.79688 1.01172,12.73828 -2.62109,28.76563 0.70313,36.88672 0.73437,-8.07031 -0.4961,-20.54297 0,-30.86719 0.58984,-4.05859 0.92187,2.26172 0.70312,3.76563 1.03516,9.18359 0.92188,19.58984 1.41016,29.35937 0.82031,-0.125 0.76172,-1.1875 0.70312,-2.25781 0,-3.51172 0,-7.02734 0,-10.53906 0,-1.75782 0,-3.51563 0,-5.26953 0.96875,-2.39844 0.69922,2.65625 0.70313,3.76562 0.0703,22.65625 -1.21094,43.86719 -0.70313,67 2.03516,-2.85937 -0.60546,-14.68359 1.41016,-15.05859 0,18.0625 0,36.1289 0,54.20312 0.23437,0 0.46875,0 0.70312,0 0,-8.03515 0,-16.0625 0,-24.09375 0,-3.51172 0,-7.02734 0,-10.53906 0.4336,-17.50391 0.28907,-31.31641 0,-48.92969 0,-0.5039 0,-1.00781 0,-1.5039 -1.26953,-22.23438 -0.65234,-46.47657 -1.41015,-69.26172 -1.70703,-0.66016 -1.56641,5.55859 -2.11328,1.5039 -1.59375,3.32422 -0.26953,16.26953 -0.70313,23.33985 -0.7539,1.08984 -1.1875,-3.875 -1.40625,-7.52735 -0.34375,-5.63281 0.26172,-12.08984 0,-17.3164 0,-0.25 0,-0.50391 0,-0.75391 -0.6875,0.0234 -0.54687,0.92578 -0.70703,1.51172 -2.86328,-1.46094 -0.77344,-8.21484 -1.41015,-12.05078 -1.39063,4.28515 -1.49219,9.94922 -1.40625,15.8125 -1.91407,0.53906 0.5,-3.55078 -1.41016,-3.01563 0,1.25782 0,2.51172 0,3.76953 -0.45703,3.52735 0.92187,9.01172 -0.70703,11.28907",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 128.6875,553.69141 c -1.16797,2.28125 -1.16797,9.7539 0,12.03906 0.63672,-2.56641 -0.39453,-7.48828 0,-12.03906",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,628.21875 c 0,-7.78516 0,-15.5625 0,-23.33984 -0.70703,-0.004 -0.83984,0.60937 -1.41016,0.7539 0,9.03125 0,18.06641 0,27.09766 1.99219,0.125 -0.58203,-4.63672 1.41016,-4.51172",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,686.17969 c 0,-0.5 0,-1.00391 0,-1.50782 -1.17187,-3.02734 -1.17187,-11.26953 0,-14.29687 0,-4.51953 0,-9.03516 0,-13.55469 -2.10156,-4.03125 0.69141,-13.28515 -1.41016,-17.3125 0.28907,17.61328 0.4336,31.42578 0,48.92969 1.16407,-0.0117 0.39454,-2.08594 1.41016,-2.25781",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.09375,732.85547 c 0.23437,0 0.47266,0 0.70703,0 0.69531,-13.83594 -0.35547,-28.72266 0,-45.92578 0,-0.2461 0,-0.5 0,-0.75 -1.01562,0.17187 -0.24609,2.24609 -1.41016,2.25781 0,3.51172 0,7.02734 0,10.53906 1.64063,9.79297 0.23829,22.83594 0.70313,33.87891",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 130.80078,604.87891 c 1.63281,-3.52735 0.24219,-10.28125 0.70313,-15.0586 0,-2.0039 0,-4.01172 0,-6.01953 0,-10.28906 0,-20.58203 0,-30.86719 1.04296,0.14453 0.64453,1.82032 0.70703,3.01563 1.64062,-9.78906 0.23437,-22.83594 0.70312,-33.87891 -0.70703,0 -1.41015,0 -2.11719,0 0.004,24.34375 0.004,48.67969 0.004,73.01953 0,3.26563 0,6.52735 0,9.78907",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 137.14062,823.19141 c 0,-1.25391 0,-2.50782 0,-3.76563 -2.125,10.52734 -1.9414,23.51953 -2.82031,35.38281 -0.23437,0 -0.46875,0 -0.70312,0 0,1.25391 0,2.50782 0,3.76172 -0.0234,0.35938 -0.0352,0.72266 -0.0508,1.08985 l 4.27734,0 c 0,-7.89063 0,-15.78125 0,-23.67188 -1.62891,-2.77344 -0.24609,-8.76953 -0.70313,-12.79687",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 134.32031,549.92187 c 0,-6.77343 0,-13.54687 0,-20.32421 0,-2.50782 0,-5.01563 0,-7.52735 -0.23437,0 -0.46875,0 -0.70312,0 0,9.28516 0,18.56641 0,27.85156 0.23437,0 0.46875,0 0.70312,0",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 137.84375,522.07031 c -0.47266,0 -0.94141,0 -1.41016,0 0.69141,10.05078 0.16797,21.39844 1.41016,30.86328 0,-10.28515 0,-20.57422 0,-30.86328",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.02344,562.71875 c -1.6211,-2.27734 -0.24219,-7.76172 -0.70313,-11.28906 0,-0.5 0,-1.00391 0,-1.50782 -0.23437,0 -0.46875,0 -0.70312,0 -0.375,7.42579 0.42578,13.60157 0.70312,20.32422 0.23828,0 0.46875,0 0.70313,0 0,-2.5039 0,-5.01562 0,-7.52734",style:"fill:#bd632b;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 70.917969,859.32422 c 0,-5.51953 0,-11.04297 0,-16.5625 0.46875,-6.77735 -0.929688,-15.55469 0.707031,-21.07813 0.0625,-4.14062 -0.933594,-10.15234 0,-14.30078 -1.203125,-9.50781 -1.460938,-20.01953 -1.40625,-30.86719 1.992188,-0.12109 -0.585938,4.64063 1.40625,4.51563 0,-1.50391 0,-3.00781 0,-4.51563 0.464844,-6.27734 -0.933594,-14.54687 0.707031,-19.57421 0,-13.04688 0,-26.09375 0,-39.14454 -1.535156,-6.82812 -1.320312,-13.72656 -1.414062,-23.33593 -1.554688,33.63672 -1.671875,62.17578 -1.40625,97.86328 0.34375,3.54687 -1.269531,1.82031 -0.707031,-0.75 -0.398438,-1.32422 0.855468,-4.42188 -0.703126,-4.51953 0.679688,15.83984 -1.753906,35 2.117188,47.42578 -1.328125,-5.04688 -1.964844,1.80859 -2.117188,3.01172 -0.777343,6.28906 -0.855468,14.0039 -0.660156,22.16797 l 3.34375,0 c 0.05078,-0.10547 0.07813,-0.23438 0.132813,-0.33594",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 116.71094,856.3125 c -1.60547,-1.04297 -0.26563,-5.23828 -0.70313,-7.52734 1.60547,1.04296 0.26172,5.24218 0.70313,7.52734 z m 9.86328,-115.17578 c 0,-4.01953 0,-8.03516 0,-12.04688 0.67969,-2.14453 1.23047,4.52344 1.40625,7.52735 0.52734,8.8789 -1.09375,17.5664 -0.70313,27.10547 -1.58984,-3.08204 -0.26953,-15.76563 -0.70312,-22.58594 z m -6.70703,118.52344 4.63672,0 c -0.008,-1.10938 -0.0117,-2.21485 -0.043,-3.34766 -1.64453,-10.78906 -0.23438,-24.83984 -0.70313,-36.88672 3.08203,9.03516 -0.25,20.30859 0.70313,31.61719 2.09375,-3.28125 -0.6875,-11.77735 1.40625,-15.05469 0,-1.00391 0,-2.00781 0,-3.01172 -0.42188,-20.77734 1.45312,-39.10156 2.11328,-58.71484 0,-1.26172 0,-2.51172 0,-3.76563 0.46484,-6.03125 -0.92969,-14.04297 0.70703,-18.82031 0,-1.25391 0,-2.51172 0,-3.76562 0,-5.51954 0,-11.04297 0,-16.5625 -1.40625,-29.2461 -3.41406,-56.03907 -2.11328,-88.07422 -0.6875,0.0156 -0.55078,0.91797 -0.70703,1.5039 -0.0156,2.55469 0.28125,14.71094 -0.70313,9.03125 0,-5.26562 0,-10.53515 0,-15.80468 0,-0.25782 0,-0.50391 0,-0.75391 -0.23437,0 -0.46875,0 -0.70312,0 -1.91406,0.53906 0.5039,-3.55078 -1.41016,-3.01172 0.82813,8.06641 -1.89844,15.39063 0.70703,21.07813 0.46094,-5.02735 -0.93359,-12.03516 0.70313,-15.8086 0,22.07813 0,44.16406 0,66.2461 2.98828,19.77343 1.10937,47.89062 0.70312,67 -0.6875,7.05859 1.25,13.4375 0,18.82031 0.004,11.79687 -3.01953,20.35937 -2.11328,33.12109 -0.32422,2.69531 0.73438,10.78906 -0.70312,9.78516 0,-7.77344 0,-15.5586 0,-23.33203 1.39843,-9.29688 -0.9336,-18.22657 1.41015,-26.35157 0,-3.01171 0,-6.02343 0,-9.03125 0.45703,-4.27734 -0.92968,-10.52734 0.70313,-13.55468 0,-0.5 0,-1 0,-1.5 0,-6.53125 0,-13.05078 0,-19.57422 -1.65235,8.01562 -0.76953,18.7539 -2.82031,26.34765 0,-5.01953 0,-10.03906 0,-15.05859 -3.51563,2.05469 -1.50391,5.38281 -3.52344,9.03516 0.46484,-5.02735 -0.92578,-12.03516 0.70703,-15.8086 0.043,2.96485 0.81641,5.14844 2.81641,6.02344 0.45312,-6.76953 -4.4375,-11.80859 -1.40625,-18.82031 0.44531,2.53125 -0.91016,6.99219 0.70312,8.28125 1,-13.23438 2.6875,-30.28906 0,-42.91016 -0.41016,1.32031 0.85156,4.42188 -0.70312,4.51563 -0.69922,-5.21094 -0.60938,-14.80078 -2.11719,-5.26953 -0.0664,-11.11719 -0.0508,-22.13672 1.41015,-31.61719 0,5.51953 0,11.04297 0,16.55859 0,1.25781 0,2.51172 0,3.76563 0.59375,2.39453 0.92969,-1.33594 0.70704,-2.25391 0,-2.76562 0,-5.52734 0,-8.28516 0.48437,-11.03125 1.13671,-19.6289 0,-33.125 0.0312,0.80469 -0.33594,1.91407 -0.70704,0.75782 -0.46484,-8.03516 0.9375,-18.06641 -0.70312,-24.84375 -0.46875,11.03906 0.9375,24.08593 -0.70703,33.875 0,2.25781 0,4.51562 0,6.77734 0.0547,6.07813 -0.21485,11.8125 -1.40625,16.55859 -0.4375,5.42969 -0.0664,8.87891 -1.41016,14.30469 0,-0.7539 0,-1.50781 0,-2.26172 -0.78125,6.19922 -1.73828,18.71485 -3.52344,26.34766 -0.45312,-3.27734 0.91797,-8.50781 -0.70312,-10.53516 0,4.26563 0,8.53125 0,12.79688 0,10.78906 0,21.57812 0,32.37109 0,13.80078 0,27.60156 0,41.40235 1.23047,-3.95704 1.05469,-9.41016 2.11328,-13.55079 1.62891,2.52735 0.24609,8.26954 0.70703,12.04688 2.07031,-1.30078 -0.66406,-7.73828 1.40625,-9.03516 0,-2.00781 0,-4.01562 0,-6.02343 0.46094,-4.02735 -0.92578,-10.01954 0.70703,-12.79297 0.0898,-15.67188 -0.1289,-34.125 0,-47.42578 -0.0586,-9.10157 -0.17578,-22.26563 1.40625,-27.10547 0,9.03515 0,18.0664 0,27.10547 0,1.75 0,3.51171 0,5.26562 1.59375,7.22656 -0.9375,16.55469 0,25.59375 -0.23437,0 -0.47265,0 -0.70312,0 0,23.08984 0,46.17188 0,69.25781 -0.6211,15.80469 -4.09375,28.56641 -2.94531,46.25782 l 0.83203,0 c 0,-3.625 0,-7.2461 0,-10.875 1.38281,-1.19532 0.66406,4.80468 0.70312,7.52734 0.0195,1.06641 0.0273,2.19141 0.0352,3.34766 l 1.58203,0 c 0.67969,-10.64063 1.51172,-21.47657 1.90625,-31.95313 1.16406,10.48047 1.62109,21.49219 1.04297,31.95313",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 113.1875,840.50391 c -1.61328,-3.79297 -2.16406,-8.72657 -2.81641,-13.55079 -1.3789,8.3125 -1.52343,17.94532 -2.8164,26.35157 0,1 0,2.0039 0,3.00781 0,1.11328 0,2.23437 0,3.34766 l 2.8164,0 c 0,-0.61329 0,-1.22657 0,-1.83985 0.125,0.59375 0.22657,1.21094 0.31641,1.83985 l 2.5,0 c 0,-2.11719 0,-4.23829 0,-6.35547 0,-4.26563 0,-8.53516 0,-12.80078",style:"fill:#d79e5c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 135.73047,683.16797 c -0.23438,0 -0.46875,0 -0.70703,0 -1.66797,4.90625 0.42187,9.32031 0,15.05859 1.63672,-3.52734 0.24609,-10.28125 0.70703,-15.05859",style:"fill:#c77f3d;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 114.59766,565.73047 c 1.52734,0.1289 0.3164,-2.66797 0.70312,-3.76172 1.625,1.78125 0.25391,6.75781 0.70703,9.78516 1.11328,-3.82422 0.84375,-9.12891 2.81641,-12.04688 0,-4.76172 0,-9.53125 0,-14.30078 0,-1.25391 0,-2.50781 0,-3.76172 -1.52734,-0.125 -0.31641,2.67188 -0.70703,3.76172 -1.58985,-3.32031 -0.26563,-16.26563 -0.70313,-23.33594 -0.23437,0 -0.47265,0 -0.70312,0 0,12.79688 0,25.59375 0,38.39063 -1.64063,-11.29297 -0.23828,-25.84375 -0.70313,-38.39063 -0.47265,0 -0.9414,0 -1.41015,0 -1.35547,13.01953 -0.91797,30.56641 0,43.66016",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 101.91797,844.26562 c 1.625,2.28125 0.24609,7.76954 0.70703,11.29688 -1.62891,-2.28125 -0.25391,-7.76563 -0.70703,-11.29688 z m 0,-11.28906 c 2.15625,8.35938 -0.86719,10.0625 0,0 z m 2.8125,19.57422 c 0,-2.01172 0,-4.01562 0,-6.02344 0.20703,-24.42968 0.47266,-48.12109 2.82422,-73.02343 0,-2.25391 0,-4.51563 0,-6.77344 -0.0742,-16.5 0.14062,-27.52344 -1.41016,-43.66016 1.73047,9.35547 1.51172,-4.73047 1.41016,-9.78515 -0.13281,-6.42188 -0.5586,-10.44141 -0.70703,-12.05079 -3.39844,26.23829 -2.73047,56.8086 -6.33594,82.8125 0,1.50391 0,3.00782 0,4.51563 -0.36719,24.15625 -1.488282,47.50781 -2.378908,71.09766 l 6.089848,0 c 0.17578,-2.36719 0.34765,-4.73047 0.50781,-7.10938",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 114.59766,665.10156 c -3.15235,0.0937 -0.61328,5.8711 -1.41016,10.53906 -1.41797,1.22266 -0.39844,-6.5664 -0.70312,-9.03125 -2.10157,4.02735 0.6914,13.28516 -1.41016,17.31641 0,6.51953 0,13.04297 0,19.57031 1.62109,2.02735 0.25,7.25782 0.70312,10.53516 1.78516,-7.63281 2.74219,-20.14844 3.52344,-26.34766 0,0.75391 0,1.50782 0,2.26172 1.34375,-5.42578 0.97266,-8.875 1.41016,-14.30469 0,-0.25 0,-0.5 0,-0.7539 -2.41406,-3.10156 1.46094,-9.89453 -2.11328,-9.78516",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 118.82422,827.70703 c -0.39453,10.47656 -1.22656,21.3125 -1.90625,31.95313 l 2.94922,0 c 0.57812,-10.46094 0.12109,-21.47266 -1.04297,-31.95313",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 120.9375,603.375 c 1.62891,2.52344 0.24609,8.26562 0.70313,12.04297 -1.62891,-2.52344 -0.24219,-8.26563 -0.70313,-12.04297 z m -1.41016,39.89844 c 0.3711,1.15625 0.73829,0.0469 0.70704,-0.75782 1.13671,13.4961 0.48437,22.09375 0,33.125 0,2.75782 0,5.51954 0,8.28516 0.22265,0.91797 -0.11329,4.64844 -0.70704,2.25391 0,-1.25391 0,-2.50782 0,-3.76563 0,-5.51562 0,-11.03906 0,-16.55859 -1.46093,9.48047 -1.47656,20.5 -1.41015,31.61719 1.50781,-9.53125 1.41797,0.0586 2.11719,5.26953 1.55468,-0.0937 0.29296,-3.19532 0.70312,-4.51563 2.6875,12.6211 1,29.67578 0,42.91016 -1.61328,-1.28906 -0.25781,-5.75 -0.70312,-8.28125 -3.03125,7.01172 1.85937,12.05078 1.40625,18.82031 -2,-0.875 -2.77344,-3.05859 -2.81641,-6.02344 -1.63281,3.77344 -0.24219,10.78125 -0.70703,15.8086 2.01953,-3.65235 0.008,-6.98047 3.52344,-9.03516 0,5.01953 0,10.03906 0,15.05859 2.05078,-7.59375 1.16796,-18.33203 2.82031,-26.34765 0,-2.01172 0,-4.01953 0,-6.02344 -1.17188,-7.78516 -1.17188,-20.82422 0,-28.60547 0,-0.25 0,-0.5039 0,-0.7539 0,-22.08204 0,-44.16797 0,-66.2461 -1.63672,3.77344 -0.24219,10.78125 -0.70313,15.8086 -2.60547,-5.6875 0.1211,-13.01172 -0.70703,-21.07813 1.91406,-0.53906 -0.5039,3.55078 1.41016,3.01172 0,-2.76563 0,-5.51953 0,-8.28125 -3.32422,-8.12109 0.30859,-24.14844 -0.70313,-36.88672 -2.09375,2.53125 0.67969,10.26172 -1.41015,12.79688 0.16797,-4.94922 -0.0312,-9.50391 -0.70703,-13.55079 -2.75,-0.62109 -0.92188,11.6836 -2.11329,3.76172 -1.63281,3.77735 -0.24218,10.78516 -0.70312,15.8125 0,2.50782 0,5.01563 0,7.52735 1.64062,6.77734 0.23828,16.80859 0.70312,24.84375",style:"fill:#e6c294;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 108.25781,774.26172 c 0,1.7539 0,3.50781 0,5.26562 -0.44922,2.78516 0.91407,7.5 -0.70312,9.03516 0,1.75391 0,3.51172 0,5.26953 0,4.26563 0,8.53125 0,12.79688 0.0742,4.75781 -0.58985,23.75 1.40625,12.79687 0.23437,0 0.47265,0 0.70703,0 0,-2.00781 0,-4.01562 0,-6.02344 0.45312,-3.02734 -0.91406,-8.0039 0.70312,-9.78515 0,-18.32032 0,-36.63672 0,-54.95313 0,-10.79297 0,-21.58203 0,-32.37109 0,-4.76563 0,-9.53516 0,-14.30078 -0.92968,0.004 -0.64453,1.32031 -1.41015,1.5039 0,0.75 0,1.5 0,2.25782 -0.46875,16.8125 0.9414,35.63281 -0.70313,51.1875 0,3.26562 0,6.52734 0,9.78906 1.16797,0.80859 1.16797,6.71484 0,7.53125",style:"fill:#a8471c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 123.75781,527.33984 c 0,1.00391 0,2.00782 0,3.01172 0.92969,0.008 0.64063,1.32031 1.40625,1.50781 0,-3.26562 0,-6.52343 0,-9.78906 -0.70312,0 -1.40625,0 -2.11328,0 0.004,2 -0.26953,4.30078 0.70703,5.26953",style:"fill:#8a2b1c;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
        end().
      end();
      @element = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','z-index':'-200','left':'2%','top':'22%'}).add(@woodplank.svg);
      return @element;
    }
  }
  class Ninja {
    constructor() {
      private element, id, leftArm, ninja, raiseSwordDuration, rightArm;
      @id = 'ninja';
      @raiseSwordDuration = '500ms';
      @ninja = svg.Svg({id:@id,width:"428pt",height:"596pt"}).
          path({d:"m 310.83594,189.77734 c 0,45.51172 -39.77344,82.40235 -88.83203,82.40235 -49.0625,0 -88.83204,-36.89063 -88.83204,-82.40235 0,-45.51172 39.76954,-82.40234 88.83204,-82.40234 49.05859,0 88.83203,36.89062 88.83203,82.40234",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          path({d:"m 303.28125,183.76953 c 0,0 -49.76172,-31.14062 -111.14063,-31.14062 -19.16015,0 -37.18359,3.03125 -52.91796,7.20312 -3.90625,9.28125 -6.05079,19.38281 -6.05079,29.94531 0,4.21875 0.34375,8.36328 1.00391,12.41016 16.875,3.98828 62.8125,5.55469 84.05078,5.55469 61.38281,0 85.05469,-23.97266 85.05469,-23.97266",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          g({id:'eyes'}).
            path({d:"m 174.65625,186.03516 c 0,5.07031 -5.61719,9.17968 -12.54688,9.17968 -6.92578,0 -12.54687,-4.10937 -12.54687,-9.17968 0,-5.07032 5.62109,-9.17969 12.54687,-9.17969 6.92969,0 12.54688,4.10937 12.54688,9.17969",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 243.29687,187.9375 c 0,5.07031 -5.61718,9.17969 -12.54687,9.17969 -6.92969,0 -12.54688,-4.10938 -12.54688,-9.17969 0,-5.07031 5.61719,-9.17969 12.54688,-9.17969 6.92969,0 12.54687,4.10938 12.54687,9.17969",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          end().
          path({d:"m 175.46875,178.08984 -20.08984,-8.08203 7.54687,-5.97265 19.89844,13.75 -7.35547,0.30468",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          path({d:"m 210.76953,178.95703 23.96094,-14.44531 8.5664,7.22265 -25.09375,8.31641 -7.43359,-1.09375",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          path({d:"m 268.62891,265.14453 c -13.90235,8.49219 -30.23438,13.38281 -47.70313,13.38281 -18.50391,0 -35.72266,-5.49218 -50.13672,-14.92578 -31.01172,13.26172 -31.01172,42.79297 -31.01172,77.08985 0,15.28125 0,32.40234 0,47.67968 0,46.70313 0,84.5586 78.27735,84.5586 78.27343,0 78.27343,-37.85547 78.27343,-84.5586 0,-15.27734 0,-32.39843 0,-47.67968 0,-33.02735 -0.008,-61.62891 -27.69921,-75.54688",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          path({d:"m 213.17187,485.82422 c 0,11.35156 -66.84765,11.35156 -66.84765,0 0,-11.35156 14.96484,-20.55078 33.42187,-20.55078 18.46094,0 33.42578,9.19922 33.42578,20.55078",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          path({d:"m 289.78125,485.82422 c 0,11.35156 -66.84766,11.35156 -66.84766,0 0,-11.35156 14.96485,-20.55078 33.42578,-20.55078 18.45704,0 33.42188,9.19922 33.42188,20.55078",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          path({id:'leftArm',d:"m 219.74219,315.99609 c -0.92578,-12.28515 23.97265,-32.1875 53.89453,-34.4414 29.92578,-2.25391 48.6914,5.23047 54.47265,26.28125 6.30079,22.95703 -26.07421,36.73437 -56,38.98828 -29.92187,2.2539 -51.4414,-18.53906 -52.36718,-30.82813",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          path({id:'rightArm',d:"m 213.44531,350.26172 c -3.91406,11.6875 -34.57812,20.375 -63.03515,10.85156 -28.45703,-9.52734 -42.84766,-23.70312 -40.01563,-45.35156 3.09375,-23.60156 38.28125,-23.7461 66.73828,-14.21875 28.45313,9.52344 40.22656,37.03125 36.3125,48.71875",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          g({id:'sword'}).
            path({d:"m 230.35547,362.66406 c -2.58594,3.38672 -7.42188,4.03516 -10.8086,1.45313 l -6,-4.57813 c -3.38671,-2.58203 -4.03515,-7.42187 -1.45312,-10.80859 L 399.86719,102.63281 c 2.58203,-3.386716 6.80468,28.94531 6.80468,28.94531 l -176.3164,231.08594",style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 283.09766,298.00781 c -0.40625,0.52344 -1.16407,0.625 -1.69141,0.21875 l -20.41016,-15.70703 c -0.52734,-0.40625 -0.625,-1.16406 -0.21875,-1.69141 l 2.79297,-3.63281 c 0.41016,-0.52734 1.16406,-0.625 1.69531,-0.21875 l 20.40625,15.70703 c 0.52735,0.40625 0.62891,1.16407 0.22266,1.69141 l -2.79687,3.63281",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 277.63281,305.10547 c -0.40625,0.52734 -1.16015,0.625 -1.6914,0.21875 l -20.41016,-15.70703 c -0.52734,-0.40235 -0.625,-1.16016 -0.21875,-1.6875 l 2.79297,-3.63282 c 0.41015,-0.52734 1.16406,-0.625 1.69531,-0.22265 l 20.41016,15.70703 c 0.52343,0.40625 0.625,1.16406 0.21875,1.69141 l -2.79688,3.63281",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 272.17187,312.20312 c -0.40625,0.52735 -1.16406,0.62891 -1.6914,0.22266 l -20.41016,-15.70703 c -0.52734,-0.40625 -0.625,-1.16406 -0.21875,-1.69141 l 2.79297,-3.63281 c 0.40625,-0.52734 1.16406,-0.625 1.69141,-0.21875 l 20.41015,15.70703 c 0.52735,0.40625 0.625,1.16406 0.21875,1.69141 l -2.79297,3.6289",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 266.70703,319.30469 c -0.40625,0.52734 -1.16406,0.625 -1.69141,0.21875 l -20.41015,-15.70703 c -0.52735,-0.40625 -0.625,-1.16407 -0.21875,-1.69141 l 2.79687,-3.63281 c 0.40235,-0.52344 1.16016,-0.625 1.6875,-0.21875 l 20.41016,15.70703 c 0.52734,0.40625 0.62891,1.16406 0.22266,1.6914 l -2.79688,3.63282",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 261.24219,326.40234 c -0.40625,0.52735 -1.16407,0.62891 -1.69141,0.22266 l -20.40625,-15.70703 c -0.53125,-0.40625 -0.62891,-1.16406 -0.22266,-1.69141 l 2.79688,-3.63281 c 0.40234,-0.52734 1.16406,-0.625 1.6875,-0.21875 l 20.41016,15.70703 c 0.53125,0.40625 0.6289,1.16016 0.22265,1.69141 l -2.79687,3.6289",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 255.77734,333.50391 c -0.40625,0.52734 -1.16015,0.6289 -1.6914,0.21875 l -20.40625,-15.70704 c -0.53125,-0.40234 -0.62891,-1.16015 -0.22266,-1.6875 l 2.79688,-3.63281 c 0.40625,-0.52734 1.16015,-0.6289 1.6875,-0.22265 l 20.41406,15.70703 c 0.52734,0.41015 0.625,1.16406 0.21875,1.6914 l -2.79688,3.63282",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 250.3125,340.60547 c -0.40625,0.52734 -1.16016,0.625 -1.69141,0.21875 l -20.40625,-15.70703 c -0.52734,-0.40625 -0.625,-1.16407 -0.22265,-1.6875 l 2.79687,-3.63282 c 0.40625,-0.53125 1.16406,-0.6289 1.69141,-0.22265 l 20.41015,15.70703 c 0.52735,0.40625 0.625,1.16406 0.21875,1.69141 l -2.79687,3.63281",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 244.85156,347.70312 c -0.40625,0.52735 -1.16406,0.62891 -1.6914,0.22266 L 222.75,332.21875 c -0.52734,-0.40625 -0.625,-1.16406 -0.21875,-1.69531 l 2.79297,-3.62891 c 0.40625,-0.52734 1.16406,-0.625 1.6914,-0.21875 l 20.41016,15.70703 c 0.52734,0.40625 0.625,1.16016 0.21875,1.6875 l -2.79297,3.63281",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 239.39062,354.80469 c -0.41015,0.52734 -1.16406,0.625 -1.69531,0.21875 l -20.41015,-15.70703 c -0.52735,-0.40625 -0.625,-1.16407 -0.21875,-1.69141 l 2.79687,-3.63281 c 0.40625,-0.52735 1.16016,-0.625 1.69141,-0.21875 l 20.40625,15.70703 c 0.52734,0.40625 0.6289,1.16406 0.22265,1.6914 l -2.79297,3.63282",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 233.92578,361.90234 c -0.41016,0.52735 -1.16406,0.62891 -1.69531,0.22266 l -20.41016,-15.71094 c -0.52344,-0.40234 -0.625,-1.16015 -0.21875,-1.6875 l 2.79688,-3.63281 c 0.40625,-0.52734 1.16406,-0.625 1.6914,-0.22266 l 20.40625,15.70703 c 0.53125,0.40625 0.62891,1.16407 0.22266,1.69141 l -2.79297,3.63281",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 228.46094,369.00391 c -0.40625,0.52734 -1.16407,0.625 -1.69141,0.21875 l -20.41016,-15.70704 c -0.52734,-0.40625 -0.6289,-1.16406 -0.21875,-1.6914 l 2.79297,-3.63281 c 0.40625,-0.52344 1.16407,-0.625 1.69141,-0.21875 l 20.40625,15.70703 c 0.53125,0.40625 0.62891,1.16406 0.22266,1.6914 l -2.79297,3.63282",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 222.99609,376.10547 c -0.40625,0.52734 -1.16406,0.625 -1.6914,0.21875 l -20.41016,-15.70703 c -0.52734,-0.40625 -0.625,-1.16407 -0.21875,-1.69141 l 2.79297,-3.62891 c 0.40625,-0.53125 1.16406,-0.6289 1.69141,-0.22265 l 20.41015,15.70703 c 0.52735,0.40625 0.625,1.16406 0.21875,1.69141 l -2.79297,3.63281",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 217.53125,383.20312 c -0.40625,0.52735 -1.16406,0.625 -1.69141,0.21875 l -20.41015,-15.70703 c -0.52735,-0.40625 -0.625,-1.16015 -0.21875,-1.6875 l 2.79687,-3.63672 c 0.40235,-0.52734 1.16016,-0.625 1.6875,-0.21484 l 20.41016,15.70703 c 0.52734,0.40235 0.625,1.16016 0.22265,1.6875 l -2.79687,3.63281",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 212.06641,390.30078 c -0.40625,0.52734 -1.16016,0.62891 -1.6875,0.22266 l -20.41016,-15.70703 c -0.53125,-0.41016 -0.625,-1.16407 -0.22266,-1.69532 l 2.79688,-3.6289 c 0.40625,-0.52735 1.16015,-0.625 1.6875,-0.21875 l 20.41406,15.70703 c 0.52734,0.40625 0.625,1.16015 0.21875,1.6875 l -2.79687,3.63281",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 206.60547,397.40234 c -0.41016,0.52735 -1.16406,0.625 -1.69141,0.21875 l -20.41015,-15.70703 c -0.52735,-0.40625 -0.625,-1.16015 -0.22266,-1.6875 l 2.79687,-3.63281 c 0.40625,-0.52734 1.16407,-0.62891 1.69141,-0.22266 l 20.41016,15.70703 c 0.52734,0.40625 0.625,1.16407 0.21875,1.69141 l -2.79297,3.63281",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 242.65625,358.73047 c 0,12.92969 -10.48047,23.41015 -23.41406,23.41015 -12.92969,0 -23.41016,-10.48046 -23.41016,-23.41015 0,-12.92969 10.48047,-23.41406 23.41016,-23.41406 12.93359,0 23.41406,10.48437 23.41406,23.41406",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            path({d:"m 274.41406,315.41016 c 0,12.92968 -10.48047,23.41406 -23.41015,23.41406 -12.9336,0 -23.41407,-10.48438 -23.41407,-23.41406 0,-12.92969 10.48047,-23.41016 23.41407,-23.41016 12.92968,0 23.41015,10.48047 23.41015,23.41016",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            animateMotion({'id':'swordmove1','xlink:href':'#sword','path':"m 0,0 l 2,2 4,-4 32,-32 64,-64",'begin':'indefinite','dur':@raiseSwordDuration,'repeatCount':"1",'rotate':"0",'fill':"freeze"}).end().
            animateTransform({'id':'swordmove2','xlink:href':'#sword','attributeName':'transform','attributeType':'XML','type':'rotate','from':'0','to':'20','begin':'indefinite','dur':@raiseSwordDuration,'additive':'replace','fill':"freeze"}).end().
            animateMotion({'id':'armmove1','xlink:href':'#rightArm','path':"m 0,0 l 0,-2 0,-4 0,-12",'begin':'indefinite','dur':@raiseSwordDuration,'repeatCount':"1",'rotate':"0",'fill':"freeze"}).end().
            animateMotion({'id':'armmove2','xlink:href':'#leftArm','path':"m 0,0 l 0,2 0,4 0,12",'begin':'indefinite','dur':@raiseSwordDuration,'repeatCount':"1",'rotate':"0",'fill':"freeze"}).end().
      end();
      monads.DOMable({element:document.body}).on('load').style({'-webkit-perspective':'1000px'});
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'ninja'}).reflect('-77%').add(@ninja.svg);
      @leftArm = @ninja.svg.getElementById('leftArm');
      @rightArm = @ninja.svg.getElementById('rightArm');
    }
    raiseSword() {
      @ninja.svg.getElementById('swordmove1').beginElement();
      @ninja.svg.getElementById('swordmove2').beginElement();
      @ninja.svg.getElementById('armmove1').beginElement();
      @ninja.svg.getElementById('armmove2').beginElement();
      @leftArm.style.webkitTransition = '-webkit-transform ' + @raiseSwordDuration;
      @leftArm.style.webkitTransformOriginX = '219';
      @leftArm.style.webkitTransformOriginY = '315';
      @leftArm.style.webkitTransform = 'rotate(10deg) translate(-10px,-10px)';
    }
    rotateSword() {
      var sword = @ninja.svg.getElementById('sword');
      var eyes = @ninja.svg.getElementById('eyes');
      sword.style.webkitTransition = '-webkit-transform 1s';
      sword.style.webkitTransformOriginX = '30%';
      sword.style.webkitTransformOriginY = '80%';
      sword.style.webkitTransform = 'rotate(90deg)';
      eyes.style.webkitTransition = '-webkit-transform 200ms';
      eyes.style.webkitTransform = 'translateX(5px)';
      @rightArm.style.webkitTransition = '-webkit-transform 1s';
      @rightArm.style.webkitTransformOriginX = '50%';
      @rightArm.style.webkitTransformOriginY = '50%';
      @rightArm.style.webkitTransform = 'rotate(-35deg)';
    }
    static init = (function() {
      var styles = [
        {selector:'.ninja',style:"position:absolute;-webkit-transform-style:preserve-3d;-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform:scale(0.6,0.6);"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Multiply {
    constructor() {
      private element, id, selected;
      @id = Math.uuid(8);
      @selected = false;
      @ontouchend = @ontouchend.bind(this);
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'multiply'}).add(
        svg.Svg({xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"200.0",height:"200.0"}).
          defs().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath2346"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath2356"}).
              path({d:"m 372.963,533.69 c 0,-31.181 -25.511,-56.693 -56.692,-56.693 l -170.078,0 c -31.182,0 -56.694,25.512 -56.694,56.693 l 0,170.079 c 0,31.181 25.512,56.693 56.694,56.693 l 170.078,0 c 31.181,0 56.692,-25.512 56.692,-56.693 l 0,-170.079"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"0.13",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4648,287.4639,0,87.499,476.9971)",id:@id+"linearGradient2368"}).
              stop({style:"stop-opacity:1;stop-color:#f1984c",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#e77724",offset:"1"}).end().
            end().
            linearGradient({x1:"0.13",y1:"0",x2:"0.23",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4648,287.4639,0,87.499,476.9971)",id:@id+"linearGradient2378"}).
              stop({style:"stop-opacity:1;stop-color:#e97825",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#e97825",offset:"1"}).end().
            end().
            linearGradient({x1:"0.23",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4648,287.4639,0,87.499,476.9971)",id:@id+"linearGradient2388"}).
              stop({style:"stop-opacity:1;stop-color:#e77724",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#f29e58",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath2400"}).
              path({d:"m 316.271,754.792 -170.077,0 c -28.137,0 -51.025,-22.889 -51.025,-51.021 l 0,-67.67 c 40.389,-11.072 86.752,-17.372 136.062,-17.372 49.308,0 95.672,6.3 136.061,17.372 l 0,67.67 c 0,28.132 -22.889,51.021 -51.021,51.021"}).end().
            end().
            radialGradient({fx:"0",fy:"0",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(136.9473,136.9473,136.9473,-136.9473,231.2305,618.7295)",id:@id+"radialGradient2412"}).
              stop({style:"stop-opacity:1;stop-color:#f29e58",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#ffffff",offset:"1"}).end().
            end().
            radialGradient({fx:"0",fy:"0",cx:"0",cy:"0",r:"0.85000002",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(136.9473,136.9473,136.9473,-136.9473,231.2305,618.7295)",id:@id+"radialGradient2422"}).
              stop({style:"stop-opacity:1;stop-color:#f4c592",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#f39f58",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath2434"}).
              path({d:"m 146.191,482.667 170.077,0 c 14.068,0 26.825,5.722 36.063,14.961 l -242.2,0 c 9.239,-9.239 21.994,-14.961 36.06,-14.961"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,-14.9614,-246.1992,0,354.3306,497.6279)",spreadMethod:"pad",id:@id+"linearGradient2446"}).
              stop({style:"stop-opacity:1;stop-color:#ed8b38",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#f6dac3",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath2458"}).
              path({d:"m 146.191,754.792 170.077,0 c 14.068,0 26.825,-5.722 36.063,-14.961 l -242.2,0 c 9.239,9.239 21.994,14.961 36.06,14.961"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,14.9609,-246.1992,0,354.3306,739.8301)",spreadMethod:"pad",id:@id+"linearGradient2470"}).
              stop({style:"stop-opacity:1;stop-color:#f29f59",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#ffffff",offset:"1"}).end().
            end().
          end().
          g({transform:"matrix(0.5,0,0,-0.5,-40.0,410.0)"}).
            g({'clip-path':"url(#"+@id+"clipPath2346)"}).
              path({d:"m 316.271,471.327 -170.078,0 c -34.388,0 -62.364,27.977 -62.364,62.365 l 0,170.077 c 0,34.385 27.976,62.361 62.364,62.361 l 170.078,0 c 34.388,0 62.363,-27.976 62.363,-62.361 l 0,-170.077 c 0,-34.388 -27.975,-62.365 -62.363,-62.365",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath2356)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient2368);stroke:none"}).end().
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient2378);stroke:none"}).end().
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient2388);stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath2400)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"radialGradient2412);stroke:none"}).end().
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"radialGradient2422);stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath2434)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient2446);stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath2458)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient2470);stroke:none"}).end().
            end().
            path({d:"m 261.297,618.729 30.066,30.066 c 8.27,8.27 8.268,21.797 0,30.066 -8.267,8.268 -21.798,8.27 -30.066,0 l -30.067,-30.066 -30.066,30.066 c -8.267,8.268 -21.797,8.268 -30.066,0 -8.268,-8.267 -8.268,-21.796 0,-30.066 L 201.164,618.729 171.1,588.664 c -8.27,-8.268 -8.268,-21.799 0,-30.066 8.267,-8.268 21.797,-8.27 30.066,0 l 30.064,30.064 30.067,-30.064 c 8.268,-8.27 21.797,-8.268 30.064,0 8.27,8.267 8.27,21.797 0,30.066 l -30.064,30.065",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          end().
        end().svg
      ).reflect('-28%');
      @element.on(['touchend','click'],this.ontouchend);
      return @element;
    }
    ontouchend(event) {
      controller.Controller.publish(events.CustomEvent({type:'play',canBubble:false,isCanceleable:true,detail:{'operation':'multiply','color':'#e97825'}}));
    }
    static init = (function() {
      var styles = [
        {selector:'.multiply',style:"opacity:0;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Plus {
    constructor() {
      private element, id, selected;
      @id = Math.uuid(8);
      @selected = false;
      this.ontouchend = this.ontouchend.bind(this);
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'plus'}).add(
        svg.Svg({xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"180.0",height:"200.0"}).
          defs().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath4800"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",id:"path4802"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath4810"}).
              path({d:"m 760.601,533.69 c 0,-31.182 -25.513,-56.693 -56.695,-56.693 l -170.078,0 c -31.181,0 -56.693,25.511 -56.693,56.693 l 0,170.078 c 0,31.182 25.512,56.694 56.693,56.694 l 170.078,0 c 31.182,0 56.695,-25.512 56.695,-56.694 l 0,-170.078",id:"path4812"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"0.13",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4653,287.4658,0,475.1348,476.9966)",id:@id+"linearGradient4822"}).
              stop({style:"stop-opacity:1;stop-color:#8fd02a",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#78bf2b",offset:"1"}).end().
            end().
            linearGradient({x1:"0.13",y1:"0",x2:"0.23",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4653,287.4658,0,475.1348,476.9966)",id:@id+"linearGradient4832"}).
              stop({style:"stop-opacity:1;stop-color:#7ac12b",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#7ac12b",offset:"1"}).end().
            end().
            linearGradient({x1:"0.23",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4653,287.4658,0,475.1348,476.9966)",id:@id+"linearGradient4842"}).
              stop({style:"stop-opacity:1;stop-color:#78bf2b",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#94d228",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath4854"}).
              path({d:"m 703.906,754.792 -170.077,0 c -28.136,0 -51.024,-22.889 -51.024,-51.022 l 0,-67.67 c 40.388,-11.071 86.752,-17.371 136.062,-17.371 49.309,0 95.672,6.3 136.062,17.371 l 0,67.67 c 0,28.133 -22.889,51.022 -51.023,51.022",id:"path4856"}).end().
            end().
            radialGradient({fx:"0",fy:"0",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(137.4286,137.4286,137.4286,-137.4286,618.8672,618.7285)",id:@id+"radialGradient4866"}).
              stop({style:"stop-opacity:1;stop-color:#97d12c",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#ffffff",offset:"1"}).end().
            end().
            radialGradient({fx:"0",fy:"0",cx:"0",cy:"0",r:"0.85000002",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(137.4286,137.4286,137.4286,-137.4286,618.8672,618.7285)",id:@id+"radialGradient4876"}).
              stop({style:"stop-opacity:1;stop-color:#a9d925",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#97d12c",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath4888"}).
              path({d:"m 533.827,482.665 170.076,0 c 14.071,0 26.826,5.723 36.064,14.962 l -242.199,0 c 9.237,-9.239 21.994,-14.962 36.059,-14.962",id:"path4890"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,-14.9614,-246.1992,0,741.9668,497.627)",spreadMethod:"pad",id:@id+"linearGradient4900"}).
              stop({style:"stop-opacity:1;stop-color:#89c82b",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#d4ea81",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath4912"}).
              path({d:"m 533.827,754.792 170.076,0 c 14.071,0 26.826,-5.723 36.064,-14.961 l -242.199,0 c 9.237,9.238 21.994,14.961 36.059,14.961",id:"path4914"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,14.9609,-246.1992,0,741.9668,739.8301)",spreadMethod:"pad",id:@id+"linearGradient4924"}).
              stop({style:"stop-opacity:1;stop-color:#97d12c",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#ffffff",offset:"1"}).end().
            end().
          end().
          g({transform:"matrix(0.5,0,0,-0.5,-233.0,408.0)"}).
            g({'clip-path':"url(#"+@id+"clipPath4800)"}).
              path({d:"m 703.906,471.327 -170.078,0 c -34.388,0 -62.363,27.976 -62.363,62.364 l 0,170.077 c 0,34.386 27.975,62.362 62.363,62.362 l 170.078,0 c 34.39,0 62.365,-27.976 62.365,-62.362 l 0,-170.077 c 0,-34.388 -27.975,-62.364 -62.365,-62.364",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none",id:"path4804"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath4810)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient4832);stroke:none",id:"path4838"}).end().
              path({d:"M 440,0 851,0 851,440 0,440 440,440 z",style:"fill:url(#"+@id+"linearGradient4842);stroke:none",id:"path4848"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath4854)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"radialGradient4866);stroke:none",id:"path4872"}).end().
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"radialGradient4876);stroke:none",id:"path4882"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath4888)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient4900);stroke:none",id:"path4906"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath4912)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient4924);stroke:none",id:"path4930"}).end().
            end().
            path({d:"m 682.646,639.988 -42.519,0 0,42.521 c 0,11.693 -9.567,21.258 -21.26,21.26 -11.693,0 -21.26,-9.567 -21.26,-21.26 l 0,-42.521 -42.519,0 c -11.694,0 -21.26,-9.567 -21.26,-21.261 0,-11.691 9.566,-21.258 21.26,-21.258 l 42.519,0 0,-42.519 c 0,-11.693 9.567,-21.26 21.26,-21.26 11.693,0 21.26,9.567 21.26,21.26 l 0,42.519 42.519,0 c 11.694,0 21.26,9.567 21.26,21.258 0,11.694 -9.566,21.261 -21.26,21.261",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none",id:"path9832"}).end().
          end().
        end().svg
      ).reflect('-28%');
      @element.on(['touchend','click'],this.ontouchend);
      return @element;
    }
    ontouchend(event) {
      controller.Controller.publish(events.CustomEvent({type:'play',canBubble:false,isCanceleable:true,detail:{'operation':'plus','color':'#78bf2b'}}));
    }
  }
  class Divide {
    constructor() {
      private element, id, selected;
      @id = Math.uuid(8);
      @selected = false;
      this.ontouchend = this.ontouchend.bind(this);
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'divide'}).add(
        svg.Svg({xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"200.0",height:"200.0"}).
          defs().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath7254"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath7264"}).
              path({d:"m 372.965,146.054 c 0,-31.181 -25.511,-56.693 -56.693,-56.693 l -170.079,0 c -31.182,0 -56.693,25.512 -56.693,56.693 l 0,170.08 c 0,31.181 25.511,56.692 56.693,56.692 l 170.079,0 c 31.182,0 56.693,-25.511 56.693,-56.692 l 0,-170.08"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"0.5",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4648,287.4653,0,87.4995,89.3613)",id:@id+"linearGradient7276"}).
              stop({style:"stop-opacity:1;stop-color:#2bb8f0",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#27a7e5",offset:"1"}).end().
            end().
            linearGradient({x1:"0.5",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4648,287.4653,0,87.4995,89.3613)",id:@id+"linearGradient7286"}).
              stop({style:"stop-opacity:1;stop-color:#27a7e5",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#2cb6ef",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath7298"}).
              path({d:"m 316.272,367.156 -170.078,0 c -28.136,0 -51.025,-22.888 -51.025,-51.02 l 0,-67.671 c 40.389,-11.072 86.753,-17.371 136.063,-17.371 49.308,0 95.672,6.299 136.062,17.371 l 0,67.671 c 0,28.132 -22.889,51.02 -51.022,51.02"}).end().
            end().
            radialGradient({fx:"0",fy:"0",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(144.9494,144.9494,144.9494,-144.9494,231.2314,231.0938)",id:@id+"radialGradient7310"}).
              stop({style:"stop-opacity:1;stop-color:#2db7ef",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#ffffff",offset:"1"}).end().
            end().
            radialGradient({fx:"0",fy:"0",cx:"0",cy:"0",r:"0.85000002",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(144.9494,144.9494,144.9494,-144.9494,231.2314,231.0938)",id:@id+"radialGradient7320"}).
              stop({style:"stop-opacity:1;stop-color:#64ccf5",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#2db7ef",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath7332"}).
              path({d:"m 146.191,95.029 170.078,0 c 14.069,0 26.825,5.722 36.063,14.961 l -242.2,0 c 9.238,-9.239 21.994,-14.961 36.059,-14.961"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,-14.9609,-246.2007,0,354.3325,109.9902)",spreadMethod:"pad",id:@id+"linearGradient7344"}).
              stop({style:"stop-opacity:1;stop-color:#2db7ef",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#b6e3f6",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath7356"}).
              path({d:"m 146.191,367.156 170.078,0 c 14.069,0 26.825,-5.721 36.063,-14.961 l -242.2,0 c 9.238,9.24 21.994,14.961 36.059,14.961",id:"path7358"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,14.9609,-246.2007,0,354.3325,352.1953)",spreadMethod:"pad",id:@id+"linearGradient7368"}).
              stop({style:"stop-opacity:1;stop-color:#35baf0",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#ffffff",offset:"1"}).end().
            end().
          end().
          g({transform:"matrix(0.5,0,0,-0.5,-40.0,215.0)"}).
            g({'clip-path':"url(#"+@id+"clipPath7254)"}).
              path({d:"m 316.272,83.69 -170.079,0 c -34.388,0 -62.363,27.977 -62.363,62.366 l 0,170.078 c 0,34.385 27.975,62.36 62.363,62.36 l 170.079,0 c 34.388,0 62.364,-27.975 62.364,-62.36 l 0,-170.078 c 0,-34.389 -27.976,-62.366 -62.364,-62.366",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath7264)"}).
              path({d:"M 0,0 400,0 400,400 0,400 0,0 z",style:"fill:url(#"+@id+"linearGradient7276);stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath7298)"}).
              path({d:"M 0,0 400,0 400,400 0,400 0,0 z",style:"fill:url(#"+@id+"radialGradient7310);stroke:none"}).end().
              path({d:"M 0,0 400,0 400,400 0,400 0,0 z",style:"fill:url(#"+@id+"radialGradient7320);stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath7332)"}).
              path({d:"M 0,0 400,0 400,400 0,400 0,0 z",style:"fill:url(#"+@id+"linearGradient7344);stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath7356)"}).
              path({d:"M 0,0 400,0 400,400 0,400 0,0 z",style:"fill:url(#"+@id+"linearGradient7368);stroke:none"}).end().
            end().
            path({d:"m 295.012,252.354 -127.559,0 c -11.693,0 -21.26,-9.569 -21.26,-21.262 0,-11.692 9.567,-21.258 21.26,-21.258 l 127.559,0 c 11.693,0 21.26,9.566 21.26,21.258 0,11.693 -9.567,21.262 -21.26,21.262 z m -63.78,21.259 c 11.741,0 21.26,9.518 21.26,21.26 0,11.742 -9.519,21.26 -21.26,21.26 -11.742,0 -21.259,-9.518 -21.259,-21.26 0,-11.742 9.517,-21.26 21.259,-21.26 z m 0,-85.039 c -11.742,0 -21.259,-9.517 -21.259,-21.259 0,-11.743 9.517,-21.26 21.259,-21.26 11.741,0 21.26,9.517 21.26,21.26 0,11.742 -9.519,21.259 -21.26,21.259",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          end().
        end().svg
      ).reflect('-28%');
      @element.on(['touchend','click'],this.ontouchend);
      return @element;
    }
    ontouchend(event) {
      controller.Controller.publish(events.CustomEvent({type:'play',canBubble:false,isCanceleable:true,detail:{'operation':'divide','color':'#27a7e5'}}));
    }
    static init = (function() {
      var styles = [
        {selector:'.divide',style:"opacity:0;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Minus {
    constructor() {
      private element, id, selected;
      @id = Math.uuid(8);
      this.ontouchend = this.ontouchend.bind(this);
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'minus'}).add(
        svg.Svg({width:"350.0",height:"270.0"}).
          defs().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath9698"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath9708"}).
              path({d:"m 760.601,146.054 c 0,-31.181 -25.513,-56.693 -56.695,-56.693 l -170.079,0 c -31.181,0 -56.693,25.512 -56.693,56.693 l 0,170.08 c 0,31.181 25.512,56.692 56.693,56.692 l 170.079,0 c 31.182,0 56.695,-25.511 56.695,-56.692 l 0,-170.08"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"0.5",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4648,287.4668,0,475.1338,89.3613)",id:@id+"linearGradient9720"}).
              stop({style:"stop-opacity:1;stop-color:#c0c4ca",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#90969d",offset:"1"}).end().
            end().
            linearGradient({x1:"0.5",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4648,287.4668,0,475.1338,89.3613)",id:@id+"linearGradient9730"}).
              stop({style:"stop-opacity:1;stop-color:#90969d",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#c0c4ca",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath9742"}).
              path({d:"m 703.906,367.156 -170.077,0 c -28.136,0 -51.025,-22.888 -51.025,-51.02 l 0,-67.671 c 40.388,-11.072 86.753,-17.371 136.063,-17.371 49.309,0 95.672,6.299 136.062,17.371 l 0,67.671 c 0,28.132 -22.889,51.02 -51.023,51.02"}).end().
            end().
            radialGradient({fx:"0",fy:"0",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(139.5044,139.5039,139.5039,-139.5044,618.8662,231.0938)",id:@id+"radialGradient9754"}).
              stop({style:"stop-opacity:1;stop-color:#b5b9bf",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#ffffff",offset:"1"}).end().
            end().
            radialGradient({fx:"0",fy:"0",cx:"0",cy:"0",r:"0.85000002",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(139.5044,139.5039,139.5039,-139.5044,618.8662,231.0938)",id:@id+"radialGradient9764"}).
              stop({style:"stop-opacity:1;stop-color:#cccfd5",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#b5b9bf",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath9776"}).
              path({d:"m 533.826,95.029 170.077,0 c 14.071,0 26.826,5.722 36.064,14.961 l -242.2,0 c 9.238,-9.239 21.994,-14.961 36.059,-14.961"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,-14.9609,-246.2002,0,741.9668,109.9902)",spreadMethod:"pad",id:@id+"linearGradient9788"}).
              stop({style:"stop-opacity:1;stop-color:#bcbfc6",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#e5e7ea",offset:"1"}).end().
            end().
            clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath9800"}).
              path({d:"m 533.826,367.156 170.077,0 c 14.071,0 26.826,-5.721 36.064,-14.961 l -242.2,0 c 9.238,9.24 21.994,14.961 36.059,14.961"}).end().
            end().
            linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,14.9609,-246.2002,0,741.9668,352.1953)",spreadMethod:"pad",id:@id+"linearGradient9812"}).
              stop({style:"stop-opacity:1;stop-color:#bcbfc6",offset:"0"}).end().
              stop({style:"stop-opacity:1;stop-color:#ffffff",offset:"1"}).end().
            end().
          end().
          g({transform:"matrix(0.5,0,0,-0.5,-230.0,215.0)"}).
            g({'clip-path':"url(#"+@id+"clipPath9698)"}).
              path({d:"m 703.906,83.69 -170.079,0 c -34.387,0 -62.363,27.977 -62.363,62.366 l 0,170.078 c 0,34.385 27.976,62.36 62.363,62.36 l 170.079,0 c 34.39,0 62.365,-27.975 62.365,-62.36 l 0,-170.078 c 0,-34.389 -27.975,-62.366 -62.365,-62.366",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath9708)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient9720);stroke:none"}).end().
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient9730);stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath9742)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"radialGradient9754);stroke:none"}).end().
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"radialGradient9764);stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath9776)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient9788);stroke:none"}).end().
            end().
            g({'clip-path':"url(#"+@id+"clipPath9800)"}).
              path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient9812);stroke:none"}).end().
            end().
            path({d:"m 703.906,231.093 c 0,-11.692 -9.566,-21.259 -21.26,-21.259 l -127.558,0 c -11.694,0 -21.26,9.567 -21.26,21.259 0,11.693 9.566,21.261 21.26,21.261 l 127.558,0 c 11.694,0 21.26,-9.568 21.26,-21.261",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
          end().
        end().svg
      ).reflect('-28%');
      @element.on(['touchend','click'],this.ontouchend);
      return @element;
    }
    ontouchend(event) {
      controller.Controller.publish(events.CustomEvent({type:'play',canBubble:false,isCanceleable:true,detail:{'operation':'minus','color':'#90969d'}}));
    }
    static init = (function() {
      var styles = [
        {selector:'.minus',style:"opacity:0;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Shuriken {
    constructor() {
      private element, id;
      @id = Math.uuid(8);
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'shuriken'}).add(
        svg.Svg({width:"300",height:"300"}).
          defs().
            linearGradient({id:@id+"linearGradient4552"}).
              stop({style:"stop-color:#ffffff;stop-opacity:1;",offset:"0"}).end().
              stop({style:"stop-color:#d3d7cf;stop-opacity:0;",offset:"1"}).end().
            end().
            linearGradient({id:@id+"linearGradient4177"}).
              stop({style:"stop-color:#babdb6;stop-opacity:1;",offset:"0"}).end().
              stop({style:"stop-color:#e5e6e4;stop-opacity:1;",offset:"1"}).end().
            end().
            linearGradient({id:@id+"linearGradient4163"}).
              stop({style:"stop-color:#ffffff;stop-opacity:1;",offset:"0"}).end().
              stop({style:"stop-color:#eeeeec;stop-opacity:0;",offset:"1"}).end().
            end().
            linearGradient({'xlink:href':"#"+@id+"linearGradient4177",id:@id+"linearGradient5330",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)",x1:"396.74554",y1:"437.18973",x2:"322.47766",y2:"240.04688"}).end().
            linearGradient({'xlink:href':"#"+@id+"linearGradient4163",id:@id+"linearGradient5332",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)",x1:"625.21875",y1:"240.0625",x2:"1548.192",y2:"777.72992"}).end().
            linearGradient({'xlink:href':"#"+@id+"linearGradient4163",id:@id+"linearGradient5334",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)",x1:"252.48438",y1:"-281.39062",x2:"716.39062",y2:"507.23886"}).end().
            linearGradient({'xlink:href':"#"+@id+"linearGradient4552",id:@id+"linearGradient5336",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)",x1:"-268.96875",y1:"236.125",x2:"605.43304",y2:"758.07812"}).end().
            linearGradient({'xlink:href':"#"+@id+"linearGradient4552",id:@id+"linearGradient5338",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)",x1:"248.54688",y1:"632.85492",x2:"749.59601",y2:"1218.5692"}).end().
            radialGradient({'xlink:href':"#"+@id+"linearGradient4163",id:@id+"radialGradient5340",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0.7958377,-0.2784745,0.1580768,0.4517593,1058.1559,-338.02663)",cx:"267.10895",cy:"215.25221",fx:"267.10895",fy:"215.25221",r:"619.9375"}).end().
          end().
          g({transform:"scale(0.1)"}).
            g({transform:"matrix(0.691503,0,0,0.691503,-508.97387,527.98551)"}).
              path({d:"m 1574.9402,-707.53971 c -159.2801,40.82371 -228.4775,187.52906 -255.7526,289.32098 l -19.5297,-5.233 c -11.5978,40.3736 -38.0976,74.29691 -71.498,94.65785 -34.6005,19.31747 -77.7298,25.61712 -119.0265,15.34145 l -4.0844,15.24352 c -116.45471,67.2351 -187.57861,44.31079 -341.47901,-61.21716 40.8237,159.28014 187.5593,228.48568 289.35111,255.76068 l -5.2329,19.5298 c 40.5456,11.647 74.5567,38.314 94.9009,71.919 19.1328,34.5154 25.3314,77.4801 15.0984,118.6054 l 15.2435,4.0845 c 67.2352,116.4546 44.2887,187.5403 -61.2392,341.4406 159.2801,-40.8236 228.5076,-187.5209 255.7828,-289.3129 l 19.4996,5.2249 c 11.5975,-40.3735 38.0975,-74.2969 71.498,-94.6578 34.6003,-19.3175 77.7296,-25.6171 119.0262,-15.3415 l 4.0845,-15.2435 c 116.4546,-67.2351 187.5786,-44.3108 341.4791,61.2172 -40.8238,-159.2802 -187.5593,-228.4856 -289.3512,-255.7607 l 5.233,-19.5298 c -40.5455,-11.64704 -74.5567,-38.31401 -94.901,-71.919 -19.1327,-34.51542 -25.3314,-77.48008 -15.0984,-118.60538 l -15.2133,-4.0764 c -67.2351,-116.4546 -44.3188,-187.54846 61.2091,-341.44874 z m -207.5742,489.97117 c 49.5515,13.27731 78.994,64.27315 65.7166,113.82475 -13.2773,49.5516 -64.273,78.9941 -113.8247,65.7167 -49.5515,-13.2773 -78.9941,-64.2731 -65.7167,-113.8247 13.2774,-49.55162 64.2731,-78.99406 113.8248,-65.71675 z",style:"fill:#888a85;fill-opacity:1;stroke:none"}).end().
              path({d:"m 1573.1288,-713.53422 c -159.2801,40.82372 -228.4775,187.52907 -255.7526,289.32098 l -19.5297,-5.23299 c -11.5976,40.3736 -38.0976,74.2969 -71.498,94.65784 -34.6005,19.31748 -77.7297,25.61713 -119.0265,15.34146 l -4.0843,15.24351 c -116.45481,67.2351 -187.57871,44.31079 -341.47911,-61.21716 40.8238,159.28015 187.5593,228.48559 289.35121,255.76069 l -5.233,19.5298 c 40.5455,11.647 74.5567,38.314 94.9009,71.919 19.1329,34.5154 25.3314,77.48 15.0985,118.6053 l 15.2434,4.0845 c 67.2352,116.4547 44.2887,187.5404 -61.2392,341.4407 159.2802,-40.8237 228.5077,-187.521 255.7828,-289.3129 l 19.4996,5.2249 c 11.5976,-40.3736 38.0974,-74.2969 71.4979,-94.6578 34.6006,-19.3175 77.7297,-25.6172 119.0264,-15.3415 l 4.0845,-15.2435 c 116.4546,-67.2351 187.5787,-44.3108 341.4789,61.2171 -40.8238,-159.2802 -187.5592,-228.4856 -289.3512,-255.7606 l 5.233,-19.5298 c -40.5455,-11.64704 -74.5567,-38.31401 -94.9008,-71.91901 -19.1329,-34.51541 -25.3314,-77.48008 -15.0984,-118.60537 l -15.2134,-4.0764 c -67.2351,-116.45461 -44.3189,-187.54846 61.2091,-341.44875 z m -207.5743,489.97117 c 49.5516,13.27731 78.9941,64.27316 65.7169,113.82476 -13.2774,49.5515 -64.2732,78.994 -113.8249,65.7167 -49.5515,-13.2773 -78.9939,-64.2731 -65.7167,-113.8247 13.2774,-49.55163 64.2732,-78.99407 113.8247,-65.71676 z",style:"fill:url(#"+@id+"linearGradient5330);fill-opacity:1;stroke:#babdb6;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"}).end().
              path({d:"m 1631.8993,-157.95489 c 11.8044,37.6214 64.0773,32.4922 123.3886,68.7142 76.8807,46.9517 123.4684,96.6065 141.1959,154.2695 -61.5008,-40.3956 -83.7513,-57.7925 -157.3515,-75.744 -72.9102,-17.7666 -148.3316,3.6106 -158.7483,46.9502 116.0881,-66.7968 187.2391,-43.7701 340.8665,61.5707 -40.8238,-159.2802 -187.5592,-228.4856 -289.3512,-255.7606 z",style:"fill:url(#"+@id+"linearGradient5332);fill-opacity:1;stroke:#babdb6;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"}).end().
              path({d:"m 1317.3571,-424.20219 c 37.6214,-11.8044 32.4923,-64.07727 68.7142,-123.38857 46.9517,-76.88063 96.6065,-123.46841 154.2696,-141.19574 -40.3957,61.50064 -57.7926,83.75113 -75.7441,157.35139 -17.7665,72.9103 3.6106,148.33171 46.9503,158.74831 -66.7968,-116.08808 -43.7701,-187.23908 61.5707,-340.86655 -159.2803,40.8238 -228.4856,187.55925 -255.7607,289.35116 z",style:"fill:url(#"+@id+"linearGradient5334);fill-opacity:1;stroke:#babdb6;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"}).end().
              path({d:"m 1051.1098,-109.65989 c -11.8044,-37.6214 -64.07721,-32.4923 -123.38851,-68.7142 -76.8807,-46.9517 -123.4685,-96.60658 -141.1958,-154.26951 61.5006,40.39557 83.7511,57.79245 157.3514,75.74394 72.91041,17.76662 148.33181,-3.61062 158.74841,-46.9502 -116.08821,66.7968 -187.23921,43.77015 -340.86671,-61.57072 40.8239,159.28021 187.5593,228.48559 289.35121,255.76069 z",style:"fill:url(#"+@id+"linearGradient5336);fill-opacity:1;stroke:#babdb6;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"}).end().
              path({d:"m 1365.652,156.58741 c -37.6212,11.8044 -32.4921,64.0772 -68.714,123.3885 -46.9517,76.8807 -96.6066,123.4684 -154.2696,141.1958 40.3955,-61.5007 57.7925,-83.7512 75.744,-157.3514 17.7666,-72.9103 -3.6107,-148.3317 -46.9503,-158.7483 66.7969,116.0881 43.7702,187.2391 -61.5707,340.8665 159.2802,-40.8238 228.4857,-187.5592 255.7606,-289.3511 z",style:"fill:url(#"+@id+"linearGradient5338);fill-opacity:1;stroke:#babdb6;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"}).end().
              path({style:"opacity:0.92237441;fill:url(#"+@id+"radialGradient5340);fill-opacity:1;stroke:none",d:"m 1573.1288,-713.53422 c -159.2801,40.82372 -228.4775,187.52907 -255.7526,289.32098 l -19.5297,-5.23299 c -11.5976,40.3736 -38.0976,74.2969 -71.498,94.65784 -34.6005,19.31748 -77.7297,25.61713 -119.0265,15.34146 l -4.0843,15.24351 c -116.45481,67.2351 -187.57871,44.31079 -341.47911,-61.21716 40.8238,159.28015 187.5593,228.48559 289.35121,255.76069 l -5.233,19.5298 c 40.5455,11.647 74.5567,38.314 94.9009,71.919 19.1329,34.5154 25.3314,77.48 15.0985,118.6053 l 15.2434,4.0845 c 67.2352,116.4547 44.2887,187.5404 -61.2392,341.4407 159.2802,-40.8237 228.5077,-187.521 255.7828,-289.3129 l 19.4996,5.2249 c 11.5976,-40.3736 38.0974,-74.2969 71.4979,-94.6578 34.6006,-19.3175 77.7297,-25.6172 119.0264,-15.3415 l 4.0845,-15.2435 c 116.4546,-67.2351 187.5787,-44.3108 341.4789,61.2171 -40.8238,-159.2802 -265.6842,-199.557 -367.4762,-226.832 l 83.358,-48.4584 c -40.5455,-11.64704 -74.5567,-38.31401 -94.9008,-71.91901 -19.1329,-34.51541 -25.3314,-77.48008 -15.0984,-118.60537 l -15.2134,-4.0764 c -67.2351,-116.45461 -44.3189,-187.54846 61.2091,-341.44875 z m -207.5743,489.97117 c 49.5516,13.27731 78.9941,64.27316 65.7169,113.82476 -13.2774,49.5515 -64.2732,78.994 -113.8249,65.7167 -49.5515,-13.2773 -78.9939,-64.2731 -65.7167,-113.8247 13.2774,-49.55163 64.2732,-78.99407 113.8247,-65.71676 z"}).end().
            end().
          end().
        end().svg
      );
      return @element;
    }
    static init = (function() {
      var styles = [
        {selector:'@-webkit-keyframes shurikenspin',style:"from {-webkit-transform:rotate(0deg);} to {-webkit-transform:rotate(360deg);}"},
        {selector:'.shuriken',style:"position:absolute;top:4%;left:24%;-webkit-transform-origin-x:42px;-webkit-transform-origin-y:44px;-webkit-animation:shurikenspin 1500ms linear infinite;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
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
      private board, bestGuess, container, checker, color, difficulty, difficultyChoice, equation, frame, levels, ninja, operation, problems, play, screens, shuriken, sparkles, title;
      this.ontouchstart = this.ontouchstart.bind(this);
      this.ontouchmove = this.ontouchmove.bind(this);
      this.ontouchend = this.ontouchend.bind(this);
      this.onguess = this.onguess.bind(this);
      this.onnext = this.onnext.bind(this);
      this.onplay = this.onplay.bind(this);
      this.onlevel = this.onlevel.bind(this);
      this.ondifficulty = this.ondifficulty.bind(this);
      controller.Controller.subscribe('guess',@onguess);
      controller.Controller.subscribe('next',@onnext);
      controller.Controller.subscribe('play',@onplay);
      controller.Controller.subscribe('difficulty',@ondifficulty);
      controller.Controller.subscribe('level',@onlevel);
      @bestGuess = '?';
      @screens = Container({front:Levels()}).showFront();
      @levels = Levels();
      @difficultyChoice = 'easy';
      @title = Title();
//      @checker = Checker();
      @difficulty = Difficulty();
      @play = Play();
      @problems = [];
      @shuriken = Shuriken();
      @ninja = Ninja();
      @board = WoodPlank();
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
      var plus = Plus(), minus, multiply, divide;
      switch(event.detail) {
        case "1":
          minus = Minus();
          @screens.right.add(plus).add(minus);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(73%)','opacity':'1'})},500);
          @ninja.rotateSword();
          break;
        case "2":
          minus = Minus();
          @screens.right.add(plus).add(minus);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(73%)','opacity':'1'})},500);
          @ninja.raiseSword();
          break;
        case "3":
          minus = Minus();
          multiply = Multiply();
          @screens.right.add(plus).add(minus).add(multiply);
          setTimeout(function(){minus.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(73%)','opacity':'1'})},500);
          setTimeout(function(){multiply.style({'-webkit-transition':'-webkit-transform 1s, opacity 1s','-webkit-transform':'translateX(150%)','opacity':'1'})},1000);
          @ninja.raiseSword();
          break;
        case "4":
        default:
          minus = Minus();
          multiply = Multiply();
          divide = Divide();
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
      @color = event.detail.color, @operation = event.detail.operation;
      @title.style({'-webkit-transform':'translateX(-150px) translateY(-120px) rotateY(-230deg) rotateX(76deg)'});
      @play.style({'-webkit-transform':'translateX(-1000px) translateY(-350px) rotateY(130deg) rotateX(-106deg) scale(3.0)'});
      @sparkles = Sparkles();
      @equation = Equation({operation:@operation,difficultyChoice:@difficultyChoice,color:@color});
      @screens.back.add(@equation.instance.element);
      @screens.showBack();
      @problems.push(@equation);
      VerticalNumberStrip().insert(document.body);
      @board.insert(document.body);
      Next({color:@color});
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
      var guess = @equation.guess();
      var correct = answer === guess;
      var x = document.documentElement.clientWidth/2;
      var y = document.documentElement.clientHeight/3;
      correct && @sparkles.addSparkles(Math.random()*200+100|0, x, y, 2);
      @checker.answer(correct);
      @equation.instance.element.remove();
      @equation = Equation({operation:@operation,difficultyChoice:@difficultyChoice,color:@color});
      @equation.instance.element.insert(document.body);
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
