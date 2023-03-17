import React from "react";
import styled from "styled-components";
import scrollreveal from "scrollreveal";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { allUsers,blockAndUnblockUser, reset} from "../../../redux/features/adminUsers/adminUsersSlice";
import Spinner from "../../Spinner/Spinner";

const UsersContent = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isSuccess, isError, message, error } = useSelector(
    (state) => state.adminUsers
  );
  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
    if (isSuccess) {
      toast.success(message.message);
    }
    dispatch(allUsers());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, message, isError]);

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

  const columns = [
    {
      name: "Sl.No",
      selector: (row) => row.slNo,
      sortable: true,
    },
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "PhoneNumber",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
         name: "Action",
         cell: (row) => {
          return(
         <>
         <button  onClick={() =>  dispatch(blockAndUnblockUser(row.id)) } className={row.isBlocked ? 'unBlock_btn' : 'block_btn'}>{row.isBlocked ? <i className="ri-user-follow-fill"></i> :  <i className="ri-user-unfollow-fill"></i>}</button>
          </>
    )}
     }
  ];

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const rows = users.map((user, index) => {
    return {
      id: user._id,
      slNo: index + 1,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isBlocked: user.isBlocked,
    };
  });

  return (
    <div>
      <Section>
        <Navbar />
        <div className="grid">
          <div className="row__one"></div>
          <DataTable
            title="Users List"
            columns={columns}
            data={rows}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            subHeader
          />
        </div>
      </Section>
      <Toaster />
    </div>
  );
};

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row_one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row_two {
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

export default UsersContent;
