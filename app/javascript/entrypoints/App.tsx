import { SliderProvider } from 'components/SliderContext'
import PublicRoutes from 'routes/PublicRoutes'

export default function App() {
  return (
    <div className="h-full w-full">
      <div className="py-6 sm:px-12 px-2">
        <SliderProvider>
          <PublicRoutes />
        </SliderProvider>
      </div>
    </div>
  )
}
