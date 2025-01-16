"use server"
import Carouselitem from '@/components/Carousel/page'
import CustomerReview from '@/components/CustomerReview/page'
import React from 'react'

const FrontPage = () => {
  return (
    <div>
        <Carouselitem/>
        <CustomerReview/>
    </div>
  )
}

export default FrontPage