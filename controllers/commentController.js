
const Comment = require('../models/comments');

exports.createComment = async (req, res) => {
  try {
    const userId = req.auth ? req.auth.userId : null;
  

 
  const { content, stuffId } = req.body;


  const comment = new Comment({
    content,
    stuffId,
    userId: req.auth.userId, // ID de l'utilisateur connecté
  })

    await comment.save();

    res.status(201).json({
      success: true,
      message: 'Commentaire créé avec succès',
      data: comment
    });
  } catch (error) {
    res.status(500).json({
        success: false,  
        message: "Erreur lors de la création du commentaire",
        error: error
      });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user', 'name').populate('userId', 'name');    
    
    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des commentaires",
      error: error.message
    });
  }
};

exports.getComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId).populate('user', 'name');

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Commentaire introuvable"
      });
    }

    res.status(200).json({
      success: true,
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du commentaire",
      error: error.message
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;

    const comment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Commentaire introuvable"
      });
    }

    res.status(200).json({
      success: true,
      message: "Commentaire mis à jour avec succès",
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du commentaire",
      error: error.message
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findByIdAndRemove(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Commentaire introuvable"
      });
    }

    res.status(200).json({
      success: true,
      message: "Commentaire supprimé avec succès"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du commentaire",
      error: error.message
    });
  }
};