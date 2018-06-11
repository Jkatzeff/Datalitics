# Datalitics

## Overview
A data visualization webapp. Various visualizations making use of different data representation techniques. Visualizations include map projects, demographic breakdown, mass shooting statistics, and time changes.

## How to run
For a local host instance:
1. have npm, and node installed.
2. $ npm install
3. $ node server.js
4. open your browser and go to localhost:3000

## Current visualizations
* 3 Country comparison - This visualization displays three major developed countries side by side, Australia, USA and, France. This visualization is based on geographical locations, color changes and, time. The page is by default tied to a dataset on deaths per capita for the three countries. The page has the ability to switch between datasets in the datasets folder. 
* Grouping visualization - This visualization makes use of size, color, and group organization. The visualziation makes use of tree formated CSVs. It turns the tree CSV into a visualization by grouping values of the same parent into one color together and setting the size of each based on the numerical value they contain. Any single root CSV can be implemented in this visaulzation if it has one of its parameters named "value". The visualization is by default projecting a breakdown of mass shooting in the USA state by state.
* California - This visualization is an example of color, size, time and, geography. The visualzation includes a map projection of california split up by counties. The visualization is tied to a dataset of demographic breakdown of each California county over the span of a few decades. Upon selecting a county, an animation comes up with differnet color circles representative of the size of each different demographic.
* World - This visualization is an example of geography and time. It is tied to population growth over time in all countries. This was a prototype for the main three country visualization.
* USA - This visualization is an example of geographic locations within the US, size, and time. It is tied to a dataset containing times, locations and, victim count of mass shooting in the US. It has the ability to traverse through the time variable automatically as well as interactively through a slider.

## Sponsor
Professor Richard Jullig

## Team Members
* Diego Garcia
* Jacob Katzeff
* Brian Liu
* Justin Tse

## Technologies
* JavaScript 
* D3
* python
* HTML
* CSS

