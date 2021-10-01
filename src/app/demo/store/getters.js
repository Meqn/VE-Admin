const getters = {
  logo: state => state.app.logo,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  role: state => state.user.role,
  user: state => state.user.profile,
  permissionRoutes: state => state.permission.routes
}
export default getters
