import React, { useRef, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    TextField,
} from "@mui/material";
import { UmrahPackage } from "../type/UmrahPackage";
import { Blog } from "../type/Blog";
import Image from "next/image";
import { IconCameraPlus, IconList } from "@tabler/icons-react";
import { BACKEND_BASE_URL } from "../db/Routes";
import BlogElement from "../type/BlogElement";
import { resourceLimits } from "worker_threads";

interface AddBlogDialogProps {
    blogToAdd: Blog | undefined;
    setBlogToAdd: (p: any) => void;
    addBlog: (packageData: Blog) => void;
}

function AddBlogDialog({
    blogToAdd,
    setBlogToAdd: setPackageToAdd,
    addBlog: addBlog,
}: AddBlogDialogProps) {
    const [blogData, setBlogData] = useState<Blog>(Blog.getInitial());

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;

        setBlogData((prevState) => ({
            ...prevState,
            [name]: type == "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: string
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setBlogData((prevState) => ({
                    ...prevState,
                    [fieldName]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    function formatTextPoints(intitailValue: string) {
        var s = intitailValue;

        var value = s
            .replaceAll("○ ", "")
            .split("\n")
            .map((e, i) => `○ ${e}\n`);
        var sf = "";
        value.forEach((e) => {
            sf += e;
        });

        setPointsBuffer(sf);
    }

    const mainImagePicker = useRef<HTMLInputElement | null>(null);

    const [headingBuffer, setHeadingBufferValue] = useState("");
    const [subHeadingBuffer, setSubHeadingBufferValue] = useState("");
    const [pointsBuffer, setPointsBuffer] = useState("");

    const elementImagePicker = useRef<HTMLInputElement | null>(null);
    const pickMainImage = () => {
        if (mainImagePicker !== null) {
            mainImagePicker?.current?.click();
        }
    };
    const pickElementImage = () => {
        if (elementImagePicker !== null) {
            elementImagePicker?.current?.click();
        }
    };

    function addHeading() {
        const elements = blogData.elements;
        elements.push(
            new BlogElement(-1, "heading", headingBuffer, -1, null, null)
        );

        setBlogData((prevState) => ({
            ...prevState,
            ["elements"]: elements,
        }));
    }
    function addDivider() {
        const elements = blogData.elements;
        elements.push(
            new BlogElement(-1, "divider", 'divider', -1, null, null)
        );

        setBlogData((prevState) => ({
            ...prevState,
            ["elements"]: elements,
        }));
    }
    function removeLastElement() {
        const elements = blogData.elements;
        if(elements.length==0){
            return;
        }
        elements.pop();

        setBlogData((prevState) => ({
            ...prevState,
            ["elements"]: elements,
        }));
    }

    function addSubHeading() {
        const elements = blogData.elements;
        elements.push(
            new BlogElement(-1, "subheading", subHeadingBuffer, -1, null, null)
        );

        setBlogData((prevState) => ({
            ...prevState,
            ["elements"]: elements,
        }));
    }
    function addPoints() {
        const elements = blogData.elements;
        elements.push(
            new BlogElement(-1, "points", pointsBuffer, -1, null, null)
        );

        setBlogData((prevState) => ({
            ...prevState,
            ["elements"]: elements,
        }));
    }




    function getElementTS(s: string) {
        if (s == "heading") {
            return 25;
        }
        if (s == 'subheading') {
            return 20
        }
        return 14;
    }
    function buildElement(element: BlogElement) {
        var res: any = '';
        if (element.element_type.includes('heading')) {
            res = <div className={`text-[${getElementTS(element.element_type)}px] ${element.element_type.includes('heading') ? 'font-bold' : ''}`}>{element.value}</div>
        } else if(element.element_type=='divider') {
            res = (
                <div className={`text-[14px] w-full px-5 bg-gray-300 h-[1px] `}>
                    
                </div>
            );
        }else{
            res = (
                <div className={`text-[14px]`} style={{ whiteSpace: 'pre-wrap' }}>
                    {element.value}
                </div>
            );
        }


        return res;
    }

    return (
        <Dialog
            fullWidth
            fullScreen
            open={blogToAdd !== undefined}
            PaperProps={{ sx: { borderRadius: "0px", padding: 0 } }}
        >
            <DialogTitle sx={{ padding: 0 }}>
                <h1 className="flex flex-row items-center font-bold text-[25px] bg-yellow-500 p-3 text-white">
                    Add New Blog
                </h1>
            </DialogTitle>
            <DialogContent>
                <input
                    className="w-full h-[150px] hidden"
                    ref={mainImagePicker}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "image")}
                />
                <input
                    className="w-full h-[150px] hidden"
                    ref={elementImagePicker}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "element_image")}
                />
                <div>
                    <div className="w-full flex flex-1 flex-row">
                        <div
                            className={`flex ${blogData.image ? "flex-col" : ""
                                } items-center w-1/2  h-auto min-h-[300px] my-2 mt-10 rounded-xl shadow-sm bg-gray-100  shadow-2px shadow-gray-500 `}
                        >
                            {blogData.image ? (
                                <img
                                    className="flex-1 w-auto h-auto  "
                                    width={window.innerWidth}
                                    height={"800px"}
                            
                                    src={blogData.image}
                                />
                            ) : (
                                <IconCameraPlus
                                    onClick={pickMainImage}
                                    className="flex-1 w-56 h-56  "
                                />
                            )}

                            {blogData.image ? (
                                <Button
                                    onClick={() => {
                                        setBlogData((prevState) => ({
                                            ...prevState,
                                            ["image"]: undefined,
                                        }));
                                    }}
                                    variant="contained"
                                    color="error"
                                    sx={{ borderRadius: 10, marginY: 4 }}
                                >
                                    Remove Image
                                </Button>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="w-full flex flex-col gap-2 m-10">
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="title"
                                InputProps={{ sx: { borderRadius: 4 } }}
                                value={blogData.title}
                                label="Blog Title"
                            />
                            <TextField
                                onChange={(e) => {
                                    setHeadingBufferValue(e.target.value);
                                }}
                                fullWidth
                                value={headingBuffer}
                                InputProps={{
                                    sx: { borderRadius: 4 },
                                    endAdornment: (
                                        <button
                                            onClick={() => {
                                                addHeading();
                                            }}
                                            className="bg-yellow-50 text-[12px] px-3 py-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                                        >
                                            ADD
                                        </button>
                                    ),
                                }}
                                minRows={1}
                                label="Add Heading"
                            />
                            <TextField
                                onChange={(e) => {
                                    setSubHeadingBufferValue(e.target.value);
                                }}
                                fullWidth
                                value={subHeadingBuffer}
                                InputProps={{
                                    sx: { borderRadius: 4 },
                                    endAdornment: (
                                        <button
                                            onClick={() => {
                                                addSubHeading();
                                            }}
                                            className="bg-yellow-50 text-[12px] px-3 py-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                                        >
                                            ADD
                                        </button>
                                    ),
                                }}
                                minRows={1}
                                label="Add Sub Heading"
                            />

                            <TextField
                                sx={{ marginY: 1 }}
                                id="points"
                                name="points"
                                label="Add Paragraph "
                                fullWidth
                                variant="outlined"
                                value={pointsBuffer}
                                onChange={(e) => setPointsBuffer(e.target.value)}

                                FormHelperTextProps={{ sx: { fontSize: 17, color: "red" } }}
                                color="warning"
                                multiline
                                minRows={4}
                                InputProps={{
                                    style: {
                                        borderRadius: "16px",
                                    },
                                    endAdornment: (
                                        <div className="flex flex-row gap-2">
                                            <IconList
                                                onClick={() =>
                                                    formatTextPoints(pointsBuffer)
                                                }
                                                size={40}
                                                color="white"
                                                className=" rounded-xl text-3xl bg-orange-500 px-2 py-2  hover:cursor-pointer"
                                            />
                                            <button
                                                onClick={() => {
                                                    addPoints();
                                                }}
                                                className="bg-yellow-50 text-[12px] px-3 py-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                                            >
                                                ADD
                                            </button>
                                        </div>
                                    ),
                                }}
                            />
                            <div className="w-full flex flex-row gap-1">
                                <button
                                    onClick={() => {
                                        addDivider();
                                    }}
                                    className="bg-blue-200 text-[12px] px-3 py-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                                >
                                    Add Divider
                                </button>
                                <button
                                    onClick={() => {
                                        removeLastElement();
                                    }}
                                    className="bg-orange-50 text-[12px] px-3 py-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                                >
                                    Remove Last Element
                                </button>
                            </div>
                        </div>
                    </div>
                    <h1 className="font-bold mt-2">Body Preview</h1>
                    <div className="rounded-md p-2 border-[2px] border-gray-300  min-h-[100px] h-auto">
                        {blogData.image && (
                            <img
                                alt="Blog Image"
                                src={blogData.image}
                                width={1024}
                                height={720}
                                className="w-full h-auto"
                            />
                        )}
                        {blogData.title != '' && <span className="font-bold text-[37px]">{blogData.title}</span>}


                        {...blogData.elements.map((element) => buildElement(element))}
                    </div>
                </div>
            </DialogContent>

            <DialogActions sx={{ paddingBottom: 3 }}>
                <Button
                    onClick={() => addBlog(blogData)}
                    sx={{ borderRadius: 10, paddingX: 6, backgroundColor: "orange" }}
                    variant="contained"
                >
                    Add
                </Button>
                <Button
                    onClick={() => setPackageToAdd(undefined)}
                    sx={{ borderRadius: 10, paddingX: 6 }}
                    variant="contained"
                    color="error"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddBlogDialog;
