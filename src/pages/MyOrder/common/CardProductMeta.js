import { Badge, Box, Image, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../services/Url';
import { PriceTag } from './PriceTag'

export const CartProductMeta = (props) => {
    let { id_pesanan, items, status, total } = props
    items = JSON.parse(items);

    const Navigate = useNavigate();
    
    return (
        <Stack onClick={() => Navigate(ROUTE.ORDER_DETAIL.replace(':slug', id_pesanan))} shadow={'lg'} padding='10px' cursor='pointer' direction="row" spacing="5" width="full" justifyContent={'space-between'} alignItems={'center'}>
            <Stack 
                direction={{
                    lg: "row",
                    md: "row",
                    sm: "column",
                    base: "column"
                }} 
                alignItems={{
                    lg: "center",
                    md: "center"
                }}
            >
                <Image
                    rounded="lg"
                    width="120px"
                    height="120px"
                    fit="cover"
                    src={items.items[0].foto}
                    alt={id_pesanan}
                    draggable="false"
                    loading="lazy"
                />
                <Box>
                    <Stack spacing="0.5">
                        <Text fontWeight="medium">Pesanan no. {id_pesanan}</Text>
                        <Text color={'gray.600'} fontSize="sm">
                            {items.items.length} items
                        </Text>
                        <PriceTag price={total} currency={'IDR'} />
                    </Stack>
                </Box>
            </Stack>    
            <Box>
                <Badge fontSize={'15px'} variant='solid' colorScheme={status === 'pending' ? 'red' : 'green'}>
                    {status === 'pending' && 'Pending Pembayaran'}
                    {status === 'success' && 'Sedang diproses'}
                </Badge>
            </Box>
        </Stack>
    )
}