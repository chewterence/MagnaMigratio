import pandas as pd
import math
import json
# ==========================================================================
##### RAW DATA FORM

df = pd.read_csv("resettlement_data.csv")
country_coords = pd.read_csv("country_coordinates.csv")

# Convert coordinates dataframe to dictionary form
coords_dict = dict(zip(country_coords.name, zip(country_coords.longitude, country_coords.latitude)))

df_1959 = df.loc[df['Year'] == 1959]

# df_1959['long'] = coords_dict[df_1959.Value]
# df_1959['long'] = pd.Series(coords_dict)
# ==========================================================================
##### INTERMEDIATE DATA FORM
# Used for intermediate data visualization and cleaning
df_1959['coor_from'] = df_1959['Origin'].map(coords_dict)
df_1959['coor_to'] = df_1959['Country / territory of asylum/residence'].map(coords_dict)

# ==========================================================================
#### WEB APPLICATION DATA FORM
# Transform data into usable JSON format for the react web application
json_dict = {}
for index, row in df_1959.iterrows():
    year = row[2]
    value = row[3]
    coor_to = row[4]
    coor_from = row[5]
    # Ignore invalid rows that do not have valid coordinates
    if type(coor_to) is tuple and type(coor_from) is tuple:
        coor_line = [coor_from, coor_to]
        # add to json if does not exist
        if year not in json_dict:
            json_dict[year] = [coor_line]
        else:
            json_dict[year].append(coor_line)
with open("line_coordinates.json", "w") as outfile:
    json.dump(json_dict, outfile)
