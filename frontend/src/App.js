import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useCallback } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';


function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });
  
    const dataApi = await dataResponse.json();
  
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
      return dataApi.data;
    }
  }, [dispatch]);

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }
  const fetchUserCreateOrder = async()=>{
    const dataResponse = await fetch(SummaryApi.createOrder.url,{
      method : SummaryApi.createOrder.method,
      credentials : 'include'
    })

    const data = await dataResponse.json();

    if (data.success) {
      // Assuming the user ID is returned in the data
      setUserId(data.userId);
    }
  }


  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()
    fetchUserCreateOrder()


  },[fetchUserDetails])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
          fetchUserCreateOrder
      }}>
        <ToastContainer 
          position='top-center'
        />
        
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
      </Context.Provider>
    </>
  );
}

export default App;
