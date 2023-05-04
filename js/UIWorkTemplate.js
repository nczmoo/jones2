class UIWorkTemplate {
	
	
	display(){
		let html = '';
		for (let category of game.config.categories){
			let repDelta = '';
			let newRepAfterGain = game.config.rep[category] 
				+ (game.config.gain[category] + (game.config.bonus[category] 
				* (game.config.hours[category] - game.config.req[category])));
			if (newRepAfterGain > 100){
				newRepAfterGain = 100;
			}
			if (game.config.hours[category] < 1){
				repDelta = "<span class='text-danger'>&darr; " 
					+ (game.config.rep[category] - game.config.gain[category]  - game.config.bonus[category]) 				
					+ "%</span>"				
			} else if (game.config.hours[category] < game.config.req[category]){
				repDelta = "<span class='text-danger'>&darr; " 
					+ (game.config.rep[category] - game.config.gain[category] )
					+ "%</span>";
			} else if (game.config.hours[category] == game.config.req[category]){
				repDelta = "<span class='text-success'>&uarr; " 
					+ newRepAfterGain + "%</span>";
			} else if (game.config.hours[category] > game.config.req[category]){
				repDelta = "<span class='text-success'>&uarr; " 
						+ newRepAfterGain + "%</span>";
			}
						
			
			
			html 	+= "<div>" 
					+ "<span id='category-" + category + "'>"
					+ category + ": <span id='" + category 
					+ "Hours'>" + game.config.hours[category] 
					+ "</span>/<span id='" + category + "Req'>" 
					+ game.config.req[category] + "</span> "
					+ "</span>"
					+ "<span id='" + category + "Rep'>" + Math.round(game.config.rep[category] / game.config.maxRep * 100) + "%" + "</span>"
					+ " (<span id='" + category + "RepDelta'>" + repDelta + "</span>)"

					+ "<span class='stars-" + category + "'></span>"
					+ "</div>"
					+ "<div class='progress'>"
					+ "<div id='" + category + "RepBar' class='progress-bar' role='progressbar' style='width: " 
					+ (game.config.rep[category] / game.config.maxRep * 100) + "%'"
					+ " aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>"
					+ "</div>"
					+ "<div class='text-center'>"
					+ "<span id='100Cent-" + category + "'>" + game.config.gain[category] + "%</span>"
					+ " / <span id='101Cent-" + category + "'>" + game.config.bonus[category] + "%</span>"
					+ "</div>"
					+ "<div class='mb-3 text-center row'>"
					+ "<div class='col'>"
					+ "<button id='dec-" + category + "' class='dec btn btn-danger p-3 form-control'>-</button>"
					+ "</div><div class='col'>"
					+ "<button id='inc-" + category + "' class='inc btn btn-success p-3 form-control'>+</button>"
					+ "</div><div class='col'>"
					+ "<button id='pop-" + category + "' class='pop btn btn-outline-dark me-3 p-3 form-control'>!</button>"			
					+ "</div></div>";
		}
		$("#game").html(html);
	}
}