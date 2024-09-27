import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const verify = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const OrderId = searchParams.get("OrderId");
    const {url} =useContext(StoreContext)
    
    const verifyPayment = async () => {
        try {
                const response = await axios.post(`${url}/api/order/verifyOrder`, { success, OrderId });
                console.log(response.data);
                if(response.data.success){
                    navigate('/myorders')
            }else{
                navigate('/')
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])


  return (
    <>
        <div>
            <div>
            </div>  
        </div>
    </>
  )
}

export default verify