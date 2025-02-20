import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { fetchProducts } from './store/ProductSlice.jsx'
import { fetchLatestCollections } from './store/latestCollectionSlice.jsx'
import { fetchTodayRate } from './store/todayRateSlice.jsx'
import { fetchFrontBanners } from './store/frontBannerSlice.jsx'

store.dispatch(fetchFrontBanners());
store.dispatch(fetchProducts());
store.dispatch(fetchLatestCollections());
store.dispatch(fetchTodayRate());
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
)
