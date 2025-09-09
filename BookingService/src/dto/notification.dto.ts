export interface NotificaitonDto {
  to: string;
  subject: string;
  templateId: string;
  params: Record<string, any>;
}
