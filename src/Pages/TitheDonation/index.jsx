// import { CLIENT_ID } from '../Config/Config';

import { useState, useEffect } from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// import MenuBar from "../../Components/MenuBar";

import { AiOutlineMenu } from "react-icons/ai";

import DashBoard from "../../Components/DashBoard";

import SideBoard from "../../Components/SideBoard";

import { Link } from "react-router-dom";

import MenuBar from "../../Components/MenuBar";

// import { CLIENT_ID } from "../Config/Config";

const SeedDonation = () => {
  const [show, setShow] = useState(false);

  const [success, setSuccess] = useState(false);

  const [ErrorMessage, setErrorMessage] = useState("");

  const [orderID, setOrderID] = useState(false);

  const [amount, setAmount] = useState();

  const [description, setDescription] = useState("");

  const [lastName, setLastName] = useState("");

  const [firstName, setFirstName] = useState("");

  const CLIENT_ID =
    "ATSuisuq1XawDPi9DasmYnjD4fvQjgubnfcFxAe73tVdBWQAq264_jZKv00WYrQazSs4VKXFyLJCJpZR";

  const createOrder = (data, actions) => {
    return actions.order

      .create({
        purchase_units: [
          {
            description: description,

            amount: {
              currency_code: "USD",

              value: amount,
            },
          },
        ],
      })

      .then((orderID) => {
        setOrderID(orderID);

        return orderID;
      });
  };

  // check Approval

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      setSuccess(true);
    });
  };

  //capture likely error

  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");

      console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <div className="sm:flex sm:flex-row sm:space-x-5 bg-slate-50 text-black">
        {/* lg screens dashboard */}

        <DashBoard />

        {/* lg screens dashboard */}

        <div className="w-screen h-full flex flex-col justify-between bg-slate-50 text-black">
          <div className="sm:w-full ">
            <div>
              <div>
                <div className="pl-3">
                  <div className="mt-2 ml-3 mr-6 mb-4 flex row space-x-2 items-center lg:hidden">
                    <AiOutlineMenu className="lg:hidden" />

                    {/* <h2>Dashboard</h2> */}

                    <h5 className=" text-3xl font-bold lg:hidden">
                      Tithe Donation
                    </h5>
                  </div>

                  <div className="hidden bg-purple-700 pt-2 text-white lg:block">
                    <div className="flex row space-x-2 ml-8 items-center lg:hidden">
                      <AiOutlineMenu className="sm:hidden" />

                      <h2>Prayer Request</h2>
                    </div>

                    <div className="flex row space-x-24 pl-10 pt-2 pr-10 w-30 pb-1">
                      <div>
                        <Link to={"/seeddonations"}>Seed Donation</Link>
                      </div>

                      <div className="lg:hidden">
                        <Link to={"/seeddonations"}>Seed Donation</Link>
                      </div>

                      <div>
                        <h6 className="border-b-2 border-white-700">
                          Tithe Donations
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="flex row  justify-between">
                    <p className="mt-2 ml-3 w-40 sm:w-96">
                      Support our mission and make a difference - donate to our
                      church today and help us continue spreading love,
                      compassion, and hope within our community and beyond.
                    </p>

                    <img
                      className="w-52 h-56 sm:h-40 sm:pt-2"
                      src="/capa-1.svg"
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col space-y-3 mb-28 mx-2 mt-12 ">
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="flex flex-col space-y-3"
                    >
                      <label htmlFor="fullName">Full Name:</label>

                      <div className="flex  flex-row space-x-2">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="pt-1 pr-6 pb-1 pl-2 border border-black-500 rounded-lg w-36"
                        />

                        <input
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="pt-1 pr-6 pb-1 pl-2 border border-black-500 rounded-lg w-36"
                        />
                      </div>

                      <label htmlFor="Donation">Donation:</label>

                      <input
                        type="number"
                        value={amount}
                        className="border border-black-500 rounded-lg pt-1 pr-10 pb-1 pl-2"
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        placeholder="0.0                                               USD"
                      />

                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-black-500 pt-1 pr-3 pb-1 pl-2 rounded-lg"
                        placeholder="Description..."
                      ></textarea>

                      <label htmlFor="Payment">Payment Method:</label>

                      {/* <div className="flex flex-row space-x-20">

                      <div>

                        <input type="checkbox" />

                        <label htmlFor="Credit">Credit Card</label>

                      </div>

                      <div>

                        <input type="checkbox" />

                        <label htmlFor="Credit">Pay Pal</label>

                      </div>

                    </div> */}

                      {show ? (
                        <PayPalButtons
                          style={{
                            layout: "vertical",

                            color: "white",

                            shape: "pill",

                            label: "paypal",

                            disableMaxWidth: false,
                          }}
                          createOrder={createOrder}
                          onApprove={onApprove}
                        />
                      ) : null}

                      <button
                        onClick={() => setShow(true)}
                        className="rounded-full bg-purple-700 mt-6 mb-20 mx-auto px-2 py-2 w-32 text-white"
                      >
                        Donate
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <MenuBar />
          </div>
        </div>

        {/* lg screens dashboard */}

        <SideBoard />

        {/* lg screens dashboard */}
      </div>
    </PayPalScriptProvider>
  );
};

export default SeedDonation;
