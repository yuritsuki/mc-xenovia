$(document).ready(function() {

	$('input[type=file]').bootstrapFileInput();
	
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"][data-content]').popover({'html' : true});

	$("select").chosen({
		no_results_text: 'Ничего не найдено',
		placeholder_text_multiple: 'Выберите варианты',
		placeholder_text_single: 'Выберите вариант',
		search_contains: true,
		inherit_select_classes: true,
		allow_single_deselect: true,
		width: "100%",
	});

	$('#markGroup').modalSteps({
		btnCancelHtml: 'Отмена',
		btnPreviousHtml: 'Назад',
		btnNextHtml: 'Дальше',
		btnLastStepHtml: 'Сохранить'
	});

	$("html").niceScroll({
		mousescrollspeed: 80,
		cursorwidth: 7,
		cursoropacitymax: .8,
		cursoropacitymin: .3,
	});

	$('.studentsTimeDay').change(function() {
		if($(this).is(':checked')) {
			$(this).closest('tr').find('.time').prop("disabled", false);
		} else {
			$(this).closest('tr').find('.time').prop("disabled", true).val('');
		}	
	});
});