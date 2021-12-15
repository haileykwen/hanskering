import { Box, Image, Stack, Text } from '@chakra-ui/react'
import { PriceTag } from '../../Cart/common/PriceTag'

export const OrderProductMeta = (props) => {
    const { nama_barang, foto, wantSize, harga } = props
    return (
        <Stack direction="row" spacing="5" width="full" justifyContent={'space-between'} alignItems={'center'}>
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
                    src={foto}
                    alt={nama_barang}
                    draggable="false"
                    loading="lazy"
                />
                <Box>
                    <Stack spacing="0.5">
                        <Text fontWeight="medium">{nama_barang}</Text>
                        <Text color={'gray.600'} fontSize="sm">
                            Ukuran {wantSize}
                        </Text>
                        <PriceTag price={harga} currency={'IDR'} />
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    )
}