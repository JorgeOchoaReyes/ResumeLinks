import { Box } from '@chakra-ui/layout';
import React from 'react'

export type WrapperVariant = "small" | "regular"; 

interface WrapperProps {
    variant?: string 
}

const Wrapper: React.FC<WrapperProps> = ({children, variant="regular"}) => {
    
        let display; 

        if(variant =="landing") {
            display = <Box 
                            h={"100%"}
                            mx="auto" 
                            maxW={"100%"} 
                            w="100%"> 
                        {children}
                    </Box>
        }
        else if (variant =="auth") {
            display = <Box 
                            h={"100vh"}
                            mx="auto" 
                            maxW={"100%"} 
                            w="100%"> 
                        {children}
                    </Box>
        }
        else {
            display = <Box 
            h={"100%"}
            mx="auto" 
            maxW={ "800px"} 
            w="100%"> 
        {children}
    </Box>
        }

        return (
            <>
            {
              display
            }
            </>
        );
}

export default Wrapper; 