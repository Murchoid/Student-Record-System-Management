  import { AuditLog } from "../entities/audit_log.entity";
  import { Request } from "express";

  export  async function  createAudit<T>(request: Request, user: T, message: string, tableAffected: string): Promise<AuditLog>{
    const audit = new AuditLog();
    if (typeof user === 'number') {
      audit.user_id = user;
    } else if (user && typeof user === 'object' && 'admin_id' in user) {
      audit.user_id = (user as any).admin_id;
    }
    audit.action = message;
    audit.timestamp = new Date();
    audit.entity_affected = tableAffected;
    audit.ip_address = getClientIp(request);
    
    return audit;
  }

  function getClientIp(request: Request): string {
      // Get IP from X-Forwarded-For header or fall back to connection remote address
      const forwardedFor = request.headers['x-forwarded-for'];
      if (forwardedFor) {
        // If it's an array or comma-separated string, get the first IP
        return Array.isArray(forwardedFor)
          ? forwardedFor[0]
          : forwardedFor.split(',')[0].trim();
      }
      return request.ip || 'unknown';
    }