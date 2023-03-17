import React, {useEffect} from 'react'
import styled from 'styled-components'
import scrollReveal from 'scrollreveal'
import DataTable from 'react-data-table-component'
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDrivers, reset, approveDriver, declineDriver, blockAndUnblockDriver  } from '../../../redux/features/adminDrivers/adminDriverSlice'
import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
import Spinner from '../../Spinner/Spinner'
import toast,{Toaster} from 'react-hot-toast'
import Swal from "sweetalert2";


const DriversContent = () => {
    const dispatch = useDispatch()
    const { drivers, isLoading, isSuccess, isError, message, error } = useSelector((state) => state.adminDriver)

    useEffect(()=> {
        if(isError) {
            toast.error(error)
        }
        if(isSuccess) {
            toast.success(message.message)
        }
        dispatch(getAllDrivers())
        return () => {
            dispatch(reset())
        }
    }, [dispatch, message, isError])


    useEffect(() => {
        const sr = scrollReveal({
          origin: "bottom",
          distance: "80px",
          duration: 2000,
          reset: false,
        });
        
        sr.reveal(
          `
          nav,
          .row_one,
          .row_two
          `,
          {
            opacity: 0,
            interval: 300,
          }
          );
        }, []);


        const pendingDrivers = drivers.filter((value) => {
            return !value.isApproved
        })

        const allDrivers = drivers.filter((value) => {
            return value.isApproved
        })

         
    const handleApprove = (row) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, approve it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Approved!",
            "The Driver has been Approved.",
            "success"
          );
            dispatch(approveDriver(row.id))
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your file is safe :)",
            "error"
          );
        }
      });
    }

     const handleDecline = (row) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, decline it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Declined!",
            "The Driver has been Declined.",
            "success"
          );
            dispatch(declineDriver(row.id))
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your file is safe :)",
            "error"
          );
        }
      });
    }
        const columns = [
            {
              name: "Id",
              selector: (row) => row.id,
              sortable:true,
              width:"200px"
            },
            {
              name: "Sl.No",
              selector: (row) => row.slNo,
              sortable:true
            },
            {
              name: "Name",
              selector: (row) => row.name,
              sortable:true
            },
            {
              name: "Email",
              selector: (row) => row.email,
              sortable:true,
              width:'200px'
            },
            {
              name: "Phone Number",
              selector: (row) => row.phoneNumber,
              sortable:true
            },
            {
              name: "Profile Photo",
              cell: (row) => (
                <img
                src={row.profilePhoto}
                width={100}
                alt='ProfilePic'
                />
              )
            },
            {
                name: "Licence Front",
                cell: (row) => (
                  <img
                  src={row.licenceFront}
                  width={100}
                  alt='Licence Front'
                  />
                )
              },
              {
                name: "Licence Rear",
                cell: (row) => (
                  <img
                  src={row.licenceRear}
                  width={100}
                  alt='Licence Rear'
                  />
                )
              },
            {
              name: "Action",
              cell: (row) => {
                return (
                <>
                <button onClick={() => handleApprove(row)} className='btn btn-success'><FcApprove/></button>
                <button onClick={() => handleDecline(row)} className='btn btn-danger'><FcDisapprove/></button>
                </>
              )}
            }
          ]

          const rows = pendingDrivers.map((driver, index) => {
            return {
                id: driver._id,
                slNo: index + 1,
                name: driver.name,
                email: driver.email,
                phoneNumber: driver.phoneNumber,
                profilePhoto: driver.profilePhoto,
                licenceFront: driver.driverLicenceFront,
                licenceRear: driver.drivingLicenceRear,
                isApproved: driver.isApproved
            }
          })


          const columns1 = [
            {
              name: "Id",
              selector: (row) => row.id,
              sortable:true
            },
            {
              name: "Sl.No",
              selector: (row) => row.slNo,
              sortable:true
            },
            {
              name: "Name",
              selector: (row) => row.name,
              sortable:true
            },
            {
              name: "Email",
              selector: (row) => row.email,
              sortable:true
            },
            {
              name: "Phone Number",
              selector: (row) => row.phoneNumber,
              sortable:true
            },
            {
              name: "Profile Photo",
              cell: (row) => (
                <img
                src={row.profilePhoto}
                width={100}
                alt='ProfilePic'
                />
              )
            },
            {
                name: "Licence Front",
                cell: (row) => (
                  <img
                  src={row.licenceFront}
                  width={100}
                  alt='Licence Front'
                  />
                )
              },
              {
                name: "Licence Rear",
                cell: (row) => (
                  <img
                  src={row.licenceRear}
                  width={100}
                  alt='Licence Rear'
                  />
                )
              },
            {
              name: "Action",
              cell: (row) => {
                return(
                <>
                <button  onClick={() =>  dispatch(blockAndUnblockDriver(row.id)) } className={row.isBlocked ? 'unBlock_btn' : 'block_btn'}>{row.isBlocked ? <i className="ri-user-follow-fill"></i> :  <i className="ri-user-unfollow-fill"></i>}</button>
                </>
              )}
            }                                                          
          ]

          const rows1 = allDrivers.map((driver, index) => {
            return {
                id: driver._id,
                slNo: index + 1,
                name: driver.name,
                email: driver.email,
                phoneNumber: driver.phoneNumber,
                profilePhoto: driver.profilePhoto,
                licenceFront: driver.driverLicenceFront,
                licenceRear: driver.drivingLicenceRear,
                isBlocked: driver.isBlocked
            }
          })

          if(isLoading) {
            return (<><Spinner/></>)
          }

          
  return (
    <div>
    <Section>
      <Navbar/>
      <div className="grid">
        <div className="row__one"></div>
  <DataTable title=" Pending Drivers List"
    columns={columns}
    data={rows}
    pagination 
    fixedHeader
    fixedHeaderScrollHeight='450px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    subHeader
    />
     <DataTable title=" All Drivers List"
    columns={columns1}
    data={rows1}
    pagination 
    fixedHeader
    fixedHeaderScrollHeight='450px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    subHeader
    />
    </div>
    </Section>
    <Toaster />
    </div>
  )
}





const Section = styled.section`
margin-left: 18vw;
padding: 2rem;
height: 100%;
.grid{
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  margin-top: 2rem;
  .row_one{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 50%;
    gap: 1rem;
  }
  .row_two{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 50%;
    gap: 1rem;
  }
}
@media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;


export default DriversContent