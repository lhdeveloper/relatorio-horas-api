-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 24/11/2020 às 05:48
-- Versão do servidor: 10.4.14-MariaDB
-- Versão do PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `relatorio_horas`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(3, '1605384556040_post_schema', 2, '2020-11-14 20:10:12'),
(39, '1503250034279_user', 3, '2020-11-16 04:27:59'),
(40, '1503250034280_token', 3, '2020-11-16 04:28:00'),
(41, '1605385663982_horas_schema', 3, '2020-11-16 04:28:00');

-- --------------------------------------------------------

--
-- Estrutura para tabela `horas`
--

CREATE TABLE `horas` (
  `id` int(10) UNSIGNED NOT NULL,
  `data` date DEFAULT NULL,
  `inicio` datetime DEFAULT NULL,
  `saida` datetime DEFAULT NULL,
  `retorno` datetime DEFAULT NULL,
  `fim` datetime DEFAULT NULL,
  `total` time DEFAULT NULL,
  `obs` longtext DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `horas`
--

INSERT INTO `horas` (`id`, `data`, `inicio`, `saida`, `retorno`, `fim`, `total`, `obs`, `created_at`, `updated_at`, `user_id`) VALUES
(8, '2020-11-17', '2020-11-17 08:56:00', '2020-11-17 12:56:00', '2020-11-17 13:58:00', '2020-11-17 20:00:00', '10:02:00', NULL, '2020-11-17 12:57:19', '2020-11-17 12:57:19', 1),
(10, '2020-11-16', '2020-11-16 10:29:00', '2020-11-16 13:33:00', '2020-11-16 13:50:00', '2020-11-16 19:30:00', '08:44:00', NULL, '2020-11-17 14:27:47', '2020-11-17 17:59:28', 1),
(13, '2020-11-23', '2020-11-23 09:00:00', '2020-11-23 13:22:00', '2020-11-23 14:40:00', '2020-11-23 18:36:00', '08:18:00', NULL, '2020-11-23 21:32:56', '2020-11-23 21:47:22', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tokens`
--

CREATE TABLE `tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(80) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `sobrenome` varchar(255) NOT NULL,
  `idade` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `resumo` longtext DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `valor_hora` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `nome`, `sobrenome`, `idade`, `cidade`, `telefone`, `image`, `cargo`, `resumo`, `created_at`, `updated_at`, `valor_hora`) VALUES
(1, 'lhdeveloper', 'lhcosta.rato@outlook.com', '$2a$10$wxV0U7YtRv9.wSGkhmDkJ.plUR7yOm3nFjXoOKhzpM1RevNiIPUp.', 'Rick', 'Costa', '32', 'São Caetano do Sul', '11 97451-0092', 'http://res.cloudinary.com/dg7jnpdp7/image/upload/v1605741616/fhlbqk5qehcqlz1tojkl.jpg', 'Front-end Developer', '<p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p><strong>From its medieval origins to the digital era, learn everything there is to know about the ubiquitous </strong><i><strong>lorem ipsum</strong></i><strong> passage.</strong></p>', '2020-11-16 01:29:53', '2020-11-23 22:00:14', '55');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `horas`
--
ALTER TABLE `horas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tokens_token_unique` (`token`),
  ADD KEY `tokens_user_id_foreign` (`user_id`),
  ADD KEY `tokens_token_index` (`token`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de tabela `horas`
--
ALTER TABLE `horas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
