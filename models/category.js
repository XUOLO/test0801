var SchemaCategory = require('../schema/category')

module.exports ={
    getall: function (query) {
        var Search = {
          isDelete: false // Thêm điều kiện isDelete bằng false
        };
        if (query.key) {
          Search.name = new RegExp(query.key, 'i');
        }
        var limit = parseInt(query.limit) || 2;
        var page = parseInt(query.page) || 1;
        var skip = (page - 1) * limit;
      
        return SchemaCategory.find(Search)
          .select('_id name price order isDelete')
          .exec()
          .then(function (products) {
            
            products.sort(function (a, b) {
              return a.order - b.order; 
            });
      
            // Áp dụng phân trang
            var paginatedProducts = products.slice(skip, skip + limit);
      
            return {
              success: true,
              data: paginatedProducts
            };
          });
      },
    getOne:function(id){ 
        return SchemaCategory.findById(id);
    },
    getByName:function (name){
        return SchemaCategory.findOne({userName:name}).exec();
    },
    createcategory:function(user){
        return new SchemaCategory(user).save();
    },
    login:function ( userName, password){
        return SchemaCategory.checkLogin(userName,password);
    },
    delete: function (id) {
        return SchemaCategory.findOneAndDelete({ _id: id }).exec();
      },findByIdAndUpdate: function (id, updateData) {
        return SchemaCategory.findOneAndUpdate({ _id: id }, updateData, { new: true }).exec();
    },
}