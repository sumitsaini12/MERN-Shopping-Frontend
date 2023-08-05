import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import {
  fetchAllOrderAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../commen/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminOrder() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const newSort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(newSort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrderAsync({ sort, pagination }));
    // TODO :  Server will filter deleted products
  }, [dispatch, page, sort]);

  const handleShow = (order) => {
    console.log("handleShow");
  };

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
    toast.success("Delivary Status Successfully Update!", {
      position: "top-center",
    });
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="bg-white shadow-md rounded my-6">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer flex"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      #Order{" "}
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 font-semibold" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 font-semibold" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-center">Items</th>
                    <th
                      className="py-3 px-6 text-left cursor-pointer flex"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      #Total Amount{" "}
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 font-semibold" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 font-semibold" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {item.title} - #{item.quantity} - $
                              {discountedPrice(item)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-semibold">
                            ${order.totalAmount}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-start ">
                        <div>
                          <p className="font-bold">
                            Name:- {order.selectedAddress.fullName}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-semibold">
                            Mobile:-{order.selectedAddress.phone}
                          </span>
                        </div>
                        <div className="flex text-start mt-1">
                          <span className="text-sm font-semibold">
                            Address:-
                          </span>
                          <span className="text-sm font-medium">
                            {order.selectedAddress.street}{" "}
                            {order.selectedAddress.city}{" "}
                            {order.selectedAddress.region},{" "}
                            {order.selectedAddress.country}(
                            {order.selectedAddress.pinCode})
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {editableOrderId === order.id ? (
                          <select
                            className="text-white bg-black rounded-md mt-4"
                            onChange={(e) => handleUpdate(e, order)}
                          >
                            <option>--choose--</option>
                            <option value="panding">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-6 rounded-full font-medium text-sm`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div
                            onClick={(e) => handleShow(order)}
                            className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110"
                          >
                            <EyeIcon className="w-6 h-6" />
                          </div>
                          <div
                            onClick={(e) => handleEdit(order)}
                            className="w-4  transform hover:text-purple-500 hover:scale-110 pl-3"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          handlePage={handlePage}
          setPage={setPage}
          totalItems={totalOrders}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default AdminOrder;
