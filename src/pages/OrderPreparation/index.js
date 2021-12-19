import { Button, Container, Divider, Image, Stack, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ChakraNavbar from '../../components/ChakraNavbar';
import { ROUTE } from '../../services/Url';
import { OrderProductMeta } from './common/OrderProductMeta';
import { FaStore } from "react-icons/fa"
import { RiBankCardFill } from "react-icons/ri"

import { LOGOAlfamart, LOGOBCA, LOGOBNI, LOGOBRI, LOGOIndomaret, LOGOMandiri } from "../../assets/index";
import { get_ongkir, post_order } from '../../services/order';
import { formatPrice } from '../Cart/common/PriceTag';
import { Get_signout } from '../../services/auth';
import ChakraFooter from '../../components/ChakraFooter';

const OrderPreparation = () => {
    const { orderData, userData } = useSelector(state => state);
    const [render, setRender] = React.useState(false);

    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [paymentChannel, setPaymentChannel] = React.useState('');

    const [kurir, setKurir] = React.useState([]);
    const [chooseKurir, setChooseKurir] = React.useState('');
    const [kurirPrice, setKurirPrice] = React.useState(0);

    const [loading, setLoading] = React.useState(false);
    const Navigate = useNavigate();
    const toast = useToast();

    const onChangePaymentMethod = (value) => {
        setPaymentMethod(value);
        setPaymentChannel('');
    }

    const onChangePaymentChannel = (value) => {
        setPaymentChannel(value);
    }

    const onChangeKurir = (kurir) => {
        setChooseKurir(kurir);
        setKurirPrice(kurir.cost[0].value);
    }

    const onBayar = () => {
        setLoading(true);
        const data = {
            amount: orderData.price + kurirPrice,
            paymentMethod,
            paymentChannel,
            items: orderData,
            kurir: chooseKurir
        }

        post_order(
            data,
            resp => {
                setLoading(false);
                console.log(resp);
                toast({
                    description: resp.data.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                Navigate(ROUTE.PROFILE_ORDER);
            },
            error => {
                setLoading(false);
                console.log({error});
                toast({
                    description: error.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                if (error.response.data.status === 401) {
                    Get_signout();
                }
            }
        );
    }

    const getOngkir = () => {
        if (orderData === null) {
            Navigate(ROUTE.PROFILE_CART);
        } else {
            const items = orderData.items;
            const weight = parseInt(items.length);
            const alamat = JSON.parse(userData.alamat);
            const destination = alamat.city.city_id;
            const params = { weight, destination };
            
            get_ongkir(
                params,
                resp => {
                    const listKurir = resp.data.body.rajaongkir.results[0].costs;
                    setKurir(listKurir);
                },
                error => {
                    console.log({error});
                }
            );
        }
    }

    React.useEffect(() => {
        document.title = "Hanskering | Buat Pesanan"
        if (!orderData) {
            Navigate(ROUTE.PROFILE_CART);
        }
        getOngkir();
        setRender(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{minHeight: 'calc(100vh + 307px)'}}>
            <ChakraNavbar />
            {render && 
            <Container minH='100vh' paddingTop={'84px'} paddingBottom={'50px'}>
                <Stack spacing="6">
                    {orderData.items && orderData.items.length > 0 && orderData.items.map((item) => (
                        <OrderProductMeta key={item.kode_barang} {...item} />
                    ))}
                </Stack>

                <Text marginTop={'30px'}>Tujuan</Text>
                <Stack 
                    marginTop={'10px'}
                    spacing="8" 
                    borderWidth="1px" 
                    rounded="lg" 
                    padding={{ base: "20px", sm: "8", md: "8", lg: "8" }} 
                    width="full"
                >
                    <Text>{JSON.parse(userData.alamat).full_address}, {JSON.parse(userData.alamat).city.city_name}, {JSON.parse(userData.alamat).province.province}</Text>
                </Stack>

                <Text marginTop={'30px'}>METODE PEMBAYARAN</Text>
                <Stack 
                    marginTop={'10px'}
                    spacing="8" 
                    borderWidth="1px" 
                    rounded="lg" 
                    padding={{ base: "20px", sm: "8", md: "8", lg: "8" }} 
                    width="full"
                >
                    <Stack spacing={4} direction='row'>
                        <Button 
                            flex={'1'} 
                            fontSize={{ base: '10px', md: '14px' }} 
                            flexWrap={'wrap'} 
                            leftIcon={<RiBankCardFill />} 
                            colorScheme={paymentMethod === 'va' ? 'blue' : 'gray'} 
                            variant='solid'
                            onClick={() => onChangePaymentMethod('va')}
                        >
                            Bank Virtual Account
                        </Button>
                        <Button 
                            flex={'1'} 
                            fontSize={{ base: '10px', md: '14px' }} 
                            flexWrap={'wrap'} 
                            leftIcon={<FaStore />} 
                            colorScheme={paymentMethod === 'cstore' ? 'blue' : 'gray'}
                            variant='solid'
                            onClick={() => onChangePaymentMethod('cstore')}
                        >
                            Convenience Store
                        </Button>
                    </Stack>

                    <Divider />

                    {paymentMethod === 'cstore' && <Stack spacing={4} direction='row'>
                        <Button 
                            flex={'1'} 
                            leftIcon={<Image src={LOGOIndomaret} height='30px' />} 
                            variant='solid'
                            onClick={() => onChangePaymentChannel('indomaret')}
                            colorScheme={paymentChannel === 'indomaret' ? 'blue' : 'gray'}
                        >
                        </Button>
                        <Button 
                            flex={'1'} 
                            leftIcon={<Image src={LOGOAlfamart} height='30px' />} 
                            variant='solid'
                            onClick={() => onChangePaymentChannel('alfamart')}
                            colorScheme={paymentChannel === 'alfamart' ? 'blue' : 'gray'}
                        >
                        </Button>
                    </Stack>}

                    {paymentMethod === 'va' && <Stack direction={'column'}>
                        <Stack spacing={4} direction='row'>
                            <Button 
                                flex={'1'} 
                                leftIcon={<Image src={LOGOBCA} height='30px' />} 
                                variant='solid'
                                onClick={() => onChangePaymentChannel('bca')}
                                colorScheme={paymentChannel === 'bca' ? 'blue' : 'gray'}
                            >
                            </Button>
                            <Button 
                                flex={'1'} 
                                leftIcon={<Image src={LOGOMandiri} height='30px' />} 
                                variant='solid'
                                onClick={() => onChangePaymentChannel('mandiri')}
                                colorScheme={paymentChannel === 'mandiri' ? 'blue' : 'gray'}
                            >
                            </Button>
                        </Stack>
                        <Stack spacing={4} direction='row'>
                            <Button 
                                flex={'1'} 
                                leftIcon={<Image src={LOGOBRI} height='30px' />} 
                                variant='solid'
                                onClick={() => onChangePaymentChannel('bri')}
                                colorScheme={paymentChannel === 'bri' ? 'blue' : 'gray'}
                            >
                            </Button>
                            <Button 
                                flex={'1'} 
                                leftIcon={<Image src={LOGOBNI} height='30px' />} 
                                variant='solid'
                                onClick={() => onChangePaymentChannel('bni')}
                                colorScheme={paymentChannel === 'bni' ? 'blue' : 'gray'}
                            >
                            </Button>
                        </Stack>
                    </Stack>}
                </Stack>

                <Text marginTop={'30px'}>KURIR</Text>
                <Stack 
                    marginTop={'10px'}
                    spacing="8" 
                    borderWidth="1px" 
                    rounded="lg" 
                    padding={{ base: "20px", sm: "8", md: "8", lg: "8" }} 
                    width="full"
                >
                    <Stack spacing={4} direction='column'>
                        {kurir.map((kur, index) => (
                            <Button 
                                key={index}
                                fontSize={{ base: '10px', md: '14px' }} 
                                flexWrap={'wrap'} 
                                colorScheme={chooseKurir.service === kur.service ? 'blue' : 'gray'} 
                                variant='solid'
                                onClick={() => onChangeKurir(kur)}
                            >
                                JNE {kur.description}, {formatPrice(kur.cost[0].value)}
                            </Button>
                        ))} 
                    </Stack>
                </Stack>

                <Text fontWeight={'bold'} marginTop={'30px'}>Total:</Text>
                <Text fontWeight={'bold'}>{formatPrice(orderData.price + kurirPrice)}</Text>

                <Button 
                    onClick={onBayar} 
                    width="full" 
                    marginTop={'10px'} 
                    colorScheme={'blue'}
                    isDisabled={paymentMethod && paymentChannel && chooseKurir ? false : true}
                    isLoading={loading}
                >
                    Buat Pesanan
                </Button>

            </Container>}
            <div style={{width: '100%'}}>
                <ChakraFooter />
            </div>
        </div>
    )
}

export default OrderPreparation