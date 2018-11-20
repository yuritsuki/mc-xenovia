$(document).ready(function() {

	$('input.time').timepicker({
		'showDuration': true,
		'timeFormat': 'H:i',
		'minTime': '9:00am',
		'maxTime': '8:00pm',
		'showDuration': false,
	});
	
	$('.datepair').datepair();

	var dateLocales = {
		"format": "DD.MM.YY",
		"separator": " — ",
		"applyLabel": "Применить",
		"cancelLabel": "Отмена",
		"fromLabel": "С",
		"toLabel": "до",
		"customRangeLabel": "Свой диапазон",
		"weekLabel": "Нед",
		"daysOfWeek": [
			"Вс",
			"Пн",
			"Вт",
			"Ср",
			"Чт",
			"Сб",
			"Вс"
		],
		"monthNames": [
			"Январь",
			"Февраль",
			"Март",
			"Апрель",
			"Май",
			"Июнь",
			"Июль",
			"Август",
			"Сентябрь",
			"Октябрь",
			"Ноябрь",
			"Декабрь"
		],
		"firstDay": 1
	};

	moment().format('DD.MM.YY');

	$('.daterange').daterangepicker({
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
		"startDate": moment().startOf('month'),
		"endDate": moment(),
		"maxDate": moment(),
		 "cancelClass": "btn-secondary",
		"opens": "right",
		"autoApply": true,
		"locale": dateLocales,
	});

	$('.date').daterangepicker({
		"singleDatePicker": true,
		"locale": dateLocales,
	});
});