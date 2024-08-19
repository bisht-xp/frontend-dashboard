<p align="center">
<img src="https://github.com/user-attachments/assets/30395056-7c72-47be-8ef3-a890234a05fd">
</img>
</p>

  ## Live Project
  

 https://frontend-dashboard-taupe.vercel.app/
  
## Assignment creating contact form, shows the chart and map of the covid-19 cases.
  
## Demo

https://github.com/user-attachments/assets/e4568af4-ddbc-495e-a488-358df38a4ae9

## Run Locally

Clone the project

```bash
  git clone https://github.com/bisht-xp/frontend-dashboard.git
```

Go to the project directory

```bash
  cd frontend-dashboard
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```


## Tech Stack (Frontend)
- React
- React Router DOM v6
- react-hot-toast

***State Management:***
- Redux-toolkit
- React-Query

***Chart and Maps:***
- rechats.js
- Leaflet for maps
- react-leaflet

## Data Sources

- **COVID-19 Historical Data for Charts**: The application uses the endpoint `[https://disease.sh/v3/covid-19/historical/all?lastdays=all](https://disease.sh/v3/covid-19/historical/all?lastdays=all)` to fetch historical COVID-19 data. This data is used to populate charts that display the progression of cases over time.
  
- **COVID-19 Country Data for Map**: The application uses the endpoint `[https://disease.sh/v3/covid-19/countries](https://disease.sh/v3/covid-19/countries)` to fetch current COVID-19 data by country. This data is used to display information on the map, showing the impact of the pandemic across different regions.

## Features
- **Zod for Form Validation**: Ensures that all user inputs are validated against defined schemas, providing robust form handling and error reporting.
- **Toastify for Messaging**: Implements toast notifications for user-friendly, real-time feedback on form submissions and other actions within the app.
- **Lazy Loading**: Optimizes performance by loading components only when they are needed, improving the initial load time of the application.
- **Error Handling**: Comprehensive error handling across the app, ensuring that any issues are caught and presented to the user in a clear and understandable way.
- **Responsive Design**: Fully responsive UI that works seamlessly across all devices, providing a consistent user experience on desktop, tablet, and mobile.
- **Component Reusability**: The application is built with reusable components, making the codebase more maintainable and reducing redundancy.

## Future Improvements

- **Enhanced Chart Data Handling**: Improve the way data is managed for the x-axis and y-axis in charts, allowing for better accuracy and flexibility. Additionally, enhance the tooltip functionality for a more informative and user-friendly experience.
- **Dynamic Map Boundaries**: Implement a feature to dynamically adjust the max bounds of the map based on the data displayed, ensuring that the map view is always optimal.
- **Local State Persistence**: Integrate Redux Persist to store state values locally, allowing for a more seamless user experience by maintaining state across sessions.

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bishtkamal)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/bisht_xp)


