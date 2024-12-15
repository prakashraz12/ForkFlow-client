import { useLazyGetCategoryQuery } from "@/features/category/categoryApi";
import { CategoryResponse } from "@/types/categoryResponse.type";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetCategory = () => {
  const [productCategory, setProductCategory] = useState<CategoryResponse[]>(
    []
  );
  const category = useSelector((state: any) => state.category.category);
  const [fetchCategoryList] = useLazyGetCategoryQuery();

  const categoryFetcherHandler = useCallback(async () => {
    await fetchCategoryList(31);
  }, []);

  useEffect(() => {
      if (category?.length === 0) {
      categoryFetcherHandler();
    } else {
      setProductCategory(category);
    }
  }, [category?.length]);

  return { productCategory };
};

export default useGetCategory;
