import { gql, useMutation } from '@apollo/client';

const CREATE_CATEGORY = gql`
  mutation addNewCategory(
    $name: String!
    $description: String!
    $image: String!
    $slug: String
    $isPublished: Boolean!
    $id: String!
  ) {
    addNewCategory(
      data: {
        name: $name
        description: $description
        image: $image
        slug: $slug
        isPublished: $isPublished
        id: $id
      }
    ) {
      id
      name
      description
      parentCategory
      slug
      image
    }
  }
`;

const useProductCategoryTree = async () => {
  const [createCategory] = useMutation(CREATE_CATEGORY);

  return createCategory;
};

export default useProductCategoryTree;
