
# Magna Migratio

/ˈmaɲ.ɲa/;

"Magna Migratio" or latin for "The Great Migration" is a data visualization project that aims to visualize UNHCR data.

This project was created as part of a data visualization project for the GET1030/GEI1002 Computers and the Humanities course, in the National University of Singapore.

The authors of this project are:

- Terence Chew (chewterence@u.nus.edu)

- Charlene

- Daeho

- Ho Yi Shu Keon

- Pang Ji Xuan

Any queries regarding the sources, mehtodology, implementation of the project should be directed to chewterence@u.nus.edu

## Navigating The Folders
The following are the important subdirectories and a brief description of its contents:
- **analysis**: contains the code that is used to perform network analysis
	- line_coordinates.json is the raw file that the network analysis is performed
	- A custom algorithm has been written to extract, process then analyse the data using pandas and seaborn
- **data processing**: contains the code that is used to perform preprocessing of the dataset
	- The data processing is abstracted into a three step approach.
	- Run the python scripts in the order of data_preprocessor.py, secondary_data_processor.py, then webApp_json_processor.py
	- resettlement_data.csv is the raw dataset obtained from UNHCR
  
## Data Source & References
[UNHCR](https://www.kaggle.com/datasets/unitednations/refugee-data)
[Dataset Publishing Language: countries.csv](https://developers.google.com/public-data/docs/canonical/countries_csv)

## Dependencies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Data analysis done using [Python](https://www.python.org/) and [Pandas](https://pandas.pydata.org/).
 [React Simple Maps](https://www.react-simple-maps.io/): `npm i -S react-simple-maps`
 [Material UI](https://mui.com/): `npm install @mui/material @emotion/react @emotion/styled`

## Getting Started
In the main project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.