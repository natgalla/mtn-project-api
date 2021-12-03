// confirm all js is loading in for dev purposes
if (Plotly != undefined) {
  console.log('Plotly.js connected');
}
console.log('app.js connected');
if (data) {
  console.log('Data loaded successfully');
}


// routes by grade    // REFACTOR: MOSTLY REPEATS FOR LENGTH GRAPH
                      // Data, mapping functions, layout object
let sortedByGrade = data.sort(sortRating)

let pitchOnsights = sortedByGrade.map(mapPitchOnsights);
let pitchAttempts = sortedByGrade.map(mapPitchAttempts);
let pitchSends = sortedByGrade.map(mapPitchSends);
let ratings = sortedByGrade.map(rating => cleanRating(rating.Rating));

let onsightsP = {
  x: ratings,
  y: pitchOnsights,
  type: "bar",
  name: "Onsights"
};

let sendsP = {
  x: ratings,
  y: pitchSends,
  type: "bar",
  name: "Sends"
};

let attemptsP = {
  x: ratings,
  y: pitchAttempts,
  type: "bar",
  name: "Attempts"
}

let layoutP = {
  title: 'Sport pitches by grade',
  xaxis: { type: 'category' },
  barmode: 'stack'
};
Plotly.newPlot('pitchByGrade', [onsightsP, sendsP, attemptsP], layoutP);


let dates = data.map(date => date.Date);

// pitches by year
// pitches by month

// distance climbed
let distOnsights = sortedByGrade.map(mapLengthOnsights);
let distAttempts = sortedByGrade.map(mapLengthAttempts);
let distSends = sortedByGrade.map(mapLengthSends);

let onsightsL = {
  x: ratings,
  y: distOnsights,
  type: "bar",
  name: "Onsights"
};

let sendsL = {
  x: ratings,
  y: distSends,
  type: "bar",
  name: "Sends"
};

let attemptsL = {
  x: ratings,
  y: distAttempts,
  type: "bar",
  name: "Attempts"
}

let layoutL = {
  title: 'Sport length by grade',
  xaxis: { type: 'category' },
  yaxis: { title: 'Length (ft)'},
  barmode: 'stack'
};
Plotly.newPlot('lengthByGrade', [onsightsL, sendsL, attemptsL], layoutL);

// top routes
// top crags
// top climbing areas
