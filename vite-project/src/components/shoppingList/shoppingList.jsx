import products from "../../mocks/productsMocks";

export function ShoppingList() {
  return (
    <ul>
      {products.map((product) => (
        <li
          key={product.id}
          style={{
            color: product.isFruit ? "magenta" : "darkgreen",
          }}
        >
          {product.title}
        </li>
      ))}
    </ul>
  );
}
