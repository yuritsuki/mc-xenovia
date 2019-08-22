<template>

    <input type="file" :id="id" data-filename-placement="inside" v-on:change="onFileChange" :accept="accept">

</template>


<script>

    export default {

        props: ['user', 'accept', 'id'],

        methods: {

            onFileChange(e) {

                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;

                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.user.photo = e.target.result;
                    vm.$nextTick(function() {
                        vm.$emit('uploaded');
                    });
                };
                reader.readAsDataURL(file);
            },

        },

        created() {

            let component = this;

            setTimeout(function () {
                // eslint-disable-next-line
                $(component.$el).bootstrapFileInput();
            }, 300);

        }


    }

    

</script>