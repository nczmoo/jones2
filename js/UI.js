class UI{
	changes = new UIChange();
	work = new UIWorkTemplate();
	constructor(){}
	refresh(){				
		this.work.display();		
		$("#day").prop('disabled', true);
		$("#money").html("$" + game.config.money.toLocaleString());
		$("#raise").html("$" + Math.round(game.config.wage).toLocaleString() + " -> $" 
			+ Math.round(game.config.wage * (1 + game.config.promoteRaise)).toLocaleString() 
			+ " (" + Math.round(game.config.promoteRaise * 100) + "%)");
		$("#weekday").html(game.config.days[(game.config.day % 5)]);
		$("#workRep").html((game.config.workRep / game.config.maxWorkRep * 100) + "%");
		$("#workRepBar").css('width', (game.config.workRep / game.config.maxWorkRep * 100) + "%");				
		if (game.config.unassignedHours < 1){
			$("#day").prop('disabled', false);
		}
		let fillables = ['reqHours', 'unassignedHours'];
		for (let fillable of fillables){			
			$("#" + fillable).html(game.config[fillable]);
		}				
		this.displayPromoteAndConvert(null);
		this.changes.do();
	}
	
	
	displayPromoteAndConvert(exclude){	
		let promoteConvert = '';			
		let convertFrom = "<option></option>", convertingFrom = [];
		let convertTo = "<option></option>", convertingTo = [];	
		if (exclude != null){
			convertingTo.push(null);
		}
		for (let category of game.config.categories){
			let disabledPromoteConvert = '';
			if (game.config.goodwill[category] >= game.config.minGoodwillToConvert){
				convertFrom += "<option>" + category + "</option>";
				convertingFrom.push(category);
			}
			if (game.config.goodwill[category] < game.config.maxGoodwill && category != exclude){
				convertTo += "<option>" + category + "</option>";
				convertingTo.push(category);
			}
			if (game.config.goodwill[category] < 1 ){
				disabledPromoteConvert = ' disabled ';
			}	
			promoteConvert += "<div class='row'>" 
				+ "<div class='col text-center'>" + category + " </div>"
				+ "<div class='stars-" + category + " col text-center'></div>"
				+ "<div class='col text-center'>"
				+ "<button id='convertPromote-" 
				+ category + "' class='btn btn-outline-dark convertPromote' " + disabledPromoteConvert + ">"
				+ " &star; -> " + Math.round(game.config.convert[category] / game.config.maxWorkRep * 100) 
				+ "%</button>"
				+ "</div></div>";		
		}								
		$("#promoteConvert").html(promoteConvert);
		$(".converting").prop('disabled', true);			
		$("#menu-politics").prop('disabled', true);	
		if (convertingTo.length == 1 && convertingFrom.length == 1 && convertingTo[0] == convertingTo[0]){
			return;
		}
		if (convertingTo.length > 0 && convertingFrom.length > 0){
			$("#menu-politics").prop('disabled', false);					
			$("#politicsOption").removeClass('d-none');
			$(".converting").prop('disabled', false);			
			if (exclude == null){
				$("#convertFrom").html(convertFrom);
			}
			$("#convertTo").html(convertTo);
		}
	}
}