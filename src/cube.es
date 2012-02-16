module cube {
  module log from 'log';
  module monads from 'monads';
  module controller from 'controller';
  module events from 'events';
  module svg from 'svg';

  class Main {
    constructor() {
      private container, id;
      this.ontouchstart = this.ontouchstart.bind(this);
      this.ontouchmove = this.ontouchmove.bind(this);
      this.ontouchend = this.ontouchend.bind(this);
      @id = Math.uuid(8);
      @container = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'container'}).add(
        monads.DOMable({tagName:'div'}).on('load').attributes({'id':'frame'}).add(
          monads.DOMable({tagName:'div'}).on('load').attributes({'class':'inner'}).add(
            monads.DOMable({tagName:'div'}).on('load').attributes({'class':'a'}).add(
              svg.Svg({xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"775.0",height:"775.0"}).
              defs().
               clipPath({id:@id+"clipPath2356"}).
                 path({d:"m 372.963,533.69 c 0,-31.181 -25.511,-56.693 -56.692,-56.693 l -170.078,0 c -31.182,0 -56.694,25.512 -56.694,56.693 l 0,170.079 c 0,31.181 25.512,56.693 56.694,56.693 l 170.078,0 c 31.181,0 56.692,-25.512 56.692,-56.693 l 0,-170.079",id:"path2358"}).end().
               end().
               linearGradient({x1:"0",y1:"0",x2:"0.13",y2:"0",id:@id+"linearGradient2368",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,283.4648,287.4639,0,87.499,476.9971)"}).
                 stop({style:"stop-color:#f1984c;stop-opacity:1",offset:"0"}).end().
                 stop({style:"stop-color:#e77724;stop-opacity:1",offset:"1"}).end().
               end().
               clipPath({id:@id+"clipPath2400"}).
                 path({d:"m 316.271,754.792 -170.077,0 c -28.137,0 -51.025,-22.889 -51.025,-51.021 l 0,-67.67 c 40.389,-11.072 86.752,-17.372 136.062,-17.372 49.308,0 95.672,6.3 136.061,17.372 l 0,67.67 c 0,28.132 -22.889,51.021 -51.021,51.021",id:"path2402"}).end().
               end().
               radialGradient({cx:"0",cy:"0",r:"1",fx:"0",fy:"0",id:@id+"radialGradient2412",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(136.9473,136.9473,136.9473,-136.9473,231.2305,618.7295)"}).
                 stop({style:"stop-color:#f29e58;stop-opacity:1",offset:"0"}).end().
                 stop({style:"stop-color:#ffffff;stop-opacity:1",offset:"1"}).end().
               end().
               radialGradient({cx:"0",cy:"0",r:"0.85000002",fx:"0",fy:"0",id:@id+"radialGradient2422",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(136.9473,136.9473,136.9473,-136.9473,231.2305,618.7295)"}).
                 stop({style:"stop-color:#f4c592;stop-opacity:1",offset:"0"}).end().
                 stop({style:"stop-color:#f39f58;stop-opacity:1",offset:"1"}).end().
               end().
               clipPath({id:@id+"clipPath2434"}).
                 path({d:"m 146.191,482.667 170.077,0 c 14.068,0 26.825,5.722 36.063,14.961 l -242.2,0 c 9.239,-9.239 21.994,-14.961 36.06,-14.961",id:"path2436"}).end().
               end().
               linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",id:@id+"linearGradient2446",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,-14.9614,-246.1992,0,354.3306,497.6279)",spreadMethod:"pad"}).
                 stop({style:"stop-color:#ed8b38;stop-opacity:1",offset:"0"}).end().
                 stop({style:"stop-color:#f6dac3;stop-opacity:1",offset:"1"}).end().
               end().
               clipPath({id:@id+"clipPath2458"}).
                 path({d:"m 146.191,754.792 170.077,0 c 14.068,0 26.825,-5.722 36.063,-14.961 l -242.2,0 c 9.239,9.239 21.994,14.961 36.06,14.961",id:"path2460"}).end().
               end().
               linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",id:@id+"linearGradient2470",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,14.9609,-246.1992,0,354.3306,739.8301)",spreadMethod:"pad"}).
                 stop({style:"stop-color:#f29f59;stop-opacity:1",offset:"0"}).end().
                 stop({style:"stop-color:#ffffff;stop-opacity:1",offset:"1"}).end().
               end().
              end().
              g({transform:"matrix(0.5,0,0,-0.5,-10.0,400.0)"}).
               g({'clip-path':"url(#"+@id+"clipPath2356)",id:"g2354"}).
                   path({d:"M 0,0 851,0 851,851 0,851 0,0 z",id:"path2374",style:"fill:url(#"+@id+"linearGradient2368);stroke:none"}).end().
               end().
               g({'clip-path':"url(#"+@id+"clipPath2400)",id:"g2398"}).
                 g({id:"g2410"}).
                   path({d:"M 0,0 851,0 851,851 0,851 0,0 z",id:"path2418",style:"fill:url(#"+@id+"radialGradient2412);stroke:none"}).end().
                 end().
                 g({id:"g2420"}).
                   path({d:"M 0,0 851,0 851,851 0,851 0,0 z",id:"path2428",style:"fill:url(#"+@id+"radialGradient2422);stroke:none"}).end().
                 end().
               end().
               g({'clip-path':"url(#"+@id+"clipPath2434)",id:"g2432"}).
                 g({id:"g2444"}).
                   path({d:"M 0,0 851,0 851,851 0,851 0,0 z",id:"path2452",style:"fill:url(#"+@id+"linearGradient2446);stroke:none"}).end().
                 end().
               end().
               g({'clip-path':"url(#"+@id+"clipPath2458)",id:"g2456"}).
                 path({d:"M 0,0 851,0 851,851 0,851 0,0 z",id:"path2476",style:"fill:url(#"+@id+"linearGradient2470);stroke:none"}).end().
               end().
               path({d:"m 261.297,618.729 30.066,30.066 c 8.27,8.27 8.268,21.797 0,30.066 -8.267,8.268 -21.798,8.27 -30.066,0 l -30.067,-30.066 -30.066,30.066 c -8.267,8.268 -21.797,8.268 -30.066,0 -8.268,-8.267 -8.268,-21.796 0,-30.066 L 201.164,618.729 171.1,588.664 c -8.27,-8.268 -8.268,-21.799 0,-30.066 8.267,-8.268 21.797,-8.27 30.066,0 l 30.064,30.064 30.067,-30.064 c 8.268,-8.27 21.797,-8.268 30.064,0 8.27,8.267 8.27,21.797 0,30.066 l -30.064,30.065",id:"path9834",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"}).end().
              end().
              end().svg
            )
          ).add(
            monads.DOMable({tagName:'div'}).on('load').attributes({'class':'b'})
          ).add(
            monads.DOMable({tagName:'div'}).on('load').attributes({'class':'c'})
          ).add(
            monads.DOMable({tagName:'div'}).on('load').attributes({'class':'d'})
          ).add(
            monads.DOMable({tagName:'div'}).on('load').attributes({'class':'e'})
          ).add(
            monads.DOMable({tagName:'div'}).on('load').attributes({'class':'f'})
          )
        )
      );
      @container.insert(document.body).on('touchstart').bind(this.ontouchstart).on('touchmove').bind(this.ontouchmove).on('touchend').bind(this.ontouchend);

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
    static init = (function() {
      var styles = [
        {selector:'body',style:"background:#000;color:#e0e0ff;font-size:115%;margin:0;"},
        {selector:'#container',style:"position: absolute;left: 50%; margin-left:-100px;top: 50%; margin-top:-100px;height: 200px;width: 200px;-webkit-perspective: 800;"},
        {selector:'#frame',style:"opacity: 0.7;width: 200px;-webkit-transform-style: preserve-3d;-webkit-transform: translateZ(150px);-webkit-transition: all 5s;"},
        {selector:'.inner',style:"height:200px;width:200px;-webkit-transform: rotateX(90deg);-webkit-transform-style: preserve-3d;-webkit-animation: spin2 20s infinite linear;"},
        {selector:'.inner div',style:"position: absolute;height:100px;padding-top:100px;width:200px;background-size: 100% 100%;opacity: 1;-webkit-transform: rotateX(-90deg);"},
        {selector:'.inner .a',style:"-webkit-transform: rotateY(-90deg);left:100px;"},
        {selector:'.inner .b',style:"-webkit-transform: rotateY(90deg);left:-100px;"},
        {selector:'.inner .c',style:"-webkit-transform:rotateX(90deg);-webkit-transform:translateZ(-100px);"},
        {selector:'.inner .d',style:"-webkit-transform: translateZ(100px);"},
        {selector:'.inner .e',style:"top:100px;"},
        {selector:'.inner .f',style:"top:-100px;"},
        {selector:'@-webkit-keyframes spin2',style:"from { -webkit-transform: rotateY(0); } to   { -webkit-transform: rotateY(720deg); }"}
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
