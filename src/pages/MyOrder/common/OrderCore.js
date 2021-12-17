import { Box, Heading, Skeleton, Stack } from '@chakra-ui/react'
import { CartProductMeta } from './CardProductMeta'

export const OrderCore = ({orders}) => {
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
                        PesananKu ({orders !== null && orders.length} items)
                    </Heading>

                    
                    {orders === null ? 
                        <Stack spacing={"6"}>
                            <Skeleton height='120px' />
                            <Skeleton height='120px' />
                            <Skeleton height='120px' />
                        </Stack> : <Stack spacing="6">
                            {orders.map((item, index) => (
                                <CartProductMeta key={index} {...item} />
                            ))}
                        </Stack>
                    }
                </Stack>
            </Stack>
        </Box>
    )
}