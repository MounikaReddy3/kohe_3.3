(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResetController', ResetController);

    ResetController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function ResetController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.reset_password = reset_password;

        function reset_password() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Reset Password successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();

