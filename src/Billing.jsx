import React, { useState } from "react";
import { saveBillingInfo } from "./services/billingServices"
import { useCart } from './cartContext';

const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED"
}

// Declaring outside component to avoid recreation on each render
const emptyBilling = {
    name: "",
    card: ""
};

export default function Billing() {
    const { dispatch } = useCart();
    const [billing, setBilling] = useState(emptyBilling); //handleChange()
    const [status, setStatus] = useState(STATUS.IDLE) //handleSubmit()
    const [saveError, setSaveError] = useState(null) //handleSubmit()
    const [touched, setTouched] = useState({}) //handleBlur()

    //Derived state for empty billing fields:
    const errors = getErrors(billing) // errors = { card: 'City is required', country: 'Country is required'}
    const isValid = Object.keys(errors).length === 0; // isValid is false unless both fields are filled in.

    function handleChange(e) {
        e.persist()
        setBilling((currentBill) => {
            return {
                ...currentBill,
                [e.target.id]: e.target.value
            }
        })
    }

    function handleBlur(event) {
        event.persist()
        setTouched((curr) => {
            return { ...curr, [event.target.id]: true } //new prop for field that was just touched.
        })
    }

    async function handleSubmit(event) {
        event.preventDefault(); //prevent the form from posting back to server.
        setStatus(STATUS.SUBMITTING)
        if (isValid) {
            try {
                await saveBillingInfo(billing);
                dispatch({ type: "empty" })
                setStatus(STATUS.COMPLETED)
            } catch (e) {
                setSaveError(e)
            }
        } else {
            setStatus(STATUS.SUBMITTED)
        }
    }

    function getErrors(billing) {
        const result = {};
        if (!billing.name) result.name = "name is required";
        if (!billing.card) result.card = "City is required";
        return result;
    }

    if (saveError) throw saveError;
    if (status === STATUS.COMPLETED) {
        return <>
            <h2>Thank you for shopping</h2>
        </>
    }

    return (
        <>
            <h1>Billing Info</h1>
            {/* error summary: */}
            {!isValid && status === STATUS.SUBMITTED && (
                <div role="alert"> <p> Please fix errors :
                </p>
                    <ul> {Object.keys(errors).map((key) => {
                        return <li key={key} >{errors[key]}</li>

                    })}</ul>

                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                        id="name"
                        type="text"
                        value={billing.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <p role="alert">{(touched.name || status === STATUS.SUBMITTED) && errors.name}</p>
                </div>
                <div>
                    <label htmlFor="card">Card</label>
                    <br />
                    <input
                        id="card"
                        type="text"
                        value={billing.card}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <p role="alert">{(touched.card || status === STATUS.SUBMITTED) && errors.card}</p>
                </div>



                <div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Save Shipping Info"
                        disabled={status === STATUS.SUBMITTING}
                    />
                </div>
            </form>
        </>
    );
}
