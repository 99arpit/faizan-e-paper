import React, { useEffect, useState } from "react";
import "../CSS/Addnewsarticle.module.scss";
import Navbar from "./Navbar";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";
import '../CSS/Navbar.css'
import { useLocation, useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

const Addnewsarticle = () => {

  const navigate = useNavigate();


  ///////////////////////////////// To take user input ///////////////////////////////////////

  let initialValues = {
    category: "",
    title: "",
    sub_heading: "Sub Heading",
    short_details: "",
    body: "",
    image: "",
    url: "",
    tags: "",
    manual_tag: "",
    news_priority: "",
    news_sections: "newsSection",
    change_byline: false,
    author_name: "",
    source: "",
  };

  const [values, setValues] = useState(initialValues);
  const [selectedTags, setSelectedTags] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setValues({ ...values, [name]: event.target.files[0] });
      // console.log(values);
    } else {
      setValues({ ...values, [name]: value });
    }
  };
  ///////////////////////////////// To take user input ///////////////////////////////////////

  ///////////////////////////////// To send axios request ///////////////////////////////////////
console.log({values},'values---values');
  const saveHandeler = () => {
    const formdata = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (key === "tags") {
          formdata.append(key, selectedTags);
        } else {
          formdata.append(key, values[key]);
        }
      }
    }
    const newspaperAgencyAdminToken = localStorage?.getItem(
      "newspaperAgencyAdminToken"
    );
    const newspaperAgencyAdminId = localStorage?.getItem(
      "newspaperAgencyAdminId"
    );

    // console.log(formdata);
    axios({
      method: "post",
      url: `http://174.138.101.222:8080/${newspaperAgencyAdminId}/post-news`,
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + newspaperAgencyAdminToken,
      },
    })
      .then((response) => alert(response.data.message))
      .catch((error) => console.log(error));
  };
  ///////////////////////////////// To send axios request ///////////////////////////////////////

  ///////////////////////////////// To send in Draft ///////////////////////////////////////

  const draftHandeler = () => {
    let formdata = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formdata.append(key, values[key]);
      }
    }
    const newspaperAgencyAdminToken = localStorage?.getItem(
      "newspaperAgencyAdminToken"
    );
    const newspaperAgencyAdminId = localStorage?.getItem(
      "newspaperAgencyAdminId"
    );

    console.log(formdata);
    axios({
      method: "post",
      url: `http://174.138.101.222:8080/${newspaperAgencyAdminId}/draft-article`,
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + newspaperAgencyAdminToken,
      },
    })
      .then((response) => alert(response.data.message))
      .catch((error) => console.log(error));
  };
  ///////////////////////////////// To send draft request ///////////////////////////////////////

  // const [category, setCategory] = useState([]);
  // const getCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://174.138.101.222:8080/getmastercategories"
  //     );
  //     // console.log(response.data.data, "categories");
  //     setCategory(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  const [style, setStyle] = useState("main-menu");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === 'main-menu') {
        setStyle('main-menu-1')
      } else setStyle('main-menu')
    });
  };

  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("http://174.138.101.222:8080/getmastercategories").then((result) => {
      result.json().then((resp) => {
        setCategory(resp.data);
      });
    });
  }, []);
  // console.log(category);

  /////////////////////get api tag///////////////////////////////////////////////////


  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getcountrydata = async () => {
      const getcountryname = [];

      const reqData = await fetch("http://174.138.101.222:8080/getmastertag");
      const resData = await reqData.json();
      // console.log(resData.data);
      // setCountry(resData.data)

      for (let i = 0; i < resData.data.length; i++) {
        getcountryname.push(resData.data[i].tag_name);
      }

      setTags(getcountryname);

      console.log(getcountryname);
    };

    getcountrydata();
  }, []);

  // //  ///////////////////////// /////////////////////get api tag///////////////////////////////////////////////////



  return (
    <>
      <nav className={style}>
        <Navbar />
      </nav>
      <div className="parentContainer">
        <h1 className="bg-red">
          <div className="dashwithfav" onClick={() => navigate(-1)}>
            <span>
              <HiOutlineArrowSmallLeft className="pointer rightShift" />
              Post Ne--ws
            </span>





            <div className="onclick" onClick={changeStyle}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </h1>

        <FormControl className="FormControl">
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="PLATFORM"
            placeholder="Category"
            name="category"
            style={{ fontFamily: "Rooboto" }}
            value={values.category}
            onChange={handleInputChange}
          >
            {category.map((item) => {
              return (
                <MenuItem value={item.categories_Name_Url}>
                  {item.categories_Name_English}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <div className="ckeditor FormControl">
          <p className="cktitle ">Title *</p>
          <CKEditor
            editor={Editor}
            data="<p style='font-family: sans-serif; !important'></p>"
            name="title"
            value={values.title}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...values,
                title: data,
              });
            }}
          />
        </div>



        {/* <div className="ckeditor">
          <p className="cktitle">Sub Heading *</p>
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            name="sub_heading"
            value={values.sub_heading}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...values,
                sub_heading: data,
              });
            }}
          />
        </div> */}
        <div className="ckeditor FormControl">
          <p className="cktitle">Summary / Short Details *</p>
          <CKEditor
            editor={Editor}
            data="<p></p>"
            name="short_details"
            value={values.short_details}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...values,
                short_details: data,
              });
            }}
          />
        </div>
        <div className="ckeditor ckeditorBody FormControl">
          <p className="cktitle">Body *</p>
          <CKEditor
            editor={Editor}
            data={values.body}
            name="body"
            value={values.body}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...values,
                body: data,
              });
            }}
          />
        </div>

        {/* <p className="cktitle FormControl ">Image *</p> */}

        <TextField
          id="outlined-basic"
          variant="outlined"
          type="file"
          className="FormControl "
          // label="Image"
          // value={values.image}
          name="image"
          onChange={handleInputChange}
        />

        {/* <TextField
          id="outlined-basic"
          className="FormControl"
          label="Url"
          variant="outlined"
          name="url"
          value={values.url}
          onChange={handleInputChange}
        /> */}


        <FormControl className="FormControl">
          <InputLabel id="demo-simple-select-helper-label">url</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="PLATFORM"
            placeholder="url"
            name="url"
            style={{ fontFamily: "Rooboto" }}
            value={values.url}
            onChange={handleInputChange}
            required={true}
          >
            {category.map((item) => {
              return (
                <MenuItem value={item.categories_Name_Url}>
                  {item.categories_Name_Url}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>


        
        <FormControl className="FormControl" method="post">
          <InputLabel
            style={{ fontFamily: "Rooboto" }}
            id="demo-simple-select-helper-label"
          >
          </InputLabel>
          {/* <Select
            // labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Tag"
            placeholder="Tags/Keywords"
            name="tags"
            style={{ fontFamily: "Roboto" }}
            // multiple // Enable multiple selections
            value={values.data}
            // value={selectedTags} // Set the selected tags from state
            onChange={handleInputChange}
          >
            {data?.data?.map((item) => (
              <MenuItem key={item._id} value={item.tag_name}>
                {item.tag_name}
              </MenuItem>
            ))}
          
         </Select>    */}

          {/* <Multiselect
            isObject={false}
            onRemove={(event) => {
              console.log(event);
            }}
            onSelect={(event) => {
              console.log(event);
            }}
            options={tags}
            showCheckbox
            // labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Tag"
            placeholder="Tags/Keywords"
            name="tags"
            style={{ fontFamily: "Roboto" }}
            // multiple // Enable multiple selections
            value={values.tags}
            // value={selectedTags} // Se t the selected tags from state
            onChange={handleInputChange}
          ></Multiselect> */}
          <Multiselect
            isObject={false}
            onSelect={(selectedList) => setSelectedTags(selectedList)}
            onRemove={(selectedList) => setSelectedTags(selectedList)}
            options={tags}
            showCheckbox
            value={selectedTags}

          />
        </FormControl>


        <TextField
          id="outlined-basic"
          label="Menaul Tag"
          className="FormControl"
          variant="outlined"
          name="manual_tag"
          value={values.manual_tag}
          onChange={handleInputChange}
        />



        <FormControl className="FormControl">
          <InputLabel id="demo-simple-select-helper-label">
            News Priority
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="PLATFORM"
            name="news_priority"
            value={values.news_priority}
            onChange={handleInputChange}
          >
            <MenuItem value={"Breaking"}>Breaking</MenuItem>
            <MenuItem value={"Imported"}>Imported</MenuItem>
            <MenuItem value={"Normal"}>Normal</MenuItem>
            <MenuItem value={"Feature"}>Feature</MenuItem>
          </Select>
        </FormControl>

        {values.change_byline ? (
          <TextField
            id="outlined-basic"
            label="Author  Name"
            variant="outlined"
            className="FormControl"
            name="author_name"
            value={values.author_name}
            onChange={handleInputChange}
          />
        ) : (
          <FormControl className="FormControl">
            <InputLabel id="demo-simple-select-helper-label">
              Change Byline
            </InputLabel>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Change Byline"
              name="change_byline"
              value={values.change_byline}
              onChange={handleInputChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        )}

        <TextField
          id="outlined-basic"
          label="Source"
          className="FormControl"
          variant="outlined"
          name="source"
          value={values.source}
          onChange={handleInputChange}
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="News Sections"
          className=" FormControl"
        />

        <Button
          variant="contained"
          className="FormControl bg-red"
          onClick={draftHandeler}
        >
          Save to Drafts
        </Button>

        <Button
          variant="contained"
          className="FormControl bg-red"
          onClick={saveHandeler}
        >
          Post News
        </Button>
      </div>
    </>
  );
};

export default Addnewsarticle;
