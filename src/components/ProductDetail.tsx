
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../features/products/productsApi';
import { Button, Card, Typography, List, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css'; // Ensure Ant Design CSS is imported

const { Title, Paragraph } = Typography;

// Define a type for the Review object
interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
}

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id!);

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-cyan-100 min-h-screen py-28">
      <div className="container mx-auto px-4 flex justify-center">
        <Card className="shadow-2xl rounded-lg p-6 bg-white w-full lg:w-3/4">
          <div className="flex flex-col lg:flex-row items-start lg:space-x-8">
            {/* Product Image */}
            <div className="lg:w-1/3 w-full mb-6 lg:mb-0">
              <img
                src={data?.thumbnail || data?.images?.[0]}
                alt={data?.title}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>

            {/* Product Info */}
            <div className="lg:w-2/3 w-full">
              {/* Product Title */}
              <Title className="text-2xl font-semibold mb-2 text-gray-900">
                {data?.title}
              </Title>

              {/* Product Description */}
              <Paragraph className="text-sm text-gray-600 mb-6">
                {data?.description}
              </Paragraph>

              {/* Product Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Paragraph className="text-base text-gray-700">
                  <span className="font-semibold">Price:</span> ${data?.price}
                </Paragraph>
                <Paragraph className="text-base text-gray-700">
                  <span className="font-semibold">Category:</span>{' '}
                  {data?.category}
                </Paragraph>
                <Paragraph className="text-base text-gray-700">
                  <span className="font-semibold">Rating:</span> {data?.rating}{' '}
                  ★
                </Paragraph>
                <Paragraph className="text-base text-gray-700">
                  <span className="font-semibold">Stock:</span> {data?.stock}
                </Paragraph>
                <Paragraph className="text-base text-gray-700">
                  <span className="font-semibold">Tags:</span>{' '}
                  {data?.tags?.join(', ')}
                </Paragraph>
                <Paragraph className="text-base text-gray-700">
                  <span className="font-semibold">Brand:</span> {data?.brand}
                </Paragraph>
              </div>

              {/* Customer Reviews */}
              <Divider orientation="left" className="mb-4">
                Customer Reviews
              </Divider>
              <List
                itemLayout="horizontal"
                dataSource={data?.reviews as Review[] | undefined}
                renderItem={(review: Review) => (
                  <List.Item>
                    <List.Item.Meta
                      title={`${review.reviewerName} (${review.rating} ★)`}
                      description={review.comment}
                    />
                  </List.Item>
                )}
              />

              {/* Edit Button */}
              <div className="flex lg:justify-end justify-center mt-6">
                <Button
                  onClick={() => navigate(`/editProduct/${id}`)}
                  className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg px-6 py-2 text-base transition duration-300 ease-in-out"
                >
                  Edit Product
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;

