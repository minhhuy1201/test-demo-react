import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectAdminRoute = props => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)

  if (!isAuthenticated) return <Navigate to='/login'></Navigate>
  if (account.role !== 'ADMIN') {
    alert('YOU ARE NOT ADMIN !!!!')
    return <Navigate to='/'></Navigate>
  }

  return <>{props.children}</>
}

export default ProtectAdminRoute
