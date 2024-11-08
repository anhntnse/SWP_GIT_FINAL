import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [sortOrder, setSortOrder] = useState('') // '' for no sorting, 'asc' for ascending, 'desc' for descending

    console.log("query", query.search)

    const fetchProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url + query.search)
        const dataResponse = await response.json()
        setLoading(false)
        
        let products = dataResponse.data
        if (sortOrder) {
            products = sortProductsByPrice(products, sortOrder)
        }
        setData(products)
    }

    const sortProductsByPrice = (products, order) => {
        return products.sort((a, b) => {
            if (order === 'asc') return a.price - b.price
            if (order === 'desc') return b.price - a.price
            return 0
        })
    }

    const handleSortChange = (event) => {
        const newOrder = event.target.value
        setSortOrder(newOrder)

        // Sort the existing data based on the new sort order
        const sortedData = sortProductsByPrice([...data], newOrder)
        setData(sortedData)
    }

    useEffect(() => {
        fetchProduct()
    }, [query, sortOrder]) // Re-run fetchProduct when sortOrder changes

    return (
        <div className='container mx-auto p-4'>
            {
                loading && (
                    <p className='text-lg text-center'>Loading ...</p>
                )
            }

            <div className="my-3 flex justify-between items-center">
                <p className='text-lg font-semibold'>Search Results : {data.length}</p>
                <select
                    className="p-2 border rounded"
                    value={sortOrder}
                    onChange={handleSortChange}
                >
                    <option value="">Sort by Price</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            {
                data.length === 0 && !loading && (
                    <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
                )
            }

            {
                data.length !== 0 && !loading && (
                    <VerticalCard loading={loading} data={data} />
                )
            }
        </div>
    )
}

export default SearchProduct
