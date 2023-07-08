import React from 'react'
import Navbar from '../../Appbar/Navbar'
import { Grid } from '@mui/material'
import Sidebar from '../Sidebar/Sidebar'
import JobCard from '../JobManagement/JobCard'

function JobManagement() {
  return (
    <div>
     <Navbar/>
     <Grid>
      <Grid>
      <Sidebar/>
      </Grid>
      <Grid sx={{marginTop:'5rem', marginLeft:'4rem'}}>
        <JobCard/>
      </Grid>
     </Grid>
    </div>
  )
}

export default JobManagement