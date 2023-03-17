import React from 'react'
import styled from 'styled-components'
import scrollreveal from 'scrollreveal'
import Navbar from '../Navbar/Navbar'
import DataTable from 'react-data-table-component'
import { useState } from 'react'
import { placeReset, getPlace, deletePlace } from '../../../redux/features/place/placeSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast,{Toaster} from 'react-hot-toast'
import { useEffect } from 'react'
import AddPlaceModal from '../AddNewContent/AddPlaceModal'
import Swal from "sweetalert2";





const AddPlace = () => {

  const [addPlace, setAddPlace] = useState(false)
  const {places, placeIsError, placeError, placeMessage } = useSelector((state) => state.places)
  const dispatch = useDispatch()

  useEffect(() => {
    if (placeIsError) {
      toast.error(placeError);
    }
    dispatch(getPlace());
  }, [placeIsError, placeError, dispatch, placeMessage]);


  useEffect(() => {
    return () => {
      dispatch(placeReset())
    }
  }, [])


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
           dispatch(deletePlace(row.id));
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
      name: "Place",
      selector: (row) => row.place,
      sortable:true
    },
    {
      name: 'Delete',
      cell : (row) => {
        return (
        <>
        <button onClick={() => handleDelete(row)}>Delete</button>
        </>
      )}
    }
  ]




  const rows = places.map((place, index) => {
    return {
      id: place._id,
      slNo: index + 1,
      place: place.place
    }
  })



  return (
    <div>
    <Section>
      <Navbar/>
      {addPlace ? (<AddPlaceModal stateChange={setAddPlace} />) : null}
      <div className="grid">
        <div className="row_one"></div>
  <DataTable title="Place List"
    columns={columns}
    data={rows}
    pagination 
    fixedHeader
    fixedHeaderScrollHeight='450px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    actions={<button onClick={() => setAddPlace(true)} className='btn btn-sm btn-info'>Add Place</button>}
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


export default AddPlace