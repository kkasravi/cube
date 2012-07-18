module cube {
  module log from 'log';
  module monads from 'monads';
  module controller from 'controller';
  module events from 'events';
  module svg from 'svg';
  module carousel from 'numbers';

  class ProgressBar {
    constructor(properties={time:5}) {
      private element, div, time;
      @onend = @onend.bind(this);
      @time = properties.time;
      @div = monads.DOMable({tagName:'div'}).on('load');
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'progressbar'}).add(
         div.element()
      ).insert(document.body);
    }
    start() {
      @div.animation({property:'progress',time:@time+'s',count:'infinite'});
      @div.element().addEventListener('webkitAnimationIteration',this.onend);
    }
    onend() {
      controller.Controller.publish(events.CustomEvent({type:'timeout',canBubble:false,isCanceleable:true}));
    }
    static init = (function() {
      var styles = [
        {selector:'#progressbar',style:"margin-top:15px;margin-left:35%;width:20%;background-color:transparent;border-radius:13px;padding:3px;"},
        {selector:'#progressbar div',style:"background-color:orange;width:90%;height:20px;border-radius:10px;"},
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
      @sections.element.style({'font-family':'Bender','color':properties.color}).textShadow(Main.shadow);
      monads.Styleable([{selector:'.sections > .section > .carousel > .field',style:"color:"+properties.color+";"}]).on("load").onstyle();
      @sections.sections[4].element.on(['touchend','click'],this.onnext);
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
    guess() {
      return parseInt(@instance.sections[4].carousel.children[@guessindex].text());
    }
    get equation() {
      var operand1, operand2, answer, guess, guesses=[];
      switch(@operation) {
        case 'minus':
          operand1=Math.round(Math.random()*100); 
          operand2=operand1+Math.round(Math.random()*100);
          answer = operand2 - operand1;
          guesses.push(answer+'');
          guess = answer+Math.round(Math.random()*10);
          guesses.push(guess+'');
          guess = answer-Math.round(Math.random()*10);
          guesses.push(guess+'');
          guesses.sort();
          @instance = carousel.Sections({sets:[[operand2+'',' ',' ',' '],['\\u002D','\\u002D','\\u002D'],[operand1+'',' ',' ',' '],['\\u003D','\\u003D'],guesses]});
          break;
        case 'multiply':
          operand1=Math.round(Math.random()*12); 
          operand2=Math.round(Math.random()*12);
          answer = operand2 * operand1;
          guesses.push(answer+'');
          guess = answer-Math.round(Math.random()*10);
          guesses.push(guess+'');
          guess = answer+Math.round(Math.random()*10);
          guesses.push(guess+'');
          guesses.sort();
          @instance = carousel.Sections({sets:[[operand2+'','1','1','1'],['\\u00D7','\\u00D7','\\u00D7'],[operand1+'','1','1','1'],['\\u003D','\\u003D'],guesses]});
          break;
        case 'divide':
          @instance = carousel.Sections({sets:[[,'4','9','1'],['\\u00F7','\\u00F7','\\u00F7'],['3','8','3','9'],['\\u003D','\\u003D'],['8','10','6']]});
          break;
        case 'plus':
          operand1=Math.round(Math.random()*100); 
          operand2=Math.round(Math.random()*100);
          answer = operand2 + operand1;
          guesses.push(answer+'');
          guess = answer+Math.round(Math.random()*10);
          guesses.push(guess+'');
          guess = answer-Math.round(Math.random()*10);
          guesses.push(guess+'');
          guesses.sort();
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
        {selector:'.sections > .section',style:"border:0;width:180px;"},
        {selector:'.sections > .section > .carousel > .field',style:"font-size:8em;background:rgba(0,0,0,0);border:0;width:auto;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Title {
    constructor() {
      private title;
      @title = monads.DOMable({tagName:'div'}).on('load').style({'white-space':'nowrap','height':'100px','width':'420px','color':'#e97825','font-family':'Bender','font-size':'80px','-webkit-transform':'translateX(-220px) translateY(-120px) rotateY(-230deg) rotateX(76deg)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text('Ninja Math');
      @title.delay(@title.style,[{'-webkit-transform':'translateX(-220px) translateY(-120px) rotateY(-230deg) rotateX(0deg)'}],300);
      return @title;
    }
  }
  class Checker {
    constructor() {
      private wrong, right, wrongAnswers, rightAnswers;
      @wrongAnswers = 0;
      @wrong = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','right':'50px','white-space':'nowrap','height':'100px','width':'100px','color':'transparent','font-family':'Bender','font-size':'50px','-webkit-transform':'translateY(1%)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text('  \\u2718').insert(document.body);
      @rightAnswers = 0;
      @right = monads.DOMable({tagName:'div'}).on('load').style({'position':'absolute','right':'150px','white-space':'nowrap','height':'100px','width':'100px','color':'transparent','font-family':'Bender','font-size':'50px','-webkit-transform':'translateY(1%)','-webkit-transition':'-webkit-transform 400ms linear'}).textShadow(Main.shadow).text('  \\u2714').insert(document.body);
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
      @play = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transition':'-webkit-transform 400ms linear','-webkit-transform':'translateX(-1000px) translateY(-350px) rotateY(130deg) rotateX(-106deg) rotateZ(0deg) scale(3.0)','white-space':'nowrap','height':'60px','width':'60px','color':'#e97825','font-family':'Bender','font-size':'60px'}).textShadow(Main.shadow).text('\\u2794');
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
  class Difficulty {
    constructor() {
      private difficulty, easy, easyarrow, hard, hardarrow;
      this.oneasy = this.oneasy.bind(this);
      this.onhard = this.onhard.bind(this);
      @easy = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(0px) translateY(0px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Bender','font-size':'60px'}).textShadow(Main.shadow).text('Easy').on(['click','touchend'],this.oneasy);
      @hard = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(220px) translateY(0px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Bender','font-size':'60px'}).textShadow(Main.shadow).text('Hard').on(['click','touchend'],this.onhard);
      @easyarrow =  monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(-60px) translateY(-10px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Bender','font-size':'60px'}).textShadow(Main.shadow).text('\\u2794');
      @hardarrow =  monads.DOMable({tagName:'div'}).on('load').style({'display':'none','-webkit-transform':'translateX(160px) translateY(-10px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Bender','font-size':'60px'}).textShadow(Main.shadow).text('\\u2794');
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
    constructor() {
      private element, next;
      this.onnext = this.onnext.bind(this);
      @next = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(0px) translateY(0px) rotateY(0deg)','white-space':'nowrap','height':'100px','color':'#78bf2b','font-family':'Bender','font-size':'8em'}).textShadow(Main.shadow).text('\\u2794').on(['click','touchend'],this.onnext);
      @element = monads.DOMable({tagName:'div'}).on('load').style({'-webkit-transform':'translateX(60%) translateY(30px)','-webkit-transition':'-webkit-transform 400ms linear'}).add(
        @next
      ).insert(document.body);
      @next.on(['touchend','click'],this.onnext);
    }
    onnext(event) {
      controller.Controller.publish(events.CustomEvent({type:'next',canBubble:false,isCanceleable:true}));
    }
  }
  class Multiply {
    constructor() {
      private element, id, selected;
      @id = Math.uuid(8);
      @selected = false;
      @onchoose = @onchoose.bind(this);
      @ontouchend = @ontouchend.bind(this);
      controller.Controller.subscribe('choose',this.onchoose);
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
          g({transform:"matrix(0.5,0,0,-0.5,-10.0,400.0)"}).
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
      );
      @element.on(['touchend','click'],this.ontouchend);
      return @element;
    }
    onchoose(event) {
      var choice = event.detail.operation;
      if(choice === 'multiply') {
        if(!@selected) {
          @selected = true;
          @element.styleProperty('webKitTransform');
          @element.style({'webkitTransform':@element.styleProperty('webkitTransform')+' translateZ(-50px) translateX(-40px) translateY(10px) scale(1.2) rotateY(40deg)'});
        }
      } else {
        @selected = false;
        @element.style({'-webkit-transform':'translateX(-50px) rotateY(-90deg)'});
      }
    }
    ontouchend(event) {
      controller.Controller.publish(events.CustomEvent({type:'choose',canBubble:false,isCanceleable:true,detail:{'operation':'multiply','color':'#e97825'}}));
    }
    static init = (function() {
      var styles = [
        {selector:'.inner .multiply',style:"-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform:translateX(-50px) rotateY(-90deg);left:100px;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Plus {
    constructor() {
      private element, id, selected;
      @id = Math.uuid(8);
      @selected = false;
      this.onchoose = this.onchoose.bind(this);
      this.ontouchend = this.ontouchend.bind(this);
      controller.Controller.subscribe('choose',this.onchoose);
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
      );
      @element.on(['touchend','click'],this.ontouchend);
      return @element;
    }
    onchoose(event) {
      var choice = event.detail.operation;
      if(choice === 'plus') {
        if(!@selected) {
          @selected = true;
          @element.styleProperty('webKitTransform');
          @element.style({'webkitTransform':@element.styleProperty('webkitTransform')+' translateY(10px) scale(1.2) rotateY(40deg)'});
        }
      } else {
        @selected = false;
        @element.style({'-webkit-transform':'rotateY(90deg) translateX(206px) translateZ(300px)'});
      }
    }
    ontouchend(event) {
      controller.Controller.publish(events.CustomEvent({type:'choose',canBubble:false,isCanceleable:true,detail:{'operation':'plus','color':'#78bf2b'}}));
    }
    static init = (function() {
      var styles = [
        {selector:'.inner .plus',style:"-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform: rotateY(90deg) translateX(206px) translateZ(300px);left:-400px;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Divide {
    constructor() {
      private element, id, selected;
      @id = Math.uuid(8);
      @selected = false;
      this.onchoose = this.onchoose.bind(this);
      this.ontouchend = this.ontouchend.bind(this);
      controller.Controller.subscribe('choose',this.onchoose);
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
          g({transform:"matrix(0.5,0,0,-0.5,-10.0,210.0)"}).
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
      );
      @element.on(['touchend','click'],this.ontouchend);
      return @element;
    }
    onchoose(event) {
      var choice = event.detail.operation;
      if(choice === 'divide') {
        if(!@selected) {
          @selected = true;
          @element.styleProperty('webKitTransform');
          @element.style({'webkitTransform':@element.styleProperty('webkitTransform')+' translateZ(40px) translateX(-30px) translateY(10px) scale(1.2) rotateY(-40deg)'});
        }
      } else {
        @selected = false;
        @element.style({'-webkit-transform':'rotateY(165deg) translateX(40px) translateZ(80px)'});
      }
    }
    ontouchend(event) {
      controller.Controller.publish(events.CustomEvent({type:'choose',canBubble:false,isCanceleable:true,detail:{'operation':'divide','color':'#27a7e5'}}));
    }
    static init = (function() {
      var styles = [
        {selector:'.inner .divide',style:"-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform:rotateY(165deg) translateX(40px) translateZ(80px);"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Minus {
    constructor() {
      private element, id, selected;
      @id = Math.uuid(8);
      this.onchoose = this.onchoose.bind(this);
      this.ontouchend = this.ontouchend.bind(this);
      controller.Controller.subscribe('choose',this.onchoose);
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
          g({transform:"matrix(0.5,0,0,-0.5,-220.0,220.0)"}).
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
      );
      @element.on(['touchend','click'],this.ontouchend);
      return @element;
    }
    onchoose(event) {
      var choice = event.detail.operation;
      if(choice === 'minus') {
        if(!@selected) {
          @selected = true;
          @element.styleProperty('webKitTransform');
          @element.style({'webkitTransform':@element.styleProperty('webkitTransform')+' translateZ(-10px) translateX(40px) translateY(10px) scale(1.2) rotateY(-50deg)'});
        }
      } else {
        @selected = false;
        @element.style({'-webkit-transform':'translateX(120px) translateY(-10px) translateZ(100px)'});
      }
    }
    ontouchend(event) {
      controller.Controller.publish(events.CustomEvent({type:'choose',canBubble:false,isCanceleable:true,detail:{'operation':'minus','color':'#90969d'}}));
    }
    static init = (function() {
      var styles = [
        {selector:'.inner .minus',style:"-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform:translateX(120px) translateY(-10px) translateZ(100px);"}
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
  class Main {
    constructor() {
      private container, checker, color, difficulty, divide, frame, level, minus, multiply, equation, operation, problems, play, plus, shuriken, title;
      this.ontouchstart = this.ontouchstart.bind(this);
      this.ontouchmove = this.ontouchmove.bind(this);
      this.ontouchend = this.ontouchend.bind(this);
      this.ontimeout = this.ontimeout.bind(this);
      this.onplay = this.onplay.bind(this);
      this.ondifficulty = this.ondifficulty.bind(this);
      controller.Controller.subscribe('timeout',this.ontimeout);
      controller.Controller.subscribe('play',this.onplay);
      controller.Controller.subscribe('difficulty',this.ondifficulty);
      @level = 'easy';
      @title = Title();
      @checker = Checker();
      @difficulty = Difficulty();
      @minus = Minus();
      @play = Play();
      @plus = Plus();
      @problems = [];
      @divide = Divide();
      @multiply = Multiply();
      @shuriken = Shuriken();
      @frame = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'frame'}).add(
        monads.DOMable({tagName:'div'}).on('load').attributes({'class':'inner'}).add(
          @title
        ).add(
          @play
        ).add(
          @multiply
        ).add(
          @plus
        ).add(
          @divide
        ).add(
          @minus
        ).add(
          monads.DOMable({tagName:'div'}).on('load').attributes({'class':'e'})
        ).add(
          monads.DOMable({tagName:'div'}).on('load').attributes({'class':'f'})
        ).add(
          @difficulty
        )
      );
      @container = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'container'}).add(@frame).insert(document.body);
//      @shuriken.insert(document.body);
      monads.DOMable({element:document.body}).on('touchstart',this.ontouchstart).on('touchmove',this.ontouchmove).on(['touchend','click'],this.ontouchend);
    }
    ondifficulty(event) {
      @level = event.detail;
    }
    onplay(event) {
      @color = event.detail.color, @operation = event.detail.operation;
      @title.style({'-webkit-transform':'translateX(-150px) translateY(-120px) rotateY(-230deg) rotateX(76deg)'});
      @play.style({'-webkit-transform':'translateX(-1000px) translateY(-350px) rotateY(130deg) rotateX(-106deg) scale(3.0)'});
      @minus.style({'-webkit-transform':'rotateY(49deg) translateX(120px) translateY(-10px) translateZ(100px)'});
      @multiply.style({'-webkit-transform':' translateX(-50px) rotateY(-137deg)'});
      @divide.style({'-webkit-transform':'rotateY(213deg) translateX(40px) translateZ(80px)'});
      @plus.style({'-webkit-transform':'rotateY(90deg) translateX(206px) translateZ(300px) rotateY(-70.5deg)'});
      @difficulty.style({'-webkit-transform':'translateX(30px) translateY(230px) rotateY(-230deg) rotateX(110deg)'});
      ProgressBar({time:@level==='easy'?8:5}).start();
      @equation = Equation({operation:@operation,level:@level,color:@color});
      @equation.instance.element.insert(document.body);
      @problems.push(@equation);
    }
    ontimeout(event) {
      var answer = @equation.answer();
      var guess = @equation.guess();
      @checker.answer(answer === guess);
//      @equation.clear();
      @equation.instance.element.remove();
      @equation = Equation({operation:@operation,level:@level,color:@color});
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
        {selector:'@font-face',style:'font-family:Bender;src:url(/cube/lib/Bender-Solid.otf);'},
        {selector:'body',style:"background:-webkit-gradient(radial, 48% 30%, 0, 48% 30%, 350, from(rgba(0,0,255,0)), to(rgba(0,0,0,1)));margin:0;padding:0;"},
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
  export const App = AppType();
}
