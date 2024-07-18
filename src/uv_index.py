import requests
import re
from datetime import datetime

def is_valid_zip(zip_code):
    return re.match(r'^\d{5}(\d{1})?$', zip_code) is not None

def get_coordinates(zip_code, api_key):
    geocode_url = f"https://api.opencagedata.com/geocode/v1/json?q={zip_code}&key={api_key}"
    response = requests.get(geocode_url)

    if response.status_code != 200:
        print("Error fetching coordinates.")
        return None, None, None, None, None

    data = response.json()
    if data["results"]:
        latitude = data["results"][0]["geometry"]["lat"]
        longitude = data["results"][0]["geometry"]["lng"]
        city = data["results"][0]["components"].get("city") or data["results"][0]["components"].get("town")
        state = data["results"][0]["components"].get("state")
        country = data["results"][0]["components"].get("country")
        return latitude, longitude, city, state, country
    else:
        print("No results found for the zip code.")
        return None, None, None, None, None

def get_uv_info(api_key, lat, lng):
    current_date = datetime.now().strftime('%Y-%m-%d')
    url = f"https://api.openuv.io/api/v1/uv?lat={lat}&lng={lng}&alt=100&dt="
    headers = {
        'x-access-token': api_key,
        'Content-Type': 'application/json'
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print("Error fetching UV index data.")
        return None

    data = response.json()
    if "result" in data:
        uv_info = data["result"]
        uv = uv_info["uv"]
        uv_time = uv_info["uv_time"]
        uv_max = uv_info["uv_max"]
        uv_max_time = uv_info["uv_max_time"]

        print(f"UV Index: {uv}")
        print(f"UV Time: {uv_time}")
        print(f"UV Max: {uv_max}")
        print(f"UV Max Time: {uv_max_time}")
        if uv > 2: 
            print("Apply sunscreen")
    else:
        print("No valid UV information found in the response.")

def main():
    opencage_api_key = "c37fa0b0de684daf9c3e5c5bff59d492"
    openuv_api_key = "openuv-jtiygrlymi9p6i-io"

    zip_code = input("Enter zip code: ")

    if not is_valid_zip(zip_code):
        print("Invalid zip code format. Please try again.")
        return

    latitude, longitude, city, state, country = get_coordinates(zip_code, opencage_api_key)
    print(f"Latitude: ", latitude)
    print(f"Longitude: ", longitude)
    print(city, ",", state, country)

    if latitude is not None and longitude is not None:
        get_uv_info(openuv_api_key, latitude, longitude)
    else:
        print("No valid coordinates found for the entered zip code.")

if __name__ == "__main__":
    main()
