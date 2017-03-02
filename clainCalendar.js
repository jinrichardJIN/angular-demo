angular.module('routerApp').directive("clainCalendar",function(){
    return {
    restrict: 'E',
    replace: true,
    templateUrl: "./component/commonView/clainDateinput/clainCalendar.html",
    controller: ['clainCalendarCaculate', '$element','$scope', function (clainCalendarCaculate, $element,$scope) {
        var fromNow=true;
        // var lessDay
        $scope.showDay=$scope.monthOnly?false : true;
        $scope.showMonth=$scope.monthOnly?true : false;
        $scope.showYear = false;
        $scope.now = new Date();
        var curYear = $scope.now.getFullYear();
        var curMonth = $scope.now.getMonth() + 1;
        $scope.cur = $scope.now;
        $scope.days = clainCalendarCaculate.getWholeMonth($scope.now.getFullYear(), $scope.now.getMonth() + 1);
        // for(var i=0;i<$scope.days.length;i++){
        //     if($scope.days[i].getTime()<$scope.now){
        //         $scope.days[i].lessDay=true;
        //     }else{
        //         $scope.days[i].lessDay=false;
        //     }
        // }
        $scope.touched = $scope.now;
        $scope.toleft = function () {
            if (curMonth == 1) {
                curMonth = 12;
                curYear--;
            } else {
                curMonth--;
            }
            $scope.cur = new Date(curYear, curMonth - 1);
            $scope.days = clainCalendarCaculate.getWholeMonth(curYear, curMonth);
        };
        $scope.toright = function () {
            if (curMonth == 12) {
                curMonth = 1;
                curYear++;
            } else {
                curMonth++;
            }
            $scope.cur = new Date(curYear, curMonth - 1);
            $scope.days = clainCalendarCaculate.getWholeMonth(curYear, curMonth);
        };
        $scope.isEqual = function (date1, date2, arg) {
            if (arg == "day") {
                return (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) ? true : false;
            }
            if (arg == "month"){
                return (date1.getFullYear() == curYear && date1.getMonth() == date2) ? true : false;
            }
            if (arg == "year") {
                return (date1.getFullYear() == date2) ? true : false;
            }
        };
        $scope.selectDay = function (day) {
            $scope.touched = day;
            // console.log(day.lessDay);
            // // if(fromNow){
            // //     if()
            // // }
            $scope.onSelect({day: day});
            //if()
        };
        $scope.search = function ($event) {
            $event.stopPropagation();
            $scope.onSearch({times: [$scope.startTime, $scope.endTime]});
        };
        //wyy add code
        $scope.changeMonth = function () {
            $scope.showDay = !$scope.showDay;
            $scope.showMonth = !$scope.showMonth;
        }
        //Month
        $scope.changeYear = function () {
            $scope.showDay = false;
            $scope.showMonth = false;
            $scope.showYear = true;
        };
        $scope.toYearLeft = function () {
            curYear--;
            $scope.cur = new Date(curYear, curMonth - 1);
            $scope.days = clainCalendarCaculate.getWholeMonth(curYear, curMonth);
        };
        $scope.toYearRight = function () {
            curYear++;
            $scope.cur = new Date(curYear, curMonth - 1);
            $scope.days = clainCalendarCaculate.getWholeMonth(curYear, curMonth);
        };
        $scope.months = [
            {code: 0, name: "一月"},
            {code: 1, name: "二月"},
            {code: 2, name: "三月"},
            {code: 3, name: "四月"},
            {code: 4, name: "五月"},
            {code: 5, name: "六月"},
            {code: 6, name: "七月"},
            {code: 7, name: "八月"},
            {code: 8, name: "九月"},
            {code: 9, name: "十月"},
            {code: 10, name: "十一月"},
            {code: 11, name: "十二月"}
        ];
        $scope.selectMonth = function (month) {
            curMonth=month+1;
            $scope.cur = new Date(curYear, curMonth - 1);
            if(!$scope.monthOnly){
                $scope.days = clainCalendarCaculate.getWholeMonth(curYear, curMonth);
                $scope.showMonth=false;
                $scope.showDay=true;
            }else{
                //console.log($scope.cur);

                $scope.onSelectMonth({month:$scope.cur});
                //$scope.onSelect({day: day});
            }

        };
        //Year
        //.log(curYear);
        $scope.yearFirst = curYear - (curYear % 10);
        function getYearsArray() {
            $scope.years = [$scope.yearFirst - 1];
            for (var i = 0; i <= 10; i++) {
                $scope.years.push($scope.yearFirst + i);
            }
            //console.log($scope.years);
        }
        getYearsArray();
        $scope.changeDay = function () {
            if(!$scope.monthOnly){
                $scope.showMonth = false;
                $scope.showYear = false;
                $scope.showDay = true;
            }else{
                $scope.showMonth=true;
                $scope.showYear=false;
            }
        };
        $scope.toYearReduce = function () {
            $scope.yearFirst -= 10;
            getYearsArray();
        };
        $scope.toYearAdd = function () {
            $scope.yearFirst += 10;
            getYearsArray();
        };
        $scope.selectYear=function(year){
            //console.log(year);
            curYear=year;
            $scope.cur = new Date(curYear, curMonth - 1);
            $scope.days = clainCalendarCaculate.getWholeMonth(curYear, curMonth);
            $scope.showMonth=true;
            $scope.showYear=false;
        }

    }],
    scope: {
        onSelect: "&",
        monthOnly:'=',
        onSelectMonth:'&',
        datevalue:"="
    }
    }
}).
    factory('clainCalendarCaculate', [function () {
        /**获取一年的各月的天数，接收一个年份 */
        var dayNumOfMonth=function(year, month) {
            var num = 0;
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
                return 31;
            if (month == 4 || month == 6 || month == 9 || month == 11)
                return 30;
            if (month == 2) {
                if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
                    return 29;
                else
                    return 28;
            }
            throw new Error("month " + month + " not allowed");
        }

        return {
            /**返回指定月份内的所有天以及往前补到星期一和往后补到星期日的天 */
            getWholeMonth: function (year, month) {
                var num = dayNumOfMonth(year, month);
                var firstday = new Date(year, month - 1, 1);
                var lastday = new Date(year, month - 1, num);
                var before = (firstday.getDay() + 6) % 7;
                var after = (7 - lastday.getDay()) % 7;
                var temp = [];
                for (var i = before; i > 0; i--) {
                    temp.push(new Date(firstday.getTime() - i * 24 * 3600 * 1000));
                }
                for (var i = 0; i < num + after; i++)
                    temp.push(new Date(firstday.getTime() + i * 24 * 3600 * 1000));
                return temp;
            },
            isValid: function (year, month, day) {
                var tempYear = (new Number(year)).valueOf();
                var tempMonth = (new Number(month)).valueOf();
                var tempDay = (new Number(day)).valueOf();
                var dayNumber = dayNumOfMonth(tempYear, tempMonth);
                if (tempYear < 0)
                    return false;
                if (tempMonth > 12 || tempMonth < 0)
                    return false;
                if (tempDay < 0 || tempDay > dayNumber)
                    return false;
                return true;
            }
        };
    }]);