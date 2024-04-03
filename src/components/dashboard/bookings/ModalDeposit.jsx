import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import BookingSevrice from "../../../services/BookingService";


export default function ModalDeposit({ show, handleClose, bookingSelected }) {
  const [depositedNumber, setDepositedNumber] = useState('');
  const [depositedCode, setDepositedCode] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [note, setNote] = useState('');

  const handleCloseModal = () => {
    handleClose(false);
  };

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d]/g, '');
    setDepositedNumber(inputValue);
  };
  const handleInputChange1 = (e) => {
    let inputValue = e.target.value;
    setDepositedCode(inputValue);
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };


  console.log("bookingSelected", bookingSelected);
  return (
    <>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
  <p><strong>Booking ID:</strong> <span>{bookingSelected?.bookingId}</span></p>
</div>



          <p>Transfer Date:</p>
          <input
            type="date"
            className="form-control"
            value={bookingSelected?.transferDate}
          />
          <p>Transfer Code:</p>
          <input
            type="text"
            className="form-control"
            value={depositedCode}
            onChange={handleInputChange1}
            inputMode="numeric"
            maxLength={7}
          />
          <p><strong>Total:</strong> {bookingSelected?.total}</p>
          <p>Deposited number:</p>
          <input
            type="text"
            className="form-control"
            value={depositedNumber}
            onChange={handleInputChange}
          />
          <div className="form-group mb-2">
            <label className="form-label">Note: </label>
            <textarea
              cols="30"
              rows="5"
              className="form-control form-control-sm"
              value={note}
              onChange={handleNoteChange}
            ></textarea>
          </div>

          <p>Choose method:</p>
          <select
            className="form-control"
            value={selectedMethod}
            onChange={handleMethodChange}
          >
            <option value="">Select method</option>
            <option value="CARD">CARD</option>
            <option value="TRANSFER">TRANSFER</option>
            <option value="MONEY">MONEY</option>
          </select>

          <p>Choose Bank:</p>
          <select
            className="form-control"
            value={selectedBank}
            onChange={handleBankChange}
          >
            <option value="">Select bank</option>
            <option value="VIETTINBANK">Viettin Bank</option>
            <option value="ACB">ACB</option>
            <option value="VIETCOMBANK">Vietcom Bank</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleClose(depositedNumber, selectedMethod, selectedBank, note)}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
