$(document).on('click', '', function(e){

})

$(document).on('change', '#convertFrom', function(e){
	if ($("#convertFrom").val() != ''){
		ui.displayPromoteAndConvert($("#convertFrom").val());
	}

})

$(document).on('click', '#convert', function(e){
	let from = $("#convertFrom").val();
	let to = $("#convertTo").val();
	if (from == '' && to == '' && from != to){
		return;
	}
	game.convert(from, to);
})

$(document).on('click', '.menu', function(e){
	$(".menu").prop('disabled', false);
	$("#menu-" + e.target.id.split('-')[1]).prop('disabled', true);
	$(".window").addClass('d-none');
	$("#" + e.target.id.split('-')[1]).removeClass('d-none');

})

$(document).on('click', 'button', function(e){
	let actionsNull = ['day'];
	let actionsParam = ['convertPromote', 'inc', 'dec', 'pop'];
	if (actionsParam.includes(e.currentTarget.id.split('-')[0])){
		game[e.currentTarget.id.split('-')[0]](e.currentTarget.id.split('-')[1]);
	} else if (actionsNull.includes(e.currentTarget.id)){
		game[e.currentTarget.id]();
	}
	
	ui.refresh()
})
