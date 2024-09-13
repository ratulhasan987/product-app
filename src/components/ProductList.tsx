import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../features/products/productsApi';
import 'antd/dist/reset.css'; // imported from antd

interface Product {
  id: number;
  title: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const { data, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <span className="font-medium text-green-500">{text}</span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => <span className="text-green-500">${text}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Product) => (
        <Button
          onClick={() => navigate(`/products/${record.id}`)}
          className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg px-4 py-2 text-sm md:text-base transition duration-300 ease-in-out"
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-cyan-100 items-center justify-center flex ">
      <div className="p-4  md:p-6 lg:w-3/4 w-full lg:p-8 mt-24 text-center">
        <Table
          className="rounded-lg shadow-2xl bg-gray-100 p-1 "
          columns={columns}
          dataSource={data?.products}
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.total,
            onChange: (page: number) => setCurrentPage(page),
          }}
          rowKey="id"
          scroll={{ x: 'max-content' }} // Allows horizontal scrolling for large content
        />
      </div>
    </div>
  );
};

export default ProductList;
