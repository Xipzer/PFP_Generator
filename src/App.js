/**
 * Code by ~Xipzer
 */

import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import Background from "./Assets/background.jpg";
import { Generator } from "./Forms/Generator";

const SCANLINE = {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
    pointerEvents: "none",
    zIndex: 1,
};

function App() {
    return (
        <Box
            minH="100vh"
            position="relative"
            overflow="auto"
            backgroundImage={`url(${Background})`}
            backgroundAttachment="fixed"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
        >
            <Box position="fixed" top={0} left={0} right={0} bottom={0} bg="rgba(10, 10, 15, 0.82)" _after={SCANLINE} pointerEvents="none" />
            <Flex direction="column" align="center" minH="100vh" position="relative" zIndex={2} px={4} py={8}>
                <Box mb={8} textAlign="center">
                    <Text
                        fontFamily="'IBM Plex Mono', monospace"
                        fontSize={["2xl", "3xl", "4xl"]}
                        fontWeight={700}
                        letterSpacing="0.12em"
                        textTransform="uppercase"
                    >
                        <Text as="span" bgGradient="linear(to-r, #00ffc8, #00b4d8)" bgClip="text">FalconX</Text>
                        <Text as="span" color="#2a2a3a" mx={2}>/</Text>
                        <Text as="span" bgGradient="linear(to-r, #ff4d4d, #ff8c00, #ffd700)" bgClip="text">Kochi Ken</Text>
                    </Text>
                    <Text
                        fontFamily="'IBM Plex Mono', monospace"
                        fontSize={["xs", "sm"]}
                        color="#4a4a5a"
                        letterSpacing="0.3em"
                        textTransform="uppercase"
                        mt={1}
                    >
                        PFP Generator
                    </Text>
                </Box>
                <Generator />
                <Box mt={10} mb={4} textAlign="center">
                    <Text fontFamily="'IBM Plex Mono', monospace" fontSize="10px" color="#2a2a3a" letterSpacing="0.15em" textTransform="uppercase">
                        Built by{" "}
                        <Link href="https://x.com/Xipzer" isExternal color="#3a3a4a" _hover={{ color: "#00ffc8" }} transition="color 0.2s">
                            ~Xipzer
                        </Link>
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default App;
