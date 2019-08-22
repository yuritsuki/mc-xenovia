<template>
    <div></div>
</template>

<script>

    import { get } from '../helpers/api';

    export default  {

        data() {

            return {
                data: []
            }

        },

        methods: {
            getData() {

                let component = this;

                get(component, '/api/main/data', {}, function (response) {
                    component.data = response.data;
                });
            },
            loadPlugins() {


            },

            existIdInArray(id, array) {

                let exist = false;

                array.forEach(function (value) {
                    if (value.id === id) exist = true;
                });

                return exist;

            },
            getProgressClass(value) {

                return {
                    'bg-danger': value<20,
                    'bg-warning': value>20 && value<40,
                    'bg-info': value>40 && value<70,
                    'bg-success': value>70
                };
            },
            getTextClass(value) {

                return {
                    'text-danger': value<20,
                    'text-warning': value>20 && value<40,
                    'text-info': value>40 && value<70,
                    'text-success': value>70
                };
            },

        },

        created() {

            if (this.$auth.isAuthenticated()){
                this.getData();
            }

            this.loadPlugins();

        }





    }

</script>

<style>

</style>