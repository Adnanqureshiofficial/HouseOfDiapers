import React, { useState } from 'react'
import Shopheader from '../components/Shopheader'

import ProductGrid from '../components/ProductGrid';
import { Route, Routes } from 'react-router-dom';
import CartPage from '../components/CartPage';

const Shop = ({isLoggedIn, toggleDisplayPrompt, displayLoginPrompt }) => {
 
  return (
    <>
    <Shopheader/>
<ProductGrid isLoggedIn={isLoggedIn} displayLoginPrompt={displayLoginPrompt}  toggleDisplayPrompt= {toggleDisplayPrompt}  />

    </>
  )
}

export default Shop