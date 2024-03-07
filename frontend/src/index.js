import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from './store';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PrivateRoute from './components/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
const Router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route path='/' index={true} element={<HomeScreen/>}/>
    <Route path='/product/:id' element={<ProductScreen/>}/>
    <Route path='/cart' element={<CartScreen/>}/>
    <Route path='/login' element={<LoginScreen/>}/>
    <Route path='/register' element={<RegisterScreen/>}/>
    <Route path='' element={<PrivateRoute/>}>
    <Route path='/shipping' element={<ShippingScreen/>}/>
    <Route path='/payment' element={<PaymentScreen/>}/>
    </Route>
  </Route>
))
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={Router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
