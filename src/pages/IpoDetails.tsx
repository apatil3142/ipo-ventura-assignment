import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getIPODetails } from '../apiConfigs/api';

const IpoDetails = () => {
  const {ipoId} = useParams()

  useEffect(() => {
    if(ipoId){
      const IPODetails = getIPODetails(ipoId);
      console.log(IPODetails, 'IPODetails')
    }
  },[ipoId]);

  return (
    <div>IpoDetails</div>
  )
}

export default IpoDetails