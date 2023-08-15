import React, { memo, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updataCartAsync,
} from "./cartSlice";
import { discountedPrice } from "../../app/constants";
import Model from "../commen/Model";
import { motion } from "framer-motion";
import { clickButton } from "../../app/style";

function Cart() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [openModel, setOpenModel] = useState(-1);

  const totalAmount = items.reduce((amount, item) => {
    return discountedPrice(item.product) * item.quantity + amount;
  }, 0);

  const totalItems = items.reduce((total, item) => {
    return +item.quantity + total;
  }, 0);

  const handleQuantity = (e, item) => {
    dispatch(updataCartAsync({ id:item.id, quantity: e.target.value }));
  };

  const handleRemove = (itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h2 className="text-5xl font-bold my-5">Cart</h2>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items &&
                items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.product.title}</h3>
                          <p className="ml-4"> ${discountedPrice(item.product)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            id="quantity"
                            value={item.quantity}
                            onChange={(e) => handleQuantity(e, item)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                          </select>
                        </div>

                        <div className="flex">
                          <Model
                            title={`Delete ${item.product.title}`}
                            message={`Are you sure you want to delete this ${item.product.title} ?`}
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={() => handleRemove(item.id)}
                            cancelAction={() => setOpenModel(-1)}
                            showModel={openModel === item.id}
                          />
                          <motion.button {...clickButton}
                            type="button"
                            onClick={() => setOpenModel(item.id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>
              <span className="text-slate-900 font-bold">$</span>
              {totalAmount}
            </p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>
              {totalItems} <span className="text-slate-600 text-sm">items</span>
            </p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <motion.div {...clickButton} className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </motion.div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                {" "}
                <motion.button {...clickButton}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </motion.button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(Cart);
