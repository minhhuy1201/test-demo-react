import './ManageUsers.scss'
import { useEffect, useState } from 'react'
import {
  getAllUser,
  getUserWithPaginate
} from '../../../../services/userServices'

import { FcPlus } from 'react-icons/fc'
import ModalCreateUser from './ModalCreateUser'
import TableUsers from './TableUsers'
import ModalUpdateUser from './ModalUpdateUser'
import ModalViewUser from './ModalViewUser'
import ModalDeleteUser from './ModalDeleteUser'
import TableUserPaginate from './TableUserPaginate'

const ManageUsers = props => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
  const [userUpdate, setUserUpdate] = useState({})
  const [viewUser, setViewUser] = useState({})
  const [deleteUserData, setDeleteUserData] = useState({})

  const [listUsers, setlistUsers] = useState([])
  const LIMIT_USER_PER_PAGE = 4
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchListUsers = async () => {
    let res = await getAllUser()
    if (res.EC === 0) {
      setlistUsers(res.DT)
    }
  }

  const fetchListUsersWithPaginate = async page => {
    let res = await getUserWithPaginate(page, LIMIT_USER_PER_PAGE)

    if (res.EC === 0) {
      setlistUsers(res.DT.users)
      setPageCount(res.DT.totalPages)
    }
  }

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

  useEffect(() => {
    fetchListUsersWithPaginate(1)
  }, [])

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
          {/* <TableUsers
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          userUpdate={userUpdate}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          resetUpdateUser={resetUpdateUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default ManageUsers
