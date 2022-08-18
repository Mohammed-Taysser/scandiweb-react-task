/**
 * get type of given js data type
 * @example

  getTypeOf('hello world'); // String
	getTypeOf(1000); // Number
	getTypeOf(Infinity); // Number
	getTypeOf(true); // Boolean
	getTypeOf(Symbol()); // Symbol
	getTypeOf(null); // Null
	getTypeOf(undefined); // Undefined
	getTypeOf({}); // Object
	getTypeOf([]); // Array
	getTypeOf(/[a-z]/g); // RegExp
	getTypeOf(new Date(2021)); // Date
	getTypeOf(new Error()); // Error
	getTypeOf(function () {}); // Function
	getTypeOf((a, b) => a + b); // Function
	getTypeOf(async () => {}); // AsyncFunction
	getTypeOf(document); // HTMLDocument

 * @param {Object} obj js data type
 * @returns {String} type of given data type
 */
function getTypeOf(obj = {}) {
	return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
}
export default getTypeOf;
