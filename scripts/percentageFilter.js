angular
    .module('ROICalculator')
    .filter('percentage', ['$filter', function ($filter) {
        return function (input) {
            return $filter('number')(Math.round(input * 100, 0)) + '%';
        }
    }]);