// function to scrub noise from ratings
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

function mapPitchAttempts(row) {
  let leadStyle = row["Lead Style"];
  if (leadStyle == 'Fell/Hung' || leadStyle == null) {
     return row.Pitches
  } else {
     return 0
  }
}

function mapPitchOnsights(row) {
  let leadStyle = row["Lead Style"];
  if (leadStyle == 'Onsight' || leadStyle == 'Flash') {
     return row.Pitches
  } else {
     return 0
  }
}

function mapPitchSends(row) {
  let leadStyle = row["Lead Style"];
  if (leadStyle == 'Fell/Hung' || leadStyle == null || leadStyle == 'Onsight' || leadStyle == 'Flash') {
     return 0
  } else {
     return row.Pitches
  }
}

function mapLengthAttempts(row) {
  let leadStyle = row["Lead Style"];
  if (leadStyle == 'Fell/Hung' || leadStyle == null) {
     return row.Length
  } else {
     return 0
  }
}

function mapLengthOnsights(row) {
  let leadStyle = row["Lead Style"];
  if (leadStyle == 'Onsight' || leadStyle == 'Flash') {
     return row.Length
  } else {
     return 0
  }
}

function mapLengthSends(row) {
  let leadStyle = row["Lead Style"];
  if (leadStyle == 'Fell/Hung' || leadStyle == null || leadStyle == 'Onsight' || leadStyle == 'Flash') {
     return 0
  } else {
     return row.Length
  }
}

function graph(divId, sortFunc, title, pitchLength='pitch', xaxis='cleanRating') {
  let sorted = ticks.sort(sortFunc);
  let mapOnsights;
  let mapAttempts;
  let mapSends;
  x = sorted.map(row => row[xaxis]);

  if (pitchLength === 'pitch') {
    mapOnsights = mapPitchOnsights;
    mapAttempts = mapPitchAttempts;
    mapSends = mapPitchSends;
  } else if (pitchLength === 'length') {
    mapOnsights = mapLengthOnsights;
    mapAttempts = mapLengthAttempts;
    mapSends = mapLengthSends;
  }

  let onsights = sorted.map(mapOnsights);
  let attempts = sorted.map(mapAttempts);
  let sends = sorted.map(mapSends);

  let onsightsTrace = {
    x: x,
    y: onsights,
    type: "bar",
    name: "Onsights"
  };

  let sendsTrace = {
    x: x,
    y: sends,
    type: "bar",
    name: "Sends"
  };

  let attemptsTrace = {
    x: x,
    y: attempts,
    type: "bar",
    name: "Attempts"
  }

  let layout = {
    title: title,
    xaxis: { type: 'category' },
    barmode: 'stack'
  };
  Plotly.newPlot(divId, [onsightsTrace, sendsTrace, attemptsTrace], layout);
}