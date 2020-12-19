import ymapsTouchScroll from '../../node_modules/ymaps-touch-scroll/dist/ymaps-touch-scroll.js';

ymaps.ready(init);
function init(){
    var map = document.querySelector('#map');
    var center = map.dataset.center.split(',');
    center[0] = +center[0];
    center[1] = +center[1];

    var mark = map.dataset.placemark.split(',');
    mark[0] = +mark[0];
    mark[1] = +mark[1];

    var myMap = new ymaps.Map("map", {
        center: center,
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

    ymapsTouchScroll(myMap);
}