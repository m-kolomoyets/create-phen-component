const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

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

		await createFile(`${folderPath}/${resultFileName}`, content);

		logSuccess(
			`File ${chalk.black.bgGreenBright(resultFileName)} was created!`
		);
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
	logWarning
};
