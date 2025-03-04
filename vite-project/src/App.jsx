import { ShoppingList } from './components/shoppingList/shoppingList'

function MyButton() {
    return (
        <button>Im a button</button>
    )
}

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

          <MyButton /> 
          <ShoppingList />
        </>
        
    )
}


