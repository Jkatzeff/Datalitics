import csv
import pandas as pd
import requests

def geoLocation(location, api_key):
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location.replace(", ", "+").replace(" ", "+") +"&key=" + api_key
    r = requests.get(url)
    location = r.json()["results"][0]["geometry"]["location"]
    return location

def csv_parse(file):
    csv_input = pd.read_csv(file)
    csv_input['LATITUDE'] = None
    csv_input['LONGITUDE'] = None
    for i in range(0, len(csv_input)):
        loc = geoLocation(csv_input.loc[i, "CITY"], "AIzaSyBt9H1W4e9Y2qeNc_T0tWurJyXP6JxgaY4")
        csv_input.set_value(i, "LATITUDE", loc['lat'])
        csv_input.set_value(i, "LONGITUDE", loc['lng'])
    csv_input.to_csv(file, index=False)

                
csv_parse('france_gun_data.csv')