import React from 'react'

import {
  CCarousel ,
  CCarouselItem,
  CImage,
  CCardTitle,
  CCardSubtitle ,
  CCardLink ,
} from '@coreui/react'

const Dashboard = () => {

  return (
    <div>
      <CCarousel controls>
      <CCarouselItem>
        <CImage className="d-block w-100" src="https://img.idxchannel.com/images/idx/2021/01/19/Bank_bank_syariah.jpg" alt="slide 1" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100" src="https://img.idxchannel.com/images/idx/2021/10/01/bank.jpg" alt="slide 2" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100" src="https://cdnwpedutorenews.gramedia.net/wp-content/uploads/2021/12/22090305/pengertian-bank-sentral-810x456.jpg" alt="slide 3" />
      </CCarouselItem>
    </CCarousel>
    </div>
  )
}

export default Dashboard
