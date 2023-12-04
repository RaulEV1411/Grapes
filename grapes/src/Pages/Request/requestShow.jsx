import React from 'react'
import RequestShoeInfo from '../../components/RequestShowInfo/requestShoeInfo'

function RequestShow(setCurrUser) {
  return (
    <div>
        <RequestShoeInfo setCurrUser={setCurrUser}/>
    </div>
  )
}

export default RequestShow