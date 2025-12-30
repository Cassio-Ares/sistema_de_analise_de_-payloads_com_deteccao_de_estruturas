import { drizzle} from 'drizzle-orm/node-postgres';
import { _env } from '@/env';
import * as schema from "./schema";

export const db = drizzle(_env.DATABASE_URL, { 
  schema,
  casing: 'snake_case',
  logger: true,
});