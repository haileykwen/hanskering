import { Box, Flex, Heading, HStack, Link, Skeleton, Stack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { CartItem } from './CartItem'
import { CartOrderSummary } from './CartOrderSummary'

export const CartCore = ({cart, onDeleteItem, totalPrice, onCheckout}) => {
    const Navigate = useNavigate();

    return (
        <Box
            maxW={{ base: '3xl', lg: '7xl'}}
            mx="auto"
            px={{ base: '0px', md: '12' }}
            py={{ base: '30px', md: '12' }}
        >
            <Stack
                spacing={{ base: '8', md: '16' }}
            >
                <Stack
                    spacing={{ base: '8', md: '10' }}
                    flex="2"
                >
                    <Heading fontSize="2xl" fontWeight="extrabold">
                        Keranjang Belanja ({cart !== null && cart.length} items)
                    </Heading>

                    
                    {cart === null ? 
                        <Stack spacing={"6"}>
                            <Skeleton height='120px' />
                            <Skeleton height='120px' />
                            <Skeleton height='120px' />
                        </Stack> : <Stack spacing="6">
                            {cart.map((item) => (
                                <CartItem key={item.kode_barang} {...item} onClickDelete={onDeleteItem} />
                            ))}
                        </Stack>
                    }
                </Stack>

                {cart !== null && cart.length > 0 &&
                    <Flex direction="column" align="center" flex="1">
                        <CartOrderSummary totalPrice={totalPrice} onCheckout={onCheckout} />
                        <HStack mt="6" fontWeight="semibold">
                            <p>atau</p>
                            <Link onClick={() => Navigate('/')} color={'blue.500'}>Kembali Belanja</Link>
                        </HStack>
                    </Flex>
                }
            </Stack>
        </Box>
    )
}