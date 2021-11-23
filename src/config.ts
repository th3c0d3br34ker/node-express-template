// defaults
export const context = {
  SERVER_CONTEXT: 'EXPRESS SERVER',
  DATABASE_CONTEXT: 'DATABASE',
};

// env vars
export const PORT = process.env.PORT || 3000;

export const IS_TEST = process.env.NODE_ENV === 'test';
