const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  role: state => state.user.role,
  permission_routes: state => state.permission.routes
}
export default getters
