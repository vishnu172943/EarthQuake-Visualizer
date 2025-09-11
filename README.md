 🌍 Global Earthquake Visualizer
This is a web application that provides a real-time visualization of global earthquake activity. It fetches the latest seismic data from the U.S. Geological Survey (USGS) and presents it in an interactive and user-friendly interface. You can explore recent earthquakes on a world map, view them as a sorted list, and filter them based on your interests.

✨ Features
This application comes with a range of features to make exploring earthquake data easy and insightful:

Real-Time Data: Fetches up-to-the-minute earthquake data from the USGS.

Interactive Map View: Displays earthquakes on an interactive map with markers sized and colored by magnitude.

Detailed List View: Shows a sortable list of earthquakes with key details at a glance.

Time Range Filtering: Easily switch between viewing earthquakes from the last hour, day, week, or month.

Magnitude and Depth Filters: Fine-tune the data you see by setting a minimum magnitude and filtering by the earthquake's depth (shallow, intermediate, or deep).

Tectonic Plates Overlay: Toggle a layer on the map to see the Earth's tectonic plates, providing context for why earthquakes occur in certain regions.

User Location: The app can use your location to show your position on the map and calculate the distance to each earthquake.

Insightful Statistics: View key stats like the total number of earthquakes, average magnitude, and maximum magnitude for your filtered results.

🛠️ Tech Stack
This project was built using modern web technologies:

Frontend Framework: React

Build Tool: Vite

Mapping Library: Leaflet with React Leaflet

Styling: Plain CSS with a modern, responsive design.

🚀 Getting Started
To get this project up and running on your local machine, follow these simple steps.

Prerequisites
You'll need to have Node.js (version 18 or higher) and npm installed on your computer.

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer
Install the dependencies:
Run this command in the project's root directory to install all the necessary packages.

Bash

npm install
Start the development server:
This command will launch the application in your web browser.

Bash

npm run dev
The application should now be running at http://localhost:5173.

📖 How to Use
Once the application is running, you can:

Use the Time Range buttons to select how far back you want to see data (Hour, Day, Week, or Month).

Switch between the Map and List views using the toggle buttons.

Use the Min. Magnitude slider to hide smaller, less significant earthquakes.

Click the depth buttons to focus on earthquakes occurring at different depths in the Earth's crust.

On the map, click on any earthquake marker to see a popup with detailed information.

📊 Data Source
All earthquake data is sourced from the USGS Earthquake Hazards Program. Tectonic plate boundary data is also publicly sourced.