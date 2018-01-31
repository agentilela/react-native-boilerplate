const hexToRGB = (hex: string, alpha?: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return alpha !== undefined ? `rgba(${r},${g},${b},${alpha})` : `rgb(${r},${g},${b})`
}

// Color Theme

const wrapper = '#FAFAFA'
const wrapperRgba = (alpha: number) => hexToRGB(wrapper, alpha)
const container = '#FFFFFF'
const containerRgba = (alpha: number) => hexToRGB(container, alpha)
const darkWrapper = '#303030'
const darkContainer = '#424242'
const container2 = hexToRGB(darkContainer, 0.05)
const darkContainerRgba = (alpha: number) => hexToRGB(darkContainer, alpha)

// Text Colors
const text = '#443e3b'
const title = hexToRGB(text, 0.87)
const subtitle1 = hexToRGB(text, 0.54)
const subtitle2 = hexToRGB(text, 0.38)
const lightText = '#FFFFFF'
const titleLight = hexToRGB(lightText, 1)
const subtitle1Light = hexToRGB(lightText, 0.7)
const subtitle2Light = hexToRGB(lightText, 0.5)

const border = hexToRGB(text, 0.12)
const inactive = subtitle2
const borderLight = hexToRGB(lightText, 0.12)
const inactiveLight = subtitle2Light

const icon = '#443e3b'
const activeIcon = hexToRGB(icon, 0.67)
const inactiveIcon = hexToRGB(icon, 0.34)
const iconLight = '#FFFFFF'
const activeIconLight = hexToRGB(iconLight, 1)
const inactiveIconLight = hexToRGB(iconLight, 1)
// Misc
const accent = '#000'
const primary = '#000'
const primaryLight = '#000'
const primaryDark = '#000'
const primaryRgba = (alpha: number) => hexToRGB(primary, alpha)
const success = '#55ff82'
const error = '#EB3C2E'
const errorRgba = (alpha: number) => hexToRGB(error, alpha)

const google = '#F73E29'

const Colors = {
  ISN,
  accent,
  activeIcon,
  activeIconLight,
  border,
  borderLight,
  container,
  container2,
  containerRgba,
  darkContainer,
  darkContainerRgba,
  darkWrapper,
  error,
  errorRgba,
  google,
  inactive,
  inactiveIcon,
  inactiveIconLight,
  inactiveLight,
  primary,
  primaryDark,
  primaryLight,
  primaryRgba,
  subtitle1,
  subtitle1Light,
  subtitle2,
  subtitle2Light,
  success,
  title,
  titleLight,
  wrapper,
  wrapperRgba,

  // ------------------------------------------
  // WIX COLORS
  // ------------------------------------------

  // DARKS
  dark10: '#20303C',
  dark20: '#43515C',
  dark30: '#66737C',
  dark40: '#858F96',
  dark50: '#A3ABB0',
  dark60: '#C2C7CB',
  dark70: '#E0E3E5',
  dark80: '#F2F4F5',
  // BLUES
  blue10: '#3182C8',
  blue20: '#4196E0',
  blue30: '#459FED',
  blue40: '#57a8ef',
  blue50: '#8fc5f4',
  blue60: '#b5d9f8',
  blue70: '#daecfb',
  blue80: '#ecf5fd',

  // CYANS
  cyan10: '#00AAAF',
  cyan20: '#32BABC',
  cyan30: '#3CC7C5',
  cyan40: '#64D4D2',
  cyan50: '#8BDFDD',
  cyan60: '#B1E9E9',
  cyan70: '#D8F4F4',
  cyan80: '#EBF9F9',
  // GREENS
  green10: '#00A65F',
  green20: '#32B76C',
  green30: '#65C888',
  green40: '#84D3A0',
  green50: '#A3DEB8',
  green60: '#C1E9CF',
  green70: '#E8F7EF',
  green80: '#F3FBF7',
  // YELLOWS
  yellow10: '#E2902B',
  yellow20: '#FAA030',
  yellow30: '#FAAD4D',
  yellow40: '#FBBD71',
  yellow50: '#FCCE94',
  yellow60: '#FDDEB8',
  yellow70: '#FEEFDB',
  yellow80: '#FEF7ED',
  // ORANGES
  orange10: '#D9644A',
  orange20: '#E66A4E',
  orange30: '#F27052',
  orange40: '#F37E63',
  orange50: '#F7A997',
  orange60: '#FAC6BA',
  orange70: '#FCE2DC',
  orange80: '#FEF0ED',
  // REDS
  red10: '#CF262F',
  red20: '#EE2C38',
  red30: '#F2564D',
  red40: '#F57871',
  red50: '#F79A94',
  red60: '#FABBB8',
  red70: '#FCDDDB',
  red80: '#FEEEED',
  // PURPLES
  purple10: '#8B1079',
  purple20: '#A0138E',
  purple30: '#B13DAC',
  purple40: '#C164BD',
  purple50: '#D08BCD',
  purple60: '#E0B1DE',
  purple70: '#EFD8EE',
  purple80: '#F7EBF7',
  // VIOLETS
  violet10: '#48217B',
  violet20: '#542790',
  violet30: '#733CA6',
  violet40: '#8F63B8',
  violet50: '#AB8ACA',
  violet60: '#C7B1DB',
  violet70: '#E3D8ED',
  violet80: '#F1EBF6',
  // WHITES
  white: '#ffffff',
  black: '#000000'
}

export default Colors
