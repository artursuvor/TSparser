import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
const json2csv = require('json2csv').parse;

const inputFilePath = path.resolve(__dirname, '../input.csv');
const outputFilePath = path.resolve(__dirname, '../output.csv');

const outputAgeMoreThatThirty = (data: any[]) => {
    return data.filter(row => parseInt(row.age, 10) > 30);
};

const readCSV = (filePath: string) => {
    return new Promise<any[]>((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

const writeCSV = (filePath: string, data: any[]) => {
    const csvData = json2csv(data);
    fs.writeFileSync(filePath, csvData);
};

const main = async () => {
    try {
        const data = await readCSV(inputFilePath);
        const processedData = outputAgeMoreThatThirty(data);
        writeCSV(outputFilePath, processedData);
        console.log(`Data processed successfully. Output written to ${outputFilePath}`);
    } catch (error) {
        console.error('Error processing CSV file:', error);
    }
};

main();
