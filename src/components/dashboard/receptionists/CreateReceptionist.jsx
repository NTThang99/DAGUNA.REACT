
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setLoading(true);
  }, [])

  const [selectedfile, SetSelectedFile] = useState([]);
  const [Files, SetFiles] = useState([]);
  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  const InputChange = (e) => {
    // --For Multiple File Input
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push((e.target.files[i]));
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {
        //goi upload api
        setLoading(true)
        let formData = new FormData();
        formData.append("file", file);
        ImageService.saveImage(formData).then(response => {
          SetSelectedFile((preValue) => {
            return [
              ...preValue,
              {
                id: response.data.id,
                filename: e.target.files[i].name,
                filetype: e.target.files[i].type,
                fileimage: reader.result,
                datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                filesize: filesizes(e.target.files[i].size)

              }

            ]

          });
          setLoading(false)
        })
          .catch(error => {
            console.error(error);
          });


      }
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
      }
    }
  }
  const DeleteSelectFile = (id) => {
    if (window.confirm(`Delete ${id}`)) {
      setLoading(true);
      ImageService.deleteImage(id)
        .then(() => {
          toast.success(`File with ID ${id} deleted successfully`, { theme: "light" });
          const result = selectedfile.filter((data) => data.id !== id);

          SetSelectedFile(result);

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
    let imageIds = selectedfile.map(sImg => sImg.id);

    values = {
      ...values,
      imageIds: imageIds,
    }
    try {
      setIsCreate(true);
      let createReceptionistRes = await ReceptionistService.createReceptionist(values)
      let result = createReceptionistRes?.data;
      console.log("result",result);
      if (result) {
        SetSelectedFile([])
        reset();
        toast.success('Create receptionist success!', { theme: "light" });
      }

    } catch (error) {
      console.log("error", error);
      toast.error('Create receptionist unsuccess')
    }
    setIsCreate(false)
  }
console.log("errors",errors);

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
                  <input type="file" onChange={InputChange} multiple className="form-control form-control-sm mb-3" />
                  <div className="row mb-3">
                    {selectedfile.map((data) => {
                      const { id, filename, filetype, fileimage, datetime, filesize } = data;
                      return (
                        <div className="col-md-3 col-lg-3 col-sm-12 mb-3" key={id}>
                          {
                            filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                              <div >
                                <div className="mb-2 upload-icon-delete-container" >
                                  <div>
                                    <img
                                      src={fileimage}
                                      style={{ width: '80px', height: '80px' }}
                                    />
                                    <FontAwesomeIcon
                                      className="upload-icon-delete"
                                      icon={faTimes}
                                      onClick={() => DeleteSelectFile(id)}
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
                      )
                    })}
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
