/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var pushNotification;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert('ready!');
//        angular.element(document).ready(function() {
//         angular.bootstrap(document);
//        });


        pushNotification = window.plugins.pushNotification;
        alert(JSON.stringify(window.plugins))

        pushNotification.unregister(function(e){
            alert('unreg ', e)
//            pushRegister();
        }, errorHandler);

        pushRegister();
    }
};

function pushRegister(){
    if ( device.platform == 'android' || device.platform == 'Android' )
    {
        pushNotification.register(
            successHandler,
            errorHandler, {
                "senderID":"850174929671",
                "ecb":"onNotificationGCM"
            });
    }
    else
    {
        pushNotification.register(
            tokenHandler,
            errorHandler, {
                "badge":"true",
                "sound":"true",
                "alert":"true",
                "ecb":"onNotificationAPN"
            });
    }
}
function successHandler (result) {
    alert('reg result = ' + result);
}

function errorHandler (error) {
    alert('reg error = ' + error);
}

function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    alert('device token = ' + result);
}

// Android
function onNotificationGCM(e) {
//    $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
    alert('notification '+ JSON.stringify(e));

    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
//                $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                alert("regID = " + e.regid);
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if ( e.foreground )
            {
//                $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                // if the notification contains a soundname, play it.
                var my_media = new Media("/android_asset/www/"+e.soundname);
                my_media.play();
            }
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
                if ( e.coldstart )
                {
//                    $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                }
                else
                {
//                    $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                }
            }

//            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
//            $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            break;

        case 'error':
             alert('notification error: ', e.msg)
//            $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

        default:
            alert('notification unknown error: ', e)
//            $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}