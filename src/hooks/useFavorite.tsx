import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../services/store";
import { useEffect, useState } from "react";
import { addFavorite, deleteFromFavorite } from "../services/slices/userSlice";
import { changeFavoriteList } from "../utils/auth";

export const useFavorite = (id: string | undefined) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuth } = useSelector((state) => state.user);
    const [inFavorite, setInFavorite] = useState(false);
  
    useEffect(() => {
      if (user?.favorites && isAuth && id) {
        setInFavorite(user.favorites.includes(id));
      } else {
        setInFavorite(false);
      }
    }, [user, isAuth, id]);
  
    const addInFavorite = () => {
      if (user?.name && isAuth && id) {
        if (inFavorite) {
          setInFavorite(false);
          dispatch(deleteFromFavorite(id));
          changeFavoriteList(user.name, id, false);
        } else {
          setInFavorite(true);
          dispatch(addFavorite(id));
          changeFavoriteList(user.name, id, true);
        }
      } else {
        navigate('/login');
      }
    };
  
    return { inFavorite, addInFavorite };
  };