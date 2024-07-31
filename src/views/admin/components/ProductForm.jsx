import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { ImageLoader } from "@/components/common";
import {
  CustomColorInput,
  CustomCreatableSelect,
  CustomInput,
  CustomTextarea,
} from "@/components/formik";
import { Field, Form, Formik } from "formik";
import { useFileHandler } from "@/hooks";
import PropType from "prop-types";
import React from "react";
import * as Yup from "yup";

const brandOptions = [{ value: "summer", label: "summer" },
  { value: "winter", label: "winter" }
];
const Sizes = [
  { value: "sm", label: "sm" },
  { value: "md", label: "md" },
  { value: "lg", label: "lg" },
  { value: "xl", label: "xl" },
  { value: "2xl", label: "2xl" },
  { value: "3xl", label: "3xl" },
  { value: "4xl", label: "4xl" },
];

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Product name is required.")
    .max(60, "Product name must be less than 60 characters."),
  brand: Yup.string().required("Brand name is required."),
  price: Yup.number()
    .positive("Price is invalid.")
    .integer("Price should be an integer.")
    .required("Price is required."),
  comparePrice: Yup.number()
    .positive("Compare Price is invalid.")
    .integer("Compare Price should be an integer.")
    .required("Compare Price is required."),
  description: Yup.string().required("Description is required."),
  maxQuantity: Yup.number()
  .positive('Max quantity is invalid.')
  .integer('Max quantity should be an integer.')
  .required('Max quantity is required.'),
  keywords: Yup.array().of(Yup.string()).when("isAccessories", {
    is: false,
    then: Yup.array().min(1, "Please enter at least 1 style for this product."),
  }),
  sizes: Yup.array()
    .of(Yup.mixed().test("is-valid", "Invalid size value", (value) => typeof value === "number" || typeof value === "string"))
    .when("isAccessories", {
      is: false,
      then: Yup.array().when("isUnStiched", {
        is: false,
        then: Yup.array().min(1, "Please enter a size for this product."),
      }),
    }),
  accessoryDetail: Yup.string().when("isAccessories", {
    is: true,
    then: Yup.string().required("Accessory detail is required when adding to accessories."),
  }),
});


const ProductForm = ({ product, onSubmit, isLoading }) => {
  const initFormikValues = {
    name: product?.name || "",
    brand: product?.brand || "",
    price: product?.price || 0,
    comparePrice: product?.comparePrice || 0,
    description: product?.description || "",
    maxQuantity: product?.maxQuantity || 0,
    keywords: product?.keywords || [],
    sizes: product?.sizes || [],
    isFeatured: product?.isFeatured || false,
    isRecommended: product?.isRecommended || false,
    isStiched: product?.isStiched || false,
    isKids: product?.isKids || false,
    isUnStiched: product?.isUnStiched || false,
    isAccessories: product?.isAccessories || false,
    accessoryDetail: product?.accessoryDetail || "",
  };

  const { imageFile, isFileLoading, onFileChange, removeImage } = useFileHandler({
    image: {},
    imageCollection: product?.imageCollection || [],
  });

  const onSubmitForm = (form) => {
    if (imageFile.image.file || product.imageUrl) {
      onSubmit({
        ...form,
        quantity: 1,
        name_lower: form.name.toLowerCase(),
        dateAdded: new Date().getTime(),
        image: imageFile?.image?.file || product.imageUrl,
        imageCollection: imageFile.imageCollection,
      });
    } else {
      alert("Product thumbnail image is required.");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onSubmitForm}
      >
        {({ values, setFieldValue }) => (
          <Form className="product-form">
            <div className="product-form-inputs">
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="name"
                    type="text"
                    label="* Product Name"
                    placeholder="Gago"
                    style={{ textTransform: "capitalize" }}
                    component={CustomInput}
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.brand, value: values.brand }}
                    name="brand"
                    iid="brand"
                    options={brandOptions}
                    disabled={isLoading}
                    placeholder="Select/Create Brand"
                    label="* Season winter/summer"
                    style={{textTransform:"lowercase"}}
                  />
                </div>
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="description"
                  id="description"
                  rows={3}
                  label="* Product Description"
                  component={CustomTextarea}
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="price"
                    id="price"
                    type="number"
                    label="* Price"
                    component={CustomInput}
                  />
                </div>
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="comparePrice"
                    id="comparePrice"
                    type="number"
                    label="* Compare Price"
                    component={CustomInput}
                  />
                </div>
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="maxQuantity"
                    type="number"
                    id="maxQuantity"
                    label="* Max Quantity"
                    component={CustomInput}
                  />
                </div>
                &nbsp;
              </div>
              {/* <div className="d-flex">
                <div className="product-form-field">
                  <input
                    checked={values.isFeatured}
                    id="featured"
                    onChange={(e) => {
                      setFieldValue("isFeatured", e.target.checked);
                      if (e.target.checked) {
                        setFieldValue("isRecommended", false);
                        setFieldValue("isKids", false);
                        setFieldValue("isStiched", false);
                        setFieldValue("isUnStiched", false);
                        setFieldValue("isAccessories", false);
                      }
                    }}
                    type="checkbox"
                  />
                  &nbsp;
                  <label className="label" htmlFor="featured">
                  Add to  Featured
                  </label>
                </div>
                <div className="product-form-field">
                  <input
                    checked={values.isRecommended}
                    id="recommended"
                    onChange={(e) => {
                      setFieldValue("isRecommended", e.target.checked);
                      if (e.target.checked) {
                        setFieldValue("isFeatured", false);
                        setFieldValue("isKids", false);
                        setFieldValue("isStiched", false);
                        setFieldValue("isUnStiched", false);
                        setFieldValue("isAccessories", false);
                      }
                    }}
                    type="checkbox"
                  />
                  &nbsp;
                  <label className="label" htmlFor="recommended">
                  Add to  Recommended
                  </label>
                </div>
               
              </div> */}
              <div className="add_collection mt-4">
              <h2 className="fw-bold fs-4">* Select a Collection</h2>
              <div className="d-flex border-black border p-2">
              <div className="product-form-field">
                  <input
                    checked={values.isStiched}
                    id="isStiched"
                    onChange={(e) => {
                      setFieldValue("isStiched", e.target.checked);
                      if (e.target.checked) {
                        setFieldValue("isFeatured", false);
                        setFieldValue("isRecommended", false);
                        setFieldValue("isKids", false);
                        setFieldValue("isUnStiched", false);
                        setFieldValue("isAccessories", false);
                      }
                    }}
                    type="checkbox"
                  />

                  <label className="label" htmlFor="isStiched">
                  Add to  Stitched
                  </label>
                </div>
                <div className="product-form-field">
                  <input
                    checked={values.isUnStiched}
                    id="isUnStiched"
                    onChange={(e) => {
                      setFieldValue("isUnStiched", e.target.checked);
                      if (e.target.checked) {
                        setFieldValue("isFeatured", false);
                        setFieldValue("isRecommended", false);
                        setFieldValue("isKids", false);
                        setFieldValue("isStiched", false);
                        setFieldValue("isAccessories", false);
                      }
                    }}
                    type="checkbox"
                  />

                  <label className="label" htmlFor="isUnStiched">
                   Add to  UnStitched
                  </label>
                </div>
                <div className="product-form-field">
                  <input
                    checked={values.isAccessories}
                    id="isAccessories"
                    onChange={(e) => {
                      setFieldValue("isAccessories", e.target.checked);
                      if (e.target.checked) {
                        setFieldValue("isFeatured", false);
                        setFieldValue("isRecommended", false);
                        setFieldValue("isKids", false);
                        setFieldValue("isStiched", false);
                        setFieldValue("isUnStiched", false);
                      }
                    }}
                    type="checkbox"
                  />
                  <label className="label" htmlFor="isAccessories">
                    Add to Accessories
                  </label>
                </div>
                <div className="product-form-field">
                  <input
                    checked={values.isKids}
                    id="isKids"
                    onChange={(e) => {
                      setFieldValue("isKids", e.target.checked);
                      if (e.target.checked) {
                        setFieldValue("isFeatured", false);
                        setFieldValue("isRecommended", false);
                        setFieldValue("isStiched", false);
                        setFieldValue("isUnStiched", false);
                        setFieldValue("isAccessories", false);
                      }
                    }}
                    type="checkbox"
                  />
                  <label className="label" htmlFor="isKids">
                   Add to Kids
                  </label>
                </div>
              </div>
              </div>
          
              <br />
              <div className="d-flex">
                {!values.isAccessories && (
                  <div className="product-form-field">
                    <CustomCreatableSelect
                      defaultValue={values.keywords.map((key) => ({
                        value: key,
                        label: key,
                      }))}
                      name="keywords"
                      iid="keywords"
                      isMulti
                      disabled={isLoading}
                      placeholder="Enter Style e.g lawn.."
                      label="* Style"
                    />
                  </div>
                )}
                &nbsp;
                {!values.isAccessories && !values.isUnStiched && (
                  <div className="product-form-field">
                    <CustomCreatableSelect
                      defaultValue={values.sizes.map((size) => ({
                        value: size,
                        label: size,
                      }))}
                      name="sizes"
                      iid="sizes"
                      options={Sizes}
                      isMulti
                      disabled={isLoading}
                      placeholder="Create/Select Sizes"
                      label="* Sizes"
                    />
                  </div>
                )}
              </div>
              {values.isAccessories && (
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="accessoryDetail"
                    id="accessoryDetail"
                    type="text"
                    label="* Accessory Detail"
                    component={CustomInput}
                  />
                </div>
              )}
              <div className="product-form-field">
                <span className="d-block padding-s">Image Collection</span>
                {!isFileLoading && (
                  <label htmlFor="product-input-file-collection">
                    <input
                      disabled={isLoading}
                      hidden
                      id="product-input-file-collection"
                      multiple
                      onChange={(e) =>
                        onFileChange(e, {
                          name: "imageCollection",
                          type: "multiple",
                        })
                      }
                      readOnly={isLoading}
                      type="file"
                    />
                    Choose Images
                  </label>
                )}
              </div>
              <div className="product-form-collection">
                {imageFile.imageCollection.length >= 1 &&
                  imageFile.imageCollection.map((image) => (
                    <div
                      className="product-form-collection-image"
                      key={image.id}
                    >
                      <ImageLoader alt="" src={image.url} />
                      <button
                        className="product-form-delete-image"
                        onClick={() =>
                          removeImage({
                            id: image.id,
                            name: "imageCollection",
                          })
                        }
                        title="Delete Image"
                        type="button"
                      >
                        <i className="fa fa-times-circle" />
                      </button>
                    </div>
                  ))}
              </div>
              <br />
              <br />
              <div className="product-form-field product-form-submit">
                <button className="button" disabled={isLoading} type="submit">
                  {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                  &nbsp;
                  {isLoading ? "Saving Product" : "Save Product"}
                </button>
              </div>
            </div>
            <div className="product-form-file">
              <div className="product-form-field">
                <span className="d-block padding-s">* Thumbnail</span>
                {!isFileLoading && (
                  <label htmlFor="product-input-file">
                    <input
                      disabled={isLoading}
                      hidden
                      id="product-input-file"
                      onChange={(e) =>
                        onFileChange(e, { name: "image", type: "single" })
                      }
                      readOnly={isLoading}
                      type="file"
                    />
                    Choose Image
                  </label>
                )}
              </div>
              <div className="product-form-image-wrapper">
                {(imageFile.image.url || product.image) && (
                  <ImageLoader
                    alt=""
                    className="product-form-image-preview"
                    src={imageFile.image.url || product.image}
                  />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ProductForm.propTypes = {
  product: PropType.shape({
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    comparePrice: PropType.number,
    description: PropType.string,
    maxQuantity: PropType.number,
    style: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    keywords: PropType.arrayOf(PropType.string),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    isKids: PropType.bool,
    isStiched: PropType.bool,
    isUnStiched: PropType.bool,
    isAccessories: PropType.bool,
    accessoryDetail: PropType.string
  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired,
};

export default ProductForm;
