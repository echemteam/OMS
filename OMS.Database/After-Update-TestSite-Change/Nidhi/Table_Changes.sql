ALTER TABLE ApprovalConfiguration ADD Template NVARCHAR(MAX);

ALTER TABLE ApprovalConfiguration
DROP COLUMN ApprovalAction;
