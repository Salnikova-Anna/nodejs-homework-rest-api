const { Contact } = require("../models/contact");

const { ctrlWrapper, HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const searchParams = { owner };
  if (favorite === undefined) {
    delete searchParams.favorite;
  } else {
    searchParams.favorite = favorite;
  }
  const allContacts = await Contact.find(
    searchParams,
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner");
  res.json({ status: "success", code: 200, data: { allContacts } });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findById(id);
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.json({ status: "success", code: 200, data: { contactById } });
};

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json({ status: "success", code: 201, data: { newContact } });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const removedContact = await Contact.findByIdAndDelete(id);
  if (!removedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact updated",
    updatedContact,
  });
};

const updateFavorite = async (req, res, next) => {
  if (!req.body.favorite) {
    throw HttpError(400, "missing field favorite");
  }

  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Favorite status updated",
    updatedContact,
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
