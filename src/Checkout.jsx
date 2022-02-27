import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService"
import { useCart } from './cartContext';

const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED"
}

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
    city: "",
    country: "",
};

export default function Checkout() {
    const { dispatch } = useCart();
    const [address, setAddress] = useState(emptyAddress); //handleChange()
    const [status, setStatus] = useState(STATUS.IDLE) //handleSubmit()
    const [saveError, setSaveError] = useState(null) //handleSubmit()
    const [touched, setTouched] = useState({}) //handleBlur()

    //Derived state for empty address fields:
    const errors = getErrors(address) // errors = { city: 'City is required', country: 'Country is required'}
    const isValid = Object.keys(errors).length === 0; // isValid is false unless both fields are filled in.

    function handleChange(e) {
        e.persist()
        setAddress((currentAddr) => {
            return {
                ...currentAddr,
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
                await saveShippingAddress(address);
                dispatch({ type: "empty" })
                setStatus(STATUS.COMPLETED)
            } catch (e) {
                setSaveError(e)
            }
        } else {
            setStatus(STATUS.SUBMITTED)
        }
    }

    function getErrors(address) {
        const result = {};
        if (!address.city) result.city = "City is required";
        if (!address.country) result.country = "Country is required";
        return result;
    }

    if (saveError) throw saveError;
    if (status === STATUS.COMPLETED) {
        return <h1>Thanks for shopping!</h1>
    }

    return (
        <>
            <h1>Shipping Info</h1>
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
                    <label htmlFor="city">City</label>
                    <br />
                    <input
                        id="city"
                        type="text"
                        value={address.city}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <p role="alert">{(touched.city || status === STATUS.SUBMITTED) && errors.city}</p>
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <br />
                    <select
                        id="country"
                        value={address.country}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    >
                        <option value="">Select Country</option>
                        <option value="China">China</option>
                        <option value="India">India</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="USA">USA</option>
                    </select>
                    <p role="alert">{(touched.country || status === STATUS.SUBMITTED) && errors.country}</p>
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
