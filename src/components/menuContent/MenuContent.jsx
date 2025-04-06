import { PureComponent } from "react";
import "./menuContent.scss";
import { Button } from "../Button/index";
import { ProductCards } from "../productCards/index";
import { Tooltip } from "../tooltip/index";

export default class MenuContent extends PureComponent {
  render() {
    const {
      categories,
      products,
      canLoadMore,
      updateCartCount,
      handleLoadMore,
      loading,
      error,
    } = this.props;

    return (
      <div className="menu_wrapper">
        <p className="title">Browse our menu</p>
        <p className="menu_description">
          Use our menu to place an order online, or
          <Tooltip text="📞 777-777-7777">{" phone "}</Tooltip>
          our store to place a pickup order. Fast and fresh food.
        </p>
        <div className="button_wrapper">
          {categories.map((category) => (
            <Button key={category} buttonText={category} />
          ))}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <ProductCards
              products={products}
              canLoadMore={canLoadMore}
              updateCartCount={updateCartCount}
              handleLoadMore={handleLoadMore}
            />
          </>
        )}
      </div>
    );
  }
}
