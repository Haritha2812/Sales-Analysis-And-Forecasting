// Hardcoded values for now (will replace with real data later)
document.getElementById('total-sales').innerText = "15,000 units";
document.getElementById('total-revenue').innerText = "$120,000";

document.getElementById('top-drug').innerText = "Analgesics";
document.getElementById('low-drug').innerText = "Sedatives";

document.getElementById('sales-change').innerText = "+12%";


// ====== Forecasted Data Toggle ======
const fcToggle = document.getElementById('forecast-toggle');
const fcChart = document.getElementById('forecast-chart');
const fcTable = document.getElementById('forecast-table');
const fcLabel = document.getElementById('forecast-toggle-label');

// Set default to Chart View
fcToggle.checked = false; // unchecked = chart
fcChart.style.display = "block";
fcTable.style.display = "none";
fcLabel.innerText = "Chart View";

// Toggle functionality
fcToggle.addEventListener('change', () => {
    if(fcToggle.checked){
        fcChart.style.display = "none";
        fcTable.style.display = "table";
        fcLabel.innerText = "Table View";
    } else {
        fcChart.style.display = "block";
        fcTable.style.display = "none";
        fcLabel.innerText = "Chart View";
    }
});

// ====== Historical Data Toggle ======
const histToggle = document.getElementById('historical-toggle');
const histChart = document.getElementById('historical-chart');
const histTable = document.getElementById('historical-table');
const histLabel = document.getElementById('historical-toggle-label');

// Set default to Chart View
histToggle.checked = false; // unchecked = chart
histChart.style.display = "block";
histTable.style.display = "none";
histLabel.innerText = "Chart View";

// Toggle functionality
histToggle.addEventListener('change', () => {
    if(histToggle.checked){
        histChart.style.display = "none";
        histTable.style.display = "table";
        histLabel.innerText = "Table View";
    } else {
        histChart.style.display = "block";
        histTable.style.display = "none";
        histLabel.innerText = "Chart View";
    }
});



// ===== Forecasted Data Chart with All Categories (Hardcoded) =====
const labels = [
    "20-10-2019","27-10-2019","03-11-2019","10-11-2019","17-11-2019",
    "24-11-2019","01-12-2019","08-12-2019","15-12-2019","22-12-2019","29-12-2019","05-01-2020"
  ];
  
  const datasets = [
    {
      label: "Antiinflammatory",
      data: [23.2988,21.2772,22.0949,22.3693,20.3838,19.2851,22.4579,23.2723,22.8108,23.6098,24.1089,19.7893],
      borderColor: "hsl(0, 70%, 50%)",
      fill: false,
      tension: 0.2
    },
    {
      label: "Antirheumatic",
      data: [18.7250,18.8474,18.0972,17.1607,17.4737,18.7139,15.7307,18.4849,17.8587,18.0496,18.1022,20.0899],
      borderColor: "hsl(40, 70%, 50%)",
      fill: false,
      tension: 0.2
    },
    {
      label: "Analgesics",
      data: [143.0917,141.1871,141.2627,141.2597,141.2598,141.2598,141.2598,141.2598,141.2598,141.2598,141.2598,141.2598],
      borderColor: "hsl(80, 70%, 50%)",
      fill: false,
      tension: 0.2
    },
    {
      label: "Antipyretics",
      data: [52.0640,50.1092,52.4956,51.4655,49.1862,52.1062,52.1189,52.4024,52.4069,52.5399,53.0048,53.1344],
      borderColor: "hsl(120, 70%, 50%)",
      fill: false,
      tension: 0.2
    },
    {
      label: "Psycholeptics",
      data: [2.6928,5.7998,6.6790,3.0837,4.1157,3.7937,3.2453,4.0277,4.6889,3.9999,4.9809,5.0289],
      borderColor: "hsl(160, 70%, 50%)",
      fill: false,
      tension: 0.2
    },
    {
      label: "Sedatives",
      data: [24.5864,25.1631,25.1895,25.1907,25.1908,25.1908,25.1908,25.1908,25.1908,25.1908,25.1908,25.1908],
      borderColor: "hsl(200, 70%, 50%)",
      fill: false,
      tension: 0.2
    },
    {
      label: "Bronchodilators",
      data: [11.6733,11.1688,9.8933,10.9616,11.7665,12.5977,13.1102,13.8318,14.4616,15.0348,15.5644,16.0962],
      borderColor: "hsl(240, 70%, 50%)",
      fill: false,
      tension: 0.2
    },
    {
      label: "Antihistamines",
      data: [37.2922,36.7982,37.6446,37.3101,37.4553,36.4235,36.3081,36.2341,36.0681,35.9202,35.7445,35.6602],
      borderColor: "hsl(280, 70%, 50%)",
      fill: false,
      tension: 0.2
    }
  ];
  
  const ctx = document.getElementById('forecast-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Forecasted Drug Sales (Next 3 Months)' },
        legend: { position: 'bottom' }
      },
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { title: { display: true, text: 'Sales' } }
      }
    }
  });
  