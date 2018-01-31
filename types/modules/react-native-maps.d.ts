declare module 'react-native-maps' {
  import { ComponentType } from 'react'
  import { ViewProperties } from 'react-native'

  interface ILocation {
    latitude: number
    longitude: number
  }

  interface IPosition extends ILocation {
    latitudeDelta?: number
    longitudeDelta?: number
  }

  interface IMapViewProps extends ViewProperties {
    provider?: string
    initialRegion?: IPosition
    region: IPosition
    cacheEnabled?: boolean
    customMapStyle?: {}
    onRegionChange?(p: IPosition): void
  }

  interface IMarkerProps extends ViewProperties {
    image?: string
    coordinate: ILocation
  }

  interface IMapViewChildren {
    Marker: ComponentType<IMarkerProps>
  }

  type IMapView = IMapViewChildren & ComponentType<IMapViewProps>

  const MapView: IMapView
  export const PROVIDER_GOOGLE: string
  export default MapView
}
