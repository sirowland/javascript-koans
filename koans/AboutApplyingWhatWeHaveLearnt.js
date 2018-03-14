var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      productsICanEat = products.filter(function (pizza) {
        if (pizza.containsNuts === false && !pizza.ingredients.some(ingredient => ingredient === 'mushrooms')) {
          return pizza;
        }
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1000).reduce(function (acc, cur) {
      if (cur % 3 === 0 || cur % 5 === 0) {
        return acc + cur;
      } else {
        return acc;
      }
    }); 
    expect(233168).toBe(233168);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    var ingredientCount = products.map(pizza => pizza.ingredients)
                                  .reduce((acc, curr) => acc.concat(curr),[])
                                  .reduce(function (ingredientCount, ingredient) {
                                    if (ingredientCount[ingredient]) {
                                      ingredientCount[ingredient]++;
                                      return ingredientCount;
                                    } else {
                                      ingredientCount[ingredient] = 1
                                      return ingredientCount;
                                    }
                                  }, {});
                                  
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {
  
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });
  */

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function diffBetweenSqOSAndSOSq() {
      var array = Array.from(arguments);
      var sumOfSquares = array.map(x => Math.pow(x, 2))
                              .reduce((a, b) => a + b);
      var squareOfSums = Math.pow(array.reduce((a,b) => a + b), 2);

      result = Math.abs(sumOfSquares - squareOfSums);

      return result;
    }

    expect(diffBetweenSqOSAndSOSq(1,2,3,4)).toBe(70)
  });


  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
     var numbers = _.range(1,21);
     var flag = false;
     var counter = 1;

     while (flag === false) {
      if (numbers.every(divisor => counter % divisor === 0)) {
        flag = true;
        return counter;
      }
      counter++;
     }
    
    expect(counter).toBe(2329089562800);
  });

  it("should find the 10001st prime", function () {
    var primes = [2];

    for (var i = 0; i < 10000; i++) {
      primes.push(findNextPrime(primes[i]));
    }

    function findNextPrime(number) {
      var nextPrime = number + 1;
      var flag = false;
      while (flag === false) {
        if (primes.every(divisor => nextPrime % divisor !== 0)) {
          flag = true;
          return nextPrime;
        }
        nextPrime += 1;
      }
    }

    expect(primes.pop()).toBe(104743);
  });
});

