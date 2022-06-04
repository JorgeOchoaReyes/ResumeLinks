import { Box, Heading, Image, VStack, Flex} from '@chakra-ui/react';
import React from 'react'
import  Champs from '../../Util/champs.jpg'; 

interface AchievementsProps {

}

const Milestones = () => {
    return (
        <Box>
            <div> Image of trophies that your team has obtained </div>
        </Box>
    )
}

export const FullImg: React.FC<AchievementsProps> = ({}) => {
    return (
        <Flex h={{base: "auto"}} py={20} bg={"#EDF5E1"} w="full" justifyContent='center' textColor="white" direction={{base: "column", md: "row"}} >
            <VStack >
                <Heading textColor={"#5CDB95"} paddingBottom={10}> Simple and Consices Design </Heading>
                <Flex w="75%" align="center">
                    <Image 
                    boxShadow="0 6px 6px hsl(0deg 0% 0% / 0.3)"
                        src={"https://firebasestorage.googleapis.com/v0/b/resume-b9fc8.appspot.com/o/design.jpg?alt=media&token=435b2ae2-0d85-4b84-9dab-0eb500e9dbdc"}
                        alt="Achivements"
                        />
                </Flex>

            </VStack>
        </Flex> 
    );
}