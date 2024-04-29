
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { apiCreateOrder } from "../apis/cart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// This value is from the props in the UI
const style = { "layout": "vertical" };


// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, amount, id, currency, payload, setIsSuccess  }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency
            }
        })
    }, [currency, showSpinner])
    const navigate = useNavigate()
    const handleSaveOrder = async () =>{    
        const response = await apiCreateOrder(payload)
        if(response.message==="Tạo đơn hàng thành công"){
            setIsSuccess(true)
            setTimeout(()=>{
                Swal.fire('Congratulations!', 'Đơn hàng của bạn đã được tạo thành công!', 'success').then(()=>{navigate('/')})
            },500)
            
        }
    }   
    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data,actions)=> actions.order.create({
                    purchase_units:[
                        {amount:{currency_code:currency, value:amount}}
                    ]
                })}
                onApprove={(data, actions)=> actions.order.capture().then(async(response)=>{
                    if(response.status === "COMPLETED"){
                        handleSaveOrder()
                    }
                })}
            />
        </>
    );
}

export default function Paypal({amount, payload, setIsSuccess}) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px",margin:"auto" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} payload={payload} setIsSuccess={setIsSuccess} />
            </PayPalScriptProvider>
        </div>
    );
}