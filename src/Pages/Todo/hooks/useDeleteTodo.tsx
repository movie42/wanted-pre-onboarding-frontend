import { useEffect, useState } from "react";
import { deleteData } from "@/lib/api/api";
import { useLocalStorage } from "@/lib/hooks";
import { LOCAL_STORAGE_KEY } from "@/lib/Immutable";

const useDeleteTodo = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<{
    statusCode?: number;
    message?: string;
  } | null>(null);
  const { getLocalStorage } = useLocalStorage();

  const handleDelete = async (id: number) => {
    setIsSuccess(null);

    const { token } = getLocalStorage(LOCAL_STORAGE_KEY);

    if (token) {
      const response = await deleteData({ url: `/todos/${id}`, token });

      if (response.status === 204) {
        setIsSuccess(true);
        setIsError(false);
        return;
      }

      setIsError(true);
      setError({
        statusCode: response.status,
        message: "삭제에 실패하였습니다."
      });
    }
  };

  return { handleDelete, isSuccess, error, isError };
};

export default useDeleteTodo;
