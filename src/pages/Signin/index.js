import { Button } from '@chakra-ui/button'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Container, Heading } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { post_signin } from '../../services/auth'
import { cksClient } from '../../services/Core'
import { Text } from '@chakra-ui/react'
import { ROUTE } from '../../services/Url'

const Signin = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [loading, setLoading] = React.useState(false);
    const toast = useToast()
    const Navigate = useNavigate();

    const [form, setForm] = React.useState({
        email: "",
        password: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSignin = async (e) => {
        e.preventDefault();
        setLoading(true);
        post_signin(
            form,
            resp => {
                setLoading(false);
                toast({
                    description: resp.data.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                cksClient().set('_authToken', resp.data.token, {
                   path: '/',
                   sameSite: 'lax' 
                });
                setTimeout(() => {
                    Navigate("/");
                }, 1500);
            },
            error => {
                setLoading(false);
                toast({
                    description: error.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        );
    }

    React.useEffect(() => {
        document.title = "Hanskering | Masuk"
    }, []);

    return (
        <Container minH="100vh" alignItems="center" justifyContent="center" centerContent>

            <form onSubmit={onSignin}>
                <Heading marginBottom="60px" lineHeight="100%">Yuk, sepatu kece nungguin kamu buat dicheckout nih!</Heading>
                <Input 
                    placeholder='Email' 
                    focusBorderColor="black"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isDisabled={loading}
                />
                <InputGroup marginTop="5px">
                    <Input
                        focusBorderColor="black"
                        type={show ? 'text' : 'password'}
                        placeholder='Kata Sandi'
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        isDisabled={loading}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='xs' onClick={handleClick} _focus={{boxShadow: "none"}}>
                            {show ? 'Tutup' : 'Lihat'}
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <Button
                    type="submit"
                    isLoading={loading}
                    loadingText='Masuk ...'
                    marginTop="20px"
                    width="100%"
                    backgroundColor="black"
                    transition="0.3s"
                    outline="0"
                    color="white"
                    _hover={{backgroundColor: "white", color: "black", border: "2px solid black", transition: "0.3s", borderColor:"black"}}
                    _focus={{boxShadow: "none"}}
                >
                    Masuk
                </Button>

                <Text
                    marginTop={'30px'}
                    textAlign={'center'}
                >Belum punya akun? Yuk <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => Navigate(ROUTE.AUTH_SIGNUP)}>daftar!</span></Text>
            </form>
        </Container>
    )
}

export default Signin
