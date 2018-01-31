#!/bin/sh


##########################################
# ENVIRONMENT CONFIG
##########################################
PROJECT_NAME=""
PROJECT_DIR=$(pwd)

# Create Golden Dir
mkdir -p "${PROJECT_DIR}/buildUtils/golden"

##########################################
# IOS
##########################################

if [ -d "${PROJECT_DIR}/ios" ]
then
    cp -fv "${PROJECT_DIR}/ios/${PROJECT_NAME}.xcodeproj/project.pbxproj" "${PROJECT_DIR}/buildUtils/golden/project.pbxproj"
fi