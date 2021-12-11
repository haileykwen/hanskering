import { Button } from '@chakra-ui/button'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Container, Heading } from '@chakra-ui/layout'
import React from 'react'

const Signup = () => {
    const [show, setShow] = React.useState(false)
    const [show2, setShow2] = React.useState(false)
    const handleClick = () => setShow(!show)
    const handleClick2 = () => setShow2(!show2)

    return (
        <Container minH="100vh" alignItems="center" justifyContent="center" centerContent>
            <Heading marginBottom="60px" lineHeight="100%">Buat akun dan mulai checkout sepatu-sepatu keren!</Heading>

            <Input placeholder='Email' focusBorderColor="black" />
            <Input placeholder='Nama Lengkap' marginTop="5px" focusBorderColor="black" />
            <InputGroup marginTop="5px">
                <Input
                    focusBorderColor="black"
                    type={show ? 'text' : 'password'}
                    placeholder='Kata Sandi'
                />
                <InputRightElement width="4.5rem">
                    <Button h='1.75rem' size='xs' onClick={handleClick} _focus={{outline: "none"}}>
                        {show ? 'Tutup' : 'Lihat'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <InputGroup marginTop="5px">
                <Input
                    focusBorderColor="black"
                    type={show2 ? 'text' : 'password'}
                    placeholder='Masukkan Kembali Kata Sandi'
                />
                <InputRightElement width="4.5rem">
                    <Button h='1.75rem' size='xs' onClick={handleClick2} _focus={{outline: "none"}}>
                        {show2 ? 'Tutup' : 'Lihat'}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <Button
                isLoading={false}
                loadingText='Submitting'
                marginTop="20px"
                width="100%"
                backgroundColor="black"
                transition="0.3s"
                color="white"
                _hover={{backgroundColor: "white", color: "black", border: "2px solid black", transition: "0.3s"}}
                _focus={{boxShadow: "none"}}
            >
                Buat Akun
            </Button>
        </Container>
    )
}

export default Signup
