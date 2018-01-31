import LogoScreen from 'components/LogoScreen'
import React, { PureComponent } from 'react'
import codePush from 'react-native-code-push'
import { Navigation } from 'react-native-navigation'
import { Sentry } from 'react-native-sentry'
import { registerScreens } from 'screens'
import getRootStore from 'stores/root'
import {projectName} from 'configs/constants'

// Types
export type IProps = undefined

// Component
class BaseApp extends PureComponent {
  async componentWillMount() {
    const update = await codePush.getUpdateMetadata()
    if (update) {
      Sentry.setVersion(`${update.appVersion}-codepush:${update.label}`)
    }
    return this.initRootStore()
  }

  initRootStore = async () => {
    // Get root store
    const rootStore = getRootStore()

    // Build App Icons
    await rootStore.iconStore.buildIcons()

    // Register app screens
    registerScreens(rootStore)

    // Check auth - this will configure the final navigator
    return rootStore.authStore.checkAuth()
  }

  render(): JSX.Element | null {
    return <LogoScreen navBarOpened />
  }
}

const App = process.env.NODE_ENV !== 'development' ? codePush()(BaseApp) : BaseApp

const initApp = () => {
  // ADD PROJECT NAME
  Navigation.registerComponent(`${projectName}.Init`, () => App)
  Navigation.startSingleScreenApp({
    animationType: 'fade',
    screen: {
      screen: `${projectName}.Init`,
      navigatorStyle: {
        navBarHidden: true,
        navBarTransparent: true,
        navBarTranslucent: true,
        drawUnderNavBar: true,
        navBarBlur: false,
        navBarNoBorder: true,
        drawUnderTabBar: true
      }
    },
    passProps: undefined
  })
}

export default initApp
