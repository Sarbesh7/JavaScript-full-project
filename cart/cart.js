// Function to create a product card from API data
function createCard(product) {
  const card = document.createElement('div');
  card.className = 'max-w-[350px] w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.015]';

  card.innerHTML = `
    <img class="w-full h-[220px] object-cover" src="${product.image}" alt="${product.title}" />
    <div class="p-4">
      <h2 class="text-[1.5rem] font-bold text-gray-800 dark:text-white mb-2">${product.title}</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-4 text-[0.9rem] leading-relaxed">${product.description}</p>
      <div class="flex items-center justify-between mb-4">
        <span class="text-[1.1rem] font-bold text-orange-500">$${product.price.toFixed(2)}</span>
        <span class="text-[0.85rem] text-gray-400 dark:text-gray-500">In Stock</span>
      </div>
      <div class="flex gap-[10px]">
        <button class="flex-1 bg-blue-600 hover:bg-blue-800 text-white text-[0.9rem] font-medium py-[10px] px-[14px] rounded-lg transition duration-300" 
          onclick="alert('More info about: ${product.title}')">
          Read More
        </button>
        <button class="flex-1 bg-green-600 hover:bg-green-700 text-white hover:text-[#e6eaf1] text-[0.9rem] font-medium py-[10px] px-[14px] rounded-lg transition duration-300"
          onclick="alert('Added to cart: ${product.title}')">
          Add to Cart
        </button>
      </div>
    </div>
  `;
  return card;
}

// Fetch and display products from fakestoreapi.com
async function apiCall() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) throw new Error("Failed to fetch products");
    const products = await response.json();

    const container = document.getElementById('demo');
    products.forEach(product => {
      const card = createCard(product);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

apiCall();
