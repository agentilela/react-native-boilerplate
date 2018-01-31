import debounce from 'lodash.debounce'
import React, { PureComponent } from 'react'
import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProperties } from 'react-native'

class DebouncedTouchableOpacity extends PureComponent<TouchableOpacityProperties> {
  constructor(props: TouchableOpacityProperties) {
    super(props)
    this.handlePress = debounce(this.handlePress, 500, {
      leading: true,
      trailing: false
    })
  }

  handlePress = (event: GestureResponderEvent) => {
    const { onPress } = this.props
    if (onPress) {
      return onPress(event)
    }
  }

  render() {
    const { onPress, ...rest } = this.props
    return <TouchableOpacity onPress={this.handlePress} {...rest} />
  }
}

export default DebouncedTouchableOpacity
