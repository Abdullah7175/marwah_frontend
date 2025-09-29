import {
  GET_DELETE_PACKAGE,
  GET_PACKAGES,
  POST_CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "@/app/db/Routes";
import {
  ApiCallProps,
  createPackage,
  makeGetCall,
  makePostCall,
  updatePackageCloud,
} from "@/app/db/api";
import Category from "@/app/type/Category";
import PacksResponse from "@/app/type/PacksResponse";
import { UmrahPackage } from "@/app/type/UmrahPackage";
import {
  ToggleOn,
  Delete,
  CheckBoxRounded,
  CheckBox,
  CheckBoxSharp,
  Check,
  Close,
  Edit,
} from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  CircularProgress,
  Checkbox,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { IconCheckbox, IconCross, IconPackage } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import AddPackageDialog from "../addPackageDialog";
import toast, { Toaster } from "react-hot-toast";
import EditPackageDialog from "../editPackageDialog";

export function BasicTable() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(false);

  // Listen for add package event from header
  useEffect(() => {
    const handleAddPackage = () => {
      if(selectedCategory==''){
        toast.error("Please select category to add new package in that")
        return;
      }
      setPackageToAdd(UmrahPackage.getDummy());
    };

    window.addEventListener('addPackage', handleAddPackage);
    return () => window.removeEventListener('addPackage', handleAddPackage);
  }, [selectedCategory]);
  function parseData(data: any) {
    const packsResponse: PacksResponse = data.map((category: any) => ({
      id: category.id,
      name: category.name,
      status: category.status,
      created_at: category.created_at,
      updated_at: category.updated_at,
      list: category.list.map((pack: any) => UmrahPackage.fromJson(pack)),
    }));

    setPacks(packsResponse);

    console.log(packsResponse);
    setSelectedCategory(packsResponse[0].id.toString());
  }

  const [packs, setPacks] = useState<PacksResponse>();

  function loadPackages() {
    const props: ApiCallProps = {
      postUrl: GET_PACKAGES,
      data: undefined,
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        parseData(res);
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      },
    };
    makeGetCall(props);
  }

  useEffect(() => {
    loadPackages();
  }, []);

  const [packageToDelete, setPackageToDelete] = useState<UmrahPackage>();
  const [packageToAdd, setPackageToAdd] = useState<UmrahPackage | undefined>();
  const [packageToEdit, setPackageToEdit] = useState<
    UmrahPackage | undefined
  >();
  function deletePackage(pack: UmrahPackage | undefined) {
    if (pack instanceof UmrahPackage) {
      const props: ApiCallProps = {
        postUrl: GET_DELETE_PACKAGE + pack.id,
        data: null,
        onStart: function (): void {
          setLoading(true);
        },
        onProgressEnd: function (): void {
          setLoading(false);
        },
        onSuccess: function (res: any) {
          console.log(res);
          loadPackages();
        },
        onUnexpected: function (res: any) {
          console.log("Unexpected Result:", res);
        },
      };

      setPackageToDelete(undefined);
      makeGetCall(props);
    }
  }
  function isValidEmail(email: string) {
    // Regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function addPackage(p: UmrahPackage) {
    if (!p.package_image) {
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
      p.price_single === "" ||
      p.what_to_expect === "" ||
      p.price_quad === "" ||
      p.main_points === "" ||
      p.price_double === "" ||
      p.price_tripple === "" ||
      (p.hotel_makkah_enabled &&
        (p.hotel_makkah_name === "" || p.hotel_makkah_detail === "")) ||
      (p.hotel_madina_enabled &&
        (p.hotel_madina_name === "" || p.hotel_madina_detail === "")) ||
      p.nights_makkah < 0 ||
      p.nights_madina < 0 ||
      p.nights < 0 ||
      p.email === "" ||
      p.whatsapp === "" ||
      p.phone === "" ||
      (p.visa_enabled && (p.visa_title === "" || p.visa_detail === "")) ||
      (p.transport_enabled && (p.trans_title === "" || p.trans_detail === ""))
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

    if (!isValidEmail(p.email)) {
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

    createPackage(
      p,
      selectedCategory,
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
        loadPackages();
        console.log(res);
      },
      function (e: any) {
        //error
        console.log("Unexpected Result:", e);
      }
    );
    setPackageToAdd(undefined);
  }
  function updatePackage(p: UmrahPackage) {
    if (!p.package_image) {
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
      p.price_single === "" ||
      p.what_to_expect === "" ||
      p.price_quad === "" ||
      p.main_points === "" ||
      p.price_double === "" ||
      p.price_tripple === "" ||
      (p.hotel_makkah_enabled &&
        (p.hotel_makkah_name === "" || p.hotel_makkah_detail === "")) ||
      (p.hotel_madina_enabled &&
        (p.hotel_madina_name === "" || p.hotel_madina_detail === "")) ||
      p.nights_makkah < 0 ||
      p.nights_madina < 0 ||
      p.nights < 0 ||
      p.email === "" ||
      p.whatsapp === "" ||
      p.phone === "" ||
      (p.visa_enabled && (p.visa_title === "" || p.visa_detail === "")) ||
      (p.transport_enabled && (p.trans_title === "" || p.trans_detail === ""))
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


    }

    if (!isValidEmail(p.email)) {
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
      updatePackageCloud(
        p,
        selectedCategory,
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
          setPackageToEdit(undefined);
          // Force reload packages after successful update
          setTimeout(() => {
            loadPackages();
          }, 100);
        },
        function (e: any) {
          //error
          console.log("Unexpected Result:", e);
          setPackageToEdit(undefined);

        }
      )
      ,
      {
      

        loading: 'Saving Changes',
        success: <b>Package's Changes Saved...</b>,
        error: <b>Something went wrong!.</b>,

      }
      
    );


  }
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };
  function getDeleteCategoryDialog() {
    return (
      <Dialog
        sx={{
          backdropFilter: "blur(1px) sepia(5%)",
        }}
        // 👇 Props passed to Paper (modal content)
        PaperProps={{ sx: { borderRadius: "30px", padding: 1 } }}
        open={packageToDelete != undefined}
      >
        <DialogTitle>
          <h1 className="font-bold text-[30px]">Delete Confirmation</h1>
        </DialogTitle>
        <DialogContent>
          <h1 className="font-sm text-[20px]">
            This action is irreversible, when you click DELETE you would not
            able to undo Package
          </h1>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => deletePackage(packageToDelete)}
            sx={{ borderRadius: 10, paddingX: 6 }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setPackageToDelete(undefined);
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

  function getAddNewPackageDialog() {
    return (
      <AddPackageDialog
        packageToAdd={packageToAdd}
        setPackageToAdd={setPackageToAdd}
        addPackage={addPackage}
      />
    );
  }
  function getEditPackageDialog() {
    return (
      <EditPackageDialog
        packageToUpdate={packageToEdit}
        setPackageToEdit={setPackageToEdit}
        updatePackage={updatePackage}
      />
    );
  }
  return (
    <div>

      {packageToDelete && getDeleteCategoryDialog()}
      {packageToAdd && getAddNewPackageDialog()}
      {packageToEdit && getEditPackageDialog()}
      <Toaster position="bottom-center" />

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
          <div>
            <div className="ms-4 mt-4">
              <InputLabel id="dropdown-label">Select Category</InputLabel>
              <Select
                className="w-auto mt-2 bg-white text-black"
                sx={{ borderRadius: 3, paddingX: 0, paddingY: 0, fontSize: 12 }}
                labelId="dropdown-label"
                id="dropdown"
                value={selectedCategory}
                onChange={handleChange}
                style={{ minWidth: "200px" }}
              >
                {packs?.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>

                  <TableCell align="right">Prize (Per Person)</TableCell>
                  <TableCell align="right">Visa</TableCell>
                  <TableCell align="right">Ticket</TableCell>
                  <TableCell align="right">Breakfast</TableCell>
                  <TableCell align="right">Guide</TableCell>
                  <TableCell align="right">Hotel</TableCell>
                  <TableCell align="right">Round Trip</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packs
                  ?.find((e) => e.id.toString() == selectedCategory)
                  ?.list?.map((row: UmrahPackage) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{ fontSize: 17, color: "green" }}
                      >
                        {row.price_single + row.currency}
                      </TableCell>
                      <TableCell align="right">
                        {row.visa_enabled ? (
                          <Check htmlColor="green" />
                        ) : (
                          <Close htmlColor="red" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {row.ticket_enabled ? (
                          <Check htmlColor="green" />
                        ) : (
                          <Close htmlColor="red" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {row.breakfast_enabled ? (
                          <Check htmlColor="green" />
                        ) : (
                          <Close htmlColor="red" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {row.guide ? (
                          <Check htmlColor="green" />
                        ) : (
                          <Close htmlColor="red" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {row.hotel_madina_name ? (
                          <Check htmlColor="green" />
                        ) : (
                          <Close htmlColor="red" />
                        )}
                      </TableCell>

                      <TableCell align="right">
                        {row.is_roundtrip ? (
                          <Check htmlColor="green" />
                        ) : (
                          <Close htmlColor="red" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {
                          <Edit
                            onClick={() => {
                              setPackageToEdit(row);
                            }}
                            htmlColor="skyBlue"
                            className="hover:cursor-pointer hover:text-blue-400 hover:shadow-xl me-5 "
                          />
                        }

                        {
                          <Delete
                            onClick={() => {
                              setPackageToDelete(row);
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
          </div>
        </TableContainer>
      )}
    </div>
  );
}

export default function PackagesTab() {
  return (
    <div
      className="w-full flex flex-col bg-gray-100 overflow-auto "
      style={{ height: "800px" }}
    >
        <h1 className="font-bold text-black text-3xl px-5 bg-yellow-50 py-5 ">Packages</h1>


      <BasicTable />
    </div>
  );
}
