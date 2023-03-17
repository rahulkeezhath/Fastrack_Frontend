import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../features/Auth/authSlice'
import adminAuthReducer from '../features/adminAuth/adminAuthSlice'
import adminUsersReducer from '../features/adminUsers/adminUsersSlice'
import placesReducer from '../features/place/placeSlice'
import brandsReducer from '../features/brands/brandSlice'
import adminCarReducer from '../features/cars/carSlice'
import userCarReducer from  '../features/users/cars/carSlice'
import userSingleCarReducer from '../features/users/cars/singleCar/singleCarSlice'
import userBookingCarReducer from '../features/users/booking/bookingSlice'
import adminBookingReducer from '../features/adminBooking/adminBookingSlice'
import driverReducer from '../features/driverAuth/driverAuthSlice'
import adminDriversReducer from '../features/adminDrivers/adminDriverSlice'


const authPersistConfig = {
  key: 'auth',
  storage,
}


const adminAuthPersistConfig = {
  key: 'adminAuth',
  storage,
}

const adminUsersPersistConfig = {
  key: 'adminUsers',
  storage,
}

const adminPlacePersistConfig = {
  key: 'places',
  storage
}

const adminBrandPersistConfig = {
  key: 'brands',
  storage
}

const adminCarPersistConfig = {
  key: 'car',
  storage
}

const userCarPersistConfig = {
   key: 'userCars',
   storage
}

const userSingleCarPersistConfig = {
  key: 'singleCar',
  storage
}

const userBookingCarPersistConfig = {
  key: 'booking',
  storage
}

const adminBookingPersistConfig = {
  key: 'adminBooking',
  storage
}

const driverAuthPersistConfig = {
  key: 'driverAuth',
  storage
}

const adminDriversPersistConfig = {
  key: 'adminDriver',
  storage
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedAdminAuthReducer = persistReducer(adminAuthPersistConfig, adminAuthReducer)
const persistedAdminUsersReducer = persistReducer(adminUsersPersistConfig, adminUsersReducer)
const persistedAdminPlacesReducer = persistReducer(adminPlacePersistConfig, placesReducer)
const persistedAdminBrandReducer =  persistReducer(adminBrandPersistConfig, brandsReducer)
const persistedAdminCarReducer = persistReducer(adminCarPersistConfig, adminCarReducer)
const persistedUserCarReducer = persistReducer(userCarPersistConfig, userCarReducer)
const persistedUserSingleCarReducer = persistReducer(userSingleCarPersistConfig,userSingleCarReducer)
const persistedUserBookingCarReducer = persistReducer(userBookingCarPersistConfig,userBookingCarReducer)
const persistedAdminBookingReducer = persistReducer(adminBookingPersistConfig,adminBookingReducer)
const persistedDriverAuthReducer = persistReducer(driverAuthPersistConfig,driverReducer)
const persistedAdminDriversReducer = persistReducer(adminDriversPersistConfig,adminDriversReducer)

const store = configureStore({
  reducer:{
    // Users
    auth:persistedAuthReducer,
    userCars:persistedUserCarReducer,
    singleCar:persistedUserSingleCarReducer,
    booking:persistedUserBookingCarReducer,
    
    // Admin
    adminAuth:persistedAdminAuthReducer,
    adminUsers:persistedAdminUsersReducer,
    places:persistedAdminPlacesReducer,
    brands: persistedAdminBrandReducer,
    car:persistedAdminCarReducer,
    adminBooking:persistedAdminBookingReducer,
    adminDriver:persistedAdminDriversReducer,
    
    // Driver
    driverAuth:persistedDriverAuthReducer
  }
})


export default store;