import pandas as pd
import math
import json
# ==========================================================================
# This file does the secondary data processing step for the data:
# Objective is to match the columns that involve names of countries to match the standard format in country_coordinates.csv

# ==========================================================================
##### RAW DATA FORM
# Loading the data
df = pd.read_csv("invalid_coordinates_dataframe.csv")
country_coords = pd.read_csv("country_coordinates.csv")

# ==========================================================================
##### SECONDARY PROCESSING STEP

# HashMap of wrong country name to correct country names: correctionMap[WRONG_NAME] = CORRECT_NAME
# correctionsMap[""] = ""
correctionsMap = {}
correctionsMap["United States of America"] = "United States"
correctionsMap["Czech Rep."] = "Czech Republic"
correctionsMap["Russian Federation"] = "Russia"
correctionsMap["Serbia and Kosovo: S/RES/1244 (1999)"] = "Serbia"
correctionsMap["Viet Nam"] = "Vietnam"
correctionsMap["United Kingdom of Great Britain and Northern Ireland"] = "United Kingdom"
correctionsMap["Iran (Islamic Rep. of)"] = "Iran"
correctionsMap["Palestinian"] = "Palestinian Territories"
correctionsMap["Dem. Rep. of the Congo"] = "Congo [DRC]"
correctionsMap["Lao People's Dem. Rep."] = "Laos"
correctionsMap["Venezuela (Bolivarian Republic of)"] = "Venezuela"
correctionsMap["Syrian Arab Rep."] = "Syria"
correctionsMap["Rep. of Moldova"] = "Moldova"
correctionsMap["Bolivia (Plurinational State of)"] = "Bolivia"
correctionsMap["China, Hong Kong SAR"] = "Hong Kong"
correctionsMap["Dem. People's Rep. of Korea"] = "North Korea"
correctionsMap["Dominican Rep."] = "Dominican Republic"
correctionsMap["Myanmar"] = "Myanmar [Burma]"
correctionsMap["United Rep. of Tanzania"] = "Tanzania"
correctionsMap["The former Yugoslav Rep. of Macedonia"] = "Macedonia [FYROM]"

# Change all wrong countries to correct country names
for wrongCountryName in correctionsMap:
    correctCountryName = correctionsMap[wrongCountryName]
    df.loc[df['Origin'] == wrongCountryName, 'Origin'] = correctCountryName
    df.loc[df['Country / territory of asylum/residence'] == wrongCountryName, 'Country / territory of asylum/residence'] = correctCountryName

# Convert coordinates dataframe to dictionary form
coords_dict = dict(zip(country_coords.name, zip(country_coords.longitude, country_coords.latitude)))

# Convert country of origin and asylum to geo coordinates
df['coor_from'] = df['Origin'].map(coords_dict)
df['coor_to'] = df['Country / territory of asylum/residence'].map(coords_dict)

# Save the dataframe
df.to_csv('corrected_coordinates_dataframe.csv', index=False)
