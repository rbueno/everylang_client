import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect, useRef, Component } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import axios from 'axios'
import mongoose, { Schema } from 'mongoose'


import Head from 'next/head';
import { Wrapper } from "@googlemaps/react-wrapper";
import {Loader} from '@googlemaps/js-api-loader';
import { Map, GoogleApiWrapper } from 'google-maps-react';
// @mui
import { Tab, Card, Tabs, Container, Box, Chip, Stack, Avatar, Rating, Button, CardHeader, Typography } from '@mui/material';

import { Data } from '@react-google-maps/api';
import { m, useScroll, useSpring } from 'framer-motion';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// auth

// _mock_
import {
  _userAbout,
  _userFeeds,
  _userFriends,
  _userGallery,
  _userFollowers,
} from '../_mock/arrays';
// layouts
import DashboardLayout from '../layouts/dashboard';
import MainLayout from '../layouts/main';
// components
import Iconify from '../components/iconify';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';

// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../sections/@dashboard/user/profile';

// import { Home } from '@mui/icons-material';
import NotFound from './404'
import api from '../utils/axios'


// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeForDesigner,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
  HomeService01,
  HomeServiceL02,
  HomeServiceR2
} from '../sections/home';

import { MyPage } from '../sections/myPage'
import { useSettingsContext } from '../components/settings/SettingsContext';
// ----------------------------------------------------------------------

// UserProfilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

LandingPage.getLayout = (page) => <MainLayout> {page} </MainLayout>;
// ----------------------------------------------------------------------


const appBrandColor = {
  youtube: { main: '#FF0000' },
  telegram: { main: '#229ED9' }
}

const eventEntry = ({ component, eventType, data }) => {


  const payload = {
    createdAt: new Date,
    context: { userAgent: '' },
    data: component,
    eventType,
    bid: data.businessId,
    pid: data._id,
    componentId: component?.componentId
  }
  
  fetch('/api/evententry', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}


export function LandingPage() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });



  return (
    <>
      <Head>
        <title> Alcance a fluência no inglês com conversar diárias e dinâmicas via WhatsApp | Everylang</title>
        <meta name="description" content="Alcance a fluência no inglês com conversar diárias e dinâmicas via WhatsApp" />
        <link href="https://www.everylang.ai" rel="canonical" />

        <meta property="og:title" content="Alcance a fluência no inglês com conversar diárias e dinâmicas via WhatsApp." />
        <meta property="og:url" content="https://www.everylang.ai" />
        <meta property="og:description" content="Alcance a fluência no inglês com conversar diárias e dinâmicas via WhatsApp" />
        <meta property="og:image" content="https://www.everylang.ai/assets/images/home/linkhaus_okahub_01_captura_gestao_leads.jpg" />
      </Head>

      

      <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        {/* <HomeMinimal /> */}

        <HomeLookingFor />
        <HomeService01 />

        <HomeServiceL02 />
        <HomeServiceR2 />
        {/* <HomeHugePackElements /> */}

        {/* <HomeForDesigner /> */}

        {/* <HomeDarkMode /> */}

        {/* <HomeColorPresets /> */}

        {/* <HomeCleanInterfaces /> */}

        {/* <HomePricingPlans />

        

        <HomeAdvertisement /> */}
      </Box>
    </>
  );
}

Home.propTypes = {
  business: PropTypes.object,
  client: PropTypes.string
}

export default function Home({ business, client }) {
  // const { push } = useRouter()
  // useEffect(() => {
  //   push('/auth/login')
  // })
  if (business.pageSlug) return <MyPage business={business} />
  if (business.iswww) return <LandingPage />
  return <LandingPage />
}

export const getServerSideProps = async (prop) => {

mongoose.connect(process.env.MONGODB_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const bioPageSchema = {
    businessId: {
        type: Schema.Types.ObjectId,
        ref: 'Business'
    },
    pageSlug: { type: String, require: true, index: { unique: true } },
    address: { type: String },
    description: { type: String },
    name: { type: String },
    themeColor: { type: String },
    meta: { type: Object },
    header: { type: Object },
    sections: [Object],
    active: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
    s3BucketDir: { type: String },
    avatarURL: { type: String }

}

let BioPage;

const newSchema = new Schema(bioPageSchema, { timestamps: true })
try {
  // Trying to get the existing model to avoid OverwriteModelError
  BioPage = mongoose.model("BioPage");
} catch {
    BioPage = mongoose.model("BioPage", newSchema);
}
  // const client = prop.req.headers.host ? prop.req.headers.host.split('.')[0] : null
  // console.log('client ===========>', client)
  console.log('pageslug ===========>', prop?.params?.pageslug)
  const client = prop?.params?.pageslug
  if (client === 'www') {
    return {
      props: {
        business:{ iswww: true },
        client
      },
    }
  }

 

const myPage = await BioPage.findOne({ pageSlug: client })
if (!myPage) {
  return {
    props: {
      business:{ iswww: true },
      client
    },
  }
}
  
  try {
    
  return {
    props: {
      business: JSON.parse(JSON.stringify(myPage)),
      client
    },
  }
  } catch (error) {
    console.log('caiu no erro', error)
    return {
      props: {
        business: { iswww: false },
        client
      },
    }
  }
}
