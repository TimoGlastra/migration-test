import path from "path";
import { AskarModule } from "@aries-framework/askar";
import {
  Agent,
  ConsoleLogger,
  InitConfig,
  KeyDerivationMethod,
  LogLevel,
} from "@aries-framework/core";
import { IndySdkToAskarMigrationUpdater } from "@aries-framework/indy-sdk-to-askar-migration";
import { agentDependencies } from "@aries-framework/node";
import { ariesAskar } from "@hyperledger/aries-askar-nodejs";

try {
  void (async () => {
    ariesAskar.setDefaultLogger();

    const config: InitConfig = {
      label: "label of agent",
      walletConfig: {
        id: "walletId",
        key: "0f6f135d1e64b0f83171dc693c2245ecf5f4cad41d39e434fc7bcc45b5b80d90",
      },
      logger: new ConsoleLogger(LogLevel.trace),
    };

    const askarAgent = new Agent({
      config,
      dependencies: agentDependencies,
      modules: {
        askar: new AskarModule({
          ariesAskar,
        }),
      },
    });

    // await indyAgent.initialize();
    // await indyAgent.shutdown();

    console.log(path.resolve("./rn-db.db"));
    const updater = await IndySdkToAskarMigrationUpdater.initialize({
      agent: askarAgent,
      dbPath: path.resolve("./rn-db.db"),
    });

    await updater.update();

    process.exit(0);
  })();
} catch (e) {
  console.error("ERROR: ", e);
  process.exit(1);
}
