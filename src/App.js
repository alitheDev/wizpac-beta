import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './Components/MainComponent';
import axios from 'axios'
import ScrollToTop from './Components/Atoms/ScrollToTop'

function App() {

  useEffect(() => {
    const storedStates = ['Outstanding', 'Inprocess', 'UnFinished', 'Initial', 'InMNA', 'InCob', 'InICU', 'InRIP'
      , 'Withdraw', 'Sector', 'Inst', 'InstP', 'AddressBook', 'PvtRatings', 'OtherCRA', 'Policy', 'GoneBook', "DeadlineRc", "DissInProcess", "DoneDiss", "DeadlineDiss"
      , 'InHandBook', 'quick_Outstanding', 'quick_Inprocess', 'quick_UnFinished', 'quick_Initial', 'quick_InMNA', 'quick_InCob', 'quick_InICU', 'quick_InRIP'
      , 'quick_Withdraw', 'quick_Sector', 'quick_Inst', 'quick_InstP', 'quick_AddressBook', 'quick_PvtRatings', 'quick_OtherCRA', 'quick_Policy', 'quick_GoneBook'
      , 'quick_InHandBook', "quick_DeadlineDiss", "quick_DoneDiss", "quick_DissInProcess", "quick_DeadlineRc", "DoneRc", "quick_DoneRc", "DoneIc", "quick_DoneIc"
      , "DoneFc", "quick_DoneFc","DeadlineIc","DeadlineFc","quick_DeadlineIc","quick_DeadlineFc",'Research','quick_Research']

    for (let i in storedStates) {
      localStorage.removeItem(storedStates[i])
    }
  }, [])


  axios.defaults.headers =
  {
    'x-auth-token': localStorage.getItem('x-auth-token')
  }


  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data



    return response;
  }, function (error) {
    if (error.message.includes('401')) {
      if (!error.response.data.message.includes('Email not verified')) {


        localStorage.clear();
        window.location.href = '/';
      }
    }


    if (error.response.data.message === 'Not found') {


      // setModalother(true)
      // setMessage('Sorry The Request Can not be Fullfilled Now')

    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainComponent />
    </BrowserRouter>
  );
}

export default App;
