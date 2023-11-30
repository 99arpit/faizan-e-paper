// import React, { useEffect, useState } from "react";
// import "../CSS/News-Approval.scss";
// import Navbar from "./Navbar";
// import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { FiEye } from "react-icons/fi";

// const NewsApproval = () => {
//   const navigate = useNavigate();
//   const itemsPerPage = 10;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [style, setStyle] = useState("main-menu");
//   const [searchTerm, setSearchTerm] = useState(""); // State for the search term
//   const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

//   const zeroAppend = (input) => {
//     if (Number(input) < 10) {
//       return "0" + input;
//     } else return input;
//   };

//   const utcToGmt = (time) => {
//     if (time !== undefined) {
//       const utc =
//         60 * Number(time.slice(0, 2)) + Number(time.slice(3, 5)) + 330;
//       const gmtMin = utc % 60;
//       const gmtHour = Math.floor(utc / 60);

//       return `${zeroAppend(gmtHour)}:${zeroAppend(gmtMin)}`;
//     } else return time;
//   };

//   const back = () => {
//     navigate(-1);
//   };




//   const newspaperAgencyAdminId = localStorage.getItem("newspaperAgencyAdminId");
//   const newspaperAgencyAdminToken = localStorage.getItem("newspaperAgencyAdminToken");






//   const getData = async () => {
//     try {
//       const response = await axios.get(
//         `http://174.138.101.222:8080/${newspaperAgencyAdminId}/Epapers`,
//         {
//           headers: {
//                 Authorization: `Bearer ${newspaperAgencyAdminToken}`,
//               },
//         }
//       );
//       setData(response.data.epapers);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const deleteUser = (_id) => {
//     axios
//       .delete(`http://174.138.101.222:8080/${_id}/deletecategories/`)
//       .then((r) => {
//         console.log(r);
//         getData();
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const changeStyle = () => {
//     setStyle((prev) => {
//       if (prev === "main-menu") {
//         setStyle("main-menu-1");
//       } else setStyle("main-menu");
//     });
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   // Filter the data based on the search term
//   const filteredData = data.filter((item) =>
//     item.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const epapers = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <>
//       <nav className={style}>
//         <Navbar />
//       </nav>
//       <div className="parentContainer" >
      
//         <h1>
//           <span>
//             <HiOutlineArrowSmallLeft onClick={back} className="pointer" />
//           </span>
//           <span style={{ fontFamily: "Rooboto" }}>E-Paper List</span>
//         </h1>

//         {/* Add a search input field */}
//         <div className="search-container" style={{textAlign:'center'}}>
//           <input
//             type="text"
//             placeholder="Search by Category Name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th style={{ fontFamily: "Rooboto" }}>S.No.</th>
//               <th style={{ fontFamily: "Rooboto" }}>Category</th>
//               <th style={{ fontFamily: "Rooboto" }}>Author Nmae</th>

//               <th style={{ fontFamily: "Rooboto" }}>PDF</th>
//               <th style={{ fontFamily: "Rooboto" }}>City</th>
//               <th style={{ fontFamily: "Rooboto" }}>Date</th>
//               <th style={{ fontFamily: "Rooboto" }}>Image</th>
//               <th style={{ fontFamily: "Rooboto" }}>PDF NAME</th>
//               <th style={{ fontFamily: "Rooboto" }}>Created Date</th>
//               <th style={{ fontFamily: "Rooboto" }}>Update Date</th>
//               <th style={{ fontFamily: "Rooboto" }}>Update</th>
//               <th style={{ fontFamily: "Rooboto" }}>Delete</th>
//             </tr>
//           </thead>

//           <tbody>
//             {epapers.map((item, index) => (
//               <tr key={item._id}>
//                 <td style={{ fontFamily: "Rooboto" }}>{startSerialNumber + index}</td>
//                 <td style={{ fontFamily: "Rooboto" }}>{item.category}</td>
//                 <td style={{ fontFamily: "Rooboto" }}>{item.publisher_name}</td>

//                 <td style={{ fontFamily: "Rooboto" }}>{item.pdf}</td>
//                 <td style={{ fontFamily: "Rooboto" }}>{item.city}</td>

//                 <td style={{ fontFamily: "Rooboto" }}>{item.date}</td>
//                 <td style={{ fontFamily: "Rooboto" }}>{item.image}</td>
//                 <td style={{ fontFamily: "Rooboto" }}>{item.pdf_name}</td>
//                 <td style={{ fontFamily: "Rooboto" }}>
//                   <p style={{ fontFamily: "Rooboto" }}>
//                     {item.createdAt.slice(0, 10)}
//                   </p>
//                   <p style={{ fontFamily: "Rooboto" }}>
//                     {utcToGmt(item.createdAt.slice(11, 16))}
//                   </p>
//                 </td>
//                 {/* <td style={{ fontFamily: "Rooboto" }}>{item.createdAt}</td> */}
//                 {/* <td style={{ fontFamily: "Rooboto" }}>{item.updatedAt}</td> */}
//                 <td style={{ fontFamily: "Rooboto" }}>
//                   <p style={{ fontFamily: "Rooboto" }}>
//                     {item.updatedAt.slice(0, 10)}
//                   </p>
//                   <p style={{ fontFamily: "Rooboto" }}>
//                     {utcToGmt(item.updatedAt.slice(11, 16))}
//                   </p>
//                 </td>

//                 <td>
//                   <div>
//                     <span
//                       className="pointer"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         navigate("/updateCat", { state: item });
//                       }}
//                     >
//                       <FaEdit />
//                     </span>
//                   </div>
//                 </td>
//                 <td>
//                   <FaTrash onClick={() => deleteUser(item._id)} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div style={{ paddingLeft: "46%" }} className="pagination">
//           <button
//             style={{ backgroundColor: "red", color: "white" }}
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           {pageNumbers.map((number) => (
//             <button
//               style={{ color: "black", backgroundColor: "white" }}
//               key={number}
//               onClick={() => paginate(number)}
//               className={number === currentPage ? "active" : ""}
//             >
//               {number}
//             </button>
//           ))}
//           <button
//             style={{ backgroundColor: "red", color: "white" }}
//             onClick={() => setCurrentPage(currentPage + 1)}
//             disabled={
//               currentPage === Math.ceil(filteredData.length / itemsPerPage)
//             }
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NewsApproval;




















import React, { useEffect, useState } from "react";
import "../CSS/News-Approval.scss";
import Navbar from "./Navbar";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const NewsApproval = () => {
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [style, setStyle] = useState("main-menu");
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

  const zeroAppend = (input) => {
    if (Number(input) < 10) {
      return "0" + input;
    } else return input;
  };

  const utcToGmt = (time) => {
    if (time !== undefined) {
      const utc =
        60 * Number(time.slice(0, 2)) + Number(time.slice(3, 5)) + 330;
      const gmtMin = utc % 60;
      const gmtHour = Math.floor(utc / 60);

      return `${zeroAppend(gmtHour)}:${zeroAppend(gmtMin)}`;
    } else return time;
  };

  const back = () => {
    navigate(-1);
  };

  const newspaperAgencyAdminId = localStorage.getItem("newspaperAgencyAdminId");
  const newspaperAgencyAdminToken = localStorage.getItem("newspaperAgencyAdminToken");






  const getData = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${newspaperAgencyAdminId}/Epapers`,
        {
          headers: {
                Authorization: `Bearer ${newspaperAgencyAdminToken}`,
              },
        }
      );
      setData(response.data.epapers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = (_id) => {
    axios
      .delete(`http://174.138.101.222:8080/{userId}/deleteEpaper/${_id}`)
      .then((r) => {
        console.log(r);
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === "main-menu") {
        setStyle("main-menu-1");
      } else setStyle("main-menu");
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter the data based on the search term
  const filteredData = data.filter((item) =>
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const epapers = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav className={style}>
        <Navbar />
      </nav>
      <div className="parentContainer">
        <h1>
          <span>
            <HiOutlineArrowSmallLeft onClick={back} className="pointer" />
          </span>
          <span style={{ fontFamily: "Rooboto" }}>E-Paper List</span>
        </h1>
        {/* Add a search input field */}
        <div style={{paddingLeft:'40%'}} className="search-container">
          <input
            type="text"
            placeholder="Search by Category Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th style={{ fontFamily: "Rooboto" }}>S.No.</th>
              <th style={{ fontFamily: "Rooboto" }}>Category</th>
              {/* <th style={{ fontFamily: "Rooboto" }}>Vendor Name</th> */}

              <th style={{ fontFamily: "Rooboto" }}>PDF</th>
              <th style={{ fontFamily: "Rooboto" }}>City</th>
              <th style={{ fontFamily: "Rooboto" }}>Date</th>
              <th style={{ fontFamily: "Rooboto" }}>Image</th>
              <th style={{ fontFamily: "Rooboto" }}>PDF NAME</th>
              <th style={{ fontFamily: "Rooboto" }}>PUBLISHER NAME</th>

              <th style={{ fontFamily: "Rooboto" }}>Created Date</th>
              <th style={{ fontFamily: "Rooboto" }}>Update Date</th>
              <th style={{ fontFamily: "Rooboto" }}>Update</th>
              <th style={{ fontFamily: "Rooboto" }}>Delete</th>
            </tr>
          </thead>

          <tbody>
            {epapers.map((item, index) => (
              <tr key={item._id}>
                <td style={{ fontFamily: "Rooboto" }}>{startSerialNumber + index}</td>
                <td style={{ fontFamily: "Rooboto" }}>{item.category}</td>
                {/* <td style={{ fontFamily: "Rooboto" }}>{}</td> */}

                <td style={{ fontFamily: "Rooboto" }}>{item.pdf}</td>
                <td style={{ fontFamily: "Rooboto" }}>{item.city}</td>

                <td style={{ fontFamily: "Rooboto" }}>{item.date}</td>
                <td style={{ fontFamily: "Rooboto" }}>{item.image}</td>
                <td style={{ fontFamily: "Rooboto" }}>{item.pdf_name}</td>
                <td style={{ fontFamily: "Rooboto" }}>{item.publisher_name}</td>

                <td style={{ fontFamily: "Rooboto" }}>
                  <p style={{ fontFamily: "Rooboto" }}>
                    {item.createdAt.slice(0, 10)}
                  </p>
                  <p style={{ fontFamily: "Rooboto" }}>
                    {utcToGmt(item.createdAt.slice(11, 16))}
                  </p>
                </td>
                {/* <td style={{ fontFamily: "Rooboto" }}>{item.createdAt}</td> */}
                {/* <td style={{ fontFamily: "Rooboto" }}>{item.updatedAt}</td> */}
                <td style={{ fontFamily: "Rooboto" }}>
                  <p style={{ fontFamily: "Rooboto" }}>
                    {item.updatedAt.slice(0, 10)}
                  </p>
                  <p style={{ fontFamily: "Rooboto" }}>
                    {utcToGmt(item.updatedAt.slice(11, 16))}
                  </p>
                </td>

                <td>
                  <div>
                    <span
                      className="pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/UpdateEpaperList", { state: item });
                      }}
                    >
                      <FaEdit />
                    </span>
                  </div>
                </td>
                <td>
                  <FaTrash onClick={() => deleteUser(item._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ paddingLeft: "35%" }} className="pagination">
          <button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              style={{ color: "black", backgroundColor: "white" }}
              key={number}
              onClick={() => paginate(number)}
              className={number === currentPage ? "active" : ""}
            >
              {number}
            </button>
          ))}
          <button
            style={{ backgroundColor: "red", color: "white"}}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredData.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsApproval;
