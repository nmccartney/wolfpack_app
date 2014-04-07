app_pack.factory('socket',function(socketFactory){
    return socketFactory({
        prefix: '',
        ioSocket: io.connect('http://wolfpack.io:3700')
      })
});