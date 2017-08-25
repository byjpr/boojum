import test from 'ava';
import Product from '../index';

const testProduct = {
	id: "asef",
	title: "Boojum test product",
	price: "22.50"
};

test('Schema matches input', t => {
	let product = Object.assign({}, testProduct);

	var value = new Product(product);
	t.deepEqual(value.toObject(), testProduct);
});

test('Test product should be free of errors', t => {
	let product = Object.assign({}, testProduct);

	var value = new Product(product);
	t.false(value.isErrors());
});

test('compare_at_price_varies should return true', t => {
	let product = Object.assign({}, testProduct);

		// Set different values for both `compare_at_price_min` and `compare_at_price_max`
	product.compare_at_price_min = "22.50";
	product.compare_at_price_max = "200.00";

	var value = new Product(product);
	t.true(value.compare_at_price_varies());
});

test('compare_at_price_varies should return false', t => {
	let product = Object.assign({}, testProduct);

	// Set the same value for both `compare_at_price_min` and `compare_at_price_max`
	product.compare_at_price_min = "22.50";
	product.compare_at_price_max = "22.50";

	var value = new Product(product);
	t.false(value.compare_at_price_varies());
});
