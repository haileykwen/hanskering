import { Button, Container, Divider, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ChakraNavbar from '../../components/ChakraNavbar';
import { ROUTE } from '../../services/Url';
import { OrderProductMeta } from './common/OrderProductMeta';
import { FaStore } from "react-icons/fa"
import { RiBankCardFill } from "react-icons/ri"

import { LOGOAlfamart, LOGOBCA, LOGOBNI, LOGOBRI, LOGOIndomaret, LOGOMandiri } from "../../assets/index";
import { get_ongkir } from '../../services/order';
import { formatPrice } from '../Cart/common/PriceTag';

const OrderPreparation = () => {
    const { orderData } = useSelector(state => state);
    const [render, setRender] = React.useState(false);

    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [paymentMerchant, setPaymentMerchant] = React.useState('');

    const [kurir, setKurir] = React.useState([]);
    const [chooseKurir, setChooseKurir] = React.useState('');
    const [kurirPrice, setKurirPrice] = React.useState(0);

    const Navigate = useNavigate();

    const onChangePaymentMethod = (value) => {
        setPaymentMethod(value);
        setPaymentMerchant('');
    }

    const onChangePaymentMerchant = (value) => {
        setPaymentMerchant(value);
    }

    const onChangeKurir = (kurir) => {
        setChooseKurir(kurir.service);
        setKurirPrice(kurir.cost[0].value);
    }

    const onBayar = () => {
        console.log({
            orderData,
            paymentMethod,
            paymentMerchant
        })
    }

    const getOngkir = () => {
        if (orderData === null) {
            Navigate(ROUTE.PROFILE_CART);
        } else {
            const items = orderData.items;
            const weight = parseInt(items.length);
            const params = { weight };

            get_ongkir(
                params,
                resp => {
                    const listKurir = resp.data.body.rajaongkir.results[0].costs;
                    setKurir(listKurir);
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    React.useEffect(() => {
        if (!orderData) {
            Navigate(ROUTE.PROFILE_CART);
        }
        getOngkir();
        setRender(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <ChakraNavbar />
            {render && 
            <Container paddingTop={'84px'} paddingBottom={'20px'}>
                <Stack spacing="6">
                    {orderData.items && orderData.items.length > 0 && orderData.items.map((item) => (
                        <OrderProductMeta key={item.kode_barang} {...item} />
                    ))}
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
                            colorScheme={paymentMethod === 'merchant' ? 'blue' : 'gray'}
                            variant='solid'
                            onClick={() => onChangePaymentMethod('merchant')}
                        >
                            Store Merchant
                        </Button>
                    </Stack>

                    <Divider />

                    {paymentMethod === 'merchant' && <Stack spacing={4} direction='row'>
                        <Button 
                            flex={'1'} 
                            leftIcon={<Image src={LOGOIndomaret} height='30px' />} 
                            variant='solid'
                            onClick={() => onChangePaymentMerchant('indomaret')}
                            colorScheme={paymentMerchant === 'indomaret' ? 'blue' : 'gray'}
                        >
                        </Button>
                        <Button 
                            flex={'1'} 
                            leftIcon={<Image src={LOGOAlfamart} height='30px' />} 
                            variant='solid'
                            onClick={() => onChangePaymentMerchant('alfamart')}
                            colorScheme={paymentMerchant === 'alfamart' ? 'blue' : 'gray'}
                        >
                        </Button>
                    </Stack>}

                    {paymentMethod === 'va' && <Stack direction={'column'}>
                        <Stack spacing={4} direction='row'>
                            <Button 
                                flex={'1'} 
                                leftIcon={<Image src={LOGOBCA} height='30px' />} 
                                variant='solid'
                                onClick={() => onChangePaymentMerchant('bca')}
                                colorScheme={paymentMerchant === 'bca' ? 'blue' : 'gray'}
                            >
                            </Button>
                            <Button 
                                flex={'1'} 
                                leftIcon={<Image src={LOGOMandiri} height='30px' />} 
                                variant='solid'
                                onClick={() => onChangePaymentMerchant('mandiri')}
                                colorScheme={paymentMerchant === 'mandiri' ? 'blue' : 'gray'}
                            >
                            </Button>
                        </Stack>
                        <Stack spacing={4} direction='row'>
                            <Button 
                                flex={'1'} 
                                leftIcon={<Image src={LOGOBRI} height='30px' />} 
                                variant='solid'
                                onClick={() => onChangePaymentMerchant('bri')}
                                colorScheme={paymentMerchant === 'bri' ? 'blue' : 'gray'}
                            >
                            </Button>
                            <Button 
                                flex={'1'} 
                                leftIcon={<Image src={LOGOBNI} height='30px' />} 
                                variant='solid'
                                onClick={() => onChangePaymentMerchant('bni')}
                                colorScheme={paymentMerchant === 'bni' ? 'blue' : 'gray'}
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
                                colorScheme={chooseKurir === kur.service ? 'blue' : 'gray'} 
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

                <Button onClick={onBayar} width="full" marginTop={'10px'} colorScheme={'blue'}>Buat Pesanan</Button>

            </Container>}
        </div>
    )
}

export default OrderPreparation