import ymapsTouchScroll from '../../node_modules/ymaps-touch-scroll/dist/ymaps-touch-scroll.js';

document.addEventListener('DOMContentLoaded', () => {

    let flag = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const mapOffset = document.querySelector('.contacts').offsetTop;

        if (scrollY >= mapOffset - 800 && flag === 0) {

            ymaps.ready(init);

            function init() {
                var map = document.querySelector('#map');

                var mark = [56.15691591312475, 40.44542980786508];

                var myMap = new ymaps.Map("map", {
                    center: [56.156934460025646, 40.44484902984561],
                    zoom: 19,
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
                    '<div class="placemark-content" style="border-radius: 5px; padding: 5px; width: 90px; background-color: #fff; color: #000;">$[properties.iconContent]</div>'
                );

                var placemark = new ymaps.Placemark(mark, {
                    iconContent: 'Автосервис Чип и Дип'
                }, {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: 'img/placemark.png',
                    iconImageSize: [45, 50],
                    iconImageOffset: [-30, -50],
                    iconContentOffset: [50, 5],
                    iconContentLayout: placemarkContent
                });

                myMap.geoObjects.add(placemark);

                function onResizeMap() {
                    if (window.innerWidth > 768) {
                        //Set New center
                        myMap.setCenter([56.156934460025646, 40.44484902984561]);
                        var pixelCenter2 = myMap.getGlobalPixelCenter('#map');
                    } else {
                        myMap.setCenter([56.15694493831349, 40.445423022574786]);
                    }
                }
                onResizeMap();

                window.onresize = function () {
                    onResizeMap();
                };

                ymapsTouchScroll(myMap);
            }

            flag = 1;

        };
    });

});