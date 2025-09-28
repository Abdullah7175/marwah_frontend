import {
  BACKEND_BASE_URL,
  GET_BLOGS,
  GET_CATEGORIES,
  GET_HOTELS,
  POST_CREATE_CATEGORY,
  UPDATE_CATEGORY,
  UPDATE_HOTEL,
} from "@/app/db/Routes";
import {
  ApiCallProps,
  createHotel,
  makeGetCall,
  makePostCall,
  updateHotelsCloud,
  updatePackageCloud,
} from "@/app/db/api";
import Category from "@/app/type/Category";
import { Hotel } from "@/app/type/Hotel";
import { Delete, Edit, Input, ToggleOff, ToggleOn } from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ToggleButton,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Login from "../login";
import AddHotelDialog from "../addHotelDialog";
import toast, { Toaster } from "react-hot-toast";
import EditHotelDialog from "../editHotelDialog";

export function BasicTable() {
  const [hotel, setHotel] = useState<Array<Hotel>>();
  const [loading, setLoading] = useState(false);

  function loadHotels() {
    const props: ApiCallProps = {
      postUrl: GET_HOTELS,
      data: undefined,
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        console.log(res);
        setHotel(res.map((hotel: any) => Hotel.fromJSON(hotel)));
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      },
    };

    makeGetCall(props);
  }

  useEffect(() => {
    loadHotels();
  }, []);

  function updateStatus(category: Hotel) {
    const props: ApiCallProps = {
      postUrl: UPDATE_HOTEL,
      data: JSON.stringify({
        action: "update_status",
        id: category.id,
        status: category.status == "active" ? "unactive" : "active",
      }),
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        loadHotels();
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      },
    };

    setHotelToDelete(undefined);
    makePostCall(props);
  }

  function deleteHotel(category: Hotel | undefined) {
    if (category instanceof Hotel) {
      const props: ApiCallProps = {
        postUrl: UPDATE_HOTEL,
        data: JSON.stringify({
          action: "delete",
          id: category.id,
          status: "any",
        }),
        onStart: function (): void {
          setLoading(true);
        },
        onProgressEnd: function (): void {
          setLoading(false);
        },
        onSuccess: function (res: any) {
          console.log(res);
          loadHotels();
        },
        onUnexpected: function (res: any) {
          console.log("Unexpected Result:", res);
        },
      };

      setHotelToDelete(undefined);
      makePostCall(props);
    }
  }

  function isValidEmail(email: string) {
    // Regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function addHotel(p: Hotel) {
    if (!p.image) {
      toast.error("Please Select Required Photos", {
        style: {
          borderRadius: "20px",
          background: "black",
          color: "white",
        },
        duration: 3000,
      });

      return;
    }
    if (
      p.name === "" ||
      p.currency === "" ||
      p.charges === 0 ||
      p.description === "" ||
      p.location === "" ||
      p.rating < 0 ||
      p.rating > 5 ||
      p.email === "" ||
      p.phone === ""
    ) {
      // Handle empty fields, maybe show an error message or prevent form submission

      toast.error("Please Fill Package Data Accurately", {
        style: {
          borderRadius: "20px",
          background: "black",
          color: "white",
        },
        duration: 3000,
      });
      return;

      // toast.promise(
      //     makePostCall(props)
      //     ,
      //     {

      //       loading: 'Submitting...',
      //       success: <b>Inquiry Submitted Our Agent will contact you shortly!</b>,
      //       error: <b>Something went wrong!.</b>,

      //     }
      //   );
    }

    if (!isValidEmail(p.email ?? "")) {
      toast.error("Please Enter Valid Email", {
        style: {
          borderRadius: "20px",
          background: "black",
          color: "white",
        },
        duration: 3000,
      });
      return;
    }

    createHotel(
      p,

      function (): void {
        //start
        setLoading(true);
      },
      function (): void {
        //end
        setLoading(false);
      },
      function (res: any) {
        //result
        console.log(res);
        loadHotels();
      },
      function (e: any) {
        //error
        console.log("Unexpected Result:", e);
      }
    );
    setHotelToAdd(undefined);
  }

  const [hotelToDelete, setHotelToDelete] = useState<Hotel>();
  const [hotelToEdit, setHotelToEdit] = useState<Hotel>();

  const [hotelToAdd, setHotelToAdd] = useState<Hotel>();

  function getAddNewHotelDialog() {
    return (
      <AddHotelDialog
        setHotelToAdd={setHotelToAdd}
        addHotel={addHotel}
        hotelToAdd={hotelToAdd}
      />
    );
  }

  function getEditHotelDialog() {
    return (
      <EditHotelDialog
        setHotelToEdit={setHotelToEdit}
        saveHotelChanges={updateHotel}
        hotelToEdit={hotelToEdit!}
      />
    );
  }

  function updateHotel(p: Hotel) {
    if (!p.image) {
      toast.error("Please Select Required Photos", {
        style: {
          borderRadius: "20px",
          background: "black",
          color: "white",
        },
        duration: 3000,
      });

      return;
    }
    if (
      p.name === "" ||
      p.currency === "" ||
      p.charges === 0 ||
      p.description === "" ||
      p.location === "" ||
      p.rating < 0 ||
      p.rating > 5 ||
      p.email === "" ||
      p.phone === ""
    ) {
      // Handle empty fields, maybe show an error message or prevent form submission

      toast.error("Please Fill Package Data Accurately", {
        style: {
          borderRadius: "20px",
          background: "black",
          color: "white",
        },
        duration: 3000,
      });
      return;

      // toast.promise(
      //     makePostCall(props)
      //     ,
      //     {

      //       loading: 'Submitting...',
      //       success: <b>Inquiry Submitted Our Agent will contact you shortly!</b>,
      //       error: <b>Something went wrong!.</b>,

      //     }
      //   );
    }

    if (!isValidEmail(p.email ?? "")) {
      toast.error("Please Enter Valid Email", {
        style: {
          borderRadius: "20px",
          background: "black",
          color: "white",
        },
        duration: 3000,
      });
      return;
    }

    toast.promise(
      updateHotelsCloud(
        p,

        function (): void {
          //start
          setLoading(true);
        },
        function (): void {
          //end
          setLoading(false);
        },
        function (res: any) {
          //result
          console.log(res);
          setHotelToEdit(undefined);
          loadHotels();
        },
        function (e: any) {
          //error
          console.log("Unexpected Result:", e);
          setHotelToEdit(undefined);
        }
      ),
      {
        loading: "Saving Changes",
        success: <b>Hotel's Changes Saved...</b>,
        error: <b>Something went wrong!.</b>,
      }
    );
  }
  function getDeleteCategoryDialog() {
    return (
      <Dialog
        sx={{
          backdropFilter: "blur(1px) sepia(5%)",
        }}
        // 👇 Props passed to Paper (modal content)
        PaperProps={{ sx: { borderRadius: "30px", padding: 1 } }}
        open={hotelToDelete != undefined}
      >
        <DialogTitle>
          <h1 className="font-bold text-[30px]">Delete Confirmation</h1>
        </DialogTitle>
        <DialogContent>
          <h1 className="font-sm text-[20px]">
            This action is irreversible, when you delete on delete all Packages
            under that category would also be deleted
          </h1>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => deleteHotel(hotelToDelete)}
            sx={{ borderRadius: 10, paddingX: 6 }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setHotelToDelete(undefined);
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
    <div>
      <Toaster position="bottom-center" />

      <div className="fixed top-3 right-10 shadow-sm z-20">
        <div
          onClick={() => {
            setHotelToAdd(Hotel.getDummy());
          }}
          className="hover:cursor-pointer hover:shadow-md hover:shadow-gray-600  rounded-full bg-white px-6 py-3 text-black "
        >
          Add New Hotel
        </div>
      </div>

      {getAddNewHotelDialog()}
      {hotelToEdit && getEditHotelDialog()}

      {getDeleteCategoryDialog()}

      {loading ? (
        <div className="w-[900px]   flex flex-col items-center  ">
          <CircularProgress
            size={70}
            sx={{
              color: "orange",
              borderRadius: 20,
              borderWidth: 3,
              padding: 1,
            }}
            className="mt-48"
          />
        </div>
      ) : (
        <TableContainer
          sx={{ marginX: 3, width: window.innerWidth / 1.3, marginTop: 2 }}
          className="w-full"
          component={Paper}
        >
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell></TableCell>

                <TableCell>Name</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Charges/Night</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Status</TableCell>

                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hotel?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img 
                        alt="" 
                        className="rounded-xl w-28 h-22" 
                        src={BACKEND_BASE_URL+ row.image}
                        onError={(e) => {
                            console.log('Hotel image failed to load:', BACKEND_BASE_URL + row.image);
                            const img = e.target as HTMLImageElement;
                            img.src = '/images/kaba1.jpg'; // Use local fallback image
                        }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <TableCell align="right">
                    {row.charges + row.currency}
                  </TableCell>
                  <TableCell align="right">{row.rating}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>

                  <TableCell align="right" onClick={() => updateStatus(row)}>
                    {row.status == "active" ? (
                      <ToggleOn
                        className="hover:cursor-pointer"
                        htmlColor="green"
                        fontSize={"large"}
                      />
                    ) : (
                      <ToggleOff
                        className="hover:cursor-pointer"
                        htmlColor="red"
                        fontSize={"large"}
                      />
                    )}
                  </TableCell>

                  <TableCell className="center flex" align="right">
                    {
                      <Edit
                        onClick={() => {
                          setHotelToEdit(row);
                        }}
                        htmlColor="blue"
                        className="mx-4 hover:cursor-pointer hover:text-red-600 hover:shadow-xl "
                      />
                    }
                    {
                      <Delete
                        onClick={() => {
                          setHotelToDelete(row);
                        }}
                        htmlColor="red"
                        className="hover:cursor-pointer hover:text-red-600 hover:shadow-xl "
                      />
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default function HotelsTab() {
  return (
    <div
      className="w-full flex flex-col bg-gray-100 overflow-auto "
      style={{ height: "800px" }}
    >
      <h1 className="font-bold text-black text-3xl px-5 bg-yellow-50 py-5 ">
        Hotels
      </h1>

      <BasicTable />
    </div>
  );
}
