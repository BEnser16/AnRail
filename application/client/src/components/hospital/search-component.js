import { MDBInputGroup , MDBBtn } from 'mdb-react-ui-kit'
import React from 'react'


const SearchComponent = (props) => {
  let {search , setSearch} = props;
  const inputSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSearchInfo = () => {
    console.log(editTime);
    infoService.get(search).then((data) => {
      console.log(data);
      setInfoData(data.data);
    }).catch((error) => {
      console.log(error);
    })
  }
  
  return (
    <div>
       <h4 className='mb-3 ms-1'>病歷查詢</h4>
        <MDBInputGroup className='mb-5'>
          <input className='form-control' placeholder="Search Pet-ID" type='text' onChange={inputSearch} />
          <MDBBtn onClick={handleSearchInfo}>Search</MDBBtn>
        </MDBInputGroup>
    </div>
  )
}

export default SearchComponent
