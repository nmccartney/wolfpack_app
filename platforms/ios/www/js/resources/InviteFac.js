app_pack.factory('Invites', function  ($resource) {
    return $resource(url+'/invites.json', {
//            id: "@id"
    }, {
        update: {
            method: "PUT"
        },
        remove:{
            method: "DELETE"
        }
    });
});

app_pack.factory('InviteActions',function($http){
    return {
        createInvite:function(invite){
            return $http.get(url+'/invites/create/' ,{
                    params:{
                          id:invite.id,
                          invitor_id:invite.invitor_id,
                          type:invite.type
                        }
                    })
                .then(function(result){
                    return result.data
                })
        },
        accept: function(invite){
            return $http.get(url+'/invites/confirm/',{params:invite})
                .then(function(result){
                    return result.data
                })
        } ,
        decline: function(invite){
            return $http.get(url+'/invites/destroy/'+invite.id)
                .then(function(result){
                    return result.data
                })
        }
    }
})