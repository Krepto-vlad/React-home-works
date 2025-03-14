import { ShoppingList } from './components/shoppingList/shoppingList'

const user = {
    name: "Alex",
};


export default function MyApp() {
    return (
        <>
          <h1>{user.name}</h1>
           <pre style={{
            whiteSpace: "pre-wrap"
            }}>list of {user.name} products
          </pre>
          <button>Im a button</button>
          <ShoppingList />
        </>
        
    )
}


