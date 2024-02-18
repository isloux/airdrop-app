import { Button, Flex, VStack, Container, Box, Image, Center, Heading, List, ListItem, ListIcon, Link, HStack } from '@chakra-ui/react';
import { MdCheckCircle } from "react-icons/md";
import { useColorMode } from "@chakra-ui/react";
import NavBarWeb3 from '../components/navbar_web3';
import SmallWithLogoLeft from '../components/footer';
import { useEffect, useState } from 'react';
import { Contract } from 'ethers';
import factoryJson from "../factory.json";

const Home = () => {
    const [signer, setSigner] = useState(null);
    const [networkId, setNetworkId] = useState(0);
    const [account, setAccount] = useState(0);
    const [feeToken, setFeeToken] = useState(0);
    const [fee, setFee] = useState(0);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
            window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            });
        }
    });

    const { colorMode } = useColorMode();

    const callbackProvider = async (childData) => {
        setSigner(childData.signer);
        setNetworkId(childData.networkId);
        setAccount(childData.account);
        const deployedFactoryAddress = "0x968aef219BBE9f03a41d4098aaa674D21B6bD8e2";
        const factory = new Contract(deployedFactoryAddress, factoryJson.abi, childData.signer);
        const nAirdrops = await factory.getNumberOfAirdrops();
        console.log(nAirdrops);
        const ft = await factory.getFeeToken();
        setFeeToken(ft);
        const f = await factory.getFee();
        setFee(f);
    }

    return (
        <Flex height='100vh' flexDirection='column' bgSize='cover' bgPosition='center' bgRepeat='no-repeat' width="100%">
            <NavBarWeb3 parentCallback={callbackProvider} />
            <Container maxW='container.md' p={3}>
                <VStack spacing="16px" m={3}>
                    <Heading>BaldG airdrop factory</Heading>
                    <Center>
                        <Image boxSize="92px" src="/BaldG_192.png" alt="coin logo" />
                    </Center>
                    <Box textAlign='justify' fontSize="lg" bgColor={colorMode === "light" ? "base.200" : "base.400"} p={4} borderRadius={8} opacity="85%">
                        <List spacing={3}>
                            <ListItem><ListIcon as={MdCheckCircle} color='green.500' />An airdrop of 975,000,000 BALDG token will be distributed to all the addresses who participated in the fair launch presale.</ListItem>
                            <ListItem><ListIcon as={MdCheckCircle} color='green.500' />The amount of tokens distributed to each wallet will be proportional to the amount of BALDG tokens held at the time of the airdrop (not at the end of the presale).</ListItem>
                            <ListItem><ListIcon as={MdCheckCircle} color='green.500' />Someone actually needs to click on the Send airdrop button to send out the tokens to all the participants.</ListItem>
                        </List>
                    </Box>
                    <Box>Connect your wallet</Box>
                    <Link href='https://bscscan.com/address/0xB54874D9DdC4EF23e41D9677172De59583Fb251f#code'>Airdrop smart contract on BSC</Link>
                    <Box fontSize="3xl" textAlign="center">Only wallets participating in the presale will receive a token airdrop</Box>
                </VStack>
            </Container>
            <SmallWithLogoLeft />
        </Flex>
    );
}

export default Home;
