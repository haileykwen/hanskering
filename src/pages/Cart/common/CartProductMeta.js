import { Box, CloseButton, Image, Stack, Text } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'

export const CartProductMeta = (props) => {
    const { image, name, description, harga, onClickDelete } = props
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
                    src={image}
                    alt={name}
                    draggable="false"
                    loading="lazy"
                />
                <Box>
                    <Stack spacing="0.5">
                        <Text fontWeight="medium">{name}</Text>
                        <Text color={'gray.600'} fontSize="sm">
                            Ukuran {description}
                        </Text>
                        <PriceTag price={harga} currency={'IDR'} />
                    </Stack>
                </Box>
            </Stack>
            <CloseButton onClick={onClickDelete} margin={'auto'} />
        </Stack>
    )
}