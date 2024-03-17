import { SimpleGrid, Text, Button } from "@chakra-ui/react";
import { Contract } from 'ethers';
import factoryJson from "../factory.json";

const Factory = (props) => {
    const deployedFactoryAddress = "0x968aef219BBE9f03a41d4098aaa674D21B6bD8e2";
    const factory = new Contract(deployedFactoryAddress, factoryJson.abi, props.children);

    
    const retrieveAirdrops = async () => {
        const nAirdrops = await factory.getNumberOfAirdrops();
        console.log(Number(nAirdrops)); 
    }

    return(
        <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3}} spacing={4}>

            </SimpleGrid>
        </>

    );
}

export default Factory;