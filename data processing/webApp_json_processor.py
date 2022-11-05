import pandas as pd
import math
import json
# ==========================================================================
# This file does the final step for transforming the data frames into a usable json format for the web application

# ==========================================================================
##### INTERMEDIATE DATA FORM
# Used for intermediate data visualization, cleaning and processing

# Load and combine the data frames
df1 = pd.read_csv("valid_coordinates_dataframe.csv")
df2 = pd.read_csv("corrected_coordinates_dataframe.csv")

frames = [df1, df2]
df = pd.concat(frames, ignore_index=False)

# remove all rows with '*' as a value
df = df[df.Value != '*']
df = df[df.Value.apply(lambda x: x.isnumeric())]

# convert value column into integer type
df['Value'] = df['Value'].astype(int)

# Normalize the value of each edge and add new column
df['norm_value'] = (df['Value']-df['Value'].min())/(df['Value'].max()-df['Value'].min())

# # ==========================================================================
# #### WEB APPLICATION DATA FORM
# # Transform data into usable JSON format for the react web application

print(df)

json_dict = {}
for index, row in df.iterrows():
    year = row[2]
    norm_value = row[6]
    coor_to = row[5]
    coor_from = row[4]
    value = row[3]
    origin = row[1]
    destination = row[0]

    # Ignore invalid rows that do not have valid coordinates
    if (isinstance(coor_to, str) and isinstance(coor_from, str)):
        # convert from string to tuple
        coor_from = coor_from.replace('(', '')
        coor_from = coor_from.replace(')', '')
        coor_to = coor_to.replace('(', '')
        coor_to = coor_to.replace(')', '')
        coor_from = tuple(map(float,coor_from.split(', ')))
        coor_to = tuple(map(float,coor_to.split(', ')))

        # format results for json
        #           0           1       2           3       4       5
        coor_line = [coor_from, coor_to, norm_value, value, origin, destination]
        # add to json if does not exist
        if year not in json_dict:
            json_dict[year] = [coor_line]
        else:
            json_dict[year].append(coor_line)

# >> Save the file
with open("../src/line_coordinates.json", "w") as outfile:
    json.dump(json_dict, outfile)

print("json file successfully generated.")