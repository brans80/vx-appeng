
let toMixArray = (array) => {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

let toEqualTwoArrs = (arr1, arr2) => {
  if(arr1.length !== arr2.length) {
    return false
  }

	for(let k in arr1) {
		for(let k in arr2) {
			if(arr1[k] !== arr2[k]) {
					return false
			}
		}
  }

	return true;
};



let toFilterArrByObjParam = (objsArr, param, paramVal) => {
	if((typeof paramVal) !== 'string' && Array.isArray(paramVal)) {
		return objsArr.filter(function(obj) {
			return paramVal.includes(obj[param])
		});	
	} else {
		return objsArr.filter(function(obj) {
			return obj[param] === paramVal;
		});
	}
};

let toCheckEmptyObj = (obj) => {
  for (var key in obj) {
    return false;
  }
  return true;
}

let GF = {
  hello : () => { 
    return `Hello!`
  },

  toMixArray: toMixArray,
	toEqualTwoArrs: toEqualTwoArrs,
	toFilterArrByObjParam: toFilterArrByObjParam,
	toCheckEmptyObj: toCheckEmptyObj,

};



export default GF;