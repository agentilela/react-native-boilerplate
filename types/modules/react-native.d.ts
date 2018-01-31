// tslint:disable

import ReactNative, { VirtualizedListProperties } from 'react-native'
declare module 'react-native' {
  import { Component, ComponentClass } from 'react'
  export const VirtualizedList: ComponentType<VirtualizedListProperties<{}>>
  export const ImageBackground: Component<{}, {}>
  interface SectionListProperties extends SectionListProperties {
    getItemLayout?(
      data: ItemT[] | null,
      index: number
    ): { length: number; offset: number; index: number }
    windowSize?: number
  }
  interface SectionListStatic<SectionT> extends SectionListStatic<SectionT> {
    getScrollResponder(): ComponentClass<ScrollViewProps>
    scrollToLocation(params: {
      animated: boolean
      sectionIndex?: number
      itemIndex: number
      viewOffset?: number
    }): void
  }
}
