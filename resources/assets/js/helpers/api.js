import axios from 'axios'

export function post(_this, url, payload, successCallback, errorCallback) {


    _this.$bar.start();


    let headers = _this.$auth.getToken() ? {'Authorization': `Bearer ${_this.$auth.getToken()}`} : '';

    return axios({
        method: 'POST',
        url: url,
        data: payload,
        headers: headers
    }).then(response => {

        _this.$bar.finish();
    successCallback( response );

}).catch(error => {

        if(!error.status)
    console.log('network error');

    console.log(error.response);

    _this.$bar.finish();
    if(errorCallback)
        errorCallback( error );

});
}

export function get(_this, url, payload, successCallback, errorCallback) {

    _this.$bar.start();

    let headers = _this.$auth.getToken() ? {'Authorization': `Bearer ${_this.$auth.getToken()}`} : '';

    return axios({
        method: 'GET',
        url: url,
        params: payload.params,
        headers: headers
    }).then(response => {

        _this.$bar.finish();
    successCallback( response );

}).catch(error => {

        _this.$bar.finish();
    if(errorCallback)
        errorCallback( error );

});


}


export function del(_this, url, payload, successCallback, errorCallback) {

    _this.$bar.start();

    let headers = _this.$auth.getToken() ? {'Authorization': `Bearer ${_this.$auth.getToken()}`} : '';

    return axios({
        method: 'DELETE',
        url: url,
        headers: headers
    }).then(response => {

        _this.$bar.finish();
    successCallback( response );

}).catch(error => {

        _this.$bar.finish();
    if(errorCallback)
        errorCallback( error );

});


}