import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserDetails } from '../../Slice/UserSlice'; 
import { Button, Form } from 'react-bootstrap';

function Updatedetails() {
    const dispatch = useDispatch();
    const { userobj } = useSelector(state => state.user);

    const [email, setEmail] = useState(userobj.email);
    const [city, setCity] = useState(userobj.city);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpdate = () => {
        const updatedUser = {
            username: userobj.username,
            email,
            city,
            profileImg: selectedImage,
        };

        dispatch(updateUserDetails(updatedUser));
    };

    return (
        <div>
            {/* Display existing user details */}
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="profileImage">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                </Form.Group>
                <Button onClick={handleUpdate}>Update</Button>
            </Form>
        </div>
    );
}

export default Updatedetails;
