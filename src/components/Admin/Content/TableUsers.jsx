const TableUsers = props => {
  const {
    listUsers,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete
  } = props

  return (
    <>
      <table className='table table-hover table-bordered table-striped'>
        <thead>
          <tr>
            <th className='text-center' scope='col'>
              ID
            </th>
            <th scope='col'>User name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
            <th className='text-center' scope='col'>
              Action
            </th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, idx) => {
              return (
                <tr key={`table-users-${idx}`}>
                  <td className='text-center'>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className='text-center'>
                    <button
                      onClick={() => handleClickBtnView(user)}
                      className='btn btn-info'
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleClickBtnUpdate(user)}
                      className='btn btn-warning mx-3'
                    >
                      Update
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleClickBtnDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={4}>NO USERS in database</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default TableUsers
