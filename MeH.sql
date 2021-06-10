-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Giu 10, 2021 alle 12:09
-- Versione del server: 10.4.14-MariaDB
-- Versione PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `MeH`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `departments`
--

CREATE TABLE `departments` (
  `id` int(2) NOT NULL,
  `nome` varchar(20) NOT NULL,
  `n_operatori_tot` int(2) NOT NULL,
  `n_macchinari` int(2) NOT NULL,
  `live_target` int(6) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `departments`
--

INSERT INTO `departments` (`id`, `nome`, `n_operatori_tot`, `n_macchinari`, `live_target`, `created_at`, `updated_at`) VALUES
(1, 'Forni', 10, 30, 0, '2021-05-31 12:12:25', '0000-00-00 00:00:00'),
(2, 'Cappe', 6, 20, 36, '2021-05-31 12:12:25', '0000-00-00 00:00:00'),
(3, 'PVD', 15, 35, 0, '2021-05-31 12:12:25', '0000-00-00 00:00:00'),
(4, 'Impiantatori', 12, 22, 0, '2021-05-31 12:12:25', '0000-00-00 00:00:00'),
(5, 'Lithografici', 9, 10, 0, '2021-05-31 12:12:25', '0000-00-00 00:00:00');

--
-- Trigger `departments`
--
DELIMITER $$
CREATE TRIGGER `target_tot` AFTER UPDATE ON `departments` FOR EACH ROW Begin
Call turno_odierno_proc (@ora);
Update storico_ach 
set target = target + new.live_target 
where id_reparto = (select id from reparto where live_target = new.live_target)
and data = curdate()
and orario = @ora;
End
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `lav_lots`
--

CREATE TABLE `lav_lots` (
  `step` varchar(4) NOT NULL,
  `serie` varchar(6) NOT NULL,
  `id_macchinario` varchar(6) NOT NULL,
  `inizio` time(6) DEFAULT NULL,
  `fine` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `lav_lots`
--

INSERT INTO `lav_lots` (`step`, `serie`, `id_macchinario`, `inizio`, `fine`) VALUES
('0101', '329384', 'F1', '12:43:06.000000', NULL),
('0101', '438474', 'F3', '08:52:58.000000', '2020-12-18 12:33:58.000000'),
('1221', '948390', 'F3', NULL, '2020-12-18 06:47:06.000000'),
('6543', '948390', 'L7', '13:33:58.000000', NULL),
('8080', '329384', 'C8', '06:31:08.245000', '2020-12-18 07:40:08.811000');

--
-- Trigger `lav_lots`
--
DELIMITER $$
CREATE TRIGGER `check_lav_lotto` BEFORE INSERT ON `lav_lots` FOR EACH ROW BEGIN
IF new.serie NOT IN 
(
SELECT serie FROM lotto WHERE flag IS NULL
)
THEN signal Sqlstate '45000' 
SET message_text = 'Lotto bloccato';
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `lots`
--

CREATE TABLE `lots` (
  `serie` varchar(6) NOT NULL,
  `prodotto` varchar(20) NOT NULL,
  `n_wfs` int(2) NOT NULL DEFAULT 24,
  `flag` varchar(5) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `lots`
--

INSERT INTO `lots` (`serie`, `prodotto`, `n_wfs`, `flag`, `created_at`, `updated_at`) VALUES
('123456', 'RFSL', 23, NULL, '2021-06-09 05:34:59', '2021-06-09 05:34:59'),
('2312M1', 'EUIO', 22, '7', '2021-05-31 12:11:15', '0000-00-00 00:00:00'),
('328473', 'EUIO', 24, NULL, '2021-05-31 12:11:15', '0000-00-00 00:00:00'),
('329384', 'RFSL', 24, NULL, '2021-05-31 12:11:15', '0000-00-00 00:00:00'),
('438474', 'MRGL', 24, 'D', '2021-06-09 08:07:20', '0000-00-00 00:00:00'),
('454574', 'SSLL', 24, '7', '2021-06-09 08:07:20', '0000-00-00 00:00:00'),
('654321', 'EUIO', 24, NULL, '2021-05-31 12:11:15', '0000-00-00 00:00:00'),
('743495', 'EUIO', 24, 'D', '2021-06-09 08:07:20', '0000-00-00 00:00:00'),
('948390', 'SSLL', 24, NULL, '2021-05-31 12:11:15', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `machines`
--

CREATE TABLE `machines` (
  `id` varchar(6) NOT NULL,
  `commento` varchar(40) NOT NULL,
  `stato` varchar(20) DEFAULT NULL,
  `collocazione` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `machines`
--

INSERT INTO `machines` (`id`, `commento`, `stato`, `collocazione`, `created_at`, `updated_at`) VALUES
('C8', 'stand-by', 'up', 'Cappe', '2021-05-31 12:10:33', '0000-00-00 00:00:00'),
('C9', 'stand-by', 'up', 'Cappe', '2021-05-31 12:10:33', '0000-00-00 00:00:00'),
('F1', 'produzione', 'up', 'Forni', '2021-05-31 12:10:33', '0000-00-00 00:00:00'),
('F2', 'problemi di spessore', 'down', 'Forni', '2021-05-31 12:10:33', '0000-00-00 00:00:00'),
('F3', 'produzione', 'up', 'Forni', '2021-05-31 12:10:33', '0000-00-00 00:00:00'),
('I4', 'produzione', 'up', 'Impiantatori', '2021-05-31 12:10:33', '0000-00-00 00:00:00'),
('I5', 'problemi camera 1', 'down', 'Forni', '2021-05-31 12:10:33', '0000-00-00 00:00:00'),
('L6', 'stand-by', 'up', 'Lithografici', '2021-05-31 12:10:33', '0000-00-00 00:00:00'),
('L7', 'stand-by', 'up', 'Lithografici', '2021-05-31 12:10:33', '0000-00-00 00:00:00'),
('M10', 'problemi di handling', 'down', 'PVD', '2021-05-31 12:10:33', '0000-00-00 00:00:00'),
('M11', 'problemi di deposizione', 'down', 'PVD', '2021-05-31 12:10:33', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `presenza`
--

CREATE TABLE `presenza` (
  `reparto` int(2) NOT NULL,
  `n_operatori` int(2) DEFAULT 52
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `presenza`
--

INSERT INTO `presenza` (`reparto`, `n_operatori`) VALUES
(1, 5),
(2, 6),
(3, 13),
(4, 12),
(5, 8);

-- --------------------------------------------------------

--
-- Struttura della tabella `processato`
--

CREATE TABLE `processato` (
  `step` varchar(4) NOT NULL,
  `serie` varchar(6) NOT NULL,
  `id_macchinario` varchar(6) NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `processato`
--

INSERT INTO `processato` (`step`, `serie`, `id_macchinario`, `data`) VALUES
('1234', '2312M1', 'M10', '2020-12-02'),
('3399', '023343', 'C8', '2020-12-02'),
('5450', '328473', 'M11', '2020-08-14'),
('7999', '023343', 'F1', '2020-12-02'),
('8080', '123456', 'I4', '2020-01-23'),
('8080', '743495', 'M10', '2020-06-24');

-- --------------------------------------------------------

--
-- Struttura della tabella `storico_achvs`
--

CREATE TABLE `storico_achvs` (
  `id` int(6) NOT NULL,
  `id_reparto` int(2) NOT NULL,
  `data` date NOT NULL,
  `orario` varchar(4) NOT NULL,
  `target` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `storico_achvs`
--

INSERT INTO `storico_achvs` (`id`, `id_reparto`, `data`, `orario`, `target`) VALUES
(1, 1, '2020-05-12', 'M', 90),
(2, 3, '2020-05-12', 'M', 103),
(3, 2, '2020-05-12', 'M', 77),
(4, 4, '2020-05-12', 'M', 88),
(5, 5, '2020-05-12', 'M', 100),
(6, 1, '2020-06-24', 'N', 97),
(7, 2, '2020-06-24', 'M', 100),
(8, 3, '2020-06-24', 'P', 98),
(9, 4, '2020-06-24', 'P', 82),
(10, 5, '2020-06-24', 'N', 102),
(11, 2, '2020-12-14', 'P', 120),
(12, 2, '2020-12-18', 'M', 91),
(13, 3, '2021-05-11', 'P', 99);

-- --------------------------------------------------------

--
-- Struttura della tabella `turno`
--

CREATE TABLE `turno` (
  `data` date NOT NULL,
  `orario` varchar(4) NOT NULL,
  `n_operatori` int(2) NOT NULL,
  `perc_presenze` int(3) NOT NULL,
  `responsabile` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `turno`
--

INSERT INTO `turno` (`data`, `orario`, `n_operatori`, `perc_presenze`, `responsabile`) VALUES
('2020-01-23', 'N', 26, 50, 3),
('2020-01-23', 'P', 49, 94, 1),
('2020-05-12', 'P', 22, 42, 5),
('2020-06-24', 'M', 44, 86, 2),
('2020-08-14', 'N', 15, 29, 2),
('2020-12-02', 'M', 52, 100, 1),
('2020-12-14', 'P', 50, 96, 3),
('2020-12-18', 'M', 26, 50, 1),
('2020-12-25', 'M', 10, 19, 4),
('2020-12-29', 'N', 26, 50, 3),
('2021-05-11', 'P', 39, 50, 28);

--
-- Trigger `turno`
--
DELIMITER $$
CREATE TRIGGER `check_covid` BEFORE INSERT ON `turno` FOR EACH ROW Begin
If new.perc_presenze > 60
Then signal Sqlstate '45000' set message_text = 'Presenze troppo elevate, rischio contagio';
End if;
End
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(6) NOT NULL,
  `nome` varchar(20) NOT NULL,
  `cognome` varchar(20) NOT NULL,
  `livello` int(1) NOT NULL,
  `direzione` int(2) NOT NULL,
  `username` varchar(42) NOT NULL,
  `password` varchar(60) NOT NULL,
  `gender` varchar(8) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `nome`, `cognome`, `livello`, `direzione`, `username`, `password`, `gender`, `created_at`, `updated_at`) VALUES
(55, 'Orazio', 'Falsaperla', 6, 1, 'orazio1falsaperla', '$2y$10$QdlpBEFVk3msjDAR823I1.271hRULrGsNvroT2AcqouUj3M.IjwbW', 'Uomo', '2021-06-10 06:43:36', '2021-06-09 08:43:52'),
(57, 'Irene', 'Castro', 4, 5, 'irene5castro', '$2y$10$3.XO35V1N8IzPR2E9pCeM.NYugKr0uV9hQPcp4/5Vrsk/YdfxfFeG', 'Donna', '2021-06-09 09:12:33', '2021-06-09 09:12:33'),
(59, 'Armida', 'Mannino', 7, 2, 'armida2mannino', '$2y$10$WeGwZ09rqwwMtRVVqCXgd.I5bZLDEZSXuqits8HukLJNrHh/eAaG.', 'Donna', '2021-06-10 06:43:45', '2021-06-09 10:46:11'),
(60, 'Renato', 'Castro', 4, 3, 'renato3castro', '$2y$10$FS1rbmH.Itwo6CYHdGt1ZuZlb.0VaR3j.2qTUq2AM/T.yUnH5PIhq', 'Uomo', '2021-06-09 10:46:52', '2021-06-09 10:46:52'),
(61, 'Giovanni', 'Castorina', 4, 4, 'giovanni4castorina', '$2y$10$rrq5ykmBLCQATXHILCJJieXX6HmDQMqgWuxHHbPjF8GhNJLKmCyga', 'Privato', '2021-06-10 04:47:17', '2021-06-10 04:47:17'),
(62, 'Graziella', 'Durso', 4, 3, 'graziella3durso', '$2y$10$4OohR14sC9RWOjaJdjRveeOSwX2FeMbzA7Fewijz3ugwvWNgvA2WS', 'Donna', '2021-06-10 05:26:39', '2021-06-10 05:26:39');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `lav_lots`
--
ALTER TABLE `lav_lots`
  ADD PRIMARY KEY (`step`,`serie`),
  ADD KEY `lav_lotto_ibfk_2` (`id_macchinario`),
  ADD KEY `lav_lotto_ibfk_1` (`serie`);

--
-- Indici per le tabelle `lots`
--
ALTER TABLE `lots`
  ADD PRIMARY KEY (`serie`);

--
-- Indici per le tabelle `machines`
--
ALTER TABLE `machines`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `presenza`
--
ALTER TABLE `presenza`
  ADD PRIMARY KEY (`reparto`);

--
-- Indici per le tabelle `processato`
--
ALTER TABLE `processato`
  ADD PRIMARY KEY (`step`,`serie`),
  ADD KEY `data` (`data`),
  ADD KEY `id_macchinario` (`id_macchinario`),
  ADD KEY `serie` (`serie`);

--
-- Indici per le tabelle `storico_achvs`
--
ALTER TABLE `storico_achvs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `data` (`data`),
  ADD KEY `id_reparto` (`id_reparto`) USING BTREE,
  ADD KEY `orario` (`orario`);

--
-- Indici per le tabelle `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`data`,`orario`),
  ADD KEY `responsabile` (`responsabile`),
  ADD KEY `orario` (`orario`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `direzione` (`direzione`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `storico_achvs`
--
ALTER TABLE `storico_achvs`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `lav_lots`
--
ALTER TABLE `lav_lots`
  ADD CONSTRAINT `lav_lots_ibfk_1` FOREIGN KEY (`serie`) REFERENCES `lots` (`serie`) ON DELETE CASCADE,
  ADD CONSTRAINT `lav_lots_ibfk_2` FOREIGN KEY (`id_macchinario`) REFERENCES `machines` (`id`);

--
-- Limiti per la tabella `presenza`
--
ALTER TABLE `presenza`
  ADD CONSTRAINT `presenza_ibfk_1` FOREIGN KEY (`reparto`) REFERENCES `departments` (`id`);

--
-- Limiti per la tabella `processato`
--
ALTER TABLE `processato`
  ADD CONSTRAINT `processato_ibfk_2` FOREIGN KEY (`data`) REFERENCES `turno` (`data`),
  ADD CONSTRAINT `processato_ibfk_3` FOREIGN KEY (`id_macchinario`) REFERENCES `machines` (`id`);

--
-- Limiti per la tabella `storico_achvs`
--
ALTER TABLE `storico_achvs`
  ADD CONSTRAINT `storico_achvs_ibfk_1` FOREIGN KEY (`id_reparto`) REFERENCES `departments` (`id`),
  ADD CONSTRAINT `storico_achvs_ibfk_2` FOREIGN KEY (`data`) REFERENCES `turno` (`data`),
  ADD CONSTRAINT `storico_achvs_ibfk_3` FOREIGN KEY (`orario`) REFERENCES `turno` (`orario`);

--
-- Limiti per la tabella `turno`
--
ALTER TABLE `turno`
  ADD CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`responsabile`) REFERENCES `users` (`id`);

--
-- Limiti per la tabella `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`direzione`) REFERENCES `departments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
