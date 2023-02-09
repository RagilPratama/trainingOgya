import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <span className="me-1" style={{ fontWeight: 'bold' }}>BANK KRUT</span>
        <span className="me-1">&copy; 2023</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
