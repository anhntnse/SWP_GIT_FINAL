import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import SaleProduct from '../components/SaleProduct'
import BestSellerProductOptions  from '../components/BestSellerProductOptions'
import PreOrderProductCard from '../components/PreOrderProductCard'
import NewestProducts from '../components/NewestProducts'
const Home = () => {
  const comp = () => {
    const firstDate = new Date('2024-11-1');
    console.log(firstDate.getTime());
    console.log(Date.now());
  };

  comp();


  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <SaleProduct heading={"Flash Sale"} />
      <NewestProducts heading={"Newest Product"} />
      <BestSellerProductOptions heading={"Best Seller Product"} />

      <PreOrderProductCard heading={"Pre-order Products"} />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home