import React from 'react';


export default function FormContainer({children}) {
  return (
    <div className='container justify-content-center'>
         <div className='row justify-content-center  '>
            <div className='col-md-6 col-xs-12 justify-content-center bg-info p-5 rounded-3'>
              {children}
            </div>
         </div>
    </div>
  )
}
