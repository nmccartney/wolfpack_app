app_pack.service('ChatService',[ 'SocketServer', '$rootScope', function(SocketServer,$rootScope){
  var service = {
    socket:null,
    currRoom:null,
    connect:function(){

    },
    disconnect:function(){

    },
    updateUserGps:function(){
      SocketServer.emit('updateGps', { user_id:1, nickname: 'testing' ,gps:{long:'70',lati:'80'}});
    },
    subscribe:function(room){
      SocketServer.emit('subscribe', { room: room });
    } ,
    unsubscribe:function(){
      SocketServer.emit('unsubscribe', { room: service.currRoom });
    }

  }
  return service;
}]);
