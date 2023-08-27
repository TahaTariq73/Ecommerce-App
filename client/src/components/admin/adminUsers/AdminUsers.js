import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, deleteUser, updateUser } from "../../../actions/userAction";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DeleteIcon from "@material-ui/icons/Delete";
import { setAlert } from "../../../alert/alertAction";
import IconButton from '@mui/material/IconButton';
import Loader from "../../layout/loader/Loader";
import "./adminUsers.css";

function SelectRole ({ defaultRole, userId }) {
    const dispatch = useDispatch();
    const [userRole, setUserRole] = useState(defaultRole);

    const {
        loading,
        error,
        isUpdated
    } = useSelector((state) => state.profile);

    const updateUserHandler = (e) => {
        let getUpdateRole = userRole === "user" ? "admin" : "user"; 
        dispatch(updateUser(userId, { role: getUpdateRole }));

        // setState is async thats why calling before dispatch doesn't effect

        setUserRole(e.target.value);
    }

    useEffect(() => {
        function showAlert (alertType, alertMsg) {
            const alert = setAlert(true, alertType, alertMsg); 
            dispatch(alert);
        }

        if (error) {
            return showAlert("error", error);
        }

        if (isUpdated) {
            return showAlert("success", "User Role Updated Successfully");
        }
    }, [dispatch, error, isUpdated])

    return (
        <Select 
            size="small"
            onChange={(e) => updateUserHandler(e)}
            disabled={loading === true ? true : false}
            value={userRole}
        >
            <MenuItem value="admin"> Admin </MenuItem>
            <MenuItem value="user"> User </MenuItem>
        </Select>
    )
}

const AdminUsers = () => {
    const dispatch = useDispatch();

    const {
        error,
        loading,
        users
    } = useSelector((state) => state.allUsers);

    const {
        error: deleteError,
        isDeleted,
        message
    } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        function showAlert (alertType, alertMsg) {
            const alert = setAlert(true, alertType, alertMsg); 
            dispatch(alert);
        }

        if (error) {
            return showAlert("error", error);
        }

        if (deleteError) {
            return showAlert("error", deleteError);
        }

        if (isDeleted) {
            return showAlert("success", message);
        }
        if (isDeleted) {
            dispatch({ type: "DELETE_USER_RESET" });
        }

        dispatch(getAllUsers());
    }, [dispatch, isDeleted, error, deleteError, message])

    const columns = [
        {
            field: "id",
            headerName: "User Id",
            minWidth: 200,
            flex: 0.5
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return `${params.getValue(params.id, "role") === "admin" ? "green-color" : "red-color"} user-role`;
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 200,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <SelectRole 
                            defaultRole={params.getValue(params.id, "role")}  
                            userId={params.getValue(params.id, "id")}
                        />

                        <IconButton onClick={
                            () => deleteUserHandler(params.getValue(params.id, "id"))
                        }>
                            <DeleteIcon />
                        </IconButton>
                    </Fragment>
                )
            }
        }
    ]

    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name
        })
    })

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={15}
                    className="users-list-table"
                    disableSelectionOnClick
                    autoHeight
                /> 
            )}
        </Fragment>
    )
}

export default AdminUsers;