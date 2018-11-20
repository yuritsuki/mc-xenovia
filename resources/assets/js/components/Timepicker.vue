<template>
    <input type="text" :value="value" class="time end form-control" :disabled="!active">
</template>


<script>

    export default {

        props: ['value', 'active'],


        mounted() {

            let component = this;

            $(this.$el).timepicker({
                'showDuration': true,
                'timeFormat': 'H:i',
                'minTime': '9:00am',
                'maxTime': '10:00pm',
                'showDuration': false,
            }).change(function ($event) {
                component.$emit('input', $($event.target).val());
            })

        }
    }

</script>