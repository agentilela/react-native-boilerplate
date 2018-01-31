import { defaultNavStyle } from 'configs/constants'
import { action, computed, observable, useStrict } from 'mobx'
import { Navigation } from 'react-native-navigation'
import Colors from 'style/colors'
import {projectName} from 'configs/constants'

useStrict(true)

export default class NavStore {
  // Observables
  @observable activeNav?: INavigators
  @observable nextNav?: INavigators
  rootStore: IRootStore

  // Static
  lastNav?: INavigators

  constructor({ rootStore }: { rootStore: IRootStore }) {
    this.rootStore = rootStore
  }

  // Computed Values
  @computed
  get iconsLoaded(): boolean {
    return !!this.rootStore.iconStore.iconsLoaded
  }

  // Internal Actions

  @action
  setActiveNav = (activeNav: INavigators) => {
    this.activeNav = activeNav
    this.initializeNavigator(activeNav)
  }

  @action
  setNextNav = (nextNav: INavigators) => {
    this.nextNav = nextNav
    this.tryToChangeNav(nextNav)
  }

  @action setRootStore = (rootStore: IRootStore) => (this.rootStore = rootStore)

  setLastNav = (lastNav?: INavigators) => (this.lastNav = lastNav)

  public handleAuthStateChanged = (authenticated: boolean) => {
    if (!authenticated) {
      return this.setNextNav('login')
    }
    if (!this.activeNav || this.activeNav === 'login') {
      return this.setNextNav('home')
    }
  }

  initializeNavigator = (activeNav: INavigators) => {
    if (activeNav === 'login') {
      return Navigation.startSingleScreenApp({
        animationType: 'fade',
        screen: {
          screen: `${projectName}.LoginSelectMethod`,
          navigatorStyle: {
            navBarHidden: true,
            navBarTransparent: true,
            navBarTranslucent: true,
            drawUnderNavBar: true,
            navBarBlur: false,
            navBarNoBorder: true,
            drawUnderTabBar: true,
            navBarTextColor: Colors.titleLight
          }
        },
        passProps: undefined
      })
    }
    if (activeNav === 'home') {
      if (!this.iconsLoaded) {
        return
      }
      return Navigation.startTabBasedApp({
        tabs: [
          {
            label: 'Tab1',
            screen: `${projectName}.Tab1`,
            icon: this.rootStore.iconStore.iconMap.get('paper'),
            selectedIcon: this.rootStore.iconStore.iconMap.get('paper-active'),
            navigatorStyle: defaultNavStyle,
            title: 'Tab1'
          },
          {
            label: 'Tab2',
            screen: `${projectName}.Tab2`,
            icon: this.rootStore.iconStore.iconMap.get('paper'),
            selectedIcon: this.rootStore.iconStore.iconMap.get('paper-active'),
            navigatorStyle: defaultNavStyle,
            title: 'Tab2'
          },
          {
            label: 'Tab3',
            screen: `${projectName}.Tab3`,
            title: 'Tab3',
            icon: this.rootStore.iconStore.iconMap.get('paper'),
            selectedIcon: this.rootStore.iconStore.iconMap.get('paper-active'),
            navigatorStyle: defaultNavStyle
          }
        ],
        tabsStyle: {
          tabBarSelectedButtonColor: Colors.primary
        },
        animationType: this.lastNav === 'login' ? 'slide-down' : 'fade'
      })
    }
  }

  tryToChangeNav = (nextNav: INavigators) => {
    switch (nextNav) {
      case 'login':
        break
      case 'home':
        if (!this.iconsLoaded) {
          return
        }
        break
      default:
        return
    }

    this.setLastNav(this.activeNav)
    return this.setActiveNav(nextNav)
  }
}

declare global {
  type INavStore = NavStore
  type INavigators = 'login' | 'home'
}
