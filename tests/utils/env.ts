// utils/env.ts
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MUSINSA_ID || !process.env.MUSINSA_PW) {
  throw new Error('MUSINSA_ID 또는 MUSINSA_PW가 설정되지 않았습니다.');
}

export const MUSINSA_ID = process.env.MUSINSA_ID!;
export const MUSINSA_PW = process.env.MUSINSA_PW!;