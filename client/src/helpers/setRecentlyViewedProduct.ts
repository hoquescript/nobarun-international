const setRecentlyViewedProduct = (slug, product) => {
  // Recently Viewed Data Store in LocalStorage
  let recentlyViewed: any[] = JSON.parse(
    localStorage.getItem('recentlyViewed'),
  );
  if (!recentlyViewed) {
    recentlyViewed = [
      {
        id: slug,
        title: product?.intro?.productName,
        image: product?.intro?.featuredImage,
      },
    ];
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  } else {
    const isExist = recentlyViewed.some((product) => product.id === slug);
    if (!isExist) {
      recentlyViewed.push({
        id: slug,
        title: product?.intro?.productName,
        image: product?.intro?.featuredImage.src,
      });
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }
  }
};
export default setRecentlyViewedProduct;
