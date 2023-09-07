import dotenv from 'dotenv';
dotenv.config();

export const CLIENT_ID: string =
  process.env.CLIENT_ID ||
  'AVucDtHBZk7OkSySfPL8MoafdCCL3Yg9Nll-2n8liN9l8OxqPIYWJmqltLEYph1I0Km-pL8lTF7HN8n6';
export const APP_SECRET: string =
  process.env.APP_SECRET ||
  'ECgyxeC0GKkCkOe7174AUgvZ3AZRD0TcHwg3bBMiT6RDRIWAsx7yBHQD1a4SWWBQmvUxETndKyi9WhlA';
