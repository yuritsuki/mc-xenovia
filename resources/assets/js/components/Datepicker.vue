<template>
    <input type="text" :value="value" class="time end form-control" :class="{'form-control-sm': small }" :disabled="!active" >
</template>


<script>

    export default {

        props: ['value', 'active', 'onChange','small','empty'],


        mounted() {

            let component = this;


            $(this.$el).daterangepicker({
                autoUpdateInput: !component.empty,
                "singleDatePicker": true,
                "locale": component.$dateLocales,
            }).change(function ($event) {
                component.$emit('input', $($event.target).val());
                if(component.onChange)
                    component.onChange($($event.target).val());
            });

            setTimeout(function () {
                component.$emit('input', $(component.$el).val());
            }, 500);
        }
    }

</script>