import StandardButton from 'components/StandardButton'
import { inject } from 'mobx-react'
import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import Color from 'style/colors'
import Spacing from 'style/spacing'
import Typography from 'style/typography'

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.s6
  },
  text: {
    flex: 0,
    ...Typography.body
  }
})

// Types
export type IBaseProps = undefined

interface InjectedProps {
  authStore: IAuthStore
}

type IProps = IBaseProps & InjectedProps

// Component
class LoginSelectMethod extends PureComponent<IProps> {
  render(): JSX.Element | null {
    const { authStore } = this.props
    return (
      <View style={styles.container}>
        <StandardButton onPress={authStore.loginGoogle} color={Color.primary} label="Login!" />
      </View>
    )
  }
}
export default inject(({ store: { authStore } }) => ({ authStore }))(LoginSelectMethod)
