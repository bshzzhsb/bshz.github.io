const fs = () => {
  let scale = [8];
  for (let i=0; i<18; i++) {
    scale[i+1] = scale[i] + ((i-2)/4+1) * 2
  }
  scale.splice(0, 2);
  const scalePx = scale.map(t => t+"px");
  const scaleRem = scale.map(t => t/16 + "rem");
  return { scale, scalePx, scaleRem }
}

export const {
  scale: fontSizes,
  scalePx: fontSizesPx,
  scaleRem: fontSizesRaw
} = fs()