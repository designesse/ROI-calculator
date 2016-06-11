angular
    .module('ROICalculator')
    .controller('ROIController', function ($scope, revenueRepository, expenseRepository) {
        $scope.revenueItems = revenueRepository.getRevenueItems();
        $scope.expenseItems = expenseRepository.getExpenseItems();

        $scope.newRevenue = {};
        $scope.newExpense = {};

        $scope.addRevenue = function (newRevenue) {
            $scope.errorRevenueName = false;
            $scope.errorRevenueOneTime = false;
            $scope.errorRevenueMonthly = false;
            if (newRevenue.name == null) {
                $scope.errorRevenueName = true;
            }

            if (!newRevenue.oneTime || isNaN(newRevenue.oneTime)) {
                $scope.errorRevenueOneTime = true;
            }

            if (!newRevenue.monthly || isNaN(newRevenue.monthly)) {
                $scope.errorRevenueMonthly = true;
            }

            if (newRevenue && !isNaN(newRevenue.oneTime) && !isNaN(newRevenue.monthly)) {
                newRevenue.oneTime = Number(newRevenue.oneTime);
                newRevenue.monthly = Number(newRevenue.monthly);
                $scope.revenueItems.push(newRevenue);
                $scope.newRevenue = {};
                updateResults();
            }
        };

        $scope.deleteRevenue = function (item) {
            var index = $scope.revenueItems.indexOf(item);
            $scope.revenueItems.splice(index, 1);
            $scope.item = {};
            updateResults();
        };

        $scope.addExpense = function (newExpense) {
            $scope.errorExpenseName = false;
            $scope.errorExpenseOneTime = false;
            $scope.errorExpenseMonthly = false;
            if (newExpense.name == null) {
                $scope.errorExpenseName = true;
            }

            if (!newExpense.oneTime || isNaN(newExpense.oneTime)) {
                $scope.errorExpenseOneTime = true;
            }

            if (!newExpense.monthly || isNaN(newExpense.monthly)) {
                $scope.errorExpenseMonthly = true;
            }

            if (newExpense && !isNaN(newExpense.oneTime) && !isNaN(newExpense.monthly)) {
                newExpense.oneTime = Number(newExpense.oneTime);
                newExpense.monthly = Number(newExpense.monthly);
                $scope.expenseItems.push(newExpense);
                $scope.newExpense = {};
                updateResults();
            }
        };

        $scope.deleteExpense = function (item) {
            var index = $scope.expenseItems.indexOf(item);
            $scope.expenseItems.splice(index, 1);
            $scope.item = {};
            updateResults();
        };

        function getTotals(items) {
            var totals = [];
            totals['oneTime'] = 0;
            totals['monthly'] = 0;

            for (var i in items) {
                totals['oneTime'] += items[i]['oneTime'];
                totals['monthly'] += items[i].monthly;
            }

            totals['total'] = totals['oneTime'] + 12 * totals['monthly'];
            return totals;
        }

        function updateResults() {
            var totalRevenue = getTotals($scope.revenueItems);
            var totalExpense = getTotals($scope.expenseItems);

            $scope.totalRevenueOneTime = totalRevenue['oneTime'];
            $scope.totalRevenueMonthly = totalRevenue['monthly'];
            $scope.totalRevenueTotal = totalRevenue['total'];

            $scope.totalExpenseOneTime = totalExpense['oneTime'];
            $scope.totalExpenseMonthly = totalExpense['monthly'];
            $scope.totalExpenseTotal = totalExpense['total'];

            $scope.totalMonthlyProfit = totalRevenue['monthly'] - totalExpense['monthly'];
            $scope.totalProfit = totalRevenue['total'] - totalExpense['total'];
            $scope.contributionMargin = (totalRevenue['total'] - totalExpense['total']) / totalRevenue['total'];
            $scope.capitalROI = (totalExpense['oneTime'] - totalRevenue['oneTime']) / (totalRevenue['monthly'] - totalExpense['monthly']);
        }

        updateResults();
    });