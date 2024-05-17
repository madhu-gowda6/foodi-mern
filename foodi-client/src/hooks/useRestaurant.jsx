import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRestaurant = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isRestaurant, isPending: isRestaurantLoading } = useQuery({
        queryKey: [user?.email, 'isRestaurant'],
        enabled: ! loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/restaurant/${user.email}`);
            console.log(res.data);
            return res.data?.restaurant;
        }
    })
    return [isRestaurant, isRestaurantLoading]
};

export default useRestaurant;