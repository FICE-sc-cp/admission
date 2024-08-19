#!/usr/bin/env node
import { CommandFactory } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { CliModule } from './cli/cli.module';

(async () => {
  await CommandFactory.run(CliModule, {
    logger: new Logger(),
    abortOnError: false,
    cliName: 'TC CLI',
  });
})();
