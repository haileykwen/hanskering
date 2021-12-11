import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { Container, Input, InputGroup, InputLeftElement, InputRightElement, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChakraCustomRadio from '../../components/ChakraCustomRadio'
import ChakraNavbar from '../../components/ChakraNavbar'
import ChakraProductCard from '../../components/ChakraProductCard'
import { cksClient } from '../../services/Core'
import { get_productAll } from '../../services/product'
import { ROUTE } from '../../services/Url'

const Home = () => {
    const [products, setProducts] = React.useState([]);

    const Navigate = useNavigate();

    React.useEffect(() => {
        get_productAll(
            resp => {
                const respProduct = resp.data.success;
                console.log(respProduct);
                setProducts(respProduct);
            },
            error => {
                console.log(error);
            }
        );
    }, []);

    const onSignout = () => {
        cksClient().set('_authToken', null, {
            path: '/',
            sameSite: 'lax' 
        });
        Navigate(ROUTE.AUTH_SIGNIN);
    }

    return (
        <>
            <ChakraNavbar onSignout={onSignout} />
            <Container minH="100vh" maxW="3xl" paddingTop={'84px'} display={'flex'} flexDirection={'column'}>
                <InputGroup margin={'0 0 0 auto'} marginBottom={'10px'}>
                    <InputLeftElement>
                        <SearchIcon />
                    </InputLeftElement>
                    <Input
                        _focus={{boxShadow: "none"}}
                        placeholder='Cari barang disini yak ...'
                    />
                    <InputRightElement>
                        <SmallCloseIcon _hover={{cursor: 'pointer'}} />
                    </InputRightElement>
                </InputGroup>
                <ChakraCustomRadio />
                <SimpleGrid minChildWidth='200px' spacing='5px' paddingTop={'30px'}>
                    {products && products.map((product) => (
                        <div key={product.kode_barang}>
                            <ChakraProductCard product={product} />
                        </div>
                    ))}
                </SimpleGrid>
            </Container>
        </>
    )
}

export default Home
