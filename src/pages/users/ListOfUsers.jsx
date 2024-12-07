import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../utils/config.js";
import { useDispatch } from "react-redux";
import { setlistOfUsers } from "../../redux/userSlice.js";
import ListOfUser from "./ListOfUser";
import { useSelector } from "react-redux";

function ListOfUsers() {
  const { listOfUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchListOfUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/user`);
        console.log("res", res);
        dispatch(setlistOfUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchListOfUsers();
  }, [dispatch]);

  if (!listOfUsers) return;
  return (
    <div className="overflow-auto flex-1">
      {listOfUsers?.map((user) => {
        return <ListOfUser key={user?._id} user={user} />;
      })}
    </div>
  );
}

export default ListOfUsers;
