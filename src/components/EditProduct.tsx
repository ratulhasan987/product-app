
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
} from '../features/products/productsApi';
import { Form, Input, Button, Select, Spin, Typography, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Title } = Typography;

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductByIdQuery(id!);
  const [updateProduct] = useUpdateProductMutation();
  const { data: categories } = useGetCategoriesQuery({});

  const onFinish = async (values: any) => {
    console.log('Form Values:', values); // Log final form values

    try {
      await updateProduct({ id, body: values }).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Product Updated',
        text: 'The product has been successfully updated!',
        confirmButtonColor: '#3085d6',
      }).then(() => navigate('/')); // Navigate after update
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was a problem updating the product.',
        confirmButtonColor: '#d33',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-cyan-100  lg:mt-24 mt-20">
      <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
        <Title level={2} className="text-lg lg:text-xl text-center mb-6">
          Edit Product
        </Title>

        <Form
          initialValues={data}
          onFinish={onFinish}
          layout="vertical"
          className="bg-white p-6 shadow-lg rounded-lg"
        >
          {/* Title */}
          <Form.Item
            name="title"
            label="Product Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter product title" className="rounded-lg" />
          </Form.Item>

          {/* Price */}
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter a price' }]}
          >
            <Input
              type="number"
              placeholder="Enter price"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Category Select */}
          <Form.Item
            name="category"
            label="Category"
            className="mb-6"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category" className="rounded-lg">
              {categories?.map((cat: any) => (
                <Select.Option key={cat.slug} value={cat.slug}>
                  {cat.name}{' '}
                  {/* Display the 'name' here, not the entire object */}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Brand */}
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: 'Please enter the brand' }]}
          >
            <Input placeholder="Enter product brand" className="rounded-lg" />
          </Form.Item>

          {/* Stock */}
          <Form.Item
            name="stock"
            label="Stock"
            rules={[
              { required: true, message: 'Please enter the stock quantity' },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter stock quantity"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Reviews (Dynamic Form List) */}
          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Space key={field.key} align="baseline" className="flex mb-2">
                    {/* Reviewer Name */}
                    <Form.Item
                      {...field}
                      name={[field.name, 'reviewerName']}
                      rules={[
                        { required: true, message: 'Enter reviewer name' },
                      ]}
                    >
                      <Input
                        placeholder="Reviewer Name"
                        className="rounded-lg"
                      />
                    </Form.Item>

                    {/* Rating */}
                    <Form.Item
                      {...field}
                      name={[field.name, 'rating']}
                      rules={[{ required: true, message: 'Enter rating' }]}
                    >
                      <Input
                        type="number"
                        placeholder="Rating"
                        className="rounded-lg"
                      />
                    </Form.Item>

                    {/* Comment */}
                    <Form.Item
                      {...field}
                      name={[field.name, 'comment']}
                      rules={[{ required: true, message: 'Enter comment' }]}
                    >
                      <Input placeholder="Comment" className="rounded-lg" />
                    </Form.Item>

                    {/* Remove Review Button */}
                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      className="text-red-500"
                    />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="w-full rounded-lg"
                  >
                    Add Review
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Submit Button */}
          <Form.Item className="flex lg:justify-end justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-lg transition duration-300 ease-in-out"
            >
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;

