import { Button } from '@chakra-ui/button'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Container } from '@chakra-ui/layout'
import React from 'react'

const Signin = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Container minH="100vh" alignItems="center" justifyContent="center" centerContent>
            <Input placeholder='Email' focusBorderColor="black"/>
            <InputGroup marginTop="5px" focusBorderColor="black">
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Kata Sandi'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='xs' onClick={handleClick} _focus={{outlineColor: "black"}}>
                    {show ? 'Tutup' : 'Lihat'}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <Button
                isLoading={false}
                loadingText='Submitting'
                colorScheme='teal'
                marginTop="15px"
                width="100%"
                bg="black"
                backgroundColor="black"
                transition="0.3s"
                _hover={{backgroundColor: "white", color: "black", border: "2px solid black", transition: "0.3s", borderColor:"black"}}
                _pressed={{bg: "black", backgroundColor: "black"}}
            >
                Masuk
            </Button>
        </Container>
    )
}

export default Signin
