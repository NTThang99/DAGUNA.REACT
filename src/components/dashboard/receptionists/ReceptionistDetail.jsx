import React, { useEffect, useState } from "react";
import ReceptionistService from "../../../services/ReceptionistService";
import { useParams } from "react-router-dom";

export default function ReceptionistDetail() {
  const { receptionistId } = useParams();
  const [receptionist, setReceptionist] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    async function getReceptionistDetail() {
      try {
        const receptionistDetail = await ReceptionistService.getReceptionistById(receptionistId);
        const { data } = receptionistDetail;
        setReceptionist(data);
      } catch (error) {
        console.error('Error fetching receptionist detail:', error);
      } finally {
        setLoading(false);
      }
    }
    getReceptionistDetail();
  }, [receptionistId]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div style={{ width: '50%', textAlign: 'center' }}>
          <h2>Receptionist Detail</h2>
          <div style={{ marginBottom: '20px' }}>
            <img src={receptionist.avatarImgResDTO} alt="Receptionist Avatar" style={{ width: '200px', borderRadius: '50%' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <p><strong>Name:</strong> {receptionist.receptionistName}</p>
            <p><strong>Day of Birth:</strong> {receptionist.dob}</p>
            <p><strong>Email:</strong> {receptionist.email}</p>
            <p><strong>Phone:</strong> {receptionist.phone}</p>
            <p><strong>Address:</strong> {receptionist.address}</p>
            <p><strong>Status:</strong> {receptionist?.elockStatus}</p>
            <p><strong>Info:</strong> {receptionist.receptionistInfo}</p>
          </div>
        </div>
      )}
    </div>
  );
}
