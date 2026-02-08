/**
 * Code by ~Xipzer
 */

import React, { useEffect, useRef, useCallback, useState } from "react";
import { Box, Button, Flex, Select, Text, Stack, VStack, Spinner } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { backgrounds, circles, bodies, mouths, eyes, outfits } from "../Assets/Images";

const CANVAS_SIZE = 400;

const LAYERS = [
    { label: "Background", data: backgrounds, names: ["Blue", "Bronze", "Brown", "Dark Green", "Dark Purple", "Green", "Light Blue", "Light Green", "Light Purple", "Light Red", "Navy Blue", "Ocean Blue", "Purple", "Red", "Turquoise", "Yellow"] },
    { label: "Border", data: circles, names: ["Flat", "Black", "Blue", "Green", "Lime", "Ocean Blue", "Orange", "Pink", "Purple", "Red", "Violet", "Yellow"] },
    { label: "Body", data: bodies, names: ["Black", "Black-White", "Brown", "Fire", "Grey", "Lightgrey-Black", "Purple", "White"] },
    { label: "Mouth", data: mouths, names: ["Black 1", "Black 2", "Black 3", "Black 4", "Brown 1", "Brown 2", "Brown 3", "Brown 4", "Grey 1", "Grey 2", "Grey 3", "Grey 4", "Lightgrey 1", "Lightgrey 2", "Lightgrey 3", "Lightgrey 4", "Purple 1", "Purple 2", "Purple 3", "Purple 4", "White 1", "White 2", "White 3", "White 4"] },
    { label: "Eyes", data: eyes, names: ["Black 1", "Black 2", "Black 3", "Black 4", "Brown 1", "Brown 2", "Brown 3", "Brown 4", "Grey 1", "Grey 2", "Grey 3", "Grey 4", "Lightgrey 1", "Lightgrey 2", "Lightgrey 3", "Lightgrey 4", "Purple 1", "Purple 2", "Purple 3", "Purple 4", "White 1", "White 2", "White 3", "White 4"] },
    { label: "Outfit", data: outfits, names: ["Kimono White", "Knot Scarf Black", "Knot Scarf Blue", "Knot Scarf Green", "Knot Scarf Grey", "Knot Scarf Purple", "Knot Scarf Red", "Rogue High Collar Blue", "Rogue Streetwear", "Spiked Choker", "Baggy Top Black", "Baggy Top Blue", "Baggy Top Green", "Baggy Top Grey", "Baggy Top Purple", "Baggy Top Red", "Baggy Top White", "Bandit Scarf Red", "Belt Neck Skull", "Chinese Trad. Black", "Chinese Trad. Blue", "Chinese Trad. Green", "Chinese Trad. Grey", "Chinese Trad. Red", "Chinese Trad. White", "Cyber Cat Hoodie", "Cyber Hoodie Pink", "Cyber Pendant Blue", "Formal Black/Grey", "Formal Black/Purple", "Formal Black/White", "Formal Black/Yellow", "Formal Blue/Black", "Formal Grey/Black", "Formal Purple/Black", "Formal Red/Black", "Formal White/Black", "Formal Yellow/Black", "Jacket Brown/Beige", "Jacket Brown/Black", "Jacket Brown/Blue", "Jacket Brown/Green", "Jacket Brown/Grey", "Jacket Brown/Purple", "Jacket Brown/Red", "Jacket Brown/White", "Jacket Highneck Blue", "Jacket Highneck Green", "Jacket Highneck Maroon", "Jacket Highneck Red", "Jacket Highneck Yellow", "Kimono 2 Black", "Kimono 2 Blue", "Kimono 2 Green", "Kimono 2 Grey", "Kimono 2 Red", "Kimono Black", "Kimono Blue", "Kimono Green", "Kimono Grey", "Kimono Purple", "Kimono Red"] },
];

const DRAW_ORDER = [0, 2, 3, 4, 5, 1];

const loadImage = (src) => new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
});

const SELECT_SX = {
    paddingLeft: "14px",
    paddingRight: "36px",
    cursor: "pointer",
    "& + .chakra-select__icon-wrapper": {
        right: "10px",
        color: "#4a4a5a",
    },
};

const LayerSelect = ({ layer, index, onChange }) => (
    <Box mb={4}>
        <Text
            fontFamily="'IBM Plex Mono', monospace"
            fontSize="10px"
            fontWeight={600}
            color="#4a4a5a"
            letterSpacing="0.2em"
            textTransform="uppercase"
            mb={1}
        >
            {layer.label}
        </Text>
        <Select
            icon={<ChevronDownIcon />}
            variant="filled"
            size="sm"
            color="#c0c0d0"
            bg="#12121a"
            borderRadius="4px"
            h="38px"
            border="1px solid #1e1e2e"
            _hover={{ bg: "#161620", borderColor: "#2a2a3a" }}
            _focus={{ bg: "#12121a", borderColor: "#00ffc8", boxShadow: "0 0 0 1px #00ffc8" }}
            transition="all 0.15s"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize="13px"
            sx={SELECT_SX}
            onChange={(e) => onChange(index, parseInt(e.target.value))}
        >
            {layer.names.map((name, i) => (
                <option key={i} value={i}>{name}</option>
            ))}
        </Select>
    </Box>
);

const ActionButton = ({ children, onClick, variant = "primary", isDisabled }) => {
    const styles = {
        primary: {
            bg: "#00ffc8",
            color: "#0a0a0f",
            _hover: { bg: "#00d4a6", transform: "translateY(-1px)" },
            _active: { bg: "#00a883", transform: "translateY(0)" },
        },
        secondary: {
            bg: "#1a1a2a",
            color: "#c0c0d0",
            border: "1px solid #2a2a3a",
            _hover: { bg: "#22222f", borderColor: "#3a3a4a", transform: "translateY(-1px)" },
            _active: { bg: "#1a1a2a", transform: "translateY(0)" },
        },
        danger: {
            bg: "transparent",
            color: "#ff4757",
            border: "1px solid #2a1a1a",
            _hover: { bg: "#1a0a0a", borderColor: "#ff4757", transform: "translateY(-1px)" },
            _active: { bg: "#2a0a0a", transform: "translateY(0)" },
        },
    };

    return (
        <Button
            w="100%"
            h="40px"
            borderRadius="4px"
            transition="all 0.15s"
            isDisabled={isDisabled}
            _disabled={{ opacity: 0.5, cursor: "not-allowed", transform: "none" }}
            {...styles[variant]}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

const Panel = ({ children, ...props }) => (
    <Box
        bg="rgba(14, 14, 22, 0.92)"
        border="1px solid #1a1a2a"
        borderRadius="6px"
        p={5}
        backdropFilter="blur(8px)"
        {...props}
    >
        {children}
    </Box>
);

const SectionLabel = ({ children }) => (
    <Box mb={4} pb={2} borderBottom="1px solid #1a1a2a">
        <Text
            fontFamily="'IBM Plex Mono', monospace"
            fontSize="11px"
            fontWeight={600}
            color="#00ffc8"
            letterSpacing="0.15em"
            textTransform="uppercase"
        >
            {children}
        </Text>
    </Box>
);

const LoadingOverlay = () => (
    <Flex
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        align="center"
        justify="center"
        bg="rgba(10, 10, 15, 0.7)"
        zIndex={3}
        borderRadius="4px"
    >
        <Spinner
            size="lg"
            thickness="2px"
            speed="0.8s"
            color="#00ffc8"
            emptyColor="#1a1a2a"
        />
    </Flex>
);

export const Generator = () => {
    const canvasRef = useRef(null);
    const choicesRef = useRef(new Array(6).fill(0));
    const [loading, setLoading] = useState(true);

    const generate = useCallback(async () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        setLoading(true);

        const images = await Promise.all(
            LAYERS.map((layer, i) => loadImage(layer.data[choicesRef.current[i]]))
        );

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        DRAW_ORDER.forEach((i) => ctx.drawImage(images[i], 0, 0));

        setLoading(false);
    }, []);

    useEffect(() => { generate(); }, [generate]);

    const handleChange = (index, value) => {
        choicesRef.current[index] = value;
        generate();
    };

    const randomize = () => {
        choicesRef.current = LAYERS.map((layer) => Math.floor(Math.random() * layer.data.length));
        generate();
    };

    const resetAll = () => {
        choicesRef.current = new Array(6).fill(0);
        generate();
    };

    const download = () => {
        try {
            const a = document.createElement("a");
            a.download = "PFP.png";
            a.href = canvasRef.current.toDataURL();
            a.click();
        } catch {
            console.log("Please refresh your page.");
        }
    };

    return (
        <Stack
            direction={["column", "column", "row"]}
            spacing={5}
            align={["center", "center", "stretch"]}
            justify="center"
            w="100%"
            maxW="1100px"
        >
            <Panel flex="1" minW={["100%", "100%", "260px"]} maxW={["100%", "100%", "300px"]} order={[2, 2, 1]} display="flex" flexDirection="column">
                <SectionLabel>Customize</SectionLabel>
                {LAYERS.slice(0, 3).map((layer, i) => (
                    <LayerSelect key={i} layer={layer} index={i} onChange={handleChange} />
                ))}
            </Panel>

            <Flex direction="column" align="center" justify="center" order={[1, 1, 2]} alignSelf="stretch">
                <Panel position="relative" overflow="hidden">
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="radial-gradient(ellipse at center, rgba(0,255,200,0.03) 0%, transparent 70%)"
                        pointerEvents="none"
                        zIndex={0}
                    />
                    <Box position="relative" zIndex={1}>
                        <canvas
                            ref={canvasRef}
                            width={CANVAS_SIZE}
                            height={CANVAS_SIZE}
                            style={{
                                display: "block",
                                borderRadius: "4px",
                                maxWidth: "100%",
                                height: "auto",
                            }}
                        />
                        {loading && <LoadingOverlay />}
                    </Box>
                </Panel>
                <Text
                    fontFamily="'IBM Plex Mono', monospace"
                    fontSize="9px"
                    color="#2a2a3a"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    mt={2}
                    textAlign="center"
                >
                    {LAYERS.reduce((acc, l) => acc * l.data.length, 1).toLocaleString()} combinations
                </Text>
            </Flex>

            <Panel flex="1" minW={["100%", "100%", "260px"]} maxW={["100%", "100%", "300px"]} order={[3, 3, 3]} display="flex" flexDirection="column">
                <SectionLabel>Details</SectionLabel>
                {LAYERS.slice(3).map((layer, i) => (
                    <LayerSelect key={i + 3} layer={layer} index={i + 3} onChange={handleChange} />
                ))}
                <VStack spacing={3} mt="auto" pt={4}>
                    <ActionButton variant="primary" onClick={download} isDisabled={loading}>Download</ActionButton>
                    <ActionButton variant="secondary" onClick={randomize}>Randomize</ActionButton>
                    <ActionButton variant="danger" onClick={resetAll}>Reset</ActionButton>
                </VStack>
            </Panel>
        </Stack>
    );
};
