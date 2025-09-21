import { transparentBlack, lightWhite } from "@/constants";
import InquiryForm from "./Inquiryform";
import { NumberTransition } from "./NumberTransition";
import ParentCard from "./ParentCard";
import { Fade, Rotate, Slide } from "react-awesome-reveal";
import { Button } from "@mui/material";

type InquerySectionProps = {
    isDialog:boolean;
    onDismiss:()=>void;
}
export default function IquerySection({isDialog,onDismiss}:InquerySectionProps) {



    return (
        <div id='inquiry' className="flexBetween overflow-hidden">
            <Slide className="sm:px-20 px-5 sm:py-10 py-5">
                <div className="px-6 py-6 rounded-3xl" style={{ backgroundColor: transparentBlack }}>
                    <InquiryForm />
                    {isDialog && <Button onClick={onDismiss} sx={{borderRadius:10,width:'100%',marginTop:1}} variant="contained" color="error">
                        Dismiss
                    </Button>}
                </div>
            </Slide>

        </div>
    )
}