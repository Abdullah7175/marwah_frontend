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
import { BACKEND_BASE_URL, FILE_BASE_URL } from "../db/Routes";
import BlogElement from "../type/BlogElement";
import { resourceLimits } from "worker_threads";
import { Umbrella } from "@mui/icons-material";

interface EditBlogDialogProps {
    blogToEdit: Blog;
    setBlogToEdit: (p: any) => void;
    updateBlog: (packageData: Blog) => void;
    onDelete:(blog:Blog|any)=>void
}

function EditBlogDialog({
    blogToEdit,
    setBlogToEdit,
    updateBlog,
    onDelete
}: EditBlogDialogProps) {
    const [blogData, setBlogData] = useState<Blog>(Blog.copy(blogToEdit));

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
        if (elements.length == 0) {
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



    function getImageUrl(url: any) {
        if (!url) return '';
        
        if (url.includes('blogs_images')) {
            return FILE_BASE_URL + url;
        } else if (typeof url === 'string' && url.startsWith('data:')) {
            // Handle base64 data URLs
            return url;
        } else {
            return url;
        }
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
        } else if (element.element_type == 'divider') {
            res = (
                <div className={`text-[14px] w-full px-5 bg-gray-300 h-[1px] `}>

                </div>
            );
        } else {
            res = (
                <div className={`text-[14px]`} style={{ whiteSpace: 'pre-wrap' }}>
                    {element.value}
                </div>
            );
        }


        return res;
    }
    const [blogToDelete,setBlogToDelete] = useState<Blog>();

    function getDeleteBlogDialog() {
        return (
          <Dialog
            sx={{
              backdropFilter: "blur(1px) sepia(5%)",
            }}
            // 👇 Props passed to Paper (modal content)
            PaperProps={{ sx: { borderRadius: "30px", padding: 1 } }}
            open={blogToDelete != undefined}
          >
            <DialogTitle>
              <h1 className="font-bold text-[30px]">Delete Confirmation</h1>
            </DialogTitle>
            <DialogContent>
              <h1 className="font-sm text-[20px]">
                This action is irreversible, when you click DELETE you would not
                able to undo This Blog
              </h1>
            </DialogContent>
    
            <DialogActions>
              <Button
                onClick={() =>{ onDelete(blogToDelete);setBlogToDelete(undefined);setBlogToEdit(undefined);}}
                sx={{ borderRadius: 10, paddingX: 6 }}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  setBlogToDelete(undefined);
                }}
                sx={{ borderRadius: 10, paddingX: 6 }}
                variant="contained"
                color="success"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        );
      }


    return (
        <Dialog
            fullWidth
            fullScreen
            open={blogToEdit !== undefined}
            PaperProps={{ sx: { borderRadius: "0px", padding: 0 } }}
        >
            {getDeleteBlogDialog()}
            <DialogTitle sx={{ padding: 0 }}>
                <div className="flex flexBetween flex-row items-center font-bold text-[25px] bg-yellow-50 p-3 text-black">
                    <span>Edit Blog</span>
                    <Button
                        onClick={() => setBlogToDelete(blogToEdit)}
                        sx={{ borderRadius: 10, paddingX: 6 }}
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>
                </div>
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
                                    height={"700px" }
                                    alt="main"
                                    src={getImageUrl(blogData.image)}
                                    onError={(e) => {
                                        console.log('Blog image failed to load:', getImageUrl(blogData.image));
                                        const img = e.target as HTMLImageElement;
                                        img.src = '/images/kaba1.jpg'; // Use local fallback image
                                    }}
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
                                src={getImageUrl(blogData.image)}
                                width={1024}
                                height={720}
                                className="w-full h-auto"
                                onError={(e) => {
                                    console.log('Blog preview image failed to load:', getImageUrl(blogData.image));
                                    const img = e.target as HTMLImageElement;
                                    img.src = '/images/kaba1.jpg'; // Use local fallback image
                                }}
                            />
                        )}
                        {blogData.title != '' && <span className="font-bold text-[37px]">{blogData.title}</span>}


                        {...blogData.elements.map((element) => buildElement(element))}
                    </div>
                </div>
            </DialogContent>

            <DialogActions sx={{ paddingBottom: 3 }}>
                <Button
                    onClick={() => updateBlog(blogData)}
                    sx={{ borderRadius: 10, paddingX: 6, backgroundColor: "green" }}
                    variant="contained"
                >
                    Save Changes
                </Button>
                <Button
                    onClick={() => setBlogToEdit(undefined)}
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

export default EditBlogDialog;
