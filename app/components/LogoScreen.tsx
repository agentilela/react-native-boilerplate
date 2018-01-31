import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Dimensions, Image, LayoutChangeEvent, StyleSheet, View } from 'react-native'
import BorderRadius from 'style/borderRadius'
import Colors from 'style/colors'

// Styles
const baseStyles = ({ width, height }: { height: number; width: number }) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.container,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height,
      width,
      top: -55
    },
    flexContainer: {
      backgroundColor: Colors.container,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },
    logo: {
      maxWidth: '50%',
      flex: 1,
      backgroundColor: 'transparent',
      ...BorderRadius.br30.full
    }
  })

// Types
interface IProps {
  navBarOpened?: boolean
  style?: {}
}

@observer
class SpinnerScreen extends Component<IProps> {
  @observable screenDimensions: { width: number; height: number } = Dimensions.get('screen')

  @action
  handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    return (this.screenDimensions = { width, height })
  }

  render() {
    const { navBarOpened, style } = this.props
    const styles = baseStyles(this.screenDimensions)
    return (
      <View
        onLayout={this.handleLayout}
        pointerEvents="none"
        style={[navBarOpened ? styles.flexContainer : styles.container, {}, style]}
      >
        <Image resizeMode="contain" source={require('assets/logo.png')} style={styles.logo} />
      </View>
    )
  }
}

export default SpinnerScreen
