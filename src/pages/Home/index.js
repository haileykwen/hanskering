import { Button, Container } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { cksClient } from '../../services/Core'
import { ROUTE } from '../../services/Url'

const Home = () => {
    const Navigate = useNavigate();

    const onSignout = () => {
        cksClient().set('_authToken', null, {
            path: '/',
            sameSite: 'lax' 
        });
        Navigate(ROUTE.AUTH_SIGNIN);
    }

    return (
        <Container minH="100vh" maxW="3xl">
            Home
            <Button
                marginTop="20px"
                width="100%"
                backgroundColor="black"
                transition="0.3s"
                color="white"
                _hover={{backgroundColor: "white", color: "black", border: "2px solid black", transition: "0.3s"}}
                _focus={{boxShadow: "none"}}
                onClick={onSignout}
            >
                Keluar
            </Button>
        </Container>
    )
}

export default Home
