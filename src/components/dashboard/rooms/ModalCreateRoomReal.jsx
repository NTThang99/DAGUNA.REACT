import React, { useEffect, useState } from 'react'
import { CloseButton, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { FaSave, FaTimes } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import StatusRoomService from '../../../services/StatusRoomService';
import RoomRealService from '../../../services/RoomRealService';
import RoomService from '../../../services/RoomService';
import { toast } from 'react-toastify';
const schema = yup.object({

})

export default function ModalCreateRoomReal({ show, handleClose, roomRealList, setRoomRealList }) {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [sttRoom, setSttRoom] = useState([])
    useEffect(() => {
        async function getStatusRoom() {
            let sttRes = await StatusRoomService.getAllStatusRoom()
            //estatusName estatusTitle
            setSttRoom(sttRes?.data)
        }
        getStatusRoom()
    }, [])

    console.log("roomRealList", roomRealList);
    const handleSaveRoomReal = async (values) => {
        values = {
            ...values,
            roomReals:values,
            // statusRoom: values?.statusRoom,
            erangeRoom: values?.erangeRoom
        }
        console.log("values", values);
        try {
            let updateRoomRealRes = await RoomService.patchUpdateRoomReal(roomRealList?.roomId, values)
            let result = updateRoomRealRes?.data
            if (result) {
                reset()
                handleCloseModel()
                toast.success('Create room real success!', { theme: "light" });
            }
        } catch (error) {
            console.log("error", error);
            toast.error('Create room real unsuccess!');

        }
    }

console.log("errors",errors);
    const handleCloseModel = () => {
        handleClose(false);
    }

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                className="custom-modal-room-real"
                size='xl'
            >
                <ModalHeader >
                    <ModalTitle>Add Room Real</ModalTitle>
                </ModalHeader>
                {
                    loading ? <span className="spinner-border text-primary spinner-border-xl" role="status" aria-hidden="true"></span> :
                        (
                            <>
                                <ModalBody>
                                    <form onChange={handleSubmit(handleSaveRoomReal)}>

                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Room code</th>
                                                    <th>Status</th>
                                                    <th>Floor</th>
                                                    <th>Range</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    roomRealList?.map((list) => (
                                                        <>
                                                            <tr>
                                                                <td  {...register('id')}>{list?.id}</td>
                                                                <td>
                                                                    <input type="text" value={list?.roomCode}
                                                                     {...register('roomCode')}
                                                                     />
                                                                </td>
                                                                <td>
                                                                    <select defaultValue={list?.statusRoom} {...register('rangeRoom')}>
                                                                        {
                                                                            sttRoom?.map((stt) =>
                                                                                <option value={stt?.estatusName}>{stt?.estatusTitle}</option>
                                                                            )
                                                                        }
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <input type="text" value={list?.floor}  {...register('floor')}/>
                                                                </td>
                                                                <td>
                                                                    <select defaultValue={list?.erangeRoom} {...register('rangeRoom')}>
                                                                        <option value="A">A</option>
                                                                        <option value="B">B</option>
                                                                        <option value="C">C</option>
                                                                        <option value="D">D</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))
                                                }
                                            </tbody>

                                        </Table>
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        type="submit"
                                        className=" me-2 "
                                    >
                                        Update
                                    </Button>
                                    <Button type='button' variant="secondary" onClick={handleCloseModel}>
                                        <FaTimes />
                                        Close
                                    </Button>
                                </ModalFooter>

                            </>)
                }
            </Modal>
        </div>
    )
}
