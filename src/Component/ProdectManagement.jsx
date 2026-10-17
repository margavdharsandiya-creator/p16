import { useState } from "react";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    setProducts((prev) => [...prev, newProduct]);

    setFormData({
      name: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
    });

    setMessage("Product added successfully!");
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            Inventory Dashboard
          </p>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Product Management
          </h1>

          <p className="mt-2 text-slate-500">
            Create and manage your product inventory in one place.
          </p>
        </div>

        <div className="flex w-fit items-center gap-3 rounded-2xl border border-white bg-white px-5 py-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
            📦
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Products</p>
            <p className="text-2xl font-extrabold text-slate-900">
              {products.length}
            </p>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-5">
        {/* Product Form */}
        <section className="rounded-3xl border border-white bg-white p-6 shadow-xl shadow-indigo-100/50 sm:p-8 lg:col-span-2">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white">
              +
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Add New Product
              </h2>
              <p className="text-sm text-slate-500">
                Fill in the product information
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Product Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Wireless Headphones"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Home & Living">Home &amp; Living</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Price (₹)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="999"
                  required
                  className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="10"
                  required
                  className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                required
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0"
            >
              + Add Product
            </button>

            {message && (
              <p
                role="status"
                className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-700"
              >
                ✓ {message}
              </p>
            )}
          </form>
        </section>

        {/* Product List */}
        <section className="lg:col-span-3">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Product Inventory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                All products added to your list
              </p>
            </div>

            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
              {products.length} items
            </span>
          </div>

          {products.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-white/70 px-6 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100 text-4xl">
                🛍️
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                No products yet
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Your inventory is waiting! Use the form to add your first
                product and it will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group rounded-2xl border border-white bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-2xl">
                      📦
                    </div>

                    <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="break-words text-lg font-extrabold text-slate-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 min-h-12 break-words text-sm leading-6 text-slate-500">
                    {product.description}
                  </p>

                  <div className="my-4 flex items-end justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Product Price
                      </p>
                      <p className="text-2xl font-black text-indigo-600">
                        ₹{product.price.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-400">Stock</p>
                      <p className="font-bold text-slate-800">
                        {product.quantity} units
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    className="w-full rounded-xl border border-rose-100 py-2.5 text-sm font-bold text-rose-600 transition hover:bg-rose-50"
                  >
                    Remove Product
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <footer className="mt-10 text-center text-sm text-slate-500">
        Product Management System · React + Tailwind CSS
      </footer>
    </div>
  );
}

export default ProductManagement;