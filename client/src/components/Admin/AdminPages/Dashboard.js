import React, { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js";
import "chart.js/auto";
import { Box, Button, Grid, Typography } from "@mui/material";
import JobPostchart from "./JobPostchart";

function Dashboard() {
  const [usersData, setUsersData] = useState({});
  const [organizationsData, setOrganizationsData] = useState({})
  const [chartData, setChartData] = useState(null);;

  useEffect(() => {
    fetch("http://localhost:3000/admin/total-users-by-month")
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((error) => console.error(error));

    fetch("http://localhost:3000/admin/total-organisation-by-month")
      .then((response) => response.json())
      .then((data) => {
        setOrganizationsData(data);
        console.log(organizationsData);
      })
      .catch((error) => console.error(error));
  }, []);

  const usersChartContainer = useRef(null);
  const usersChartInstance = useRef(null);

  const organizationsChartContainer = useRef(null);
  const organizationsChartInstance = useRef(null);

  useEffect(() => {
    if (Object.keys(usersData).length > 0) {
      renderUsersChart();
    }
  }, [usersData]);

  useEffect(() => {
    if (Object.keys(organizationsData).length > 0) {
      renderOrganizationsChart();
    }
  }, [organizationsData]);

  const renderUsersChart = () => {
    if (usersChartInstance.current) {
      usersChartInstance.current.destroy();
    }

    const months = Object.keys(usersData);
    const counts = Object.values(usersData);

    const ctx = usersChartContainer.current.getContext("2d");

    usersChartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Total Users",
            data: counts,
            backgroundColor: "#ff9452",
            borderColor: "white",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const renderOrganizationsChart = () => {
    if (organizationsChartInstance.current) {
      organizationsChartInstance.current.destroy();
    }

    const months = Object.keys(organizationsData);
    const counts = Object.values(organizationsData);

    const ctx = organizationsChartContainer.current.getContext("2d");

    organizationsChartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Total Organizations",
            data: counts,
            backgroundColor: "#62a8ea",
            borderColor: "white",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };


  const handleDownloadOrganisationPdf = () => {
    fetch('http://localhost:3000/admin/generate-organisation-pdf')
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Failed to generate PDF report');
        }
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'organizations_report.pdf';
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };



//useEffect for job & posts data fetching
  useEffect(() => {
    fetch('http://localhost:3000/admin/total-posts-jobs')
      .then(response => response.json())
      .then(data => {
        console.log("here")
        console.log(data.jobs)
        console.log(data.posts)
        const formattedData = {
          jobs: data.jobs,
          posts: data.posts
        };
        setChartData(formattedData);
        console.log("formatted data")
        console.log(formattedData)
      })
      .catch(error => console.log(error));
  }, []);
  

  useEffect(()=>{
    console.log("Hello"+chartData)
  })

  return (
    <div>
      <Grid sx={{ display: "flex", gap: "10rem", margin: "4rem" }}>
        <Grid sx={{ width: "40vw", height: "50vh" }}>
          <h2 style={{ textAlign: "center" }}>
            Total Users Chart (Monthly wise)
          </h2>
          <canvas ref={usersChartContainer}></canvas>
        </Grid>
        <Grid sx={{ width: "40vw", height: "50vh" }}>
          <h2 style={{ textAlign: "center" }}>
            Total Organizations Chart (Monthly wise)
          </h2>
          <canvas ref={organizationsChartContainer}></canvas>
        </Grid>
      </Grid>



      <Grid sx={{ display: "flex", gap: "10rem", margin: "4rem" }}>
      <Grid sx={{ width: "40vw", height: "50vh" }}>
      {chartData && <JobPostchart data={chartData} />}
      </Grid>
      <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',alignContent:'center',height:'17rem',width:'38rem',gap: "5rem",border:'0.5px solid grey'}}>
        <Box sx={{display:'grid'}}>
        <Typography variant="subtitle1" sx={{marginBottom:'2rem'}} gutterBottom>Jobposts & Appliedcandidates</Typography>
        <Button sx={{border:'0.5px solid #ff6e14'}}>Download pdf Here</Button>
        </Box>
        <Box sx={{display:'grid'}}>
        <Typography variant="subtitle1" sx={{marginBottom:'2rem'}} gutterBottom>Total organisation Details</Typography>
        <Button sx={{border:'0.5px solid #ff6e14'}} onClick={handleDownloadOrganisationPdf}>Download pdf Here</Button>
        </Box>
      </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
