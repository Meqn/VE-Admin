function importAll(requireContext) {
  requireContext.keys().forEach(requireContext)
}

// 批量引入 ./svg/下的所有 .svg文件
const requireContext = require.context('./svg', false, /\.svg$/)
importAll(requireContext)
