import { action, observable, ObservableMap, useStrict } from 'mobx'
import { ImageURISource } from 'react-native'
import IIcon from 'react-native-vector-icons/Ionicons'
import Color from 'style/colors'

useStrict(true)

// Helpers
const iconDefaults = {
  size: 32,
  font: IIcon,
  color: Color.dark10
}

const iconConfig = [
  {
    ...iconDefaults,
    size: 40,
    icon: 'ios-add-outline',
    name: 'add'
  },
  {
    ...iconDefaults,
    icon: 'ios-arrow-back-outline',
    name: 'back'
  },
  {
    ...iconDefaults,
    icon: 'ios-map-outline',
    name: 'map'
  },
  {
    ...iconDefaults,
    icon: 'ios-arrow-forward-outline',
    name: 'next'
  },
  {
    ...iconDefaults,
    icon: 'ios-football-outline',
    name: 'soccer'
  },
  {
    ...iconDefaults,
    size: 38,
    icon: 'ios-person-outline',
    name: 'person'
  },
  {
    ...iconDefaults,
    icon: 'ios-settings-outline',
    name: 'settings'
  },
  {
    ...iconDefaults,
    icon: 'ios-list-box-outline',
    name: 'list'
  },
  {
    ...iconDefaults,
    icon: 'ios-clipboard-outline',
    name: 'clipboard'
  },
  {
    ...iconDefaults,
    icon: 'ios-checkbox-outline',
    name: 'checkbox'
  },
  {
    ...iconDefaults,
    icon: 'ios-paper-outline',
    name: 'paper'
  },
  {
    ...iconDefaults,
    icon: 'ios-football',
    name: 'soccer-active'
  },
  {
    ...iconDefaults,
    icon: 'ios-map',
    name: 'map-active'
  },
  {
    ...iconDefaults,
    size: 38,
    icon: 'ios-person',
    name: 'person-active'
  },
  {
    ...iconDefaults,
    icon: 'ios-settings',
    name: 'settings-active'
  },
  {
    ...iconDefaults,
    icon: 'ios-list-box',
    name: 'list-active'
  },
  {
    ...iconDefaults,
    icon: 'ios-clipboard',
    name: 'clipboard-active'
  },
  {
    ...iconDefaults,
    icon: 'ios-checkbox',
    name: 'checkbox-active'
  },
  {
    ...iconDefaults,
    icon: 'ios-paper',
    name: 'paper-active'
  },

  {
    ...iconDefaults,
    icon: 'ios-trash',
    name: 'trash'
  }
]

export default class IconStoreStatic {
  @observable iconsLoaded: boolean = false
  @observable iconMap: ObservableMap<ImageURISource> = observable.map({})

  // Internal Actions
  buildIcons = async () => {
    await Promise.all(
      iconConfig.map(async ({ font, icon, size, color, name }) => {
        const src: ImageURISource = await font.getImageSource(icon, size, color)
        return this.setIcon(name, src)
      })
    )
    this.setIconsLoaded(true)
  }

  // Internal Actions
  @action setIcon = async (name: string, src: ImageURISource) => this.iconMap.set(name, src)

  @action setIconsLoaded = (loaded: boolean) => (this.iconsLoaded = loaded)
}

declare global {
  type IconStore = IconStoreStatic
  type IconMap = ObservableMap<ImageURISource>
}
