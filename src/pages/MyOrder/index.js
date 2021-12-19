import { Container } from '@chakra-ui/react'
import React from 'react'
import ChakraFooter from '../../components/ChakraFooter'
import ChakraNavbar from '../../components/ChakraNavbar'
import { get_userOrder } from '../../services/order'
import { OrderCore } from './common/OrderCore'

const MyOrder = () => {
    const [orders, setOrders] = React.useState(null);

    const getUserOrder = () => {
        get_userOrder(
            resp => {
                const data = resp.data.data;
                setOrders(data);
            },
            error => {
                console.log({error});
            }
        );
    }

    React.useEffect(() => {
        document.title = "Hanskering | PesananKu"
        getUserOrder();
    }, []);

    return (
        <div style={{minHeight: 'calc(100vh + 307px)'}}>
            <ChakraNavbar />
            <Container maxW={'2xl'} paddingTop='84px' paddingBottom='50px' minH='100vh'>
                <OrderCore orders={orders} />
            </Container>
            <div style={{width: '100%'}}>
                <ChakraFooter />
            </div>
        </div>
    )
}

export default MyOrder
