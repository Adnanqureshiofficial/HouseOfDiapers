import { useEffect, useState } from 'react'

import Homepage from '../pages/Homepage'
import { Route, Routes } from 'react-router-dom'
import Categories from '../pages/Categories'
import Aboutus from '../pages/Aboutus'
import SignUp from '../components/Signup'
import Login from '../components/Login'
import Shop from '../pages/Shop'
import { CartProvider } from '../components/CartContext'
import { Toaster } from 'react-hot-toast'
import CartPage from '../components/CartPage'
import AccountPage from '../pages/AccountPage'
import CheckoutPage from '../pages/CheckoutPage'

function App() {
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    console.log("user state reached")
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    user ? true : false
  );
  useEffect(() => {
    if (user) {
      
      setIsLoggedIn(true);
    } 
    //else {
    //   localStorage.removeItem('user');
    //   setIsLoggedIn(false);
    // }
  }, [user]);
  console.log(user)
  console.log(isLoggedIn)
  
  

  const [displayLoginPrompt, setdisplayLoginPrompt] = useState(false)
  const toggleDisplayPrompt = () => {
    setdisplayLoginPrompt(prev => !prev);
  
  };
  
  return (
    <>
<CartProvider isLogged={isLoggedIn}>
<Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            marginBottom: '60px',
            background: '#1f2937', 
            color: '#fff',
            fontSize: '14px',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          },
        }}
      />
      
<Routes>
  <Route path="/" element={<Homepage/>} />
<Route path='/categories' element={<Categories/>} />
<Route path='/about' element={<Aboutus/>} />
<Route path='/signup' element={<SignUp/>} />
<Route path='/login' element={<Login setUser = {setUser}/>} />
<Route path='/shop' element={<Shop  isLoggedIn={isLoggedIn}  toggleDisplayPrompt  = {toggleDisplayPrompt} displayLoginPrompt = {displayLoginPrompt} />} />
<Route path="/cart" element={<CartPage/>}/>
<Route path="/accountpage" element={<AccountPage/>}/>
<Route path="/checkout" element={<CheckoutPage/>}/>

</Routes>
</CartProvider>
    </>
  )
}

export default App
