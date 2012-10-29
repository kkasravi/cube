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
          this.id='ninja';
          this.raiseSwordDuration='500ms';
          this.ninja=svg.Svg({
            id:this.id,
            width:"428pt",
            height:"596pt"
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
          }).end().end();
          monads.DOMable({
            element:document.body
          }).on('load').style({
            '-webkit-perspective':'1000px'
          });
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'ninja'
          }).reflect('-77%').add(this.ninja.svg);
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
      Ninja.prototype['play'] = function() {
        this.element.style({
          '-webkit-transform':'scale(0.6,0.6) translateX(145%) translateY(40%)'
        });
        this.ninja.svg.getElementById('changesword').beginElement();
        this.swordblade.style.webkitTransition='fill 1s';
        this.swordblade.style.fill='rgb(233,120,37)';
        this.swordblade.style.filter='url(#drop-shadow)';
        this.sword.style.webkitTransform='rotate(53deg)';
        this.leftArm.style.webkitTransform='translateY(10px)';
        this.rightArm.style.webkitTransform='rotate(-20deg)';
        this.sword.addEventListener('touchend',function (event) {
          controller.Controller.publish(events.CustomEvent({
            type:'next',
            canBubble:false,
            isCanceleable:true
          }));
        });
        return this;
      };
      Ninja.init = (function () {
        var styles=[{
          selector:'.ninja',
          style:"position:absolute;-webkit-transform-style:preserve-3d;-webkit-transition:-webkit-transform 0.3s linear;-webkit-transform:scale(0.6,0.6);"
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
          }).on('load').add(svg.Svg({
            width:"180.0",
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
          }).end().end().end().svg).reflect('-28%').on(['touchend'],this.ontouchend);
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
            'class':'multiply'
          }).add(svg.Svg({
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
          }).end().end().end().svg).reflect('-28%').on(['touchend'],this.ontouchend);
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
          style:"opacity:0;"
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
            'class':'divide'
          }).add(svg.Svg({
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
          }).end().end().end().svg).reflect('-28%').on(['touchend'],this.ontouchend);
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
          style:"opacity:0;"
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
            'class':'minus'
          }).add(svg.Svg({
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
          }).end().end().end().svg).reflect('-28%');
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
          style:"opacity:0;"
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
  })(require, nm.getExports(), nm.getId());
})();

