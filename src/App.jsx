import { AnimalsProvider } from './contexts/AnimalsContext';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SideNavBar from './Component/SideNavBar';
import AnimalInfo from './Component/AnimalInfo';
import AnimalProfile from './page/AnimalProfile';
// import { ChakraProvider } from '@chakra-ui/react';
function App() {

  const Layout = () => {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-blue-700 text-white shadow-lg">
          <SideNavBar />
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </div>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <AnimalInfo />
        }
      ]
    },
    {
      path: '/animal/:id',
      element: <AnimalProfile />

    }
  ]);

  return (
    // <ChakraProvider>
      <AnimalsProvider>
        <RouterProvider router={router} />
      </AnimalsProvider>
    // </ChakraProvider>
  );
}

export default App;
