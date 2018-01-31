import { isIOS } from 'configs/constants'

const Spacings = {
  s1: isIOS ? 3 : 4,
  s2: isIOS ? 6 : 8,
  s3: isIOS ? 9 : 12,
  s4: isIOS ? 12 : 16,
  s5: isIOS ? 15 : 20,
  s6: isIOS ? 18 : 24,
  s7: isIOS ? 21 : 28,
  s8: isIOS ? 24 : 32,
  s9: isIOS ? 27 : 36,
  s10: isIOS ? 30 : 40
}

export default Spacings
