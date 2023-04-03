import { AskarModule } from '@aries-framework/askar'
import {
  Agent,
  ConsoleLogger,
  InitConfig,
  KeyDerivationMethod,
  LogLevel,
} from '@aries-framework/core'
import { IndySdkModule } from '@aries-framework/indy-sdk'
import { IndySdkToAskarMigrationUpdater } from '@aries-framework/indy-sdk-to-askar-migration'
import { agentDependencies } from '@aries-framework/node'
import { ariesAskar } from '@hyperledger/aries-askar-nodejs'
import indySdk from 'indy-sdk'

try {
  void (async () => {
    ariesAskar.setDefaultLogger()

    const config: InitConfig = {
      label: 'label of agent',
      walletConfig: {
        id: 'wallet-id2',
        key: 'GfwU1DC7gEZNs3w41tjBiZYj7BNToDoFEqKY6wZXqs1A',
        keyDerivationMethod: KeyDerivationMethod.Argon2IInt,
      },
      logger: new ConsoleLogger(LogLevel.trace),
    }

    const indyAgent = new Agent({
      config,
      dependencies: agentDependencies,
      modules: {
        indySdk: new IndySdkModule({
          indySdk,
        }),
      },
    })

    const askarAgent = new Agent({
      config,
      dependencies: agentDependencies,
      modules: {
        askar: new AskarModule({
          ariesAskar,
        }),
      },
    })

    await indyAgent.initialize()
    await indyAgent.shutdown()

    const updater = await IndySdkToAskarMigrationUpdater.initialize({
      agent: askarAgent,
      dbPath: `/home/beri/.indy_client/wallet/${config.walletConfig!.id}/sqlite.db`,
    })

    await updater.update()

    process.exit(0)
  })()
} catch (e) {
  console.error('ERROR: ', e)
  process.exit(1)
}
