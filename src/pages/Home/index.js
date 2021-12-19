import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { Container, Input, InputGroup, InputLeftElement, InputRightElement, Radio, RadioGroup, Spinner, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChakraNavbar from '../../components/ChakraNavbar'
import { get_productWithPagination } from '../../services/product'
import { ROUTE } from '../../services/Url'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ChakraGridCard } from '../../components/ChakraGridCard'
import ChakraFooter from '../../components/ChakraFooter'

const Home = () => {
    const [products, setProducts] = React.useState(null);
    const [brand, setBrand] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [changeSearch, setChangeSearch] = React.useState('');
    const [params, setParams] = React.useState({
        categoryBrand: "All Brand",
        page: 0,
        next: true,
        query: ''
    })

    const Navigate = useNavigate();

    React.useEffect(() => {
        document.title = "Hanskering"
        getProduct(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brand, search]);

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
                        next: resp.data.next,
                        query: resp.data.query
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
        setProducts(null);
        setBrand(e);
        setParams(prev => ({...prev, categoryBrand: e, next: true, page: 0}));
    }

    const onView = (id) => {
        Navigate(ROUTE.PRODUCT_DETAIL.replace(':slug', id));
    }

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            if (changeSearch !== search) {
                setProducts(null);
                setParams(prev => ({...prev, next: true, page: 0}));
                setSearch(params.query);
            }
        }
    }

    const onChangeSearch = (e) => {
        setChangeSearch(e.target.value);
        setParams(prev => ({...prev, query: e.target.value}));
    }

    const onResetSearch = () => {
        if (products !== null && search !== '') {
            setProducts(null);
            setParams(prev => ({...prev, next: true, page: 0, query: ''}));
            setSearch('');
            setChangeSearch('');
        }
    }

    return (
        <div style={{minHeight: products && 'calc(100vh + 307px)'}}>
            <ChakraNavbar />
            <Container minH="100vh" maxW="3xl" paddingTop={'84px'} display={'flex'} flexDirection={'column'} paddingBottom={'50px'} >
                <InputGroup margin={'0 0 0 auto'} marginBottom={'10px'}>
                    <InputLeftElement>
                        <SearchIcon />
                    </InputLeftElement>
                    <Input
                        _focus={{boxShadow: "none"}}
                        placeholder='Cari barang disini yak ...'
                        onKeyUp={(e) => onSearch(e)}
                        onChange={(e) => onChangeSearch(e)}
                        value={changeSearch}
                        isDisabled={products === null ? true : false}
                    />
                    <InputRightElement>
                        <SmallCloseIcon onClick={onResetSearch} _hover={{cursor: 'pointer'}} />
                    </InputRightElement>
                </InputGroup>

                <RadioGroup onChange={onChangeBrand} value={params.categoryBrand} isDisabled={products === null ? true : false}>
                    <Stack direction='row'>
                        <Radio value='Vans'>Vans</Radio>
                        <Radio value='Converse'>Converse</Radio>
                        <Radio value='All Brand'>All Brand</Radio>
                    </Stack>
                </RadioGroup>
                
                {search && products !== null && <Text marginTop='30px'>{`Menampilkan hasil dari pencarian: ${search}`}</Text>}
                {search && products !== null && <Text cursor='pointer' textDecoration='underline' onClick={onResetSearch}>Reset filter pencarian</Text>}
                
                <InfiniteScroll
                    dataLength={products && products.length} //This is important field to render the next data
                    next={() => getProduct(true)}
                    hasMore={params.next}
                    loader={ <h3 style={{textAlign: 'center'}}><Spinner /></h3> }
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
                    <ChakraGridCard products={products} onView={onView} />
                </InfiniteScroll>
            </Container>
            {products && <div style={{width: '100%'}}>
                <ChakraFooter />
            </div>}
        </div>
    )
}

export default Home
