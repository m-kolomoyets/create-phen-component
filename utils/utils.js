const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const prettier = require('prettier');

const logSuccess = message => {
	console.log(chalk.green(message));
};

const logWarning = message => {
	console.log(chalk.yellow(message));
};

const logError = message => {
	console.log(chalk.black.bold.bgRed(message));
};

const readFile = fileLocation => {
	return new Promise((resolve, reject) => {
		fs.readFile(fileLocation, 'utf-8', (err, text) => {
			err ? reject(err) : resolve(text);
		});
	});
};

const createFile = (fileLocation, fileContent) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileLocation, fileContent, 'utf-8', (error, text) => {
			!!error ? reject(error) : resolve(text);
		});
	});
};

const buildPrettier = () => {
	const config = {
		parser: 'babel',
		printWidth: 120,
		proseWrap: 'never',
		arrowParens: 'always',
		trailingComma: 'es5',
		endOfLine: 'lf',
		tabWidth: 4,
		singleQuote: true,
		overrides: [
			{
				files: ['**/*.css', '**/*.html', '**/*.svg'],
				options: {
					singleQuote: false,
				},
			},
		],
	};

	return text => {
		return prettier.format(text, config);
	};
};

const prettify = buildPrettier();

const readFileRelative = fileLocation => {
	return readFile(path.join(__dirname, fileLocation));
};

const createFinalFile = async (
	templateFileName,
	folderPath,
	componentName,
	resultFileName
) => {
	try {
		const template = await readFileRelative(
			`/templates/${templateFileName}`
		);

		const content = template.replaceAll(/COMPONENT_NAME/g, componentName);

		// const formattedContent = ['css', 'stories'].includes(
		// 	resultFileName?.split('.').reverse()[0]
		// )
		// 	? content
		// 	: prettify(content);

		const formattedContent = content;

		await createFile(`${folderPath}/${resultFileName}`, formattedContent);

		logSuccess(`✓ ${chalk.black.bgGreenBright(resultFileName)}`);
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	readFile,
	createFile,
	readFileRelative,
	createFinalFile,
	logSuccess,
	logError,
	logWarning,
};
