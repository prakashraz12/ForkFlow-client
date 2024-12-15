import { Formik, Form, Field, FieldArray } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, MinusCircle } from "lucide-react";
import ImageUploader from "../imageUplod/imgeUploder.component";
import { PRODUCT_TYPE_ENUMS } from "@/common/enums/role.enum";
import { ProductCreateSchema } from "@/schemas/productCreateSchema";
import { useCreateProductMutation } from "@/features/product/productApi";
import useGetCategory from "@/hooks/use-getCategory";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { useState } from "react";

export default function ProductCreateForm() {
  const { productCategory } = useGetCategory();
  const [productImage, setProductImage] = useState<File | null>(null);
  const [crateProduct, {isLoading}] = useCreateProductMutation();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <Formik
          initialValues={{
            name: "",
            description: "",
            price: "",
            isOffer: false,
            offerPrice: "",
            offerPriceValidUpto: "",
            productType: PRODUCT_TYPE_ENUMS.SINGLE,
            comboProducts: [],
            isMultipleVariant: false,
            variants: [],
            categoryId: "",
          }}
          validationSchema={ProductCreateSchema}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("categoryId", values.categoryId)
            if (productImage) {
              formData.append("file", productImage);
            }
            if (values?.isOffer) {
              formData.append("isOffer", JSON.stringify(true));
              formData.append("offerPrice", values?.offerPrice);
              formData.append("offerValidUntil", values.offerPriceValidUpto);
            }
            if (values?.isMultipleVariant) {
              formData.append("isMultipleVariant", JSON.stringify(true));
              formData.append("variants", JSON.stringify(values.variants));
            } else {
              formData.append("price", values.price)
            }

            if (values?.productType === PRODUCT_TYPE_ENUMS.COMBO) {
              formData.append("productType", values.productType);
            } else {
              formData.append("productType", values.productType);
            }

            try {
              await crateProduct(formData);
            } catch (error) {
              console.error("Error creating product:", error);
            }
          }}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue, handleSubmit }) => {
            console.log(errors);
            return (
              <Form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Field name="name" as={Input} />
                  {errors.name && touched.name && (
                    <div className="text-red-500">{errors.name}</div>
                  )}
                </div>

                <div>
                  <Label htmlFor="image">Image</Label>
                  <ImageUploader
                    file={productImage}
                    setFile={setProductImage}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Field name="description" as={Textarea} />
                  {errors.description && touched.description && (
                    <div className="text-red-500">{errors.description}</div>
                  )}
                </div>

                <div>
                  <Label htmlFor="price">Price</Label>
                  <Field name="price" as={Input} type="number" />
                  {errors.price && touched.price && (
                    <div className="text-red-500">{errors.price}</div>
                  )}
                </div>

                <div>
                  <div className="w-full  space-y-2">
                    <Label htmlFor="food-category">Category</Label>
                    <Select
                      name="categoryid"
                      value={values?.categoryId}
                      onValueChange={(item) =>
                        setFieldValue("categoryId", item)
                      }
                    >
                      <SelectTrigger id="food-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategory?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id?.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isOffer"
                    checked={values.isOffer}
                    onCheckedChange={(checked) =>
                      setFieldValue("isOffer", checked)
                    }
                  />
                  <Label
                    htmlFor="isOffer"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Is this product on offer?
                  </Label>
                </div>

                {values.isOffer && (
                  <>
                    <div>
                      <Label htmlFor="offerPrice">Offer Price</Label>
                      <Field name="offerPrice" as={Input} type="number" />
                      {errors.offerPrice && touched.offerPrice && (
                        <div className="text-red-500">{errors.offerPrice}</div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="offerPriceValidUpto">
                        Offer Valid Until
                      </Label>
                      <Field
                        name="offerPriceValidUpto"
                        as={Input}
                        type="date"
                      />
                      {errors.offerPriceValidUpto &&
                        touched.offerPriceValidUpto && (
                          <div className="text-red-500">
                            {errors.offerPriceValidUpto}
                          </div>
                        )}
                    </div>
                  </>
                )}

                <div>
                  <Label>Product Type</Label>
                  <RadioGroup
                    defaultValue={values.productType}
                    onValueChange={(value) =>
                      setFieldValue("productType", value)
                    }
                  >
                    <div className="flex items-center ">
                      <RadioGroupItem
                        value={PRODUCT_TYPE_ENUMS.SINGLE}
                        id="single"
                      />
                      <Label htmlFor="single">Single</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={PRODUCT_TYPE_ENUMS.COMBO}
                        id="combo"
                      />
                      <Label htmlFor="combo">Combo</Label>
                    </div>
                  </RadioGroup>
                </div>

                {values.productType === PRODUCT_TYPE_ENUMS.COMBO && (
                  <FieldArray name="comboProducts">
                    {({ push, remove }) => (
                      <div>
                        <Label>Combo Products</Label>
                        {values.comboProducts.map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 mt-2"
                          >
                            <Field
                              name={`comboProducts.${index}.name`}
                              as={Input}
                              placeholder="Product Name"
                            />
                            <Field
                              name={`comboProducts.${index}.quantity`}
                              as={Input}
                              type="number"
                              placeholder="Quantity"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => remove(index)}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => push({ name: "", quantity: "" })}
                          className="mt-2"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Combo Product
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isMultipleVariant"
                    checked={values.isMultipleVariant}
                    onCheckedChange={(checked) =>
                      setFieldValue("isMultipleVariant", checked)
                    }
                  />
                  <Label htmlFor="isMultipleVariant">
                    Does this product have multiple variants?
                  </Label>
                </div>

                {values.isMultipleVariant && (
                  <FieldArray name="variants">
                    {({ push, remove }) => (
                      <div>
                        <Label>Variants</Label>
                        {values.variants.map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 mt-2"
                          >
                            <Field
                              name={`variants.${index}.name`}
                              as={Input}
                              placeholder="Variant Name"
                            />
                            <Field
                              name={`variants.${index}.price`}
                              as={Input}
                              type="number"
                              placeholder="Price"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => remove(index)}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => push({ name: "", price: "" })}
                          className="mt-2"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Variant
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  Create Product
                </Button>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
}
