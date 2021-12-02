import requests
import pandas as pd
from io import StringIO
import json
from flask import Flask, render_template

def get_tick_json(user='200633661/nathan-gallagher'):
    # get csv export from mtn-project
    url = f'https://www.mountainproject.com/user/{user}/tick-export'
    res = requests.get(url)
    data = StringIO(res.text)

    # read the response into a pandas df and convert to json
    df = pd.read_csv(data)
    result = df.to_json(orient="records")
    return result

app = Flask(__name__)

@app.route('/')
def default_dashboard():
    return render_template('index.html')

@app.route('/<userId>/<userName>')
def dashboard_user(userId, userName):
    user = userId + '/' + userName
    return render_template('dashboard.html',data=get_tick_json(user))

@app.route('/data')
def data_default():
    return get_tick_json()

@app.route('/data/<userId>/<userName>')
def data_user(userId, userName):
    user = userId + '/' + userName
    return get_tick_json(user)

if __name__ == "__main__":
    app.run(debug=True)
