import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useEditUserMutation,useDeleteUserMutation } from '../slices/adminApiSlice'
import { setCredentials } from '../slices/authAdminSlice'


const Usertable = () => {
    const dispatch = useDispatch();

    const UserInfo=useSelector((state)=>state.authAdmin)
    const detailsObj=UserInfo.adminInfo
    const userdetails=Object.values(detailsObj);

    const [editedUserId, setEditedUserId] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

   const[deleteUser]=useDeleteUserMutation();
   const[editUser]=useEditUserMutation();

    const handleDeleteUser =async (userId) => {
        const res=await deleteUser(userId).unwrap()
          dispatch(setCredentials(res));
        
      };

      const handleEditUser = async(userId, updatedUserData) => {
        console.log(userId);
        
        const res = await editUser({id: userId,
            name: updatedUserData.name, // Assuming name is a property in updatedUserData
            email: updatedUserData.email}).unwrap();
        console.log('ress',res);
        dispatch(setCredentials(res));

          setEditedUserId(null);
          setEditedUserData({});
          
    
      };

    return (
    <div className='container'>
        <h2>All Users Details</h2>
        <input
            className="mx-96"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <br></br>
          <Link to={'/createuser'} className='btn btn-success my-3'>Create +</Link>
        <table className='table'>
            <thead>
                <tr>
                    {/* <th>ID</th> */}
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>


                </tr>
            </thead>
             <tbody>
             {userdetails
              ?.filter(user =>
                `${user.name} ${user.email}`
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
                .map((user,index)=>(
                    <tr key={index}>
    {/* <td> {user._id}</td> */}
    
 <td>  {editedUserId === user._id ? (
                      <input
                        type="text"
                        defaultValue={editedUserData.name || user.name}
                        onChange={e =>
                          setEditedUserData({
                            ...editedUserData,
                            name: e.target.value,
                          })
                        }  />
                        ) : (
                          user.name
                        )}
                        </td>


    <td>  {editedUserId === user._id ? (
                      <input
                        type="email"
                        defaultValue={editedUserData.email || user.email}
                        onChange={e =>
                          setEditedUserData({
                            ...editedUserData,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.email
                    )}</td>



<td>
{editedUserId === user._id ? (
    <button className='btn btn-sm btn-primary'
     onClick={() => handleEditUser(user._id, editedUserData)}>save</button>)
     :
    ( <>
    <button className='btn btn-sm btn-primary'
     onClick={() => setEditedUserId(user._id)}
    //  disabled={userInfo._id === user._id}
     >edit</button>


    <button className='btn btn-sm btn-danger ms-2'
    onClick={() => handleDeleteUser(user._id)}
    // disabled={userInfo._id === user._id}
    >Delete</button>
    </>
    )}

</td>

                         
                    </tr>
                ))}
            </tbody> 

        </table>
        

    </div>
  )
}

export default Usertable