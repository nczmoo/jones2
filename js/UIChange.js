class UIChange{
	do(){
		for (let category of game.config.categories){
	
		
			$("#100Cent-" + category).removeClass('fw-bold');			
			$("#101Cent-" + category).removeClass('fw-bold');
			$("#" + category + "RepDelta").removeClass('fw-bold');
			if (game.config.rep[category] - game.config.gain[category]  - game.config.bonus[category] < 0){
				$("#" + category + "RepDelta").addClass('fw-bold');
			}					
			if (game.config.hours[category] > game.config.req[category]){
				$("#101Cent-" + category).addClass('fw-bold');
				
			}
			/*
			if (game.config.unassignedHours < game.config.req[category] - game.config.hours[category]
			|| game.config.hours[category] >= game.config.req[category]){
				$("#pop-" + category).prop('disabled', true);								
			}
			*/
			if (game.config.hours[category] < game.config.req[category] 
				&& game.config.unassignedHours >= game.config.req[category] - game.config.hours[category]){
				$("#pop-" + category).removeClass('btn-outline-dark');
				$("#pop-" + category).addClass('btn-outline-success');								
			} else if (game.config.hours[category] >= game.config.req[category]){				
				$("#pop-" + category).removeClass('btn-outline-dark');
				$("#pop-" + category).addClass('btn-outline-danger');								
			} else {
				$("#pop-" + category).prop('disabled', true);
			}
			if (game.config.unassignedHours < 1){
				$("#inc-" + category).prop('disabled', true);
			}
			if (game.config.hours[category] < 1){
				$("#dec-" + category).prop('disabled', true);
			}
			$("#category-" + category).removeClass('fw-bold');
			if (game.config.hours[category] >=  game.config.req[category]){
				$("#category-" + category).addClass('fw-bold');
				$("#100Cent-" + category).addClass('fw-bold');
			}			
							
			if (game.config.day > 2 && game.config.goodwill[category] > 0){
				$("#menu").removeClass('d-none');
			}
			$(".stars-" + category).html(this.fetchStars(category));
		}		
	}
	
	fetchStars(category){
		let stars = '';
		if (game.config.goodwill[category] > game.config.maxGoodwill[category]){
			stars += "<span class='fw-bold'>";
		}
		if (game.config.goodwill[category] > 0){
			stars = " (";
			for (let i = 0; i < game.config.goodwill[category]; i++){
				stars += "&star;"
			}
			stars += ")";				
		}
		if (game.config.goodwill[category] > game.config.maxGoodwill[category]){
			stars += "</span>";
		}
		return stars;
	}
}