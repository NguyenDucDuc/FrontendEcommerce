import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import "./product-tab.style.scss";
import { Product } from "../../models/models";
import ProductList from "../product-list/product-list";
import { getAllProduct } from "../../utils/product";
import { Params } from "../../models/http";

// const productData: Array<Product> = [
//   {
//     id: 1,
//     name: "test updataw5",
//     sku: "20 update",
//     rate: 0,
//     price: 830003,
//     isActive: true,
//     desc: "Cuốn sách sẽ giúp bạn trở nsdfsadên giàu có,ịnh.",
//     image:
//       "https://res.cloudinary.com/de5pwc5fq/image/upload/v1677464690/ImageProduct/1677464687774.jpg",
//     unitInStock: 1011,
//     unitOnOrder: 921,
//     shopId: 3,
//     categoryId: 2,
//     attributeGroupId: 1,
//     createdAt: "2023-02-26T09:52:26.000Z",
//     updatedAt: "2023-02-28T03:13:55.000Z",
//     attributes: [
//       {
//         id: 1,
//         value: "Napoleon Hill update",
//         productId: 1,
//         attributeId: 1,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "tác giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 2,
//         value: "Thái Hà",
//         productId: 1,
//         attributeId: 2,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "công ty phát hành",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 3,
//         value: "15.5 x 24 cm",
//         productId: 1,
//         attributeId: 3,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "kích thước",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 4,
//         value: "Ross Cornwell -Thảo Triều3",
//         productId: 1,
//         attributeId: 4,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "dịch giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 5,
//         value: "Bìa mềm update",
//         productId: 1,
//         attributeId: 5,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "loại bìa",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 6,
//         value: "Nhà Xuất Bản Lao Động",
//         productId: 1,
//         attributeId: 7,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "nhà xuất bản",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 1,
//         value: 3929,
//         productId: 1,
//         attributeId: 6,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "số trang",
//         backendType: "int",
//         frontendInput: "number",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "test updataw5",
//     sku: "20 update",
//     rate: 0,
//     price: 830003,
//     isActive: true,
//     desc: "Cuốn sách sẽ giúp bạn trở nsdfsadên giàu có,ịnh.",
//     image:
//       "https://res.cloudinary.com/de5pwc5fq/image/upload/v1677464690/ImageProduct/1677464687774.jpg",
//     unitInStock: 1011,
//     unitOnOrder: 921,
//     shopId: 3,
//     categoryId: 2,
//     attributeGroupId: 1,
//     createdAt: "2023-02-26T09:52:26.000Z",
//     updatedAt: "2023-02-28T03:13:55.000Z",
//     attributes: [
//       {
//         id: 1,
//         value: "Napoleon Hill update",
//         productId: 1,
//         attributeId: 1,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "tác giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 2,
//         value: "Thái Hà",
//         productId: 1,
//         attributeId: 2,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "công ty phát hành",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 3,
//         value: "15.5 x 24 cm",
//         productId: 1,
//         attributeId: 3,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "kích thước",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 4,
//         value: "Ross Cornwell -Thảo Triều3",
//         productId: 1,
//         attributeId: 4,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "dịch giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 5,
//         value: "Bìa mềm update",
//         productId: 1,
//         attributeId: 5,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "loại bìa",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 6,
//         value: "Nhà Xuất Bản Lao Động",
//         productId: 1,
//         attributeId: 7,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "nhà xuất bản",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 1,
//         value: 3929,
//         productId: 1,
//         attributeId: 6,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "số trang",
//         backendType: "int",
//         frontendInput: "number",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "test updataw5",
//     sku: "20 update",
//     rate: 0,
//     price: 830003,
//     isActive: true,
//     desc: "Cuốn sách sẽ giúp bạn trở nsdfsadên giàu có,ịnh.",
//     image:
//       "https://res.cloudinary.com/de5pwc5fq/image/upload/v1677464690/ImageProduct/1677464687774.jpg",
//     unitInStock: 1011,
//     unitOnOrder: 921,
//     shopId: 3,
//     categoryId: 2,
//     attributeGroupId: 1,
//     createdAt: "2023-02-26T09:52:26.000Z",
//     updatedAt: "2023-02-28T03:13:55.000Z",
//     attributes: [
//       {
//         id: 1,
//         value: "Napoleon Hill update",
//         productId: 1,
//         attributeId: 1,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "tác giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 2,
//         value: "Thái Hà",
//         productId: 1,
//         attributeId: 2,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "công ty phát hành",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 3,
//         value: "15.5 x 24 cm",
//         productId: 1,
//         attributeId: 3,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "kích thước",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 4,
//         value: "Ross Cornwell -Thảo Triều3",
//         productId: 1,
//         attributeId: 4,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "dịch giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 5,
//         value: "Bìa mềm update",
//         productId: 1,
//         attributeId: 5,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "loại bìa",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 6,
//         value: "Nhà Xuất Bản Lao Động",
//         productId: 1,
//         attributeId: 7,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "nhà xuất bản",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 1,
//         value: 3929,
//         productId: 1,
//         attributeId: 6,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "số trang",
//         backendType: "int",
//         frontendInput: "number",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "test updataw5",
//     sku: "20 update",
//     rate: 0,
//     price: 830003,
//     isActive: true,
//     desc: "Cuốn sách sẽ giúp bạn trở nsdfsadên giàu có,ịnh.",
//     image:
//       "https://res.cloudinary.com/de5pwc5fq/image/upload/v1677464690/ImageProduct/1677464687774.jpg",
//     unitInStock: 1011,
//     unitOnOrder: 921,
//     shopId: 3,
//     categoryId: 2,
//     attributeGroupId: 1,
//     createdAt: "2023-02-26T09:52:26.000Z",
//     updatedAt: "2023-02-28T03:13:55.000Z",
//     attributes: [
//       {
//         id: 1,
//         value: "Napoleon Hill update",
//         productId: 1,
//         attributeId: 1,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "tác giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 2,
//         value: "Thái Hà",
//         productId: 1,
//         attributeId: 2,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "công ty phát hành",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 3,
//         value: "15.5 x 24 cm",
//         productId: 1,
//         attributeId: 3,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "kích thước",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 4,
//         value: "Ross Cornwell -Thảo Triều3",
//         productId: 1,
//         attributeId: 4,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "dịch giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 5,
//         value: "Bìa mềm update",
//         productId: 1,
//         attributeId: 5,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "loại bìa",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 6,
//         value: "Nhà Xuất Bản Lao Động",
//         productId: 1,
//         attributeId: 7,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "nhà xuất bản",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 1,
//         value: 3929,
//         productId: 1,
//         attributeId: 6,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "số trang",
//         backendType: "int",
//         frontendInput: "number",
//       },
//     ],
//   },
//   {
//     id: 5,
//     name: "test updataw5",
//     sku: "20 update",
//     rate: 0,
//     price: 830003,
//     isActive: true,
//     desc: "Cuốn sách sẽ giúp bạn trở nsdfsadên giàu có,ịnh.",
//     image:
//       "https://res.cloudinary.com/de5pwc5fq/image/upload/v1677464690/ImageProduct/1677464687774.jpg",
//     unitInStock: 1011,
//     unitOnOrder: 921,
//     shopId: 3,
//     categoryId: 2,
//     attributeGroupId: 1,
//     createdAt: "2023-02-26T09:52:26.000Z",
//     updatedAt: "2023-02-28T03:13:55.000Z",
//     attributes: [
//       {
//         id: 1,
//         value: "Napoleon Hill update",
//         productId: 1,
//         attributeId: 1,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "tác giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 2,
//         value: "Thái Hà",
//         productId: 1,
//         attributeId: 2,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "công ty phát hành",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 3,
//         value: "15.5 x 24 cm",
//         productId: 1,
//         attributeId: 3,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "kích thước",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 4,
//         value: "Ross Cornwell -Thảo Triều3",
//         productId: 1,
//         attributeId: 4,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "dịch giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 5,
//         value: "Bìa mềm update",
//         productId: 1,
//         attributeId: 5,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "loại bìa",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 6,
//         value: "Nhà Xuất Bản Lao Động",
//         productId: 1,
//         attributeId: 7,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "nhà xuất bản",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 1,
//         value: 3929,
//         productId: 1,
//         attributeId: 6,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "số trang",
//         backendType: "int",
//         frontendInput: "number",
//       },
//     ],
//   },
//   {
//     id: 6,
//     name: "test updataw5",
//     sku: "20 update",
//     rate: 0,
//     price: 830003,
//     isActive: true,
//     desc: "Cuốn sách sẽ giúp bạn trở nsdfsadên giàu có,ịnh.",
//     image:
//       "https://res.cloudinary.com/de5pwc5fq/image/upload/v1677464690/ImageProduct/1677464687774.jpg",
//     unitInStock: 1011,
//     unitOnOrder: 921,
//     shopId: 3,
//     categoryId: 2,
//     attributeGroupId: 1,
//     createdAt: "2023-02-26T09:52:26.000Z",
//     updatedAt: "2023-02-28T03:13:55.000Z",
//     attributes: [
//       {
//         id: 1,
//         value: "Napoleon Hill update",
//         productId: 1,
//         attributeId: 1,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "tác giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 2,
//         value: "Thái Hà",
//         productId: 1,
//         attributeId: 2,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "công ty phát hành",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 3,
//         value: "15.5 x 24 cm",
//         productId: 1,
//         attributeId: 3,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "kích thước",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 4,
//         value: "Ross Cornwell -Thảo Triều3",
//         productId: 1,
//         attributeId: 4,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "dịch giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 5,
//         value: "Bìa mềm update",
//         productId: 1,
//         attributeId: 5,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "loại bìa",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 6,
//         value: "Nhà Xuất Bản Lao Động",
//         productId: 1,
//         attributeId: 7,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "nhà xuất bản",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 1,
//         value: 3929,
//         productId: 1,
//         attributeId: 6,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "số trang",
//         backendType: "int",
//         frontendInput: "number",
//       },
//     ],
//   },
//   {
//     id: 7,
//     name: "test updataw5",
//     sku: "20 update",
//     rate: 0,
//     price: 830003,
//     isActive: true,
//     desc: "Cuốn sách sẽ giúp bạn trở nsdfsadên giàu có,ịnh.",
//     image:
//       "https://res.cloudinary.com/de5pwc5fq/image/upload/v1677464690/ImageProduct/1677464687774.jpg",
//     unitInStock: 1011,
//     unitOnOrder: 921,
//     shopId: 3,
//     categoryId: 2,
//     attributeGroupId: 1,
//     createdAt: "2023-02-26T09:52:26.000Z",
//     updatedAt: "2023-02-28T03:13:55.000Z",
//     attributes: [
//       {
//         id: 1,
//         value: "Napoleon Hill update",
//         productId: 1,
//         attributeId: 1,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "tác giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 2,
//         value: "Thái Hà",
//         productId: 1,
//         attributeId: 2,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "công ty phát hành",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 3,
//         value: "15.5 x 24 cm",
//         productId: 1,
//         attributeId: 3,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "kích thước",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 4,
//         value: "Ross Cornwell -Thảo Triều3",
//         productId: 1,
//         attributeId: 4,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "dịch giả",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 5,
//         value: "Bìa mềm update",
//         productId: 1,
//         attributeId: 5,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "loại bìa",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 6,
//         value: "Nhà Xuất Bản Lao Động",
//         productId: 1,
//         attributeId: 7,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "nhà xuất bản",
//         backendType: "string",
//         frontendInput: "text",
//       },
//       {
//         id: 1,
//         value: 3929,
//         productId: 1,
//         attributeId: 6,
//         createdAt: "2023-02-26T09:52:26.000Z",
//         updatedAt: "2023-02-27T02:13:26.000Z",
//         name: "số trang",
//         backendType: "int",
//         frontendInput: "number",
//       },
//     ],
//   },
// ];

const ProductTab: React.FC = () => {
  const [params, setParams] = useState<Params>({
    order: "desc",
    sortBy: "id",
    pageSize: 6,
  });

  const [productData, setProductData] = useState<Array<Product>>([]);

  const fetchData = async () => {
    const res = await getAllProduct(params);
    setProductData(res?.data.listProduct);
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const onChange = (key: string) => {
    if (key == "2") {
      setParams((pre) => {
        return { ...pre, sortBy: "unitInStock" };
      });
    }else{
      setParams((pre) => {
        return { ...pre, sortBy: "id" };
      });
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex section-simple__header ">
          <h4 className=" section-simple__header-title">sản phẩm mới</h4>
        </div>
      ),
      children: <ProductList productList={productData} />,
    },
    {
      key: "2",
      label: (
        <div className="flex section-simple__header ">
          <h4 className=" section-simple__header-title">gợi ý hôm nay</h4>
        </div>
      ),
      children: <ProductList productList={productData} />,
    },
  ];
  return (
    <Tabs
      className="section-simple"
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  );
};

export default ProductTab;
