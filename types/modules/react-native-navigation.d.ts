declare module 'react-native-navigation' {
  interface NavigatorStyle {
    drawUnderNavBar?: boolean
    drawUnderTabBar?: boolean
    navBarBackgroundColor?: string
    navBarBlur?: boolean
    navBarButtonColor?: string
    navBarHidden?: boolean
    navBarHideOnScroll?: boolean
    navBarNoBorder?: boolean
    navBarTextColor?: string
    navBarTranslucent?: boolean
    navBarTransparent?: boolean
    screenBackgroundColor?: string
    statusBarBlur?: boolean
    statusBarHidden?: boolean
    statusBarHideWithNavBar?: boolean
    statusBarTextColorScheme?: string
    tabBarHidden?: boolean
  }

  interface NavigatorButtons {
    leftButtons?: Array<NavigatorButton<keyof INavScreens>>
    rightButtons?: Array<NavigatorButton<keyof INavScreens>>
  }

  interface NavigatorButton<T extends keyof INavScreens> {
    buttonColor?: string // Set color for the button (can also be used in setButtons function to set different button style programatically)
    buttonFontSize?: number // Set font size for the button (can also be used in setButtons function to set different button style programatically)
    buttonFontWeight?: string // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
    component?: string // if you want a custom button
    disableIconTint?: boolean // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
    disabled?: boolean // optional, used to disable the button (appears faded and doesn't interact)
    icon?: {} // if you want an image button
    id: string // id of the button which will pass to your press event handler. See the section bellow for Android specific button ids
    passProps?: string // Object that will be passed as props to custom components (optional)
    testID?: string // if you have e2e tests, use this to find your button
    title?: string // if you want a textual button
  }

  interface Drawer {
    left?: {
      screen: string
    }
    right?: {
      screen: string
    }
    disableOpenGesture?: boolean
  }

  interface TabBasedApp {
    tabs: TabScreen[]
    tabsStyle?: {
      tabBarButtonColor?: string
      tabBarSelectedButtonColor?: string
      tabBarBackgroundColor?: string
      initialTabIndex?: number
    }
    drawer?: Drawer
    passProps?: Object
    animationType?: string
  }

  interface SingleScreenApp<T extends keyof INavScreens> {
    drawer?: Drawer
    animationType?: string
    screen: {
      screen: T
      title?: string
      navigatorStyle?: NavigatorStyle
      navigatorButtons?: NavigatorButtons
    }
    passProps: INavScreens[T]
  }

  interface TabScreen {
    overrideBackPress?: boolean
    label?: string
    screen: keyof INavScreens
    icon?: {}
    selectedIcon?: {}
    title?: string
    navigatorStyle?: NavigatorStyle
    navigatorButtons?: NavigatorButtons
  }

  interface Screen<T> extends INavScreen<T> {
    title?: string
    navigatorStyle?: NavigatorStyle
    navigatorButtons?: NavigatorButtons
  }

  interface ModalScreen<T> extends Screen<T> {
    animated?: boolean
    animationType?: string
    hideStatusBarAndroid?: boolean
    orientation?: 'landscape' | 'portrait'
  }

  interface PushedScreen<T> extends ModalScreen<T> {
    backButtonTitle?: string
    backButtonHidden?: boolean
  }

  interface LightBox<T> extends INavScreen<T> {
    style?: {
      backgroundBlur: string
      backgroundColor?: string
      tapBackgroundToDismiss?: boolean
    }
  }

  interface InAppNotification<T> extends INavScreen<T> {
    autoDismissTimerSec: number
    animation: {
      animated: boolean
      duration: number
      damping: number
      type: string
    }
  }

  class ScreenVisibilityListener {
    constructor(props: {
      didAppear: (
        appearProps: {
          screen: string
          startTime: number
          endTime: number
          commandType: string
        }
      ) => void
    })
    register: () => void
    unregister: () => void
  }

  class Navigation {
    static registerComponent(
      screenID: string,
      generator: () => void,
      store?: Redux.Store,
      provider?: {}
    ): {}

    static registerScreen(screenId: string, generator: () => void): {}

    static startTabBasedApp(params: TabBasedApp): {}

    static startSingleScreenApp<T extends keyof INavScreens>(params: SingleScreenApp<T>): {}

    static showModal<T extends keyof INavScreens>(params: ModalScreen<T>): {}

    static dismissModal(params?: { animationType?: string }): {}

    static dismissMeasurementFlow(params?: { animationType?: string }): {}

    static dismissAllModals(params?: { animationType?: string }): {}

    static showLightBox<T extends keyof INavScreens>(params: LightBox<T>): {}

    static dismissLightBox(): {}

    static lockToPortrait(): {}

    static lockToLandscape(): {}

    static lockToSensorLandscape(): {}

    static unlockAllOrientations(): {}

    static showMaterialDialog(options: {}): {}
    static handleDeepLink(options: { link: string; payload?: string })
  }

  interface Navigator {
    dismissAllModals: (options?: { animationType?: string }) => void
    dismissInAppNotification: () => void
    dismissLightBox: () => void
    dismissMeasurementFlow: () => void
    dismissModal: (options?: { animationType?: string }) => void
    handleDeepLink: (options: { link: string }) => void
    pop: (options?: { animated?: boolean }) => void
    popToRoot: (options?: { animated?: boolean }) => void
    push: <T extends keyof INavScreens>(options: PushedScreen<T>) => void
    resetTo: <T extends keyof INavScreens>(options: ModalScreen<T>) => void
    setButtons: (options: NavigatorButtons & { animated?: boolean }) => void
    setOnNavigatorEvent: (callback: (event: { id: string; type: string }) => void) => void
    setStyle: (style: NavigatorStyle) => void
    setTabBadge: (options: { tabIndex?: number; badge?: number }) => void
    setTitle: (options: { title: string }) => void
    showInAppNotification: <T extends keyof INavScreens>(options: InAppNotification<T>) => void
    showLightBox: <T extends keyof INavScreens>(options: LightBox<T>) => void
    showModal: <T extends keyof INavScreens>(options: ModalScreen<T>) => void
    switchToTab: (options: { tabIndex: number }) => void
    toggleDrawer: (options: { side: string; animated?: boolean; to?: string }) => void
    toggleNavBar: (options: { to: string; animated?: boolean }) => void
    toggleTabs: (options: { to: string; animated?: boolean }) => void
  }
}
