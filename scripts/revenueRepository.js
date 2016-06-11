angular
    .module('ROICalculator')
    .factory('revenueRepository', function () {
        var revenueItems = [
            {
                "name": "Item1",
                "oneTime": 100,
                "monthly": 50
            },
            {
                "name": "Item2",
                "oneTime": 50,
                "monthly": 25
            },
            {
                "name": "Item3",
                "oneTime": 25,
                "monthly": 85
            }
        ];

        function getRevenueItems() {
            return revenueItems;
        }

        return {
            getRevenueItems: getRevenueItems
        }
    });