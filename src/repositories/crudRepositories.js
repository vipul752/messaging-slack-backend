export default async function crudRepositories(model) {
  return {
    create: async (data) => {
      const newDoc = await model.create(data);
      return newDoc;
    },
    getAll: async () => {
      const docs = await model.find();
      return docs;
    },
    getById: async (id) => {
      const doc = await model.findById(id);
      return doc;
    },
    update: async (id, data) => {
      const updatedDoc = await model.findByIdAndUpdate(id, data, {
        new: true
      });
      return updatedDoc;
    },
    delete: async (id) => {
      const deletedDoc = await model.findByIdAndDelete(id);
      return deletedDoc;
    }
  };
}
