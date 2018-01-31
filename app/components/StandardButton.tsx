import TouchableOpacity from 'components/TouchableOpacity'
import React from 'react'
import { StyleSheet, Text, TouchableOpacityProperties, View } from 'react-native'
import BorderRadius from 'style/borderRadius'
import Colors from 'style/colors'
import Shadows from 'style/shadows'
import Typeography from 'style/typography'

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...BorderRadius.br10.full,
    ...Shadows.white10.bottom
  },
  textContainer: {
    alignItems: 'center',
    flex: 0,
    justifyContent: 'center'
  },
  text: {
    flex: 0,
    textAlign: 'center',
    ...Typeography.body
  }
})

// Types
interface IProps extends TouchableOpacityProperties {
  borderColor?: string
  color: string
  label: string
  style?: {}
  textColor?: string
  onPress?(param?: {}): void
}

const StandardButton = ({
  borderColor,
  color,
  label,
  onPress,
  style,
  textColor,
  ...rest
}: IProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.container,
      {
        backgroundColor: color,
        borderWidth: borderColor ? 1 : 0,
        borderColor,
        paddingVertical: borderColor ? 14 : 15
      },
      style
    ]}
    {...rest}
  >
    <View style={styles.textContainer}>
      <Text style={[styles.text, { color: textColor || Colors.titleLight }]}>{label}</Text>
    </View>
  </TouchableOpacity>
)

export default StandardButton
