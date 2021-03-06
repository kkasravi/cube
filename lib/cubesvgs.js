(function() {
  var nm = module.Module('cubesvgs');
  (function(require, exports, moduleId) {
    var log = require('log');
    var monads = require('monads');
    var controller = require('controller');
    var events = require('events');
    var svg = require('svg');
    var Ninja = (function() {
      function Ninja() {
        function privateData() {
          this.belt = null;
          this.element = null;
          this.id = null;
          this.hands = null;
          this.leftArm = null;
          this.ninja = null;
          this.raiseSwordDuration = null;
          this.rightArm = null;
          this.sword = null;
          this.swordblade = null;
        }
        var p_vars = new privateData();
        var belt = p_vars.belt;
        Object.getOwnPropertyDescriptor(this,'belt') || Object.defineProperty(this,'belt', {get: function(){return belt;},set: function(e){belt=e;}});
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var hands = p_vars.hands;
        Object.getOwnPropertyDescriptor(this,'hands') || Object.defineProperty(this,'hands', {get: function(){return hands;},set: function(e){hands=e;}});
        var leftArm = p_vars.leftArm;
        Object.getOwnPropertyDescriptor(this,'leftArm') || Object.defineProperty(this,'leftArm', {get: function(){return leftArm;},set: function(e){leftArm=e;}});
        var ninja = p_vars.ninja;
        Object.getOwnPropertyDescriptor(this,'ninja') || Object.defineProperty(this,'ninja', {get: function(){return ninja;},set: function(e){ninja=e;}});
        var raiseSwordDuration = p_vars.raiseSwordDuration;
        Object.getOwnPropertyDescriptor(this,'raiseSwordDuration') || Object.defineProperty(this,'raiseSwordDuration', {get: function(){return raiseSwordDuration;},set: function(e){raiseSwordDuration=e;}});
        var rightArm = p_vars.rightArm;
        Object.getOwnPropertyDescriptor(this,'rightArm') || Object.defineProperty(this,'rightArm', {get: function(){return rightArm;},set: function(e){rightArm=e;}});
        var sword = p_vars.sword;
        Object.getOwnPropertyDescriptor(this,'sword') || Object.defineProperty(this,'sword', {get: function(){return sword;},set: function(e){sword=e;}});
        var swordblade = p_vars.swordblade;
        Object.getOwnPropertyDescriptor(this,'swordblade') || Object.defineProperty(this,'swordblade', {get: function(){return swordblade;},set: function(e){swordblade=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.changeSword=this.changeSword.bind(this);
          this.id='ninja';
          this.raiseSwordDuration='500ms';
          this.ninja=svg.Svg({
            id:this.id,
            width:'27em',
            height:'29em'
          }).g({
            transform:"matrix(0.8,0,0,0.8,0.0,0.0)"
          }).path({
            d:"m 310.83594,189.77734 c 0,45.51172 -39.77344,82.40235 -88.83203,82.40235 -49.0625,0 -88.83204,-36.89063 -88.83204,-82.40235 0,-45.51172 39.76954,-82.40234 88.83204,-82.40234 49.05859,0 88.83203,36.89062 88.83203,82.40234",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 303.28125,183.76953 c 0,0 -49.76172,-31.14062 -111.14063,-31.14062 -19.16015,0 -37.18359,3.03125 -52.91796,7.20312 -3.90625,9.28125 -6.05079,19.38281 -6.05079,29.94531 0,4.21875 0.34375,8.36328 1.00391,12.41016 16.875,3.98828 62.8125,5.55469 84.05078,5.55469 61.38281,0 85.05469,-23.97266 85.05469,-23.97266",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().g({
            id:'eyes'
          }).path({
            d:"m 174.65625,186.03516 c 0,5.07031 -5.61719,9.17968 -12.54688,9.17968 -6.92578,0 -12.54687,-4.10937 -12.54687,-9.17968 0,-5.07032 5.62109,-9.17969 12.54687,-9.17969 6.92969,0 12.54688,4.10937 12.54688,9.17969",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 243.29687,187.9375 c 0,5.07031 -5.61718,9.17969 -12.54687,9.17969 -6.92969,0 -12.54688,-4.10938 -12.54688,-9.17969 0,-5.07031 5.61719,-9.17969 12.54688,-9.17969 6.92969,0 12.54687,4.10938 12.54687,9.17969",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().path({
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
            id:'leftArm',
            d:"m 219.74219,315.99609 c -0.92578,-12.28515 23.97265,-32.1875 53.89453,-34.4414 29.92578,-2.25391 48.6914,5.23047 54.47265,26.28125 6.30079,22.95703 -26.07421,36.73437 -56,38.98828 -29.92187,2.2539 -51.4414,-18.53906 -52.36718,-30.82813",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            id:'rightArm',
            d:"m 213.44531,350.26172 c -3.91406,11.6875 -34.57812,20.375 -63.03515,10.85156 -28.45703,-9.52734 -42.84766,-23.70312 -40.01563,-45.35156 3.09375,-23.60156 38.28125,-23.7461 66.73828,-14.21875 28.45313,9.52344 40.22656,37.03125 36.3125,48.71875",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().g({
            id:'sword'
          }).path({
            id:'swordblade',
            d:"m 230.35547,362.66406 c -2.58594,3.38672 -7.42188,4.03516 -10.8086,1.45313 l -6,-4.57813 c -3.38671,-2.58203 -4.03515,-7.42187 -1.45312,-10.80859 L 399.86719,102.63281 c 2.58203,-3.386716 6.80468,28.94531 6.80468,28.94531 l -176.3164,231.08594",
            style:"fill:#211e1e;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).animate({
            'id':'changesword',
            'begin':'indefinite',
            'dur':'1s',
            'repeatCount':"1",
            'fill':'freeze',
            'attributeName':"d",
            'attributeType':'XML',
            'from':"m 230.35547,362.66406 c -2.58594,3.38672 -7.42188,4.03516 -10.8086,1.45313 l -6,-4.57813 c -3.38671,-2.58203 -4.03515,-7.42187 -1.45312,-10.80859 l 177.51739,-232.54473 -0.59645,0.67046 10.32144,-12.53587 0.53106,-1.68752 c 2.58203,-3.386716 6.80468,28.94531 6.80468,28.94531 l -0.8164,1.42315 -8.69298,11.04015 0.26594,0.84134 -167.07296,217.7813",
            'to':"m 230.35547,362.66406 c -2.58594,3.38672 -7.42188,4.03516 -10.8086,1.45313 l -6,-4.57813 c -3.38671,-2.58203 -4.03515,-7.42187 -1.45312,-10.80859 l 175.60211,-232.54473 -33.7946,-0.60639 0.74505,-11.89744 56.71255,0.86618 c 2.58203,-3.38672 8.08153,27.03003 8.08153,27.03003 l 4.92943,26.32176 -11.24668,2.74061 -9.31045,-31.71838 -173.45722,233.74195"
          }).end().end().path({
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
          }).end().end().g({
            id:'hands',
            transform:'rotate(30)',
            style:'display:none;'
          }).path({
            d:"m 242.65625,358.73047 c 0,12.92969 -10.48047,23.41015 -23.41406,23.41015 -12.92969,0 -23.41016,-10.48046 -23.41016,-23.41015 0,-12.92969 10.48047,-23.41406 23.41016,-23.41406 12.93359,0 23.41406,10.48437 23.41406,23.41406",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().path({
            d:"m 274.41406,315.41016 c 0,12.92968 -10.48047,23.41406 -23.41015,23.41406 -12.9336,0 -23.41407,-10.48438 -23.41407,-23.41406 0,-12.92969 10.48047,-23.41016 23.41407,-23.41016 12.92968,0 23.41015,10.48047 23.41015,23.41016",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().path({
            id:'belt',
            d:"m 199.84666,167.85242 c 14.08938,-0.70096 56.28943,-3.56939 64.08911,-9.96321 0.14475,-4.44342 0.74931,-9.39424 0.0937,-13.17774 -2.12022,13.91683 -55.05476,16.49783 -64.18277,23.14095 z M 94.267078,156.73949 c 6.496902,10.06001 51.844632,10.57913 68.553782,11.40916 -14.71949,-7.75178 -63.166668,-6.78977 -68.051398,-23.42251 0,3.46381 -0.502384,8.54954 -0.502384,12.01335 z M 217.6741,167.13092 c -6.30105,0.98841 -12.7866,0.84469 -17.46981,2.49301 -0.51658,3.02681 3.69832,4.22345 6.35781,6.05361 1.96128,1.34914 2.37851,2.73056 7.60952,3.00334 13.40536,0.6951 54.1238,-6.73112 50.34032,-19.68302 -4.76836,5.9011 -37.68995,6.69886 -46.83784,8.13306 z m -122.487405,4.15599 c 1.850577,4.68978 41.714685,8.38236 48.867235,7.48194 6.08534,-0.76549 12.39492,-8.42928 17.06678,-9.55847 -15.47732,-0.31382 -59.65851,-0.9708 -66.853632,-9.97789 1.141,4.47568 -0.508059,8.44396 0.919617,12.05442 z m 70.205675,-4.83643 c 10.7345,1.65711 12.05148,9.47635 21.47468,12.31837 2.6226,-5.40248 1.24034,-13.59127 -2.756,-16.62688 -10.10724,-6.91001 -21.80393,0.39596 -18.71868,4.30851 z m 27.89778,18.75034 c 4.53846,-2.69538 7.56411,-20.909 3.21298,-23.39906 -1.00478,-1.17612 -10.58124,-0.5602 -13.24074,-1.62486 9.76947,5.46115 6.87723,19.85606 0.96219,24.50478 3.11647,-0.7831 5.90369,1.26411 9.06557,0.51914 z m -26.65176,-1.85949 c 4.48454,0.65697 8.16015,2.0472 12.41478,2.90948 5.49497,-1.61606 5.88383,-3.27024 7.81388,-5.81897 -3.50248,-1.12625 -5.42402,-4.17065 -8.87541,-5.34383 -5.29629,1.04706 -8.31909,5.17665 -11.35325,8.25332 z m 10.77424,-8.84577 c -4.62929,-7.52888 -7.81388,-5.00655 -11.58032,-7.03321 -31.42297,14.56208 -36.33961,36.5109 -48.29174,54.15551 1.6519,3.49315 16.38007,-5.13408 19.59304,-3.04874 9.96248,-22.03231 12.44652,-31.22725 40.27902,-44.07356 z m 19.11036,8.84577 c 11.07793,10.39729 14.77532,15.54044 25.66025,36.4905 1.96411,-1.3345 16.3541,6.16422 17.92937,2.59775 -6.89711,-16.00216 -17.39483,-41.85696 -40.33124,-49.6674 -0.8373,3.81576 -1.35671,7.72539 -3.25838,10.57915",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;-webkit-transform:scale(0.94) translate(52px,260px);"
          }).end().animateMotion({
            'id':'swordmove1',
            'xlink:href':'#sword',
            'path':"m 0,0 l 2,2 4,-4 32,-32 64,-64",
            'begin':'indefinite',
            'dur':this.raiseSwordDuration,
            'repeatCount':"1",
            'rotate':"0",
            'fill':"freeze"
          }).end().animateTransform({
            'id':'swordmove2',
            'xlink:href':'#sword',
            'attributeName':'transform',
            'attributeType':'XML',
            'type':'rotate',
            'from':'0',
            'to':'20',
            'begin':'indefinite',
            'dur':this.raiseSwordDuration,
            'additive':'replace',
            'fill':"freeze"
          }).end().animateMotion({
            'id':'armmove1',
            'xlink:href':'#rightArm',
            'path':"m 0,0 l 0,-2 0,-4 0,-12",
            'begin':'indefinite',
            'dur':this.raiseSwordDuration,
            'repeatCount':"1",
            'rotate':"0",
            'fill':"freeze"
          }).end().animateMotion({
            'id':'armmove2',
            'xlink:href':'#leftArm',
            'path':"m 0,0 l 0,2 0,4 0,12",
            'begin':'indefinite',
            'dur':this.raiseSwordDuration,
            'repeatCount':"1",
            'rotate':"0",
            'fill':"freeze"
          }).end().end().end();
          monads.DOMable({
            element:document.body
          }).on('load').style({
            '-webkit-perspective':'1000px'
          });
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'ninja'
          }).reflect('-30%').add(this.ninja.svg);
          this.belt=this.ninja.svg.getElementById('belt');
          this.hands=this.ninja.svg.getElementById('hands');
          this.leftArm=this.ninja.svg.getElementById('leftArm');
          this.rightArm=this.ninja.svg.getElementById('rightArm');
          this.sword=this.ninja.svg.getElementById('sword');
          this.swordblade=this.ninja.svg.getElementById('swordblade');
        }
        return ctor.apply(this,args) || this;
      }
      Ninja.prototype['changeBelt'] = function(color) {
        this.belt.style.fill=color;
        return this;
      };
      Ninja.prototype['raiseSword'] = function() {
        this.ninja.svg.getElementById('swordmove1').beginElement();
        this.ninja.svg.getElementById('swordmove2').beginElement();
        this.ninja.svg.getElementById('armmove1').beginElement();
        this.ninja.svg.getElementById('armmove2').beginElement();
        this.leftArm.style.webkitTransition='-webkit-transform ' + this.raiseSwordDuration;
        this.leftArm.style.webkitTransformOriginX='219';
        this.leftArm.style.webkitTransformOriginY='315';
        this.leftArm.style.webkitTransform='rotate(10deg) translate(-10px,-10px)';
        return this;
      };
      Ninja.prototype['rotateSword'] = function() {
        this.sword.style.webkitTransition='-webkit-transform 1s';
        this.sword.style.webkitTransformOriginX='30%';
        this.sword.style.webkitTransformOriginY='80%';
        this.sword.style.webkitTransform='rotate(90deg)';
        var eyes=this.ninja.svg.getElementById('eyes');
        eyes.style.webkitTransition='-webkit-transform 200ms';
        eyes.style.webkitTransform='translateX(5px)';
        this.rightArm.style.webkitTransition='-webkit-transform 1s';
        this.rightArm.style.webkitTransformOriginX='50%';
        this.rightArm.style.webkitTransformOriginY='50%';
        this.rightArm.style.webkitTransform='rotate(-35deg)';
        return this;
      };
      Ninja.prototype['changeSword'] = function() {
        this.ninja.svg.getElementById('changesword').beginElement();
        return this;
      };
      Ninja.prototype['play'] = function() {
        this.element.element().style.webkitTransform='translateX(-4em)';
        this.swordblade.style.webkitTransition='fill 1s';
        this.swordblade.style.fill='rgb(233,120,37)';
        this.swordblade.style.filter='url(#drop-shadow)';
        this.sword.style.webkitTransform='rotate(18deg)';
        this.rightArm.style.webkitTransform='rotate(-15deg)';
        setTimeout(this.changeSword,2000);
        return this;
      };
      Ninja.init = (function () {
        var styles=[{
          selector:'.ninja',
          style:"position:absolute;-webkit-transition:-webkit-transform 0.5s;-webkit-transform-style:preserve-3d;"
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
    exports.Ninja = Ninja;
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
          this.ontouchend=this.ontouchend.bind(this);
          this.id=Math.uuid(8);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'operators'
          }).add(svg.Svg({
            width:"160.0",
            height:"200.0"
          }).defs().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath4800"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z"
          }).end().end().clipPath({
            clipPathUnits:"userSpaceOnUse",
            id:this.id + "clipPath4810"
          }).path({
            d:"m 760.601,533.69 c 0,-31.182 -25.513,-56.693 -56.695,-56.693 l -170.078,0 c -31.181,0 -56.693,25.511 -56.693,56.693 l 0,170.078 c 0,31.182 25.512,56.694 56.693,56.694 l 170.078,0 c 31.182,0 56.695,-25.512 56.695,-56.694 l 0,-170.078"
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
            d:"m 703.906,754.792 -170.077,0 c -28.136,0 -51.024,-22.889 -51.024,-51.022 l 0,-67.67 c 40.388,-11.071 86.752,-17.371 136.062,-17.371 49.309,0 95.672,6.3 136.062,17.371 l 0,67.67 c 0,28.133 -22.889,51.022 -51.023,51.022"
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
            d:"m 533.827,482.665 170.076,0 c 14.071,0 26.826,5.723 36.064,14.962 l -242.199,0 c 9.237,-9.239 21.994,-14.962 36.059,-14.962"
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
            d:"m 533.827,754.792 170.076,0 c 14.071,0 26.826,-5.723 36.064,-14.961 l -242.199,0 c 9.237,9.238 21.994,14.961 36.059,14.961"
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
            id:'plus',
            transform:"matrix(0.5,0,0,-0.5,-233.0,408.0)"
          }).g({
            'clip-path':"url(#" + this.id + "clipPath4800)"
          }).path({
            d:"m 703.906,471.327 -170.078,0 c -34.388,0 -62.363,27.976 -62.363,62.364 l 0,170.077 c 0,34.386 27.975,62.362 62.363,62.362 l 170.078,0 c 34.39,0 62.365,-27.976 62.365,-62.362 l 0,-170.077 c 0,-34.388 -27.975,-62.364 -62.365,-62.364",
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().g({
            'clip-path':"url(#" + this.id + "clipPath4810)"
          }).path({
            d:"M 0,0 851,0 851,851 0,851 0,0 z",
            style:"fill:url(#" + this.id + "linearGradient4832);stroke:none"
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
            style:"fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
          }).end().end().end().svg).reflect('-40%').on(['touchend'],this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Plus.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'play',
          canBubble:false,
          isCanceleable:true,
          detail:{
            'operation':'plus',
            'color':'#78bf2b'
          }
        }));
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Plus;
        return new Plus(args && args.length && args[0]);
      };
    })();
    exports.Plus = Plus;
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
          this.ontouchend=this.ontouchend.bind(this);
          this.id=Math.uuid(8);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'multiply operators'
          }).add(svg.Svg({
            width:"160.0",
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
          }).end().end().end().svg).reflect('-40%').on(['touchend'],this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Multiply.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'play',
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
          selector:'.multiply',
          style:"opacity:0;-webkit-transform:translateX(-200%);"
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
    exports.Multiply = Multiply;
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
          this.ontouchend=this.ontouchend.bind(this);
          this.id=Math.uuid(8);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'divide operators'
          }).add(svg.Svg({
            width:"160.0",
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
          }).end().end().end().svg).reflect('-40%').on(['touchend'],this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Divide.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'play',
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
          selector:'.divide',
          style:"opacity:0;-webkit-transform:translateX(-300%);"
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
    exports.Divide = Divide;
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
          this.ontouchend=this.ontouchend.bind(this);
          this.id=Math.uuid(8);
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'minus operators'
          }).add(svg.Svg({
            width:"160.0",
            height:"200.0"
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
          }).end().end().end().svg).reflect('-40%');
          this.element.on(['touchend'],this.ontouchend);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Minus.prototype['ontouchend'] = function(event) {
        controller.Controller.publish(events.CustomEvent({
          type:'play',
          canBubble:false,
          isCanceleable:true,
          detail:{
            'operation':'minus',
            'color':'#90969d'
          }
        }));
      };
      Minus.init = (function () {
        var styles=[{
          selector:'.minus',
          style:"-webkit-transform:translateX(-100%);opacity:0;"
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
    exports.Minus = Minus;
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
            width:"5em",
            height:"5em"
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
          style:"position:absolute;z-index:500;top:50%;left:0%;-webkit-transform-origin-x:42px;-webkit-transform-origin-y:44px;-webkit-animation:shurikenspin 1500ms linear infinite;"
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
    exports.Shuriken = Shuriken;
    var Shuriken1 = (function() {
      function Shuriken1() {
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
          }).on('load').add(svg.Svg({
            width:"699.20837",
            height:"702.91144"
          }).defs().linearGradient({
            id:this.id + "linearGradient4552"
          }).stop({
            style:"stop-color:#ffffff;stop-opacity:1",
            offset:"0"
          }).end().stop({
            style:"stop-color:#d3d7cf;stop-opacity:0",
            offset:"1"
          }).end().end().linearGradient({
            id:this.id + "linearGradient4177"
          }).stop({
            style:"stop-color:#babdb6;stop-opacity:1",
            offset:"0"
          }).end().stop({
            style:"stop-color:#e5e6e4;stop-opacity:1",
            offset:"1"
          }).end().end().linearGradient({
            id:this.id + "linearGradient4163"
          }).stop({
            style:"stop-color:#ffffff;stop-opacity:1",
            offset:"0"
          }).end().stop({
            style:"stop-color:#eeeeec;stop-opacity:0",
            offset:"1"
          }).end().end().linearGradient({
            x1:"699.06476",
            y1:"640.40399",
            x2:"500.73157",
            y2:"438.37344",
            id:this.id + "linearGradient5318",
            'xlink:href':"#" + this.id + "linearGradient4177",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.2599092,0,0,1.2599092,3002.2432,-965.29274)"
          }).end().linearGradient({
            x1:"578.29065",
            y1:"182.12482",
            x2:"975.62897",
            y2:"555.83942",
            id:this.id + "linearGradient5320",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.2599092,0,0,1.2599092,3002.2432,-965.29274)"
          }).end().linearGradient({
            x1:"929.91473",
            y1:"519.60327",
            x2:"1303.0582",
            y2:"926.10486",
            id:this.id + "linearGradient5322",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.2599092,0,0,1.2599092,3002.2432,-965.29274)"
          }).end().linearGradient({
            x1:"578.29065",
            y1:"871.22717",
            x2:"991.29425",
            y2:"1253.5133",
            id:this.id + "linearGradient5324",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.2599092,0,0,1.2599092,3002.2432,-965.29274)"
          }).end().linearGradient({
            x1:"255.09804",
            y1:"519.60327",
            x2:"556.81305",
            y2:"871.22717",
            id:this.id + "linearGradient5326",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.2599092,0,0,1.2599092,3002.2432,-965.29274)"
          }).end().radialGradient({
            cx:"606.1441",
            cy:"531.29413",
            r:"458.26596",
            fx:"606.1441",
            fy:"531.29413",
            id:this.id + "radialGradient5328",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.5043466,-0.6311694,0.541738,0.4328849,3172.4008,-143.31983)"
          }).end().linearGradient({
            x1:"396.74554",
            y1:"437.18973",
            x2:"322.47766",
            y2:"240.04688",
            id:this.id + "linearGradient5330",
            'xlink:href':"#" + this.id + "linearGradient4177",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)"
          }).end().linearGradient({
            x1:"625.21875",
            y1:"240.0625",
            x2:"1548.192",
            y2:"777.72992",
            id:this.id + "linearGradient5332",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)"
          }).end().linearGradient({
            x1:"252.48438",
            y1:"-281.39062",
            x2:"716.39062",
            y2:"507.23886",
            id:this.id + "linearGradient5334",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)"
          }).end().linearGradient({
            x1:"-268.96875",
            y1:"236.125",
            x2:"605.43304",
            y2:"758.07812",
            id:this.id + "linearGradient5336",
            'xlink:href':"#" + this.id + "linearGradient4552",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)"
          }).end().linearGradient({
            x1:"248.54688",
            y1:"632.85492",
            x2:"749.59601",
            y2:"1218.5692",
            id:this.id + "linearGradient5338",
            'xlink:href':"#" + this.id + "linearGradient4552",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9659258,0.258819,-0.258819,0.9659258,1089.0566,-553.49307)"
          }).end().radialGradient({
            cx:"267.10895",
            cy:"215.25221",
            r:"619.9375",
            fx:"267.10895",
            fy:"215.25221",
            id:this.id + "radialGradient5340",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.7958377,-0.2784745,0.1580768,0.4517593,1058.1559,-338.02663)"
          }).end().linearGradient({
            x1:"313.96027",
            y1:"458.04587",
            x2:"225.72379",
            y2:"209.47444",
            id:this.id + "linearGradient5384",
            'xlink:href':"#" + this.id + "linearGradient4177",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9421478,0.5439493,-0.5439493,0.9421478,1911.6836,-1337.7209)"
          }).end().linearGradient({
            x1:"68.34375",
            y1:"86.4375",
            x2:"139.91072",
            y2:"614.92633",
            id:this.id + "linearGradient5386",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9421478,0.5439493,-0.5439493,0.9421478,1911.6836,-1337.7209)"
          }).end().linearGradient({
            x1:"434.46875",
            y1:"135.125",
            x2:"987.16071",
            y2:"210.64062",
            id:this.id + "linearGradient5388",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9421478,0.5439493,-0.5439493,0.9421478,1911.6836,-1337.7209)"
          }).end().linearGradient({
            x1:"636.9375",
            y1:"501.3125",
            x2:"711.33038",
            y2:"1085.4844",
            id:this.id + "linearGradient5390",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9421478,0.5439493,-0.5439493,0.9421478,1911.6836,-1337.7209)"
          }).end().linearGradient({
            x1:"48.25893",
            y1:"703.6875",
            x2:"590.91962",
            y2:"788.04242",
            id:this.id + "linearGradient5392",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.9421478,0.5439493,-0.5439493,0.9421478,1911.6836,-1337.7209)"
          }).end().radialGradient({
            cx:"2421.4006",
            cy:"1148.67",
            r:"455.86465",
            fx:"2421.4006",
            fy:"1148.67",
            id:this.id + "radialGradient5394",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.0153625,-0.4210742,0.2349578,0.5665683,-784.40856,-486.15217)"
          }).end().linearGradient({
            x1:"699.06476",
            y1:"640.40399",
            x2:"500.73157",
            y2:"438.37344",
            id:this.id + "linearGradient3165",
            'xlink:href':"#" + this.id + "linearGradient4177",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.2599092,0,0,1.2599092,3002.2432,-965.29274)"
          }).end().linearGradient({
            x1:"578.29065",
            y1:"182.12482",
            x2:"975.62897",
            y2:"555.83942",
            id:this.id + "linearGradient3167",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.2599092,0,0,1.2599092,3002.2432,-965.29274)"
          }).end().linearGradient({
            x1:"929.91473",
            y1:"519.60327",
            x2:"1303.0582",
            y2:"926.10486",
            id:this.id + "linearGradient3169",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.2599092,0,0,1.2599092,3002.2432,-965.29274)"
          }).end().linearGradient({
            x1:"578.29065",
            y1:"871.22717",
            x2:"991.29425",
            y2:"1253.5133",
            id:this.id + "linearGradient3171",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.2599092,0,0,1.2599092,3002.2432,-965.29274)"
          }).end().linearGradient({
            x1:"255.09804",
            y1:"519.60327",
            x2:"556.81305",
            y2:"871.22717",
            id:this.id + "linearGradient3173",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(1.2599092,0,0,1.2599092,3002.2432,-965.29274)"
          }).end().radialGradient({
            cx:"606.1441",
            cy:"531.29413",
            r:"458.26596",
            fx:"606.1441",
            fy:"531.29413",
            id:this.id + "radialGradient3175",
            'xlink:href':"#" + this.id + "linearGradient4163",
            gradientUnits:"userSpaceOnUse",
            gradientTransform:"matrix(0.5043466,-0.6311694,0.541738,0.4328849,3172.4008,-143.31983)"
          }).end().end().g({
            transform:"scale(0.1,0.1) matrix(0.5988591,0.3457515,-0.3457515,0.5988591,-2030.9763,-897.64892)"
          }).path({
            d:"m 3883.6504,-729.06903 c -55.0236,0.33467 -174.3842,210.04883 -146.5826,257.53332 6.5503,11.18767 24.9881,19.60884 49.6483,25.39504 0.8428,0.83605 1.6579,1.66376 2.4805,2.51982 0.168,0.17483 0.3446,0.33618 0.5118,0.51184 0.6523,0.68553 1.2901,1.38876 1.9292,2.08673 0.8019,0.87565 1.6209,1.78243 2.4017,2.6773 0.7809,0.89487 1.5242,1.803 2.2836,2.71668 0.3819,0.45914 0.7655,0.9142 1.1418,1.37803 0.3716,0.45825 0.7362,0.91523 1.1024,1.37802 0.4467,0.56403 0.9002,1.12234 1.3387,1.69301 0.289,0.37627 0.5807,0.76266 0.8662,1.14179 0.1007,0.13376 0.2146,0.25959 0.315,0.39372 0.6111,0.81754 1.1772,1.64994 1.7717,2.48045 0.5576,0.77829 1.1109,1.53347 1.6536,2.32295 0.1344,0.19558 0.2603,0.39432 0.3938,0.59059 1.3394,1.96993 2.6528,3.98743 3.8978,6.02394 0.6225,1.01823 1.2128,2.03673 1.8111,3.07103 0.062,0.1073 0.135,0.20749 0.1969,0.31497 0.5346,0.92955 1.06,1.89265 1.5749,2.8348 0.5737,1.04993 1.1442,2.08457 1.693,3.14977 0.5487,1.06519 1.0908,2.14845 1.6142,3.22852 1.5703,3.24018 2.9959,6.55494 4.331,9.92178 0.445,1.12227 0.8812,2.25044 1.2993,3.38601 1.6723,4.54225 3.1444,9.15939 4.3703,13.89837 0.9193,3.55422 1.7064,7.1749 2.3623,10.82735 0.4255,2.36971 0.7914,4.75836 1.1024,7.16573 0.01,0.0663 0.031,0.13055 0.039,0.19686 0.01,0.0789 0.029,0.15726 0.039,0.23624 0.7709,6.111 1.1418,12.3435 1.1418,18.6624 -1e-4,11.69192 -1.3288,23.07073 -3.8979,33.97818 -0.01,0.0276 -0.033,0.0512 -0.039,0.0787 -0.5097,2.15834 -1.0503,4.29709 -1.6536,6.41766 -0.01,0.0278 -0.032,0.051 -0.039,0.0788 -1.8373,6.44336 -4.1131,12.72908 -6.772,18.78052 -1.7726,4.03429 -3.7132,7.97549 -5.8271,11.81169 -1.0256,1.8612 -2.0865,3.7009 -3.1891,5.5121 -0.034,0.0553 -0.084,0.1022 -0.1181,0.1575 -2.8466,4.6623 -5.9214,9.1612 -9.2525,13.4652 -1.9987,2.5825 -4.0978,5.0775 -6.2602,7.5201 -1.579,1.3984 -3.165,2.764 -4.8034,4.0947 -0.5882,0.4779 -1.2154,0.9485 -1.8111,1.4174 -0.2513,0.1978 -0.4955,0.3944 -0.748,0.5906 -0.066,0.0509 -0.1313,0.1067 -0.1969,0.1575 -0.797,0.6168 -1.5919,1.2498 -2.4017,1.8505 -0.061,0.0454 -0.1355,0.0727 -0.1969,0.1181 -0.8163,0.6036 -1.612,1.1848 -2.441,1.7717 -0.6766,0.4793 -1.3625,0.9494 -2.0474,1.4174 -0.2235,0.1528 -0.4449,0.321 -0.6693,0.4725 -0.054,0.0367 -0.1032,0.0815 -0.1575,0.1181 -0.8532,0.5746 -1.7329,1.136 -2.5986,1.693 -0.049,0.0316 -0.1084,0.0473 -0.1575,0.0788 -1.793,1.1507 -3.5884,2.2725 -5.4333,3.3466 -0.05,0.0293 -0.1072,0.0495 -0.1575,0.0787 -0.8981,0.5215 -1.8068,1.0327 -2.7167,1.5356 -0.051,0.0283 -0.1063,0.0505 -0.1575,0.0787 -0.9103,0.5017 -1.7948,1.0133 -2.7167,1.4961 -0.052,0.0274 -0.1052,0.0515 -0.1574,0.0788 -0.923,0.4821 -1.8612,0.9544 -2.7955,1.4174 -0.052,0.026 -0.1051,0.0528 -0.1575,0.0787 -0.9349,0.462 -1.8888,0.8961 -2.8348,1.3387 -0.043,0.02 -0.075,0.0588 -0.1181,0.0787 -0.9571,0.4467 -1.906,0.8727 -2.8741,1.2993 -0.053,0.0235 -0.1042,0.0553 -0.1575,0.0788 -0.9585,0.421 -1.9446,0.8194 -2.9136,1.2205 -0.039,0.016 -0.079,0.0234 -0.1181,0.0394 -0.985,0.4067 -1.9573,0.8346 -2.9529,1.2205 -0.039,0.015 -0.079,0.0244 -0.1181,0.0394 -0.9959,0.385 -1.9862,0.7385 -2.9923,1.1024 -0.039,0.0142 -0.079,0.0252 -0.1181,0.0394 -1.0068,0.3632 -2.0149,0.7212 -3.0317,1.063 -0.039,0.0133 -0.079,0.0262 -0.1181,0.0394 -2.9578,0.9923 -5.9785,1.91 -9.0162,2.7167 -0.1705,0.0452 -0.3412,0.0735 -0.5118,0.1181 -0.04,0.0105 -0.078,0.0289 -0.1182,0.0394 -1.0475,0.2728 -2.1327,0.5372 -3.1891,0.7874 -0.028,0.007 -0.051,0.0328 -0.079,0.0394 -0.7692,0.1817 -1.5491,0.3422 -2.3229,0.5118 -4.8329,1.0594 -9.7682,1.8683 -14.7646,2.4411 -2.15,0.2463 -4.3195,0.4771 -6.4964,0.6299 -3.4644,0.2433 -6.9472,0.3544 -10.473,0.3544 -1.4118,0 -2.8105,0 -4.2128,-0.0394 -0.9237,-0.0259 -1.8367,-0.0753 -2.756,-0.1181 -0.222,-0.0103 -0.4477,-0.0281 -0.6694,-0.0394 -0.9443,-0.0482 -1.8952,-0.0915 -2.8348,-0.1575 -0.3148,-0.022 -0.6306,-0.0547 -0.9449,-0.0787 -0.039,-0.003 -0.079,0.003 -0.1181,0 -1.2159,-0.094 -2.4149,-0.231 -3.6223,-0.3544 -0.4985,-0.0508 -0.999,-0.1016 -1.4961,-0.1574 -1.3675,-0.1538 -2.7388,-0.3209 -4.0947,-0.5119 -0.6182,-0.087 -1.2348,-0.1809 -1.8505,-0.2756 -0.6725,-0.1033 -1.3385,-0.2026 -2.008,-0.315 -0.066,-0.011 -0.1312,-0.0282 -0.1968,-0.0393 -0.8564,-0.145 -1.708,-0.2735 -2.5592,-0.4331 -0.8457,-0.1586 -1.6794,-0.3389 -2.5198,-0.5119 -0.9703,-0.1996 -1.9504,-0.4113 -2.9136,-0.6299 -0.053,-0.012 -0.1046,-0.0273 -0.1575,-0.0394 -1.1411,-0.2603 -2.2551,-0.5402 -3.386,-0.8268 -0.1294,-0.0328 -0.2644,-0.0456 -0.3937,-0.0788 -0.5796,-0.1485 -1.1556,-0.317 -1.7324,-0.4724 -0.7091,-0.191 -1.4212,-0.3894 -2.1261,-0.5906 -0.012,-0.003 -0.027,0.004 -0.039,0 -0.5726,-0.1636 -1.1233,-0.3415 -1.693,-0.5118 -0.7088,-0.212 -1.4219,-0.4077 -2.1261,-0.63 -1.0388,-0.3279 -2.0817,-0.6735 -3.1104,-1.0237 -0.028,-0.009 -0.051,-0.0299 -0.079,-0.0393 -0.6613,-0.2256 -1.3115,-0.4741 -1.9686,-0.7087 -0.8015,-0.2863 -1.6066,-0.5666 -2.4017,-0.8662 -0.7846,-0.2957 -1.5842,-0.5969 -2.3623,-0.9056 -0.2244,-0.089 -0.4456,-0.1855 -0.6694,-0.2756 -0.8956,-0.3603 -1.7904,-0.7251 -2.6773,-1.1024 -1.1079,-0.4715 -2.2133,-0.9591 -3.3072,-1.4568 -0.6595,-0.3 -1.3143,-0.5961 -1.9686,-0.9055 -0.9831,-0.465 -1.9819,-0.9315 -2.9529,-1.4174 -0.424,-0.2121 -0.8384,-0.4533 -1.26,-0.6694 -0.7858,-0.403 -1.5846,-0.8038 -2.3623,-1.2205 -0.1861,-0.0997 -0.3655,-0.2145 -0.5512,-0.315 -1.1124,-0.6022 -2.2123,-1.2207 -3.3073,-1.8505 -0.025,-0.0146 -0.053,-0.0247 -0.079,-0.0393 -1.1426,-0.6581 -2.2629,-1.3205 -3.386,-2.008 -1.0051,-0.6149 -2.0032,-1.2518 -2.9923,-1.8899 -0.8426,-0.5438 -1.6891,-1.0932 -2.5198,-1.6536 -0.2504,-0.1689 -0.4988,-0.3414 -0.7481,-0.5119 -0.8927,-0.6099 -1.7593,-1.2216 -2.6379,-1.8505 -0.3004,-0.215 -0.6069,-0.4126 -0.9056,-0.6299 -0.3853,-0.2802 -0.7592,-0.5823 -1.1418,-0.8662 -0.5118,-0.38 -1.0287,-0.7553 -1.5355,-1.1418 -0.4153,-0.3166 -0.8086,-0.6634 -1.2205,-0.9843 -0.5598,-0.4363 -1.1397,-0.8551 -1.693,-1.2993 -0.6625,-0.5315 -1.3156,-1.0715 -1.9686,-1.6142 -0.9134,-0.7594 -1.822,-1.5028 -2.7167,-2.2836 -0.8947,-0.7808 -1.8018,-1.5998 -2.6773,-2.4017 -0.7115,-0.6517 -1.4275,-1.3033 -2.1261,-1.9686 -0.1622,-0.1544 -0.311,-0.3174 -0.4725,-0.4725 -0.856,-0.8225 -1.6837,-1.6376 -2.5198,-2.4804 -5.7862,-24.6602 -14.2467,-43.09808 -25.4344,-49.64834 -47.4845,-27.80162 -257.1987,91.55894 -257.5333,146.58254 -0.3347,55.0236 207.903,176.9543 255.7222,149.7324 11.1401,-6.3417 19.7907,-24.2954 25.8675,-48.4672 1.6782,-1.7368 3.397,-3.4258 5.1577,-5.079 1.7608,-1.6532 3.554,-3.2766 5.394,-4.8428 0.8779,-0.7472 1.7819,-1.4779 2.6773,-2.2048 0.043,-0.0348 0.075,-0.0833 0.1181,-0.1181 0.976,-0.7904 1.9568,-1.5571 2.953,-2.323 0.919,-0.7062 1.8595,-1.4018 2.7954,-2.0867 0.1204,-0.0881 0.2337,-0.1878 0.3543,-0.2756 0.4151,-0.3018 0.8416,-0.5686 1.2599,-0.8662 0.6192,-0.4406 1.2244,-0.9073 1.8505,-1.3386 0.8253,-0.5681 1.6826,-1.1021 2.5198,-1.6537 0.9722,-0.6409 1.9256,-1.2715 2.9136,-1.8898 0.1052,-0.0659 0.2095,-0.1313 0.315,-0.1969 0.6494,-0.404 1.3124,-0.787 1.9686,-1.1812 0.4987,-0.2997 0.9936,-0.6115 1.4961,-0.9055 0.8749,-0.5116 1.7517,-1.0022 2.6379,-1.4962 0.5545,-0.3092 1.0949,-0.6426 1.6537,-0.9449 0.3141,-0.1698 0.6294,-0.3443 0.9449,-0.5118 0.4298,-0.2285 0.867,-0.445 1.2993,-0.6694 0.82,-0.4251 1.6516,-0.8497 2.4804,-1.2599 0.1051,-0.052 0.2098,-0.1057 0.315,-0.1575 1.0145,-0.499 2.0436,-0.9805 3.071,-1.4567 1.1086,-0.5142 2.2234,-1.0089 3.3467,-1.4962 0.9555,-0.4145 1.9083,-0.8258 2.8741,-1.2205 0.1679,-0.0685 0.3437,-0.1289 0.5119,-0.1969 0.6173,-0.2495 1.229,-0.5066 1.8505,-0.748 0.5195,-0.2018 1.0525,-0.3946 1.5749,-0.5906 0.4317,-0.1621 0.8656,-0.3144 1.2992,-0.4725 0.7233,-0.2636 1.437,-0.5348 2.1655,-0.7874 0.027,-0.0094 0.052,-0.03 0.079,-0.0394 1.1434,-0.3957 2.3087,-0.7736 3.4647,-1.1418 0.1188,-0.0379 0.2354,-0.0805 0.3544,-0.1181 1.0645,-0.3361 2.1143,-0.6325 3.1891,-0.9449 0.2108,-0.0614 0.4188,-0.1365 0.63,-0.1969 0.4301,-0.1229 0.8675,-0.2352 1.2992,-0.3544 0.8648,-0.2388 1.7275,-0.4853 2.5986,-0.7087 1.2399,-0.3176 2.4881,-0.6195 3.7404,-0.9055 0.8602,-0.1965 1.7326,-0.3698 2.5985,-0.5512 0.9902,-0.2075 1.9949,-0.4031 2.9923,-0.5906 0.861,-0.1619 1.7323,-0.3256 2.5986,-0.4725 1.1086,-0.1877 2.2297,-0.349 3.3466,-0.5118 0.6023,-0.0878 1.2065,-0.1951 1.8111,-0.2756 0.995,-0.1325 1.9911,-0.2418 2.9923,-0.3544 1.1436,-0.1286 2.274,-0.252 3.4254,-0.3543 0.3296,-0.0293 0.654,-0.091 0.9843,-0.1181 1.2766,-0.1049 2.5729,-0.1641 3.8585,-0.2363 0.2097,-0.0117 0.4199,-0.0284 0.6299,-0.0393 0.5118,-0.0266 1.0224,-0.0575 1.5355,-0.0788 2.0648,-0.0857 4.1351,-0.1181 6.2208,-0.1181 1.1753,0 2.3354,0.012 3.5041,0.0394 1.1629,0.027 2.3087,0.0643 3.4648,0.1181 0.013,6e-4 0.026,-6e-4 0.039,0 1.1429,0.0535 2.2893,0.1175 3.4253,0.1969 0.013,9e-4 0.026,-10e-4 0.039,0 0.106,0.0074 0.209,0.0317 0.315,0.0393 3.3571,0.2435 6.709,0.5984 10.0005,1.0631 1.0855,0.1531 2.1901,0.2959 3.2679,0.4724 0.04,0.0067 0.078,0.0328 0.1181,0.0394 1.0766,0.1773 2.1206,0.3508 3.1892,0.5512 0.053,0.01 0.1044,0.0294 0.1575,0.0394 1.0561,0.1993 2.141,0.4083 3.1891,0.6299 0.04,0.0087 0.078,0.0308 0.1181,0.0394 1.0594,0.225 2.0989,0.4611 3.1498,0.7087 0.052,0.0124 0.105,0.0269 0.1575,0.0394 1.0963,0.2601 2.2205,0.5424 3.3073,0.8268 0.6488,0.1699 1.2838,0.3334 1.9292,0.5118 1.4431,0.3984 2.8665,0.8193 4.2916,1.26 0.079,0.0243 0.1575,0.0542 0.2362,0.0787 0.9823,0.3056 1.9795,0.6195 2.9529,0.9449 0.079,0.0264 0.1577,0.0523 0.2362,0.0788 0.028,0.0093 0.051,0.0301 0.079,0.0393 1.0282,0.3469 2.053,0.6943 3.071,1.0631 0.957,0.3462 1.8871,0.6977 2.8348,1.063 0.093,0.036 0.1825,0.082 0.2756,0.1182 0.9367,0.3632 1.9075,0.7207 2.8348,1.1024 0.082,0.0336 0.1548,0.0843 0.2362,0.1181 0.9364,0.3874 1.8688,0.7752 2.7955,1.1812 0.091,0.0399 0.1846,0.078 0.2756,0.1181 0.1349,0.0595 0.2589,0.137 0.3937,0.1968 0.8747,0.3892 1.7329,0.7757 2.5985,1.1812 1.9982,0.936 3.997,1.9312 5.9452,2.9529 0.859,0.4501 1.7103,0.8723 2.5592,1.3387 0.1095,0.0602 0.2057,0.1364 0.315,0.1968 1.7986,0.9951 3.6029,2.0435 5.3546,3.1104 0.1206,0.0735 0.234,0.1625 0.3544,0.2363 1.8688,1.1455 3.6993,2.3184 5.5121,3.5435 0.7775,0.5252 1.556,1.0353 2.3229,1.5748 0.1307,0.0921 0.2634,0.1833 0.3938,0.2756 0.03,0.0211 0.049,0.0577 0.079,0.0788 3.3915,2.4068 6.6717,4.9217 9.843,7.5988 0.1349,0.1139 0.2593,0.2401 0.3938,0.3544 0.7608,0.647 1.5361,1.3066 2.2835,1.9686 0.6618,0.7475 1.322,1.5227 1.9687,2.2836 0.1138,0.134 0.2409,0.2593 0.3543,0.3937 3.4029,4.0329 6.5667,8.2531 9.5281,12.6384 1.2241,1.8129 2.3989,3.6433 3.5435,5.5122 0.074,0.121 0.1624,0.233 0.2362,0.3543 1.6356,2.6879 3.1808,5.4318 4.6459,8.2288 2.5514,4.8707 4.8462,9.9082 6.8508,15.0795 0.036,0.0923 0.082,0.1832 0.1181,0.2756 1.1605,3.0123 2.2241,6.0702 3.1891,9.1737 0.024,0.079 0.054,0.1573 0.079,0.2363 0.3055,0.9885 0.581,1.9951 0.8662,2.9923 3.6955,12.9221 5.6696,26.5681 5.6696,40.6714 -1e-4,6.3189 -0.3708,12.553 -1.1418,18.6624 -0.01,0.0787 -0.029,0.1576 -0.039,0.2362 -0.01,0.0661 -0.031,0.1309 -0.039,0.1969 -0.311,2.4068 -0.6768,4.7968 -1.1024,7.1657 -1.5305,8.5195 -3.806,16.781 -6.7326,24.7258 -0.4182,1.1349 -0.8543,2.2643 -1.2993,3.386 -1.3351,3.365 -2.7606,6.6834 -4.331,9.9217 -1.0469,2.159 -2.1597,4.2796 -3.3072,6.3783 -1.1476,2.0988 -2.3378,4.146 -3.5829,6.1815 -0.01,0.01 0.01,0.0297 0,0.0393 -1.2397,2.0258 -2.5646,4.0247 -3.8978,5.9846 -1.3395,1.9691 -2.7034,3.8882 -4.1341,5.7877 -0.7154,0.9498 -1.4673,1.903 -2.2049,2.8348 -3.6878,4.6589 -7.637,9.0881 -11.851,13.2684 -24.6602,5.7863 -43.098,14.2468 -49.6483,25.4344 -27.8016,47.4846 91.559,257.1989 146.5826,257.5334 55.0236,0.3348 176.9543,-207.903 149.7323,-255.7222 -6.3384,-11.1343 -24.2749,-19.7912 -48.4277,-25.8675 -0.01,-0.007 -0.033,0.007 -0.039,0 -0.2272,-0.2195 -0.4436,-0.4485 -0.6693,-0.6694 -0.6379,-0.6244 -1.2635,-1.254 -1.8899,-1.8898 -0.5934,-0.6019 -1.1887,-1.1992 -1.7717,-1.8112 -0.1277,-0.134 -0.2667,-0.2592 -0.3938,-0.3937 -0.3512,-0.3714 -0.6763,-0.7668 -1.0236,-1.1418 -0.5917,-0.6391 -1.1914,-1.2797 -1.7718,-1.9292 -0.8051,-0.9004 -1.6186,-1.7967 -2.4017,-2.7167 -2.3466,-2.7584 -4.5909,-5.6162 -6.7326,-8.5437 -0.084,-0.1142 -0.153,-0.2399 -0.2363,-0.3544 -1.3458,-1.8506 -2.6373,-3.7161 -3.8978,-5.6302 -0.059,-0.0887 -0.099,-0.1868 -0.1575,-0.2756 -0.2429,-0.3706 -0.5084,-0.7296 -0.7481,-1.1024 -0.5914,-0.9202 -1.161,-1.8615 -1.7323,-2.7955 -0.6853,-1.12 -1.3521,-2.2465 -2.008,-3.386 -0.652,-1.1316 -1.3067,-2.275 -1.9293,-3.4253 -0.6261,-1.1584 -1.2547,-2.3275 -1.8505,-3.5042 -0.5958,-1.1766 -1.1674,-2.3883 -1.7323,-3.5828 -0.565,-1.1945 -1.1201,-2.3711 -1.6537,-3.5829 -0.5342,-1.2117 -1.0332,-2.4331 -1.5355,-3.6616 -1.0033,-2.4571 -1.9622,-4.9596 -2.8348,-7.4807 -0.8725,-2.5211 -1.6641,-5.0574 -2.4017,-7.6382 -1.1064,-3.8713 -2.0832,-7.8177 -2.8741,-11.8117 -1.8457,-9.3191 -2.7955,-18.9618 -2.7955,-28.8204 0,-4.6886 0.2017,-9.3205 0.63,-13.8984 0,-0.0129 0,-0.0264 0,-0.0393 0.643,-6.8533 1.7586,-13.5689 3.3073,-20.1192 0.01,-0.0248 -0.01,-0.054 0,-0.0788 1.549,-6.5367 3.5587,-12.9259 5.9452,-19.0955 0.015,-0.0386 0.024,-0.0795 0.039,-0.1181 0.7852,-2.0248 1.6097,-4.004 2.4805,-5.9845 0.4436,-1.0092 0.9125,-2.0345 1.378,-3.0317 0.017,-0.0376 0.022,-0.0805 0.039,-0.1181 0.3937,-0.8405 0.8115,-1.688 1.2205,-2.5198 0.07,-0.1427 0.1263,-0.2907 0.1969,-0.4331 0.4709,-0.9501 0.9661,-1.8964 1.4567,-2.8348 0.027,-0.0522 0.051,-0.1053 0.079,-0.1575 0.9911,-1.8913 2.0408,-3.7489 3.1104,-5.5909 0.029,-0.0503 0.049,-0.1072 0.079,-0.1575 0.5231,-0.8975 1.073,-1.7919 1.6143,-2.6773 0.6002,-0.9827 1.1887,-1.946 1.8111,-2.9135 0.3376,-0.5243 0.6796,-1.0551 1.0237,-1.5749 0.3231,-0.4885 0.6555,-0.9723 0.9843,-1.4568 1.1251,-1.6579 2.2749,-3.2732 3.4647,-4.8821 0.045,-0.0613 0.073,-0.1356 0.1181,-0.1969 0.5121,-0.6899 1.0512,-1.3667 1.5749,-2.0473 0.142,-0.1846 0.2902,-0.3673 0.4331,-0.5512 0.6294,-0.8099 1.2442,-1.6054 1.8899,-2.4017 0.041,-0.0513 0.077,-0.1063 0.1181,-0.1575 1.3307,-1.6383 2.6963,-3.2244 4.0947,-4.8034 2.4426,-2.1631 4.9377,-4.2604 7.5201,-6.2602 2.5824,-1.9998 5.2391,-3.92 7.9532,-5.7483 0.054,-0.0365 0.1032,-0.0817 0.1575,-0.1181 1.7568,-1.1801 3.5455,-2.2805 5.3546,-3.3861 0.055,-0.0337 0.1021,-0.0844 0.1575,-0.1181 1.8111,-1.1035 3.6509,-2.1625 5.5121,-3.1891 0.959,-0.529 1.9416,-1.0668 2.9135,-1.5749 0.041,-0.0216 0.077,-0.0572 0.1181,-0.0787 0.9293,-0.4839 1.8941,-0.9529 2.8348,-1.4174 0.042,-0.0209 0.076,-0.0579 0.1181,-0.0788 0.9409,-0.4635 1.8828,-0.8947 2.8348,-1.3386 0.042,-0.0198 0.076,-0.059 0.1181,-0.0788 0.6154,-0.2862 1.2306,-0.5488 1.8505,-0.8268 0.5473,-0.2458 1.1029,-0.4694 1.6537,-0.7087 1.6879,-0.7334 3.3984,-1.4547 5.1184,-2.1261 0.2476,-0.0967 0.4997,-0.1802 0.748,-0.2756 1.9492,-0.7487 3.9179,-1.4588 5.9058,-2.1261 0.028,-0.0093 0.051,-0.0301 0.079,-0.0394 1.0125,-0.3384 2.0489,-0.6673 3.071,-0.9843 0.039,-0.0122 0.079,-0.0272 0.1181,-0.0393 1.062,-0.3284 2.1171,-0.6401 3.1892,-0.945 1.0738,-0.3059 2.1448,-0.6234 3.2285,-0.9055 0.5347,-0.139 1.0772,-0.2607 1.6143,-0.3938 0.927,-0.2301 1.8615,-0.4568 2.7954,-0.6693 1.7877,-0.4068 3.5822,-0.7612 5.394,-1.1024 4.3308,-0.8155 8.7343,-1.4621 13.1896,-1.8899 4.6919,-0.4504 9.443,-0.6693 14.2528,-0.6693 2.6041,0 5.185,0.0634 7.7563,0.1969 0.21,0.0109 0.4201,0.0276 0.6299,0.0393 1.0745,0.0604 2.1603,0.1137 3.2286,0.1969 0.3129,0.0244 0.6324,0.0524 0.9449,0.0787 0.2238,0.0189 0.4457,0.0589 0.6693,0.0788 1.1514,0.1023 2.2817,0.2257 3.4254,0.3543 0.8559,0.0963 1.7077,0.2042 2.5592,0.315 0.1432,0.0187 0.2899,0.0203 0.4331,0.0394 0.6097,0.0812 1.2037,0.187 1.8111,0.2756 1.1168,0.1629 2.238,0.3241 3.3466,0.5118 0.6277,0.1064 1.265,0.2007 1.8899,0.315 0.2379,0.0435 0.4711,0.1129 0.7087,0.1575 0.9977,0.1876 2.0017,0.3831 2.9923,0.5906 0.8001,0.1676 1.6063,0.3313 2.4017,0.5118 0.065,0.0149 0.1315,0.0245 0.1968,0.0394 1.2523,0.2861 2.5005,0.5878 3.7404,0.9055 0.3147,0.0807 0.631,0.1536 0.9449,0.2363 0.5539,0.1458 1.1024,0.3203 1.6537,0.4724 0.6448,0.1781 1.2879,0.3647 1.9292,0.5513 1.0748,0.3124 2.1246,0.6088 3.1891,0.9449 0.1298,0.041 0.2642,0.0768 0.3938,0.1181 1.144,0.3648 2.2936,0.7501 3.4253,1.1418 1.1932,0.4129 2.3644,0.8569 3.5435,1.2993 0.5224,0.196 1.0554,0.3888 1.5749,0.5906 0.6218,0.2414 1.2329,0.4984 1.8505,0.748 0.1681,0.068 0.344,0.1284 0.5118,0.1969 0.9681,0.3954 1.9559,0.8053 2.9136,1.2205 0.2484,0.1078 0.5003,0.2059 0.7481,0.315 0.8725,0.3841 1.7349,0.7808 2.5985,1.1812 1.5311,0.7102 3.065,1.4442 4.5672,2.2048 0.6656,0.337 1.3088,0.677 1.9686,1.0237 0.5133,0.2697 1.0258,0.5513 1.5355,0.8268 0.5639,0.3049 1.1336,0.633 1.693,0.9449 0.5824,0.3249 1.1549,0.6519 1.7324,0.9843 0.4759,0.2739 0.9449,0.5478 1.4174,0.8269 0.6598,0.3897 1.3154,0.7815 1.9686,1.1811 0.3824,0.234 0.7617,0.4714 1.1418,0.7087 0.065,0.0405 0.1321,0.0776 0.1969,0.1181 0.9637,0.6037 1.9254,1.2254 2.8741,1.8505 0.1672,0.1102 0.3451,0.2042 0.5119,0.315 0.635,0.4223 1.2617,0.8675 1.8898,1.2993 1.0797,0.7422 2.1304,1.4743 3.1892,2.2442 0.1293,0.094 0.2647,0.1812 0.3937,0.2756 2.9268,2.143 5.786,4.3849 8.5437,6.7326 0.1063,0.0905 0.209,0.1849 0.315,0.2756 0.8121,0.6951 1.6051,1.414 2.4017,2.1261 0.1797,0.1608 0.3723,0.3109 0.5512,0.4725 0.7171,0.6473 1.422,1.3076 2.1261,1.9686 0.2498,0.2346 0.4999,0.4724 0.7481,0.7087 0.6257,0.5957 1.2353,1.2047 1.8505,1.8111 0.3123,0.308 0.6354,0.595 0.9449,0.9056 0.5443,0.5461 1.0786,1.0992 1.6143,1.6536 0.01,0.0069 -0.01,0.0326 0,0.0394 6.0762,24.1528 14.6938,42.0893 25.8281,48.4278 47.8192,27.222 256.0568,-94.7088 255.7223,-149.7324 -0.3349,-55.0235 -210.0489,-174.38418 -257.5334,-146.58254 -11.1877,6.55029 -19.6088,24.98804 -25.395,49.64834 -0.078,0.0789 -0.1578,0.1575 -0.2363,0.2362 -0.7588,0.7615 -1.5084,1.4994 -2.2836,2.2442 -0.1682,0.1617 -0.3428,0.3116 -0.5118,0.4725 -0.6919,0.6586 -1.3821,1.3234 -2.0867,1.9686 -0.2598,0.238 -0.526,0.4726 -0.7875,0.7087 -0.6218,0.5613 -1.2585,1.1421 -1.8898,1.693 -0.3495,0.305 -0.7107,0.6038 -1.0631,0.9055 -0.5473,0.4686 -1.0994,0.9175 -1.6536,1.3781 -0.4528,0.3765 -0.9207,0.7313 -1.378,1.1024 -1.0153,0.8238 -2.0338,1.6439 -3.0711,2.4411 -1.0372,0.7971 -2.091,1.5924 -3.1497,2.3623 -0.2903,0.211 -0.5744,0.4211 -0.8662,0.6299 -0.7723,0.5531 -1.5398,1.0759 -2.323,1.6143 -0.8703,0.5983 -1.7542,1.1918 -2.6379,1.7718 -0.2126,0.1395 -0.4166,0.2946 -0.63,0.433 -0.1037,0.0673 -0.2111,0.1299 -0.3149,0.1969 -2.0021,1.2922 -4.0359,2.544 -6.1027,3.7404 -0.1016,0.0588 -0.2133,0.0989 -0.315,0.1575 -0.935,0.5379 -1.887,1.0963 -2.8348,1.6142 -0.1966,0.1075 -0.3934,0.2084 -0.5906,0.315 -0.8558,0.4626 -1.6934,0.9319 -2.5592,1.378 -0.3123,0.161 -0.6313,0.3137 -0.9449,0.4725 -1.1767,0.5958 -2.3884,1.1674 -3.5829,1.7324 -0.3787,0.1791 -0.7613,0.3358 -1.1418,0.5118 -0.2779,0.1285 -0.5479,0.2669 -0.8268,0.3937 -1.0945,0.4977 -2.1986,0.9852 -3.3072,1.4568 -0.6559,0.279 -1.308,0.557 -1.9687,0.8268 -0.4579,0.187 -0.9178,0.3687 -1.378,0.5512 -0.7782,0.3087 -1.5777,0.6098 -2.3623,0.9056 -0.3422,0.1289 -0.6803,0.2673 -1.0237,0.3937 -0.9055,0.3336 -1.8029,0.668 -2.7167,0.9843 -0.2353,0.0814 -0.4728,0.156 -0.7087,0.2362 -1.0287,0.3503 -2.0716,0.6957 -3.1104,1.0237 -0.1187,0.0375 -0.2354,0.081 -0.3543,0.1181 -0.5909,0.1849 -1.1777,0.3342 -1.7718,0.5119 -1.7446,0.5215 -3.4655,1.038 -5.2365,1.4961 -0.117,0.0303 -0.2372,0.0487 -0.3543,0.0787 -1.0691,0.2738 -2.1502,0.5372 -3.2285,0.7875 -0.2359,0.0548 -0.4724,0.1038 -0.7087,0.1575 -0.9636,0.2186 -1.943,0.4303 -2.9136,0.6299 -0.8408,0.173 -1.6738,0.3533 -2.5198,0.5119 -0.3684,0.0691 -0.7331,0.1305 -1.1024,0.1968 -0.4847,0.0872 -0.9705,0.1539 -1.4568,0.2363 -0.7355,0.1245 -1.4657,0.2408 -2.2048,0.3543 -0.6157,0.0947 -1.2324,0.1886 -1.8505,0.2756 -1.356,0.191 -2.7272,0.358 -4.0947,0.5119 -0.4972,0.0558 -0.9975,0.1065 -1.4962,0.1574 -1.2076,0.1234 -2.4062,0.2604 -3.6222,0.3544 -0.039,0.003 -0.079,-0.003 -0.1181,0 -1.0034,0.0768 -2.0228,0.1402 -3.0317,0.1969 -0.2497,0.014 -0.498,0.0266 -0.748,0.0393 -0.2232,0.0115 -0.4459,0.029 -0.6694,0.0394 -2.3092,0.1074 -4.6332,0.1575 -6.9688,0.1575 -2.3444,0 -4.6904,-0.0492 -7.0083,-0.1575 -2.3175,-0.108 -4.6017,-0.2587 -6.8901,-0.4725 -5.7094,-0.5341 -11.3483,-1.432 -16.8513,-2.5985 -0.013,-0.003 -0.027,0.003 -0.039,0 -2.206,-0.4682 -4.3672,-0.9699 -6.5357,-1.5355 -2.1686,-0.5656 -4.3284,-1.19 -6.4571,-1.8505 -1.4217,-0.4412 -2.8492,-0.8954 -4.2522,-1.3781 -1.7336,-0.5963 -3.4539,-1.2313 -5.1577,-1.8898 -0.4231,-0.1635 -0.8387,-0.3446 -1.2599,-0.5119 -1.6313,-0.648 -3.2801,-1.304 -4.8822,-2.0079 -0.9983,-0.4389 -2.0056,-0.9178 -2.9923,-1.3781 -0.011,-0.005 -0.029,0.005 -0.039,0 -0.9865,-0.4604 -1.9391,-0.9359 -2.9136,-1.4174 -0.01,-0.005 -0.029,0.005 -0.039,0 -1.324,-0.6545 -2.6359,-1.3546 -3.9372,-2.0473 -1.5871,-0.8449 -3.1726,-1.6981 -4.7246,-2.5986 -2.227,-1.2926 -4.4238,-2.6514 -6.5752,-4.0553 -0.5942,-0.3876 -1.1835,-0.7853 -1.7717,-1.1812 -0.01,-0.006 -0.03,0.006 -0.039,0 -0.6245,-0.4204 -1.2329,-0.8695 -1.8505,-1.2993 -1.1738,-0.8169 -2.316,-1.6305 -3.4647,-2.4804 -1.7374,-1.2849 -3.48,-2.6185 -5.1578,-3.9766 -0.86,-0.6963 -1.6759,-1.411 -2.5198,-2.1261 -0.816,-0.6912 -1.6405,-1.3782 -2.4411,-2.0867 -0.7334,-0.8281 -1.4505,-1.6752 -2.1655,-2.5198 -0.6912,-0.8158 -1.3737,-1.6103 -2.0473,-2.4411 -0.012,-0.0141 -0.028,-0.0252 -0.039,-0.0394 -1.3581,-1.6778 -2.6917,-3.4204 -3.9766,-5.1577 -0.011,-0.0148 -0.028,-0.0246 -0.039,-0.0394 -0.637,-0.8609 -1.2321,-1.7235 -1.8505,-2.5986 -0.011,-0.0149 -0.029,-0.0244 -0.039,-0.0393 -0.6183,-0.8755 -1.2509,-1.7487 -1.8505,-2.638 -0.01,-0.015 -0.029,-0.0243 -0.039,-0.0393 -0.5993,-0.8897 -1.152,-1.8135 -1.7323,-2.7167 -0.01,-0.0153 -0.03,-0.0241 -0.039,-0.0394 -0.58,-0.9034 -1.1324,-1.8 -1.693,-2.7167 -0.5791,-0.948 -1.1742,-1.9121 -1.7324,-2.8741 -1.0895,-1.8779 -2.1418,-3.78 -3.1498,-5.709 -0.01,-0.0155 -0.031,-0.0238 -0.039,-0.0394 -0.5001,-0.9563 -0.9773,-1.9451 -1.4568,-2.9135 -0.01,-0.0158 -0.032,-0.0236 -0.039,-0.0394 -0.4791,-0.9686 -0.9197,-1.9331 -1.378,-2.91353 -0.01,-0.0156 -0.032,-0.0238 -0.039,-0.0394 -0.923,-1.9792 -1.7619,-3.99828 -2.5985,-6.02394 -0.01,-0.0158 -0.033,-0.0236 -0.039,-0.0394 -0.4151,-1.0044 -0.8271,-2.01624 -1.2205,-3.03166 -0.01,-0.0157 -0.033,-0.0236 -0.039,-0.0394 -0.3932,-1.01579 -0.7313,-2.0445 -1.1024,-3.07103 -0.01,-0.0157 -0.034,-0.0237 -0.039,-0.0394 -0.3709,-1.02687 -0.7145,-2.07308 -1.0631,-3.1104 -4.95,-14.7549 -7.6382,-30.56092 -7.6382,-46.97099 0,-9.8586 0.9498,-19.50123 2.7955,-28.82042 0.7909,-3.99395 1.7677,-7.94037 2.8741,-11.81165 1.4752,-5.16172 3.2299,-10.20461 5.2365,-15.11891 0.5017,-1.22859 1.002,-2.44981 1.5355,-3.66161 1.0671,-2.42363 2.1945,-4.81236 3.386,-7.16574 0.5958,-1.17669 1.2244,-2.34578 1.8505,-3.50412 0.6262,-1.15835 1.2733,-2.28591 1.9293,-3.42538 0.6559,-1.13947 1.3227,-2.26593 2.008,-3.386 0.6852,-1.12009 1.3727,-2.24648 2.0867,-3.34664 3.5699,-5.50078 7.4831,-10.74598 11.7329,-15.70949 0.8526,-0.99592 1.7202,-1.98025 2.5985,-2.95291 0.8756,-0.96965 1.7767,-1.92812 2.6774,-2.87417 0.8969,-0.94192 1.7953,-1.87747 2.7166,-2.79542 0.5577,-0.55569 1.1266,-1.10688 1.693,-1.65363 24.1289,-6.07563 42.0541,-14.66173 48.3884,-25.78877 27.222,-47.81919 -94.7087,-256.05687 -149.7323,-255.7222 z m 1.4568,512.2318 c 35.9667,0 65.1609,29.1942 65.1609,65.161 0,35.9667 -29.1942,65.1609 -65.1609,65.1609 -35.9668,0 -65.161,-29.1942 -65.161,-65.1609 1e-4,-35.9668 29.1942,-65.161 65.161,-65.161 z",
            id:"path4976",
            style:"fill:#888a85;fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 3881.5417,-735.83178 c -55.0236,0.33467 -174.3842,210.04883 -146.5826,257.53332 6.5503,11.18766 24.9881,19.60883 49.6483,25.39504 0.8428,0.83605 1.6579,1.66376 2.4805,2.51982 0.168,0.17483 0.3446,0.33618 0.5118,0.51184 0.6523,0.68553 1.2901,1.38876 1.9293,2.08672 0.8018,0.87565 1.6208,1.78244 2.4017,2.67731 0.7808,0.89486 1.5242,1.80299 2.2835,2.71668 0.3819,0.45914 0.7655,0.9142 1.1418,1.37803 0.3716,0.45825 0.7363,0.91523 1.1025,1.37802 0.4466,0.56403 0.9001,1.12234 1.3386,1.693 0.289,0.37628 0.5808,0.76267 0.8662,1.1418 0.1008,0.13376 0.2147,0.25959 0.315,0.39372 0.6111,0.81754 1.1772,1.64994 1.7717,2.48045 0.5576,0.77829 1.1109,1.53347 1.6537,2.32295 0.1343,0.19558 0.2602,0.39432 0.3937,0.59059 1.3394,1.96993 2.6528,3.98743 3.8978,6.02394 0.6225,1.01823 1.2128,2.03673 1.8111,3.07102 0.062,0.10731 0.135,0.2075 0.1969,0.31498 0.5346,0.92955 1.06,1.89265 1.5749,2.8348 0.5737,1.04993 1.1442,2.08457 1.693,3.14977 0.5488,1.06519 1.0908,2.14845 1.6143,3.22852 1.5702,3.24018 2.9959,6.55494 4.3309,9.92178 0.445,1.12227 0.8812,2.25044 1.2993,3.38601 1.6723,4.54225 3.1444,9.15939 4.3703,13.89837 0.9194,3.55422 1.7064,7.1749 2.3623,10.82735 0.4255,2.36971 0.7914,4.75836 1.1024,7.16573 0.01,0.0663 0.031,0.13055 0.039,0.19686 0.01,0.0789 0.029,0.15726 0.039,0.23623 0.7709,6.111 1.1418,12.34351 1.1418,18.66241 -10e-5,11.69192 -1.3288,23.07073 -3.8979,33.97818 -0.01,0.0276 -0.033,0.0512 -0.039,0.0787 -0.5097,2.15834 -1.0504,4.29708 -1.6537,6.41766 -0.01,0.0277 -0.032,0.051 -0.039,0.0788 -1.8373,6.44336 -4.1132,12.72907 -6.7721,18.78052 -1.7726,4.03432 -3.7132,7.97551 -5.827,11.81164 -1.0256,1.8612 -2.0866,3.7009 -3.1892,5.5121 -0.034,0.0554 -0.084,0.1022 -0.1181,0.1575 -2.8466,4.6624 -5.9214,9.1613 -9.2525,13.4653 -1.9986,2.5824 -4.0978,5.0775 -6.2601,7.5201 -1.5791,1.3984 -3.1651,2.7639 -4.8034,4.0947 -0.5883,0.4778 -1.2155,0.9485 -1.8112,1.4174 -0.2513,0.1978 -0.4954,0.3944 -0.748,0.5905 -0.066,0.051 -0.1313,0.1067 -0.1969,0.1575 -0.797,0.6168 -1.5919,1.2498 -2.4017,1.8505 -0.061,0.0455 -0.1355,0.0728 -0.1969,0.1181 -0.8162,0.6036 -1.612,1.1848 -2.441,1.7718 -0.6766,0.4792 -1.3625,0.9493 -2.0474,1.4174 -0.2235,0.1527 -0.4449,0.3209 -0.6693,0.4725 -0.054,0.0366 -0.1032,0.0815 -0.1575,0.1181 -0.8532,0.5745 -1.7328,1.1359 -2.5986,1.693 -0.049,0.0316 -0.1083,0.0472 -0.1574,0.0787 -1.7931,1.1507 -3.5885,2.2725 -5.4334,3.3467 -0.05,0.0293 -0.1072,0.0495 -0.1575,0.0787 -0.8981,0.5214 -1.8068,1.0326 -2.7167,1.5355 -0.051,0.0283 -0.1063,0.0505 -0.1575,0.0788 -0.9102,0.5017 -1.7948,1.0132 -2.7166,1.4961 -0.052,0.0274 -0.1053,0.0515 -0.1575,0.0787 -0.923,0.4821 -1.8612,0.9544 -2.7955,1.4174 -0.052,0.026 -0.1051,0.0529 -0.1574,0.0788 -0.935,0.462 -1.8888,0.896 -2.8348,1.3386 -0.043,0.0201 -0.075,0.0588 -0.1182,0.0788 -0.9571,0.4467 -1.906,0.8727 -2.8741,1.2993 -0.053,0.0235 -0.1042,0.0553 -0.1575,0.0787 -0.9585,0.421 -1.9446,0.8195 -2.9136,1.2205 -0.039,0.016 -0.079,0.0235 -0.1181,0.0394 -0.985,0.4068 -1.9573,0.8346 -2.9529,1.2206 -0.039,0.0149 -0.08,0.0244 -0.1181,0.0393 -0.9958,0.3851 -1.9862,0.7385 -2.9923,1.1024 -0.039,0.0142 -0.079,0.0253 -0.1181,0.0394 -1.0068,0.3632 -2.0149,0.7213 -3.0317,1.0631 -0.039,0.0132 -0.079,0.0261 -0.1181,0.0393 -2.9577,0.9923 -5.9785,1.91 -9.0162,2.7167 -0.1704,0.0452 -0.3412,0.0735 -0.5118,0.1181 -0.04,0.0106 -0.078,0.0289 -0.1181,0.0394 -1.0476,0.2728 -2.1328,0.5372 -3.1892,0.7874 -0.028,0.007 -0.051,0.0328 -0.079,0.0394 -0.7693,0.1818 -1.5492,0.3422 -2.323,0.5119 -4.8329,1.0594 -9.7682,1.8683 -14.7646,2.441 -2.15,0.2463 -4.3195,0.4771 -6.4964,0.63 -3.4644,0.2433 -6.9471,0.3543 -10.473,0.3543 -1.4118,1e-4 -2.8105,1e-4 -4.2128,-0.0393 -0.9236,-0.0259 -1.8367,-0.0753 -2.756,-0.1182 -0.222,-0.0102 -0.4477,-0.028 -0.6694,-0.0393 -0.9443,-0.0482 -1.8952,-0.0916 -2.8348,-0.1575 -0.3148,-0.0221 -0.6306,-0.0547 -0.9449,-0.0788 -0.039,-0.003 -0.079,0.003 -0.1181,0 -1.2159,-0.0939 -2.4148,-0.231 -3.6222,-0.3543 -0.4986,-0.0509 -0.9991,-0.1016 -1.4962,-0.1575 -1.3675,-0.1538 -2.7387,-0.3209 -4.0947,-0.5118 -0.6182,-0.0871 -1.2348,-0.181 -1.8505,-0.2756 -0.6725,-0.1033 -1.3385,-0.2026 -2.008,-0.315 -0.066,-0.011 -0.1311,-0.0283 -0.1968,-0.0394 -0.8564,-0.1449 -1.7079,-0.2734 -2.5592,-0.4331 -0.8457,-0.1586 -1.6793,-0.3388 -2.5198,-0.5118 -0.9703,-0.1997 -1.9504,-0.4113 -2.9136,-0.63 -0.053,-0.0119 -0.1046,-0.0273 -0.1575,-0.0393 -1.1411,-0.2604 -2.2551,-0.5402 -3.386,-0.8269 -0.1294,-0.0327 -0.2644,-0.0456 -0.3937,-0.0787 -0.5796,-0.1486 -1.1556,-0.317 -1.7324,-0.4725 -0.7091,-0.1909 -1.4212,-0.3893 -2.1261,-0.5906 -0.012,-0.003 -0.027,0.004 -0.039,0 -0.5726,-0.1636 -1.1233,-0.3414 -1.693,-0.5118 -0.7088,-0.212 -1.4219,-0.4076 -2.1261,-0.6299 -1.0388,-0.328 -2.0817,-0.6735 -3.1104,-1.0237 -0.028,-0.009 -0.051,-0.03 -0.079,-0.0394 -0.6613,-0.2255 -1.3115,-0.474 -1.9686,-0.7087 -0.8015,-0.2862 -1.6066,-0.5665 -2.4017,-0.8662 -0.7845,-0.2957 -1.5842,-0.5969 -2.3623,-0.9055 -0.2243,-0.089 -0.4455,-0.1856 -0.6693,-0.2756 -0.8957,-0.3604 -1.7904,-0.7251 -2.6773,-1.1025 -1.108,-0.4715 -2.2134,-0.959 -3.3073,-1.4567 -0.6595,-0.3001 -1.3143,-0.5961 -1.9686,-0.9056 -0.9831,-0.4649 -1.9818,-0.9315 -2.9529,-1.4174 -0.4239,-0.2121 -0.8384,-0.4533 -1.2599,-0.6693 -0.7859,-0.4031 -1.5847,-0.8038 -2.3624,-1.2206 -0.1861,-0.0996 -0.3655,-0.2145 -0.5512,-0.3149 -1.1123,-0.6022 -2.2123,-1.2208 -3.3072,-1.8505 -0.026,-0.0147 -0.053,-0.0247 -0.079,-0.0394 -1.1426,-0.658 -2.2629,-1.3204 -3.386,-2.008 -1.0051,-0.6148 -2.0032,-1.2518 -2.9923,-1.8898 -0.8425,-0.5439 -1.6891,-1.0932 -2.5198,-1.6537 -0.2504,-0.1689 -0.4988,-0.3414 -0.7481,-0.5118 -0.8927,-0.6099 -1.7593,-1.2216 -2.6379,-1.8505 -0.3004,-0.2151 -0.6069,-0.4127 -0.9056,-0.63 -0.3853,-0.2802 -0.7592,-0.5823 -1.1418,-0.8661 -0.5118,-0.38 -1.0287,-0.7554 -1.5355,-1.1418 -0.4153,-0.3166 -0.8086,-0.6635 -1.2205,-0.9843 -0.5598,-0.4363 -1.1397,-0.8551 -1.693,-1.2993 -0.6625,-0.5316 -1.3156,-1.0716 -1.9686,-1.6143 -0.9134,-0.7593 -1.822,-1.5027 -2.7167,-2.2836 -0.8946,-0.7808 -1.8018,-1.5998 -2.6773,-2.4017 -0.7115,-0.6516 -1.4275,-1.3032 -2.1261,-1.9686 -0.1621,-0.1543 -0.311,-0.3173 -0.4725,-0.4724 -0.8559,-0.8226 -1.6837,-1.6377 -2.5198,-2.4805 -5.7862,-24.66019 -14.2467,-43.09803 -25.4344,-49.64829 -47.4845,-27.80162 -257.1987,91.55899 -257.5333,146.58259 -0.3347,55.0236 207.903,176.9543 255.7222,149.7323 11.1401,-6.3417 19.7907,-24.2954 25.8675,-48.4671 1.6782,-1.7369 3.397,-3.4258 5.1577,-5.079 1.7608,-1.6532 3.554,-3.2766 5.394,-4.8428 0.878,-0.7472 1.7819,-1.4779 2.6773,-2.2049 0.043,-0.0348 0.075,-0.0833 0.1182,-0.1181 0.9759,-0.7904 1.9567,-1.5571 2.9529,-2.3229 0.919,-0.7063 1.8595,-1.4018 2.7954,-2.0867 0.1204,-0.0881 0.2337,-0.1879 0.3543,-0.2757 0.4151,-0.3018 0.8416,-0.5685 1.2599,-0.8661 0.6192,-0.4407 1.2244,-0.9074 1.8505,-1.3387 0.8253,-0.568 1.6826,-1.1021 2.5199,-1.6536 0.9721,-0.6409 1.9255,-1.2715 2.9135,-1.8899 0.1053,-0.0658 0.2095,-0.1312 0.315,-0.1969 0.6494,-0.404 1.3125,-0.7869 1.9686,-1.1811 0.4987,-0.2997 0.9936,-0.6116 1.4961,-0.9056 0.8749,-0.5116 1.7517,-1.0021 2.638,-1.4961 0.5544,-0.3093 1.0948,-0.6426 1.6536,-0.9449 0.3141,-0.1698 0.6294,-0.3443 0.9449,-0.5119 0.4298,-0.2285 0.867,-0.4449 1.2993,-0.6693 0.82,-0.4252 1.6516,-0.8498 2.4805,-1.2599 0.105,-0.052 0.2097,-0.1057 0.3149,-0.1575 1.0145,-0.499 2.0437,-0.9805 3.0711,-1.4568 1.1086,-0.5142 2.2233,-1.0088 3.3466,-1.4961 0.9555,-0.4145 1.9083,-0.8258 2.8742,-1.2206 0.1678,-0.0685 0.3436,-0.1289 0.5118,-0.1968 0.6173,-0.2496 1.2291,-0.5066 1.8505,-0.7481 0.5195,-0.2017 1.0525,-0.3945 1.5749,-0.5906 0.4318,-0.162 0.8656,-0.3143 1.2993,-0.4724 0.7232,-0.2637 1.437,-0.5349 2.1654,-0.7875 0.027,-0.0094 0.052,-0.0299 0.079,-0.0394 1.1435,-0.3957 2.3087,-0.7735 3.4647,-1.1417 0.1189,-0.0379 0.2354,-0.0806 0.3544,-0.1182 1.0645,-0.3361 2.1143,-0.6324 3.1891,-0.9449 0.2108,-0.0613 0.4188,-0.1364 0.63,-0.1969 0.4301,-0.1229 0.8675,-0.2352 1.2993,-0.3543 0.8647,-0.2388 1.7274,-0.4853 2.5985,-0.7087 1.2399,-0.3177 2.4881,-0.6195 3.7404,-0.9056 0.8602,-0.1964 1.7326,-0.3698 2.5985,-0.5512 0.9902,-0.2075 1.9949,-0.403 2.9923,-0.5906 0.861,-0.1618 1.7323,-0.3256 2.5986,-0.4724 1.1086,-0.1877 2.2297,-0.349 3.3466,-0.5119 0.6023,-0.0878 1.2065,-0.1951 1.8111,-0.2756 0.995,-0.1325 1.9911,-0.2418 2.9923,-0.3543 1.1437,-0.1286 2.274,-0.2521 3.4254,-0.3544 0.3296,-0.0292 0.6541,-0.091 0.9843,-0.1181 1.2766,-0.1049 2.5729,-0.164 3.8585,-0.2362 0.2098,-0.0118 0.4199,-0.0285 0.6299,-0.0394 0.5118,-0.0265 1.0224,-0.0574 1.5355,-0.0787 2.0648,-0.0858 4.1351,-0.1182 6.2208,-0.1182 1.1753,1e-4 2.3354,0.012 3.5042,0.0394 1.1628,0.0271 2.3086,0.0643 3.4647,0.1181 0.013,7e-4 0.026,-6e-4 0.039,0 1.1429,0.0536 2.2893,0.1176 3.4254,0.1969 0.013,9e-4 0.026,-9e-4 0.039,0 0.106,0.008 0.209,0.0317 0.315,0.0394 3.3571,0.2434 6.7091,0.5984 10.0005,1.063 1.0855,0.1531 2.1901,0.296 3.2679,0.4725 0.04,0.007 0.078,0.0327 0.1181,0.0394 1.0766,0.1773 2.1206,0.3507 3.1892,0.5512 0.053,0.01 0.1044,0.0293 0.1575,0.0393 1.0562,0.1994 2.141,0.4083 3.1891,0.63 0.041,0.009 0.078,0.0307 0.1181,0.0394 1.0595,0.225 2.0989,0.4611 3.1498,0.7087 0.053,0.0124 0.105,0.0269 0.1575,0.0393 1.0963,0.2602 2.2205,0.5424 3.3073,0.8269 0.6488,0.1698 1.2838,0.3334 1.9292,0.5118 1.4431,0.3983 2.8665,0.8192 4.2916,1.2599 0.079,0.0244 0.1575,0.0543 0.2362,0.0787 0.9823,0.3056 1.9795,0.6195 2.9529,0.945 0.079,0.0263 0.1577,0.0523 0.2362,0.0787 0.028,0.0093 0.051,0.0301 0.079,0.0394 1.0282,0.3469 2.053,0.6943 3.071,1.063 0.957,0.3463 1.8871,0.6978 2.8348,1.0631 0.093,0.036 0.1825,0.082 0.2756,0.1181 0.9367,0.3633 1.9075,0.7207 2.8348,1.1024 0.081,0.0337 0.1548,0.0844 0.2362,0.1181 0.9365,0.3875 1.8688,0.7752 2.7955,1.1812 0.091,0.04 0.1847,0.078 0.2756,0.1181 0.1349,0.0595 0.2589,0.137 0.3937,0.1969 0.8747,0.3891 1.7329,0.7756 2.5986,1.1812 1.9982,0.936 3.9969,1.9312 5.9452,2.9529 0.8589,0.45 1.7102,0.8722 2.5591,1.3386 0.1095,0.0603 0.2057,0.1364 0.315,0.1969 1.7986,0.9951 3.6029,2.0435 5.3546,3.1104 0.1206,0.0735 0.234,0.1624 0.3544,0.2362 1.8688,1.1456 3.6993,2.3184 5.5121,3.5435 0.7775,0.5252 1.556,1.0354 2.323,1.5749 0.1306,0.092 0.2633,0.1832 0.3937,0.2756 0.03,0.0211 0.049,0.0577 0.079,0.0787 3.3915,2.4069 6.6718,4.9217 9.8431,7.5989 0.1348,0.1138 0.2592,0.24 0.3937,0.3543 0.7609,0.647 1.5361,1.3066 2.2836,1.9686 0.6617,0.7475 1.3219,1.5227 1.9686,2.2836 0.1139,0.134 0.2409,0.2593 0.3543,0.3937 3.4029,4.033 6.5667,8.2532 9.5281,12.6385 1.2241,1.8128 2.399,3.6433 3.5435,5.5121 0.074,0.1211 0.1624,0.2331 0.2362,0.3544 1.6356,2.6879 3.1808,5.4318 4.6459,8.2287 2.5514,4.8708 4.8462,9.9083 6.8508,15.0796 0.036,0.0923 0.082,0.1832 0.1181,0.2756 1.1605,3.0123 2.2241,6.0701 3.1891,9.1737 0.025,0.0789 0.054,0.1573 0.079,0.2362 0.3055,0.9885 0.581,1.9951 0.8662,2.9923 3.6956,12.9222 5.6696,26.5682 5.6696,40.6715 -10e-5,6.3189 -0.3708,12.5529 -1.1418,18.6624 -0.01,0.0786 -0.029,0.1576 -0.039,0.2362 -0.01,0.0661 -0.031,0.1308 -0.039,0.1968 -0.311,2.4068 -0.6768,4.7969 -1.1024,7.1658 -1.5305,8.5195 -3.806,16.781 -6.7326,24.7257 -0.4181,1.135 -0.8543,2.2643 -1.2993,3.386 -1.3351,3.365 -2.7606,6.6834 -4.3309,9.9218 -1.0469,2.1589 -2.1598,4.2795 -3.3073,6.3783 -1.1476,2.0988 -2.3378,4.146 -3.5829,6.1814 -0.01,0.01 0.01,0.0297 0,0.0394 -1.2397,2.0257 -2.5646,4.0246 -3.8978,5.9846 -1.3395,1.969 -2.7034,3.8882 -4.1341,5.7877 -0.7154,0.9497 -1.4673,1.903 -2.2048,2.8348 -3.6879,4.6588 -7.637,9.088 -11.8511,13.2684 -24.6602,5.7862 -43.098,14.2467 -49.6483,25.4344 -27.8016,47.4845 91.559,257.1987 146.5826,257.5332 55.0236,0.3349 176.9543,-207.9029 149.7323,-255.7221 -6.3384,-11.1343 -24.2749,-19.7912 -48.4277,-25.8675 -0.01,-0.007 -0.033,0.007 -0.039,0 -0.2272,-0.2194 -0.4436,-0.4484 -0.6693,-0.6693 -0.6378,-0.6244 -1.2634,-1.2541 -1.8899,-1.8899 -0.5934,-0.6019 -1.1887,-1.1991 -1.7717,-1.8111 -0.1276,-0.134 -0.2667,-0.2592 -0.3938,-0.3937 -0.3512,-0.3714 -0.6762,-0.7668 -1.0236,-1.1418 -0.5916,-0.6391 -1.1914,-1.2797 -1.7718,-1.9293 -0.8051,-0.9003 -1.6186,-1.7966 -2.4017,-2.7166 -2.3466,-2.7585 -4.5908,-5.6163 -6.7326,-8.5438 -0.084,-0.1142 -0.153,-0.2399 -0.2363,-0.3543 -1.3458,-1.8506 -2.6373,-3.7162 -3.8978,-5.6303 -0.059,-0.0887 -0.099,-0.1867 -0.1575,-0.2756 -0.2429,-0.3705 -0.5084,-0.7295 -0.7481,-1.1024 -0.5914,-0.9201 -1.1609,-1.8614 -1.7323,-2.7954 -0.6853,-1.1201 -1.3521,-2.2466 -2.008,-3.386 -0.652,-1.1317 -1.3067,-2.2751 -1.9292,-3.4254 -0.6262,-1.1583 -1.2547,-2.3274 -1.8505,-3.5041 -0.5959,-1.1767 -1.1675,-2.3884 -1.7324,-3.5829 -0.565,-1.1945 -1.1201,-2.3711 -1.6536,-3.5829 -0.5342,-1.2117 -1.0333,-2.433 -1.5356,-3.6616 -1.0033,-2.4571 -1.9622,-4.9596 -2.8348,-7.4807 -0.8725,-2.5211 -1.6641,-5.0573 -2.4017,-7.6382 -1.1064,-3.8712 -2.0831,-7.8177 -2.8741,-11.8116 -1.8457,-9.3192 -2.7954,-18.9619 -2.7954,-28.8204 -1e-4,-4.6886 0.2016,-9.3206 0.6299,-13.8984 0,-0.013 0,-0.0264 0,-0.0394 0.643,-6.8532 1.7586,-13.5688 3.3073,-20.1192 0.01,-0.0247 -0.01,-0.0539 0,-0.0787 1.549,-6.5367 3.5587,-12.9259 5.9452,-19.0955 0.015,-0.0386 0.024,-0.0795 0.039,-0.1181 0.7852,-2.0249 1.6097,-4.004 2.4805,-5.9846 0.4437,-1.0091 0.9125,-2.0344 1.378,-3.0317 0.017,-0.0375 0.022,-0.0805 0.039,-0.1181 0.3937,-0.8405 0.8115,-1.688 1.2205,-2.5198 0.07,-0.1427 0.1263,-0.2906 0.1969,-0.4331 0.4709,-0.95 0.9661,-1.8964 1.4568,-2.8348 0.027,-0.0522 0.051,-0.1053 0.079,-0.1575 0.9911,-1.8913 2.0408,-3.7488 3.1104,-5.5908 0.029,-0.0503 0.05,-0.1072 0.079,-0.1575 0.5231,-0.8975 1.073,-1.7919 1.6143,-2.6773 0.6002,-0.9828 1.1887,-1.9461 1.8111,-2.9136 0.3376,-0.5242 0.6796,-1.0551 1.0237,-1.5748 0.3231,-0.4886 0.6555,-0.9723 0.9843,-1.4568 1.1251,-1.658 2.2749,-3.2733 3.4647,-4.8822 0.045,-0.0613 0.073,-0.1356 0.1182,-0.1968 0.512,-0.6899 1.0511,-1.3668 1.5749,-2.0474 0.142,-0.1846 0.2902,-0.3673 0.433,-0.5512 0.6294,-0.8099 1.2442,-1.6053 1.8899,-2.4017 0.042,-0.0512 0.077,-0.1062 0.1181,-0.1575 1.3307,-1.6383 2.6963,-3.2243 4.0947,-4.8034 2.4426,-2.1631 4.9377,-4.2603 7.5201,-6.2601 2.5824,-1.9999 5.2391,-3.92 7.9532,-5.7484 0.054,-0.0365 0.1032,-0.0816 0.1575,-0.1181 1.7568,-1.1801 3.5455,-2.2805 5.3546,-3.386 0.055,-0.0338 0.1021,-0.0844 0.1575,-0.1181 1.8112,-1.1036 3.6509,-2.1625 5.5121,-3.1892 0.959,-0.5289 1.9417,-1.0667 2.9135,-1.5749 0.041,-0.0216 0.077,-0.0571 0.1181,-0.0787 0.9293,-0.4839 1.8941,-0.9528 2.8348,-1.4174 0.042,-0.0209 0.076,-0.0579 0.1182,-0.0787 0.9408,-0.4636 1.8827,-0.8947 2.8347,-1.3387 0.042,-0.0198 0.076,-0.059 0.1182,-0.0787 0.6153,-0.2863 1.2305,-0.5489 1.8505,-0.8269 0.5472,-0.2457 1.1028,-0.4693 1.6536,-0.7087 1.6879,-0.7333 3.3984,-1.4546 5.1184,-2.126 0.2476,-0.0967 0.4997,-0.1803 0.748,-0.2757 1.9492,-0.7486 3.9179,-1.4587 5.9059,-2.1261 0.028,-0.0092 0.051,-0.03 0.079,-0.0393 1.0125,-0.3385 2.0489,-0.6673 3.071,-0.9843 0.039,-0.0122 0.079,-0.0272 0.1182,-0.0394 1.0619,-0.3284 2.1171,-0.64 3.1891,-0.9449 1.0738,-0.306 2.1448,-0.6235 3.2285,-0.9056 0.5347,-0.1389 1.0772,-0.2606 1.6143,-0.3937 0.927,-0.2301 1.8615,-0.4568 2.7954,-0.6693 1.7877,-0.4068 3.5822,-0.7613 5.394,-1.1025 4.3308,-0.8155 8.7343,-1.4621 13.1897,-1.8898 4.6918,-0.4505 9.4429,-0.6694 14.2527,-0.6694 2.6041,1e-4 5.1851,0.0635 7.7563,0.1969 0.21,0.0109 0.4201,0.0276 0.63,0.0394 1.0744,0.0603 2.1602,0.1136 3.2285,0.1968 0.313,0.0244 0.6324,0.0525 0.9449,0.0788 0.2239,0.0189 0.4457,0.0589 0.6693,0.0787 1.1514,0.1024 2.2817,0.2257 3.4254,0.3544 0.8559,0.0962 1.7077,0.2042 2.5592,0.315 0.1432,0.0186 0.2899,0.0203 0.4331,0.0393 0.6097,0.0812 1.2037,0.187 1.8111,0.2756 1.1169,0.1629 2.238,0.3241 3.3466,0.5119 0.6277,0.1064 1.265,0.2007 1.8899,0.315 0.238,0.0435 0.4711,0.1128 0.7087,0.1574 0.9977,0.1876 2.0017,0.3831 2.9923,0.5906 0.8001,0.1677 1.6063,0.3313 2.4017,0.5119 0.065,0.0148 0.1316,0.0244 0.1969,0.0393 1.2522,0.2861 2.5004,0.5879 3.7403,0.9056 0.3147,0.0807 0.6311,0.1535 0.9449,0.2362 0.5539,0.1459 1.1024,0.3204 1.6537,0.4725 0.6448,0.178 1.2879,0.3647 1.9292,0.5512 1.0748,0.3125 2.1246,0.6088 3.1892,0.9449 0.1297,0.041 0.2641,0.0769 0.3937,0.1182 1.144,0.3647 2.2936,0.75 3.4254,1.1417 1.1931,0.4129 2.3643,0.857 3.5434,1.2993 0.5224,0.1961 1.0554,0.3888 1.5749,0.5906 0.6218,0.2415 1.2329,0.4985 1.8505,0.7481 0.1681,0.0679 0.344,0.1283 0.5119,0.1968 0.968,0.3954 1.9558,0.8054 2.9135,1.2206 0.2484,0.1077 0.5004,0.2059 0.7481,0.315 0.8725,0.3841 1.7349,0.7807 2.5985,1.1811 1.5312,0.7103 3.065,1.4442 4.5672,2.2049 0.6656,0.337 1.3089,0.6769 1.9686,1.0236 0.5133,0.2698 1.0258,0.5513 1.5355,0.8269 0.5639,0.3048 1.1336,0.6329 1.693,0.9449 0.5824,0.3248 1.1549,0.6518 1.7324,0.9843 0.4759,0.2739 0.9449,0.5478 1.4174,0.8268 0.6598,0.3897 1.3154,0.7816 1.9686,1.1812 0.3824,0.2339 0.7617,0.4714 1.1418,0.7087 0.065,0.0404 0.1321,0.0775 0.1969,0.1181 0.9637,0.6037 1.9254,1.2253 2.8741,1.8505 0.1672,0.1102 0.3451,0.2041 0.5119,0.315 0.635,0.4222 1.2617,0.8674 1.8898,1.2992 1.0797,0.7423 2.1304,1.4743 3.1892,2.2442 0.1293,0.0941 0.2647,0.1813 0.3937,0.2757 2.9268,2.1429 5.786,4.3849 8.5438,6.7326 0.1062,0.0905 0.2089,0.1848 0.3149,0.2756 0.8121,0.695 1.6051,1.414 2.4017,2.1261 0.1798,0.1607 0.3723,0.3109 0.5513,0.4725 0.717,0.6473 1.4219,1.3075 2.1261,1.9686 0.2497,0.2345 0.4998,0.4724 0.748,0.7087 0.6257,0.5956 1.2353,1.2047 1.8505,1.8111 0.3123,0.3079 0.6354,0.5949 0.9449,0.9055 0.5443,0.5461 1.0786,1.0992 1.6143,1.6537 0.01,0.0068 -0.01,0.0325 0,0.0393 6.0763,24.1529 14.6938,42.0894 25.8281,48.4278 47.8192,27.222 256.0568,-94.7087 255.7223,-149.7323 -0.3349,-55.0236 -210.0489,-174.38423 -257.5334,-146.58259 -11.1877,6.55028 -19.6088,24.98807 -25.395,49.64829 -0.078,0.0789 -0.1578,0.1575 -0.2363,0.2362 -0.7588,0.7615 -1.5084,1.4994 -2.2835,2.2443 -0.1683,0.1617 -0.3429,0.3115 -0.5119,0.4724 -0.6919,0.6587 -1.3821,1.3234 -2.0867,1.9686 -0.2598,0.238 -0.526,0.4726 -0.7874,0.7087 -0.6218,0.5614 -1.2586,1.1422 -1.8899,1.693 -0.3495,0.305 -0.7107,0.6039 -1.0631,0.9056 -0.5473,0.4685 -1.0994,0.9174 -1.6536,1.378 -0.4528,0.3765 -0.9207,0.7313 -1.378,1.1024 -1.0153,0.8239 -2.0338,1.644 -3.071,2.4411 -1.0373,0.7972 -2.0911,1.5924 -3.1498,2.3623 -0.2903,0.211 -0.5744,0.4211 -0.8662,0.63 -0.7722,0.553 -1.5398,1.0759 -2.323,1.6143 -0.8703,0.5983 -1.7542,1.1917 -2.6379,1.7717 -0.2126,0.1396 -0.4166,0.2946 -0.63,0.4331 -0.1037,0.0673 -0.2111,0.1299 -0.3149,0.1969 -2.002,1.2921 -4.0359,2.5439 -6.1027,3.7403 -0.1016,0.0588 -0.2133,0.099 -0.315,0.1575 -0.935,0.538 -1.887,1.0963 -2.8348,1.6143 -0.1966,0.1074 -0.3934,0.2084 -0.5906,0.3149 -0.8558,0.4627 -1.6933,0.932 -2.5592,1.3781 -0.3123,0.161 -0.6313,0.3136 -0.9449,0.4724 -1.1767,0.5959 -2.3884,1.1675 -3.5829,1.7324 -0.3787,0.1792 -0.7612,0.3358 -1.1418,0.5118 -0.2779,0.1285 -0.5479,0.267 -0.8268,0.3938 -1.0945,0.4977 -2.1986,0.9852 -3.3072,1.4567 -0.6559,0.2791 -1.308,0.5571 -1.9686,0.8268 -0.458,0.187 -0.9179,0.3688 -1.3781,0.5513 -0.7781,0.3086 -1.5777,0.6098 -2.3623,0.9055 -0.3422,0.129 -0.6803,0.2673 -1.0237,0.3937 -0.9055,0.3337 -1.8029,0.6681 -2.7166,0.9843 -0.2354,0.0815 -0.4729,0.156 -0.7087,0.2363 -1.0288,0.3502 -2.0717,0.6957 -3.1104,1.0237 -0.1188,0.0374 -0.2355,0.0809 -0.3544,0.1181 -0.5909,0.1849 -1.1777,0.3342 -1.7717,0.5118 -1.7447,0.5216 -3.4656,1.038 -5.2365,1.4962 -0.117,0.0303 -0.2373,0.0487 -0.3544,0.0787 -1.0691,0.2738 -2.1502,0.5372 -3.2285,0.7874 -0.2359,0.0548 -0.4724,0.1039 -0.7087,0.1575 -0.9636,0.2187 -1.943,0.4303 -2.9135,0.63 -0.8409,0.173 -1.6739,0.3532 -2.5199,0.5118 -0.3684,0.0691 -0.733,0.1305 -1.1024,0.1969 -0.4847,0.0871 -0.9705,0.1539 -1.4568,0.2362 -0.7355,0.1245 -1.4657,0.2408 -2.2048,0.3544 -0.6157,0.0947 -1.2324,0.1885 -1.8505,0.2756 -1.356,0.1909 -2.7272,0.358 -4.0947,0.5118 -0.4972,0.0559 -0.9975,0.1066 -1.4961,0.1575 -1.2077,0.1233 -2.4062,0.2603 -3.6223,0.3543 -0.039,0.003 -0.079,-0.003 -0.1181,0 -1.0034,0.0769 -2.0228,0.1403 -3.0316,0.1969 -0.2498,0.014 -0.4981,0.0266 -0.7481,0.0394 -0.2232,0.0114 -0.4459,0.0289 -0.6693,0.0393 -2.3093,0.1074 -4.6333,0.1575 -6.9689,0.1575 -2.3443,1e-4 -4.6904,-0.0492 -7.0083,-0.1575 -2.3175,-0.108 -4.6017,-0.2587 -6.8901,-0.4724 -5.7094,-0.5341 -11.3482,-1.4321 -16.8513,-2.5986 -0.013,-0.003 -0.027,0.003 -0.039,0 -2.2061,-0.4682 -4.3673,-0.9699 -6.5358,-1.5355 -2.1686,-0.5656 -4.3284,-1.1899 -6.4571,-1.8505 -1.4217,-0.4411 -2.8491,-0.8954 -4.2522,-1.378 -1.7336,-0.5964 -3.4539,-1.2313 -5.1577,-1.8899 -0.4231,-0.1635 -0.8387,-0.3445 -1.2599,-0.5118 -1.6313,-0.648 -3.28,-1.304 -4.8822,-2.008 -0.9983,-0.4389 -2.0056,-0.9178 -2.9923,-1.378 -0.011,-0.005 -0.028,0.005 -0.039,0 -0.9865,-0.4604 -1.9391,-0.936 -2.9136,-1.4174 -0.01,-0.005 -0.029,0.005 -0.039,0 -1.3241,-0.6546 -2.636,-1.3546 -3.9373,-2.0474 -1.5871,-0.8449 -3.1726,-1.698 -4.7246,-2.5985 -2.227,-1.2926 -4.4238,-2.6515 -6.5752,-4.0554 -0.5942,-0.3876 -1.1835,-0.7852 -1.7717,-1.1811 -0.01,-0.006 -0.03,0.006 -0.039,0 -0.6245,-0.4205 -1.2328,-0.8696 -1.8505,-1.2993 -1.1738,-0.817 -2.316,-1.6306 -3.4647,-2.4805 -1.7374,-1.2848 -3.48,-2.6185 -5.1578,-3.9765 -0.8599,-0.6964 -1.6759,-1.411 -2.5198,-2.1261 -0.816,-0.6913 -1.6404,-1.3783 -2.4411,-2.0868 -0.7334,-0.8281 -1.4505,-1.6752 -2.1654,-2.5198 -0.6912,-0.8158 -1.3737,-1.6102 -2.0474,-2.4411 -0.012,-0.0141 -0.028,-0.0252 -0.039,-0.0393 -1.3581,-1.6778 -2.6917,-3.4204 -3.9766,-5.1578 -0.011,-0.0148 -0.028,-0.0245 -0.039,-0.0394 -0.6369,-0.8608 -1.232,-1.7235 -1.8505,-2.5985 -0.011,-0.0149 -0.029,-0.0245 -0.039,-0.0394 -0.6183,-0.8754 -1.2509,-1.7486 -1.8505,-2.6379 -0.01,-0.015 -0.029,-0.0244 -0.039,-0.0394 -0.5993,-0.8896 -1.152,-1.8134 -1.7323,-2.7167 -0.01,-0.0153 -0.03,-0.024 -0.039,-0.0394 -0.58,-0.9033 -1.1323,-1.7999 -1.693,-2.7166 -0.5791,-0.9481 -1.1742,-1.9122 -1.7324,-2.8742 -1.0895,-1.8778 -2.1418,-3.7799 -3.1497,-5.70896 -0.01,-0.0155 -0.031,-0.0238 -0.039,-0.0394 -0.5001,-0.95631 -0.9773,-1.94508 -1.4568,-2.91354 -0.01,-0.0158 -0.032,-0.0236 -0.039,-0.0394 -0.4791,-0.96859 -0.9196,-1.93307 -1.378,-2.91354 -0.01,-0.0156 -0.032,-0.0238 -0.039,-0.0394 -0.923,-1.9792 -1.7619,-3.99828 -2.5985,-6.02394 -0.01,-0.0158 -0.033,-0.0236 -0.039,-0.0394 -0.4151,-1.0044 -0.8271,-2.01625 -1.2205,-3.03166 -0.01,-0.0157 -0.033,-0.0236 -0.039,-0.0394 -0.3932,-1.01579 -0.7313,-2.0445 -1.1024,-3.07103 -0.01,-0.0157 -0.034,-0.0237 -0.039,-0.0394 -0.3709,-1.02688 -0.7144,-2.07308 -1.063,-3.1104 -4.9501,-14.7549 -7.6382,-30.56093 -7.6382,-46.97099 -1e-4,-9.8586 0.9498,-19.50123 2.7954,-28.82042 0.7909,-3.99395 1.7677,-7.94037 2.8741,-11.81165 1.4752,-5.16172 3.2299,-10.20461 5.2365,-15.11891 0.5017,-1.22859 1.002,-2.44981 1.5356,-3.66161 1.067,-2.42363 2.1944,-4.81237 3.386,-7.16574 0.5957,-1.17669 1.2243,-2.34578 1.8505,-3.50412 0.6261,-1.15835 1.2732,-2.28592 1.9292,-3.42538 0.6559,-1.13947 1.3227,-2.26593 2.008,-3.386 0.6852,-1.12009 1.3727,-2.24649 2.0867,-3.34664 3.5699,-5.50079 7.4832,-10.74598 11.7329,-15.70949 0.8526,-0.99592 1.7202,-1.98025 2.5986,-2.95291 0.8755,-0.96965 1.7766,-1.92812 2.6773,-2.87417 0.8969,-0.94192 1.7954,-1.87747 2.7166,-2.79542 0.5577,-0.55569 1.1266,-1.10688 1.6931,-1.65364 24.1288,-6.07562 42.0541,-14.66172 48.3883,-25.78876 27.222,-47.81919 -94.7087,-256.05687 -149.7323,-255.7222 z m 1.4568,512.23185 c 35.9667,-1e-4 65.1609,29.1942 65.1609,65.1609 0,35.9667 -29.1942,65.1609 -65.1609,65.1609 -35.9668,0 -65.161,-29.1942 -65.161,-65.1609 10e-5,-35.9667 29.1942,-65.1609 65.161,-65.1609 z",
            id:"path4834",
            style:"fill:url(#" + this.id + "linearGradient3165);fill-opacity:1;stroke:#babdb6;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
          }).end().path({
            d:"m 3881.5417,-735.83178 c -39.9811,0.24318 -113.8976,111.03867 -140.6767,189.8132 -0.2418,0.69743 -0.4747,1.39459 -0.7087,2.08672 -0.1451,0.43736 -0.2911,0.86404 -0.4331,1.29928 -0.4305,1.29403 -0.8578,2.58465 -1.2599,3.85848 -0.037,0.11892 -0.081,0.2356 -0.1181,0.35435 -4.1325,13.15815 -6.7055,25.18942 -7.3233,35.3562 -0.01,0.10568 0.01,0.20968 0,0.31498 -0.041,0.71265 -0.097,1.43227 -0.1181,2.12609 -0.381,9.21182 0.8516,16.85212 4.0553,22.32402 6.5503,11.18766 24.9881,19.60883 49.6483,25.39504 1.4885,0.21147 2.9028,0.37234 4.2916,0.47247 41.8041,12.67 34.1964,-16.30116 19.9617,-28.54482 -14.7925,-12.72338 -26.6362,-10.82472 -39.2934,-18.54429 4.5366,-28.01152 15.5887,-61.62572 31.2615,-93.78449 0.031,-0.0638 0.048,-0.13311 0.079,-0.19686 22.4753,-39.62874 53.5698,-76.2175 82.091,-101.34395 28.5271,25.12702 59.6492,61.705 82.1303,101.34395 0.035,0.061 0.044,0.13583 0.079,0.19686 15.6727,32.15877 26.7248,65.77297 31.2614,93.78449 -12.6572,7.71957 -24.5009,5.82091 -39.2934,18.54429 -14.2347,12.24366 -21.8424,41.21482 19.9617,28.54482 1.3888,-0.10013 2.8031,-0.261 4.2916,-0.47247 24.6602,-5.78621 43.098,-14.20738 49.6483,-25.39504 3.2037,-5.4719 4.4363,-13.1122 4.0553,-22.32402 -0.01,-0.14273 0.01,-0.2896 0,-0.43309 -0.023,-0.62599 -0.08,-1.28817 -0.1181,-1.92924 0,-0.0255 0,-0.0532 0,-0.0787 -0.6177,-10.16678 -3.1907,-22.19805 -7.3232,-35.3562 -0.013,-0.0399 -0.027,-0.0782 -0.039,-0.11812 -0.1773,-0.57374 -0.3684,-1.15459 -0.5512,-1.73238 -0.3414,-1.05851 -0.7026,-2.15652 -1.0631,-3.22851 -0.1927,-0.58427 -0.3924,-1.18378 -0.5905,-1.77175 -0.086,-0.2489 -0.1891,-0.4985 -0.2756,-0.74807 -26.7792,-78.77453 -100.6957,-189.57002 -140.6768,-189.8132 -0.4299,-0.003 -0.8613,0.0167 -1.2993,0.0394 -0.116,-0.008 -0.2388,0.006 -0.3543,0 -0.4379,-0.0227 -0.8694,-0.042 -1.2993,-0.0394 z",
            id:"path4943",
            style:"fill:url(#" + this.id + "linearGradient3167);fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 3790.7495,173.58647 c -1.4409,0.1516 -2.9957,0.2601 -4.4491,0.3543 2.022,-0.1499 4.4484,-0.3542 4.4491,-0.3543 z",
            style:"fill:#d3d7cf;fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 3975.2868,173.58647 c 7e-4,1e-4 2.4271,0.2044 4.4491,0.3543 -1.4534,-0.0942 -3.0082,-0.2027 -4.4491,-0.3543 z",
            style:"fill:#d3d7cf;fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 4460.3913,-159.93523 c -0.2433,-39.9811 -111.0387,-113.8975 -189.8133,-140.67673 -0.6974,-0.24178 -1.3946,-0.47468 -2.0866,-0.70869 -0.4375,-0.14508 -0.8641,-0.29103 -1.2994,-0.4331 -1.294,-0.43045 -2.5845,-0.85776 -3.8584,-1.25991 -0.119,-0.0369 -0.2356,-0.0815 -0.3543,-0.11811 -13.1582,-4.13249 -25.1895,-6.70549 -35.3563,-7.32323 -0.1057,-0.007 -0.2097,0.007 -0.315,0 -0.7126,-0.0406 -1.4322,-0.0973 -2.1261,-0.11811 -9.2118,-0.38102 -16.8521,0.8516 -22.324,4.05533 -11.1876,6.55023 -19.6088,24.98807 -25.395,49.64825 -0.2115,1.4885 -0.3724,2.9028 -0.4725,4.2916 -12.67,41.8041 16.3012,34.1964 28.5448,19.9617 12.7234,-14.7925 10.8248,-26.6362 18.5443,-39.2934 28.0115,4.5366 61.6258,15.5887 93.7846,31.2615 0.064,0.031 0.133,0.0476 0.1968,0.0787 39.6288,22.4753 76.2174,53.5698 101.3439,82.091 -25.127,28.5271 -61.7049,59.6492 -101.3439,82.1303 -0.061,0.0346 -0.1358,0.0442 -0.1968,0.0788 -32.1588,15.6727 -65.7731,26.7248 -93.7846,31.2615 -7.7195,-12.6573 -5.8209,-24.501 -18.5443,-39.2935 -12.2436,-14.2347 -41.2148,-21.8424 -28.5448,19.9617 0.1001,1.3888 0.261,2.8031 0.4725,4.2916 5.7862,24.6602 14.2074,43.098 25.395,49.6483 5.4719,3.2037 13.1122,4.4363 22.324,4.0553 0.1428,-0.0059 0.2896,0.0067 0.4331,0 0.626,-0.0225 1.2882,-0.0797 1.9293,-0.1181 0.026,-0.0018 0.053,0.0018 0.079,0 10.1668,-0.6177 22.1981,-3.1907 35.3563,-7.3232 0.04,-0.0125 0.078,-0.0268 0.118,-0.0394 0.5738,-0.1773 1.1546,-0.3684 1.7324,-0.5512 1.0586,-0.3414 2.1566,-0.7026 3.2285,-1.0631 0.5842,-0.1927 1.1838,-0.3924 1.7718,-0.5905 0.2489,-0.0856 0.4985,-0.1891 0.748,-0.2756 78.7746,-26.7792 189.57,-100.6957 189.8133,-140.6768 0,-0.4298 -0.017,-0.8613 -0.039,-1.2993 0.01,-0.116 -0.01,-0.2388 0,-0.3543 0.023,-0.4379 0.042,-0.8694 0.039,-1.2993 z",
            style:"fill:url(#" + this.id + "linearGradient3169);fill-opacity:1;stroke:#d3d7cf;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
          }).end().path({
            d:"m 3550.973,-250.72743 c -0.1517,-1.4409 -0.2601,-2.9957 -0.3543,-4.4491 0.1499,2.022 0.3542,4.4484 0.3543,4.4491 z",
            style:"fill:#d3d7cf;fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 3550.973,-66.19013 c -10e-5,7e-4 -0.2044,2.4271 -0.3543,4.4491 0.094,-1.4534 0.2026,-3.0082 0.3543,-4.4491 z",
            style:"fill:#d3d7cf;fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 3884.4947,418.91447 c 39.9811,-0.2433 113.8976,-111.0387 140.6768,-189.8133 0.2418,-0.6975 0.4747,-1.3946 0.7087,-2.0867 0.145,-0.4374 0.291,-0.864 0.4331,-1.2993 0.4304,-1.2941 0.8577,-2.5846 1.2599,-3.8585 0.037,-0.119 0.082,-0.2356 0.1181,-0.3543 4.1325,-13.1582 6.7055,-25.1895 7.3232,-35.3563 0.01,-0.1056 -0.01,-0.2097 0,-0.3149 0.041,-0.7127 0.097,-1.4323 0.1181,-2.1261 0.381,-9.2119 -0.8516,-16.8522 -4.0553,-22.3241 -6.5502,-11.1876 -24.9881,-19.6088 -49.6483,-25.395 -1.4885,-0.2115 -2.9028,-0.3723 -4.2916,-0.4725 -41.8041,-12.67 -34.1964,16.3012 -19.9617,28.5448 14.7925,12.7234 26.6363,10.8248 39.2935,18.5443 -4.5367,28.0116 -15.5888,61.6258 -31.2615,93.7846 -0.031,0.0637 -0.048,0.133 -0.079,0.1968 -22.4753,39.6288 -53.5698,76.2175 -82.0909,101.344 -28.5272,-25.127 -59.6493,-61.7049 -82.1304,-101.344 -0.035,-0.061 -0.044,-0.1358 -0.079,-0.1968 -15.6727,-32.1588 -26.7248,-65.773 -31.2615,-93.7846 12.6572,-7.7195 24.5009,-5.8209 39.2934,-18.5443 14.2348,-12.2436 21.8424,-41.2148 -19.9617,-28.5448 -1.3888,0.1002 -2.8031,0.261 -4.2915,0.4725 -24.6603,5.7862 -43.0981,14.2074 -49.6483,25.395 -3.2038,5.4719 -4.4364,13.1122 -4.0554,22.3241 0.01,0.1427 -0.01,0.2896 0,0.4331 0.023,0.6259 0.08,1.2881 0.1181,1.9292 0,0.0255 0,0.0532 0,0.0787 0.6178,10.1668 3.1908,22.1981 7.3233,35.3563 0.013,0.0398 0.027,0.0781 0.039,0.1181 0.1773,0.5737 0.3684,1.1545 0.5512,1.7323 0.3414,1.0586 0.7026,2.1566 1.0631,3.2285 0.1928,0.5843 0.3924,1.1839 0.5906,1.7719 0.086,0.2488 0.1891,0.4984 0.2756,0.748 26.7792,78.7746 100.6956,189.57 140.6767,189.8133 0.4299,0.002 0.8614,-0.0168 1.2993,-0.0395 0.1161,0.008 0.2388,-0.006 0.3543,0 0.438,0.0227 0.8695,0.042 1.2993,0.0395 z",
            style:"fill:url(#" + this.id + "linearGradient3171);fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 3975.2869,-490.50388 c 1.4409,-0.15168 2.9957,-0.26017 4.4491,-0.35435 -2.022,0.14988 -4.4484,0.35421 -4.4491,0.35435 z",
            style:"fill:#d3d7cf;fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 3790.7496,-490.50388 c -7e-4,-1.4e-4 -2.4271,-0.20447 -4.449,-0.35435 1.4533,0.0942 3.0081,0.20267 4.449,0.35435 z",
            style:"fill:#d3d7cf;fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 3305.6451,-156.98213 c 0.2433,39.9811 111.0387,113.8976 189.8133,140.6767 0.6975,0.2418 1.3946,0.4747 2.0866,0.7087 0.4375,0.1451 0.8641,0.2911 1.2994,0.4331 1.294,0.4305 2.5846,0.8578 3.8585,1.2599 0.1189,0.0369 0.2356,0.0815 0.3542,0.1182 13.1583,4.1324 25.1895,6.7054 35.3563,7.3232 0.1057,0.0074 0.2097,-0.007 0.315,0 0.7126,0.0406 1.4323,0.0972 2.1261,0.1181 9.2118,0.381 16.8521,-0.8516 22.324,-4.0553 11.1877,-6.5503 19.6088,-24.9881 25.395,-49.6483 0.2115,-1.4885 0.3724,-2.9028 0.4725,-4.2916 12.67,-41.8041 -16.3011,-34.1964 -28.5448,-19.9617 -12.7234,14.7925 -10.8247,26.6362 -18.5443,39.2934 -28.0115,-4.5366 -61.6257,-15.5887 -93.7845,-31.2615 -0.064,-0.031 -0.1331,-0.0476 -0.1968,-0.0787 -39.6289,-22.4753 -76.2175,-53.5698 -101.344,-82.091 25.127,-28.5271 61.7049,-59.6492 101.344,-82.1303 0.061,-0.0346 0.1358,-0.0442 0.1968,-0.0787 32.1588,-15.6728 65.773,-26.7249 93.7845,-31.2615 7.7196,12.6572 5.8209,24.5009 18.5443,39.2934 12.2437,14.2347 41.2148,21.8424 28.5448,-19.9617 -0.1001,-1.3888 -0.261,-2.8031 -0.4725,-4.2916 -5.7862,-24.6602 -14.2073,-43.09803 -25.395,-49.64827 -5.4719,-3.20374 -13.1122,-4.43636 -22.324,-4.05534 -0.1428,0.006 -0.2896,-0.007 -0.4331,0 -0.626,0.0225 -1.2882,0.0798 -1.9292,0.11812 -0.026,0.002 -0.053,-0.002 -0.079,0 -10.1668,0.61773 -22.198,3.19073 -35.3563,7.32322 -0.04,0.0125 -0.078,0.0268 -0.118,0.0394 -0.5738,0.17729 -1.1546,0.36838 -1.7324,0.55121 -1.0586,0.34136 -2.1566,0.70257 -3.2285,1.06305 -0.5842,0.19279 -1.1838,0.39244 -1.7718,0.59059 -0.2488,0.0855 -0.4984,0.18908 -0.748,0.2756 -78.7746,26.77915 -189.57,100.69565 -189.8133,140.67675 0,0.4299 0.017,0.8613 0.039,1.2993 -0.01,0.116 0.01,0.2388 0,0.3543 -0.023,0.4379 -0.042,0.8694 -0.039,1.2993 z",
            style:"fill:url(#" + this.id + "linearGradient3173);fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 4215.0634,-66.18993 c 0.1517,1.4409 0.2602,2.9957 0.3543,4.4491 -0.1498,-2.022 -0.3542,-4.4484 -0.3543,-4.4491 z",
            style:"fill:#d3d7cf;fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 4215.0634,-250.72723 c 1e-4,-7e-4 0.2045,-2.4271 0.3543,-4.4491 -0.094,1.4534 -0.2026,3.0082 -0.3543,4.4491 z",
            style:"fill:#d3d7cf;fill-opacity:1;stroke:none"
          }).end().path({
            d:"m 3881.5417,-735.83178 c -55.0236,0.33467 -174.3842,210.04883 -146.5826,257.53332 6.5503,11.18766 24.9881,19.60883 49.6483,25.39504 0.8428,0.83605 1.6579,1.66376 2.4805,2.51982 0.168,0.17483 0.3446,0.33618 0.5118,0.51184 0.6523,0.68553 1.2901,1.38876 1.9293,2.08672 0.8018,0.87565 1.6208,1.78244 2.4017,2.67731 0.7808,0.89486 1.5242,1.80299 2.2835,2.71668 0.3819,0.45914 0.7655,0.9142 1.1418,1.37803 0.3716,0.45825 0.7363,0.91523 1.1025,1.37802 0.4466,0.56403 0.9001,1.12234 1.3386,1.693 0.289,0.37628 0.5808,0.76267 0.8662,1.1418 0.1008,0.13376 0.2147,0.25959 0.315,0.39372 0.6111,0.81754 1.1772,1.64994 1.7717,2.48045 0.5576,0.77829 1.1109,1.53347 1.6537,2.32295 0.1343,0.19558 0.2602,0.39432 0.3937,0.59059 1.3394,1.96993 2.6528,3.98743 3.8978,6.02394 0.6225,1.01823 1.2128,2.03673 1.8111,3.07102 0.062,0.10731 0.135,0.2075 0.1969,0.31498 0.5346,0.92955 1.06,1.89265 1.5749,2.8348 0.5737,1.04993 1.1442,2.08457 1.693,3.14977 0.5488,1.06519 1.0908,2.14845 1.6143,3.22852 1.5702,3.24018 2.9959,6.55494 4.3309,9.92178 0.445,1.12227 0.8812,2.25044 1.2993,3.38601 1.6723,4.54225 3.1444,9.15939 4.3703,13.89837 0.9194,3.55422 1.7064,7.1749 2.3623,10.82735 0.4255,2.36971 0.7914,4.75836 1.1024,7.16573 0.01,0.0663 0.031,0.13055 0.039,0.19686 0.01,0.0789 0.029,0.15726 0.039,0.23623 0.7709,6.111 1.1418,12.34351 1.1418,18.66241 -10e-5,11.69192 -1.3288,23.07073 -3.8979,33.97818 -0.01,0.0276 -0.033,0.0512 -0.039,0.0787 -0.5097,2.15834 -1.0504,4.29708 -1.6537,6.41766 -0.01,0.0277 -0.032,0.051 -0.039,0.0788 -1.8373,6.44336 -4.1132,12.72907 -6.7721,18.78052 -1.7726,4.03432 -3.7132,7.97551 -5.827,11.81164 -1.0256,1.8612 -2.0866,3.7009 -3.1892,5.5121 -0.034,0.0554 -0.084,0.1022 -0.1181,0.1575 -2.8466,4.6624 -5.9214,9.1613 -9.2525,13.4653 -1.9986,2.5824 -4.0978,5.0775 -6.2601,7.5201 -1.5791,1.3984 -3.1651,2.7639 -4.8034,4.0947 -0.5883,0.4778 -1.2155,0.9485 -1.8112,1.4174 -0.2513,0.1978 -0.4954,0.3944 -0.748,0.5905 -0.066,0.051 -0.1313,0.1067 -0.1969,0.1575 -0.797,0.6168 -1.5919,1.2498 -2.4017,1.8505 -0.061,0.0455 -0.1355,0.0728 -0.1969,0.1181 -0.8162,0.6036 -1.612,1.1848 -2.441,1.7718 -0.6766,0.4792 -1.3625,0.9493 -2.0474,1.4174 -0.2235,0.1527 -0.4449,0.3209 -0.6693,0.4725 -0.054,0.0366 -0.1032,0.0815 -0.1575,0.1181 -0.8532,0.5745 -1.7328,1.1359 -2.5986,1.693 -0.049,0.0316 -0.1083,0.0472 -0.1574,0.0787 -1.7931,1.1507 -3.5885,2.2725 -5.4334,3.3467 -0.05,0.0293 -0.1072,0.0495 -0.1575,0.0787 -0.8981,0.5214 -1.8068,1.0326 -2.7167,1.5355 -0.051,0.0283 -0.1063,0.0505 -0.1575,0.0788 -0.9102,0.5017 -1.7948,1.0132 -2.7166,1.4961 -0.052,0.0274 -0.1053,0.0515 -0.1575,0.0787 -0.923,0.4821 -1.8612,0.9544 -2.7955,1.4174 -0.052,0.026 -0.1051,0.0529 -0.1574,0.0788 -0.935,0.462 -1.8888,0.896 -2.8348,1.3386 -0.043,0.0201 -0.075,0.0588 -0.1182,0.0788 -0.9571,0.4467 -1.906,0.8727 -2.8741,1.2993 -0.053,0.0235 -0.1042,0.0553 -0.1575,0.0787 -0.9585,0.421 -1.9446,0.8195 -2.9136,1.2205 -0.039,0.016 -0.079,0.0235 -0.1181,0.0394 -0.985,0.4068 -1.9573,0.8346 -2.9529,1.2206 -0.039,0.0149 -0.08,0.0244 -0.1181,0.0393 -0.9958,0.3851 -1.9862,0.7385 -2.9923,1.1024 -0.039,0.0142 -0.079,0.0253 -0.1181,0.0394 -1.0068,0.3632 -2.0149,0.7213 -3.0317,1.0631 -0.039,0.0132 -0.079,0.0261 -0.1181,0.0393 -2.9577,0.9923 -5.9785,1.91 -9.0162,2.7167 -0.1704,0.0452 -0.3412,0.0735 -0.5118,0.1181 -0.04,0.0106 -0.078,0.0289 -0.1181,0.0394 -1.0476,0.2728 -2.1328,0.5372 -3.1892,0.7874 -0.028,0.007 -0.051,0.0328 -0.079,0.0394 -0.7693,0.1818 -1.5492,0.3422 -2.323,0.5119 -4.8329,1.0594 -9.7682,1.8683 -14.7646,2.441 -2.15,0.2463 -4.3195,0.4771 -6.4964,0.63 -3.4644,0.2433 -6.9471,0.3543 -10.473,0.3543 -1.4118,1e-4 -2.8105,1e-4 -4.2128,-0.0393 -0.9236,-0.0259 -1.8367,-0.0753 -2.756,-0.1182 -0.222,-0.0102 -0.4477,-0.028 -0.6694,-0.0393 -0.9443,-0.0482 -1.8952,-0.0916 -2.8348,-0.1575 -0.3148,-0.0221 -0.6306,-0.0547 -0.9449,-0.0788 -0.039,-0.003 -0.079,0.003 -0.1181,0 -1.2159,-0.0939 -2.4148,-0.231 -3.6222,-0.3543 -0.4986,-0.0509 -0.9991,-0.1016 -1.4962,-0.1575 -1.3675,-0.1538 -2.7387,-0.3209 -4.0947,-0.5118 -0.6182,-0.0871 -1.2348,-0.181 -1.8505,-0.2756 -0.6725,-0.1033 -1.3385,-0.2026 -2.008,-0.315 -0.066,-0.011 -0.1311,-0.0283 -0.1968,-0.0394 -0.8564,-0.1449 -1.7079,-0.2734 -2.5592,-0.4331 -0.8457,-0.1586 -1.6793,-0.3388 -2.5198,-0.5118 -0.9703,-0.1997 -1.9504,-0.4113 -2.9136,-0.63 -0.053,-0.0119 -0.1046,-0.0273 -0.1575,-0.0393 -1.1411,-0.2604 -2.2551,-0.5402 -3.386,-0.8269 -0.1294,-0.0327 -0.2644,-0.0456 -0.3937,-0.0787 -0.5796,-0.1486 -1.1556,-0.317 -1.7324,-0.4725 -0.7091,-0.1909 -1.4212,-0.3893 -2.1261,-0.5906 -0.012,-0.003 -0.027,0.004 -0.039,0 -0.5726,-0.1636 -1.1233,-0.3414 -1.693,-0.5118 -0.7088,-0.212 -1.4219,-0.4076 -2.1261,-0.6299 -1.0388,-0.328 -2.0817,-0.6735 -3.1104,-1.0237 -0.028,-0.009 -0.051,-0.03 -0.079,-0.0394 -0.6613,-0.2255 -1.3115,-0.474 -1.9686,-0.7087 -0.8015,-0.2862 -1.6066,-0.5665 -2.4017,-0.8662 -0.7845,-0.2957 -1.5842,-0.5969 -2.3623,-0.9055 -0.2243,-0.089 -0.4455,-0.1856 -0.6693,-0.2756 -0.8957,-0.3604 -1.7904,-0.7251 -2.6773,-1.1025 -1.108,-0.4715 -2.2134,-0.959 -3.3073,-1.4567 -0.6595,-0.3001 -1.3143,-0.5961 -1.9686,-0.9056 -0.9831,-0.4649 -1.9818,-0.9315 -2.9529,-1.4174 -0.4239,-0.2121 -0.8384,-0.4533 -1.2599,-0.6693 -0.7859,-0.4031 -1.5847,-0.8038 -2.3624,-1.2206 -0.1861,-0.0996 -0.3655,-0.2145 -0.5512,-0.3149 -1.1123,-0.6022 -2.2123,-1.2208 -3.3072,-1.8505 -0.026,-0.0147 -0.053,-0.0247 -0.079,-0.0394 -1.1426,-0.658 -2.2629,-1.3204 -3.386,-2.008 -1.0051,-0.6148 -2.0032,-1.2518 -2.9923,-1.8898 -0.8425,-0.5439 -1.6891,-1.0932 -2.5198,-1.6537 -0.2504,-0.1689 -0.4988,-0.3414 -0.7481,-0.5118 -0.8927,-0.6099 -1.7593,-1.2216 -2.6379,-1.8505 -0.3004,-0.2151 -0.6069,-0.4127 -0.9056,-0.63 -0.3853,-0.2802 -0.7592,-0.5823 -1.1418,-0.8661 -0.5118,-0.38 -1.0287,-0.7554 -1.5355,-1.1418 -0.4153,-0.3166 -0.8086,-0.6635 -1.2205,-0.9843 -0.5598,-0.4363 -1.1397,-0.8551 -1.693,-1.2993 -0.6625,-0.5316 -1.3156,-1.0716 -1.9686,-1.6143 -0.9134,-0.7593 -1.822,-1.5027 -2.7167,-2.2836 -0.8946,-0.7808 -1.8018,-1.5998 -2.6773,-2.4017 -0.7115,-0.6516 -1.4275,-1.3032 -2.1261,-1.9686 -0.1621,-0.1543 -0.311,-0.3173 -0.4725,-0.4724 -0.8559,-0.8226 -1.6837,-1.6377 -2.5198,-2.4805 -5.7862,-24.66019 -14.2467,-43.09803 -25.4344,-49.64829 -47.4845,-27.80162 -257.1987,91.55899 -257.5333,146.58259 -0.3347,55.0236 207.903,176.9543 255.7222,149.7323 11.1401,-6.3417 19.7907,-24.2954 25.8675,-48.4671 1.6782,-1.7369 3.397,-3.4258 5.1577,-5.079 1.7608,-1.6532 3.554,-3.2766 5.394,-4.8428 0.878,-0.7472 1.7819,-1.4779 2.6773,-2.2049 0.043,-0.0348 0.075,-0.0833 0.1182,-0.1181 0.9759,-0.7904 1.9567,-1.5571 2.9529,-2.3229 0.919,-0.7063 1.8595,-1.4018 2.7954,-2.0867 0.1204,-0.0881 0.2337,-0.1879 0.3543,-0.2757 0.4151,-0.3018 0.8416,-0.5685 1.2599,-0.8661 0.6192,-0.4407 1.2244,-0.9074 1.8505,-1.3387 0.8253,-0.568 1.6826,-1.1021 2.5199,-1.6536 0.9721,-0.6409 1.9255,-1.2715 2.9135,-1.8899 0.1053,-0.0658 0.2095,-0.1312 0.315,-0.1969 0.6494,-0.404 1.3125,-0.7869 1.9686,-1.1811 0.4987,-0.2997 0.9936,-0.6116 1.4961,-0.9056 0.8749,-0.5116 1.7517,-1.0021 2.638,-1.4961 0.5544,-0.3093 1.0948,-0.6426 1.6536,-0.9449 0.3141,-0.1698 0.6294,-0.3443 0.9449,-0.5119 0.4298,-0.2285 0.867,-0.4449 1.2993,-0.6693 0.82,-0.4252 1.6516,-0.8498 2.4805,-1.2599 0.105,-0.052 0.2097,-0.1057 0.3149,-0.1575 1.0145,-0.499 2.0437,-0.9805 3.0711,-1.4568 1.1086,-0.5142 2.2233,-1.0088 3.3466,-1.4961 0.9555,-0.4145 1.9083,-0.8258 2.8742,-1.2206 0.1678,-0.0685 0.3436,-0.1289 0.5118,-0.1968 0.6173,-0.2496 1.2291,-0.5066 1.8505,-0.7481 0.5195,-0.2017 1.0525,-0.3945 1.5749,-0.5906 0.4318,-0.162 0.8656,-0.3143 1.2993,-0.4724 0.7232,-0.2637 1.437,-0.5349 2.1654,-0.7875 0.027,-0.0094 0.052,-0.0299 0.079,-0.0394 1.1435,-0.3957 2.3087,-0.7735 3.4647,-1.1417 0.1189,-0.0379 0.2354,-0.0806 0.3544,-0.1182 1.0645,-0.3361 2.1143,-0.6324 3.1891,-0.9449 0.2108,-0.0613 0.4188,-0.1364 0.63,-0.1969 0.4301,-0.1229 0.8675,-0.2352 1.2993,-0.3543 0.8647,-0.2388 1.7274,-0.4853 2.5985,-0.7087 1.2399,-0.3177 2.4881,-0.6195 3.7404,-0.9056 0.8602,-0.1964 1.7326,-0.3698 2.5985,-0.5512 0.9902,-0.2075 1.9949,-0.403 2.9923,-0.5906 0.861,-0.1618 1.7323,-0.3256 2.5986,-0.4724 1.1086,-0.1877 2.2297,-0.349 3.3466,-0.5119 0.6023,-0.0878 1.2065,-0.1951 1.8111,-0.2756 0.995,-0.1325 1.9911,-0.2418 2.9923,-0.3543 1.1437,-0.1286 2.274,-0.2521 3.4254,-0.3544 0.3296,-0.0292 0.6541,-0.091 0.9843,-0.1181 1.2766,-0.1049 2.5729,-0.164 3.8585,-0.2362 0.2098,-0.0118 0.4199,-0.0285 0.6299,-0.0394 0.5118,-0.0265 1.0224,-0.0574 1.5355,-0.0787 2.0648,-0.0858 4.1351,-0.1182 6.2208,-0.1182 1.1753,1e-4 2.3354,0.012 3.5042,0.0394 1.1628,0.0271 2.3086,0.0643 3.4647,0.1181 0.013,7e-4 0.026,-6e-4 0.039,0 1.1429,0.0536 2.2893,0.1176 3.4254,0.1969 0.013,9e-4 0.026,-9e-4 0.039,0 0.106,0.008 0.209,0.0317 0.315,0.0394 3.3571,0.2434 6.7091,0.5984 10.0005,1.063 1.0855,0.1531 2.1901,0.296 3.2679,0.4725 0.04,0.007 0.078,0.0327 0.1181,0.0394 1.0766,0.1773 2.1206,0.3507 3.1892,0.5512 0.053,0.01 0.1044,0.0293 0.1575,0.0393 1.0562,0.1994 2.141,0.4083 3.1891,0.63 0.041,0.009 0.078,0.0307 0.1181,0.0394 1.0595,0.225 2.0989,0.4611 3.1498,0.7087 0.053,0.0124 0.105,0.0269 0.1575,0.0393 1.0963,0.2602 2.2205,0.5424 3.3073,0.8269 0.6488,0.1698 1.2838,0.3334 1.9292,0.5118 1.4431,0.3983 2.8665,0.8192 4.2916,1.2599 0.079,0.0244 0.1575,0.0543 0.2362,0.0787 0.9823,0.3056 1.9795,0.6195 2.9529,0.945 0.079,0.0263 0.1577,0.0523 0.2362,0.0787 0.028,0.0093 0.051,0.0301 0.079,0.0394 1.0282,0.3469 2.053,0.6943 3.071,1.063 0.957,0.3463 1.8871,0.6978 2.8348,1.0631 0.093,0.036 0.1825,0.082 0.2756,0.1181 0.9367,0.3633 1.9075,0.7207 2.8348,1.1024 0.081,0.0337 0.1548,0.0844 0.2362,0.1181 0.9365,0.3875 1.8688,0.7752 2.7955,1.1812 0.091,0.04 0.1847,0.078 0.2756,0.1181 0.1349,0.0595 0.2589,0.137 0.3937,0.1969 0.8747,0.3891 1.7329,0.7756 2.5986,1.1812 1.9982,0.936 3.9969,1.9312 5.9452,2.9529 0.8589,0.45 1.7102,0.8722 2.5591,1.3386 0.1095,0.0603 0.2057,0.1364 0.315,0.1969 1.7986,0.9951 3.6029,2.0435 5.3546,3.1104 0.1206,0.0735 0.234,0.1624 0.3544,0.2362 1.8688,1.1456 3.6993,2.3184 5.5121,3.5435 0.7775,0.5252 1.556,1.0354 2.323,1.5749 0.1306,0.092 0.2633,0.1832 0.3937,0.2756 0.03,0.0211 0.049,0.0577 0.079,0.0787 3.3915,2.4069 6.6718,4.9217 9.8431,7.5989 0.1348,0.1138 0.2592,0.24 0.3937,0.3543 0.7609,0.647 1.5361,1.3066 2.2836,1.9686 0.6617,0.7475 1.3219,1.5227 1.9686,2.2836 0.1139,0.134 0.2409,0.2593 0.3543,0.3937 3.4029,4.033 6.5667,8.2532 9.5281,12.6385 1.2241,1.8128 2.399,3.6433 3.5435,5.5121 0.074,0.1211 0.1624,0.2331 0.2362,0.3544 1.6356,2.6879 3.1808,5.4318 4.6459,8.2287 2.5514,4.8708 4.8462,9.9083 6.8508,15.0796 0.036,0.0923 0.082,0.1832 0.1181,0.2756 1.1605,3.0123 2.2241,6.0701 3.1891,9.1737 0.025,0.0789 0.054,0.1573 0.079,0.2362 0.3055,0.9885 0.581,1.9951 0.8662,2.9923 3.6956,12.9222 5.6696,26.5682 5.6696,40.6715 -10e-5,6.3189 -0.3708,12.5529 -1.1418,18.6624 -0.01,0.0786 -0.029,0.1576 -0.039,0.2362 -0.01,0.0661 -0.031,0.1308 -0.039,0.1968 -0.311,2.4068 -0.6768,4.7969 -1.1024,7.1658 -1.5305,8.5195 -3.806,16.781 -6.7326,24.7257 -0.4181,1.135 -0.8543,2.2643 -1.2993,3.386 -1.3351,3.365 -2.7606,6.6834 -4.3309,9.9218 -1.0469,2.1589 -2.1598,4.2795 -3.3073,6.3783 -1.1476,2.0988 -2.3378,4.146 -3.5829,6.1814 -0.01,0.01 0.01,0.0297 0,0.0394 -1.2397,2.0257 -2.5646,4.0246 -3.8978,5.9846 -1.3395,1.969 -2.7034,3.8882 -4.1341,5.7877 -0.7154,0.9497 -1.4673,1.903 -2.2048,2.8348 -3.6879,4.6588 -7.637,9.088 -11.8511,13.2684 -24.6602,5.7862 -43.098,14.2467 -49.6483,25.4344 -27.8016,47.4845 91.559,257.1987 146.5826,257.5332 55.0236,0.3349 176.9543,-207.9029 149.7323,-255.7221 -6.3384,-11.1343 -24.2749,-19.7912 -48.4277,-25.8675 -0.01,-0.007 -0.033,0.007 -0.039,0 -0.2272,-0.2194 -0.4436,-0.4484 -0.6693,-0.6693 -0.6378,-0.6244 -1.2634,-1.2541 -1.8899,-1.8899 -0.5934,-0.6019 -1.1887,-1.1991 -1.7717,-1.8111 -0.1276,-0.134 -0.2667,-0.2592 -0.3938,-0.3937 -0.3512,-0.3714 -0.6762,-0.7668 -1.0236,-1.1418 -0.5916,-0.6391 -1.1914,-1.2797 -1.7718,-1.9293 -0.8051,-0.9003 -1.6186,-1.7966 -2.4017,-2.7166 -2.3466,-2.7585 -4.5908,-5.6163 -6.7326,-8.5438 -0.084,-0.1142 -0.153,-0.2399 -0.2363,-0.3543 -1.3458,-1.8506 -2.6373,-3.7162 -3.8978,-5.6303 -0.059,-0.0887 -0.099,-0.1867 -0.1575,-0.2756 -0.2429,-0.3705 -0.5084,-0.7295 -0.7481,-1.1024 -0.5914,-0.9201 -1.1609,-1.8614 -1.7323,-2.7954 -0.6853,-1.1201 -1.3521,-2.2466 -2.008,-3.386 -0.652,-1.1317 -1.3067,-2.2751 -1.9292,-3.4254 -0.6262,-1.1583 -1.2547,-2.3274 -1.8505,-3.5041 -0.5959,-1.1767 -1.1675,-2.3884 -1.7324,-3.5829 -0.565,-1.1945 -1.1201,-2.3711 -1.6536,-3.5829 -0.5342,-1.2117 -1.0333,-2.433 -1.5356,-3.6616 -1.0033,-2.4571 -1.9622,-4.9596 -2.8348,-7.4807 -0.8725,-2.5211 -1.6641,-5.0573 -2.4017,-7.6382 -1.1064,-3.8712 -2.0831,-7.8177 -2.8741,-11.8116 -1.8457,-9.3192 -2.7954,-18.9619 -2.7954,-28.8204 -1e-4,-4.6886 0.2016,-9.3206 0.6299,-13.8984 0,-0.013 0,-0.0264 0,-0.0394 0.643,-6.8532 1.7586,-13.5688 3.3073,-20.1192 0.01,-0.0247 -0.01,-0.0539 0,-0.0787 1.549,-6.5367 3.5587,-12.9259 5.9452,-19.0955 0.015,-0.0386 0.024,-0.0795 0.039,-0.1181 0.7852,-2.0249 1.6097,-4.004 2.4805,-5.9846 0.4437,-1.0091 0.9125,-2.0344 1.378,-3.0317 0.017,-0.0375 0.022,-0.0805 0.039,-0.1181 0.3937,-0.8405 0.8115,-1.688 1.2205,-2.5198 0.07,-0.1427 0.1263,-0.2906 0.1969,-0.4331 0.4709,-0.95 0.9661,-1.8964 1.4568,-2.8348 0.027,-0.0522 0.051,-0.1053 0.079,-0.1575 0.9911,-1.8913 2.0408,-3.7488 3.1104,-5.5908 0.029,-0.0503 0.05,-0.1072 0.079,-0.1575 0.5231,-0.8975 1.073,-1.7919 1.6143,-2.6773 0.6002,-0.9828 1.1887,-1.9461 1.8111,-2.9136 0.3376,-0.5242 0.6796,-1.0551 1.0237,-1.5748 0.3231,-0.4886 0.6555,-0.9723 0.9843,-1.4568 1.1251,-1.658 2.2749,-3.2733 3.4647,-4.8822 0.045,-0.0613 0.073,-0.1356 0.1182,-0.1968 0.512,-0.6899 1.0511,-1.3668 1.5749,-2.0474 0.142,-0.1846 0.2902,-0.3673 0.433,-0.5512 0.6294,-0.8099 1.2442,-1.6053 1.8899,-2.4017 0.042,-0.0512 0.077,-0.1062 0.1181,-0.1575 1.3307,-1.6383 2.6963,-3.2243 4.0947,-4.8034 2.4426,-2.1631 4.9377,-4.2603 7.5201,-6.2601 2.5824,-1.9999 5.2391,-3.92 7.9532,-5.7484 0.054,-0.0365 0.1032,-0.0816 0.1575,-0.1181 1.7568,-1.1801 3.5455,-2.2805 5.3546,-3.386 0.055,-0.0338 0.1021,-0.0844 0.1575,-0.1181 1.8112,-1.1036 3.6509,-2.1625 5.5121,-3.1892 0.959,-0.5289 1.9417,-1.0667 2.9135,-1.5749 0.041,-0.0216 0.077,-0.0571 0.1181,-0.0787 0.9293,-0.4839 1.8941,-0.9528 2.8348,-1.4174 0.042,-0.0209 0.076,-0.0579 0.1182,-0.0787 0.9408,-0.4636 1.8827,-0.8947 2.8347,-1.3387 0.042,-0.0198 0.076,-0.059 0.1182,-0.0787 0.6153,-0.2863 1.2305,-0.5489 1.8505,-0.8269 0.5472,-0.2457 1.1028,-0.4693 1.6536,-0.7087 1.6879,-0.7333 3.3984,-1.4546 5.1184,-2.126 0.2476,-0.0967 0.4997,-0.1803 0.748,-0.2757 1.9492,-0.7486 3.9179,-1.4587 5.9059,-2.1261 0.028,-0.0092 0.051,-0.03 0.079,-0.0393 1.0125,-0.3385 2.0489,-0.6673 3.071,-0.9843 0.039,-0.0122 0.079,-0.0272 0.1182,-0.0394 1.0619,-0.3284 2.1171,-0.64 3.1891,-0.9449 1.0738,-0.306 2.1448,-0.6235 3.2285,-0.9056 0.5347,-0.1389 1.0772,-0.2606 1.6143,-0.3937 0.927,-0.2301 1.8615,-0.4568 2.7954,-0.6693 1.7877,-0.4068 3.5822,-0.7613 5.394,-1.1025 4.3308,-0.8155 8.7343,-1.4621 13.1897,-1.8898 4.6918,-0.4505 9.4429,-0.6694 14.2527,-0.6694 2.6041,1e-4 5.1851,0.0635 7.7563,0.1969 0.21,0.0109 0.4201,0.0276 0.63,0.0394 1.0744,0.0603 2.1602,0.1136 3.2285,0.1968 0.313,0.0244 0.6324,0.0525 0.9449,0.0788 0.2239,0.0189 0.4457,0.0589 0.6693,0.0787 1.1514,0.1024 2.2817,0.2257 3.4254,0.3544 0.8559,0.0962 1.7077,0.2042 2.5592,0.315 0.1432,0.0186 0.2899,0.0203 0.4331,0.0393 0.6097,0.0812 1.2037,0.187 1.8111,0.2756 1.1169,0.1629 2.238,0.3241 3.3466,0.5119 0.6277,0.1064 1.265,0.2007 1.8899,0.315 0.238,0.0435 0.4711,0.1128 0.7087,0.1574 0.9977,0.1876 2.0017,0.3831 2.9923,0.5906 0.8001,0.1677 1.6063,0.3313 2.4017,0.5119 0.065,0.0148 0.1316,0.0244 0.1969,0.0393 1.2522,0.2861 2.5004,0.5879 3.7403,0.9056 0.3147,0.0807 0.6311,0.1535 0.9449,0.2362 0.5539,0.1459 1.1024,0.3204 1.6537,0.4725 0.6448,0.178 1.2879,0.3647 1.9292,0.5512 1.0748,0.3125 2.1246,0.6088 3.1892,0.9449 0.1297,0.041 0.2641,0.0769 0.3937,0.1182 1.144,0.3647 2.2936,0.75 3.4254,1.1417 1.1931,0.4129 2.3643,0.857 3.5434,1.2993 0.5224,0.1961 1.0554,0.3888 1.5749,0.5906 0.6218,0.2415 1.2329,0.4985 1.8505,0.7481 0.1681,0.0679 0.344,0.1283 0.5119,0.1968 0.968,0.3954 1.9558,0.8054 2.9135,1.2206 0.2484,0.1077 0.5004,0.2059 0.7481,0.315 0.8725,0.3841 1.7349,0.7807 2.5985,1.1811 1.5312,0.7103 3.065,1.4442 4.5672,2.2049 0.6656,0.337 1.3089,0.6769 1.9686,1.0236 0.5133,0.2698 1.0258,0.5513 1.5355,0.8269 0.5639,0.3048 1.1336,0.6329 1.693,0.9449 0.5824,0.3248 1.1549,0.6518 1.7324,0.9843 0.4759,0.2739 0.9449,0.5478 1.4174,0.8268 0.6598,0.3897 1.3154,0.7816 1.9686,1.1812 0.3824,0.2339 0.7617,0.4714 1.1418,0.7087 0.065,0.0404 0.1321,0.0775 0.1969,0.1181 0.9637,0.6037 1.9254,1.2253 2.8741,1.8505 0.1672,0.1102 0.3451,0.2041 0.5119,0.315 0.635,0.4222 1.2617,0.8674 1.8898,1.2992 1.0797,0.7423 2.1304,1.4743 3.1892,2.2442 0.1293,0.0941 0.2647,0.1813 0.3937,0.2757 2.9268,2.1429 5.786,4.3849 8.5438,6.7326 0.1062,0.0905 0.2089,0.1848 0.3149,0.2756 0.8121,0.695 1.6051,1.414 2.4017,2.1261 0.1798,0.1607 0.3723,0.3109 0.5513,0.4725 0.717,0.6473 1.4219,1.3075 2.1261,1.9686 0.2497,0.2345 0.4998,0.4724 0.748,0.7087 0.6257,0.5956 1.2353,1.2047 1.8505,1.8111 0.3123,0.3079 0.6354,0.5949 0.9449,0.9055 0.5443,0.5461 1.0786,1.0992 1.6143,1.6537 0.01,0.0068 -0.01,0.0325 0,0.0393 6.0763,24.1529 14.6938,42.0894 25.8281,48.4278 47.8192,27.222 256.0568,-94.7087 255.7223,-149.7323 -0.3349,-55.0236 -210.0489,-174.38423 -257.5334,-146.58259 -11.1877,6.55028 -19.6088,24.98807 -25.395,49.64829 -0.078,0.0789 -0.1578,0.1575 -0.2363,0.2362 -0.7588,0.7615 -1.5084,1.4994 -2.2835,2.2443 -0.1683,0.1617 -0.3429,0.3115 -0.5119,0.4724 -0.6919,0.6587 -1.3821,1.3234 -2.0867,1.9686 -0.2598,0.238 -0.526,0.4726 -0.7874,0.7087 -0.6218,0.5614 -1.2586,1.1422 -1.8899,1.693 -0.3495,0.305 -0.7107,0.6039 -1.0631,0.9056 -0.5473,0.4685 -1.0994,0.9174 -1.6536,1.378 -0.4528,0.3765 -0.9207,0.7313 -1.378,1.1024 -1.0153,0.8239 -2.0338,1.644 -3.071,2.4411 -1.0373,0.7972 -2.0911,1.5924 -3.1498,2.3623 -0.2903,0.211 -0.5744,0.4211 -0.8662,0.63 -0.7722,0.553 -1.5398,1.0759 -2.323,1.6143 -0.8703,0.5983 -1.7542,1.1917 -2.6379,1.7717 -0.2126,0.1396 -0.4166,0.2946 -0.63,0.4331 -0.1037,0.0673 -0.2111,0.1299 -0.3149,0.1969 -2.002,1.2921 -4.0359,2.5439 -6.1027,3.7403 -0.1016,0.0588 -0.2133,0.099 -0.315,0.1575 -0.935,0.538 -1.887,1.0963 -2.8348,1.6143 -0.1966,0.1074 -0.3934,0.2084 -0.5906,0.3149 -0.8558,0.4627 -1.6933,0.932 -2.5592,1.3781 -0.3123,0.161 -0.6313,0.3136 -0.9449,0.4724 -1.1767,0.5959 -2.3884,1.1675 -3.5829,1.7324 -0.3787,0.1792 -0.7612,0.3358 -1.1418,0.5118 -0.2779,0.1285 -0.5479,0.267 -0.8268,0.3938 -1.0945,0.4977 -2.1986,0.9852 -3.3072,1.4567 -0.6559,0.2791 -1.308,0.5571 -1.9686,0.8268 -0.458,0.187 -0.9179,0.3688 -1.3781,0.5513 -0.7781,0.3086 -1.5777,0.6098 -2.3623,0.9055 -0.3422,0.129 -0.6803,0.2673 -1.0237,0.3937 -0.9055,0.3337 -1.8029,0.6681 -2.7166,0.9843 -0.2354,0.0815 -0.4729,0.156 -0.7087,0.2363 -1.0288,0.3502 -2.0717,0.6957 -3.1104,1.0237 -0.1188,0.0374 -0.2355,0.0809 -0.3544,0.1181 -0.5909,0.1849 -1.1777,0.3342 -1.7717,0.5118 -1.7447,0.5216 -3.4656,1.038 -5.2365,1.4962 -0.117,0.0303 -0.2373,0.0487 -0.3544,0.0787 -1.0691,0.2738 -2.1502,0.5372 -3.2285,0.7874 -0.2359,0.0548 -0.4724,0.1039 -0.7087,0.1575 -0.9636,0.2187 -1.943,0.4303 -2.9135,0.63 -0.8409,0.173 -1.6739,0.3532 -2.5199,0.5118 -0.3684,0.0691 -0.733,0.1305 -1.1024,0.1969 -0.4847,0.0871 -0.9705,0.1539 -1.4568,0.2362 -0.7355,0.1245 -1.4657,0.2408 -2.2048,0.3544 -0.6157,0.0947 -1.2324,0.1885 -1.8505,0.2756 -1.356,0.1909 -2.7272,0.358 -4.0947,0.5118 -0.4972,0.0559 -0.9975,0.1066 -1.4961,0.1575 -1.2077,0.1233 -2.4062,0.2603 -3.6223,0.3543 -0.039,0.003 -0.079,-0.003 -0.1181,0 -1.0034,0.0769 -2.0228,0.1403 -3.0316,0.1969 -0.2498,0.014 -0.4981,0.0266 -0.7481,0.0394 -0.2232,0.0114 -0.4459,0.0289 -0.6693,0.0393 -2.3093,0.1074 -4.6333,0.1575 -6.9689,0.1575 -2.3443,1e-4 -4.6904,-0.0492 -7.0083,-0.1575 -2.3175,-0.108 -4.6017,-0.2587 -6.8901,-0.4724 -5.7094,-0.5341 -11.3482,-1.4321 -16.8513,-2.5986 -0.013,-0.003 -0.027,0.003 -0.039,0 -2.2061,-0.4682 -4.3673,-0.9699 -6.5358,-1.5355 -2.1686,-0.5656 -4.3284,-1.1899 -6.4571,-1.8505 -1.4217,-0.4411 -2.8491,-0.8954 -4.2522,-1.378 -1.7336,-0.5964 -3.4539,-1.2313 -5.1577,-1.8899 -0.4231,-0.1635 -0.8387,-0.3445 -1.2599,-0.5118 -1.6313,-0.648 -3.28,-1.304 -4.8822,-2.008 -0.9983,-0.4389 -2.0056,-0.9178 -2.9923,-1.378 -0.011,-0.005 -0.028,0.005 -0.039,0 -0.9865,-0.4604 -1.9391,-0.936 -2.9136,-1.4174 -0.01,-0.005 -0.029,0.005 -0.039,0 -1.3241,-0.6546 -2.636,-1.3546 -3.9373,-2.0474 -1.5871,-0.8449 -3.1726,-1.698 -4.7246,-2.5985 -2.227,-1.2926 -4.4238,-2.6515 -6.5752,-4.0554 -0.5942,-0.3876 -1.1835,-0.7852 -1.7717,-1.1811 -0.01,-0.006 -0.03,0.006 -0.039,0 -0.6245,-0.4205 -1.2328,-0.8696 -1.8505,-1.2993 -1.1738,-0.817 -2.316,-1.6306 -3.4647,-2.4805 -1.7374,-1.2848 -3.48,-2.6185 -5.1578,-3.9765 -0.8599,-0.6964 -1.6759,-1.411 -2.5198,-2.1261 -0.816,-0.6913 -1.6404,-1.3783 -2.4411,-2.0868 -0.7334,-0.8281 -1.4505,-1.6752 -2.1654,-2.5198 -0.6912,-0.8158 -1.3737,-1.6102 -2.0474,-2.4411 -0.012,-0.0141 -0.028,-0.0252 -0.039,-0.0393 -1.3581,-1.6778 -2.6917,-3.4204 -3.9766,-5.1578 -0.011,-0.0148 -0.028,-0.0245 -0.039,-0.0394 -0.6369,-0.8608 -1.232,-1.7235 -1.8505,-2.5985 -0.011,-0.0149 -0.029,-0.0245 -0.039,-0.0394 -0.6183,-0.8754 -1.2509,-1.7486 -1.8505,-2.6379 -0.01,-0.015 -0.029,-0.0244 -0.039,-0.0394 -0.5993,-0.8896 -1.152,-1.8134 -1.7323,-2.7167 -0.01,-0.0153 -0.03,-0.024 -0.039,-0.0394 -0.58,-0.9033 -1.1323,-1.7999 -1.693,-2.7166 -0.5791,-0.9481 -1.1742,-1.9122 -1.7324,-2.8742 -1.0895,-1.8778 -2.1418,-3.7799 -3.1497,-5.70896 -0.01,-0.0155 -0.031,-0.0238 -0.039,-0.0394 -0.5001,-0.95631 -0.9773,-1.94508 -1.4568,-2.91354 -0.01,-0.0158 -0.032,-0.0236 -0.039,-0.0394 -0.4791,-0.96859 -0.9196,-1.93307 -1.378,-2.91354 -0.01,-0.0156 -0.032,-0.0238 -0.039,-0.0394 -0.923,-1.9792 -1.7619,-3.99828 -2.5985,-6.02394 -0.01,-0.0158 -0.033,-0.0236 -0.039,-0.0394 -0.4151,-1.0044 -0.8271,-2.01625 -1.2205,-3.03166 -0.01,-0.0157 -0.033,-0.0236 -0.039,-0.0394 -0.3932,-1.01579 -0.7313,-2.0445 -1.1024,-3.07103 -0.01,-0.0157 -0.034,-0.0237 -0.039,-0.0394 -0.3709,-1.02688 -0.7144,-2.07308 -1.063,-3.1104 -4.9501,-14.7549 -7.6382,-30.56093 -7.6382,-46.97099 -1e-4,-9.8586 0.9498,-19.50123 2.7954,-28.82042 0.7909,-3.99395 1.7677,-7.94037 2.8741,-11.81165 1.4752,-5.16172 3.2299,-10.20461 5.2365,-15.11891 0.5017,-1.22859 1.002,-2.44981 1.5356,-3.66161 1.067,-2.42363 2.1944,-4.81237 3.386,-7.16574 0.5957,-1.17669 1.2243,-2.34578 1.8505,-3.50412 0.6261,-1.15835 1.2732,-2.28592 1.9292,-3.42538 0.6559,-1.13947 1.3227,-2.26593 2.008,-3.386 0.6852,-1.12009 1.3727,-2.24649 2.0867,-3.34664 3.5699,-5.50079 7.4832,-10.74598 11.7329,-15.70949 0.8526,-0.99592 1.7202,-1.98025 2.5986,-2.95291 0.8755,-0.96965 1.7766,-1.92812 2.6773,-2.87417 0.8969,-0.94192 1.7954,-1.87747 2.7166,-2.79542 0.5577,-0.55569 1.1266,-1.10688 1.6931,-1.65364 24.1288,-6.07562 42.0541,-14.66172 48.3883,-25.78876 27.222,-47.81919 -94.7087,-256.05687 -149.7323,-255.7222 z m 1.4568,512.23185 c 35.9667,-1e-4 65.1609,29.1942 65.1609,65.1609 0,35.9667 -29.1942,65.1609 -65.1609,65.1609 -35.9668,0 -65.161,-29.1942 -65.161,-65.1609 10e-5,-35.9667 29.1942,-65.1609 65.161,-65.1609 z",
            style:"opacity:0.88584475;fill:url(#" + this.id + "radialGradient3175);fill-opacity:1;stroke:none"
          }).end().end().end().svg);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Shuriken1;
        return new Shuriken1(args && args.length && args[0]);
      };
    })();
    exports.Shuriken1 = Shuriken1;
  })(require, nm.getExports(), nm.getId());
})();

