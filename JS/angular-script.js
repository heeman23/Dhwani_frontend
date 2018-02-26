var crudApp = angular.module('crudApp', []);
crudApp.controller("DbController", ['$scope', '$http', function ($scope, $http) {

// Function to get employee details from the database
    getInfo();

// get data from db
    function getInfo() {
        $http({
            method: "GET",
            url: "http://localhost:2224/users",


        }).then(function mySuccess(response) {
            // alert(response);
            $scope.details = response;
// console.log($scope.details);
            angular.forEach($scope.details, function (value, key) {

                if (key === 'data') {


                    angular.forEach(JSON.parse(value), function (value1, key1) {
                        if (key1 === 'data') {
                            $scope.formDetails = value1;


                        }

                    });
                }
            });


        }, function myError(response) {
            alert(response)
        });
    }


    $scope.formToggle = function () {
        alert("into formtoggle");
        $('#editForm').hide();
        $('#userForm').show();


    }

    $scope.insertInfo = function () {
        var map = {};
        $("#userForm").find("input").each(function () {
            map[$(this).attr('name')] = $(this).val();

        })
        var stringfyJson = JSON.stringify(map);
        $http({
            method: "POST",
            url: "http://localhost:2224/postData",
            crossDomain: true,
            data: stringfyJson,


        }).then(function mySuccess(response) {
            alert("data");
            // if (response == true) {
            getInfo();
            // }


        }, function myError(response) {
        });
    }
    // edit user data


    $scope.currentUser = {};
    $scope.editInfo = function (info) {
        
        $scope.userId = info._id;
        $scope.currentUser = info;
        $('#userForm').hide();
        $('#editForm').show();
        $scope.name = info.name;
        $scope.email = info.email;
        $scope.password = info.password;
        $scope.mobile = info.mobile;

        $scope.file = info.file;

    }


    $scope.UpdateInfo = function (info) {
        var userId = $("#editForm").find("p").html();
        var map = {};
        $("#editForm").find("input").each(function () {
            map[$(this).attr('name')] = $(this).val();

        })
        map["userid"]=userId.trim();
        var stringfyJson = JSON.stringify(map);
        $http({
            method: "POST",
            url: "http://localhost:2224/updateInfo",
            crossDomain: true,
            data: stringfyJson,



        }).then(function mySuccess(response) {
            alert("data updated");
            getInfo();
        }, function myError(response) {
        });
    }

   

 $scope.deleteInfo = function (info) {
        


        $http({
            method: "DELETE",
            url: "http://localhost:2224/deleteInfo?data=" + info._id,
            // data: JSON.stringify(map),


        }).then(function mySuccess(response) {
            alert(response.success)
            // alert("data deleted");
            // if (response == true) {
            getInfo();
            // }


        }, function myError(response) {
            alert(response)
        });


    }


}]);
