import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { ProductCard } from './common/ProductCard'
import { ProductGrid } from './common/ProductGrid'

export const ChakraGridCard = ({products, onView}) => (
  <Box
    maxW="7xl"
    mx="auto"
    // px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <ProductGrid>
      {products && products.map((product) => (
        <ProductCard key={product.kode_barang} product={product} onView={onView} />
      ))}
    </ProductGrid>
  </Box>
)