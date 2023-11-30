import React, { useEffect, useRef, useState } from "react";
import "../CSS/EpaperPreview.scss";
import {
  Viewer,
  Worker,
  SpecialZoomLevel,
  PageNumber,
  PageDivider, Icon, MinimalButton, Position, Tooltip,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { pageNavigationPlugin, RenderGoToPageProps } from '@react-pdf-viewer/page-navigation';
const EpaperPreview = () => {
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const { GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance;
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const data = location.state?.pdf;

  const [viewPdf, setViewPdf] = useState(null);
  const page = useRef(0);
  const orgHeight = location.state.sizes[0];
  // console.log(orgHeight, "height");
  const [myHeight, setMyHeight] = useState(0);
  const zoom = useRef(0);
  const [button, setButton] = useState(false);

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const today = new Date();
  const formattedDate = formatDate(today);

  const UploadPdf = async () => {
    var formData = new FormData();
    formData.append("pdf", data);
    formData.append("category", "News_today_first");
    formData.append("city", "city");
    formData.append("date", formattedDate);
    formData.append("image", image);
    formData.append("pdf_name", data.name);
    try {
      const response = await axios.post(
        `http://174.138.101.222:8080/64b666b58baee257c737615e/Epaper`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let resData = response;

      console.log(resData);
      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Error Occured");
    }
  };

  const extractFontFamilyName = (fontName) => {
    if (fontName == "Wingdings-Regular") {
      return "Bhaskar";
    }
    const pattern = /^([^\d-]+)/;
    const match = fontName.match(pattern);
    // console.log(match);

    if (match) {
      return match[1];
    } else {
      return "";
    }
  };

  {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = (e) => {
      setViewPdf(e.target.result);

    };
  }

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handlePageChange = (e: PageChangeEvent) => {
    // console.log("Page no.", e.currentPage);
    page.current = e.currentPage;
  };

  const handleZoom = (e: ZoomEvent) => {
    console.log(`Zoom to ${e.scale}`);
    zoom.current = e.scale;
  };

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    // console.log(`File Rendered Successfully`);
    var element = document.querySelector(".rpv-core__page-layer--single");
    var rect = element.getBoundingClientRect();
    // console.log(rect);
    setMyHeight(rect.height);
    zoom.current = rect.height / orgHeight;
    setOffsetX(rect.x);
    setOffsetY(0);
  };

  const startX = useRef(0);
  const startY = useRef(0);
  const endX = useRef(null);
  const endY = useRef(null);

  const scrollbar = useRef(0);

  const [finalCo, setFinalCo] = useState({
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  });

  const handleMouseDown = (event) => {
    console.log('mouse_down');
    const { clientX, clientY } = event;

    scrollbar.current =
      (document.querySelector(".rpv-core__page-layer--single").offsetWidth -
        document.querySelector(".rpv-core__canvas-layer").offsetWidth) /
      2;

    // setOffsetX(event.target.offsetParent.offsetLeft);
    // setButton(false);
    // console.log(finalCo);

    if (button !== true) {
      console.log('mouse_down button true ');
      endX.current = null;
      endY.current = null;
      startX.current = clientX;
      startY.current = clientY;
    } else if (button === true) {
      endX.current = null;
      endY.current = null;
      startX.current = clientX;
      startY.current = clientY;
    } else {  
      endX.current = null;
      endY.current = null;
      startX.current = null;
      startY.current = null;
    }
  };

  const handleMouseUp = (event) => {
    console.log('mouse_up');
    const { clientX, clientY } = event; 
    const pdfContainer = document.querySelector(".rpv-core__page-layer--single");

    if (
      clientX >= pdfContainer.offsetLeft &&
      clientX <= pdfContainer.offsetLeft + pdfContainer.offsetWidth &&
      clientY >= pdfContainer.offsetTop &&
      clientY <= pdfContainer.offsetTop + pdfContainer.offsetHeight
    ) {
      endX.current = clientX;
      endY.current = clientY;

      if (offsetY >= 0) {
        setFinalCo({
          minX: (startX.current - offsetX) / zoom.current,
          minY: (startY.current - offsetY) / zoom.current,
          maxX: (clientX - offsetX - scrollbar.current) / zoom.current,
          maxY: (clientY - offsetY) / zoom.current,
        });

        if (startX.current !== clientX && startY.current !== clientY && button !== true) {
          setButton(true);
        }
      } else {
        return;
      }
    }
  };

  const [extractedData, setExtractedData] = useState(null);
  const [body, setBody] = useState(null);
  const [image, setImage] = useState("");

  const fetchData = async (e) => {
    if (!finalCo) {
      console.error("finalCo not correct.");
    }
    console.log('called');
    setButton(false);
    e.stopPropagation();
    setExtractedData(null);
    startX.current = null;
    startY.current = null;
    endX.current = null;
    endY.current = null;
    var formData = new FormData();
    console.log(finalCo);
    formData.append("pdf", data);
    try {
      const response = await axios.post(
        `http://174.138.101.222:5000/api/extractdata_withfont2?x_min=${Math.round(
          finalCo.minX
        )}&x_max=${Math.round(finalCo.maxX)}&y_min=${Math.round(
          finalCo.minY
        )}&y_max=${Math.round(finalCo.maxY)}&page_number=${page.current}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log({ response });
      let resData = response.data.data;
      // console.log({resData});
      // console.log(resData);
      let bodyString = "";
      // console.log(resData);
      for (let i = 0; i < resData.length; i++) {
        bodyString = bodyString + resData[i].paragraph + "\n";
        // console.log(bodyString);
      }
      setBody(bodyString);
      setExtractedData(response.data);
      // console.log({extractedData});
      setImage(`http://174.138.101.222:5000${response.data.image_url}`);

      // setButton(false);
    } catch (error) {
      console.log(error);
      alert("Error Occured");
    }
  };

  // console.log(body);
  const getSelectionStyles = () => {
    if (startX.current && startY.current && endX.current && endY.current) {
      const left = Math.min(startX.current, endX.current);
      const top = Math.min(startY.current, endY.current);
      const width = Math.abs(startX.current - endX.current);
      const height = Math.abs(startY.current - endY.current);

      return {
        position: "absolute",
        left: left + "px",
        top: top + "px",
        width: width + "px",
        height: height + "px",
        border: "2px solid blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        pointerEvents: "none",
      };
    } else {
      return {};
    }
  };

  const [category, setCategory] = useState("");

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const thumbnailPluginInstance = thumbnailPlugin();

  ///////////////////////////////// To send in Draft ///////////////////////////////////////

  const draftHandeler = () => {
    let formdata = new FormData();

    formdata.append("category", category);
    formdata.append("body", body);
    formdata.append("image", image);

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

  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://174.138.101.222:8080/getmastercategories"
      );
      console.log(response.data.data, "-------------------");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  // const [currentPage, setCurrentPage] = useState(0);

  const [pdfFileUrl, setPdfFileUrl] = useState("/your-pdf-document.pdf"); // Replace with your PDF URL
  const [pdf, setPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    if (currentPage < pdf.numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="home-container">
      <div
        className="pdf-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js" >
          {viewPdf && (
            <>
              <div
                className="rpv-core__viewer"
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    left: 0,
                    position: 'absolute',
                    top: '50%',
                    transform: 'translate(24px, -50%)',
                    zIndex: 1,
                  }}
                >
                  <GoToPreviousPage>
                    {(props: RenderGoToPageProps) => (
                      <Tooltip
                        position={Position.BottomCenter}
                        target={
                          <MinimalButton onClick={props.onClick}>
                            <Icon size={16}>
                              <path d="M18.4.5,5.825,11.626a.5.5,0,0,0,0,.748L18.4,23.5" />
                            </Icon>
                          </MinimalButton>
                        }
                        content={() => 'Previous page'}
                        offset={{ left: 0, top: 8 }}
                      />
                    )}
                  </GoToPreviousPage>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translate(-24px, -50%)',
                    zIndex: 1,
                  }}
                >
                  <GoToNextPage>
                    {(props: RenderGoToPageProps) => (
                      <Tooltip
                        position={Position.BottomCenter}
                        target={
                          <MinimalButton onClick={props.onClick}>
                            <Icon size={16}>
                              <path d="M5.651,23.5,18.227,12.374a.5.5,0,0,0,0-.748L5.651.5" />
                            </Icon>
                          </MinimalButton>
                        }
                        content={() => 'Next page'}
                        offset={{ left: 0, top: 8 }}
                      />
                    )}
                  </GoToNextPage>
                </div>

                <Viewer
                  className="pdf-viewer"
                  fileUrl={viewPdf}
                  defaultScale={SpecialZoomLevel.PageFit}
                  onPageChange={handlePageChange}
                  onZoom={handleZoom}
                  onDocumentLoad={handleDocumentLoad}
                  plugins={[pageNavigationPluginInstance]}
                />
              </div>

              {button && (
                <button
                  className="fatch_data"
                  onClick={fetchData}
                  style={{ width: '100%' }}
                >
                  Fetch Data
                </button>
              )}
            </>
          )}
        </Worker>
      </div>
      <div style={getSelectionStyles()}></div>
      <div className="preview-div">
        {extractedData ? (
          <>
            <FormControl fullWidth>
              <InputLabel id="category">Categories</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={category}
                label="Categories"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories.map((item, index) => {
                  return (
                    <MenuItem value={item.categories_Name_Url} key={index}>
                      {item.categories_Name_English} /{" "}
                      {item.categories_Name_Hindi}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {extractedData.data.length > 0 ? (
              extractedData.data.map((data) => (
                <p
                  key={data.id}
                  className="para"
                  style={{ fontFamily: extractFontFamilyName(data.font) }}
                >
                  {data.paragraph}
                </p>
              ))
            ) : (
              <p style={{ textAlign: 'center', marginTop: '5%' }}>No Fatch Data</p>
            )}
            <img
              src={`http://174.138.101.222:5000${extractedData.image_url}`}
            />
            <Button
              sx={{
                marginTop: "10px",
                width: "auto",
              }}
              variant="contained"
              onClick={UploadPdf}
            >
              Upload to Epaper
            </Button>
            <Button
              sx={{
                marginTop: "10px",
                width: "auto",
                position: "absolute",
                right: '10px'
              }}
              variant="contained"
              onClick={draftHandeler}
            >
              Send to Draft
            </Button>
          </>
        ) : (
          <CircularProgress className="circularProgress" color="inherit" />
        )}
      </div>
    </div>
  );
};

export default EpaperPreview;