import { Container, Heading, Skeleton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import ChakraNavbar from '../../components/ChakraNavbar'
import { get_orderDetail } from '../../services/order'
import { formatPrice } from '../MyOrder/common/PriceTag'
import { ProductMeta } from './common/ProductMeta'

const OrderDetail = () => {
    const [order, setOrder] = React.useState(null);

    const params = useParams();
    const id_pesanan = params.slug;

    const getOrderDetail = () => {
        let params = { id_pesanan };
        get_orderDetail(
            params,
            resp => {
                let data = resp.data.data;
                setOrder(data);
            },
            error => {
                console.log({error});
            }
        );
    }

    React.useEffect(() => {
        document.title = "Hanskering | Detail Pesanan"
        getOrderDetail();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ChakraNavbar />
            <Container maxW={'2xl'} paddingTop='84px' paddingBottom='20px'>
                <Heading fontSize="2xl" fontWeight="extrabold">
                    Detail Pesanan {id_pesanan}
                </Heading>
                <Stack spacing="6" marginTop="20px">
                    {order && order.items && order.items.length > 0 ? order.items.map((item) => (
                        <ProductMeta key={item.kode_barang} {...item} /> 
                    )) :
                    <Skeleton height='120px' />} 
                </Stack>

                <Stack 
                    marginTop={'20px'}
                    spacing="4" 
                    borderWidth="1px" 
                    rounded="lg" 
                    padding={{ base: "10px", sm: "4", md: "4", lg: "4" }} 
                    width="full"
                    shadow='lg'
                >
                    <Text fontWeight='bold'>Tujuan</Text>
                    {order ? <Text>{order.destination.full_address}, {order.destination.city.city_name}, {order.destination.province.province}</Text> : <Skeleton height='60px' />}
                </Stack>

                <Stack 
                    marginTop={'20px'}
                    spacing="4" 
                    borderWidth="1px" 
                    rounded="lg" 
                    padding={{ base: "10px", sm: "4", md: "4", lg: "4" }} 
                    width="full"
                    shadow='lg'
                >
                    <Text fontWeight='bold'>Kurir</Text>
                    {order ? <Text>{order.kurir.service} ({order.kurir.description}) {formatPrice(order.kurir.cost[0].value)}. Estimasi sampai {order.kurir.cost[0].etd} hari</Text> : <Skeleton height='60px' />}
                </Stack>

                <Stack 
                    marginTop={'20px'}
                    spacing="4" 
                    borderWidth="1px" 
                    rounded="lg" 
                    padding={{ base: "10px", sm: "4", md: "4", lg: "4" }} 
                    width="full"
                    shadow='lg'
                >
                    <Text fontWeight='bold'>Pembayaran</Text>
                    {order ?
                        <Stack>
                            <Text>{order.via === "VA" && "Virtual Account"} {order.channel}: {order.payment_number}</Text>
                            <Text>Total: {formatPrice(order.total)}</Text>
                            <Text>Batas Pembayaran: {order.expired}</Text>
                            <Text>Status: {order.status}</Text>
                            {order.paid_on && <Text>Dibayar Pada: {order.paid_on}</Text>}
                        </Stack> : <Skeleton height='60px' />
                    }
                </Stack>
            </Container>
        </>
    )
}

export default OrderDetail
