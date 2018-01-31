declare module '@google/maps' {
  interface IAPIResult<T> {
    asPromise(): Promise<IAPIResponse<T>>
    cancel(): void
    finally(cb: (r: IAPIResponse<T>) => void): IAPIResult<T>
  }
  interface IAPIResponse<T> {
    headers: {}
    json: T
    status: number
  }
  interface IClientParams {
    Promise?: PromiseConstructor
  }

  type ILatLng = { lat: number; lng: number } | { latitude: number; longitude: number }

  interface IGeocodeParams {
    address?: string
    components?: {}
    bounds?: {
      southwest: ILatLng
      northeast: ILatLng
    }
    region?: string
    language?: string
  }
  interface IStandardParams extends IClientParams {
    key: string
  }

  interface IPremiumParams extends IClientParams {
    clientId: string
    clientSecret: string
  }

  interface MapsClient {
    geocode(p: IGeocodeParams): IAPIResult<{}>
  }

  const createClient: (p: IStandardParams | IPremiumParams) => MapsClient
}
