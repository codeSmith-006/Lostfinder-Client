import useAxiosSecure from "./axiosSecure"

const axiosSecure = useAxiosSecure();
export const ItemsDetailsLoader = async ({params}) => {
    const res = await axiosSecure.get(`/items/${params.id}`);
    return res.data;
}