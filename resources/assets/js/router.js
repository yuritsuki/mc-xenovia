import VueRouter from 'vue-router'

const Dashboard = require('./views/dashboard/Index.vue');
const Control = require('./views/common/Control.vue');
const Users = require('./views/users/List.vue');
const User = require('./views/users/Item.vue');
const PermissionDenied = require('./views/system/PermissionDenied.vue');
const NotFound = require('./views/system/NotFound.vue');

const Login = require('./views/common/Login.vue');
const SelectAccount = require('./views/common/SelectAccount.vue');
const ResetPass = require('./views/common/ResetPass.vue');



export default new VueRouter({
    mode: 'history',
    base: __dirname,

    routes: [

        { name:'login', path: '/login', component: Login, meta: {title: 'Авторизация', forVisitors: true} },

        { name: 'select-account', path: '/select-account', component: SelectAccount, meta: {title: 'Выберите ученика', forAuth: true}},

        { name: 'reset-pass', path: '/reset-pass', component: ResetPass, meta: {title: 'Восстановление пароля'}},

        { path: '/', component: Dashboard, meta: {title: 'Показатели', forAuth: true} },
        { name: 'dashboard', path: '/dashboard', component: Dashboard, meta: {title: 'Показатели', forAuth: true} },

        { name: 'control', path: '/control', component: Control, meta: {title: 'Управление', forAuth: true} },
         { name: 'users', path: '/control/users', component: Users, meta: {title: 'Пользователи', forAuth: true} },
        { path: '/control/user/:id', name: 'user', component: User, props:true, meta: {title: 'Пользователь', forAuth: true} },

        { path: '/401', component: PermissionDenied},
        { path: '*', component: NotFound},


    ]

});
