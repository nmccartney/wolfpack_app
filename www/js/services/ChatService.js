app_pack.service('ChatService',[ 'SocketServer', '$rootScope', function(SocketServer,$rootScope){
  var service = {
    socket:null,
    currRoom:null,
    connect:function(){

    },
    disconnect:function(){

    },
    sendGps:function(){
      SocketServer.emit('updateGps', { user_id:1, nickname: 'testing' ,gps:{long:'70',lati:'80'}});
    },
    gotGps:function(){
      $rootScope.$broadcast( 'gps.update' );
    },
    subscribe:function(room){
      SocketServer.emit('subscribe', { room: room });
    } ,
    unsubscribe:function(){
      SocketServer.emit('unsubscribe', { room: service.currRoom });
    },
    gotMessage:function(data){
      $rootScope.$broadcast( 'message.update',data );
    },
    sendMessage:function(data){

    },
    presence:function(data){
      $rootScope.$broadcast( 'presence.update' ,data);
    }
  }
  return service;
}]);
