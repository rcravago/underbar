(function() {
	'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument.
  // Often used if user doesn't pass an iterator
  _.identity = function(val) {
    return val;
  };

  /*
   * COLLECTIONS
   * ===========
   * Functions that operate on collections of values;
   * in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined, return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the last element.
  _.last = function(array, n) {
    var length = array.length;

    if (n > length){
      return array.slice();
    }
    return n === undefined ? array[length - 1] : array.slice(length - n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator){
  	if(Array.isArray(collection)){
  		for(var i = 0; i < collection.length; i++){
				iterator(collection[i], i, collection);  			
  		}
  	} else {
  		for(var key in collection){
  			iterator(collection[key], key, colleciton);
  		}
  	}
  }

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

	// Return all elements of an array that pass a truth test.
	_.filter = function(collection, test) {
	  var results = [];

	  _.each(collection, function(value){
	    if (test(value)){
	      results.push(value);
	    }
	  });
	  return results;
	}

	// Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function(value){
      return !(test(value));
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var sorted = array.sort();
    var results = [];

    for(var i = 0; i < sorted.length; i++){
      if(sorted[i] != sorted[i+1]){
        results.push(sorted[i]);
      }
    }
    return results;
  };

  // Return the results of applying an iterator to each element.
  // Return same output length as input
  _.map = function(collection, iterator) {
    var results = [];
    
    _.each(collection, function(value){
      results.push(iterator(value));
    });
    return results;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  _.reduce = function(collection, iterator, accumulator) {
    // determine whether starting value (accumulator) was passed
    var initialize = arguments.length === 2;

    // for each value in collection
    _.each(collection, function(value){
    	// if no starting value passed (initialize returns true)
      if(initialize){
      	// first element used as accumulator
        accumulator = value;
        // set initialize to false so it doesn't run again
        initialize = false;
      } else {
      	// else accumulator is equal to result of running iterator on item,
      	// reducing collection to single value
        accumulator = iterator(accumulator, value);
      }  
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if(iterator){
      iterator = iterator;
    } else {
      iterator = _.identity;
    }

    // inverted boolean "!!" converts nonbooleans like numbers and strings, into booleans    
    return !!_.reduce(collection, function(accumulator, value){
      return accumulator && iterator(value);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if(iterator){
      iterator = iterator;
    } else {
      iterator = _.identity;
    }
    
    return !_.every(collection, function(value){
      return !iterator(value);
    });
  };

}()); 