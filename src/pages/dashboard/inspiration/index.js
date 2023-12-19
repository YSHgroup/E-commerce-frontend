import Head from 'next/head';

import { LayoutDashlite } from '../../../components/Layout';
import WithAuth from '../../../components/WithAuth';
import api from '../../../lib/api';
import Dropzone from 'react-dropzone'
import { useEffect, useState } from 'react';
import classNames from 'classnames'
import {
  Button,
  Form,
  Spinner
} from 'react-bootstrap'
import {
  Drawer,
} from '@material-ui/core';
import { WithContext as ReactTags } from 'react-tag-input';
import { useDispatch, connect } from 'react-redux';
import Link from 'next/link';
import { Tabs, Tab } from 'react-bootstrap'
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.enter];
const Inspiration = ({ user }) => {
  const [busy, setBusy] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const [status, setStatus] = useState("submit")
  const [drawStatus, setDrawStatus] = useState(false);
  const [totalKeyword, setTotalKeywords] = useState([]);
  const [suggestKeyword,setSuggestKeyword] = useState([]);
  const [currentSelectImage, setCurrentSelectImage] = useState("real_photo");
  const [currentSelectType, setCurrentSelectType] = useState("residential");
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [currentStyleId, setCurrentStyleId] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [styleData, setStyleData] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [inspirationId, setInspirationId] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [valueData, setValueData] = useState({
    imageName: "",
    authorName: "",
    location: ""
  });
  const [inspirationProductId, setInspirationProductId] = useState("");
  const [submitData, setSubmitData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [acceptData, setAcceptData] = useState([]);
  const [deniedData, setDeniedData] = useState([]);
  const [data, setData] = useState("");
  useEffect(() => {
    getData(user.artist_id, status)
    getSelectData()
    getKeyword()
  }, [])
  const getData = (artistId, status) => {
    api()
      .get('/api/v1/dashboard/productInspiration'
        + '?artistId=' + artistId
        + '&status=' + status
      )
      .then((response) => {
        setSubmitData(response.data.submitData);
        setPendingData(response.data.pendingData);
        setAcceptData(response.data.acceptData);
        setDeniedData(response.data.deniedData);
      })
      .catch(error => {
        console.log('Error on fetching of the product list:', error);
      });
  }
  const getKeyword = () => {
    api()
      .get('/api/v1/dashboard/getKeyword'
        + '?productId=' + "all"
      )
      .then((response) => {
        let arr = [];
        let arr1 = [];
        response.data.data.map((item, index) => {
          arr.push({ value: item.name, label: item.name });
          arr1.push({ id: item.id, name: item.name, status: false });
        })
        setTotalKeywords(arr1)
      })
      .catch(error => {
        console.log('Error on fetching of the product list:', error);
      });
  }
  const getSelectedTags = (id) => {
    api()
      .get('/api/v1/dashboard/getKeyword'
        + '?productId=' + id
      )
      .then((response) => {
        setLoadingStatus(false);
        if (response.data.data.length > 0) {
          let arr = [...totalKeyword];
          let arr1 = [];
          let arr2 = [];
          let arr3=[];
          arr.map((item,index) => {
            let filterArr = response.data.data.filter(ele => ele.keyword_name == item.name);
            if (filterArr.length > 0) {
              item.status = true;
            } else {
              arr1.push({ value: item.name, label: item.name });
              arr2.push({id:item.name,text:item.name});
              item.status = false;
            }
          })
          response.data.data.map((item,index)=>{
            arr3.push({id:item.keyword_name,text:item.keyword_name});

          })
          setSuggestKeyword(arr2);
          setTags(arr3)
          setTotalKeywords(arr);
        } else {
          let arr = [...totalKeyword];
          let arr2=[];
          arr.map((item, index) => {
            item.status = false;
            arr2.push({id:item.name,text:item.name});
          })
          setSuggestKeyword(arr2);
          setTotalKeywords(arr);
        }
      })
      .catch(error => {
        console.log('Error on fetching of the product list:', error);
      });
  }
  const toggleDrawer = () => {
    setDrawStatus(!drawStatus)
  }
  const createImage = (imageFiles) => {
    const formData = new FormData();
    if (imageFiles.length > 0) {
      imageFiles.map((item, index) => {
        formData.append("file[]", item);
      })
      formData.append('artistId', Number(user.artist_id));
      formData.append('status', "submit");
    }
    api()
      .post('/api/v1/dashboard/productInspiration', formData, {

      })
      .then((resp) => {
        if (resp.data.status) {
          getData(user.artist_id, status)
        }
      })
      .catch(() => {
      });

  }
  const handleSelectImage = (type) => () => {
    setCurrentSelectImage(type)
  }
  const handleSelectType = (type) => () => {
    setCurrentSelectType(type)
  }
  const handleChangeValue = (name) => (event) => {
    setValueData({ ...valueData, [name]: event.target.value })
  }
  const getSelectData = () => {
    api()
      .get('/api/v1/getInspirationSelectData/all')
      .then((response) => {
        console.log(response.data)
        setStyleData(response.data.style)
        setCategoryData(response.data.category)
      })
      .catch(error => {
        console.log('Error on fetching of the product list:', error);
      });
  }
  const handleSelectInspiration = (id, currentStatus) => () => {
    setLoadingStatus(!loadingStatus);
    getSelectedTags(id);
    setInspirationId(id)
    setDrawStatus(!drawStatus)
    let filterData = [];
    if (currentStatus === "submit") {
      filterData = submitData.filter(ele => ele.id === id);
    }
    if (currentStatus === "pending") {
      filterData = pendingData.filter(ele => ele.id === id);
    }
    if (currentStatus === "accepted") {
      filterData = acceptData.filter(ele => ele.id === id);
    }
    if (currentStatus === "denied") {
      filterData = deniedData.filter(ele => ele.id === id);
    }
    if (filterData.length > 0) {
      setImageName(filterData[0].user_name ? filterData[0].user_name : "");
      setCurrentImage(filterData[0].img_name ? filterData[0].img_name : "");
      setCurrentCategoryId(filterData[0].category_id ? filterData[0].category_id : "");
      setCurrentStyleId(filterData[0].style_id ? filterData[0].style_id : "");
      setValueData(
        {
          imageName: filterData[0].user_name ? filterData[0].user_name : "",
          authorName: filterData[0].author_name ? filterData[0].author_name : "",
          location: filterData[0].location_optional ? filterData[0].location_optional : ""
        }
      )
      setCurrentSelectImage(filterData[0].img_type ? filterData[0].img_type : "real_photo");
      setCurrentSelectType(filterData[0].project_type ? filterData[0].project_type : "residential");
    }
  }
  const deleteAction = (id) => () => {
    const formData = new FormData();
    formData.append('productId', id);
    api()
      .post('/api/v1/dashboard/deleteInspiration', formData, {

      })
      .then((resp) => {
        if (resp.data.status) {
          getData(user.artist_id, status)
        }
      })
      .catch(() => {
      });
  }
  const handleChangeCategory = (event) => {
    setCurrentCategoryId(event.target.value)
  }
  const handleChangeStyle = (event) => {
    setCurrentStyleId(event.target.value)
  }
  const handleSubmit = () => {
    const formData = new FormData();
    tags.map((item) => {
      formData.append('keywordTag[]', item.id);
    })
    formData.append('img_type', currentSelectImage);
    formData.append('project_type', currentSelectType);
    formData.append('user_name', valueData.imageName);
    formData.append('author_name', valueData.authorName);
    formData.append('category_id', currentCategoryId);
    formData.append('style_id', currentStyleId);
    formData.append('location_optional', valueData.location);
    formData.append('artistId', Number(user.artist_id));
    formData.append('inspirationId', inspirationId);
    formData.append('status', "pending");
    api()
      .post('/api/v1/dashboard/productInspiration/update', formData)
      .then((resp) => {
        if (resp.data.status) {
          setDrawStatus(!drawStatus)
          getData(user.artist_id, status)
        }
      })
      .catch(() => {
      });
  }
  const changeActiveTag = (name, status) => () => {
    let arr = [...totalKeyword];
    arr.map((item, index) => {
      if (item.name === name) {
        item.status = !item.status;
        setTags([...tags, {id:name,text:name}]);
      }
    })
    setTotalKeywords(arr)
  }
  ///////////////////////////////////////////
  const [tags, setTags] = useState([]);

  const handleAddition = (tag) => {
    let arr = [...totalKeyword];
    setTags([...tags, tag]);
    arr.map((item, index) => {
      if (item.name === tag.id) {
        item.status = !item.status;
      }
    })
    setTotalKeywords(arr)    
  };
  const handleTagClick = (i) => {
    let arr = [...totalKeyword];
    arr.map((item, index) => {
      if (item.name === tags[i].id) {
        item.status = !item.status;
      }
    })
    setTags(tags.filter((tag, index) => index !== i));
    setTotalKeywords(arr)
  };
  return (
    <LayoutDashlite
      busy={busy}
      setBusy={setBusy}
      user={user}
      isSidebarShown={isSidebarShown}
      setIsSidebarShown={setIsSidebarShown}>
      {/* Page Title */}
      <Head>
        <title>Favourites | My Account | 3d Infinite</title>
      </Head>
      <div className='nk-block-head nk-block-head-sm pb-4'>
        <div className='nk-block-between row'>
          <div className='nk-block-head-content col-md-7'>
            <h4 className='nk-block-title page-title'>
              Inspiration
            </h4>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center">
          <div className="col-md-7">
            <div className="dropzone-area cursor">
              <Dropzone onDrop={acceptedFiles => {
                createImage(acceptedFiles)
              }}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p className="text-center py-5">Drag & Drop your files or <span className="border-bottom">Browse</span></p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>
        </div>
      </div>
      <div className="row inspiration-dashboard mt-5 mx-0">
        <div className="col-md-12 px-0">
          <div className="bg-white">
            <div className="px-3">
              <Tabs defaultActiveKey="To submit" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="To submit" title={`To submit (${submitData.length})`}>
                  <div className="d-flex flex-wrap py-4">
                    {submitData.length > 0 ? submitData.map((item, index) => {
                      return (
                        <div key={index} className="nk-tb-item bg-white m-3 p-3 inspiration-border" >
                          <div onClick={handleSelectInspiration(item.id, "submit")}>
                            <img src={`${item.img_name}`} alt={item.img_name} width="200px" height="120px" className="cursor" />
                          </div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="inspiration-name cursor mb-0 pt-2">{item.user_name ? item.user_name : ""}</p>
                              <p className="inspiration-author cursor mb-0">{item.author_name ? item.author_name : ""}</p>
                            </div>
                            <div className="pt-3 image-dropdown">
                              <Button variant="light" className="trash-button" onClick={deleteAction(item.id)}><em className="icon ni ni-trash"></em></Button>
                            </div>
                          </div>
                        </div>
                      )
                    }) : (
                      <p className="list-empty-text">List is empty.</p>
                    )}
                  </div>
                  <Drawer anchor={'right'} open={drawStatus} onClose={toggleDrawer}>
                    <div className="draw">
                      <div className="row pt-5 mx-0">
                        <div className="col-6 px-0">
                          <div className="d-flex px-4">
                            <div>
                              <img className="image-avatar" src={`${currentImage}`} />
                            </div>
                            <div>
                              <p className="mb-0 image-name">{imageName}</p>
                            </div>
                          </div>
                          <p className="mb-0 image-name pt-3 px-3">Image Type</p>
                          <div className="d-flex justify-content-between px-3 pt-3">
                            <div className={classNames('button-layout', { "button-layout-active": currentSelectImage == "real_photo" })} onClick={handleSelectImage("real_photo")}>
                              <p className="button-text">Real Photo</p>
                            </div>
                            <div className={classNames('button-layout', { "button-layout-active": currentSelectImage == "3d_rendering" })} onClick={handleSelectImage("3d_rendering")}>
                              <p className="button-text">3D Rendering</p>
                            </div>
                          </div>
                          <p className="mb-0 image-name pt-3 px-3">Type of Project</p>
                          <div className="d-flex justify-content-between px-3 py-3">
                            <div className={classNames('button-layout', { "button-layout-active": currentSelectType == "residential" })} onClick={handleSelectType("residential")}>
                              <p className="button-text">Residential</p>
                            </div>
                            <div className={classNames('button-layout', { "button-layout-active": currentSelectType == "commercial" })} onClick={handleSelectType("commercial")}>
                              <p className="button-text">commercial</p>
                            </div>
                          </div>
                          <div className="px-3 py-2">
                            <Form.Label>Name of image</Form.Label>
                            <Form.Control type="text" placeholder="Name of image" value={valueData.imageName} onChange={handleChangeValue("imageName")} />
                          </div>
                          <div className="px-3 py-2">
                            <Form.Label>Name of Author</Form.Label>
                            <Form.Control type="text" placeholder="Name of Author" value={valueData.authorName} onChange={handleChangeValue("authorName")} />
                          </div>
                          <div className="px-3 py-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={currentCategoryId} onChange={handleChangeCategory}>
                              <option>Select category</option>
                              {categoryData.length > 0 && categoryData.map((item, index) => {
                                return (
                                  <option value={item.id} key={index}>{item.name}</option>
                                )
                              })}
                            </Form.Control>
                          </div>
                          <div className="px-3 py-2">
                            <Form.Label>Style</Form.Label>
                            <Form.Control as="select" value={currentStyleId} onChange={handleChangeStyle}>
                              <option>Select style</option>
                              {styleData.length > 0 && styleData.map((item, index) => {
                                return (
                                  <option value={item.id} key={index}>{item.name}</option>
                                )
                              })}
                            </Form.Control>
                          </div>
                          <div className="px-3 py-2">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Location (optional)" value={valueData.location} onChange={handleChangeValue("location")} />
                          </div>
                          <div>

                          </div>
                        </div>
                        <div className="col-6 px-0">
                          <p className="mb-0 search-title py-3">Search Keyword</p>
                          <div className={"ReactTags react-input-tag"}>
                            <ReactTags
                              inputFieldPosition="top"               
                              allowDragDrop={false}
                              allowDeleteFromEmptyInput={false}
                              handleDelete={handleTagClick}
                              handleAddition={handleAddition}
                              delimiters={delimiters}
                              handleTagClick={handleTagClick}
                              suggestions={suggestKeyword}
                              placeholder="Search Keyword..."
                              minQueryLength={1}
                              autofocus={false}
                              autocomplete={true}
                              readOnly={false}
                              allowUnique={true}
                              inline={true}
                              allowAdditionFromPaste={true}
                              editable={true}
                              clearAll={true}
                              tags={tags}
                            />
                          </div>
                          <p className="mb-0 search-title py-3">Suggest Keywords</p>
                          {loadingStatus ? (
                            <div className="text-center mx-auto">
                              <Spinner animation="border" style={{ color: '#854FFF' }} />
                            </div>
                          ) : (
                            <div className="d-flex flex-direction-row flex-wrap">
                              {totalKeyword.length > 0 && totalKeyword.map((item, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    {!item.status && (
                                      <div className="keyword-layout" onClick={changeActiveTag(item.name, "active")}>
                                        <span className="keyword-text">{item.name}</span>
                                        <span className="icon ni ni-plus keyword-icon"></span>
                                      </div>
                                    )}
                                  </React.Fragment>
                                )
                              })}
                            </div>
                          )}                          
                        </div>
                      </div>
                      <div className="submit-button mx-auto">
                        <Button variant="primary" block onClick={handleSubmit}>Submit</Button>
                      </div>
                      <div className="row mx-0">
                        <div className="col-12">
                        </div>
                      </div>
                    </div>
                  </Drawer>
                </Tab>
                <Tab eventKey="Accepted" title={`Accepted (${acceptData.length})`}>
                  <div className="d-flex flex-wrap py-4">
                    {acceptData.length > 0 ? acceptData.map((item, index) => {
                      return (
                        <div key={index} className="nk-tb-item bg-white m-3 p-3 inspiration-border" >
                          <div onClick={handleSelectInspiration(item.id, "accepted")}>
                            <img src={`${item.img_name}`} alt={item.img_name} width="200px" height="120px" className="cursor" />
                          </div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="inspiration-name cursor mb-0 pt-2">{item.user_name ? item.user_name : ""}</p>
                              <p className="inspiration-author cursor mb-0">{item.author_name ? item.author_name : ""}</p>
                            </div>
                            <div className="pt-3 image-dropdown">
                              <Button variant="light" className="trash-button" onClick={deleteAction(item.id)}><em className="icon ni ni-trash"></em></Button>
                            </div>
                          </div>
                        </div>
                      )
                    }) : (
                      <p className="list-empty-text">List is empty.</p>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="Pending" title={`Pending (${pendingData.length})`}>
                  <div className="d-flex flex-wrap py-4">
                    {pendingData.length > 0 ? pendingData.map((item, index) => {
                      return (
                        <div key={index} className="nk-tb-item bg-white m-3 p-3 inspiration-border" >
                          <div onClick={handleSelectInspiration(item.id, "pending")}>
                            <img src={`${item.img_name}`} alt={item.img_name} width="200px" height="120px" className="cursor" />
                          </div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="inspiration-name cursor mb-0 pt-2">{item.user_name ? item.user_name : ""}</p>
                              <p className="inspiration-author cursor mb-0">{item.author_name ? item.author_name : ""}</p>
                            </div>
                            <div className="pt-3 image-dropdown">
                              <Button variant="light" className="trash-button" onClick={deleteAction(item.id)}><em className="icon ni ni-trash"></em></Button>
                            </div>
                          </div>
                        </div>
                      )
                    }) : (
                      <p className="list-empty-text">List is empty.</p>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="Denied" title={`Denied (${deniedData.length})`}>
                  <div className="d-flex flex-wrap py-4">
                    {deniedData.length > 0 ? deniedData.map((item, index) => {
                      return (
                        <div key={index} className="nk-tb-item bg-white m-3 p-3 inspiration-border" >
                          <div onClick={handleSelectInspiration(item.id, "denied")}>
                            <img src={`${item.img_name}`} alt={item.img_name} width="200px" height="120px" className="cursor" />
                          </div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="inspiration-name cursor mb-0 pt-2">{item.user_name ? item.user_name : ""}</p>
                              <p className="inspiration-author cursor mb-0">{item.author_name ? item.author_name : ""}</p>
                            </div>
                            <div className="pt-3 image-dropdown">
                              <Button variant="light" className="trash-button" onClick={deleteAction(item.id)}><em className="icon ni ni-trash"></em></Button>
                            </div>
                          </div>
                        </div>
                      )
                    }) : (
                      <p className="list-empty-text">List is empty.</p>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashlite>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userData,
    status
  };
};

export default connect(mapStateToProps)(WithAuth(Inspiration));
