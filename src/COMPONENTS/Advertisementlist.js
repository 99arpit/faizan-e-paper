// import React, { useEffect, useState } from "react";
// import "../CSS/News-Approval.scss";
// import "../CSS/ViewNews.scss";
// import Navbar from "./Navbar";
// import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaEdit } from "react-icons/fa";
// import { FiEye } from "react-icons/fi";
// import { FaTrash } from "react-icons/fa";

// const Advertisementlist = () => {
//   const navigate = useNavigate();

//   const back = () => {
//     navigate(-1);
//   };

//   ///////////////////////// Get API to get Unfiltered News ///////////////////////////
//   const newspaperAgencyAdminId = localStorage.getItem("newspaperAgencyAdminId");
//   const [data, setData] = useState();
//   const getData = async () => {
//     try {
//       const response = await axios.get(
//         `http://174.138.101.222:8080/listadvertisements`
//       );
//       console.log(response.data.data);
//       setData(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   ///////////////////////////////////////////////////////////////////////////////////

//   //////////////////////////////delete api ////////////////////////////////

//   function deleteUser(_id) {
//     axios
//       .delete(`http://174.138.101.222:8080/${_id}/delete-advertisements/`)
//       .then((r) => {
//         console.log(r);
//         getData();
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }
//   //////////////////////////////////////////delete api////////////////////
//   const [style, setStyle] = useState("main-menu");

//   const changeStyle = () => {
//     setStyle((prev) => {
//       if (prev === 'main-menu') {
//         setStyle('main-menu-1')
//       } else setStyle('main-menu')
//     });
//   };

//   return (
//     <>
//       <nav className={style}>
//         <Navbar />
//       </nav>
//       <div className="parentContainer">
//        <h1 className="bg-red">
//           <div className="dashwithfav">
//             <span style={{fontFamily:'Rooboto'}}>
//               <HiOutlineArrowSmallLeft  onClick={back} className="pointer rightShift" />

//               Advertisement List</span>

//             <div className="onclick" onClick={changeStyle}>
//               <i class="fa-solid fa-bars"></i>
//             </div>
//           </div>
//         </h1>

//         <table>
//           <thead>
//             <tr>
//               <th style={{fontFamily:'Rooboto'}}>S.No.</th>
//               {/* <th style={{fontFamily:'Rooboto'}}>Vendor Name</th> */}
//               <th style={{fontFamily:'Rooboto'}}>Page Name</th>
//               <th style={{fontFamily:'Rooboto'}}>Page Location</th>
//               <th style={{fontFamily:'Rooboto'}}>Images</th>
//               <th style={{fontFamily:'Rooboto'}}>Edit</th>
//               <th style={{fontFamily:'Rooboto'}}>Delete</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data &&
//               data.map((item, index) => {
//                 return (
//                   <tr>
//                     <td style={{fontFamily:'Rooboto'}}>{index + 1}</td>
//                     {/* <td style={{fontFamily:'Rooboto'}}>{}</td> */}
//                     <td style={{fontFamily:'Rooboto'}}>{item.page_name}</td>
//                     <td style={{fontFamily:'Rooboto'}}>{item.page_location}</td>
//                     <td style={{fontFamily:'Rooboto'}}>{item.image}</td>

//                     <td style={{fontFamily:'Rooboto'}}>
//                       <div>
//                         <span
//                           className="pointer"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigate("/updateCat", { state: item });
//                           }}
//                         >
//                           <FaEdit />
//                         </span>
//                       </div>
//                     </td>
//                     <td style={{fontFamily:'Rooboto'}}>
//                     <FaTrash onClick={() => deleteUser(item._id)} />

//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>

//           <tfoot></tfoot>
//         </table>

//       </div>
//     </>
//   );
// };

// export default Advertisementlist;

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
  const itemsPerPage = 15; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const back = () => {
    navigate(-1);
  };



  // const newspaperAgencyAdminId = localStorage.getItem("newspaperAgencyAdminId");
  // const newspaperAgencyAdminToken = localStorage.getItem("newspaperAgencyAdminToken");

//   ///////////////////////// Get API to get Unfiltered News ///////////////////////////
  const newspaperAgencyAdminId = localStorage.getItem("newspaperAgencyAdminId");
  // const [data, setData] = useState();
  const getData = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/listadvertisements`
      );
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

//   ///////////////////////////////////////////////////////////////////////////////////



  // // Get API to get Unfiltered News
  // const getData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://174.138.101.222:8080/${newspaperAgencyAdminId}/listadvertisements`,
  //       {
  //         headers: {
  //               Authorization: `Bearer ${newspaperAgencyAdminToken}`,
  //             },
  //       }
  //     );





  //     // `http://174.138.101.222:8080/${superAdminId}/get-draft-articles`,
  //     // {
  //     //   headers: {
  //     //     Authorization: `Bearer ${superAdminToken}`,
  //     //   },
  //     // }





  //     setData(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getData();
  }, []);

  // Filter items based on search query
  const filteredData = data.filter((item) => {
    return item.publisher_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  // Pagination Functions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  //   //////////////////////////////delete api ////////////////////////////////

  function deleteUser(_id) {
    axios
      .delete(`http://174.138.101.222:8080/${_id}/delete-advertisements/`)
      .then((r) => {
        console.log(r);
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  //   //////////////////////////////////////////delete api////////////////////

  return (
    <>
      <nav className="main-menu">
        <Navbar />
      </nav>
      <div className="parentContainer">
        <h1>
          <span>
            <HiOutlineArrowSmallLeft onClick={back} className="pointer" />
          </span>
          <span style={{ fontFamily: "Rooboto" }}>Advertisement List</span>
        </h1>
        <div style={{ textAlign: "center" }}>
          {/* Create a search bar */}
          <input
            type="text"
            placeholder="Search by Vendor Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th style={{ fontFamily: "Rooboto" }}>S.No.</th>
              <th style={{ fontFamily: "Rooboto" }}>Vendor Name</th>
              <th style={{ fontFamily: "Rooboto" }}>Template</th>
              <th style={{ fontFamily: "Rooboto" }}>Page Location</th>
              <th style={{ fontFamily: "Rooboto" }}>Images</th>
              <th style={{ fontFamily: "Rooboto" }}>Edit</th>
              <th style={{ fontFamily: "Rooboto" }}>Delete</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td style={{ fontFamily: "Rooboto" }}>
                    {index + 1 + indexOfFirstItem}
                  </td>
                  <td style={{ fontFamily: "Rooboto" }}>
                    {item.publisher_name}
                  </td>
                  <td style={{ fontFamily: "Rooboto" }}>{item.templates}</td>
                  <td style={{ fontFamily: "Rooboto" }}>
                    {item.page_location}
                  </td>
                  <td style={{ fontFamily: "Rooboto" }}>{item.image}</td>

                  <td style={{ fontFamily: "Rooboto" }}>
                    <div>
                      <span
                        className="pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/updateaddlist", { state: item });
                        }}
                      >
                        <FaEdit />
                      </span>
                    </div>
                  </td>
                  <td style={{ fontFamily: "Rooboto" }}>
                    <FaTrash
                      onClick={() => {
                        window.alert(
                          "Are you sure you want to approve this news?"
                        );
                        deleteUser(item._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ paddingLeft: "45%" }} className="pagination">
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              paddingTop: "0.5%",
              marginLeft: "1%",
            }}
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({
            length: Math.ceil(filteredData.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              style={{ backgroundColor: "white", color: "black" }}
            >
              {index + 1}
            </button>
          ))}
          <button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={goToNextPage}
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
