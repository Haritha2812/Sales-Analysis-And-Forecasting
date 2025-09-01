# PharmaCast AI
A forecasting solution designed to improve sales predictions for small-scale pharmacies where traditional methods fail.

## About
Small-scale distributors and pharmacies often face unreliable sales forecasting, as naive methods that work for large systems produce inconsistent results at smaller scales.  

PharmaCast AI applies advanced forecasting techniques to improve accuracy, enabling better decision-making for:  
- Resource planning  
- ROI estimation  
- Strategic growth  

## Features
- Comparative evaluation of multiple forecasting models:
  - ARIMA, SARIMA, Holt-Winters, Prophet, LSTM, XGBoost, etc.  
- Sales data analysis:
  - Identify trends  
  - Understand seasonality  
  - Detect cycles  
  - Check stationarity  
- Model performance validation using error metrics:
  - MSE, MAE, MAPE  
- Sales forecasting for the next 3 months  
- Actionable recommendations for sales and marketing strategies  
- User-friendly interface providing business insights  

## Tech Stack
- Environment Setup: Jupyter Notebook, Conda Environment  
- Python Libraries: Pandas, NumPy, Matplotlib, Seaborn, Statsmodels, Keras, Sklearn, Prophet, SQLAlchemy  
- Machine Learning and Forecasting Models: ARIMA, SARIMA, Holt-Winters, Prophet, LSTM, XGBoost  
- User Interface: Frontend (React, Tailwind CSS), Backend (Node.js), Database (PostgreSQL)  
- Recommendation System: Hugging Face LLM model (GPT-2)  

---

## Installation

### Install VS Code
- Download and install [Visual Studio Code](https://code.visualstudio.com/).  
- In VS Code, install the following extensions:
  - Intellicode  
  - Python  
  - Jupyter  

### Install Anaconda
- Download and install [Anaconda](https://www.anaconda.com/products/distribution) for your operating system.  

### Create Conda Environment
Open your terminal (Anaconda Prompt or VS Code terminal) and run:

```bash
# Create a new environment named 'hack_env' with Python 3.10
conda create -n hack_env python=3.10

# Activate the environment
conda activate hack_env
````

Deactivate your Conda environment when you are done working for the day:

```bash
conda deactivate
```

### Use Notebooks in VS Code

* Create a new notebook (.ipynb).
* Click the kernel selector (top-right).
* Choose: Jupyter kernel >> Python 3.10 (hack\_env).
* If you do not see it immediately, close VS Code and open it again.

### Clone the Repository in VS Code

```bash
git clone https://github.com/Haritha2812/Sales-Analysis-And-Forecasting.git
```

### PharmaCast AI Model

* Open the folder `PharmaCast AI Model`.

#### Install Libraries

```bash
conda install pandas numpy matplotlib seaborn statsmodels keras scikit-learn prophet sqlalchemy
```

#### Run the Notebook Cells

* Suggestion: Do not run the data preprocessing notebook as this may create multiple intermediate CSV files, causing confusion.
* Cleaned data is already provided in the input folder. Use this to run the `data_analysis`, `model_evaluation`, and `data_forecasting` notebooks.

### Database Setup

* Install PostgreSQL.
* Provide a password and configure it in pgAdmin.

### Loading Data into Database

* First method: Load the given CSV files into the database after creating a database `pharmecast_db` and defining the table structure in pgAdmin.
* Second method: Connect your database to VS Code by providing your username, password, and port number in the PharmaCast AI Model folder, then run the notebook file `load_to_db`.

### PharmaCast AI Dashboard

#### Connect Database to Server

* Open the backend folder and locate the `.env` file.
* Set your database name, username, password, and port number.

#### Run Backend Server

```bash
cd backend
npm install
node server.js
```

* Check the health status for the database connection at `localhost:3001`.

#### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

* Visit `localhost:5173` for the dashboard.

---

## Future Scope

* Deploy the application on a cloud service.
* Create a timed pipeline that runs the application every quarter.
* Automate the movement of predicted data to historical data and update the last 3 months of actual data into historical records.
