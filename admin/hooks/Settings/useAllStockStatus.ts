import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_STOCK_STATUS = gql`
  query getAllStockStatus {
    getAllTheStockStatus {
      id
      title
      notes
      image
      isPublished
    }
  }
`;

const useAllStockStatus = async () => {
  const data = await Client.request(GET_ALL_STOCK_STATUS);
  console.log(data);

  const stocks = {};
  if (data) {
    data.getAllTheStockStatus.forEach((stock) => {
      stocks[stock.id] = {
        title: stock.title,
        notes: stock.notes,
        image: stock.image,
        isPublished: stock.isPublished,
        isDisabled: true,
      };
    });
  }
  return stocks;
};

export default useAllStockStatus;
