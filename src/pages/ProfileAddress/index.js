import { Button, Container, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import ChakraNavbar from '../../components/ChakraNavbar'
import { get_city, get_province, put_address } from '../../services/profile'
import { Select, Textarea } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '../../services/Url'

const ProfileAddress = () => {
    const [provinces, setProvinces] = React.useState([]);
    const [chooseProvince, setChooseProvince] = React.useState(null);

    const [cities, setCities] = React.useState([]);
    const [chooseCity, setChooseCity] = React.useState(null);

    const [fullAddress, setFullAddress] = React.useState('');

    const [loading, setLoading] = React.useState(false);
    const toast = useToast();
    const Navigate = useNavigate();

    const getProvince = () => {
        get_province(
            resp => {
                const provincesData = resp.data.rajaongkir.results;
                setProvinces(provincesData);
            },
            error => {
                console.log(error);
            }
        );
    }

    const getCity = () => {
        if (chooseProvince) {
            const params = {province: chooseProvince.province_id}
            get_city(
                params,
                resp => {
                    const cityData = resp.data.rajaongkir.results;
                    setCities(cityData);
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    const onChangeProvince = (e) => {
        const value = e.target.value;
        const target = provinces.findIndex(x => x.province_id === value);
        const choosed = provinces[target];
        setChooseProvince(choosed);
    }

    const onChangeCity = (e) => {
        const value = e.target.value;
        const target = cities.findIndex(x => x.city_id === value);
        const choosed = cities[target];
        setChooseCity(choosed);
    }

    const onSimpan = () => {
        setLoading(true);
        const data = { data: { province: chooseProvince, city: chooseCity, full_address: fullAddress } };
        put_address(
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
        document.title = "Hanskering | Alamat"
        getProvince();
    }, []);

    React.useEffect(() => {
        getCity();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chooseProvince]);

    return (
        <>
            <ChakraNavbar />
            <Container paddingTop='84px' paddingBottom='20px'>
                <Text>Pilih Provinsi</Text>
                <Select marginTop='10px' placeholder='Select option' onChange={(e) => onChangeProvince(e)}>
                    {provinces.length > 0 && provinces.map((province, index) => (
                        <option key={index} value={province.province_id}>{province.province}</option>
                    ))}
                </Select>

                {cities.length > 0 && (
                    <>
                        <Text marginTop='20px'>Pilih Kota</Text>
                        <Select marginTop='10px' placeholder='Select option' onChange={(e) => onChangeCity(e)}>
                            {cities.map((city, index) => (
                                <option key={index} value={city.city_id}>{city.city_name}</option>
                            ))}
                        </Select>
                    </>
                )
                }

                {chooseProvince && chooseCity && 
                    <>
                        <Text marginTop='20px'>Alamat Lengkap</Text>
                        <Textarea
                            marginTop='10px'
                            value={fullAddress}
                            onChange={(e) => setFullAddress(e.target.value)}
                        />
                    </>
                }

                <Button 
                    marginTop='40px' 
                    width='full'
                    isDisabled={chooseProvince && chooseCity && fullAddress ? false : true}
                    onClick={onSimpan}
                    isLoading={loading}
                >Simpan</Button>
            </Container>
        </>
    )
}

export default ProfileAddress
