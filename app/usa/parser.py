import csv
import requests

def geoLocation(location, api_key):
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location.replace(", ", "+").replace(" ", "+") +"&key=" + api_key
    r = requests.get(url)
    location = r.json()["results"][0]["geometry"]["location"]
    return location
    
def csv_parser(file, fieldnames):
    with open(file, "r+", encoding="utf8") as f:
        reader = csv.DictReader(f)
        writer = csv.DictWriter(f, fieldnames = fieldnames)
        for row in reader:
            loc = geoLocation(row["Location"], "AIzaSyDS2WoS4k4j_Ci9O38ISp04w6OZP_9hb_8")
            print(loc)
            
csv_parser("data.csv", ["Latitude", "Longitude"])