
DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`%` EVENT `expire_active_plans` ON SCHEDULE EVERY 1 MINUTE STARTS '2025-11-05 22:58:01' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE plans_user
  SET status = 'expired'
  WHERE status = 'active'
  AND expiration_date < NOW()$$

DELIMITER ;
COMMIT;