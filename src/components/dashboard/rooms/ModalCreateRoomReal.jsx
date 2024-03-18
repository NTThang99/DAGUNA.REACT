import React, { useEffect, useState } from 'react'
import { CloseButton, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { FaSave, FaTimes } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import StatusRoomService from '../../../services/StatusRoomService';
import RoomRealService from '../../../services/RoomRealService';
const schema = yup.object({

})

export default function ModalCreateRoomReal({ show, handleClose, roomReals, setRoomReals, idRoom }) {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [sttRoom, setSttRoom] = useState([])
    const [roomRealList, setRoomRealList] = useState([])
    useEffect(() => {
        async function getStatusRoom() {
            let sttRes = await StatusRoomService.getAllStatusRoom("http://localhost:8080/api/estatus")
            //estatusName estatusTitle
            setSttRoom(sttRes)
        }
        getStatusRoom()
    }, [])

    // useEffect(() => {
    //     async function getRoomRealById() {
    //         let roomRealRes = await RoomRealService.getRoomRealById(idRoom)
    //         console.log("idRoom",idRoom);
    //         console.log("roomRealRes", roomRealRes);
    //         setRoomRealList(roomRealRes)
    //     }
    //     getRoomRealById()
    // }, [roomRealList])
    //http://localhost:8080/api/room-reals/4
    const handleSaveRoomReal = async (values) => {
        values = {
            ...values,

        }
    }




    const handleCloseModel = () => {
        handleClose(false);
    }

    return (
        <>
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
                        (<form >
                            <ModalBody>

                                <Table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Room code</th>
                                            <th>Flor</th>
                                            <th>Status</th>
                                            <th>Range</th>
                                        </tr>
                                    </thead>
                                    <form onChange={handleSaveRoomReal}>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td><input type="text" /></td>
                                                <td><input type="text" /></td>
                                                <td><input type="text" /></td>
                                                <td><input type="text" /></td>
                                            </tr>
                                        </tbody>
                                    </form>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button type='button' variant="secondary" onClick={handleCloseModel}>
                                    <FaTimes />
                                    Close
                                </Button>
                            </ModalFooter>
                        </form>)
                }
            </Modal>
        </>
    )
}
