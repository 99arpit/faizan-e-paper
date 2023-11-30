// import React, { useState } from "react";
// import "../CSS/NewspaperAgencyLogin.scss";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const NewspaperAgencyLogin = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const handleEmailInput = (e) => {
//     setEmail(e.target.value);
//   };

//   const [password, setPassword] = useState("");
//   const handlePasswordInput = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://174.138.101.222:8080/newsPaperAgencyLogin",
//         {
//           email: email,
//           password: password,
//         }
//       );
//       alert(response.data.msg);
//       localStorage.setItem("newspaperAgencyAdminId", response.data.data._id);
//       localStorage.setItem("newspaperTemplate", response.data.data.templates);
//       localStorage.setItem(
//         "newspaperAgencyAdminToken",
//         response.data.data.token
//       );

//       navigate("/dashboard");
//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       console.log(error.response.data.message)
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid px-0">
//         <div className="row no-gutters" style={{height:'100vh'}}>
//         <div className="col-lg-5 col-md-6 col-sm-0 " style={{height:'100vh'}}>
//           <img style={{width:'100%', height:'100%'}} src="images\image1.avif"></img>
//         </div>

//         <div className="col-lg-5 col-md-6 col-sm-12 px-3 my-auto mx-auto">
//           <div>
      
//             <p style={{fontFamily:'Rooboto'}} className="adminlogin2 text-center">Newspaper Agency Login</p>
//             <div className="hrrow">
//               <hr className="hr1" />
//               <p className="or"> or </p>
//               <hr className="hr1" />
//             </div>
//             <form onSubmit={handleLogin}>
//               <div className="form-group">
//                 <label className="adminlabel2">Email *</label>
//                 <input
//                   onChange={handleEmailInput}
//                   value={email}
//                   type="email"
//                   name="mail"
//                   placeholder="ram123@gmail.com"
//                   className="form-control admininput"
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="adminlabel2">Password *</label>
//                 <input
//                   onChange={handlePasswordInput}
//                   value={password}
//                   type="password"
//                   name="mail"
//                   placeholder="min 8 characters"
//                   className="form-control admininput"
//                 />
//               </div>
//               <div className="form-group">
//                 <button className="form-control adminloginbtn2">Login</button>
//               </div>
//             </form>
//           </div>
//         </div>
//         </div>
        

        
//       </div>
//     </>
//   );
// };

// export default NewspaperAgencyLogin;










import React, { useState } from "react";
import "../CSS/NewspaperAgencyLogin.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NewspaperAgencyLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const [loginError, setLoginError] = useState(null); // State to track login error

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://174.138.101.222:8080/newsPaperAgencyLogin",
        {
          email: email,
          password: password,
        }
      );
      alert(response.data.msg);
      localStorage.setItem("newspaperAgencyAdminId", response.data.data._id);
      localStorage.setItem("newspaperTemplate", response.data.data.templates);
      localStorage.setItem(
        "newspaperAgencyAdminToken",
        response.data.data.token
      );

      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.response.data.message);
      setLoginError(error.response.data.message); // Set the login error message
    }
  };

  return (
    <>
      <div className="container-fluid px-0">
        <div className="row no-gutters" style={{ height: "100vh" }}>
          <div className="col-lg-5 col-md-6 col-sm-0" style={{ height: "100vh" }}>
            <img style={{ width: "100%", height: "100%" }} src="images\image1.avif" alt="Login Image" />
          </div>

          <div className="col-lg-5 col-md-6 col-sm-12 px-3 my-auto mx-auto">
            <div>
              <p style={{ fontFamily: "Rooboto" }} className="adminlogin2 text-center">
                Newspaper Agency Login
              </p>
              <div className="hrrow">
                <hr className="hr1" />
                <p className="or"> or </p>
                <hr className="hr1" />
              </div>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="adminlabel2">Email *</label>
                  <input
                    onChange={handleEmailInput}
                    value={email}
                    type="email"
                    name="mail"
                    placeholder="ram123@gmail.com"
                    className="form-control admininput"
                  />
                </div>
                <div className="form-group">
                  <label className="adminlabel2">Password *</label>
                  <input
                    onChange={handlePasswordInput}
                    value={password}
                    type="password"
                    name="mail"
                    placeholder="min 8 characters"
                    className="form-control admininput"
                  />
                </div>
                <div className="form-group">
                  <button className="form-control adminloginbtn2">Login</button>
                </div>
              </form>
              {loginError && <p className="error-message">{loginError}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewspaperAgencyLogin;
