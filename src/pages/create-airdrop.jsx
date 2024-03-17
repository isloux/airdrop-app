import { FormLabel, Input, Button, Flex, FormControl, Container, Box } from '@chakra-ui/react';
import NavBarWeb3 from '../components/navbar_web3';
import SmallWithLogoLeft from '../components/footer';

const CreateAirdrop = () => {

    const handleSubmit = async () => {

    }

    return(
        <Flex height='100vh' flexDirection='column' bgSize='cover' bgPosition='center' bgRepeat='no-repeat' width="100%">
            <NavBarWeb3 />
            <Container maxW='container.md' p={3}>
            <Box as="form" onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel htmlFor="address">Token address</FormLabel>
                    <Input id="address" type="string" placeholder="Enter the token address" />
                    <FormLabel htmlFor="amount">Amount</FormLabel>
                    <Input id="amount" type="number" placeholder="Enter the amount to be airdropped" />
                    <FormLabel htmlFor="dateTime">Select Date and Time</FormLabel>
               </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">
                    Submit
                </Button>
            </Box>
            </Container>
            <SmallWithLogoLeft />
        </Flex>  
    )
}

export default CreateAirdrop;