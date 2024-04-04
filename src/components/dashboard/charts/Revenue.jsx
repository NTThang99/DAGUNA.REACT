import { useEffect, useState } from "react";
import { FaRegChartBar } from "react-icons/fa";
import { toast } from "react-toastify";
import { format } from "rsuite/esm/utils/dateUtils";
import RevenueService from "../../../services/RevenueService";
import { endOfDay, endOfMonth, endOfYear, startOfDay, startOfMonth, startOfYear } from "date-fns";
import { BarChart } from '@mui/x-charts/BarChart';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import dayjs from 'dayjs';
import BookingService from "../../../services/BookingService";

export default function Revenue() {
    const [showAboutDay, setShowAboutDay] = useState(false);
    const [showSelectDay, setShowSelectDay] = useState(false);
    const [showSelectMonth, setShowSelectMonth] = useState(false);
    const [showSelectYear, setShowSelectYear] = useState(false);
    const [dayNow, setDayNow] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    const [revenueDateNow, setRevenueDateNow] = useState({})
    const [revenueMonthNow, setRevenueMonthNow] = useState({})
    const [revenueYearNow, setRevenueYearNow] = useState({})
    const [revenueYeah, setRevenueYeah] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [revenueTime, setRevenueTime] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [selectedValue, setSelectedValue] = useState('');
    const [showChar, setShowChar] = useState(false);
    const [selectAboutDate, setSelectAboutDate] = useState([
        dayjs(),
        dayjs().add(1, 'day')
    ])
    const selectFirstDay = selectAboutDate[0];
    const selectLastDay = selectAboutDate[1];
    const [objSelectDay, setObjSelectDay] = useState({
        selectFirstDay: selectFirstDay.toDate(),
        selectLastDay: selectLastDay.toDate()
    })
    const [selectDay, setSelectDay] = useState(null)
    const [selectMonth, setSelectMonth] = useState(null)
    const [selectYeah, setSelectYeah] = useState(null)
    const [totalRevenueForSelect, setTotalRevenueForSelect] = useState({})



    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
            if (currentDate.getDate() !== dayNow.getDate()) {
                setDayNow(currentDate);
            }
        }, 1000 * 60 * 60); // Cập nhật 1h 1 lần
        // return () => clearInterval(intervalId);
    }, [dayNow])

    // revenue day now
    useEffect(() => {
        async function postRevenueDayNow() {
            if (dayNow == null) {
                return
            }
            const formData = {
                selectFirstDay: startOfDay(dayNow),
                selectLastDay: endOfDay(dayNow)
            }
            try {
                let revenueData = await RevenueService.postRevenue(formData)
                setRevenueDateNow(revenueData?.data)
            } catch (error) {
                console.log("error", error);
                toast.error('Lỗi dữ liệu/ hệ thống')
            }
        }
        postRevenueDayNow()
    }, [])
    // revenue month now
    useEffect(() => {
        async function postRevenueMonthNow() {
            if (dayNow == null) {
                return
            }
            const formData = {
                selectFirstDay: startOfMonth(dayNow),
                selectLastDay: endOfMonth(dayNow)
            }
            try {
                let revenueData = await RevenueService.postRevenue(formData)
                setRevenueMonthNow(revenueData?.data)
            } catch (error) {
                console.log("error", error);
                toast.error('Lỗi dữ liệu/ hệ thống')
            }

        }
        postRevenueMonthNow()
    }, [])
    // revenue yeah now
    useEffect(() => {
        async function postRevenueYearhNow() {
            if (dayNow == null) {
                return
            }
            const formData = {
                selectFirstDay: startOfYear(dayNow),
                selectLastDay: endOfYear(dayNow)
            }
            try {
                let revenueData = await RevenueService.postRevenue(formData)
                setRevenueYearNow(revenueData?.data)
            } catch (error) {
                console.log("error", error);
                toast.error('Lỗi dữ liệu/ hệ thống')
            }
        }
        postRevenueYearhNow()
    }, [])
    const handleChangeSelectAboutDate = (newDates) => {
        setSelectAboutDate(newDates)
        const [firstDay, lastDay] = newDates;

        let formartFirstDay = new Date(firstDay.toString())
        formartFirstDay.setHours(0);
        formartFirstDay.setMinutes(0);
        formartFirstDay.setSeconds(0);

        let formartLastDay = new Date(lastDay.toString())
        formartLastDay.setHours(23);
        formartLastDay.setMinutes(59);
        formartLastDay.setSeconds(59);

        setObjSelectDay(prevState => ({
            ...prevState,
            selectFirstDay: formartFirstDay,
            selectLastDay: formartLastDay
        }));
    }
    const handleClickAcceptAboutDate = async () => {
        setTotalRevenueForSelect(null)
        try {
            let revenueData = await RevenueService.postRevenue(objSelectDay)
            let result = revenueData?.data
            setTotalRevenueForSelect(result)

        } catch (error) {
            console.log("error", error);
            toast.error('Lỗi dữ liệu/ hệ thống')
        }
    }
    const handleChangeSelectDay = (valueDay) => {
        setSelectDay(valueDay)
    }
    const handleChangeSelectMonth = (valueMonth) => {
        setSelectMonth(valueMonth)
    }
    const handleChangeSelectYeah = (valueYeah) => {
        setSelectYeah(valueYeah)

    }
    const handleClickAcceptSelectDate = async () => {
        setTotalRevenueForSelect(null)
        if (selectDay == null) {
            return
        }
        let day = new Date(selectDay.toString())

        let startDay = new Date(day)
        startDay.setHours(0)
        startDay.setMinutes(0)
        startDay.setSeconds(0)

        let endDay = new Date(day)
        endDay.setHours(23)
        endDay.setMinutes(59)
        endDay.setSeconds(59)

        let objSelectDay = {
            selectFirstDay: (startDay),
            selectLastDay: (endDay)
        }
        try {
            let revenueData = await RevenueService.postRevenue(objSelectDay)
            let result = revenueData?.data
            setTotalRevenueForSelect(result)
        } catch (error) {
            console.log("error", error);
            toast.error('Lỗi dữ liệu/ hệ thống')
        }
    }
    const handleClickAcceptSelectMonth = async () => {
        setTotalRevenueForSelect(null)
        if (selectMonth == null) {
            return
        }
        let month = new Date(selectMonth)

        let startMonth = new Date(month.toString())
        startMonth.setDate(1)
        startMonth.setHours(0)
        startMonth.setMinutes(0)
        startMonth.setSeconds(0)

        let nextMonth = new Date(month.toString())
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(0)
        nextMonth.setHours(23)
        nextMonth.setMinutes(59)
        nextMonth.setSeconds(59)

        let endMonth = (nextMonth)

        let objSelectMonth = {
            selectFirstDay: (startMonth),
            selectLastDay: (endMonth)
        }
        try {
            let revenueData = await RevenueService.postRevenue(objSelectMonth)
            let result = revenueData?.data
            setTotalRevenueForSelect(result)
        } catch (error) {
            console.log("error", error);
            toast.error('Lỗi dữ liệu/ hệ thống')
        }

    }
    const handleClickAcceptSelectYeah = async () => {
        setTotalRevenueForSelect(null)
        if (selectYeah == null) {
            return
        }
        let yeah = new Date(selectYeah)
        let startYeah = new Date(yeah.toString())
        startYeah.setMonth(1)
        startYeah.setDate(1)
        startYeah.setHours(0)
        startYeah.setMinutes(0)
        startYeah.setSeconds(0)

        let endYeah = new Date(yeah.toString())
        endYeah.setMonth(11)
        endYeah.setDate(31)
        endYeah.setHours(23)
        endYeah.setMinutes(59)
        endYeah.setSeconds(59)

        let objSelectYeah = {
            selectFirstDay: (startYeah),
            selectLastDay: (endYeah)
        }
        try {
            let revenueData = await RevenueService.postRevenue(objSelectYeah)
            let result = revenueData?.data
            setTotalRevenueForSelect(result)
        } catch (error) {
            console.log("error", error);
            toast.error('Lỗi dữ liệu/ hệ thống')
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                let revenueYeahRes = await RevenueService.getShowRevenue()
                let result = revenueYeahRes?.data
                setRevenueYeah(result?.map((r) => (r?.total_Amount)));
                setRevenueTime(result?.map((r) => (r?.month_Year)));

            } catch (error) {
                console.log("error", error);
            }
        }
        fetchData()
    }, [])

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setShowAboutDay(selectedValue === 'aboutDay', setShowChar(true));
        setShowSelectDay(selectedValue === 'selectDay', setShowChar(true));
        setShowSelectMonth(selectedValue === 'selectMonth', setShowChar(true));
        setShowSelectYear(selectedValue === 'selectYeah', setShowChar(true));
        if (selectedValue == null || selectedValue== "") {
            setShowChar(false)
        }
    };

    return (
        <>

            <div className="justify-content-around">
                <div >
                    <div className="d-flex mb-2 border-bottom border-dark">
                        <div className="d-flex col-1  justify-content-center">
                            <div className="justify-content-around d-flex">
                                <label htmlFor="">Revenue</label>
                            </div>
                        </div>
                        <div className="d-flex col-4  justify-content-center">
                            <div className="justify-content-around d-flex">

                                <FaRegChartBar className="d-flex my-4 me-3" style={{ fontSize: '30px' }} />

                                <div className="d-flex">
                                    <div>
                                        <p>{revenueDateNow?.total?.toLocaleString('vi-VN')} (VNĐ)</p>
                                        <p>Today</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex col-4 justify-content-center" >
                            <div className="justify-content-around d-flex">

                                <FaRegChartBar className="d-flex my-4 me-3" style={{ fontSize: '30px' }} />

                                <div className="d-flex">
                                    <div>
                                        <p>{revenueMonthNow?.total?.toLocaleString('vi-VN')} (VNĐ)</p>
                                        <p>Current month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex col-3 justify-content-center">
                            <div className="justify-content-around d-flex">

                                <FaRegChartBar className="d-flex my-4 me-3" style={{ fontSize: '30px' }} />

                                <div className="d-flex">
                                    <div>
                                        <p>{revenueYearNow?.total?.toLocaleString('vi-VN')} (VNĐ)</p>
                                        <p>Current year</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row " >
                        <div>
                            <div className="d-flex mb-2 border-bottom border-dark">
                                <div className="col-6 d-flex align-items-start gap-4">
                                    <div className=" d-flex flex-column col-4" style={{ marginRight: '10rem' }}>
                                        <div className="d-flex ">
                                            <p>Check Revenue</p>
                                        </div>
                                        <div className="d-flex col-4">
                                            <select id="selectOption" onChange={handleChange} defaultValue={""}>
                                                <option value="">Select Time</option>
                                                <option value={'aboutDay'}>About Day</option>
                                                <option value={`selectDay`}>Day</option>
                                                <option value={`selectMonth`}>Month</option>
                                                <option value={`selectYeah`}>Yeah</option>
                                            </select>
                                        </div>
                                        <div className="d-flex col-4">
                                            {showAboutDay && (

                                                <button type="button"
                                                    style={{ marginTop: '10px' }}
                                                    onClick={handleClickAcceptAboutDate}
                                                >
                                                    Accept
                                                </button>

                                            )}
                                            {showSelectDay && (
                                                <button type="button"
                                                    style={{ marginTop: '10px' }}
                                                    onClick={handleClickAcceptSelectDate}
                                                >
                                                    Accept
                                                </button>
                                            )}
                                            {showSelectMonth && (
                                                <button type="button"
                                                    style={{ marginTop: '10px' }}
                                                    onClick={handleClickAcceptSelectMonth}
                                                >
                                                    Accept
                                                </button>
                                            )}
                                            {showSelectYear && (
                                                <button type="button"
                                                    style={{ marginTop: '10px' }}
                                                    onClick={handleClickAcceptSelectYeah}
                                                >
                                                    Accept
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                    <div className="my-2 d-flex flex-column col-4" style={{ marginRight: '10rem' }}>
                                        {/* about day */}
                                        {
                                            showAboutDay && (
                                                <div className=" aboutDay" style={{ marginRight: '-110px' }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                        <DemoContainer components={['DateRangePicker']}  >
                                                            <DateRangePicker
                                                                value={selectAboutDate}
                                                                onChange={handleChangeSelectAboutDate}
                                                                localeText={{ start: 'From', end: 'To' }}

                                                            />

                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                            )
                                        }
                                        {/* day */}
                                        {
                                            showSelectDay && (
                                                <div className=" selectDay" style={{ marginRight: '-110px' }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['DatePicker']}>
                                                            <DatePicker
                                                                value={selectDay}
                                                                // renderInput={(params) => <input {...params.inputProps} />}
                                                                onChange={handleChangeSelectDay}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                            )
                                        }
                                        {/* month */}
                                        {
                                            showSelectMonth && (
                                                <div className=" selectMonth" style={{ marginRight: '-110px' }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['DatePicker']}>
                                                            <DatePicker
                                                                label={'"month" and "year"'}
                                                                views={['month', 'year']}
                                                                value={selectMonth}
                                                                onChange={handleChangeSelectMonth}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                            )
                                        }
                                        {/* yeah */}
                                        {
                                            showSelectYear && (
                                                <div className=" selectYeah" style={{ marginRight: '-110px' }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['DatePicker']}>
                                                            <DatePicker
                                                                label={'"year"'}
                                                                views={['year']}
                                                                onChange={handleChangeSelectYeah}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div style={{ marginLeft: "70px" }}>
                                        {(showAboutDay || showSelectDay || showSelectMonth || showSelectYear) && (
                                            <div>
                                                <p>Total </p>
                                                <p>{totalRevenueForSelect?.total?.toLocaleString('vi-VN')} (VNĐ)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {showChar ?
                                <></>
                                : (
                                    <div className="justify-content-center align-align-content-center d-flex">
                                        <BarChart series={[
                                            { data: revenueYeah }
                                        ]}
                                            height={290} width={800}
                                            xAxis={[{ data: revenueTime, scaleType: 'band' }]}
                                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                                            className="m-2" />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}