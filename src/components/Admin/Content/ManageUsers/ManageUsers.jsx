import ModalCreateUser from '../ModalCreateUser'
import TableUsers from '../TableUsers'
import './ManageUsers.scss'
import { useEffect, useState } from 'react'
import { getAllUser } from '../../../../services/userServices'

import { FcPlus } from 'react-icons/fc'
import ModalUpdateUser from '../ModalUpdateUser'
import ModalViewUser from '../ModalViewUser'
import ModalDeleteUser from '../ModalDeleteUser'

const ManageUsers = props => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
  const [userUpdate, setUserUpdate] = useState({})
  const [viewUser, setViewUser] = useState({})
  const [deleteUserData, setDeleteUserData] = useState({})

  const [listUsers, setlistUsers] = useState([])

  const fetchListUsers = async () => {
    let res = await getAllUser()
    if (res.EC === 0) {
      setlistUsers(res.DT)
    }
  }

  useEffect(() => {
    fetchListUsers()
  }, [])

  const handleClickBtnUpdate = user => {
    setUserUpdate(user)
    setShowModalUpdateUser(true)
  }

  const handleClickBtnView = user => {
    setViewUser(user)
    setShowModalViewUser(true)
  }

  const handleClickBtnDelete = user => {
    setDeleteUserData(user)
    setShowModalDeleteUser(true)
  }

  const resetUpdateUser = () => {
    setUserUpdate({})
  }

  const resetViewUser = () => {
    setViewUser({})
  }

  const resetDeleteUser = () => {
    setDeleteUserData({})
  }

  return (
    <div className='manage-user-container'>
      <div className='title'>Manage User</div>

      <div className='users-content'>
        <div className='btn-add-new'>
          <button
            className='btn btn-primary'
            onClick={e => setShowModalCreateUser(true)}
          >
            <FcPlus style={{ marginRight: '5px' }} /> Add new user
          </button>
        </div>

        <div className='users-table-container'>
          <TableUsers
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          userUpdate={userUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateUser={resetUpdateUser}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          viewUser={viewUser}
          resetViewUser={resetViewUser}
        />
        <ModalDeleteUser
          setShow={setShowModalDeleteUser}
          show={showModalDeleteUser}
          deleteUserData={deleteUserData}
          resetDeleteUser={resetDeleteUser}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  )
}

export default ManageUsers
