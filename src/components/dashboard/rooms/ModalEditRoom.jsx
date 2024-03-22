import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import RoomService from '../../../services/RoomService'
import ViewTypeService from "../../../services/ViewTypeService";
import KindOfRoomService from "../../../services/KindOfRoomService";
import PerTypeService from "../../../services/PerTypeService";
import RoomTypeService from "../../../services/RoomTypeService";
import UtilityService from "../../../services/UtilityService";
import ImageService from "../../../services/ImageService";
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { json } from 'react-router-dom';

const schema = yup.object(

)

function ModalEditRoom({ show, handleClose, roomInfo, setRoomInfo }) {
    const [loading, setLoading] = useState({})
    const [viewTypeList, setViewTypeList] = useState([]);
    const [kindOfRoomList, setKindOfRoomList] = useState([]);
    const [perTypeList, setPerTypeList] = useState([]);
    const [roomTypeList, setRoomTypeList] = useState([]);
    const [utilityList, setUtilityList] = useState([]);
    const [utilitiesCheck, setUtilitiesCheck] = useState([]);
    const [selectedfile, SetSelectedFile] = useState([]);
    //modal img
    const [showModalConfirmImg, setShowModalConfirmImg] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null);
    const [isEdit, setIsEdit] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        setLoading(true);
        async function loadData() {
            try {
                let dataViewType = await ViewTypeService.getAllViewType();
                setViewTypeList(dataViewType?.data);

                let dataKindOfRoom = await KindOfRoomService.getAllKindOfRoom()
                setKindOfRoomList(dataKindOfRoom?.data)

                let dataPerType = await PerTypeService.getAllPerType()
                setPerTypeList(dataPerType?.data)

                let dataRoomType = await RoomTypeService.getAllRoomType()
                setRoomTypeList(dataRoomType?.data)

                let dataUtility = await UtilityService.getAllUtility()

                let utilitieUI = dataUtility?.data.map((dU) => {
                    return {
                        id: dU.id,
                        name: dU.name,
                        check: false
                    }
                })
                setUtilityList(utilitieUI);


            } catch (error) {
                toast.error("Error get data")
            }
            setLoading(false);
        }
        loadData();
    }, [])
    useEffect(() => {
        setLoading(true)
        try {
            async function getRoomById() {
                if (!roomInfo || !roomInfo.id) {
                    toast.error("Invalid room information");
                    return;
                }
                let roomDetail = await RoomService.getRoomById(roomInfo?.id)
                let result = roomDetail?.data
                setValue("id", result.id)
                setValue("name", result.name)
                setValue("roomType", result.roomType)
                setValue("quantity", result.quantity)
                setValue("viewType", result.viewType)
                setValue("kindOfRoomId", result.kindOfRoom.id)
                setValue("perTypId", result.perType.id)
                setValue("pricePerNight", result.pricePerNight)
                setValue("acreage", result.acreage)
                setValue("sleep", result.sleep)
                setValue("description", result.description)
                setValue("utilitie", result?.utilitie)
                setValue("imageResDTOS", result.imageResDTOS)
                setUtilitiesCheck(result?.utilitie)


                for(let i = 0; i< result.imageResDTOS.length;i++){
                    let fileExtension = result.imageResDTOS[i].fileUrl.split('.').pop();
                    var fileNameWithExtension = result.imageResDTOS[i].fileUrl.split('/').pop();
                    var idImage = fileNameWithExtension.split('.').slice(0, -1).join('.');

                    let reader = new FileReader();
                    fetch(result?.imageResDTOS[i].fileUrl)
                    .then(response => response.blob())
                    .then(blob => reader.readAsDataURL(blob))
                    .catch(error => console.log(error));
                    reader.onload = function (event) {
                        let imageContent = event.target.result;
                       
                        SetSelectedFile((preValue) => [
                            ...selectedfile,
                            {
                                    id: idImage,
                                    filename: fileNameWithExtension,
                                    filetype: fileExtension,
                                    fileimage: imageContent,
                                    datetime: null,
                                    filesize: null
                            }
                        ]);
                    };
                }

                setRoomInfo(result)
                checkUtilities();
                setLoading(false)
            }
            getRoomById()
        } catch (error) {
            console.log("error", error);
            setLoading(false)
            toast.error("Lỗi lấy dữ liệu")
        }

    }, [roomInfo?.id])
    const checkUtilities = () => {
        const str = roomInfo?.utilitie;         // [1,2] 

        let arrUtilities = JSON.parse(str);

        let utilityListCopy = [...utilityList];

        for (let i = 0; i < utilityListCopy.length; i++) {
            if (arrUtilities.includes(utilityListCopy[i].id)) {
                utilityListCopy[i].check = true;
            }
        }
        setUtilityList(utilityListCopy)
    }

    const handleCloseModal = () => {
        handleClose(false)
    }
    let handleClickRadio = (evt, id) => {

        let newArray = [...utilitiesCheck, id];
        if (utilitiesCheck.includes(id)) {
            newArray = newArray.filter(day => day !== id);
        }
        setUtilitiesCheck(newArray);
    }
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
    const DeleteSelectFile = (idToDelete) => {
        // if (window.confirm(`Delete ${id}`)) {
        setLoading(true);
        ImageService.deleteImage(idToDelete)
            .then(() => {
                toast.success(`File with ID ${idToDelete} deleted successfully`, { theme: "light" });
                const result = selectedfile.filter((data) => data.id !== idToDelete);
                SetSelectedFile(result);

            })
            .finally(() => {
                setLoading(false);
                handleModalClose()
            })
            .catch(error => {
                console.error(`Error deleting file with ID ${idToDelete}`, error);
                toast.error(`Error deleting file`, { theme: "light" })
            })
        // }
    }
    const handleDeleteConfirm = () => {
        setShowModalConfirmImg(false);
        DeleteSelectFile(idToDelete);
    };
    const handleModalClose = () => {
        SetSelectedFile([])
        setIdToDelete(null)
        setShowModalConfirmImg(false)
        // reset({ roomInfo: roomInfo })
    };
    const handleEditRoom = async (values) => {

        if (utilitiesCheck.length === 0) {
            toast.error("lỗi utility", { theme: "light" });
            return;
        }
        if (selectedfile.length === 0) {
            toast.error("lỗi image", { theme: "light" });
            return
        }
        let imageIds = selectedfile.map(sImg => sImg.id);

        values = {
            ...values,
            utilitie: JSON.stringify(utilitiesCheck),
            imageIds: imageIds,
            roomType: values.roomType,
            viewType: values.viewType,
            kindOfRoom: values.kindOfRoom,
            perType: values.perType
        }
        try {
            setIsEdit(true);
            let updateRoomRes = await RoomService.patchUpdateRoom(roomInfo?.id, values)
            let result = updateRoomRes?.data;
            if (result) {
                SetSelectedFile([])
                reset();
                toast.success('Update room success!', { theme: "light" });
                handleCloseModal()
            }

        } catch (error) {
            console.log("error", error);
            toast.error('Update room unsuccess')
        }
        setIsEdit(false)
    }
    return (
        <div>
            <Modal show={showModalConfirmImg} onHide={handleModalClose}
                style={{ zIndex: '1003' }}
            >
                <Modal.Dialog  >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm delete image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>{`Are you sure you want to delete the file ${idToDelete}?`}</label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleDeleteConfirm}>Yes</Button>
                        <Button variant="secondary" onClick={handleModalClose}>No</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
            <Modal
                style={{ zIndex: '1002' }}
                show={show}
                onHide={handleClose}
                backdrop="static"
                className="custom-modal-room-real"
                size="xl"
            >
                <ModalHeader closeButton>
                    <ModalTitle>Edit Room Detail</ModalTitle>
                </ModalHeader>

                <form style={{ padding: '20px' }} onSubmit={handleSubmit(handleEditRoom)}>

                    <div className=''>
                        <div className='row '>
                            <div className='col-md-6 col-lg-6 col-sm-12 '>
                                <div className='form-group mb-2'>
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
                                        placeholder="Number per/room"
                                        className={`form-control form-control-sm ${errors.sleep?.message ? 'is-invalid' : ''}`} />
                                    <span className="invalid-feedback">{errors.sleep?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Acreage</label>
                                    <input type="text" placeholder="Acreage"  {...register('acreage')}
                                        className={`form-control form-control-sm ${errors.acreage?.message ? 'is-invalid' : ''}`} />
                                    <span className="invalid-feedback">{errors.acreage?.message}</span>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className="form-label">Price</label>
                                    <input type="number" placeholder="Price"  {...register('pricePerNight')}
                                        className={`form-control form-control-sm ${errors.pricePerNight?.message ? 'is-invalid' : ''}`} />
                                    <span className="invalid-feedback">{errors.pricePerNight?.message}</span>
                                </div>
                            </div>
                            <div className='col-md-6 col-lg-6 col-sm-12'>
                                <div className="form-group mb-2">
                                    <label className="form-label">Description</label>
                                    <textarea cols="30" rows="4" {...register('description')}
                                        className={`form-control form-control-sm `}></textarea>
                                </div>
                                <div className='form-group mb-2'>
                                    <label
                                        className={`form-label  ${errors.utility?.message ? 'is-invalid' : ''}`}>
                                        Utilities
                                    </label>
                                    <div className='mb-3'>
                                        {
                                            utilityList?.map((u) => (
                                                <div key={u?.id} className="form-check form-check-inline mb-3 justify-content-center">
                                                    <input
                                                        type="checkbox"
                                                        value={u?.id}
                                                        checked={u?.check}
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
                                <div className='form-group mb-2'>
                                    <span className="form-label">Image Room</span>
                                    <div className='mb-3'>
                                        <div>
                                            <input type="file" onChange={InputChange} multiple className="form-control form-control-sm mb-3" />
                                            <div className='row mb-3'>
                                                {
                                                    selectedfile.map((data) => {
                                                        const { id, filename, fileimage } = data;
                                                        return (
                                                            <div className="col-md-3 col-lg-3 col-sm-12 mb-3" key={id}>
                                                                {
                                                                    filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                                        <div >
                                                                            <div className="mb-2 upload-icon-delete-container" >
                                                                                <div>
                                                                                    <img
                                                                                        src={fileimage}
                                                                                        {...register('imageResDTOS')}
                                                                                        style={{ width: '120px', height: '100px' }}
                                                                                        alt="fileimage"
                                                                                    />
                                                                                    <FontAwesomeIcon
                                                                                        className="upload-icon-delete"
                                                                                        icon={faTimes}
                                                                                        // onClick={() => ModalDeleteSelectFile(idDelete)}
                                                                                        style={{ hover: { cursor: 'point' } }}
                                                                                        onClick={() => {
                                                                                            setIdToDelete(id);
                                                                                            setShowModalConfirmImg(true)
                                                                                        }}
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
                                                    })
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
                            <div className="row">
                                <div className="col-6 d-flex justify-content-begin algin-items-left">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Create
                                    </button>
                                    <button
                                        className='btn'
                                        type="button"
                                        variant="secondary"
                                        onClick={handleCloseModal}
                                    >
                                        <FaTimes />
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div >
    )
}

export default ModalEditRoom
