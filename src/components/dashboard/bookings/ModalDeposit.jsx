import { Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import BookingSevrice from "../../../services/BookingService";
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';

const schema = yup.object({
  method: yup.string().required('Vui lòng chọn phương pháp'),
  depositedAmount: yup.number().typeError('Vui lòng nhập tiền giao dịch'),
  transferId: yup.string().required(`Không được để trống`),
  bookingId: yup.number().typeError(`Không được để trống`),
  bank: yup.string().required(`Vui lòng chọn ngân hàng`),
  transferDate: yup.string().required(`Không được để trống`),
  note: yup.string().notRequired(`Không được để trống`)
})

export default function ModalDeposit({ show, handleClose, bookingSelected }) {
  const [depositedNumber, setDepositedNumber] = useState('');
  const [depositedCode, setDepositedCode] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [note, setNote] = useState('');

  const handleCloseModal = () => {
    handleClose(false);
    reset()
  };
  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickDeposit = async (values) => {
    console.log("value", values);
    values = {
      ...values
    }
    try {
      let depositRes = await BookingSevrice.postDeposit(values)
      console.log("depositRes", depositRes);
      let result = depositRes?.data;
      if (depositRes) {
        toast.success('Thêm giao dịch thành công', { theme: "light" })
        reset()
        handleCloseModal()
      }

    } catch (error) {
      console.log("error", error);
      toast.error(`Lỗi dữ liệu/service`)
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit Information</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleClickDeposit)}>
          <Modal.Body>
            <div>
              <p>
                <strong>
                  Booking ID:
                </strong>
                {/* <span  {...register('bookingId')}>{bookingSelected?.bookingId}
                </span> */}
                <input   {...register('bookingId')} defaultValue={bookingSelected?.bookingId} readOnly />
              </p>
            </div>
            <div>
              <label>Transfer Date:</label>
              <input
                type="date"
                className={`form-control ${errors.transferDate?.message ? 'is-invalid' : ''}`}
                {...register('transferDate')}
              />
              <span className="invalid-feedback">{errors.transferDate?.message}</span>
            </div>
            <div>
              <label>Transfer Code:</label>
              <input
                type="text"
                className={`form-control ${errors.transferId?.message ? 'is-invalid' : ''}`}
                {...register('transferId')}
                inputMode="numeric"
                maxLength={7}
              />
              <span className="invalid-feedback">{errors.transferId?.message}</span>
            </div>
            <div>
              <div>
                <label>
                  Total: {bookingSelected?.total}
                </label>
              </div>
              <label>Deposited number:</label>
              <input
                type="text"
                className={`form-control ${errors.depositedAmount?.message ? 'is-invalid' : ''}`}
                {...register('depositedAmount')}
              />
              <span className="invalid-feedback">{errors.depositedAmount?.message}</span>
            </div>
            <div className="form-group mb-2">
              <label className={`form-label`}>Note: </label>
              <textarea
                {...register('note')}
                cols="30"
                rows="5"
                className={`form-control form-control-sm  ${errors.note?.message ? 'is-invalid' : ''}`}
              ></textarea>
              <span className="invalid-feedback">{errors.note?.message}</span>
            </div>
            <div>
              <label>Choose method:</label>
              <select
                {...register('method')}
                className={`form-control ${errors.method?.message ? 'is-invalid' : ''}`}
              >
                <option value="">Select method</option>
                <option value="CARD">CARD</option>
                <option value="TRANSFER">TRANSFER</option>
                <option value="MONEY">MONEY</option>
              </select>
              <span className="invalid-feedback">{errors.method?.message}</span>
            </div>
            <div>
              <label>Choose Bank:</label>
              <select
                {...register('bank')}
                defaultValue={""}
                className={`form-control ${errors.bank?.message ? 'is-invalid' : ''}`}
              >
                <option value="">Select bank</option>
                <option value="VIETTINBANK">Viettin Bank</option>
                <option value="ACB">ACB</option>
                <option value="VIETCOMBANK">Vietcom Bank</option>
              </select>
              <span className="invalid-feedback">{errors.bank?.message}</span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Close
            </button>
            <button
              className="btn btn-primary"
              type='submit'
            >
              Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
