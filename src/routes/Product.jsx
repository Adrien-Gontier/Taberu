import React, { useContext } from "react";
import ProductFound from "../components/ProductFound";
import ProductResultContext from "../context/ProductResultContext";

export default function Product() {

  const { productResult, setProductResult } = useContext(ProductResultContext);


  const dataProductDisablePTag1 = <p>Les informations du produit ne sont pas displonible ou la détection du code barre n'a pas donné de résultat.</p>;
  const dataProductDisablePTag2 = <p>Veuillez rééssayer en tapant le numéro ou en scannant le code Barre, le cas échéant</p>;

  const dataProductDisable = <div className="product__dataProductDisable">{dataProductDisablePTag1}{dataProductDisablePTag2}</div>;

  const dataProductError = <p className="product__dataProductError">Veuillez ne renseigner seulement que des chiffres</p>;

  const displayDataProduct = productResult.status_verbose == "product not found" ? dataProductDisable : productResult.status_verbose == "no code or invalid code" ? dataProductError : <ProductFound />;

  return (
    <div className="product">
      {displayDataProduct}
    </div>
  )
}