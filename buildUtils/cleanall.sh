#!/bin/sh

##########################################
# ENVIRONMENT CONFIG
##########################################
PROJECT_NAME=""
PROJECT_DIR=$(pwd)

# Space-seperated list of packages to react-native link
PACKAGES_TO_LINK="react-native-navigation react-native-keyboard-manager"

if [ -z "${HOME}" ]; then
    echo "Home Dir not set!"
    exit 1
fi

# Check run environment
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    *)          machine=UNKNOWN;;
esac

##########################################
# IOS BACKUP
##########################################

if [ -d "${PROJECT_DIR}/ios" ] & [ ! -d "${PROJECT_DIR}/buildUtils/ios_bak" ]
then
    # Create IOS Backup Dir
    mkdir -p "${PROJECT_DIR}/buildUtils/ios_bak"
    mkdir -p "${PROJECT_DIR}/buildUtils/golden"
    
    # Backup IOS Files
    cp -fv "${PROJECT_DIR}/ios/podfile" "${PROJECT_DIR}/buildUtils/ios_bak/podfile"
    cp -fv "${PROJECT_DIR}/ios/sentry.properties" "${PROJECT_DIR}/buildUtils/ios_bak/sentry.properties"
    cp -rfv "${PROJECT_DIR}/ios/${PROJECT_NAME}" "${PROJECT_DIR}/buildUtils/ios_bak/${PROJECT_NAME}"
    cp -fv "${PROJECT_DIR}/ios/${PROJECT_NAME}.xcodeproj/project.pbxproj" "${PROJECT_DIR}/buildUtils/golden/project.pbxproj.$(date +%s)"
fi


##########################################
# CLEAN EVERYTHING
##########################################

# Stop any running packagers
pkill -f react-native

# Clean IOS files
killall Simulator
killall Xcode
rm -rf "${HOME}/Library/Developer/Xcode/DerivedData/*"
rm -rf "${HOME}/Library/Developer/CoreSimulator/Devices" # Fully clear simulator data
rm -rf "${HOME}/Library/Caches/CocoaPods"
rm -rf "${PROJECT_DIR}/ios"
"${PROJECT_DIR}/buildUtils/resetSimulators.exp"

# Clean Android files
rm -rf "${PROJECT_DIR}/android"

# Clean RN files
rm -rf "${HOME}/.rncache"
rm -rf "${HOME}/.babel.json"
rm -rf "${PROJECT_DIR}/node_modules"
rm -rf "${PROJECT_DIR}/yarn.lock"
rm -rf "${TMPDIR:?}/*"
watchman watch-del-all
watchman watch-del-all

# Clear caches
yarn cache clean
npm cache verify

# Install npm packages
yarn

# Initialize RN project files
"${PROJECT_DIR}/buildUtils/upgrade.exp"

# Reinit IOS Project
if [ -d "${PROJECT_DIR}/buildUtils/ios_bak" ]
then
    rm -rfv "${PROJECT_DIR}/ios/${PROJECT_NAME}"
    cp -fv "${PROJECT_DIR}/buildUtils/ios_bak/podfile" "${PROJECT_DIR}/ios/podfile"
    cp -fv "${PROJECT_DIR}/buildUtils/ios_bak/sentry.properties" "${PROJECT_DIR}/ios/sentry.properties"
    cp -rfv "${PROJECT_DIR}/buildUtils/ios_bak/${PROJECT_NAME}" "${PROJECT_DIR}/ios/${PROJECT_NAME}"
    rm -rf "${PROJECT_DIR}/buildUtils/ios_bak"
    
    if [ -f "${PROJECT_DIR}/buildUtils/golden/project.pbxproj" ]
    then
        cp -fv "${PROJECT_DIR}/buildUtils/golden/project.pbxproj" "${PROJECT_DIR}/ios/${PROJECT_NAME}.xcodeproj/project.pbxproj"
    fi
    
fi

# Setup CocoaPods
if [ ${machine} = "Mac" ] & [ -f "${PROJECT_DIR}/ios/podfile" ]; then
    cd "${PROJECT_DIR}/ios" || return
    pod repo update
    pod install --repo-update
    cd "${PROJECT_DIR}" || return
fi

# Link packages
if [ ! -z $PACKAGES_TO_LINK ]
then
    react-native link $PACKAGES_TO_LINK
fi