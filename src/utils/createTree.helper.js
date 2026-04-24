export const createTree = (array, parentId = null) => {
  const newArray = [];

  for (const item of array) {
    // Xử lý logic so sánh cho cả trường hợp string rỗng hoặc null từ PostgreSQL
    const currentParentId = item.parent_id === "" ? null : item.parent_id;
    const targetParentId = parentId === "" ? null : parentId;

    if (currentParentId == targetParentId) {
      const children = createTree(array, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      newArray.push(item);
    }
  }

  return newArray;
};

export const createTreeHelper = (array) => {
  return createTree(array);
};
