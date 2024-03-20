import React, { useEffect, useState } from "react";
import {
  CloseButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Table,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaSave, FaTimes } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import StatusRoomService from "../../../services/StatusRoomService";
import RoomRealService from "../../../services/RoomRealService";
import RoomService from "../../../services/RoomService";
import { toast } from "react-toastify";
const schema = yup.object({
  roomReals: yup.array().of(
    yup.object({
      roomCode: yup.string().required(`Không được để trống`),
      floor: yup
        .number()
        .nullable()
        .min(1, `Tối thiểu là 1`)
        .typeError(`Không được để trống`),
      rangeRoom: yup.string().required(`Vui lòng chọn xếp hạng`),
    })
  ),
});

export default function ModalCreateRoomReal({
  show,
  handleClose,
  idRoomDetail,
}) {
  const [loading, setLoading] = useState(false);
  const [roomRealList, setRoomRealList] = useState([]);
  const [showEditAllRow, setShowEditAllRow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("error", errors);
  const [newRoomRealList, setNewRoomRealList] = useState([])
  useEffect(() => {
    async function getRoomRealById() {
      let roomRealRes = await RoomRealService.getRoomRealById(idRoomDetail);
      let result = roomRealRes?.data;
      result?.forEach((roomReal, index) => {
        setValue(`roomReals[${index}].id`, roomReal.id);
        setValue(`roomReals[${index}].roomCode`, roomReal.roomCode);
        setValue(`roomReals[${index}].statusRoom`, roomReal.statusRoom);
        setValue(`roomReals[${index}].floor`, roomReal.floor);
        setValue(`roomReals[${index}].rangeRoom`, roomReal.erangeRoom);
      });
      setRoomRealList(result);
    }
    getRoomRealById();
  }, []);
  const [sttRoom, setSttRoom] = useState([]);
  useEffect(() => {
    setLoading(true);
    async function getStatusRoom() {
      try {
        let sttRes = await StatusRoomService.getAllStatusRoom();
        //estatusName estatusTitle
        setSttRoom(sttRes?.data);
      } catch (error) {
        console.log("error getStatusRoom", error);
      }
      setLoading(false);
    }
    getStatusRoom();
  }, []);
  const handleSaveRoomReal = async (values) => {
    values = {
      ...values,
      roomId: idRoomDetail,

      // roomReals: [
      //     {
      //         statusRoom: values?.statusRoom,
      //         erangeRoom: values?.erangeRoom,
      //         roomCode: values?.roomCode,
      //         floor: values?.floor
      //     }
      // ]
    };
    console.log("values", values);
    try {
      let updateRoomRealRes = await RoomService.patchUpdateRoomReal(
        idRoomDetail,
        values
      );
      let result = updateRoomRealRes?.data;
      console.log("result", result);
      if (result) {
        reset();
        handleCloseModel();
        toast.success("Create room real success!", { theme: "light" });
      }
    } catch (error) {
      console.log("Error handleSaveRoomReal", error);
      toast.error("Create room reals unsuccess!");
    }
  };
  console.log("roomRealList", roomRealList);
  const handleCloseModel = () => {
    reset({
      roomReals: roomRealList,
    });
    handleClose(false);
  };


  const handleEditAllClick = () => {
    setShowEditAllRow(prevState => !prevState);
  };
  const handleInputFlowRoomCode = (e) => {
    const value = e.target.value
    const updatedRoomRealList = newRoomRealList.map((roomReal, index) => ({
      ...roomReal,
      roomCode: value,

    }));
    // updatedRoomRealList.forEach((item, index) => {
    //   setValue(`roomReals[${index}].roomCode`, item.roomCode);
    // })
    setNewRoomRealList(updatedRoomRealList);
  }
  const handleSelectFlowStatusRoom = (e) => {
    const value = e.target.value
    const updatedRoomRealList = newRoomRealList.map((roomReal, index) => ({
      ...roomReal,
      statusRoom: value,
    }));
    // updatedRoomRealList.forEach((item, index) => {
    //   setValue(`roomReals[${index}].statusRoom`, item.statusRoom);
    // })
    setNewRoomRealList(updatedRoomRealList);
  }
  const handleInputFlowRoomFloor = (e) => {
    const value = e.target.value
    const updatedRoomRealList = newRoomRealList.map((roomReal, index) => ({
      ...roomReal,
      floor: value
    }));
    // updatedRoomRealList.forEach((item, index) => {
    //   setValue(`roomReals[${index}].floor`, item.floor);
    // })
    setNewRoomRealList(updatedRoomRealList);
  }
  const handleSelectFlowRangeRoom = (e) => {
    const value = e.target.value
    const updatedRoomRealList = newRoomRealList.map((roomReal, index) => ({
      ...roomReal,
      erangeRoom: value
    }));
    // updatedRoomRealList.forEach((item, index) => {
    //   setValue(`roomReals[${index}].rangeRoom`, item.erangeRoom);
    // }) 
    setNewRoomRealList(updatedRoomRealList);
  }
  const handleAcceptEditAll = () => {
    newRoomRealList?.forEach((item, index) => {
      setValue(`roomReals[${index}].roomCode`, item.roomCode);
      setValue(`roomReals[${index}].statusRoom`, item.statusRoom);
      setValue(`roomReals[${index}].floor`, item.floor);
      setValue(`roomReals[${index}].rangeRoom`, item.erangeRoom);
    });
    setRoomRealList(newRoomRealList)

  }
  console.log("newRoomRealList", newRoomRealList);


  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="custom-modal-room-real"
        size="xl"
      >
        <ModalHeader>
          <ModalTitle>Add Room Real</ModalTitle>
          <input type="button" value="Edit All" onClick={handleEditAllClick} />
        </ModalHeader>
        {loading ? (
          <span
            className="spinner-border text-primary spinner-border-xl"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <form onSubmit={handleSubmit(handleSaveRoomReal)}>
            <ModalBody>
              <Table>
                <thead>
                  {
                    showEditAllRow && (
                      <>
                        <tr >
                          <td> <input type="button" value="Accept" onClick={handleAcceptEditAll} /></td>
                          <td>
                            <input
                              onChange={handleInputFlowRoomCode}
                              type="text"
                              placeholder="Room code"
                            />
                          </td>
                          <td>
                            <select onChange={handleSelectFlowStatusRoom}>
                              <option value="">Select status</option>
                              {sttRoom?.map((stt) => (
                                <option value={stt?.estatusName}>
                                  {stt?.estatusTitle}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="">
                            <input
                              onChange={handleInputFlowRoomFloor}
                              type="text"
                              placeholder="Floor"
                            />
                          </td>
                          <td>
                            <select onChange={handleSelectFlowRangeRoom} >
                              <option value="">Select range</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                            </select>
                          </td>
                        </tr>
                      </>
                    )
                  }
                  <tr>
                    <th>ID</th>
                    <th>Room code</th>
                    <th>Status</th>
                    <th>Floor</th>
                    <th>Range</th>
                  </tr>
                </thead>

                <tbody>
                  {roomRealList?.map((roomReals, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td {...register(`roomReals[${index}].id`)}>
                          {roomReals?.id}
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`roomReals[${index}].roomCode`)}
                            className={`${errors.roomReals?.[index]?.roomCode?.message
                              ? "is-invalid"
                              : ""
                              }`}
                          />
                          <span className="invalid-feedback">
                            {errors.roomReals?.[index]?.roomCode?.message}
                          </span>
                        </td>
                        <td>
                          <select
                            defaultValue={roomReals[index]?.statusRoom}
                            {...register(`roomReals[${index}].statusRoom`)}
                          >
                            {sttRoom?.map((stt) => (
                              <option value={stt?.estatusName}>
                                {stt?.estatusTitle}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="">
                          <input
                            type="text"
                            {...register(`roomReals[${index}].floor`)}
                            className={`${errors.roomReals?.[index]?.floor?.message
                              ? "is-invalid"
                              : ""
                              }`}
                          />
                          <span className="invalid-feedback">
                            {errors.roomReals?.[index]?.floor?.message}
                          </span>
                        </td>
                        <td>
                          <select
                            className={`${errors.roomReals?.[index]?.rangeRoom?.message
                              ? "is-invalid"
                              : ""
                              }`}
                            {...register(`roomReals[${index}].rangeRoom`)}
                            defaultValue={
                              roomReals && roomReals[index]?.erangeRoom === null
                                ? ""
                                : roomReals[index]?.erangeRoom
                            }
                          >
                            <option value="">Select range of room</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>
                          <span className="invalid-feedback">
                            {errors.roomReals?.[index]?.rangeRoom?.message}
                          </span>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" className=" me-2 ">
                Update
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCloseModel}
              >
                <FaTimes />
                Close
              </Button>
            </ModalFooter>
          </form>
        )}
      </Modal>
    </div>
  );
}
