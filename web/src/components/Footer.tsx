import {
    Button,
    ButtonGroup,
    Box, 
    Heading,
    Divider,
    IconButton,
    Stack,
    Text,
  } from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub} from 'react-icons/fa';
import NextLink from 'next/link'; 
  
  export const Footer = () => (
    <Box maxWidth="full" as="footer" bg="#05386B"  bottom={0} textColor={"#EDF5E1"} >
      <Stack
        paddingLeft={1}
        spacing="8"
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        py={{ base: '12', md: '16' }}
      >
        <Stack  align="start">
            
          <Text color="muted">Powered by: </Text>
          <Heading fontWeight='bolder'> {"NZQR"} </Heading>
        </Stack>
        <Stack
          direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
          spacing={{ base: '12', md: '8' }}
        >
          <Stack direction="row" spacing="8">
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Product
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <NextLink href={"/"}>
                    <Button variant="link">Get Started</Button>
                </NextLink>
                <NextLink href="/login">
                    <Button variant="link">Login</Button>
                </NextLink>
                <NextLink href="/register">
                    <Button variant="link">Register</Button>
                </NextLink>
              </Stack>
            </Stack>
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Legal
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">Privacy</Button>
                <Button variant="link">Terms</Button>
                <Button variant="link">License</Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        paddingRight={1}
        pt="8"
        pb="12"
        justify="space-between"
        direction={{ base: 'column-reverse', md: 'row' }}
        align="center"
      >
        <ButtonGroup variant="ghost">
            <IconButton as="a" target="_blank" href="https://github.com/JorgeOchoaReyes/ResumeLinks/" rel="noopener noreferrer" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />}>
             </IconButton>
        </ButtonGroup>
      </Stack>
    </Box>
  )