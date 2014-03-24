app_pack.factory('UserActions',function($http){
    return {
        setGps:function(gps){
            return $http.get(url + '/wolves/set_gps',{params:{gps:gps}})
                .then(function(r){
                    console.log('gps saved : ', r.data)
                    return r.data;
                })
        },
        setSettings:function(settings){
            return $http.get(url + '/wolves/set_settings',settings)
                .then(function(r){
                    console.log('gps saved : ', r)
                    return r.data;
                })
        },
        addDevice:function(device){
            return $http.get(url + '/wolves/add_device',{params:{device:gps}})
                .then(function(r){
                    console.log('gps saved : ', r)
                    return r.data;
                })
        },
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