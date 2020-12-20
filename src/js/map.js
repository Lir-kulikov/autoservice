import ymapsTouchScroll from '../../node_modules/ymaps-touch-scroll/dist/ymaps-touch-scroll.js';

ymaps.ready(init);
function init(){
    var map = document.querySelector('#map');

    var mark = map.dataset.placemark.split(',');
    mark[0] = +mark[0];
    mark[1] = +mark[1];

    var myMap = new ymaps.Map("map", {
        center: [56.15729845689245, 40.44173228880147],
        zoom: 16,
        controls: []
    });

    myMap.controls.add('zoomControl', {
      float: 'right',
      position: {
          right: 20,
          top: 110
     }
  });

    var placemarkContent = ymaps.templateLayoutFactory.createClass(
        '<div class="placemark-content" style="border-radius: 5px; padding: 5px; width: 130px; background-color: #1c63b8; color: #fff;">$[properties.iconContent]</div>'
    );

    var placemark = new ymaps.Placemark(mark, {
        iconContent: 'Автосервис в красном селе'
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'img/car-service.png',
        iconImageSize: [50, 50],
        iconImageOffset: [-20, -20],
        iconContentOffset: [-35, 55],
        iconContentLayout: placemarkContent
    });

    myMap.geoObjects.add(placemark);

    function onResizeMap() {
        if (window.innerWidth > 768) { 
            //Set New center
            myMap.setCenter([56.15729845689245, 40.44173228880147]);
            var pixelCenter2 = myMap.getGlobalPixelCenter('#map');
            } else {
                myMap.setCenter([56.15709488008944,40.4455302967665]);
            }
        } onResizeMap();

        window.onresize = function () {
            onResizeMap();
        };

    ymapsTouchScroll(myMap);
}