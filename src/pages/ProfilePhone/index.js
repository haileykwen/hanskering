import { Button, Container, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import ChakraNavbar from '../../components/ChakraNavbar'
import { Input } from '@chakra-ui/react'
import { put_telepon } from '../../services/profile'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '../../services/Url'

const ProfilePhone = () => {
    const [phone, setPhone] = React.useState('');
    const Navigate = useNavigate();
    const toast = useToast();
    const [loading, setLoading] = React.useState(false);

    const onSimpan = () => {
        setLoading(true);
        const data = { data: phone };
        put_telepon(
            data,
            resp => {
                setLoading(false);
                toast({
                    description: resp.data.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                Navigate(ROUTE.PROFILE_SETTING);
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
        document.title = "Hanskering | No. Telepon"
    }, []);

    return (
        <>
            <ChakraNavbar />
            <Container paddingTop='84px' paddingBottom='20px'>
                <Text>No. Telepon</Text>
                <Input 
                    marginTop='10px'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type='number'
                />
                <Button 
                    marginTop='20px'
                    width='full'
                    isDisabled={phone ? false : true}
                    isLoading={loading}
                    onClick={onSimpan}
                >Simpan</Button>
            </Container>
        </>
    )
}

export default ProfilePhone
