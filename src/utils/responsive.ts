/**
 *
 * @param colProps
 */
export function calculateGridRows(colProps: {
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
  xxl?: number | string;
} = {xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 8}) {
  const sm = 576;
  const md = 768;
  const lg = 992;
  const xl = 1200;
  const xxl = 1600;

  let clientWidth = document.body.clientWidth;
  // console.log(clientWidth)
  // console.log(colProps)
  if (!!clientWidth) {
    if (clientWidth < sm) {
      return 24 / (colProps?.xs as number || 24)
    } else if (clientWidth >= sm && clientWidth < md) {
      return 24 / (colProps?.sm as number || 24)
    } else if (clientWidth >= md && clientWidth < lg) {
      return 24 / (colProps?.md as number || 24)
    } else if (clientWidth >= lg && clientWidth < xl) {
      return 24 / (colProps?.lg as number || 24)
    } else if (clientWidth >= xl && clientWidth < xxl) {
      return 24 / (colProps?.xl as number || 24)
    } else {
      return 24 / (colProps?.xxl as number || 24)
    }
  }
  return 0;
}