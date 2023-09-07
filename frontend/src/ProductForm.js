import React, { useState } from 'react';
import  supabase from './supabaseClient'; // Import your Supabase client instance here

function ProductForm({uuid}) {
  const [formData, setFormData] = useState({
    id: 2,
    user_seller: uuid,
    description: '',
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Form submitted, ${formData.description}`);
    const number = Math.floor(Math.random() * 1000);
    console.log(uuid)
    const { error } = await supabase
      .from('products')
      .insert({ id: number, user_seller: uuid, description: formData.description, price: 100});
    console.log(error)
      setFormData({
        id: 100,
        user_seller: uuid,
        description: '',
      });
    
  };



  return (
    <div>
        <h1>Product Form</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4} // Adjust the number of rows as needed
            cols={40} 
            style={{ color: 'black' }}
          />
        </div>
        <div>
          <button type='submit'>Create Product</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
