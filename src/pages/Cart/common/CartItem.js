import { Flex } from '@chakra-ui/react'
import { CartProductMeta } from './CartProductMeta'

export const CartItem = (props) => {
    const {
        kode_barang,
        nama_barang,
        wantSize,
        foto,
        harga,
        onClickDelete,
    } = props
    return (
        <Flex
            justify="space-between"
            align="center"
        >
            <CartProductMeta
                name={nama_barang}
                description={wantSize}
                image={foto}
                harga={harga}
                onClickDelete={() => onClickDelete(kode_barang)}
            />
        </Flex>
    )
}