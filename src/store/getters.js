const getters = {
  logo: state => state.app.logo,
  sidebarCollapsed: state => state.app.sidebarCollapsed,
  isMobile: state => state.app.isMobile,
  size: state => state.app.size,
  role: state => state.user.role,
  user: state => state.user.profile,
  permissionRoutes: state => state.permission.routes
}
export default getters
