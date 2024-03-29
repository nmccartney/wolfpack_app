var local = "http://127.0.0.1:3000"
var remote = "http://wolfpack.io"
 var url = remote;
app_pack.factory('Wolves', function($resource){
    return $resource('/wolves/list', {
//            id: "@id"
    }, {
        update: {
            method: "PUT"
        },
        remove:{
            method: "DELETE"
        }
    });
})

app_pack.factory('Wolf', function  ($resource) {
    return $resource('/wolves', {
//            id: "@id"
    }, {
        update: {
            method: "PUT"
        },
        remove:{
            method: "DELETE"
        }
    });
})

app_pack.factory('WolfActions',function($http){
    return {
        getYourWolves: function(id){
//            console.log('get your wolf - ' + id)
            return $http.get(url + '/wolves/view/'+id+'.json')
                .then(function(result){
                    return result.data
                });
        },
        getWolf:function(w){
            console.log('get wolf - ' , w)
            return $http.get(url + '/wolves/view/' + w.id + '.json')
                .then(function(r){
                    console.log(r)
                    return r.data
                });
        },
        removeWolf:function(id){
            return $http.get(url + '/wolves/remove/' + id)
                .then(function(r){
                    return r.data
                })
        },
        login:function(user){
            console.log(user)
            if(!user)return;
            return $http.get(url + '/login/attempt_login.json',{
                params:{
                    username: user.username,
                    password: user.password
                }
            }).then(function(r){
                console.log('login : ', r)
                return r;
            })
        },
        logout:function(user){
            console.log('logout : ',user)
            return $http.get(url + '/login/logout.json',{
                params:{
                    username: user.username,
                    password: user.password
                }
            }).then(function(r){
                console.log('logged out : ', r);
                return r;
            })
        }
    }
})


