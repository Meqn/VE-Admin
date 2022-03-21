const getters = {
  role: state => state.user.role,
  user: state => state.user.profile,
  permissionRoutes: state => state.permission?.routes || []
}
export default getters
