const inputs = require('../data/inputs.json');
import { parseInputInstructions } from './helpers';



for (let i = 0; i < inputs.length; i++) {
    parseInputInstructions(inputs[i]);
}



