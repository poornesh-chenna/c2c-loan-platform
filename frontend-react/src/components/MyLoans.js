import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Axios } from "../utils/Axios";
import Dialog from "@mui/material/Dialog";
import Chip from "@mui/material/Chip";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import PendingIcon from "@mui/icons-material/Pending";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";

import "./styles/myloans.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyLoans() {
  const [myloans, setMyloans] = useState([]);
  const [loanIndex, setloanIndex] = useState();
  const [open, setOpen] = useState(false);
  const [isModifiedclicked, setisModifiedclicked] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getLoans = async () => {
      const MyLoans = await Axios.get("/myloans");
      console.log(MyLoans.data.myloans);
      setMyloans(MyLoans.data.myloans);
    };
    getLoans();
  }, []);

  const getModifiedRequests = (e) => {
    setOpen(true);
    setisModifiedclicked(true);
    console.log(e.target.value);
    setloanIndex(e.target.value);
  };

  console.log(myloans);

  return (
    <div>
      <Typography variant="h3">My Loans</Typography>

      {myloans.length === 0 ? (
        <div>apply for loans</div>
      ) : (
        myloans.map((loan, index) => {
          return (
            <div className="loanCard" key={index}>
              <Card className="card" sx={{ minWidth: 275, mb: 2 }}>
                <CardActions className="modifyRequestsButton">
                  <Button
                    size="small"
                    onClick={getModifiedRequests}
                    value={index}
                    variant="outlined"
                  >
                    Modified Requsts
                  </Button>
                </CardActions>
                <CardContent>
                  .
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Loan ID - {loan._id}
                  </Typography>
                  <Typography variant="h5" component="div" gutterBottom>
                    Loan Amount : <span>{loan.Amount}</span>
                  </Typography>
                  <Box
                    className="loan_details"
                    sx={{ display: "inline-flex", flexWrap: "wrap" }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ width: 300 }}
                    >
                      Period : <span>{loan.Tenure}</span>
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ width: 300 }}
                    >
                      Interest Rate : <span>{loan.Interest_Rate}</span>
                    </Typography>
                  </Box>
                  {loan.status === "Reject" ? (
                    <div className="statusChip">
                      <Chip
                        icon={<CancelIcon />}
                        label="Reject"
                        color="error"
                      />
                    </div>
                  ) : loan.status === "Sanctioned" ? (
                    <div className="statusChip">
                      <Chip
                        icon={<DoneIcon />}
                        label="Sanctioned"
                        color="success"
                      />
                    </div>
                  ) : (
                    <div className="statusChip">
                      <Chip
                        color="info"
                        label="Pending"
                        icon={<PendingIcon />}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })
      )}

      {isModifiedclicked ? (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Modified requests by users
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          {/* {console.log(myloans[1].modified.length)} */}

          {myloans[loanIndex].modified.length === 0 ? (
            <div>no modified requests</div>
          ) : (
            myloans[loanIndex].modified.map((modifiedLoan, ind) => {
              return (
                <div
                  className="modifycard"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Card
                    className="card"
                    sx={{
                      minWidth: 275,
                      width: 700,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        username
                      </Typography>
                      <div className="modifiedData">
                        <Typography variant="h6" component="div">
                          {"Interest Rate : " + modifiedLoan.Interest_Rate}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ ml: 5 }}>
                          {"Tenure : " + modifiedLoan.Tenure}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>
                      <div className="arbuttons">
                        <Button variant="outlined" color="error">
                          Reject
                        </Button>
                        <div className="acceptbutton">
                          <Button variant="contained" color="success">
                            Accept
                          </Button>
                        </div>
                      </div>
                    </CardActions>
                  </Card>
                </div>
              );
            })
          )}
        </Dialog>
      ) : (
        ""
      )}
    </div>
  );
}

export default MyLoans;
