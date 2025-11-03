import React, { useRef, useState, useEffect } from "react";
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
import { IconCameraPlus, IconList, IconTrash, IconFolderPlus } from "@tabler/icons-react";
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

interface Section {
    id: string;
    title: string;
    elements: Array<{
        id: string;
        type: string;
        value: any;
        order: number;
        file?: File;
        originalElementId?: number;
    }>;
}

function EditBlogDialog({
    blogToEdit,
    setBlogToEdit,
    updateBlog,
    onDelete
}: EditBlogDialogProps) {
    const [blogData, setBlogData] = useState<Blog>(Blog.copy(blogToEdit));
    const [sections, setSections] = useState<Section[]>([]);
    const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

    // Initialize sections from blog elements when dialog opens
    useEffect(() => {
        if (blogToEdit && blogToEdit.elements) {
            const groupedSections: { [key: string]: Section } = {};
            
            // Group elements by section_title
            blogToEdit.elements.forEach((element, index) => {
                const sectionTitle = element.section_title || 'main';
                
                if (!groupedSections[sectionTitle]) {
                    groupedSections[sectionTitle] = {
                        id: `section-${sectionTitle}-${Date.now()}`,
                        title: sectionTitle,
                        elements: []
                    };
                }
                
                groupedSections[sectionTitle].elements.push({
                    id: `elem-${element.id || index}`,
                    type: element.element_type,
                    value: element.value,
                    order: element.order,
                    originalElementId: element.id
                });
            });
            
            setSections(Object.values(groupedSections));
            if (Object.keys(groupedSections).length > 0) {
                setCurrentSectionId(Object.values(groupedSections)[0].id);
            }
        }
    }, [blogToEdit]);

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

        return sf;
    }

    const mainImagePicker = useRef<HTMLInputElement | null>(null);

    const [headingBuffer, setHeadingBufferValue] = useState("");
    const [subHeadingBuffer, setSubHeadingBufferValue] = useState("");
    const [pointsBuffer, setPointsBuffer] = useState("");

    // Section management
    const addNewSection = () => {
        const newSection: Section = {
            id: `section-${Date.now()}`,
            title: '',
            elements: []
        };
        setSections([...sections, newSection]);
        setCurrentSectionId(newSection.id);
    };

    const updateSectionTitle = (sectionId: string, title: string) => {
        setSections(sections.map(section => 
            section.id === sectionId ? { ...section, title } : section
        ));
    };

    const removeSection = (sectionId: string) => {
        setSections(sections.filter(s => s.id !== sectionId));
        if (currentSectionId === sectionId) {
            setCurrentSectionId(sections.length > 1 ? sections[0].id : null);
        }
    };

    const addElementToSection = (sectionId: string, elementType: string, value: any, file?: File) => {
        setSections(sections.map(section => {
            if (section.id === sectionId) {
                const newElement = {
                    id: `elem-${Date.now()}`,
                    type: elementType,
                    value,
                    order: section.elements.length,
                    file
                };
                return {
                    ...section,
                    elements: [...section.elements, newElement]
                };
            }
            return section;
        }));
    };

    const removeElementFromSection = (sectionId: string, elementId: string) => {
        setSections(sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    elements: section.elements.filter(e => e.id !== elementId)
                        .map((e, index) => ({ ...e, order: index }))
                };
            }
            return section;
        }));
    };

    const handleElementImageChange = (sectionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                addElementToSection(sectionId, 'image', reader.result as string, file);
            };
            reader.readAsDataURL(file);
        }
    };

    const pickMainImage = () => {
        if (mainImagePicker !== null) {
            mainImagePicker?.current?.click();
        }
    };

    function addHeading() {
        if (!currentSectionId) {
            alert('Please select or create a section first');
            return;
        }
        addElementToSection(currentSectionId, 'heading', headingBuffer);
        setHeadingBufferValue('');
    }

    function addSubHeading() {
        if (!currentSectionId) {
            alert('Please select or create a section first');
            return;
        }
        addElementToSection(currentSectionId, 'subheading', subHeadingBuffer);
        setSubHeadingBufferValue('');
    }

    function addPoints() {
        if (!currentSectionId) {
            alert('Please select or create a section first');
            return;
        }
        const formatted = formatTextPoints(pointsBuffer);
        addElementToSection(currentSectionId, 'points', formatted);
        setPointsBuffer('');
    }

    function addDivider() {
        if (!currentSectionId) {
            alert('Please select or create a section first');
            return;
        }
        addElementToSection(currentSectionId, 'divider', 'divider');
    }

    function getImageUrl(url: any) {
        if (!url) return '';
        
        if (url.includes('blogs_images')) {
            return FILE_BASE_URL + url;
        } else if (typeof url === 'string' && url.startsWith('data:')) {
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

    function buildElement(element: BlogElement | any) {
        var res: any = '';
        const elementType = element.type || element.element_type;
        const elementValue = element.value;
        
        if (elementType.includes('heading')) {
            res = <div className={`text-[${getElementTS(elementType)}px] ${elementType.includes('heading') ? 'font-bold' : ''}`}>{elementValue}</div>
        } else if (elementType == 'divider') {
            res = (
                <div className={`text-[14px] w-full px-5 bg-gray-300 h-[1px] `}>
                </div>
            );
        } else if (elementType == 'image') {
            res = (
                <img
                    src={typeof elementValue === 'string' && elementValue.startsWith('data:') ? elementValue : getImageUrl(elementValue)}
                    width={1024}
                    height={720}
                    className="w-full h-auto my-4"
                    alt="Blog content"
                    onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/images/kaba1.jpg';
                    }}
                />
            );
        } else {
            res = (
                <div className={`text-[14px]`} style={{ whiteSpace: 'pre-wrap' }}>
                    {elementValue}
                </div>
            );
        }

        return res;
    }

    // Convert sections to blog elements before submitting
    const prepareBlogData = () => {
        const newBlog = Blog.copy(blogData);
        const elements: BlogElement[] = [];

        sections.forEach((section) => {
            section.elements.forEach((element) => {
                elements.push(new BlogElement(
                    -1, 
                    element.type, 
                    element.value, 
                    -1, 
                    section.title || null, 
                    element.order, 
                    null, 
                    null
                ));
            });
        });

        newBlog.elements = elements;
        return newBlog;
    };

    const [blogToDelete, setBlogToDelete] = useState<Blog>();

    function getDeleteBlogDialog() {
        return (
          <Dialog
            sx={{
              backdropFilter: "blur(1px) sepia(5%)",
            }}
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
            <DialogContent sx={{ overflowY: 'auto' }}>
                <input
                    className="w-full h-[150px] hidden"
                    ref={mainImagePicker}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "image")}
                />
                
                <div className="p-4">
                    {/* Main Blog Info */}
                    <div className="w-full flex flex-row gap-4 mb-6">
                        <div className={`flex ${blogData.image ? "flex-col" : ""} items-center w-1/3 h-auto min-h-[300px] rounded-xl shadow-sm bg-gray-100`}>
                            {blogData.image ? (
                                <img
                                    className="flex-1 w-auto h-auto"
                                    width={400}
                                    height={400}
                                    src={getImageUrl(blogData.image)}
                                    alt="Main blog image"
                                    onError={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        img.src = '/images/kaba1.jpg';
                                    }}
                                />
                            ) : (
                                <IconCameraPlus
                                    onClick={pickMainImage}
                                    className="flex-1 w-56 h-56 cursor-pointer"
                                />
                            )}

                            {blogData.image && (
                                <Button
                                    onClick={() => {
                                        setBlogData((prevState) => ({
                                            ...prevState,
                                            ["image"]: undefined,
                                        }));
                                    }}
                                    variant="contained"
                                    color="error"
                                    sx={{ borderRadius: 10, marginY: 2 }}
                                >
                                    Remove Image
                                </Button>
                            )}
                        </div>
                        
                        <div className="flex flex-col gap-2 flex-1">
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="title"
                                InputProps={{ sx: { borderRadius: 4 } }}
                                value={blogData.title}
                                label="Blog Title"
                            />
                            <TextField
                                fullWidth
                                name="body"
                                InputProps={{ sx: { borderRadius: 4 } }}
                                value={blogData.body}
                                onChange={handleChange}
                                label="Blog Description (Body)"
                                multiline
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* SEO Fields Section */}
                    <div className="mb-6 p-4 border-2 border-green-300 rounded-lg bg-green-50">
                        <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
                        
                        {/* Meta Tags */}
                        <div className="grid grid-cols-1 gap-3 mb-4">
                            <h3 className="text-md font-semibold">Meta Tags</h3>
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="meta_title"
                                value={blogData.meta_title || ''}
                                label="Meta Title (Leave empty to use blog title)"
                                placeholder={blogData.title}
                                helperText="Recommended: 50-60 characters"
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="meta_description"
                                value={blogData.meta_description || ''}
                                label="Meta Description (Leave empty to auto-generate)"
                                placeholder="Generated from blog body..."
                                helperText="Recommended: 150-160 characters"
                                multiline
                                rows={2}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="meta_keywords"
                                value={blogData.meta_keywords || ''}
                                label="Meta Keywords (comma separated)"
                                placeholder="umrah, pilgrimage, makkah, madina"
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                        </div>

                        {/* Open Graph Tags */}
                        <div className="grid grid-cols-1 gap-3 mb-4">
                            <h3 className="text-md font-semibold">Open Graph (Facebook/LinkedIn)</h3>
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="og_title"
                                value={blogData.og_title || ''}
                                label="OG Title (Leave empty to use meta title)"
                                placeholder={blogData.meta_title || blogData.title}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="og_description"
                                value={blogData.og_description || ''}
                                label="OG Description (Leave empty to use meta description)"
                                placeholder={blogData.meta_description || 'Generated from blog body...'}
                                multiline
                                rows={2}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="og_image"
                                value={blogData.og_image || ''}
                                label="OG Image URL (Leave empty to use main image)"
                                placeholder="/storage/blogs_images/image.jpg"
                                helperText="Optional: Custom image URL for social sharing"
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                        </div>

                        {/* Twitter Card Tags */}
                        <div className="grid grid-cols-1 gap-3">
                            <h3 className="text-md font-semibold">Twitter Card</h3>
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="twitter_title"
                                value={blogData.twitter_title || ''}
                                label="Twitter Title (Leave empty to use OG title)"
                                placeholder={blogData.og_title || blogData.meta_title || blogData.title}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="twitter_description"
                                value={blogData.twitter_description || ''}
                                label="Twitter Description (Leave empty to use OG description)"
                                placeholder={blogData.og_description || blogData.meta_description || 'Generated from blog body...'}
                                multiline
                                rows={2}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                name="twitter_image"
                                value={blogData.twitter_image || ''}
                                label="Twitter Image URL (Leave empty to use OG image)"
                                placeholder={blogData.og_image || '/storage/blogs_images/image.jpg'}
                                helperText="Optional: Custom image URL for Twitter"
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                        </div>
                    </div>

                    {/* Sections Management */}
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Sections</h2>

When you're done with your current set of changes to this file, you should call the read_lints tool with the specific file path and fix any newly introduced errors.</output>
</result>
</function_calls>

<function_calls>
<invoke name="todo_write">
<parameter name="merge">true

                    {/* Sections Management */}
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Sections</h2>
                            <Button
                                onClick={addNewSection}
                                startIcon={<IconFolderPlus />}
                                variant="contained"
                                sx={{ borderRadius: 3 }}
                            >
                                Add Section
                            </Button>
                        </div>

                        {/* Section List */}
                        <div className="flex flex-col gap-3">
                            {sections.map((section) => (
                                <div key={section.id} className="border-2 border-gray-300 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <TextField
                                            value={section.title === 'main' ? '' : section.title}
                                            onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                                            placeholder="Section Title (e.g., Month-by-Month Guide)"
                                            size="small"
                                            fullWidth
                                            sx={{ mr: 2 }}
                                        />
                                        {sections.length > 1 && (
                                            <Button
                                                onClick={() => removeSection(section.id)}
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                startIcon={<IconTrash />}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => setCurrentSectionId(section.id)}
                                            variant={currentSectionId === section.id ? 'contained' : 'outlined'}
                                            size="small"
                                        >
                                            {currentSectionId === section.id ? 'Selected' : 'Select'}
                                        </Button>
                                    </div>
                                    
                                    {/* Elements in this section */}
                                    <div className="flex flex-col gap-2">
                                        {section.elements
                                            .sort((a, b) => a.order - b.order)
                                            .map((element) => (
                                                <div key={element.id} className="flex items-start gap-2 bg-gray-50 p-2 rounded">
                                                    <div className="flex-1">
                                                        {buildElement(element)}
                                                    </div>
                                                    <Button
                                                        onClick={() => removeElementFromSection(section.id, element.id)}
                                                        size="small"
                                                        color="error"
                                                    >
                                                        <IconTrash size={20} />
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Element Adding Controls - only active when a section is selected */}
                    {currentSectionId && (
                        <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                            <h3 className="text-lg font-bold mb-4">Add Elements to Selected Section</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Heading */}
                                <TextField
                                    onChange={(e) => setHeadingBufferValue(e.target.value)}
                                    value={headingBuffer}
                                    label="Add Heading"
                                    InputProps={{
                                        sx: { borderRadius: 2 },
                                        endAdornment: (
                                            <Button
                                                onClick={addHeading}
                                                size="small"
                                                variant="contained"
                                                disabled={!headingBuffer.trim()}
                                            >
                                                Add
                                            </Button>
                                        ),
                                    }}
                                />

                                {/* Subheading */}
                                <TextField
                                    onChange={(e) => setSubHeadingBufferValue(e.target.value)}
                                    value={subHeadingBuffer}
                                    label="Add Sub Heading"
                                    InputProps={{
                                        sx: { borderRadius: 2 },
                                        endAdornment: (
                                            <Button
                                                onClick={addSubHeading}
                                                size="small"
                                                variant="contained"
                                                disabled={!subHeadingBuffer.trim()}
                                            >
                                                Add
                                            </Button>
                                        ),
                                    }}
                                />

                                {/* Paragraph/Points */}
                                <TextField
                                    value={pointsBuffer}
                                    onChange={(e) => setPointsBuffer(e.target.value)}
                                    label="Add Paragraph/Points"
                                    multiline
                                    rows={3}
                                    InputProps={{
                                        sx: { borderRadius: 2 },
                                        endAdornment: (
                                            <Button
                                                onClick={addPoints}
                                                size="small"
                                                variant="contained"
                                                disabled={!pointsBuffer.trim()}
                                            >
                                                Add
                                            </Button>
                                        ),
                                    }}
                                />

                                {/* Image */}
                                <div className="flex flex-col gap-2">
                                    <input
                                        className="hidden"
                                        id={`image-${currentSectionId}`}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleElementImageChange(currentSectionId, e)}
                                    />
                                    <label htmlFor={`image-${currentSectionId}`}>
                                        <Button
                                            variant="contained"
                                            component="span"
                                            fullWidth
                                            startIcon={<IconCameraPlus />}
                                            sx={{ borderRadius: 2 }}
                                        >
                                            Add Image
                                        </Button>
                                    </label>
                                </div>

                                {/* Divider */}
                                <div>
                                    <Button
                                        onClick={addDivider}
                                        variant="outlined"
                                        fullWidth
                                        sx={{ borderRadius: 2 }}
                                    >
                                        Add Divider
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preview */}
                    <div className="mt-6">
                        <h1 className="font-bold text-xl mb-4">Blog Preview</h1>
                        <div className="rounded-md p-4 border-[2px] border-gray-300 min-h-[100px] bg-white">
                            {blogData.image && (
                                <img
                                    alt="Blog Image"
                                    src={getImageUrl(blogData.image)}
                                    width={1024}
                                    height={720}
                                    className="w-full h-auto mb-4"
                                    onError={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        img.src = '/images/kaba1.jpg';
                                    }}
                                />
                            )}
                            {blogData.title && (
                                <h1 className="font-bold text-[37px] mb-4">{blogData.title}</h1>
                            )}
                            
                            {sections.map((section) => (
                                <div key={section.id} className="mb-6">
                                    {section.title && section.title !== 'main' && (
                                        <h2 className="font-bold text-[25px] mb-2">{section.title}</h2>
                                    )}
                                    {section.elements
                                        .sort((a, b) => a.order - b.order)
                                        .map((element) => buildElement(element))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>

            <DialogActions sx={{ paddingBottom: 3 }}>
                <Button
                    onClick={() => {
                        const preparedBlog = prepareBlogData();
                        updateBlog(preparedBlog);
                    }}
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
