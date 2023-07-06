import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

function JobPostchart({ data }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const chartData = {
        labels: Object.keys(data.jobs || {}),
        datasets: [
          {
            label: "Jobs",
            data: Object.values(data.jobs || {}),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Posts",
            data: Object.values(data.posts || {}),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };

      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        animation: {
          duration: 1000, 
          easing: "easeOutQuart",
        },
      };

      const newChartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: chartData,
        options: chartOptions,
      });

      chartInstanceRef.current = newChartInstance;
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
}

export default JobPostchart;
