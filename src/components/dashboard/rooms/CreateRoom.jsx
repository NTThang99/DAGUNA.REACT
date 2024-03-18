import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ImageService from "../../../services/ImageService";
// import { useDispatch, useSelector } from "react-redux";
import ViewTypeService from "../../../services/ViewTypeService";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import KindOfRoomService from "../../../services/KindOfRoomService";
import PerTypeService from "../../../services/PerTypeService";
import RoomTypeService from "../../../services/RoomTypeService";
import UtilityService from "../../../services/UtilityService";
// import StatusRoomService from "../../../services/StatusRoomService";
import RoomService from "../../../services/RoomService";
import { toast } from "react-toastify";


const schema = yup.object({
    name: yup.string().required(`Vui lòng nhập tên phòng`),
    viewType: yup.string().required(`Vui lòng chọn loại view`),
    quantity: yup.string().required(`Vui lòng nhập số lượng phòng`).matches(/^[0-9]/, 'Vui lòng nhập số').typeError(`Vui lòng nhập số`),
    kindOfRoomId: yup.string().required(`Vui lòng chọn kindOfRooms`),
    perTypId: yup.string().required(`Vui lòng chọn loại giường`),
    roomType: yup.string().required(`Vui lòng chọn loại phòng`),
    sleep: yup.string().required(`Vui lòng nhập số lượng người mỗi phongg`).matches(/^[0-9]/, 'Vui lòng nhập số').typeError(`Vui lòng nhập số`),
    acreage: yup.string().required(`Vui lòng nhập diện tích phòng`).matches(/^[0-9]/, 'Vui lòng nhập số').typeError(`Vui lòng nhập số`),
    pricePerNight: yup.string().required(`Vui lòng nhập giá tiền phòng`).matches(/^[0-9]/, 'Vui lòng nhập số').typeError(`Vui lòng nhập số`),
    // utility: yup.string().required(`Vui lòng chọn utility`),
    // utility: yup.object().transform()

})

export default function CreateRoom() {
    const [viewTypeList, setViewTypeList] = useState([]);
    const [kindOfRoomList, setKindOfRoomList] = useState([]);
    const [perTypeList, setPerTypeList] = useState([]);
    const [roomTypeList, setRoomTypeList] = useState([]);
    const [utilityList, setUtilityList] = useState([]);
    const [utilitiesCheck, setUtilitiesCheck] = useState([]);
    // const [statusRoomList, setStatusRoomList] = useState([]);

    const [isCreate, setIsCreate] = useState(false);
    const [loading, setLoading] = useState(false)
    // const dispatch = useDispatch();

    // let obj = useForm({
    //     resolver: yupResolver(schema)
    // });
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        setLoading(true);
        async function loadData() {
            try {
                let dataViewType = await ViewTypeService.getAllViewType(`http://localhost:8080/api/eview-types`);
                setViewTypeList(dataViewType);

                let dataKindOfRoom = await KindOfRoomService.getAllKindOfRoom("http://localhost:8080/api/kindofroom")
                setKindOfRoomList(dataKindOfRoom)

                let dataPerType = await PerTypeService.getAllPerType("http://localhost:8080/api/pertype")
                setPerTypeList(dataPerType)

                let dataRoomType = await RoomTypeService.getAllRoomType("http://localhost:8080/api/erooms")
                setRoomTypeList(dataRoomType)

                let dataUtility = await UtilityService.getAllUtility("http://localhost:8080/api/utility")
                setUtilityList(dataUtility)

                // let dataStatusRoom = await StatusRoomService.getAllStatusRoom("http://localhost:8080/api/estatus")
                // setStatusRoomList(dataStatusRoom)
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        loadData();
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
    const handleCreateRoom = async (values) => {

        if (utilitiesCheck.length === 0) {
            toast.error("lỗi utility", { theme: "light" });
            return;
        }
        if (selectedfile.length === 0) {
            toast.error("lỗi img", { theme: "light" });
            return
        }
        let imageIds = selectedfile.map(sImg => sImg.id);

        values = {
            ...values,
            pricePerNight: values.pricePerNight,
            utilitie: JSON.stringify(utilitiesCheck),
            imageIds: imageIds,
            roomType: values.roomType,
            viewType: values.viewType,
        }
        try {
            setIsCreate(true);
            let createRoomRes = await RoomService.createRoom(values)
            let result = createRoomRes?.data;
            if (result) {
                SetSelectedFile([])
                reset();
                toast.success('Create room success!', { theme: "light" });
            }

        } catch (error) {
            console.log("error", error);
            toast.error('Create room unsuccess')
        }
        setIsCreate(false)
    }
    let handleClickRadio = (evt, id) => {
        let newArray = [...utilitiesCheck, id];
        if (utilitiesCheck.includes(id)) {
            newArray = newArray.filter(day => day !== id);
        }
        setUtilitiesCheck(newArray);
    }

    return (
        <div>
            <form className="border rounded p-3" onSubmit={handleSubmit(handleCreateRoom)} >
                <div className="row">
                    <div className="col-md-6 col-lg-6 col-sm-12">
                        <div className="form-group mb-2">
                            <label className={`form-label `}>Name</label>
                            <input {...register('name')} type="text" placeholder="Name Room"
                                className={`form-control form-control-sm ${errors.name?.message ? 'is-invalid' : ''}`} />
                            <span className="invalid-feedback">{errors.name?.message}</span>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Room Type</label>
                            <select defaultValue={""} {...register('roomType')}
                                className={`form-control form-control-sm ${errors.roomType?.message ? 'is-invalid' : ''}`}>
                                <option value="">Select Room Type</option>
                                {
                                    roomTypeList?.map((roomType) => <option key={roomType?.eroomName} value={roomType?.eroomName}>{roomType?.eroomTitle}</option>
                                    )
                                }
                            </select>
                            <span className="invalid-feedback">{errors.roomType?.message}</span>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Room Quantity</label>
                            <input type="text" {...register('quantity')} placeholder="Room quantity"
                                className={`form-control form-control-sm ${errors.quantity?.message ? 'is-invalid' : ''}`} />
                            <span className="invalid-feedback">{errors.quantity?.message}</span>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">View Type</label>
                            <select defaultValue={""} {...register('viewType')}
                                className={`form-control form-control-sm ${errors.viewType?.message ? 'is-invalid' : ''}`}>
                                <option value="">Select View Type</option>
                                {
                                    viewTypeList?.map((v) => <option key={v?.eviewTypeName} value={v?.eviewTypeName}>{v?.eviewTypeTitle}</option>
                                    )
                                }
                            </select>
                            <span className="invalid-feedback">{errors.viewType?.message}</span>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Kind of Room</label>
                            <select defaultValue={""}  {...register('kindOfRoomId')}
                                className={`form-control form-control-sm ${errors.kindOfRoomId?.message ? 'is-invalid' : ''}`}>
                                <option value="">Select Kind of Room</option>
                                {
                                    kindOfRoomList?.map((kind) => <option key={kind?.id} value={kind?.id}>{kind?.name}</option>
                                    )
                                }
                            </select>
                            <span className="invalid-feedback">{errors.kindOfRoomId?.message}</span>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Per Type</label>
                            <select defaultValue={""}  {...register('perTypId')}
                                className={`form-control form-control-sm ${errors.perType?.message ? 'is-invalid' : ''}`}>
                                <option value="">Select Per Type</option>
                                {
                                    perTypeList?.map((per) => <option key={per?.id} value={per?.id}>{per?.name}</option>
                                    )
                                }
                            </select>
                            <span className="invalid-feedback">{errors.perType?.message}</span>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label" >Sleeper</label>
                            <input type="text"  {...register('sleep')}
                                placeholder="number per/room"
                                className={`form-control form-control-sm ${errors.sleep?.message ? 'is-invalid' : ''}`} />
                            <span className="invalid-feedback">{errors.sleep?.message}</span>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Acreage</label>
                            <input type="text" placeholder="acreage"  {...register('acreage')}
                                className={`form-control form-control-sm ${errors.acreage?.message ? 'is-invalid' : ''}`} />
                            <span className="invalid-feedback">{errors.acreage?.message}</span>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Price</label>
                            <input type="number" placeholder="Price"  {...register('pricePerNight')}
                                className={`form-control form-control-sm ${errors.pricePerNight?.message ? 'is-invalid' : ''}`} />
                            <span className="invalid-feedback">{errors.pricePerNight?.message}</span>
                        </div>

                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-12">
                        <div className="form-group mb-2">
                            <label className="form-label">Description</label>
                            <textarea cols="30" rows="4" {...register('description')}
                                className={`form-control form-control-sm `}></textarea>
                        </div>
                        <div className="form-group mb-2">
                            <label
                                className={`form-label  ${errors.utility?.message ? 'is-invalid' : ''}`}>
                                Utilities
                            </label>
                            <div className="mb-3">
                                {
                                    utilityList?.map((u) => (
                                        <div key={u?.id} className="form-check form-check-inline mb-3 justify-content-center">
                                            <input
                                                type="checkbox"
                                                value={u?.id}
                                                className={`form-check-input`}
                                                onChange={(evt) => handleClickRadio(evt, u?.id)}
                                            />
                                            <label className="form-check-label"> {u?.name} </label>
                                        </div>
                                    ))
                                }
                                <span className="invalid-feedback">{errors.utility?.message}</span>
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <span className="form-label">Image Room</span>
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
                                                                            style={{ width: '120px', height: '100px' }}
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
                                    {/* <span className="invalid-feedback">{errors.image?.message}</span> */}
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