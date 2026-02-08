/**
 * Code by ~Xipzer
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    config: { initialColorMode: "dark", useSystemColorMode: false },
    fonts: {
        heading: "'Space Grotesk', sans-serif",
        body: "'Space Grotesk', sans-serif",
        mono: "'IBM Plex Mono', monospace",
    },
    colors: {
        brand: {
            50: "#e6fff9",
            100: "#b3ffed",
            200: "#80ffe0",
            300: "#4dffd4",
            400: "#00ffc8",
            500: "#00d4a6",
            600: "#00a883",
            700: "#007d61",
            800: "#00513f",
            900: "#00261e",
        },
    },
    styles: {
        global: {
            body: {
                bg: "#0a0a0f",
                color: "#e0e0e0",
            },
        },
    },
    components: {
        Select: {
            baseStyle: {
                field: {
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "13px",
                },
                icon: {
                    color: "#4a4a5a",
                },
            },
            variants: {
                filled: {
                    field: {
                        bg: "#12121a",
                        color: "#c0c0d0",
                        _hover: { bg: "#161620" },
                        _focus: { bg: "#12121a" },
                    },
                },
            },
        },
        Button: {
            baseStyle: {
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontSize: "12px",
            },
        },
    },
});

const BADGE = [
    "%c XIPZER ",
    "background: #00ffc8; color: #0a0a0f; font-weight: 700; font-size: 12px; padding: 2px 6px; border-radius: 2px; font-family: 'IBM Plex Mono', monospace;",
];
const LINK = ["%c https://x.com/Xipzer", "color: #666; font-size: 11px; font-family: monospace;"];

console.log(...BADGE);
console.log(...LINK);

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>,
    document.getElementById("root")
);
