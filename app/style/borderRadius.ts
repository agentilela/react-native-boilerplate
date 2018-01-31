const generateBorderRadius = (radius: number) => ({
  top: { borderTopLeftRadius: radius, borderTopRightRadius: radius },
  full: { borderRadius: radius },
  bottom: { borderBottomLeftRadius: radius, borderBottomRightRadius: radius },
  left: { borderTopLeftRadius: radius, borderBottomLeftRadius: radius },
  right: { borderTopRightRadius: radius, borderBottomRightRadius: radius }
})
const BorderRadiuses = {
  br10: generateBorderRadius(3),
  br20: generateBorderRadius(6),
  br30: generateBorderRadius(9),
  br40: generateBorderRadius(12),
  br50: generateBorderRadius(15),
  br100: generateBorderRadius(999)
}

export default BorderRadiuses
