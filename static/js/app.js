// confirm all js is loading in for dev purposes
if (Plotly != undefined) {
  console.log('Plotly.js connected');
}
console.log('app.js connected');
if (data) {
  console.log('Data loaded successfully');
}

let ticks = data;

// parse location info and add cleanRating property
for (tick of ticks) {
  try {
    if (tick.Location.split(' > ').length === 3) {
      tick.area = tick.Location.split(' > ')[1]; 
      tick.crag = tick.Location.split(' > ')[2]; 
    } else if (tick.Location.split(' > ').length === 4) {
      tick.area = tick.Location.split(' > ')[2];
      tick.crag = tick.Location.split(' > ')[3];  
    }
    tick.state = tick.Location.split(' > ')[0];
    tick.region = tick.Location.split(' > ')[1];
    tick.cleanRating = cleanRating(tick.Rating)
  } catch (error) {
    console.error(error);
  } 
}

// pitches climbed
graph('pitchByGrade', sortRating);

// length climbed
graph('lengthByGrade', sortRating, 'length');

graph('pitchByArea', sortRating, 'length', 'crag');

// pitches by year
// pitches by month
let dates = data.map(row => row.Date);
