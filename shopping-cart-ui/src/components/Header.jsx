import { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa"

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false)

    const { cart, removeFromCart, clearCart } = useCart()
    const itemsCount = cart.reduce((acc, item) => acc + item.qty, 0)
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">ShopMate</h1>

            <div className='relative'>
                <button className="cursor-pointer" onClick={()=> setShowDropdown(!showDropdown)}>
                    <FaShoppingCart className="text-2xl text-gray-700" />
                    {itemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {itemsCount}
                        </span>
                    )}
                </button>

                {showDropdown && (
                    <div className="absolute right-0 w-80 mt-2 bg-white border rounded shadow-lg z-50">
                        <div className="p-4">
                            <h2 className="font-semibold text-lg mb-2">Cart Items</h2>
                            {cart.length === 0 ? (
                                <p className="text-gray-500">Your cart is empty</p>
                            ) : (
                                <>
                                    <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                                        {cart.map((item) => (
                                            <li key={item.id} className="flex justify-between items-center py-2">
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.qty} x ${item.price}
                                                    </p>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 hover:underline">Remove</button>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex justify-between mt-4 font-semibold">
                                        <span>Total:</span>
                                        <span>${total}</span>
                                    </div>

                                    <button onClick={clearCart} className="bg-red-500 mt-2 w-full text-white py-1 rounded transition hover:bg-red-600">Clear Cart</button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;