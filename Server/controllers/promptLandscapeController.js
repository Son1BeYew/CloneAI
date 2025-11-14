const PromptLandscape = require("../models/PromptLandscape");

// Lấy tất cả landscape prompts
exports.getAll = async (req, res) => {
  try {
    const prompts = await PromptLandscape.find().sort({ order: 1 });
    res.json(prompts);
  } catch (error) {
    console.error("❌ Lỗi khi lấy landscape prompts:", error);
    res.status(500).json({ message: "Lỗi khi lấy landscape prompts", error });
  }
};

// Lấy landscape prompt theo ID
exports.getById = async (req, res) => {
  try {
    const prompt = await PromptLandscape.findById(req.params.id);
    if (!prompt) {
      return res.status(404).json({ message: "Không tìm thấy landscape prompt" });
    }
    res.json(prompt);
  } catch (error) {
    console.error("❌ Lỗi khi lấy landscape prompt:", error);
    res.status(500).json({ message: "Lỗi khi lấy landscape prompt", error });
  }
};

// Tạo landscape prompt mới
exports.create = async (req, res) => {
  try {
    const { name, title, description, prompt, image, order, price } = req.body;

    if (!name || !title || !prompt) {
      return res.status(400).json({ message: "Các trường bắt buộc không được để trống" });
    }

    const newPrompt = await PromptLandscape.create({
      name,
      title,
      description,
      prompt,
      image: image || "",
      order: order || 0,
      price: price || 0,
    });

    res.status(201).json(newPrompt);
  } catch (error) {
    console.error("❌ Lỗi khi tạo landscape prompt:", error);
    res.status(500).json({ message: "Lỗi khi tạo landscape prompt", error: error.message });
  }
};

// Cập nhật landscape prompt
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, description, prompt, image, order, price } = req.body;

    const updateData = {
      name,
      title,
      description,
      prompt,
      order: order || 0,
      price: price || 0,
    };

    if (image) {
      updateData.image = image;
    }

    const updated = await PromptLandscape.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy landscape prompt" });
    }

    res.json(updated);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật landscape prompt:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật landscape prompt", error: error.message });
  }
};

// Xóa landscape prompt
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PromptLandscape.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy landscape prompt" });
    }

    res.json({ message: "Đã xóa landscape prompt", data: deleted });
  } catch (error) {
    console.error("❌ Lỗi khi xóa landscape prompt:", error);
    res.status(500).json({ message: "Lỗi khi xóa landscape prompt", error: error.message });
  }
};
