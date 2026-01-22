import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import ForgotPassword from "./components/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./components/home";
import Nav from "./components/Nav";
import useGetCity from "./hooks/useGetCity";
import { ClipLoader } from "react-spinners";
// import useGetMyShop from "./hooks/useGetMyShop";
import CreateEditShop from "./components/CreateEditShop";
import AddItems from "./components/AddItems";
import EditItems from "./components/EditItems";
import useGetShopsByCity from "./hooks/useGetShopsByCity";
import useGetMyShop from "./hooks/useGetMyShop";
import useGetItemsByCity from "./hooks/useGetItemsByCity";
import CartPage from "./components/CartPage";
import Checkout from "./components/Checkout";
import OrderPlaced from "./components/OrderPlaced";
import MyOrders from "./components/MyOrders";
import useGetMyOrders from "./hooks/useGetMyOrders";
import useUpdateLocation from "./hooks/useUpdateLocation";
// export const severUrl = "http://localhost:8000";
export default function App() {
  useGetCurrentUser();
  useGetCity()
  useGetMyShop()
  useGetShopsByCity()
  useGetItemsByCity()
  useGetMyOrders()
  useUpdateLocation()
  // useGetMyShop()
  const { userData, authChecked } = useSelector(state => state.user)

  if (!authChecked) {
    return <div className="flex items-center justify-center min-h-screen">
      {<ClipLoader size={40} color="#000000" loading={true} />}

    </div>
  }
  // console.log("current user",user)
  return (
    <div>

      {/* <Nav/> */}
      <Routes>
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/signin/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to="/" />} />

        <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/create-edit-shop" element={userData ? <CreateEditShop /> : <Navigate to="/signin" />} />
        <Route path="/add-item" element={userData ? <AddItems /> : <Navigate to="/signin" />} />
        <Route path="/edit-item/:itemId" element={userData ? <EditItems /> : <Navigate to="/signin" />} />
        <Route path="/cart" element={userData ? <CartPage /> : <Navigate to="/signin" />} />
        <Route path="/checkout" element={userData ? <Checkout /> : <Navigate to="/signin" />} />
        <Route path="/order-placed" element={userData ? <OrderPlaced/> : <Navigate to="/signin" />} />
          <Route path="/my-orders" element={userData ? <MyOrders/> : <Navigate to="/signin" />} />
      </Routes>

    </div>
  )
}