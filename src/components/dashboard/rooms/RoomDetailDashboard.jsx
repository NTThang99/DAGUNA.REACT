import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomService from "../../../services/RoomService";

export default function RoomDetailDashboard() {
    /*  "id": 2,
    "name"
    "roomType": 
    "statusRoom"
    "viewType"
    "kindOfRoom"
        "id": 1,
        "name": "Angsana SkyPool Sea View Two Bedroom Loft"
    },
    "perType"
        "id": 1,
        "name": "Giường cỡ lớn"
   
    "pricePerNight"
    "acreage"
    "sleep"
    "description"
    "utilitie": "{\"Shower\": true, \"Mini Bar\": false, \"Room Safe\": true}",
    "rate": null,
    "imageResDTOS": []
}
*/
    const { roomId } = useParams();
    const [room, setRoom] = useState({})
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function getRoomById() {
            let roomDetail = await RoomService.getRoomById(roomId)
            setRoom(roomDetail?.data)
            setLoading(false)
        }
        getRoomById()
    }, [roomId])
    console.table("room images", room)

    return (
        <>

            {

                <div className="row">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center">
                            <div className="">
                                <p>{room?.name}</p>

                            </div>
                            <div>    <p>{room?.kindOfRoom?.name}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center">
                                <p>{room?.pricePerNight}</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div>
                                    <p>{room?.acreage}</p>
                                </div>
                                <div>
                                    <p>{room?.sleep}</p>
                                </div>
                                <div>
                                    <p>{room?.roomType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        {
                            room?.images
                        }

                    </div>
                    <div className="d-flex justify-content-center">
                        <div>
                            <p>{room?.statusRoom}</p>
                        </div>
                        <div>
                            <p>{room?.viewType}</p>
                        </div>
                        <div >
                            <p>{room?.perType?.name}</p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center"> <p>{room?.description}</p></div>
                    <div className="d-flex justify-content-center"><p>{room?.utilitie}</p></div>


                </div>

            }

        </>
    )
}