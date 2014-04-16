app_pack.factory('Messages',function($http){
    return{
        sendMessage:function(wolfId,typeId,type,message){
            var hash =  '?type_id='+ typeId + '&wolf_id=' + wolfId +"&type=" + type + "&message="+message;
            return $http.get(url+'/messages/create/', {
              params:{
                type_id:typeId,
                wolf_id: wolfId,
                type: type,
                message: message
              }
            }).then(function(r){
                console.log('send message - ',r.data)
                return r.data
            })

        },
        getMessages:function(id,type){
            var hash = "?type_id=" + id + "&type=" + type
            return $http.get(url+'/messages/list/' + hash,{
              params: {
                type_id: id,
                type: type
              }
            }).then(function(r){
                console.log('get messages - ',r.data)
                return r.data
            })
        }
    }
})
