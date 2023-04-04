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
        key: "d85dc2997f0533c4221d63ac5ea9ebb149355d9acddc41dc5612230dcedb38e6",
        // keyDerivationMethod: KeyDerivationMethod.Argon2IMod,
      },
      logger: new ConsoleLogger(LogLevel.trace),
    };

    // const indyAgent = new Agent({
    //   config,
    //   dependencies: agentDependencies,
    //   modules: {
    //     indySdk: new IndySdkModule({
    //       indySdk,
    //     }),
    //   },
    // })

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
