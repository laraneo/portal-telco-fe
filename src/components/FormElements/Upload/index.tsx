import React, { FunctionComponent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import snackBarUpdate from "../../../actions/snackBarActions";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
        fontSize: 12,
    },
    detail: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    }
}));

type UploadProps = {
    field: string;
    label: string;
    register: any;
    setValue: Function;
};

const Upload: FunctionComponent<UploadProps> = ({
    field,
    label,
    register,
    setValue,
}) => {
    const [file, setFile] = useState({ preview: '', raw: '' });
    const [docField, setDocField] = useState();
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const classes = useStyles();

    const loadDocument = (e: any) => {
        const current = e.target.files[0];
        if (e.target.files.length > 0) {
            //console.log('current.type ', current.type);
            if (current.type === 'image/png' || current.type === 'image/jpeg' || current.type === 'application/pdf' || current.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                if (current.size <= 5000000) {
                    const reader: any = new FileReader();
                    reader.onload = () => {
                        setName(current.name);
                        setValue(field, reader.result);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                } else {
                    setValue(field, '');
                    setName('');
                    dispatch(snackBarUpdate({
                        payload: {
                            message: "Documento debe tener maximo 5MB",
                            type: "error",
                            status: true
                        }
                    }))
                }
            } else {
                setValue(field, '');
                setName('');
                dispatch(snackBarUpdate({
                    payload: {
                        message: "Solo de Admiten los formatos: .pdf - .doc",
                        type: "error",
                        status: true
                    }
                }))
            }
        }
    };

    const triggerClick = (input: any) => {
        if (input) {
            setDocField(input);
        }
    };

    const handleFile = () => {
        docField.click();
        setDocField(docField);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Button
                    startIcon={<CloudUploadIcon />}
                    variant="contained"
                    color="primary"
                    component="span"
                    size="small"
                    className={classes.button}
                    onClick={() => handleFile()}
                >
                    {label}
                </Button>
                <input
                    style={{ display: "none" }}
                    type="file"
                    id="load_image"
                    ref={triggerClick}
                    onChange={loadDocument}
                />
                <input
                    style={{ display: "none" }}
                    name={field}
                    ref={register}
                />
            </Grid>
            <Grid item xs={8} className={classes.detail} >{name}</Grid>
        </Grid>
    );
}


export default Upload;