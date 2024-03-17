import { Button, Flex, VStack, Container, Box, Image, Center, Heading, List, ListItem, ListIcon, Link } from '@chakra-ui/react';
import { MdCheckCircle } from "react-icons/md";
import { useColorMode } from "@chakra-ui/react";
import NavBarWeb3 from '../components/navbar_web3';
import SmallWithLogoLeft from '../components/footer';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Network from '../components/network';
import Factory from '../components/Factory';

const Home = () => {
    const [signer, setSigner] = useState(null);
    const [networkId, setNetworkId] = useState(0);
    const [account, setAccount] = useState(0);
    const [newAccount, setNewAccount] = useState(false);
    const [feeToken, setFeeToken] = useState(0);
    const [fee, setFee] = useState(0);
    const [factory, setFactory] = useState(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        if ((account.length > 0) && newAccount) {
            console.log(signer);
            localStorage.setItem('signer', JSON.stringify(signer));
            localStorage.setItem('networkId', JSON.stringify(networkId));
            localStorage.setItem('account', JSON.stringify(account));
        }
    }, [signer, networkId, account, newAccount]);

    // Ceci était dans un useEffect à l'origine
    const storedSigner = JSON.parse(localStorage.getItem('signer'));
    const storedNetworkId = JSON.parse(localStorage.getItem('networkId'));
    const storedAccount = JSON.parse(localStorage.getItem('account'));
    if (storedSigner)
        setSigner(storedSigner);
    if (storedNetworkId)
        setNetworkId(storedNetworkId);
    if (storedAccount)
        setAccount(storedAccount);  

    const { colorMode } = useColorMode();

    const callbackProvider = async (childData) => {
        setSigner(childData.signer);
        setNetworkId(childData.networkId);
        setAccount(childData.account);
        setNewAccount(childData.newAccount);
/*         const deployedFactoryAddress = "0x968aef219BBE9f03a41d4098aaa674D21B6bD8e2";
        const localFactory = new Contract(deployedFactoryAddress, factoryJson.abi, childData.signer);
        setFactory(localFactory);
        const ft = await localFactory.getFeeToken();
        setFeeToken(ft);
        const f = await localFactory.getFee();
        setFee(f); */
    }

    if (signer)
        return(
            <Flex height='100vh' flexDirection='column' bgSize='cover' bgPosition='center' bgRepeat='no-repeat' width="100%">
                <NavBarWeb3 parentCallback={callbackProvider} />
                <Container maxW='container.md' p={3}>
                    <VStack spacing="16px" m={3}>
                        <Heading>BaldG airdrop factory</Heading>
                        <Center>
                            <Image boxSize="92px" src="/BaldG_192.png" alt="coin logo" />
                        </Center>            <Box>pute</Box>
                        <Network>{networkId}</Network>
                        <Factory>{signer}</Factory>
                        <Button onClick={() => navigate("/create-airdrop")}>Create airdrop</Button>
                    </VStack>
                </Container>
                <SmallWithLogoLeft />
            </Flex>  
        );

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
                            <ListItem><ListIcon as={MdCheckCircle} color='green.500' />Bonjour air launch</ListItem>
                            <ListItem><ListIcon as={MdCheckCircle} color='green.500' />Beer (at the end)</ListItem>
                            <ListItem><ListIcon as={MdCheckCircle} color='green.500' />Ready to send out the tokens to all the participants</ListItem>
                        </List>
                    </Box>
                    <Box>Connect your wallet</Box>
                    <Link href='https://bscscan.com/address/0xB54874D9DdC4EF23e41D9677172De59583Fb251f#code'>Old airdrop smart contract on BSC</Link>
                    <Box fontSize="3xl" textAlign="center">Only wallets holding the token at the time of the airdrop will receive an airdrop</Box>
                </VStack>
            </Container>
            <SmallWithLogoLeft />
        </Flex>
    );
}

export default Home;
