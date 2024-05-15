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
import { PATH_DASHBOARD } from '../../routes/paths';
// auth

// _mock_
import {
  _userAbout,
  _userFeeds,
  _userFriends,
  _userGallery,
  _userFollowers,
} from '../../_mock/arrays';
// layouts
import DashboardLayout from '../../layouts/dashboard';
import MainLayout from '../../layouts/main';
// components

import { LessonCoverPage } from '../../sections/lessonCoverPage'
// ----------------------------------------------------------------------

// UserProfilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// LessonCover.getLayout = (page) => <MainLayout> {page} </MainLayout>;
// ----------------------------------------------------------------------



LessonCover.propTypes = {
  business: PropTypes.object,
  client: PropTypes.string
}

export default function LessonCover({ lesson }) {
  console.log('LessonCover lesson', lesson)
  return <LessonCoverPage lesson={lesson}/>
}

export const getServerSideProps = async (prop) => {

mongoose.connect(process.env.MONGODB_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const lessonSchema = {
  professorId: {
    type: Schema.Types.ObjectId
},
businessId: {
    type: Schema.Types.ObjectId
},
languageLevel: {
    type: String
},
learningLanguage: {
    type: String
},
creator: {
    type: String
},
type: {
    type: String
},
status: {
    type: String,
    default: 'ready'
},
internalTitle: {
    type: String
},
title: {
    type: String
},
description: {
    type: String
},
totalExercises: {
    type: Number,
    default: 0
},
sharingId: {
    type: String,
    default: () => shortId()
},
accessPermission: {
    type: String,
    default: 'with_id'
},
active: {
    type: Boolean,
    default: true
},

}

let Lesson;

const newSchema = new Schema(lessonSchema, { timestamps: true })
try {
  // Trying to get the existing model to avoid OverwriteModelError
  Lesson = mongoose.model("Lesson");
} catch {
  Lesson = mongoose.model("Lesson", newSchema);
}
  // const client = prop.req.headers.host ? prop.req.headers.host.split('.')[0] : null
  // console.log('client ===========>', client)
  console.log('pageslug ===========>', prop?.params?.lessonid)
  const sharingId = prop?.params?.lessonid
  if (!sharingId) {
    return {
      props: {
        lesson: null,
      },
    }
  }

 

const lesson = await Lesson.findOne({ sharingId })
if (!lesson) {
  return {
    props: {
      lesson: null,
    },
  }
}
  
  try {
    
  return {
    props: {
      lesson: JSON.parse(JSON.stringify(lesson)),
    },
  }
  } catch (error) {
    console.log('lesson error', error)
    return {
      props: {
        lesson: null
      },
    }
  }
}
