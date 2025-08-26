import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedWeek, setSelectedWeek] = useState('All');
  const [viewMode, setViewMode] = useState('graph'); // 'table' or 'graph'
  const [salesData, setSalesData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3000/api';

  const months = [
    { value: 'All', label: 'All Months' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const weeks = [
    { value: 'All', label: 'All Weeks' },
    { value: '1', label: 'Week 1 (Days 1-7)' },
    { value: '2', label: 'Week 2 (Days 8-14)' },
    { value: '3', label: 'Week 3 (Days 15-21)' },
    { value: '4', label: 'Week 4 (Days 22-End)' }
  ];

  // Fetch medicines list
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/medicines`);
        if (!response.ok) throw new Error('Failed to fetch medicines');
        const data = await response.json();
        setMedicines(data);
      } catch (err) {
        setError('Failed to load medicines list');
        console.error(err);
      }
    };

    fetchMedicines();
  }, []);

  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/recommendations`);
        if (!response.ok) throw new Error('Failed to fetch recommendations');
        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        console.error('Failed to load recommendations:', err);
      }
    };

    fetchRecommendations();
  }, []);

  // Fetch sales data when filters change
  useEffect(() => {
    const fetchSalesData = async () => {
      if (!selectedMedicine) return;

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          medicine: selectedMedicine,
          month: selectedMonth,
          week: selectedWeek
        });

        const response = await fetch(`${API_BASE_URL}/sales?${params}`);
        if (!response.ok) throw new Error('Failed to fetch sales data');

        const data = await response.json();
        setSalesData(data);
      } catch (err) {
        setError('Failed to load sales data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [selectedMedicine, selectedMonth, selectedWeek]);

  // Reset week when month changes to "All"
  useEffect(() => {
    if (selectedMonth === 'All') {
      setSelectedWeek('All');
    }
  }, [selectedMonth]);

  const formatChartData = () => {
    if (!salesData || !salesData.salesData) return [];

    return salesData.salesData.map(item => ({
      month: `2025-${item.month}`,
      sales: item.sales,
      monthName: months.find(m => m.value === item.month)?.label || item.month
    }));
  };

  const renderTable = () => {
    if (!salesData) return null;

    if (selectedMonth !== 'All' && salesData.dailyBreakdown && salesData.dailyBreakdown.length > 0) {
      // Show daily breakdown
      return (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Daily Sales Breakdown - {selectedMedicine} - {months.find(m => m.value === selectedMonth)?.label}
              {selectedWeek !== 'All' && ` - ${weeks.find(w => w.value === selectedWeek)?.label}`}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.dailyBreakdown.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Day {item.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.sales.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      // Show monthly breakdown
      return (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Monthly Sales - {selectedMedicine}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medicine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.salesData && salesData.salesData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {months.find(m => m.value === item.month)?.label || item.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {selectedMedicine}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.sales.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  const renderChart = () => {
    const chartData = formatChartData();

    if (chartData.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500">No data available for chart view</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sales Trend - {selectedMedicine}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="monthName"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [value.toFixed(2), 'Sales']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://placehold.co/1920x1080?text=Subtle+corporate+dashboard+background+with+soft+gradient+and+minimal+geometric+patterns"
          alt="Subtle corporate dashboard background with soft gradient and minimal geometric patterns showing a calm professional setting"
          className="w-full h-full object-cover opacity-20"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">PharmCast AI</h1>
            <p className="text-gray-600">Analyze medicine sales data for 2025</p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Medicine Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medicine</label>
                <select
                  value={selectedMedicine}
                  onChange={(e) => setSelectedMedicine(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {medicines.map(medicine => (
                    <option key={medicine} value={medicine}>{medicine}</option>
                  ))}
                </select>
              </div>

              {/* Month Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>

              {/* Week Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Week</label>
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  disabled={selectedMonth === 'All'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  {weeks.map(week => (
                    <option key={week.value} value={week.value}>{week.label}</option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
                <div className="flex rounded-md shadow-sm">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-2 text-sm font-medium rounded-l-md border ${viewMode === 'table'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode('graph')}
                    className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${viewMode === 'graph'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    Graph
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Loading Display */}
          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <p className="text-blue-800">Loading sales data...</p>
            </div>
          )}

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Data Display */}
            <div className="lg:col-span-2">
              {viewMode === 'table' ? renderTable() : renderChart()}
            </div>

            {/* Recommendations Panel */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Summary Stats */}
{salesData && (
  <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
    
    {/* Row 1 - Box 1 & Box 3 side by side */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Box 1 - Drug Name & Units */}
<div className="text-center p-4 bg-gray-50 rounded-lg">
  <h4 className="text-lg font-semibold text-gray-900 mb-3">Enter Drug & Units</h4>
  <div className="flex flex-col gap-3 items-center">
    <input
      type="text"
      id="drugInput"
      placeholder="Drug Name (e.g., N05B)"
      className="w-full border rounded-lg px-3 py-2"
    />
    <input
      type="number"
      id="unitInput"
      placeholder="Units"
      className="w-full border rounded-lg px-3 py-2"
    />

    {/* Submit Button */}
    <button
      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      onClick={() => {
        const drugName = document.getElementById("drugInput").value.trim().toUpperCase();
        const val = parseInt(document.getElementById("unitInput").value) || 0;

        // Demand reference table
        const demandMap = {
          "M01AB": "Medium",
          "M01AE": "Medium",
          "N02BA": "Medium",
          "N02BE": "Medium",
          "N05B": "High",
          "N05C": "Low",
          "R03": "Low",
          "R06": "Low",
        };

        let msg = "";

        if (!demandMap[drugName]) {
          msg = "Enter a correct drug name.";
        } else {
          const demandLevel = demandMap[drugName];
          if (demandLevel === "High") {
            msg = val < 100 
              ? "This is a high-demand drug, stock more to avoid shortages." 
              : "Good, you have enough stock for this high-demand drug.";
          } else if (demandLevel === "Medium") {
            msg = val > 200 
              ? "Stock is sufficient. Avoid overstocking." 
              : "Demand looks stable. Stocking level is fine.";
          } else if (demandLevel === "Low") {
            msg = val > 50 
              ? "This is a low-demand drug, reduce stock to avoid wastage." 
              : "Stock level looks fine for this low-demand drug.";
          }
        }
        document.getElementById("unitsResult").innerText = msg;
      }}
    >
      Enter
    </button>
  </div>
  <p id="unitsResult" className="mt-3 text-sm text-gray-700"></p>
</div>

      {/* Box 3 - Demand Level */}
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Demand Levels (8 Drugs)</h4>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1">Drug</th>
              <th className="border border-gray-300 px-2 py-1">High / Medium / Low</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-300 px-2 py-1">M01AB</td><td className="border border-gray-300 px-2 py-1">Medium Demand</td></tr>
            <tr><td className="border border-gray-300 px-2 py-1">M01AE</td><td className="border border-gray-300 px-2 py-1">Medium Demand</td></tr>
            <tr><td className="border border-gray-300 px-2 py-1">N02BA</td><td className="border border-gray-300 px-2 py-1">Medium Demand</td></tr>
            <tr><td className="border border-gray-300 px-2 py-1">N02BE</td><td className="border border-gray-300 px-2 py-1">Medium Demand</td></tr>
            <tr><td className="border border-gray-300 px-2 py-1">N05B</td><td className="border border-gray-300 px-2 py-1">High Demand</td></tr>
            <tr><td className="border border-gray-300 px-2 py-1">N05C</td><td className="border border-gray-300 px-2 py-1">Low Demand</td></tr>
            <tr><td className="border border-gray-300 px-2 py-1">R03</td><td className="border border-gray-300 px-2 py-1">Low Demand</td></tr>
            <tr><td className="border border-gray-300 px-2 py-1">R06</td><td className="border border-gray-300 px-2 py-1">Low Demand</td></tr>
          </tbody>
        </table>
      </div>

    </div>

    {/* Row 2 - Box 2 Full Width */}
    <div className="mt-6 text-center p-4 bg-gray-50 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-900 mb-3">Seasonality Insights (8 Drugs)</h4>
      <table className="w-full border-collapse border border-gray-300 text-sm text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-2 py-1 w-24">Drug</th>
            <th className="border border-gray-300 px-2 py-1">Insight Text Pack (Category-Wise)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold text-base">M01AB</td>
            <td className="border border-gray-300 px-2 py-1 text-base">
              Painkiller demand spikes during festival seasons due to injuries and physical strain. 
              Winter months show higher usage, linked to joint pain and arthritis.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold text-base">M01AE</td>
            <td className="border border-gray-300 px-2 py-1 text-base">
              Stable year-round sales with a slight rise in colder months as rheumatic pain worsens. 
              Low volatility makes it a safe category for consistent stocking.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold text-base">N02BA</td>
            <td className="border border-gray-300 px-2 py-1 text-base">
              Sales rise during flu season for fever and body pain relief. 
              Short bursts of demand observed during seasonal viral outbreaks.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold text-base">N02BE</td>
            <td className="border border-gray-300 px-2 py-1 text-base">
              Paracetamol demand shows sharp peaks during viral fever and monsoon outbreaks. 
              Sudden spikes often linked to dengue, malaria, or seasonal fevers.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold text-base">N05B</td>
            <td className="border border-gray-300 px-2 py-1 text-base">
              Gradual upward demand post-exam seasons or stressful periods. 
              Consistent sales with increases during uncertain or high-stress times.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold text-base">N05C</td>
            <td className="border border-gray-300 px-2 py-1 text-base">
              Sales increase in summer months due to insomnia caused by heat. 
              Steady background demand but prone to stockouts if understocked.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold text-base">R03</td>
            <td className="border border-gray-300 px-2 py-1 text-base">
              Clear seasonal peaks in winter and monsoon from flu and respiratory infections. 
              Predictable cycles make it ideal for pre-season stocking strategies.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold text-base">R06</td>
            <td className="border border-gray-300 px-2 py-1 text-base">
              Strong demand during spring due to pollen and seasonal allergies. 
              Secondary rise in monsoon months linked to fungal and skin allergies.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}




        </div>
      </div>
    </div>
  );
};

export default Dashboard;
