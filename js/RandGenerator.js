class RandGenerator {
	hours(categories, hoursPerDay, reqHours){
		let hours = [], obj = {}, sum = 0;
		while(1){
			hours = [], sum = 0;
			for (let i = 0; i <categories.length; i++){
				let rand = randNum(1, hoursPerDay);
				hours.push(rand);
				sum += rand;				
			}
			if (sum == reqHours){
				break;
			}
		}
		for (let i in categories){
			let category = categories[i];
			obj[category] = hours[i];
		}
		return obj;
		
	}
	
	raise (){
		return randNum(1, 10) / 100;
	}
	
	promoteConvert(categories, maxWorkRep){
		let obj = {};
		for (let category of categories){
			obj[category] = randNum (1, Math.round(maxWorkRep / categories.length));
		}
		return obj;
	}
	
	gains(categories, maxRep, day, daysGood){
		let obj = {};
		for (let category of categories){
			obj[category] 
				= randNum (Math.round(maxRep / categories.length / day), maxRep / daysGood[category] );
		}
		return obj;
	}
	
	bonus(categories, maxRep, hoursPerDay){
		let obj = {};
		for (let category of categories){
			obj[category] = randNum (1, Math.round(maxRep / hoursPerDay));
		}
		return obj;
	}
}