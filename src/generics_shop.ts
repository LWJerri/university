type BaseProduct = {
	id: number;
	name: string;
	price: number;
	description?: string;
};

type Electronics = BaseProduct & {
	category: "electronics";
	warrantyPeriod: number;
	brand: string;
};

type Clothing = BaseProduct & {
	category: "clothing";
	size: "S" | "M" | "L" | "XL";
	material: string;
};

type Book = BaseProduct & {
	category: "book";
	author: string;
	pages: number;
};

const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
	if (!products.length) {
		console.warn("Попередження: передано порожній масив товарів.");

		return undefined;
	}

	return products.find((product) => product.id === id);
};

const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
	if (maxPrice < 0) {
		console.error("Помилка: максимальна ціна не може бути від'ємною.");

		return [];
	}

	return products.filter((product) => product.price <= maxPrice);
};

type CartItem<T> = {
	product: T;
	quantity: number;
};

const addToCart = <T extends BaseProduct>(cart: CartItem<T>[], product: T, quantity: number): CartItem<T>[] => {
	if (quantity <= 0) {
		console.error("Помилка: кількість товару повинна бути більше 0.");

		return cart;
	}

	const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);

	if (existingItemIndex !== -1) {
		const newCart = [...cart];

		newCart[existingItemIndex] = {
			...newCart[existingItemIndex],
			quantity: newCart[existingItemIndex].quantity + quantity,
		};

		return newCart;
	} else {
		return [...cart, { product, quantity }];
	}
};

const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
	return cart.reduce((total, item) => {
		return total + item.product.price * item.quantity;
	}, 0);
};

const electronics: Electronics[] = [
	{
		id: 1,
		name: "Смартфон X",
		price: 15000,
		category: "electronics",
		warrantyPeriod: 24,
		brand: "BrandA",
	},
	{
		id: 2,
		name: "Ноутбук Pro",
		price: 45000,
		category: "electronics",
		warrantyPeriod: 12,
		brand: "BrandB",
	},
];

const clothing: Clothing[] = [
	{
		id: 3,
		name: "Футболка",
		price: 500,
		category: "clothing",
		size: "M",
		material: "Бавовна",
	},
	{
		id: 4,
		name: "Джинси",
		price: 1200,
		category: "clothing",
		size: "L",
		material: "Денім",
	},
];

console.log("--- Пошук товарів ---");
const foundPhone = findProduct(electronics, 1);
console.log("Знайдений телефон:", foundPhone);

const notFound = findProduct(electronics, 99);
console.log("Неіснуючий товар:", notFound);

console.log("\n--- Фільтрація за ціною ---");
const cheapClothes = filterByPrice(clothing, 600);
console.log("Одяг до 600 грн:", cheapClothes);

console.log("\n--- Робота з кошиком ---");
let electronicsCart: CartItem<Electronics>[] = [];

if (foundPhone) {
	electronicsCart = addToCart(electronicsCart, foundPhone, 1);

	console.log("Кошик після додавання телефону:", electronicsCart);
}

if (foundPhone) {
	electronicsCart = addToCart(electronicsCart, foundPhone, 2);

	console.log("Кошик після додавання ще 2 телефонів (очікуємо quantity: 3):", electronicsCart);
}

const totalElectronics = calculateTotal(electronicsCart);
console.log("Загальна вартість електроніки:", totalElectronics);

let mixedCart: CartItem<BaseProduct>[] = [];

const jeans = findProduct(clothing, 4);

if (jeans) {
	mixedCart = addToCart(mixedCart, jeans, 2);
} else if (foundPhone) {
	mixedCart = addToCart(mixedCart, foundPhone, 1);
}

console.log("\n--- Змішаний кошик ---");
console.log("Товари в змішаному кошику:", mixedCart);
console.log("Загальна вартість змішаного кошика:", calculateTotal(mixedCart));
