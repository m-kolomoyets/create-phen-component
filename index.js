#!/usr/bin/env node

/**
 * create-phen-component
 * Creates React components based on Phenomenon.Studio code style
 *
 * @author m.kolomoyets<mykola.kolomoyets@phenomenon-studio.com> <https://github.com/mykola-kolomoyets>
 */

const fs = require('fs');

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const { createFinalFile } = require('./utils/utils');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);

	if (input) {
		if (input.length !== 1) {
			log(
				'Invalid arguments. \nExample: create-phen-component {component-name} {optional: --story}'
			);
			return;
		}

		const componentName = input[0];

		const folderPath = `${__dirname}/${componentName}`;

		try {
			if (!fs.existsSync(folderPath)) {
				await fs.mkdir(folderPath, {}, error => {
					if (error) {
						log(error);
						throw new Error(error);
					}
				});

				await createFinalFile(
					'COMPONENT_NAME.tsx',
					folderPath,
					componentName,
					`${componentName}.tsx`
				);

				await createFinalFile(
					'COMPONENT_NAME.module.css',
					folderPath,
					componentName,
					`${componentName}.module.css`
				);

				await createFinalFile(
					'types.ts',
					folderPath,
					componentName,
					'types.ts'
				);

				await createFinalFile(
					'index.ts',
					folderPath,
					componentName,
					'index.ts'
				);

				if (cli.flags?.story) {
					await createFinalFile(
						'COMPONENT_NAME.stories.tsx',
						folderPath,
						componentName,
						`${componentName}.stories.tsx`
					);
				}
			}
		} catch (err) {
			console.error(err);
		}

		return;
	}

	log(
		'Invalid arguments. \nExample: create-phen-component {component-name} {optional: --with-story}'
	);
})();
