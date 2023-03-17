import React from 'react'
import styled from 'styled-components'
import { BiSearch } from 'react-icons/bi'

const Navbar = () => {
  return<Nav>
    <div className="title">
      <h4 style={{color:'black'}}>Hi Rahul,</h4>
      <h2 style={{color:'black'}}>Welcome to <span>Fastrack</span></h2>
    </div>
    <div className="search">
      <BiSearch />
      <input type="text" placeholder='Search' />
    </div>
  </Nav>
}

const Nav = styled.nav`
display: flex;
justify-content: space-between;
color: white;
.title{
  h2{
    span{
      margin-left: 0.5rem;
      color: #F9A826;
      letter-spacing: 0.2rem;
      font-family: 'Permanent Marker', cursive;
    }
  }
}
.search{
  background-color: #212121;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 8rem 1rem 1rem;
  border-radius: 1rem;
  svg{
    color: #F9A826;
  }
  input{
    background-color: transparent;
    border: none;
    color: #F9A826;
    font-family: 'Permanent Marker', cursive;
    letter-spacing: 0.3rem;
    &::placeholder{
      color: #F9A826;
    }
    &:focus{
      outline: none;
    }
  }
}
@media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;
          margin: 1rem 0;
        }
      }
    }
  }
`;

export default Navbar
