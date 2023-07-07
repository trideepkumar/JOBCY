import { Grid } from '@mui/material'
import React from 'react'
import Navbar from '../../Appbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import PostCard from '../PostManagement/PostCard'
function PostManagement() {
  return (
    <div>
        <Navbar/>
        <Grid>
        <Grid>
         <Sidebar/>
        </Grid>
        <Grid>
            <PostCard/>
        </Grid>
        </Grid>

    </div>
  )
}

export default PostManagement