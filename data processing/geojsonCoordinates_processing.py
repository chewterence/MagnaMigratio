import json

with open('worldmap.json') as json_file:
    data = json.load(json_file)['objects']['world']['geometries']

for countryData in data:
    name = countryData['properties']['name']
    print(countryData['arcs'])