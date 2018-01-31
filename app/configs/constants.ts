import { Dimensions, NativeModules, Platform } from 'react-native'
import { NavigatorStyle } from 'react-native-navigation'
import Colors from '../style/colors'
const { StatusBarManager } = NativeModules
import { PROJECT_NAME } from 'react-native-dotenv'

// ----------------------------------------------------------------
// Navigation
// ----------------------------------------------------------------
export const defaultNavStyle: NavigatorStyle = {
  navBarButtonColor: Colors.primary,
  drawUnderTabBar: false,
  statusBarHideWithNavBar: true
}

// ----------------------------------------------------------------
// Misc
// ----------------------------------------------------------------
export const isAndroid = Platform.OS === 'android'
export const isIOS = Platform.OS === 'ios'

export const getScreenHeight = () => Dimensions.get('window').height
export const getScreenWidth = () => Dimensions.get('window').width

export const statusBarHeight = isIOS ? 20 : StatusBarManager.HEIGHT
export const isSmallScreen = () => {
  const screenWidth = getScreenWidth()
  return isIOS ? screenWidth <= 320 : screenWidth <= 360
}

export const projectName = PROJECT_NAME