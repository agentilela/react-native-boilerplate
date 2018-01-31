import initApp from 'containers/Init'
import KeyboardManager from 'react-native-keyboard-manager'
import { Sentry } from 'react-native-sentry'
import { Text, TextInput } from 'react-native'

// Disable Font Scaling
Text.defaultProps.allowFontScaling = false
TextInput.defaultProps.allowFontScaling = false

// Configure Sentry
Sentry
  .config
  // ADD SENTRY CONFIG!
  ()
  .install()

// Keyboard Manager
KeyboardManager.setEnable(true)
KeyboardManager.setEnableDebugging(false)
KeyboardManager.setEnableAutoToolbar(true)
KeyboardManager.setShouldResignOnTouchOutside(true)
KeyboardManager.setToolbarPreviousNextButtonEnable(true)
KeyboardManager.setShouldToolbarUsesTextFieldTintColor(true)
KeyboardManager.setShouldShowTextFieldPlaceholder(true)
KeyboardManager.setKeyboardDistanceFromTextField(50)
KeyboardManager.setToolbarDoneBarButtonItemText('Close')

// GO!
initApp()
