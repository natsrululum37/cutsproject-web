-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 16, 2025 at 07:13 PM
-- Server version: 10.11.13-MariaDB-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cutsproject_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Booking`
--

CREATE TABLE `Booking` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL,
  `time` varchar(191) NOT NULL,
  `serviceId` int(11) NOT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED','COMPLETED') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Gallery`
--

CREATE TABLE `Gallery` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Gallery`
--

INSERT INTO `Gallery` (`id`, `title`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Classic Cut', 'gallery1.webp', '2025-06-16 17:22:29.602', '2025-06-16 17:22:29.602'),
(2, 'Modern Style', 'gallery2.webp', '2025-06-16 17:22:29.602', '2025-06-16 17:22:29.602'),
(3, 'Trending Look', 'gallery3.webp', '2025-06-16 17:22:29.602', '2025-06-16 17:22:29.602'),
(4, 'Premium Service', 'gallery4.webp', '2025-06-16 17:22:29.602', '2025-06-16 17:22:29.602');

-- --------------------------------------------------------

--
-- Table structure for table `Review`
--

CREATE TABLE `Review` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `comment` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Review`
--

INSERT INTO `Review` (`id`, `name`, `rating`, `comment`, `createdAt`, `updatedAt`) VALUES
(1, 'John Doe', 5, 'Great service and very professional staff!', '2025-06-16 17:22:29.605', '2025-06-16 17:22:29.605'),
(2, 'Mike Smith', 4, 'Really happy with my new haircut!', '2025-06-16 17:22:29.605', '2025-06-16 17:22:29.605'),
(3, 'David Wilson', 5, 'Best barbershop in town! Highly recommended.', '2025-06-16 17:22:29.605', '2025-06-16 17:22:29.605');

-- --------------------------------------------------------

--
-- Table structure for table `Service`
--

CREATE TABLE `Service` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `category` varchar(191) NOT NULL DEFAULT 'Layanan Umum',
  `duration` int(11) NOT NULL,
  `image_url` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Service`
--

INSERT INTO `Service` (`id`, `name`, `description`, `price`, `category`, `duration`, `image_url`, `createdAt`, `updatedAt`) VALUES
(2, 'Hair Cut', 'Potong + Keramas + hair tonic + hot towel + Blow dry + full styling', 50000, 'Layanan Umum', 45, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(3, 'Shaving', 'Razor, facial shaves, full trim, dll', 5000, 'Layanan Umum', 20, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(4, 'Treatments', 'Protein hair mask, creambath, dandruff scalling, totok wajah, pijat 15 menit, dll.', 20000, 'Layanan Umum', 30, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(5, 'Pro Sculpting', 'Pelurusan rambut permanen natural dengan 4 tahap proses', 205000, 'Layanan Pro & Pewarnaan', 180, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(6, 'Paket Coloring', 'Merk reguler, merk premium, merk exotic', 188000, 'Layanan Pro & Pewarnaan', 120, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(7, 'Top Perming', 'Keriting permanen dengan tingkat ke keritingan yang bervariatif', 196000, 'Layanan Pro & Pewarnaan', 150, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(8, 'Pomade', 'Pomade waterbased, oilbased, clay, wax, dan styling product lainnya', 30000, 'Perawatan & Produk Styling Rambut', 0, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(9, 'Shampoo', 'Shampoo khusus pria, anti ketombe, hair tonic, dan vitamin rambut', 25000, 'Perawatan & Produk Styling Rambut', 0, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(10, 'VIP Treatment', 'Full service dengan ruangan private dan layanan premium', 250000, 'Layanan Premium', 120, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(11, 'Kids Haircut', 'Khusus anak-anak usia 5-12 tahun', 35000, 'Layanan Premium', 45, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('ada1ec5b-85da-4656-b2eb-da2aa805fcda', 'c911931b906265b7aee8bdb9dba0d3aac284ba33cfb31d36d45cd212cc5d1fe9', '2025-06-16 16:53:35.819', '20250616165335_init', NULL, NULL, '2025-06-16 16:53:35.768', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Booking`
--
ALTER TABLE `Booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Booking_serviceId_fkey` (`serviceId`);

--
-- Indexes for table `Gallery`
--
ALTER TABLE `Gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Review`
--
ALTER TABLE `Review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Service`
--
ALTER TABLE `Service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Booking`
--
ALTER TABLE `Booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Gallery`
--
ALTER TABLE `Gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Review`
--
ALTER TABLE `Review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Service`
--
ALTER TABLE `Service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Booking`
--
ALTER TABLE `Booking`
  ADD CONSTRAINT `Booking_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
