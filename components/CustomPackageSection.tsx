import { transparentBlack, lightWhite } from "@/constants";

import { Fade } from "react-awesome-reveal";
import CustomPackageForm from "./CustomPackageForm";

export default function CustomPackageSection() {
    return (
        <div id='customPackage'  className="flexBetween">
            <Fade className="sm:px-20 px-5 sm:py-10 py-5 w-full  ">
                <div className="px-6 py-6 rounded-3xl w-full flex flex-1" style={{ backgroundColor: transparentBlack }}>
                    <CustomPackageForm />
                </div>
            </Fade>
      
        </div>
    )
}