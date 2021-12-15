import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
  } from '@chakra-ui/react';
  
  export default function ChakraProductCard({product, onView}) {
    return (
      <Center py={5}>
        <Box
          role={'group'}
          p={6}
          maxW={'250px'}
          height={'300px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'150px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${product.foto})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={150}
              width={200}
              objectFit={'cover'}
              src={product.foto}
              onClick={() => onView(product.kode_barang)}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'xs'} textTransform={'uppercase'}>
              {product.brand}
            </Text>
            <Heading fontSize={'xs'} fontFamily={'body'} fontWeight={500} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
              {product.nama_barang}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xs'}>
                Rp. {product.harga}
              </Text>
              {/* <Text textDecoration={'line-through'} color={'gray.600'}>
                $199
              </Text> */}
            </Stack>
          </Stack>
        </Box>
      </Center>
    );
  }