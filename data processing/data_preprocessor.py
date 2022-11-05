import pandas as pd
import math
import json
# ==========================================================================
# This file does the pre-processing step for the data:
# It takes in the raw UNHCR format of resettlement_data.csv
# It also takes in country_coordinates.csv which contains a list of countries mapping to their geo coordinate values
# The output of this pre-processing step is two files:
# > a csv file that contains the data frame with the country coordinates successfully mapped
# > a csv file that contains the data frame with the country coordinates unsuccessfully mapped

# ==========================================================================
##### RAW DATA FORM

df = pd.read_csv("resettlement_data.csv")
country_coords = pd.read_csv("country_coordinates.csv")

# Convert coordinates dataframe to dictionary form
coords_dict = dict(zip(country_coords.name, zip(country_coords.longitude, country_coords.latitude)))

# ==========================================================================

# Convert country of origin and asylum to geo coordinates
df['coor_from'] = df['Origin'].map(coords_dict)
df['coor_to'] = df['Country / territory of asylum/residence'].map(coords_dict)

# Export the data frames with invalid coordinates for manual processing
# could be due to inconsistent country naming scheme
df_invalidValues = df[df.isnull().any(1)]
df_invalidValues.to_csv('invalid_coordinates_dataframe.csv', index=False)

# Save the valid values data frame
df_validValues = df[df.isnull().any(1) == False]
df_validValues.to_csv('valid_coordinates_dataframe.csv', index=False)

