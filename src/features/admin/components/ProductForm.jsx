import React, { memo, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updataProductAsync,
} from "../../product/productSlice";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

function ProductForm() {
  const dispatch = useDispatch();
  const params = useParams();

  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const selectedProduct = useSelector(selectProductById);
  
  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setFieldValue("title", selectedProduct.title);
      setFieldValue("description", selectedProduct.description);
      setFieldValue("brand", selectedProduct.brand);
      setFieldValue("category", selectedProduct.category);
      setFieldValue("price", selectedProduct.price);
      setFieldValue("stock", selectedProduct.stock);
      setFieldValue("discountPercentage", selectedProduct.discountPercentage);
      setFieldValue("thumbnail", selectedProduct.thumbnail);
      setFieldValue("image1", selectedProduct.images[0]);
      setFieldValue("image2", selectedProduct.images[1]);
      setFieldValue("image3", selectedProduct.images[2]);
      setFieldValue("image4", selectedProduct.images[3]);
    }
  }, [selectedProduct, params.id]);

  const AddProduct = (values) => {
    const product = { ...values };
    product.images = [
      product.image1,
      product.image2,
      product.image3,
      product.image4,
    ];
    product.rating = 0;
    delete product["image1"];
    delete product["image2"];
    delete product["image3"];
    delete product["image4"];
    if (params.id) {
      product.id = params.id;
      product.rating = selectedProduct.rating || 0;
      dispatch(updataProductAsync(product));
    } else {
      dispatch(createProductAsync(product));
    }
    handleReset();
  };

  const schema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
    brand: Yup.string().required(),
    category: Yup.string().required(),
    price: Yup.number().min(1, "Please Enter Some Amount").required(),
    discountPercentage: Yup.number().min(0).max(100).required(),
    stock: Yup.number().min(0).required(),
    thumbnail: Yup.string().url().required(),
    image1: Yup.string().url().required(),
    image2: Yup.string().url().required(),
    image3: Yup.string().url().required(),
    image4: Yup.string().url().required(),
  });

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      brand: "",
      category: "",
      price: "",
      discountPercentage: "",
      thumbnail: "",
      stock: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
    },
    onSubmit: AddProduct,
    validationSchema: schema,
  });

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updataProductAsync(product));
    handleReset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Add Product
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {touched.title && errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                {touched.description && errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">--choose brand--</option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.value}</option>
                    ))}
                  </select>
                </div>
                {touched.brand && errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand}</p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">--choose category--</option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.value}</option>
                    ))}
                  </select>
                </div>
                {touched.category && errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {touched.price && errors.price && (
                  <p className="text-red-500 text-sm">{errors.price}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="discountPercentage"
                    id="discount"
                    value={values.discountPercentage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {touched.discountPercentage && errors.discountPercentage && (
                  <p className="text-red-500 text-sm">
                    {errors.discountPercentage}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {touched.stock && errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock}</p>
                )}
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail URL
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="thumbnail"
                    id="thumbnail"
                    value={values.thumbnail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {touched.thumbnail && errors.thumbnail && (
                  <p className="text-red-500 text-sm">{errors.thumbnail}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Images 1 URL
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="image1"
                    id="image1"
                    value={values.image1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {touched.image1 && errors.image1 && (
                  <p className="text-red-500 text-sm">{errors.image1}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2 URL
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="image2"
                    id="image2"
                    value={values.image2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {touched.image2 && errors.image2 && (
                  <p className="text-red-500 text-sm">{errors.image2}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3 URL
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="image3"
                    id="image3"
                    value={values.image3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {touched.image3 && errors.image3 && (
                  <p className="text-red-500 text-sm">{errors.image3}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="image4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 4 URL
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="image4"
                    id="image4"
                    value={values.image4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {touched.image4 && errors.image4 && (
                  <p className="text-red-500 text-sm">{errors.image4}</p>
                )}
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Extra
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => handleReset()}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Reset
          </button>
          {selectedProduct && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
export default memo(ProductForm);
