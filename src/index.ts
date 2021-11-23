import http from 'http';

// project imports
import app from './app';
import { context, IS_TEST, PORT } from './config';
import logger from './logger';

const server = http.createServer(app);

async function startProcess() {
  try {
    // await sequelizeDb.authenticate();
    logger.debug(context.DATABASE_CONTEXT, 'Connection has been established successfully.');

    server.listen(PORT, () => {
      logger.info(context.SERVER_CONTEXT, `Server is listening on port ${PORT}.`);
    });
  } catch (error) {
    logger.error(context.DATABASE_CONTEXT, 'Unable to connect to the database:', error);
  }
}

let stopped = false;

async function stopProcess(err = false) {
  if (stopped) {
    return;
  }
  stopped = true;
  logger.info(context.SERVER_CONTEXT, 'Stopping server...');
  await server.close();
  process.exit(err ? 1 : 0);
}

if (!IS_TEST) {
  startProcess();
}

process.on('uncaughtException', (err) => {
  logger.error(context.SERVER_CONTEXT, 'uncaughtException', err);
  stopProcess(true);
});

process.on('unhandledRejection', (err) => {
  logger.error(context.SERVER_CONTEXT, 'unhandledRejection', err);
  stopProcess(true);
});

process.on('SIGINT', () => {
  logger.info(context.SERVER_CONTEXT, 'SIGINT');
  stopProcess(false);
});

process.on('SIGTERM', () => {
  logger.info(context.SERVER_CONTEXT, 'SIGTERM');
  stopProcess(false);
});
