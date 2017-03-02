angular.module("routerApp").directive("clainDateinput",['formatDateFilter','clainCalendarCaculate',
function (formatDateFilter,clainCalendarCaculate) {
    return {
        restrict: 'E',
        templateUrl: "./component/commonView/clainDateinput/dateInput.html",
        scope:{
            accurate:"=",
            str:"=",
            monthOnly:"=",
            valueChange:'&',
            disabled:"=",
            datevalue:"="
        },
        replace: true,
        controller: ['$scope','$element', function ($scope,$element) {
            $scope.show = false;
            if(!$scope.disabled){
                $scope.toggleCal = function () {
                    $scope.show = !$scope.show;
                    //$scope.show = true;
                    if($scope.show==true){
                        setTimeout(function() {
                            $element.find(".dateInputCalCon").focus();
                        }, 0);
                    }
                };
            }
            $scope.onBlur=function(){
                //$scope.show = false;
            };
            $scope.changeValue=function(){
                $scope.valueChange();
            }
        }],
        link:function(scope,element,attrs,ngModel){
            scope.selectDay = function (day) {
                scope.show = false;
                element.find(".clainInput").val(formatDateFilter(day,scope.accurate));
                if(scope.str==true){
                    scope.datevalue=formatDateFilter(day,scope.accurate);
                    //console.log(ngModel.$setViewValue)
                }
                else
                   scope.datevalue=day;
                //console.log(ngModel.$setViewValue)
            };
            scope.selectMonth = function (month) {
                console.log(month);
                scope.show = false;
                element.find(".clainInput").val(formatDateFilter(month,scope.accurate,true));
                if(scope.str==true){
                    scope.datevalue=formatDateFilter(month,scope.accurate,true);
                    //var value=element.find('.hxInput').val().splice();
                    //console.log(value);
                }
                else{
                    scope.datevalue=month;
                }
                //console.log(ngModel.$setViewValue)
            };
        }
    };
}])
