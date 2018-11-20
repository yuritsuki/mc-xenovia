<template>
    <input type="text" class="daterange form-control form-control-sm">
</template>


<script>
    import moment from 'moment'

    export default {

        props: ['value', 'active'],


        mounted() {

            let component = this;

            $(this.$el).daterangepicker({
                "ranges": {
                    "Сегодня": [moment(), moment()],
                    "Вчера": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    "Последние 7 дней": [moment().subtract(6, 'days'), moment()],
                    "Последние 30 дней": [moment().subtract(29, 'days'), moment()],
                    "Этот месяц": [moment().startOf('month'), moment().endOf('month')],
                    "Прошлый месяц": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    "Этот год": [moment().startOf('year'), moment()]
                },
                "showCustomRangeLabel": false,
                "alwaysShowCalendars": true,
                "minDate": "11/10/17",
                "maxDate": moment(),
                "startDate": moment().startOf('month'),
                "endDate": moment(),
                "cancelClass": "btn-secondary",
                "opens": "right",
                "autoApply": true,
                "locale": component.$dateLocales,
            }).change(function ($event) {
                component.$emit('input', $($event.target).val());
            });

            setTimeout(function () {
                component.$emit('input', $(component.$el).val());
            }, 500);
        }
    }
</script>