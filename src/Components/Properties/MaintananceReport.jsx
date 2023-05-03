import {
  Button,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import uniqid from "uniqid";
import Drop from "./DropZone/Drop";

const MaintananceReport = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState("");
  const [images, setImages] = useState([]);
  const createReport = async (courseObj) => {
    const genratedID = uniqid();
    courseObj.id = genratedID;
    courseObj.date = new Date();

    const courseRef = doc(db, "reports", genratedID);
    await setDoc(courseRef, courseObj);
    setImages([]);
    setProperty("");
  };
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const handelFormSubmit = async () => {
    setLoading(true);
    try {
      const propertyObj = {
        about: property,
      };
      const uploadingImages = [];
      const pics = [];
      for (let _ = 0; _ < images.length; _++) {
        const element = images[_];
        if (element.file) {
          uploadingImages.push(element);
        } else {
          pics.push(element.src);
        }
      }
      for await (const key of uploadingImages) {
        try {
          const url = await onSubmitFile(key);
          pics.push(url);
        } catch (error) {
          console.log(error);
        }
      }
      propertyObj.images = pics;
      console.log(propertyObj, uploadingImages);

      await createReport(propertyObj);
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setUpdated(true);
  };
  const onSubmitFile = async ({ file, id }) => {
    let url = null;
    try {
      if (file) {
        let storageRef = ref(storage, `posts/${id}`);
        await uploadBytes(storageRef, file);

        console.log("Uploaded a blob or file!");
        url = await getDownloadURL(storageRef);
        console.log(url);
      }
    } catch (error) {
      console.log(error);
    }
    return url;
  };
  return (
    <>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h3"
          className="test"
          gutterBottom
        >
          {updated && "Successfully Submitted!!"}
        </Typography>

        <Grid container gap={4} sx={{ maxWidth: 1080, margin: "auto" }}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "#1e88e5",
              }}
            >
              Add New Issue
            </Typography>
            {loading ? (
              <LinearProgress sx={{ my: 2 }} color="secondary" />
            ) : null}
            <Drop setImages={setImages} images={images} />
            <TextField
              id="outlined-multiline-flexible"
              label="Report"
              multiline
              fullWidth
              value={property}
              rows={4}
              sx={{
                my: 2,
              }}
              onChange={({ target }) => setProperty(target.value)}
            />

            {!updated ? (
              <Stack
                sx={{ mt: 2, justifyContent: "center" }}
                spacing={3}
                direction="row"
              >
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={handelFormSubmit}
                >
                  Submit
                </Button>
                <Button
                  fullWidth
                  size="large"
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            ) : (
              <Stack
                sx={{ mt: 2, justifyContent: "center" }}
                spacing={3}
                direction="row"
              >
                <Button
                  disableElevation
                  // disabled
                  fullWidth
                  size="large"
                  type="button"
                  variant="contained"
                  color="info"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Go Back
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default MaintananceReport;
