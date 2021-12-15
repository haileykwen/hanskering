import { Container } from '@chakra-ui/react'
import React from 'react'
import ChakraNavbar from '../../components/ChakraNavbar'
import { delete_cart, get_cart } from '../../services/profile'
import { CartCore } from './common/CartCore'

const Cart = () => {
    const [carts, setCarts] = React.useState(null);
    const [totalPrice, setTotalPrice] = React.useState(0);

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

    React.useEffect(() => {
        getCart();
    }, []);

    React.useEffect(() => {
        getTotalPrice();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carts]);

    return (
        <div>
            <ChakraNavbar />
            <Container maxW={'5xl'} paddingTop={'64px'}>
                <CartCore cart={carts} onDeleteItem={deleteCart} totalPrice={totalPrice} />
            </Container>
        </div>
    )
}

export default Cart
