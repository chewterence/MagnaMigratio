import pandas as pd
import math
import json
# ==========================================================================
##### RAW DATA FORM

df = pd.read_csv("resettlement_data.csv")
country_coords = pd.read_csv("country_coordinates.csv")

# Convert coordinates dataframe to dictionary form
coords_dict = dict(zip(country_coords.name, zip(country_coords.longitude, country_coords.latitude)))

# ==========================================================================
##### INTERMEDIATE DATA FORM
# Used for intermediate data visualization, cleaning and processing

# Convert country of origin and asylum to geo coordinates
df['coor_from'] = df['Origin'].map(coords_dict)
df['coor_to'] = df['Country / territory of asylum/residence'].map(coords_dict)

# remove all rows with '*' as a value
df = df[df.Value != '*']
df = df[df.Value.apply(lambda x: x.isnumeric())]

# convert value column into integer type
df['Value'] = df['Value'].astype(int)

# Normalize the value of each edge and add new column
df['norm_value'] = (df['Value']-df['Value'].min())/(df['Value'].max()-df['Value'].min())

# ==========================================================================
#### WEB APPLICATION DATA FORM
# Transform data into usable JSON format for the react web application
json_dict = {}
for index, row in df.iterrows():
    year = row[2]
    norm_value = row[6]
    coor_to = row[4]
    coor_from = row[5]
    # Ignore invalid rows that do not have valid coordinates
    if type(coor_to) is tuple and type(coor_from) is tuple:
        coor_line = [coor_from, coor_to, norm_value]
        # add to json if does not exist
        if year not in json_dict:
            json_dict[year] = [coor_line]
        else:
            json_dict[year].append(coor_line)

# >> Save the file
with open("line_coordinates.json", "w") as outfile:
    json.dump(json_dict, outfile)
