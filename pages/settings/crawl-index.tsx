import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { FaSave, FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import axios from 'axios';

const AddScript = () => {
  const alert = useAlert();
  const [state,setState]=useState([]);
  //
  const addHandler=()=>{
    setState([...state,{url:''}])
  };
  //
  const onChangeHandler = index => e => {
    state[index].url=e.target.value;
    setState([...state])
  };
  //
  const deleteHandler = async (index: number) => {
    let _state=state.filter((url,i)=>i!=index);
    setState([..._state])
  };
  //
  const saveHandler = async (id: string) => {
    if(state && state.length){
      let data_array=state.filter((item)=>item && item.url)
      if(data_array){
        axios
          .post('https://nobarun.xyz/crawl-index', data_array)
          .then(res => {
            setState([]);
            console.log('res', res.data);
            alert.success('Crawl Successfully');
          })
          .catch(err => {
            console.log('error in request', err.message);
            alert.error(err.message);
          });
      }
    }
  };

  return (
    <div className="container center">
      <div className="flex sb">
        <h1 className="heading-primary mt-40 mb-40">Crawl Index</h1>
        <div style={{'display':'flex'}}>
          <button
            type="button"
            className="btn-outline-green mr-20"
            onClick={addHandler}>
            <FaPlusCircle className="btn-icon-small" />
            Add Url
          </button>
          {
            state && state.length?
              <button
                type="button"
                className="btn-outline-red mr-20"
                onClick={saveHandler}>
                Update
              </button>
            :
              null
          }
        </div>
      </div>
      {state.map((item,index) => (
        <div className="wrapper-section" style={{'marginTop': '1rem','display':'flex'}} key={index+1}>
          <input
            style={{'width':'100%'}}
            className="custom-input"
            type="text"
            value={item.url}
            onChange={onChangeHandler(index)}
          />
          <button
            type="button"
            className="btn-outline-red mr-20"
            onClick={()=>deleteHandler(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default AddScript;
