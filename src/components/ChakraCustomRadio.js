import { Box, HStack, useRadio, useRadioGroup } from '@chakra-ui/react'
import React from 'react'

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                    bg: 'black',
                    color: 'white'
                }}
                px={2}
                py={2}
            >
                {props.children}
            </Box>
        </Box>
    )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function ChakraCustomRadio() {
    const options = ['Vans', 'Converse', 'All Brand']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'All Brand',
        onChange: console.log('change'),
    })

    const group = getRootProps()

    return (
        <HStack {...group}>
            {options.map((value) => {
                const radio = getRadioProps({ value })
                // console.log(radio)
                return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                )
            })}
        </HStack>
    )
}

export default ChakraCustomRadio