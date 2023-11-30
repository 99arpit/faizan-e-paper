// // import React, { useState } from "react";
// // import "../CSS/Maindashboard.css";
// // import Navbar from "./Navbar";
// // import "../CSS/CreateAd.css";

// // import {
// //   Button,
// //   FormControl,
// //   FormControlLabel,
// //   InputLabel,
// //   MenuItem,
// //   Radio,
// //   RadioGroup,
// //   Select,
// //   TextField,
// // } from "@mui/material";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { HiOutlineArrowSmallLeft } from "react-icons/hi2";

// // const CreateAd = () => {
// //   let initialValue = {
// //     page_name: "",
// //     page_location: "",
// //     desktop: "",
// //     start_date: "",
// //     end_date: "",
// //     image: "",
// //     script: "",
// //     text: "",
// //   };
// //   const [values, setValues] = useState(initialValue);
// //   // console.log(values);

// //   // const handleInputChange = (e) => {
// //   //   const { name, value, files } = e.target;
// //   //   // console.log(e.target)
// //   //   // console.log(name, value);
// //   //   if (name === "image") {
// //   //     setValues((prev) => {
// //   //       return { ...prev, "image": e.target.files[0] };
// //   //     });
// //   //   } else {
// //   //     setValues((prev) => {
// //   //       return { ...prev, [name]: value };
// //   //     });
// //   //   }

// //   // };
// //   const [imageError, setImageError] = useState("");
// //   const handleInputChange = (e) => {
// //     const { name, value, files } = e.target;

// //     if (name === "image") {
// //       const file = e.target.files[0];
// //       if (file.size > 1048576 && file.size <= 5242880) {
// //         // Image size is more than 1MB and less than or equal to 5MB
// //         setImageError("");
// //         setValues((prev) => {
// //           return { ...prev, [name]: file };
// //         });
// //       } else if (file.size <= 1048576) {
// //         setImageError("Image size should be more than 1 MB");
// //       } else if (file.size > 5242880) {
// //         setImageError("Image size should be less than 5MB");
// //       }
// //     } else {
// //       setValues((prev) => {
// //         return { ...prev, [name]: value };
// //       });
// //     }
// //   };

// //   console.log(values);

// //   const id = localStorage?.getItem("newspaperAgencyAdminId");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (imageError) {
// //       alert(imageError);
// //       return;
// //     }
// //     const formdata = new FormData();
// //     for (let key in values) {
// //       formdata.append(key, values[key]);
// //     }
// //     // console.log(formdata);
// //     try {
// //       const response = await axios.post(
// //         `http://174.138.101.222:8080/${id}/create-advertisement`,
// //         formdata,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/formdata",
// //           },
// //         }
// //       );
// //       console.log(response);
// //       setValues({
// //         page_name: "",
// //         page_location: "",
// //         desktop: "",
// //         start_date: "",
// //         end_date: "",
// //         image: "",
// //         script: "",
// //         text: "",
// //       })
// //       alert('Ad Created')
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const navigate = useNavigate();

// //   const [style, setStyle] = useState("main-menu");

// //   const changeStyle = () => {
// //     setStyle((prev) => {
// //       if (prev === 'main-menu') {
// //         setStyle('main-menu-1')
// //       } else setStyle('main-menu')
// //     });
// //   };

// //   return (
// //     <div className="maindashboard">
// //       <nav className={style}>
// //         <Navbar />
// //       </nav>
// //       <div className="dashbox position-relative ">
// //         <div className="dashwithfav">

// //           <span className="my-auto" style={{ fontSize: '1.3rem', fontWeight: '400', fontFamily: 'Rooboto' }} onClick={() => navigate(-1)} >
// //             <HiOutlineArrowSmallLeft className="rightShift" style={{ marginRight: "16px;" }} />
// //             Create Advertisement </span>

// //           <div className="onclick" onClick={changeStyle}>
// //             <i class="fa-solid fa-bars"></i>
// //           </div>

// //         </div>
// //         <h4 style={{ fontFamily: "Rooboto", marginTop: '11px', marginLeft: '18px' }}>

// //           Select Type of Ad
// //         </h4>
// //         <br />
// //         <FormControl sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }} className=" mb-4">
// //           <InputLabel style={{ fontFamily: "Rooboto" }}>Page Name</InputLabel>
// //           <Select
// //             label="Page Name"
// //             name="page_name"
// //             value={values.page_name}
// //             onChange={handleInputChange}
// //           >
// //             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Home_Page"}>Home Page</MenuItem>
// //             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Categories_Page"}>Categories Page</MenuItem>
// //             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Detailed_News_Page"}>Detailed News Page</MenuItem>
// //           </Select>
// //         </FormControl>
// //         <br />

// //         <FormControl sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }} className=" mb-4">
// //           <InputLabel style={{ fontFamily: "Rooboto" }}>Page Location</InputLabel>
// //           <Select
// //             name="page_location"
// //             label="Page Location"
// //             value={values.page_location}
// //             onChange={handleInputChange}
// //           >
// //             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Topbar"}>Topbar</MenuItem>
// //             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Below_Breaking_News"}>Below Breaking News</MenuItem>
// //             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Footer"}>Footer</MenuItem>
// //           </Select>
// //         </FormControl>
// //         <br />
// //         <FormControl sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }} className=" mb-4">
// //           <InputLabel style={{ fontFamily: "Rooboto" }}>Platform</InputLabel>
// //           <Select
// //             label="Platform"
// //             name="desktop"

// //             value={values.desktop}
// //             onChange={handleInputChange}
// //           >
// //             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Desktop"}>Desktop</MenuItem>
// //             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Mobile"}>Mobile</MenuItem>
// //             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Both"}>Both</MenuItem>
// //           </Select>
// //         </FormControl>
// //         <br />
// //         <h6 style={{ fontFamily: "Rooboto" }} className="ms-3 mb-2" >
// //           Start Date:-
// //         </h6>{" "}
// //         <TextField
// //           sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
// //           className="mb-4"
// //           name="start_date"
// //           value={values.start_date}
// //           onChange={handleInputChange}
// //           type="datetime-local"
// //         ></TextField>
// //         <br />
// //         <h6 style={{ fontFamily: "Rooboto" }} className="ms-3 mb-2" >
// //           End Date:-
// //         </h6>
// //         <TextField
// //           sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
// //           name="end_date"
// //           value={values.end_date}
// //           onChange={handleInputChange}
// //           className=" mb-4"
// //           type="datetime-local"
// //         ></TextField>
// //         <br />
// //         <FormControl className="mx-3 mb-4">
// //           <RadioGroup
// //             aria-labelledby="demo-radio-buttons-group-label"
// //             name="radio-buttons-group"
// //             row
// //             onChange={(e) =>
// //               setValues({ ...values, type_of_ad: e.target.value })
// //             }
// //           >
// //             <FormControlLabel value="Image" control={<Radio />} label="Image" />
// //             <FormControlLabel
// //               value="Script"
// //               control={<Radio />}
// //               label="Script"
// //             />
// //             <FormControlLabel value="Text" control={<Radio />} label="Text" />
// //           </RadioGroup>
// //         </FormControl>
// //         {values.type_of_ad === "Image" && (
// //           <>
// //           <TextField
// //             id="outlined-basic"
// //             variant="outlined"
// //             type="file"
// //             className="mx-2"
// //             sx={{ width: "400px" }}
// //             hiddenLabel="Image"
// //             // value={values.image}
// //             name="image"
// //             onChange={handleInputChange}
// //           />
// //           <p className="error-text">{imageError}</p>
// //           </>
// //         )}
// //         {values.type_of_ad === "Script" && (
// //           <TextField
// //             id="outlined-basic"
// //             className="mx-2 mb-4"
// //             multiline
// //             label="Script"
// //             variant="outlined"
// //             sx={{ width: "400px" }}
// //             name="script"
// //             value={values.script}
// //             onChange={handleInputChange}
// //           />
// //         )}
// //         {values.type_of_ad === "Text" && (
// //           <TextField
// //             id="outlined-basic"
// //             className="mx-2 mb-4"
// //             multiline
// //             label="Text"
// //             variant="outlined"
// //             sx={{ width: "400px" }}
// //             name="text"
// //             value={values.text}
// //             onChange={handleInputChange}
// //           />
// //         )}
// //         <br />
// //         <Button
// //           className="mb-4"
// //           style={{ backgroundColor: "red", position: 'absolute', left: '50%', bottom: '-70px', transform: 'translateX(-50%)', width: '200px', height: '45px', fontFamily: "Rooboto" }}
// //           variant="contained"

// //           onClick={(e) => {
// //             handleSubmit(e);
// //           }}
// //         >
// //           Create Ad
// //         </Button>
// //       </div>
// //     </div >
// //   );
// // };

// // export default CreateAd;

// import React, { useState } from "react";
// import "../CSS/Maindashboard.css";
// import Navbar from "./Navbar";
// import "../CSS/CreateAd.css";

// import {
//   Button,
//   FormControl,
//   FormControlLabel,
//   InputLabel,
//   MenuItem,
//   Radio,
//   RadioGroup,
//   Select,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { HiOutlineArrowSmallLeft } from "react-icons/hi2";

// const CreateAd = () => {
//   let initialValue = {
//     page_name: "",
//     page_location: "",
//     desktop: "",
//     start_date: "",
//     end_date: "",
//     image: "",
//     script: "",
//     text: "",
//   };
//   const [values, setValues] = useState(initialValue);
//   // console.log(values);

//   // const handleInputChange = (e) => {
//   //   const { name, value, files } = e.target;
//   //   // console.log(e.target)
//   //   // console.log(name, value);
//   //   if (name === "image") {
//   //     setValues((prev) => {
//   //       return { ...prev, "image": e.target.files[0] };
//   //     });
//   //   } else {
//   //     setValues((prev) => {
//   //       return { ...prev, [name]: value };
//   //     });
//   //   }

//   // };
//   const [imageError, setImageError] = useState("");
//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "image") {
//       const file = e.target.files[0];
//       if (file.size > 1048576 && file.size <= 5242880) {
//         // Image size is more than 1MB and less than or equal to 5MB
//         setImageError("");
//         setValues((prev) => {
//           return { ...prev, [name]: file };
//         });
//       } else if (file.size <= 1048576) {
//         setImageError("Image size should be more than 1 MB");
//       } else if (file.size > 5242880) {
//         setImageError("Image size should be less than 5MB");
//       }
//     } else {
//       setValues((prev) => {
//         return { ...prev, [name]: value };
//       });
//     }
//   };

//   console.log(values);

//   const id = localStorage?.getItem("newspaperAgencyAdminId");
//   const newspaperAgencyAdminToken = localStorage.getItem("newspaperAgencyAdminToken");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (imageError) {
//       alert(imageError);
//       return;
//     }
//     const formdata = new FormData();
//     for (let key in values) {
//       formdata.append(key, values[key]);
//     }
//     // console.log(formdata);
//     try {
//       const response = await axios.post(
//         `http://174.138.101.222:8080/${id}/create-advertisement`,
//         formdata,
//         {
//           headers: {
//             "Content-Type": "multipart/formdata",
//             Authorization: `Bearer ${newspaperAgencyAdminToken}`,
//           },
//         }
//       );
//       console.log(response);
//       setValues({
//         page_name: "",
//         page_location: "",
//         desktop: "",
//         start_date: "",
//         end_date: "",
//         image: "",
//         script: "",
//         text: "",
//       })
//       alert('Ad Created')
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const navigate = useNavigate();

//   const [style, setStyle] = useState("main-menu");

//   const changeStyle = () => {
//     setStyle((prev) => {
//       if (prev === 'main-menu') {
//         setStyle('main-menu-1')
//       } else setStyle('main-menu')
//     });
//   };

//   return (
//     <div className="maindashboard">
//       <nav className={style}>
//         <Navbar />
//       </nav>
//       <div className="dashbox position-relative ">
//         <div className="dashwithfav">

//           <span className="my-auto" style={{ fontSize: '1.3rem', fontWeight: '400', fontFamily: 'Rooboto' }} onClick={() => navigate(-1)} >
//             <HiOutlineArrowSmallLeft className="rightShift" style={{ marginRight: "16px;" }} />
//             Create Advertisement </span>

//           <div className="onclick" onClick={changeStyle}>
//             <i class="fa-solid fa-bars"></i>
//           </div>

//         </div>
//         <h4 style={{ fontFamily: "Rooboto", marginTop: '11px', marginLeft: '18px' }}>

//           Select Type of Ad
//         </h4>
//         <br />
//         <FormControl sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }} className=" mb-4">
//           <InputLabel style={{ fontFamily: "Rooboto" }}>Page Name</InputLabel>
//           <Select
//             label="Page Name"
//             name="page_name"
//             value={values.page_name}
//             onChange={handleInputChange}
//           >
//             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Home_Page"}>Home Page</MenuItem>
//             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Categories_Page"}>Categories Page</MenuItem>
//             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Detailed_News_Page"}>Detailed News Page</MenuItem>
//           </Select>
//         </FormControl>
//         <br />

//         <FormControl sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }} className=" mb-4">
//           <InputLabel style={{ fontFamily: "Rooboto" }}>Page Location</InputLabel>
//           <Select
//             name="page_location"
//             label="Page Location"
//             value={values.page_location}
//             onChange={handleInputChange}
//           >
//             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Topbar"}>Topbar</MenuItem>
//             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Below_Breaking_News"}>Below Breaking News</MenuItem>
//             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Footer"}>Footer</MenuItem>
//           </Select>
//         </FormControl>
//         <br />
//         <FormControl sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }} className=" mb-4">
//           <InputLabel style={{ fontFamily: "Rooboto" }}>Platform</InputLabel>
//           <Select
//             label="Platform"
//             name="desktop"

//             value={values.desktop}
//             onChange={handleInputChange}
//           >
//             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Desktop"}>Desktop</MenuItem>
//             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Mobile"}>Mobile</MenuItem>
//             <MenuItem style={{ fontFamily: "Rooboto" }} value={"Both"}>Both</MenuItem>
//           </Select>
//         </FormControl>
//         <br />
//         <h6 style={{ fontFamily: "Rooboto" }} className="ms-3 mb-2" >
//           Start Date:-
//         </h6>{" "}
//         <TextField
//           sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
//           className="mb-4"
//           name="start_date"
//           value={values.start_date}
//           onChange={handleInputChange}
//           type="datetime-local"
//         ></TextField>
//         <br />
//         <h6 style={{ fontFamily: "Rooboto" }} className="ms-3 mb-2" >
//           End Date:-
//         </h6>
//         <TextField
//           sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
//           name="end_date"
//           value={values.end_date}
//           onChange={handleInputChange}
//           className=" mb-4"
//           type="datetime-local"
//         ></TextField>
//         <br />
//         <FormControl className="mx-3 mb-4">
//           <RadioGroup
//             aria-labelledby="demo-radio-buttons-group-label"
//             name="radio-buttons-group"
//             row
//             onChange={(e) =>
//               setValues({ ...values, type_of_ad: e.target.value })
//             }
//           >
//             <FormControlLabel value="Image" control={<Radio />} label="Image" />
//             <FormControlLabel
//               value="Script"
//               control={<Radio />}
//               label="Script"
//             />
//             <FormControlLabel value="Text" control={<Radio />} label="Text" />
//           </RadioGroup>
//         </FormControl>
//         {values.type_of_ad === "Image" && (
//           <>
//           <TextField
//             id="outlined-basic"
//             variant="outlined"
//             type="file"
//             className="mx-2"
//             sx={{ width: "400px" }}
//             hiddenLabel="Image"
//             // value={values.image}
//             name="image"
//             onChange={handleInputChange}
//           />
//           <p className="error-text">{imageError}</p>
//           </>
//         )}
//         {values.type_of_ad === "Script" && (
//           <TextField
//             id="outlined-basic"
//             className="mx-2 mb-4"
//             multiline
//             label="Script"
//             variant="outlined"
//             sx={{ width: "400px" }}
//             name="script"
//             value={values.script}
//             onChange={handleInputChange}
//           />
//         )}
//         {values.type_of_ad === "Text" && (
//           <TextField
//             id="outlined-basic"
//             className="mx-2 mb-4"
//             multiline
//             label="Text"
//             variant="outlined"
//             sx={{ width: "400px" }}
//             name="text"
//             value={values.text}
//             onChange={handleInputChange}
//           />
//         )}
//         <br />
//         <Button
//           className="mb-4"
//           style={{ backgroundColor: "red", position: 'absolute', left: '50%', bottom: '-70px', transform: 'translateX(-50%)', width: '200px', height: '45px', fontFamily: "Rooboto" }}
//           variant="contained"

//           onClick={(e) => {
//             handleSubmit(e);
//           }}
//         >
//           Create Ad
//         </Button>
//       </div>
//     </div >
//   );
// };

// export default CreateAd;

import React, { useState } from "react";
import "../CSS/Maindashboard.css";
import Navbar from "./Navbar";
import "../CSS/CreateAd.css";

import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";

const CreateAd = () => {
  let initialValue = {
    page_name: "",
    page_location: "",
    desktop: "",
    templates:"",
    start_date: "",
    end_date: "",
    image: "",
    script: "",
    text: "",
  };
  const [values, setValues] = useState(initialValue);
  // console.log(values);

  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;
  //   // console.log(e.target)
  //   // console.log(name, value);
  //   if (name === "image") {
  //     setValues((prev) => {
  //       return { ...prev, "image": e.target.files[0] };
  //     });
  //   } else {
  //     setValues((prev) => {
  //       return { ...prev, [name]: value };
  //     });
  //   }

  // };
  const [imageError, setImageError] = useState("");
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      if (file.size > 1048576 && file.size <= 5242880) {
        // Image size is more than 1MB and less than or equal to 5MB
        setImageError("");
        setValues((prev) => {
          return { ...prev, [name]: file };
        });
      } else if (file.size <= 1048576) {
        setImageError("Image size should be more than 1 MB");
      } else if (file.size > 5242880) {
        setImageError("Image size should be less than 5MB");
      }
    } else {
      setValues((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  console.log(values);

  const id = localStorage?.getItem("newspaperAgencyAdminId");
  const newspaperAgencyAdminToken = localStorage.getItem(
    "newspaperAgencyAdminToken"
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageError) {
      alert(imageError);
      return;
    }
    const formdata = new FormData();
    for (let key in values) {
      formdata.append(key, values[key]);
    }
    // console.log(formdata);
    try {
      const response = await axios.post(
        `http://174.138.101.222:8080/${id}/create-advertisement`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/formdata",
            Authorization: `Bearer ${newspaperAgencyAdminToken}`,
          },
        }
      );
      console.log(response);
      setValues({
        page_name: "",
        page_location: "",
        desktop: "",
        start_date: "",
        end_date: "",
        image: "",
        script: "",
        text: "",
      });
      alert("Ad Created");
    } catch (error) {
      console.log(error);
    }
  };

  // const updateData = async (e) => {
  //   if (imageError) {
  //     alert(imageError);
  //     return;
  //   }
  //   let formdata = new FormData();
  //   for (const key in agencyDetails) {
  //     if (agencyDetails.hasOwnProperty(key)) {
  //       formdata.append(key, agencyDetails[key]);
  //     }
  //   }
  //   try {
  //     const response = await axios.put(
  //       `http://174.138.101.222:8080/${id}/update_publication`,
  //       formdata,
  //       {
  //         Headers: {
  //           "Content-Type": "multipart/form",
  //         },
  //       }
  //     );
  //     //   console.log(formdata);
  //     alert("Updated Successfully");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  const navigate = useNavigate();

  const [style, setStyle] = useState("main-menu");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === "main-menu") {
        setStyle("main-menu-1");
      } else setStyle("main-menu");
    });
  };

  return (
    <div className="maindashboard">
      <nav className={style}>
        <Navbar />
      </nav>
      <div className="dashbox position-relative ">
        <div className="dashwithfav">
          <span
            className="my-auto"
            style={{
              fontSize: "1.3rem",
              fontWeight: "400",
              fontFamily: "Rooboto",
            }}
            onClick={() => navigate(-1)}
          >
            <HiOutlineArrowSmallLeft
              className="rightShift"
              style={{ marginRight: "16px;" }}
            />
            Create Advertisement{" "}
          </span>

          <div className="onclick" onClick={changeStyle}>
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
        <h4
          style={{
            fontFamily: "Rooboto",
            marginTop: "11px",
            marginLeft: "18px",
          }}
        >
          Select Type of Ad
        </h4>
        <br />
        <FormControl
          sx={{
            width: "95%",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className=" mb-4"
        >
          <InputLabel style={{ fontFamily: "Rooboto" }}>Page Name</InputLabel>
          <Select
            label="Page Name"
            name="page_name"
            value={values.page_name}
            onChange={handleInputChange}
          >
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"Home_Page"}>
              Home Page
            </MenuItem>
            <MenuItem
              style={{ fontFamily: "Rooboto" }}
              value={"Categories_Page"}
            >
              Categories Page
            </MenuItem>
            <MenuItem
              style={{ fontFamily: "Rooboto" }}
              value={"Detailed_News_Page"}
            >
              Detailed News Page
            </MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl
          sx={{
            width: "95%",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className=" mb-4"
        >
          <InputLabel style={{ fontFamily: "Rooboto" }}>
            Page Location
          </InputLabel>
          <Select
            name="page_location"
            label="Page Location"
            value={values.page_location}
            onChange={handleInputChange}
          >
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"Topbar"}>
              Topbar
            </MenuItem>
            <MenuItem
              style={{ fontFamily: "Rooboto" }}
              value={"Below_Breaking_News"}
            >
              Below Breaking News
            </MenuItem>
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"Footer"}>
              Footer
            </MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl
          sx={{
            width: "95%",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className=" mb-4"
        >
          <InputLabel style={{ fontFamily: "Rooboto" }}>Platform</InputLabel>
          <Select
            label="Platform"
            name="desktop"
            value={values.desktop}
            onChange={handleInputChange}
          >
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"Desktop"}>
              Desktop
            </MenuItem>
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"Mobile"}>
              Mobile
            </MenuItem>
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"Both"}>
              Both
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            width: "95%",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className=" mb-4"
        >
          <InputLabel style={{ fontFamily: "Rooboto" }}>Templates</InputLabel>
          <Select
            label="Platform"
            name="templates"
            value={values.templates}
            onChange={handleInputChange}
          >
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"1"}>
           Template 1
            </MenuItem>
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"2"}>
            Template 2
            </MenuItem>
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"3"}>
            Template 3
            </MenuItem>
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"4"}>
            Template 4
            </MenuItem>
            <MenuItem style={{ fontFamily: "Rooboto" }} value={"5"}>
            Template 5
            </MenuItem>
          </Select>
        </FormControl>
        <br />
        <h6 style={{ fontFamily: "Rooboto" }} className="ms-3 mb-2">
          Start Date:-
        </h6>{" "}
        <TextField
          sx={{
            width: "95%",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className="mb-4"
          name="start_date"
          value={values.start_date}
          onChange={handleInputChange}
          type="datetime-local"
        ></TextField>
        <br />
        <h6 style={{ fontFamily: "Rooboto" }} className="ms-3 mb-2">
          End Date:-
        </h6>
        <TextField
          sx={{
            width: "95%",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          name="end_date"
          value={values.end_date}
          onChange={handleInputChange}
          className=" mb-4"
          type="datetime-local"
        ></TextField>
        <br />
        <FormControl className="mx-3 mb-4">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            row
            onChange={(e) =>
              setValues({ ...values, type_of_ad: e.target.value })
            }
          >
            <FormControlLabel value="Image" control={<Radio />} label="Image" />
            <FormControlLabel
              value="Script"
              control={<Radio />}
              label="Script"
            />
            <FormControlLabel value="Text" control={<Radio />} label="Text" />
          </RadioGroup>
        </FormControl>
        {values.type_of_ad === "Image" && (
          <>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="file"
              className="mx-2"
              sx={{ width: "400px" }}
              hiddenLabel="Image"
              // value={values.image}
              name="image"
              onChange={handleInputChange}
            />
            <p className="error-text">{imageError}</p>
          </>
        )}
        {values.type_of_ad === "Script" && (
          <TextField
            id="outlined-basic"
            className="mx-2 mb-4"
            multiline
            label="Script"
            variant="outlined"
            sx={{ width: "400px" }}
            name="script"
            value={values.script}
            onChange={handleInputChange}
          />
        )}
        {values.type_of_ad === "Text" && (
          <TextField
            id="outlined-basic"
            className="mx-2 mb-4"
            multiline
            label="Text"
            variant="outlined"
            sx={{ width: "400px" }}
            name="text"
            value={values.text}
            onChange={handleInputChange}
          />
        )}
        <br />
        <Button
          className="mb-4"
          style={{
            backgroundColor: "red",
            position: "absolute",
            left: "50%",
            bottom: "-70px",
            transform: "translateX(-50%)",
            width: "200px",
            height: "45px",
            fontFamily: "Rooboto",
          }}
          variant="contained"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Create Ad
        </Button>
      </div>
    </div>
  );
};

export default CreateAd;
