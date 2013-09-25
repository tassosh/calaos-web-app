'use strict';

/* Directives */

calaos.directive("colorPicker", function(){
    return {
        restrict: "A",
        scope: {
            url: '=',
        },
        link: function(scope, element){
            var ctx = element[0].getContext('2d');
            var onHold = false;
            var lastX;
            var lastY;

            console.log(element);

            element[0].height = window.innerWidth;
            element[0].width = window.innerWidth;
            element[0].style.cursor = 'url("img/color-wheel-selector.png") 24 24, pointer';

            var image = new Image();

            image.src = scope.url;

            image.onload = function () {
                ctx.scale( window.innerWidth / image.width , window.innerWidth / image.height);
                ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
            }

            function getColor() {
                // get coordinates of current position
                var canvasX = event.layerX + 12; //12 == half pointer size ?
                var canvasY = event.layerY + 12; 
                // get current pixel
                var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
                var pixel = imageData.data;
                var pixelColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
                return pixelColor;
            }


            element.bind('mousedown', function(event){
                onHold = true;
            });
            element.bind('mousemove', function(event){
                var currentX, currentY;
                if(onHold)
                { 
                    document.getElementById("color").style.backgroundColor = getColor();
                }
            });
            element.bind('mouseup', function(event){
                if (onHold)
                {
                    onHold = false;
                    document.getElementById("color").style.backgroundColor = getColor();
                }
            });
            // canvas reset
            function reset(){
                element[0].width = element[0].width;
            }
        }
    };
});
