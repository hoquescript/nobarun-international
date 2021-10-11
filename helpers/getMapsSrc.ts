function getMapsSrc(html) {
  const regex = /<iframe.*?src=['"](.*?)['"]/;
  const src =
    regex.exec(html) &&
    Array.isArray(regex.exec(html)) &&
    //@ts-ignore
    regex.exec(html)?.length > 0 &&
    //@ts-ignore
    regex.exec(html)[1];
  return src;
}

export default getMapsSrc;
