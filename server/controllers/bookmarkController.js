import Bookmark from "../models/Bookmark.js";

export const addBookmark = async (req, res) => {
  try {
    const { source, title, company, url } = req.body;

    const bookmark = await Bookmark.create({
      user: req.user._id,
      source,
      title,
      company,
      url,
    });

    res.status(201).json({ success: true, bookmark });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ success: true, alreadySaved: true });
    }
    res.status(500).json({ success: false });
  }
};

export const removeBookmark = async (req, res) => {
  const { url } = req.body;

  await Bookmark.findOneAndDelete({
    user: req.user._id,
    url,
  });

  res.json({ success: true });
};

export const getBookmarks = async (req, res) => {
  const bookmarks = await Bookmark.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json({ success: true, bookmarks });
};
