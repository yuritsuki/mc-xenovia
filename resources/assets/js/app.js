
require('./bootstrap');


import VueRouter from 'vue-router';
import router from './router';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import ProgressBar from './components/ProgressBar.vue';

import Common from './components/Common.vue';
import vSelect from 'vue-select';
import VTooltip from 'v-tooltip';
import MaskedInput from 'vue-masked-input'
import Chartkick from 'chartkick';
import VueChartkick from 'vue-chartkick';
import Auth from './packages/auth/auth';
import User from './packages/user';
import { VueMaskDirective } from 'v-mask';

const dateLocales = Vue.prototype.$dateLocales = {
    "format": "DD.MM.YY",
    "separator": " — ",
    "applyLabel": "Применить",
    "cancelLabel": "Отмена",
    "fromLabel": "С",
    "toLabel": "до",
    "customRangeLabel": "Свой диапазон",
    "weekLabel": "Нед",
    "daysOfWeek": [
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",

    ],
    "monthNames": [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ],
    "firstDay": 1
};




window.Vue = require('vue');

Vue.component('v-select', vSelect);
Vue.component('masked-input', MaskedInput);

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Auth);
Vue.use(User);
Vue.use(VTooltip);
Vue.directive('mask', VueMaskDirective);



// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount();
// global data
const common = Vue.prototype.$common = new Vue(Common).$mount();
document.body.appendChild(bar.$el);
document.body.appendChild(common.$el);

router.beforeEach((to, from, next) => {

    document.title = to.meta.title + ' - Rocket platform';

    if (to.meta.forAuth){
        if(Vue.auth.isAuthenticated()) {
            next();
        }else{
            next({
                path: '/login'
            });
        }
    }else if (to.meta.forVisitors) {
        if(Vue.auth.isAuthenticated()) {
            next({
                path: '/'
            })
        }else{
            next();
        }

    }

    next();

});


import { get } from './helpers/api'

const app = new Vue({

    router,

    props: ['clientSecret'],

    data() {
        return {
            accounts: '',
            user: '',
            userReady: false
        };

    },

    components : {
        'sidebar': require('./components/Sidebar.vue')
    },
    methods: {

        userInit(afterLogin = false) {

            let _this = this;

            if (_this.$auth.isAuthenticated()){

                get(_this, '/api/user', {}, function (response) {

                    _this.accounts = response.data;

                    if(response.data.length > 1 && _this.$auth.getAccountId() == null){

                        _this.$router.push({ name: 'select-account' });

                        return false;

                    } else {
                        let accountId = _this.$auth.getAccountId() ? _this.$auth.getAccountId() : 0;
                        _this.setAccount(response.data[accountId], afterLogin);
                    }

                }, function () {

                });
            }

        },

        setAccount(account, afterLogin) {

            this.$user.data = account;
            this.user = this.$user;
            this.userReady = this.ready = true;

            if(afterLogin){
                this.afterLogin(this.user);
            }

        },

        afterLogin(user) {

            this.$router.push('/dashboard')

        }

    },

    mounted() {

        this.userInit();


    }

}).$mount('#app');


