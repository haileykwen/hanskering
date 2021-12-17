import { SimpleGrid } from '@chakra-ui/react'
import * as React from 'react'

export const ProductGrid = (props) => {
  const columns = React.useMemo(() => {
    // const count = React.Children.toArray(props.children).filter(React.isValidElement).length
    return {
      base: Math.min(2, 2),
      sm: Math.min(3, 3),
      md: Math.min(4, 4),
      lg: Math.min(4, 4),
      xl: Math.min(4, 4),
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children])
  return (
    <SimpleGrid
      columns={columns}
      columnGap={{
        base: '2',
        md: '3',
      }}
      rowGap={{
        base: '4',
        md: '5',
      }}
      {...props}
    />
  )
}