import { Button, Link } from "@material-ui/core";
import { Wrapper } from "../styles/cartItem.styles";

const CartItem = ({ item, addToCart, removeFromCart, removeAllLink }) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.productName}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            style={{ backgroundColor: "rgb(80,72,229)", color: "white" }}
            size="ex-small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            style={{ backgroundColor: "rgb(80,72,229)", color: "white" }}
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
        {removeAllLink && (
          <Link onClick={() => removeAllLink(item.id)}>Remove</Link>
        )}
      </div>
      <img src={item.imageLink} alt={item.productName} />
    </Wrapper>
  );
};

export default CartItem;
