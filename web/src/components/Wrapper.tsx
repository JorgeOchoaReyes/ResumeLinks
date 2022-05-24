import { Box } from '@chakra-ui/layout';
import React from 'react'

export type WrapperVariant = "small" | "regular"; 

interface WrapperProps {
    variant?: WrapperVariant 
}

const Wrapper: React.FC<WrapperProps> = ({children, variant="regular"}) => {
        return (
            <Box 
                    h={"100%"}
                    mx="auto" 
                    maxW={variant === "regular" ? "800px":"100%"} 
                    w="100%"> 
                {children}
            </Box>
        );
}

export default Wrapper; 