import { GET_BLOGS, GET_CATEGORIES, POST_CREATE_CATEGORY, UPDATE_CATEGORY } from "@/app/db/Routes";
import { ApiCallProps, makeGetCall, makePostCall } from "@/app/db/api";
import Category from "@/app/type/Category";
import { Delete, Input, ToggleOff, ToggleOn } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, ToggleButton, CircularProgress, Dialog, DialogContent, DialogTitle, Typography, DialogActions, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";










export function BasicTable() {




  const [categories, setCategories] = useState<Array<Category>>();
  const [loading, setLoading] = useState(false);



  function loadCategories() {

    const props: ApiCallProps = {
      postUrl: GET_CATEGORIES,
      data: undefined,
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        setCategories(res.map((category: any) => Category.fromJson(category)))
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      }
    }


    makeGetCall(props)

  }


  useEffect(() => {
    loadCategories();
  }, [])



  function updateStatus(category: Category) {
    const props: ApiCallProps = {
      postUrl: UPDATE_CATEGORY,
      data: JSON.stringify({ 'action': 'update_status', 'id': category.id, 'status': category.status == "active" ? "unactive" : "active" }),
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        loadCategories();
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      }
    }

    setCategoryToDelete(undefined);
    makePostCall(props)
  }

  function deleteCategory(category: Category | undefined) {

    if (category instanceof Category) {
      const props: ApiCallProps = {
        postUrl: UPDATE_CATEGORY,
        data: JSON.stringify({ 'action': 'delete', 'id': category.id, 'status': 'any' }),
        onStart: function (): void {
          setLoading(true);
        },
        onProgressEnd: function (): void {
          setLoading(false);
        },
        onSuccess: function (res: any) {
          console.log(res);
          loadCategories();

        },
        onUnexpected: function (res: any) {
          console.log("Unexpected Result:", res);
        }
      }

      setCategoryToDelete(undefined);
      makePostCall(props)
    }

  }



  function editCategory(category: Category) {
    const props: ApiCallProps = {
      postUrl: UPDATE_CATEGORY,
      data: JSON.stringify({ 'action': 'update', 'id': category.id, 'name': editCategoryName }),
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        loadCategories();
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      }
    }

    setCategoryToEdit(undefined);
    makePostCall(props)
  }

  // Add category function
  function addCategory(category: string) {
    const props: ApiCallProps = {
      postUrl: POST_CREATE_CATEGORY,
      data: JSON.stringify({ 'name': category }),
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        loadCategories();
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      }
    }
    setCategoryToAdd(undefined);
    makePostCall(props)
  }

  const [categoryName, setCategoryName] = useState('');
  const [categoryToDelete, setCategoryToDelete] = useState<Category>();
  const [categoryToAdd, setCategoryToAdd] = useState<Category>();
  const [categoryToEdit, setCategoryToEdit] = useState<Category>();
  const [editCategoryName, setEditCategoryName] = useState('');

  function getEditCategoryDialog() {
    return (<Dialog sx={{
      backdropFilter: "blur(1px) sepia(5%)"
    }}
      PaperProps={{ sx: { borderRadius: "30px", padding: 1, width: 500 } }} open={categoryToEdit != undefined}>
      <DialogTitle>
        <h1 className="font-bold text-[30px]">
          Edit Category
        </h1>
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ marginY: 1 }}
          multiline
          minRows={3}
          id="name"
          label="Name"
          fullWidth
          variant="outlined"
          value={editCategoryName}
          onChange={(e: any) => {
            setEditCategoryName(e.target.value);
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => editCategory(categoryToEdit!)} sx={{ borderRadius: 10, paddingX: 6 }} variant="contained" color="success">Update</Button>
        <Button onClick={() => { setCategoryToEdit(undefined) }} sx={{ borderRadius: 10, paddingX: 6 }} variant="contained" color='error'>Cancel</Button>
      </DialogActions>
    </Dialog>);
  }

  function getAddNewCategoryDialog() {
    return (<Dialog sx={{
      backdropFilter: "blur(1px) sepia(5%)"
    }}
      PaperProps={{ sx: { borderRadius: "30px", padding: 1, width: 500 } }} open={categoryToAdd != undefined}>
      <DialogTitle>
        <h1 className="font-bold text-[30px]">
          Add New Category
        </h1>
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ marginY: 1 }}
          multiline
          minRows={3}
          id="name"
          label="Name"
          fullWidth
          variant="outlined"
          value={categoryName}
          onChange={(e: any) => {
            setCategoryName(e.target.value);
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => addCategory(categoryName)} sx={{ borderRadius: 10, paddingX: 6 }} variant="contained" color="success">Add</Button>
        <Button onClick={() => { setCategoryToAdd(undefined) }} sx={{ borderRadius: 10, paddingX: 6 }} variant="contained" color='error'>Cancel</Button>
      </DialogActions>
    </Dialog>);
  }

  function getDeleteCategoryDialog() {
    return (<Dialog sx={{
      backdropFilter: "blur(1px) sepia(5%)",
    }}
      PaperProps={{ sx: { borderRadius: "30px", padding: 1 } }} open={categoryToDelete != undefined}>
      <DialogTitle>
        <h1 className="font-bold text-[30px]">
          Delete Confirmation
        </h1>
      </DialogTitle>
      <DialogContent>
        <h1 className="font-sm text-[20px]">
          This action is irreversible, when you delete on delete all Packages under that category would also be deleted
        </h1>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => deleteCategory(categoryToDelete)} sx={{ borderRadius: 10, paddingX: 6 }} variant="contained" color="error">Delete</Button>
        <Button onClick={() => { setCategoryToDelete(undefined) }} sx={{ borderRadius: 10, paddingX: 6 }} variant="contained" color='success'>Cancel</Button>
      </DialogActions>
    </Dialog>);
  }

  return (
    <div>
      <div
        className="fixed top-3 right-10 shadow-sm z-20"

      >
        <div onClick={() => { setCategoryToAdd(Category.getDummy()) }} className="hover:cursor-pointer hover:shadow-md hover:shadow-gray-600  rounded-full bg-white px-6 py-3 text-black ">Add Category</div>


      </div>


      {getAddNewCategoryDialog()}
      {getEditCategoryDialog()}
      {getDeleteCategoryDialog()}


      {loading ? <div className="w-[900px]   flex flex-col items-center  " >

        <CircularProgress size={70} sx={{ color: "orange", borderRadius: 20, borderWidth: 3, padding: 1 }} className="mt-48" />

      </div> : <TableContainer sx={{ marginX: 3, width: window.innerWidth / 1.30, marginTop: 2 }} className="w-full" component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Packages</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.packages_count}</TableCell>
                <TableCell align="right" onClick={() => updateStatus(row)}>
                  {row.status == "active" ? <ToggleOn className="hover:cursor-pointer" htmlColor="green" fontSize={"large"} /> : <ToggleOff className="hover:cursor-pointer" htmlColor="red" fontSize={"large"} />}
                </TableCell>
                <TableCell align="right">
                  <Input onClick={() => { 
                    setCategoryToEdit(row); 
                    setEditCategoryName(row.name); 
                  }} htmlColor="blue" className="hover:cursor-pointer hover:text-blue-600 hover:shadow-xl" />
                </TableCell>
                <TableCell align="right">
                  {<Delete onClick={() => { setCategoryToDelete(row) }} htmlColor="red" className="hover:cursor-pointer hover:text-red-600 hover:shadow-xl " />}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>

  );
}




export default function CategoriesTab() {
  return (
    <div className="w-full flex flex-col bg-gray-100 overflow-auto " style={{ height: "800px" }}>

  <h1 className="font-bold text-black text-3xl px-5 bg-yellow-50 py-5 ">Categories</h1>


      <BasicTable />







    </div>
  );
}