app.factory('Messages',function($http){
    return{
        sendMessage:function(wolfId,typeId,type,message){
            var hash =  '?type_id='+ typeId + '&wolf_id=' + wolfId +"&type=" + type + "&message="+message;
            return $http.get('/messages/create/'+hash)
                .then(function(r){
                    return r.data
                })

//                 return $http.get('/messages/create/',{
//                     params:{
//                         type_id: typeId,
//                         wolf_id: wolfId,
//                         type: type,
//                         message: message
//                     }
//                 })
        },
        getMessages:function(id,type){
            var hash = "?type_id=" + id + "&type=" + type
            return $http.get('/messages/list/' + hash)
                .then(function(r){
                    console.log(r.data)
                    return r.data
                })
        }
    }
})