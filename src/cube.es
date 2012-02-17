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
            monads.DOMable({tagName:'div'}).on('load').attributes({'class':'b'}).add(
svg.Svg({xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"368.50751",height:"368.50375"}).
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
  g({transform:"matrix(1.25,0,0,-1.25,-589.33125,957.6625)"}).
    g({'clip-path':"url(#"+@id+"clipPath4800)"}).
      path({d:"m 703.906,471.327 -170.078,0 c -34.388,0 -62.363,27.976 -62.363,62.364 l 0,170.077 c 0,34.386 27.975,62.362 62.363,62.362 l 170.078,0 c 34.39,0 62.365,-27.976 62.365,-62.362 l 0,-170.077 c 0,-34.388 -27.975,-62.364 -62.365,-62.364",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none",id:"path4804"}).end().
    end().
    g({'clip-path':"url(#"+@id+"clipPath4810)"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient4822);stroke:none",id:"path4828"}).end().
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient4832);stroke:none",id:"path4838"}).end().
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient4842);stroke:none",id:"path4848"}).end().
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
            )
          ).add(
            monads.DOMable({tagName:'div'}).on('load').attributes({'class':'c'}).add(
svg.Svg({xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"368.50751",height:"368.505"}).
  defs().
    clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath7254"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",id:"path7256"}).end().
    end().
    clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath7264"}).
      path({d:"m 372.965,146.054 c 0,-31.181 -25.511,-56.693 -56.693,-56.693 l -170.079,0 c -31.182,0 -56.693,25.512 -56.693,56.693 l 0,170.08 c 0,31.181 25.511,56.692 56.693,56.692 l 170.079,0 c 31.182,0 56.693,-25.511 56.693,-56.692 l 0,-170.08",id:"path7266"}).end().
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
      path({d:"m 316.272,367.156 -170.078,0 c -28.136,0 -51.025,-22.888 -51.025,-51.02 l 0,-67.671 c 40.389,-11.072 86.753,-17.371 136.063,-17.371 49.308,0 95.672,6.299 136.062,17.371 l 0,67.671 c 0,28.132 -22.889,51.02 -51.022,51.02",id:"path7300"}).end().
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
      path({d:"m 146.191,95.029 170.078,0 c 14.069,0 26.825,5.722 36.063,14.961 l -242.2,0 c 9.238,-9.239 21.994,-14.961 36.059,-14.961",id:"path7334"}).end().
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
  g({transform:"matrix(1.25,0,0,-1.25,-104.7875,473.1175)"}).
    g({'clip-path':"url(#"+@id+"clipPath7254)"}).
      path({d:"m 316.272,83.69 -170.079,0 c -34.388,0 -62.363,27.977 -62.363,62.366 l 0,170.078 c 0,34.385 27.975,62.36 62.363,62.36 l 170.079,0 c 34.388,0 62.364,-27.975 62.364,-62.36 l 0,-170.078 c 0,-34.389 -27.976,-62.366 -62.364,-62.366",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none",id:"path7258"}).end().
    end().
    g({'clip-path':"url(#"+@id+"clipPath7264)"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient7276);stroke:none",id:"path7282"}).end().
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient7286);stroke:none",id:"path7292"}).end().
    end().
    g({'clip-path':"url(#"+@id+"clipPath7298)"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"radialGradient7310);stroke:none",id:"path7316"}).end().
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"radialGradient7320);stroke:none",id:"path7326"}).end().
    end().
    g({'clip-path':"url(#"+@id+"clipPath7332)"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient7344);stroke:none",id:"path7350"}).end().
    end().
    g({'clip-path':"url(#"+@id+"clipPath7356)"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient7368);stroke:none",id:"path7374"}).end().
    end().
    path({d:"m 295.012,252.354 -127.559,0 c -11.693,0 -21.26,-9.569 -21.26,-21.262 0,-11.692 9.567,-21.258 21.26,-21.258 l 127.559,0 c 11.693,0 21.26,9.566 21.26,21.258 0,11.693 -9.567,21.262 -21.26,21.262 z m -63.78,21.259 c 11.741,0 21.26,9.518 21.26,21.26 0,11.742 -9.519,21.26 -21.26,21.26 -11.742,0 -21.259,-9.518 -21.259,-21.26 0,-11.742 9.517,-21.26 21.259,-21.26 z m 0,-85.039 c -11.742,0 -21.259,-9.517 -21.259,-21.259 0,-11.743 9.517,-21.26 21.259,-21.26 11.741,0 21.26,9.517 21.26,21.26 0,11.742 -9.519,21.259 -21.26,21.259",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none",id:"path9830"}).end().
  end().
end().svg
            )
          ).add(
            monads.DOMable({tagName:'div'}).on('load').attributes({'class':'d'}).add(
svg.Svg({xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"368.50876",height:"368.505"}).
  defs().
    clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath9698"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",id:"path9700"}).end().
    end().
    clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath9708"}).
      path({d:"m 760.601,146.054 c 0,-31.181 -25.513,-56.693 -56.695,-56.693 l -170.079,0 c -31.181,0 -56.693,25.512 -56.693,56.693 l 0,170.08 c 0,31.181 25.512,56.692 56.693,56.692 l 170.079,0 c 31.182,0 56.695,-25.511 56.695,-56.692 l 0,-170.08",id:"path9710"}).end().
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
      path({d:"m 703.906,367.156 -170.077,0 c -28.136,0 -51.025,-22.888 -51.025,-51.02 l 0,-67.671 c 40.388,-11.072 86.753,-17.371 136.063,-17.371 49.309,0 95.672,6.299 136.062,17.371 l 0,67.671 c 0,28.132 -22.889,51.02 -51.023,51.02",id:"path9744"}).end().
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
      path({d:"m 533.826,95.029 170.077,0 c 14.071,0 26.826,5.722 36.064,14.961 l -242.2,0 c 9.238,-9.239 21.994,-14.961 36.059,-14.961",id:"path9778"}).end().
    end().
    linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,-14.9609,-246.2002,0,741.9668,109.9902)",spreadMethod:"pad",id:@id+"linearGradient9788"}).
      stop({style:"stop-opacity:1;stop-color:#bcbfc6",offset:"0"}).end().
      stop({style:"stop-opacity:1;stop-color:#e5e7ea",offset:"1"}).end().
    end().
    clipPath({clipPathUnits:"userSpaceOnUse",id:@id+"clipPath9800"}).
      path({d:"m 533.826,367.156 170.077,0 c 14.071,0 26.826,-5.721 36.064,-14.961 l -242.2,0 c 9.238,9.24 21.994,14.961 36.059,14.961",id:"path9802"}).end().
    end().
    linearGradient({x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"userSpaceOnUse",gradientTransform:"matrix(0,14.9609,-246.2002,0,741.9668,352.1953)",spreadMethod:"pad",id:@id+"linearGradient9812"}).
      stop({style:"stop-opacity:1;stop-color:#bcbfc6",offset:"0"}).end().
      stop({style:"stop-opacity:1;stop-color:#ffffff",offset:"1"}).end().
    end().
  end().
  g({transform:"matrix(1.25,0,0,-1.25,-589.33,473.1175)"}).
    g({'clip-path':"url(#"+@id+"clipPath9698)"}).
      path({d:"m 703.906,83.69 -170.079,0 c -34.387,0 -62.363,27.977 -62.363,62.366 l 0,170.078 c 0,34.385 27.976,62.36 62.363,62.36 l 170.079,0 c 34.39,0 62.365,-27.975 62.365,-62.36 l 0,-170.078 c 0,-34.389 -27.975,-62.366 -62.365,-62.366",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none",id:"path9702"}).end().
    end().
    g({'clip-path':"url(#"+@id+"clipPath9708)"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient9720);stroke:none",id:"path9726"}).end().
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient9730);stroke:none",id:"path9736"}).end().
    end().
    g({'clip-path':"url(#"+@id+"clipPath9742)"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"radialGradient9754);stroke:none",id:"path9760"}).end().
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"radialGradient9764);stroke:none",id:"path9770"}).end().
    end().
    g({'clip-path':"url(#"+@id+"clipPath9776)"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient9788);stroke:none",id:"path9794"}).end().
    end().
    g({'clip-path':"url(#"+@id+"clipPath9800)"}).
      path({d:"M 0,0 851,0 851,851 0,851 0,0 z",style:"fill:url(#"+@id+"linearGradient9812);stroke:none",id:"path9818"}).end().
    end().
    path({d:"m 703.906,231.093 c 0,-11.692 -9.566,-21.259 -21.26,-21.259 l -127.558,0 c -11.694,0 -21.26,9.567 -21.26,21.259 0,11.693 9.566,21.261 21.26,21.261 l 127.558,0 c 11.694,0 21.26,-9.568 21.26,-21.261",style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none",id:"path9828"}).end().
  end().
end().svg
            )
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
