<template>

    <div class="container">
        <div class="row vertical-center">
            <div class="col">
                <div class="mx-auto text-center" style="width: 300px;">
                    <div class="h3">Выберите аккаунт</div>

                    <div class="mt-4"></div>

                    <div class="card p-4 mb-2" v-for="(account, index) in $root.accounts">
                        <a href="#" @click="setAccount(account, index)" class="card-full-link"></a>
                        {{ account.name }}
                    </div>

                    <button @click="logout" class="btn btn-block btn-danger mt-4">Выйти</button>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    export default {


        methods: {

            setAccount(account, index) {

                this.$auth.setAccountId(index);
                this.$root.setAccount(account, true);

            },
            logout() {

                this.$auth.destroyToken();

                this.$router.push({name: 'login'});


            }

        }



    }

</script>