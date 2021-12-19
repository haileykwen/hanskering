import { Button, Container, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import ChakraNavbar from '../../components/ChakraNavbar'
import { Input } from '@chakra-ui/react'
import { put_telepon } from '../../services/profile'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '../../services/Url'
import ChakraFooter from '../../components/ChakraFooter'

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
        <div style={{minHeight: 'calc(100vh + 307px)'}}>
            <ChakraNavbar />
            <Container minH='100vh' paddingTop='84px' paddingBottom='50px'>
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
            <div style={{width: '100%'}}>
                <ChakraFooter />
            </div>
        </div>
    )
}

export default ProfilePhone
