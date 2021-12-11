import { Button } from '@chakra-ui/button'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Container, Heading } from '@chakra-ui/layout'
import React from 'react'
import { post_signup } from '../../services/auth'
require('dotenv').config();

const Signup = () => {
    const [show, setShow] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const handleClick = () => setShow(!show);
    const handleClick2 = () => setShow2(!show2);
    
    let loading = false;

    const [form, setForm] = React.useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSignup = () => {
        loading = true;
        post_signup(
            form,
            resp => {
                loading = false;
                console.log(resp);
            },
            error => {
                loading = false;
                console.log(error);
            }
        );
    }

    return (
        <Container minH="100vh" alignItems="center" justifyContent="center" centerContent>
            <form onSubmit={onSignup}>
                <Heading marginBottom="60px" lineHeight="100%">Buat akun dan mulai checkout sepatu-sepatu keren!</Heading>

                <Input name='fullname' placeholder='Nama Lengkap' focusBorderColor="black" value={form.fullname} onChange={handleChange} required />
                <Input name='email' placeholder='Email' marginTop="5px" focusBorderColor="black" value={form.email} onChange={handleChange} required/>
                <InputGroup marginTop="5px">
                    <Input
                        required
                        focusBorderColor="black"
                        type={show ? 'text' : 'password'}
                        placeholder='Kata Sandi'
                        name='password'
                        onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h='1.75rem' size='xs' onClick={handleClick} _focus={{outline: "none"}}>
                            {show ? 'Tutup' : 'Lihat'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <InputGroup marginTop="5px">
                    <Input
                    required
                        focusBorderColor="black"
                        type={show2 ? 'text' : 'password'}
                        placeholder='Masukkan Kembali Kata Sandi'
                        name='confirmPassword'
                        onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h='1.75rem' size='xs' onClick={handleClick2} _focus={{outline: "none"}}>
                            {show2 ? 'Tutup' : 'Lihat'}
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <Button
                    type='submit'
                    isLoading={loading}
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
            </form>
        </Container>
    )
}

export default Signup
