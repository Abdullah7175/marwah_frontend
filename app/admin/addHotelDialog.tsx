import React, { useRef, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { UmrahPackage } from "../type/UmrahPackage";
import { IconCameraPlus, IconList } from "@tabler/icons-react";
import Image from "next/image";
import { Hotel } from "../type/Hotel";

interface AddHotelDialogProps {
    hotelToAdd: Hotel | undefined;
    setHotelToAdd: React.Dispatch<
        React.SetStateAction<Hotel | undefined>
    >;
    addHotel: (hotelData: Hotel) => void;
}

function AddHotelDialog({
    hotelToAdd,
    setHotelToAdd,
    addHotel,
}: AddHotelDialogProps) {
    const [hotelData, setHotelData] = useState<Hotel>(Hotel.getInitialData());

    const handleChange = (
        e: any
    ) => {
        const { name, value, type, checked } = e.target;

        setHotelData((prevState) => ({
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
                setHotelData((prevState) => ({
                    ...prevState,
                    [fieldName]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    function formatText(name: string, intitailValue: string) {
        var s = intitailValue;

        var value = s
            .replaceAll("○ ", "")
            .split("\n")
            .map((e, i) => `○ ${e}\n`);
        var sf = "";
        value.forEach((e) => {
            sf += e;
        });

        setHotelData((prevState) => ({
            ...prevState,
            [name]: sf,
        }));
    }

    const mainImagePicker = useRef<HTMLInputElement | null>(null);
    const madinaImagePicker = useRef<HTMLInputElement | null>(null);
    const makkahImagePicker = useRef<HTMLInputElement | null>(null);
    const transportImagePicker = useRef<HTMLInputElement | null>(null);
    const visaImagePicker = useRef<HTMLInputElement | null>(null);

    const pickMainImage = () => {
        if (mainImagePicker !== null) {
            mainImagePicker?.current?.click();
        }
    };
    const pickMadinaHotelImage = () => {
        if (madinaImagePicker !== null) {
            madinaImagePicker?.current?.click();
        }
    };
    const pickMakkahImage = () => {
        if (makkahImagePicker !== null) {
            makkahImagePicker?.current?.click();
        }
    };
    const pickVisaImage = () => {
        if (visaImagePicker !== null) {
            visaImagePicker?.current?.click();
        }
    };
    const pickTransportImage = () => {
        if (transportImagePicker != null) {
            transportImagePicker?.current?.click();
        }
    };

    return (
        <Dialog
            fullWidth
            fullScreen
            open={hotelToAdd !== undefined}
            PaperProps={{ sx: { borderRadius: "0px", padding: 0 } }}
        >
            <DialogTitle sx={{ padding: 0 }}>
                <h1 className="flex flex-row items-center font-bold text-[25px] bg-yellow-50 p-3 text-black">
                    Add Hotel Details
                </h1>
            </DialogTitle>
            <DialogContent sx={{ padding: 5 }}>
                <div
                    className={`flex ${hotelData.image ? "flex-col" : ""
                        } items-center w-full h-auto min-h-[300px] my-2 mt-10 rounded-xl shadow-sm bg-gray-100  shadow-2px shadow-gray-500 `}
                >
                    {hotelData.image ? (
                        <img
                            className="flex-1 w-auto h-auto  "
                            width={window.innerWidth}
                            height={"700px" }
                           
                            src={hotelData.image}
                        />
                    ) : (
                        <IconCameraPlus
                            onClick={pickMainImage}
                            className="flex-1 w-56 h-56  "
                        />
                    )}

                    {hotelData.image ? (
                        <Button
                            onClick={() => {
                                setHotelData((prevState) => ({
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

                    <input
                        className="w-full h-[200px] hidden"
                        ref={mainImagePicker}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "image")}
                    />
                </div>
                <TextField
                    sx={{ marginTop: 4, marginBottom: 1 }}
                    id="name"
                    name="name"
                    label="Name"
                    multiline
                    minRows={2}
                    fullWidth
                    variant="outlined"
                    value={hotelData.name}
                    onChange={handleChange}
                    color="warning"
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },
                    }}
                />

                <TextField
                    sx={{ marginY: 1 }}
                    id="description"
                    helperText="This will be visible as tis, just below to the Package Name in Package Detail Screen"
                    FormHelperTextProps={{ sx: { fontSize: 17, color: "red" } }}
                    name="description"
                    label="Description"
                    minRows={5}
                    multiline
                    fullWidth
                    variant="outlined"
                    value={hotelData.description}
                    onChange={handleChange}
                    color="warning"
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },

                        endAdornment: (
                            <IconList
                                onClick={() =>
                                    formatText("description", hotelData.description??"")
                                }
                                size={40}
                                color="white"
                                className=" rounded-xl text-3xl bg-orange-500 px-2 py-2  hover:cursor-pointer"
                            />
                        ),
                    }}
                />

                <div className="flex gap-4 mt-2">
                    <TextField
                        sx={{ marginY: 1 }}
                        id="currency"
                        name="currency"
                        label="Currency"
                        fullWidth
                        variant="outlined"
                        value={hotelData.currency}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                        }}
                    />
                    <TextField
                        sx={{ marginY: 1 }}
                        id="charges"
                        name="charges"
                        label="Charges/Night"
                        fullWidth
                        variant="outlined"
                        value={hotelData.charges}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                            endAdornment: (
                                <span>{(hotelData?.currency ?? "").toUpperCase()}</span>
                            ),
                        }}
                    />
                    <TextField
                        sx={{ marginY: 1 }}
                        id="location"
                        name="location"
                        label="Location"
                        fullWidth
                        variant="outlined"
                        value={hotelData.location}
                        inputMode="text"
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            }
                           
                        }}
                    />

                    <TextField
                        sx={{ marginY: 1 }}
                        id="rating"
                        name="rating"
                        label="Rating"
                        fullWidth
                        variant="outlined"
                        value={hotelData.rating}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                            endAdornment: (
                                <span>{"Max Rating "+(5.0)}</span>
                            ),
                        }}
                    />
              
                </div>
           




                <div className="  my-5">

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={hotelData.breakfast_enabled}
                                onChange={handleChange}
                                name="breakfast_enabled"
                            />
                        }
                        label="Breakfast"
                    />

                     <FormControlLabel
                        control={
                            <Checkbox
                                checked={hotelData.dinner_enabled}
                                onChange={handleChange}
                                name="dinner_enabled"
                            />
                        }
                        label="Dinner"
                    /> 

                

                </div>
          

      
               
      

                <div className="flex flex-row gap-2">
                    <TextField
                        sx={{ marginY: 1 }}
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={hotelData.email}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                        }}
                    />
                
                    <TextField
                        sx={{ marginY: 1 }}
                        id="phone"
                        name="phone"
                        label="Phone"
                        fullWidth
                        variant="outlined"
                        value={hotelData.phone}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                        }}
                    />
                </div>
            </DialogContent>

            <DialogActions sx={{ paddingBottom: 3 }}>
                <Button
                    onClick={() => addHotel(hotelData)}
                    sx={{ borderRadius: 10, paddingX: 6, backgroundColor: "orange" }}
                    variant="contained"
                >
                    Add
                </Button>
                <Button
                    onClick={() => setHotelToAdd(undefined)}
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

export default AddHotelDialog;
