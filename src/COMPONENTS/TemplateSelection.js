import React, { useState,useEffect } from "react";
import "../CSS/ViewNews.scss";
import Navbar from "./Navbar";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TemplateSelection = () => {
  const navigate = useNavigate();

  const id = localStorage.getItem("newspaperAgencyAdminId");
  const Templateid = localStorage.getItem("newspaperTemplate");
  const [templates, setTemplates] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/gettemplates`
      );
      setTemplates(response.data.templates)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const [style, setStyle] = useState("main-menu");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === 'main-menu') {
        setStyle('main-menu-1')
      } else setStyle('main-menu')
    });
  };

  return (
    <>
      <nav className={style}>
        <Navbar />
      </nav>
      <div className="parentContainer">
        <h1 className="bg-red">
          <div className="dashwithfav">
            <span onClick={() => navigate(-1)} className="pointer rightShift">
              <HiOutlineArrowSmallLeft className="rightShift" />
              Template Sel-ection</span>
            <div className="onclick" onClick={changeStyle}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
        </h1>
        <h5 className="px-3">
          To use any of the available Template in your website , just simply
          update the record in your domain DNS configuration with the url
          provided in the Template below.
        </h5>
        <div className="container">
          <div className="pb-3 row">
            {templates?.slice(0,Templateid ).map((item) => {
              return (
                <div className="d-flex px-3 col" style={{ marginBottom: '25px' }}>
                  <div className="card " style={{ width: "27.5rem" }}>
                    <img
                      className="card-img-top"
                      src={`http://174.138.101.222:8080${item.image}`}
                      alt="Card image cap"
                      width={"100%"}
                      height={"200px"}
                    />
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-center font-weight-bold">
                        {item.template_name}
                      </h5>
                      <a className="card-text d-flex justify-content-center" href={`${item.template_ip}${id}`} target="_blank">{`${item.template_ip}${id}`}</a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateSelection;


// import React, { useState, useEffect } from "react";
// import "../CSS/ViewNews.scss";
// import Navbar from "./Navbar";
// import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
// import {  useNavigate } from "react-router-dom";
// import axios from "axios";

// const TemplateSelection = () => {
//   const navigate = useNavigate();
//   const [style, setStyle] = useState("navbarbox");

//   const changeStyle = () => {
//     setStyle((prev) => {
//       if (prev === 'navbarbox') {
//         setStyle('navbarbox2')
//       } else setStyle('navbarbox')
//     });
//   }
//   const id = localStorage.getItem("newspaperAgencyAdminId");
//   const Templateid = localStorage.getItem("newspaperTemplate");
//   const [templates, setTemplates] = useState([]);
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `http://174.138.101.222:8080/gettemplates`
//       );
//       setTemplates(response.data.templates)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);


//   return (
//     <>
//       <div className={style}>
//         <Navbar />
//       </div>
//       <div className="parentContainer">
//         <h1 className="bg-red">
//           <div className="dashwithfav">
//             <span onClick={() => navigate(-1)} className="pointer rightShift">
//               <HiOutlineArrowSmallLeft className="rightShift" />
//               Template Selection</span>
//             <div className="onclick" onClick={changeStyle}>
//               <i class="fa-solid fa-bars"></i>
//             </div>
//           </div>
//         </h1>
//         <h5 className="px-3">
//           To use any of the available Template in your website , just simply
//           update the record in your domain DNS configuration with the url
//           provided in the Template below.
//         </h5>
//         <div className="container">
//           <div className="pb-3 row">
//             {templates?.slice(0,Templateid ).map((item) => {
//               return (
//                 <div className="d-flex px-3 col" style={{ marginBottom: '25px' }}>
//                   <div className="card " style={{ width: "27.5rem" }}>
//                     <img
//                       className="card-img-top"
//                       src={`http://174.138.101.222:8080${item.image}`}
//                       alt="Card image cap"
//                       width={"100%"}
//                       height={"200px"}
//                     />
//                     <div className="card-body">
//                       <h5 className="card-title d-flex justify-content-center font-weight-bold">
//                         {item.template_name}
//                       </h5>
//                       <a className="card-text d-flex justify-content-center" href={`${item.template_ip}${id}`} target="_blank">{`${item.template_ip}${id}`}</a>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateSelection;
