import { Container, useToast } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChakraFooter from '../../components/ChakraFooter'
import ChakraNavbar from '../../components/ChakraNavbar'
import { delete_cart, get_cart } from '../../services/profile'
import { ROUTE } from '../../services/Url'
import { CartCore } from './common/CartCore'

const Cart = () => {
    const { userData } = useSelector(state => state);
    const [carts, setCarts] = React.useState(null);
    const [totalPrice, setTotalPrice] = React.useState(0);

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const toast = useToast();

    const getCart = () => {
        get_cart(
            resp => {
                if (resp.status === 200) {
                    const data = resp.data.data;
                    setCarts(data);
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    const deleteCart = (id) => {
        const params = { kode_barang: id }
        delete_cart(
            params,
            resp => {
                if (resp.status && resp.status === 200) {
                    const tempCarts = [...carts];
                    let targetDelete = carts.findIndex(x => x.kode_barang === id);
                    tempCarts.splice(targetDelete, 1);
                    setCarts(tempCarts);
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    const getTotalPrice = () => {
        let price = 0;
        carts !== null && carts.map(cart => {
            return price = price + cart.harga;
        });
        setTotalPrice(price);
    }

    const onCheckout = () => {
        if (userData.alamat && userData.telepon) {
            dispatch({
                type: "UPDATE_ORDER_DATA",
                payload: {
                    items: carts,
                    price: totalPrice
                }
            });
    
            Navigate(ROUTE.ORDER_PREPARATION);
        } else {
            toast({
                description: 'Ooops, data diri kamu belum lengkap',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    React.useEffect(() => {
        document.title = "Hanskering | Keranjang"
        getCart();
    }, []);

    React.useEffect(() => {
        getTotalPrice();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carts]);

    return (
        <div style={{minHeight: 'calc(100vh + 307px)'}}>
            <ChakraNavbar />
            <Container maxW={'5xl'} paddingTop={'64px'} paddingBottom='50px' minH='100vh'>
                <CartCore cart={carts} onDeleteItem={deleteCart} totalPrice={totalPrice} onCheckout={onCheckout} />
            </Container>
            <div style={{width: '100%'}}>
                <ChakraFooter />
            </div>
        </div>
    )
}

export default Cart
