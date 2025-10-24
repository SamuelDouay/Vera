import { createHashRouter, RouterProvider } from 'react-router';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import UserList from '../components/UserList';

const router = createHashRouter([
    {
        Component: DashboardLayout,
        children: [
            {
                path: '/users',
                Component: UserList,
            },
            // Fallback route for the example routes in dashboard sidebar items
            {
                path: '*',
                Component: UserList,
            },
        ],
    },
]);

export default function Dashboard() {
    return (
        <RouterProvider router={router} />
    );
}
