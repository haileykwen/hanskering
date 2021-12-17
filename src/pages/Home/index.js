import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { Container, Input, InputGroup, InputLeftElement, InputRightElement, Radio, RadioGroup, Spinner, Stack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChakraNavbar from '../../components/ChakraNavbar'
import { get_productWithPagination } from '../../services/product'
import { ROUTE } from '../../services/Url'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ChakraGridCard } from '../../components/ChakraGridCard'

const Home = () => {
    const [products, setProducts] = React.useState([]);
    const [brand, setBrand] = React.useState('');
    const [params, setParams] = React.useState({
        categoryBrand: "All Brand",
        page: 0,
        next: true
    })

    const Navigate = useNavigate();

    React.useEffect(() => {
        document.title = "Hanskering"
        getProduct(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        getProduct(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brand]);

    const getProduct = (pagination) => {
        let sendParams = {...params};
        
        if (sendParams.next) {
            sendParams.page += 1;
            get_productWithPagination(
                sendParams,
                resp => {
                    const respProduct = resp.data.data;
                    const respParams = {
                        categoryBrand: resp.data.categoryBrand,
                        page: resp.data.page,
                        next: resp.data.next
                    }
                    if (!pagination) {
                        setProducts(respProduct);
                    } else {
                        setProducts([...products, ...respProduct]);
                    }
                    setParams(respParams);
                },
                error => {
                    console.log({error});
                }
            );
        } else {
            // console.log('next: false');
        }
    }

    const onChangeBrand = (e) => {
        setProducts([]);
        setBrand(e);
        setParams(prev => ({...prev, categoryBrand: e, next: true, page: 0}));
    }

    const onView = (id) => {
        Navigate(ROUTE.PRODUCT_DETAIL.replace(':slug', id));
    }

    return (
        <>
            <ChakraNavbar />
            <Container minH="100vh" maxW="3xl" paddingTop={'84px'} display={'flex'} flexDirection={'column'} paddingBottom={'20px'} >
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
                <RadioGroup onChange={onChangeBrand} value={params.categoryBrand}>
                    <Stack direction='row'>
                        <Radio value='Vans'>Vans</Radio>
                        <Radio value='Converse'>Converse</Radio>
                        <Radio value='All Brand'>All Brand</Radio>
                    </Stack>
                </RadioGroup>
                <InfiniteScroll
                    dataLength={products.length} //This is important field to render the next data
                    next={() => getProduct(true)}
                    hasMore={params.next}
                    loader={ <h3 style={{textAlign: 'center'}}><Spinner /></h3> }
                    // endMessage={
                    //     <p style={{ textAlign: 'center' }}>
                    //     <b>Yuhuuu! Semua produk telah ditampilkan!</b>
                    //     </p>
                    // }
                    // below props only if you need pull down functionality
                    refreshFunction={getProduct}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; Tarik kebawah untuk refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Lepaskan untuk refresh</h3>
                    }
                >
                    {/* <SimpleGrid minChildWidth='200px' spacing='5px' paddingTop={'30px'}>
                        {products && products.map((product) => (
                            <div key={product.kode_barang}>
                                <ChakraProductCard product={product} onView={onView} />
                            </div>
                        ))}
                    </SimpleGrid> */}
                    <ChakraGridCard products={products} onView={onView} />
                </InfiniteScroll>
            </Container>
        </>
    )
}

export default Home
