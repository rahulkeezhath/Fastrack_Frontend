import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import scrollreveal from 'scrollreveal'
import DataTable from 'react-data-table-component'
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { reset, getCars, deleteCar, blockAndUnblockCar} from '../../../redux/features/cars/carSlice'
import toast, { Toaster } from "react-hot-toast";
import Spinner from '../../Spinner/Spinner'
import AddCar from '../Add Car/AddCar'
import Swal from "sweetalert2";

const CarsContent = () => {

    const [addCarModal, setAddCarModal ] = useState(false)
    const { isLoading, isSuccess, isError, message, car } = useSelector((state) => state.car)
    const dispatch = useDispatch()


    useEffect(() => {
      if(isError) {
        toast.error(message)
      }
      dispatch(getCars())

      return () => {
        dispatch(reset())
      }
    }, [isError, isSuccess, dispatch])

    useEffect(() => {
        const sr = scrollreveal({
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
        

        
    const handleDelete = (row) => {
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
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
           dispatch(deleteCar(row.id));
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
            name: "Rent / hr",
            selector: (row) => row.rent,
            sortable:true
          },
          {
            name: "Body",
            selector: (row) => row.body,
            sortable:true
          },
          {
            name: "Place",
            selector: (row) => row.place,
            sortable:true
          },
          {
            name: "Model",
            selector: (row) => row.model,
            sortable:true
          },
          {
            name: "Transmission",
            selector: (row) => row.transmission,
            sortable:true
          },
          {
            name: "Fuel",
            selector: (row) => row.fuel,
            sortable:true
          },
          {
            name: "Brand",
            selector: (row) => row.brand,
            sortable:true
          },
          {
            name: "Description",
            selector: (row) => row.description,
            sortable:true
          },
          {
            name: "Image",
            cell: (row) => (
              <img
              src={row.image}
              width={100}
              alt='Player'
            />
            )
            
          },
          {
            name: "Action",
            cell: (row) => (
              <>
              <button onClick={() => handleDelete(row)} className='m-1'>Delete</button>
              <button  onClick={() =>  dispatch(blockAndUnblockCar(row.id)) } className={row.isBlocked ? 'unBlock_btn' : 'block_btn'}>{row.isBlocked ? <i className="ri-user-follow-fill"></i> :  <i className="ri-user-unfollow-fill"></i>}</button>
              </>
            )
          }
        ]
        
        
        const rows = car.map((car, index) => {
          return {
            id: car._id,
            slNo: index +1,
            name: car.name,
            rent: car.rent,
            body: car.body,
            place: car.place,
            model: car.model,
            transmission: car.transmission,
            fuel: car.fuel,
            brand: car.brand,
            description: car.description,
            image: car.image,
            isBlocked: car.isBlocked
          }
        })
    

        if (isLoading) {
          return (<><Spinner/></>)
        }
    
        return (
          <div>
          <Section>
            <Navbar/>
            { addCarModal ? (<AddCar type={'Add'} stateChange={setAddCarModal} />) : null }
            <div className="grid">
              <div className="row__one"></div>
        <DataTable title="Cars List"
          columns={columns}
          data={rows}
          pagination 
          fixedHeader
          fixedHeaderScrollHeight='450px'
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          actions={<button style={{backgroundColor:"#0dcaf0",color:'black'}} onClick={() => setAddCarModal(!addCarModal)}>Add Car</button>}
          subHeader
          />
          </div>
          </Section>
          <Toaster/>
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
    

export default CarsContent