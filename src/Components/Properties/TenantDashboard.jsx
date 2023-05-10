import { Button, Card, Chip, Grid, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { db, storage } from "../../firebase/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { Bathroom, Bed, Map, SquareFoot } from "@mui/icons-material";
import Images from "./ImagesCarousel";
import CustomPaginationActionsTable from "./Transactions";
import HorizontalLinearStepper from "./Stepper";
import Paypal from "./Paypal";
import { createTransaction, fetchTransaction } from "api/api";

const TenantDashboard = () => {
  const { properties } = useContext(AuthContext);

  const property = properties[0] || null;

  const [reports, setReports] = useState([]);
  const [rows, setRows] = useState([]);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchedProperties = [];
    console.log("Fetching reports");

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "reports"));
      querySnapshot.forEach((doc) => {
        fetchedProperties.push(doc.data());
      });
      setReports(fetchedProperties);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTransaction(property?.id);
      console.log(data);
      setRows(data?.rows || []);
    }
    if (property?.id) {
      fetchData();
    }
  }, [properties]);

  const handleTransaction = () => {
    setRows((data) => {
      const newData = [
        { month: "May 23", date: "10th May", rent: property.price },
        ...data,
      ];
      createTransaction(property?.id, newData);
      return newData;
    });
    setSuccess(true);
  };
  return (
    <>
      {!!property ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography
            sx={{
              textAlign: "center",
            }}
            variant="h1"
            className="test"
            gutterBottom
          >
            {property?.name}
          </Typography>

          <Box sx={{ maxWidth: 960, margin: "auto", my: 2 }}>
            <Grid container>
              {property.images.length > 0 ? (
                <Grid item xs={12}>
                  <Images images={property.images} />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    pt: 0,
                    minHeight: "360px",
                  }}
                >
                  <Typography variant="subtitle1" component="div">
                    <span
                      style={{
                        color: "blueviolet",
                        fontSize: "2rem",
                      }}
                    >
                      ${property.price}
                    </span>{" "}
                    USD/Month
                  </Typography>

                  <Stack
                    direction={"row"}
                    sx={{ my: 2, flexWrap: "wrap" }}
                    spacing={1}
                  >
                    <Chip
                      icon={<Bed />}
                      label={property?.beds + " bedroom"}
                      variant="outlined"
                      color="info"
                    />
                    <Chip
                      icon={<Bathroom />}
                      label={property?.bath + " bathroom"}
                      variant="outlined"
                      color="info"
                    />
                    <Chip
                      icon={<SquareFoot />}
                      label={property?.sft + " sqft"}
                      variant="outlined"
                      color="info"
                    />
                  </Stack>
                  <Stack
                    direction={"row"}
                    sx={{ my: 2, alignItems: "center" }}
                    spacing={1}
                  >
                    <Typography variant="body1" component="div">
                      {property.location}
                    </Typography>{" "}
                    <Map color="primary" />
                  </Stack>

                  <div
                    className="truncate"
                    dangerouslySetInnerHTML={{
                      __html: property.about,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Grid container gap={4} sx={{ maxWidth: 1080, margin: "auto" }}>
            <Grid item xs={4}>
              <Card
                elevation={3}
                sx={{
                  marginLeft: "auto",
                  maxWidth: 300,
                  my: 2,
                  ml: 10,
                  p: 2,
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    color: "#1e88e5",
                  }}
                >
                  Owner Details
                </Typography>
                <Box>
                  <Typography variant="subtitle1" component="div">
                    Name:{" "}
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {property.OWNER.firstName} {property.OWNER.lastName}
                    </span>{" "}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    Email:{" "}
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {property.OWNER.email}
                    </span>{" "}
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={7}>
              <Box
                sx={{
                  p: 2,
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    color: "#1e88e5",
                  }}
                >
                  Pay Rent
                </Typography>
                <Paypal
                  amount={property.price}
                  handleTransaction={handleTransaction}
                />
              </Box>
            </Grid>

            {success && (
              <Typography
                variant="h2"
                sx={{
                  width: "100%",

                  textAlign: "center",
                }}
                color={"green"}
              >
                Payment is successful 🎉
              </Typography>
            )}
            {rows?.length > 0 && (
              <Grid item xs={12}>
                <Card
                  elevation={3}
                  sx={{
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      color: "#1e88e5",
                    }}
                  >
                    Recent Payments
                  </Typography>
                  <CustomPaginationActionsTable rows={rows} />
                </Card>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box
                sx={{
                  p: 2,
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    color: "#1e88e5",
                  }}
                >
                  Maintanance Report
                </Typography>
                {reports?.map((report, idx) => (
                  <Card elevation={3} sx={{ margin: "auto", my: 3 }} key={idx}>
                    <Grid container>
                      {report.images.length > 0 ? (
                        <Grid item xs={6}>
                          <Images images={report.images} />
                        </Grid>
                      ) : null}
                      <Grid
                        item
                        xs={6}
                        sx={{
                          p: 3,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>{report.about}</Box>
                        <HorizontalLinearStepper hide />
                      </Grid>
                    </Grid>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ) : null}
    </>
  );
};

export default TenantDashboard;

function createData(month, date, rent) {
  return { month, date, rent };
}
