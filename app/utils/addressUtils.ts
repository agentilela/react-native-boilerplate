import { googleAPIKey } from 'configs/apiConfigs'

interface IAddressComponent {
  long_name: string
  short_name: string
  types: addressType[]
}

type addressType =
  | 'street_number'
  | 'route'
  | 'locality'
  | 'administrative_area_level_1'
  | 'postal_code'

interface IGeometry {
  location: {
    lat: number
    lng: number
  }
}

interface IGoogleMapResult {
  description: string
  id: string
  matched_substrings: Array<{ length: number; offset: number }>
  place_id: string
  reference: string
  structured_formatting: {
    main_text: string
    main_text_matched_substrings: Array<{ length: number; offset: number }>
    secondary_text: string
  }
  terms: Array<{ length: number; offset: number }>
  types: string[]
}

interface INearbySearchParams {
  latitude: number
  longitude: number
  type?: string
}

interface INearbySearchResult {
  geometry: {
    location: {
      lat: number
      lng: number
    }
    viewport: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
  }
  icon: string
  id: string
  name: string
  place_id: string
  reference: string
  scope: string
  types: string[]
  vicinity: string
}

const autocompleteUrl = (query: string) =>
  `https://maps.googleapis.com/maps/api/place/autocomplete/json?input='${encodeURIComponent(
    query
  )}'&key=${googleAPIKey}`

const placeDetailsUrl = (placeid: string) =>
  `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${googleAPIKey}`

const nearbySearchUrl = ({ latitude, longitude, type }: INearbySearchParams) =>
  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}${
    type ? `&type=${type}` : ''
  }&rankby=distance&key=${googleAPIKey}`

// Field Mappings
// street_number => addressLine1 pt 1 (e.g. 123)
// route => addressLine1 pt 2 (Broadway)
// localitypolitical => city
// administrative_area_level_1political => state
// postal_code => zipcode

export const autocompleteAddress = async (addressLine1: string, maxLength: number) => {
  const queryUrl = autocompleteUrl(addressLine1)
  // tslint:disable-next-line:await-promise
  const res = await fetch(queryUrl)
  const {
    predictions,
    status
  }: { status: string; predictions: IGoogleMapResult[] } = await res.json()
  return status === 'OK'
    ? predictions.map(
        ({
          place_id,
          structured_formatting: { main_text, main_text_matched_substrings, secondary_text }
        }) => ({
          id: place_id,
          main_text,
          main_text_matched_length: main_text_matched_substrings[0].length,
          secondary_text
        })
      )
    : []
}

const findComponent = (
  addressComponents: IAddressComponent[],
  typeName: addressType,
  shortName?: boolean
) => {
  const addressComponent = addressComponents.find(ac => ac.types.includes(typeName))

  if (!addressComponent) {
    return undefined
  }
  return shortName ? addressComponent.short_name : addressComponent.long_name
}

const buildAddress = (addressComponents: IAddressComponent[]) => {
  const streetNumber = findComponent(addressComponents, 'street_number')
  const streetName = findComponent(addressComponents, 'route')
  const addressCity = findComponent(addressComponents, 'locality')
  const addressState = findComponent(addressComponents, 'administrative_area_level_1', true)
  const addressZipcode = findComponent(addressComponents, 'postal_code')
  const addressLine1 =
    streetNumber || streetName
      ? (streetNumber ? `${streetNumber} ` : '') + (streetName || '')
      : undefined

  return {
    addressLine1,
    addressCity,
    addressState,
    addressZipcode
  }
}

export const getPlaceDetails = async (placeid: string) => {
  const queryUrl = placeDetailsUrl(placeid)
  const res = await fetch(queryUrl)
  const {
    result
  }: {
    result: {
      address_components: IAddressComponent[]
      geometry: IGeometry
    }
  } = await res.json()
  if (!result) {
    return Promise.resolve()
  }
  const { address_components, geometry } = result
  const address = buildAddress(address_components)
  const { lat, lng } = geometry.location
  return { ...address, addressLat: lat, addressLng: lng }
}

export const searchNearby = async (params: INearbySearchParams) => {
  const queryUrl = nearbySearchUrl(params)
  const res = await fetch(queryUrl)
  const {
    results
  }: {
    results: INearbySearchResult[]
  } = await res.json()
  if (!results) {
    return Promise.resolve()
  }
  return results
}
