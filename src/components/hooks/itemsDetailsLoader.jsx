import axiosSecure from "./axiosSecure";

export const ItemsDetailsLoader = async ({params}) => {
    const res = await axiosSecure.get(`/items/${params.id}`);
    return res.data;
}