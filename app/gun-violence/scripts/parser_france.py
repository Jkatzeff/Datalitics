import csv
import pandas as pd
import requests

def geoLocation(location, api_key):
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location.replace(", ", "+").replace(" ", "+") +"&key=" + api_key
    r = requests.get(url)
    location = r.json()["results"][0]["geometry"]["location"]
    return location

def csv_parse(file):
    with open(file) as f:
        reader = csv.DictReader(f)
        for row in reader:
            print(row["FATALITIES"])
            
csv_parse("./data/france_gun_data.csv")