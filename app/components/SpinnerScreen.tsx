import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, LayoutChangeEvent, StyleSheet, View } from 'react-native'
import Colors from 'style/colors'

// Styles
const baseStyles = ({ width, height }: { height: number; width: number }) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.darkContainerRgba(0.8),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height,
      width,
      top: -55
    },
    flexContainer: {
      backgroundColor: Colors.darkContainerRgba(0.8),
      justifyContent: 'center',
      alignItems: 'center',
      height,
      width,
      flex: 1
    },
    lightBoxContainer: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: 100
    }
  })

// Types
export interface IBaseProps {
  navBarOpened?: boolean
  style?: {}
  inLightBox?: boolean
}
interface InjectedProps {
  navigator?: INavigator
}

@observer
class SpinnerScreen extends Component<IBaseProps & InjectedProps> {
  @observable screenDimensions: { width: number; height: number } = Dimensions.get('screen')

  @action
  handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    return (this.screenDimensions = { width, height })
  }

  render() {
    const { inLightBox, navBarOpened, style } = this.props
    const styles = baseStyles(this.screenDimensions)
    return (
      <View
        onLayout={this.handleLayout}
        pointerEvents="none"
        style={[
          navBarOpened
            ? styles.flexContainer
            : inLightBox ? styles.lightBoxContainer : styles.container,
          {},
          style
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

export default SpinnerScreen
