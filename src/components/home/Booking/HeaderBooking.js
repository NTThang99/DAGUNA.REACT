import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function HeaderBooking({ isExpanded, toggleFlyout, decreaseAdultQuantity, adultQuantity, childQuantity, decreaseChildQuantity, handleAdultsChange, increaseAdultQuantity, increaseChildQuantity, handleApplyChanges, value, setValue,steps  }) {
    const location = useLocation();
    const currentPath = location.pathname;

    if (currentPath === '/booking') {
        return (
            <header>
                <div className="container_wrapper">
                    <div className="container_inner">
                        <div className="container_top">
                            <div className="container_guestsWrapper">
                                <button
                                    className="container_guests"
                                    aria-expanded={isExpanded}
                                    aria-controls="guests-selection-flyout"
                                    onClick={toggleFlyout}
                                >
                                    <i className="containerIcon fa-regular fa-user"></i>
                                    <span className="container_label">
                                        <span>Guests</span>
                                    </span>
                                    <span>{adultQuantity} Adult</span>,{" "}
                                    <span>{childQuantity} Children</span>
                                </button>
                                {isExpanded && (
                                    <div className="container_form_guests">
                                        <fieldset>
                                            <legend>
                                                <div className="guestHeading">
                                                    <h2 className="app_subheading2">
                                                        <span>Select Guests</span>
                                                    </h2>
                                                </div>
                                            </legend>
                                            <button
                                                className="closeButton"
                                                aria-label="Close"
                                                onClick={toggleFlyout}
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                            <div
                                                className="selection_container"
                                                role="presentation"
                                            >
                                                <div>
                                                    <div className="quantity_container">
                                                        <span>Adults</span>
                                                        <div
                                                            className="quantity_wrapper"
                                                            style={{ left: "14px" }}
                                                        >
                                                            <button
                                                                className="button_btn button_primary button_md"
                                                                aria-label="Remove one Adult"
                                                                onClick={decreaseAdultQuantity}
                                                            >
                                                                <span>
                                                                    <i className="button_subtract fa-solid fa-minus" />
                                                                </span>
                                                            </button>
                                                            <div
                                                                className="field_container"
                                                                data-error="false"
                                                                data-warning="false"
                                                            >
                                                                <label>
                                                                    <span className="input-field_label">
                                                                        Adults
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder=""
                                                                        aria-label="Adults"
                                                                        data-error="false"
                                                                        value={adultQuantity}
                                                                        onChange={handleAdultsChange}
                                                                        readOnly
                                                                    />
                                                                </label>
                                                            </div>
                                                            <button
                                                                className="button_btn button_primary button_md"
                                                                aria-label="Add one Adult"
                                                                onClick={increaseAdultQuantity}
                                                            >
                                                                <span>
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="quantity_container">
                                                        <span>Children</span>
                                                        <div className="quantity_wrapper">
                                                            <button
                                                                className="button_btn button_primary button_md"
                                                                aria-label="Remove one Adult"
                                                                onClick={decreaseChildQuantity}
                                                            >
                                                                <span>
                                                                    <i className="button_subtract fa-solid fa-minus" />
                                                                </span>
                                                            </button>
                                                            <div
                                                                className="field_container"
                                                                data-error="false"
                                                                data-warning="false"
                                                            >
                                                                <label>
                                                                    <span className="input-field_label">
                                                                        Children
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder=""
                                                                        aria-label="Children"
                                                                        data-error="false"
                                                                        value={childQuantity}
                                                                        onChange={handleAdultsChange}
                                                                        readOnly
                                                                    />
                                                                </label>
                                                            </div>
                                                            <button
                                                                className="button_btn button_primary button_md"
                                                                aria-label="Add one Adult"
                                                                onClick={increaseChildQuantity}
                                                            >
                                                                <span>
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="button_group">
                                                <button
                                                    className="btn button_link"
                                                    datatest="Button"
                                                    onClick={toggleFlyout}
                                                >
                                                    <span>Cancel</span>
                                                </button>
                                                <button
                                                    className="btn button_btn button_primary button_sm"
                                                    datatest="Button"
                                                    onClick={handleApplyChanges}
                                                >
                                                    <span>Apply</span>
                                                </button>
                                            </div>
                                        </fieldset>
                                    </div>
                                )}
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateRangePicker']}>
                                    <DateRangePicker
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                        localeText={{ start: 'Check-in', end: 'Check-out' }} />
                                </DemoContainer>
                            </LocalizationProvider>
                            <div
                                className="date"
                                id="date2"
                                data-target-input="nearest"
                            ></div>
                        </div>
                        <div className="container_advancedSearch"></div>
                        <div className="container_mobileSearch"></div>
                    </div>
                </div>
                <div className="breadcrumbs_wrapper">
                    <div
                        className="breadcrumbs_header "
                        data-testid="breadcrumbs-header"
                    >
                        <div className="breadcrumbs_headerWithArrow">
                            <h1 className="app_pageTitle">Select a Room</h1>
                        </div>
                    </div>
                    <Box sx={{ width: '100%' }}>
                        <Stepper alternativeLabel activeStep={0}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </div>
            </header>
        )
    } else if (currentPath === '/booking/addons') {
        return (
            <header>
                <div className="breadcrumbs_wrapper">
                    <div
                        className="breadcrumbs_header "
                        data-testid="breadcrumbs-header"
                    >
                        <div className="breadcrumbs_headerWithArrow">
                            <h1 className="app_pageTitle">Enhance Your Stay</h1>
                        </div>
                    </div>
                    <Box sx={{ width: '100%' }}>
                        <Stepper alternativeLabel activeStep={1}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </div>
            </header>
        )
    } else if (currentPath === '/booking/edit') {
        return (
            <header>
                <div className="container_wrapper">
                    <div className="container_inner">
                        <div className="container_top">
                            <div className="container_guestsWrapper">
                                <button
                                    className="container_guests"
                                    aria-expanded={isExpanded}
                                    aria-controls="guests-selection-flyout"
                                    onClick={toggleFlyout}
                                >
                                    <i className="containerIcon fa-regular fa-user"></i>
                                    <span className="container_label">
                                        <span>Guests</span>
                                    </span>
                                    <span>{adultQuantity} Adult</span>,{" "}
                                    <span>{childQuantity} Children</span>
                                </button>
                                {isExpanded && (
                                    <div className="container_form_guests">
                                        <fieldset>
                                            <legend>
                                                <div className="guestHeading">
                                                    <h2 className="app_subheading2">
                                                        <span>Select Guests</span>
                                                    </h2>
                                                </div>
                                            </legend>
                                            <button
                                                className="closeButton"
                                                aria-label="Close"
                                                onClick={toggleFlyout}
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                            <div
                                                className="selection_container"
                                                role="presentation"
                                            >
                                                <div>
                                                    <div className="quantity_container">
                                                        <span>Adults</span>
                                                        <div
                                                            className="quantity_wrapper"
                                                            style={{ left: "14px" }}
                                                        >
                                                            <button
                                                                className="button_btn button_primary button_md"
                                                                aria-label="Remove one Adult"
                                                                onClick={decreaseAdultQuantity}
                                                            >
                                                                <span>
                                                                    <i className="button_subtract fa-solid fa-minus" />
                                                                </span>
                                                            </button>
                                                            <div
                                                                className="field_container"
                                                                data-error="false"
                                                                data-warning="false"
                                                            >
                                                                <label>
                                                                    <span className="input-field_label">
                                                                        Adults
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder=""
                                                                        aria-label="Adults"
                                                                        data-error="false"
                                                                        value={adultQuantity}
                                                                        onChange={handleAdultsChange}
                                                                        readOnly
                                                                    />
                                                                </label>
                                                            </div>
                                                            <button
                                                                className="button_btn button_primary button_md"
                                                                aria-label="Add one Adult"
                                                                onClick={increaseAdultQuantity}
                                                            >
                                                                <span>
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="quantity_container">
                                                        <span>Children</span>
                                                        <div className="quantity_wrapper">
                                                            <button
                                                                className="button_btn button_primary button_md"
                                                                aria-label="Remove one Adult"
                                                                onClick={decreaseChildQuantity}
                                                            >
                                                                <span>
                                                                    <i className="button_subtract fa-solid fa-minus" />
                                                                </span>
                                                            </button>
                                                            <div
                                                                className="field_container"
                                                                data-error="false"
                                                                data-warning="false"
                                                            >
                                                                <label>
                                                                    <span className="input-field_label">
                                                                        Children
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder=""
                                                                        aria-label="Children"
                                                                        data-error="false"
                                                                        value={childQuantity}
                                                                        onChange={handleAdultsChange}
                                                                        readOnly
                                                                    />
                                                                </label>
                                                            </div>
                                                            <button
                                                                className="button_btn button_primary button_md"
                                                                aria-label="Add one Adult"
                                                                onClick={increaseChildQuantity}
                                                            >
                                                                <span>
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="button_group">
                                                <button
                                                    className="btn button_link"
                                                    datatest="Button"
                                                    onClick={toggleFlyout}
                                                >
                                                    <span>Cancel</span>
                                                </button>
                                                <button
                                                    className="btn button_btn button_primary button_sm"
                                                    datatest="Button"
                                                    onClick={handleApplyChanges}
                                                >
                                                    <span>Apply</span>
                                                </button>
                                            </div>
                                        </fieldset>
                                    </div>
                                )}
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateRangePicker']}>
                                    <DateRangePicker
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                        localeText={{ start: 'Check-in', end: 'Check-out' }} />
                                </DemoContainer>
                            </LocalizationProvider>
                            <div
                                className="date"
                                id="date2"
                                data-target-input="nearest"
                            ></div>
                        </div>
                        <div className="container_advancedSearch"></div>
                        <div className="container_mobileSearch"></div>
                    </div>
                </div>
                <div className="breadcrumbs_wrapper">
                    <div
                        className="breadcrumbs_header "
                        data-testid="breadcrumbs-header"
                    >
                        <div className="breadcrumbs_headerWithArrow">
                            <h1 className="app_pageTitle">Select a Room</h1>
                        </div>
                    </div>
                    <Box sx={{ width: '100%' }}>
                        <Stepper alternativeLabel activeStep={0}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </div>
            </header>
        )
    } else if (currentPath === '/booking/checkout') {
        return (
            <header>
                <div className="breadcrumbs_wrapper">
                    <div
                        className="breadcrumbs_header "
                        data-testid="breadcrumbs-header"
                    >
                        <div className="breadcrumbs_headerWithArrow">
                            <h1 className="app_pageTitle">Guest Details</h1>
                        </div>
                    </div>
                    <Box sx={{ width: '100%' }}>
                        <Stepper alternativeLabel activeStep={2}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                </div>
            </header>
        )
    }
}