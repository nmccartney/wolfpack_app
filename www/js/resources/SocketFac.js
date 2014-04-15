app_pack.factory('SocketServer',function(socketFactory){
    return socketFactory({
        prefix: '',
        ioSocket: io.connect('http://localhost:3700')
      })
});
