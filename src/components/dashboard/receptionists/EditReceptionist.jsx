
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ImageService from "../../../services/ImageService";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from "react-toastify";
import ReceptionistService from "../../../services/ReceptionistService";
import { Link, useParams } from "react-router-dom";



const schema = yup.object({
  receptionistName: yup.string().required(`Vui lòng nhập tên lễ tân`),
  dob: yup.string().required(`Vui lòng nhập ngày tháng năm sinh`),
  email: yup.string().required(`Vui lòng nhập email`),
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(/^[0-9]+$/, 'Vui lòng nhập số điện thoại').typeError(`Vui lòng nhập số điện thoại`),
  address: yup.string().required(`Vui lòng nhập địa chỉ`),
  receptionistInfo: yup.string().required(`Vui lòng nhập tiểu sử của lễ tân`),

})

export default function EditReceptionist() {
  const { receptionistId } = useParams();
  const [receptionist, setReceptionist] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataImg, setDataImg] = useState("")
  const [currentImage, setCurrentImage] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const inputElement = useRef();

  useEffect(() => {
    setLoading(true);
    async function getReceptionistDetail() {
      try {
        const receptionistDetail = await ReceptionistService.getReceptionistById(receptionistId);
        const { data } = receptionistDetail;
        setValue("receptionistName", data.receptionistName);
        setValue("dob", data.dob);
        setValue("email", data.email);
        setValue("phone", data.phone);
        setValue("address", data.address);
        setValue("receptionistInfo", data.receptionistInfo);
        setValue("avatarImgResDTO", data?.avatarImgResDTO)
        setDataImg(data.avatarImgResDTO)
        setCurrentImage(data?.avatarImgResDTO);
        setReceptionist(data);
        console.log("data", data);

        let reader = new FileReader();

        let response = await fetch(data?.avatarImgResDTO);

        let fileExtension = data?.avatarImgResDTO.split('.').pop();
        var fileNameWithExtension = data?.avatarImgResDTO.split('/').pop();
        var idImage = fileNameWithExtension.split('.').slice(0, -1).join('.');
        let dataBlob = await response.blob();


        // Xử lý khi hình ảnh được đọc
        reader.onload = function (event) {
          let imageContent = event.target.result;
          SetSelectedFile((preValue) => {
            return {
              id: idImage,
              filename: data.avatarImgResDTO,
              filetype: fileExtension,
              fileimage: imageContent,
              datetime: null,
              filesize: filesizes(dataBlob.size)
            }
          });
        };

        // Đọc hình ảnh
        fetch(data?.avatarImgResDTO)
          .then(response => response.blob())
          .then(blob => reader.readAsDataURL(blob))
          .catch(error => console.log(error));

        // console.log("get image", {
        //   id: data.id,
        //   filename: data.avatarImgResDTO,
        //   filetype: fileExtension,
        //   fileimage: dataBlob,
        //   datetime: null,
        //   filesize: filesizes(dataBlob.size)
        // });


      } catch (error) {
        console.error('Error fetching receptionist detail:', error);
        toast.error('Error fetching receptionist detail');
      } finally {
        setLoading(false);
      }
    }
    getReceptionistDetail();
  }, [receptionistId]);


  const [selectedfile, SetSelectedFile] = useState(null);
  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  const InputChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setLoading(true)
      let formData = new FormData();
      formData.append("file", file);
      ImageService.deleteImage(selectedfile.id)
        .then(() => {
          toast.success(`File with ID ${selectedfile.id} deleted successfully`, { theme: "light" });
          SetSelectedFile(null);
          inputElement.current.value = null;

        }).catch(error => {
          console.error(`Error deleting file with ID ${selectedfile.id}`, error);
          toast.error(`Error deleting file`, { theme: "light" })
        })
      ImageService.saveImage(formData).then(response => {

        console.log("response img", response);
        SetSelectedFile((preValue) => {
          return {
            id: response.data.id,
            filename: file.name,
            filetype: file.type,
            fileimage: reader.result,
            datetime: file.lastModifiedDate.toLocaleString('en-IN'),
            filesize: filesizes(file.size)
          }
        });
        setLoading(false)
      })
        .catch(error => {
          console.error(error);
        });

    }

  }




  const handleDeleteImage = (id) => {
    if (window.confirm(`Delete ${id}`)) {
      setLoading(true);
      ImageService.deleteImage(id)
        .then(() => {
          toast.success(`File with ID ${id} deleted successfully`, { theme: "light" });
          SetSelectedFile(null);
          inputElement.current.value = null;

        })
        .finally(() => {
          setLoading(false);
        })
        .catch(error => {
          console.error(`Error deleting file with ID ${id}`, error);
          toast.error(`Error deleting file`, { theme: "light" })
        })
    }
  }
  const handleEditReceptionist = async (values) => {

    if (selectedfile.length === 0) {
      toast.error("lỗi image", { theme: "light" });
      return
    }
    let imageIds = [selectedfile.id];

    console.log("values:.........", values);
    let objSend = {
      ...values,
      avatarImgId: imageIds,
    }
    try {
      setIsEdit(true);

      console.log("objSend", objSend);
      let editReceptionistRes = await ReceptionistService.editReceptionist(receptionistId, objSend);
      let result = editReceptionistRes?.data;
      if (result) {
        SetSelectedFile(null)
        inputElement.current.value = null;
        toast.success('Update receptionist success!', { theme: "light" });
        reset()
        window.location.href = "http://localhost:3000/dashboard/receptionists/list";
      }
    } catch (error) {
      console.log("error", error);
      toast.error('Update receptionist unsuccess')
    }
    setIsEdit(false)
  }

  return (
    <div>
      <form className="border rounded p-3" onSubmit={handleSubmit(handleEditReceptionist)} >
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="form-group mb-2">
              <label className={`form-label `}>Name</label>
              <input {...register('receptionistName')} type="text" placeholder="Name Receptionist"
                className={`form-control form-control-sm ${errors.receptionistName?.message ? 'is-invalid' : ''}`} />
              <span className="invalid-feedback">{errors.receptionistName?.message}</span>
            </div>
            <div className="form-group mb-2">
              <label className="form-label" >Day Of Birth</label>
              <input type="date"  {...register('dob')}
                placeholder="day of birth"
                className={`form-control form-control-sm ${errors.dob?.message ? 'is-invalid' : ''}`} />
              <span className="invalid-feedback">{errors.dob?.message}</span>
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Email</label>
              <input type="text" placeholder="email"  {...register('email')}
                readOnly
                className={`form-control form-control-sm ${errors.email?.message ? 'is-invalid' : ''}`} />
              <span className="invalid-feedback">{errors.email?.message}</span>
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Phone</label>
              <input
                type="text"
                placeholder="Phone"
                {...register('phone')}
                className={`form-control form-control-sm ${errors.phone?.message ? 'is-invalid' : ''}`}
              />
              <span className="invalid-feedback">{errors.phone?.message}</span>
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Address</label>
              <input type="text" placeholder="Address"  {...register('address')}
                className={`form-control form-control-sm ${errors.address?.message ? 'is-invalid' : ''}`} />
              <span className="invalid-feedback">{errors.address?.message}</span>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="form-group mb-2">
              <label className="form-label">Info</label>
              <textarea cols="30" rows="5" {...register('receptionistInfo')}
                className={`form-control form-control-sm `}></textarea>
            </div>
            <div className="form-group mb-2">
              <span className="form-label">Image Receptionist</span>
              <div className="mb-3">
                <div>
                  <input ref={inputElement} id="fileUpload" type="file" onChange={InputChange} multiple className="form-control form-control-sm mb-3" />
                  {/*  Đây là input cho phép người dùng chọn nhiều hình ảnh từ thiết bị của họ. Khi người dùng thay đổi các tệp được chọn, hàm InputChange sẽ được gọi để xử lý việc tải lên các tệp.  */}
                  <div className="row mb-3">
                    {
                      (selectedfile != null || selectedfile != undefined) ? (
                        <div className="col-md-3 col-lg-3 col-sm-12 mb-3" key={selectedfile.id}>
                          {
                            selectedfile.filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                              <div>
                                <div className="mb-2 upload-icon-delete-container" >
                                  <div>
                                    <img
                                      src={selectedfile.fileimage}
                                      style={{ width: '80px', height: '80px' }}
                                    />
                                    <FontAwesomeIcon
                                      className="upload-icon-delete"
                                      icon={faTimes}
                                      onClick={() => handleDeleteImage(selectedfile.id)}
                                    />
                                  </div>
                                </div>
                              </div>
                              :
                              <div className="mb-2" >
                                <i className="far fa-file-alt" ></i >
                              </div>
                          }
                        </div>
                      ) : null
                    }
                    <div className="col-md-3 col-lg-3 col-sm-12 mb-3">
                      {
                        loading ? (<div>
                          <span
                            className="spinner-border text-primary spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          >
                          </span>
                        </div>) : ""
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {
            isEdit ?
              <button
                type="submit"
                className="btn btn-success btn-sm d-flex align-items-center flex-grow-1 me-2 justify-content-center hide"
              >
                Save
              </button> : (
                <button
                  type="submit"
                  className="btn btn-success btn-sm d-flex align-items-center flex-grow-1 me-2 justify-content-center"
                >
                  Save
                </button>
              )}
        </div>
      </form >
    </div >
  )
}
