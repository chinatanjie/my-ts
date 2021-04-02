

let requireContext = require.context("./svg", false, /\.svg$/);

const importAll = (context: __WebpackModuleApi.RequireContext) => {
  const map: any = {}
  for (const key of context.keys()) {
    const keyArr = key.split('/');
    keyArr.shift();
    map[keyArr.join('.').replace(/\.svg$/g, '')] = context(key).default;

  }
  // console.log(map)
  return map;
}

export default importAll(requireContext)