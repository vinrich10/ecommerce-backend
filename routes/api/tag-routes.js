const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findAll(
      {
      include: [{ model: Product, as: 'products' }]
    }
    );
    if (!tagInfo) {
      res.status(404).json({message: "No information found"})
      return;
    }
    res.status(200).json(tagInfo)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findByPk(req.params.id, 
      {
      include: [{ model: Product, as: 'products' }]
      }
      );
    if (!tagInfo) {
      res.status(404).json({message: "No tag information with this ID found" });
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagInfo = await Tag.create(req.body);
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagInfo = await Tag.update(
      { tag_name: req.body.tag_name},
      { returning: true, where: {id: req.params.id}}
      )
      res.status(200).json(tagInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagInfo = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagInfo) {
      res.status(404).json({ message: 'No tag information found with this id'});
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;