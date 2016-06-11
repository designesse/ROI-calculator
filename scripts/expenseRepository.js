angular
    .module('ROICalculator')
    .factory('expenseRepository', function () {
        var expenseItems = [
            {
                "name": "Expense1",
                "oneTime": 500,
                "monthly": 20
            },
            {
                "name": "Expense2",
                "oneTime": 200,
                "monthly": 40
            },
        ];

        function getExpenseItems() {
            return expenseItems;
        }

        return {
            getExpenseItems: getExpenseItems
        }
    });