<template>

    <div v-if="form">
        <b-modal v-if="data" ref="modal" size="lg" :title="title">

            <div  v-bind:class="{ 'has-error': errors && errors.role_id }" class="form-group row">
                <label class="col-3 col-form-label">Роль</label>
                <div class="col-9">
                    <v-select :on-change="selectRole" label="description" value="id" :value.sync="form.role" :options="roles" placeholder="Выберите роль"></v-select>
                    <form-error v-if="errors && errors.role_id" :errors="errors">
                        {{ errors.role_id[0] }}
                    </form-error>
                </div>
            </div>

            <div v-bind:class="{ 'has-error': errors && errors.photo }" class="form-group row">
                <label class="col-3 col-form-label">Фото</label>
                <div class="col-9">
                    <user-photo :user="form" :accept="'image/jpeg,image/png,image/gif'"></user-photo>
                    <form-error v-if="errors && errors.photo" :errors="errors">
                        {{ errors.photo[0] }}
                    </form-error>
                </div>
            </div>

            <div v-bind:class="{ 'has-error': errors && errors.name }" class="form-group row">
                <label class="col-3 col-form-label">ФИО</label>
                <div class="col-9">
                    <input v-model="form.name" class="form-control" type="text" placeholder="ФИО">
                    <form-error v-if="errors && errors.name" :errors="errors">
                        {{ errors.name[0] }}
                    </form-error>
                </div>
            </div>

            <div v-bind:class="{ 'has-error': errors && errors.phone }" class="form-group row">
                <label class="col-3 col-form-label">Телефон</label>
                <div class="col-9">
                    <masked-input v-model="form.phone" class="form-control" mask="1 (111) 111 11 11" placeholder="8 (707) 465 48 12"/>
                    <form-error v-if="errors && errors.phone" :errors="errors">
                        {{ errors.phone[0] }}
                    </form-error>
                </div>
            </div>

            <div v-bind:class="{ 'has-error': errors && errors.email }" class="form-group row">
                <label class="col-3 col-form-label">Email</label>
                <div class="col-9">
                    <input v-model="form.email" class="form-control" type="text" placeholder="email">
                    <form-error v-if="errors && errors.email" :errors="errors">
                        {{ errors.email[0] }}
                    </form-error>
                </div>
            </div>

            <div v-bind:class="{ 'has-error': errors && errors.password }" class="form-group row">
                <label class="col-3 col-form-label">Пароль</label>
                <div class="col-9">
                    <input v-model="form.password" class="form-control" type="text" placeholder="Пароль">
                    <form-error v-if="errors && errors.password" :errors="errors">
                        {{ errors.password[0] }}
                    </form-error>
                </div>
            </div>

            <div v-bind:class="{ 'has-error': errors && errors.password_confirmation }" class="form-group row">
                <label class="col-3 col-form-label">Пароль еще раз</label>
                <div class="col-9">
                    <input v-model="form.password_confirmation" class="form-control" type="text" placeholder="Пароль">
                    <form-error v-if="errors && errors.password_confirmation" :errors="errors">
                        {{ errors.password_confirmation[0] }}
                    </form-error>
                </div>
            </div>
            <div class="row" v-if="!form.id"><div class="col-3"></div>
                <div class="col-9">
                    <button
                        type="button"
                        class="btn"
                        @click="randpass"
                        :disabled="formSending? true : false"
                >Генерировать пароль</button>
                </div>
            </div>


            <div slot="modal-footer">
                <button
                        type="button"
                        class="btn btn-primary"
                        @click="sendForm"
                        :disabled="(formSending? true : false)"
                >
                    <i v-show="formSending" class="fa fa-spinner fa-spin"></i> {{ form.id ? 'Сохранить' : 'Добавить' }}
                </button>
            </div>

        </b-modal>
    </div>


</template>



<script>

    import { post } from '../../helpers/api'

    export default {

        props: ['data', '_form'],

        data() {
            return {
                errors: [],
                formSending: false,
                form: '',
                title: ''
            }
        },
        computed: {
            roles() {
                var arr=[];
                if(this.$common.data) {
                    this.$common.data.roles.forEach(function(role) {
                        arr.push(role);
                    });
                }
                return arr;
            }
        },
        created() {
            this.form = this._form ? this._form : this.newUser();
        },
        mounted() {
            this.title = this.form.id ? 'Редактировать пользователя' : 'Добавить пользователя';
        },
        components: {
            FormError : require('./../../components/FormError.vue'),
            UserPhoto : require('./../../components/UserPhoto.vue'),
        },
        methods: {
            sendForm() {
                this.formSending = true;

                let _this = this;


                post(_this, '/api/user-save', this.form, function () {

                    _this.formSending = false;
                    _this.errors = '';
                    _this.hideModal();
                    _this.form = _this.form.id ? _this.form : _this.newUser();
                    _this.$emit('formSending');


                }, function (error) {

                    _this.formSending = false;
                    _this.errors = error.response.data;

                });


            },
            showModal() {
                this.$refs.modal.show();
            },
            hideModal() {
                this.$refs.modal.hide();
            },
            selectRole(val) {
                if (val)
                    this.form.role_id = val.id;
                this.form.role = val;
            },

            newUser() {

                return {

                    id: '',
                    photo: '',
                    name: '',
                    phone: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    role_id: '',
                    role: ''

                }

            },

            randpass() {
                var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
                var pass = "";
                for (var x = 0; x < 8; x++) {
                    var i = Math.floor(Math.random() * chars.length);
                    pass += chars.charAt(i);
                }
                this.form.password=pass;
                this.form.password_confirmation=pass;
            }

        }



    }
</script>