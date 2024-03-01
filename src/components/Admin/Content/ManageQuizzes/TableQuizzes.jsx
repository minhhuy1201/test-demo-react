const TableQuizzes = props => {
  const { listQuizzes, handleDeleteBtn, handleUpdateBtn } = props

  return (
    <>
      <table className='table table-hover table-bordered table-striped'>
        <thead>
          <tr>
            <th className='text-center' scope='col'>
              ID
            </th>
            <th scope='col'>Name</th>
            <th scope='col'>Description</th>
            <th className='text-center' scope='col'>
              Type
            </th>
            <th className='text-center' scope='col'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listQuizzes &&
            listQuizzes.length > 0 &&
            listQuizzes.map((item, idx) => {
              return (
                <tr key={`quiz-${idx}`}>
                  <th className='text-center' scope='row'>
                    {item.id}
                  </th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td className='text-center'>{item.difficulty}</td>
                  <td className='text-center'>
                    <div
                      className='btn btn-warning me-3'
                      onClick={() => handleUpdateBtn(item)}
                    >
                      Update
                    </div>
                    <div
                      className='btn btn-danger'
                      onClick={() => handleDeleteBtn(item)}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default TableQuizzes
