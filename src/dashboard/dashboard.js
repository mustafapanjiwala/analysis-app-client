// src/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VictoryChart,
  VictoryLine,
  VictoryBar,
  VictoryPie,
  VictoryLabel,
  VictoryTooltip,
  VictoryLegend,
  VictoryArea,
} from "victory";

import "./dashboard.css";

const Dashboard = () => {
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    // Fetch chart data from the backend API
    const fetchCharts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/charts");
        setCharts(response.data);
      } catch (error) {
        console.error("Error fetching charts:", error);
      }
    };

    fetchCharts();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Analysis App</h1>

      {/* Render different types of charts */}
      <div className="chart-container">
        {charts.map((chart) => (
          <div className="chart-item" key={chart._id}>
            <h2 className="chart-title">{chart.name} :-</h2>

            {/* Example of a line chart */}
            <div className="chart-box">
              <VictoryChart width={450} height={300}>
                <VictoryLine
                  data={chart.data}
                  x="label"
                  y="value"
                  style={{
                    data: { stroke: "#47C4B6" },
                    labels: { fontSize: 10 },
                  }}
                  labelComponent={<VictoryLabel dy={-10} />}
                />
              </VictoryChart>
            </div>
            <h4 className="chart-title-2">Line Chart</h4>

            {/* Example of a bar chart */}
            <div className="chart-box">
              <VictoryChart width={500} height={400}>
                <VictoryBar
                  data={chart.data}
                  x="label"
                  y="value"
                  style={{
                    data: { fill: "#47C4B6" },
                    labels: { fontSize: 10 },
                  }}
                  labelComponent={<VictoryLabel dy={-10} />}
                />
              </VictoryChart>
            </div>
            <h4 className="chart-title-2" style={{ textAlign: "center" }}>
              Bar Graph
            </h4>

            {/* Example of a pie chart */}
            <div className="chart-box">
              <VictoryChart width={600} height={500}>
                <VictoryPie
                  data={chart.data.map(({ label, value }) => ({
                    x: label,
                    y: value,
                  }))}
                  colorScale={[
                    "#47C4B6",
                    "#FF9933",
                    "#FFCC00",
                    "#9933FF",
                    "#66CC66",
                  ]}
                  labelComponent={<VictoryTooltip />}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`} // Adjust label rendering here
                  style={{
                    labels: { fontSize: 12 }, // Adjust the font size of labels here
                  }}
                />
                <VictoryLegend
                  x={150}
                  y={170}
                  orientation="horizontal"
                  data={chart.data.map(({ label }) => ({ name: label }))}
                />
              </VictoryChart>
            </div>
            <h4 className="chart-title-2" style={{ textAlign: "center" }}>
              Pie Chart
            </h4>
            {/* Example of a custom chart */}
            <div className="chart-box">
              <VictoryChart width={500} height={400}>
                <VictoryLine
                  data={chart.data}
                  x="label"
                  y="value"
                  style={{
                    data: { stroke: "#47C4B6" },
                    labels: { fontSize: 12 }, // Adjust the font size of labels here
                  }}
                  labelComponent={<VictoryLabel dy={-10} />}
                />
                <VictoryBar
                  data={chart.data}
                  x="label"
                  y="value"
                  style={{
                    data: { fill: "#FF9933" },
                    labels: { fontSize: 12 }, // Adjust the font size of labels here
                  }}
                  labelComponent={<VictoryLabel dy={-10} />}
                />
              </VictoryChart>
            </div>
            <h4 className="chart-title-2" style={{ textAlign: "center" }}>
              Custom Graph
            </h4>
            {/* Example of an area hover chart */}
            <div className="chart-box">
              <VictoryChart width={500} height={400}>
                <VictoryArea
                  data={chart.data}
                  x="label"
                  y="value"
                  style={{
                    data: { fill: "#47C4B6", fillOpacity: 0.6 },
                    labels: { fontSize: 12 }, // Adjust the font size of labels here
                  }}
                  labelComponent={<VictoryLabel dy={-10} />}
                />
              </VictoryChart>
            </div>
            <h4 className="chart-title-2" style={{ textAlign: "center" }}>
              Area Hover Graph
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
