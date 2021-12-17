import {
    AspectRatio,
    Box,
    Button,
    Image,
    Skeleton,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react'
  import { PriceTag } from './PriceTag'
  
  export const ProductCard = (props) => {
    const { product, rootProps, onView } = props
    const { nama_barang, foto, harga, salePrice } = product
    return (
      <Stack
        spacing={useBreakpointValue({
          base: '4',
          md: '5',
        })}
        shadow={'lg'}
        padding={'10px'}
        rounded={'md'}
        {...rootProps}
        maxW='211px'
      >
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={foto}
              alt={nama_barang}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({
                base: 'md',
                md: 'xl',
              })}
              _hover={{cursor: 'pointer'}}
              onClick={() => onView(product.kode_barang)}
            />
          </AspectRatio>
          {/* <FavouriteButton
            position="absolute"
            top="4"
            right="4"
            aria-label={`Add ${nama_barang} to your favourites`}
          /> */}
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text fontWeight="medium" color={'gray.700'} height={'96px'} _hover={{cursor: 'pointer'}} onClick={() => onView(product.kode_barang)}>
              {nama_barang}
            </Text>
            <PriceTag price={harga} salePrice={salePrice} currency="IDR" />
          </Stack>
          {/* <HStack>
            <Rating defaultValue={rating} size="sm" />
            <Text fontSize="sm" color={'gray.600', 'gray.400'}>
              12 Reviews
            </Text>
          </HStack> */}
        </Stack>
        <Stack>
          <Button colorScheme="blue" isFullWidth overflowWrap={'break-word'} onClick={() => onView(product.kode_barang)}>
            Detail
          </Button>
          {/* <FavouriteButton /> */}
          {/* <Link
            textDecoration="underline"
            fontWeight="medium"
            color={'gray.600', 'gray.400'}
          >
            Langsung Beli
          </Link> */}
        </Stack>
      </Stack>
    )
  }