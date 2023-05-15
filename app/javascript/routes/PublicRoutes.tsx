import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from 'domains/Homepage'
import Recipes from 'domains/Recipes'
import Toppings from 'domains/Toppings'

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/toppings" element={<Toppings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default PublicRoutes
