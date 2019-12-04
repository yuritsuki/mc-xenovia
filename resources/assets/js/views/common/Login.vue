<template>
    <div class="container">
        <div class="row vertical-center">
            <div class="col text-center" v-show="!select">
                <div class="h3">Войдите в систему</div>

                <div class="card p-4 mx-auto mt-4" style="width: 300px;" v-on:keyup.enter="checkCredentials()">
                    <div class="form-group">
                        <input v-model="phone" class="form-control" type="text" v-mask="'# (###) ### ## ##'"  placeholder="8 (707) 465 48 12">
                    </div>
                    <div class="form-group">
                        <input class="form-control" v-model="password" type="password" placeholder="••••••">
                    </div>
                    <div class="form-group">
                        <button
                                class="btn btn-block btn-primary"
                                @click="checkCredentials()"
                                :disabled="loading ? true : false"
                        >
                            <i v-show="loading" class="fa fa-spinner fa-spin"></i> Войти
                        </button>
                    </div>
                    <router-link :to="{ name: 'reset-pass' }" class="text-muted">Забыли пароль?</router-link>
                    <div class="help-block" v-if="error">{{ error.message }}</div>
                </div>
            </div>
            <div class="col" v-show="select">
                <div class="mx-auto text-center" style="width: 300px;">
                    <div class="h3">Выберите аккаунт</div>

                    <div class="mt-4"></div>

                    <div class="card p-4 mb-2" v-for="account in accounts" :key="account.id">
                        <a href="#" @click="setAccount(account)" class="card-full-link"></a>
                        <b>{{ account.role.description + ": " }}</b>{{ account.name }}
                    </div>

                    <button @click="select = false" class="btn btn-block btn-danger mt-4">Отмена</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

    import { post, get } from '../../helpers/api'


    export default {

            data() {

                return {
                    loading: false,
                    phone: '',
                    password: '',
                    error : '',
                    id: '',
                    select: false,
                    accounts: [],
                }

            },

            methods: {

                setAccount(object) {
                    this.id = object.id;
                    this.$nextTick(function() {
                        this.login();
                    });
                },

                checkCredentials() {
                    let component = this;
                    this.loading = true;
                    get(component,'/api/public/users',{params: { phone: this.phone }}, function(response) {
                        component.loading = false;
                        if(response.data.data.length === 1) {
                            component.error = '';
                            component.id = response.data.data[0].id;
                            component.login();
                        } else if(response.data.data.length === 0) {
                            component.loading = false;
                            component.error = {
                                message: 'Имя пользователя и пароль не совпадают.'
                            };
                        } else if(response.data.data.length > 1) {
                            component.error = '';
                            component.select = true;
                            component.accounts = response.data.data;
                        }
                    }, function() {
                        component.loading = false;
                        component.error = {
                            message: 'Имя пользователя и пароль не совпадают.'
                        };
                    });
                },

                login() {

                    let component = this;



                    let secret = document.head.querySelector('meta[name="client-secret"]');

                    let data = {
                        client_id: 2,
                        client_secret: secret.content,
                        grant_type: 'password',
                        username: {
                            id: this.id,
                            name: this.phone
                        },
                        password: this.password
                    };

                    this.loading = true;

                    post(this, '/oauth/token', data, function (response) {

                        component.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now());

                        component.loading = false;
                        component.error = '';

                        component.$common.getData();

                        component.$root.userInit(true);


                    }, function () {
                        component.select = false;
                        component.loading = false;
                        component.error = {
                            message: 'Имя пользователя и пароль не совпадают.'
                        };

                    });

                },

                resetpass() {

                }

            }

    }

</script>
