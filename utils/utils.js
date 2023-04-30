const fs = require('fs');
const path = require('path');

module.exports.readFile = fileLocation => {
	return new Promise((resolve, reject) => {
		fs.readFile(fileLocation, 'utf-8', (err, text) => {
			err ? reject(err) : resolve(text);
		});
	});
};

module.exports.createFile = (fileLocation, fileContent) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileLocation, fileContent, 'utf-8', (error, text) => {
			!!error ? reject(error) : resolve(text);
		});
	});
};

module.exports.readFileRelative = fileLocation =>
	module.exports.readFile(path.join(__dirname, fileLocation));

module.exports.createFinalFile = async (
	templateFileName,
	folderPath,
	componentName,
	resultFileName
) => {
	try {
		const template = await module.exports.readFileRelative(
			`/templates/${templateFileName}`
		);

		const content = template.replaceAll(/COMPONENT_NAME/g, componentName);

		await module.exports.createFile(
			`${folderPath}/${resultFileName}`,
			content
		);
	} catch (err) {
		console.error(err);
	}
};
