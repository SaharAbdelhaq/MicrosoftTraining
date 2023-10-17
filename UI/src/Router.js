import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import GuardLogin from "./GuardLogin";
import GuardNotLoggedin from "./GuardNotLoggedin";
import Layout from "./pages/Layout";

import Rating from "./components/RatingAndComment/Rating";
import ProductOverviewUser from "./pages/ProductOverviewUser";
import ProductOverviewBusiness from "./pages/ProductOverviewBusiness";
import ProductSearchResults from "./pages/SearchResults";
import Form from "./components/LogIn_SignUp_Form/Form";
import Favorites from "./components/FavoriteProducts/favorite";
import SideBar from "./components/Sidebar/Sidebar";
import EditProductForm from "./components/EditProduct/editproductForm";
import Tobuy from "./components/ProductsForUser/Tobuy";
import BOproducts from "./components/ProductsforBusinessOwner/BOproducts";
import AddProductForm from "./components/addProductForm/addProductForm";
import Top from "./components/Home/Top";
import Businessowners from "./components/Businessowners/Businessowners";
import UsersReports from "./components/Reports/Reports";
import Reports from "./components/Reports/Reports";
import MainSection from "./components/Dashboard/content";
import Popup from "./components/ReportBtn/reportBtn";
import ContactForm from "./components/ReportFormN/contactForm";
import Sidebar from "./components/Sidebar/Sidebar";
import Specific from "./components/SpecificReport/Specific";
import Chats_Omar from "./components/Chats_Omar";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <GuardLogin>
              <Form />
            </GuardLogin>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route
            path="/SideBar"
            element={
              <GuardNotLoggedin>
                <Sidebar />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="Rating"
            element={
              <GuardNotLoggedin>
                <Rating />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/Reports"
            element={
              <GuardNotLoggedin>
                <Reports />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/product/newProduct"
            element={
              <GuardNotLoggedin>
                <AddProductForm />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/EditProductForm/:id"
            element={
              <GuardNotLoggedin>
                <EditProductForm />
              </GuardNotLoggedin>
            }
          />

          <Route
            exact
            path="/Businessowners"
            element={
              <GuardNotLoggedin>
                <Businessowners />
              </GuardNotLoggedin>
            }
          />
          <Route
            exact
            path="/businessOwner/products/:name"
            element={
              <GuardNotLoggedin>
                <BOproducts />
              </GuardNotLoggedin>
            }
          />
          <Route
            exact
            path="/user/products/:name"
            element={
              <GuardNotLoggedin>
                <Tobuy />
              </GuardNotLoggedin>
            }
          />
          <Route
            exact
            path="/admin/report/:id"
            element={
              <GuardNotLoggedin>
                <Specific />
              </GuardNotLoggedin>
            }
          />
          <Route
            exact
            path="/Tobuy"
            element={
              <GuardNotLoggedin>
                <Tobuy />
              </GuardNotLoggedin>
            }
          />
          <Route
            exact
            path="/BOproducts"
            element={
              <GuardNotLoggedin>
                <BOproducts />
              </GuardNotLoggedin>
            }
          />
          <Route
            exact
            path="/Chats_Omar"
            element={
              <GuardNotLoggedin>
                <Chats_Omar />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/user/favorite/add/:id"
            element={
              <GuardNotLoggedin>
                <Favorites />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/user/favorite/remove/:id"
            element={
              <GuardNotLoggedin>
                <Favorites />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/product/:id"
            element={
              <GuardNotLoggedin>
                  <ProductOverviewUser />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/BOproduct/:id"
            element={
              <GuardNotLoggedin>
                <ProductOverviewBusiness />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/product/:id"
            element={
              <GuardNotLoggedin>
                <ProductOverviewUser />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/Popup"
            element={
              <GuardNotLoggedin>
                <Popup />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/ContactForm"
            element={
              <GuardNotLoggedin>
                <ContactForm />
              </GuardNotLoggedin>
            }
          />

          <Route
            path="/AddProductForm"
            element={
              <GuardNotLoggedin>
                <AddProductForm />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/Favorites"
            element={
              <GuardNotLoggedin>
                <Favorites />
              </GuardNotLoggedin>
            }
          />
          {/* dashboard */}
          <Route
            path="/MainSection"
            element={
              <GuardNotLoggedin>
                <MainSection />
              </GuardNotLoggedin>
            }
          />
          {/* Business owner products */}
          <Route
            path="Products"
            element={
              <GuardNotLoggedin>
                <BOproducts />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="Home"
            element={
              <GuardNotLoggedin>
                <Top />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="Top"
            element={
              <GuardNotLoggedin>
                <Top />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="Results"
            element={
              <GuardNotLoggedin>
                <ProductSearchResults />
              </GuardNotLoggedin>
            }
          />
          <Route
            path="/Form"
            element={
              <GuardNotLoggedin>
                <Form />
              </GuardNotLoggedin>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
