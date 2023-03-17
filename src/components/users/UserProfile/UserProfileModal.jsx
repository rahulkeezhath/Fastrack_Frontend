import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux'
import toast, {Toaster} from 'react-hot-toast'
import axiosInstance from '../../../../utils/axiosInstance'
import { reset } from '../../../redux/features/auth/authSlice';



const UserProfileModal = ({userDetails}) => {
 

  const [show, setShow] = useState(false);

  

  const dispatch = useDispatch()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



 

  const [userData, setUserData] = useState(userDetails);


    var data_id = userDetails._id;
    const getUserDetails =async() => {
    await axiosInstance.get('/users/getUser/'+ data_id).then((datas) => {
      dispatch(reset(datas.data))
      setUserData(datas.data)
    })
    }

    useEffect(() => {
      getUserDetails()
    }, [])


    const id = userDetails._id;

    const handleSubmit = async (e) => {
      e.preventDefault();
      toast.success("Profile Updated")

      try { 
          const updateData = { ...userData, id}
          await axiosInstance.put('/users/updateUser/',updateData).then(async(res) => {
          await axiosInstance.get('/users/getUser/' + data_id).then((datas) => {
            dispatch(reset(datas.data))
            setUserData(datas.data)
          })
        })
      } catch (error) {
        console.log("error",error);
      }
    }
      
      return (
        <>
      <Button variant="primary" onClick={handleShow}>
        Edit Profile
      </Button>


      <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name='fullName'
                type='text'
                placeholder="Update Name"
                value={userData.fullName}
                onChange={(e)=>setUserData({...userData,fullName:e.target.value})}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='email'
                type="email"
                placeholder="Update Email"
                value={userData.email}
                onChange={(e)=>setUserData({...userData,email:e.target.value})}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name='phoneNumber'
                type="number"
                placeholder="Update Phone Number"
                value={userData.phoneNumber}
                onChange={(e)=>setUserData({...userData,phoneNumber:e.target.value})}
                autoFocus
              />
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type='submit'className="btn btn-primary">Save Changes</button>
        </Modal.Footer>
        <Toaster/>
        </form>
      </Modal>
    </>
      )
    } 

export default UserProfileModal
