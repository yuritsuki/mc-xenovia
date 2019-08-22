<template>

    <div class="sidebar container-fluid mt-4">
        <div class="row">
            <div
                    ref="sidebar"
                    class="d-none d-xs-none d-md-block col-6 col-sm-3 col-md-2 bg-faded fixed-top h-100 pt-4 text-white bg-inverse small" style="z-index:3006"
                    :style="{'display': forceShow ? 'block!important' : 'inherit' }"
            >
                <div @click="forceShow = false" class="d-md-none h4 p-2" style="
                        text-align: end;position: absolute;width: 100%;left: 2rem;top: 0px;background: #292b2c!important;z-index: -1;background-blend-mode: lighten;
                    ">
                    <span class="text-white fa fa-times"></span>
                </div>
                <div class="clearfix">
                    <div class="pull-left mr-2">
                        <div
                                :style="{
                                    'background-image': 'url(' + $root.user.getPhotoThumb() + ')',
                                    'background-size': 'cover',
                                    'width': '36px',
                                    'height': '36px',
                                    'display': 'block',
                                    'border-radius': '18px',
                                    '-webkit-border-radius': '18px',
                                    '-moz-border-radius': '18px'
                                }"

                        >
                        </div>
                    </div>
                    <div class="pull-left">
                        {{ $root.user.getName() }}
                        <div class="small text-muted">
                            {{ $root.user.getRoleDescription() }}
                        </div>
                    </div>
                </div>

                <hr>

                <ul>
                    <li class="mb-2"><router-link to="/dashboard" :class="{'text-muted': dashboard.indexOf($route.name) < 0,'text-white': dashboard.indexOf($route.name) > -1 }"><span class="fa fa-fw fa-signal mr-2"></span> Показатели</router-link></li>
                    <li class="mb-2" ><router-link to="/control" :class="{'text-muted': control.indexOf($route.name) < 0,'text-white': control.indexOf($route.name) > -1 }" ><span class="fa fa-fw fa-wrench mr-2"></span> Управление</router-link></li>
                </ul>
                <hr>
                <ul>
                    <li class="mb-2"><a @click="$refs.profile.showModal()" style="cursor: pointer;" class="text-muted" ><span class="fa fa-fw fa-cog  mr-2"></span> Мои настройки</a></li>
                    <li class="mb-2"><div class="sidebar-logout"><button class="text-muted pl-0"  @click="logout"><span class="fa fa-fw fa-sign-out  mr-2"></span> Выход</button></div></li>
                </ul>

            </div>
        </div>
        <profile ref="profile" :_form="$root.user.data"></profile>
        <div
                style="position: fixed;left:0; top: 0; z-index: 3005;cursor:pointer;"
                class="d-md-none h4 p-2 bg-inverse text-white"
                @click="forceShow = true"
        ><span class="fa fa-reorder"></span></div>
    </div>

</template>


<script>

    export default {

        data() {
            return {
                dashboard: [
                    'dashboard',
                ],
                control: [
                    'control',
                    'users',
                    'user',
                ],
                forceShow: false,
            }
        },
        components: {
            Profile : require('./Profile.vue'),
        },
        watch: {
            '$route.path'() {
                this.forceShow = false;
            }
        },
        methods: {

            logout() {


                if(this.$root.accounts.length > 1){

                    this.$router.push({name: 'select-account'});

                }else{
                    this.$auth.destroyToken();

                    this.$router.push({name: 'login'});

                }

                this.$root.user = '';



            }
        }


    }

</script>