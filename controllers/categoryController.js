const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

exports.createCategory = async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Le nom de la catégorie est requis",
        });
      }
  
      const category = new Category({ name });
      await category.save();
  
      res.status(201).json({
        success: true,
        message: "Catégorie créée avec succès",
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création de la catégorie",
        error: error.message,
      });
    }
  };


exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('subcategories');
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des catégories',
      error: error.message,
    });
  }
};

exports.getCategoryById = async (req, res) => {
    try {
      const { categoryId } = req.params;
  
      const category = await Category.findById(categoryId).populate('subcategories');
  
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Catégorie introuvable",
        });
      }
  
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de la catégorie",
        error: error.message,
      });
    }
  };

exports.updateCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Le nom de la catégorie est requis",
        });
      }
  
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: "Catégorie introuvable",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Catégorie mise à jour avec succès",
        data: updatedCategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de la catégorie",
        error: error.message,
      });
    }
  };
  
  exports.deleteCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
  
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({
          success: false,
          message: "Catégorie introuvable",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Catégorie supprimée avec succès",
        data: deletedCategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression de la catégorie",
        error: error.message,
      });
    }
  };

/*----------sous categories------------*/

exports.createSubCategory = async (req, res) => {
    try {
      const { parentCategoryId, name } = req.body;
  
      if (!parentCategoryId || !name) {
        return res.status(400).json({
          success: false,
          message: "L'ID de la catégorie parente et le nom de la sous-catégorie sont requis",
        });
      }
  
      const parentCategory = await Category.findById(parentCategoryId);
  
      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: "Catégorie parente introuvable",
        });
      }
  
      const subCategory = new SubCategory({ name, parentCategory: parentCategoryId });
      await subCategory.save();
  
      parentCategory.subcategories.push(subCategory);
      await parentCategory.save();
  
      res.status(201).json({
        success: true,
        message: "Sous-catégorie créée avec succès",
        data: subCategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création de la sous-catégorie",
        error: error.message,
      });
    }
  };


  exports.getSubCategories = async (req, res) => {
    try {
      const subcategories = await SubCategory.find().populate('parentCategory');
      res.status(200).json({
        success: true,
        data: subcategories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des sous-catégories',
        error: error.message,
      });
    }
  };