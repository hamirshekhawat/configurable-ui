#!/bin/bash
# Start the backend server in the background
cd niceform_be
npm start &
# Navigate to the frontend directory
cd ..
cd niceform
# Delay the frontend server start by 2 seconds
sleep 2
npm start &