app_pack.controller('AppCtrl',function(
    $scope, $state,
    WolfActions,  UserService, UserActions,
    WolfService,PackService,pgContacts,
    pgReady, pgPush, SocketServer,ChatService,
    localStorageService )
{
  $scope.user = {};
  $scope.$on('user.update',function(e){
      console.log('user updated ', e);
      $scope.user = UserService.user;
  });

  //find login info and try to get user data

  console.log('app ready - ' , UserService.user );

  UserActions.checkin().then(function(r){
      console.log('checking in..', r);
      $scope.response = r.message;
      if(r.error){
          console.log('please log in..')
          $state.go('app');
      }else if(r.success){
          console.log('already logged in..', r.success) ;

          UserService.updateUser(r.success);

          $scope.authenicated();

          $state.go('user',{userId:UserService.user.user_id});


      }
  }) ;

//        localStorageService.add('x-CSRF-token',r.data._csrf_token);
//        localStorageService.add('session_id',r.data.session_id);
//        localStorageService.add('username',r.data.username);
//        localStorageService.add('id',r.data.user_id);



  $scope.logout = function(){
      WolfActions.logout(UserService.user)
          .then(function(r){
              console.log('ng user logged out', r) ;
              UserService.updateUser({});
              $state.go('app');
          });
  }
  $scope.login = function(){
      UserActions.login($scope.user).then(function(r){
          $scope.response = r.message;
          // $httpProvider.defaults.headers.comm  on['X-CSRF-Token'] = r.data.session_id
          console.log('login attempt - ',r)

          if(r.error){
              console.log('please log in..')
              $state.go('app');
          }else if(r.success){
              console.log('Now logged in..', r.success) ;

              UserService.updateUser(r.success);

              $scope.authenicated();

              $state.go('user',{userId:UserService.user.user_id});
          }

      });
  };

  $scope.authenicated = function(){
      $scope.registerDevice();

      WolfActions.getYourWolves(UserService.user.user_id)
          .then(function(r){
              console.log('wolves = ', r)  ;

              UserService.user['wolf'] = r;
              WolfService.update(r.related_wolves);
              PackService.update(r.related_packs);
          });
  }

  $scope.registerDevice = function(){
      pgReady().then(function () {

          pgContacts.findContacts();
          // Do something with closured onSuccess and onError
//            alert('angular-device ready!');
          pgPush('850174929671',function(obj,platform){
              alert('angular push - '+ obj)
              UserActions.addDevice(obj);
          })
      });
  }

  $scope.goHome = function(){
      $state.go('user',{userId:UserService.user.user_id});
  }

  /**
   *  SOCKET INTEGRATION
   */

  SocketServer.on('connect',function(r){
    console.log('socket-connecting');
    SocketServer.emit('connect', { user_id:1, nickname: 'testing' ,gps:{long:'70',lati:'80'}});
  })

  SocketServer.on('ready',function(r){
    console.log('socket-ready: ', r);
  })

  SocketServer.on('presence',function(r){
    console.log('socket-presence: ', r);
    ChatService.presence(r)
  });

  SocketServer.on('location',function(r){
    console.log('socket-location: ', r);
    ChatService.gotGps(r)
  });

  SocketServer.on('roomclients', function(r){
    console.log('room clients: ', r);
    ChatService.currRoom = r.room;
  });

  SocketServer.on('chatmessage', function(data){
    var nickname = data.client.nickname;
    var message = data.message;
    ChatService.gotMessage(data);
    console.log(data)
    //display the message in the chat window
    // insertMessage(nickname, message, true, false, false);
  });

  /**
   *  /END OF SOCKET INTEGRATION
   */
})
