import { Text } from '@chakra-ui/react';


const Network = (props) => {
    const networkMap = new Map();
    networkMap.set(1287, "Moonbase Alpha Testnet");

    return(
        <Text>Connected on {networkMap.get(Number(props.children))}</Text>  
    )
}

export default Network;
