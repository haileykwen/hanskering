import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'

export const CartOrderSummary = ({totalPrice}) => {
    return (
        <Stack 
            spacing="8" 
            borderWidth="1px" 
            rounded="lg" 
            padding={{ base: "20px", sm: "8", md: "8", lg: "8" }} 
            width="full"
        >
            <Stack spacing="6">
                <Flex 
                    justify="space-between" 
                    align={{ base: "left", sm: "center", md: "center", lg: "center" }} 
                    direction={{ base: "column", sm: "row", md: "row", lg: "row" }}
                >
                    <Text fontSize="lg" fontWeight="semibold">
                        Total
                    </Text>
                    <Text fontSize="xl" fontWeight="extrabold">
                        {formatPrice(totalPrice)}
                    </Text>
                </Flex>
            </Stack>
            <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
                Checkout
            </Button>
        </Stack>
    )
}