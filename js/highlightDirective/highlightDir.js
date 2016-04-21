angular.module("app")
    .directive("hilite", function() {
        return {

            restrict: "A",
            link: function(scope, element, attributes) {
                element.on('mouseover', function() {
                    element.toggleClass('hilite');
                });
                element.on('mouseout', function() {
                    element.toggleClass('hilite');
                });
            }

        };
    });
