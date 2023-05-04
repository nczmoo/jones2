class Config {
	bonus = {
		contractor: 0,
		coworker: 0,
		customer: 0,
		management: 0,
	}
	categories = ['contractor', 'coworker', 'customer', 'management'];
	convert = { //goodwill to work rep
		contractor: 0,
		coworker: 0,
		customer: 0,
		management: 0,
	}
	day = 1;	
	days = ['Friday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
	daysGood = {
		contractor: 1,
		coworker: 1,
		customer: 1,
		management: 1,
	}
	gain = {
		contractor: 0,
		coworker: 0,
		customer: 0,
		management: 0,
	}
	goodwill = {
		contractor: 0,
		coworker: 0,
		customer: 0,
		management: 0,
	}
	hours = {		
		contractor: 0,
		coworker: 0,
		customer: 0,
		management: 0,
	}	
	hoursPerDay = 8;
	maxGoodwill = 3;	
	maxRep = 100;	
	maxWorkRep = 10;	
	maxWorkRepChange = 2;
	minGoodwillToConvert = 2;
	money = 0;
	promoteRaise = null;

	rep = {
		contractor: 0,
		coworker: 0,
		customer: 0,
		management: 0,
	}	
	repFail = 10;
	req = {
		contractor: 0,
		coworker: 0,
		customer: 0,
		management: 0,
	}	
	reqHours = 8;
	unassignedHours = 8;	
	wage = 600;
	
	workRep = 0;	
}