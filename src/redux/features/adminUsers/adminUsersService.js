import axiosInstance from "../../../../utils/axiosInstance"


// Get Users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }  
    const response = await axiosInstance.get('/admin/users', config)
    return response.data
}


const blockAndUnblockUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.put(
    "/admin/blockAndUnblockUser",
    { id: id },
    config
  );
  return response.data;
};



const adminUsersService = {
    getUsers,
    blockAndUnblockUser
}
export default adminUsersService