'use strict';

/**
 AngularJS PhoneGap Push Notifications Service
 =============================================

 Copyright 2013 Anim Yeboah
 https://github.com/anim/angular-phonegap-push/

 Allows using the [PushPlugin](https://github.com/bobeast/PushPlugin) in
 [PhoneGap](http://phonegap.com/) apps built with AngularJS.

 Provides a service for registering the device for push notifications and
 getting callbacks when notifications are received.

 Example
 -------

 Register device:

 ```javascript
 new pgPushNotificationsFactory(
 '0123456789', // GCM Sender ID
 function registeredCallback (deviceToken, platform) {
      // Send `deviceToken` to your push server here
      // `platform` is either 'APNS' (iOS) or 'GCM' (Android)
    },
 function pushNotificationCallback (data, platform) {
       // Push message received
    }
 );
 ```

 Listen for push notifications:

 ```javascript
 $scope.$on('phonegapPush.notification', function (notification) {
    // Notification received:
    // `notification.data` raw notification data/payload
    // `notification.provider` either 'APNS' or 'GCM'
  });
 ```
 */

angular.module('phonegap', [])
    .factory('pgReady', function ($rootScope, $q) {
        var loadingDeferred = $q.defer();

        document.addEventListener('deviceready', function () {
            $rootScope.$apply(loadingDeferred.resolve);
        });

        return function phonegapReady() {
            return loadingDeferred.promise;
        };
//        EXAMPLE:
//        pgReady().then(function () {
            // Do something with closured onSuccess and onError
//        });
    })
    .factory('pgPush', function ($rootScope, $log) {

        var push = function (gcmSenderId, registeredCallback) {

            var pushNotification;

            /* Setup and register device */

            // Check if phonegap and plugins are loaded
            if (typeof(window.plugins) === 'undefined') {
                $log.error('PhoneGap plugins not found. Push notifications not initialized.');
                alert('PhoneGap plugins not found. Push notifications not initialized.');
                return false;
            }

            // Initialize push notifications
            pushNotification = window.plugins.pushNotification;
            if (typeof(pushNotification) === 'undefined') {
                $log.error('Push plugin not found. Push notifications not initialized.');
                alert('Push plugin not found. Push notifications not initialized.');
                return false;
            }

            var gcmSuccessHandler = function (result) {
                $log.info(
                    'Successfully registered with GCM push server. ' +
                        'Waiting for device registration ID via notification. ' +
                        'Registration result:', result
                );
            };

            var apnsSuccessHandler = function (deviceToken) {
                $log.info('Successfully registered with APNS push server. Device token:', deviceToken);
                registeredCallback(deviceToken, 'APNS');
            };

            var genericErrorHandler = function (error) {
                $log.error('Error registering with push server:', error);
                alert('Error registering with push server:'+ error);
            };

            // Register device with push server
            if (device.platform == 'android' || device.platform === 'Android') {
                pushNotification.register(
                    gcmSuccessHandler,
                    genericErrorHandler, {
                    'senderID': gcmSenderId,
                    'ecb': 'onNotificationGCM'
                });
            } else if (device.platform === 'iOS') {
                pushNotification.register(apnsSuccessHandler, genericErrorHandler, {
                    'badge': 'true',
                    'sound': 'true',
                    'alert': 'true',
                    'ecb': 'onNotificationAPN'
                });
            }

            /* Bind notification functions to window (called by phonegapPush plugin) */

            // iOS notification received
            window.onNotificationAPN = function (notification) {
                $log.info('APNS push notification received:', notification);
                $rootScope.$broadcast('phonegapPush.notification', {
                    data: notification,
                    provider: 'APNS'
                });
            };

            // Android notification received
            window.onNotificationGCM = function (notification) {
//                alert('notification '+ JSON.stringify(notification));
                switch (notification.event) {
                    case 'registered':
                        if (notification.regid.length > 0) {
                            $log.info('Got GCM device registration ID:', notification.regid);
//                            alert('Got GCM device registration ID:'+ notification.regid);
                            registeredCallback(notification.regid, 'GCM');
                        } else {
                            $log.error('Error registering with GCM push server: No device registration ID received.');
                        }
                        break;

                    case 'message':
                        $log.info('GCM push notification received (only payload forwarded):', notification);
                        $rootScope.$broadcast('phonegapPush.notification', {
                            data: notification.payload,
                            provider: 'GCM'
                        });
                        break;

                    case 'error':
                        $log.error('Error while receiving GCM push notification:', notification);
                        break;

                    default:
                        $log.error('Unknown GCM push notification received:', notification);
                        break;
                }
            };

            return true;
        };

        return push;
    });