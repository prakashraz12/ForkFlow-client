import * as Yup from "yup";
export const ProductCreateSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.number().positive("Must be positive").required("Required"),
  isOffer: Yup.boolean(),
  // offerPrice: Yup.number()
  //   .positive("Must be positive")
  //   .when("isOffer", (isOffer, schema) =>
  //     isOffer ? schema.required("Required when offer is active") : schema
  //   ),
  // offerPriceValidUpto: Yup.date().when("isOffer", (isOffer, schema) =>
  //   isOffer ? schema.required("Required when offer is active") : schema
  // ),
  productType: Yup.string().oneOf(["SINGLE", "COMBO"]).required("Required"),

  isMultipleVariant: Yup.boolean(),
  variants: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        price: Yup.number().positive("Must be positive").required("Required"),
      })
    )

});
