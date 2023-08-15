import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import Model from "../../commen/Model";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clickButton } from "../../../app/style";
import { motion } from "framer-motion";

function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [openModel, setOpenModel] = useState(-1);

  const handleShowForm = (e, index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setFieldValue("fullName", address.fullName);
    setFieldValue("email", address.email);
    setFieldValue("phone", address.phone);
    setFieldValue("country", address.country);
    setFieldValue("street", address.street);
    setFieldValue("city", address.city);
    setFieldValue("region", address.region);
    setFieldValue("pinCode", address.pinCode);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
    toast.info("User Address delete successfully", {
      position: "top-center",
    });
  };

  const EditAddress = (values) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(selectedEditIndex, 1, values);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
    handleReset();
    // alert("your address Edit SuccessFully");
    toast.success("your address Edit SuccessFully", {
      position: "top-center",
    });
  };

  const addNewAddress = (values) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, values] }; // for shallow copy issue
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
    handleReset();
    //alert("new userInfo address add successfully");
    toast.success("New Address Add Successfully", {
      position: "top-center",
    });
  };

  // handle to form Edit and Add
  const handleFormikForm = (values) => {
    if (selectedEditIndex > -1 && showAddAddressForm === false) {
      EditAddress(values);
    } else if (showAddAddressForm === true && selectedEditIndex <= -1) {
      addNewAddress(values);
    }
  };

  const schema = Yup.object({
    fullName: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.number().required(),
    country: Yup.string().required(),
    street: Yup.string().required(),
    city: Yup.string().required(),
    region: Yup.string().required(),
    pinCode: Yup.number().required(),
  });

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    handleReset,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      street: "",
      city: "",
      region: "",
      pinCode: "",
    },
    onSubmit: handleFormikForm,
    validationSchema: schema,
  });

  return (
    <>
      <div>
        <div>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="sm:flex sm:justify-between ">
                <div>
                  <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                    Name:- {userInfo.name ? <span>{userInfo.name}</span> : "New User"}
                  </h1>
                  <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                    Email Address:- {userInfo.email}
                  </h3>
                  {userInfo.role === "admin" && (
                    <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                      Role:- {userInfo.role}
                    </h3>
                  )}
                </div>
                <div>
                  <motion.button {...clickButton}
                    type="submit"
                    onClick={() => {
                      setShowAddAddressForm(true);
                      setSelectedEditIndex(-1);
                    }}
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 my-4"
                  >
                    Add New Address
                  </motion.button>
                </div>
              </div>
              {/* form */}
              {showAddAddressForm ? (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white px-5 py-12 mt-12"
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        Add New Address
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Enter the value carefully with all the inputs given
                        below.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="fullName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            FullName
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="fullName"
                              id="fullName"
                              value={values.fullName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.fullName && errors.fullName && (
                            <p className="text-red-500 text-sm">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            email
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="email"
                              id="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.email && errors.email && (
                            <p className="text-red-500 text-sm">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone Number
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              name="phone"
                              type="number"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.phone && errors.phone && (
                            <p className="text-red-500 text-sm">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Country
                          </label>
                          <div className="mt-2">
                            <select
                              id="country"
                              name="country"
                              value={values.country}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option>United States</option>
                              <option>Canada</option>
                              <option>INDIA</option>
                              <option>Mexico</option>
                              <option>PAKISTAN</option>
                            </select>
                          </div>
                          {touched.country && errors.country && (
                            <p className="text-red-500 text-sm">
                              {errors.country}
                            </p>
                          )}
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="street"
                              id="street-address"
                              autoComplete="street"
                              value={values.street}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.street && errors.street && (
                            <p className="text-red-500 text-sm">
                              {errors.street}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="city"
                              id="city"
                              autoComplete="address-level2"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.city && errors.city && (
                            <p className="text-red-500 text-sm">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="region"
                              id="region"
                              autoComplete="address-level1"
                              value={values.region}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.region && errors.region && (
                            <p className="text-red-500 text-sm">
                              {errors.region}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pin"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            PIN / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="pinCode"
                              id="pin"
                              autoComplete="postal-code"
                              value={values.pinCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {touched.pinCode && errors.pinCode && (
                            <p className="text-red-500 text-sm">
                              {errors.pinCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                    <motion.button {...clickButton}
                        type="button"
                        onClick={() => {
                          setShowAddAddressForm(false);
                        }}
                        className="font-medium text-indigo-600 hover:text-indigo-500 border rounded-md px-4 py-1"
                      >
                        Cancel
                      </motion.button>

                        <motion.button {...clickButton}
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </motion.button>
                    </div>
                  </div>
                </form>
              ) : null}
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <p className=" text-xl font-bold text-gray-500">
                Your Addresses :
              </p>

              {userInfo.addresses.map((address, index) => (
                <>
                  {/* form */}
                  {selectedEditIndex === index ? (
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white px-5 py-12 mt-12 border-t-4"
                    >
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                            Edit Your Address
                          </h2>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="fullName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                FullName
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="fullName"
                                  id="fullName"
                                  value={values.fullName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {touched.fullName && errors.fullName && (
                                <p className="text-red-500 text-sm">
                                  {errors.fullName}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                email
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="email"
                                  id="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {touched.email && errors.email && (
                                <p className="text-red-500 text-sm">
                                  {errors.email}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Phone Number
                              </label>
                              <div className="mt-2">
                                <input
                                  id="phone"
                                  name="phone"
                                  type="number"
                                  value={values.phone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {touched.phone && errors.phone && (
                                <p className="text-red-500 text-sm">
                                  {errors.phone}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Country
                              </label>
                              <div className="mt-2">
                                <select
                                  id="country"
                                  name="country"
                                  value={values.country}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>United States</option>
                                  <option>Canada</option>
                                  <option>INDIA</option>
                                  <option>Mexico</option>
                                  <option>PAKISTAN</option>
                                </select>
                              </div>
                              {touched.country && errors.country && (
                                <p className="text-red-500 text-sm">
                                  {errors.country}
                                </p>
                              )}
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="street-address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="street"
                                  id="street-address"
                                  autoComplete="street"
                                  value={values.street}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {touched.street && errors.street && (
                                <p className="text-red-500 text-sm">
                                  {errors.street}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="city"
                                  id="city"
                                  autoComplete="address-level2"
                                  value={values.city}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {touched.city && errors.city && (
                                <p className="text-red-500 text-sm">
                                  {errors.city}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="region"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="region"
                                  id="region"
                                  autoComplete="address-level1"
                                  value={values.region}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {touched.region && errors.region && (
                                <p className="text-red-500 text-sm">
                                  {errors.region}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="pin"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                PIN / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="pinCode"
                                  id="pin"
                                  autoComplete="postal-code"
                                  value={values.pinCode}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {touched.pinCode && errors.pinCode && (
                                <p className="text-red-500 text-sm">
                                  {errors.pinCode}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <motion.button {...clickButton}
                            type="button"
                            onClick={() => {
                              setSelectedEditIndex(-1);
                              handleReset();
                            }}
                            className="font-medium text-indigo-600 hover:text-indigo-500 border rounded-md px-4 py-1"
                          >
                            Cancel
                          </motion.button>

                          <motion.button {...clickButton}
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </motion.button>
                        </div>
                      </div>
                    </form>
                  ) : null}
                  {/* address Cart */}
                  <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                    <div className=" flex flex-col items-end">
                      <motion.button {...clickButton}
                        type="button"
                        onClick={(e) => {
                          handleShowForm(e, index);
                          setShowAddAddressForm(false);
                        }}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </motion.button>
                      <Model
                        title={`Delete ${address.name} address`}
                        message={`Are you sure you want to delete this ${address.name} address ?`}
                        dangerOption="Delete"
                        cancelOption="Cancel"
                        dangerAction={(e) => handleRemove(e, index)}
                        cancelAction={() => setOpenModel(-1)}
                        showModel={openModel === index}
                      />
                      <motion.button {...clickButton}
                        type="button"
                        onClick={() => setOpenModel(index)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </motion.button>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default memo(UserProfile);
