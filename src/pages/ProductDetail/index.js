import { Icon, Badge, Button, Container, Heading, Image, Radio, RadioGroup, Stack, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { formatPrice } from '../../components/ChakraGridCard/common/PriceTag'
import ChakraNavbar from '../../components/ChakraNavbar'
import { get_product } from '../../services/product'
import { FiUnlock } from 'react-icons/fi'
import { put_cart } from '../../services/profile'

const ProductDetail = () => {
    const [product, setProduct] = React.useState(null);
    const [size, setSize] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    const {slug} = useParams();
    const toast = useToast()

    const params = {
        id: slug
    }
    
    const getProduct = () => {
        get_product(
            params,
            resp => {
                if (resp.status === 200) {
                    let dataProduct = resp.data.data[0];
                    dataProduct.size = JSON.parse(dataProduct.size);
                    setProduct(dataProduct);
                }
            },
            error => {
                toast({
                    title: 'Error',
                    description: error.response.data.message ? error.response.data.message : "Ooops, ada kesalahan di sistem. Coba lagi nanti ya!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        )
    }

    const onAddToCart = () => {
        setLoading(true);
        const data = {
            kode_barang: product.kode_barang,
            size
        }
        
        put_cart(
            data,
            resp => {
                setLoading(false);
                toast({
                    title: 'Keranjang',
                    description: resp.data.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            },
            error => {
                setLoading(false);
                toast({
                    title: 'Keranjang',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        );
    }

    React.useEffect(() => {
        getProduct();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ChakraNavbar />
            <Container paddingTop={'84px'} paddingBottom={'20px'}>
                <Image
                    width={'100%'}
                    src={product && product.foto}
                    rounded={'md'}
                />

                <Heading marginTop={'10px'}>{product && product.nama_barang}</Heading>

                <Text textAlign={'right'} marginTop={'10px'}>
                    <Badge fontSize={'20px'} variant='solid' colorScheme='green'>
                        {product && formatPrice(product.harga, 'IDR')}
                    </Badge>
                </Text>

                <Text 
                    display={'flex'} 
                    alignItems={'center'} 
                    marginTop={'10px'}
                >
                    {product && <>
                        <Icon as={FiUnlock} transition="all 0.15s ease" />
                        Ukuran Tersedia
                    </>}
                </Text>
                <RadioGroup onChange={(e) => setSize(e)}>
                    {product && Object.keys(product.size).map((size, index) => (
                        <Stack direction='row' key={index}>
                            {product.size[size] !== "0" && product.size[size] !== "" && (
                                <Radio value={size}>{size}</Radio>
                            )}
                        </Stack>
                    ))}
                </RadioGroup>

                { product && <Button
                    disabled={size ? false : true}
                    isLoading={loading}
                    marginTop="20px"
                    width="100%"
                    transition="0.3s"
                    outline="0"
                    _hover={{transform: 'scale(1.1)', transition: "0.3s"}}
                    _focus={{boxShadow: "none"}}
                    sx={{
                        ':hover > svg': {
                          transform: 'scale(1.1)',
                        },
                    }}
                    onClick={onAddToCart}
                >Tambahkan ke Keranjang</Button>}
            </Container>
        </>
    )
}

export default ProductDetail
