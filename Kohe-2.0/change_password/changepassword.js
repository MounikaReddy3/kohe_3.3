(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChangeController', ChangeController);

    ChangeController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function ChangeController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.change_password = change_password;

        function change_password() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Password changed successfully', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                        $location.path('/main');
                    }
                });
        }
    }

})();


