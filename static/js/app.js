// confirm all js is loading in for dev purposes
if (Plotly != undefined) {
  console.log('Plotly.js connected');
}
console.log('app.js connected');
if (data) {
  console.log('Data loaded successfully');
}

// function to scrub dumb noise from ratings
function cleanRating(rating) {
  let grade_reg = /[\s\/]\w+/
  let mods_reg = /[+-]/
  rating = rating.replace(grade_reg, '');
  rating = rating.replace(mods_reg, '');
  return rating
}

function sortRating(a, b) {
  function ratingMod(input) {
    if (input.indexOf('a') > -1) {
      return 0.1
    } else if (input.indexOf('b') > -1) {
      return 0.2
    } else if (input.indexOf('c') > -1) {
      return 0.3
    } else if (input.indexOf('d') > -1) {
      return 0.4
    } else {
      return 0
    }
  }
  aMod = ratingMod(a.Rating)
  bMod = ratingMod(b.Rating)
  decimalA = parseInt(a.Rating.replace('5.',''));
  decimalB = parseInt(b.Rating.replace('5.',''));
  decimalA += aMod
  decimalB += bMod
  return decimalA - decimalB;
}

sortedRatings = data.sort(sortRating)

let pitches = sortedRatings.map(pitches => pitches.Pitches);
let dates = data.map(date => date.Date);
let ratings = sortedRatings.map(rating => cleanRating(rating.Rating));
let distances = data.map(distance => distance.Length);

let trace = {
  x: ratings,
  y: pitches,
  type: "bar"
};

let layout = {
  xaxis: { type: 'category' }
};
Plotly.newPlot('someChart', [trace], layout);

// pitches by year
// pitches by month
// routes by grade
// distance climbed
// top routes
// top crags
// top climbing areas
