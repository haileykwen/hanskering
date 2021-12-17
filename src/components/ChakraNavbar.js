import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Icon,
    Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../services/Url';
import { cksClient } from '../services/Core';
import { get_userData } from '../services/profile';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../assets';

export default function ChakraNavbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state);

    const onSignout = () => {
        cksClient().set('_authToken', null, {
            path: '/',
            sameSite: 'lax'
        });
        Navigate(ROUTE.AUTH_SIGNIN);
    }

    const getUserData = () => {
        get_userData(
            resp => {
                if (resp.status === 200) {
                    const userData = resp.data.data;
                    dispatch({
                        type: "UPDATE_USER_DATA",
                        payload: userData
                    });
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    React.useEffect(() => {
        getUserData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position={'fixed'} width={'100%'} zIndex={99}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Image cursor='pointer' onClick={() => Navigate('/')} src={Logo} width={'100px'} marginLeft={'-20px'} />
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={2}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            {userData !== null && <>
                                <Button onClick={() => Navigate(ROUTE.PROFILE_CART)}>
                                    <Icon as={FiShoppingCart} transition="all 0.15s ease" />
                                </Button>

                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <Avatar
                                            size={'sm'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </MenuButton>
                                    <MenuList alignItems={'center'}>
                                        <br />
                                        <Center>
                                            <Avatar
                                                size={'2xl'}
                                                src={'https://avatars.dicebear.com/api/male/username.svg'}
                                            />
                                        </Center>
                                        <br />
                                        <Center>
                                            <p>{userData.fullname}</p>
                                        </Center>
                                        <br />
                                        <MenuDivider />
                                        <MenuItem onClick={() => Navigate(ROUTE.PROFILE_SETTING)}>Pengaturan Akun</MenuItem>
                                        <MenuItem onClick={() => Navigate(ROUTE.PROFILE_ORDER)}>Pesananku</MenuItem>
                                        <MenuItem onClick={onSignout}>Keluar</MenuItem>
                                    </MenuList>
                                </Menu>
                            </>}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}