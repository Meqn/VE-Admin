const getters = {
  role: state => state.user.role,
  user: state => state.user.profile,
  cachedViews: state => state.permission.cachedViews,
  permissionRoutes: state => state.permission.routes
}
export default getters
