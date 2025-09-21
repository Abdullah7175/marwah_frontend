import { Box } from "@mui/material";
import TabPanelProps from "./TabPanelProps";

export default function TabPanel ({ children, value, index }:TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}

            aria-labelledby={`tab-${index}`}
            style={{ width: '100%' }}
        >
            {value === index && <Box p={0}>{children}</Box>}
        </div>
    );
};
