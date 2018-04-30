import csv
import pandas as pd
import requests

def geoLocation(location, api_key):
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location.replace(", ", "+").replace(" ", "+") +"&key=" + api_key
    r = requests.get(url)
    location = r.json()["results"][0]["geometry"]["location"]
    return location
    
def csv_parser(file):
    df = pd.read_csv(file)
    for i in range(0, len(df)):
        loc = geoLocation(df.loc[i, "Location"], "AIzaSyBt9H1W4e9Y2qeNc_T0tWurJyXP6JxgaY4")
        df.set_value(i, "latitude", loc['lat'])
        df.set_value(i, "longitude", loc['lng'])
    df.to_csv(file, index=False)
            
#csv_parser("data.csv")
print(geoLocation("Paris, France", "AIzaSyBt9H1W4e9Y2qeNc_T0tWurJyXP6JxgaY4"))