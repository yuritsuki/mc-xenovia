<template>

    <div v-if="user">

        <div class="col-12 col-md-10 offset-md-2 pr-5">
            <div class="mb-5 mt-1">
                <img :src="user.photo" class="rounded-circle float-left mr-2" style="margin-top: -5px; width: 40px;">
                <span class="h4">{{ user.name }}</span>
                <b-tooltip class="d-inline-block" triggers="hover" content="редактировать">
                    <button type="button" class="btn btn-secondary text-left btn-sm " @click="edit()" ><span class="fa fa-pencil"></span></button>
                </b-tooltip>
                <b-tooltip class="d-inline-block" triggers="hover" :content="user.in_archive ? 'восстановить из архива' : 'архивировать'">
                    <button v-if="$user.isAdmin()"
                            type="button"
                            class="btn btn-secondary text-left btn-sm"
                            @click="archive">
                        <span :class="{'fa fa-undo': user.in_archive, 'fa fa-archive': !user.in_archive}"></span>
                    </button>
                </b-tooltip>
                <b-tooltip class="d-inline-block" triggers="hover" content="удалить">
                    <button type="button" class="btn btn-danger text-left btn-sm" @click="$refs.modalDelete.show()"><span class="fa fa-trash"></span></button>
                </b-tooltip>
            </div>

            <div class="h5">Контактная информация</div>
            <table class="table table-sm table-responsive">
                <tbody>
                <tr>
                    <td><span class="h6">Телефон</span></td>
                    <td>{{ user.phone }}</td>
                </tr>
                <tr>
                    <td><span class="h6">Email</span></td>
                    <td>{{ user.email }}</td>
                </tr>
                <tr>
                    <td><span class="h6">Дата создания</span></td>
                    <td>{{ user.created_at }}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <user-form v-if="form" ref="editUser" :data="$common.data" :_form="form" v-on:formSending="getItem"></user-form>

        <b-modal ref="modalDelete" title="Подтвердите удаление">
            Вы действительно хотите удалить пользователя? Данное действие нельзя отменить.
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="$refs.modalDelete.hide()">Отменить</button>
                <button type="button" class="btn btn-danger" @click="remove()">Удалить</button>
            </div>
        </b-modal>


    </div>

</template>

<script>

    import { del, get } from '../../helpers/api'

    export default {

        props: ['id','user_id'],

        data() {

            return {
                errors: [],
                user: '',
                form: '',
            }

        },

        components: {
            'user-form': require('./Form.vue'),
        },

        methods: {
            remove() {

                let _this = this;

                del(_this, '/api/user-delete/' + this.id, {}, function () {
                    _this.$router.push('/control/users');
                });

            },
            edit() {
                this.form = JSON.parse(JSON.stringify(this.user));

                this.$nextTick(function () {
                    this.$refs.editUser.showModal();
                });

            },
            getItem() {

                let _this = this;

                get(_this, '/api/user/' + this.id, {}, function (response) {
                    _this.user = response.data;
                });
            },
            archive() {

                let _this = this;
                get(_this, '/api/user-archive/' + this.id, {  }, function () {
                    _this.getItem();
                },function (error) {
                    _this.formSending = false;
                    _this.errors = error.response.data;
                });


            },

        },

        created() {

            this.getItem();

        }

    }


</script>