-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2024 at 11:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bargraph_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `chart_data`
--

CREATE TABLE `chart_data` (
  `id` int(11) NOT NULL,
  `label` varchar(100) DEFAULT NULL,
  `value` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chart_data`
--

INSERT INTO `chart_data` (`id`, `label`, `value`) VALUES
(27, 'Jan', 100),
(28, 'Feb', 120),
(29, 'Mar', 90),
(30, 'Apr', 110),
(31, 'May', 130),
(32, 'Jun', 95),
(33, 'Jul', 140),
(34, 'Aug', 125),
(35, 'Sep', 105),
(36, 'Oct', 115),
(37, 'Nov', 135),
(38, 'Dec', 150),
(39, 'Jan', 80),
(40, 'Feb', 85),
(41, 'Mar', 95),
(42, 'Apr', 100),
(43, 'May', 120),
(44, 'Jun', 105),
(45, 'Jul', 115);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `color` varchar(50) DEFAULT 'Not Applicable',
  `product_Type` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `address` varchar(255) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_status` varchar(20) NOT NULL,
  `archive_status` varchar(422) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `supplier_id`, `product_id`, `quantity`, `total_price`, `address`, `payment_method`, `color`, `product_type`, `order_date`, `order_status`, `archive_status`) VALUES
(59, 2, 77, 1, 63.00, '4', 'Gcash', 'DarkSeaGreen', '0', '2024-11-04 04:32:40', 'Delivering', 'Unarchived'),
(61, 2, 77, 1, 63.00, '4', 'Gcash', 'DarkSeaGreen', '0', '2024-11-04 04:32:40', 'Process', 'Unarchived'),
(62, 3, 67, 3, 212.00, '4', 'Gcash', 'SeaShell', '0', '2024-11-04 04:32:41', 'Process', 'Unarchived'),
(63, 3, 33, 1, 45.00, '4', 'Gcash', 'Black', '0', '2024-11-04 04:32:41', 'Process', 'Archived'),
(64, 2, 54, 1, 56.00, '4', 'Gcash', 'Not Applicable', '0', '2024-11-04 04:32:41', 'Process', 'Archived'),
(65, 3, 67, 5, 354.00, '0', 'Cash', 'SeaShell', '0', '2024-11-04 06:24:13', 'Process', 'Archived'),
(66, 2, 77, 5, 315.00, '0', 'Cash', 'DarkSeaGreen', '0', '2024-11-04 06:24:13', 'Process', 'Archived'),
(67, 2, 115, 5, 463.00, '0', 'Cash', 'MediumBlue', '0', '2024-11-04 06:24:13', 'Process', 'Archived'),
(68, 2, 115, 4, 370.00, '0', 'Cash', 'MediumBlue', '0', '2024-11-04 06:24:13', 'Process', 'Archived'),
(69, 2, 115, 4, 370.00, '0', 'Cash', 'MediumBlue', '0', '2024-11-04 06:24:13', 'Process', 'Archived'),
(70, 1, 111, 5, 33.00, '0', 'Cash', 'MediumSlateBlue', '0', '2024-11-04 06:24:13', 'Process', 'Archived');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `supplier_id`, `product_name`, `product_type`, `color`, `unit_price`) VALUES
(1, 47, 'Measuring Tape', 'Tools', NULL, 77.21),
(2, 25, 'Needles', 'Tools', NULL, 22.40),
(3, 12, 'Scissors', 'Tools', NULL, 33.24),
(4, 36, 'Rotary Cutter', 'Tools', NULL, 13.60),
(5, 35, 'Scissors', 'Tools', NULL, 10.52),
(6, 30, 'Scissors', 'Tools', NULL, 38.67),
(7, 35, 'Cutting Mat', 'Tools', NULL, 59.22),
(8, 25, 'Measuring Tape', 'Tools', NULL, 33.42),
(9, 36, 'Scissors', 'Tools', NULL, 87.04),
(10, 45, 'Sewing Machine', 'Tools', NULL, 34.22),
(11, 6, 'Marking Tools', 'Tools', NULL, 21.45),
(12, 43, 'Rotary Cutter', 'Tools', NULL, 39.68),
(13, 6, 'Seam Ripper', 'Tools', NULL, 46.41),
(14, 47, 'Measuring Tape', 'Tools', NULL, 77.21),
(15, 25, 'Needles', 'Tools', NULL, 22.40),
(16, 12, 'Scissors', 'Tools', NULL, 33.24),
(17, 36, 'Rotary Cutter', 'Tools', NULL, 13.60),
(18, 35, 'Scissors', 'Tools', NULL, 10.52),
(19, 30, 'Scissors', 'Tools', NULL, 38.67),
(20, 35, 'Cutting Mat', 'Tools', NULL, 59.22),
(21, 25, 'Measuring Tape', 'Tools', NULL, 33.42),
(22, 36, 'Scissors', 'Tools', NULL, 87.04),
(23, 45, 'Sewing Machine', 'Tools', NULL, 34.22),
(24, 6, 'Marking Tools', 'Tools', NULL, 21.45),
(25, 43, 'Rotary Cutter', 'Tools', NULL, 39.68),
(26, 6, 'Seam Ripper', 'Tools', NULL, 46.41),
(27, 9, 'Satin', 'Fabrics', 'Linen', 67.21),
(28, 4, 'Zippers', 'Notions', 'DarkSeaGreen', 55.21),
(29, 21, 'Polyester', 'Fabrics', 'Maroon', 57.81),
(30, 20, 'Snaps', 'Notions', 'PowderBlue', 73.86),
(31, 6, 'Linen', 'Fabrics', 'Crimson', 54.75),
(32, 16, 'Snaps', 'Notions', 'Green', 7.41),
(33, 3, 'Buttons', 'Notions', 'Black', 45.19),
(34, 25, 'Embroidery Thread', 'Threads', 'LightCyan', 62.38),
(35, 38, 'Buttons', 'Notions', 'Lime', 50.28),
(36, 23, 'Polyester', 'Fabrics', 'OliveDrab', 65.08),
(37, 33, 'Lace and Trim', 'Notions', 'Orange', 86.19),
(38, 15, 'Lace and Trim', 'Notions', 'Brown', 64.99),
(39, 32, 'Satin', 'Fabrics', 'MediumPurple', 71.35),
(40, 25, 'Polyester Thread', 'Threads', 'DarkSalmon', 93.56),
(41, 43, 'Marking Tools', 'Tools', 'NULL', 88.12),
(42, 11, 'Polyester', 'Fabrics', 'DarkKhaki', 49.55),
(43, 15, 'Bias Tape', 'Notions', 'MediumSpringGreen', 26.55),
(44, 38, 'Lace and Trim', 'Notions', 'LightBlue', 72.41),
(45, 45, 'Velcro', 'Notions', 'CadetBlue', 10.07),
(46, 50, 'Elastic', 'Notions', 'YellowGreen', 68.39),
(47, 24, 'Sewing Machine', 'Tools', 'NULL', 2.91),
(48, 24, 'Measuring Tape', 'Tools', 'NULL', 85.55),
(49, 31, 'Embroidery Thread', 'Threads', 'MediumVioletRed', 52.52),
(50, 40, 'Velvet', 'Fabrics', 'Silver', 81.32),
(51, 50, 'Polyester Thread', 'Threads', 'DeepPink', 25.78),
(52, 7, 'Interfacing', 'Notions', 'OliveDrab', 24.61),
(53, 26, 'Quilting Thread', 'Threads', 'SpringGreen', 19.67),
(54, 2, 'Pins', 'Tools', 'NULL', 56.16),
(55, 45, 'Nylon Thread', 'Threads', 'Teal', 78.13),
(56, 36, 'Embroidery Thread', 'Threads', 'GreenYellow', 23.34),
(57, 28, 'Quilting Thread', 'Threads', 'LawnGreen', 89.62),
(58, 16, 'Nylon Thread', 'Threads', 'DarkGray', 49.01),
(59, 49, 'Jersey', 'Fabrics', 'LimeGreen', 69.85),
(60, 49, 'Snaps', 'Notions', 'CadetBlue', 88.58),
(61, 33, 'Marking Tools', 'Tools', 'NULL', 83.48),
(62, 49, 'Nylon Thread', 'Threads', 'Plum', 56.37),
(63, 37, 'Cotton Thread', 'Threads', 'LightGoldenRodYellow', 50.37),
(64, 27, 'Embroidery Thread', 'Threads', 'DarkSlateGray', 89.35),
(65, 47, 'Embroidery Thread', 'Threads', 'SeaShell', 63.93),
(66, 34, 'Fleece', 'Fabrics', 'SteelBlue', 13.70),
(67, 3, 'Wool', 'Fabrics', 'SeaShell', 70.95),
(68, 31, 'Quilting Thread', 'Threads', 'CadetBlue', 62.01),
(69, 17, 'Nylon Thread', 'Threads', 'Purple', 92.97),
(70, 37, 'Polyester', 'Fabrics', 'Wheat', 26.55),
(71, 26, 'Interfacing', 'Notions', 'Orange', 30.56),
(72, 29, 'Cotton', 'Fabrics', 'OrangeRed', 71.89),
(73, 42, 'Velcro', 'Notions', 'Bisque', 9.98),
(74, 36, 'Marking Tools', 'Tools', 'NULL', 51.37),
(75, 49, 'Seam Ripper', 'Tools', 'NULL', 54.57),
(76, 3, 'Elastic', 'Notions', 'LightSteelBlue', 62.63),
(77, 2, 'Cotton Thread', 'Threads', 'DarkSeaGreen', 63.10),
(78, 38, 'Rotary Cutter', 'Tools', 'NULL', 89.98),
(79, 16, 'Pins', 'Tools', 'NULL', 5.01),
(80, 39, 'Cotton', 'Fabrics', 'White', 52.82),
(81, 6, 'Jersey', 'Fabrics', 'Yellow', 96.17),
(82, 17, 'Needles', 'Tools', 'NULL', 21.41),
(83, 13, 'Nylon Thread', 'Threads', 'Indigo', 7.70),
(84, 14, 'Polyester', 'Fabrics', 'DarkSalmon', 45.75),
(85, 18, 'Polyester Thread', 'Threads', 'PaleVioletRed', 98.00),
(86, 6, 'Lace and Trim', 'Notions', 'MediumAquaMarine', 9.67),
(87, 6, 'Cotton', 'Fabrics', 'DarkBlue', 33.76),
(88, 17, 'Elastic', 'Notions', 'Lime', 28.70),
(89, 32, 'Zippers', 'Notions', 'RoyalBlue', 60.28),
(90, 12, 'Nylon Thread', 'Threads', 'DarkCyan', 67.22),
(91, 18, 'Quilting Thread', 'Threads', 'PaleGoldenRod', 17.29),
(92, 4, 'Wool', 'Fabrics', 'CadetBlue', 53.04),
(93, 23, 'Pins', 'Tools', 'NULL', 34.90),
(94, 30, 'Interfacing', 'Notions', 'DarkKhaki', 26.44),
(95, 1, 'Polyester Thread', 'Threads', 'LemonChiffon', 70.62),
(96, 46, 'Quilting Thread', 'Threads', 'Cyan', 44.29),
(97, 42, 'Snaps', 'Notions', 'LightSteelBlue', 3.75),
(98, 41, 'Denim', 'Fabrics', 'SlateBlue', 9.41),
(99, 23, 'Embroidery Thread', 'Threads', 'Wheat', 96.60),
(100, 40, 'Elastic', 'Notions', 'SlateBlue', 79.42),
(101, 24, 'Velcro', 'Notions', 'MintCream', 1.10),
(102, 9, 'Velcro', 'Notions', 'Maroon', 13.49),
(103, 47, 'Lace and Trim', 'Notions', 'Coral', 64.19),
(104, 33, 'Silk', 'Fabrics', 'LightSkyBlue', 77.49),
(105, 14, 'Scissors', 'Tools', 'NULL', 95.05),
(106, 10, 'Ribbons', 'Notions', 'Beige', 37.78),
(107, 20, 'Silk Thread', 'Threads', 'Sienna', 64.53),
(108, 21, 'Cotton Thread', 'Threads', 'LavenderBlush', 96.83),
(109, 48, 'Fleece', 'Fabrics', 'Silver', 15.84),
(110, 31, 'Fleece', 'Fabrics', 'CadetBlue', 29.14),
(111, 1, 'Cotton', 'Fabrics', 'MediumSlateBlue', 6.72),
(112, 36, 'Wool', 'Fabrics', 'Linen', 21.41),
(113, 23, 'Cutting Mat', 'Tools', 'NULL', 36.82),
(114, 34, 'Wool', 'Fabrics', 'DarkTurquoise', 24.49),
(115, 2, 'Denim', 'Fabrics', 'MediumBlue', 92.71),
(116, 22, 'Bias Tape', 'Notions', 'SeaGreen', 93.42),
(117, 13, 'Satin', 'Fabrics', 'Violet', 56.11),
(118, 42, 'Sewing Machine', 'Tools', 'NULL', 95.68),
(119, 40, 'Zippers', 'Notions', 'SteelBlue', 41.16),
(120, 37, 'Measuring Tape', 'Tools', 'NULL', 29.67),
(121, 17, 'Silk Thread', 'Threads', 'Maroon', 28.19),
(122, 11, 'Velcro', 'Notions', 'AntiqueWhite', 61.17),
(123, 50, 'Velvet', 'Fabrics', 'Green', 39.00),
(124, 20, 'Satin', 'Fabrics', 'Azure', 75.83),
(125, 46, 'Linen', 'Fabrics', 'PapayaWhip', 26.61),
(126, 31, 'Denim', 'Fabrics', 'Orange', 97.34),
(127, 2, 'Cotton Thread', 'Threads', 'DarkSeaGreen', 63.10),
(128, 38, 'Rotary Cutter', 'Tools', 'NULL', 89.98),
(129, 16, 'Pins', 'Tools', 'NULL', 5.01),
(130, 39, 'Cotton', 'Fabrics', 'White', 52.82),
(131, 6, 'Jersey', 'Fabrics', 'Yellow', 96.17),
(132, 17, 'Needles', 'Tools', 'NULL', 21.41),
(133, 13, 'Nylon Thread', 'Threads', 'Indigo', 7.70),
(134, 14, 'Polyester', 'Fabrics', 'DarkSalmon', 45.75),
(135, 18, 'Polyester Thread', 'Threads', 'PaleVioletRed', 98.00),
(136, 6, 'Lace and Trim', 'Notions', 'MediumAquaMarine', 9.67),
(137, 6, 'Cotton', 'Fabrics', 'DarkBlue', 33.76),
(138, 17, 'Elastic', 'Notions', 'Lime', 28.70),
(139, 32, 'Zippers', 'Notions', 'RoyalBlue', 60.28),
(140, 12, 'Nylon Thread', 'Threads', 'DarkCyan', 67.22),
(141, 18, 'Quilting Thread', 'Threads', 'PaleGoldenRod', 17.29),
(142, 4, 'Wool', 'Fabrics', 'CadetBlue', 53.04),
(143, 23, 'Pins', 'Tools', 'NULL', 34.90),
(144, 30, 'Interfacing', 'Notions', 'DarkKhaki', 26.44),
(145, 1, 'Polyester Thread', 'Threads', 'LemonChiffon', 70.62),
(146, 46, 'Quilting Thread', 'Threads', 'Cyan', 44.29),
(147, 42, 'Snaps', 'Notions', 'LightSteelBlue', 3.75),
(148, 41, 'Denim', 'Fabrics', 'SlateBlue', 9.41),
(149, 23, 'Embroidery Thread', 'Threads', 'Wheat', 96.60),
(150, 40, 'Elastic', 'Notions', 'SlateBlue', 79.42),
(151, 24, 'Velcro', 'Notions', 'MintCream', 1.10),
(152, 9, 'Velcro', 'Notions', 'Maroon', 13.49),
(153, 47, 'Lace and Trim', 'Notions', 'Coral', 64.19),
(154, 33, 'Silk', 'Fabrics', 'LightSkyBlue', 77.49),
(155, 14, 'Scissors', 'Tools', 'NULL', 95.05),
(156, 10, 'Ribbons', 'Notions', 'Beige', 37.78),
(157, 20, 'Silk Thread', 'Threads', 'Sienna', 64.53),
(158, 21, 'Cotton Thread', 'Threads', 'LavenderBlush', 96.83),
(159, 48, 'Fleece', 'Fabrics', 'Silver', 15.84),
(160, 31, 'Fleece', 'Fabrics', 'CadetBlue', 29.14),
(161, 1, 'Cotton', 'Fabrics', 'MediumSlateBlue', 6.72),
(162, 36, 'Wool', 'Fabrics', 'Linen', 21.41),
(163, 23, 'Cutting Mat', 'Tools', 'NULL', 36.82),
(164, 34, 'Wool', 'Fabrics', 'DarkTurquoise', 24.49),
(165, 2, 'Denim', 'Fabrics', 'MediumBlue', 92.71),
(166, 22, 'Bias Tape', 'Notions', 'SeaGreen', 93.42),
(167, 13, 'Satin', 'Fabrics', 'Violet', 56.11),
(168, 42, 'Sewing Machine', 'Tools', 'NULL', 95.68),
(169, 40, 'Zippers', 'Notions', 'SteelBlue', 41.16),
(170, 37, 'Measuring Tape', 'Tools', 'NULL', 29.67),
(171, 17, 'Silk Thread', 'Threads', 'Maroon', 28.19),
(172, 11, 'Velcro', 'Notions', 'AntiqueWhite', 61.17),
(173, 50, 'Velvet', 'Fabrics', 'Green', 39.00),
(174, 20, 'Satin', 'Fabrics', 'Azure', 75.83),
(175, 46, 'Linen', 'Fabrics', 'PapayaWhip', 26.61);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(100) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplier_id`, `supplier_name`, `phone_number`, `address`, `email`) VALUES
(1, 'Susan Miller', '+63775464429', '6036 Deborah Estates Apt. 264\r\nPort Jasonview, FL 29846', 'christensenaaron@example.net'),
(2, 'Meredith Anderson', '+63292136770', '564 Sharon Freeway\r\nNew Katie, DE 13657', 'hhahn@example.org'),
(3, 'Aaron Keith', '+63826799063', '5511 Butler Lodge\r\nMillerport, VA 42437', 'carlos17@example.net'),
(4, 'Maria Conrad', '+63453677756', '833 Pierce Isle\r\nChristianhaven, DE 05090', 'alexreynolds@example.com'),
(5, 'Luke Brown', '+63138709307', '48586 Harper Summit Apt. 813\r\nWest Tina, NJ 04686', 'michelle01@example.net'),
(6, 'Patricia Chen', '+63427745160', '423 Bell Harbors\r\nNew Katie, SC 45896', 'john21@example.org'),
(7, 'Jennifer Rodriguez', '+63998599352', '508 Johnson Island\r\nRachelburgh, ND 12626', 'petersonleslie@example.org'),
(8, 'Jacqueline Paul', '+63573682898', '917 Gordon Ranch\r\nLake Kevin, WI 25857', 'tanya68@example.net'),
(9, 'Jason Coleman', '+63624135099', '9546 Michael Underpass Apt. 470\r\nNew Codyside, MT 83609', 'steve67@example.com'),
(10, 'Raymond Williams', '+6374947015', '519 Johnson Parks\r\nNorth Barbara, FM 66277', 'bward@example.org'),
(11, 'Samuel Greene', '+63324033415', '65232 Lori Knoll Apt. 280\r\nBrownbury, DC 12487', 'megan99@example.net'),
(12, 'Christina Chase', '+6331012310', '44098 Jennifer Knoll\r\nShelbyborough, OH 88077', 'gregory15@example.org'),
(13, 'Tommy Henderson', '+6318111676', '606 April Creek Apt. 383\r\nWalterhaven, FM 59885', 'mhall@example.org'),
(14, 'Joshua Logan', '+63400577003', '50894 Jasmine Way Apt. 566\r\nWest Amanda, VA 47732', 'ofuentes@example.com'),
(15, 'Samantha Tyler', '+63429637536', '64181 Ross Highway Suite 555\r\nBartlettberg, WI 97323', 'danielalvarado@example.org'),
(16, 'Janet Barnes', '+63113915362', '3536 James Dam Apt. 036\r\nCarpentertown, MD 93434', 'bennettcharles@example.com'),
(17, 'Todd Nichols', '+63433995128', '273 Steve Stream Suite 398\r\nAshleybury, KS 07237', 'johnburgess@example.net'),
(18, 'Ariel Perkins', '+633891978', '6118 Grace Avenue Suite 301\r\nKariland, FM 19040', 'kelly76@example.org'),
(19, 'Tara Gross', '+63525675906', '85557 Cook Terrace Suite 339\r\nPort Willie, AK 49706', 'philipdrake@example.com'),
(20, 'Michelle Mercado', '+63287709603', '19937 Matthew Junctions Apt. 164\r\nVeronicamouth, NV 78609', 'haasdevin@example.com'),
(21, 'Richard Gomez', '+63284004951', '8169 Beth Mission Apt. 834\r\nEast Normaview, SD 83841', 'david00@example.org'),
(22, 'Margaret Daniels', '+63831784369', '96110 Bowman Gateway\r\nLisamouth, AS 41335', 'yolandayork@example.com'),
(23, 'April Schultz', '+63578950515', '932 Taylor Pike Suite 440\r\nWebbland, ND 49918', 'mcdanieljames@example.net'),
(24, 'Ashley Knight', '+63353631072', '3473 Tony Wall Suite 376\r\nWardfort, WY 01957', 'weissstephanie@example.net'),
(25, 'Tara Robinson', '+63881111681', '20504 Kathryn Circles Apt. 063\r\nNew Karenstad, NH 30919', 'steven28@example.com'),
(26, 'Abigail Thomas', '+63588746951', '5012 Hodge Gateway\r\nOrtizfort, CA 76803', 'jonathan14@example.org'),
(27, 'Rodney Flores', '+63327775630', '14386 Murphy Coves Apt. 133\r\nPort Brendabury, NM 37447', 'gabrielwaters@example.com'),
(28, 'David Moore', '+63661144278', '085 Wilson Walk\r\nPort Sarahton, TN 56519', 'joshua24@example.com'),
(29, 'Michael Stevenson', '+63564449153', 'PSC 7676, Box 7396\r\nAPO AA 67366', 'grichmond@example.net'),
(30, 'Cory Wagner', '+63421376996', '686 Foster Extensions\r\nTarafort, LA 70279', 'ryan71@example.com'),
(31, 'Anthony Bush', '+63613168889', '58312 Jennifer Center\r\nNew Jennifer, MN 69557', 'philipquinn@example.org'),
(32, 'Steven Macdonald', '+6312565928', '8450 Lisa Haven Suite 924\r\nEast Tracey, WI 61900', 'olsonsamantha@example.org'),
(33, 'Robert Carter', '+63922488273', '12714 Matthew Motorway Apt. 327\r\nNorth Elizabethchester, OH 02363', 'carpenterabigail@example.net'),
(34, 'Jonathan Hernandez', '+63279521192', '77871 Wright Via Apt. 861\r\nShannonhaven, MS 34169', 'jasonrich@example.com'),
(35, 'Kristen Kelley', '+63897980057', '754 Carr Common\r\nEast Richardview, KY 11535', 'orangel@example.com'),
(36, 'Alice Villarreal', '+63712371472', '5290 David Locks Apt. 248\r\nNorth Karen, NH 02548', 'restrada@example.org'),
(37, 'Patrick Peters DVM', '+63421275572', '64624 Torres Course\r\nDanielleton, FL 50369', 'tony01@example.net'),
(38, 'Mrs. Sarah Alvarez', '+63394643576', 'USCGC Brown\r\nFPO AP 52340', 'heathersanders@example.org'),
(39, 'Tyler Patterson', '+63436205766', '04034 Pierce Union Suite 655\r\nPerezburgh, PW 34146', 'jack57@example.org'),
(40, 'Shawn Hudson', '+63666315505', '7497 Brown Gardens\r\nNorth Alexa, CA 89488', 'cjohnson@example.net'),
(41, 'Judith Sanders', '+63282061450', '036 Daniel Viaduct\r\nPort Monica, MN 12801', 'michaelcollins@example.org'),
(42, 'Robert Ross', '+6386372347', 'PSC 2658, Box 5081\r\nAPO AA 77142', 'wgardner@example.net'),
(43, 'Leah Leon', '+63912665391', '072 Kristine Parkway Suite 470\r\nEast Michael, OH 87988', 'wgray@example.org'),
(44, 'Daniel Bowen', '+63789695149', '04448 Brittany Station Suite 250\r\nSouth Jason, RI 16549', 'kimberlyarias@example.com'),
(45, 'Megan Ray', '+63633216817', '208 Reese Cliffs\r\nLake James, NV 33550', 'vhowell@example.com'),
(46, 'Kelli Alvarez', '+63355210051', '6737 Chen Roads\r\nPort Kellyton, MH 70320', 'pware@example.net'),
(47, 'Andrew Mccoy', '+63732569457', '6264 Wright Rest Suite 499\r\nPort Seanfurt, NC 70108', 'ydurham@example.org'),
(48, 'Brandon Wells', '+63425902683', '91731 Patricia Pines Suite 937\r\nStewartmouth, NY 99045', 'tvelazquez@example.net'),
(49, 'Joshua Sanchez', '+63810053739', '611 Amy Isle Apt. 423\r\nSotoland, DC 09431', 'xgonzalez@example.com'),
(50, 'Chelsea Smith', '+63100686246', '0502 Cole Station\r\nCharlesborough, DC 49682', 'valerieperez@example.net');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chart_data`
--
ALTER TABLE `chart_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplier_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chart_data`
--
ALTER TABLE `chart_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
