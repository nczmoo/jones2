class Game{
	config = new Config();
	generate = new RandGenerator();
	constructor(){
		this.config.req
			= this.generate.hours(this.config.categories, this.config.hoursPerDay, this.config.reqHours);
		this.config.promoteRaise = this.generate.raise();
		this.config.convert = this.generate.promoteConvert(this.config.categories, this.config.maxWorkRep);
		this.config.gain 
			= this.generate.gains(this.config.categories, this.config.maxRep, this.config.day, this.config.daysGood);
		this.config.bonus
			= this.generate.bonus(this.config.categories, this.config.maxRep, this.config.hoursPerDay);
	}	
	
	addGoodwill(category){
		if (this.config.rep[category] < this.config.maxRep){
			return;
		}
		if (this.config.rep[category] > this.config.maxRep){
			this.config.rep[category] = this.config.maxRep;
		}
		if (this.config.goodwill[category] < this.config.maxGoodwill){
			this.config.goodwill[category]++;
		}
	}
	
	checkEnd(){
		for (let category of this.config.categories){
			if (this.config.rep[category] < 0){
				if (this.config.goodwill[category] > 0){
					this.config.goodwill[category]--;
					return;
				}
				this.over('repFail');
			}
		}
	}
	
	convert(from, to){
		if (this.config.goodwill[from] < this.config.minGoodwillToConvert || from == to){
			return;
		}
		this.config.goodwill[from] = 0;
		this.config.goodwill[to]++;
	}
	
	convertPromote(category){
		if (this.config.goodwill[category] < 1){
			return;
		}
		this.config.goodwill[category]--;
		this.config.workRep += this.config.convert[category];
		if (this.config.workRep >= this.config.maxWorkRep){
			this.promote();
		}
	}
		
	day(){		
		for (let category of this.config.categories){			
			if (this.config.hours[category] < this.config.req[category]){
				this.config.rep[category] -= this.config.gain[category];
				this.config.daysGood[category] = Math.round(this.config.daysGood[category] / 2);
				continue;				
			}
			this.config.rep[category] += this.config.gain[category] + (this.config.bonus[category] * (this.config.hours[category] - this.config.req[category]));
			this.addGoodwill(category);
			this.config.daysGood[category]++;
		}
		
		this.config.reqHours = randNum(9, 17);
		console.log(this.config.reqHours);
		this.config.unassignedHours = this.config.hoursPerDay;
		this.config.req 
			= this.generate.hours(this.config.categories, this.config.hoursPerDay, this.config.reqHours);
		for (let category of this.config.categories){
			this.config.hours[category] = 0;
		}
		this.config.day++;
		this.checkEnd();
		if (this.config.day % 5 == 1){
			this.config.money += this.config.wage;
			this.config.convert 
				= this.generate.promoteConvert(this.config.categories, this.config.maxWorkRep);
		}
		this.config.gain 
			= this.generate.gains(this.config.categories, this.config.maxRep, this.config.day, this.config.daysGood);
		this.config.bonus
			= this.generate.bonus(this.config.categories, this.config.maxRep, this.config.hoursPerDay);
		this.config.promoteRaise = this.generate.raise();
	}
		
	dec (category){
		if (this.config.hours[category] < 1){
			return;
		}
		this.config.unassignedHours++;
		this.config.hours[category]--;
	}
	
	inc(category){		
		if (this.config.unassignedHours < 1){
			return;
		}
		this.config.unassignedHours--;
		this.config.hours[category]++;
	}
	
	over(why){
		alert("You failed! You're now homeless and will die in the street. Sorry!");
	}
	
	pop(category){
		if (this.config.hours[category] < this.config.req[category] 
			&& this.config.unassignedHours >= this.config.req[category] - this.config.hours[category]){
			this.config.unassignedHours -= this.config.req[category] - this.config.hours[category];
			this.config.hours[category] = this.config.req[category];
		} else if (this.config.hours[category] >= this.config.req[category]){
			this.config.unassignedHours += this.config.hours[category];
			this.config.hours[category] = 0;
		} 
	}
	
	promote(category){
		let remainder = this.config.workRep - this.config.maxWorkRep;
		this.config.workRep = 0;
		if (remainder > 0){
			this.config.workRep = remainder;
		}
		this.config.maxWorkRep *= this.config.maxWorkRepChange;
		this.config.wage *= (1 + this.config.promoteRaise);
		console.log(this.config.wage, this.config.promoteRaise);
		this.config.convert = this.generate.promoteConvert(this.config.categories, this.config.maxWorkRep);
	}
}
