
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ImageService from "../../../services/ImageService";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from "react-toastify";
import ReceptionistService from "../../../services/ReceptionistService";



const schema = yup.object({
  receptionistName: yup.string().required(`Vui lòng nhập tên lễ tân`),
  dob: yup.string().required(`Vui lòng nhập ngày tháng năm sinh`),
  email: yup.string().required(`Vui lòng nhập email`),
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(/^[0-9]+$/, 'Vui lòng nhập số điện thoại').typeError(`Vui lòng nhập số điện thoại`),
  address: yup.string().required(`Vui lòng nhập địa chỉ`),
  receptionistInfo: yup.string().required(`Vui lòng nhập tiểu sử của lễ tân`),

})

export default function CreateReceptionist() {

  const [isCreate, setIsCreate] = useState(false);
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const inputElement = useRef();

  useEffect(() => {
    // setLoading(true);
  }, [])
  const [selectedfile, SetSelectedFile] = useState(null);
  const [Files, SetFiles] = useState([]);
  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  console.log("error",errors);
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
      ImageService.saveImage(formData).then(response => {
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
  const handleCreateReceptionist = async (values) => {

    if (selectedfile.length === 0) {
      toast.error("lỗi image", { theme: "light" });
      return
    }
    let imageIds = [selectedfile.id];

    let objSend = {
      ...values,
      avatarImgId: imageIds,
    }
    try {
      setIsCreate(true);
      let createReceptionistRes = await ReceptionistService.createReceptionist(objSend)
      let result = createReceptionistRes?.data;
      if (result) {
        SetSelectedFile(null)
        inputElement.current.value = null;
        toast.success('Create receptionist success!', { theme: "light" });
        reset()
      }
    } catch (error) {
      console.log("error", error);
      toast.error('Create receptionist unsuccess')
    }
    setIsCreate(false)
  }

  return (
    <div>
      <form className="border rounded p-3" onSubmit={handleSubmit(handleCreateReceptionist)} >
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
                      (selectedfile != null || selectedfile != undefined)  ? (
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
                                      onClick={()=> handleDeleteImage(selectedfile.id)}
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
            isCreate ?
              <button
                type="submit"
                className="btn btn-success btn-sm d-flex align-items-center flex-grow-1 me-2 justify-content-center hide"
              >
                Create
              </button> : (
                <button
                  type="submit"
                  className="btn btn-success btn-sm d-flex align-items-center flex-grow-1 me-2 justify-content-center"
                >
                  Create
                </button>
              )}
        </div>
      </form >
    </div >
  )
}
