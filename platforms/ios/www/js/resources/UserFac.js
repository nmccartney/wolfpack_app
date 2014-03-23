app_pack.factory('UserActions',function($http){
    return {
        checkin:function(){
            return $http.get(url + '/login/index.json')
                .then(function(result){
                    return result.data
                });
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
                return r.data;
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
            });
        }
    }
})