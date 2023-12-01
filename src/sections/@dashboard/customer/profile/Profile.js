import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
// @mui
import { Grid, Stack, Card, Box, Typography, Button, TablePagination } from '@mui/material';
//
import { _analyticPost, _analyticOrderTimeline, _analyticTraffic } from '../../../../_mock';

import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';
import MessagesCardAction from './MessagesCardAction';
import AnalyticsOrderTimeline from './AnalyticsOrderTimeline'

import api from '../../../../utils/axios'


// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile({ myProfile, posts, customerDetail }) {
  const [page, setPage] = useState(0)
  const [activitylog, setActivitylog] = useState([])
  const rowsPerPage = 5

  function slicePage(data, pageNumber = 0, rowsPerPageNumber = 1) {
    return data.slice(pageNumber * rowsPerPageNumber, pageNumber * rowsPerPageNumber + rowsPerPageNumber)
  }
  const [pagedData, setPagedData] = useState(slicePage(activitylog, page, rowsPerPage))

  function onChangePage(event, newPage) {
    setPage(newPage)
  }

async function fetchData() {
  try {
    const response = await api.get(`/v1/activitylog?c=${customerDetail?._id}`)
  console.log('activitylog response', response.data)
  setActivitylog(response.data)
  } catch(error) {
    console.log(error)
  }
}

  useEffect(() => {
    // fetchData()
    setPagedData(slicePage(activitylog, page, rowsPerPage))
  }, [page, activitylog])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo customerDetail={customerDetail} profile={myProfile} />
          <ProfileAbout customerDetail={customerDetail} profile={myProfile} />
          <ProfileSocialInfo customerDetail={customerDetail} profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>

          <MessagesCardAction />
          <ProfilePostInput />
          {/* <Typography variant="h4" sx={{ mb: 5}}>Timeline de atividades</Typography> */}
          <AnalyticsOrderTimeline title="Timeline" subheader="Atividades recentes como atualizações e ações relacionadas a este deal" list={pagedData} />
           <Box>
            <TablePagination
              component="div"
              count={activitylog.length}
              page={page}
              onPageChange={onChangePage}
              rowsPerPageOptions={[]}
              rowsPerPage={rowsPerPage}
              // onPageChange={onChangePage}
              // onRowsPerPageChange={onChangeRowsPerPage}
              // count={dataFiltered.length}
              // rowsPerPage={rowsPerPage}
              // page={page}
              // onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
          {/* {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))} */}
        </Stack>
      </Grid>
    </Grid>
  );
}
