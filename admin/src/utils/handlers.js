import axios from 'axios';
import { toast } from 'react-toastify';

export const onChangeHandler = (event, setData) => {
    let name = event.target.name;
    let value = event.target.value;
    setData(data => ({
        ...data,
        [name]: value
    }));
};

export const onSubmitHandler = async (event, data, image, setData, setImage, url) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);
    let response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
        setData({
            name: '',
            description: '',
            price: '',
            category: 'Salad'
        });
        setImage(false);
        toast.success(response.data.message);
    } else {
        toast.error(response.data.message);
    }
};