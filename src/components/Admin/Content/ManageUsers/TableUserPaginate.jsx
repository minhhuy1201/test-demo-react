import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'

const TableUserPaginate = props => {
  const {
    listUsers,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete,
    fetchListUsersWithPaginate,
    pageCount,
    setCurrentPage,
    currentPage
  } = props

  // Invoke when user click to request another page.
  const handlePageClick = e => {
    fetchListUsersWithPaginate(+e.selected + 1)
    setCurrentPage(+e.selected + 1)
  }

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
      <div className='d-flex justify-content-center'>
        <ReactPaginate
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel='< previous'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  )
}

export default TableUserPaginate
