import RootLayout from "./pages/Root/RootLayout.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

import Home from "./pages/FrontPage/Home.js";
import InfoPage  from "./pages/InfoPage/InfoPage.js";
import ScheduleEstimate from "./pages/RequestEstimate/ScheduleEstimate.js";
// import PastWork from "./pages/imageGallery/PastWork.js";
import WriteAReview from "./pages/WriteReviews/WriteAReview.js";

const router= createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: 'root',
    children:[
      {index: true, element: <Home />},
      {
        path: "/info",
        element: <InfoPage />
      },
      {
        path: "/schedule",
        element: <ScheduleEstimate />
      },
      {
        path: "/reviews",
        element: <WriteAReview />
      }
      // add pages here
      //example
      // { index: true, element: <HomePage /> },
      // {
      //   path: "/servers",
      //   element: <Servers />,
      // },
    ]
  }
])


function App() {
  // const dispatch=useDispatch();
  // useEffect(() => {
    
  // }, [dispatch]);
  return (
      <RouterProvider router={router} />
  );
}

export default App;
