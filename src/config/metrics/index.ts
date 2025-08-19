import express, { Request, Response } from 'express';
import client from 'prom-client'
import logger from '@akashcapro/codex-shared-utils/dist/utils/logger';

export const startMetricsServer = (port : number)  => {

    const app = express();

    app.get('/metrics', async (req: Request, res: Response) => {
  try {
    res.set("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.end(metrics);
  } catch (err) {
    res.status(500).send("Error generating metrics");
  }
})

    app.listen(port, ()=>{
        logger.info(`Metrics server listening on port ${port}`)
    })

}   