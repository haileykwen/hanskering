import { Icon, IconButton } from '@chakra-ui/react'
import { FiEye } from 'react-icons/fi'

export const FavouriteButton = (props) => (
    <IconButton
      size="sm"
      _hover={{
        transform: 'scale(1.1)',
      }}
      sx={{
        ':hover > svg': {
          transform: 'scale(1.1)',
        },
      }}
      transition="all 0.15s ease"
      icon={<Icon as={FiEye} transition="all 0.15s ease" />}
      boxShadow="base"
      _focus={{boxShadow: "none"}}
      {...props}
    />
)