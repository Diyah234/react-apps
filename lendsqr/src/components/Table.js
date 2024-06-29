import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { IoFilter, IoEyeOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiUserX } from "react-icons/fi";
import { TbUserCheck } from "react-icons/tb";
import ReactPaginate from 'react-paginate';
import './user.scss';

export const Table = ({ setDetails, setSelected, formatPhoneNumber }) => {
  const itemsPerPage = 10;
  const [users, setUsers] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fetch("https://6675fe00a8d2b4d072f21c20.mockapi.io/users")
      .then(res => res.json())
      .then(data => {
        const formattedData = formatData(data);
        setUsers(formattedData);
        setPageCount(Math.ceil(formattedData.length / itemsPerPage));
      });
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(users.slice(itemOffset, endOffset));
  }, [itemOffset, itemsPerPage, users]);

  const mapStatus = (status) => {
    const predefinedStatuses = ['Pending', 'Inactive', 'Blacklisted', 'Active'];
    return predefinedStatuses[Math.floor(Math.random() * predefinedStatuses.length)];
  };

  const formatData = (data) => {
    return data.map(user => ({
      ...user,
      status: mapStatus(user.status)
    }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'pending';
      case 'Inactive':
        return 'inactive';
      case 'Blacklisted':
        return 'blacklisted';
      case 'Active':
        return 'active';
      default:
        return '';
    }
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  const [show, setShow] = useState(false);
  const [minibox, setMinibox] = useState(false);
  const [boxid, setBoxid] = useState(null);
  const [top, setTop] = useState(35);
  const [selectedUser, setSelectedUser] = useState(null);

  function showing() {
    setShow(!show);
  }

  function showbox(user) {
    if (boxid !== user.id) {
      setMinibox(true);
      setBoxid(user.id);
      setSelected(user); // Store the selected user object
      setSelectedUser(user); // Store the selected user object for status updates
      if (user.id % 10 === 1) {
        setTop(35); // Reset top to initial value
      } else {
        setTop(prevTop => prevTop + 4); // Increment top value
      }
    } else {
      setMinibox(!minibox);
    }
  }

  const changeStatus = (newStatus) => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, status: newStatus } : user
      ));
      setSelectedUser({ ...selectedUser, status: newStatus }); // Update selectedUser state
      setMinibox(false); // Close the mini box
      setPageCount(Math.ceil(users.length / itemsPerPage)); // Recalculate page count
    }
  };

  return (
    <div className='tablebox'>
      <div className='table'>
        <div className='box'>
          <div className='row row1'>
            <div className='col'>ORGANIZATION<span onClick={showing}><IoFilter /></span></div>
            <div className='col'>USERNAME<span><IoFilter /></span></div>
            <div className='col'>EMAIL<span><IoFilter /></span></div>
            <div className='col'>PHONE NUMBER<span><IoFilter /></span></div>
            <div className='col'>DATE JOINED<span><IoFilter /></span></div>
            <div className='col'>STATUS<span><IoFilter /></span></div>
          </div>
          {currentItems.map((user, index) => (
            <div key={index} className='row row2'>
              <div className='col'>{user.organization}</div>
              <div className='col'>{user.username}</div>
              <div className='email'>{user.email}</div>
              <div className='col'>{formatPhoneNumber(user.phoneNo)}</div>
              <div className='col'>{format(new Date(user.createdAt), 'MMM dd, yyyy hh:mm aa')}</div>
              <div className={`col ${getStatusClass(user.status)}`}><p>{user.status}</p></div>
              <div className='dot' onClick={() => showbox(user)}><BsThreeDotsVertical /></div>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <div className={show ? "show" : "hide"}>
        <label>Organization</label><br />
        <select><option>select</option></select><br />
        <label>Username</label><br />
        <input type='text' placeholder='User'/><br />
        <label>Email</label><br />
        <input type='email' placeholder='Email' /><br />
        <label>Date</label><br />
        <input type='date' placeholder='Date' /><br />
        <label>Phone Number</label><br />
        <input type='text' placeholder='Phone Number' /><br />
        <label>Status</label><br />
        <select><option>select</option></select><br />
        <button className='reset'>Reset</button>
        <button className='filter'>Filter</button>
      </div>
      <div className={minibox ? "showminibox" : "hide"} style={{top: `${top}rem`}}>
        <div className='miniflex'><IoEyeOutline /><p onClick={() => setDetails(true)}>View Details</p></div>
        <div className='miniflex'><FiUserX /><p onClick={() => changeStatus("Blacklisted")}>Blacklisted User</p></div>
        <div className='miniflex'><TbUserCheck /><p onClick={() => changeStatus("Active")}>Active User</p></div>
      </div>
    </div>
  );
};
