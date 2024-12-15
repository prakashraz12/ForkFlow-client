'use client'

import React from "react"
import { Formik, Form, Field, FieldArray } from "formik"
import * as Yup from "yup"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ImageUploader from "../imageUplod/imgeUploder.component"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().positive("Price must be positive").required("Price is required"),
  image: Yup.string().required("Image is required"),
  productType: Yup.string().oneOf(["SINGLE", "COMBO"]).required("Product type is required"),
  variations: Yup.array().when("productType", {
    is: "SINGLE",
    then: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Variation name is required"),
        price: Yup.number().positive("Price must be positive").required("Price is required"),
        isOffer: Yup.boolean(),
        offerPrice: Yup.number().when("isOffer", {
          is: true,
          then: Yup.number().positive("Offer price must be positive").required("Offer price is required"),
        }),
        offerValidUpto: Yup.date().when("isOffer", {
          is: true,
          then: Yup.date().min(new Date(), "Offer end date must be in the future").required("Offer end date is required"),
        }),
      })
    ).min(1, "At least one variation is required for single products"),
  }),
  comboProducts: Yup.array().when("productType", {
    is: "COMBO",
    then: Yup.array().of(
      Yup.object().shape({
        productId: Yup.string().required("Product selection is required"),
        quantity: Yup.number().positive("Quantity must be positive").required("Quantity is required"),
      })
    ).min(1, "At least one product is required for combo"),
  }),
})

const ProductCreateComponent = () => {
  const [existingProducts, setExistingProducts] = React.useState([
    { id: "1", name: "Product 1" },
    { id: "2", name: "Product 2" },
    { id: "3", name: "Product 3" },
  ])

  return (
    <div className="md:container mx-auto p-4">
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: "",
          image: "",
          productType: "SINGLE",
          variations: [{ name: "", price: "", isOffer: false, offerPrice: "", offerValidUpto: "" }],
          comboProducts: [{ productId: "", quantity: 1 }],
        }}
        validationSchema={ProductSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Field name="name" as={Input} placeholder="Product Name" />
              {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Field name="description" as={Textarea} placeholder="Description" />
              {errors.description && touched.description && <div className="text-red-500">{errors.description}</div>}
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Field name="price" as={Input} type="number" placeholder="Price" />
              {errors.price && touched.price && <div className="text-red-500">{errors.price}</div>}
            </div>

            <div>
              <Label htmlFor="image">Image</Label>
              <ImageUploader onImageUpload={(imageUrl) => setFieldValue("image", imageUrl)} />
              {errors.image && touched.image && <div className="text-red-500">{errors.image}</div>}
            </div>

            <div>
              <Label>Product Type</Label>
              <Tabs value={values.productType} onValueChange={(value) => setFieldValue("productType", value)} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="SINGLE">Single</TabsTrigger>
                  <TabsTrigger value="COMBO">Combo</TabsTrigger>
                </TabsList>
                <TabsContent value="SINGLE">
                  <FieldArray name="variations">
                    {({ push, remove }) => (
                      <div className="space-y-4">
                        {values.variations.map((_, index) => (
                          <div key={index} className="border p-4 rounded-md">
                            <Field name={`variations.${index}.name`} as={Input} placeholder="Variation Name" />
                            <Field name={`variations.${index}.price`} as={Input} type="number" placeholder="Price" />
                            <div className="flex items-center space-x-2 mt-2">
                              <Checkbox
                                id={`variations.${index}.isOffer`}
                                checked={values.variations[index].isOffer}
                                onCheckedChange={(checked) => setFieldValue(`variations.${index}.isOffer`, checked)}
                              />
                              <Label htmlFor={`variations.${index}.isOffer`}>Is Offer</Label>
                            </div>
                            {values.variations[index].isOffer && (
                              <>
                                <Field name={`variations.${index}.offerPrice`} as={Input} type="number" placeholder="Offer Price" />
                                <Field name={`variations.${index}.offerValidUpto`} as={Input} type="date" placeholder="Offer Valid Upto" />
                              </>
                            )}
                            {index > 0 && (
                              <Button type="button" variant="destructive" onClick={() => remove(index)}>
                                Remove Variation
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button type="button" onClick={() => push({ name: "", price: "", isOffer: false, offerPrice: "", offerValidUpto: "" })}>
                          Add Variation
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </TabsContent>
                <TabsContent value="COMBO">
                  <FieldArray name="comboProducts">
                    {({ push, remove }) => (
                      <div className="space-y-4">
                        {values.comboProducts.map((_, index) => (
                          <div key={index} className="border p-4 rounded-md">
                            <Select
                              value={values.comboProducts[index].productId}
                              onValueChange={(value) => setFieldValue(`comboProducts.${index}.productId`, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a product" />
                              </SelectTrigger>
                              <SelectContent>
                                {existingProducts.map((product) => (
                                  <SelectItem key={product.id} value={product.id}>
                                    {product.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Field name={`comboProducts.${index}.quantity`} as={Input} type="number" placeholder="Quantity" />
                            {index > 0 && (
                              <Button type="button" variant="destructive" onClick={() => remove(index)}>
                                Remove Product
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button type="button" onClick={() => push({ productId: "", quantity: 1 })}>
                          Add Product to Combo
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </TabsContent>
              </Tabs>
            </div>

            <Button type="submit">Create Product</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProductCreateComponent