<template>
    <div class="container">
        <div class="row vertical-center">
            <div class="col text-center" v-if="step == 1">
                <div class="h3">Восстановление пароля</div>

                <div class="card p-4 mx-auto mt-4" style="width: 300px;" v-on:keyup.enter="checkCredentials()">
                    <div class="form-group">
                        <input v-model="phone" class="form-control" type="text" v-mask="'# (###) ### ## ##'"  placeholder="8 (707) 465 48 12">
                    </div>
                    <div class="form-group">
                        <button
                                class="btn btn-block btn-primary"
                                @click="checkCredentials()"
                                :disabled="loading ? true : false"
                        >
                            <i v-show="loading" class="fa fa-spinner fa-spin"></i> Подтвердить
                        </button>
                    </div>
                    <div class="help-block" v-if="error">{{ error.message }}</div>
                </div>
            </div>
            <div class="col" v-if="step == 2">
                <div class="mx-auto text-center" style="width: 300px;">
                    <div class="h3">Выберите аккаунт</div>

                    <div class="mt-4"></div>

                    <div class="card p-4 mb-2" v-for="account in accounts" :key="account.id">
                        <a href="#" @click="setAccount(account)" class="card-full-link"></a>
                        <b>{{ account.role.description + ": " }}</b>{{ account.name }}
                    </div>

                    <button @click="step = 1" class="btn btn-block btn-danger mt-4">Отмена</button>
                </div>
            </div>
            <div class="col text-center" v-if="step == 3">
                <div class="h3">Восстановление пароля</div>

                <div class="card p-4 mx-auto mt-4" style="width: 300px;" v-on:keyup.enter="checkCode()">
                    <div class="form-group">
                        <div class="h1">
                            <span class="fa fa-lock"></span>
                        </div>
                        <div class="small">
                            На указанный номер телефона был отправлен четырехзначный код для восстановления.
                            Введите код, чтобы продолжить.
                        </div>
                    </div>
                    <div class="form-group">
                        <input v-model="code" class="form-control" type="text" placeholder="••••">
                    </div>
                    <div class="form-group">
                        <button
                                class="btn btn-block btn-primary"
                                @click="checkCode()"
                                :disabled="loading ? true : false"
                        >
                            <i v-show="loading" class="fa fa-spinner fa-spin"></i> Подтвердить
                        </button>
                        <button
                                class="btn btn-block btn-secondary"
                                @click="sendCode()"
                                :disabled="time != 60 && time != 0"
                        >
                            <span v-if="time != 60 && time != 0">Подождите {{ time }} сек.</span>
                            <span v-else>Отправить повторно</span>
                        </button>
                    </div>
                    <div class="help-block" v-if="error">{{ error.message }}</div>
                </div>
            </div>
            <div class="col text-center" v-if="step == 4">
                <div class="h3">Восстановление пароля</div>

                <div class="card p-4 mx-auto mt-4" style="width: 300px;" v-on:keyup.enter="resetPass()">
                    <div class="form-group">
                        <div class="h1">
                            <span class="fa fa-check text-success"></span>
                        </div>
                        <div class="small">
                            Укажите новый пароль.
                        </div>
                    </div>
                    <div class="form-group">
                        <input v-model="new_password" class="form-control" type="text" placeholder="••••••">
                        <input v-model="new_password_confirm" class="form-control" type="text" placeholder="••••••">
                    </div>
                    <div class="form-group">
                        <button
                                class="btn btn-block btn-primary"
                                @click="resetPass()"
                                :disabled="loading ? true : false"
                        >
                            <i v-show="loading" class="fa fa-spinner fa-spin"></i> Сохранить
                        </button>
                    </div>
                    <div class="help-block" v-if="error">{{ error.message }}</div>
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
                    code: '',
                    token: '',
                    step: 1,
                    new_password: '',
                    new_password_confirm: '',
                    timer: '',
                    time: 60
                }

            },

            methods: {

                setAccount(object) {
                    this.id = object.id;
                    this.$nextTick(function() {
                        this.sendCode();
                        this.step = 3;
                    });
                },
                sendCode() {
                    this.code = '';
                    let comp = this;
                    post(comp,'/api/public/send-reset-code/' + this.id, {}, function(response) {
                        comp.step = 3;
                        comp.token = response.data.token;
                        comp.start();
                    });
                },
                checkCode() {
                    let comp = this;
                    post(comp,'api/public/check-reset-code', {token: this.token, code: this.code}, function() {
                        comp.step = 4;
                    }, function() {
                        comp.error = {
                            message: 'Неверный код.'
                        };
                    });
                },
                checkCredentials() {
                    let component = this;
                    this.loading = true;
                    get(component,'/api/public/users',{params: { phone: this.phone }}, function(response) {
                        component.loading = false;
                        if(response.data.data.length === 1) {
                            component.error = '';
                            component.setAccount(response.data.data[0]);
                        } else if(response.data.data.length === 0) {
                            component.loading = false;
                            component.error = {
                                message: 'Нет пользователя с таким номером телефона.'
                            };
                        } else if(response.data.data.length > 1) {
                            component.error = '';
                            component.step = 2;
                            component.accounts = response.data.data;
                        }
                    }, function() {
                        component.loading = false;
                        component.error = {
                            message: 'Нет пользователя с таким номером телефона.'
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

                resetPass() {
                    let comp = this;
                    post(comp,'api/public/reset-pass/' + this.id, {password: this.new_password, password_confirmation: this.new_password_confirm}, function() {
                        comp.password = comp.new_password;
                        comp.$nextTick(function() {
                            comp.login();
                        });
                    }, function() {
                        comp.error = {
                            message: 'Пароль должен совпадать и состоять как минимум из 6 символов.'
                        };
                    });
                },
                start () {
                    this.timer = setInterval( () => {
                        if (this.time > 0) {
                            this.time--
                        } else {
                            clearInterval(this.timer);
                            this.time = 60;
                        }
                    }, 1000 );
                },

            }

    }

</script>