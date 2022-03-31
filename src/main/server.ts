import "./config/module-alias";
import { PgConnection } from "@/infra/postgres/config";
import { env } from "@/shared/env";

import "reflect-metadata";
/*PgConnection.getInstance().connect().then(async () => {
  const { app } = await import('@/main/config/app');
  app.listen(Number(env.api_port), () => console.log(`api start at: http://localhost:${env.api_port}`))
}).catch(console.error)
*/

PgConnection.getInstance()
  .connect()
  .then(async () => {
    const { app } = await import("@/main/config/app");
    app.listen(Number(env.api_port), () =>
      console.log(`api start at: http://localhost:${env.api_port}`)
    );
  })
  .catch(console.error);
