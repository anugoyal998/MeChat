import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {authState} from "../atoms";
import { refreshToken } from "../http";
import Cookies from "js-cookie";

export const useLoadingWithRefresh = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useRecoilState(authState);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await refreshToken();
        setAuth((prev) => ({
          ...prev,
          user: {
            _id: data?.user?._id,
            name: data?.user?.name,
            email: data?.user?.email,
            avatar: data?.user?.avatar,
          },
        }));
        Cookies.set("at", data?.tokens?.at, { expires: 1 });
        Cookies.set("rt", data?.tokens?.rt, { expires: 7 });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);
  return { loading };
};
