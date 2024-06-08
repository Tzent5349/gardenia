import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchUserShoppingCart,
  addCartItem,
  subtractCartItem,
  deleteCartItem,
} from "@/lib/store/features/cart/cartSlice";
import { getColorById } from "@/actions/get-colors";
import { getGenderById } from "@/actions/get-gender";
import { getProductDetails } from "@/actions/get-products";
import { getAllSizes } from "@/actions/get-sizes";
import { useUser } from "@clerk/nextjs";
import WishCartProduct from "../shared/cards/WishCartProduct";
import { Button } from "../ui/button";
import { handleUserOrder } from "@/actions/handle-order";
import { useRouter } from "next/navigation";

type UserCartProps = {
  userCartList?: any[];
};

const CartLis = ({ userCartList: cartList }: UserCartProps) => {
  const dispatch = useAppDispatch();
  const [allDetailedUserCart, setAllDetailedUserCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [cartCounter, setCartCounter] = useState<number>(0);
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetails = async (productId: string) => {
      try {
        const product = await getProductDetails(productId);
        return product?.product;
      } catch (error) {
        console.log(error);
      }
    };

    const updateUserCartList = async () => {
      if (cartList) {
        const detailedCartList = await Promise.all(
          cartList.map(async (item: any) => {
            const productDetails = await fetchProductDetails(item.productId);
            return {
              ...item,
              productDetails,
            };
          })
        );
        setAllDetailedUserCart(detailedCartList);
      }
    };

    updateUserCartList();
  }, [cartList]);

  useEffect(() => {
    const fetchColorDetail = async (colorId: string) => {
      try {
        const colorDetails = await getColorById(colorId);
        return colorDetails;
      } catch (error) {
        console.error("Error fetching color details:", error);
        return null;
      }
    };

    const fetchGender = async (genderId: string) => {
      try {
        const gender = await getGenderById(genderId);
        return gender;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const fetchSizeDetails = async (sizeId: string, gender: any) => {
      try {
        const allSizes = await getAllSizes();
        const genderSizes = allSizes.find(
          (size: any) => size.gender === gender
        );
        if (genderSizes) {
          const sizeDetails = genderSizes.value.find(
            (size: any) => size._id === sizeId
          );
          return sizeDetails;
        }
        return null;
      } catch (error) {
        console.error("Error fetching Sizes:", error);
        return null;
      }
    };

    const updateProducts = async () => {
      const updatedProducts = await Promise.all(
        allDetailedUserCart.map(async (item) => {
          const colorDetails = await fetchColorDetail(item.colorId);
          const gender = await fetchGender(item.productDetails.gender);
          const sizeDetails = await fetchSizeDetails(item.sizeId, gender);
          const imgColorPrice = item.productDetails.ImgColorPrice.find(
            (imgColor: any) => imgColor._id === item.imgColorPrice
          );

          const img = imgColorPrice ? imgColorPrice.img : "";
          const stock = imgColorPrice ? imgColorPrice.stock > 1 : false;

          return {
            id: item._id,
            name: item.productDetails.name,
            price: item.productDetails.price,
            img: img,
            stock: stock,
            size: sizeDetails ? sizeDetails.footLength : "N/A",
            colorName: colorDetails?.name,
            colorValue: colorDetails?.value,
            gender,
            quantity: item.quantity,
            imgColorPriceId: item.imgColorPrice,
            productId: item.productId,
            sizeId: item.sizeId,
            colorId: item.colorId,
          };
        })
      );
      setProducts(updatedProducts);
    };

    if (allDetailedUserCart.length > 0) {
      updateProducts();
    }
  }, [allDetailedUserCart]);

  useEffect(() => {
    const subtotal = products.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setSubtotal(subtotal);
    setTotal(subtotal);

    const cartCounter = products.reduce((acc, curr) => acc + curr.quantity, 0);
    setCartCounter(cartCounter);
  }, [products]);

  const handleDeleteCartItem = useCallback(
    async (id: string) => {
      if (!userId) return;
      try {
        await dispatch(deleteCartItem({ userId, cartId: id })).unwrap();
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
    [dispatch, userId]
  );

  const handleDecreaseQuantity = useCallback(
    async (id: string) => {
      if (!userId) return;
      try {
        const product = products.find((product) => product.id === id);
        if (product?.quantity > 1) {
          await dispatch(subtractCartItem({ userId, cartId: id })).unwrap();
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === id
                ? { ...product, quantity: product.quantity - 1 }
                : product
            )
          );
        }
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    },
    [dispatch, userId, products]
  );

  const handleIncreaseQuantity = useCallback(
    async (id: string) => {
      if (!userId) return;
      try {
        await dispatch(addCartItem({ userId, cartId: id })).unwrap();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        );
      } catch (error) {
        console.error("Error increasing quantity:", error);
      }
    },
    [dispatch, userId]
  );

  const handleCheckout = async () => {
    if (products.length === 0) {
      alert("Cart is empty. Please add some items.");
      return;
    }

    try {
      const shippingAddress = "User's shipping address"; // You should get this from user input
      const cartItems = products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        imgColorPriceId: product.imgColorPriceId, // Adjust this according to your data structure
        sizeId: product.sizeId, // Adjust this according to your data structure
        colorId: product.colorId, // Adjust this according to your data structure
        genderId: product.gender._id,
        price: product.price,
      }));

      await handleUserOrder(userId, shippingAddress, cartItems);
      // Clear the cart in the frontend
      setProducts([]);
      alert("Order placed successfully!");
      router.refresh();
      router.push("/"); // Redirect to home page or any page you want
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place the order.");
    }
  };

  return (
    <div className="flex w-full px-14 gap-14 flex-col md:flex-col">
      <div className="flex flex-col border-green-400 gap-8 ">
        <h1 className="font-semibold text-4xl">Your Shopping Basket</h1>
        {products.map((product) => (
          <WishCartProduct
            key={product.id}
            product={product}
            userId={userId}
            handleDeleteCartItem={handleDeleteCartItem}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
          />
        ))}
      </div>
      <div className="rightSide">
        <p>Subtotal: {subtotal}</p>
        <p>Total: {total}</p>
      </div>

      <Button onClick={handleCheckout}>To Checkout</Button>
    </div>
  );
};

export default CartLis;
