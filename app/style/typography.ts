import { human } from 'react-native-typography'
import Colors from './colors'

const Typeography = {
  icon10: {
    fontSize: 42,
    backgroundColor: 'transparent'
  },
  icon20: {
    fontSize: 34,
    backgroundColor: 'transparent'
  },
  icon30: {
    fontSize: 32,
    backgroundColor: 'transparent'
  },
  icon40: {
    fontSize: 30,
    backgroundColor: 'transparent'
  },
  icon50: {
    fontSize: 28,
    backgroundColor: 'transparent'
  },
  icon60: {
    fontSize: 26,
    backgroundColor: 'transparent'
  },
  icon70: {
    fontSize: 24,
    backgroundColor: 'transparent'
  },
  icon80: {
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  icon90: {
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  lgTitle: {
    ...human.largeTitleObject,
    color: Colors.title
  },
  title1: {
    ...human.title1Object,
    color: Colors.title
  },
  title2: {
    ...human.title2Object,
    color: Colors.title
  },
  title3: {
    ...human.title3Object,
    color: Colors.title
  },
  headline: {
    ...human.headlineObject,
    color: Colors.title
  },
  body: {
    ...human.bodyObject,
    color: Colors.title
  },
  callout: {
    ...human.calloutObject,
    color: Colors.title
  },
  subhead: {
    ...human.subheadObject,
    color: Colors.subtitle1
  },
  footnote: {
    ...human.footnoteObject,
    color: Colors.title
  },
  caption1: {
    ...human.caption1Object,
    color: Colors.title
  },
  caption2: {
    ...human.caption2Object,
    color: Colors.title
  }
}

export default Typeography
