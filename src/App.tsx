import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminRoute from './components/Auth/AdminRoute';
import ConsumerRoute from './components/Auth/ConsumerRoute';
import PublicRoute from './components/Auth/PublicRoute';
import Error from './components/Common/Error';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Orders from './components/Orders/Orders';
import Referrals from './components/Referrals/Referrals';
import Analytics from './components/Analytics/Analytics';
import MyProducts from './components/AdminProducts/MyProducts';
import SingleProduct from './components/Products/SingleProduct';

function App() {

  return (
    <div className=''>
      <Navbar/>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={
          <PublicRoute >
            <Login/>
          </PublicRoute>
        }/>
        {/* Signup route */}
        <Route path="/signup" element={
          <PublicRoute >
            <Signup/>
          </PublicRoute>
        }/>
        {/* Home Route */}
        <Route path="/" element={<Home />}/>
        {/* Products */}
        <Route path="/products" element={
          <ProtectedRoute >
            <ConsumerRoute>
              <Products/>
            </ConsumerRoute>
          </ProtectedRoute>
        }/>
        <Route path="/products/:productId" element={
          <ProtectedRoute >
            <ConsumerRoute>
              <SingleProduct/>
            </ConsumerRoute>
          </ProtectedRoute>
        }/>
        <Route path="/adminproducts/:productId" element={
          <ProtectedRoute >
            <AdminRoute>
              <SingleProduct admin/>
            </AdminRoute>
          </ProtectedRoute>
        }/>

        {/* MyProducts */}
        <Route path="/adminproducts" element={
          <ProtectedRoute >
            <AdminRoute>
              <MyProducts/>
            </AdminRoute>
          </ProtectedRoute>
        }/>
        {/* Analytics */}
        <Route path="/analytics" element={
          <ProtectedRoute >
            <AdminRoute>
              <Analytics/>
            </AdminRoute>
          </ProtectedRoute>
        }/>
        {/* Referrals */}
        <Route path="/referrals" element={
          <ProtectedRoute >
            <ConsumerRoute>
              <Referrals/>
            </ConsumerRoute>
          </ProtectedRoute>
        }/>        
        <Route path="/admin" element={
          <ProtectedRoute >
            <ConsumerRoute>
              <Orders/>
            </ConsumerRoute>
          </ProtectedRoute>
        }/>

        {/* Error route */}
        <Route path='*' element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;
